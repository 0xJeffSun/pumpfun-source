# Relay distribution source hypotheses

Fixed authority: `476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40`, read with `git show`. This package supplies concrete, uncompiled natural source hypotheses for the two assigned distribution instructions and the shared distribution108 interface. It is static recovery, not accepted handler implementation, original function identity, whole-program equivalence, security sign-off or runtime validation. Completion counts do not change. No network, build, SBF execution, transaction fixtures, prohibited lane or other worker directory was used.

The strongest new results are the actual weight admission and failure precedence, sequential token-account processing, distinct post-swap/non-swap amount selection, and **burning of residual tokens before account closure**. Native lamports return to the relayer through close operations, not through weighted native transfers. Share type is receipt metadata; it does not select a native/token transport in108.

`hypothesis.rs` is an implementable control-flow fragment with explicit runtime interfaces. Context parsing, error objects, original allocation/borrow/failure behavior and token/runtime effects are imports, not invented implementations. Its Rust names, structure layout and abstraction boundaries are new. In particular, it must not be compiled and declared byte-identical merely because it uses a stable sort or natural framework methods.

## Evidence and actual boundaries

All offsets are decimal half-open ELF file ranges. The unchanged 830448-byte ELF has SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. `provenance.json` gives whole-input SHA256, Git content hashes, original paths and consumed source extents. `static-evidence.json` gives complete selected code ranges, hashes, decoded calls/branches/memory operands and exact selected static-data extents. `listings/` is regenerated from bytes. No annotated symbol name governs a target: direct calls use `pc+8+8*signed_imm`; callx retains its register operand and is not guessed from a nearby annotation.

| Route | Shares decode | Account parse | Outer business/event body | Processor | Exit |
|---|---|---|---|---|---|
|after just swapping|78 [58688,60320)|146 [402000,417496)|201 [570376,573360)|97 [91880,97096)|147 [417496,420984)|
|non swap output mint|same78|148 [420984,434280)|200 [567392,570376)|98 [97096,102792)|149 [434280,436696)|

Wrappers186 [547224,549192) and187 [549192,551160) call decoder78 at547360/549328; parser146/148 at547520/549488; outer body201/200 at547904/549872; serialize return through119 at548704/550672; then call exit147/149 at548792/550760. Decode failure is wrapped as instruction deserialization error102; parser/body errors short-circuit. Return serialization/set-return-data precedes exit, so serialized return or emitted event is not proof that exit succeeded. Outer201 checks relayer via105 at570432 then enters97 at570520. Outer200 does the same at567448 then567536 into98. Parser failure precedes this body relayer comparison. Full parser failure precedence is deliberately retained as a fixed-parser import.

Inferred inventory windows above are convenient coverage extents; they are not recovered historical Rust function boundaries. The parsers and exits are substantial separate operations, not portions silently included in a recovered handler name.

## Context contract and receipt binding

The retained IDL gives exact account order; `interface.json` copies the two instruction declarations and their relevant types/errors. After-swap takes epoch_tracker, debouncer, distribution, swap_receipt, output_distribution_token_account, output_mint, output_mint_program, signer, associated_token_program, system_program, event_authority, program. Non-swap takes epoch_tracker, debouncer, distribution, distribution_token_account, mint, signer, token_program, associated_token_program, system_program, event_authority, program. Remaining accounts follow these fixed accounts.

The natural admitted-context premise is successful146/148, not just possession of these keys. IDL seeds are `epoch_tracker_v1/config_id/input_mint`, `debouncer_v1/config_id/input_mint`, `distribution_v1/config_id/distribution.mint/epoch`, and for after-swap `swap_receipt_v1/distribution`. Associated source token address uses distribution, token program and settlement mint. Output mint is the fixed IDL USDC key; signer is the fixed relayer key. Signer/writable/account ownership/typed decoding, PDA and ATA checks remain at parser time, before processors97/98. Do not substitute unchecked accounts or suppress their errors.

A concrete receipt constraint is independently traced:146 checks receipt writable at411840–411864, compares the receipt's stored distribution with the actual distribution key at411872–412000, and on mismatch constructs enum33 at412024/412032, hence **6033 SwapReceiptMismatch**, attaching `swap_receipt`. Seed constraints around410632–411176 are distinct from that stored-key check. Output mint key/program checks at414536–415200 include custom6006 and framework2022. This package does not claim every transitive parser account policy/error is reimplemented.

Decoded context C (entry r2 to97/98) has the following directly consumed fields. These are internal offsets, not wire offsets or a promise of Rust repr layout:

| Field |97 after|98 non-swap|
|current epoch low/high|72/80|72/80|
|distribution epoch low/high|448/456|392/400|
|distribution initialized byte|473|417|
|distribution config/mint|384/416|328/360|
|debouncer mint|328|272|
|distribution bump|472|416|
|source token wrapper|512|456|
|source parsed amount|584|528|
|receipt output amount|232|not used|
|recorded distribution amount|464 (not selected)|408|

