# Integrated AMM reader and behavior recovery

This checkpoint integrates the work from three parallel investigations:

- Eight historical Pool payload readers and five GlobalConfig deserialization functions now match complete original function bodies and their actual direct callees under the retained normalization.
- FeeConfig decoding, allocation-size gates, creator-fee enable checks, and whitelist behavior follow the observed original behavior. Legacy whitelist waivers occur after initial fee computation; v2 waivers occur before fee selection; AMM multi-hop remains outside that waiver.
- Exact-quote buy calculates initial fees from the transfer-adjusted input and uses the original saturating fee-rate sum. Legacy sell preserves the observed fee, reserve-validation and subtraction order. Liquidity operations skip virtual-reserve adjustment when the original can-boost check returns false on overflow.

The candidate is `ae8ac382db78f9542a3366f7281e15cbc5a19107849797ae805291114c48ef77`, built from ordinary Rust source with the authenticated Linux v1.44 toolchain. It has **555/785 normalized original window matches**, **109 raw matches** and **230 unmatched windows**. Fourteen windows were gained relative to the previous maintained checkpoint; none were lost. The complete ELF still differs from the original.

The independent saved verifier checks:

| Scope | Recorded cases |
| --- | ---: |
| Maintained corpus, compared directly with the original | 17,462 |
| Account/fee/whitelist matrices | 1,281 |
| Trade fee, ordering and whitelist matrices | 273 |
| Buyback-recipient regressions | 72 |
| Controlled CPI return/balance boundaries | 91 |
| Liquidity overflow boundaries | 18 |

The corpus contains 35,074 signed executions, 35,418 signature fields, 17,537 identical message pairs and 15,567 top-level log pairs. Targeted matrices additionally verify their signed inputs and recorded outputs. Counts describe observations and may overlap in scenario coverage. Only compute lines and exact source coordinates are excluded; panic messages, error codes, compared values, events, CPI records and captured account effects remain checked. Cases without full captured logs retain that limitation.

```sh
work/test-env/bin/python -B repro/pump_amm/parallel-order-recovery-20261027/verify_saved.py --current-source
```

`results` preserves the exact source, build records, ELF files, test inputs/receipts and signature sidecars. The agent proof packages linked by the verifier remain independently inspectable. Original dispatch order is restored, but its generated entry body still differs in stack layout. Complete static-data/indirect-call identity, historical provenance, the remaining function windows and untested behavior remain open. This is not a completed reconstruction.
