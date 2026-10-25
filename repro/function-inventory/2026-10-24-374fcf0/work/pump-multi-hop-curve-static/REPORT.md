# Pump multi_hop_curve_swap: immutable static mapping

This is a read-only inventory of the captured Pump executable and frozen main42. No source was changed, compiled, or executed. No fixtures, signatures, transactions, fee experiments, or runtime parity claims were produced. The extraction checks every disassembled instruction byte against the captured ELF. Addresses below are ELF file offsets in `.text`; function ends are boundaries inferred from symbols, relocations and direct-call targets, not original source names.

The original is `evidence/original/pump/deployed.so`, SHA-256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Frozen main42 is `repro/pump/holder-nested-fortytwo/candidate.so`, 1,405,520 bytes, SHA-256 `c07e67b055c87da881b33c9e07bddf913d5b0beffa1cfe52169ba1bc3f6d2bbf`. `input-sha256.json` binds all reference inputs; `captured-idl-extract.json` preserves the exact interface and selected layouts. Main42 has no `multi_hop_curve_swap` instruction implementation.

## Dispatch and primary windows

The discriminator bytes are `e1 9a 75 16 d7 56 f6 67`. The original loads them at `0x11bab8`, compares at `0x11bac8`, takes the matching dispatch branch at `0x11c9b8`, and calls the wrapper at `0x11ca08`. This direct dispatch chain, the decoded arguments, and account consumption establish the mapping; nearby strings alone are not used as proof.

| Role | Start | End | Bytes | Evidence |
|---|---:|---:|---:|---|
| Anchor instruction wrapper | `0x1295c0` | `0x129bb0` | 1,520 | Calls Vec decoder, fixed context parser, route handler, return-data setter and context exit |
| Fixed context parser | `0xdb958` | `0xdd400` | 6,824 | Consumes exactly the 13 captured IDL accounts in order |
| Route handler | `0x567d8` | `0x57c38` | 5,216 | Validates amount, groups five accounts, validates hop flags, calls per-curve body, returns two u64s |
| Context exit | `0xdd400` | `0xdd700` | 768 | Called after successful handler and return-data serialization |
| Per-hop account parser | `0xdd700` | `0xde4b8` | 3,512 | Two mints, curve, base token vault and quote account |
| Per-hop exit | `0xde4b8` | `0xde6e8` | 560 | Called after each successful curve leg |
| Per-curve execution body | `0x5b3b0` | `0x5fc48` | 18,584 | Direction, fee selection, reserve math, transfers and three event families |

The wrapper reads `amount_in: u64`, then decodes `hop_fees: Vec<u8>` through `0x11758` at `0x129670`. Short amount/vector decode failures become Anchor instruction-deserialize error 102. It calls the context parser at `0x129728`, handler at `0x129888`, sets return-data length 16 at `0x129978`, calls the return-data trampoline at `0x129980`, and exits the context at `0x1299b0`. The captured return type is `CurveRunResult { amount_out: u64, buyback_fee: u64 }`.

## Fixed account order and authority boundary

| Position | Captured account | Parser evidence and constraints |
|---:|---|---|
| 1 | global | Typed parser `0x13270` at `0xdb990`; canonical Pump `global` PDA derive `0xdc450`, compare `0xdc528` |
| 2 | fee_config | Typed parser `0x133e0` at `0xdbb20`; `fee_config`, Pump ID and stored bump under Fees program; derive `0xdc878`, compare `0xdc9e8` |
| 3 | pump_amm_global_config | Signer parser `0x127a0` at `0xdbc98`; canonical AMM `global_config` PDA derive `0xdcbe0`, compare `0xdccc0` |
| 4 | user | Signer parser `0x127a0` at `0xdbce0`; writable check `0xdce20` |
| 5 | source_authority | Signer parser `0x127a0` at `0xdbd28` |
| 6 | source | Token-interface parser `0x1d0` at `0xdbd70`; writable check `0xdce40`; mint establishes route direction |
| 7 | destination | Parser `0x38a8` at `0xdbfc0`; writable check `0xdce60`; final token mint checked by route handler |
| 8 | buyback_fee_recipient | Consumed inline at `0xdbff0`; writable check `0xdcf68`; additional per-leg validation when protocol flag is set |
| 9 | token_program | Fixed legacy token program parser `0x146c8` at `0xdc0e0` |
| 10 | token_2022_program | Fixed Token-2022 program parser `0x13ff0` at `0xdc128` |
| 11 | system_program | Fixed system program parser `0x13b80` at `0xdc170` |
| 12 | event_authority | Parser `0x2ca8` at `0xdc1b8`; canonical Pump event authority derive `0xdd098`, compare `0xdd168` |
| 13 | program | Fixed Pump program parser `0x136f0` at `0xdc3f8` |

