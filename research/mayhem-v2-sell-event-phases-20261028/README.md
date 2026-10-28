# Mayhem SellV2 event frame and store controls

This is partial source research on **O0084 SellV2**, composed onto qualified439.
Separating the quote-mint key from a tuple of scalar values and using the completed
AMM event initializer order reproduces the original event base **-1776** and all
**39 final event stores in order**, while keeping the original **283 CFG blocks**.
The earlier R control had base -1800 and only one store in the same position.

**No additional complete function is recovered.** The primary body is 18,088 bytes
versus 18,096 original bytes. Early arithmetic/sizing control flow, register and
stack operands, call positions and ordered callees still differ. The ordered-edge
CFG diagnostic maps only 66 blocks and encounters seven conflicts. Equal block
counts and the event result do not establish whole-body equivalence.

All eight builds retain the qualified439 frontier: 439/441 normalized windows,
141 raw-local windows, 435 recursively direct-call-closed windows, 4,670 positive
immediate-call observations and 505 Source observations. Preservation checks use
the actual prior body, raw, call and Source sets, not just their counts. Both V2
handlers remain unmatched. Full compiler ELF and original allocation equality
remain false. **These images have no new runtime qualification.**

## Source and controls

The base is the exact 67-file qualified439 composition from merged PR423. Case02
overlays only the two published R files from the older V2 packet: `buy_v2.rs` and
`pump_interface_v2.rs`. Each subsequent control changes only `pump_interface_v2.rs`.
The primary changes SellV2's event region; the R BuyV2 partial stays unchanged.
The existing WSOL-or-default accounting condition and distinct real/virtual
reserve values are retained. No compiler-option search, unused operation, assembly,
instruction padding, ELF rewriting or relaxed normalizer is used.

| Case | SellV2 bytes | CFG blocks | Event base | Ordered stores | Aligned slots |
| --- | ---: | ---: | ---: | ---: | ---: |
| Original | 18,096 | 283 | -1776 | 39 | — |
| 01 current439 | 18,104 | 277 | -1760 | 1 | 703 |
| 02 R on439 | 18,088 | 283 | -1800 | 1 | 954 |
| 03 independent scalar phase | 18,136 | 287 | -1776 | 39 | 1,503 |
| 04 reuse scalar snapshots | 18,136 | 287 | -1776 | 39 | 1,503 |
| **05 scalar tuple, quote key last** | **18,088** | **283** | **-1776** | **39** | **1,519** |
| 06 inline price helper | 18,088 | 283 | -1800 | 1 | 954 |
| 07 WSOL condition first | 18,720 | 299 | -1776 | 39 | 1,338 |
| 08 independent repeat of05 | 18,088 | 283 | -1776 | 39 | 1,519 |

Aligned slots use sequence alignment under the unchanged normalizer. They are a
search diagnostic, not extra recovered functions. Event extraction follows the
retained bounded stack-store tracer; it checks offsets, widths and store order,
not arbitrary value flow or complete event semantics. The V2 callee **multisets**
can agree while their order differs; the verifier reports both independently.

Case04 produces both files identically to03: sharing those scalar values alone
does not remove its four extra CFG blocks. Case06 produces the same stripped ELF
as02 but a different compiler ELF. Case07 increases body size and CFG complexity;
it is retained as negative evidence. No runtime result transfers between them.
A preparation assertion initially rejected07's ambiguous source replacement
before compilation; the failure log is retained. No compiler run failed.

## Reproducibility and verification

Every case uses a fresh isolated Cargo target directory and `--locked --offline`
with the unchanged, corrected native recipe from merged PR421. There are 1,304
crate compilation records, including 680 target records. SDK, Linux target
libraries, vendor sources, metadata/path maps, wrappers and linker scripts are
checked by that recipe. The historical host macro and its 61 dependency files
are reused; these are not fresh builds of every host input or historical compiler
attribution. Original ELF bytes are read only by the later static analysis.

Case01 reproduces both complete archived439 files exactly. Cases05 and08 repeat:

- Compiler ELF, 907,704 bytes: `43d3c02e0e399be128f947f5907372fab27256b89e1f7d7ff83a407492d30bd0`.
- Ordinary stripped ELF, 775,352 bytes: `2524e8fb7125d694c518bb0d9e29fbb262080be6953f95b8418dfcf5ad6f953e`.

The 777,408-byte original allocation image is kept separately. No allocation
image is fabricated from compiler bytes. Stripping preserves allocated sections.
All case sources, outputs, compiler logs, actual wrapper records, linker maps and
copied ephemeral inputs are retained. Dependency archives remain external pinned
build inputs; post-build linker-input inventories do not attest live loaded memory.

From this directory, using only the Python standard library:

```text
python -I -B verify.py
python -I -B test_verify.py
```

The replay recomputes ELF measurements and the case table without network,
compilation or target execution. Counterexamples cover a real event-store operand
mutation, missing target compilation, altered metadata delivery, rebound source
and output mutations, and unlisted files. A relocated replay blocks network and
subprocess creation.

`controller/build.py` and `controller/sources/` reproduce primary05. Supply the
same explicit SDK, target sysroot, vendor, MSVC, Windows SDK and historical macro
inputs described in `controller/*.json`:

```text
python -I -B controller/build.py --sdk SDK --target-sysroot LINUX_RUST_SYSROOT --vendor VENDOR --msvc MSVC --windows-sdk WINDOWS_SDK --historical-macro-directory HISTORICAL_RELEASE --output NEW_DIRECTORY
```

Each other case retains its complete source archive and actual command. The
`provenance/local-*` scripts are working-path research records, not the portable
replay entry point. Reference blobs are pinned to
`e91c97097f334683d3f905ff0b0eb91612b4f51e`; later unrelated merges do not change them.
Runtime, generic data/indirect-call equivalence, the remaining V2 source, exact
layout and original whole-ELF identity remain open.
