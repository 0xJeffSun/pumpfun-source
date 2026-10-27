# Generated fee CPI and strict return recovery

The maintained AMM now uses Anchor's generated `get_fees_with_quote_mint`
CPI and `Return<Fees>::get()` instead of hand-serialized invocation plus partial
Borsh deserialization. The included IDL is the exact captured
`evidence/upstream/pump_fees.json`, not a fabricated ABI. The pinned macro's
return implementation unwraps the return-data option and calls
`T::try_from_slice(&data).unwrap()`, matching original malformed-return behavior.

This restores eight normalized original function windows without losing prior
matches, including the static-string error helper lost by the optional-bool
correction. Source and IDL provenance are retained under `results/source`.
The original fee helper's branch evidence is in the separate
[return-data diagnostics](../return-data-diagnostics-20261026/README.md).

## Verified checkpoint

- Candidate SHA-256: `53c6f6bf1595157300903481468ea38e7945e4e288cdcb8fe451e8f3a12bd68f`.
- 535/785 normalized original windows, 115 raw matches, 250 unmatched.
- Actual pinned-compiler build with 31 stable source inputs, including the IDL.
- All 25 maintained suites: 17,462 cases, 35,074 transactions and 35,418
  independently verified signature fields.
- All 285 prior focused cases and 1,270 malformed optional-bool cases pass.
- 39 controlled fee-return cases cover three legacy callers and absent, empty,
  short, exact 24-byte and trailing returns. All recorded outputs and full logs
  match after compute lines and exact reviewed panic/authorization coordinates.
- The 36 malformed fee returns reproduce the original panic messages and error
  kinds. The three exact 24-byte controls reach the same later authorization
  guard, including its message and account effects.

These fee tests use an explicitly synthetic, source-built dependency oracle
that only reads a control trailer and sets chosen return data. Both genuine AMM
binaries receive the same signed transaction and account state. Its binary,
source, actual build record and full observations are in `results/cpi`. All 130
signed executions in the 65-case observational report are verified; the 26 curve
cases remain observations of an unfixed path and are not counted as matches.
The additional optional-bool matrix retains another 2,540 signed transactions.

`verify_saved.py` checks the fixed manifest, predecessor, fresh body measurement,
31 compiled source inputs, recorded outputs, signatures and focused probes.
Copied focused validators retain their original cases and explicitly admit the
additional IDL input; their unchanged source fixtures remain bound.

```sh
work/test-env/bin/python -B repro/pump_amm/generated-fee-cpi-20261026/verify_saved.py --current-source
```

The preserved 3,191 trade cases retain full-log comparison. Older maintained
suites without complete logs keep that limitation. Static direct-call closure
does not establish referenced-data, indirect-call or whole-ELF equivalence.

## Remaining work

The candidate is 1,251,520 bytes versus the original complete ELF extent of
1,268,504. Whole-ELF equality remains false. The separate original 9,217,211-byte
zero allocation suffix is not appended.

250 windows remain unmatched. Strict curve-return handling and newly observed
balance diagnostics are being recovered separately; the initial curve trial is
not promoted. Historical build/source provenance, recursive data and indirect
calls, and authentic successful fixed-admin `create_config` execution remain
unproven. Perfect reconstruction is incomplete.
