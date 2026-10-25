# Five donation variants: conditional source recovery

This package supplies an ordered, reviewable natural source hypothesis for all five donation bodies, their shared112 business integration, and the distinct native/token/event/context boundaries. It is **static recovery, not an accepted implementation**. Context initialization internals and mint extension policy remain explicit bounded premises. No historical function identity, unique source, executable equivalence, or handler/completion increment is claimed.

Every external input is a `git show` blob from fixed published checkpoint **476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40**. The captured relay ELF is 830448 bytes, SHA256 **367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563**. `provenance.json` binds whole inputs; `consumed-ranges.json` lists selected half-open ELF byte ranges, dynamic field ranges, and retained source line ranges. Full ELF retention does not imply analysis of every function or referenced data extent. Decimal PCs here are ELF offsets (equal to text VAs in this capture). Ordinals name inferred windows, never historical functions.

`source-hypothesis.rs` is the substantive integration fragment. Its fallible runtime/framework methods have the bounded contracts below; they are not assertions that those dependencies have been implemented. `static-evidence.json` and `disassembly/` make every selected direct-call operand, branch, context error construction site and full selected window reviewable. Calls are computed from signed operands (`pc + 8 + 8*imm`), not annotated symbol names. The verifier does no program execution.

## Exact chains and boundaries

| Variant | wrapper | context parse | event adapter | business body | shared | successful account exit |
|---|---:|---:|---:|---:|---:|---:|
|donate_v1|178 [529520,532048)|121 [160776,175248)|190 [553640,556736)|94 [82744,85312)|112 [131136,141384)|125 [201768,204856)|
|donate_pubkey_config_id_v1|179 [532048,534576)|135 [302352,316824)|190|94|112|125|
|donate_pubkey_config_id_with_payer_v1|182 [539584,542112)|138 [335880,350680)|193 [562928,566024)|95 [85312,87880)|112|141 [369736,372816)|
|donate_native_v1|180 [534576,537080)|126 [204856,219680)|191 [556736,559832)|92 [70200,76472)|112|130 [252064,255144)|
|donate_native_pubkey_config_id_v1|181 [537080,539584)|131 [255144,269968)|192 [559832,562928)|93 [76472,82744)|112|130|

The wrapper is not the business body, and190..193 include emission after the business call. For example178 calls121 at530344,190 at530752, and125 at531672. 190 calls94 at553952;94 calls112 at84784. Native180 calls126 at535392,191 at535784,130 at536704;191 calls92 at557048;92 calls112 at74336. All five complete edge sets, including the other exact call PCs, are in `static-evidence.json.chains`.

Wrapper178 first reads amount[0,8), config[8,40), tip_bps[40,42), calls string parser74 at529832 on the remaining bytes, then demands32 credited_to bytes at529888 before parsing accounts. These are offsets after the instruction discriminator. The other wrappers have the same argument wire structure. String decode/UTF-8, short argument and cleanup failure behavior remains the exact74/framework premise; malformed arguments ordinarily request102. No strict rejection of trailing instruction bytes is inserted. Contexts independently parse instruction arguments for seed constraints before account admission.

Both pubkey variants pass the same32 config bytes: wrappers179 and178 even share adapter190/body94. Config is not hashed, looked up as an account, or derived from the donor. `Pubkey::to_bytes()` is the natural source hypothesis. Native pubkey and byte adapters are distinct windows with the same ordered stages; their complete byte listings remain separate.

## Account roles and context integration

IDL declaration order for token variants is epoch_tracker, debouncer, debouncer_token_account, mint, from_token_account, from, mint_whitelist, associated_token_program, token_program, system_program, event_authority, program. With-payer inserts payer after from. Native replaces source slot with temp_wsol_token_account. Writable/signature/address/seed declarations are preserved in `variants.json`, extracted unchanged from the IDL.

