# Typed account decoder recovery

The maintained BondingCurve and SharingConfig decoders now follow the pinned
Anchor account generator's error construction: short discriminator and Borsh
errors use direct error conversion, while a mismatched discriminator attaches
the concrete account type name. The discriminator constants, field layouts and
account owners are unchanged.

The change restores two complete normalized original bodies: BondingCurve's
`try_deserialize_unchecked` at `0xd7320` (1,552 bytes), and SharingConfig's at
`0xda828` (1,472 bytes). The discriminator-checking front ends remain unmatched.
`evidence.json` retains the original BondingCurve window, discriminator evidence
and exact pinned generator source. This is instruction correspondence, not a
claim to have recovered the original source text or every callee/data reference.

## Verified checkpoint

- Candidate SHA-256: `7a4df315f49771e876b7759b5004ca16c2218c2451a5cf3624557d338f2dcf3f`.
- 538/785 normalized original windows, 116 raw matches, 247 unmatched.
- Two gained windows and no lost matches against the preceding checkpoint.
- All 25 maintained suites pass: 17,462 cases, 35,074 transactions and 35,418
  independently verified signature fields.
- All 285 earlier focused cases and 1,270 malformed optional-bool cases pass.
- All 91 controlled CPI cases retain full-output equality under the documented
  compute and exact source-coordinate exclusions.
- All 216 typed-account cases match complete recorded outputs, excluding only
  compute lines. Their 432 signed executions cover lengths through the complete
  layouts, incorrect discriminators and invalid bool/enum bytes.

The typed-account baseline already matched these public outputs: outer account
parsers decorate errors before returning them. The new probe supports absence
of regression; it does not manufacture a behavioral improvement. The gained
original instruction bodies supply the independent reason for the change.

`results` preserves all 31 compiled source inputs, the real build command/log,
stripped and unstripped artifacts, full-corpus observations, all focused probes
and the source-built synthetic CPI oracle. The fixed manifest binds every file.
The CTO checker keeps all non-decoder source byte-identical to its existing
reference; decoder changes are covered by their own complete-output matrix.

```sh
work/test-env/bin/python -B repro/pump_amm/typed-account-decoder-20261026/verify_saved.py --current-source
```

The saved verifier checks the predecessor chain, source/build identity, fresh
function matching and actual direct-call graph, signatures and every retained
behavior assertion. It does not rerun SBF. The inherited 3,191 trade cases retain
full-log comparisons; older suites without full logs keep their limitation.

## Remaining work

The candidate is 1,251,184 bytes versus the original complete ELF extent of
1,268,504. Whole-ELF equality is false, and the original's separate 9,217,211-byte
zero allocation suffix is not appended. The 247 unmatched windows, referenced
data and indirect calls, historical build/source provenance, and authentic
successful fixed-administrator `create_config` execution remain unresolved.

The return-wrapper shape experiment changed no instruction bytes and was not
promoted. Near-identical toggle bodies differ in source metadata; those facts do
not justify fabricated source positions. Perfect reconstruction remains open.
