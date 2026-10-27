# Shared AMM trade-reader recovery

This checkpoint restores two source structures observed in the deployed AMM:

- The multi-hop token-amount reader uses explicit borrow and decoded-account bindings. Its complete 376-byte window at original `0x457c8` now matches under the retained normalization, as do the corresponding complete bodies of its three direct callees.
- Legacy buy and sell use a shared remaining-buyback-account reader. The reconstructed 1,376-byte body has the same instructions as original `0x37150` except four source-location constants. Its direct call to the recipient validator has the same position and relationship. The 2,320-byte validator continues to differ only in six source-location constants.

These changes use ordinary Rust source. They do not add bytecode, padding or forced compiler layout. The source-bound Linux v1.44 candidate is 1,250,008 bytes, SHA-256 `2a265136374a1220d0400f5584d7f000a4bee452bf7fcda7fde11a085bbba88c`. It has **540/785 normalized original window matches**, **113 raw matches** and **245 unmatched windows**. The token reader is the sole gained complete window; none were lost. Whole-ELF identity remains false.

The complete regression run passes 17,462 cases, 35,074 transactions and 35,418 signature fields. An additional 72 buyback-recipient cases and 91 controlled CPI cases pass full recorded effects/log comparisons, excluding only compute and exact source locations. The CPI cases include malformed fee/curve returns and both nonzero output and source-amount boundaries. Older suites retain their established log-coverage limits. The synthetic CPI dependency is identified in its original retained proof package and never deployed.

`results` binds the source, actual build record/log, both ELF files, complete regression receipts and transaction sidecars, and targeted receipts. `static_reader.py`, `static_buyback.py` and their JSON outputs reproduce the stated static checks. The [predecessor](../buyback-owner-validation-20261027/README.md) remains independently verifiable; the separately validated [token-reader-only trial](../token-amount-lifetime-20261027/README.md) is retained as intermediate evidence.

```sh
work/test-env/bin/python -B repro/pump_amm/shared-trade-readers-20261027/verify_saved.py --current-source
```

This is partial reconstruction. Referenced data, indirect/deeper call relationships, original source placement, complete binary identity and untested behavior remain open.
