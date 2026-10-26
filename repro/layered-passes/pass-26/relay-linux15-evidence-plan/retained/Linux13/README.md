# Frozen Relay13, official Linux v1.48 measurement

[Run 40209794148](https://github.com/lalalune/pumpfun-source/actions/runs/40209794148), attempt 1, measured frozen source13 at main `2508c2be79bc5e66956dcd979e5d2f2a780fd851`. There was one dispatch and one program-build attempt. Compiler and strip returned **0**, with zero anchored backend Error diagnostics. Source remained unchanged. No VM, target transaction, deployment or selection occurred.

The original ZIP, hosted metadata and 73 exported files are retained under `download/`. The 2,031,037-byte ZIP matches the saved GitHub artifact digest `d88a7a9137ecffea1b3d5af5323a0389cc5369c3e68c19962a71ad6a00b8a978`. Exported manifest SHA256 is `35dd05161b7872a2e770481422baf8d78ce50bc7d2e194d17d1b2e45e3ade66d`; independently replayable review seal is `380997520e97afd7b2fc0f12d148ed6a2ce44ba14f0007d5386fe6a18ee092dc`.

## Source-controlled Linux12 comparison

All 23 inputs match the frozen selected13 snapshot; only `src/idl.rs` differs from actual Linux12. Lock and release profile are identical. The compiler archive is pinned to its earlier measured SHA256 `a9d3157f937d5f6faf4321a35a8035e0f827114a663b0150db492e893ec27597`, in addition to official release/asset identity. Its publisher digest remains null. The v1.52 strip archive matches its publisher SHA256. Before building, 61 selected compiler/tool records, 25 legacy sysroot records, strip bytes and stock cfg/spec agree with actual Linux12. The actual target remains Solana-family genericV0, `+store-imm,+jmp-ext`, without dynamic frames.

The cache attests 232 archives and 7,607 source members; actual rustc logs mention 151 roots containing 3,405 authenticated members. This does not establish that every member was opened or linked. Full tool/archive/cache bytes are not exported, so their saved inventories remain attestations. Host image/libc/loader observations do not close the entire host dependency set or prove complete host identity with Linux12.

| Observation | Linux13 |
|---|---:|
| Stripped bytes | 501,576 |
| Stripped SHA256 | `506b11353f8eb15d079794656eaf6c10d1a8da2c50d2e90cbdbe949a3ecdd0fb` |
| Unstripped bytes | 576,952 |
| Unstripped SHA256 | `8a451b77cfe634bc0628209c96457c7a68524c6d4fcfbffc6cce9d8a67d669ac` |
| Original inferred windows / candidate symbol windows | 492 / 344 |
| Original normalized / raw matches | 225 / 58 |
| Original unmatched windows | 267 |
| Different common positions / original-only bytes | 274,442 / 328,872 |
| Whole original equality | **false** |

All 492 status/raw/normalized rows are unchanged from Linux12. The extra 432 file bytes and 94,846 differing common positions therefore do not establish a semantic gain or a match regression. Full ledgers retain every negative and ambiguous alternative; counts and positional differences are not completion percentages or semantic distances.

The complete scratch helper and all three actual callees retain their bounded code/relocation/direct-call closure. Direct decoding confirms the same original/Linux12/Linux13 83-byte `/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/slice.rs` path and 915:9 coordinates. Raw descriptor prefixes differ with their pointers; full object extent and external consumer behavior remain open. The raw-text width-aware scan finds 19,687 direct Linux13 r10 accesses within `[-4096,0)`. Alias, derived-pointer, path, call-depth and runtime-verifier safety are not proved.

## Same source, older selected recipe

The exact same analysis method was also re-run against prior source13's selected v1.44 artifact and this measured Linux v1.48 artifact. All 23 source inputs match byte-for-byte across these recipes.

| Original windows | Prior selected v1.44 recipe | Linux v1.48 recipe |
|---|---:|---:|
| Normalized matches, including raw | 122 | 225 |
| Raw matches | 33 | 58 |
| Unmatched | 370 | 267 |

All prior matches survive: 103 normalized gains, 25 raw gains, zero losses. Twenty previously unmatched windows become raw matches, 83 become normalized-only matches, and five prior normalized-only windows become raw. Full before/after ledgers and all 492 rows retain alternatives, actual callees, indirect calls and data limits. Candidate symbol spellings do not retrospectively identify original function names. In particular, the 72-byte wrapper has three normalized alternatives; actual callees reject two of them.

Compiler distributions, OS/native environment, stripping and cache/build context differ. This demonstrates an improvement associated with a measured recipe under the fixed method; it does not isolate compiler version as the sole cause, identify a unique historical recipe or prove runtime equivalence. Positional differing bytes increase while window matches improve, illustrating why positional counts are not semantic distance.

## Complete Unicode data closure

The direct Unicode follow-up checks the actual original and Linux13 696/704-byte consumer/check bodies, their real call and six real data references. Complete owning-source bounds, argument counts, strides and encoded ends establish all six arrays totaling **1,449 bytes**, with zero gaps or overlaps: original `[770186,771635)`, Linux13 `[462744,464193)`. The full bytes match. This does not transfer a result from a Fees source graph or infer full arrays from 64-byte samples.

Immediate diagnostic descriptors, path fields and bounded callees are retained. Their outward panic, indirect-call, external-consumer and transitive data graph remains open. No whole-library, runtime or historical-compiler uniqueness claim follows from these bounded code/data results.

## Recompute

```sh
python3 -B repro/donation-relay/source-build-13-linux-v148-measurement/verify.py --repo .
```

The default check replays the independent actual13 review, both complete Linux ledgers, all 492 Linux12→13 rows, the older-recipe comparison and all six complete Unicode tables. It makes no native compiler, Cargo, network, VM or target call. Historical frozen source and method inputs must remain available; no current-selection pointer is used.

`recipe-comparison/` and `unicode-data/` retain original sealed records alongside publication variants. The only variant changes relocate the ignored downloaded-artifact paths and the Unicode prior-record locator into their published locations. The verifier checks these exact relocations, every unchanged payload and both complete re-computations. Original manifests `17ed9b4f...` and `5bc7b799...` are preserved; no old globals, original verifier or analysis/data bytes are patched at runtime.

The candidate was unselected at recording. These measurements do not complete source reconstruction, close the remaining 267 original windows, or establish complete indirect/data/ABI/security equivalence. Whole-original acceptance remains false.
