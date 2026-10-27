# Rejected initial strict-return trial

This isolated candidate (`49d275e6…`) recovered strict 16-byte decoding and panic
behavior, but was not promoted. Full-log comparison of a valid curve-sell return
found the original's numeric Left/Right lines missing. The later nonzero-return
matrix also identified destination arithmetic origins. Error/effect equality
alone did not establish acceptance. See `acceptance-failure.json` and the final
[combined recovery](../cpi-return-balance-recovery-20261026/README.md).

The earlier return-data comparison's description of the five residual cases as
source-coordinate differences was incomplete. Its corrected `strict-comparison-v2.json`
in the return-data package preserves the missing numeric lines explicitly.
