# Optional-boolean decoder recovery

The maintained AMM source now formats the invalid optional-boolean byte as
`Invalid bool representation: {byte}`, preserving the original InvalidData
error and false-on-EOF behavior. Original instruction and string-table evidence
is retained in `original-evidence.json` and `original-evidence.md`.

This source correction restores the shared varying-kind `std::io::Error::new`
helper and eight other normalized original windows. One previously matched
528-byte error-helper specialization at `0x82e8` no longer matches. That loss
remains explicit and unresolved; it is not erased by the net improvement.
`delta.json` retains all nine gains and the one loss against the 512-window
[account-layout checkpoint](../structure-recovery-20261026/README.md).

## Verified results

- Actual source-derived candidate SHA-256:
  `293726b9b98c8cd010c9ac62e1ef9cd623e90b42449880713b3aab548b24920a`.
- 520/785 normalized original windows, 113 raw matches, 265 unmatched.
- All 25 maintained suites pass: 17,462 cases, 35,074 transactions and 35,418
  independently verified signature fields.
- All 285 prior focused cases pass on this same candidate.
- An additional 1,270 cases exhaust bytes 2 through 255 at all five optional-bool
  instruction positions: three in CreatePool and one in each legacy buy form.
  Their 2,540 signed transactions are retained and independently verified.
- Complete recorded outputs for those malformed instructions match the original
  except compute consumption. The inner `std::io` message is not exposed by the
  instruction wrapper, so this runtime result is not claimed as direct evidence
  for the formatted message. The recovered message is established statically.
- All recorded outputs and available log fields in the maintained corpus match
  the previous verified candidate after source-coordinate mapping and compute
  exclusion. The existing 3,191 complete-log trade comparisons remain covered;
  older suites without full logs retain that limitation.

`results` preserves all 30 compiled source inputs, actual compiler command and
log, stripped and unstripped outputs, complete runtime receipts, raw signed
transactions and focused probes. The fixed manifest binds every retained file.
`static-graph.json` records actual direct-call closure, with data and indirect-call
limitations kept explicit.

```sh
work/test-env/bin/python -B repro/pump_amm/option-bool-diagnostics-20261026/verify_saved.py --current-source
```

The verifier checks the preceding checkpoint, stable compiled-source identity,
fresh normalized-body measurement, the gained and lost windows, every retained
signature, full recorded behavior and the exhaustive malformed-byte matrix.
It verifies saved executions and does not rerun SBF.

## Remaining work

The candidate is 1,243,256 bytes; the original complete ELF extent is 1,268,504
bytes. Whole-ELF equality remains false. The original allocation's separate
9,217,211-byte zero suffix is not appended to the reconstructed output.

The 265 unmatched windows include the lost static-string error helper. Recursive
data and indirect-call identity, historical source/build provenance and authentic
successful fixed-administrator `create_config` execution remain open. This is a
validated partial recovery, not completion of the perfect-reconstruction goal.
