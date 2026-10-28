# Independent L36 reserved-recipient proof (superseded by L38)

This historical research packet independently recovers the 9,176-byte Pump setter window at `0x6fef8` on frozen L36 (PR #519, commit `b6c39cf4`). Its native Linux control has **1016/1035 normalized, 166 raw** windows; this candidate has **1017 normalized, 166 raw**, with **zero normalized or raw losses**. Open PR #527's L38 already includes this recovery. **This packet claims no new frontier census gain. Whole-ELF identity remains false.**

The recipe comes from the exact AMM union10 setter in PR #525. The parallel AMM worker established that the original AMM and Pump windows share 1,130 of 1,147 instructions in place; the other 17 encode program-specific field offsets, errors and filename lengths. The source retains the entire recipient array through validation, maps the infallible eight-key conversion's error to `AccountNotEnoughKeys`, and uses a block-scoped iterator with `while let Some(...)`. The global recipient fields are assigned afterward, with `copy_from_slice` for the seven secondary keys. Rent is fetched once; validation uses fallible account-data length and the original owned-string error path.

Only `lib.rs` and `set_reserved_fee_recipients.rs` change. The public handler delegates to the real module implementation; the compiler elides the wrapper from the dispatcher's call path. All **66 outgoing direct call sites** lead to complete normalized-original matched callees. The complete matched dispatcher at original `0x125ae8` calls the gained implementation at offset 632 (`calls.json`). The complete 1035-window census is retained for both native builds.

The packet includes exact compiled candidate/control workspaces, unchanged compiler input receipts, SDK/target-library/tool hashes, both native ELFs, their full inventories, and the published frozen L36 source-hash receipt. Every unchanged original L36 Rust input is checked against that receipt. `source.patch` is the exact two-file source diff against the native L36 control. Both local path crates were freshly compiled with v1.44 `sbpf-solana-solana`, the physical source wrapper, `--locked --offline`, and `-Zremap-cwd-prefix=`. Only one private target was used; shared seeds, SDK and registry sources were not modified.

**Synthetic Source positioning is inherited and disclosed.** The actual remaining-account count and nonzero-recipient validations retain original Source lines 40 and 60. `update_buyback_config` remains at line 109 and the `lib.rs` wrapper is line-neutral. No other operation is placed at those error sites.

The focused captured-upgradeable-loader authority/recipient suite passes **59 signed offline cases with zero mismatches**, comparing errors, full global state, balances, raw events and CPI instructions. It covers recipient counts, duplicate/zero/executable/data/owner/rent cases and authority failures. This packet does not duplicate or claim L38's published 44-suite replay.

```sh
python research/pump-l36-reserved-recipients-20261028/verify.py
```

The verifier checks the complete source and artifact bindings, exact source diff, native control cohort, all 1035 windows, gain/loss sets, every direct callee, actual dispatcher routing, and focused runtime/loader receipts. It does not rebuild or claim whole-ELF identity. `tools/recorded-build.py` is the exact invoked driver; reproduction requires substituting its recorded absolute session paths with equivalent private paths and retaining a fresh same-toolchain control.

Credit: AMM union10 PR #525 for the shared recovered source; `amm_final_five` for identifying the common original body and supplying the exact recipe. This independent adaptation and Linux proof uses L36 rather than the newer L38 frontier.
