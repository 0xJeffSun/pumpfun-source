# Qualified437 `src/lib.rs` path-site remainder

This packet counts **1 static `.rodata` string totaling 10 bytes** (`src/lib.rs`) and proves **2 path/seed sites** as proof sites only. All checks run on both the original and candidate images. This packet adds data evidence, not a function match.

The prior obligations are preserved: **437 normalized functions, 141 raw functions, 431 closed windows and 581 candidate pairs**, with **0 rejected pairs**. No binary patch, no whole-binary equivalence, and no NUL or adjacency bound is claimed.

## Source

Only static bytes are read. The string is bounded by the path/seed grammar established in `research/mayhem-current437-option-seeds-paths-20261029/`: `lddw` of a relocated `.rodata` pointer, immediate `stxdw` of that register to the stack, and a store of the exact length to the adjacent eight-byte stack field within the next 12 instructions, before any branch or overwrite.

One documented tightening relative to that packet: relocation uniqueness is required through the closed pointer/length pair (up to and including the length store), not through the full 12-instruction search ceiling. A later independent relocated `lddw` (here the `#851` `BondingCurve` site) that falls inside that search ceiling is ignored once the pair is closed. NUL, the following byte, and adjacency are not bounds. No descriptor is claimed.

## Coverage

The baseline is the option-seeds-paths packet at **21,451 / 26,180** payload bytes (`.rodata` 14,627 / 18,396, `.data.rel.ro` 6,824 / 7,784).

These intervals were disjoint from that baseline. Payload coverage becomes **21,461 / 26,180 bytes (81.98%)**, leaving **4,719 unproved**. `.rodata` becomes **14,637 / 18,396** (+10). `.data.rel.ro` is unchanged. The added `.rodata` union is `[713420, 713430)`.

## Still open

Inside the assigned leftovers `[713388, 713430)` + `[713442, 713704)`:

- `[713388, 713420)` — 32-byte binary constant (ldxdw compare pattern only; no path/seed or classic length bound).
- `[713442, 713704)` — binary / zeros / crumb bytes; no attributable length bound.
- length table `[713108, 713272)` — still skipped (no boundary proof).

Do not reclaim OPEN #851 ranges `[713022,713108) + [713272,713383) + [713430,713442) + [713704,713808) + [713813,713819)`, or #783/#819/#823/#846/#852 / Codex `719929–723279` areas.

## Verification

```sh
PYTHONDONTWRITEBYTECODE=1 python3.12 -B research/mayhem-current437-src-lib-rs-path-20261029/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python3.12 -B research/mayhem-current437-src-lib-rs-path-20261029/test_verify.py
PYTHONDONTWRITEBYTECODE=1 python3.12 -B scripts/verify_evidence.py
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=scripts python3.12 -B scripts/test_tooling.py
```

Tests mutate every selected string byte and every path/seed length immediate; each mutation must be rejected. A following byte in an unselected hole is not absorbed. Inventory, symlink, FIFO, and resealed report and coverage edits are rejected.

## Exact intervals

Ends are exclusive.

### Strings

| # | Original interval | Length | Candidate pointer | Text |
| ---: | --- | ---: | ---: | --- |
| 1 | 713420–713430 | 10 | 693828 | `src/lib.rs` |

### Path / seed sites

| # | Original PC | Candidate PC | Pointer original → candidate | Length |
| ---: | ---: | ---: | --- | ---: |
| 1 | 541328 | 475008 | 713420 → 693828 | 10 |
| 2 | 584960 | 518640 | 713420 → 693828 | 10 |

provider=OpenCode model=opencode/deepseek-v4.1-flash-free client=opencode CLI 1.19.5

Made via @slopdotcash
