## Summary

Counts 11 static instruction/Display/error strings (319 `.rodata` bytes), their 3 counted 16-byte descriptors (48 `.data.rel.ro` bytes), and 9 classic text sites on the qualified437 images. Each descriptor is `u32 low = 0`, `u32 high = pointer`, `u64 length` with one type-8 relocation at the record start (symbol index 0). Each text site is a relocated `.rodata` `lddw` followed at `pc + 16` by an immediate-length `mov`. All strings, descriptors and sites are checked on both images; the candidate pointers differ but the counted bytes and lengths match. Text sites are proof-only and add no payload credit.

These intervals were disjoint from the prior bounded-error-strings packet. The relation stays **437 normalized / 141 raw / 431 closed windows / 581 pairs** with **0 rejected pairs**. No length table, binary blob, digit table, `[...]` placeholder, NUL or adjacency bound is claimed, and no relocation-table bytes are credited.

Package: `research/mayhem-current437-instruction-display-alt-copy-20261029/`.

## Evidence

| Input | SHA-256 |
| --- | --- |
| `evidence/original/mayhem/deployed.so` | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |
| `research/mayhem-current437-composition-20261028/builds/first/symbols.so.gz` | `9c8c50857bfe8b80ebf08ebb50c905c6582676cb8e572d39f45de8647f62fbae` |
| `research/mayhem-current437-bounded-error-strings-20261029/coverage-delta.json` | `e7cae6dd26e406a43d34d428a5ea8ee87c8e2ec3d4fc852d183d06b98eaa722e` |

Payload coverage moves from **20,747** to **21,114 / 26,180** (80.65%), leaving **5,066 unproved**. `.rodata` moves from **14,035** to **14,354 / 18,396** (+319). `.data.rel.ro` moves from **6,712** to **6,760 / 7,784** (+48). The added `.rodata` union is `[713022,713108) + [713272,713383) + [713430,713442) + [713704,713808) + [713813,713819)`. The three descriptors union to three 16-byte spans totaling 48 bytes.

## Still open

Inside assigned gap `[713022,714341)`:

- `[713108,713272)` length table / padding — no boundary proof, left open.
- `[713388,713430)` binary / `src/lib.rs` region without a classic length bound.
- `[713442,713704)` mostly zeros / binary between `BondingCurve` and the `Unable to find` string.

Already covered by prior packets (not re-claimed): `[713383,713388)`, `[713808,713813)`, `[713819,714341)`. Do not claim #783 `[720036,720219)` / #819 / #823 occupied ranges, especially the `[708538,708840)` leftovers and the Codex `719929` area.

## Test plan

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-instruction-display-alt-copy-20261029/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-instruction-display-alt-copy-20261029/test_verify.py
```

Tests flip every selected string byte, every descriptor length and pointer field, and every text-site length immediate; each must be rejected. A following byte in an unselected hole is not absorbed. Inventory, symlink, FIFO, and resealed report and coverage edits are rejected.

provider=OpenCode model=opencode/deepseek-v4.1-flash-free client=opencode CLI 1.19.5

Made via @slopdotcash
