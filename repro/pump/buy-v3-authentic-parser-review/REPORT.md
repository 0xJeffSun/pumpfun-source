# BuyV3 authentic parser review — static, Pump731003

**Disposition: no authentic unified replacement or independently safe Rust patch established. Do not promote the compatibility mux as recovered source.** The original evidence supports one typed BuyV3 context, one body receiving the optional-fill argument, and one success-only exit. The accepted SellV3 reuse and the proposed Tokenkeg-only ordinary context/body each omit parts of that contract. Combining them behind a reconstruction-domain selector does not recover it.

This report identifies necessary corrections, not a completed implementation. No compilation, macro expansion, target execution, new fixture, chain action, network access or main-tree edit occurred. Other handlers and token-extension implementation remain opaque. Prior seals and failures are not replaced. The completed reconstruction measure remains 0/4 original core binaries.

## Fixed inputs and current applicability

`input-bindings.json` lists only explicitly selected public inputs and source excerpts. `analysis.json` independently resolves current symbols against the current executable's identical text. The full original allocation is retained without trimming. The current receipt itself names Pump731003, rather than inheriting a receipt through a stale filename.

| Input | SHA-256 | Bytes |
|---|---|---:|
| Original | 7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d | 10485715 |
| Current candidate | 731003570927c206353555d9743d70229234e7e3fa167a5915fa146f3007fc93 | 1579424 |
| Current symbols | 151727642ec97f48b7bc3aba5f3311a09c1a2400f6b8a757210aa83e63454b7d | see machine ledger |

Current main `lib.rs` and `trade.rs` were byte-equal to the checkpoint's frozen source when read. Their complete hashes are respectively `47f03b7c4e64e94fe19078ffe73b32827b1868c7e2c857d21917ccef0382a977` and `79c24ac3d9df80420adeb013201b9c23decf6e28dda43a3ee1a828508cf8922b`. Only BuyV3/context excerpts are published. This is a read-time observation, not a guarantee about future HEAD.

The finalized compatibility publication binds the older 568546bc candidate and c1ffdd0 source snapshot. Its selected source pieces are useful evidence, but its virtual addresses cannot be relabeled current. All four focused windows differ raw and under the deliberately narrow call-immediate normalization, both original/current and previous/current. Changes in embedded data addresses also prevent a claim of unchanged normalized bodies. Sizes or names alone establish no identity.

## Wrapper, parser, body, exit

Intervals are half-open virtual addresses. Original bounds remain inferred. Current bounds are named STT_FUNC extents, after executable/symbol-text equality.

| Role | Original | Current Pump731003 | Current identity |
|---|---|---|---|
| Wrapper | 1286c8..128c28 | 113218..1137d0 | __private::__global::buy_v3 |
| Parser | 102578..105b78 | f6af0..f9bc8 | SellV3::try_accounts |
| Body | 147ba0..1489f8 | 89138..8c9e0 | trade::buy |
| Exit | 107b38..107f78 | f9bc8..f9f88 | SellV3::exit |

Original direct calls are **128808→102578**, **128930→147ba0**, **128978→107b38**. Current calls are **113420→f6af0**, **113570→89138**, **1135b8→f9bc8**. Every immediate call, indirect call, relocation binding, branch operand and LDDW in these eight windows is retained in `analysis.json`; unknown targets are not guessed from display annotations. The old assembly's `<.text+...>` labels can disagree with its encoded branch destination: use the signed offsets, not those labels.

Original wrapper logs the 18 bytes `Instruction: BuyV3` at 1b7dd3. After the existing outer dispatch, it decodes two little-endian u64 arguments. With exactly 16 argument bytes it supplies flag zero; otherwise byte 16 must be zero or one. Byte values other than those go to the decode error path. At 128780 it saves the flag, reloads it into r5 at 128928, and passes it to the body. The body retains it in r6 at 147ba0 and tests it at 147cf0 before choosing the amount. **Keeping OptionBool decoding but writing `let _=partial_fill` is not the original call/data contract.** Neither the accepted `buy` nor the proposed ordinary `buy` takes that third argument. A pure signature edit is insufficient: the subsequent amount, whitelist and residual branches must be reconciled.

