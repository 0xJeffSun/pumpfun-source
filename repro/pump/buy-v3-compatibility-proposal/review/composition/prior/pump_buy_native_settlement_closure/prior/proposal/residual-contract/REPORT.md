# buy_v3 residual effects: conditional normal-operation source hypothesis

Fixed publication checkpoint **476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40**. Original Pump SHA256 **7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d**. This continuation recovers a two-stage exact-output buy: the residual is priced against an actual-vault-derived post-completion pool, fees are computed independently, one combined maximum applies, and a third event describes the residual. It is not another clipping-only proposal. `normal_quote_fragment.rs` is an implementable arithmetic fragment under the stated premises; the settlement transcription below supplies a bounded source hypothesis, not a tested main implementation.

No program source, counts, signatures or prior seals change. No build, target execution, transaction fixture, network access or other-worker input was used. No stopped-handler or extension callee was followed. Initial mechanical excerpt estimates included adjacent instructions; `incidental-ranges.json` discloses these and they are excluded from conclusions. All retained inputs come from `git show` at the fixed checkpoint, including public predecessors with their original seals. No moving source is treated as frozen evidence.

## Identity and boundaries

Identity was established from the corrected predecessor before reading downstream code: wrapper **0x1286c8**, parser **0x102578**, body **0x147ba0**. The wrapper loads literal `Instruction: BuyV3` at [0x1b7dd3,0x1b7de5), parses amount/max/optional boolean and calls the body at **0x128930**. We independently bind those bytes and that edge. Wrapper consumed range is [0x1286c8,0x128c28); body [0x147ba0,0x1489f8). The body's shared return is [0x148600,0x148620), not its last-address block. Context parsing and account serialization remain distinct from body success; predecessor account parser and serializer results are imported, not newly proved exhaustive.

Names below describe effects, not historical symbols. All address ranges are half-open virtual addresses. The original ELF section mapping is checked by the verifier; encoded signed PC-relative call/branch operands govern. `call -1` is not classified as an ordinary direct edge. In particular, treating the next apparent call entry as a function boundary incorrectly truncates fee/event helpers at abort placeholders; retained ranges include their actual continuations.

The predecessor proves curve wrapper offsets: virtual base +0x48, virtual quote +0x50, real base +0x58, real quote +0x60, mode +0xa2; decoded curve is wrapper+8. User key equals Global.whitelist_pda is the bypass predicate. The copied source account excerpt happens to be a `SellV3` declaration used as a shared role/schema corroboration by the predecessor; its filename is **not** new proof of buy_v3 account acceptance. Offset-based caller dataflow is authoritative here.

## Quote and fee derivation

Let A=requested base, S=first selected base, D=residual, X/Y=virtual base/quote, R/Q=real base/quote, V=actual base-vault amount, H=Global wrapper+0x410 (pool_migration_fee), b=Global wrapper+0x420 (buyback_basis_points). Global serializer at 0x72c8 and 0x75a0 binds these positions to their wire sequence; they are not inferred from Rust field memory order. Let N be the native-quote flag returned by the already-admitted body preflight. Its complete producer/admission remains a premise.

For non-Mayhem, non-whitelisted admitted accounts, S=min(A,R), D=A-S, regardless of partial_fill on a crossing. The whitelist/mode alternatives retain the predecessor predicate unchanged. S=0 rejects before quoting; S>R rejects on the alternative path.

