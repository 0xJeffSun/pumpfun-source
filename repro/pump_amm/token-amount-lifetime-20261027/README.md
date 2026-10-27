# Token-amount reader lifetime recovery

The original multi-hop token-amount reader at `0x457c8` reuses stack storage for its initial borrow result and decoder output. The reconstruction used an expression temporary, producing 19 differing stack-offset instructions despite making the same calls. Binding the borrowed data and decoded account explicitly restores the complete 376-byte normalized window. The retained matcher also confirms corresponding complete bodies for all three direct callees: account-data borrowing, token-interface decoding, and program-error conversion. Referenced data and deeper call closure remain separate obligations.

This real Linux v1.44 source build reaches **540/785 normalized original windows**, with **113 raw matches** and **245 unmatched windows**. It gains the token-amount window and loses none. The 1,251,448-byte candidate SHA-256 is `7b1540ae05739f2a09662f7067bc008f543c13a58901ec3e46da1ca02d6a833e`. It does not equal the original ELF.

Validation includes 17,462 maintained cases (35,074 transactions; 35,418 verified signature fields), all 72 buyback-recipient regressions, and 91 controlled CPI cases covering malformed fee/curve returns, nonzero curve outputs and source-amount boundaries. Recorded fields and logs match under the documented compute/source-location exclusions. Older corpus log-coverage limitations remain inherited. Synthetic CPI dependencies are clearly identified and used only in the local harness.

`source.patch` records the three-line lifetime recovery. `results` binds the source, actual build record/log, ELF files, full regression observations, signed transaction sidecars and focused observations. `reader-identity.json` and `static_reader.py` retain/recompute the reader and direct-callee checks. The [previous checkpoint](../buyback-owner-validation-20261027/README.md) remains independently verifiable.

```sh
work/test-env/bin/python -B repro/pump_amm/token-amount-lifetime-20261027/verify_saved.py --current-source
```

This token-reader-only trial was not promoted independently. The combined [shared trade-reader checkpoint](../shared-trade-readers-20261027/README.md) includes this recovery and the remaining-buyback-account helper.