* `from` is a writable signer and the token transfer authority. Its canonical source ATA uses `[from, token_program, mint]` under the associated token program. A caller-program PDA may legitimately satisfy signer status through that caller's signed CPI; no signer bypass or fixture is supplied here.
* `payer` in the with-payer variant is a distinct writable signer for account rent initialization. It does not replace from in the source ATA derivation or transfer authority. The regular variants use from for initialization funding. The separate payer does not need to be config_id or credited_to.
* `credited_to` is32 argument bytes copied into the event; it is not an instruction account, a signer constraint, or an immediate token recipient. The immediate token destination is the debouncer ATA. Final donation distribution belongs to another instruction/worker.
* Epoch tracker seeds are `[b"epoch_tracker_v1", config_id, mint]`; debouncer seeds are `[b"debouncer_v1", config_id, mint]`. Debouncer ATA seeds are `[debouncer, token_program, mint]` under ATA program. No epoch number occurs in either donation PDA seed list.
* Native uses `[b"donate_native_wsol_tmp_v1", from, token_program]` under this relay, initialized per instruction, not a canonical ATA. The native context admits the native mint corresponding to the token program via103. It then uses that temporary account as the shared transfer source; token authority remains from.
* Whitelist is the PDA `[b"mint_whitelist_v1"]`; event authority is `[b"__event_authority"]`. Whitelist bypass does not bypass the shared mint-owner/token-program gate. No relayer-only authorization is present in the traced donation business body.

Context parser differentiation is substantive:121/135 call two program-owned init helpers (122/123 or136/137) followed by shared ATA initializer124.138 instead calls139/140 and124 and consumes two signers via80 at338256 and338528, before initialization calls341272/343456/344416.126 calls127/128/124 then the distinct temporary account initializer129 at215288.131 analogously calls132/133/124/134. These helper windows and their conditional branches are retained, including existing-account, rent/funding, allocate/assign/create, and token initialize boundaries. They have NOT been collapsed into unconditional creation.

Static context facts: the native126 mint/program matching gate103 at216528 can request6006 at216568; supported token program gate102 at217944 can request6029 at218592.131 has corresponding calls266816 and268232. Token121's source token relationship gates include2023 at171120,2022 at171176,2015 at171448 and2009 at172112. Context error construction PCs and numeric codes for every selected parser/init window are enumerated, but numeric address order is **not** asserted to be execution precedence across branches. Owner/discriminator/borrow errors and account-name decoration can precede those constraints. The exact full invalid-account precedence is a gap, not an invented Anchor declaration order.

The existing program-owned account path has a more concrete fragment in `context-fragments.rs`:122 compares owner with SystemProgram at175320, taking the existing path through checked epoch decoder25 at175376 when unequal. On decode success it requires exact data length90 at176240 (2019 otherwise), then expected relay owner at176296 (2004), then rent minimum90 against borrowed lamports at182344 (2005).123 repeats this for debouncer size82 (185824–185944). These sizes include the eight-byte discriminator. The system-owned path is distinct:122 reads lamports at175688; a prefunded account checks payer-key inequality, computes max(rent_minimum90,1), and only tops up a deficit before allocation/assignment. The zero-lamport branch instead uses creation. Thus successful typed decode precedes size/owner/rent on the existing branch; the source fragment preserves that local precedence. Native temporary helper129 has its own zero/prefunded split at238800. Full CPI/alias error behavior remains P1.

Natural context declaration hypothesis is therefore: mutable init-if-needed epoch/debouncer, init-if-needed debouncer ATA, mutable token interface mint, validated canonical source ATA (or freshly initialized native temp), from signer, optional separate payer signer, whitelist PDA, ATA/system/token interfaces, event authority/program. P1 retains exact parser branches rather than pretending this sketch uniquely determines Anchor macro output. The exact account attributes, space/rent behavior, payer aliasing, prefunded PDA branches and all account-error metadata still require source integration review.

## Shared112: ordered behavior and state layout

Let C be entry r2 and A entry r3. Caller94 constructs C at frame-296: C+0 points to epoch state (context+656), C+8 to debouncer state (context+568), C+16 to token program, C+24 to whitelist context, C+32 is destination AccountInfo, C+80 mint, C+128 source, C+176 from. Args A have message words at[0,24), config[24,56), amount[56,64), bps[64,66), epoch/debouncer bumps[66,68). With-payer95 adapts its larger context into the same shared shape; the rent payer is not added to shared transfer accounts.

