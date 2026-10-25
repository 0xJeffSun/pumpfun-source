# Remaining Sync handler difference: no further source proposal

The current c96 Sync handler is2952 bytes; original0x5dc20..0x5e778 is2904. This review found no additional source-semantic omission in the reset/no-change/event branches. It proposes no source patch. The restored no-change message remains verified in all113 existing message cases, and the matched parser/wrapper remains unchanged.

## Concrete remaining differences

| Area | Original | Current | Interpretation and limit |
|---|---|---|---|
| Entry |Context loaded before Clock; bump read later on event path|Bump byte is read at0xaf128, then context and Clock|A valid decoded Context makes the bump read non-failing. Moving source to force a later load would be code-shape steering; no source correction established.|
| Reset predicates |last_update<start first, then now<start|now<start first, then last_update<start|Both are pure signed comparisons over validated in-memory fields. Same conjunction; no additional read/side-effect/error distinction proved.|
| Reset stores |Clears has_total_claimed then total_claimed at0x5dc98/0x5dca0; tests old total|Same stores at0xaf328/0xaf330; tests old total at0xaf338|Semantics agree, including clearing flag even when old total is0.|
| No-change block |0x5de10..0x5df28 formats user's Pubkey, logs and returns|0xaf190..0xaf318 now performs the same roles|Exact113 saved message checks pass. Pubkey Debug and Display share the same body; source placeholder spelling remains unrecoverable.|
| Event data loads |User key loaded once into a stack region before first data allocation|Current loads the same user key into two stack regions|Both feed the same discriminator/key/old-total/zero-new-total/timestamp values. A clone-removal or manual serialization rewrite would be unsupported without an observable ownership/error distinction.|
| CPI metadata |Event authority AccountInfo Rc fields are cloned/dropped around invoke_signed|Same authority/metadata roles, with different register/spill placement|The complete windows retain each operation, but no full transformed CFG/data proof is claimed. No padding/noinline/field-layout edit is proposed.|

Let Q = now<start, R = last_update<start, and T = previous_total==0. Both handlers reset iff Q∧R, emit the event iff Q∧R∧¬T, and otherwise log the no-change message. The differing comparison order does not justify a semantic fix. Clock failure bypasses reset/log/event in both; no target run was added to test failures.

## Calls and event roles

Both complete handlers have10 direct callsites. Their complete normalized callee-body multisets are equal: Clock::get, format_inner, log-data, Instruction::new_with_bytes, invoke_signed, two ProgramError conversions, two raw-vec error paths and one allocation-error path. `call-multiset.json` retains the exact normalized hashes and multiplicities. Equal multisets do not establish equal callsite arguments/order, recursion, pointer/vtable data or whole-handler identity.

The event body remains64 bytes:8-byte discriminator,32-byte user key,8-byte before count,8-byte after count and8-byte timestamp. The self-CPI adds the existing8-byte event instruction prefix. This review does not replace serialization with raw byte stores. Existing receipt/event checks are prior bounded evidence; this pass executes no target.

`normalized-alignment.json` is a descriptive whole-window SequenceMatcher alignment used to locate differences. It is not a transformed-equivalence proof and no deleted/reordered instruction is accepted as equal by that alignment. Full original/current bodies and every immediate target remain in the per-side directories and `rows.json`.

## Why no further edit

Reordering the conjunction, moving the earlier bump load, removing `event.clone()`, or changing formatting syntax could affect the emitted layout, but none is shown to restore a missing semantic operation after the accepted log correction. Account types are already fixed and confirmed by matching parser/wrapper bodies. Future work should retain the48-byte discrepancy rather than choose a convenient textual spelling to shrink it.

The exact current source and binary/ledger hashes are recorded in `bindings.json`; `accepted-nochange-check.json` binds the113 existing messages to c96. Original row boundaries remain admitted inferred windows. Diagnostic source-line movement in Claim stays explicit and unmodified. No main/source edits, builds, compiler sweeps, probes or fixtures occurred.

Run `python3 -B work/amm-sync-handler-residual/verify.py --repo .` to verify the package, optional current bindings, exact call-body multisets and preserved source. No program execution occurs.
