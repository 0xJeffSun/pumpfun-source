# Fees legacy caller — isolated build and existing-corpus handoff

This is a scratch candidate for parent review. Main source is unchanged. One build of the exact reviewed `sharing_update.rs` source `94a11c22bc952b060119212b7982e638f8faf56af5e565e15234f88283766956` succeeded without backend stack diagnostics. All 17,461 existing comparisons (17,441 baseline plus 20 previously accepted focused cases) and ten separate donation-sequence steps pass. No fixture, signature, or comparator was weakened and no new case was added.

The candidate is **826,904 bytes**, SHA-256 `e5c811e2a66b540f25b44d9a55dd7b890e7ff01a0074dfc0d0dfc25237c391fe`. Its symbol ELF is `336f49a8075c87efe2eead28290793823a6b5bf004fe000b82b27981ae6ce501`. The original is `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`, 948,944 bytes. Whole-file equality is **false**: 461,552 shared-position differences, first difference at byte 24, and 122,040 original-only tail bytes. Full byte-run, section, and relocation ledgers are retained; file size is not an equivalence measure.

## Source and build provenance

`source-review/` preserves the complete independently reviewed source proposal and its immutable `f5c86d690dd1b0c78364cc3809439a276e524b093753f1cbbd8d0e6a4c09052d` seal. `inputs/source.patch` changes only `programs/pump-fees/src/sharing_update.rs` from accepted 8ff12. The baseline and candidate maps each contain exactly 26 files. V2 and the named account-context declarations are byte-preserved in Rust. The source's prebuild comment describing an uncompiled hypothesis is retained verbatim as part of the authorized input; the build records here establish its subsequent compilation.

`prebuild-manifest-sha256.json`, `build-launch.json`, `build-01/build-attempt.json`, `build-01/build-comparison.json`, `build-result.json`, and `tool-phase-provenance.json` bind the actual inputs and output. The unchanged recipe compiled with v1.44 and stripped with the recorded SDK installer's v1.52 objcopy. Compiler, cargo, linker, both objcopies, CLI, 53 SDK files, four helpers, and the 252-package/14,287-file cached dependency payload are hash-bound. The candidate used its own copied cargo cache, SDK, rustup alias, and target directory. No source-layout, compiler, flag, dependency, or version variants were tried. `sbf-sdk-snapshot.tar.gz` and the helper snapshot are byte-identical copies of the same verified recorded inputs. Private caches and tool binaries are not packaged.

## Static results and remaining differences

`legacy-static-proof.json.gz`, `legacy-instructions.json.gz`, and `legacy-data-references.json.gz` retain every original requested root, fresh candidate symbol window, call, branch, and bounded data preview. The legacy candidate handler is at 539952, size 24880; the wrapper is at 415624, size 1016; the parser is at 288792, size 13888. Source-level legacy helpers inline into the handler, so these are not one-to-one matches to the original authorization, preprocessing, payout, adapter, or final-validation helper boundaries.

The generated Pump distribution CPI at 348008 (3968 bytes), both programs' four meta/info helpers, SharingConfig exit, and event body match their original normalized complete windows and relocation patterns. All **96** immediate target comparisons beneath these matching roots pass. Normalization masks direct-call operands and relocation values; it does not alone establish arbitrary transitive/data equivalence.

The AMM generated transfer CPI at 361656 is 3032 bytes and **does not** match the original 4352-byte complete window. It has an actual call to the 1288-byte owned-account drop helper at 38504; the skipped adapter branch also calls this helper. Both generated CPIs retain the 256-byte data allocation, exact instruction discriminator, genuine meta/info targets and invoke-signed target. The cleanup edge is evidence of compilation structure, not a proof that nonidentical control flow is equivalent.

`legacy-control-witnesses.json` records fresh instruction evidence for the short-data quote check, quote borrow release and temporary AccountInfo drops before version/auth checks, direct revoked-admin error conversion, four reserve checks, owning skip cleanup, payout allocations, early SharingConfig serialization, Pump CPI, checked final sum, and event/clock path. The original source-review package gives the detailed control/data contracts. The full legacy handler, wrapper, and original parser remain nonidentical; no full CFG or historical-source claim is made.

