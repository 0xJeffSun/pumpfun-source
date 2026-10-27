# Relay source layout and event-origin recovery

The Rust source now declares events, instruction accounts, and state types before
the generated Anchor entrypoint, in the order observed in the captured function
inventory. The four event definitions live at their observed
`programs/contracts/src/events/v1/` paths after the existing source-path remap.
Each event's captured source descriptor records line 5, column 1; those complete
descriptors now match. Comments identify that coordinate as reconstructed, without
claiming the original preceding source text.

The checkpoint preserves all **476 normalized / 107 raw original function-window
matches**, leaving the same 16 unmatched windows. Every one of the 513 emitted
symbol/name/body occurrences retains its preceding normalized body. Only source
organization, source descriptors, ordering and resulting address references change.
The four source-location descriptors are concrete data recoveries; this is not an
increase in the number of recovered function bodies.

All 18 runtime groups passed, retaining 527 case records. These are existing
finite fixtures, not 527 new or necessarily unique scenarios. Each uses the frozen
original-program comparator and normally signed offline transactions. The verifier
rechecks signatures and the actual compared fields. Compute logs and executable
account bytes remain excluded by the original comparator. Privileged success,
allocator failures, indirect/data closure and all-input equivalence remain open.

An initial runtime invocation created Python bytecode caches in the frozen harness
directory, causing its immutability guard to reject several groups before execution.
Those caches were moved to the work-directory quarantine, and the complete run was
repeated with bytecode writing disabled. Failed preflight logs are retained in
`work/rea-layout-origins-20261026`; accepted receipts come from the separate
`work/rea-layout-runtime-20261026` run.

The candidate is still not byte-identical to the target. Its source, raw artifacts,
complete function/call/data comparison ledgers and runtime records are frozen here.
`current/` records a separate current-location build reproducing both tested
artifacts. The preceding experimental 476-window source remains in its original
work directory and the REA setup checkpoint.

```sh
work/test-env/bin/python -B repro/donation-relay/rea-source-layout-20261026/verify.py --current
```

The target remains the captured 830,448-byte ELF. No target instructions, patched
executable bytes, or assembly enter the compiler. All four core programs and the
remaining dependencies remain subject to full Rust-built artifact equality.
