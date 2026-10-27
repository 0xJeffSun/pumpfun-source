# AMM fee-selector structure and quote routing

This saved checkpoint restores the fee-account temporary lifetime across the selector call, borrowed fee-tier results, and the original three-key quote routing with compile-time mint constants. Candidate `19585a9f9a33509db77ec398109f49670542eea74c11fc671a6ac7375dc9140f` has **561/785 normalized original function windows**, **110 raw matches**, and **224 unmatched windows**. It gains the complete 888-byte v2 fee wrapper over the preceding checkpoint, with no lost matches.

The shared 544-byte fee-application body and 3,200-byte fee CPI helper remain matched. The tier helper now has the original 856-byte size and borrowed return shape; its source metadata remains different. The local selector is 1,760 bytes versus the original 1,656, so it is not counted as matched. `results/helper-comparison.json` records the exact boundaries and differences without relaxing normalization.

```sh
work/test-env/bin/python -B repro/pump_amm/fee-selector-structure-20261027/verify_saved.py --current-source
```

The saved verification covers 17,462 corpus cases; 1,281 account, fee and whitelist cases; 273 legacy trade cases; 1,996 trade boundary/routing cases; 72 buyback cases; 91 controlled CPI cases; and 18 liquidity cases. Counts describe recorded observations and can overlap in scenario coverage. The corpus contains 35,074 signed executions and 35,418 signature fields. The boundary/routing group contains 3,992 additional signed executions with identical paired messages.

The 20 new quote-route cases cover the native, second normal, stable, exotic and zero-key branches. The zero-key case deliberately constructs an artificial executable mint at the system-program key so the internal selector can be reached. It is not a deployable on-chain configuration. This edge case distinguishes the previous extra zero-key normal route from the original exotic route; the signed negative observation is preserved in `negative`.

All recorded output fields and captured logs are compared. Only compute lines and exact source coordinates are excluded. Cases without full captured logs retain that limitation. `results` binds source, authenticated Linux v1.44 build records, binary artifacts, receipts and signature sidecars.

The [previous fee checkpoint](../fee-selection-recovery-20261027/README.md) preserves the market-cap and shared-fee recovery evidence. Remaining selector/body differences, source metadata and historical provenance, complete static-data/indirect-call identity, and authentic successful fixed-administrator initialization remain unresolved. Whole-ELF equality is false; this is an intermediate reconstruction.