| Effect | Grounded instructions and contract |
|---|---|
| First quote | 0x148270 -> 0xa0070. Read decoded curve+0x48=Y and +0x40=X. Multiply S*Y as u128, reject X<S (6024), reject X=S (6026), divide by X-S, then add **one even for an exact quotient** at 0xa03f8. Thus q1=floor(S*Y/(X-S))+1. Caller rejects a nonzero returned high limb at 0x1482a8 before fees. |
| First fees | 0x148308 -> 0x7fde8. Whitelist equality returns four zero words at 0x800f0. Otherwise 0x80028 -> 0xa08f8 supplies threshold and 0x80180 -> 0x89ec8 selects/calculates fees for q1. The published selector contract supplies per-leg protocol and creator ceiling fees. |
| Residual pool | Only D>0 reaches 0x148418 -> 0x82128. Arguments are Q, H, V, plus N,S,q1 on outgoing stack. Check V>=S; checked Q+q1; if N require Q+q1>=H and subtract H; if !N skip subtraction. Require V-S>0 and resulting quote>0. Return B=V-S and T=Q+q1-(N?H:0). Success stores at 0x82628/0x82630. Arithmetic failures enter 6024; zero B enters 6021. This is actual vault funding, not virtual base minus S. |
| Residual quote | 0x148480 -> 0x82af8 receives B,T,D. Require **B>D**, otherwise 6021. Compute u128 D*T and checked ceiling helper 0x88908 with divisor B-D (0x82b90). Thus q2=ceil(D*T/(B-D)), **not** floor+1. Narrow to u64 or 6025. |
| Residual fees | 0x82ff0 -> **the same 0x7fde8** on q2, before any reserve write. Fee selector sees the same pretrade curve/threshold inputs as the first call. It must not be silently reselected against a mutated residual pool. Residual result is `(tag,Fp2,Fc2,P2,C2,D,q2,B,T)` at offsets 0..0x40. |

Fee amounts are `ceil(qi*Pi/10000)` and, for nonzero creator, `ceil(qi*Ci/10000)`; zero creator makes its amount zero while retaining the returned rate. FeeConfig length/table selection and configurable creator override follow the sealed selector report. Those are explicit imported contracts, not re-audited bodies here. Protocol ceiling precedes creator zero comparison/ceiling. Fees are rounded **per leg**, never once on q1+q2. Same inputs imply same rates under a deterministic selector; no second state update or second threshold derived from B,T is inserted.

The u128 multiply/divide/ceil premises are the published manual positive-denominator contracts, not a VM replay. The first add-one and residual ceil difference is intentional and byte-grounded. Actual V must exceed A for a crossing, even though R may be much smaller. More real vault tokens can support a residual; merely setting partial_fill cannot supply them.

## Combined cost and ordinary amount adapters

0x1485c8 -> **0x80df8** receives b, mode, quote adapter record, q1,Fp1,Fc1 and optional residual. On normal mode it computes b1=floor(Fp1*b/10000) and b2=floor(Fp2*b/10000), separately. High-product and buyback<=protocol assertions precede the checked sum; pathological b is a terminal-dependency frontier. Under b<=10000 these assertions hold.

0x801f8 checked-adds each leg's quote+protocol+creator. 0x81098 computes first gross; optional 0x810f8 computes residual gross; 0x81120 checks their sum; 0x81150 checks subtraction of b1+b2. The amount adapter 0x95360 acts on the resulting curve-directed amount. Its record-tag-zero path returns the input unchanged (0x95368..0x95388; 0x95400..0x95410). No extension arm is part of this hypothesis. Result of 0x80df8 is `(0, adapted_curve_payment, b1+b2, adaptation_difference)`.

0x148660 -> **0x81848** checked-adds that curve payment and buyback sum. Only then **0x148698** compares total against max, taking 6002 on total>max; equality passes. Consequently on ordinary identity adapters:

```
gross1 = checked(q1 + Fp1 + Fc1)
gross2 = D>0 ? checked(q2 + Fp2 + Fc2) : 0
buyback = checked(b1+b2)
curve_payment = checked(checked(gross1+gross2)-buyback)
total = checked(curve_payment+buyback)
require total <= max_cost
```

The source fragment models this arithmetic. Its compact `Boundary` variants are **not** a replacement Anchor error ABI; exact error-constructor payloads and precedence outside the normal domain remain open. No new validation check is inserted into the proposed original path.

## Settlement transcription and funding direction