Internal epoch object fields: config[8,40), mint[40,72), current_epoch[72,88), bump88, state89. Debouncer: config[8,40), mint[40,72), total[72,80), bump80, state81. These are observed in-memory layouts, **not** account wire offsets. IDL wire fields are bump, state, config, mint, then epoch(u128)/total(u64), after account discriminator.

Ordered source hypothesis:

1. Require message byte length<256 via104 at131256; require tip_bps<=10000 via107 at131320. This is byte count, despite IDL documentation saying characters.
2. Mint AccountInfo owner must equal literal Tokenkeg at[753024,753056) or Token2022 at[753152,753184), otherwise6029. Compare mint key to builtin bypass keys[753184,753216) (`So11111111111111111111111111111111111111112`) and[752800,752832) (`9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP`), then scan32-byte whitelist keys. Only non-bypass mint calls106 at134336. A false boolean produces6031; its parse/borrow error propagates.
3. If epoch state89 is0, copy argument config and mint into state, store bump, set both epoch limbs zero and state1 (132568–132808). If debouncer state81 is0, copy same identities, store bump, set state1 and total0 (132824–133048). This is conditional initialization, not a reset on each donation. Existing epoch is neither incremented nor closed.
4. Check epoch config first (133056–133824,6002), debouncer config second (134952–135976,6002), debouncer mint (136024,6006), debouncer initialized state (137096,6007), epoch mint (137160,6006), epoch initialized state (138224,6007). State tests are raw nonzero locally; the typed decoder premise restricts them to valid enum values. No additional bump comparison is invented in112.
5. Read destination amount with110 at138296, then mint/decimals with111 at138392. Invoke226 at140704 for transfer_checked with requested amount A+56. Decode the same destination again through110 at140752.
6. `delta = after.checked_sub(before)`; `product = delta.checked_mul(u64(bps))`; `new_total = total.checked_add(delta)`; store new_total at141184; `tip = product / 10000`. Return epoch limbs, delta and tip. All three arithmetic failures request6008, in that order.

The previous math closure proves that both amount reads resolve to dynamic token data offset64, not just arbitrary frame slots. This report connects that operand to the destination AccountInfo assembled by the donation caller. The donated event gross amount and total use **actual received delta**, not the requested transfer amount. No subtraction of tip from total or immediate tip payout is present in112. There is no inserted positive-amount condition. On successful zero delta, product/fee are zero and the total is unchanged.

The checked product is narrower than an unbounded `u128(delta)*bps/10000` calculation: with bps10000, delta1844674407370956 rejects although its mathematical fee fits u64. This follows directly from the high-product-limb gate140944. We reuse the shared arithmetic premises (490/483 exact widening product,110 token decoding, enum8+6000) and do not rerun or alter the prior publications.

## CPI and event integration

Token body94/95 runs the shared body directly after adapting context/message storage. Native92 instead calls294 at71648 (system transfer from to temp, requested amount),230 at72432 (sync_native temp),112 at74336, then229 at75976 (close temp to from, authority from). Native93 has calls77920,78704,80608,82248. Each stage checks the returned success form before continuing. Failure does not locally execute a later close as a finally block; transaction rollback is the runtime premise. Both native donation and token donation eventually transfer token units into the debouncer ATA.

Shared226 assembles transfer_checked via248 at614576. Its constructor selects supported token program and packs enum12 with amount and decimals at639392–639456. No remaining-account or multisigner entries are populated on this caller path. Destination/source/mint/authority come from C, not credited_to or config_id. Native230's constructor249 emits one writable temp meta and sync-native instruction data;229's constructor247 uses temp/destination/authority; system294's constructor322 supplies from(writable signer) and temp(writable) with transfer amount. Full runtime effects of System/Token/Token2022 are premises, including failures and transfer-fee behavior. No extension CPI is executed or substituted.

