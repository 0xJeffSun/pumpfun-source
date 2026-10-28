## Summary

Research package `research/claude-pump-integration-20261027/r37-layout-15`: main-Pump layout composite **L15** on Codex Round37.

- Parent: **L12** (`integ-layout-r37-12`, #401: 907/1035 normalized, 165 raw).
- L13 = L12 + the newest delivery of all 12 round-5 lanes (#416), composed into one crate: 962.
- L14 = L13 + the 3 windows only Codex Round46/47 matched (`0x43ea0` migrate::create_pool, `0x502f0` migrate_v2::create_pool, `0x68bd8` QuoteControl::validate_new_mint), ported line-neutrally: 965. Round47 matches nothing else beyond L14.
- L15 = L14 + four mega-run window-lane deliveries made on L13 (`0x60ee0` `0x806c8` `0x93050` `0x940c0` `0x3b8d8` `0x7e490` `0x6a1e0`): **972/1035 normalized, 165 raw** with the original toolchain (official Linux v1.44 `sbpf-solana-solana` target libraries; unstripped `f4f35346…`).
- Repository builder (`scripts/pump_build_verified.py --workspace-layout --target-library-profile linux-v1.44-sbf`): **967/1035, 147 raw**; the 5-window gap is the target-library TypeId functions, the same gap as #396/#401. Control build of Round37 primary with the same builder: 744 / 121.
- vs L12: +65 normalized windows, 0 normalized losses, 0 raw losses. No SBF stack-offset warnings.

## Synthetic layout (read the README first)

This is a layout composite like L12: `// layout-pad` blank-line blocks hold Source sites on the original lines. The README's contribution table marks each delivery that added or re-laid pad lines. `0x178e0` (buy_v2.rs:983) is a placement-only match (an existing error closure emitted on the original's line for a different op); it is labelled as synthetic.

## Composition notes

- Two lanes moved the Token-2022 `Fee` helpers into a separate crate independently; the package keeps one nested crate, `programs/pump/pump-token-ext` (relative path dependency). Because of it, the repository dependency cache (which refuses local path dependencies) was not used; the package was built from a fresh target.
- `0x857a8` (trade_v3.rs:997, round-5 coord lane) did not survive composition: its op was replaced by the original's `exact_input_tokens` helper (`0x834c8`).
- migrate_v2 now calls the generated `pump_amm::cpi::create_pool` client instead of hand-building the same instruction (identical account metas and Borsh data, checked against the IDL).

## Verification

The 44-suite captured-loader corpus passes against this exact candidate: 10,468 cases, 10,464 paired diagnostic logs, 0 mismatches (`full.json.gz`, `scripts/pump_validate_parallel.py --captured-loader`, 201 s). The packet verifier passes with an empty `HOME`.

```sh
python research/claude-pump-integration-20261027/r37-layout-15/verify.py
```

Not a promoted checkpoint; `programs/pump` is unchanged and whole-ELF identity remains false.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
