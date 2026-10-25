# Relay source build06: recovered fixed writer

The single approved build of the fixed-account BpfWriter correction completed with exit0 and no backend stack-limit diagnostics. The actual writer now has the same complete288-byte normalized instruction shape as original window281, and both import `sol_memcpy_`. Their overflow location resolves to the same `src/bpf_writer.rs:28:9`, naturally produced by the unchanged upstream writer file. The short-write error constructor remains different. None of the four complete account serializers is a full-body match, and the whole executable remains unequal.

The451,896-byte candidate has SHA256 `522a9799bc3f73872333a16f3c95836ccfdcb816e80f159c7fc3dafa726e4fd4`; the620,560-byte symbol file is `09e8293709f5577e8fff5ff718a6ae746080ef9d0d898b1153ac36c9f62f4a76`. The captured original is830,448 bytes, SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. This package contains the actual compiled22 inputs, full compiler output, retained artifacts, source/tool/SDK/dependency checks and complete static ledgers. It performs and claims zero runtime executions.

## Exact build and provenance

The root authorized one build from the frozen133-payload source proposal (`0248828dd08316ca4e3565bdd31f4effb32372363b2f889d234d6e79f679f4d9`). The launcher seal is `ea9ff66f395d3572480ae9850e53ac9dca373cd751e21976b358661f39ca76be`. Its runner is byte-identical to build05. The only changed existing source is `src/generated_exit.rs`, and the only added input is `src/bpf_writer.rs`; the22-file launch, proposal, resolved and post-build maps agree. Cargo manifest, lock, compiler flags and dependency versions do not change.

The new writer file is the exact retained official anchor-lang0.31.1 implementation (SHA256 `544511c105eb66783551f85ef85f4e60b13c86350de6d9f1441fff94937d8511`), not a claim that this uniquely identifies the historical Anchor release. Its archive, source-proposal patch and attribution are retained. No artificial path or source-line padding was introduced. The source module lives at its normal `src/bpf_writer.rs` path.

Seven executable/tool hashes match before and after; all53 SDK files match their expected bytes/modes; all232 selected dependency source manifests match their retained public archive views. Actual phases remain v1.44 compilation and the recorded v1.52 SDK strip tool. Invocation records identify the source and flags, but do not claim process-level tracing or unique historical tool provenance. The target, SDK, Cargo registry and rustup workspace were isolated by the same runner. This reviewer invoked no build. `collect.py` copied only mapped source inputs and named retained ELF/symbol files; it never read deployment keypair contents.

Both the saved compiler result and parent completion report are exit0. Full stdout/stderr are retained. `stack-observations.json` enumerates all289 symbol-delimited windows and their direct r10-based accesses; none has an observed access below-4096. No `Error:`, `Stack offset of` or overwrite diagnostic appears. This is a bounded static observation, not proof of all dynamic stack behavior or loader/runtime acceptance.

## Complete comparison and honest change from build05

| Measure | Build05 | Build06 |
| --- | ---: | ---: |
| Original inferred windows | 492 | 492 |
| Candidate symbol windows | 279 | 289 |
| Originals with raw body match | 29 | 33 |
| Originals with normalized body match, including raw | 110 | 120 |
| Original windows without normalized match | 382 | 372 |
| Normalized pairs | 277 | 307 |
| Internal-call-shape fixed-point pairs | 111 | 132 |
| Candidate ELF bytes | 452432 | 451896 |

The fresh computation uses the same corrected relocation-first analyzer: a type10 relocation takes priority over the relative-call nibble. Normalization only masks direct-call and relocation-backed lddw address immediates in memory; no executable is edited. Complete raw ledgers, all actual calls, references, sections and63,488 positional residual ranges are retained.247,805 common-position bytes differ, and378,552 bytes exist only in the original tail. Positional counts are not semantic distance.

