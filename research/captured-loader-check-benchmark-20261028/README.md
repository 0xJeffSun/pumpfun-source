# Captured-loader byte checks

The captured Pump ProgramData allocation is 10,485,760 bytes. The loader previously fetched its data repeatedly and scanned the zero tail with Python `any()` for every case. This change reads each loaded account's bytes once, compares its tail with zero bytes in native code, and retains at most two immutable expected images for the usual original/candidate pair.

Every actual VM load still checks the complete ProgramData bytes, header, owner, executable program account, ELF prefix, and allocation tail. Receipts still hash the actual loaded account. Both programs continue to load through their captured upgradeable accounts.

`RESULT.json` records three alternating local runs of eight fresh VM loads. The median fell from **1.125 s to 0.514 s (2.19×)**. All 24 load receipts match the baseline field for field. This measures local account loading; it does not promise the same gain for an entire runtime suite or recover another function window.

Validation:

- Four integration tests cover real ELF cache separation/reuse, the two-image bound, oversized input rejection, and detection of a corrupted nonzero tail after a cache hit.
- The unchanged signed two-case claim-panic fixture produces identical original/candidate results and all four identical loaded-account receipts with the maintained optimized loader.

Run the tests with `python3 -B -m unittest discover -s tests -p test_pump_captured_loader.py -v`. To repeat the benchmark against two checkouts, run `python3 -B research/captured-loader-check-benchmark-20261028/benchmark.py --baseline OLD_CHECKOUT --candidate NEW_CHECKOUT --output result.json`.
