# AMM Sell: source, CFG and partial-body evidence

**No complete handler was recovered.** These two isolated Rust controls retain
the 432 normalized windows of the [current quote-pair source](../mayhem-quotes-current-recovery-20261027/README.md).
Their unqualified build context also retains all 89 raw windows, 4,314 positive
immediate call observations and 456 positive Source observations. The other five
partial trade-handler bodies are preserved.

| Control | Original / candidate bytes | Equal instruction positions | SequenceMatcher aligned slots | Complete body |
| --- | ---: | ---: | ---: | --- |
| Direct signer constructor | 17,312 / 17,312 | 1,035 | 1,141 | No |
| Conditional event fields | 17,312 / 17,320 | 1,775 | 1,979 | No |

These instruction counts are diagnostics, not percentages of completed source
recovery. Both controls retain all 47 original immediate callee shapes in order.
The complete meaningful ELF still differs from the original. No match masks or
acceptance rules were relaxed.

## What the source establishes

Only `src/instructions/sell_pump_swap.rs` changes among the 67 source inputs.
The base archive, per-control overrides, exact patches and complete source hash
maps are included. The direct constructor evaluates actual signer seeds after
the primary account clones and before moving the aggregate into `CpiContext`.
This restores the original operation order in the CPI materialization region.

The conditional-event control uses ordinary field expressions and keeps the
actual virtual-reserve snapshot for both virtual and real event fields. It
recovers the original pre-clock key/state reads and narrows the remaining named
field-order differences to the native global/state loads and token pool/vault
loads. It still has an extra instruction and is not a complete reconstruction.

The unchanged 441-window normalizer checks all prior raw/normalized bodies,
positive calls and observed Source profiles. Matching immediate callees and
Source records do not establish full transitive or indirect code/data closure.

## Corrected CFG and stack diagnostics

The saved and recomputed diagnostics cover the complete handler. Each control
has 249 decoded blocks, and the ordered-edge traversal maps all 249 without a
topology conflict. The direct constructor retains four event-region opcode
differences. The conditional-event control retains four opcode differences but
only two differences in the traced named field loads.

No-return classification uses ELF relocation symbols. A raw `call -1` is not
treated as an unconditional trap: it can name a returning imported function.
Only relocation-confirmed `abort`, `sol_panic_` and `__rust_abort`, plus direct
wrappers beginning with those calls, terminate the diagnostic flow. The tests
include a returning `call -1` and the no-allocation shim case.

Stack liveness covers direct `r10` loads/stores. Named-field analysis tracks
syntactic must-alias pointers; it does not model arbitrary heap aliasing or call
memory writes. These limits remain explicit in `cfg.py`. The CFG is an aid to
source recovery and never substitutes for the strict whole-window comparison.

## Build and runtime boundaries

Each candidate has its own actual compiler command, tool/dependency bindings,
stdout, stderr, emitted LLVM IR and stripped/symbol-bearing ELF. The verifier
checks the allocated sections agree between the two ELF forms. These are
incremental isolated search builds with pinned dependencies, not clean-controller
repeats. No qualified linker layout was run for these controls. The parent's
100-raw and later 141-raw qualified observations are not transferred to this
packet's 89-raw context.

Each exact candidate passed 18 fresh local pairs and 36 signed records: nine
native-quote and nine token-quote cases. This is the same 18-case cohort repeated
for two candidates, not 36 unique scenarios. The packet keeps every before/after
account record, signed transaction, program log, error, event and CPI observation.
The offline verifier reruns the unchanged frozen trade receipt checker and
rechecks signatures, executable-account digest attestations, complete non-compute
logs and canonical cases. Original-side records agree across the two fresh runs.
Finite local evidence is not exhaustive equivalence or live-chain acceptance.

```sh
python -B research/mayhem-amm-sell-cfg-recovery-20261027/verify.py
python -B research/mayhem-amm-sell-cfg-recovery-20261027/test_verify.py
```

These commands read saved evidence only; they run no compiler, VM or RPC.
Signature checks require `solders` (the retained checks used 0.27.1).
`negative-controls.json` is a hash-bound index of selected private negative
controls. Their bulk artifacts are intentionally not included, and the index is
not independent acceptance evidence.
