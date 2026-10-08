// Shared tree helpers: the node list (built from docs/tree.json) and the folder scan.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export type Tree = "backend" | "ai" | "dsa";
export const TREES: Tree[] = ["backend", "ai", "dsa"];
const KEY: Record<Tree, "B" | "A" | "D"> = { backend: "B", ai: "A", dsa: "D" };

export interface Node {
  id: string;
  label: string;
  kind: string; // n = new, p = prove it, s = skipped option, b = build project
  tree: Tree;
  group: string;
  stage: number;
}

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type Group = [string, string[]];
interface Stage { t: string; B?: Group[]; A?: Group[]; D?: Group[] }

export function loadNodes(): Node[] {
  const { stages } = JSON.parse(readFileSync("docs/tree.json", "utf8")) as { stages: Stage[] };
  const nodes: Node[] = [];
  stages.forEach((st, stage) =>
    TREES.forEach((tree) =>
      (st[KEY[tree]] ?? []).forEach(([group, list]) =>
        list.forEach((raw) => {
          const [label, kind = "n"] = raw.split("|");
          nodes.push({ id: `${KEY[tree]}-${slug(group)}-${slug(label)}`, label: label.trim(), kind, tree, group, stage });
        }),
      ),
    ),
  );
  return nodes;
}

// Find a node by name inside one tree: exact label first, then a unique partial match.
export function findNode(nodes: Node[], tree: Tree, name: string): Node | string {
  const inTree = nodes.filter((n) => n.tree === tree);
  const q = name.trim().toLowerCase();
  const exact = inTree.filter((n) => n.label.toLowerCase() === q);
  if (exact.length) return exact.find((n) => n.kind !== "s") ?? exact[0];
  const partial = inTree.filter((n) => n.label.toLowerCase().includes(q));
  if (partial.length === 1) return partial[0];
  if (partial.length > 1) return `"${name}" matches ${partial.length} nodes: ${partial.slice(0, 8).map((n) => `"${n.label}"`).join(", ")}. Be more specific.`;
  return `No ${tree} node called "${name}". Check the spelling against the tree page.`;
}

const NODE_RE = /<!-- node: ([A-Za-z0-9-]+) -->/;
const STATUS_RE = /\*\*Status:\*\* (doing|done)/;

// Every node folder in the repo, with the node id and status read from its notes.md.
export function scanFolders(): { dir: string; id: string; status: "doing" | "done" }[] {
  const out: { dir: string; id: string; status: "doing" | "done" }[] = [];
  for (const tree of TREES) {
    if (!existsSync(tree)) continue;
    for (const d of readdirSync(tree)) {
      const notes = join(tree, d, "notes.md");
      if (!existsSync(notes)) continue;
      const text = readFileSync(notes, "utf8");
      const id = text.match(NODE_RE)?.[1];
      if (!id) continue;
      out.push({ dir: join(tree, d), id, status: (text.match(STATUS_RE)?.[1] as "doing" | "done") ?? "doing" });
    }
  }
  return out;
}

// Writes docs/progress.json, which the tree page reads.
export function writeProgress() {
  const s: Record<string, string> = {};
  const dirs: Record<string, string> = {};
  for (const f of scanFolders()) {
    s[f.id] = f.status;
    dirs[f.id] = f.dir;
  }
  writeFileSync("docs/progress.json", JSON.stringify({ updated: new Date().toISOString(), s, dirs }, null, 1) + "\n");
  const done = Object.values(s).filter((v) => v === "done").length;
  console.log(`Progress: ${done} done, ${Object.keys(s).length - done} doing.`);
}