The parser result is tested at 128828; failure does not run the body. At 128940 body success tag 2 branches to 128950, which prepares exit; body failure jumps past it. Exit receives the same decoded context. An attempted parse can initialize volume before later constraints fail; no retry with another context is justified. Serialization after a failed body or a stale second context would violate this sequence.

## Seventeen-field validation crosswalk

`contracts.json` contains every field, exact original anchor, source difference and literal occurrence. Signer index is 8; writable indices are 5,6,7,8,9,10,11,13. The final two fields are event-CPI additions. Index order is the external account ABI, **not** constraint execution order.

| Index / field | Original contract anchors | Accepted → proposed ordinary |
|---|---|---|
| 0 global | checked reader 1025b0→13270; canonical PDA 103b58; compared 103c30 | boxed owned Global remains |
| 1 base_mint | 102738→288→32d8; two allowed owners, initialized decoder | boxed interface Mint remains; body must not narrow it to Tokenkeg |
| 2 quote_mint | 102890→288→32d8, same reader as base; 104330..104538 key relation | unchecked → boxed interface Mint |
| 3 base_token_program | 1029e8→120→9eb0: allowed key, executable | interface remains |
| 4 quote_token_program | 102a30→120→9eb0: allowed key, executable | interface remains; membership alone is not owner==program |
| 5 bonding_curve | 102a78→13048; canonical PDA 103d18; mut 104320; key relation custom index4 at1044d0 | boxed owned curve; proposal adds key relation |
| 6 associated_base_bonding_curve | 102c80→38a8; token-program comparison104630; authority104708; ATA104970/1049f8; mut104b50 | typed ATA remains; preserve all these checks |
| 7 associated_quote_bonding_curve | 104b60..104e60: curve/program/mint seeds, ATA-program ID, canonical PDA, mut | unchecked mut → unchecked with unconditional ATA seeds; token data checks remain later |
| 8 user | signer102da0→127a0; mut104e70 | Signer mut remains |
| 9 associated_base_user | typed reader102de8→38a8; mut104e90; mint relation105138..1051d0, error2014 at1055f0 | mint+authority+program → mint only; no authority removal elsewhere authorized |
| 10 associated_quote_user | unchecked admission; mut1051d8..1051e8; error2000 at1056a0 | unchecked mut; body validates token branch |
| 11 user_volume_accumulator | canonical seeds103608; init1038f8; outer mut/rent103928/103a10 | unchecked PDA → owned boxed init_if_needed, payer user, space137 |
| 12 fee_config | boxed reader103010→3cc8; stored bump1051f8; create-address105300; key105400 | unchecked canonical PDA/late decode → typed early decode/stored bump |
| 13 buyback_fee_recipient | unchecked; mut105710, error2000 at105988; body recipient policy later | remains unchecked; body preflight changes |
| 14 system_program | 103160→13b80; error label103248 | typed System remains |
| 15 event_authority | account reader1031b0; canonical PDA105750/105820; error2006 | event-CPI field remains |
| 16 program | account reader103300→136f0; label103448 | event-CPI AccountInfo remains; no extra invented program/executable check |

The original base-user interval supports mint-only generated constraints. It does **not** authorize broadly dropping checks to force compatibility: actual transfer CPI authority/program checks and any body constraints must remain. The exact original source declaration and framework expansion remain hypotheses until all helper/error paths are closed.

Native relation is asymmetric: supplied==stored, OR stored==zero and supplied==WSOL. Thus supplied zero does not bypass typed Mint admission even when keys are equal. Stored WSOL/supplied zero is not the accepted symmetric native shortcut. Native body selection is stored-zero, rather than any pair of zero/WSOL aliases. Saved successful SOL rows use a real WSOL mint; they do not establish all these aliases.

