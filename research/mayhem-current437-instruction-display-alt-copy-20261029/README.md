# Qualified437 instruction/Display/error strings, descriptors and text sites

This packet counts **11 static literal strings totaling 319 `.rodata` bytes**, their **3 counted 16-byte descriptors totaling 48 `.data.rel.ro` bytes**, and **9 classic text sites** that load the pointer and length immediately before a call. All three kinds are checked on both the original and candidate images. This packet adds data evidence, not a function match.

The prior obligations are preserved: **437 normalized functions, 141 raw functions, 431 closed windows and 581 candidate pairs**, with **0 rejected pairs**. No binary patch and no whole-binary equivalence is claimed.

## Source

Only static bytes are read. Each string is bounded by the immediate length carried by its descriptor or its text site. A NUL byte, the following byte, and adjacent strings are not bounds. The length table at `[713112, 713272)` has no boundary proof and is left open. No binary middle table, no digit table and no `[...]` placeholder is claimed.

The 16-byte descriptors live in `.data.rel.ro`. The layout is `u32 low = 0`, `u32 high = pointer`, `u64 length`, with exactly one type-8 relocation at the record start whose symbol index is 0. Some records sit on the ≡0 (mod 16) phase; they are still valid 16-byte descriptors, verified by relocation-at-offset rather than section-base stride. The candidate copies carry different `.rodata` pointers but the same lengths and the same bytes.

The nine text sites decode the classic bounded pair grammar: `lddw` of a relocated `.rodata` pointer at `pc`, followed by a `mov` of the immediate length at `pc + 16`. There is no relocation on the continuation, the length `mov`, or the surrounding words. The pointed-to bytes must equal the counterpart and the recorded text. The sites stop at the immediate pair; no callee, callback target, output or runtime effect is claimed. Text sites are proof-only and add no payload credit.

## Coverage

The baseline is the prior bounded-error-strings packet at **20,747 / 26,180** payload bytes (`.rodata` 14,035 / 18,396, `.data.rel.ro` 6,712 / 7,784).

These intervals were disjoint from that baseline. Payload coverage becomes **21,114 / 26,180 bytes (80.65%)**, leaving **5,066 unproved**. `.rodata` becomes **14,354 / 18,396** (+319). `.data.rel.ro` becomes **6,760 / 7,784** (+48). The 11 string intervals union to five spans totaling 319 bytes. The 3 descriptor records union to three spans totaling 48 bytes. No relocation-table byte is credited.

The added `.rodata` union is `[713022,713108) + [713272,713383) + [713430,713442) + [713704,713808) + [713813,713819)`.

The added `.data.rel.ro` union is `[727856,727872) + [727984,728000) + [728696,728712)`.

## Still open

Inside assigned gap `[713022,714341)`:

- `[713108,713272)` length table / padding — no boundary proof, left open.
- `[713388,713430)` binary / `src/lib.rs` region without a classic length bound.
- `[713442,713704)` mostly zeros / binary between `BondingCurve` and the `Unable to find` string.

Already covered by prior packets (not re-claimed here): `[713383,713388)`, `[713808,713813)`, `[713819,714341)`.

Do not claim #783 `[720036,720219)` / #819 / #823 occupied ranges, especially the `[708538,708840)` leftovers and the Codex `719929` area.

Relocation and section layout are unchanged. None of the leftover binary or token content is claimed here.

## Verification

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-instruction-display-alt-copy-20261029/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-instruction-display-alt-copy-20261029/test_verify.py
```

Tests mutate every selected string byte, every descriptor length/pointer field and every text-site length immediate; each mutation must be rejected. A following byte in an unselected hole is not absorbed. Inventory, symlink, FIFO, and resealed report and coverage edits are rejected.

## Exact intervals

Ends are exclusive. String pointers and descriptor offsets are original addresses unless labelled candidate. All 3 descriptors are 16 bytes.

### Strings

| # | Original interval | Length | Candidate pointer | Text |
| ---: | --- | ---: | ---: | --- |
| 1 | 713022–713041 | 19 | 692192 | `Instruction: SellV2` |
| 2 | 713041–713059 | 18 | 692174 | `Instruction: BuyV2` |
| 3 | 713059–713084 | 25 | 692149 | `Instruction: SellPumpSwap` |
| 4 | 713084–713108 | 24 | 692125 | `Instruction: BuyPumpSwap` |
| 5 | 713272–713299 | 27 | 693712 | `failed to fill whole buffer` |
| 6 | 713299–713354 | 55 | 693739 | `a Display implementation returned an error unexpectedly` |
| 7 | 713354–713383 | 29 | 693794 | `Invalid bool representation: ` |
| 8 | 713430–713442 | 12 | 693838 | `BondingCurve` |
| 9 | 713704–713753 | 49 | 694144 | `Unable to find a viable program address bump seed` |
| 10 | 713753–713808 | 55 | 694193 | `a Display implementation returned an error unexpectedly` |
| 11 | 713813–713819 | 6 | 694253 | `Custom` |


### Descriptors

| # | Original offset | Candidate offset | Pointer original → candidate | Length |
| ---: | ---: | ---: | --- | ---: |
| 1 | 727856 | 708296 | 713272 → 693712 | 27 |
| 2 | 727984 | 708424 | 713354 → 693794 | 29 |
| 3 | 728696 | 709136 | 713704 → 694144 | 49 |

### Text sites

| # | Original PC | Candidate PC | Pointer original → candidate | Length | Length register |
| ---: | ---: | ---: | --- | ---: | ---: |
| 1 | 530272 | 463952 | 713022 → 692192 | 19 | r2 |
| 2 | 531104 | 464784 | 713041 → 692174 | 18 | r2 |
| 3 | 531936 | 465616 | 713059 → 692149 | 25 | r2 |
| 4 | 532768 | 466448 | 713084 → 692125 | 24 | r2 |
| 5 | 541512 | 475192 | 713299 → 693739 | 55 | r2 |
| 6 | 585144 | 518824 | 713299 → 693739 | 55 | r2 |
| 7 | 541432 | 475112 | 713430 → 693838 | 12 | r4 |
| 8 | 632792 | 566472 | 713753 → 694193 | 55 | r2 |
| 9 | 619208 | 552888 | 713813 → 694253 | 6 | r3 |

provider=OpenCode model=opencode/deepseek-v4.1-flash-free client=opencode CLI 1.19.5

Made via @slopdotcash
