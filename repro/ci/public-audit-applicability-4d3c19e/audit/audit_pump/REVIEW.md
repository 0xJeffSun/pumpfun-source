# Substantive review obligations

These are manual source conclusions, not search-marker results. A locally enforced property is not an original-program security certification. D1/D2 in REPORT.md define the dependency and transaction assumptions. Function and context matrices link these records.

## global

**authorization_accounts**: AdminGlobal/AdminReadonly/UpdateGlobalAuthority require the Pump-owned Global at [global] and its authority signer; mut is explicit. Init is the exception: any payer can create the canonical Global once. New authority is unchecked, not a cosigner.

**dynamic_accounts_layout**: Global serializes one whitelist key, 8 normal recipients, 8 reserved recipients and 8 buyback recipients. Reserved setter consumes first 8 remaining accounts; extras ignored, no uniqueness check. InitUserVolume binds any user key and payer; CloseUserVolume requires that user signer and PDA.

**cpi_events**: collect_creator_fee signs [creator-vault,creator,bump] into fixed System; recipient need not sign because it cannot redirect payment. Events use fixed self CPI (D1). Pure config toggles do not all emit events.

**arithmetic**: Buyback share capped at 10000; virtual quote reserves, maximum creator fee and curve depth setters have no numeric bounds. Collection saturates balance minus zero-data rent. Init/close do not perform reward arithmetic.

**lifecycle_rent**: Init allocates 1088 bytes; volume init_if_needed allocates 137 and sets only user, preserving prior counters. Close refunds all lamports and discards counters even when outstanding; only user may do so. Collect retains rent and returns success without event for executable/empty payout.

**token_assets**: Whitelist records keys, not mint data; native/default exclusion differs from QuoteControl (only classic native excluded here). No transfer in config handlers.

**state_time_configuration**: Bootstrap assigns payer authority with other settings zero. Authority rotation accepts zero and may lock admin functions. Config is trusted, not a guarantee of usable reserves. Same-state toggles fail NotAuthorized.

**errors_order_rollback**: Config mutation precedes event; failure is transactional under D2. Volume-close event describes pre-close counters; init is idempotent except emission. Native collect positive payment depends on System ownership/data rules.

**unclosed_obligations**: Fresh deployment bootstrap ownership; intended zero-config behavior; full close/claim economics lie outside stopped incentives scope. No captured-original sign-off.