`data-contract.json` binds the original two-program owner table, Pump owner, WSOL and two fee-selector quote keys to exact ELF bytes. Original 32-byte owner/key data must remain exact: Pump `6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P`; Fees `pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ`; Tokenkeg `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`; Token2022 `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`; associated-token `ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL`; System zero; WSOL `So11111111111111111111111111111111111111112`. Original mint admission uses the two 32-byte entries at 1b9f34; wrong owner constructs3007, program membership3008, executable3009. No extension decoder or probe was resumed.

## Ordered constraints and data effects

1. Decode non-init fields in account order, retaining field-decorated reader errors. Global, both typed mints, both interface programs, curve, base vault, signer/base user, foreign FeeConfig, System and event fields are admitted before initialization. Raw unchecked accounts still consume positions and can fail missing-account admission. Fee decode is at103010, before Rent103340 and volume initialization.
2. Derive volume PDA from `user_volume_accumulator` and signer key (103548..103708); wrong key2006. Initialize/admit at1038f8→105b78. Existing owned volume must decode, have exactly137 bytes, expected owner and enough rent. System-zero creates; funded System tops up, allocates and assigns with PDA signing; payer==target error4101. Preserve CPI errors. Decoder distinguishes3001/3002/3003; space2019, owner2004, rent2005 remain distinct from checked-reader owner3007. Init success is followed by outer mut2000 and rent2005.
3. Then global PDA, curve PDA/mut/key relation; base vault program/authority/ATA/mut; quote vault ATA/mut; user/base-user checks; quote-user mut; FeeConfig stored-bump seeds; recipient mut; event PDA. Error blocks are interleaved in linear address order: this list follows the success path, not sorted error addresses. A source macro must reproduce this order, not merely contain the same predicates.
4. FeeConfig's typed reader must consume discriminator `8f3492bbdb7b4c9b`, combined bump/admin prefix, flat tuple, both vectors and mandatory exotic tuple. Length minimum is97+40(n+m), trailing bytes permitted. Allocation capacity102 is not a count limit. Its *decoded* bump at+0x80 is used at1051f8; it is not canonicalized. Foreign owner and error origin `fee_config` remain mandatory. Decoder failure can precede volume init, but fee seed failure follows it.
5. Body first calls curve preparation147c08→3cd50, before mode checks147c50. Preparation calls rent3cf48→3d250 even for long curves; size is max(length,166), growth is a separate path. Native reserved lamports include real quote plus creator/protocol accrual with6024 overflow, then exact rent shortfall transfer. A pre-body ordinary-domain fence is not an original rejection.
6. Preserve the flag/mode/whitelist amount selection147c70..147e70, not unconditional clipping. First fee148308→7fde8, optional residual148480→82af8, second fee82ff0→7fde8, settlement1488c0→83c00. Both fees use the same pretrade context; retain threshold/length/table/override/narrowing order, separate ceilings and exact key constants. Ordinary threshold uses actual mint supply; the mode-dependent alternate source is not closed here.
7. Settlement writes first reserves, transfers base83ed8→8f5c8, then nonwhitelist zero-user volume initialization83ef8..84068, then accrual. Existing nonzero volume user is preserved; no new equality-to-signer rule. Four volume metadata fields feed events. Native funding includes combined buyback and then direct recipient credit; do not conflate ProgramError::ArithmeticOverflow with Pump6024. Token settlement and Mayhem/holder paths must retain their existing successful evidence; ordinary helpers do not prove their full contracts.
8. Events and all body effects must succeed before exit. Original context exit107b80→5a28 serializes curve, checks intervening interface accounts and then107d80→6158 serializes volume. Volume discriminator `56ff700e66359afa`; full serialized prefix106 bytes in137-byte allocation, trailing31 bytes not zeroed. Expected owner and closed-account checks precede fallible mutable borrow. Short write3004; incompatible borrow error propagates. No foreign FeeConfig serialization under Pump ownership.


## Preservation evidence and its limits

