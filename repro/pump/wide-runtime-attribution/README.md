# Pump wide-integer compiled-runtime attribution

All five requested original arithmetic windows match complete runtime functions in the accepted `5c1c1c2d…` Pump candidate. This closes their compiled-body, immediate-call and static-data correspondence. It does **not** supply an all-input mathematical division proof or identify a unique historical compiler-builtins source revision.

| Original range, half-open | Accepted candidate start | Symbol in accepted unstripped artifact | Bytes | Raw equal |
|---|---:|---|---:|---|
| `0x1b4088..0x1b40d0` | `0x163050` | `__udivti3` | 72 | No: four call-immediate bytes |
| `0x1b40d0..0x1b5518` | `0x1619f8` | `compiler_builtins::int::specialized_div_rem::u128_div_rem` | 5,192 | No: two call-immediate bytes |
| `0x1b5518..0x1b55c8` | `0x162e40` | `__lshrti3` | 176 | Yes |
| `0x1b55c8..0x1b5728` | `0x162ef0` | `__multi3` | 352 | Yes |
| `0x1b5948..0x1b59f0` | `0x1631a8` | `__ashlti3` | 168 | Yes |

Each match uses its full candidate symbol extent and an original entry-bounded window. The last original window ends at `.text` end. Original boundaries are inferred from actual entry references, not original debug symbols. Searching all accepted candidate symbol extents yields exactly one complete match per original window. The full mangled core symbol is retained in `ledger.json`.

Across 5,960 bytes, the complete raw residual ledger contains only six differing positions. An independent instruction reader permits normalization solely at signed internal-call immediates. It verifies that every changed position lies in those immediate fields and recomputes each signed target. No executable or normalized executable is written.

The wrapper has one direct call to the matched core. The core has eleven calls to the three matched leaf helpers. Every target resolves within the five-function set; all branches remain within their own bodies. There are no relocated operands, external calls or indirect calls in these windows. The twelve inline 64-bit constants are raw-equal arithmetic masks (`0x5555555555555555`, `0x3333333333333333`, `0x0f0f0f0f0f0f0f0f`, `0x0101010101010101`, each appearing three times). All memory-load instructions use the stack base register r10. The complete load/store and branch ledgers are retained; dynamic argument/result memory and SBF machine semantics remain ABI inputs. No hidden referenced literal table or external static-data object is required by these bodies.

The symbol names are attributed only after complete byte and call closure. This is stronger than a name/shape resemblance. It establishes exact instruction-graph correspondence between these bounded original and accepted compiled helpers under the recorded call mapping. It does not by itself prove that division computes floor(N/D), characterize every zero-divisor outcome, or discharge the separate manual arithmetic invariants. The other worker owns that mathematical task; this package does not reinterpret excluded handler branches.

## Artifact and source provenance

The full original Pump ELF is SHA-256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. The candidate is `5c1c1c2d1cd2c334b3e054b6a8fb5ac0638d80d13495c1c18d935ad20bfd62bb`, 1,576,744 bytes. Its accepted unstripped artifact is `18ab8e54cfab532c615bc716013511f15c5e686d5829a9576b327f0b071aa679`, 2,152,528 bytes. Whole `.text` and its relocation pattern are identical between stripped and symbol-bearing candidates. The retained package manifest is `2d2eb099792b2d5585199b6c352f8b21213888ab72ff6be0cb79686efa268072`; all selected package files are independently checked against it.

The accepted 36-source snapshot, build log, build/source maps, 252-package dependency inventory and recorded compiler/strip phases are retained. They bind v1.44 compilation and the separate unchanged v1.52 stripping phase. Compiler-builtins does not appear among the program's locked Cargo dependency packages; it is not legitimate to infer its version from that inventory.

A tracked earlier inventory using the same rustc/cargo/linker hashes records `rust/lib/rustlib/sbf-solana-solana/lib/libcompiler_builtins-cafa861a42daca7c.rlib`, 2,468,550 bytes, SHA-256 `1899cadf6f083018417a109dce25d8bd361ff5522ccaeef90fccfc25e092b3e3`. The official Darwin v1.44 distribution provenance records archive SHA-256 `66e20d135fddd70ff519baf7ff320d762957f9aedf93a50e23756db23ad79351`; the publisher API supplied no digest. These are retained observed-content records, not new downloads or independent publisher attestation.

The permitted public tracked artifacts inspected do not include the compiler-builtins archive payload or authenticated Rust source/build association. The public Linux sysroot evidence selects alloc/core/std/rustc/cargo, not compiler-builtins. The bounded tracked-path inventory and selected provenance records are retained; absence from this evidence is not a claim that source or historical artifacts never existed. No cache, compiler installation source tree, private archive, version search or network source was opened.

The concrete remaining prerequisite is authentic selected compiler-builtins source plus its build association to that runtime archive, or the independent manual invariant proof over the exact matched machine bodies. No source pin, version guess, compiler experiment or new runtime probe is proposed. Exact historical source/toolchain identity remains false/unproven, and original whole-program byte equality remains false.

## Scope and verification

The two upstream static reports are parent-approved pending inputs. Their exact selected files and original manifests are retained without modification; this report supplies the five helper identities they previously left conditional. It does not claim to verify all their prose or all nested account/route obligations.

Run `python3 -B verify.py` from any directory. The verifier checks this seal, selected prior/package manifests, full ELF identities, the 36-file source archive, all five complete body matches, all twelve signed targets, every residual byte, inline constants, memory/branch inventory and exact assembly bytes against the original. It executes neither SBF nor compiler code, and it needs no repository, network, caches or third-party Python packages. Optional `--repo /path/to/pumpfun-source` additionally rebinds all consumed public inputs to their current repository bytes.

Two verification-script corrections are preserved. First, the initial next-entry lookup omitted the final `.text`-end fallback and raised IndexError. The correction uses the known final text extent. Second, an assembly token parser consumed the initial letters of add64 as a ninth byte; it now requires whitespace after every hex byte token. Neither correction changed any executable, assembly source or inferred window. No source changes, builds, runtime probes, mathematical-contract discharge, staging, commits, new signatures or binary edits occurred.
