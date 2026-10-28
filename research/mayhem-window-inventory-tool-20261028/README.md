# Mayhem window inventory tool (28 Oct 2026)

A standalone way to partition all **441 inferred original Mayhem windows**
against **any** unstripped candidate build, so a fresh build can be measured
without copying a packet's hard-coded assertions.

It reuses the repository's existing matcher verbatim
(`research/mayhem-quotes-current-recovery-20261027/reader.py`): equal window
length, equal normalized instruction bytes and equal relocation pattern, where
normalization masks **only** pc-relative call immediates and type-8 relocated
`lddw` immediates. Every other byte must be identical. Original window bounds
come from `research/mayhem-trade-origins-validator/audit.json`.

Static evidence only. Nothing is executed or patched; a match does not prove
source identity, call/data closure or semantics.

## Calibration

The tool must reproduce the published 432-window inventory before any other
number from it is trusted:

```
.venv/bin/python research/mayhem-window-inventory-tool-20261028/window_inventory.py --calibrate
```

| published artifact (`builds/current/symbols.so.gz`) | raw-equal | normalized-only | unmatched |
| --- | ---: | ---: | ---: |
| expected (packet README) | 100 | 332 | 9 |
| reproduced by this tool | 100 | 332 | 9 |

Matched text 598,792 / 706,744 bytes, as published.

## Historical selected-source comparison (reported)

The author reported applying it to the older selected candidate
(`research/mayhem-v154-independent-reproduction-20261028`, stripped sha
`8dac1ff7…`; unstripped symbol build from the same run):

| candidate | raw-equal | normalized-only | unmatched | matched text |
| --- | ---: | ---: | ---: | ---: |
| research frontier (432-window packet) | 100 | 332 | 9 | 598,792 B (84.7%) |
| **selected `programs/mayhem` (v1.54, this build)** | **58** | **255** | **128** | **187,016 B (26.5%)** |

The table is historical; its selected-build outputs are not archived here. The
current [qualified436 checkpoint](../mayhem-current436-composition-20261027/README.md)
separately archives its source and validation. The older research recoveries
were developed outside `programs/mayhem`. The 128 unmatched windows include all six
trade bodies (Buy, Sell, BuyV2, SellV2, BuyPumpSwap, SellPumpSwap), Burn and the
large parser windows (O0124, O0127, O0134, O0136, …).

The reported 58 raw-equal count agreed with the older selected-build figure in
`docs/RECONSTRUCTION-STATUS.md` ("Mayhem selected … 58 exact local bytes"), so
the measurement is consistent with the existing status documents; the
normalized/unmatched split differs from that table only because the status
table additionally separates 245 windows the selected source ledger labels
opaque, whereas this tool compares every window structurally.

## Usage

```
# full inventory JSON + unmatched list for any unstripped build
.venv/bin/python research/mayhem-window-inventory-tool-20261028/window_inventory.py \
    path/to/unstripped.so --unmatched --out inventory.json
```

Accepts `.so` or `.so.gz`. Requires the candidate to retain its `.symtab`
(FUNC symbols give candidate function bounds; the original is stripped and uses
inferred bounds).