After-swap uses receipt output, not the distribution input amount or entire token balance. The fixed wire codecs remain separately sealed evidence: distribution total at account bytes[90,98), epoch[74,90); receipt output[41,49), bound distribution[9,41). Successful parser transfer is the mapping premise linking those wire types to the internal offsets above.

## Admission and error ordering

After-swap97: epoch < current_epoch (91888–91992), otherwise6028; initialized byte nonzero (92416–92432), otherwise6007; distribution mint equals debouncer mint (92480–92552), otherwise6006; checked u32 weight sum exactly10000 (93624–93824), otherwise6008 on overflow or6022 on wrong sum; receipt output >0 (94360–94368), otherwise6012; source balance >= receipt output (94376–94392), otherwise6012; remaining count >= shares count (95232–95272), otherwise6030; then108 at96112.

Non-swap98: epoch < current_epoch (97104–97208), otherwise6028; initialized (97632–97648), otherwise6007; distribution mint equals supplied mint (97688–97864), otherwise6006; debouncer mint equals same mint (98960–99104), otherwise6006; checked u32 sum exactly10000 (99736–99920); source balance >= distribution.total_amount (100456–100480); remaining count (100904–100944);108 at101792. There is **no explicit positive-total check** on this non-swap processor path. Neither path uses6023 for these amount checks.

The sum loop loads u16 at record+32 and advances36. It checks each addition fits u32, not u16. No per-share positive-weight check, recipient uniqueness check, sorted-key check or distinct-account check occurs in these processors/shared108. Nonnegative u16 inputs plus admitted sum10000 imply each bps<=10000; do not insert extra helper107 calls to enforce this already implied property. Empty shares fail6022. Zero-weight entries are permitted. The113 initial capacity cap is unrelated to handler admission: decoder78's **113 is an initial allocation cap, not a maximum recipient count** (58840–58880; growth call60048). Count is a wire u32 with resource-limited materialization; there is no recovered fixed business maximum.

78 reads u32 count, then each 35-byte wire record: kind u8<3 (59480–59528), address32, bps u16 (59736–59824). Memory records are36 bytes: address[0,32), bps[32,34), kind[34,35), one padding byte. Allocation can happen before missing-record detection; invalid kind precedes later short address/bps detection. No exhaustion requirement is added for trailing instruction bytes.

## Shared108, recipient order and exact amounts

108 consumes context K: remaining pointer/count at+0/+8, authority AccountInfo at+16, mint at+64, token program at+112, source token at+160 (four48-byte copies). Parameters A: records/count at+0/+8, signer-seeds slice+16/+24, total+32, expected token program key[40,72), decimals+72. It first compares the supplied token-program AccountInfo key against that expected program (119824–119960), returning6025 before count; then requires K.count>=A.count (120024–120072). It copies weights to a2-byte-stride buffer and calls113 at121640.

113 errors propagate via the three-word sentinel at121704–121736. On admitted weights, q_i=floor(total*bps_i/10000), r_i=(total*bps_i)%10000. Since bps_i<=10000, each q_i<=total fits u64; sum floors<=total. Let L=total-sum(q). Since sum bps=10000, sum remainders=10000*L, and0<=L<n. Add one to the first L records in stable decreasing remainder order, then use each record's **original index**. Thus sum amounts=total. A zero-bps entry cannot receive a leftover: if L>0, strictly more than L entries have positive remainders. This closes the admitted arithmetic domain that the earlier arithmetic ledger deliberately left open.

Import the unchanged conditional sort composition: valid initialized storage, nonwrapping/disjoint allocations, unsigned wide multiply, memcpy semantics, separate live VM frames and adequate resources. This is successful-path value equivalence, not library-sort byte identity or allocation/failure equivalence. The original113 writes shares/remainder records before some overflow errors; those writes cannot be erased from an exact failure model. The fragment calls a named arithmetic113 runtime import rather than claiming a new library sort replaces it exactly.

Recipient processing remains in original shares order, not remainder-rank order. Per i: parse remaining[i] via8 at123368; check decoded **token authority** equals shares[i].address at123632 (6014); check decoded mint matches expected mint at123704 (6024); check AccountInfo owner program equals expected token program at124032 (6025). Advance share36, AccountInfo48, amount8 at124344–124416. Parse/authority/mint/program checks happen even when computed amount is zero. Only then124232–124264 skips transfer for zero. Nonzero amount becomes r3 at123176 and is passed unchanged to226 at123192 with decimals r4 at123184. No ATA creation occurs here; existing recipient token accounts must decode. A token-account address need not equal the share address. Duplicate authorities/accounts are not deduplicated. Extra remaining accounts are ignored by108; swap_then_distribute may separately use the suffix in its other worker's swap context.

8 checks owner against the two token-program IDs and rejects unsupported owner3007; a zero-lamport system-owned account gives3012. Its borrow/decode errors propagate. Shared108 does not add a strict initialized-only/frozen gate beyond the imported token decoder; token CPI may reject frozen or otherwise invalid transfer state. Do not convert those downstream failures to invented relay errors.

