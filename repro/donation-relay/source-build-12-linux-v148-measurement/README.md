# Frozen Relay12, official Linux v1.48 measurement

One controlled build completed in [run 40207765391](https://github.com/lalalune/pumpfun-source/actions/runs/40207765391), attempt 1, at PR9 merge `a71de2091f0ab56a4eb2996777f0ecbf51986aa3`. Compiler and strip returned **0**, with **zero anchored backend Error diagnostics**. No transaction, VM, deployment or selection occurred. The measured source is frozen **Relay12**, not selected Relay13.

The downloaded artifact is preserved intact under `download/`, together with the exact 72 exported files in `download/extracted/`. Its 2,019,422-byte ZIP matches the saved GitHub artifact digest `bc6ab05803118461a09522f1c9cdf4b43232df7ee37652d99a67577a09b00a44`. The inner publication manifest is `d576fc96411768fc659c0523d6d0633eba95de15ee87270f9e29cf8183f41e8a`. Dispatch request, acknowledgment and accepted-run observations are under `dispatch/`; there was one dispatch and one program-build attempt.

## Actual build and provenance

The exact 23 frozen source inputs, locked 232-package graph, profile, remap flag and legacy genericV0 target were preserved. Before/after source hashes agree. The private registry records authenticate 232 archives and 7,607 source members. Verbose rustc commands actually mention **151 registry roots containing 3,405 authenticated members**; this does not mean every member was opened, all locked packages compiled, or all host crates linked into the target. These actual Linux counts differ from Darwin's 152/3,857.

The compiler is official v1.48 Linux asset 254652416, 516,334,851 bytes, measured SHA256 `a9d3157f937d5f6faf4321a35a8035e0f827114a663b0150db492e893ec27597`. Its publisher digest is null. The strip distribution is official v1.52 asset 310634197, 519,270,959 bytes; measured SHA256 equals its publisher digest `8b3861e93daf085ec12b65c4fac374d9bec4587a3de16871da6b08ab0c1d907e`.

There are 61 selected compiler-tool/member records, including 25 legacy sysroot records, with before/after identity agreement. Stock target queries declare Solana family, genericV0, `+store-imm,+jmp-ext`, no dynamic frames. The actual release root invocation uses opt-level 3, panic abort, one codegen unit, overflow checks and the unchanged remap flag; no LTO, target-cpu or target-feature override was added. The verbose compiler identifies Rust 1.84.1-dev / LLVM 19.1.7 but reports unknown commit hash/date. The pinned Rust-source identity is established through the measured distribution's version.md assertion, not a verbose-compiler self-report.

Archive/cache/native-tool bytes are deliberately absent from the publication allowlist. Their measured hash maps and before/after receipts are retained attestations, not new local rehashes of unavailable bytes. Host system libraries are not a closed hermetic dependency set. Linux and Darwin use different host/tool/strip bytes; this is not an identical full recipe or a unique historical-compiler proof.

## Complete comparison and bounded closure

| Observation | Linux result |
|---|---:|
| Stripped bytes | 501,144 |
| Stripped SHA256 | `41bb7d4a3fc3ca64bad9fee44be2ee034392a1910f746e12a9c421b0f143cdbb` |
| Unstripped bytes | 576,520 |
| Unstripped SHA256 | `a18bef15fba0415d87982ac693bc83f4813d2adb6e1e0e0bd53797f3da616146` |
| Original inferred windows / candidate symbol windows | 492 / 344 |
| Original normalized / raw matches | 225 / 58 |
| Original unmatched windows | 267 |
| Closed recursive direct-call-shape pairs | 307 |
| Different common byte positions / original-only bytes | 274,217 / 329,304 |
| Whole original equality | **false** |

Every section, coverage, match witness, function and positional residual ledger is retained and independently recomputed. Counts are descriptive inventories, not completion percentages or semantic distances. The Linux and Darwin candidates have equal file lengths but differ at 29,439 positions. The Linux run adds one raw original-window match under the same fixed method; normalized/unmatched counts remain 225/267.

The complete 608-byte scratch helper at Linux 10224 matches original 36192 in normalized instructions and relocation patterns. Its actual calls at offsets 160/560/600 resolve to complete 72/5,360/32-byte counterparts of original targets 752688/36800/712224, including the 5,360-byte child's seven direct calls and fixed-point call-shape witnesses. The actual multiply wrapper calls the complete raw-equal 352-byte leaf.

Independent direct decoding of the actual descriptor references establishes the same **83 bytes** in both files:

`/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/slice.rs`

Both carry **915:9**. This closes the observed Darwin control's 84-byte `/Users/runner/` path difference for this bounded descriptor. The raw 24-byte prefixes remain unequal because their path pointers differ; complete object extent and external custom-panic consumer behavior remain unproved. Actual descriptor offsets/path offsets are original 773184/753626 and Linux 465248/447879.

The independent raw-text scan checks 25,661 original and 19,682 Linux direct r10-based memory accesses, with zero syntactic accesses outside `[-4096,0)`. This is a width-aware direct-access observation. It does not analyze aliases, derived pointers, call/recursive depth, path feasibility, dynamic frames, allocator/OOM or runtime verifier acceptance.

## Recompute saved bytes

```sh
python3 -B repro/donation-relay/source-build-12-linux-v148-measurement/verify.py --repo .
```

The verifier checks exact exported bytes against the preserved ZIP and digest observations, immutable independent review records, complete ledgers, actual call/descriptor witnesses and bounded direct-r10 observations. It makes no compiler, network, VM or target call. Independent tool control seal is `90a5868093ac417158bb0fc89d6b92509d3b440e94fac46a7015382764d86b2a`; actual direct review seal is `cffcb50c1dbf2a3ff64bbf268c4aa8caadeca2b9793b1f1d09ed43c4ea4e9a28`.

`provenance-review/` preserves a separate review, seal `de917f6b5c3921d6f9a4d40fb82a3665fbed98bad1ff120f16bd57b5ce873db9`. Its historical-baseline CLI additionally expects the retained a71de209 Git object and its selected-Relay13 pointer; it must not be presented as a current-selection checker after future promotion. The default verifier above checks the preserved measurement independently of future source selection.

Whole-original identity, remaining application/indirect/data/ABI/security gaps and historical recipe uniqueness stay open. The measured artifact was unselected at recording. The next proposal measures frozen selected Relay13 separately; no result from that proposal is claimed here.
