# Shared AMM fee selection and application

This saved checkpoint restores shared legacy/v2 fee application and the v2 market-cap check order. Candidate `a31d8655b5d812e47eb3ae4cf6215f981edacfefd500870c6bad985bb3b844b9` has **560/785 normalized original function windows**, **110 raw matches**, and **225 unmatched windows**. It gains three complete original bodies over the preceding checkpoint and loses none:

- The 544-byte shared fee-application helper at `0x14700`.
- The 3,200-byte generated fee CPI helper at `0xdade8`.
- The 600-byte fee CPI-context drop function at `0x98c0`.

The v2 selector calculates market cap before checking fee-account size, including for noncanonical pools. The previous reconstruction skipped the calculation for noncanonical pools. The new 48-case signed matrix exposes eight previous differences and passes on this candidate. The original whitelist exemption still bypasses the selector. Legacy exemption still follows initial fee computation.

```sh
work/test-env/bin/python -B repro/pump_amm/fee-selection-recovery-20261027/verify_saved.py --current-source
```

The saved verifier checks 17,462 corpus cases, 1,281 account/fee/whitelist cases, 273 legacy trade cases, 1,976 trade-boundary cases, 72 buyback cases, 91 controlled CPI cases and 18 liquidity cases. Counts are observations and can overlap in scenario coverage. The trade-boundary group includes the previous 1,928 cases and the new 48-case market-cap matrix. The corpus verifies 35,074 signed executions and 35,418 signature fields; the boundary group verifies another 3,952 executions with identical paired messages.

All recorded result fields and captured logs are compared. Only compute log lines and exact source coordinates are excluded. Cases without full captured logs retain that limitation. These are synthetic local replay results, not exhaustive runtime acceptance.

`results` preserves the exact source, real Linux v1.44 build, binaries, receipts, transaction sidecars and helper comparison. `negative` preserves the previous market-cap differences. The original selector and wrapper disassemblies are alongside this document. Function body matches do not by themselves establish direct-callee or data identity; the fee helper still has unresolved source metadata, and the remaining selector, wrapper and tier bodies remain under investigation.

The [previous curve checkpoint](../curve-arithmetic-recovery-20261027/README.md) preserves the preceding arithmetic evidence. Full ELF equality, the remaining function windows, complete static-data/indirect-call identity, historical source provenance and authentic successful fixed-administrator initialization remain unproved. This is an intermediate reconstruction.
