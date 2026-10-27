# PumpSwap v2 arithmetic and validation order

This saved AMM checkpoint is candidate `f650d1bf86ab1fd723c3fee858f138db0e9f219b86d163de22ea72b5d48f8f76`, built from the saved Rust source with the authenticated Linux v1.44 toolchain. It has **557/785 normalized original windows**, **109 raw matches**, and **228 unmatched windows**. It gains two complete liquidity wrapper bodies over the previous 555-window checkpoint and loses none. The complete ELF remains different.

This checkpoint restores v2 exact-quote buy's initial fee calculations on the transfer-adjusted input, the saturating u64 fee-rate sum followed by u128 denominator arithmetic, and the observed order of amount, buyback, reserve, fee-selection and slippage checks. V2 whitelist exemption still occurs before fee selection. Deposit and withdrawal specialize the shared liquidity implementation and reuse the recovered floor-ratio and ceiling-division helpers.

Independent verification covers:

| Scope | Recorded cases |
| --- | ---: |
| Maintained original-versus-candidate corpus | 17,462 |
| Account, fee and whitelist matrices | 1,281 |
| Legacy trade fee and validation order | 273 |
| New v2 fee and validation collisions | 328 |
| Buyback recipients | 72 |
| Controlled CPI return/balance boundaries | 91 |
| Liquidity overflow boundaries | 18 |

The corpus verifies 35,074 signed executions, 35,418 signature fields, 17,537 identical message pairs and 15,567 top-level log pairs. The new v2 cases verify another 656 signed executions with identical paired messages. Counts can overlap in scenario coverage. All captured result fields are compared; only compute log lines and exact source coordinates are excluded. Cases without full captured logs retain that limitation.

```sh
work/test-env/bin/python -B repro/pump_amm/v2-order-recovery-20261027/verify_saved.py --current-source
```

`results` binds the saved source, real build records, candidate ELF and symbols, runtime receipts and signed transactions. `closure.json` retains 501 original windows after requiring actual internal direct-call targets to remain paired; `literals.json` validates 590 bounded literal uses. These restricted checks do not establish complete data, indirect-call or external-provider identity.

The new probes and original negative observations are documented in [v2 fee boundaries](../v2-fee-boundaries-20261027/README.md). The [previous checkpoint](../parallel-order-recovery-20261027/README.md) preserves the earlier reader and legacy-trade evidence. Remaining function windows, complete ELF equality, historical source/build provenance and authentic fixed-administrator `create_config` success remain unresolved. This is an intermediate reconstruction.
