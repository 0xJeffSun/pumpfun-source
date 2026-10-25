# Evidence-to-change ledger

Source ranges are generated from the proposed file, never substituted for original byte coordinates. All offsets refer to admitted Pump bytes. Existing report prose is immutable; this new composition does not upgrade its old withheld-source conclusions into historical acceptance.

## C01 — proposed lines 4–42

Thirteen sequential context slots, fee bump PDA, AMM signer/PDA, source and destination typed accounts, writable raw buyback; five-account hop parser. Existing context syntax is retained, except the fee decoder wrapper and corrected raw-account comment. Anchor generation and type decoder behavior conditional.

Original: `0xdb958..0xdd700; 0xdd700..0xde4b0`. Evidence: [pump_route_context_closure/CONTRACT.md](evidence/pump_route_context_closure/CONTRACT.md), [pump_route_accounts/REPORT.md](evidence/pump_route_accounts/REPORT.md).

## D01 — proposed lines 42–62

Decode both vectors and all exotic words eagerly before handler checks; checked discriminator; trailing bytes allowed. No length defaults or count caps. Natural Borsh allocation/error representation remains conditional.

Original: `0x1156f0..0x115d90; 0x112f0..0x11758`. Evidence: [pump_route_fee_decode/REPORT.md](evidence/pump_route_fee_decode/REPORT.md).

## A00 — proposed lines 62–70

Checked sequential add/sub, u64 narrowing, positive u128 division, ceil amount*rate/10000. Natural source uses existing error variants; full error data unproved.

Original: `0x80488; 0x88f90; 0x88908; 0x1b4088; 0x1b55c8`. Evidence: [pump_route_wide/CONTRACTS.md](evidence/pump_route_wide/CONTRACTS.md), [pump_route_arithmetic/REPORT.md](evidence/pump_route_arithmetic/REPORT.md).

## D02 — proposed lines 70–101

Length>=2512 before selection; exact quote constants, first versus second tier vectors; stable length>4072; exotic length>4096 and any nonzero word; first-threshold gate and reverse search; override; first fee then creator-zero/second fee. Masks happen only after selector success.

Original: `0x89ec8..0x8a530; 0x89b48..0x89ec8; 0xa08f8`. Evidence: [pump_route_fee_decode/REPORT.md](evidence/pump_route_fee_decode/REPORT.md), [pump_route_accounts/REPORT.md](evidence/pump_route_accounts/REPORT.md).

## A01 — proposed lines 101–117

Creator-zero effective rate, checked rate sum before budget estimate, u128 denominator, positive estimate, fixed ceil fees, saturating total, checked excess subtraction and corrected-zero check. Route consumes original budget minus those fees, not corrected estimate.

Original: `0x806c8..0x80df8`. Evidence: [pump_route_wide/CONTRACTS.md](evidence/pump_route_wide/CONTRACTS.md), [pump_route_arithmetic/REPORT.md](evidence/pump_route_arithmetic/REPORT.md).

## T01 — proposed lines 117–146

Exact TransferChecked 10-byte builder interface, four metas/infos, no multisig; first source/source-authority and empty seeds; prior output/curve/seed-base/bump with equal-key shortcut then zero amount. No alias prohibition.

Original: `0x5a260..0x5b3b0; 0x17fcc8; 0x1936d0; 0x1a0530`. Evidence: [pump_route_depth/REPORT.md](evidence/pump_route_depth/REPORT.md), [pump_route_tokenkeg_transfers/REPORT.md](evidence/pump_route_tokenkeg_transfers/REPORT.md).

## V01 — proposed lines 146–169

Canonical base/quote ATA under selected Tokenkeg; stored-zero quote gets address-only validation. Nonzero quote: system owner rejects, selected owner check, borrow/decode then mint check. No authority==curve, recipient membership, rent or frozen-state predicate inserted. 165-byte scope fence is not historical.

Original: `0x58bf0; 0x14910; 0x5bee8..0x5c478`. Evidence: [pump_route_vault_admission/REPORT.md](evidence/pump_route_vault_admission/REPORT.md).

## N01 — proposed lines 169–191

System transfer two infos/empty seeds. Curve preparation checks fee-counter sum then real quote for zero quote, zero protected otherwise, Rent current max(size,166), saturating available and conditional deficit. Locked Rent minimum is a conditional float substitution. Short resize is a scope boundary, not implemented.

Original: `0x3cd50; 0x3d250; 0x3d2c8..0x3d4b8; 0x19e090`. Evidence: [pump_route_native_settlement/REPORT.md](evidence/pump_route_native_settlement/REPORT.md), [evidence/rent_prepare.asm](evidence/pump_route_native_settlement/evidence/rent_prepare.asm).

## N02 — proposed lines 191–218

Amount-zero shortcut; source read/check/debit/release, then destination read/add/store; raw writable buyback; three self infos, exact payload and validated event bump, one-info SyncNative. No self callee effect proof or token-account admission assertion.

Original: `0x965b8..0x969f0; 0x58f58..0x5a0e0`. Evidence: [pump_route_native_settlement/REPORT.md](evidence/pump_route_native_settlement/REPORT.md), [pump_route_context_closure/CONTRACT.md](evidence/pump_route_context_closure/CONTRACT.md), [independent-review/README.md](evidence/independent-review/README.md).

## E01 — proposed lines 218–231

First serialization/log precedes authority clone, second serialization/prefix and one readonly event signer self-CPI. Pinned serializers/invoke/allocator/error behavior conditional.

Original: `0x5e6a8..0x5ea10; 0x1624b0; 0x1a0530`. Evidence: [pump_route_event_wire/REPORT.md](evidence/pump_route_event_wire/REPORT.md), [pump_route_context_closure/CONTRACT.md](evidence/pump_route_context_closure/CONTRACT.md).

