# Fees create_donation_fee_pda: proven identity and one-field proposal

This is a read-only review of original `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e` and the frozen current SharingConfig candidate `8cce74a5191b286eaa10af59c02c9ee16d3853be214c5e9b1132e50bba15ef87` (768,104 bytes). All 26 current build inputs, the symbol ELF, public IDLs, and selected locked framework source are included. No compiler, candidate execution, transaction, or main-source mutation occurred.

The original 13,800-byte window is **create_donation_fee_pda**, independently established from entrypoint, IDL discriminator, dispatch, instruction log, and wrapper call. The natural source proposal is only `CreateDonationFeePda.event_authority: AccountInfo<'info>` in place of `UncheckedAccount<'info>`. It is not a complete handler recovery and has not been built.

## Identity chain

The public IDL discriminator `f48b10580eff7a1a` equals the first eight SHA-256 bytes of `global:create_donation_fee_pda`. Original entrypoint 660680 calls dispatch 598128 at 660808. Its discriminator LDDW at 599184 is compared at 599200; the signed branch goes to 602624, whose call at 602704 targets wrapper 655904. The wrapper logs exactly `Instruction: CreateDonationFeePda` from 807843 for 33 bytes, calls parser 425776 at +160 and body 163920 at +424.

Current entrypoint 542376 calls dispatch 331920 at 542504. Discriminator 332208, comparison 332224, selected block 333808 and call 333888 reach named wrapper 356816. The same 33-byte log is at 700942. The wrapper calls parser 135168 and named handler 425016 at the same +160 and +424 positions. `analysis.json` replays every signed call operand and branch calculation. Original end boundaries are next inferred entries, not original debug symbols.

## One-field source proposal

IDL account 0 is `event_authority`. Original parser 425776 consumes that first account before any other parser: the cursor advances 48 bytes, both lamports/data Rc strong counts are incremented, and the key, Rc pointers, owner, rent epoch and three flags are retained. Success stores place those members at context offsets 128, 136, 144, 152, 160, 168, 169 and 170 respectively. `account-layout-proof.json` records the exact loads and final stores. The complete parser disassembly preserves the intervening stack dataflow.

Current parser 135168 advances the same cursor by 48 bytes but retains the account pointer in r7; success stores that pointer at context offset 216. This agrees with the locked `UncheckedAccount(&AccountInfo)` implementation. Locked `AccountInfo::try_accounts` instead returns `account.clone()`, which explains the original ownership behavior. The wrapper preserves 24 bytes then copies 856 original / 816 current bytes, yielding 880 / 840-byte result/context aggregates. The 40-byte difference supports the field tracing; size alone was not used to identify the field.

The **program field must remain typed `Program<PumpFeesCandidate>`**. Original parser +368 calls 74128; current +192 calls 62128. Those complete 584-byte bodies match after relocation/call normalization, all five direct target bodies match by the same criteria, and the exact compared 32-byte program ID is identical. The program parser's return kind and original/current source support keeping that field. The locked event_cpi macro's general use of AccountInfo for injected fields does not override this direct evidence for an explicitly declared context.

`source.patch` changes exactly one type token, preserving seeds, bump, CHECK comment, field order, program type, handler, CrankDonationFeePda, module paths, IDLs, lock, profile and flags. `proposal/donation.rs` is the review copy. No source-location adjustment, padding, compiler variant or speculative alternate source is proposed.

## Complete selected-window mismatch inventory

| Window | Original bytes | Current bytes | Direct calls O/C | External calls O/C | Branches O/C |
| --- | ---: | ---: | ---: | ---: | ---: |
| wrapper | 928 | 696 | 5 / 5 | 1 / 1 | 10 / 7 |
| parser | 8,984 | 8,496 | 71 / 71 | 1 / 0 | 72 / 67 |
| handler | 13,800 | 10,576 | 77 / 75 | 3 / 1 | 105 / 61 |

