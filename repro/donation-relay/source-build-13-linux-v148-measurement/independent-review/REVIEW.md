# Independent actual Relay13/Linux v1.48 saved review

Independent saved review **PASS** for run40209794148 attempt1, head `2508c2be79bc5e66956dcd979e5d2f2a780fd851`. Saved hosted metadata reports success. Artifact12604389091 (2031037B) independently rehashes to saved API digest `d88a7a9137ecffea1b3d5af5323a0389cc5369c3e68c19962a71ad6a00b8a978`; all73 ZIP members equal the downloaded packet. No network or target/compiler execution was used by this review.

Frozen reviewer seal `b4876acadae4865d02cb158398fd33fa85236dafc24bfff9985f68c1f16f0fa6` is copied unchanged under `review-tool/`. Actual packet manifest SHA256 is `35dd05161b7872a2e770481422baf8d78ce50bc7d2e194d17d1b2e45e3ade66d`. Measurement driver SHA256 is `445bc1298834758770c5d145d7dc75811a76627f963857b8e7a6bb3ae457bfbd`. Historical replay uses frozen13 source/manifest and actual12 control, with no current selection-pointer dependency.

All23 inputs equal frozen Relay13 manifest1d323/source-map1280. Only `src/idl.rs` differs from actual Linux12; Cargo.lock and profile are unchanged. Actual compile/strip receipts return0/0, source/tools/cache-after records agree, and independently recomputed anchored backend `Error:` count is0. The232-package/7607-file cache attestations bind to the fixed registry source map. Exact61 selected tool records,25 legacy sysroot records, cfg/spec, archive measurements and strip inventory agree with the immutable actual12B54/d576 control. Host system-library identity remains unproved; v1.48 has no publisher digest and unexported cache/tool bytes remain an attestation boundary.

Candidate501576B SHA256 `506b11353f8eb15d079794656eaf6c10d1a8da2c50d2e90cbdbe949a3ecdd0fb`; symbols576952B SHA256 `8a451b77cfe634bc0628209c96457c7a68524c6d4fcfbffc6cce9d8a67d669ac`. Actual ELF headers remain64-bit little-endian ET_DYN, machine263, flags0. Complete original/candidate ledgers, section/coverage/call/data witnesses and all residual ranges recompute. Target830448B remains unequal:274442 common-position differences,328872 original-only bytes,70779 residual ranges. Original492 windows/current344 symbol windows retain225 normalized and58 raw original matches,267 unmatched,307 fixed-point call-shape pairs. These counts are descriptive, not a recovery percentage or semantic gain.

## All492 actual window transitions

Both complete actual12 and actual13 ledgers were independently regenerated. `window-transitions.json` retains **every492 row**, including unchanged negatives. Each original ordinal/start/end/size is matched; status is independently derived from its raw/normalized candidate-index arrays. There are **zero changed status/raw-match/normalized-match rows** between Linux12 and Linux13. The files nevertheless differ at94846 common positions and Linux13 grows432 bytes. Equal booleans do not establish equal candidate-target mappings, effects, security or whole identity.

## Actual callees and descriptor bytes

The actual608-byte scratch candidate and all three offset160/560/600 callees close with complete instruction/relocation and recursive direct-child evidence, including the actual72-byte multiply wrapper's raw352-byte leaf. Actual target addresses/bounds remain in `actual-review.json`/the full tool report, rather than inferred from symbol names or prior offsets.

Direct decoding from original/Linux12/Linux13 LDDW relocations and24-byte prefixes confirms the same actual83-byte path:
`/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/slice.rs`

All carry line915, column9. Linux13 descriptor file offset465680/path offset448311; original773184/753626; Linux12465248/447879. The pointer-bearing raw prefixes differ. Path/length/coordinate equality is bounded evidence; full descriptor object extent, external panic consumer behavior and runtime ABI remain unproved. `reused-direct-decode.py` is byte-identical to the prior cff helper; its source SHA and provenance are recorded, and this review supplies new Relay13 data/start points explicitly.

The optional bounded raw-.text direct-r10 scan covers25661 original,19682 Linux12 and19687 Linux13 memory accesses, all within `[-4096,0)` (minimum-4096, maximum exclusive end0). All raw PCs/opcodes/widths are retained compressed. This excludes aliases/derived pointers, dynamic-frame semantics, call-stack/recursive depth, allocator/OOM, path feasibility and runtime verifier acceptance; it is not a stack-safety proof.

New compiles0; new target executions0; runtime acceptance/selectionfalse; whole-original byte identityfalse. Changed checked-borrow-failure dynamic coverage remains zero. Stock compiler/library/code/path matches do not establish historical uniqueness or full source/security equivalence. Darwin12 comparison changes source and environment together and does not isolate OS.

```sh
python3 -B verify_actual.py --repo /absolute/retained/repository --packet /absolute/actual13/publication
```

This portable verifier replays saved-byte review and direct scans only. Saved ZIP/API observations are retained in `actual-review.json`; fresh hosted/API acceptance is not asserted by the replay.