## S01 — proposed lines 231–239

Initial amount nonzero, account length>=5/multiple5, flags count matches and all<4; no two-hop maximum or fixed flag pattern.

Original: `0x567e8..0x56880`. Evidence: [pump_route_depth/REPORT.md](evidence/pump_route_depth/REPORT.md).

## SCOPE — proposed lines 239–266

Carry source mint/amount and iterate actual flags; parse hop, prepare curve; preserve explicit ordinary mode/Tokenkeg/length fences. Fences are not original all-input behavior; no distinctness or extra authority requirement. See OBLIGATIONS.

Original: `0x57248..0x572c8; 0x5b428; ordinary-domain specialization`. Evidence: [pump_route_accounts/REPORT.md](evidence/pump_route_accounts/REPORT.md), [pump_route_context_closure/CONTRACT.md](evidence/pump_route_context_closure/CONTRACT.md), [pump_route_native_settlement/REPORT.md](evidence/pump_route_native_settlement/REPORT.md).

## A03 — proposed lines 266–298

Per-hop quote-first direction, continuity, final flag, serialized zero native predicate; mint supply threshold; sell gross; selector prior masks; buy budget fixed fees and Q-1 division; sell net positivity. Buy cap/completion is explicitly unrecovered scope, not fabricated accounting.

Original: `0x5c5c8..0x5c728; 0x5cb40..0x5cb88; 0x5cdb8; 0x5cef8; 0xa0538; 0xa0838`. Evidence: [pump_route_arithmetic/REPORT.md](evidence/pump_route_arithmetic/REPORT.md), [pump_route_wide/CONTRACTS.md](evidence/pump_route_wide/CONTRACTS.md), [pump_route_fee_decode/REPORT.md](evidence/pump_route_fee_decode/REPORT.md), [pump_route_accounts/REPORT.md](evidence/pump_route_accounts/REPORT.md).

## T02 — proposed lines 298–308

Ordinary quote adapter identity; zero-stored quote buy uses user-to-curve System input; other buys/sells use actual prior token flow. Input success precedes all reserve mutation.

Original: `0x94908; 0x94e28; 0x950e0; 0x5d360; 0x5dd38; 0x5e030`. Evidence: [pump_route_settlement/REPORT.md](evidence/pump_route_settlement/REPORT.md), [pump_route_tokenkeg_transfers/REPORT.md](evidence/pump_route_tokenkeg_transfers/REPORT.md), [pump_route_native_settlement/REPORT.md](evidence/pump_route_native_settlement/REPORT.md).

## A02 — proposed lines 308–321

Each checked reserve operation immediately stores: virtual base, real base, virtual quote, real quote. No early precomputation of later failing updates.

Original: `0xa0bf0; 0xa13e0`. Evidence: [pump_route_arithmetic/REPORT.md](evidence/pump_route_arithmetic/REPORT.md).

## S02 — proposed lines 321–351

Current-curve signer seeds; final buy/nonnative sell output before accrual; ordinary adapter residual; floor buyback with terminal high-word/subtraction predicates; protocol then creator store; fee-bit-controlled buyback; final native sell output afterwards. No token owner or membership guard for raw buyback.

Original: `0x5d518; 0x5e1d0; 0xa1bd8; 0x5e398; 0x5eb68; 0x5e2b0`. Evidence: [pump_route_settlement/REPORT.md](evidence/pump_route_settlement/REPORT.md), [pump_route_tokenkeg_transfers/REPORT.md](evidence/pump_route_tokenkeg_transfers/REPORT.md), [pump_route_native_settlement/REPORT.md](evidence/pump_route_native_settlement/REPORT.md).

## E02 — proposed lines 351–368

Clock after transfers; native-only SOL slots versus unmasked quote slots; masked rates/fees; creator accrual; fixed string and zero ordinary extra fields; final-u64 adapter difference. No historical-name assertion.

Original: `0x8bbd0..0x8c2c0; 0x5e3c8..0x5ea10`. Evidence: [pump_route_event_wire/REPORT.md](evidence/pump_route_event_wire/REPORT.md), [pump_route_accounts/REPORT.md](evidence/pump_route_accounts/REPORT.md).

## S03 — proposed lines 368–379

Exit before next state; output vault remains curve vault even when last; previous seed mint/authority/bump preserved; checked aggregate buyback after hop exit; final destination mint equality.

Original: `0x57458..0x57998; 0x57030..0x57070`. Evidence: [pump_route_depth/REPORT.md](evidence/pump_route_depth/REPORT.md), [pump_route_accounts/REPORT.md](evidence/pump_route_accounts/REPORT.md).

## D03 — proposed lines 379–385

Pubkey arrays are literal exact 32-byte admitted selector constants; no inferred currency names required.

Original: `data/quote_1.bin, quote_2.bin, quote_stable.bin`. Evidence: [pump_route_fee_decode/REPORT.md](evidence/pump_route_fee_decode/REPORT.md).

## Admission discipline

All original helpers used here were already admitted by the retained route caller/type packages: discriminator→wrapper→route→five-account hop; numeric caller ABIs before arithmetic helpers; account parser before fee/mint/token readers; transfer argument records before builders/invoke; event producer/type before serializer; native caller account arguments before rent/System/direct-move/self-invocation interfaces. No unknown dispatcher or new excluded body was followed. The only new local byte interpretation is the already-admitted rent preparation nonzero-quote branch preserving zero protected balance, explicitly cited above. Public frozen source declarations corroborate source names, not historical function identity.
