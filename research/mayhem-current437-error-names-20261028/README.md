# Qualified437 ErrorCode name literal intervals

This packet checks **77 exact counted literal intervals, totaling 2,010 bytes**, read by the matched `anchor_lang::error::ErrorCode::name` function. Original owner O0284 is `[629224, 632296)`; candidate owner is `[562904, 565976)`. Their shared direct-call boundaries are original 632280 → 619672 and candidate 565960 → 553352. The candidate callee symbol is `alloc::slice::to_vec_in::ConvertVec::to_vec`.

The existing relation remains **437 normalized functions, 141 raw functions, 431 closed windows and 581 candidate pairs**. This adds data obligations and does not increase function counts. All 77 source tags reach the matching name bytes and the same counted length at the shared call boundary. Across those valid tags, every decoded instruction is visited except the final exit, whose placement immediately after that call is checked. Invalid enum tags are outside this proof.

The original and candidate image inputs are the immutable qualified437 pair. Native source context comes from `vendor/anchor-lang/src/error.rs` in its source archive, and `anchor-syn` 1.0.0's error code generator, authenticated against that archive's `Cargo.lock` checksum. The generator returns each variant identifier through `to_string()`; this proof stops at the observed helper call with its pointer/length inputs. It does not claim allocator behavior, returned String semantics or arbitrary dispatch equivalence.

The decoder admits only the observed `ldxw`, immediate signed comparisons, jumps, relocated `lddw`, immediate length moves, direct call and exit grammar. Both images must cover all paths for the 77 explicit source discriminants. The original/candidate pointer addresses may differ; bytes within the explicit lengths must be equal to each other and to the source variant name. No NUL or neighboring address is used to infer a length. All intervals are within `.rodata`, nonoverlapping and free of relocations.

Failure of any counted obligation removes its owner pair and propagates through the unchanged direct-call, relocated-code, selected32 and writer48 dependencies. The existing Source, prefix, writer and instruction-label obligations are recomputed first, using their unchanged readers.

## Coverage delta

Relative to the published coverage inventory hash `2d58c99cd57b1d17c4071f4695f96eb6ed1a718616f9a47a34dd61fb0aa58d55`, this adds 2,010 previously uncovered original `.rodata` bytes: 1,724 → 3,734 of 18,396. Of these, 1,914 lie in the prior largest gap `[713022, 725428)`. These are verified byte intervals, **not allocation extents**. The prior inventory is not edited; `coverage-delta.json` records this bounded union separately. Relocation-record coverage is not added to this delta.

## Validation

```sh
PYTHONDONTWRITEBYTECODE=1 python -B research/mayhem-current437-error-names-20261028/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python -B research/mayhem-current437-error-names-20261028/test_verify.py
```

Tests mutate actual candidate bytes for every one of the 77 string intervals, every pointer operand and every counted length operand. Full-relation controls verify byte/pointer rejection propagates and length corruption loses the normalized owner match. Additional controls reject unsupported instructions, unlisted files, symlinks, FIFOs and a modified report even after resealing. One following-byte control confirms a counted interval does not silently grow.

## Exact intervals

Addresses are original/candidate virtual addresses, with end exclusive. Both images use their actual section mapping for reads. Operand offsets are from their respective owner starts, and the length column is derived from the executed static path.