After max succeeds, **0x1488c0 -> 0x83c00**. The following is the normal-operation source hypothesis with named runtime calls as bounded premises:

1. Apply the first fill to decoded curve with **0xa0bf0** (call 0x83c70): check/subtract X-S and store at 0xa0d20; check/subtract R-S and store at 0xa0ef0; checked-add Y+q1 and store at 0xa0f38; checked-add Q+q1 and store at 0xa12d8. This is the actual store/error order. Do not precompute all stores or apply q2/D to these four reserves.
2. Checked-add S plus residual.D at 0x83cb0..0x83ce0. Transfer **S+D base tokens once**, from context+0x30 base-vault wrapper to context+0x48 user-base wrapper, using base program at context+0x18 and base mint at context+8. 0x83ed8 -> **0x8f5c8** constructs the common TransferChecked record and calls **0x17fcc8** at 0x8fdd8. Authority is the curve; signer seeds are `bonding-curve`, base-mint key, validated bump, lengths 13/32/1. Zero amount skips; ordinary success requires actual source funds, successful CPI and normal reference-count behavior.
3. Non-whitelist: initialize the zero user-volume key to user (0x83ff8..0x84060). Accrue first fees with **0xa1bd8** at 0x840a0: protocol += Fp1-b1, then creator += Fc1. These are wrapper+0x80 and +0x78, respectively; decoded offsets +0x78/+0x70. Arithmetic checks and stores are sequential. For residual, **overwrite** wrapper+0x90 with D and +0x98 with q2 (0x840f0/0x84100), then accrue Fp2-b2 and Fc2 via 0x84138. These are post_complete_base_out and post_complete_quote_in from serializer field order, not additions to the four trading reserves. Checked b1+b2 follows.
4. Fund curve payment and buyback. For non-native ordinary quote, 0x846d8 -> **0x97930** receives quote program context+0x20, mint context+0x10, user context+0x40, source quote account context+0x50, destination curve-quote context+0x38 and curve_payment. Its ordinary token arm forwards these with **empty signer seeds** at 0x97ba8; the final transfer processor is an explicit interface premise. **0x84810 -> 0x92820** separately sends b1+b2 from the user's quote account to context+0x68 buyback recipient; it reaches common TransferChecked at 0x93018 with empty seeds. Buyback is funded by the user, not an assumed subsequent withdrawal from the curve. Amount zero skips that wrapper. Source user must have the combined amount and authority.
5. Native denomination branches through 0x979b8 and 0x84760 -> 0x965b8; native settlement implementation is a separate worker's lane and remains a named funding contract here. No native lamport implementation is invented. Account reloads/native branch at 0x84468..0x84590 are also retained as a separate interface obligation, not generalized to the non-native normal branch.
6. After funding, 0x84858 and 0x848a0 adapt total and second buyback through **0x950e0**. Imported tag-zero contract makes both identities. It returns first and second buyback separately after checked ordering. Body uses these values for the two events, not gross buyback in both.

This is an order-sensitive hypothesis. Original state writes and base transfer precede quote funding. Failure propagation still returns through the body/wrapper; committed rollback, CPI signer enforcement, token processor behavior, admission and account alias restrictions are imported runtime/framework premises. A failed call is not evidence that intermediate writes commit.

## Ordered events and completion

**0x1489d8 -> 0x859b0** runs only after settlement succeeds. Clock retrieval at 0x859e8 precedes event construction. First event is serialized by **0x1624b0** at 0x86188, logged at 0x861d0, serialized again at 0x86360 and self-invoked at 0x867c0. Its instruction string is three bytes `buy` at 0x1b6862, despite instruction identity buy_v3. First event token amount is S (body r6), quote amount q1, first fee tuple, first buyback and post-first-fill reserve snapshot. On nonzero quote mint the legacy SOL slots are zero while quote slots retain q1/reserves. Ordinary adaptation difference is zero. This is **not** a single TradeEvent for A and q1+q2.

