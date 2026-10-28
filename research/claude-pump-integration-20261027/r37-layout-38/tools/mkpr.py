"""Write pkg/commit-L38.txt and pkg/pr-L38.md from l38/runtime.json."""
import json
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
rt = json.loads((L / 'l38/runtime.json').read_text()); x = rt['extra']
commit = f"""research: main Pump layout composite L38 (1018/1035, 168 raw)

Package r37-layout-38 = L37 (#522) + fz-P-srf-r3-01 (0x6fef8
set_reserved_fee_recipients). +1 normalized, 0 normalized and 0 raw
losses; 293 raw with the labelled generated link order (layout-run/).
44-suite captured-loader corpus: {rt['cases']:,} cases, 0 mismatches;
{x['commit_changes']} Synthetic Source-line positioning is labelled in
the README.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
"""
pr = f"""## Summary

Adds the research package `research/claude-pump-integration-20261027/r37-layout-38` = main-Pump layout composite **L38**:

| build | normalized | raw |
|---|---:|---:|
| L37 (#522) | 1017/1035 | 168 |
| **L38 source-only** (repository builder, `linux-v1.44-sbpf` profile; authenticated by `verify.py`) | **1018/1035** | **168** |
| L38 + generated link order (`layout-run/`, labelled layout layer per rule 4b, link-only replay) | 1018/1035 | 293 |

- L38 = L37 + fz-P-srf-r3-01 (`0x6fef8` `set_reserved_fee_recipients`; the handler moves from `lib.rs:295` into `set_reserved_fee_recipients.rs`, and `lib.rs` delegates on the same line).
- +1 normalized window vs L37: `0x6fef8`. **0 normalized and 0 raw losses**, no SBF stack-offset warnings. The repository builder reproduces the lane identity build (unstripped `6cf9da7f`).
- Clean merge, no new `// layout-pad` lines.

## Runtime evidence

- 44-suite captured-upgradeable-loader corpus (`full.json.gz`) on this exact candidate: **{rt['cases']:,} paired cases, 0 structured mismatches**.
- `runtime-review/`: ordered-log oracle review `{rt['verdict']}`, {rt['state_differences']} state differences. Non-filename ordered main-log differences {x['nf37']} -> {x['nf38']}; filename-only {x['fo37']} -> {x['fo38']}.
- L37 corpus vs fresh L38: {x['pr_changes']}

## Still not equal

{x['unmatched']} normalized windows remain unmatched (listed in the README). The whole meaningful ELF is not byte-identical yet.

## Verification

`HOME=<empty> python3 -I -B research/claude-pump-integration-20261027/r37-layout-38/verify.py` -> rc=0.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
"""
(L / 'pkg/commit-L38.txt').write_text(commit); (L / 'pkg/pr-L38.md').write_text(pr)
print(commit)
