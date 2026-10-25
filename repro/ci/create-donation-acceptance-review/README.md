# Independent acceptance review of AMM 807010 and Fees 8f89db

Both frozen promotions pass this bounded acceptance review. Their complete main executables equal the freshly tested scratch executables, their source and build inputs are bound independently, and the retained signatures and receipt guards pass. No substantive package blocker was found. This review does not certify the central integration, whole original program equality, missing behavior, or completion of the security audit.

| Package | Candidate SHA-256 | Bytes | Final package manifest SHA-256 |
|---|---|---:|---|
| AMM create-config/shared methods | `807010828fe3b4124b5e20c34ca627582e1718e9c5849bf0c15309983d4088b2` | 1,199,296 | `af3d4992a4a9f4b01375d1fec610fb902bab321b5dce418f315e6a8bd6716dd8` |
| Fees donation event-authority account | `8f89dbeb0eaef9490a518a97adb50dd8cbf0a21984a2bfca343d6ff5c2fe6c8e` | 768,848 | `a544615738c62279f1ebfd9dae4107b1db5640ac55f05d25f65e939933f91340` |

The scratch seals remain `e8c4409a74d83e3e33c8a0bc44d7430b6bd92fbe2b230c4de425400410e78d0b` (AMM, 293 payloads) and `5c9bcb6673f89c5f7b0ab33610f11f91ffeae57c69d4320fee958f8afa2ce856` (Fees, 172 payloads). They are preserved inside the final public packages. This review pins all 432 files of those two public packages, including their manifests. Their original compiler inputs and execution paths remain provenance; verification needs no scratch work directory or compiler cache.

## Source and audit applicability

The AMM proposal changes only lib.rs and the module declaration in state.rs, adding four natural module files. The 18-input accepted source becomes 22 inputs. The new `CreateConfig` context preserves the fixed administrator, writable real signer, canonical `global_config` PDA, System program, 949-byte initialization space and event CPI accounts. Its generated ordering initializes before checking the fixed administrator address; the frozen static report describes this precisely. No administrator substitution, historical payload alteration, or successful initialization is evidenced or claimed. The new handler/context/event was absent from the earlier four-program source review and therefore needs a separately bounded source assessment; this acceptance review is not a replacement full audit.

The four shared GlobalConfig setters are called from the real create/update handlers. `update_fee_config` retains LP, protocol, recipients, creator validation/store order. The three unsigned scalar bounds remain <=1000, with compared values (1000, supplied value). Recipient validation retains all-eight-nonzero before strictly increasing adjacent keys and the same error codes. Its plain `require!` error intentionally removes the old `require_keys_neq!` public-key Left/Right diagnostics; 78 existing saved rejection cases now check that difference, with rollback. Source coordinates and measured compute differences remain explicit. Earlier assumptions about the accepted input predicate and guard precedence survive this scoped rereview; assumptions that the inline implementation or its complete diagnostic text is unchanged do not.

The Fees Rust change is exactly one field: `CreateDonationFeePda.event_authority` becomes `AccountInfo<'info>` rather than `UncheckedAccount<'info>`. The exact same seed/bump constraint, typed `Program<PumpFeesCandidate>` field, account order, payer signer and handler remain. Locked framework evidence explains the owned cloned AccountInfo/Rc members versus the borrowed wrapper pointer; this changes generated layout and cleanup and must not be dismissed as textual renaming. Original loads/stores and the new complete parser/wrapper support it. The prior source-applicability ledger's byte-preservation statement for this context no longer applies to the new checkpoint. It remains valid only for its explicitly frozen 4d3c19e checkpoint. No prior candidate observation is silently resolved, and missing handler behavior remains outside acceptance.

## Static checks and residuals

