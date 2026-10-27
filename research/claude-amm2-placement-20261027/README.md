# amm2 lane `placement` — PumpSwap AMM source-coordinate placement

A systematic, re-runnable solver (`tools/`) that pairs every original Anchor error `Source` site (filename/line
immediates — they decide normalized window identity) and every `core::panic::Location` record with the candidate's,
then places the candidate source so that each paired site lands on the original line: whitespace only where order
allows, whole-fn moves among same-type impl blocks where it does not, with token-stream / permutation proofs.

`tools/solve.py --tree <root> --symbols <unstripped.so of that tree> --output <dir>` → `<dir>/placed`, `source.patch`,
`solve-report.json` (see the module docstrings). Run from a pumpfun-source checkout.

| gain | base | counts (Linux) | new windows | PR |
| --- | --- | --- | --- | --- |
| [g01-line-placement](g01-line-placement/) | event-decoder-recovery-20261027 (647/148/138) | G01_COUNTS | 37 | G01_PR |

`PROGRESS.md` has the continuation notes, residuals and negative controls.
