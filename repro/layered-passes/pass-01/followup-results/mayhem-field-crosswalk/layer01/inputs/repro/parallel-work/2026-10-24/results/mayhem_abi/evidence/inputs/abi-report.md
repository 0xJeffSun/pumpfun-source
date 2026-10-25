# Mayhem error-return provenance

The observed return convention remains a compiler/framework lowering gap. The inspected original and current error constructors use the same boxed payload size and field layout. No Error enum rewrite, manual codec, source-location change, or replacement compiler release is justified by this evidence.

This review uses retained source, ELFs, build records and installed official-tool artifacts only. It made no network fetch, compiler invocation, build, source edit, or runtime probe. The stopped initializer is excluded. `analysis.json` contains raw addresses, instructions, source-location records and explicit limits.

## Fixed binary identities

- Original: `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`.
- Current Mayhem24: `9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b`.

The current unstripped ELF's entire text section matches the accepted candidate. The earlier burn-codec review remains separately sealed; this directory copies its analysis and manifest as provenance without changing them.

## Error representation versus return lowering

Original constructor 632296–632880 and candidate 530416–531008 each allocate a 160-byte AnchorError. Their observed payload writes agree: strings at offsets 0x20 through 0x48, optional origin representation at 0x50, error code at 0x98, and the leading optional compared-values representation. The original returns discriminant zero in r0 and the box pointer in r1. The candidate writes discriminant zero and that pointer to the caller-provided output buffer at offsets 0 and 8.

This agreement covers this constructor and variant. It is not proof of every nested error type or all framework behavior. Nevertheless, the visible difference is at the return boundary, rather than a demonstrated changed payload shape.

The selected Anchor 1.0.0 Error enum has two boxed variants. Its declaration is byte-identical to the retained 0.31.1 reference declaration; that comparison does **not** justify downgrading Anchor. The full selected error.rs is byte-identical to the already retained official Anchor source at commit `25be6d502ec6957d34d436bc2a6170040fc64153`, bound by the original retrieval provenance. Current ErrorCode::name (3072 bytes) and Display (2552 bytes) also have complete normalized matches to original bodies 629224 and 632880. Actual recursive data/call equivalence is still unproved.

Earlier burn evidence supports the Anchor 1.0 family through duplicate mutable-account error 2040, the Pubkey-based CpiContext, and event-CPI behavior. Those observations remain family evidence, not unique attribution to exactly 1.0.0. The original full dependency graph remains unavailable.

## Concrete compiler-family evidence

The accepted current build explicitly selects platform-tools v1.52. Its retained rustc metadata reports Rust 1.89.0-dev, aarch64-apple-darwin, LLVM 20.1.7. The installed artifact's version.md names anza-xyz/rust commit `790f1537507dbdb0da320fbb3b1c1eca3b33c474`. Its rustc executable SHA is `c58ec8ad482a40216152a4e4a6172f485be22a7f4482623e7e3cdf6c7085beb8`, freshly read without execution and equal to the retained burn build-03 fingerprint. These identify the controlled current baseline, not the original compiler.

The original error constructor references an actual relocated SourceLocation naming `/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs`, line 2830, column 14. The current constructor references the corresponding `/Users/runner/...` path at the same line and column. The installed v1.52 source has the Display-to-string `.expect(...)` at that exact location. Both binaries' write_all helpers reference `src/bpf_writer.rs` at 33:9. Both also embed hashbrown-0.15.4 paths, with the respective `/home/runner` and `/Users/runner` roots; the hashbrown paths are literal inventory clues, not newly traced executable references.

These are compatible compiler/source-family clues. Under the assumption that the path metadata was not remapped, they distinguish Linux-style and Darwin-style **tool-artifact build roots**. They do not establish the program compilation host, the exact original platform-tools release, or the cause of the return convention.

The recovered program source-location difference is separate: original `programs/mayhem-program/src/state.rs` line 505 versus candidate `src/state.rs` line 6. It is diagnostic provenance, not grounds for line padding or remapping.

## Formatting near matches do not identify a different layout

The six small formatting helper leads contain seven changed load/mask pairs. Original code loads one byte at Formatter+18 and tests bit 7. Current code loads a 32-bit word at Formatter+16 and tests bit 23. These access the same bit in little-endian memory. The bundled v1.52 source defines ALTERNATE_FLAG as 1<<23.

This is concrete load-width/code-generation variation. It supplies no evidence that Formatter's source layout changed, and it does not by itself identify a compiler version.

## Prior trials and remaining limit

The retained burn lineage documents three attempts using v1.52: build-01 failed with E0614 in an attribute expression; build-02 compiled with the convenience event macro; build-03 replaced that macro's mismatched account representation with explicit borrowed fields. Separate records pin macro crates from an initially permissive 1.2.1 resolution to 1.0.0. Those are source/dependency preparation attempts, not a controlled test of this return-ABI difference. This is a bounded history review, not a claim to have inventoried every build in the repository.

A concrete next build choice needs original compiler/platform provenance or a retained official artifact tied to the observed return convention. The current evidence cannot distinguish Rust/LLVM lowering, build-profile effects, or unobserved dependency representation details sufficiently to propose such a build. Preserve the current source and prior failures; do not manufacture return layout with source variants.

`python3 -B verify.py` checks the seal and recomputes all saved claims from the 24 frozen inputs. No external work/cache files or compiler execution are required.
