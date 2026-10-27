# Account-data extent refinement

This audit resolves **56 of the 59 previously unbounded data references** in
the existing Mayhem account cohort. The same cohort now has **153 typed-equal,
zero typed-different and three unresolved references**, across 30 counterparts
of 26 original functions. Repeated references are counted separately; the new
proofs bound 29 distinct original objects.

The candidate is unchanged from the [shared AMM sell quote recovery](../mayhem-sell-quote-call-recovery/README.md):
`fa4f81eb1d5953eb7f31b83bf783f7fc4f89b9573f1403b7c4e1efab76f763c4`.
The function inventory remains 426/441 normalized and 70 raw-local matches.
No compiler or VM is run by this work.

## What establishes the bounds

- Account names and logs carry explicit lengths in the consuming call's
  registers. The checker follows only unconditional local control flow to that
  call, rejecting overwritten pointers and nonconstant lengths.
- Seed strings and the inline Source filename have pointer/length writes to
  adjacent stack slots. Their actual instruction offsets and widths are checked
  in both complete matching bodies.
- The Instruction constructor copies four 64-bit words from `program_id`.
  Both ErrorCode consumers begin with a 32-bit load of their argument.
- The formatter vtables have their established scalar layout and matching
  code-pointer targets. The direct formatting-function pointer also resolves
  to a complete matching function window.
- The constant signer-seed graph has one outer descriptor, two inner byte
  slices, and the exact `__event_authority` and bump payloads. String-piece
  arrays have counts witnessed in their callers and checked descriptor lengths.

These are typed content and pointer-target comparisons. Absolute relocated
pointer bytes are not claimed equal. The checker does not infer arbitrary
allocation sizes from neighboring strings or promote matching prefixes into
whole-object identity.

## Remaining uncertainty

Two references to the tagged standard-library I/O error at original `0xb1220`
and one to the empty formatting prefix at `0xb1340` remain unresolved by this
schema. The unchanged nonmatching initializer callee at O0185 offset 416 is also
retained in the report. All other program data, dynamic inputs, transitive and
indirect calls, whole ELF layout and the fifteen unmatched bodies remain outside
this bounded result.

```sh
python3 -B research/mayhem-account-data-extents/verify.py
python3 -B research/mayhem-account-data-extents/test_scope.py
python3 -B research/mayhem-account-data-extents/analysis.py --check
```

The verifier authenticates the source/artifact parent, regenerates the original
cohort for that exact candidate, and rederives every new bound. Nine in-memory
mutation controls cover payloads, lengths, consumer read width, vtable routing,
seed descriptors and retained uncertainty. Reference artifacts are not edited.