Independent `review_checks.py` parses the actual ELF bytes separately from the package analyzers, recomputes complete raw and normalized hashes, checks candidate symbol sizes and original entry-derived extents, decodes signed direct-call operands, and rechecks bounded literal bytes. It masks only direct-call displacements and actual relocation addresses in memory. It writes no executable or normalized binary. The original stripped boundaries remain inferred; symbol attribution is candidate evidence, not recovered original symbols.

AMM's complete create wrapper, handler, parser and event serializer, plus update wrapper, match normalized instruction bodies and relocation patterns. The six initializer roots contain 112 direct calls; 107 actual immediate target bodies match. The three scalar methods remain 608 versus 616 bytes, the init helper retains two diagnostic immediates, and the recipient setter retains four. The actual shared scalar error target has four instruction differences; an unused matching generic body is not substituted. The update handler remains 3,160 versus 2,912 bytes. Of 33 bounded data spans, 30 match and three source-path spans differ; eleven compiler metadata references remain unclosed. Pool and GlobalConfig exits and their 24 targets each remain verified by the frozen package verifier. These overlapping checks are not additive function counts.

Fees' 8,984-byte parser and 928-byte wrapper match normalized completely with relocation patterns. Seventy-four of their 76 actual direct targets match; the 10,584-versus-13,800-byte handler and 8,184-byte init closure remain mismatched. The latter's original/current diagnostic line is 21/81 and filename span length 74/34. The 81 direct-target windows and 21 exact consumed literal spans are retained; all twelve selected windows are checked. One important boundary is explicit: the original entrypoint identity window is a 144-byte prefix of a 440-byte inferred function, not a complete matched function. The package claims complete identity only for the stated parser/wrapper. The separate reserve-dependent BondingCurve branch, two early logs, descriptor extents and transitive/indirect-call closure remain unresolved.

## Receipts and build bindings

Both complete portable package verifiers passed independently, including saved cryptographic verification. AMM retains 17,462 comparisons across 25 suites and 35,418 signatures. Its 34,924 comparison transactions and 150 pre-existing signed original-program boost setup transactions remain separate. The latter do not add cases or initializer coverage. The 191 scalar and 78 recipient diagnostics use unchanged existing fee-config inputs. Actual 22-file source/build bindings supersede the explicitly historical 18-file checkout maps embedded in some legacy receipts.

Fees retains 17,441 comparisons, including 69 repeated-input comparisons, plus the separate ten-step donation sequence. All 8,644 encoded fields carrying 17,204 signatures verify. Two genuine historical FeeConfig initializer captures are checked separately and remain byte-identical, with signature verification and blockhash-freshness guards. They are not historical FeeProgramGlobal initializer captures. Direct gzip receipts remain identical to the scratch archive. No new unique cases, handler counts, runtime replay, or source build occurred in this review.

Both main candidates equal their scratch candidates in full, allowing the fresh scratch corpus to bind to the clean main build without repeating it. AMM's 22 main input hashes equal the scratch proposal; Fees has the same 26 inputs with only the finalized README different between scratch and main. The recorded pipeline compiles with v1.44 and uses the unchanged SDK's separate v1.52 strip phase. Actual tool hashes and SDK sources are preserved. This does not establish a unique historical recipe.

## Verification

From a repository containing the two pinned public packages:

```sh
python -B path/to/this-review/verify.py --repo /path/to/pumpfun-source
```

Use Python with `solders==0.27.1`. The verifier checks the review seal, both public seals, independent raw/static/source checks, and both complete saved-evidence verifiers. Add `--current-main` only to bind the live source/helper/harness/runtime files too. This optional check is expected to reject later legitimate source drift. Central status, README, completion and CI remain root-owned and outside this sealed snapshot.

The initial independent check correctly exposed a mistaken review assumption: it required the Fees 144-byte entrypoint identity prefix to end at the next function entry. The retained first script/log show that failed assertion; the final check explicitly asserts the 144-byte prefix within the 440-byte inferred extent. No input package was changed. This is a corrected review boundary, not a package mismatch or newly recovered body.
