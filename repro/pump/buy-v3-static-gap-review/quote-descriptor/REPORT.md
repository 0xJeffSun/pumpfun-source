# BuyV3 quote-adjustment descriptor: source-only dataflow recovery

This isolated review recovers the producer94908, custom TLV scan17c850, arithmetic17c3d8/17c548 and caller obligations80df8/84858/848a0. `quote_descriptor.rs` is an uncompiled, unintegrated logical source hypothesis. No SBF build, target execution, transfer-fee/initializer/sell_v2 probe, shared-source mutation or publication occurred. The original ELF remains SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Complete ABI/source/compiler identity remains unproved.

## Producer and native versus token branches

BuyV3 calls94908 at7fc40 only in token preflight, after vault/user/recipient admission. Native skips this producer entirely. Owner comparison94918..94950 uses Token2022 literal1b5ca8. A different owner returns descriptorNone without borrowing mint data or reading Clock. Thus legacy token and native descriptor arithmetic are identity, with different admission paths.

Token2022 shared-borrows data through94970→1a2ca8, then calls949d0→17c850. Scan-invalid tag2 creates Pump6063 UnsupportedQuoteMint, with ordinary Anchor rich-error construction at94d00..94d48. Successful None and Some BOTH continue through94c00→1a0938, the Clock getter: no fee extension does not bypass Clock errors. The borrow remains live across Clock and epoch selection and is released at94d78..94d88, including failure returns. The Clock syscall relocation is recorded in `bindings.json`; interpreting its `call -1` as a relative function is incorrect.

The chosen schedule is newer iff Clock.epoch>=newer.epoch, otherwise older (94dc8..94df8). No comparison with older.epoch rejects the mint. Selection happens once before pricing; subsequent adapters use that saved descriptor.

## Exact custom TLV contract

The scanner is not interchangeable with a generic extension getter:

- Length82 returns None. Other lengths below167 reject.
- Bytes82..164 must all be zero, and byte165 must equal1 (mint account type). TLV starts166.
- Fewer than two bytes remaining ends successfully; an arbitrary trailing single byte is tolerated. Type0 terminates immediately without validating the rest.
- Other entries need a four-byte header: typeu16, lengthu16 little endian. Require4+length<=remaining; skip unknown types without enum validation.
- Type1 is the fee configuration. Reject duplicates and length<108, accept oversized payloads, and continue scanning later entries rather than returning immediately.
- Relative to its payload after the four-byte header: older epochu64+72, maximumu64+80, bpsu16+88; newer epochu64+90, maximumu64+98, bpsu16+106. Config authorities and withheld amount are not descriptor fields.

The scanner's result native packet has u64tag+0 (0None/1Some/2invalid), older epoch+8, max+16, **u16**bps+24, newer epoch+32,max+40,**u16**bps+48. Some padding words are copied with u64 loads later; those upper bits are not proved zero or source fields. The final producer packet is u64tag+0 (0None/1Some/2error), selected epoch+8,max+16,bps low16 at+24. Errors use+8/+16 for error words. Consumers read bps as u16. These are observed native locations, not a promise that a hand-declared reprC or Rust Option has historical ABI. BaseMint validity is an upstream typed-parser premise, not reimplemented by this scan.

## Arithmetic and caller wiring

94e28 calls17c3d8 `calculate_fee`: zero amount or bps gives0; otherwise ceil(gross*bps/10000) usingu128, narrow to u64 before cap, then min(rawfee,max). It performs no new bps<=10000 validation. Arithmetic failure maps6024.950e0 computes checked gross−fee, mapping underflow6024.95360 calls17c548 `calculate_pre_fee_amount`, **not inverse_fee**: bps0 returns net; net0 returns0; bps10000 returns checked net+max; otherwise ceil(net*10000/(10000−bps)), choosing checked net+max when calculatedfee>=max. Bps>10000 fails unless an earlier zero case applies. The locked spl-token-2022-6.0.0 transfer-fee source is retained for this correspondence, not historical dependency provenance.

At80df8, keep original per-leg buyback conversion/assertion and ordered totals first. Let rawtotal=b1+b2 and unadapted=(q1+p1+c1)+(q2+p2+c2)−rawtotal. Gross-up **unadapted alone** with the descriptor, require adapted>=unadapted, return adapted curve funding, rawtotal buyback, and trailing=adapted−unadapted. Max-cost and native whole-input use adapted+rawtotal. Token quote transfers gross adapted to curve, then gross rawtotal to recipient. Do not independently gross-up buyback or total cost.

Only after those transfers,84858/848a0 call950e0 twice: A=net(rawtotal), B=net(b2); require A>=B. First TradeEvent buyback=A−B, PostComplete buyback=B. This differs from net(b1) under nonlinear cap/rounding. The final unnamed TradeEvent u64 is the cost helper trailing adjustment, not a buyback fee or total transfer fees. B7 proves its saved/passed/consumed edges148630..148638,148970..148978,85a50→86128. Native/legacy/noextension descriptors imply identity math and trailing0; Token2022 noextension still requires the extra Clock call.

## Remaining closure

The fragment provides logical field widths, full scanner, epoch selection, arithmetic adapters and exact caller quantities. It does not establish historical Rust declarations, source spelling/origins, panic/error object lowering, allocator/formatter/destructor graph, full borrow conversion identity, dependency build provenance, complete generated parser/exit lowering, or whole body equivalence. No runtime extension success is claimed. All inherited117 BuyV3 cases, including105 successes and12failures across retained Token2022 variants, remain unfiltered obligations. No unsupported flag/owner fence is proposed.
