# Continuation checkpoint

Goal remains active: finish independent source reconstruction to whole-original byte identity. No core contract or dependency acceptance count changed during this work.

The shared checkout remains at `5bb3dec06cccecc8cea529fc17815aa1bf78d17a`, with pre-existing contract edits preserved. Research commits are on `codex/disassembly-recovery-20261025`; no checkout, reset, merge or shared-index mutation was performed. The research branch contains one workflow change that is intentionally not written into the shared checkout's tracked workflow file.

## Completed

- Pinned and built Blueshift `sbpf` at `a161bf149e2265b2db79a443afc5c42fcfacc0a0`.
- All nine original executable sections decoded without diagnostics: 788,302 instructions / 6,567,472 bytes.
- All nine instruction-mnemonic assembly round-trips are raw `.text` exact. Actual assembled ELF files are retained. Full ELF equality is false; these reference-derived outputs do not count as independent recovered Rust builds.
- `scripts/sbpf_disassembly_inventory.py`, `scripts/sbpf_disassembly_roundtrip.py`, this packet's `verify.py`, the positive-guard result verifier and two source-proposal verifiers passed locally.
- Hosted source run `40233083060` compiled the actual reviewed positive guard, patch `c6256bf2…`, and reproduced candidate12 exactly (`4f039033…`, 196,601 differing padded positions). Its failure is a measured negative comparison, not a compiler failure. Evidence: `repro/pump/metaplex-reviewed-positive-guard-result/`.
- The older hosted run `40191551052` used a different unified-guard patch. Do not treat its workflow input label as proof that the reviewed positive guard was previously tested.
- Prepared a clearly disclosed formatting reconstruction for 29 diagnostic records in nine files. It remains unbuilt because executable-section equality is its prerequisite: `repro/pump/metaplex-diagnostic-coordinate-recovery/`.

## Current experiment

Hosted run [40233980723](https://github.com/lalalune/pumpfun-source/actions/runs/40233980723), research checkpoint `b1f07b0bdb7ba0607448d65a097f8c62600a3cf0`, is building the dedicated `token_metadata_tail_guard_recovered` workflow input. The trial is `repro/pump/metaplex-tail-guard-source-recovery/`. It preserves the zero/total guard and all success statements, but makes remaining<requested yield the error as the function's tail branch; the else arm contains the complete success continuation. This tests earlier CFG block ordering because the pinned BPF backend cannot analyze conditional branches for late folding.

1. Wait for that run, then download its `metaplex-rebuild-<runid>` artifact to a fresh work directory.
2. Check the actual source patch and `patch-source-inputs.json` against the proposal, not its workflow label. Distinguish compilation failure from expected inequality exit1.
3. Compare raw `.text` and every ELF section against the target. If the target executable section is reproduced, prepare the diagnostic formatting on that successful source base and perform a pinned source-only follow-on build. The current formatting proposal is based on the previous positive guard, so it must not silently be reused as though it contained a later source fix.
4. If the tail trial is also negative, retain the actual bytes and complete difference; do not dispatch the formatting-only trial or promote the larger mismatch.
5. Continue from a new concrete operand/CFG/call/data discrepancy. No original-source impossibility claim is established by these negative experiments.

The optional acceptance question asked whether documented assembly source may also count if it independently rebuilds complete ELF/data/relocations/layout. Until an answer changes that requirement, continue requiring independent reconstructed Rust builds. Never count this packet's reference-derived assembly round-trips as that acceptance.
