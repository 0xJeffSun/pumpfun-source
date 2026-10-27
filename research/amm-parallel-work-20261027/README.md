# PumpSwap parallel research archive

This preserves completed source experiments, native build records, artifacts, measurements, and signed comparisons from the AMM reconstruction work. These are research records, including successful and negative trials; they are not the selected implementation. The current implementation and its acceptance proof are in `repro/pump_amm/structural-tlv-recovery-20261027`.

- `root-and-events/`: event/ABI, deposit borrow and capture trials, real workspace control, and structural composition. Its own portable verifier and compression map are included.
- `liquidity-and-workspace/`: dedicated deposit/withdraw modules, CFG comparisons, source-layout recipes and their boundary tests.
- `math-and-decoder/`: ceiling/floor and Pool helper work, decoder boundary experiments, and completed signed evidence.

The two compressed archives retain their internal manifests and instructions. `archives.json` pins each archive and internal manifest. `verify.py` authenticates all published bytes and archive members without extraction or code execution from the archives. Build caches, live targets, and incomplete preparation attempts are excluded; detailed omissions and scope statements remain in the individual packets. Counts overlap across experiments and must not be summed as unique coverage.

Run `python -B research/amm-parallel-work-20261027/verify.py`. This checks retained evidence; it does not rebuild or claim complete AMM identity.
