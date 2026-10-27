# Validated Linux v1.44 AMM build

The official Linux x86_64 v1.44 distribution now builds the current maintained
AMM source and passes the same runtime checks as the Darwin build. It restores
the original's Linux standard-library source prefix but does not establish
whole-ELF identity or unique historical build provenance.

## Controlled comparison

The first Linux build freezes the typed-account source checkpoint (538 matched
windows). All 31 source inputs are byte-identical to that Darwin checkpoint.
Only the compiler distribution changes; Cargo.lock, release flags and the v1.52
strip tool are held fixed. Both have 538 normalized matches. Darwin has 116 raw
matches; Linux has 113. The Linux ELF is 8 bytes shorter. Full text and data bytes
differ, so equal match counts must not be read as equal executables.

`control/` retains both Linux outputs, source, actual command/log and measurement.
`control-comparison.json` and `raw-window-changes.json` retain the differences.
The three lost raw windows remain normalized matches; no normalized window is
gained or lost in this compiler-only comparison.

A second build applies the separately validated one-line mint-constraint change
to that frozen source. It reuses the first build's compiled dependencies, records
their hashes before and after, and verifies them unchanged. The root crate is
actually recompiled. Current source is identical to the maintained Darwin
mint-constraint source, not a divergent implementation.

## Current Linux result

- Candidate SHA-256: `2af1fd3607ae9289415f6403aaadfb9a29752ecb567218f65cb1601aed24f935`.
- 539/785 normalized original windows, 113 raw matches, 246 unmatched.
- All 25 maintained suites pass: 17,462 cases, 35,074 transactions and 35,418
  independently verified signature fields.
- All 285 earlier focused cases, 1,270 optional-bool cases, 216 typed-account cases,
  91 controlled CPI cases and 18 coherent mint/vault cases pass.
- Every recorded output and available log field matches the verified Darwin
  source checkpoint after its existing exact-coordinate and compute exclusions.
  The additional probes retain their own complete-output assertions.

The fixed `results` manifest preserves source, command/image/tool identities,
logs, stripped and unstripped output, all runtime observations, signatures and
synthetic-oracle evidence. `static-graph.json` recomputes actual direct-call
relationships, without claiming indirect-call or referenced-data closure.

```sh
work/test-env/bin/python -B repro/pump_amm/linux-v144-current-20261027/verify_saved.py --current-source
```

The verifier checks both retained builds, the predecessor, compiled source,
fresh body measurement, unchanged dependency-cache records, full recorded
behavior and independent signatures. It checks saved executions rather than
rerunning SBF.

## Tool provenance and scope

The Linux v1.44 archive is 490,710,349 bytes, SHA-256
`6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`.
The Linux/amd64 image digest is
`6c73adc767ee7ff212f2532d4695472b12f3d4ac20aea3db22b89d8c614dac50`.
Version startup reports Rust 1.79.0-dev / LLVM 18.1.7. Source and SDK mounts are
read-only; network is disabled. No captured executable or assembly is mounted
into the compiler container. Target-library hashes and the selected tool hashes
are recorded. `library-provenance.json` binds the observed Linux versus Darwin
standard-library path difference.

The first driver attempt stopped before compilation because a metadata variable
was missing; its script and log are retained. The corrected fresh build and the
explicit dependency-cache reuse are recorded separately. This is not asserted
to be a hermetic reconstruction of the unknown historical environment.

The Linux candidate is 1,250,960 bytes versus the original complete ELF extent of
1,268,504. The separately established 9,217,211-byte zero allocation suffix is not
appended. Exact source layout, remaining 246 windows, indirect calls, referenced
data and complete historical provenance remain open. Perfect reconstruction is
not yet achieved.