Signer consumption precedes the PDA constraints. A normally signed outer transaction cannot synthesize the AMM PDA signature. The captured AMM program must call Pump and provide its own `invoke_signed` seeds. A direct synthetic AMM signer would invalidate the authority boundary and is outside this work.

## Route and hop validation

The handler rejects amount zero with 6020 (`0x567e8`, error constructed `0x56ba0`, original source line 208). It requires at least five remaining accounts and a count divisible by five (`0x567f8..0x56828`), otherwise 6027 (line 214). It requires one flag byte per hop and each byte below four (`0x56830..0x56880`), otherwise 6106 (line 218). It starts with the source token mint at `0x56e20..0x56e60`, consumes five 48-byte AccountInfos per iteration, parses each group at `0x572c8`, passes that hop's flag and last-hop indication to `0x5b3b0` at `0x57438`, then calls hop exit at `0x57570`.

The returned amount becomes the next hop's input. Buyback fees accumulate with checked addition at `0x57938..0x57978`; overflow calls `0x57c38`. Final mint versus destination mint is compared at `0x57030..0x57070`; mismatch is 6098 at `0x57100` (line 262). Success writes amount and accumulated buyback at `0x57980..0x57998`. No separate mixed-direction guard has been established in this Pump loop; the published AMM caller enforces its own route rules.

Each five-account hop consumes base mint (`0xdd738 -> 0x288`), quote mint (`0xdd8c8 -> 0x288`), BondingCurve (`0xdda10 -> 0x13048`), base token vault (`0xddb68 -> 0x1d0`), and quote account (inline `0xddcd0..0xddd10`). It checks the canonical curve PDA from `bonding-curve` plus base mint (`0xdde28`, compare `0xddf08`), requires the curve and both vaults writable, and checks the stored quote at `0xde110`. A zero stored quote is accepted with WSOL (`0xde170..0xde1f8`); mismatch produces 6004. Vault ATA-address checks happen later through `0x58bf0`, which invokes ATA derivation `0x1991e0` and compares the result. There is no fixed ATA-program account in this instruction.

## Per-curve dependencies and unresolved scope

