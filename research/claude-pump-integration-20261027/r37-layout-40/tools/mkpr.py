"""Write pkg/commit-L40.txt and pkg/pr-L40.md from l40/runtime.json."""
import json
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
rt = json.loads((L / 'l40/runtime.json').read_text()); x = rt['extra']
commit = f"""research: main Pump layout composite L40 (1018/1035, data-side)

Package r37-layout-40 = L39 (#559) + fz-P-data-r1-03, a data-side
change with no window change (1018/1035 normalized, 168 raw, 293 raw
with the labelled generated link order). SellV3 and MultiHopCurve take
fee_config as the pump_fees IDL FeeConfig type the other trade handlers
use (candidate-only RouteFeeConfig removed; same owner, discriminator,
seeds and errors; the try_accounts windows are normalized-equal to the
original and now call the original's callee). Raw-ready with the layout
layer 1002 -> 1005/1018. 0 normalized and 0 raw losses. 44-suite
captured-loader corpus: {rt['cases']:,} cases, 0 mismatches, 0 state
differences; {x['commit_changes']} Synthetic Source-line positioning
is labelled in the README.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
"""
pr = f"""## Summary

Adds the research package `research/claude-pump-integration-20261027/r37-layout-40` = main-Pump layout composite **L40**. This is a **data-side change with no window change**:

| build | normalized | raw | raw-ready (layout layer) |
|---|---:|---:|---:|
| L39 (#559) | 1018/1035 | 168 (293 with layout) | 1002/1018 |
| **L40 source-only** (repository builder, `linux-v1.44-sbpf` profile; authenticated by `verify.py`) | **1018/1035** | **168** | |
| L40 + generated link order (`layout-run/`, labelled layout layer per rule 4b, link-only replay) | 1018/1035 | 293 | **1005/1018** |

- L40 = L39 + fz-P-data-r1-03 (made on L38, cumulative on fz-P-data-r1-02 = L39). The composed tree equals the delivery's tree, and the build reproduces its unstripped `30b72451`.
- **fee_config account type:** SellV3 and MultiHopCurve now take `fee_config` as `Box<Account<LegacyFeeConfig>>`. That is the `pump_fees` IDL type BuyV2, SellV2 and the legacy handlers already use. The candidate-only `RouteFeeConfig` wrapper is removed. This fixes the wrong call targets of `0x3cc8` and `0xdb958`.
- Also included: fz-P-srf-r3-02's `set_reserved_fee_recipients.rs` (`0x6fef8` becomes raw-ready) and the `process_cashback` data writes on the original lines (`sell.rs` 76:13, 77:13).
- Raw-ready 1002 -> 1005/1018 (`0x3cc8` `0x6fef8` `0xdb958`); none is lost. Every panic Location record still equals the original (368/368).
- **0 normalized and 0 raw losses**, no SBF stack-offset warnings. Line-neutral; the synthetic layout is labelled in the README.

## fee_config constraints vs the original

The account type change is the only item that touches account validation. The constraints are unchanged against the original (`runtime-review/feeconfig-check.md`):

- The owner is the same `pump_fees` program, `pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ`.
- The 8-byte discriminator is the same: `[143,52,146,187,219,123,76,155]`. `RouteFeeConfig` hard-coded it, and the IDL type carries it.
- The Borsh decode, the `seeds=[b"fee_config", program id]` / stored-bump / `seeds::program` constraint and the error codes are all the same.
- The windows that run these checks are normalized-equal to the original: `0xdb958` (MultiHopCurve) and `0x102578`/`0x105b78` (SellV3) `try_accounts`, `0x3cc8` `Box<T>::try_accounts`, and the `FeeConfig` deserializers `0x1156f0`/`0x1159d8`. `0x3cc8` and `0xdb958` now call the original's callee.

## Runtime evidence

- 44-suite captured-upgradeable-loader corpus (`full.json.gz`) on this exact candidate: **{rt['cases']:,} paired cases, 0 structured mismatches**.
- `runtime-review/`: ordered-log oracle review, {rt['state_differences']} state differences, **0 ordered main-log differences of any family**.
- L39 corpus vs fresh L40: {x['pr_changes']}

## Still not equal

{x['unmatched']} normalized windows remain unmatched (listed in the README). The whole meaningful ELF is not byte-identical yet.

## Verification

`HOME=<empty> python3 -I -B research/claude-pump-integration-20261027/r37-layout-40/verify.py` -> rc=0.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
"""
(L / 'pkg/commit-L40.txt').write_text(commit); (L / 'pkg/pr-L40.md').write_text(pr)
print(commit)
