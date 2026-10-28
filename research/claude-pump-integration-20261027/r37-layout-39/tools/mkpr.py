"""Write pkg/commit-L39.txt and pkg/pr-L39.md from l39/runtime.json."""
import json
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
rt = json.loads((L / 'l39/runtime.json').read_text()); x = rt['extra']
commit = f"""research: main Pump layout composite L39 (1018/1035, data-side)

Package r37-layout-39 = L38 (#527) + fz-P-data-r1-02, a data-side
change with no window change (1018/1035 normalized, 168 raw, 293 raw
with the labelled generated link order). Every panic Location record of
the matched windows now equals the original (368/368), raw-ready with
the layout layer goes 997 -> 1002/1018, and error/panic logs name the
original file and line. 0 normalized and 0 raw losses. 44-suite
captured-loader corpus: {rt['cases']:,} cases, 0 mismatches, 0 state
differences; ordered main-log differences 0 (filename-only {x['fo38']} -> {x['fo39']}); the
{x['changed']} changed log sequences vs L38 all equal the original. Synthetic
Source-line positioning is labelled in the README.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
"""
pr = f"""## Summary

Adds the research package `research/claude-pump-integration-20261027/r37-layout-39` = main-Pump layout composite **L39**. This is a **data-side change with no window change**:

| build | normalized | raw | raw-ready (layout layer) |
|---|---:|---:|---:|
| L38 (#527) | 1018/1035 | 168 (293 with layout) | 997/1018 |
| **L39 source-only** (repository builder, `linux-v1.44-sbpf` profile; authenticated by `verify.py`) | **1018/1035** | **168** | |
| L39 + generated link order (`layout-run/`, labelled layout layer per rule 4b, link-only replay) | 1018/1035 | 293 | **1002/1018** |

- L39 = L38 + fz-P-data-r1-02 (cumulative on fz-P-data-r1-01, made on L38). The composed tree equals the delivery's tree, and the build reproduces its unstripped `d83e9bcc`.
- The panic Location records of `0x18678`, `0x7bfd8`, `0x34558` and `0x567d8` move to the original line:column. Every Location record of the matched windows now equals the original (`locs.py` 368/368).
- Raw-ready goes 997 -> 1002 (`0x18678` `0x34558` `0x567d8` `0x7bfd8` `0x89ec8`); none is lost.
- Log-parity source placement: the v3 sell fee path goes through `v3_trade_fees`/`get_fees` and the hop body through `net_quote_for_budget`/`get_fees`/`apply_buy`/`apply_sell`, so their errors name the original file and line. The v3 sell sites sit on lines 1127/1148.
- Dead candidate-only helpers are replaced by blank lines (`.text` 13,080 B smaller).
- **0 normalized and 0 raw losses**, no SBF stack-offset warnings. Line-neutral; the synthetic layout is labelled in the README.

## Runtime evidence

- 44-suite captured-upgradeable-loader corpus (`full.json.gz`) on this exact candidate: **{rt['cases']:,} paired cases, 0 structured mismatches**.
- `runtime-review/`: ordered-log oracle review, {rt['state_differences']} state differences. **0 ordered main-log differences of any family** (L38: 0 non-filename, {x['fo38']} filename-only).
- L38 corpus vs fresh L39: {x['changed']} candidate log sequences changed, and **all {x['changed']} now equal the original exactly**.
- Across the corpus, {x['exact']:,} of 10,468 pairs have candidate logs identical to the original's. The other {x['coord']} differ only in one Source coordinate each, all in the still-unmatched `create_v2` and `admin_cto` handlers.

## Still not equal

{x['unmatched']} normalized windows remain unmatched (listed in the README). The whole meaningful ELF is not byte-identical yet.

## Verification

`HOME=<empty> python3 -I -B research/claude-pump-integration-20261027/r37-layout-39/verify.py` -> rc=0.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
"""
(L / 'pkg/commit-L39.txt').write_text(commit); (L / 'pkg/pr-L39.md').write_text(pr)
print(commit)
