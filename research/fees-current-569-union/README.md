# Fees current-source union: 569 normalized function matches

This composes the merged source recoveries at main `285d2db9` and adds three
transfer-function matches. It retains the two sharing-account parsers from
PR218 and the native Social/buyback arithmetic and diagnostic corrections from
PR219, alongside the earlier preprocessing, payout and authorization recoveries.
The full compiler candidate remains **unequal to the original ELF and capture**.

| Stage | Normalized original functions | Unique pairs | Raw local matches |
| --- | ---: | ---: | ---: |
| Authorization parent | 564 | 417 | 143 |
| Composed parser/arithmetic baseline | 566 | 419 | 143 |
| Transfer source candidate | 569 | 422 | 143 |

The candidate preserves all earlier normalized/raw matches and positive direct
callees. It has 168 equal Location observations, 3,656 equal direct-callee
observations and **16 unmatched original functions**. These are separate scoped
measurements, not completion percentages.

## Source composition and new recovery

The baseline is reconstructed from the exact 43-input authorization parent,
the two published parser-constraint lines, and the two native-payout source
overrides. The verifier reconstructs that composition and checks all source
bytes. The transfer candidate then changes only `sharing_update.rs`.

The new complete normalized matches are:

| Original address | Bytes | Function |
| --- | ---: | --- |
| 237464 | 2624 | Legacy transfer-to-Pump adapter |
| 582624 | 4352 | Generated legacy AMM transfer CPI |
| 586976 | 4608 | Generated V2 AMM transfer CPI |

The adapter receives individual owned account arguments and borrows the Anchor
`Account<BondingCurve>` wrapper. It returns the CPI result directly. These
ordinary Rust boundaries reproduce the full legacy adapter's calling convention
and cleanup, while recovering both generated CPI bodies. All 33 actual direct
callees of these three functions match. The adapter's complete 32-byte System
program ID matches; the CPI bodies have no direct relocated data objects.

**The V2 outer adapter at 240088 remains unmatched.** The generated CPI match
does not close that caller. Subsequent local signature/clone-order controls are
not adopted in this candidate. Historical source spelling is not proven. No
assembly, output-byte patch or widened normalization mask is used.

## Builds and runtime verification

The composed baseline and proposal each have a recorded native root build.
Two proposal builds produce identical stripped SHA-256
`f3b94e2d45443f84ef88bde02eb1d75bd5178b50c994a9ac0a3775188e4fbfbe`
and unstripped SHA-256
`6d4d4099ec77f9b77c5bdfe0fc81b6e9a1facbdfd9dd55b3754b4ecd3fc0c100`.
They use the existing Linux platform-tools v1.44, dependency cache, locked/offline
mode, math mappings and v1.52 stripper. These are not fresh all-dependency builds.
Recorded absolute paths are execution locators; another machine needs equivalent
SDK, registry and mounts.

Fresh candidate execution passes:

- 17,331 existing cases across 18 suites, under each suite's original predicates.
- 119 native-payout boundary cases, including the 38 corrections against the
  older pre-correction control, with application logs and rollback checks.
- Eight native/stable quote-owner cases with application-log equality.
- 24 completed-curve/preprocessing boundary cases.

These are finite signed synthetic cases, not exhaustive behavioral equivalence
or evidence of mainnet reachability. The source, native artifacts, build records
and saved results are retained. Original artifacts and canonical selections are
unchanged.

```sh
python3 -B research/fees-current-569-union/verify.py
python3 -B research/fees-current-569-union/test_scope.py
```

Verification authenticates the predecessor and composition sources, recomputes
the complete function/callee/Location comparisons, and reads the saved runtime
checks without executing contracts. Negative controls reject unsealed claims,
the old output, omission of a runtime case, and removal of the native-payout fix.