`instruction-ledger.json` records all decoded instructions in twelve selected windows, including raw bytes, normalized bytes, signed operands and branch destinations. `analysis.json` partitions the complete original/current windows using a mechanical exact-instruction sequence alignment. Those partitions account for unmatched material without asserting CFG equivalence from repeated short sequences. There are no indirect calls inside these three root windows; indirect calls exist in some downstream helpers and their complete closure is not certified.

The root wrapper/parser/handler reach 42 distinct original direct targets. Thirty-seven have at least one complete normalized current symbol-window match with the same relocation pattern; matching is sometimes ambiguous because generic bodies are identical. Five fail complete normalized matching: the handler itself, the main parser, parser's init_if_needed closure 434760, SharingConfig checked decoder 442944 and Pool checked decoder 575408. The latter two have one normalized instruction-slot difference at +528; they are not silently counted as matches. The 8,184-byte init_if_needed closure differs at +3568 and +3576. Original/current known pairs and all differing slots are retained, without attributing those two closure slots to a source fix. Matching direct bodies does not certify their transitive calls or data.

## Other established gaps and limits

The original handler has two early log calls absent from the entire current ELF: `donation_fee_pda already exists` (31 bytes) and `CreateDonationFeePda is currently disabled` (42 bytes). Their exact targets, consumed lengths and sol_log_ calls are asserted by the portable verifier. The disabled branch passes enum index 21 to the original FeeError conversion body, which has a complete normalized current counterpart; source names index 21 FeatureDeactivated. These operations are evidence for later source reconstruction, not changes in the one-field patch.

The original also has a separate branch before the pool path. It tests context qwords 0xf0, 0xe0, 0xe8 and 0xd8; the zero case enters pool processing at 164336. The nonzero case clones the AccountInfo at context +0xb0 and reads its data. The permitted BondingCurve parser chain is bound here: account parser 70520 → Account::try_from 28120 → checked decoder 537312 → unchecked decoder 538040. Current corresponding bodies are 59288 → 33528 → 321408 → 322136. Account::try_from and unchecked decoder match normalized completely; checked decoder differs at its source-coordinate slot +528. The decoded reserve u64 values propagate through the parser success copy to those four tested context offsets. Thus this is a reserve-dependent BondingCurve branch, not a SharingConfig identity inferred by size. Its complete business logic and data-consumption contract are **not reconstructed**. The current handler selects its pool path unconditionally after the early guards. No patch for the separate branch is included.

The original handler also differs in event data construction/inlining, error construction, source path/coordinates and cleanup. Its direct data references include the original filename `programs/pump-fees/src/instructions/fee_sharing/create_donation_fee_pda.rs`; the current handler remains in donation.rs. A source-path relocation is not included in this type correction. The new context field may change event/cleanup lowering naturally, but there is no post-build evidence yet.

`data-reference-ledger.json` inventories every direct relocated data reference in the selected windows: 49 original and 48 current handler references, plus wrapper/parser/helper records. Each gives the actual encoded target, raw 128-byte bounded preview and relocated words inside that preview. Complete original/current ELFs preserve all referenced bytes. For logs and the typed-program ID, consumed extents are proven exactly; for other descriptors a bounded preview is **not a full consumed-extent proof**. Corresponding filename/enum tables, vtables and nested descriptor extents remain explicit follow-up work, so this report does not certify full literal/data closure or full semantic equivalence.

## Controlled next step

After review, apply only `source.patch` to an isolated copy of these exact 26 inputs. One established fixed-recipe build may test whether the parser/result layout and wrapper cleanup move to the original shape. Compare complete parser, wrapper, handler, direct calls and data; preserve all mismatches. Do not require the entire handler to match from this patch: the two logs and separate branch are already proven remaining gaps. Main promotion would require a separate acceptance decision and the existing full Fees regression corpus, with its historical message signatures unchanged.

Run `python -B verify.py` from any directory. It verifies the complete payload inventory, 26 source hashes, locked framework archives/members, original/current ELF identities, static analysis replay, exact one-field patch and recorded layout instructions. It needs no repository work/cache path, compiler, runtime or network. All public-source evidence is confined to this new work package; earlier seals remain untouched.
