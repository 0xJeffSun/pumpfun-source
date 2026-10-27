# Current Fees573 source with SweepBuyback corrections

This packet composes the V2 finishing-helper recovery with the three ordinary
source files from the merged SweepBuyback proposal (#224). The exact 44-input
Rust source preserves **573/585 normalized original function windows**, 143 raw
local matches, 171 equal Location observations and 3,765 equal direct-callee
observations. No previous match is lost. This is a source and behavior correction;
it does not add a normalized function match.

Fresh comparison of all 1,249 Buyback cases shows **275 application-log
differences repaired, with zero remaining**. The three changes restore admission
diagnostics, the state claim method and its source locations, borrowed balance
access, transfer-before-counter ordering, and counter errors without synthetic
source metadata. The destination `add_lamports` fix was already in the parent;
this composition retains it. The main proposal's exact source bytes are checked
by the verifier and its origin revision is recorded in `composition.json.gz`.

SweepBuyback remains unequal: its candidate body is 6,984 bytes versus the
original 6,960. Twelve original functions remain unmatched. **Whole meaningful
ELF and whole capture equality remain false.** No assembly or binary patch is
used, and instruction normalization is unchanged.

## Build and runtime evidence

Two native root builds reproduce stripped SHA-256
`594f07a61a897e68dbc98451727f6fa9ff7a5472130caf528d72d5543aaad6ab`
and symbol-bearing SHA-256
`a3ef69a6b03ec683b20ada4028e0e61d198a09eabd0da144986faff49e529e50`.
They use the existing Linux platform-tools v1.44 and dependency cache, offline
locked compilation and the parent's path mappings. These are not fresh
all-dependency builds. All inputs, commands, logs and outputs are retained.

Fresh original/candidate execution passes 17,331 cases across 18 suites, 119
native arithmetic cases, eight quote-owner cases and 24 preprocessing cases.
The application-log check above is additional to the standard suite's compared
fields. Finite signed synthetic tests do not establish exhaustive semantics,
mainnet reachability or whole-binary identity.

```sh
python3 -B research/fees-current-573-buyback-union/verify.py
python3 -B research/fees-current-573-buyback-union/test_scope.py
```

The standalone verifier authenticates the parent, recomputes the full match and
callee inventories, checks source provenance, and validates saved runtime and
application-log comparisons. Negative controls reject an unsealed claim, parent
binary substitution and an omitted runtime case.
