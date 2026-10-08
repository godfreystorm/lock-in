import { test } from "node:test";
import assert from "node:assert/strict";
import { sumArray } from "./main.ts";

test("adds the numbers", () => {
  assert.equal(sumArray([1, 2, 3]), 6);
});

test("empty array is 0", () => {
  assert.equal(sumArray([]), 0);
});

test("handles negatives", () => {
  assert.equal(sumArray([5, -2]), 3);
});