The current `v3_configured_fee.json.gz` names the original and current hashes, retains372 total comparisons, and has no recorded mismatches. The verifier selects exactly117 BuyV3 rows without analyzing other operations. It compares each index/case/error/match to the previously published regression ledger. There are105 successes and12 failures. All117 have Token2022 base ownership recorded by that ledger. Successful subgroups remain37 SOL,37 Tokenkeg quote,31 Token2022 quote, with overlapping36 Mayhem and36 holder rows.

The current receipt contains, in every selected row, the same137-byte owned volume post-state on both sides with a nonzero user key. This is useful preservation evidence for existing state only. It does not prove zero-user mutation, init timing or failure precedence. No token extension bytes are decoded. No all-input preservation follows from these rows. The finalized selector's first ownership branch preserves them by using accepted source; it supplies no evidence that its ordinary lane would pass them.

## Smallest supported corrections and missing evidence

* **C1 — restore the optional-fill data contract.** Original flag decoding, r5 passage and body test are direct evidence. Current and proposed wrappers discard it. A standalone unused parameter patch would be cosmetic; exact whitelist/mode/residual semantics147c70..147e70 must accompany it. No patch issued.
* **C2 — dedicated typed BuyV3 parser, without a compatibility classifier.** Typed quote admission and asymmetric relation are supported independently of the ordinary body. Volume ownership/init/exit and early full FeeConfig decode/stored bump are supported too. They cannot safely be scattered across the reused SellV3 context: that changes other instructions, init precedence and exit ownership. The natural dedicated context is the smallest coherent *parser hypothesis*, not yet a safe replacement.
* **C3 — correct body preparation and fee/volume/event ordering.** Rent-before-mode, actual ordinary mint supply, Global-gated creator override, per-leg fees, post-transfer zero-user update and success-only serialization have direct anchors. Applying one arithmetic line globally would extend ordinary evidence into mode-dependent code. No such edit is justified.

**Named missing original evidence:** complete source-level reconstruction of amount/flag/whitelist merge147c70..147e70; full mode-dependent preflight/settlement/error objects across147c50's target and83c00; exact remaining quote-vault creation/admission paths in retained `quote_vault.asm`; full helper/type/error correspondence for readers13270,13048,38a8,127a0,3cc8 and generated parser102578..105b78 against locked Anchor expansion. Historical source/module coordinates and transitive data objects remain missing. The evidence bytes often already exist; the missing item is their complete justified mapping, not permission to invent source.

**Next inspectable static windows:**128710..128798 +128918..128940 +147bc0..147e78 for flag provenance;102578..103548 for reader/admission ordering;103548..103b28 +105b78..107b38 for init;1045b0..1051f0 for base/quote checks;1051f0..105688 for fee seeds/error details;107b38..107f78 and6158..66f0 for exit;3cd50..3dd78 for preparation;7fde8/82af8/83c00 retained ordinary call graph for body composition. These are inspection suggestions only; no excluded handler or token-extension work is authorized by them.

The 117 rows are mandatory regression obligations for a future authorized implementation, not a domain definition. Neither dropping rows nor accepting a surrogate `ReconstructionBranchUnsupported` error is completion. No authentic dispatcher branch is evidenced. Current source stays untouched; whole-file equality remains false.

## Verification and retained limitations

`verify.py` uses only the Python standard library. It checks exact inventory/hashes, historical seal hashes (without executing or copying historical cache/telemetry), assembly bytes against the original ELF, current symbols/text and recomputed four-role call/data analysis, and all117 saved-row correspondences. It also recomputes the17-field ledger. It does not execute a Rust body or prove manually attributed semantics. `owned-map.json` maps all owned publication files, with no main destination or integration patch. Independent copy verification is recorded outside the sealed publication.

Prior finalized failure history remains in its original sealed package; this publication preserves its manifest/seal rather than exporting CLI logs or caches. During this review a scratch receipt display hit TypeError on a null data_hex; the corrected inspection treats absent data as absent, without changing receipt bytes or assertions. No target/build failure was retried or concealed.
