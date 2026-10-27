# Relay donation Result and event construction controls

Six ordinary-source controls retain the accepted source's argument, account,
worker and event types while varying the outer donation handlers. None recovers
a complete original window. All retain **488/492 normalized matches**; the
`Result::map` control loses two raw-local matches (142 → 140) and is rejected
along with the other controls. No candidate replaces the accepted artifact.

The baseline is the rejected [event-after-close control](../donation-close-order-controls/README.md).
The native close remains after successful shared donation and before event
construction. The controls test:

- Explicit `match` on the shared worker's result with an early error return.
- `Result::map` for event construction in the three regular/payer source handlers;
  both native handlers remain byte-for-byte unchanged at source level.
- Destructuring returned amounts, with both `?` and explicit `match` propagation.
- Moving the event discriminant initializer last.
- Ordering event initializers by the observed result/mint/configuration load groups.

The explicit-match regular/payer bodies are 2,560 bytes versus the original
2,568, but their complete normalized hashes remain unequal. Near-equal size is
not recovery. Its native bodies are 6,208 bytes versus the original 6,272.
`Result::map` emits extra function windows and changes code generation beyond
these wrappers; complete-inventory checks retain that negative evidence.

`report.json` retains full inventory summaries, matched original ordinals,
selected wrapper hashes/sizes and actual direct-call offsets. Wrapper subjects
are resolved by exact mangled function-name fragments, since added closure
functions can shift candidate indices. Normalization remains the existing
CALL/relocation-only normalization; no register, stack or instruction alignment
is added to the identity matcher.

## Reproduction and limits

The verifier independently reconstructs six exact 60-input maps from the parent
and explicit transformations. Only `src/donation_handlers.rs` differs. Actual
compiler launch records, logs, unchanged-input checks and stripped/unstripped
hashes are retained. Identical artifact pairs are shared with the parent packet.
All six retained runs contain an actual root compiler invocation.

Five runs reuse the pinned v1.48 dependency target cache. The explicit-match plus
destructuring variant was rebuilt in a fresh target directory, including its
dependencies, after an initial cached-root observation was rejected. That cached
observation is not counted as a compilation. The final fresh build is the one
bound here. The tools, locked registry sources, offline recipe and remapped
source paths are those of the accepted settlement artifact study.

```sh
python3 -I -B repro/donation-relay/donation-result-shape-controls/verify.py
python3 -I -B repro/donation-relay/donation-result-shape-controls/test_controls.py
```

These checks read artifacts and source evidence without invoking a compiler or
VM. No runtime execution is claimed for rejected variants; error propagation,
allocation and native cleanup need their own dynamic coverage before a future
candidate is promoted. Whole-file identity and all four original donation
windows (92–95) remain open. These controls rule out the tested forms, not all
possible source or compiler explanations.
