# Qualified437 ErrorCode Display counted strings

This packet checks **77 exact counted message intervals (3,568 bytes)** and their **77 corresponding 16-byte descriptors** selected by `ErrorCode::fmt`. Original owner O0286 is `[632880, 635432)`; its normalized candidate is `[566560, 569112)`. The shared call at original 635416 and candidate 569096 targets the matched `core::fmt::Formatter::write_fmt` wrapper at 616712 / 550392.

The prior ErrorCode-name obligations are preserved, along with the selected Source, code-pointer, selected32, writer48 and instruction-label obligations. The relation remains **437 normalized functions / 141 raw functions / 431 closed windows / 581 pairs**, with no new function matches or rejected pairs.

## Exact evidence boundary

The archived native `ErrorCode` enum supplies 77 explicit error messages. `anchor-syn` 1.0.0's error generator maps each variant to `write!(fmt, #msg)` and is authenticated against the qualified437 source archive's Cargo.lock. For every declared source discriminant, the verifier traces only the observed integer load, immediate branches, jumps and relocated descriptor-pointer load. Every branch-region instruction is visited across those 77 valid-tag paths. Invalid enum values remain outside this proof.

At the shared tail, the verifier requires the exact five observed stack stores: descriptor pointer at -48, count 1 at -40, pointer value 8 at -32, count 0 at -24, and zero at -16, relative to the incoming stack pointer. It also requires the exact formatter-word loads, stack argument address and matched direct call. This is a bounded observation of a one-piece, no-dynamic-argument formatter construction; it does not model generic formatting or callback behavior.

The verifier also follows the corresponding bounded path through the matched `core::fmt::write` body, original `[678096, 679096)` and candidate `[611776, 612776)`. The caller-established options pointer and dynamic-argument count are zero, while piece count is one. Its actual branches select piece index zero; the body loads the descriptor length at +8 and pointer at +0 and places them in r3 and r2 before the writer callback. The unresolved callback sites are original 679048 and candidate 612728. The verifier requires every instruction on that path, including both loads and the callback register. It stops before dispatch and makes no claim about the callback target or its effects.

Every selected descriptor has an observed relocated pointer word followed by an explicit 64-bit length. The pointer's low word must be zero; the high word supplies the actual string address. The descriptor relocation must have type 8 and the length field must have no relocation. Its 16-byte interval must be inside `.data.rel.ro`. The pointed-to length-delimited bytes must be in `.rodata`, contain no relocation, and match both the other image and the exact source message. All string intervals are nonoverlapping. Bounds come from the stored counts and observed one-piece construction, never NULs or adjacent objects.

The descriptor result separates **924 exactly compared scalar/zero bytes** from **308 pointer-correspondence bytes**; numeric pointer addresses may differ. The 1,232 bytes describe observed fields, not complete allocation extents. This packet does not claim heap behavior, formatting output at runtime, arbitrary dispatch equivalence, whole-data identity or whole-ELF identity.

## Coverage

This extends the published name-string coverage by **4,800 payload bytes**: 3,568 raw string bytes plus 924 raw descriptor-field bytes and 308 mapped pointer-field bytes. Original payload coverage becomes **12,910 / 26,180 bytes**, leaving **13,270 unproved**. `.rodata` has 7,302 / 18,396 covered bytes; `.data.rel.ro` has 5,608 / 7,784. The JSON keeps raw bytes and pointer correspondence separate. No relocation-table bytes are added to this delta.

The 3,472 message bytes within `[716457, 719929)` close that exact portion of the prior largest gap. The other 96 bytes are three explicit counted intervals elsewhere. Descriptor records cover `[729456, 730688)`. These are unions of measured fields and strings, not inferred allocations. Old proof packets and coverage ledgers remain unchanged.

## Verification

```sh
PYTHONDONTWRITEBYTECODE=1 python -B research/mayhem-current437-error-messages-20261028/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python -B research/mayhem-current437-error-messages-20261028/test_verify.py
```

Tests mutate the actual candidate string bytes, descriptor lengths, descriptor string pointers and code-side descriptor-selection pointers for all 77 source paths. Full-relation tests verify failure propagation for each kind; further tests reject altered piece/argument counts, nonzero pointer low words, wrong descriptor relocation types or symbol indices, unlisted files, symlinks, FIFOs, and resealed report/coverage tampering. Consumer-load and callback-register corruption controls check the additional path. A following-byte control checks the counted boundary.

## Original and candidate intervals

Addresses use each image's actual section mapping; interval ends are exclusive. Descriptor columns show original / candidate starts; the observed descriptor width is 16 bytes.

