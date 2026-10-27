# Fees: 55 more complete raw function matches through linker ordering

The unchanged 46-file Rust source from the [577-function checkpoint](../fees-sharing-slice-recovery/README.md) now has **198 of 585 original function windows with raw byte-equal counterparts**, up from 143. All 577 normalized matches, 430 unique structural pairs, 181 equal Rust Source locations and 3,870 of 3,877 checked direct-callee observations survive. No earlier raw match is lost.

Two native Rust builds produce identical complete stripped and symbol artifacts. Fresh independent execution covers **17,331 cases across 18 suites**. All checked outcomes agree, including application logs in the 6,413 cases that contain them. These are bounded observations: **eight original functions and complete ELF/data/relocation identity remain unresolved**.

## Layout change

An ordinary baseline linker map identifies every emitted function's object or archive member. Eight section names occur in multiple objects. The linker script therefore selects both the owning object and the named input section. It preserves the SDK's program-header and output-section rules and changes only the order of `.text` input sections.

The 585 proposed original-to-candidate assignments comprise 499 exact function/call-graph bindings, 78 ambiguous equal-function assignments, and eight semantic handler assignments whose bodies remain unequal. The candidate's extra outlined event-data function follows those 585 entries. The ambiguous assignments remain hypotheses about identity; they are not historical source provenance or whole-program closure.

The linker wrapper replaces the SDK-supplied script. A control that merely appended another `-T` script retained the original input ordering and introduced an extra program header; that control is rejected. The accepted recipe has the SDK's four program headers and the original text start at byte 288. The captured default script exactly matches the existing SDK layout recipe.

The compiler and linker receive Rust source, dependency inputs, section names and linker configuration. They receive no original instructions or executable fragments. The linker resolves addresses, call displacements and relocations, followed by ordinary `llvm-objcopy --strip-all`. There is no assembly, post-link patch or appended padding. This is a reconstructed layout recipe, not evidence of the historical linker flags.

## Recheck saved evidence

```sh
python3 -B research/fees-qualified-linker-layout/verify.py
python3 -B research/fees-qualified-linker-layout/test_scope.py
```

The verifier rederives the complete proposed section order from the baseline map; checks all 586 before/after normalized function bodies; recomputes the original function coverage, Source locations and call observations; verifies both build records and allocated sections; and compares every runtime case and its multiplicity with the sealed parent. These commands execute no compiler, target program, RPC or network request.

All 46 source files remain in the parent packet. `layout/` contains the exact linker inputs. The original native controllers, commands, compile logs and maps are in `builds/`; their paths describe the local mounted build workspace. The builds reused the same pinned Linux platform-tools v1.44 SDK and locked warm dependency cache as the parent. They recompiled the root Rust crate separately. They do not constitute a fresh dependency rebuild or independent SDK authentication.

To recover the exact source and configuration without changing the parent:

```sh
python3 -B research/fees-qualified-linker-layout/materialize.py --output /absolute/new/directory
```

Native reproduction uses the saved controllers and launch arguments with the documented parent SDK/cache setup. Preserve the mount paths in the records, or adapt their local source/configuration/output paths while retaining the source contents, SDK, dependency versions, compiler flags, linker script and ordinary stripping step. The retained wrapper records its incoming/effective linker arguments and the replaced SDK script. The saved argument files come from the repeat build, the last invocation of that shared wrapper.

| Artifact | SHA-256 |
| --- | --- |
| Stripped candidate | `be2b55ccc1204edaec44571213dd4d35f4681b3c9d36e9b633b4068731acb016` |
| Symbol artifact | `00271412e94bb1d48ff2eac64601096ee51904200fdcd9965a752fd0e37fb7df` |

Raw-local equality compares complete function bytes; it does not assert that the function occupies its original address. The whole meaningful ELF and full deployment capture still differ.
