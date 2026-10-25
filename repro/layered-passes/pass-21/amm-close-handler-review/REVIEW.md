# AMM CloseUserVolumeAccumulator residual — no justified source patch

Current accepted candidate6dc621c8 is bound to the published pass20 scratch and actual root lib.rs. Complete original handler5c590..5d090 (2816 bytes) and currentc77e0..c82b0 (2768 bytes) remain different. This review finds no supported natural account-ownership, missing error or operation-order correction. `source_patch` is null by decision, not omitted work.

## Complete contextual and call evidence

The admitted complete parser4056 bytes, wrapper1056 and exit712 retain normalized instruction plus relocation-pattern matches. Their full rows are included alongside the handler and all immediate targets in full-rows.json. This closes the proposed context-type explanation for this handler difference: Signer user, Account<UserVolumeAccumulator> and event_cpi AccountInfo members are already supported. The exit owns account closing/refund; the handler need not add another close or manual lamport operation.

All nine direct calls occur in the same sequence and resolve to complete normalized matching target bodies:

| Role | Original call | Current call | Target bytes |
|---|---:|---:|---:|
|Clock::get|5c638|c7858|232|
|raw_vec error|5c778|c7988|24|
|ProgramError→Anchor Error|5c7d0|c79e0|160|
|sol_log_data|5c8d8|c7af8|16|
|allocation error|5ccf0|c7f10|32|
|Instruction::new_with_bytes|5cdb0|c7fd0|352|
|invoke_signed|5cee8|c8108|880|
|ProgramError→Anchor Error|5cfc8|c81e8|160|
|raw_vec error|5d088|c82a8|24|

`calls.json` binds exact actual destinations, full lengths, candidate symbols and comparison results. These are paired by call order, not claimed equal call offsets. The external abort call and all relocations/branch edges/indirect-call evidence remain in complete rows. Matching targets do not prove recursive data/indirect ABI identity.

## Snapshot and error order

Original loads account scalar members at context+48,+40,+38,+30 before Clock (5c5a8..5c5d0); current loads the same four after successful Clock (c7878..c78a0). User key is copied before Clock on both. The handler source has a borrowed account alias, then event construction with user key and Clock followed by the four scalar fields. Source field evaluation and compiler movement can account for these schedules; the machine loads do not uniquely recover original Rust expression order.

There is no intervening CPI or account mutation before those scalar loads: Clock writes its result into stack output, and the four fields are in the already decoded Account value. On Clock failure both branches take the same matching error conversion and return without event log/CPI. Moving an infallible scalar read across that failure point establishes no different returned error, persisted state or emitted event. No new invalid-input or concurrent-mutation premise is inferred to justify reordering source.

Both successful paths construct an80-byte event payload:8-byte inline discriminator,32-byte user,8-byte timestamp and four8-byte fields. The original discriminator literal at5c820/currentc7a20 is identical; original data length50hex is set at5c8b0 before log. The later event-CPI allocation retains the same event composition and instruction-construction helper. AccountInfo event-authority clone increments are visible at original5c8e8..5c968 and currentc7b08..c7b88, with corresponding cleanup retained in the full bodies. Their different register assignment and spill placement alone do not prove a different source ownership type or justify replacing event.clone()/emit_cpi!.

The current source is `emit!(event.clone()); emit_cpi!(event); Ok(())`. Removing clone, changing event source construction or forcing early snapshots is unsupported by this evidence. Allocation/abort paths, Rc cleanup and invocation-error conversion remain present; no missing conditional or error code was identified. This is a bounded negative finding, not a proof that every transformed CFG/data extent is equivalent.

## Retained uncertainty

The48-byte length difference is not explained as a proved historical source construct. Compiler register allocation, snapshot scheduling and spill/lifetime placement differ; no compiler or code-shape experiment was run. Full original source, recursive relocated metadata, every event-CPI data extent and whole ELF equality remain unresolved. Prior Claim147→149 diagnostic history stays explicit and is outside this no-change review.

No source/main writes, build, runtime, probes, module/workspace/flags changes, scalar-specialization work or new opaque original window occurred. Existing passing receipts are not new coverage. Run `python3 -B verify.py --repo /path/to/original/repo` to check bound inputs, complete retained row hashes, nine exact callee comparisons and matched contexts. This verifier performs no target execution.
