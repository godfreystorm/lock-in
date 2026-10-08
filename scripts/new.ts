// Starts a node: makes its folder and marks it Doing on the tree page.
// Usage: npm run new -- <backend|ai|dsa> "Node name" [--code]
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { findNode, loadNodes, scanFolders, slug, TREES, type Tree, writeProgress } from "./nodes.ts";

const [tree, name, ...flags] = process.argv.slice(2);

if (!tree || !TREES.includes(tree as Tree) || !name) {
  console.error('Usage: npm run new -- <backend|ai|dsa> "Node name" [--code]');
  process.exit(1);
}

const node = findNode(loadNodes(), tree as Tree, name);
if (typeof node === "string") {
  console.error(node);
  process.exit(1);
}

const existing = scanFolders().find((f) => f.id === node.id);
if (existing) {
  console.error(`Already started: ${existing.dir}/ (${existing.status})`);
  process.exit(1);
}

const taken = existsSync(tree) ? readdirSync(tree).filter((d) => /^\d{3}-/.test(d)) : [];
const num = String(taken.length + 1).padStart(3, "0");
const dir = join(tree, `${num}-${slug(node.label)}`);
mkdirSync(dir, { recursive: true });

const date = new Date().toISOString().slice(0, 10);
const notes = readFileSync("templates/notes.md", "utf8")
  .replaceAll("{{name}}", node.label)
  .replaceAll("{{tree}}", `${tree} · ${node.group}`)
  .replaceAll("{{date}}", date)
  .replaceAll("{{id}}", node.id);
writeFileSync(join(dir, "notes.md"), notes);

if (flags.includes("--code")) {
  writeFileSync(join(dir, "main.ts"), `// ${node.label}\n\nexport function solve() {\n  // your code\n}\n`);
  writeFileSync(
    join(dir, "main.test.ts"),
    `import { test } from "node:test";\nimport assert from "node:assert/strict";\nimport { solve } from "./main.ts";\n\ntest("${node.label.replaceAll('"', "'")}", () => {\n  assert.equal(solve(), undefined); // replace with a real check\n});\n`,
  );
}

console.log(`Started "${node.label}" → ${dir}/${node.kind === "s" ? " (this was a skipped option; it's on your path now)" : ""}`);
writeProgress();
