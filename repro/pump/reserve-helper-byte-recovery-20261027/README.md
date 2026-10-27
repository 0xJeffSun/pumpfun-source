# Main Pump reserve-helper source recovery

This pass concerns the **main Pump program only**, specifically the helper called
by its `set_mayhem_virtual_params` instruction. No companion program was changed.

The captured helper is the complete 1,168-byte window at `0xa23f0..0xa2880` in
`evidence/original/pump/deployed.so` (SHA-256
`7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`).
The reconstructed source now emits a 1,168-byte helper rather than the prior
960-byte version. It preserves the separately checked multiplication and
division, two branch-local numeric conversions, quote-specific thresholds and
caps, and the captured error-return blocks.

## Exact remaining difference

`recovered/function-comparison.json` compares every instruction byte, masking
only internal direct-call immediates and ELF-section-range `lddw` operands.
Numeric literals, registers, branch offsets, and all other bytes are retained.
After those masks, **two instruction slots still differ** at offsets 736 and
744: two independent stack loads into `r9` and `r1` occur in reverse order.
The bytes are not equal. We have not rewritten the ELF, embedded captured code,
or broadened the normalization to hide this difference.

All nine direct call sites bind to counterpart callee bodies that match under
the same narrow masks. Their own unresolved references remain explicitly listed
in `recovered/helper-callee-bindings.json`; this is not a proof of complete
transitive callee/data identity. The six-function arithmetic/comparison closure
(`memcmp`, `__multi3`, `__udivti3`, and their internal callees) is separately
verified: normalized bodies match and every direct-call target stays within
that matching set, with no unresolved data pointers.

The complete main-Pump inventory remains **112/1,035 raw local body matches**.
There are 546 normalized local body matches, including those raw matches, and
489 unmatched windows. These are local-body measurements, not semantic coverage
percentages or whole-contract reconstruction claims. Raw body equality alone
does not establish the identity of callees or referenced data.

## Evidence and validation

- `recovered/`: exact source snapshot, build command/environment, compiler hashes,
  logs, stripped and unstripped ELFs, complete helper comparison, and inventories.
- `research/`: source-generated variants and three compiler controls. The retained
  comparisons cover 461 source/compiler function instances (108 under each of
  v1.43, v1.45, and v1.44 with 16 codegen units; then 80 error-expression, 48
  local-placement, and 9 return-expression variants). None matched the complete
  normalized helper. A further v1.46 build of the revised actual handler retains the same two
  differing slots. The v1.45 control's copied build-scope label was corrected
  explicitly in its comparison record; executable hashes and commands bind the
  actual compiler. The v1.43 record has the same explicit correction.
- The rejected optimization-level-2 control reduced normalized matching windows
  from 546 to 459 and left 13 differing slots in the helper. Its retained
  source/build is under `research/opt2/`; it was not promoted or runtime-tested.
- `recovered-cases.json.gz`: 192 signed local-VM comparisons against the original,
  including arithmetic boundaries, completed curves, malformed accounts,
  thresholds, and unsigned invocation. The unchanged synthetic signer fixture
  supplies a PDA signature; no production-caller reachability is claimed.
- `full-regression.json.gz`: the main-Pump 40-suite bounded regression corpus.
- `repeat/`: clean-target rebuild of the same source and compiler.

Run `work/test-env/bin/python repro/pump/reserve-helper-byte-recovery-20261027/verify.py`
from the repository root to check the retained records. The verifier never
executes a transaction on a network.

**Perfect reconstruction remains unfinished.** Remaining work includes the
helper's literal ordering, the other unmatched main-Pump bodies, referenced
data/call identity, layout, and complete ELF reproduction.
