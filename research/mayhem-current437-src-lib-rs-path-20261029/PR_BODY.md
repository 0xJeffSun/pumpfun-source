## Summary

Counts the static `src/lib.rs` literal (10 `.rodata` bytes) with 2 path/seed proof sites on the qualified437 images. Each site is a relocated `.rodata` `lddw`, an immediate `stxdw` of that pointer to the stack, and an adjacent stack length store of 10, checked on both images before any branch. Relocation uniqueness is required through the closed pointer/length pair. No descriptor bytes are credited.

These intervals were disjoint from the option-seeds-paths baseline. The relation stays **437 normalized / 141 raw / 431 closed windows / 581 pairs** with **0 rejected pairs**. Binary leftovers in `[713388,713420)` and `[713442,713704)`, and the length table `[713108,713272)`, remain open. No OPEN #851 / #783 / Codex ranges are reclaimed.

Package: `research/mayhem-current437-src-lib-rs-path-20261029/`.

## Evidence

| Input | SHA-256 |
| --- | --- |
| `evidence/original/mayhem/deployed.so` | (pinned in inputs.json) |
| `research/mayhem-current437-composition-20261028/builds/first/symbols.so.gz` | (pinned in inputs.json) |
| `research/mayhem-current437-option-seeds-paths-20261029/coverage-delta.json` | `e8f6c7f03f18b6e8ce94d778cc9c4aaa56de798ad5a634412e8cf79ce9dedf2d` |

Payload coverage moves from **21,451** to **21,461 / 26,180** (+10). `.rodata` moves from **14,627** to **14,637 / 18,396**. The added `.rodata` union is `[713420, 713430)`.

## Still open

- `[713388, 713420)` binary constant
- `[713442, 713704)` binary / zeros
- `[713108, 713272)` length table (no boundary proof)

## Test plan

```sh
PYTHONDONTWRITEBYTECODE=1 python3.12 -B research/mayhem-current437-src-lib-rs-path-20261029/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python3.12 -B research/mayhem-current437-src-lib-rs-path-20261029/test_verify.py
PYTHONDONTWRITEBYTECODE=1 python3.12 -B scripts/verify_evidence.py
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=scripts python3.12 -B scripts/test_tooling.py
```

provider=OpenCode model=opencode/deepseek-v4.1-flash-free client=opencode CLI 1.19.5

Made via @slopdotcash
