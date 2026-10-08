# lock-in

This is my practice repo for **The Lock-In**: rebuilding my engineering from the fundamentals up, starting 2026-10-05. Think of it as a notebook. Every roadmap node I learn gets a small folder here with my notes and, when the node has something to code, a bit of code with tests.

Why it exists:
1. **Writing it is the test.** Reading or watching makes you feel like you know something. Writing it from a blank file shows whether you do.
2. **It's proof.** After six months, this repo shows hundreds of nodes worked through by hand, with tests. That's the portfolio.
3. **It's where LinkedIn posts come from.** The "What tripped me up" section in each `notes.md` is the post.

---

## The three places

| Place | What it's for |
|---|---|
| [**The Lock-In Tree**](https://claude.ai/artifact/SHoqXPfpsRLL4pxRm8ZCR1) | **The map.** All 3 roadmap.sh trees (Backend, AI Engineer, DSA) in 8 stages. Click a node for its description, the links to learn from, and its status. |
| **This repo** | **The work.** One folder per node: my notes, my code, my tests. |
| `Obsidian Vault/Learning/The Lock-In.md` | **The rules and the weekly log.** The week plan, the rules, and a one-line log every Sunday. |

---

## The loop: do this for every node

1. **Pick the next node** in the Tree: the first unfinished one in the current stage. Weekdays: Backend. Saturdays: AI. Every weekday, 30 minutes of DSA first.
2. **Click it** and set it to **Doing**.
3. **Learn it** from the panel's links: one or two articles or videos, 20 to 40 minutes.
4. **Make its folder:**
   ```bash
   npm run new -- backend "How does the internet work?"
   ```
   Add `--code` if the node has something to code (DSA always does):
   ```bash
   npm run new -- dsa "Hash Tables" --code
   ```
5. **Write `notes.md` with the sources closed.** If you can't explain it without looking, go back to step 3.
6. **Code it** (when the node has code) in `main.ts`, and write tests in `main.test.ts` for the normal case, an edge case, and the case you think breaks it.
7. **Get tested.** In the Tree's panel, click **Copy "test me" message**, paste it to Claude, and answer cold. Log the result in `notes.md`.
8. **Pass?** Set the node to **Done** in the Tree, then commit:
   ```bash
   git add -A && git commit -m "backend: how does the internet work"
   ```

**"Prove it" nodes** (the dashed ones: things you already use at work or in your projects) skip steps 3–6. Just do the cold 60-second explain-back with Claude. Clean explanation: mark it done. Shaky: it becomes a normal node and you go through the whole loop.

---

## Folder layout

```
lock-in/
├── backend/        one folder per Backend node   → backend/001-how-does-the-internet-work/
├── ai/             one folder per AI Engineer node
├── dsa/            one folder per DSA node        → dsa/001-hash-tables/
├── _example/       a finished folder, so you can see the shape (not a real node)
├── templates/      the notes.md template the script copies
└── scripts/new.ts  the "npm run new" script
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

## Commands

| Command | Does |
|---|---|
| `npm run new -- <backend\|ai\|dsa> "Node name"` | Makes a node folder with `notes.md` |
| `npm run new -- dsa "Node name" --code` | Same, plus `main.ts` and `main.test.ts` |
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
