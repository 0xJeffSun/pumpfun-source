# Sweep-rate helper: remaining compiler block placement

This isolated source control identifies the remaining difference in O0073, the
912-byte fee-recipient sweep-rate helper. All **22 basic blocks** have identical
register instructions, constants and direct-callee shapes. Their directed edges
correspond when the verified tail to the SBF `abort` import is treated as
terminal. All **eleven referenced data observations** match: error discriminants,
counted strings, Source records and formatter vtables. The terminal panic's
28-byte message also agrees.

**The complete ordered helper still does not match.** Three store/return blocks
and three overflow-path blocks have different placement. Nineteen instruction
slots differ under the existing whole-window normalization. Branch displacement
is ignored only for the separate graph proof, where explicit successor edges
must agree; the normal inventory never receives that additional mask.

The ordinary inventory remains **426/441 normalized, 70 raw-local and fifteen
unmatched**. All 455 other candidate function extents retain their previous
normalized shapes; 564 of 565 unique symbol names retain their shapes. These
candidate counts are separate from the original-window inventory.
All prior 426 matches, 4,234 supported direct-call observations
and 441 matching Source observations remain. This experiment is separate from
the later shared-sell source and account-data audits; it does not replace the
published checkpoint.

## Source and evidence

The only source changes against the 426-window source/data checkpoint are the
`core_intrinsics` feature declaration and an `unlikely(native)` hint when
selecting the last sweep timestamp. This is a compiler-layout control, not
authenticated historical source or a claim about actual branch frequency.
No assembly, output patch, padding or linker rewrite is used.

Two root builds from the same 65-input source map reproduce:

- Candidate: `65204f85886bbfc7b20d3aff460754a6624692af29897de7eef4fc126811f386`
- Symbols: `7bc4225fd8e496c4864db7877b9bfd2b6aed6298d9a06ac816e364cc921a3253`

They use the unchanged macOS v1.54 compiler, official Linux v1.54 target libraries
and v1.52 stripper, with the parent's cached dependencies. This is not a new
full-dependency or historical build-recipe proof.

Fresh local execution covers 150 sweep-rate/admission cases and 450 signed
transaction records across original, old baseline and control. The control has
zero checked-field differences against the original and retains the earlier
34 corrections over the old 375-window baseline. These are bounded synthetic
cases, not exhaustive behavioral certification or new fixes.

The abort proof follows four matching, branch-free and exit-free functions to
the final imported `abort`. The copied SDK ABI declares that import as returning
`!`. The proof depends on that runtime contract and does not interpret the
incidental bytes following an aborting call as a live successor. Other calls
retain conservative return edges.

```sh
python3 -B research/mayhem-sweep-branch-layout/verify.py
python3 -B research/mayhem-sweep-branch-layout/test_scope.py
python3 -B research/mayhem-sweep-branch-layout/analysis.py --check
```

These commands verify saved evidence without executing a compiler, target or
network operation. The seven mutation tests reject changed registers/branches,
changed Source data, a returning sink, a different final import or a substituted
executed-program receipt. Rust's copied
ABI source retains its upstream MIT/Apache-2.0 license notices. Whole ELF,
complete source identity and the remaining fifteen ordered bodies stay open.
