# Creator-fee transfer context recovery

This checkpoint restores the original ownership layout of both creator-fee
transfer account contexts. The mint and creator-vault token account are inline
`InterfaceAccount` values; creator, vault authority and receiving Pump vault are
owned `AccountInfo` values. Typed token/system/associated-token programs, the V2
payer and its destination token-account reference retain their prior types.

These changes follow the original parser's 48-byte account-info copies and
exit-field offsets, not trial selection alone. The original legacy context is
608 bytes; V2 is 624 bytes. The earlier isolated two-field unboxing failed to
recover complete functions and remains explicitly unpromoted. All isolated
source/build/offset evidence is retained in
[transfer-layout-20261026](../transfer-layout-20261026/README.md).

The correction is combined here with the already verified optional-bool source.
`source.patch` contains only the transfer-context edit. `delta.json` identifies
seven gained normalized original windows and no losses versus that checkpoint:
two drop bodies, two exits, V2 parser and both instruction wrappers. Two gains
also match their raw original instruction bytes. The legacy parser and both
business handlers remain unmatched.

## Verified results

- Candidate SHA-256: `d65a858e108f13c0981f5e8dda00ebda2c1addb9fd46a9ee2a9131d203e6cab2`.
- 527/785 normalized original windows, 115 raw matches, 258 unmatched.
- All 25 maintained suites: 17,462 cases, 35,074 transactions and 35,418 verified
  signature fields.
- All 285 prior focused cases and 1,270 malformed optional-bool cases pass.
- The optional-bool matrix retains another 2,540 independently verified signed
  transactions and full recorded output equality except compute consumption.
- Every recorded effect and available log field matches the preceding verified
  candidate after exact source-diff coordinate mapping and compute exclusion.
  The inherited 3,191 complete-log trade cases remain covered. Older suites
  without complete logs retain that limitation.

The fixed `results/manifest.json` binds the 30 compiled inputs, actual build
command and log, stripped/unstripped artifacts, all replay receipts and signed
transactions. `static-graph.json` checks actual direct-call targets, not merely
masked call operands. Recursive data and indirect-call identity remain unproved.

```sh
work/test-env/bin/python -B repro/pump_amm/transfer-layout-recovery-20261026/verify_saved.py --current-source
```

This checks saved execution evidence, the predecessor chain, fresh body matching,
source identity, all observed signatures and focused comparisons; it does not
rerun the SBF programs.

## Remaining gaps

The candidate is 1,247,504 bytes, versus the original complete ELF extent of
1,268,504. Whole-ELF equality remains false. The original allocation's separate
9,217,211-byte zero suffix is not copied into the reconstruction.

258 windows remain unmatched, including the previously lost static-string error
helper. Strict CPI return parsing now has separate original evidence: the fee
return expects exactly 24 bytes and the curve return exactly 16, with panic
behavior on absent or malformed returns. The current source's handling differs
and requires dedicated probes and recovery. Historical build/source provenance,
recursive data/indirect-call identity and authentic successful fixed-admin
`create_config` execution also remain open. Perfect reconstruction is incomplete.
