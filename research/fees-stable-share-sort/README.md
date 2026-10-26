# Fees: recover stable sorting in both shareholder validators

The original `sol_memmove_` import belongs to a 32-byte wrapper at `[796392, 796424)`. Its merge-sort caller is `[45488, 50760)` (5,272 bytes). The original legacy and V2 shareholder helpers, `[205768, 211408)` and `[225920, 231576)`, both call that sorter at relative offset 2200.

Changing the two reconstructed `keys.sort_unstable()` calls to `keys.sort()` recovers the **complete merge-sort and memmove-wrapper structural signatures**. It also restores the missing `sol_memmove_` import. Unique structural pairs increase from **338 to 340**, with none lost. The candidate has 579 inferred windows, exactly matching all retained function symbol addresses/extents; 98 original windows remain unmatched. The surrounding shareholder helpers still differ and are not claimed reconstructed by this change.

Both the exact control and stable-sort builds pass **17,331 cases across 18 independent original/candidate SBF suites**. The test scope is bounded and excludes matching raw logs, compute and exhaustive semantics. Whole compiler-file/allocation identity remains false; core raw identity remains **0/4**.

## Verify and rebuild

```sh
python3 research/fees-stable-share-sort/verify.py
python3 -I research/fees-stable-share-sort/verify.py
python3 research/fees-stable-share-sort/map_windows.py
```

The standalone checker re-derives both original caller edges, the merge-sort-to-wrapper edge, and the wrapper's actual external relocation/import identity. It verifies the complete new signatures, all source and artifact hashes, stripped/unstripped `.text` binding, exact candidate boundary inference, strip replays, and both full behavioral receipts. All 26 source inputs and 187 unchanged harness files are bound. The source patch changes exactly the two sorting statements; all other source overrides are identical between control and proposal.

Signatures preserve scalar literals, opcodes, registers, stack offsets and branch displacements. They mask local CALL immediates and actual relocated LDDW addresses, retaining import names and relocation positions. Opaque data and callee bodies are not proven equivalent by those masks. Candidate symbols annotate candidates only; original function roles are inferred from their call/relocation evidence.

The saved `builds/` commands use official platform tools v1.44 with the canonical `sbpf-solana-solana` target and `RUSTFLAGS=-Zremap-cwd-prefix=`. Apply the selected complete overrides at the recorded source revision in a separate workspace, preserve the unstripped output, and strip with the pinned v1.52 tool. Locked dependencies reuse the prior clean baseline. Logs and hashes are not an authenticated process trace.

This includes the preceding parser, dispatcher, source-coordinate and initializer reconstruction overrides, independently of their merge status, and retains their unchecked-input compatibility limit. No selected source/candidate, checkpoint ledger, pinned script or workflow changes.
