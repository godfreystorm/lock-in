# lock-in

This is my practice repo for **The Lock-In**: rebuilding my engineering from the fundamentals up, starting 2026-10-05. Think of it as a notebook. Every roadmap node I learn gets a small folder here with my notes and, when the node has something to code, a bit of code with tests.

Why it exists:
1. **Writing it is the test.** Reading or watching makes you feel like you know something. Writing it from a blank file shows whether you do.
2. **It's proof.** After six months, this repo shows hundreds of nodes worked through by hand, with tests. That's the portfolio.
3. **It's where LinkedIn posts come from.** The "What tripped me up" section in each `notes.md` is the post.

---

## One place

Everything lives in this repo:

- **The tree:** [godfreystorm.github.io/lock-in](https://godfreystorm.github.io/lock-in/). All 3 roadmap.sh trees (Backend, AI Engineer, DSA) in 8 stages. Click any node for its description, the free articles and videos to learn from, and the exact command to run next.
- **Mark progress right on the tree.** Click a node, then hit **To do / Doing / Done**, the same dashboard as before. Anyone can view the tree, but only you can change it: click **Edit (owner only)** and paste your GitHub key (made once, see below). Each click saves a commit to `docs/progress.json`.
- **The repo commands are optional, in the background.** `npm run new` makes a node's notes folder and sets it Doing, and `npm run done` sets it Done. They pull first and only move a node forward, so they never undo a dashboard click.
- **The rules and the weekly log** stay in the vault: `Obsidian Vault/Learning/The Lock-In.md`.

---

## The loop: do this for every node

1. **Open the tree** and click the next node in the current stage. Weekdays: Backend. Saturdays: AI. Every weekday, 30 minutes of DSA first.
2. **Learn it** from the panel's links: one or two articles or videos, 20 to 40 minutes.
3. **Start it.** The panel shows the exact command; copy it:
   ```bash
   npm run new -- backend "How does the internet work?"
   npm run new -- dsa "Hash Tables" --code     # --code adds main.ts + main.test.ts
   ```
   A partial name works if it's unique (`"hash"` finds "Hash Tables").
4. **Write `notes.md` with the sources closed.** If you can't explain it without looking, go back to step 2.
5. **Code it** (when the node has code) in `main.ts`, with tests in `main.test.ts` for the normal case, an edge case, and the case you think breaks it.
6. **Get tested.** In the panel, click **Copy "test me" message**, paste it to Claude, and answer cold. Log the result in `notes.md`.
7. **Pass? Mark it done and push:**
   ```bash
   npm run done -- backend "How does the internet work?"
   git add -A && git commit -m "backend: how does the internet work" && git push
   ```

**"Prove it" nodes** (the dashed ones: things you already use at work or in your projects) start the node (step 3), then skip straight to the cold 60-second explain-back with Claude (step 6). Clean explanation: mark it done. Shaky: it becomes a normal node and you go through the whole loop.

---

## Folder layout

```
lock-in/
├── backend/        one folder per Backend node   → backend/001-how-does-the-internet-work/
├── ai/             one folder per AI Engineer node
├── dsa/            one folder per DSA node        → dsa/001-hash-tables/
├── _example/       a finished folder, so you can see the shape (not a real node)
├── docs/           the tree page (GitHub Pages): tree.json = roadmap data, progress.json = your status
├── templates/      the notes.md template the script copies
└── scripts/        new.ts, done.ts, nodes.ts (the commands)
```

Each node folder:
```
001-hash-tables/
├── notes.md        my own words, what I built, what tripped me up, the test result
├── main.ts         the code (only with --code)
└── main.test.ts    the tests (only with --code)
```

Numbers count up in each tree, so the folders stay in the order you learned them.

---

## Your GitHub key (one time)

1. Go to [github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new).
2. Name it `lock-in tree`. Under **Repository access**, pick **Only select repositories** → `lock-in`.
3. Under **Permissions → Repository permissions**, set **Contents** to **Read and write**.
4. Generate it, copy it, then paste it on the tree after clicking **Edit (owner only)**. It stays saved in that browser until you click **Lock**.

It can only touch this one repo. Never paste it anywhere else.

---

## Commands

| Command | Does |
|---|---|
| `npm run new -- <backend\|ai\|dsa> "Node name"` | Starts a node: makes its folder with `notes.md` and turns it Doing on the tree |
| `npm run new -- dsa "Node name" --code` | Same, plus `main.ts` and `main.test.ts` |
| `npm run done -- <backend\|ai\|dsa> "Node name"` | Marks it Done (after you pass the test) |
| `npm test` | Runs every test in the repo |
| `npm run run -- dsa/001-hash-tables/main.ts` | Runs one file |

First time on a new machine: `npm install`.

---

## The rules (the short version)

- **No AI while learning a node.** No Copilot, no autocomplete, no asking Claude to write it. AI only comes in *after* your own attempt, to explain what you got wrong, and for the test in step 7.
- **DSA problems:** 25 minutes on your own, then watch the solution, then re-solve it from a blank file **the next day**. It only counts after the re-solve.
- **Never zero.** On a bad day, do one DSA problem or one node.
- **If you miss days, resume. Don't restart.**
- **TypeScript is the main language** and the interview language. **Python comes in at Stage 3** as a second language (~20 h, learned by porting things you built in TypeScript). About half the roles in the career-ops pipeline mention it. No solving everything twice.

---

## The week

| Day | Block |
|---|---|
| Mon–Thu | 30 min DSA → 60+ min Backend tree |
| Fri | 45 min FocusDown |
| Sat | 2 h AI Engineer tree + 1 h PoshPaw |
| Sun | 1 h PoshPaw · 30 min LinkedIn post · 30 min: 3 applications + the weekly log |

---

## Look at `_example/sum-array/` first

It's a complete folder: notes in my own words, code, three tests. Run `npm test` and you'll see its 3 tests pass. Every real node should end up looking like that.
