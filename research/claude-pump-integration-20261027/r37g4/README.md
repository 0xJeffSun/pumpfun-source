# Main Pump Round37 + parallel lane recoveries (785/1035 with the original toolchain)

Research package composed on the maintained [Round37](../../../repro/pump/main-contract-round37-20261027/README.md) main-Pump source. It is not a maintained checkpoint and does not edit `programs/pump`. **Whole-ELF identity remains false.**

| | normalized | raw | unmatched | matched text bytes |
|---|---:|---:|---:|---:|
| Round37 as published (Codex pipeline, `a05e9965…`) | 744 | 175 | 291 | 924192 |
| Round37 primary, control build with this package's builder | 744 | 121 | 291 | 924192 |
| This package (`37f5a5f2…` / `dc4abaca…`) | **780** | **147** | 255 | **1011144** |

Normalized gains vs the control build: `0x340`, `0xea68`, `0xf130`, `0x2a8e8`, `0x3b598`, `0x3b738`, `0x8cc58`, `0x95610`, `0xa23f0`, `0xca628`, `0xcf510`, `0xdd700`, `0x10a0e0`, `0x10b0b8`, `0x10c0b8`, `0x10d638`, `0x10e938`, `0x10fb38`, `0x1100f8`, `0x110d40`, `0x1113c8`, `0x112220`, `0x1133c8`, `0x113f00`, `0x114d48`, `0x116718`, `0x118360`, `0x119c50`, `0x1255a8`, `0x12a4e0`, `0x12abc8`, `0x137fc0`, `0x163ea8`, `0x184e38`, `0x18fc98`, `0x1905a8`. Raw gains: `0x17ddb0`, `0x17df20`, `0x17f948`, `0x186760`, `0x18e878`, `0x194998`, `0x194ae0`, `0x197508`, `0x1991e0`, `0x199ac0`, `0x199b70`, `0x19a758`, `0x19a8a0`, `0x19a9e0`, `0x19aff8`, `0x1a0f68`, `0x1a2330`, `0x1a2340`, `0x1a2fd8`, `0x1a6940`, `0x1a9150`, `0x1a9228`, `0x1a9250`, `0x1ab1f8`, `0x1ab220`, `0x1ab730`. Losses: **none**. Against the published Round37 inventory the package gains 36 normalized windows and loses 0. Raw counts depend on link order: the published round applies derived text/data-order linker scripts, while both builds here use the plain link.

The candidate ELFs are included. `source/programs/pump` is the complete compiled crate and `source.patch` is its exact diff against the base round's archived `primary` source. Both ELFs come from the repository builder (`scripts/pump_build_verified.py --workspace-layout --target-library-profile linux-v1.44-sbf --target-library-directory /Users/shawwalters/.cache/solana/v1.44-linux-probe/platform-tools/rust/lib/rustlib/sbf-solana-solana/lib`, v1.44 SDK, fresh target), and `control/` holds the same builder applied to the unchanged base primary source. The build log has no stack-offset warnings. `inventory.json.gz` uses the same window rule as the round inventories. The 44-suite captured-loader corpus passes against this exact candidate: 10,468 cases, 10,464 paired diagnostic logs, 0 mismatches (`full.json.gz`).

```sh
python research/claude-pump-integration-20261027/r37g4/verify.py
```

## Contributions

| lane | windows (vs control) | source change |
|---|---|---|
| pump-hi | `0xea68`, `0xf130`, `0xca628`, `0xcf510`, `0x10a0e0`, `0x10b0b8`, `0x10c0b8`, `0x10d638`, `0x10e938`, `0x10fb38`, `0x1100f8`, `0x110d40`, `0x1113c8`, `0x112220`, `0x1133c8`, `0x113f00`, `0x114d48`, `0x116718`, `0x118360`, `0x119c50`, `0x1255a8`, `0x12a4e0`, `0x12abc8`, `0x137fc0`, `0x163ea8` | Round37-aware tools/apply_lane_changes.py --with-cpi-7 --with-fee-8 (items already in Round37 are skipped; Round37's own idls/pump_fees.json and pump_fees client are kept): const-generic legacy buy, SetMayhemVirtualParams layout and handler, declare_program!(pump_amm) generated CPI clients (migrate_v2 keeps its hand-built CPIs to stay within the 4 KiB SBF frame), collect_coin_creator_fee client built inside `if !frozen`. That lane reports the 44-suite corpus passing for the equivalent Round36 H7 candidate. |
| pump-mid | `0xdd700` | CurveHop constraint compares quote_mint.key()==bonding_curve.quote_mint. |
| pump-lo | `0x2a8e8` | CollectCreatorFeeV2: exported creator-fee collector taking system_program as &AccountInfo (no argument promotion) and emitting the event by reference. That lane independently reproduced the nearmiss changes below (its p02-p04). |
| nearmiss | `0x340`, `0x3b598`, `0x3b738`, `0x8cc58` | require_gt! operand bound before the macro; exported native-payment helpers (external linkage blocks ArgumentPromotion); v2 rent helper keeps an unused leading argument and uses the shared transfer. |
| nearmiss2 | `0xa23f0` | u128 numerator via checked_add(..).ok_or(Overflow)? before checked_mul. |
| libinst | `0x95610`, `0x184e38`, `0x18fc98`, `0x1905a8` | MigrateV2 harvests withheld Token-2022 fees through a pub wrapper around anchor_spl::token_2022_extensions::harvest_withheld_tokens_to_mint. |
| hostid | (raw/order only) | Removes two constructs the original does not contain: runtime pubkey! base58 decoding in create_v2::execute (now consts on the existing MAYHEM_ID line) and u128 Display formatting from a require_gt! on a u128 operand in trade_v3.rs (narrowed with the file's narrow()). The library region then has exactly the original's function set and order: +29 raw windows, no normalized change. |

Lanes `pump-hi`, `pump-mid` and `pump-lo` are the parallel Claude session's (branches and commits above). `nearmiss`, `nearmiss2`, `libinst` and `hostid` are this session's workflow lanes. Every change keeps the original's observable behaviour: the recovered windows are byte-equal (normalized) to the original's own functions, and the changed call paths are the ones the original executes.

## Toolchain note

With the official Linux x86_64 v1.44 target libraries for `sbpf-solana-solana` (PR #307), this same source reaches **785 / 1,035 normalized and 164 raw**: the five std `TypeId` thunks also match. The packaged ELFs use the repository builder's `linux-v1.44-sbf` profile.

