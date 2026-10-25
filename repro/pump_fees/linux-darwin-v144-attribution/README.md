# Fees: bounded Linux/Darwin static attribution

The controlled Linux build adds **zero matching original function bodies** over the matching-source Darwin build. Both candidates have 426 normalized matching entry windows; 404 retain matching immediate callee shapes, and 378 retain a recursively consistent direct-call graph. Linux does reproduce 14 original standard-library source-location tuples across 13 windows. This favors the recorded Linux-distributed standard-library source-path family, but does not establish the original build host, unique compiler recipe, or executable identity. No source correction or further build is proposed.

Run `python3 -B verify.py` from any directory. The package is self-contained, uses only Python's standard library, and performs static reads and hashes. It requires neither a repository checkout nor work/cache paths, network access, a compiler, or a Solana runtime. `analyze.py` regenerates only JSON diagnostic evidence under `analysis/`; the verifier recomputes that evidence in memory without rewriting it.

## Inputs and provenance

| Input | Bytes | SHA-256 |
|---|---:|---|
| Captured original Fees | 948,944 | `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e` |
| Darwin candidate | 769,000 | `a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa` |
| Linux candidate | 768,984 | `7e823e605097cdba7a3d782a2f20edaee9980d7d5a29822ac7d1a43400620133` |
| Darwin symbol source | 1,093,832 | `ad04f9be2090431ff74037b950477d09353368685a81738bce69aad964984315` |

`input-bindings.json` identifies every copied input, its exact hash, and its source. The public source packages are `repro/pump_fees/readme-provenance-v144`, `linux-v144-hosted-comparison`, `linux-v144-sysroot-provenance`, and the Darwin symbol source from `update-admin-call-closure-static`. Their historical files are unchanged. The ELF reader was copied from public `framework-matching/elf_reader.py`; its only adaptation changes the global repository locator to its own directory. The original helper remains retained for exact comparison.

All 22 source/workspace inputs, including the lockfile and README, match across the Darwin archive and Linux before-fetch, after-fetch, and after-build records. Their revision is `4ffe8bd88761059693e481ae972443c10204f7af`. This is the deliberately frozen comparative baseline, not either current main candidate. Verification hashes every archive member and compares every recorded source map; it does not infer source identity merely from a revision label.

