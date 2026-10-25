# Evidence-to-change ledger

All addresses below are original Pump ELF offsets, half-open intervals. Use encoded targets, not displaced angle-bracket annotations. Machine-readable function/range associations are in `evidence-to-change.json`; exact assembly and byte ranges are in `byte-source-map.json`.

| Proposed operation | Admitted evidence | Preservation / limit |
|---|---|---|
| Caller selection before owner | closure report and ordinary handler 0x1f500/0x1f548, 0x1f570, 0x21cf8..0x21ee0, 0x1f7e8..0x1f820 | Token key then executable, selection then mint owner; token extension helper retained, not newly certified |
| Native and literal quote selection | 0x1f5e0..0x1f6c0; 0x20aa0..0x20af0 | Zero/WSOL use native seed and skip quote ATA path; reject literal at 0x1b5a88 without guessing its historical symbolic name |
| Control admission/lookup | 0x17cf0 caller-bound quote-control reader; 0x18568 -> 0x6a1e0; 0x68918 size | PDA then Pump owner retained; len >=108 before discriminator, u32 count, 108+40*count, first match, suffix ignored. On 64-bit SBF, u32-count arithmetic cannot overflow |
| Ancestor parser | 0x19ec8..0x1a918; 0x1a378 -> 0x9b148 | Derive curve PDA from expected mint, key, Pump owner, borrow, decode. Decoder failure is wrapped as 6099 at 0x1a830; borrow failure is forwarded |
| Curve compatibility | 0x9b148..0x9b430 and nine named decoders in evidence/types | Validated bools; explicit zero defaults. No requirement for full 166 bytes; unused suffixes ignored |
| Immediate-parent bound | 0x18678..0x18820; 0x60a80..0x60ee0 | Prefix slicing, exactly-four UnsupportedQuoteMint; overflow on depth+1 before min(global,5), then only parent eligibility |
| Record walk and next mint | 0x18d98..0x18f70 | n fixed by parent, nearest-first, next quote_mint key, chain exhaustion 6109; no positional depth or cycle check |
| Terminal seed/borrow | 0x18fd8..0x19088; 0x60ee0..0x61348 | Borrow account 3 even for native root and drop before record selection. Zero uses native seed; WSOL/whitelist use quote seed; otherwise control lookup or 6100. Non-native terminal fallback is grounded here, not enforced as a new native-root guard |
| Curve record | 0x190b0..0x19190; 0x19400..0x194a8 | Four reserve zeros choose Pool. Otherwise complete false before supply-real check; native-only migration fee. Eager supply subtraction even if later pricing avoids migration |
| Pool consumption/PDA | 0x191c0; 0x18bb8..0x18d88; 0x19290..0x19508 | Four account group including curve; 6101 shortage; Pump pool-authority/current mint; AMM pool/index-zero/authority/mint/quote, zero quote becomes WSOL |
| Pool borrows/validation | 0x65eb0..0x662c8; 0x65238..0x65eb0 | Borrow pool/base/quote before pool key; pool key 6103, owner 6102, decode, both vault keys, both token parsers, adjustment. No vault mint/authority or Pool mint-field check added |
| Pool data | 0x63cf0..0x645f8 | len>=211 then discriminator; vault keys +139/+171; signed adjustment +245 when len>=261, otherwise zero |
| Vault amount | 0x64888..0x65238 | Token or Token-2022 program owner; len>=165 and !=355; state +108==1, type +165==2 if longer; amount +64. Guarded offsets require no guessed extra length check |
| Adjusted quote balance | 0x645f8..0x64888 | checked i128 amount+adjustment; signed overflow or negative ->6024; successful value converted to u128 |
| Shared pricing | 0x62170..0x62aa0 | Q==0 first, checked Q+A, checked B*A, denominator check, floor division. No unbounded product accepted after division |
| Curve pricing | 0x62aa0..0x63940 | First output, then only if output>RT: RT*VQ/(VT-RT)+1, saturating remainder, <=1 returns RT, subtract native fee, price remainder-1, checked RT+extra |
| Initial/final/fold | 0x61348..0x62170; 0x63940..0x63cf0 | Seed once, reverse records, rescale once; overflow before final zero denominator, u64 overflow on narrowing, zero only after narrowing ->6104 |
| Wide arithmetic interpretation | closure/prior/arithmetic-composition.json; five retained wide windows and manual CONTRACTS.md | Natural Rust u128 `/`, checked multiply/add/sub and saturating subtraction express manual recovered positive-divisor contracts; no compiler lowering equality or machine-checked all-input proof |
| No trailing-count check | closure report: original handler remaining cursor, six-account quote CPI, fixed-context exit | Walk consumes 4+n+3m; caller receives only seed/depth, not tail cursor; no rejection is invented. Opaque CPI/resource acceptance still conditional |

Compatibility payload lengths exclude the discriminator:

| Payload length | Last decoded field | Subsequent fields |
|---|---|---|
| 41..72 | complete | zero |
| 73 | creator | zero |
| 74 | is_mayhem_mode | zero |
| 75..106 | is_cashback_coin | zero |
| 107..115 | quote_mint | zero, including creator_fee_bps |
| 116 | can_edit_creator_fee | zero |
| 117..132 | is_holder_reward | zero |
| 133..157 | protocol_fees | zero, including depth |
| >=158 | post_complete_quote_in | all fields decoded, suffix ignored |

The five-slot Rust array is logical bounded storage, not an assertion that the Rust enum occupies the recovered 56-byte machine record. Unused initialized array slots have no business semantics. Raw key/u64 readers are called only after the documented bounds. Ordinary cursor increments cannot overflow: n<=5, group size<=4. No extra public input guards are needed for those internal invariants.

The numerator for initial pricing is a product of two u64 values and fits u128. Completion numerator also fits u128; VT>RT ensures RT<=u64::MAX-1, so floor-plus-one and then adding a u64 RQ fit u128. These bounded additions intentionally do not add new error branches. General B*A and final A*(V-R) remain checked u128 products. Division uses only positive denominators after the recovered guards. Pool quote is nonnegative i128 widened to u128, not truncated to u64.

## Admission before any additional interpretation

The assignment and inherited create discriminator/caller chain admit wrapper -> ordinary context/handler -> walk. The walk admits ancestor parser -> discriminator-checked curve decoder and nine compatibility branches. Walk's Pool call admits wrapper -> Pool validator -> discriminator-checked Pool decoder and two owner-bound vault readers. The already admitted root selector and constant-product/fold calls admit pricing and the five identical wide primitives. Retained context windows are inherited root-reviewed evidence; this worker did not follow new initialization/runtime/dispatcher/error-constructor bodies. Operand-bound literal keys were read only after their comparison sites were identified. No stopped body was admitted or analyzed.