After that self-CPI succeeds, 0x86880..0x86898 tests real base reserve. Nonzero returns without completion or residual event. Zero branches to **0x86958**, writing complete=true at wrapper+0xa1. CompleteEvent logs at 0x86ce8, then self-CPI at 0x873b0. Its discriminator immediate at 0x86b90 equals the copied IDL and SHA256(`event:CompleteEvent`)[:8]. Allocation size is 256, actual serialized payload length **144**; self-CPI payload is **152** with the standard eight-byte prefix. These sizes must not be conflated.

Only after complete self-CPI succeeds does **0x87460** check residual-present. If present, 0x87658 -> **0x81aa0** constructs **PostCompleteBuyEvent**, and **0x163bf0** serializes it at 0x876f0 and 0x87778. The discriminator at 0x163c98 matches `6fb06d8b316cd5fb`, the exact IDL record and SHA256(`event:PostCompleteBuyEvent`)[:8]. Log is 0x87730, self-CPI 0x879f0. Wire payload **232** bytes (four keys, timestamp and eleven u64 values plus discriminator); self-CPI adds eight bytes. Body boundary 0x81aa0 checks B>=D and T+q2 overflow before constructing this event, after preceding completion emission. These checks cannot be moved before all effects when claiming exact failure precedence.

PostCompleteBuyEvent fields, in copied IDL order: user, mint, curve, quote mint, timestamp, **D**, **q2**, protocol rate/amount, creator rate/amount, **second buyback**, B,T, **B-D**, **T+q2**. The producer checks/subtracts B-D at 0x81dd0..0x81de8 and checked-adds T+q2 at 0x81be8..0x81c20. First and residual event copies share the clock value. Logging precedes each self-CPI, so a log alone is not successful settlement evidence. Full TradeEvent and common self-CPI encoding contracts are inherited from the sealed event-wire report; historical source naming and all allocator/drop/error conversions are not claimed.

Successful crossing order is therefore **TradeEvent log/CPI -> complete store -> CompleteEvent log/CPI -> PostCompleteBuyEvent log/CPI**. An exactly-reserve, no-residual fill emits only the first two. The predecessor's saved equal-reserve receipts corroborate those first two events; no new successful crossing replay is claimed.

## Frontier and verification

This supplies a grounded normal-operation arithmetic fragment and settlement/event transcription. It is conditional on: validated buy_v3 context identities and preflight native/adapter tags; unmodified pretrade fee selector inputs and the published numeric contracts; ordinary Tokenkeg transfers/memory-comparison/Clock/event invocation contracts; successful allocations and normal reference counts; transaction rollback. The quote-transfer dispatcher below 0x97ba8, native funding/reload helpers and exhaustive parser/exit/error representation still need root integration review. The normal fragment assumes non-whitelist, non-Mayhem and buyback_bps<=10000; whitelist and optional-fill alternatives stay with the unchanged predecessor predicate. No extension behavior, general routing or nested creation is supplied.

`provenance.json` lists every retained input's fixed Git blob, whole-input SHA256/size and exact consumed source byte range; assembly records include virtual intervals and inclusive source line ranges. Full original ELF is retained. Omitted whole text/IDL objects cannot be rehashed from excerpts offline: their whole hashes are extraction attestations, while copied full objects can be recomputed. `call-edges.json` lists decoded direct edges; unresolved callees are not silently marked closed. `manifest.json` seals all package members except itself; sibling `manifest.sha256` anchors that seal. Original predecessor manifests are copied byte-for-byte, not regenerated.

Run `python3 verify.py` in a separate copy. It checks exact inventory/hashes, full copied Git blobs, ELF/assembly byte correspondence, selected critical calls/branches, literal and event identities, and copied report membership under predecessor seals. It executes no target, emulator or source hypothesis and is **not** automated proof of the prose. Copied-directory verification receipt is outside publication. Main implementation, runtime validation, handler counts and whole-binary equality remain unchanged.
