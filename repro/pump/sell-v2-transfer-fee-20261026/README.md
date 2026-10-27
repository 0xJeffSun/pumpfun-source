# Pump sell_v2 transfer-fee recovery

The captured program compares the user's net quote receipt against the requested
minimum. The previous reconstruction compared the gross transfer amount, always
emitted zero in the trailing transfer-fee field, and reported the gross buyback
transfer in its event. These were observable differences, not merely code-layout
differences.

The reconstructed Rust now uses the existing typed Token-2022 epoch-fee helper
for both the user's quote transfer and the buyback transfer. The user minimum
uses net receipt, the trailing event field records the user's withheld fee, and
the buyback event field records net receipt. Token transfers, reserves, and
accounting retain their gross amounts. Native and ordinary SPL-token routes have
zero transfer fees.

For the frozen fixture, gross user output is 13,804. A 100-bps quote mint withholds
139 and delivers 13,665. The original and corrected candidate accept minimum
13,665 and reject 13,666; the baseline incorrectly accepted both. For that same
mint the original reports net buyback 65 rather than gross 66.

The 25 targeted cases include native/SPL controls, zero/100/250/10,000-bps fees,
minimum boundaries, capped fees, cashback, and holder-reward flags. The baseline
differs in 17 cases; the corrected candidate matches all 25 in errors, account
state, events, inner instructions, and return data. The entire prior 184-case
sell_v2 suite also passes. The canonical suite now contains 206 cases: 22 added
cases plus 184 existing cases. The separate 25-case probe overlaps that suite;
these counts must not be added as unique coverage.

Both variants were built from frozen readable Rust with the explicit v1.44
research toolchain. The first two build wrappers were mistakenly given an
artifact name without `.so`: compilation succeeded and preserved matching input
manifests, but post-build report generation failed. Their original logs remain;
the baseline's recovered report explicitly records that distinction. The final
corrected build uses the proper name and the normal build/comparison helper.
This is not a claim of original compiler provenance. A separate fresh build
from `programs/pump` reproduces both the tested stripped and unstripped
artifacts exactly; its build/source records and identity hashes are in `current/`.

`source.patch` is the source delta. `baseline/` and `fixed2/` retain the source,
stripped/unstripped artifacts, and build records. Compressed receipts retain the
normally signed offline transactions. No transaction was sent to a public
network. The saved comparison excludes executable account bytes and does not
compare compute consumption. Original and rebuilt whole ELF bytes still differ.

Verify without executing the programs:

```sh
work/test-env/bin/python repro/pump/sell-v2-transfer-fee-20261026/verify.py
```

This resolves the evidenced sell_v2 fee counterexamples. It does not establish
all-input equivalence, full security acceptance, or byte-identical reconstruction.
