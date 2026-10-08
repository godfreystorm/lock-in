# Sum an array (example)

**Tree:** example · **Started:** 2026-10-01 · **Status:** done

## In my own words
Walk the array once and keep a running total. One pass, so the time grows with the length of the array: O(n). It only stores one number, so the extra space is O(1).

## What I built
`sumArray` in `main.ts`, plus three tests: the normal case, an empty array, and negative numbers.

## What tripped me up
Nothing here. That's why it's the example. Your real nodes should have something in this section.

## Claude test
- **Date:** 2026-10-01
- **Result:** pass
- **Weak spot it found:** "Why O(1) space?" Because the total is the only thing stored, no matter how long the input is.

## Sources I used
- None needed for the example
