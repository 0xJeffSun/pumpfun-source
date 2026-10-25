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

## Current results and continuation

The user explicitly confirmed **"Require reconstructed Rust builds."** Acceptance requires independent reconstructed Rust builds and complete capture-byte equality, including ELF data, relocations and layout. Reference-derived assembly, including assembly wrapped in Rust, does not count.

Hosted tail-guard run [40233980723](https://github.com/lalalune/pumpfun-source/actions/runs/40233980723) completed and reproduced candidate12 exactly. The actual source and output are retained in `repro/pump/metaplex-tail-guard-result/`; it is rejected. Do not dispatch the diagnostic formatting proposal until a source base has matching executable bytes.

`repro/pump/metaplex-guard-microprobes/` records six synthetic Rust probes on native v1.37. They show this compiler can generate a single JGE, but do not predict the full handler. `repro/pump/metaplex-native-v137-research/` retains twelve successful full native/hybrid source builds and an initial host-SDK failure. None matches the target Utilize body. Native baseline differs globally despite all 812 source hashes matching Linux candidate11; the hybrid target-stdlib overlay did not repair it. Do not infer the unexplained phase or use native mismatch as proof of a source error.

A fresh local canonical Linux/amd64 build under the existing Podman/Rosetta VM now reproduces candidate11 raw ELF SHA `3bbaf27ff0c10ff68d8a195a82f39eadee266f324067bd0a66081710be30b4ec` exactly. The original Docker-oriented helper is preserved; the adapter mounts only public source, the official read-only v1.37 SDK and public registry cache. An initially stopped full-registry fetch was resolved by explicitly setting sparse transport for cargo metadata. The reviewed positive-expression control also reproduces candidate12 exactly. All 15 subsequent source trials, including the feature-only control, are retained in `repro/pump/metaplex-local-linux-research/`; none matches target text or normalized Utilize. New best is 1514 differing payload positions, worse than candidate11's 1509. No candidate is promoted and no acceptance count changes.

The cached v1.37 Linux source clone `work/metaplex-linux-clean-source` currently contains the if-unlikely Utilize experiment and a disclosed `#![feature(core_intrinsics)]` lib.rs line. Further ordinary trials must explicitly restore `work/metaplex-guard-microprobe/linux-branch-hint-source/lib.baseline.rs`; the serialized driver enforces all other hashes. The owned container locator is `work/metaplex-podman-baseline/container.json`; inspect actual Podman state before reuse. Do not infer running jobs from the locator.

A separate fresh source clone and separately mounted official v1.38 SDK are testing the changed Rust frontend/visibility family with candidate11 source. Driver: `repro/pump/metaplex-v138-research/build.py`; output locator: `work/metaplex-podman-v138-baseline/`. This does not silently change the validated v1.37 container. Preserve actual result and tool selection before drawing conclusions. Same LLVM commit does not exclude changed Rust frontend behavior, and these experiments establish no unique historical recipe.

Continue from a concrete source/compiler discrepancy, using measured source-only builds. The unrelated dirty contract files remain preserved. All remaining core and dependency work is still within the active goal; no impossibility claim or completion is established.
