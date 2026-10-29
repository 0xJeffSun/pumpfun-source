## Summary

Counts 17 static capacity/Display/bool-token strings (224 `.rodata` bytes), their 5 counted 16-byte descriptors (80 `.data.rel.ro` bytes), and 12 classic text sites on the qualified437 images. Each descriptor is `u32 low = 0`, `u32 high = pointer`, `u64 length` with one type-8 relocation at the record start (symbol index 0). Each text site is a relocated `.rodata` `lddw` followed at `pc + 16` by an immediate-length `mov`. All strings, descriptors and sites are checked on both images; the candidate pointers differ but the counted bytes and lengths match. Text sites are proof-only and add no payload credit.

These intervals were disjoint from the prior bounded-error-strings packet. The relation stays **437 normalized / 141 raw / 431 closed windows / 581 pairs** with **0 rejected pairs**. No binary middle table, digit table, `[...]` placeholder, NUL or adjacency bound is claimed, and no relocation-table bytes are credited.

Package: `research/mayhem-current437-capacity-display-bool-tokens-20261029/`.

Upstream review diff, against `lalalune/pumpfun-source` `main`:

https://github.com/lalalune/pumpfun-source/compare/main...harrywu666:pumpfun-source:opencode/mayhem-data-rodata-708538-20261029?expand=1

## Evidence

| Input | SHA-256 |
| --- | --- |
| `evidence/original/mayhem/deployed.so` | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |
| `research/mayhem-current437-composition-20261028/builds/first/symbols.so.gz` | `9c8c50857bfe8b80ebf08ebb50c905c6582676cb8e572d39f45de8647f62fbae` |
| `research/mayhem-current437-bounded-error-strings-20261029/coverage-delta.json` | `e7cae6dd26e406a43d34d428a5ea8ee87c8e2ec3d4fc852d183d06b98eaa722e` |

Payload coverage moves from **20,747** to **21,051 / 26,180** (80.41%), leaving **5,129 unproved**. `.rodata` moves from **14,035** to **14,259 / 18,396** (+224). `.data.rel.ro` moves from **6,712** to **6,792 / 7,784** (+80). The added `.rodata` union is `[708538, 708688) + [708716, 708724) + [708728, 708736) + [708748, 708752) + [708756, 708760) + [708768, 708772) + [708776, 708780) + [708792, 708834)`. The five descriptors union to four 16-byte spans totaling 80 bytes. The word `[708724, 708728)` stays open.

## Still open

- Leftover inside assigned gap `[708538,708840)`: `[708688,708716)` (false + padding), `[708724,708728)`, `[708736,708748)`, `[708752,708756)`, `[708760,708768)` (includes `true`), `[708772,708776)`, `[708780,708792)`, `[708834,708840)` — not claimed (no classic descriptor/text-site bound used here).
- Do not claim #779 `[709739,710331)` or #783 `[720036,720219)` (may still be open upstream).
- Remaining larger gaps elsewhere unchanged except this bite.

## Test plan

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-capacity-display-bool-tokens-20261029/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-capacity-display-bool-tokens-20261029/test_verify.py
```

Tests flip every selected string byte, every descriptor length and pointer field, and every text-site length immediate; each must be rejected. A following byte in an unselected hole is not absorbed. Inventory, symlink, FIFO, and resealed report and coverage edits are rejected.

provider=OpenCode model=opencode/deepseek-v4.1-flash-free client=opencode CLI 1.19.5

Made via @slopdotcash
