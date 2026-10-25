# Corrected ordinary Pump route: fixed-build preflight

This is a reviewable proposal for **one isolated source build**, not an executed build or runtime result. Parent approval of the exact input map remains required. Pump main and the separate nested-creation candidate are untouched.

The sole changed path is `programs/pump/src/multi_hop_curve.rs`, replaced verbatim by the independently reviewed corrected414-line source (24,234bytes), SHA `55c6441320779ff06357831cf081b4a6da8267750c7a5f185d89e1f3e803980f`. The reviewed buyback preflight correction remains intact. No arithmetic, fences, events, settlement or source formatting was changed from that complete published file.

**No `lib.rs` change is needed.** Current Pump's wrapper at line63 already uses `Context<'_,'_,'info,'info,MultiHopCurve<'info>>` and the reviewed result signature. Whole `lib.rs` SHA `47f03b7c4e64e94fe19078ffe73b32827b1868c7e2c857d21917ccef0382a977` matches the corrected review's frozen `476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40` checkpoint. All36current Pump source/workspace inputs are byte-identical to that checkpoint and to the published5c baseline map before applying the one-file proposal. The unchanged `create_v2.rs` baseline is preserved; no nested scratch source is included.

`proposed-source-sha256.json` and the before/after archives bind all36inputs, including standalone Pump manifest/lock, generated type source and existing recovered fragments. The pure existing source-manifest helper independently enumerated exactly these36inputs; no Cargo/compiler/typechecker was invoked. `actual-proposed-build-inputs.json` records the preflight copy's paths; `future-build-source-sha256.json` expresses the same bytes under the proposed execution root. `source.patch` is the exact difference from current5c.

The recipe stays fixed: platform-tools v1.44 compilation, the recorded53-file SDK and its actual unchanged v1.52 objcopy stripping, offline locked Cargo, same profile/features/flags. Current three build helpers match the accepted baseline. Actual compiler/linker/CLI/stripper files match their retained hashes. The read-only cache check confirms all252locked registry packages, every retained archive checksum and all14,281archive/source files from the earlier dependency inventory. No fetch, dependency edit or cache marker fabrication occurred. These observations do not establish a hermetic historical graph or continuous cache immutability during a future build.

The proposed source root is `work/pump-general-route-recovery/run-01/source`, output `work/pump-general-route-recovery/run-01/build-01`. The unchanged helper creates isolated SDK links, Rustup home and Cargo target inside that output. `build-plan.json` records exact arguments/environment. The corrected review's148payload seal/archive and successful static verifier output are preserved; predecessor hypotheses and their limitations are retained unchanged.

After explicit parent approval, copy only this exact source set to the fresh execution root, freeze input/tool/dependency hashes again, and compile once. Preserve compiler errors and stop before any source repair. A successful build must receive honest whole-ELF comparison and fresh complete relevant body/direct-call/data analysis; it establishes no semantic equivalence or main acceptance. Runtime fixtures, driver changes and any main promotion require their own concrete validation plan. Genuine AMM PDA invocation and ordinary signer checks must remain intact.

The supported hypothesis remains general ordinary Tokenkeg routes with strictly noncompleting buys. Reconstruction fences are not recovered historical account policy. Framework context/API/type/lifetime/stack lowering remains an actual build question. Transitive/indirect/data closure, native caller premises, aliases, repeated curves, cycles, mixed directions, arbitrary interior native transitions, short resize and completion are unproven. Token-2022/extensions, holder/cashback/Mayhem modes and all stopped lanes remain excluded. Neither handler counts nor normal-operation success increase here.

```
python -B /path/to/pump-general-route-build-preflight/verify.py
python -B /path/to/pump-general-route-build-preflight/verify.py --repo /path/to/repo
```

The first command verifies the portable source/build proposal and archived static review without invoking a compiler, runtime or signing API. `--repo` also checks live baseline/source helpers and observed tool/cache bytes for drift. No new source build, SBF execution, fixture, main-source change, staging or commit is included.
