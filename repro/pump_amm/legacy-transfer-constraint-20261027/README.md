# Legacy creator-fee transfer mint constraint

The reconstructed legacy transfer rejected non-native mints with the correct
error, but emitted extra Left/Right public-key logs that the original does not
emit. It used an Anchor `address` constraint where the original behavior and
compiled parser support a raw boolean constraint.

The source now checks the same mint equality through `constraint = ...` with
UnsupportedQuoteMint. It still rejects non-native mints. The change removes only
the unsupported diagnostic decoration and restores the entire 9,248-byte
normalized original account parser at `0x95648`.

## Verified checkpoint

- Candidate SHA-256: `1d4a4cb5e6f8061f153eb6602246c8877fb96009da277befa9278ea4a168bf17`.
- 539/785 normalized original windows, 116 raw matches, 246 unmatched.
- One gained window, no losses against the typed-account checkpoint.
- All 25 maintained suites: 17,462 cases, 35,074 transactions and 35,418 verified
  signature fields.
- All 285 earlier focused cases, 1,270 optional-bool cases, 216 typed-account
  cases and 91 controlled CPI cases pass on this exact candidate.
- 18 additional coherent mint/vault cases match every recorded output and log,
  except compute lines: six native controls succeed and twelve non-native
  Token/Token-2022 cases reject with the original undecorated diagnostic.
  All 36 signed executions are independently verified.

`baseline-mint.json.gz` preserves the earlier extra-key output. The probes derive
the corresponding vault address from each mint and token program, so a malformed
or incoherent account substitution does not mask the mint-constraint behavior.
`source.patch` contains the one-line change. The fixed results manifest binds all
31 compiled source inputs, build command/log, stripped and unstripped outputs,
full runtime corpus, focused observations and synthetic CPI oracle evidence.

```sh
work/test-env/bin/python -B repro/pump_amm/legacy-transfer-constraint-20261027/verify_saved.py --current-source
```

The verifier checks saved executions, source identity, every raw signature,
predecessor evidence, fresh body matching and actual direct-call destinations.
It does not rerun SBF. The inherited 3,191 trade cases retain full-log comparisons;
older suites without full logs retain that limitation. Exact reviewed source
coordinates and compute consumption are the only log exclusions used by the
corresponding full-log probes.

## Remaining work

Whole-ELF equality is false. The candidate is 1,250,968 bytes versus the original
complete ELF extent of 1,268,504 bytes. The original's separate 9,217,211-byte zero
allocation suffix is not appended. The 246 unmatched windows, indirect calls,
referenced data and historical build/source provenance remain unresolved.

A separate Linux v1.44 compiler experiment uses the previous frozen source to
isolate the host-distribution difference; it is not folded into this checkpoint.
Authentic successful fixed-admin initialization also remains a coverage gap.
This checkpoint does not claim perfect reconstruction.