| Tag | Source variant | Original bytes | Candidate bytes | Length | Pointer / length instruction offsets |
| --- | --- | --- | --- | --- | --- |
| 3014 | `AccountNotAssociatedTokenAccount` | 709000–709032 | 689280–689312 | 32 | 1792 / 1808 |
| 2001 | `ConstraintHasOne` | 710440–710456 | 691152–691168 | 16 | 2336 / 2352 |
| 2002 | `ConstraintSigner` | 710456–710472 | 691168–691184 | 16 | 416 / 432 |
| 3010 | `AccountNotSigner` | 710616–710632 | 691328–691344 | 16 | 712 / 728 |
| 3008 | `InvalidProgramId` | 710696–710712 | 691408–691424 | 16 | 2464 / 2480 |
| 100 | `InstructionMissing` | 714543–714561 | 694983–695001 | 18 | 872 / 888 |
| 101 | `InstructionFallbackNotFound` | 714561–714588 | 695001–695028 | 27 | 2680 / 2696 |
| 102 | `InstructionDidNotDeserialize` | 714588–714616 | 695028–695056 | 28 | 1408 / 1424 |
| 103 | `InstructionDidNotSerialize` | 714616–714642 | 695056–695082 | 26 | 2744 / 2760 |
| 1500 | `EventInstructionStub` | 714642–714662 | 695082–695102 | 20 | 1528 / 1544 |
| 2000 | `ConstraintMut` | 714662–714675 | 695102–695115 | 13 | 2936 / 2952 |
| 2003 | `ConstraintRaw` | 714675–714688 | 695115–695128 | 13 | 2808 / 2824 |
| 2004 | `ConstraintOwner` | 714688–714703 | 695128–695143 | 15 | 1008 / 1024 |
| 2005 | `ConstraintRentExempt` | 714703–714723 | 695143–695163 | 20 | 2208 / 2224 |
| 2006 | `ConstraintSeeds` | 714723–714738 | 695163–695178 | 15 | 1640 / 1656 |
| 2007 | `ConstraintExecutable` | 714738–714758 | 695178–695198 | 20 | 144 / 160 |
| 2008 | `ConstraintState` | 714758–714773 | 695198–695213 | 15 | 1952 / 1968 |
| 2009 | `ConstraintAssociated` | 714773–714793 | 695213–695233 | 20 | 1088 / 1104 |
| 2010 | `ConstraintAssociatedInit` | 714793–714817 | 695233–695257 | 24 | 2272 / 2288 |
| 2011 | `ConstraintClose` | 714817–714832 | 695257–695272 | 15 | 1696 / 1712 |
| 2012 | `ConstraintAddress` | 714832–714849 | 695272–695289 | 17 | 600 / 616 |
| 2013 | `ConstraintZero` | 714849–714863 | 695289–695303 | 14 | 2016 / 2032 |
| 2014 | `ConstraintTokenMint` | 714863–714882 | 695303–695322 | 19 | 920 / 936 |
| 2015 | `ConstraintTokenOwner` | 714882–714902 | 695322–695342 | 20 | 2712 / 2728 |
| 2016 | `ConstraintMintMintAuthority` | 714902–714929 | 695342–695369 | 27 | 1448 / 1464 |
| 2017 | `ConstraintMintFreezeAuthority` | 714929–714958 | 695369–695398 | 29 | 2776 / 2792 |
| 2018 | `ConstraintMintDecimals` | 714958–714980 | 695398–695420 | 22 | 1568 / 1584 |
| 2019 | `ConstraintSpace` | 714980–714995 | 695420–695435 | 15 | 2968 / 2984 |
| 2020 | `ConstraintAccountIsNone` | 714995–715018 | 695435–695458 | 23 | 2368 / 2384 |
| 2021 | `ConstraintTokenTokenProgram` | 715018–715045 | 695458–695485 | 27 | 480 / 496 |
| 2022 | `ConstraintMintTokenProgram` | 715045–715071 | 695485–695511 | 26 | 2840 / 2856 |
| 2023 | `ConstraintAssociatedTokenTokenProgram` | 715071–715108 | 695511–695548 | 37 | 1048 / 1064 |
| 2024 | `ConstraintMintGroupPointerExtension` | 715108–715143 | 695548–695583 | 35 | 2240 / 2256 |
| 2025 | `ConstraintMintGroupPointerExtensionAuthority` | 715143–715187 | 695583–695627 | 44 | 1672 / 3048 |
| 2026 | `ConstraintMintGroupPointerExtensionGroupAddress` | 715187–715234 | 695627–695674 | 47 | 216 / 232 |
| 2027 | `ConstraintMintGroupMemberPointerExtension` | 715234–715275 | 695674–695715 | 41 | 1984 / 2000 |
| 2028 | `ConstraintMintGroupMemberPointerExtensionAuthority` | 715275–715325 | 695715–695765 | 50 | 1128 / 1144 |
| 2029 | `ConstraintMintGroupMemberPointerExtensionMemberAddress` | 715325–715379 | 695765–695819 | 54 | 2304 / 2320 |
| 2030 | `ConstraintMintMetadataPointerExtension` | 715379–715417 | 695819–695857 | 38 | 1728 / 1744 |
| 2031 | `ConstraintMintMetadataPointerExtensionAuthority` | 715417–715464 | 695857–695904 | 47 | 656 / 672 |
| 2032 | `ConstraintMintMetadataPointerExtensionMetadataAddress` | 715464–715517 | 695904–695957 | 53 | 2048 / 2064 |
| 2033 | `ConstraintMintCloseAuthorityExtension` | 715517–715554 | 695957–695994 | 37 | 968 / 984 |
| 2034 | `ConstraintMintCloseAuthorityExtensionAuthority` | 715554–715600 | 695994–696040 | 46 | 2872 / 2888 |
| 2035 | `ConstraintMintPermanentDelegateExtension` | 715600–715640 | 696040–696080 | 40 | 1488 / 1504 |
| 2036 | `ConstraintMintPermanentDelegateExtensionDelegate` | 715640–715688 | 696080–696128 | 48 | 2904 / 2920 |
| 2037 | `ConstraintMintTransferHookExtension` | 715688–715723 | 696128–696163 | 35 | 1608 / 1624 |
| 2038 | `ConstraintMintTransferHookExtensionAuthority` | 715723–715767 | 696163–696207 | 44 | 3032 / 3048 |
| 2039 | `ConstraintMintTransferHookExtensionProgramId` | 715767–715811 | 696207–696251 | 44 | 2656 / 3048 |
| 2040 | `ConstraintDuplicateMutableAccount` | 715811–715844 | 696251–696284 | 33 | 544 / 560 |
| 2041 | `AccountAlreadyMigrated` | 715844–715866 | 696284–696306 | 22 | 3000 / 3016 |
| 2042 | `AccountNotMigrated` | 715866–715884 | 696306–696324 | 18 | 1328 / 1344 |
| 2500 | `RequireViolated` | 715884–715899 | 696324–696339 | 15 | 2592 / 2608 |
| 2501 | `RequireEqViolated` | 715899–715916 | 696339–696356 | 17 | 1888 / 1904 |
| 2502 | `RequireKeysEqViolated` | 715916–715937 | 696356–696377 | 21 | 288 / 304 |
| 2503 | `RequireNeqViolated` | 715937–715955 | 696377–696395 | 18 | 2528 / 2544 |
| 2504 | `RequireKeysNeqViolated` | 715955–715977 | 696395–696417 | 22 | 1368 / 1384 |
| 2505 | `RequireGtViolated` | 715977–715994 | 696417–696434 | 17 | 2624 / 2640 |
| 2506 | `RequireGteViolated` | 715994–716012 | 696434–696452 | 18 | 1920 / 1936 |
| 3000 | `AccountDiscriminatorAlreadySet` | 716012–716042 | 696452–696482 | 30 | 824 / 840 |
| 3001 | `AccountDiscriminatorNotFound` | 716042–716070 | 696482–696510 | 28 | 2560 / 2576 |
| 3002 | `AccountDiscriminatorMismatch` | 716070–716098 | 696510–696538 | 28 | 1168 / 1184 |
| 3003 | `AccountDidNotDeserialize` | 716098–716122 | 696538–696562 | 24 | 2400 / 2416 |
| 3004 | `AccountDidNotSerialize` | 716122–716144 | 696562–696584 | 22 | 1760 / 1776 |
| 3005 | `AccountNotEnoughKeys` | 716144–716164 | 696584–696604 | 20 | 64 / 80 |
| 3006 | `AccountNotMutable` | 716164–716181 | 696604–696621 | 17 | 2080 / 2096 |
| 3007 | `AccountOwnedByWrongProgram` | 716181–716207 | 696621–696647 | 26 | 1248 / 1264 |
| 3009 | `InvalidProgramExecutable` | 716207–716231 | 696647–696671 | 24 | 1824 / 1840 |
| 3011 | `AccountNotSystemOwned` | 716231–716252 | 696671–696692 | 21 | 2144 / 2160 |
| 3012 | `AccountNotInitialized` | 716252–716273 | 696692–696713 | 21 | 1208 / 1224 |
| 3013 | `AccountNotProgramData` | 716273–716294 | 696713–696734 | 21 | 2432 / 2448 |
| 3015 | `AccountSysvarMismatch` | 716294–716315 | 696734–696755 | 21 | 352 / 368 |
| 3016 | `AccountReallocExceedsLimit` | 716315–716341 | 696755–696781 | 26 | 2112 / 2128 |
| 3017 | `AccountDuplicateReallocs` | 716341–716365 | 696781–696805 | 24 | 1288 / 1304 |
| 4100 | `DeclaredProgramIdMismatch` | 716365–716390 | 696805–696830 | 25 | 2496 / 2512 |
| 4101 | `TryingToInitPayerAsProgramAccount` | 716390–716423 | 696830–696863 | 33 | 1856 / 1872 |
| 4102 | `InvalidNumericConversion` | 716423–716447 | 696863–696887 | 24 | 768 / 784 |
| 5000 | `Deprecated` | 716447–716457 | 696887–696897 | 10 | 2176 / 2192 |