`before-after-window-delta.json` explicitly lists the ten newly matching original windows. Four become raw matches (54/265/349 to the same16-byte candidate Error::cause helper29;384 to the40-byte StringError::description helper198). Six gain normalized matches:277,281,357,360,385,386. Several map to the same candidate formatting helpers, so this is not ten independent recovered application functions. No previously matched original loses its match category. Source recovery and full program equivalence are not inferred from these counts.

## Writer, actual targets and literals

Original281 at651064..651352 maps to candidate72 at62424..62712. All288 normalized bytes match; raw bytes do not. The external sites651224 and62584 independently carry type10 `sol_memcpy_` relocations. Raw immediate equality alone is never used to identify their target. Both writers make one bounded copy, update position once, and immediately report WriteZero if the requested field was not fully written. The build05 Cursor retry loop is gone.

There are two actual direct targets. Original short-write constructor256 at645296..645584 is288 bytes; candidate Error::new1 at1744..2264 is520 bytes and does not normalize to the original. Both construct the exact28-byte `failed to write whole buffer` via immediate stores, then build the error. Candidate1 inlines the selected SDK bump-heap allocation using the0x300000000 arena; original256 calls its separate allocator helper. The error representation, allocator/OOM path and drop/indirect behavior remain material gaps. No new allocator source correction or compiler flag is proposed from that distinction alone.

Original overflow target449 at738080 and candidate257 at391224 share the complete88-byte normalized shape. Their first format literal is byte-identical, but full formatting/panic transitive identity is not asserted. The writer's own24-byte location records have differing encoded addresses; relocation-aware decoding yields the same17-byte filename `src/bpf_writer.rs` and line28/column9. `writer-comparison.json` retains raw descriptors, relocation records, referenced bytes, both entire direct target bodies and every positional residual. This supports the writer source contract; it does not erase the unequal error target.

## Fixed serializers and remaining boundaries

Tracker/Distribution/Debouncer persist functions are now1392/1464/1376 bytes (build05:2000/2224/1984). The complete original serializers are968/1040/952 bytes and remain unmatched. The compiler inlines the first four field writes into each persist body and calls writer72 for remaining fields. Receipt's four writes are inlined into the31,608-byte just-swap wrapper88; it is not represented as a standalone receipt symbol.

`serializer-fields.json` maps all23 original field calls to the actual candidate sites, distinguishing direct type10 memcpy imports from calls to writer72. The preserved field widths/order are Tracker8,1,1,32,32,16; Distribution8,1,1,32,32,16,8; Debouncer8,1,1,32,32,8; Receipt8,1,32,8. No field-size or token/authority behavior was changed.

The complete direct-call envelope covers35 original windows and95 candidate windows, with184/172 relocation-backed data references and9/4 indirect-call sites respectively. The candidate envelope deliberately includes the entire just-swap wrapper. Every direct target resolves to an enumerated window. The indirect calls, complete vtable data, allocator and other framework details remain unproved. At-most64-byte data samples can straddle objects; only explicitly decoded literal extents are claimed complete.

Candidate arena-index guards, framework layouts, account-error lowering and original caller wrappers still differ. The strict6009 source-origin mismatch and six unavailable fixed-authority success routes remain open; neither was rerun or altered. No historical authority, signatures, VM controls or source origins were substituted. Earlier ordinary receipts are not claimed for these unequal bytes. The parent may run the unchanged ordinary12 separately after this static gate; those results belong in their own package. The legacy analyzer field `execution_suitable:false` is a static-only default, not an observed runtime failure.

## Verification

Run `python3 -B /path/to/package/verify.py` from any directory. Optional `--repo /path/to/pumpfun-source` additionally binds existing public original/build05 paths. It requires no `work/` directory, toolchain or registry installation. It recomputes all492/289 windows, all residual bytes, the field/writer/data reviews, disassembly and source/tool/dependency checks. It never compiles, signs, loads or executes a target. Copied-directory positives and missing/tampered/semantically altered evidence negatives are recorded in `verification-tests.json`. No cache files are present in the seal.
