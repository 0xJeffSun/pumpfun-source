# BuyV3 minimal normal-operation source proposal

Status: **conditional proposal; not ready for unconditional root application**. The full proposed file is `proposed/programs/pump/src/trade.rs`, and `minimal.diff` is its exact diff against fixed checkpoint `476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40`. Only `trade::buy` changes. Context, serializer, sell, buy-exact-quote, legacy buy, routing, creation and all excluded handlers are unchanged. No completion counts change. No compile, typecheck, target execution, fixture creation, network operation or parent edit occurred.

## Identity and current implementation

The copied original ELF literal at [0x1b7dd3,0x1b7de5) is `Instruction: BuyV3`. The signed register-relative operand at 0x128930 resolves to 0x147ba0. Wrapper range [0x1286c8,0x128c28), parser entry 0x102578, body [0x147ba0,0x1489f8), shared body return [0x148600,0x148620). The preserved predecessor establishes parser/exit boundaries; it does not establish exhaustive account acceptance. Inferred windows are not historical symbols. The independent verifier redecodes the wrapper edge from ELF bytes rather than trusting assembly names.

Frozen `lib.rs:100` maps `buy_v3` to `trade::buy`, discarding OptionBool. `trade.rs:114–181` is the actual implementation; no trade_v3.rs exists in that source inventory. It previously quoted all requested tokens against virtual reserves, subtracted the request from real reserves, transferred base before writing reserves, emitted no PostCompleteBuyEvent, and set completion before the first event CPI. The existing `PostCompleteBuyEvent` declaration is reused without changing its wire order. Ordinary non-whitelist/non-Mayhem crossing ignores partial_fill in the original predicate, so no wrapper/signature change is necessary for this scope. This does not repair the other optional-fill alternatives.

## Source and control-flow mapping

| Proposed computation or effect | Original evidence |
|---|---|
| `normal`, selected=min(A,R), residual=A-selected | body predicate [0x147c70,0x147d28), [0x147e10,0x147e78); user versus whitelist_pda, not mint |
| First quote floor(S*Y/(X-S))+1, including exact division | 0x148270 -> 0xa0070; add-one 0xa03f8 |
| First fees, pretrade selector and creator override | 0x148308 -> 0x7fde8; imported fee decode report |
| B=actual base vault-S; T=Q+q1-native migration fee | 0x148418 -> 0x82128; require B>0,T>0 |
| Residual ceil(D*T/(B-D)), require B>D, narrow | 0x148480 -> 0x82af8; ceil call 0x82b90 -> 0x88908 |
| Residual fees use same unmodified selector inputs | 0x82ff0 -> 0x7fde8; deterministic selector premise permits reusing rates |
| Separate floor buybacks, separate gross fees, combined max | 0x1485c8 -> 0x80df8; 0x148660 -> 0x81848; comparison 0x148698 |
| First-fill reserve stores, one base transfer of S+D | 0x83c70 -> 0xa0bf0; stores 0xa0d20,0xa0ef0,0xa0f38,0xa12d8; 0x83ed8 -> 0x8f5c8 |
| Protocol then creator accrual; overwrite residual counters | 0x840a0 -> 0xa1bd8; 0x840f0/0x84100; 0x84138 -> 0xa1bd8 |
| User-funded quote to curve and separately buyback | 0x846d8 -> 0x97930; 0x84810 -> 0x92820; ordinary empty signer seeds |
| TradeEvent first-leg amounts and fee tuple | 0x1489d8 -> 0x859b0; serialization 0x86188, log 0x861d0, CPI 0x867c0 |
| Complete flag then CompleteEvent, then residual event | flag 0x86958; log/CPI 0x86ce8/0x873b0; residual check 0x87460, constructor 0x87658 -> 0x81aa0; log/CPI 0x87730/0x879f0 |

The residual ceiling is expressed as quotient plus a nonzero-remainder bit to avoid a gratuitous numerator-add overflow. Each fee uses the existing ceiling helper independently; no fees are computed on aggregate quote. On identity amount adapters total=gross1+gross2 and curve payment=total-buyback1-buyback2. max equality passes. Only first-leg quantities affect four trading reserves; residual counters are overwritten, not accumulated. TransferChecked uses the existing actual token programs, mint decimals, source/destination accounts and curve PDA signer seeds. User quote transfers have no PDA seeds. CPI errors propagate with `?`; no success stub is inserted. The late residual event arithmetic stays after completion CPI. All three events share the first Clock timestamp.

## Exact application boundaries and limitations

