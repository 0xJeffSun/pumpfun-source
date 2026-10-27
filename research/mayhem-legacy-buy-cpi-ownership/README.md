# Legacy Buy CPI error ownership

This private source control restores the original ordering of the Pump CPI error path. The old CPI result remains alive while the replacement error is constructed, then is dropped before propagation. The reconstructed source now uses the consuming `map_err` path. Its original and rebuilt instructions both retain the old result in `r7`/`r6` across the name, formatting, and error-conversion calls.

This is **not a new complete function match**. Original O0081 is 13,848 bytes; the before and after bodies are 13,760 and 13,784 bytes. The full normalized body and whole ELF still differ. Both source snapshots are private controls and do not replace the repository's selected candidate.

The packet preserves all 429 normalized windows and 73 unqualified raw windows of its private predecessor, 4,288 positive direct-call observations, and 446 Source observations. The multiset of 50 immediate Legacy Buy callee shapes remains equal to the original; call offsets and the full body still differ. Its seven typed Source records and the CPI error origin at `pump_interface.rs:313` remain exact. These counts must not be added to a separately qualified raw-window count.

Only `src/instructions/pump_interface.rs` changes between the two complete 66-file source archives. The before snapshot includes the independently recovered `native_mint::id()` validator and the previously recorded handler Source positions. `source.patch` and the source inventories bind the exact change.

The recorded compiler is the mixed SDK control: the official macOS v1.54 compiler with the 26 unchanged target-library files from the pinned Linux v1.54 archive. This is not a native Linux compiler reproduction. Build commands, source inventories, compiler/tool hashes, target-library hashes and logs are retained. Two original-controller builds reproduce the search artifact exactly.

The saved runtime scope is the existing 486-case Legacy Buy fixture: 187 original successes and 972 cryptographically verified signed transaction records. It checks non-program account effects, errors, returned data, inner instructions, events, and every non-compute log line, with zero differences. These bounded cases do not establish whole-program equivalence or prove that the native CPI error-return callback was executed; the ownership observation is a static instruction/source result.

Run offline checks with Python and the existing `solders` dependency:

```sh
python3 -B verify.py
python3 -B test_verify.py
```

The verifier reads artifacts and uses temporary files; it does not execute a compiler or VM. It rederives all-window preservation, actual callee shapes, Source values, CPI ownership markers, build bindings, complete case-vector identities and transaction signatures. Mutation checks target a real caller, its error Source, its result capture, the source delta and saved runtime records.

No output instructions were patched. The original binary remains a comparison input. The remaining body difference includes register/stack placement and branch/copy scheduling. Full Linux-host compiler equivalence also remains untested: the local Podman socket was denied, and no retry or alternative connection was attempted.
