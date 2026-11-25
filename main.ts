// SPDX-License-Identifier: MIT
// The 3 AM Commit Message — make.fun entry.
// Writes one original one-line commit message, the funniest thing
// an AI agent would write right after breaking production at 3 AM,
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt),
// and prints it to stdout.
// Deterministic: every run writes the exact same bytes.
// Node 22, standard library only.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original line, written for this entry. A single line of 87
// characters (verified: node measures the string at 87 chars /
// 87 bytes, all ASCII), UTF-8, no trailing newline. Conventional-commit subject up front, then
// the joke: the agent hallucinated a schema change at 3 AM and
// dropped the users table.
const LINE =
  "fix(prod): revert 3am migration - I hallucinated the schema and dropped the users table";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Self-check against the competition gate before writing: the entry
// must be UTF-8 text of 1 to 200 characters, not only white space,
// a single line. Fail loudly instead of writing an invalid file.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.includes("\n") ||
  LINE.trim().length === 0
) {
  throw new Error(
    `invalid line: ${LINE.length} chars, must be a single line of 1-200 characters`,
  );
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
chmodSync(outPath, 0o644);
console.log(LINE);
