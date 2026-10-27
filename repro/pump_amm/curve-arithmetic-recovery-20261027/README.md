# Shared AMM curve arithmetic recovery

The AMM's ordinary buy instructions use ceiling division. When the reserve ratio divides exactly, the previously maintained implementation added one extra quote unit. Both the legacy and v2 original handlers call the same 1,192-byte quote helper at `0x119c8`; that helper calls the shared 1,672-byte ceiling-division helper at `0x12b08`. The 712-byte fee helper at `0x13190` also calls it.

This checkpoint reconstructs those shared operations in Rust, moves v2 curve computation before fee selection, and restores source-bearing overflow diagnostics for the final quote-plus-fees sum. It retains **557/785 normalized original windows**, **109 raw matches**, and **228 unmatched windows**. Complete ELF equality remains false.

Candidate: `36bd1a8bd989c5dbd6d1369d4ad6b7f99468204a720d848b3e4dbe9933c9f95c`.

The saved verifier checks 17,462 corpus cases, 1,281 account/fee/whitelist cases, 273 legacy trade cases, 1,928 trade boundary cases, 72 buyback cases, 91 controlled CPI cases and 18 liquidity cases. The boundary group includes a 1,536-case matrix across all six legacy and v2 buy/exact-quote/sell instructions, 64 focused rounding cases, and the preceding 328 v2 cases. Counts may overlap in scenario coverage.

```sh
work/test-env/bin/python -B repro/pump_amm/curve-arithmetic-recovery-20261027/verify_saved.py --current-source
```

Each signed pair uses identical transaction messages. All recorded fields and captured logs are compared, excluding compute lines and exact source coordinates. The maintained corpus contains 35,074 signed executions and 35,418 signature fields; the boundary group adds 3,856 executions. Cases lacking complete captured logs retain that limitation. The fixtures are synthetic local replay evidence, not exhaustive execution coverage.

`results` preserves the exact source, authenticated Linux v1.44 build, binaries, receipts and signature sidecars. The original helper disassemblies are beside this document. `intermediate-helper-comparison.json` records the preceding structural result: the fee and ceiling functions differ in source-location metadata, and the quote helper still differs in body layout. Those are open reconstruction gaps, not normalized-away successes.

The [previous v2 checkpoint](../v2-order-recovery-20261027/README.md) remains independently reproducible. The current work has not established complete static-data or indirect-call identity, historical source provenance, authentic successful fixed-administrator initialization, or whole-ELF identity. The reconstruction remains incomplete.