After shared success, bodies construct `DonationMadeV1Event`: discriminator enum0, argument config bytes, mint key, current epoch, actual delta, computed tip, original message and credited_to. Body94 stores epoch at event+88/+96, delta at+104, tip at+112, credited_to at+120..152, and discriminator0 at+152. Serializer120 emits enum byte, config32, mint32, epoch16, gross8, tip8, string-u32-length+bytes, credited_to32. The event layout is not the in-memory Rust field order.

Adapter190 logs a serialization prefixed with event discriminator bytes `a5e556edf44d26de`, then constructs a signed self CPI prefixed with Anchor event instruction bytes `e445a52e51cb9a1d`. It signs with `__event_authority` and the parsed event bump, not with config_id/from/credited_to. Corresponding adapters191..193 retain the same sequence. Log call295 at554576 precedes signed invocation300 at556152. Event failure propagates after body effects; success is required before wrapper serialization/set_return_data. Wrapper178 calls120 at531584,302 at531624, then account-exit125 at531672. Exit125 calls epoch serializer18 first (201840), then debouncer serializer17 (201920), followed by other account exit/borrow paths. A later exit failure can occur after return-data setup or event logging; runtime transaction outcome must not be inferred merely from an observed log.

## Explicit premises and gaps

P0: normal SBF loader/AccountInfo validity, genuine signer propagation, transaction atomic rollback, successful allocations/reference counting/formatting on the modeled path. Failure construction can panic/abort instead of delivering the named ordinary error. No allocator-wide proof is required by this conditional hypothesis.

P1: the five exact context parsers and init helpers preserve their admitted account identities, signer/writable checks, PDA/address/token constraints, and initialized state wire decoding. This package traces their structure/error sites but does not implement all branches. It cannot certify every invalid-account combination or alias case.

P2: string decoder74 supplies valid UTF-8/Borsh data and owned message; body389 clone is successful. Resource/drop/short-data error delivery and trailing-byte policy are not replaced with new checks.

P3: mint safety106 is the exact retained fallible predicate. It first parses the base mint and rejects nonzero combined authority tags at115744–115784. For Token2022 it scans extension tags, notably1/14/12 and later helper checks32/31/30. Detailed malformed TLV behavior and authority Option interpretation remain unclosed. The integration MUST preserve the three-way error/false/true outcome, builtin/whitelist bypass and ordering; a generic `is_safe()` that always returns true is not an implementation.

P4: transfer/system/sync/close helpers preserve observed account tuples and amount/decimal arguments, and actual token program semantics. Native temp token ownership and close authority are the natural from-authority hypothesis consistent with caller assembly/IDL, not a runtime receipt. Arbitrary Token2022 extensions are not certified.

P5:110/111 decoding, positive fixed denominator math, error115 enum conversion and prior numeric contracts apply as bounded imported dependencies. We claim no historical compiler-builtins lineage.

P6: event serializer120, normal log and signed self-CPI preserve described order/wire format. Full self-CPI dispatch/recursive behavior and failure formatting are not reconstructed here.

P7: wrapper return-data and account-exit behavior is retained exactly, including possible errors after event emission. This sketch does not emulate rollback or use fake transaction fixtures.

P8: memory-layout interpretation is caller-specific; enum nonzero requires the context decoder's valid0/1 premise. No source path/line spoofing or historical source claim follows from diagnostic literals.

`variants.json` gives a per-variant ledger across argument decode, config derivation, account/context admission, authority/payer/recipient, state, math, CPI, events, exit, and invalid-input order. Shared gaps are repeated as references rather than silently treated as closed for any variant. Accepted handler count delta=0, whole-program matches delta=0, runtime cases delta=0.

## Verification and scope

Run `python3 -B verify.py` from a separate copy. It checks the sealed inventory, exact hashes, provenance, selected raw-window hashes, every extracted call/branch and numeric error site, the five chains, semantic byte anchors and IDL account order. It re-renders selected disassembly and compares it byte-for-byte. This validates the evidence and prevents stale addresses; it is not a theorem proving the handwritten source hypothesis. The original public seals and parent repository are untouched. No builds, SBF execution, runtime probes, fixtures, network access, staging, commits, pushes or signature-rule changes were performed. Copy verification receipt is outside the publication seal.