| Tag | Variant | Descriptor starts | Original message interval | Candidate message interval | Stored length |
| --- | --- | --- | --- | --- | --- |
| 3006 | `AccountNotMutable` | 730432 / 710872 | 708840–708872 | 689120–689152 | 32 |
| 2002 | `ConstraintSigner` | 729568 / 710008 | 709096–709128 | 689376–689408 | 32 |
| 2004 | `ConstraintOwner` | 729600 / 710040 | 709160–709192 | 689440–689472 | 32 |
| 100 | `InstructionMissing` | 729456 / 709896 | 716457–716495 | 696897–696935 | 38 |
| 101 | `InstructionFallbackNotFound` | 729472 / 709912 | 716495–716531 | 696935–696971 | 36 |
| 102 | `InstructionDidNotDeserialize` | 729488 / 709928 | 716531–716586 | 696971–697026 | 55 |
| 103 | `InstructionDidNotSerialize` | 729504 / 709944 | 716586–716639 | 697026–697079 | 53 |
| 1500 | `EventInstructionStub` | 729520 / 709960 | 716639–716691 | 697079–697131 | 52 |
| 2000 | `ConstraintMut` | 729536 / 709976 | 716691–716720 | 697131–697160 | 29 |
| 2001 | `ConstraintHasOne` | 729552 / 709992 | 716720–716753 | 697160–697193 | 33 |
| 2003 | `ConstraintRaw` | 729584 / 710024 | 716753–716782 | 697193–697222 | 29 |
| 2005 | `ConstraintRentExempt` | 729616 / 710056 | 716782–716822 | 697222–697262 | 40 |
| 2006 | `ConstraintSeeds` | 729632 / 710072 | 716822–716853 | 697262–697293 | 31 |
| 2007 | `ConstraintExecutable` | 729648 / 710088 | 716853–716890 | 697293–697330 | 37 |
| 2008 | `ConstraintState` | 729664 / 710104 | 716890–716948 | 697330–697388 | 58 |
| 2009 | `ConstraintAssociated` | 729680 / 710120 | 716948–716985 | 697388–697425 | 37 |
| 2010 | `ConstraintAssociatedInit` | 729696 / 710136 | 716985–717027 | 697425–697467 | 42 |
| 2011 | `ConstraintClose` | 729712 / 710152 | 717027–717058 | 697467–697498 | 31 |
| 2012 | `ConstraintAddress` | 729728 / 710168 | 717058–717092 | 697498–697532 | 34 |
| 2013 | `ConstraintZero` | 729744 / 710184 | 717092–717126 | 697532–697566 | 34 |
| 2014 | `ConstraintTokenMint` | 729760 / 710200 | 717126–717162 | 697566–697602 | 36 |
| 2015 | `ConstraintTokenOwner` | 729776 / 710216 | 717162–717199 | 697602–697639 | 37 |
| 2016 | `ConstraintMintMintAuthority` | 729792 / 710232 | 717199–717244 | 697639–697684 | 45 |
| 2017 | `ConstraintMintFreezeAuthority` | 729808 / 710248 | 717244–717291 | 697684–697731 | 47 |
| 2018 | `ConstraintMintDecimals` | 729824 / 710264 | 717291–717330 | 697731–697770 | 39 |
| 2019 | `ConstraintSpace` | 729840 / 710280 | 717330–717361 | 697770–697801 | 31 |
| 2020 | `ConstraintAccountIsNone` | 729856 / 710296 | 717361–717406 | 697801–697846 | 45 |
| 2021 | `ConstraintTokenTokenProgram` | 729872 / 710312 | 717406–717459 | 697846–697899 | 53 |
| 2022 | `ConstraintMintTokenProgram` | 729888 / 710328 | 717459–717503 | 697899–697943 | 44 |
| 2023 | `ConstraintAssociatedTokenTokenProgram` | 729904 / 710344 | 717503–717568 | 697943–698008 | 65 |
| 2024 | `ConstraintMintGroupPointerExtension` | 729920 / 710360 | 717568–717617 | 698008–698057 | 49 |
| 2025 | `ConstraintMintGroupPointerExtensionAuthority` | 729936 / 710376 | 717617–717676 | 698057–698116 | 59 |
| 2026 | `ConstraintMintGroupPointerExtensionGroupAddress` | 729952 / 710392 | 717676–717739 | 698116–698179 | 63 |
| 2027 | `ConstraintMintGroupMemberPointerExtension` | 729968 / 710408 | 717739–717795 | 698179–698235 | 56 |
| 2028 | `ConstraintMintGroupMemberPointerExtensionAuthority` | 729984 / 710424 | 717795–717861 | 698235–698301 | 66 |
| 2029 | `ConstraintMintGroupMemberPointerExtensionMemberAddress` | 730000 / 710440 | 717861–717931 | 698301–698371 | 70 |
| 2030 | `ConstraintMintMetadataPointerExtension` | 730016 / 710456 | 717931–717983 | 698371–698423 | 52 |
| 2031 | `ConstraintMintMetadataPointerExtensionAuthority` | 730032 / 710472 | 717983–718045 | 698423–698485 | 62 |
| 2032 | `ConstraintMintMetadataPointerExtensionMetadataAddress` | 730048 / 710488 | 718045–718114 | 698485–698554 | 69 |
| 2033 | `ConstraintMintCloseAuthorityExtension` | 730064 / 710504 | 718114–718155 | 698554–698595 | 41 |
| 2034 | `ConstraintMintCloseAuthorityExtensionAuthority` | 730080 / 710520 | 718155–718216 | 698595–698656 | 61 |
| 2035 | `ConstraintMintPermanentDelegateExtension` | 730096 / 710536 | 718216–718270 | 698656–698710 | 54 |
| 2036 | `ConstraintMintPermanentDelegateExtensionDelegate` | 730112 / 710552 | 718270–718333 | 698710–698773 | 63 |
| 2037 | `ConstraintMintTransferHookExtension` | 730128 / 710568 | 718333–718382 | 698773–698822 | 49 |
| 2038 | `ConstraintMintTransferHookExtensionAuthority` | 730144 / 710584 | 718382–718441 | 698822–698881 | 59 |
| 2039 | `ConstraintMintTransferHookExtensionProgramId` | 730160 / 710600 | 718441–718515 | 698881–698955 | 74 |
| 2040 | `ConstraintDuplicateMutableAccount` | 730176 / 710616 | 718515–718566 | 698955–699006 | 51 |
| 2041 | `AccountAlreadyMigrated` | 730192 / 710632 | 718566–718593 | 699006–699033 | 27 |
| 2042 | `AccountNotMigrated` | 730208 / 710648 | 718593–718632 | 699033–699072 | 39 |
| 2500 | `RequireViolated` | 730224 / 710664 | 718632–718665 | 699072–699105 | 33 |
| 2501 | `RequireEqViolated` | 730240 / 710680 | 718665–718701 | 699105–699141 | 36 |
| 2502 | `RequireKeysEqViolated` | 730256 / 710696 | 718701–718742 | 699141–699182 | 41 |
| 2503 | `RequireNeqViolated` | 730272 / 710712 | 718742–718779 | 699182–699219 | 37 |
| 2504 | `RequireKeysNeqViolated` | 730288 / 710728 | 718779–718821 | 699219–699261 | 42 |
| 2505 | `RequireGtViolated` | 730304 / 710744 | 718821–718857 | 699261–699297 | 36 |
| 2506 | `RequireGteViolated` | 730320 / 710760 | 718857–718894 | 699297–699334 | 37 |
| 3000 | `AccountDiscriminatorAlreadySet` | 730336 / 710776 | 718894–718951 | 699334–699391 | 57 |
| 3001 | `AccountDiscriminatorNotFound` | 730352 / 710792 | 718951–718992 | 699391–699432 | 41 |
| 3002 | `AccountDiscriminatorMismatch` | 730368 / 710808 | 718992–719045 | 699432–699485 | 53 |
| 3003 | `AccountDidNotDeserialize` | 730384 / 710824 | 719045–719078 | 699485–699518 | 33 |
| 3004 | `AccountDidNotSerialize` | 730400 / 710840 | 719078–719109 | 699518–699549 | 31 |
| 3005 | `AccountNotEnoughKeys` | 730416 / 710856 | 719109–719157 | 699549–699597 | 48 |
| 3007 | `AccountOwnedByWrongProgram` | 730448 / 710888 | 719157–719220 | 699597–699660 | 63 |
| 3008 | `InvalidProgramId` | 730464 / 710904 | 719220–719250 | 699660–699690 | 30 |
| 3009 | `InvalidProgramExecutable` | 730480 / 710920 | 719250–719283 | 699690–699723 | 33 |
| 3010 | `AccountNotSigner` | 730496 / 710936 | 719283–719313 | 699723–699753 | 30 |
| 3011 | `AccountNotSystemOwned` | 730512 / 710952 | 719313–719365 | 699753–699805 | 52 |
| 3012 | `AccountNotInitialized` | 730528 / 710968 | 719365–719424 | 699805–699864 | 59 |
| 3013 | `AccountNotProgramData` | 730544 / 710984 | 719424–719471 | 699864–699911 | 47 |
| 3014 | `AccountNotAssociatedTokenAccount` | 730560 / 711000 | 719471–719524 | 699911–699964 | 53 |
| 3015 | `AccountSysvarMismatch` | 730576 / 711016 | 719524–719579 | 699964–700019 | 55 |
| 3016 | `AccountReallocExceedsLimit` | 730592 / 711032 | 719579–719649 | 700019–700089 | 70 |
| 3017 | `AccountDuplicateReallocs` | 730608 / 711048 | 719649–719706 | 700089–700146 | 57 |
| 4100 | `DeclaredProgramIdMismatch` | 730624 / 711064 | 719706–719766 | 700146–700206 | 60 |
| 4101 | `TryingToInitPayerAsProgramAccount` | 730640 / 711080 | 719766–719837 | 700206–700277 | 71 |
| 4102 | `InvalidNumericConversion` | 730656 / 711096 | 719837–719868 | 700277–700308 | 31 |
| 5000 | `Deprecated` | 730672 / 711112 | 719868–719929 | 700308–700369 | 61 |