226 builds through248 then invokes300. The builder/serializer records wire **12 || amount_le_u64 || decimals**:639400–639456 and632664–632712. Metas are source writable, mint readonly, destination writable, authority signer/readonly; no multisigner entries on this path. Signer seeds are the single group assembled by97 at95304–95696 or98 at100976–101368: `distribution_v1` (15), config_id32, distribution.mint32, epoch little-endian16, bump1. The group count is1. This is the transfer_checked interface; target token-program validation, transfer fees/extensions and VM CPI atomic rollback are bounded external premises, not proved token runtime semantics. Amounts are requested transfer debits, not a guarantee of net recipient credit under every extension.

After all recipients,81 allocates48-byte receipts and zips the original share order with amount order. It copies address[0,32), writes amount[32,40), bps[40,42), kind[42,43). Zero amounts remain in receipts. It does not compute receipts from post-CPI recipient balances.

## Residual tokens, native lamports and lifecycle

On successful108,97 calls reload21 at96240;98 at101920.21 borrows source data and decodes again through231, then overwrites the typed wrapper, so the amount read at96480 /102160 is **fresh**.109 receives that residual in r3 at96544/102224; it is not simply calculated as the old balance minus total. This matters for aliases and program effects.

109: if residual!=0 (127984), call227 at129680, then on success229 at128272. If zero, go directly to229.227 builds246 with residual unchanged;246 places enum8 at636240 and amount at636232. Serializer244 emits byte8 plus amount LE at633888–633920: **Burn**, not a refund or second distribution. Its metas are source token writable, mint writable, distribution authority signer.229 builds247 from descriptor[759376,759380) (enum9) and serializer emits byte9 at634672: **CloseAccount**, with source writable, relayer destination writable, distribution authority signer. Both use the same distribution signer group. CPI failures propagate and prevent later event/exit steps. Residual burning is a static behavior observation, not authorization to execute it.

Given an ordinary non-aliased token path with exact debits, remainder equals initial balance-total; this is a conditional consequence, not the actual amount computation. Unsolicited token surplus is burned. There is no native recipient transfer in108, and no source code should invent one from `ShareType` or input mint history.

Outer bodies emit the processed event only after processor success: serialize119 at568064/571048, log through295 at568232/571216, serialize again at568736/571720, prepend self-event discriminator and invoke300 at569792/572776. They use event-authority seeds `__event_authority` (17), bump1, one signer group. Log then self-CPI can fail after earlier token CPIs; transaction rollback belongs to the VM premise, not to an explicit local undo loop.

Exit147 first closes distribution to signer through282 at418112 and then swap_receipt to signer at418960. Exit149 closes distribution at434880.282 adds **all current source lamports** to destination with checked addition at651384–651464, writes destination at651528, zeros source at651608, assigns system owner and reallocates data to0 through690592/690144. Overflow and borrow failures are panic/framework paths, not fabricated6008. Token-account close may already have credited its rent to signer; these exits additionally drain the distribution and (after-swap only) receipt balances. Source/destination alias cases must preserve actual operation ordering; a simplistic atomic 'move' abstraction is insufficient for exact failure/alias equivalence.

Exit also checks closed token/mint wrappers before optional serialization; it must be imported in full, not replaced solely by lamport movement. No new epoch_tracker/debouncer write is recovered here. Epoch management belongs to the other assignment. Closing receipt/distribution is the lifecycle transition; the business processor does not merely flip their initialized byte.

Event119 serializes: inner event enum byte2, config_id32, original distribution mint32, epoch16, selected settled_amount8, settlement_mint32, u32 receipt count, then each receipt kind1/address32/amount8/bps2. Outer bodies prepend event discriminator `e1fb83abe8b6433b`; self-CPI prepends `e445a52e51cb9a1d` before that. The wrapper return serialization uses the event payload contract. Event fields exclude burned surplus and rent; settled_amount is the selected total, not source balance or measured recipient gain.

## Integration interface and unresolved obligations

Other workers/root should consume this publication only. For swap_then_distribute,108 takes the exact K/A contract above and returns ordered receipts. Its caller must independently establish the weight-sum/amount/context premises;108 itself does **not** check sum10000 or positive total. This package does not inspect or take ownership of the swap/epoch processor. The arithmetic conservation theorem cannot be silently applied to an arbitrary direct108 caller.

Remaining imports are explicit: full146/148 context error/ownership/seed precedence and transitive helpers; full wrapper/destructor/exit serialization behavior; exact allocator, borrow, panic and error object ABI;113/sort successful allocation premises; token programs and invoke_signed ABI, CPI effects/rollback, token extensions; event log and self-CPI/return-data semantics; source/account alias handling outside the scalar/control-flow fragment; historical source/dependency/build identity. The Rust fragment only preserves the normal business/control-flow sequence under these imports, not every allocation or failure point. No original path/line spoofing is supplied.

`python3 -B verify.py` verifies the sealed exact file set, provenance hashes, selected listing bytes, decoded control flow and hard-coded critical operands. It neither executes the target nor certifies the manual semantic argument. The manifest has a separate SHA256 seal; verification receipts and CLI telemetry stay outside publication. Parent review and an explicitly authorized implementation/test phase remain necessary before any acceptance count changes.
