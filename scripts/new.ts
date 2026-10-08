// Scaffolds a folder for one roadmap node.
// Usage: npm run new -- <backend|ai|dsa> "Node name" [--code]
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [tree, name, ...flags] = process.argv.slice(2);
const trees = ["backend", "ai", "dsa"];

if (!tree || !trees.includes(tree) || !name) {
  console.error('Usage: npm run new -- <backend|ai|dsa> "Node name" [--code]');
  process.exit(1);
}

const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const taken = readdirSync(tree).filter((d) => /^\d{3}-/.test(d));
if (taken.some((d) => d.slice(4) === slug)) {
  console.error(`${tree}/…-${slug} already exists.`);
  process.exit(1);
}
const num = String(taken.length + 1).padStart(3, "0");
const dir = join(tree, `${num}-${slug}`);
mkdirSync(dir, { recursive: true });

const date = new Date().toISOString().slice(0, 10);
const notes = readFileSync("templates/notes.md", "utf8")
  .replaceAll("{{name}}", name)
  .replaceAll("{{tree}}", tree)
  .replaceAll("{{date}}", date);
writeFileSync(join(dir, "notes.md"), notes);

if (flags.includes("--code")) {
  writeFileSync(join(dir, "main.ts"), `// ${name}\n\nexport function solve() {\n  // your code\n}\n`);
  writeFileSync(
    join(dir, "main.test.ts"),
    `import { test } from "node:test";\nimport assert from "node:assert/strict";\nimport { solve } from "./main.ts";\n\ntest("${name.replaceAll('"', "'")}", () => {\n  assert.equal(solve(), undefined); // replace with a real check\n});\n`,
  );
}

console.log(`Created ${dir}/ ${existsSync(join(dir, "main.ts")) ? "(notes + code)" : "(notes)"}`);