`reference/retained-static-gate.json` preserves all ten previously checked initializer/social-exit/Pubkey bodies, their direct targets and literals, and five complete account codec checks. The codecs retain their known source-line-coordinate difference. `retained-social.json.gz` independently shows that all five accepted social helper/handler/wrapper/parser/exit windows and **176** immediate targets remain normalized-equal to 8ff12. The earlier social helper's nonidentity to the original remains open. V2 Rust is unchanged, but its generated handler layout differs from 8ff12; its parser is normalized-equal and the existing V2 runtime rows pass. No V2 recovery is claimed.

The complete same-method inventory compares the accepted 8ff12 baseline with this candidate: **all 585 original inferred windows** and **all 562 fresh candidate symbol windows** are retained. Original classifications change from 439 mapped-pattern / 143 unattributed / 3 call-conflict to **448 / 135 / 2**. Eight formerly unattributed rows and one conflicting row now map; all other original rows remain represented. Candidate classifications are 450 normalized-call-consistent / 110 unmatched / 2 call-conflict. There are 141 ambiguous original rows and 139 ambiguous candidate rows, 273 immediate-call residual records, and 92 residual calls inside consistent pairs. These are mechanical window categories, not function recovery percentages or semantic coverage. `reference/inventory-vs-fc1088.json` is explicitly an additional historical comparison; `inventory-vs-8ff12.json.gz` is the current-baseline comparison.

During portability preparation the static script was refactored to expose a read-only `run()` and its gzip container was regenerated. `static-replay-update.json` preserves the earlier gate digest, final container digest, exact unchanged ELF hashes, and new tool hash. The pre-execution gate record is not rewritten. This affected analysis packaging only, not the compiler or runtime inputs.

## Existing runtime evidence

`runtime/` contains the nine baseline receipt files, the 20-case focused receipt, the ten-step donation sequence, every numeric exit code/stdout/stderr, and aggregate progress/summary. All **417** legacy/V2 sharing-update rows remain in the 17,331-case aggregate; no selected-row subset substitutes for the corpus. The extra baseline reports bring it to 17,441; adding the same 20 focused cases gives 17,461. The focused corpus includes eight repeats of older cases and twelve previously added cases; rerunning it adds **zero** new unique coverage. Ten stateful donation steps are separate.

`runner-repo/` contains exactly the unchanged 44 baseline harness/helper files and 17 fixture/evidence inputs. `validation-layer/` retains four byte-identical focused Python files and the exact 20-case manifest. Only its expected source map and build provenance are adapted to the new candidate, with old published maps preserved in `history/`. The focused driver still uses fresh VMs, normal test-owned signatures, blockhash checks, default transaction history, and all state/event/inner-instruction/return/log assertions. The baseline fixtures retain their established controls unchanged. The two captured historical initializer messages retain the original message bytes and real signatures; freshness rejection and unchanged-message checks remain enforced. No signer bypass is introduced.

`runtime-engine-before.json` and `runtime-engine-after.json` measure the same actual Python and solders 0.27.1 payload. The portable saved verifier decodes every available signed transaction field, rechecks signatures, checks historical captures, recomputes focused assertions, and applies the unchanged eleven-row diagnostic postprocessor. It does not submit transactions.

## Verification

From any directory, with Python standard library:

```sh
python3 -B /path/to/handoff/verify.py
```

With solders available, including the established environment:

```sh
work/test-env/bin/python -B work/fees-legacy-caller-build/handoff/verify.py --runtime --repo .
```

`--repo` additionally checks that repository main still equals the frozen 26-file baseline, and is therefore intentionally unsuitable after a later promotion. Without it the package is self-contained and reads no work tree/cache paths. Recorded absolute paths are historical provenance only. The manifest covers every payload; missing/extra/tampered payloads fail. No script invoked by this verifier builds a program or executes a VM transaction.

Parent must review before any main promotion. A future promotion would require the exact one-file source delta, accurate README, one clean main build, and whole candidate plus symbol ELF identity before carrying these receipts forward. Counts remain 31 bounded Fees handlers and zero of four exact main contracts; unresolved data/indirect/allocator closure, diagnostic coordinates, V2 logic, and other prior gaps remain open.
