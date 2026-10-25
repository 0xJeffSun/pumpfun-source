# Main-source destination rent report

## Result and provenance

Root ran exactly one authorized main-source build with `work/amm-destination-rent-main/build_once.py`. This worker ran no build or transaction. The completed runner stdout parses to the retained identity report, and both runner/build exit records are zero. Full main executable SHA-256 is `2a8a69f1e2f91f470b9742fe1c7caa129fa9ea126d54588473e8e3d490b7e706`; full symbol ELF SHA-256 is `3208594d62e12b12399a3a574491cc86893021547dae475d584dba49087d560c`. Both files equal the reviewed scratch outputs byte for byte. Receipt transfer rests on both identities, not merely `.text` or fixture compatibility.

`source-sha256.json`, `source/`, `build-attempt.json`, and `build-comparison.json` bind all 22 inputs. The baseline and scratch maps retain the exact one-line correction in `transfer_creator.rs`; the other 21 inputs agree. `build-launch.json`, `build_once.py`, full stdout/stderr and build.log preserve the actual recipe. The old CLI `amm_rent_main_promotion` preparation/no-build outcome is not superseded or recast as a build by this worker.

The root runner was read completely. Its prebuild helper checks lack a corresponding postbuild helper loop; this worker independently compared every current helper to that prebuild map and retained `helpers-after.json` plus exact public helper snapshots. This supplements the record at packaging time, not a continuous trace during compilation. The source before/after maps in the build attempt agree. Root before/after tool and SDK maps agree; current tool hashes and the actual isolated SDK files were independently checked. All 254 archive and 5,567 source-file dependency witnesses agree before/after and with scratch. Dependency reports are bounded witnesses, not packaged compiler caches or a claim to reproduce the full historical toolchain.

Cargo rustc metadata identifies the v1.44 compile sysroot; the final SDK link and matching objcopy hash identify v1.52 stripping. `toolchain-phases.json` preserves those actual observations. There is no per-process compiler trace in this main run, so this package does not invent one. Logs retain the original warnings, including undefined-syscall output and the empty SDK syscall list. Exact output equality does not prove unique historical source, dependencies, flags or compiler provenance.

## Fresh static checks

The three scripts in `accepted-checkers/` were copied from the accepted `work/amm-update-event-build` scripts. Only three literal input path replacements produce the new executable checkers; the verifier confirms this exact transformation. All assertions and historical scope strings remain unchanged. In particular, the old static report's event-clone scope sentence describes its inherited checker, not this build's source delta; the source maps and this report govern that distinction. All first attempts passed; their full stdout/stderr are retained. Historical failed checks remain in their prior immutable package and are not rewritten.

Pool: 1,704 bytes at fresh candidate `0x4570`; GlobalConfig: 1,648 bytes at `0x3f00`. Each complete normalized body, all 24 actual immediate target bodies and the eight-byte discriminator match. `function-match.json` records raw body hashes separately; normalization is not raw equality.

`static-comparison.json` freshly locates initializer/update symbols and retains full instruction bodies, actual direct targets, ambiguous matches, scalar call-order pairing, bounded data, inline literals and unresolved references. Initializer wrapper, handler, context and event matching does not establish successful runtime initialization. The 5,896-byte initialization helper retains two instruction differences; the recipient setter retains four; scalar methods are 608 versus 616 bytes with ten shared-extent instruction differences each. An unused matching generic helper is not substituted for the actual error-path callee.

The complete 2,912-byte update handler, 2,296-byte wrapper and 744-byte event serializer match under normalization. Handler immediate targets remain 12/16. `update-data-comparison.json` retains nine references: five bounded matches and four unclosed metadata references, event discriminator, CPI prefix and both actual calls receiving the same event buffer. No transitive-data closure is claimed.

The scratch seal binds the complete 785-original-window/653-candidate-window inventory and destination-rent call analysis; the standalone verifier regenerates that full inventory. The actual `data_len` return reaches `minimum_balance`; ATA selector remains zero. Whole-original comparison still has 670,580 unequal positions within the shared extent and 9,286,651 original-only positions. No bytes, layout, padding or source coordinates were fabricated.

## Saved evidence and limits

17,462 existing comparisons across 25 suites, 35,418 saved signature verifications, 191 scalar and 78 recipient diagnostic assertions are transferred by full main/scratch identity. `main-receipt-bindings.json` binds each suite, the source map, main build report, identity report and scratch manifest. The referenced scratch source/harness/runtime before/after records remain intact. Its legacy source bookkeeping is not confused with actual corrected compilation inputs.

The 267 existing transfer rows include 100 rent-edge and 24 destination-data rows. Those destination-data accounts begin with zero lamports; these cases do not prove the behavior of a live nonempty account. The external 8/267 assertion remains unverified. No new runtime fixture, live chain transaction, initializer success, signing/PDA/history bypass, or excluded work was introduced. Security sign-off, full behavior, authentic initializer replay, historical provenance and whole-original identity remain open.

## Delivery

README gives the required public `--repo` dependency. A separate copied publication is tested with and without `--current-main`; negative checks exercise missing symbols, altered source/identity/helper evidence, extra payload and wrong/missing repository bindings. External verification receipts and exact owned map are delivered beside the sealed publication to avoid self-reference. `proposals/central-updates.patch` targets only AMM artifact references, AMM current validation, its completion paragraph and the existing AMM workflow entries; it is not applied. The program README proposal and AMM status replacement are separate. Dispatcher behavior is documented rather than duplicating the generic dispatcher.
