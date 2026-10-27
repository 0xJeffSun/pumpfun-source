# AMM shared transfer callers

This checkpoint extends the recovered typed transfer to protocol-fee payout, creator-fee collection, pool creation and liquidity deposits. Candidate `ed597a4cfe397d5953b91f6ef506624ce75b637d17a9ca70edce8dec597f561c` retains **562/785 normalized original windows**, **110 raw matches**, and **223 unmatched windows**. No complete body matches were lost. The 2,400-byte transfer helper remains matched; 12 emitted call sites now use it. The original has 20 direct call sites; this count alone does not establish caller equivalence.

The creation body shrank from 15,232 to 12,448 bytes and the deposit body from 10,112 to 7,480 bytes. Those are structural diagnostics, not assertions that either body is identical to the original. The deposited-token transfers follow the original shared-call structure while the withdrawal path remains separately reconstructed.

```sh
work/test-env/bin/python -B repro/pump_amm/shared-transfer-callers-20261027/verify_saved.py --current-source
```

The saved verifier authenticates the Rust inputs, actual Linux v1.44 build, artifacts and transaction receipts. It checks all 17,462 corpus cases, 1,281 account/fee/whitelist cases, 273 legacy trade cases, 1,996 trade boundary/routing cases, 72 buyback cases, 91 controlled CPI cases and 18 liquidity cases. Counts are recorded observations and may overlap in coverage. All recorded fields and captured logs are compared except compute lines and exact source coordinates. Missing full logs and deliberately artificial edge states retain the limitations described in the [preceding helper checkpoint](../typed-transfer-recovery-20261027/README.md).

`results` preserves the complete evidence bundle; `inspect_helpers.py` recomputes helper body comparisons under unchanged normalization. Neither this matching helper nor the bounded runtime tests establish complete call/data identity or exhaustive behavior. The remaining original windows, historical source provenance, authentic fixed-administrator initialization and whole-ELF equality remain unresolved.
