# Fees state-module integration acceptance review

No substantive integration finding remains. The promoted `d5b8f885…` Fees package, pending status/CI/binding references, and all 150 completion rows are consistent. The package verifier, unchanged generic saved-build verifier, and root current tracked-binding dispatcher all passed. This is acceptance of the retained bounded evidence, not whole-program equivalence, security sign-off, deployment readiness or later hosted CI acceptance.

This review freezes the exact pending bytes in `inputs/` and records every checked SHA in `checked-inputs.json`. At capture, the 60 program/package-owned files were staged. Central files were pending root integration. The separate AMM integration was outside scope; its retained baseline remains `5a68db39…`. The other three program status entries and their completion rows are unchanged.

## Source and artifact

The current Fees ELF is **768,024 bytes**, SHA-256 `d5b8f885942ee0d54519e4330941b5e034cfcdcf271eb286d0b4cc81165bee13`. Direct byte comparison with the frozen scratch archive confirms whole-file identity, and the main/scratch report hashes and source maps agree. Their only source-input difference is the finalized program README. Main runtime was not repeated; receipt transfer is based on full ELF identity.

The 23 main inputs match their archive, current files and build report. Independent reconstruction of the source change from the retained baseline confirms only four byte-preserved account declarations were moved into `state.rs`: BuybackVault, SocialFeePda, DonationFeePda and FeeProgramGlobal. Their old modules contain public reexports, and `lib.rs` adds the module declaration. All field order/types and account attributes remain byte-preserved. `Cargo.lock`, the accepted inline `contexts.rs`, profile and build flags remain unchanged. The recorded build uses v1.44 compilation and the unchanged SDK's v1.52 stripping phase; it does not prove a unique historical pipeline.

All four moved checked codec bodies retain the source-line immediate difference at instruction offset 528. Original/new line values are 50/3, 113/6, 135/9 and 154/12. Their complete filename and account-name literals match. The moved windows total 2,928 bytes; including SharingConfig, the five windows total 3,672 bytes. SharingConfig still has filename/line differences. Independently decoded raw signed call operands resolve all 35 immediate call sites to the recorded 11 unique targets. The portable package verifier freshly recomputes full normalized target-body/relocation comparisons against retained original bytes.

The previous initializer handler/parser/wrapper, social exit, and Pubkey evidence remain supported: ten complete retained bodies, 26 immediate calls, and five bounded literals. No arbitrary transitive or vtable/data closure is inferred. Whole-file equality with the captured original remains false.

## Saved runtime and tracked bindings

Nine comparison receipts total **17,441**, and the separate donation receipt contains ten steps. Every exposed gzip receipt equals its frozen scratch member. Saved verification rechecks **8,644 encoded transaction fields / 17,204 signatures**, two genuine historical messages, and the existing 69 repeated-input comparisons. There are no new unique cases or handlers.

The current tracked-binding dispatcher passes all **91 map entries**: 23 source inputs, four build helpers, two documentation entries, 44 canonical published harness files, and 18 runtime inputs. Its only change is dispatching the current Fees artifact to the new package's binding verifier; historical work paths are not required as live inputs. Some map groups intentionally overlap, so 91 is an entry count, not a unique-file count.

The pending status matches the package proposal except for one precise wording correction. Independent decoding of both genuine signed captures identifies the Fees program's `initialize_fee_config` discriminator `3ea214857941911b`, and both original signatures verify. The updated limitation correctly distinguishes those messages from `initialize_fee_program_global` history. The original transaction bytes are unchanged; stale-blockhash adaptation remains explicitly bounded.

## Central integration

CI's change is exactly the replacement of ten Fees runtime commands' candidate path plus the current package verifier path. Existing flags, output names, commands and coverage remain unchanged; no runtime commands were executed by this review. The root binding-dispatcher change is exactly its Fees artifact path. The generic saved-build verifier successfully consumes the new actual receipts, build report, source map, log and historical captures.

The completion ledger contains **150 unique program/instruction rows**: Pump 56, AMM 38, Fees 31, Mayhem 25. Counts remain **140 bounded / five partial / five unrecovered**. All 31 Fees rows point to the new artifact; the remaining rows are unchanged. Current validation metadata sums to **53,735** receipts, including Fees 17,441, with Pump's 1,024 Surfpool comparisons separate. The README/completion descriptions retain whole-original equality **0/4** and do not present handler coverage as total recovery.

`command-results.json` and `logs/` retain the three successful checks. `check-results.json` records independent source, code/data, call, receipt, status, CI and completion checks. One initial reviewer-only assumption incorrectly required every other program's status to expose a top-level candidate SHA; some use unchanged completion/build records instead. That failed checker and trace are preserved. The corrected check verifies those unchanged rows against their frozen baseline, and no package or repository edit was needed.

## Reverification

Run `python3 -B verify.py` to verify this review seal, recompute the frozen independent checks, decode/verify the two historical messages, and run the saved package plus generic verifier against retained inputs. Python with `solders` is required. No Git checkout, network, compiler or Solana runtime is needed. Add `--current-repo /path/to/pumpfun-source` to also require the captured inputs still equal current files and rerun the real tracked-binding dispatcher; that optional check is expected to become stale after later authorized integrations.

Only `work/state-module-integration-review` was written. No main source/status/workflow changes, staging, commits, builds, runtime replays, or network operations were performed.