Linux run [40166255149](https://github.com/lalalune/pumpfun-source/actions/runs/40166255149), tooling commit `a3ff5291bd57c2852ba2eb89c94c942d8eef2145`, records one successful compilation with platform-tools **v1.44**, followed by the unchanged recorded SDK's **v1.52 stripping phase**. Its retained successful compiler `execve`, installer/linker/alias/objcopy traces and before/after hashes are copied here. Linux rustc SHA is `c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97`; stripper SHA is `673b3b86f0b1b8eadd755e29e2f66a7582248ef3bda7a267fbb370b733c1cb69`. Only seven process traces were published, not the entire process graph. The Criterion installer cache does not establish Criterion execution or program linkage.

Darwin's recorded v1.44 compiler SHA is `1f26338cc2cabd0a6057dcbd0528bba262b23ca1296d357a55304ee31d1d9e5a`. The retained SDK archive's 53 file hashes equal this Darwin build's complete SDK source map. Its installer selects v1.52 and its stripping script invokes `llvm-objcopy --strip-all`. The copied later `e501…` tool-phase record corroborates this unchanged SDK selection; it is explicitly **not** a per-process invocation attestation for historical `a9c4…`. A v1.44 tool-file inventory alone does not identify the actual historical stripper. No unique historical recipe is inferred from compiler strings.

The retained central-directory listing for public artifact **12588223559** has 2,538 members and only one `.so`, the stripped candidate. The unstripped Linux ELF is absent. Its hash `d07f60ee93f903baa5fdded3dd2bc714d9648ecb65f735075dd93f1bbbf0ab4c` and section equality are recorded in the hosted strip report; they do not substitute for retained symbol bytes. The candidate ZIP CRC and SHA are independently checked. The full 1.36 GB ZIP digest was not recomputed and no new retrieval was attempted here. No temporary download URLs or authentication data are included.

## Complete-window method and limits

All `.text` bytes are covered by contiguous entry-window ledgers: 585 original windows and 539 windows per candidate. Boundaries come from actual direct-call targets, relocated code pointers, the ELF entrypoint, and available function symbols; the last window ends at the section boundary. Every boundary's evidence is retained. The Darwin unstripped `.text` and relocation pattern equal the stripped Darwin artifact, and its 539 unique function-symbol ranges exactly equal the 539 inferred ranges. Linux and original are stripped: their windows are not claimed to be independently recovered debug-symbol functions. An undiscovered internal boundary is a remaining limit.

Matching requires equal complete-window length, equal normalized bytes, and equal relocation type/symbol patterns. The only matching normalization zeros direct-call displacement operands and relocated address/external-call operands **in memory**. Ordinary constants, branch displacements, TypeId values, instruction order, and registers remain compared. No executable, symbol, section, or normalized ELF is written. `type-id-comparison.json` separately describes an instruction template with the four immediate words omitted; that diagnostic template is never used in match counts.

| Candidate compared with original | Windows | Normalized shape matches | Raw matches | Immediate callee shapes also match | Recursive direct-call graph also matches |
|---|---:|---:|---:|---:|---:|
| Darwin | 539 | 426 | 95 | 404 | 378 |
| Linux | 539 | 426 | 93 | 404 | 378 |

Both raw-match counts also satisfy the direct-call graph check. The graph check starts with all complete-body matching pairs and repeatedly removes pairs with a direct callee pair outside the remaining relation. Four rounds leave 865 valid pairs because identical small bodies may have several possible counterparts. It is a greatest fixed point, not a proof of indirect-call identity, data/vtable equivalence, or total program semantics. Every raw displacement, actual absolute target, failed edge, and rejection round is retained. Counts from earlier reports using different local-callee rules must not be mixed with these stricter counts.

Viewed from the original, 431 of its 585 windows have a shape match on either platform and 384 have at least one recursively consistent direct-call match. Many-to-many small-function duplicates explain why original-side and candidate-side counts differ. Linux gains no original raw, normalized, or graph-consistent body. It loses two coincidental raw matches at original ranges `[757000,757040)` and `[797032,797048)`; normalized matches and graph closure remain available. Their ambiguous formatter/thunk identities and actual target operands are preserved in the original-side ledgers; those raw losses do not establish semantic regressions.

Linux and Darwin have equal `.text` lengths of 697,752 bytes. **535/539** normalized windows and their direct-call graphs match across hosts. The four remaining 56-byte bodies start at **41912, 593224, 649784, 665672** on both candidates. Darwin symbols identify the first three as `core::error::Error::type_id` implementations and the fourth as `Any::type_id`. Each writes two nonrelocated 64-bit immediate values. All other bytes of this template agree, but neither platform's constants equal those of the four original template bodies at **45432, 702656, 756232, 767336**. The original concrete types are not inferred from this template. These constants are discriminating fingerprints that favor neither candidate.

## Bounded data improvement

Four source paths under `/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/` match the original's full path/line/column tuples in Linux. Darwin records the corresponding `/Users/runner/…` paths. Each reported reference includes the complete 24-byte source-location record, relocation encoding, decoded pointer, exact bounded UTF-8 path, line/column, full referring window, and direct-callee correspondence. Raw pointer records differ as layout changes; the claim is decoded tuple equality, not raw data-section equality.

| Original start | Darwin start | Linux start | Reference offset | File suffix and location | Recursive direct-call closure |
|---:|---:|---:|---:|---|---|
| 4176 | 2872 | 2872 | 272 | `string.rs` 2559:14 | yes |
| 6168 | 4864 | 4208 | 248 | `string.rs` 2559:14 | no |
| 5512 | 4208 | 4848 | 256 | `string.rs` 2559:14 | yes |
| 38848 | 37648 | 37648 | 272 | `string.rs` 2559:14 | yes |
| 43392 | 41424 | 41424 | 440 | `collections/btree/navigate.rs` 601:48 | yes |
| 59528 | 47512 | 47512 | 400 | `string.rs` 2559:14 | yes |
| 69344 | 57328 | 57328 | 1056 | `vec/spec_from_iter_nested.rs` 59:18 | yes |
| 69344 | 57328 | 57328 | 1152 | `vec/mod.rs` 3112:13 | yes |
| 537312 | 320408 | 320408 | 312 | `string.rs` 2559:14 | yes |
| 539488 | 322584 | 322584 | 312 | `string.rs` 2559:14 | yes |
| 575408 | 327288 | 327288 | 312 | `string.rs` 2559:14 | yes |
| 603144 | 335936 | 335936 | 5544 | `collections/btree/navigate.rs` 601:48 | no |
| 289880 | 551112 | 551112 | 272 | `string.rs` 2559:14 | yes |
| 721136 | 611344 | 611344 | 272 | `string.rs` 2559:14 | yes |

Twelve references have recursively consistent direct-call closure. The other two are bounded literal improvements only; their failed call edges remain explicit. No indirect target is silently treated as closed. Three initial apparent `src/state.rs` improvements were rejected because identical SPL helper shapes can be crossed between different types: another Darwin counterpart already has the original tuple. `rejected-crossed-location-pairings.json` preserves this negative evidence. The early exploratory count of 17 was narrowed to 14 by that check.

The retained official v1.44 Linux/Darwin rlib analysis independently associates these path spellings with their distributions. Linux liballoc SHA is `132997410250190766570cc7d88389cf55385c77c0865466b65f5bc6f0b98ba4`; Darwin liballoc SHA is `7b0f8a73431f6982a8d30c62e560fcbe8bbe6e54fc15aee901235db45aa41e33`. Those archive/member records are provenance, not an assertion that every original standard-library object is identical. A distributed sysroot retains its producer paths even if later used elsewhere; the paths do not uniquely determine the final program's build host.

All three files are ELF64 little-endian, `e_machine=263`, `e_flags=0`, and `e_type=3`. These common ABI fields favor neither host. Both candidates retain the same number of function windows and the same target instruction representation. Whole-file equality is false for both.

## Residual preservation and scope

| Raw comparison | Differing positions in shared length | Unshared original/right tail |
|---|---:|---:|
| Linux vs original | 421,958 | 179,960 bytes |
| Darwin vs original | 421,991 | 179,944 bytes |
| Linux vs Darwin | 47,193 | 16 bytes |

Every unequal byte is retained in contiguous lossless residual records, including headers, code, data, relocations, tables, and tails. All full input files also remain copied unmodified. The verifier independently checks that the residual records cover every unequal shared byte exactly once and contain the exact tails. Section-relative counts are separately reported; they do not assert object correspondence where internal ordering differs. Linux/Darwin `.text` has 22,379 differing same-offset bytes, `.rodata` differs in length by 12, and `.data.rel.ro` has 300 differing section-relative bytes. The complete relocation ledger preserves unresolved pointer/data references without inventing object bounds.

`analysis/*-windows.json.gz` contains all match candidates and target edges, `boundary-ledger.json.gz` contains every range and boundary basis, `unmatched-window-bytes.json.gz` retains all 113 unmatched candidate windows on each platform, and `source-location-ledger.json` includes all detected bounded source records, not only favorable examples. Data outside proved records is retained in the complete inputs and residuals, not labeled recovered.

This task made no builds, dependency/source changes, runtime calls, new fixtures, chain operations, downloads, or executable edits. The Linux candidate has **zero new runtime receipts** here; historical Darwin receipts are not inherited. The known source and dependency gaps of the frozen baseline remain separate from this host comparison. No current program, immutable publication, central status, or workflow was changed.
