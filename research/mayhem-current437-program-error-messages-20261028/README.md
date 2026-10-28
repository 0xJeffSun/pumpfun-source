# Qualified437 ProgramError Display counted literals

This packet verifies **25 exact static messages totaling 1,105 bytes** selected by `solana_program_error::ProgramError::fmt`. Original owner O0328 is `[664640, 665904)` and the normalized candidate is `[598320, 599584)`. The common `Formatter::write_str` calls are at 665888 / 599568, targeting 682144 / 615824.

The prior ErrorCode-name and ErrorCode-message obligations are preserved, along with the existing selected data checks. The relation remains **437 normalized functions, 141 raw functions, 431 closed windows and 581 candidate pairs**. This packet adds data evidence, not function matches.

## Source and bounded paths

The packaged `solana-program-error` 3.0.1 archive is checked against the qualified437 source archive's Cargo.lock checksum. Its native `ProgramError` enum has 26 variants; its Display implementation has 25 explicit `f.write_str` arms and one dynamic `Custom(num)` formatting arm. The proof checks the actual saved-image paths for observed tags 1–25 and associates each with its native arm's exact message. These tags describe the observed compiler layout and are not a stable Rust enum ABI claim.

The interpreter admits only the selected paths' enum-tag load, immediate comparisons, formatter-pointer move, relocated literal pointer, immediate length, jumps and shared direct writer call. Every static path must carry the original formatter argument, expected counted bytes and corresponding target into that call. The copied native messages, saved reports, helper sources, immutable image hashes and all prior packet inputs are bound by the strict inventory and input hashes.

The matched 48-byte `Formatter::write_str` helper loads formatter data and the callback table, while leaving r2 (string pointer) and r3 (length) unchanged. Its exact instructions and callback slot/register are checked. Observation stops before the unresolved writer calls at original 682176 / candidate 615856. No callback target, output, runtime, allocator or arbitrary-dispatch equivalence is claimed.

The `Custom` tag0 path is excluded. Its dynamic formatting instructions and referenced data are not counted. The full owner body remains matched by the existing normalized relation, while this new reader interprets only the 25 selected static paths. The saved path coverage records untraced instruction offsets; the shared final exit is checked without tracing execution after the writer call.

All literal intervals are bounded by the actual immediate lengths, lie inside `.rodata`, are nonoverlapping and contain no relocation. Neither NUL termination nor neighboring addresses determines their length. Pointer addresses may differ; the counted bytes must equal the counterpart and native source literal. A failed literal obligation removes its owner pair and propagates through the unchanged dependency relation.

## Coverage

This adds **1,105 raw-equal original payload bytes**: 1,097 bytes in `[720376, 721473)` plus the 8-byte `IO Error` interval `[707216, 707224)`. The first interval is the union of 24 individually counted strings, not an allocation-extent claim.

Total measured payload coverage becomes **14,015 / 26,180 bytes (53.5%)**, leaving **12,165 unproved bytes**. The ledger keeps exact bytes separate from prior mapped pointer fields. There is no increase to descriptor, relocation-table or whole-ELF identity claims. All prior packets remain unchanged, and this artifact remains bound to qualified437 even when newer program checkpoints exist.

## Verification

```sh
PYTHONDONTWRITEBYTECODE=1 python -B research/mayhem-current437-program-error-messages-20261028/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python -B research/mayhem-current437-program-error-messages-20261028/test_verify.py
```

Tests mutate actual image bytes, pointers and counts for all 25 selected literals; they also check owner/dependency rejection, normalized-body loss for count changes, the writer slot and callback register, the excluded Custom tag, the following-byte boundary, strict inventory, special files, resealed reports/coverage and native archive corruption.

## Exact intervals

Addresses use each image's actual section mapping; ends are exclusive. Pointer and count instruction offsets are relative to their respective owner starts.

| Observed tag | Native variant | Original interval | Candidate interval | Immediate count | Pointer / count offsets |
| --- | --- | --- | --- | --- | --- |
| 1 | `InvalidArgument` | 720376–720436 | 700816–700876 | 60 | 192 / 208 |
| 2 | `InvalidInstructionData` | 720436–720478 | 700876–700918 | 42 | 1128 / 1144 |
| 3 | `InvalidAccountData` | 720478–720516 | 700918–700956 | 38 | 872 / 888 |
| 4 | `AccountDataTooSmall` | 720516–720547 | 700956–700987 | 31 | 400 / 416 |
| 5 | `InsufficientFunds` | 720547–720609 | 700987–701049 | 62 | 1192 / 1208 |
| 6 | `IncorrectProgramId` | 720609–720657 | 701049–701097 | 48 | 560 / 576 |
| 7 | `MissingRequiredSignature` | 720657–720695 | 701097–701135 | 38 | 296 / 312 |
| 8 | `AccountAlreadyInitialized` | 720695–720777 | 701135–701217 | 82 | 936 / 952 |
| 9 | `UninitializedAccount` | 720777–720841 | 701217–701281 | 64 | 56 / 72 |
| 10 | `NotEnoughAccountKeys` | 720841–720889 | 701281–701329 | 48 | 1000 / 1016 |
| 11 | `AccountBorrowFailed` | 720889–720951 | 701329–701391 | 62 | 488 / 504 |
| 12 | `MaxSeedLengthExceeded` | 720951–721004 | 701391–701444 | 53 | 1064 / 1080 |
| 13 | `InvalidSeeds` | 721004–721051 | 701444–701491 | 47 | 840 / 856 |
| 14 | `BorshIoError` | 707216–707224 | 689576–689584 | 8 | 248 / 264 |
| 15 | `AccountNotRentExempt` | 721051–721109 | 701491–701549 | 58 | 1160 / 1176 |
| 16 | `UnsupportedSysvar` | 721109–721127 | 701549–701567 | 18 | 904 / 920 |
| 17 | `IllegalOwner` | 721127–721156 | 701567–701596 | 29 | 448 / 464 |
| 18 | `MaxAccountsDataAllocationsExceeded` | 721156–721226 | 701596–701666 | 70 | 1224 / 1240 |
| 19 | `InvalidRealloc` | 721226–721263 | 701666–701703 | 37 | 592 / 608 |
| 20 | `MaxInstructionTraceLengthExceeded` | 721263–721332 | 701703–701772 | 69 | 344 / 360 |
| 21 | `BuiltinProgramsMustConsumeComputeUnits` | 721332–721375 | 701772–701815 | 43 | 968 / 984 |
| 22 | `InvalidAccountOwner` | 721375–721396 | 701815–701836 | 21 | 128 / 144 |
| 23 | `ArithmeticOverflow` | 721396–721425 | 701836–701865 | 29 | 1032 / 1048 |
| 24 | `Immutable` | 721425–721445 | 701865–701885 | 20 | 528 / 544 |
| 25 | `IncorrectAuthority` | 721445–721473 | 701885–701913 | 28 | 1096 / 1112 |