Source ranges: [programs/pump/src/global_init.rs:10-14](inputs/programs/pump/src/global_init.rs#L10).

## set-params

**authorization_accounts**: Only Global.authority signer, canonical mutable Global; remaining recipients are not authorities.

**dynamic_accounts_layout**: At least 8 recipients; first 8 nonzero, rent exempt and strictly ascending; additional accounts ignored. No executable exclusion in this setter.

**cpi_events**: No asset CPI; emits full configuration via log and self CPI.

**arithmetic**: Real tokens < supply and virtual tokens > real give positive denominator; u64*u64 fits u128, quotient minus initial quote nonnegative. Checked u64 narrowing; both protocol and creator bps <=1000; migration fee < computed final reserves. No lower migration-cost bound.

**lifecycle_rent**: Writes prospective global defaults only; existing curves unchanged. Rent checks apply recipient accounts, not payout amounts.

**token_assets**: No mint validation; withdraw key must be nondefault but need not sign or be system-owned.

**state_time_configuration**: Can set privileged creator authorities to zero, enable_migrate is stored but not read by candidate migration bodies (F1).

**errors_order_rollback**: All constraints before assignments except event timestamp; failures roll back.

**unclosed_obligations**: Final-reserve rounding vs actual terminal liquidity and AMM rent cost remain external obligations; executable configured recipients may make payouts fail.

Source ranges: [programs/pump/src/set_params.rs:12-39](inputs/programs/pump/src/set_params.rs#L12).

## quote-control

**authorization_accounts**: Initialize is permissionless but sets both roles to zero. Global authority alone rotates admin; global OR admin rotates reserves admin and lists/removes; reserves updates also admit reserves_admin. All state canonical Pump PDAs and typed ownership/discriminator.

**dynamic_accounts_layout**: Vector starts capacity 50, hard maximum 256 new entries. space =108+40*n checked. Entry operations find first matching key; listing forbids default and both native mint IDs and duplicates.

**cpi_events**: Only grow performs System transfer from authority signer; emit_cpi fixed self. No mint program invocation on listing.

**arithmetic**: Length addition and sizing checked; reserve value can be any u64 including zero. Removal shifts vector without shrinking/refunding.

**lifecycle_rent**: Grow pays exact rent deficit for new size before realloc(false), then serializes appended entry. Existing space reused; initialization pays rent.

**token_assets**: Pubkey admission does not prove a valid or usable mint. Later create path must validate owner and ATA.

**state_time_configuration**: Role rotations accept zero; prior global authority retains override through Global; only future creation consumes new reserve defaults.

**errors_order_rollback**: Invalid entry/role fails before mutation. Growth/event failure reverts transfer and append under D2.

**unclosed_obligations**: Zero reserves may create unusable markets; intended privileged configuration policy and external mint validity not established.

Source ranges: [programs/pump/src/quote_control/initialize_quote_control.rs:24-31](inputs/programs/pump/src/quote_control/initialize_quote_control.rs#L24), [programs/pump/src/quote_control/state.rs:35-37](inputs/programs/pump/src/quote_control/state.rs#L35), [programs/pump/src/quote_control/state.rs:39-41](inputs/programs/pump/src/quote_control/state.rs#L39), [programs/pump/src/quote_control/state.rs:43-45](inputs/programs/pump/src/quote_control/state.rs#L43), [programs/pump/src/quote_control/state.rs:48-53](inputs/programs/pump/src/quote_control/state.rs#L48), [programs/pump/src/quote_control/state.rs:61-88](inputs/programs/pump/src/quote_control/state.rs#L61), [programs/pump/src/quote_control/state.rs:91-102](inputs/programs/pump/src/quote_control/state.rs#L91), [programs/pump/src/quote_control/state.rs:108-118](inputs/programs/pump/src/quote_control/state.rs#L108), [programs/pump/src/quote_control/update_quote_control_mints.rs:59-107](inputs/programs/pump/src/quote_control/update_quote_control_mints.rs#L59), [programs/pump/src/quote_control/update_quote_control_mints.rs:109-121](inputs/programs/pump/src/quote_control/update_quote_control_mints.rs#L109), [programs/pump/src/quote_control/update_quote_control_mints.rs:140-158](inputs/programs/pump/src/quote_control/update_quote_control_mints.rs#L140), [programs/pump/src/quote_control/update_quote_control_mints.rs:182-196](inputs/programs/pump/src/quote_control/update_quote_control_mints.rs#L182), [programs/pump/src/quote_control/update_quote_control_mints.rs:224-241](inputs/programs/pump/src/quote_control/update_quote_control_mints.rs#L224).

## trade-types

**authorization_accounts**: BondingCurve Owner is Pump; typed Account enforces it. Its deserializer checks exact 8-byte discriminator; unchecked variant assumes at least 8 bytes.

**dynamic_accounts_layout**: Full serialized layout is 166 bytes: reserve fields at 8..48, complete 48, creator 49..81, quote 83..115, creator fee bucket 125..133, protocol 133..141, depth 141, initial quote 142..150, post fields 150..166. Boolean Borsh validation is separate from economic validity.

**cpi_events**: Event structs are serialization schemas, not validation; unparsed_trailing_field remains opaque. No CPI here.

**arithmetic**: No reserve or bps invariants enforced by types; FeeConfig carries u64 bps and vector tiers without sorting validation.

**lifecycle_rent**: Full serializer writes all fields; legacy adapters must explicitly widen account allocation first.

**token_assets**: Quote key alone does not establish backing asset owner/balance.

**state_time_configuration**: complete and post-completion fields require transition checks in handlers.

**errors_order_rollback**: Checked decoder returns Anchor errors; direct unchecked slicing can panic if misused outside current valid init callers.

**unclosed_obligations**: Original complete layout/economic compatibility not proved by serializer claims or schema.

Source ranges: [programs/pump/src/trade_types.rs:28-28](inputs/programs/pump/src/trade_types.rs#L28), [programs/pump/src/trade_types.rs:31-35](inputs/programs/pump/src/trade_types.rs#L31), [programs/pump/src/trade_types.rs:38-47](inputs/programs/pump/src/trade_types.rs#L38), [programs/pump/src/trade_types.rs:48-52](inputs/programs/pump/src/trade_types.rs#L48).

## legacy-buy

**authorization_accounts**: User signer; Pump global/curve PDAs; base vault canonical ATA for curve; user token account mint/authority/program constrained. Fee config FEES owner/discriminator/PDA, fixed executable fee program. Fee recipient membership switches on mayhem flag.

**dynamic_accounts_layout**: Normal path consumes v2 PDA then buyback key; v2 key only, no owner/data requirement because unused. Typed global/user volume supplied even if track=false; accumulator init_if_needed does not set its user field here.

**cpi_events**: Fee query fixed FEES instruction [154,237,138,92,162,2,162,187,1]+u128 cap+zero quote, readonly config and Pump ID. Return data unwrapped, producer ID ignored. Base transfer signed by curve; System pays creator/cashback, curve, buyback, protocol remainder.

**arithmetic**: Buy uses floor(amount*Vq/(Vb-amount))+1; exact input estimates net, adjusts one unit for two ceilings, uses q-1 for base output. Checked reserve add/sub and u64 narrowing. Cap divides by Vb unchecked; zero state panics. Partial exact fill can intentionally bypass minimum output when capped.

**lifecycle_rent**: Before trading payer repairs rent plus real quote and fee buckets; grows to166. Completion only when real base reaches0; base sent before fee/input transfers, all atomic.

**token_assets**: Nominal base amounts recorded; actual token transfer semantics deferred to SPL. No extension review in this task.

**state_time_configuration**: Global fee schedule external; creator override used even if current global configurable flag false. track only event field: no volume increment occurs in this body.

**errors_order_rollback**: Late dynamic-account checks follow base CPI; failure must roll back. Events carry preexisting volume counters, posttrade reserves.

**unclosed_obligations**: Fee-return producer/ABI, nonzero reserves on reachable historical states, tracking equivalence and saved-original semantics unproved.

Source ranges: [programs/pump/src/legacy_buy.rs:34-34](inputs/programs/pump/src/legacy_buy.rs#L34), [programs/pump/src/legacy_buy.rs:35-35](inputs/programs/pump/src/legacy_buy.rs#L35), [programs/pump/src/legacy_buy.rs:36-36](inputs/programs/pump/src/legacy_buy.rs#L36), [programs/pump/src/legacy_buy.rs:37-74](inputs/programs/pump/src/legacy_buy.rs#L37), [programs/pump/src/legacy_buy.rs:75-75](inputs/programs/pump/src/legacy_buy.rs#L75).

## legacy-sell

**authorization_accounts**: Same user/base/curve/fee program constraints as legacy buy; quote must default (native). Direct lamport debit from Pump curve; destinations constrained to user, configured fee, creator PDA, buyback list.

**dynamic_accounts_layout**: LegacyCurve decodes via DistributionCurve then pads to166, clears incomplete fee/depth tails, serializes only original length unless resized. Cashback remaining first account PDA+Pump owner+length>=82 but no explicit discriminator/user validation; then v2 and buyback keys.

**cpi_events**: Fixed FEES query returns Fees through unchecked producer unwrap; SPL checked base input; no signer for lamport debits. Events fixed self.

**arithmetic**: Floor(a*Vq/(Vb+a)), ceil both fees, subtract fees/min output; checked reserve and fee arithmetic. Cashback earned at raw74..82 uses checked increment. cap division Vb unguarded.

**lifecycle_rent**: Rent+reserves repaired by seller before growth to166. Complete curves rejected; real quote subtraction bounds output and leaves accrued buckets represented.

**token_assets**: User token authority checked; no dynamic mint substitutions for base. Nominal base credit depends token semantics, excluded extension work not performed.

**state_time_configuration**: LegacyFeesProgram/LegacyFeeConfig gate dependency identity, not schedule quality. Curve adapter accepts incomplete older fields with zero defaults.

**errors_order_rollback**: Base CPI precedes dynamic validation; failure atomic. Event records quote and fee split; no schedule/incentive mutation apart from cashback counter.

**unclosed_obligations**: Legacy layout reachability, arbitrary alias behavior and fee dependency contract remain; no finding about stopped sell_v2 is inferred.

Source ranges: [programs/pump/src/legacy_sell.rs:8-8](inputs/programs/pump/src/legacy_sell.rs#L8), [programs/pump/src/legacy_sell.rs:9-9](inputs/programs/pump/src/legacy_sell.rs#L9), [programs/pump/src/legacy_sell.rs:10-10](inputs/programs/pump/src/legacy_sell.rs#L10), [programs/pump/src/legacy_sell.rs:11-11](inputs/programs/pump/src/legacy_sell.rs#L11), [programs/pump/src/legacy_sell.rs:11-11](inputs/programs/pump/src/legacy_sell.rs#L11), [programs/pump/src/legacy_sell.rs:12-12](inputs/programs/pump/src/legacy_sell.rs#L12), [programs/pump/src/legacy_sell.rs:14-14](inputs/programs/pump/src/legacy_sell.rs#L14), [programs/pump/src/legacy_sell.rs:16-16](inputs/programs/pump/src/legacy_sell.rs#L16), [programs/pump/src/legacy_sell.rs:16-16](inputs/programs/pump/src/legacy_sell.rs#L16), [programs/pump/src/legacy_sell.rs:18-18](inputs/programs/pump/src/legacy_sell.rs#L18), [programs/pump/src/legacy_sell.rs:44-44](inputs/programs/pump/src/legacy_sell.rs#L44), [programs/pump/src/legacy_sell.rs:45-45](inputs/programs/pump/src/legacy_sell.rs#L45), [programs/pump/src/legacy_sell.rs:46-46](inputs/programs/pump/src/legacy_sell.rs#L46), [programs/pump/src/legacy_sell.rs:47-73](inputs/programs/pump/src/legacy_sell.rs#L47).

## buy-v2

**authorization_accounts**: Canonical Pump curve/base ATA, signer user/base account; quote key equals curve or WSOL for default. Fee/buyback recipients membership. Typed quote program interface restricted; raw quote accounts canonical ATAs except user.

**dynamic_accounts_layout**: check_token checks mint only and ignores owner argument. User quote authority is separately checked; vault/destination authorities rely on canonical ATA construction and SPL. SharingConfig bytes parsed solely for event with default empty on parse failure, owner not checked here.

**cpi_events**: Creates missing fee/buyback/creator/volume ATAs using user payer before trade validation. Fixed FEES query and unchecked return producer; base CPI curve seeds; native System or token user-authority payments.

**arithmetic**: Same bounded buy/exact rounding and partial minimum bypass as legacy buy. Reserves checked; global buyback share subtraction fails if inconsistent. Native/token cashback counters checked.

**lifecycle_rent**: Accumulator user initialized when default. Rent/reserve repair and curve extension occur after emitted events; event visibility does not imply transaction success.

**token_assets**: Quote mint relation strong; positive SPL payments enforce source/mint/program; zero transfers may bypass token checks. Nominal accounting not a general extension guarantee.

**state_time_configuration**: Complete rejection and terminal buy marking; creator override and fee selection depend FEES. No track parameter.

**errors_order_rollback**: Late rent/CPI failure rolls all state back; logs can remain from failed transaction. Event sharing bytes are not security authority.

**unclosed_obligations**: Explicit ATA authority validation gap requires reachable corrupted ATA before impact; no arbitrary withdrawal established. External fee semantics and extension compatibility remain out of scope.

Source ranges: [programs/pump/src/buy_v2.rs:50-50](inputs/programs/pump/src/buy_v2.rs#L50), [programs/pump/src/buy_v2.rs:51-51](inputs/programs/pump/src/buy_v2.rs#L51), [programs/pump/src/buy_v2.rs:52-52](inputs/programs/pump/src/buy_v2.rs#L52), [programs/pump/src/buy_v2.rs:53-110](inputs/programs/pump/src/buy_v2.rs#L53), [programs/pump/src/buy_v2.rs:111-111](inputs/programs/pump/src/buy_v2.rs#L111), [programs/pump/src/buy_v2.rs:113-113](inputs/programs/pump/src/buy_v2.rs#L113).

## trade

**authorization_accounts**: SellV3 has user signer, full Pump curve PDA, constrained base vault/user. Fee config owner FEES and PDA; quote path restricted to SOL/default or exact USDC. USDC user authority and buyback token owner membership checked, vault/buyback canonical ATAs.

**dynamic_accounts_layout**: No dynamic remaining accounts consumed. read_config checks discriminator and2512 minimum; stable/exotic fields decoded only at4073/4097. Exact-buy instead fully deserializes FeeConfig then checks length. selected requires callers nonempty tiers; assumes sorted schedule.

**cpi_events**: Fixed token interfaces or System; buys debit signer, sells sign curve quote transfer. Fee buckets retained in curve; no FEES CPI. Events carry post state and optional Complete/PostCompleteBuy.

**arithmetic**: Sell subtracts gross quote from real reserve and accrues fees; actual out=user+buyback, conserving gross=out+creator+retained protocol. Buy charges quote+fees, retains all except buyback. Checked updates/narrowing; sell/buy cap division by Vb unchecked. Exact crossing adds post quote/base counters; denominator and terminal inventory invariants need reachability proof.

**lifecycle_rent**: No rent repair; requires full166 decoder. Exact crossing transfers from remaining base inventory without AMM CPI, records post counters; migrate uses real_quote and does not consume post_complete_quote_in explicitly (F3).

**token_assets**: Native maps WSOL/default to lamports; USDC restricts mint/owners. Canonical ATA not independently checking stored vault authority, positive transfer validation delegated. Extension work excluded.

**state_time_configuration**: Cashback and already complete rejected. buy_v3 wrapper ignores partial_fill; exact-buy nonmayhem crossing allowed independently of partial flag; unsupported quotes return ReconstructionBranchUnsupported.

**errors_order_rollback**: Mutations after asset CPI, events after mutation, failure atomic. Post event separate from first-curve event; clients must sum both for crossing.

**unclosed_obligations**: Five partial paths retained globally. Post-completion migration conservation, fee layout/ordering historical contract and supported quote completeness unproved.

Source ranges: [programs/pump/src/trade.rs:42-42](inputs/programs/pump/src/trade.rs#L42), [programs/pump/src/trade.rs:43-43](inputs/programs/pump/src/trade.rs#L43), [programs/pump/src/trade.rs:44-44](inputs/programs/pump/src/trade.rs#L44), [programs/pump/src/trade.rs:45-45](inputs/programs/pump/src/trade.rs#L45), [programs/pump/src/trade.rs:46-50](inputs/programs/pump/src/trade.rs#L46), [programs/pump/src/trade.rs:51-112](inputs/programs/pump/src/trade.rs#L51), [programs/pump/src/trade.rs:114-181](inputs/programs/pump/src/trade.rs#L114), [programs/pump/src/trade.rs:183-276](inputs/programs/pump/src/trade.rs#L183), [programs/pump/src/trade.rs:278-291](inputs/programs/pump/src/trade.rs#L278), [programs/pump/src/trade.rs:294-314](inputs/programs/pump/src/trade.rs#L294), [programs/pump/src/trade.rs:316-316](inputs/programs/pump/src/trade.rs#L316).

## multi-hop-curve

**authorization_accounts**: Requires AMM [global_config] PDA Signer derived under fixed AMM, user signer and source_authority signer. This is a CPI capability, not a public keypair endpoint. Dynamic CurveHop owner/PDA/quote relation and mut; exact ordinary Tokenkeg owner/sizes enforced for supported routes.

**dynamic_accounts_layout**: Five accounts per hop, flags count exact and bits<4. One-hop only flag3; two-hop exactly10 accounts with distinct root/nested, buy[1,2],sell[2,1]. two-curve validates both ATAs, stored mint/authority and rent. Source/destination only mint/owner/size: no destination-owner=user requirement.

**cpi_events**: PreviousHop stores preceding base mint, vault, curve authority,bump. SOL->A->B: user lamports to C_A, A vault signed C_A sends to C_B quote vault, C_B sends B to destination. B->A->SOL: source signed authority sends B to C_B, C_B quote A vault signs with B seed to C_A base vault, C_A pays user lamports. native_buyback sends to configured WSOL ATA, self-CPI flush then SyncNative.

**arithmetic**: Checked sums/subtractions/narrowing; u128 products of u64 safe; two-curve denominators checked. Ceil fees on estimate and q-1 output; buys strictly below real reserves. Protocol charged native root only, creator on nested only; buyback fraction of protocol. No local minimum-output argument.

**lifecycle_rent**: Reject complete/cashback/mayhem/holder; two-hop requires preexisting canonical vaults and166 state/rent. Calls h.exit after each hop; rollback on second hop failure must encompass first. No synthetic completion.

**token_assets**: Only Tokenkeg82 mints/165 accounts. Native source/destination WSOL accounts are routing descriptors: user lamports move, not WSOL endpoint balances. Source authority on sell can be owner/delegate per token CPI; recipient user need not equal source authority.

**state_time_configuration**: FeeConfig explicit bump from byte8, FEES-owned typed decoder; two-curve native cap uses live mint supply, otherwise exotic(nonzero) or flat; configurable override depends global flag. Caller must constrain endpoints, custody, and slippage.

**errors_order_rollback**: Late hop2 parse/errors roll back hop1 including explicit exit; emitted events are not independent success receipts. Alias identity skip in two_curve_input cannot arise for distinct canonical ordinary curve vaults, barring PDA collisions.

**unclosed_obligations**: Authorized AMM path end-to-end consent/slippage proof not completed here. Inferred static windows not historical Rust identities. Arbitrary routes/flags/modes remain partial, no extension expansion.

Source ranges: [programs/pump/src/multi_hop_curve.rs:41-41](inputs/programs/pump/src/multi_hop_curve.rs#L41), [programs/pump/src/multi_hop_curve.rs:42-42](inputs/programs/pump/src/multi_hop_curve.rs#L42), [programs/pump/src/multi_hop_curve.rs:43-43](inputs/programs/pump/src/multi_hop_curve.rs#L43), [programs/pump/src/multi_hop_curve.rs:44-44](inputs/programs/pump/src/multi_hop_curve.rs#L44), [programs/pump/src/multi_hop_curve.rs:45-55](inputs/programs/pump/src/multi_hop_curve.rs#L45), [programs/pump/src/multi_hop_curve.rs:56-60](inputs/programs/pump/src/multi_hop_curve.rs#L56), [programs/pump/src/multi_hop_curve.rs:61-69](inputs/programs/pump/src/multi_hop_curve.rs#L61), [programs/pump/src/multi_hop_curve.rs:70-138](inputs/programs/pump/src/multi_hop_curve.rs#L70), [programs/pump/src/multi_hop_curve.rs:150-173](inputs/programs/pump/src/multi_hop_curve.rs#L150), [programs/pump/src/multi_hop_curve.rs:175-184](inputs/programs/pump/src/multi_hop_curve.rs#L175), [programs/pump/src/multi_hop_curve.rs:186-278](inputs/programs/pump/src/multi_hop_curve.rs#L186).

## create

**authorization_accounts**: Permissionless signer payer; fresh mint init, canonical mint-authority and curve PDAs and ATA. Global typed PDA, fixed executable Metaplex/Token/ATA/System.

**dynamic_accounts_layout**: Creator nonzero. Name/symbol/URI locally unbounded in legacy; metadata external program governs encoding lengths. New curve166 and six-decimal mint.

**cpi_events**: Metaplex instruction33 creates metadata with unverified creator share100 using mint-authority signer; fixed target. Mint total supply to curve then revoke MintTokens authority. No aborted runtime probe resumed.

**arithmetic**: Copies global reserve/supply defaults without repeating inequalities. Zero global defaults reachable before set_params; no arithmetic here.

**lifecycle_rent**: Atomic init/mint/metadata then curve state and event; failure of downstream CPI reverts account creation under D2.

**token_assets**: Legacy Token only; no freeze authority supplied. Metadata creator does not authenticate beneficial ownership.

**state_time_configuration**: No initialized/config-ready check; public initialization followed by zero-config creation is a liveness/economic state obligation.

**errors_order_rollback**: Event after all setup; zeros supplied by init for other curve fields.

**unclosed_obligations**: Metaplex instruction ABI/size policy and exact source->captured behavior not closed; no additional runtime evidence produced.

Source ranges: [programs/pump/src/create.rs:6-6](inputs/programs/pump/src/create.rs#L6), [programs/pump/src/create.rs:31-43](inputs/programs/pump/src/create.rs#L31).

## create-v2

**authorization_accounts**: User pays fresh Token2022 mint/curve/ATA; global canonical. Mayhem account keys constrained but branch rejected. Remaining quote token program only Token or Token2022, mint owner equals it; quote ATA derived from curve.

**dynamic_accounts_layout**: No remaining = native. Otherwise at least3:mint,ATA,program; whitelist branch uses global reserves; control path at index3 validates PDA,owner,disc and108+40*count bounded size. Missing control entry requires parent index4, full curve decoder/PDA/owner, root.depth0, native quote, incomplete, nonmayhem and next depth<=global/cap5.

**cpi_events**: Creates quote ATA with signer payer, metadata instructions fixed Token2022 target, mint_to then revoke mint authority. Mayhem CPI absent.

**arithmetic**: nested_sol_reserves uses checked differences/narrowing; target floor(globalVq*globalRb/(globalVb-globalRb)); simulated finish/pool branch uses migration fee and supply remainder. Last pool denominator not checked explicitly; needs reachable reserve proof. Result must positive; whitelisted/control reserves can be zero.

**lifecycle_rent**: Metadata rent estimate bounded by name32/symbol13/uri200. All initialization transactional. Nested calculation models future pool without requiring pool account.

**token_assets**: Existing quote extension filter assigned excluded-boundary disposition only; no Token2022 extension correction/probe. It does not close accepted-asset conservation.

**state_time_configuration**: create_v2_enabled and holder enabled checked, cashback deprecated, mayhem unsupported. Configurable nonzero fee only custom quote and <=global max; otherwise supplied fee ignored. CreationOptionU64 partial EOF defaults zero.

**errors_order_rollback**: ATA creation may precede invalid string/fee rejection, rolls back. Event after mint setup/state. can_edit_creator_fee remains init default.

**unclosed_obligations**: More than one nested level, migrated roots, nonnative root, Mayhem and other partial branches remain unrecovered; external metadata/token semantics not signed off.

Source ranges: [programs/pump/src/create_v2.rs:8-8](inputs/programs/pump/src/create_v2.rs#L8), [programs/pump/src/create_v2.rs:35-101](inputs/programs/pump/src/create_v2.rs#L35), [programs/pump/src/create_v2.rs:105-117](inputs/programs/pump/src/create_v2.rs#L105), [programs/pump/src/create_v2.rs:121-142](inputs/programs/pump/src/create_v2.rs#L121).

## migration

**authorization_accounts**: User signer pays setup; withdraw_authority merely destination matched Global, not signer. Curve Pump PDA/full legacy view complete flag; base vault ATA; fixed AMM, Token/Token2022/ATA/System targets. Pool under AMM [pool,0,pool-authority,mint,quote]; LP/temporary/vault addresses all constrained.

**dynamic_accounts_layout**: Raw d[48] and8..40 safe after DistributionCurve minimum49. Already-zero reserves returns no-op. Nonmayhem consumes remaining boost/vault after pool creation with validation delegated to AMM. Raw token amount64..72 helper assumes initialized SPL data.

**cpi_events**: Pump signs pool-authority for AMM create, boost, burn/close/sweep; curve signs base/quote transfers. Temporary token accounts close to configured withdraw authority; LP burned then closed. Event fixed Pump target.

**arithmetic**: Native quote=real_quote-migration_fee checked; v2 token quote uses observed tmp delta, base uses observed tmp balance. move_lamports checks sums but assumes distinct accounts. Native preparation omits fee-bucket rent reservation; endpoints distinct by PDA relationships.

**lifecycle_rent**: Complete required; reserves zeroed only after all CPI success. v2 preserves preexisting positive temporary quote account, handles rent delta; legacy shortfall funds full rent amount. Both ignore enable_migrate (F1). Post-complete accounting integration unresolved F3.

**token_assets**: v2 quote ATA canonical; source data validity ultimately SPL. Existing extension sizing/harvest helpers only boundary-disposed, no extension work. Full AMM pool/boost/LP conservation external.

**state_time_configuration**: Withdraw authority can be configured without signature; intentional permissionless migration to fixed destination. No time gate.

**errors_order_rollback**: All transfers before final reserve zeroing; downstream failure must revert. No-op migrated branch emits log only. DistributionCurve empty serializer avoids overwriting raw mutations (D1).

**unclosed_obligations**: AMM dependency and boost accounts, post-completion reserve use, enable flag semantics, and external lifecycle proof open; no original vulnerability inferred.

Source ranges: [programs/pump/src/migrate.rs:43-43](inputs/programs/pump/src/migrate.rs#L43), [programs/pump/src/migrate.rs:44-44](inputs/programs/pump/src/migrate.rs#L44), [programs/pump/src/migrate.rs:45-45](inputs/programs/pump/src/migrate.rs#L45), [programs/pump/src/migrate.rs:46-71](inputs/programs/pump/src/migrate.rs#L46), [programs/pump/src/migrate_v2.rs:48-48](inputs/programs/pump/src/migrate_v2.rs#L48), [programs/pump/src/migrate_v2.rs:49-49](inputs/programs/pump/src/migrate_v2.rs#L49), [programs/pump/src/migrate_v2.rs:50-50](inputs/programs/pump/src/migrate_v2.rs#L50), [programs/pump/src/migrate_v2.rs:51-51](inputs/programs/pump/src/migrate_v2.rs#L51), [programs/pump/src/migrate_v2.rs:52-52](inputs/programs/pump/src/migrate_v2.rs#L52), [programs/pump/src/migrate_v2.rs:53-84](inputs/programs/pump/src/migrate_v2.rs#L53).

## distribution

**authorization_accounts**: Permissionless distribution; Pump curve and FEES sharing PDAs with typed owners/discriminators; has_one mint; curve.creator==sharing key and Active required. Vault derived from sharing key. v2 payer signs solely for ATA creation.

**dynamic_accounts_layout**: Legacy decoder permits49-byte curve, zero missing creator/quote. SharingConfig vectors and status deserialize but sum/uniqueness not locally validated. Native remaining firstN recipient keys; token firstN owners thenN ATAs; extras ignored.

**cpi_events**: System vault signature [creator-vault,curve.creator,bump]; token vault signature same. v2 creates exact recipient ATA only when initialize_ata; fixed token interfaces. Events return distribution total, emitted only eligible.

**arithmetic**: floor(available*share/10000), dust remains; checked sum. shares u16 not bounded<=10000 locally, cast may truncate for invalid config; safety relies FEES enforcing positive normalized total. Native eligibility max ceil(deficit*10000/share) checks all before payment.

**lifecycle_rent**: Native vault keeps rent floor only under normalized shares; recipient rent deficits block entire payout with successful zero distribution. Token ATA payer rent distinct from distributed balance.

**token_assets**: Source quote balance read raw; canonical ATA and positive transfer delegates validity to token program; no source mint-authority trust from balance parser alone.

**state_time_configuration**: Paused rejected by execute but minimum query ignores status; creators migrate to sharing key. No local creator_fee bucket sweep prerequisite in distribution view (bucket not consumed).

**errors_order_rollback**: Partial loop transfers revert on failure; all shares checked positive and recipient key/nonexecutable. Dust does not count as distributed.

**unclosed_obligations**: FEES normalized shares/version/size and duplicate policy require separate dependency review; minimum query is advisory, not full execution preflight.

Source ranges: [programs/pump/src/distribution.rs:7-7](inputs/programs/pump/src/distribution.rs#L7), [programs/pump/src/distribution.rs:11-11](inputs/programs/pump/src/distribution.rs#L11), [programs/pump/src/distribution.rs:12-12](inputs/programs/pump/src/distribution.rs#L12), [programs/pump/src/distribution.rs:16-16](inputs/programs/pump/src/distribution.rs#L16), [programs/pump/src/distribution.rs:19-19](inputs/programs/pump/src/distribution.rs#L19), [programs/pump/src/distribution.rs:20-25](inputs/programs/pump/src/distribution.rs#L20), [programs/pump/src/distribution.rs:40-56](inputs/programs/pump/src/distribution.rs#L40), [programs/pump/src/distribution.rs:76-111](inputs/programs/pump/src/distribution.rs#L76), [programs/pump/src/distribution.rs:113-123](inputs/programs/pump/src/distribution.rs#L113).

## minimum

**authorization_accounts**: Readonly Pump curve and FEES sharing PDAs; has_one mint; creator equals sharing key, vault fixed. No signer necessary.

**dynamic_accounts_layout**: At leastN ordered recipients; exact key, nonexecutable, positive share; extra remaining ignored. Active status not checked.

**cpi_events**: No CPI, log event plus return value only.

**arithmetic**: Max ceiling of recipient rent deficits scaled by share; u128 intermediates, checked narrow and reserve+required. can_distribute compares available after vault rent to threshold.

**lifecycle_rent**: No mutation and no writable enforcement; cannot establish successful downstream distribution.

**token_assets**: Native lamport query only, no token vault input.

**state_time_configuration**: Paused or otherwise unusable sharing configuration can still report can_distribute=true.

**errors_order_rollback**: Errors before event, no side effects.

**unclosed_obligations**: Client must separately check status/token path and other execution preconditions; no safety finding from advisory semantics alone.

Source ranges: [programs/pump/src/minimum.rs:14-27](inputs/programs/pump/src/minimum.rs#L14).

## cashback

**authorization_accounts**: No user signature required: destination user fixes accumulator PDA; Account owner/disc+mut. v2 ATA derives under fixed associated program; quote program unchecked (constructor/dependency validation required), quote mint owner checked nonnative.

**dynamic_accounts_layout**: claim amount is all surplus lamports, not earned-minus-claimed; v2 nonnative raw ATA amount, zero/empty returns success. Recipient decoded authority=user and owner=provided program; CPI mint validation delegated.

**cpi_events**: Native directly debits own accumulator; token transfer signed [user_volume_accumulator,user,bump]. transfer_checked wrapper D1 constructs target from quote program; SPL instruction-builder validity still external.

**arithmetic**: claim checked total increment; v2 plain += totals can abort on overflow under configured release checks, not assumed wrapping. Token total_stable increment after CPI.

**lifecycle_rent**: Rent floor uses actual accumulator size, donations included; successful zero claim no event. User remains fixed even permissionless caller.

**token_assets**: Not arbitrary recipient; source canonical ATA. No separate token program Interface on v2; do not claim arbitrary CPI exploit without instruction builder/ATA reachability.

**state_time_configuration**: v2 token claim emits native total_claimed/cashback fields rather than stable fields (F5). No schedule gate.

**errors_order_rollback**: Counter overflow or CPI/event failure atomic; event amount token units in token branch, quote mint not present in schema.

**unclosed_obligations**: Builder whitelist and external program semantics, stable counter/event interpretation; no incentive-lane investigation.

Source ranges: [programs/pump/src/cashback.rs:32-37](inputs/programs/pump/src/cashback.rs#L32), [programs/pump/src/cashback.rs:38-54](inputs/programs/pump/src/cashback.rs#L38).

## collect-v2

**authorization_accounts**: Permissionless payout to creator key bound into vault PDA; creator/vault ATAs derived; typed quote mint and token interface.

**dynamic_accounts_layout**: Native branch by classic WSOL key; token branch parses vault balance before zero return. No extra remaining inputs.

**cpi_events**: Fixed System or token interface; vault signer seeds creator. Positive transfer enforces validity externally.

**arithmetic**: Native saturating surplus minus rent0; token whole balance; no fee computation or counters.

**lifecycle_rent**: Executable creator yields no-op even token branch. Native floor maintained; no ATA init, missing recipients cause CPI error.

**token_assets**: Canonical token recipient prevents caller redirection; account owner/mint restrictions deferred until positive CPI.

**state_time_configuration**: No role/schedule or global lookup; creator key alone selects vault.

**errors_order_rollback**: Event after transfer, fixed self; no event for no-op.

**unclosed_obligations**: SPL target semantics and token extensions not closed; creator vault sharing access policy owned by derivation/reachability.

Source ranges: [programs/pump/src/collect_v2.rs:19-30](inputs/programs/pump/src/collect_v2.rs#L19).

## sweep

**authorization_accounts**: Payer signer only; Pump curve PDA tied to base mint, quote relation. Recipient creator vault derived from current creator OR authorized normal/reserved protocol recipient; raw mutable destinations.

**dynamic_accounts_layout**: SweepCurve validates discriminator/min49 and present bools then pads to>=166, zeroes incomplete field ranges. fee buckets125/133; keys49/83. Classic binary search assumes sorted normal7 list (set_params sorts all8).

**cpi_events**: Lamport payout direct for native; token ATA creation payer then transfer signed curve. Destination token checks allow either token owner and mint; authority ultimately ATA and positive CPI.

**arithmetic**: Native rent availability excludes cf+pf, checked sum; deficit funded before sweep. Only chosen bucket paid then zeroed; zero bucket returns without event after possible rent/growth.

**lifecycle_rent**: Ensures rent166 plus native fee buckets but does not explicitly reserve real_quote; ordinarily balance invariant must hold. Serialization preserves raw tail and normalized legacy defaults.

**token_assets**: Base/quote typed mints; no global fee arithmetic. Protocol recipient arbitrary membership cannot redirect creator bucket.

**state_time_configuration**: Creator change can redirect pending bucket (F2); sweep itself follows current state.

**errors_order_rollback**: Late recipient validation after topup rolls back on error; positive transfer then bucket clear and event.

**unclosed_obligations**: Original legacy layout semantics, underlying reserve/balance invariant and alias edge cases not universally proven.

Source ranges: [programs/pump/src/sweep.rs:4-4](inputs/programs/pump/src/sweep.rs#L4), [programs/pump/src/sweep.rs:5-5](inputs/programs/pump/src/sweep.rs#L5), [programs/pump/src/sweep.rs:7-7](inputs/programs/pump/src/sweep.rs#L7), [programs/pump/src/sweep.rs:8-14](inputs/programs/pump/src/sweep.rs#L8), [programs/pump/src/sweep.rs:17-17](inputs/programs/pump/src/sweep.rs#L17), [programs/pump/src/sweep.rs:18-18](inputs/programs/pump/src/sweep.rs#L18), [programs/pump/src/sweep.rs:40-62](inputs/programs/pump/src/sweep.rs#L40), [programs/pump/src/sweep.rs:64-64](inputs/programs/pump/src/sweep.rs#L64).

## creator-migration

**authorization_accounts**: Permissionless; Pump curve/mint PDA and FEES sharing PDA, owner/disc+has_one mint, prior curve.creator==sharing.admin. No signer; authority derives from prior FEES-created config.

**dynamic_accounts_layout**: MigratingCurve copies supported fields into166, requires fee125..133 only if length>=141; holder flag124. Serializer writes166 and creator; short old allocations may fail exit without resizing.

**cpi_events**: Only fixed self event CPI; program unchecked does not select target for emit_cpi (D1).

**arithmetic**: No amounts moved; rejects holder and pending creator fee; protocol bucket preserved.

**lifecycle_rent**: Changes creator to sharing key once relation holds; no status Active requirement or rent funding.

**token_assets**: Mint typed, no token transfer.

**state_time_configuration**: External sharing admin setup governs permissionless migration. Repeated call normally fails relation unless sharing.admin equals key.

**errors_order_rollback**: event after mutation, serialize failure rolls back; short-account liveness not exploit.

**unclosed_obligations**: External config consent, old allocation reachability and status policy remain open.

Source ranges: [programs/pump/src/creator_migration.rs:4-4](inputs/programs/pump/src/creator_migration.rs#L4), [programs/pump/src/creator_migration.rs:6-6](inputs/programs/pump/src/creator_migration.rs#L6), [programs/pump/src/creator_migration.rs:7-11](inputs/programs/pump/src/creator_migration.rs#L7), [programs/pump/src/creator_migration.rs:13-13](inputs/programs/pump/src/creator_migration.rs#L13), [programs/pump/src/creator_migration.rs:26-29](inputs/programs/pump/src/creator_migration.rs#L26).

## set-creator

**authorization_accounts**: Set requires Global.set_creator_authority signer; sync permissionless. Both canonical metadata PDA under fixed Metaplex and typed metadata owner; curve Pump PDA. Only acts if current creator default.

**dynamic_accounts_layout**: Metadata parser requires key4 and decodes standard prefix incl creators/booleans/edition option; discards embedded mint and update authority, relies PDA. Some(empty) not guarded before cs[0] (F4). SetterCurve pads166 then full166 write.

**cpi_events**: No external CPI; log and self events. No aborted Metaplex probe performed.

**arithmetic**: No monetary arithmetic; chooses first metadata creator regardless verified/share. Fallback argument used only on None in privileged set.

**lifecycle_rent**: No resize/rent topup despite166 serializer: old short curve may fail exit. Existing nonzero creator no-op, not overwritten.

**token_assets**: No token mutation; provenance/validity of first metadata creator relies Metaplex.

**state_time_configuration**: No holder/fee guards, but only default creator eligible. Metadata determines identity unless creators None.

**errors_order_rollback**: Empty creator vector panic aborts instruction; reachability through genuine Metaplex source not established, so unresolved availability concern.

**unclosed_obligations**: Metaplex list invariant and serialization bounds; no new probe/unknown original analysis.

Source ranges: [programs/pump/src/set_creator.rs:4-4](inputs/programs/pump/src/set_creator.rs#L4), [programs/pump/src/set_creator.rs:5-5](inputs/programs/pump/src/set_creator.rs#L5), [programs/pump/src/set_creator.rs:5-5](inputs/programs/pump/src/set_creator.rs#L5), [programs/pump/src/set_creator.rs:6-6](inputs/programs/pump/src/set_creator.rs#L6), [programs/pump/src/set_creator.rs:10-10](inputs/programs/pump/src/set_creator.rs#L10), [programs/pump/src/set_creator.rs:13-13](inputs/programs/pump/src/set_creator.rs#L13), [programs/pump/src/set_creator.rs:14-18](inputs/programs/pump/src/set_creator.rs#L14), [programs/pump/src/set_creator.rs:36-36](inputs/programs/pump/src/set_creator.rs#L36), [programs/pump/src/set_creator.rs:37-37](inputs/programs/pump/src/set_creator.rs#L37).

## admin-cto

**authorization_accounts**: Global.admin_set_creator_authority signer; curve PDA/owner, current_creator exact; fixed AMM/FEES program wrappers, external PDAs/ATAs derived. Mint key unchecked but curve/address relations bind it. Current creator writable checked only wallet branch.

**dynamic_accounts_layout**: DistributionCurve raw flags/fee read with missing-tail defaults; shared means owner FEES+nonempty+old==sharing key, no local config decode. Pool considered initialized by AMM owner+nonempty, full validation external.

**cpi_events**: Fixed AMM collect/reset/update and FEES reset instruction bytes; signs pool-authority for resets and creator-vault for payout. All ATAs payer-funded. Holder vault key checked only transfer branch. token_amount returns0 if frozen; external frozen-vault behavior remains dependency.

**arithmetic**: Creator fee argument positive<=global max but max unbounded; no local creator_fee==0 guard before replacing creator (F2). Sweeps existing creator vault surplus, not curve bucket. Raw update49..81,123,124,115..123 preserves other bytes.

**lifecycle_rent**: Grows/funds curve166; wallet/executable/frozen branches may skip payment. Shared-to-holder transfers old vault to holder vault; shared-to-wallet retains old sharing key after FEES update.

**token_assets**: Quote key relation; raw token amount/frozen parsers do not themselves validate owner, protected partly by ATA derivations and positive CPI.

**state_time_configuration**: Reject mayhem; holder conversion gated global; cannot leave holder except repeated holder; forbids new argument with holder and requires it otherwise; disallows default/sharing target on nonholder.

**errors_order_rollback**: External CPIs before final raw mutation and event, transaction rollback needed. Empty DistributionCurve serializer means raw change persists, no stale field overwrite.

**unclosed_obligations**: Accrued fee beneficiary policy F2, AMM/FEES reset authorization and pool economics unproved. Privileged candidate concern, not arbitrary-user theft finding.

Source ranges: [programs/pump/src/admin_cto.rs:6-6](inputs/programs/pump/src/admin_cto.rs#L6), [programs/pump/src/admin_cto.rs:7-7](inputs/programs/pump/src/admin_cto.rs#L7), [programs/pump/src/admin_cto.rs:99-99](inputs/programs/pump/src/admin_cto.rs#L99), [programs/pump/src/admin_cto.rs:100-144](inputs/programs/pump/src/admin_cto.rs#L100), [programs/pump/src/admin_cto.rs:146-146](inputs/programs/pump/src/admin_cto.rs#L146), [programs/pump/src/admin_cto.rs:147-147](inputs/programs/pump/src/admin_cto.rs#L147), [programs/pump/src/admin_cto.rs:148-150](inputs/programs/pump/src/admin_cto.rs#L148).

## extend

**authorization_accounts**: Any signer funds extension; target must Pump-owned mutable account, no PDA. Supported discriminator list only; attacker cannot supply arbitrary owner-owned bytes without prior Pump path.

**dynamic_accounts_layout**: Needs first8 exact one of curve/global/user/global-volume; target sizes166/1088/137/600. Already >=size no-op.

**cpi_events**: System transfer payer->target then realloc(false), event self CPI.

**arithmetic**: Pays rent(new)-rent(old), not actual deficit; overfunds surplus old account and may not fully repair already underfunded account.

**lifecycle_rent**: Permissionless grow preserves prefix, no shrink/refund. Zeroing/dependency allocation semantics D2.

**token_assets**: No token flow.

**state_time_configuration**: No semantic migration of old fields beyond allocation; handler readers control default compatibility.

**errors_order_rollback**: Unsupported disc fails before transfer; realloc/event failure rolls back.

**unclosed_obligations**: Old allocation rent/reallocation byte semantics and all historical layouts not fully established.

Source ranges: [programs/pump/src/extend.rs:12-54](inputs/programs/pump/src/extend.rs#L12).

## idl-authority

**authorization_accounts**: Global.authority signer; canonical Anchor IDL address, empty-seed Pump signer PDA, System program. IDL ownership handled by branch.

**dynamic_accounts_layout**: System-owned branch uses transfer_with_seed(anchor:idl, Pump owner derivation); Pump-owned branch realloc10240 then discriminator and IdlAccount decode.

**cpi_events**: Fixed System withdraw entire system-owned IDL balance to authority signed empty seeds; Pump-owned branch no external transfer, event self.

**arithmetic**: No fee math; entire system branch balance; resize may lose trailing IDL bytes if larger, privileged.

**lifecycle_rent**: No rent topup on10240 resize; caller authority not marked mut, system transfer success requires transaction-supplied writable privilege. Checks discriminator after resize, failures atomic.

**token_assets**: No token flow.

**state_time_configuration**: Accepts any new IDL authority, system branch returns without assigning or event.

**errors_order_rollback**: Ownership mismatch fails; realloc/deserialize errors revert size. Source comment alone not proof of original behavior.

**unclosed_obligations**: Exact IDL account compatibility, rentable resize and historical behavior unproved.

Source ranges: [programs/pump/src/idl_authority.rs:16-36](inputs/programs/pump/src/idl_authority.rs#L16).

## volume-sync

**authorization_accounts**: Permissionless user key fixes accumulator PDA; both Pump typed accounts canonical, user accumulator mutable.

**dynamic_accounts_layout**: GlobalVolume state has30 supply/volume entries; sync reads start_time only. Stored user field not compared; PDA binds key.

**cpi_events**: No asset CPI; event self only when prior claimed>0.

**arithmetic**: Resets total_claimed to0 and has_total_claimed=false, no arithmetic.

**lifecycle_rent**: No rent/close/allocation change.

**token_assets**: No token transfer.

**state_time_configuration**: Both user.last_update<start and now<start required. Does not update timestamp; repeated calls idempotent.

**errors_order_rollback**: Zero prior claimed still clears flag without event; failure atomic.

**unclosed_obligations**: Schedule mutation and claim economics belong stopped lane; do not infer eligibility security.

Source ranges: [programs/pump/src/volume_sync.rs:21-35](inputs/programs/pump/src/volume_sync.rs#L21).

## recovered

**authorization_accounts**: Pure fragments/host tools, not handlers; no account authentication.

**dynamic_accounts_layout**: Host main uses unwrap and vector indexing for CSV; trusted offline harness input required.

**cpi_events**: No CPI/events.

**arithmetic**: constant_product checks u128 multiply/add/div; sell_accounting ceil fees narrowed u64, checked user/protocol remainder; no clamp of buyback share.

**lifecycle_rent**: No lifecycle state.

**token_assets**: Units generic, not asset backing proof.

**state_time_configuration**: Not linked through lib.rs; fragment annotations are historical claims only.

**errors_order_rollback**: Host malformed input panics, onchain fragment errors structured.

**unclosed_obligations**: No exhaustive semantics from these fragments; no build/execution performed.

Source ranges: [programs/pump/recovered/constant_product.rs:13-19](inputs/programs/pump/recovered/constant_product.rs#L13), [programs/pump/recovered/constant_product_host.rs:4-13](inputs/programs/pump/recovered/constant_product_host.rs#L4), [programs/pump/recovered/sell_accounting.rs:14-17](inputs/programs/pump/recovered/sell_accounting.rs#L14), [programs/pump/recovered/sell_accounting.rs:18-28](inputs/programs/pump/recovered/sell_accounting.rs#L18), [programs/pump/recovered/sell_accounting_host.rs:4-13](inputs/programs/pump/recovered/sell_accounting_host.rs#L4).

## holder-distribution

**authorization_accounts**: Global.holder_reward_claim_authority signer exclusively selects amounts/recipients; mint unchecked key derives holder-rewards PDA. Optional source token account typed and checked authority,mint,token-program. All payout state mut.

**dynamic_accounts_layout**: Exactly2 accounts per amount. Native consumes first of each pair, second unused. Token pair owner+canonical ATA; no proof recipients are holders, authorization delegates allocation policy to claim authority.

**cpi_events**: Native optional WSOL source closes to rewards PDA then System transfer with holder-rewards seeds. Token creates recipient ATA with claim signer payer, then checked transfer with rewards PDA authority.

**arithmetic**: checked total sum, each amount arbitrary authorized u64; no duplicate recipient restriction. Underfunding fails CPI; vector length times2 bounded in practice by serialized instruction limits, not checked multiply.

**lifecycle_rent**: Native final balance must be0 or rent-exempt; token path no lamport distribution. ATA creation may occur for zero amount. Native close of supplied source is atomic with payouts.

**token_assets**: quote native special case classic WSOL; source ownership checked even if optional. Positive token program enforcement external.

**state_time_configuration**: No is_holder_reward_enabled check at payout, no curve record; this is trusted authority distribution, not onchain entitlement proof.

**errors_order_rollback**: Final rent/error after loop rolls back all transfers. Event total/recipient count is requested list, duplicates count separately.

**unclosed_obligations**: Offchain entitlement policy and exact SPL close/transfer semantics unproved; no arbitrary caller payout.

Source ranges: [programs/pump/src/holder_distribution.rs:21-47](inputs/programs/pump/src/holder_distribution.rs#L21).
