# PumpSwap trade-path reconstruction

This is the preserved earlier checkpoint. The maintained source now advances
to the [arithmetic and account error-origin checkpoint](../arithmetic-origin-recovery-20261026/README.md)
with separate build, source and complete-log evidence.

The maintained source matches the 30-file snapshot in `results/source`.
The actual Rust-built candidate is `results/build/candidate.so`, SHA-256
`dac4b7c26dfe8bad24d31d17fa40ca12fd3fc1e13bcab7f57ea67e91318262ca`.
The build uses the recorded v1.44 Darwin compiler and v1.52 stripping tool.
This checkpoint follows the incentive/creator checkpoint and changes four
source files: trade, multi-hop, legacy buy and legacy sell.

## Recovered behavior

The corrections restore numeric values and operand order in zero-amount and
slippage errors, and remove unsupported compared-key decoration where the
original returns a plain error. Two exact-quote failure stages are restored:
zero net quote after token transfer fees and zero usable quote after rounded
AMM fees. These precede the final minimum-base-output check and retain distinct
error origins in the evidence. They are not collapsed into the final slippage
failure.

Buyback validation explicitly rejects the default owner key before membership
and canonical-ATA checks, preserving the original key diagnostic for that stage
and plain diagnostics at the later stage. The legacy exact-quote path checks
positive net curve quote before subtracting its rounding unit. Token-account
self-transfer predicates and their original plain error style are preserved.

The selected original error constructors are bound to 5,344 unmodified original
instruction bytes and 20 source/error sites in `original-diagnostics.asm` and
`sites.json`. The sibling `legacy-trade-diagnostics-20261026` package retains
the separate legacy evidence and source patch.

## Actual validation

All 25 maintained suites pass: 17,462 comparisons, 35,074 transactions and
35,418 verified signature fields. The earlier 285 focused cases also pass on
this exact candidate. The complete trade-v2 and multi-hop runs additionally
retain before/after account snapshots and raw signed messages through
`observe_suite.py`. Their 153 formerly mismatched cases now have identical
effects, identical signed inputs and full matching logs, excluding compute
usage and the exact source-coordinate pairs in `source-sites.json`.

The complete legacy suites pass 1,586 cases with 3,172 signature fields. All
169 compared-value targets are corrected. Complete logs match for 945 buy and
540 sell cases under the documented source-coordinate handling. The remaining
101 legacy rows stay explicit: 99 lack original error origins and two have an
incorrect account-name origin. The legacy verifier rejects eight mutated
receipts; none of those remaining discrepancies is reclassified as a pass.

No compared-value label differences remain in the maintained 25-suite corpus
(`remaining-numeric-gaps.json`). This is finite corpus evidence, not proof that
every input or complete log matches. Other unmatched log rows from the strict
trade/route verification are retained in `results/strict-verification-04.json`.

## Verification

```sh
work/test-env/bin/python -B repro/pump_amm/v2-route-diagnostics-20261026/verify_evidence.py
work/test-env/bin/python -B repro/pump_amm/v2-route-diagnostics-20261026/verify_saved.py --current-source
```

The saved verifier authenticates the fixed publication manifest, actual build,
all 30 source files, all raw signatures and independent trade/route/legacy and
prior focused checks. It does not execute SBF. `results` retains complete
stripped/unstripped compiler outputs, the source snapshot, build commands and
logs, all 25 suite receipts, enhanced trade/route observations, and previous
focused replays. Large JSON is losslessly compressed; the manifest distinguishes
new compression from already-compressed sidecars.

Earlier development outputs and failed verifier attempts remain under
`work/amm-v2-route-diagnostics-20261026`; they are not accepted outputs. One
observer revision was needed to record copied executable fixture accounts
explicitly. The final verifier distinguishes those accounts from missing data
and binds their hashes, rather than allowing empty account observations.

## Completion remains open

Whole-original equality is false. The raw candidate is 1,215,000 bytes versus
the original complete ELF extent of 1,268,504 bytes, plus its separate zero
allocation suffix. Function matching is 503/785 normalized and 113 raw. The
previous 504th match, the 1,336-byte error-value helper at original `0x340`, is
no longer a complete match after the additional real callers changed compiler
specialization. This loss is retained explicitly; runtime corrections are not
withheld to inflate the count.

There are 282 unmatched original windows, unresolved recursive call/data
identity, incomplete historical build provenance, and no authentic successful
fixed-admin initializer replay. Next work should recover the remaining true
error-origin differences and then the AMM handler/context structure. Direct
dependencies stay in scope when needed for those paths. This checkpoint does
not claim completion or deployment of the contract.
