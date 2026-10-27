# claude-amm2-layout-20261027 (layout lane)

Raw-byte matches and the path to whole-ELF identity for PumpSwap (`pump_amm`). Source-unchanged recipe layers
(linker input-section order), the whole-ELF scoreboard, and dependency/link-order evidence for the source lanes.

| gain | base | normalized / raw / unmatched | new raw windows | PR |
| --- | --- | --- | --- | --- |
| [g01-text-data-order-647](g01-text-data-order-647/README.md) | event-decoder-recovery `0881a95d…` 647/148/138 | 647 / **168** / 138 (Linux ×2 `b05f7268…`) | 20 (placement-only) | [#316](https://github.com/lalalune/pumpfun-source/pull/316) |
| [g02-text-data-order-651](g02-text-data-order-651/README.md) | optional-context-recovery `97bd5553…` 651/148/134 (main since 5f295723a) | 651 / **168** / 134 (Linux ×2 `ef65f2fe…`) | same 20 (placement-only) | [#316](https://github.com/lalalune/pumpfun-source/pull/316) |

Every layout packet is checked by its own `verify.py` (strict selector grammar, regeneration, byte-level
translation proof, two Linux builds, receipts, runtime digests) and `test_scope.py` (9 mutation controls).
The order is per-candidate: re-run `tools/build_linux.py` (default) → `tools/dataplan.py` →
`tools/build_linux.py --ordered` on every new source composition.

Tools (`tools/`):
- `elfdiff.py` — whole-ELF differ: every byte of the original ELF extent gets exactly one class by region
  (ELF/program headers, `.text` per window, `.rodata`, `.data.rel.ro`, `.dynamic`, `.dynsym`/`.dynstr`, `.rel.dyn`,
  section headers, alignment padding) and cause (in place / displaced-equal / operand-equivalent / unmatched /
  original-only / different target); window counts equal `repro/pump_amm/focused-diagnostics-20261026/measure.py`.
- `scoreboard.py` — per-region in place / layout-only / missing table from one or more elfdiff reports.
- `plan.py`, `dataplan.py`, `build_linux.py`, `relink.py`, `translation.py`, … — the layout generator and its
  evidence tools, copied from the older layout-amm lane (`research/claude-layout-amm-20261027`, PR #264).
