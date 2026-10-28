# Mayhem: live module order closes the meaningful ELF's remaining 30 bytes

Two fresh native dependency builds produce an ordinary stripped ELF equal to
**every one of the original meaningful ELF's 775,416 bytes**:
`9af9e3b1cbc9d89340af4d9d46e4c88d3dc2fc67e0090f9370047d97532ff09d`.
Both complete, unstripped compiler outputs also repeat exactly at 907,776 bytes:
`7b15bb1e5c7c9c53041322fa64d4a420906fffd96ff97a55d70d627bcb854960`.
The original allocation image is 777,408 bytes and has a separate 1,992-byte zero
tail. These builds do **not** produce that allocation image. No output byte
patching or fabricated padding is used; the only post-link operation is
`llvm-objcopy --strip-all symbols.so candidate-v154-strip.so`.

This is a new qualified recipe for the existing reconstruction, not an assertion
that its source or compiler provenance is historical. It explicitly retains the
target-derived linker layout, metadata/path remaps, pinned SDK/sysroot and reused
historical host macro from the native441 recipe. No target program is executed.

## Change and control

The baseline is merged [PR439](https://github.com/lalalune/pumpfun-source/pull/439),
commit `9f3a6988f4d83dd3054f83115914a177756999a5`, using PR432's complete 441-window
source. Its stripped ELF differs from the meaningful original by 30 bytes:
one `.dynsym` byte, 20 `.dynstr` bytes and nine `.rel.dyn` bytes. Its dynamic symbol
indices 7 and 8 place `sol_memcpy_` before `sol_log_data`; the original reverses them.

The only source change moves the live `mod bpf_writer;` declaration in
`vendor/anchor-lang/src/lib.rs` from line 40 to the previously blank line 151,
immediately after the inline `solana_program` module. The old line becomes blank.
All function text, existing line numbers and total line count are unchanged.
`source.patch`, both complete source archives and delivered source pins are retained.
No dead reference, synthetic object, inline assembly, extra linker input or new
compiler flag is introduced. Canonical linker arguments and their order are
checked against the baseline after replacing only build/temporary directory paths.

| Cohort | Layout | Normalized / raw-local / direct-closed windows | Meaningful raw byte differences |
| --- | --- | --- | --- |
| PR439 baseline | Baseline native layout | 441 / 441 / 441 | 30 |
| 01: module declaration moved | Unchanged baseline layout | 441 / 370 / 441 | 14,362 |
| 02: same source | Data selectors rebound | 441 / 441 / 441 | **0** |
| 03: repeat of 02 | Same rebound script | 441 / 441 / 441 | **0** |

Cohort 01 already makes `.dynsym` and `.dynstr` exactly equal to the original.
Its changed anonymous data sections invalidate the old data ordering: `.text`
has 929 differing bytes, `.rodata` 11,377, `.data.rel.ro` 1,666 and `.rel.dyn` 390.
It is retained as a failed whole-file control, not discarded as an intermediate.

The unchanged upstream `elfcmp.py`, `datamap.py` and `gen_ordered.py` at
`dc8f791d32ae7fd6d9660cd1bf003fb02737f78f` bind cohort 01 back to original data
positions. The adapter supplies the already pinned reader/inventory and adds
`end = start + bytes` to each inventory row. It supplies no manual assignments.
All 441 function selectors remain byte-for-byte unchanged. There are 502 bound
rodata objects, five merged sections and 297 bound `.data.rel.ro` objects; no
unbound candidate object remains. Merged sections use the upstream anchored-piece
placement method. Final whole-file equality independently checks all their bytes.

The complete output files of cohorts 02 and 03 match each other. Each cohort has
163 crate compilation records, including 85 target records, from a fresh target
directory: 489 / 255 records across all three builds. All have 4,768 positive direct
calls and 519 positive Source obligations. These are static observations, not a
new runtime suite or a security assessment.

## Why the symbol order changes

The retained before/after Anchor CGU objects show that their undefined symbol
table order changes from memcpy-before-log-data to log-data-before-memcpy.
The offline verifier reads these indices directly from their ELF symbol tables.
The new object was extracted with the pinned `llvm-ar` from cohort 02's Anchor
archive. Its member bytes and the archive hash are recorded. The external archive
is not bundled; this is a saved membership observation, not independent offline
attestation of its container or of process memory.

The SDK's `ld.lld.exe --version` reports LLD 20.1.7 and LLVM revision
`7ab1c5c58f2d29bfcd27e27b50f7e68101cdeaa6`. Its file hash equals the actually selected
`rust-lld.exe` in the controller's checked tool inventory. The matching
[Rust LLVM submodule](https://github.com/anza-xyz/rust/tree/daa3af4a1110ec3f10ce08083bb0b7855a88416f/src/llvm-project)
points at that same revision. At this pinned LLVM revision:

- [SymbolTable.cpp](https://github.com/anza-xyz/llvm-project/blob/7ab1c5c58f2d29bfcd27e27b50f7e68101cdeaa6/lld/ELF/SymbolTable.cpp#L64)
  appends newly encountered symbols to its symbol vector.
- [InputFiles.cpp](https://github.com/anza-xyz/llvm-project/blob/7ab1c5c58f2d29bfcd27e27b50f7e68101cdeaa6/lld/ELF/InputFiles.cpp#L1110)
  initializes global symbols in input ELF symbol-table order.
- [Writer.cpp](https://github.com/anza-xyz/llvm-project/blob/7ab1c5c58f2d29bfcd27e27b50f7e68101cdeaa6/lld/ELF/Writer.cpp#L1927)
  visits that vector when collecting exported/preemptible dynamic symbols.
- [SyntheticSections.cpp](https://github.com/anza-xyz/llvm-project/blob/7ab1c5c58f2d29bfcd27e27b50f7e68101cdeaa6/lld/ELF/SyntheticSections.cpp#L2178)
  preserves collection order on this BPF output, which has no GNU hash table and
  is not MIPS.

This supports the insertion-order explanation for the observed build. It does not
establish which declaration order or host toolchain the original author used.
The upstream archived diagnostic dead-object approach and `EXTERN` experiment are
not used by this recipe.

## Offline verification and fresh rebuild

From this directory, Python 3.13.7 was used without third-party packages:

```sh
python -I -B verify.py
python -I -B test_verify.py
```

Verification replays the complete source delta, upstream layout generation,
compiler/linker receipts, static 441-window census, symbol ordering, exact raw
output comparisons and allocation boundary. It never invokes a subprocess or
network API. A test copies the packet to a fresh directory and blocks both APIs.
Counterexamples cover changed sources/metadata, missing target records, altered
layout bindings/selectors, extra linker inputs, nonordinary stripping, modified
object/output bytes and fabricated allocation padding. Checks do not claim the
saved build logs are cryptographic execution attestation.

For a fresh native build, use `controller/build.py --help`. Supply the pinned
Windows v1.54 SDK, Linux target sysroot, 215-package vendor directory, MSVC 14.44,
Windows SDK 10.0.26100.0, existing historical macro directory and a new output
directory through its named arguments. `controller/sources` contains all 67
qualified files. Its default script is cohort 02/03's rebound layout; the unchanged
control uses `baseline/ordered-native.ld`. Inputs are hashed before compilation.
The historical host macro and its 61 dependency files are reused, not rebuilt.
Absolute paths in receipts are observations, not dependencies of offline replay.

`provenance/` retains the initial wrong line-number assertion, the unavailable
upstream reader-path lookup, and two verifier preparation failures (linker alias
lookup and an omitted receipt `argument` field). The raw failed control and every
successful build are retained. No root pipeline, selected artifact, deployment,
runtime fixture or account is changed by this research packet.
