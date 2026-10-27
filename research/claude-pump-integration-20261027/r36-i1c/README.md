# Main Pump Round36 + parallel lane recoveries (773/1035 repository builder, 778 with the original toolchain)

Research package composed on the maintained [Round36](../../../repro/pump/main-contract-round36-20261027/README.md) main-Pump source. It is not a maintained checkpoint and does not edit `programs/pump`. **Whole-ELF identity remains false.**

| | normalized | raw | unmatched | matched text bytes |
|---|---:|---:|---:|---:|
| Round36 as published (Codex pipeline, `f8235c43…`) | 738 | 145 | 297 | 900520 |
| Round36 primary, control build with this package's builder | 738 | 121 | 297 | 900520 |
| This package (`3aab117d…` / `502f592c…`) | **773** | **123** | 262 | **984488** |

Normalized gains vs the control build: `0x340`, `0xea68`, `0xf130`, `0x3b598`, `0x3b738`, `0x8cc58`, `0x95610`, `0xa23f0`, `0xca628`, `0xcf510`, `0xdd700`, `0x10a0e0`, `0x10b0b8`, `0x10c0b8`, `0x10d638`, `0x10e938`, `0x10fb38`, `0x1100f8`, `0x110d40`, `0x1113c8`, `0x112220`, `0x1133c8`, `0x113f00`, `0x114d48`, `0x116718`, `0x118360`, `0x119c50`, `0x1255a8`, `0x12a4e0`, `0x12abc8`, `0x137fc0`, `0x163ea8`, `0x184e38`, `0x18fc98`, `0x1905a8`. Raw gains: `0x17f948`, `0x186760`. Losses: **none**. Against the published Round36 inventory the package gains 35 normalized windows and loses 0. Raw counts depend on link order: the published round applies derived text/data-order linker scripts, while both builds here use the plain link.

The candidate ELFs are included. `source/programs/pump` is the complete compiled crate and `source.patch` is its exact diff against the base round's archived `primary` source. Both ELFs come from the repository builder (`scripts/pump_build_verified.py --workspace-layout --target-library-profile linux-v1.44-sbf --target-library-directory /Users/shawwalters/.cache/solana/v1.44-linux-probe/platform-tools/rust/lib/rustlib/sbf-solana-solana/lib`, v1.44 SDK, fresh target), and `control/` holds the same builder applied to the unchanged base primary source. `inventory.json.gz` uses the same window rule as the round inventories. The 44-suite captured-loader corpus passes against this exact candidate: 10,468 cases, 10,464 paired diagnostic logs, 0 mismatches (`regression-suites.json.gz`; 42 suites from one runner pass, two rerun individually after adding the `build-attempt.json` binding, all re-validated with the runner's own checks).

```sh
python research/claude-pump-integration-20261027/r36-i1c/verify.py
```

## Contributions

| lane | windows (vs control) | source change |
|---|---|---|
| pump-hi | `0xea68`, `0xf130`, `0xca628`, `0xcf510`, `0x10a0e0`, `0x10c0b8`, `0x10d638`, `0x10e938`, `0x10fb38`, `0x1100f8`, `0x110d40`, `0x1113c8`, `0x112220`, `0x1133c8`, `0x113f00`, `0x114d48`, `0x116718`, `0x118360`, `0x119c50`, `0x1255a8`, `0x12a4e0`, `0x12abc8`, `0x137fc0`, `0x163ea8`, `0x10b0b8` | Applied with that lane's tools/apply_lane_changes.py --with-cpi-7 on Round36 (changes already in Round36 are skipped by the tool): legacy buy takes `exact` as a const generic (one specialization per wrapper); SetMayhemVirtualParams accounts layout and the original set_mayhem_virtual_params handler; declare_program!(pump_amm) and declare_program!(pump_fees) from the official upstream IDLs with the generated cpi clients replacing hand-built CPIs (create_pool, init_boost, admin_cto_pool, collect_coin_creator_fee, transfer_creator_fees_to_pump_v2, admin_cto_sharing_config). Change 7 is applied WITHOUT its migrate_v2.rs edits: with the generated create_pool/init_boost clients inside migrate_v2::execute the frame exceeds the 4 KiB SBF limit ("Stack offset of 4104 exceeded max offset of 4096") and 482/827 migrate_v2 corpus cases fault; migrate.rs still instantiates both clients, so no window is lost. The collect_coin_creator_fee client builds its accounts inside the `if !frozen` block (0x10b0b8). That lane reports the 44-suite corpus passing for changes 1-6 on Round26 and corpus pending for change 7. |
| pump-mid | `0xdd700` | CurveHop bonding-curve constraint compares quote_mint.key()==bonding_curve.quote_mint (original memcmp operand order). |
| nearmiss | `0x340`, `0x3b598`, `0x3b738`, `0x8cc58` | Legacy buy binds the partial-fill clamp before require_gt! (constant-propagated (u64,i32) Error::with_values); legacy native-payment helpers become pub (external linkage blocks LLVM ArgumentPromotion); v2 ensure_rent_exempt keeps an unused leading argument, uses minimum_balance(0) and the shared exported transfer. |
| libinst | `0x95610`, `0x184e38`, `0x18fc98`, `0x1905a8` | MigrateV2 harvests withheld Token-2022 fees through a pub wrapper around anchor_spl::token_2022_extensions::harvest_withheld_tokens_to_mint instead of a hand-built instruction (links anchor_spl's harvest helper, spl-token-2022's builder and TransferFeeInstruction::pack). |
| nearmiss2 | `0xa23f0` | sync_virtual_quote_reserves computes the u128 numerator with checked_add(...).ok_or(Overflow)? before checked_mul, matching the original's separate Overflow returns. |

Lane `pump-hi` and `pump-mid` work comes from the parallel Claude session (branches `claude/pump-hi-20261027` at `e09aab510` and `claude/pump-mid-20261027` at `b975a696d`). The `nearmiss` and `libinst` lanes are this session's. Each change keeps the original's observable behaviour: the recovered windows are byte-equal (normalized) to the original's own functions, and the changed call paths are the ones the original executes (callers and callees were read from the original binary).

## Toolchain note

Built with the official Linux x86_64 platform-tools v1.44 target libraries for triple `sbpf-solana-solana` (the original's toolchain, see the separate toolchain-identity packet), this same source reaches **778 / 1,035**: the five std `TypeId` thunks `0xce50`, `0x188cc8`, `0x19a1a0`, `0x1a8e28`, `0x1ab9b8` also match. The packaged ELFs use the repository builder's `linux-v1.44-sbf` profile, which leaves those five unmatched.

## Runtime validity

The build log has no `Stack offset ... exceeded max offset` warning; every function fits the 4 KiB SBF frame. An earlier composite that kept the generated clients inside `migrate_v2::execute` was rejected for exactly that overflow.

