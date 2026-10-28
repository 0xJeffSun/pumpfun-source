"""Write pkg/commit-L36.txt and pkg/pr-L36.md from l36/runtime.json (run after the review)."""
import json
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
rt = json.loads((L / 'l36/runtime.json').read_text()); x = rt['extra']
commit = f"""research: main Pump layout composite L36 (1016/1035, 168 raw)

Package r37-layout-36 = L35 (#512) + fz-P-mig12-r3-01 (0x3fb70 v1
migrate::execute) + fz-P-crv2ab-r3-01 (0x1ac28 initialize_metadata) +
fz-P-cfee2-r2-01 (0x34558 distribute_fee_to_holders) + the fz-P-legacy-r2
legacy-sell behaviour correction (whitelist reload/sync after the token
transfer and in-place reserve updates as in the original; no window
gain). +3 normalized, 0 normalized and 0 raw losses; 293 raw with the
labelled generated link order (layout-run/). 44-suite captured-loader
corpus: {rt['cases']:,} cases, 0 mismatches; {x['commit_changes']}
Synthetic Source-line positioning is labelled in the README.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
"""
pr = f"""## Summary

Adds the research package `research/claude-pump-integration-20261027/r37-layout-36` = main-Pump layout composite **L36**:

| build | normalized | raw |
|---|---:|---:|
| L35 (#512) | 1013/1035 | 168 |
| **L36 source-only** (repository builder, `linux-v1.44-sbpf` profile; authenticated by `verify.py`) | **1016/1035** | **168** |
| L36 + generated link order (`layout-run/`, labelled layout layer per rule 4b, link-only replay) | 1016/1035 | 293 |

- L36 = L35 + fz-P-mig12-r3-01 (`0x3fb70` v1 `migrate::execute`) + fz-P-crv2ab-r3-01 (`0x1ac28` `initialize_metadata`) + fz-P-cfee2-r2-01 (`0x34558` `distribute_fee_to_holders`) + the fz-P-legacy-r2 legacy-sell **behaviour correction** (no window gain; legacy sell `0x152888` similarity .27 -> .93).
- +3 normalized windows vs L35: `0x3fb70`, `0x1ac28`, `0x34558`. **0 normalized and 0 raw losses**, no SBF stack-offset warnings. Raw-ready with the layout layer 994/1013 -> 997/1016. The repository builder reproduces the lane identity build (unstripped `a05ceaca`).
- Behaviour correction (fz-P-legacy-r2, composed at the coordinator's request after the runtime corpus): the legacy sell handler now reloads the whitelist quote token accounts and runs `sync_virtual_quote_reserves` after the token transfer, and it updates the curve reserves in place, as the original does. L35 lacked both.
- One merge conflict (`create_v2.rs` lines 100-101, raw-r2's usize literals vs crv2ab's call line). `tools/resolve_crv2ab.py` resolves it line-neutrally. Nothing dropped.
- **Synthetic Source-line positioning** is listed in the README (`buy.rs` grows 56 -> 300 lines with `// layout-pad` blocks for the ported legacy buy_exact_sol_in; the other inputs are line-neutral).

## Runtime evidence

- 44-suite captured-upgradeable-loader corpus (`full.json.gz`) on this exact candidate: **{rt['cases']:,} paired cases, 0 structured mismatches**.
- `runtime-review/`: ordered-log oracle review `{rt['verdict']}`, {rt['state_differences']} state differences. Non-filename log differences {x['nf35']} -> {x['nf36']}; filename-only {x['fo35']} -> {x['fo36']}.
- L35 corpus vs fresh L36: {x['pr_changes']}

## Still not equal

{x['unmatched']} normalized windows remain unmatched (listed in the README). The whole meaningful ELF is not byte-identical yet.

## Verification

`HOME=<empty> python3 -I -B research/claude-pump-integration-20261027/r37-layout-36/verify.py` -> rc=0.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
"""
(L / 'pkg/commit-L36.txt').write_text(commit); (L / 'pkg/pr-L36.md').write_text(pr)
print(commit)
