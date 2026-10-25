# Independent saved review: Relay12/Linux stock v1.48

Saved review **PASS** for run40207765391 attempt1, head `a71de2091f0ab56a4eb2996777f0ecbf51986aa3`. Saved GitHub metadata reports success; artifact12604207171 ZIP2019422B rehashes to API digest `bc6ab05803118461a09522f1c9cdf4b43232df7ee37652d99a67577a09b00a44`, and all72 ZIP members equal the downloaded packet. No network was used by this independent review.

Exact independent tool seal: `90a5868093ac417158bb0fc89d6b92509d3b440e94fac46a7015382764d86b2a`; an unchanged copy is under `review-tool/`. Observed measurement packet manifest SHA256: `d576fc96411768fc659c0523d6d0633eba95de15ee87270f9e29cf8183f41e8a`. Driver SHA256: `350695dc5eb5d8efdf7b37ec542cc6456b55d28ec4bd4ca2edc73856751b54de`.

One frozen23-input compile and strip return0, with **zero** independently recomputed anchored `Error:` backend diagnostics. Source before/after, fixed profile/root flags,232 registry package/7607-file attestations, compiled registry roots and tool before/after records pass. Linux v1.48 has no publisher digest: its measured official-origin acquisition hash is not publisher-authenticated. Published cache/tool bytes are unavailable for independent rehash; their saved inventory attestations remain an explicit boundary.

Candidate501144B SHA256 `41bb7d4a3fc3ca64bad9fee44be2ee034392a1910f746e12a9c421b0f143cdbb`; symbols576520B SHA256 `a18bef15fba0415d87982ac693bc83f4813d2adb6e1e0e0bd53797f3da616146`. Actual candidate/symbol/target ELF headers are all64-bit little-endian ET_DYN, machine263, flags0. The complete same-method ledger recomputes:492 original windows,344 candidate symbol windows,225 normalized original matches,58 raw,267 unmatched;307 closed call-shape pairs. Every retained section/coverage/witness/residual output is compared. The830448B original remains unequal:274217 differing common positions and329304 original-only bytes,70747 positional residual ranges. These are descriptive inventories, not recovery percentages or semantic distances.

The complete608-byte Linux scratch body at10224 matches the original36192 in normalized instructions and relocations. Its **actual** calls at offsets160/560/600 target439304/10832/407000, corresponding to original752688/36800/712224, with complete72/5360/32-byte callee and fixed-point direct-child closure. The actual72-byte `__multi3` wrapper calls the complete352-byte raw-equal leaf. Pointer flow toward external custom_panic is checked only through the retained bounded code anchors; external consumer/runtime ABI and complete data closure remain unproved.

## New direct descriptor comparison

Both descriptors were independently decoded from the actual LDDW relocation and raw prefix bytes, not copied from `static-comparison.json`:

| Field | Original | Linux |
|---|---:|---:|
| scratch reference PC |36776|10808|
| descriptor file offset |773184|465248|
| path file offset |753626|447879|
| actual path bytes |83|83|
| line:column |915:9|915:9|

Actual path bytes are identical:
`/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/slice.rs`

The raw24-byte prefixes differ because their serialized path pointers differ. Path/length/line/column equality is established; whole descriptor object extent and external consumer behavior are not. No unique historical compiler/OS inference follows.

## Bounded direct-r10 scan

A raw allocated-.text instruction walk, skipping LDDW continuations, checks direct r10-based LDX/ST/STX MEM/XADD accesses. Original25661 and Linux19682 such accesses all have offsets/endpoints within `[-4096,0)`: minimum offset-4096, maximum exclusive end0, zero syntactically out-of-range accesses. Exact PCs/opcodes/raw bytes/widths are retained in `direct-r10-scan.json.gz`.

This is **not** a stack-safety/runtime-readiness proof. It excludes derived-pointer/alias analysis, dynamic-frame semantics, call/recursive depth, syscalls, path feasibility, allocator/OOM and runtime verifier acceptance. No target execution was performed.

`actual-review.json` is the concise result; `review-tool-result.json` contains the full tool observations. `direct_decode.py` and `verify_actual.py` reproduce the new direct findings and re-run the unchanged review tool against retained files. New compilations0, new target executions0, selection/promotionfalse, whole-original byte equalityfalse. The different OS/tool distributions/strip bytes and remaining indirect/data/ABI/source/security gaps are preserved.

```sh
python3 -B verify_actual.py --repo /absolute/retained/repository --packet /absolute/measurement/publication
```

The saved artifact/API digest comparison was performed against the downloaded ZIP and metadata named in `actual-review.json`; those external records are not replaced by a claim of fresh API verification here.
