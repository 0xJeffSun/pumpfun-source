# Metaplex error-first tail guard experiment

This is one source-layout hypothesis after the reviewed positive-expression guard compiled exactly to rejected candidate12. It changes only `process_utilize`, preserving all 17 other patched public-source files, the initial zero/total guard and every statement in the success continuation.

The remaining-use check becomes the function's tail expression: if remaining<requested, yield the same `ProgramError`; otherwise perform the dominated subtraction and the unchanged success continuation. This differs from assigning the result of a positive `if` expression followed by a continuation. Its purpose is to test early CFG block ordering, not arithmetic semantics.

For every u64 requested/remaining/total triple, the initial guard has the same rejection domain. After that guard, remaining<requested yields the same error86. Otherwise remaining-requested cannot underflow, and the identical account-validation, serialization, delegated-use and burn statements execute in their original order. Only the continuation's lexical nesting and indentation change. No instructions, constants, binary patches, compiler metadata overrides or diagnostic formatting adjustments are supplied.

The primary compiler source at LLVM commit `7b8db05b564faffb522434b73b7082662171f94a`, `llvm/lib/Target/BPF/BPFInstrInfo.cpp`, explicitly returns failure for conditional branch analysis. It can remove an unconditional jump to a layout successor but cannot perform ordinary late conditional-branch folding. This explains why a logically invertible `JGT`/`JA` pair can survive and motivates testing the earlier CFG shape. The relevant complete upstream file is retained here. This observation does not predict the next build's output or authenticate historical source spelling.

`utilize.before.rs` and `utilize.proposed.rs` retain the complete local delta. The archives and source manifest bind the same 18 public-source files as prior experiments. `build.py` is the existing frozen source builder adapted only for its packet-relative root/import and dedicated trial flag/package/scope. The build uses the same pinned public commit, lock and Linux image; target executables are read only after the source-only compilation finishes.

Acceptance requires the measured complete output. No build result or byte equality is claimed by this proposal.
