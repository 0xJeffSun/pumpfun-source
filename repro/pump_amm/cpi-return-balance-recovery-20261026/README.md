# Curve CPI return and balance-diagnostic recovery

The maintained source now reads curve CPI return data using the same strict
unwrap and Borsh decoding pattern as Anchor's generated return wrapper. It
accepts exactly two u64s (16 bytes), panics on absent, short or trailing data,
and discards the returned program key as the original helper does. The earlier
reconstruction instead returned a custom mismatch error and checked that key.

Source and destination balance failures now preserve the original numeric
Left/Right values. Both source subtraction and destination addition failures
also carry their observed error origins. The original branch, string and call
facts are preserved in the [return-data evidence](../return-data-diagnostics-20261026/README.md).

The initial strict-return trial was rejected: error codes and effects matched,
but an independent full-log comparison found missing numeric diagnostics. A
second trial exposed an originless source-underflow error at the input balance
boundary. `source-initial.patch`, the earlier work directories and the separate
strict-return rejection record preserve that history. The final source patch
includes all observed repairs; no failing output was reclassified as a pass.

## Verified checkpoint

- Candidate SHA-256: `51c051d22380001db39963ad697050622f172162727fe477d0d3faf587e5275f`.
- 536/785 normalized original windows, 116 raw matches, 249 unmatched.
- One gained 88-byte error-drop body, with no lost window matches against the
  generated-fee checkpoint. The curve return helper remains inlined in this
  build; this checkpoint does not claim that original function body matches.
- All 25 maintained suites: 17,462 cases, 35,074 submitted transactions and
  35,418 independently verified signature fields.
- All 285 earlier focused cases and 1,270 malformed optional-bool cases pass.
- 91 controlled CPI cases match complete recorded effects and logs: 39 fee
  boundary cases, 26 curve return-length cases, 20 nonzero/maximum return-value
  cases, and six source-balance boundary cases. Their 182 signed executions are
  verified, including equal original/candidate transaction bytes and pre-state.

The CPI oracle is an explicitly synthetic, source-built dependency used only
in local replay. It reads a control trailer, optionally sets return data and
never writes accounts. Both genuine AMM executables and the oracle's complete
source/build/ELF evidence are retained under `results/cpi`. This tests decoder
behavior without claiming the substituted dependency is the production program.
A wrong-program return-data spoof was not tested.

Full-log checks exclude compute consumption and only the exact reviewed source
coordinates. Numeric values, panic messages, error kinds, account origins,
events, CPI bytes and account effects remain compared. The inherited 3,191
trade cases retain full-log checks; older suites without complete logs retain
that limitation. The additional optional-bool matrix preserves 2,540 signed
executions separately from the maintained corpus.

`results/manifest.json` binds the 31 compiled inputs, actual build command/log,
stripped and unstripped outputs, every full-corpus receipt, focused probes and
CPI oracle evidence. `static-graph.json` checks actual direct call destinations.

```sh
work/test-env/bin/python -B repro/pump_amm/cpi-return-balance-recovery-20261026/verify_saved.py --current-source
```

The verifier rechecks the predecessor, fixed manifest, compiled source, fresh
function measurement, raw signatures and all saved behavior assertions. It
verifies recorded executions rather than rerunning SBF.

## Remaining work

Whole-ELF identity is false: this candidate has 1,253,040 bytes versus the
original complete ELF's 1,268,504. The separately established 9,217,211-byte zero
allocation suffix is not appended. There are still 249 unmatched windows and
unproved recursive data/indirect-call relationships. Original source/build
provenance, out-of-line curve-helper recovery and authentic successful
fixed-administrator `create_config` execution remain unresolved. Perfect
reconstruction is not achieved by these bounded behavioral results.
