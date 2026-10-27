# Shared typed token transfer recovery

Candidate `29026c9b9f85660676332a92398dc77124bc9d877070feb5fa89441fbfd15f3e` reconstructs the shared typed token-transfer helper. Its complete 2,400-byte body matches original window `0x727b8` under the unchanged normalization. The helper borrows the authority key rather than making the extra copy present in an earlier trial. Six legacy trade call sites now use the shared typed operation.

The checkpoint has **562/785 normalized original windows**, **110 raw matches**, and **223 unmatched windows**. It gains the transfer-helper body without losing any previous match. Whole-ELF equality remains false.

```sh
work/test-env/bin/python -B repro/pump_amm/typed-transfer-recovery-20261027/verify_saved.py --current-source
```

The independent saved verifier checks all 17,462 corpus cases, 1,281 account/fee/whitelist cases, 273 legacy trade cases, 1,996 trade boundary/routing cases, 72 buyback cases, 91 controlled CPI cases and 18 liquidity cases. It validates saved source/build hashes, signatures, paired messages and all recorded outputs. Only compute lines and exact source coordinates are excluded; cases without full captured logs retain that limitation. Some fixtures deliberately use artificial edge states, as documented in the [preceding checkpoint](../fee-selector-structure-20261027/README.md).

`results` preserves the frozen source, real Linux v1.44 build, binary and symbols, receipts and signature sidecars. `inspect_helpers.py` recomputes complete helper-body comparisons. The transfer helper's own body match does not prove all its called helpers, data or callers; the separate self-transfer helper still differs in source metadata.

The remaining original windows, complete direct/indirect call and static-data identity, historical source provenance, and authentic fixed-administrator initialization remain unresolved. This is an intermediate reconstruction.
