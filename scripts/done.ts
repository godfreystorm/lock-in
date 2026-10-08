// Marks a node Done (after you pass Claude's test) and updates the tree page.
// Usage: npm run done -- <backend|ai|dsa> "Node name"
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { findNode, loadNodes, scanFolders, TREES, pullFirst, type Tree, writeProgress } from "./nodes.ts";

const [tree, name] = process.argv.slice(2);

if (!tree || !TREES.includes(tree as Tree) || !name) {
  console.error('Usage: npm run done -- <backend|ai|dsa> "Node name"');
  process.exit(1);
}

pullFirst();
const node = findNode(loadNodes(), tree as Tree, name);
if (typeof node === "string") {
  console.error(node);
  process.exit(1);
}

const folder = scanFolders().find((f) => f.id === node.id);
if (!folder) {
  console.error(`"${node.label}" isn't started yet. Run: npm run new -- ${tree} "${node.label}"`);
  process.exit(1);
}

const notes = join(folder.dir, "notes.md");
writeFileSync(notes, readFileSync(notes, "utf8").replace("**Status:** doing", "**Status:** done"));
console.log(`Done: "${node.label}". Commit and push to update the public tree:`);
console.log(`  git add -A && git commit -m "${tree}: ${node.label.toLowerCase()}" && git push`);
writeProgress();
