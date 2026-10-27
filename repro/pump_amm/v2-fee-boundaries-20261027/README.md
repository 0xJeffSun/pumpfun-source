# V2 fee arithmetic and validation-order probes

These signed probes exposed behavior gaps in the previously maintained 555-window AMM candidate. They use the captured original AMM and dependency programs in the local runtime. The [new checkpoint](../v2-order-recovery-20261027/README.md) passes all 328 cases in the boundary, transfer and expanded validation suites.

- `probe.py`: 72 cases cross six extreme fee configurations, three input amounts, whitelist status and creator presence. The old candidate differed in 11 cases.
- `probe_transfer.py`: four Token-2022 transfer-fee cases distinguish calculations on gross input from calculations on the amount remaining after transfer fees. The old candidate differed in one case.
- `probe_order.py`: 144 validation collisions; the arithmetic-only intermediate build still differed in 44 cases.
- `probe_validation_order.py`: 252 expanded collisions, including accrued-fee overflow, invalid buyback owner, cashback rejection, empty/short fee data, zero reserves and zero/max limits. The intermediate build differed in 69 cases. This overlaps the smaller order suite; mismatch counts are not additive.

The original exact-quote handler starts at `0x54a20`. `original-exact-front.asm` records the relevant disassembly: amount checks at instructions 43359–43362 precede the buyback validation call at 43393; transfer-adjusted input is returned by the call at 43661, checked for zero at 43666, then passed to the fee-selection wrapper at 43673. The wrapper reaches the shared fee-application helper. Runtime boundary cases independently distinguish the recovered arithmetic and failure precedence.

`negative` preserves the intermediate source and real build, previous failing receipts, signed sidecars and a complete hash manifest. The intermediate was never promoted. Recheck negative evidence with:

```sh
work/test-env/bin/python -B repro/pump_amm/v2-fee-boundaries-20261027/verify_negative.py
```

The new checkpoint's verifier checks the positive receipts and current source. Verification compares every recorded result field and captured log, except compute lines and exact source coordinates; it verifies transaction hashes, signatures, loaded program hashes and identical paired messages. This is bounded behavioral evidence, not exhaustive equivalence or complete ELF identity.
