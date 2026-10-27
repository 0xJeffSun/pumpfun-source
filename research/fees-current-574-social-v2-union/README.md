# Current Fees574 source with the public Social V2 correction

This packet composes the two ordinary source overrides from merged PR #231
with the complete Fees574 source from PR #232. It retains the recovered legacy
Social branch and V2 finishing module. The native build preserves **574/585
normalized original functions**, 143 raw local matches, 171 equal Location
observations and 3,792 equal direct-callee observations. No previous match is lost.
No additional complete function match is claimed.

Fresh execution of all 627 Social V2 regression cases has **zero application-log
differences**, compared with 277 in the preceding candidate. The public changes
restore the disabled and cooldown diagnostics, saturating deadline/admission,
executable-recipient checks, zero-amount diagnostics, native debit saturation
and four ATA source coordinates. The included 98-case admission matrix also
repairs ten prior behavioral mismatches and 36 prior log mismatches.

The V2 Social body and ATA helper still do not match completely. Eleven original
functions remain unmatched. **Whole meaningful ELF and whole capture equality
remain false.** Source spelling and bounded runtime equivalence are not claimed
to establish whole-program byte identity.

## Source and native evidence

The source is exactly the public #231 overrides with two retained changes:
legacy Social uses the verified `core::intrinsics::unlikely` predicate wrapper,
and the fee-sharing module declares the recovered V2 finishing module. The
verifier reconstructs this composition from the public files. All other source
inputs are identical to the parent. `composition.json.gz` records their hashes.

Two native builds of the 44 inputs reproduce stripped SHA-256
`b2275198dd5b4057f55a543464d584eec8300bdc7819a9141c9c55e6b326d875`
and symbol-bearing SHA-256
`364c3149b4cbbd7c2af69025ead09ece503471deb12c3442584d1e088ab95c56`.
These use the pinned Linux platform-tools v1.44 nightly compiler, existing
cached dependencies, offline locked compilation and retained path mappings.
They are not fresh all-dependency builds. Inputs, commands, logs and outputs
are included; no target bytes, assembly or output patch feeds compilation.

Fresh original/candidate execution passes 17,331 cases across 18 suites,
119 native arithmetic cases, eight quote-owner cases, 24 preprocessing cases
and the 98 additional admission cases. The Buyback application's repaired logs
remain equal. Executable-account contents are omitted by the inherited snapshot
harness. Finite synthetic cases do not establish exhaustive behavior or mainnet
reachability; full compute-unit equality is not asserted.

```sh
python3 -B research/fees-current-574-social-v2-union/verify.py
python3 -B research/fees-current-574-social-v2-union/test_scope.py
```

The verifier authenticates its parent, source composition, native build records,
complete match inventories and saved runtime observations. Negative controls
reject unsealed claims, substitution of the parent binary and a missing case.
