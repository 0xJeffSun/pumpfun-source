# Nested creation scratch handoff

The isolated corrected candidate passes the approved 16 new nested cases, the unchanged 9,237-case Pump corpus, and all 28 existing Surfpool runners / 1,024 comparisons. Main source, documentation, status, workflows and old packages remain unchanged. This handoff is ready for independent review; it is not a main promotion.

Candidate: `568546bcf038740d995325c1e742528f218f630840ac152f96dcf5c2147eabc2`, 1,598,992 bytes. The actual 37 compiler inputs are retained verbatim in the clean build report and source snapshot. They equal the approved nested-only source plus exactly the reviewed one-line `require_gte!(g.max_curve_depth.min(5), depth, PumpError::CurveDepthExceeded)` correction. Relative to main 5c, the proposed program change consists only of create_v2.rs and the new nested_create.rs; `source-proposal.patch` is the exact delta.

## Results and boundaries

| Evidence | Result |
|---|---|
| Existing differential corpus | 9,237 comparisons, 38 suites; 15,870 transactions, 24,256 verified signatures |
| New nested suite | 16 unique comparisons; 15 successes, one expected6105 rollback; 32 transactions, 64 signatures |
| Surfpool | 1,024 comparisons, 28 runners; 2,048 transactions, 2,980 verified signatures |
| Accepted comparison total | 9,253 differential comparisons plus 1,024 Surfpool; 27,300 verified signatures |
| Repeated original-only fixture acceptance | Same 16 cases; 32 signatures; counted separately, no added unique coverage |
| Historical failed focused phase | Complete 16 case pairs; missing 6105 Left/Right logs remains a preserved negative, not passing evidence |

The 16 new cases cover ordinary Tokenkeg curve chains through depth five, asymmetric reserves, canonical pre-existing migrated Pool ancestry in multiple positions, two Pools, signed Pool quote adjustments and depth rejection. All ancestor state is explicitly synthetic and pre-existing. No initializer/migration transaction establishes that ancestry. The final ordinary create_v2 child-mint initialization is the existing captured-program context; no new Token-2022 ancestry or extension variation is introduced. Payer and mint are ordinary test-owned signers. Each fresh VM explicitly enables signature and blockhash checks and retains default transaction history; the 1232-byte packet assertion remains enforced.

The source still represents partial create_v2 recovery. These finite cases do not prove exhaustive ancestry validity, error precedence, Mayhem behavior or all possible account/state inputs. Existing stopped trade-fee, incentive, v3 extension and Mayhem initializer work remains excluded. The known main sell_v2 transfer-fee/event gap is not repaired by this change. No new fully bounded handler or partial-instruction count is claimed:48 bounded handlers and five partial paths remain the current accounting. Full original ELF equality is false and the audit is incomplete.

## Build and failure provenance

The first nested build 3c5 and all 16 saved failed focused comparisons are preserved unchanged inside `prebuild/depth-guard-review`; its seal is `ffd77e400306d23ad84a73f0c1b82af6bcfbfeb053c85a09aa171380933ba410`. Its portable verifier still requires the missing compared-value diagnostic as a failure. The original first packet-size attempt is also retained under `prebuild/initial-packet-failure`; its first 12 observations lacked full saved receipts and remain excluded from accepted evidence.

Root reviewed the exact correction before one fresh build 02. Compilation used the pinned v1.44 compiler and the unchanged SDK's actual v1.52 strip phase, with isolated target, SDK and RUSTUP_HOME directories. The same dependency lock/profile/CLI recipe was retained; 252 locked archives and 5,367 extracted public source files were checked before the build. Tools and source input hashes were unchanged afterward. `toolchain-phases.json` binds the actual rustc/cargo/linker, strip executable, SDK scripts, CLI, compiled symbol ELF and stripped candidate separately. Generated deployment keypairs were never opened, hashed or copied; only excluded-path metadata is retained. No binary/header edits, compiler variants, inline directives or padding were used.

The validation layer changes only expected-source-map.json for the reviewed one-line source change. All16 cases, metadata, account/state maps, signature/history/packet guards, result assertions and incremental journals are byte-unchanged. Original-only acceptance was repeated solely because the unchanged runner requires its acceptance receipt to bind that exact map. The existing20-case two-curve harness has a separate preserved predecessor and one approved schema adaptation: expected source-input count 36→37 for the added module. Its fixture/signing/assertion logic is unchanged; this is not described as a byte-identical harness. The other 37 existing differential harnesses and 28 Surfpool runners are unchanged.

## Fresh static evidence

The fresh candidate preserves the complete normalized 1,840-byte BondingCurve serializer body, all 25 actual direct target bodies, and the exact eight-byte discriminator. `function-match.json` binds this proof to the new symbols; no prior candidate offsets are inherited.

The corrected traversal is 11,432 bytes, compared with9,600 in failed 3c5. It is not asserted equal to an original complete traversal body. The compiler inlines the ordered u8 decoration into walk: the capped limit is rendered as one digit because it is at most 5, and checked depth is rendered as an unsigned byte. The actual AnchorError conversion and both String::push targets match their complete original bodies. No standalone with_values call exists in this new walk, so the unrelated global generic instances are not substituted for an actual call. `depth-guard-match.json` records the full walk, every actual direct call, exact operand instructions and consumed literals. The complete original guard/helper and locked macro basis remain in the reviewed prebuild packet.

## Saved verification and promotion proposal

The 66 existing differential/Surfpool receipt bindings identify the exact tested executable and 37 actual scratch compiler inputs. Quote-control binds the adjacent build report and all 37 inputs directly. The fresh nested and two-curve receipts bind the same report. Legacy embedded main-source maps are retained as incidental 36-input checkout snapshots; they do not describe the 37-input compilation. No saved receipt is inherited from the previous executable.

Portable verification checks the complete payload seal, source/harness/fixture archives, old negative seal, unchanged validation code, actual build/tool phases, all saved signatures and journals, exact depth diagnostic logs, and fresh serializer/direct-target/data evidence. It does not require a local Surfpool binary, create a VM, sign, compile or execute target code. Historical runtime file identities are explicit in `runtime-identities.json`.

```sh
work/test-env/bin/python -B work/pump-nested-correction-build/handoff/verify_handoff.py --current-source .
```

Omit `--current-source` to verify a copied packet independently of repository paths. The optional check binds current main 36/source 37/harness/fixture files before promotion; it is not a post-promotion current-main gate.

`promotion/owned-promotion-map.json` proposes exactly three owned files: create_v2.rs, new nested_create.rs and the final program README. Proposed immutable destination: `repro/pump/nested-ancestry-fortyeight`. The prospective README/source patch, status row, current_validation JSON patch, workflow Pump candidate/new-suite changes, and current-binding dispatcher branch are review artifacts only. No central file has been edited. Root should apply them only after a clean main 37-input build proves complete ELF identity with 568546; retain a separate main/scratch identity report and current-main tracked-input verifier. If the executable differs, saved scratch receipts cannot be represented as main execution evidence without revalidation.

The proposed workflow preserves existing 38 commands except the reviewed two-curve count adaptation and new candidate pointer. It adds the same 16 original-acceptance and paired calls plus saved verification using the package's canonical nested-harness paths. These planned paths and `verify-package.py --current-main` dispatch are a publication interface to satisfy during promotion, not a claim they already exist. The completion proposal adds only 16 Pump comparisons; rebase its total if another parallel contract checkpoint changes the central snapshot first. All instruction rows and current incomplete/excluded boundaries remain intact.
