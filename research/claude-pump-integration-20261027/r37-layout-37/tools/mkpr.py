"""Write pkg/commit-L37.txt and pkg/pr-L37.md from l37/runtime.json."""
import json
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
rt = json.loads((L / 'l37/runtime.json').read_text()); x = rt['extra']
commit = f"""research: main Pump layout composite L37 (1017/1035, 168 raw)

Package r37-layout-37 = L36 (#519) + fz-P-hop-r2-01 (0x567d8
multi_hop_curve::execute) + the merged admin_cto collection-order patch
(#496: destination-ATA CPI before the Pump-side collection, as in the
original). +1 normalized, 0 normalized and 0 raw losses; 293 raw with
the labelled generated link order (layout-run/). 44-suite captured-loader
corpus: {rt['cases']:,} cases, 0 mismatches; non-filename ordered main-log
differences {x['nf36']} -> {x['nf37']}; the 6 changed log sequences vs L36 now equal
the original. Synthetic Source-line positioning is labelled in the README.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
"""
pr = f"""## Summary

Adds the research package `research/claude-pump-integration-20261027/r37-layout-37` = main-Pump layout composite **L37**:

| build | normalized | raw |
|---|---:|---:|
| L36 (#519) | 1016/1035 | 168 |
| **L37 source-only** (repository builder, `linux-v1.44-sbpf` profile; authenticated by `verify.py`) | **1017/1035** | **168** |
| L37 + generated link order (`layout-run/`, labelled layout layer per rule 4b, link-only replay) | 1017/1035 | 293 |

- L37 = L36 + fz-P-hop-r2-01 (`0x567d8` `multi_hop_curve::execute`) + the merged admin_cto collection-order patch from #496 (no window change).
- +1 normalized window vs L36: `0x567d8`. **0 normalized and 0 raw losses**, no SBF stack-offset warnings. The repository builder reproduces the lane identity build (unstripped `cf5f84d8`).
- #496 corrects CPI order toward the original in `admin_cto`'s creator collection. For a native quote mint with a nonempty AMM creator vault, the destination quote ATA is now created before the Pump-side collection, and the AMM vault frozen state is read once.
- Both inputs merged cleanly. hop-r2 adds no pads; its moved hop body and helpers follow the last Source site.

## Runtime evidence

- 44-suite captured-upgradeable-loader corpus (`full.json.gz`) on this exact candidate: **{rt['cases']:,} paired cases, 0 structured mismatches**.
- `runtime-review/`: ordered-log oracle review `{rt['verdict']}`, {rt['state_differences']} state differences. **Non-filename ordered main-log differences {x['nf36']} -> {x['nf37']}**; filename-only {x['fo36']} -> {x['fo37']}.
- L36 corpus vs fresh L37: {x['pr_changes']}

## Still not equal

{x['unmatched']} normalized windows remain unmatched (listed in the README). The whole meaningful ELF is not byte-identical yet.

## Verification

`HOME=<empty> python3 -I -B research/claude-pump-integration-20261027/r37-layout-37/verify.py` -> rc=0.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
"""
(L / 'pkg/commit-L37.txt').write_text(commit); (L / 'pkg/pr-L37.md').write_text(pr)
print(commit)