1. **User-volume admission and initialization are unresolved.** Original [0x83ff8,0x84060) initializes a zero decoded user key after base CPI and before fee accrual. Current `SellV3.user_volume_accumulator` is unchecked, although PDA constrained. The patch does not invent a data offset/write or serialize a guessed account version. Its normal-success contract requires an already correctly initialized, original-admissible volume account. That premise is NOT enforced by the candidate and is NOT a new permissive validation. Root must recover the original parser/exit and initialize/serialize the key at this exact point before accepting the general path. This boundary is marked directly in the proposed source.
2. **Native settlement remains conditional.** The proposed two System transfers express the named user-funded curve-payment and buyback obligations. Actual native helpers 0x979b8 and 0x965b8, reload/native branch [0x84468,0x84590), lamport-account alias behavior and exact zero-transfer/error order are NOT proven by this package. Do not integrate the native branch as verified original behavior until the separately owned native contract is reconciled. Ordinary Tokenkeg quote funding uses concrete TransferChecked CPIs; transitive processor/admission requirements remain imported premises.
3. **Context checks are preserved, not certified.** In particular the current quote check accepts more native mint combinations than the original relation documented in `types-REPORT.md`. FeeConfig selection, creator override, original account ownership/alias/length acceptance and volume serialization are application obligations, not hidden helper stubs. No generic token-extension admission is added. The `normal` guard confines new residual behavior to Tokenkeg base, and Tokenkeg quote when nonnative. Other BuyV3 modes retain the prior partial arithmetic and remain unsupported by this proposal's claims.
4. **Normal operation is bounded.** Positive denominators, u64-successful additions/subtractions, buyback_bps<=10000, admitted noncashback accounts, successful allocation/reference counting, deterministic pretrade fee selection, ordinary mint/token processing, Clock and event self-CPI, transaction rollback are premises. No claim covers exceptional allocator/drop ABI or all original errors. Existing error variants supply 6021/6024/6025/6026/6002 at the indicated numeric checks; constructor diagnostics and precedence across simultaneous failures still need differential acceptance. The residual constructor's late subtraction error uses 6021 only on an unreachable-in-domain failure; original exceptional ABI is not asserted.
5. Existing first-event fields not newly grounded here, including `creator_fee_unclaimed`, holder fields and all volume metadata, retain the candidate's first-leg conventions. Holder configurations are outside acceptance until field-level reconciliation. No first-event full equivalence follows merely from the third-event discriminator. General whitelist/Mayhem optional-fill behavior and unsupported quote routes are not repaired.
6. This is a single-function minimal-scope diff, not a historical-source claim. No whole-program equivalence, build validity, security sign-off or deployment readiness is claimed. Source outside the changed function is byte-preserved. Some other-mode BuyV3 bookkeeping ordering shares the changed body; only the named normal domain is claimed. Other handlers are byte-unchanged.

## Future original/candidate cases (descriptions only)

These are meaningful proposed comparisons, not executable fixtures or receipts. Use genuine admitted contexts, signed users, and original/candidate separately; capture return/error, account bytes/lamports/token balances, ordered logs and self-CPI outcomes.

- Noncrossing A<R with exact first quotient: require floor+1, one TradeEvent, no completion/residual counters. V may differ from virtual reserve.
- A=R: one TradeEvent followed by CompleteEvent, no residual event; repeat partial_fill absent/false/true.
- A>R with V>A and funded T>0: all three events, base transfer A once, first reserve stores use R/q1 only, counters D/q2. Repeat each partial_fill encoding to test the bypass.
- Choose residual division exact, then inexact: residual uses ceiling without the first leg's unconditional +1. Choose per-leg fee fractions where summed ceilings differ from aggregate ceiling; likewise distinguish separate buyback floors.
- max=combined gross passes; max one lower fails before state/CPI. Insufficient user quote balance for combined amount must roll back the preceding base transfer and state writes.
- V=A (B=D), V<A, zero T, native funded quote equal/below migration fee: compare rejection and diagnostics without treating source arithmetic as a receipt. Pair native and nonnative to isolate migration subtraction.
- Creator zero versus configured creator override; buyback 0 and 10000; verify first/residual fee tuple, first/second buyback event fields and final fee balances.
- Initialized volume versus zero key is a required boundary comparison after its implementation is recovered. Also test base-transfer failure, first funding failure, buyback failure, each event-CPI failure and late-event overflow for rollback/log order.
- Before native acceptance, compare source/destination alias restrictions, reloads, rent/funding constraints, token-vs-native amount adapters and actual native payment order against its separately supplied contract.
- Regress untouched legacy buy, sell_v3 and buy_exact_quote using pre-existing root suites only after separately authorized build/test. No new fixtures are supplied here.

## Seals and verification

`inputs.json` records whole-input SHA256, sizes, Git blob IDs where full input is retained, exact consumed source line/byte ranges and checkpoint. The whole trade.rs is copied to make the proposed file and exact diff reviewable; unrelated body text is opaque preservation, not newly analyzed evidence. Lib excerpts have whole-input hash attestations, not an offline claim to reconstruct omitted bytes. All residual predecessor files and its manifest are copied unchanged under `residual-contract`; its provenance contains exact original ELF/assembly consumed byte/virtual intervals and source slices. Previous seals remain byte-identical. Complete assembly reports support the source mapping above; hash agreement alone is not semantic acceptance.

`manifest.json` seals every package member except itself; sibling `manifest.sha256` anchors it. Run `python3 verify.py` from a separate copy. It verifies inventory, source hashes/ranges, unchanged surrounding source, exact reconstructed diff, original BuyV3 literal and signed body-call edge, normal store/event structural order, and all predecessor ELF/edge/seal checks. It executes no proposed Rust or target. A copied-directory receipt is outside publication. Telemetry is excluded.
