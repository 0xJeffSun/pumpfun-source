# Bounded AMM instruction decoding

All 1,342 signed local raw-instruction cases match the captured original: every published instruction discriminator with bounded zero/0xff/invalid-boolean payloads, short dispatch inputs and unknown discriminators. The 2,684 submissions use identical signed input pairs. Error, log, return-data and payer-lamport fields agree; only standard compute/source-coordinate normalization is applied.

No instruction accounts are supplied. This deliberately isolates dispatch and argument decoding; it does not validate complete account contexts or handler success. Payloads are at most 520 bytes. The candidate is the maintained `e3ba7033…` build. `verify.py` authenticates signatures, message/data/account-list equality, original/candidate program hashes, and every recorded output field.

```sh
work/test-env/bin/python -B repro/pump_amm/dispatch-shape-20261027/verify.py
```
