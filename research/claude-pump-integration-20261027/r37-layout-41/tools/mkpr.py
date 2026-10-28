"""Write pkg/commit-L41.txt and pkg/pr-L41.md from l41/runtime.json."""
import json
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
rt = json.loads((L / 'l41/runtime.json').read_text()); x = rt['extra']
commit = f"""research: main Pump layout composite L41 (1019/1035, 168 raw)

Package r37-layout-41 = L40 (#564) + merged contributor PR #555
(research/pump-legacy-sell-boundary-20261028/source.patch, credit #555,
which also carries #539's checked accumulator constructor): +0x152888
legacy sell. 0 normalized and 0 raw losses; raw-ready unchanged with no
window lost (1005); 293 raw with the labelled generated link order
(layout-run/). 44-suite captured-loader corpus: {rt['cases']:,} cases,
0 mismatches, 0 state differences; {x['commit_changes']} Synthetic
Source-line positioning is labelled in the README.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
"""
pr = f"""## Summary

Adds the research package `research/claude-pump-integration-20261027/r37-layout-41` = main-Pump layout composite **L41**. It composes the merged contributor result **#555** (credit to #555, which also carries the checked accumulator constructor selection identified in #539) onto L40 (#564):

| build | normalized | raw | raw-ready (layout layer) |
|---|---:|---:|---:|
| L40 (#564) | 1018/1035 | 168 (293 with layout) | 1005/1018 |
| **L41 source-only** (repository builder, `linux-v1.44-sbpf` profile; authenticated by `verify.py`) | **1019/1035** | **168** | |
| L41 + generated link order (`layout-run/`, labelled layout layer per rule 4b, link-only replay) | 1019/1035 | 293 | 1005/1019 |

- Input: #555's `source.patch` (made on L38 #527), applied unchanged. It edits `lib.rs:1040` and `sell.rs` lines 19, 21 and 88 in place, and appends a 13-line `#[inline(always)] process_cashback` wrapper at the end of `sell.rs`.
- +1 normalized window vs L40: **`0x152888` legacy sell**. **0 normalized, 0 raw and 0 raw-ready losses**, no SBF stack-offset warnings. Every panic Location record still equals the original (369/369). The repository builder reproduces my identity build (unstripped `4e140892`).
- Overlap: L40's own `sell.rs` edits (fz-P-data-r1-03, the `process_cashback` data writes on lines 76/77) and #555's hunks are disjoint. The three-way merge is clean and both survive; the L40 -> L41 diff equals the contributor patch hunk for hunk.
- Behaviour: the wrapper only fixes argument evaluation order. The accumulator is now built with `Account::try_from` instead of `try_from_unchecked`. On both paths before that call the account already has the program owner and the discriminator (the create path writes it, and `check_existing` requires it), so the accepted and rejected accounts and the error codes are the same.

## Runtime evidence

- 44-suite captured-upgradeable-loader corpus (`full.json.gz`) on this exact candidate: **{rt['cases']:,} paired cases, 0 structured mismatches**.
- `runtime-review/`: ordered-log oracle review, {rt['state_differences']} state differences, {x['fam_text']}.
- L40 corpus vs fresh L41: {x['pr_changes']}

## Still not equal

{x['unmatched']} normalized windows remain unmatched (listed in the README). The whole meaningful ELF is not byte-identical yet.

## Verification

`HOME=<empty> python3 -I -B research/claude-pump-integration-20261027/r37-layout-41/verify.py` -> rc=0.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
"""
(L / 'pkg/commit-L41.txt').write_text(commit); (L / 'pkg/pr-L41.md').write_text(pr)
print(commit)
