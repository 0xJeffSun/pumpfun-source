# amm2 lane `placement` — PumpSwap AMM source-coordinate placement

A systematic, re-runnable solver (`tools/`) that pairs every original Anchor error `Source` site (filename/line
immediates — they decide normalized window identity) and every `core::panic::Location` record with the candidate's,
then places the candidate source so that each paired site lands on the original line: whitespace only where order
allows, whole-fn moves among same-type impl blocks where it does not, with token-stream / permutation proofs.

`tools/solve.py --tree <root> --symbols <unstripped.so of that tree> --output <dir>` → `<dir>/placed`, `source.patch`,
`solve-report.json` (see the module docstrings). Run from a pumpfun-source checkout.

| gain | base | counts (Linux) | new windows | PR |
| --- | --- | --- | --- | --- |
| [g01-line-placement](g01-line-placement/) | event-decoder-recovery-20261027 (647/148/138) | 684 / 148 / 101 (+37, 0 lost), 418c2ea3… | 37 | [#315](https://github.com/lalalune/pumpfun-source/pull/315) |
| [g02-rebase-651-legacy-sell](g02-rebase-651-legacy-sell/) | optional-context-recovery-20261027 (651/148/134) | 693 / 148 / 92 (+42, 0 lost), 69979ad3… | 42 (supersedes g01) | [#315](https://github.com/lalalune/pumpfun-source/pull/315) |

`PROGRESS.md` has the continuation notes, residuals and negative controls.