| Original helper / region | Statically supported behavior | Limit |
|---|---|---|
| `0x3cd50`, called `0x5b428` | Account growth/allocation helper, including a minimum 166-byte curve account | Shared with v2/v3; not merely an input guard |
| `0x7e0b0`, called `0x5b4e0` | Complete/cashback checks; complete error 6005 and conditional cashback error 6094 | Creator flag influences the boolean supplied to this helper; complete endpoint policy is not inferred from a string |
| `0x5b500..0x5b6e8` | Curve Mayhem byte explicitly rejects with 6108 | Mayhem initialization is not required for accepted ordinary routes |
| `0x94908` | Token-2022-owner gate; reads transfer-fee extension, Clock epoch and active older/newer fee configuration | This is real extension behavior; full recovery is not independent of unresolved token-extension semantics |
| `0x950e0 -> 0x94e28` | Computes net amount after fee; checked gross-minus-fee | Shared arithmetic with v2/v3; no new fee experiments were performed |
| `0x58668` | Selects supplied legacy or Token-2022 program from mint owner; else 6010 | Does not imply all extension types are understood |
| `0x58bf0` | Vault ATA-address derivation and comparison | Does not itself establish ATA creation |
| `0x7e490`, called under flag bit 0 | Buyback-recipient validation, owner/token/mint and ATA-related checks | Exact historical Rust name is unavailable |
| `0x89ec8` | FeeConfig length gate (2,512 bytes), native/default/USDC/exotic selection and creator/protocol rate calculation | Full exotic/quote-extension behavior remains unresolved |
| `0xa0538` | Constant-product sell arithmetic using u128 multiply/divide; zero denominator 6026 | Exact source spelling unavailable |
| `0xa13e0` | Reserve mutation and checked arithmetic | Shared v2/v3 behavior |
| `0x5a260` | Input-transfer routing with AccountInfo copies and system/token CPI paths | Arguments and transfer ordering require bounded implementation work |
| `0x57e40` | Calls math/fee helpers including `0xa0070`, `0x89ec8`, `0x801f8`, `0x82128`, `0x83088` | Synthetic-completion semantics not fully recovered here |
| `0x58f58` | Contains native/system invocation and token sync operations | Do not treat the full native completion path as recovered |
| `0x8eda0`, `0x93050`, `0x940c0` | Token transfer wrappers reaching `0x17fcc8` | Call shape consistent with checked token transfers; historical identity not proven |
| `0x1624b0`, `0x1639e8`, `0x163bf0` | Whole normalized instruction and relocation matches to main42 TradeEvent, CompleteEvent and PostCompleteBuyEvent data serializers | Event serializer identity does not prove complete handler field/dataflow equivalence |

The event calls occur at per-leg offsets `+0x3318`, `+0x3a48`, `+0x4418`; self-event invocations follow at `+0x3630`, `+0x3d50`, `+0x4718`. `candidate-symbol-anchors.json` records all whole-window matches and their normalization limits. It does not claim call-graph or full executable equality. Business helpers without an exact match retain address names.

`direct-call-graph.json` binds the handler's 214 reachable original instruction windows, with direct edges, raw hashes, indirect-call sites and external relocations. This direct-call closure does not contain the sell_v2, buy_v3, sell_v3, exact-quote-v3, incentives, create_v2 or set_mayhem_virtual_params instruction bodies. It nevertheless intersects their shared business helpers. The closure excludes indirect calls and CPI dispatch, so non-reachability is not a proof that every behavior is independent.

## Source evidence and possible independent next scope

The captured IDL is exact interface evidence. `source-evidence/pump42-*` comes from the immutable main42 source archive, not the concurrently changing checkout. Main42 `trade.rs` restricts quote coins to native/default or USDC and has explicitly partial v3 paths, so forwarding into that implementation would not recover arbitrary curve routes. Its unresolved TradeEvent trailing field also remains material.

`source-evidence/amm37-multi_hop.rs` shows a separate recovered caller: it groups adjacent Pump curve hops, builds exactly these 13 fixed accounts and five accounts per hop, sends the matching discriminator/amount/vector, and genuinely signs with AMM `global_config` seeds. Protocol flag bit 0 applies at the quote endpoint; creator flag bit 1 at the base endpoint. Its 16-byte return processing includes native/alias cases. This is caller evidence, not evidence that Pump and AMM handlers are identical.

The frozen AMM37 receipt file contains 735 passing AMM comparisons, 64 with curve-named cases. Both sides use captured Pump. These existing receipts establish useful caller/fixture provenance, not candidate Pump parity, and were only read. The public documentation snapshots describe synthetic completion, nested quote coins and endpoint fee behavior; they supplement the observed interface but cannot replace missing binary dataflow or runtime comparison.

A bounded ordinary native/legacy-token route lane can be implemented in a new Pump module without editing any stopped handler. It must use the captured AMM caller's actual PDA signing, synthetic local state labelled as such, and ordinary verified outer signatures. It must remain PARTIAL and reject unsupported token extensions, unsupported quote branches, synthetic completion and any event/state behavior not separately recovered. The full instruction cannot currently be presented as independent of unresolved v3/token-extension semantics. No such implementation, build or runtime probe belongs to this static package.

Full original-byte equality, exhaustive equivalence, historical source/dependency reconstruction and the security audit remain incomplete.
