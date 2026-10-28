# Optional harvest helper stage: 799

Select `--stage harvest799` on the ordinary SBPF profile. The default `curvehop745` and all eight preceding source stages remain selectable. SBF780 and unchanged-source SBPF785 remain distinct profiles; no SBF result is asserted for this stage.

## Source attribution and intentional repair

This isolated `migrate_v2.rs` change is credited to [PR #323](https://github.com/lalalune/pumpfun-source/pull/323), exact head `e8a20069315b8c6fd645b7f3b1e7990de07b6b0d`. Only the call at line 328 changes, followed by six appended lines defining an ordinary public helper around the pinned Anchor SPL harvest wrapper. The other 59 inputs and every existing source coordinate remain unchanged. The full upstream patch was not applied; no upstream counts or runtime results are inherited. Earlier source credits remain in the preceding reports.

The existing quote-preexisting, extension-parsing and writable-mint checks remain before the helper, including error 6110. The helper takes the existing quote program, quote mint and temporary quote source account. It uses a one-source vector and the unchanged pinned Anchor/SPL dependencies.

**This restores original validation and AccountInfo ordering, not blanket equivalence with the old manual CPI.** The original constructor checks the dynamic program ID against Token-2022 and returns `IncorrectProgramId` on mismatch before allocating constructor metas, packing the instruction or invoking the callee. Wrapper cloning and source-vector allocation can occur before this constructor check. The old manual path lacked that explicit check. Its AccountInfo order was `[mint, source, program]`; the original and reconstructed wrapper use `[program, mint, source]`.

A mint's Token-2022 ownership does not itself force the independent TokenInterface program account to be Token-2022. Earlier ATA processing supplies only a conditional argument under genuine callee semantics, not proof that wrong-program inputs are unreachable. Canonical valid Token-2022 account semantics align, but arbitrary wrong-program, conflicting duplicate-key, missing-account, allocation/borrow precedence and full migration semantics are not claimed equivalent to the old path. No CPI was executed.

## Independently qualified result

The accepted ordinary SBPF checkpoint has **799 / 1,035 injective normalized windows and 133 raw windows**, retaining all 795 prior normalized and all 131 prior raw matches. Four new complete normalized bodies are the standalone harvest helper (1,480 bytes), Anchor harvest wrapper (2,664), transfer-fee packer (2,320) and instruction constructor (1,104). All 58 immediate direct callee edges bind complete same-sized original-matched bodies; eight root/callee import occurrences retain original imported identities.

Three immediate data operands are qualified by their consumers: the 32-byte Token-2022 program ID, four-byte TokenInstruction discriminant 26 and one 24-byte original panic-location record. The constructor's dynamic-ID mismatch branch, writable non-signer mint/source metas, instruction data `[26, 4]`, original AccountInfo ordering, empty signer seeds and result propagation are verified against actual original/current bodies and callee targets.

The sole current migration call uses the corresponding typed account fields and two original-matched 264-byte AccountInfo clone bodies: program at account-struct offset 160, boxed mint through offsets 24 then 88, and source at offset 104. Original and current setup use the same field roles. Encoded local branches do not bypass the required argument setup. This does not prove whole migration-caller equivalence, arbitrary indirect flow or global reaching-definition closure.

Two previously normalized-matched bodies also become raw-identical: Token Mint unchecked deserialization (896 bytes) and `find_mint_account_size` (344 bytes). Their five immediate calls remain original-matched. This is measured equality after an ordinary build, not a claim of unique historical placement.

A separate same-source root recompilation reproduced both complete generated ELF files byte-for-byte, with all 355 compiled dependencies unchanged. Earlier unique artifacts and source trees were preserved; the inactive historical SBF cache was explicitly verified as archived rather than reported as live. Captured build logs contained no emitted stack/frame/overlap-limit diagnostics, and warning blocks were unchanged. **Absence of emitted backend diagnostics is not runtime stack-safety or executable validation.** Raw logs and receipts are not included here.

## Prior boundaries and readonly-data changes

All earlier qualified roots, records, TypeId roles and named decoder residuals were rebound. Fifteen previously typed clamp/payment/arithmetic caller bodies and all 610 immediate pointer/import roles are preserved, retaining the prior 30-clamp-call, five legacy-rent-call and eight-sum/one-subtract interface bounds.

All four dispatcher bodies and numeric selectors, 113 immediate target bodies, 20 immediate data roles and 56 generated Anchor handlers are retained. No instruction route was added. The readonly sections are not byte-identical: an observed 128-byte readonly insertion and 24-byte relocated-record insertion preserve every old byte/literal and all 644 old relocation edges under an exact, uniquely checked correspondence. The added record binds the original harvest constructor panic location. These are post-build comparison mappings, never prescribed numeric compiler layouts.

The two unequal typed business-handler edges and two unresolved original panic-metadata identities from fourfronts795 remain unchanged. The old panic records retain their literals and consumers under the transport; their original owner mappings remain unresolved, not newly qualified by this stage.

The pure source suite has **66 passing tests**, including all nine source stages, exact inventories, the isolated one-file change, original guard order and invalid-parent rejection. Materialization and these tests neither compile nor execute the program.

**Runtime: NOT RUN. Whole-original binary identity: false.** FeeConfig 1,176-versus-408 and BondingCurve dispatcher 624-versus-600 gaps, 27 PDA seed consumer extent/dominance limits, bounded record interpretation, duplicate TypeId historical ambiguity and original clamp Source 57 versus current 2911 remain. No universal data, recursive-callee, allocator, general indirect-flow, whole-program semantic or historical-build identity is claimed. No binaries, IR, SDK/archive payloads, raw build/runtime receipts or runtime fixtures are included. No merge or deployment.
