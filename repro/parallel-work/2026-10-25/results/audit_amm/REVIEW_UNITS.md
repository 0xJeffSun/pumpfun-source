# Detailed manual review units

<a id="admin"></a>
## admin

Source ranges: lib.rs:97-241;244-248;381-426. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: AdminGlobal/AdminGlobalNoEvent/UpdateAdmin/SetBoostAuthority/UpdateCreatorFeeConfig require a signer matching GlobalConfig.admin and writable config. Only SetReservedFeeRecipients additionally binds global_config PDA. Account ownership/discriminator does not prove singleton identity; alternate valid config reachability depends on missing create_config.

**dynamic_accounts_layout**: Reserved recipients consumes first eight remaining keys, allows extras and duplicates, rejects zero. Buyback consumes zero or exactly eight, rejects zero and duplicates. No account data/ownership required for stored recipient keys.

**cpi_events**: Fee/admin/disable/reserved/boost-authority/creator-fee changes emit timestamped log+self CPI; buyback and toggles do not emit events. Event target is self and signer seeds __event_authority. System transfer targets config when expanding.

**arithmetic**: update_fee_config caps EACH fee at 1000 (aggregate at most 3000), enforces strictly increasing protocol recipients. Buyback bps <=10000 makes floor(protocol*bps/10000)<=protocol. Configurable creator maximum is not capped; downstream creator fees rely on policy.

**lifecycle_rent**: Creator-fee config and boost-authority expand to 949 with rent shortfall from actual lamports. Other writes require enough existing room for full serializer. SetBoostAuthority admin lacks mut annotation even though funding CPI may debit it: caller must supply writable privilege when topup needed.

**token_assets**: No asset movement other than rent. Stored recipient addresses need not be token accounts; trading/sweep paths derive ATAs. Arbitrary new admin/boost keys can intentionally disable future signing; no acceptance handshake.

**state_time_configuration**: Admin replacement is one-step and accepts zero; toggle_boost requires nonzero authority even to disable. Disable replaces five low bits while preserving high bits. Mayhem/cashback toggles reject same state. Trust is explicitly privileged configuration.

**errors_order_rollback**: Validation failures and CPI/serialization errors propagate. Early assignments (buyback bps before recipient checks) require transaction rollback on later failure. Logs emitted before account exit are not proof of committed changes.

<a id="accumulator"></a>
## accumulator

Source ranges: lib.rs:78-95;427-445;state.rs:124-135. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: Init payer signs; user is key-only. init_if_needed and close bind user_volume_accumulator/user PDA; close requires that user signer and returns rent to it. No permissionless redirection.

**dynamic_accounts_layout**: 137 allocated bytes exceed current fields; init overwrites only user, preserving existing counters. Close has no needs_claim/cashback guard.

**cpi_events**: Init/close emit snapshots then generated exit initializes/serializes or closes. No token CPI closes cashback ATA.

**arithmetic**: No amount arithmetic in handlers. Closing discards counters, not tokens held in separately owned ATA.

**lifecycle_rent**: User can close with outstanding rewards and reopen. PDA authority address remains reproducible; close does not transfer/reassign ATA tokens. Reward lifecycle reset/replay implications require complete reward updater semantics.

**token_assets**: Accumulator itself is AMM-owned; separate token vault ownership checked where used. No implicit token ownership on unchecked user.

**state_time_configuration**: Initialization permissionless but deterministic key. Close forfeiture is signer-directed; fresh-state reward accounting remains dependent on schedule transitions.

**errors_order_rollback**: Close event reports old totals, then generated close runs; downstream transaction failure rolls back state. Event does not establish reward payout.

<a id="create"></a>
## create

Source ranges: create.rs:5-78;80-265;296-312. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: Creator signer/payer, pool PDA=[pool,indexLE,creator,base,quote], LP mint PDA=[pool_lp_mint,pool]. Pool vaults are token-program-specific ATAs controlled by pool; user source ownership/delegation is left to transfer_checked. Config typed but not PDA-bound.

**dynamic_accounts_layout**: OptionBool EOF defaults false but rejects non-0/1 byte. OptionU64 consumes up to eight bytes, zero-pads partial value; these are permissive legacy suffix decoders, not Option encodings. Pool allocated 287.

**cpi_events**: Two checked token transfers use creator; reloaded vault balances feed initial liquidity. Token2022 LP mint authority is pool; mint_to signs exact pool seeds. Late canonical checks happen after transfers but fail atomically.

**arithmetic**: Product u64*u64 fits u128; binary-search square root mid<2^64 so square fits. liquidity>=100, circulating LP=liquidity-100; 100 units remain in accounting supply. Existing donated vault tokens enter initial liquidity.

**lifecycle_rent**: Init/init_if_needed rents paid by creator. Existing ATA state validated by generated constraints. Initial liquidity can equal100 yielding zero circulating LP, an intentional source boundary needing economic policy acceptance.

**token_assets**: supported_mint accepts legacy token mints and Token2022 only MetadataPointer/TokenMetadata extensions. Transfer-fee/hook bases cannot be created through this function. Runtime SPL authority/frozen/mint semantics remain external.

**state_time_configuration**: Mayhem/cashback require config enabled and Pump pool-authority signer. Noncanonical creator is zeroed. Canonical caller may choose creator_fee/holder/edit fields without full CTO-style fee/holder checks; guarantees delegated to Pump caller, not proved here.

**errors_order_rollback**: Create event records requested coin_creator even where stored creator is zero. Post-CPI balances recorded for liquidity. Any late error should rollback init, rent and transfers; no build/runtime exercised.

<a id="liquidity"></a>
## liquidity

Source ranges: lib.rs:449-587. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: Pool typed/mutable with has_one for mints, LP and both vaults. User signer; LP token account authority=user. No direct pool PDA constraint; outgoing/mint authority must sign using stored pool seeds. User base/quote mint-authority checks occur in token CPI.

**dynamic_accounts_layout**: No remaining accounts consumed. GlobalConfig not PDA constrained. Old Pool layout accepted but this handler does not expand it; exit needs 287 bytes.

**cpi_events**: Deposit transfers user->vault then mints Token2022 LP; withdrawal transfers vault->user then burns user LP. Self-transfer requires authority=source token owner. Program chosen by typed mint owner; no arbitrary CPI target.

**arithmetic**: Uses actual base reserve and quote vault minus protocol+creator fees. Deposit rounds proportional inputs UP, withdrawal DOWN, with checked u128 and old_supply division. Quote transfer fee inverse on deposit/direct on withdraw; slippage uses gross deposit/net withdrawal. Withdrawal verifies minted LP supply<=accounting supply.

**lifecycle_rent**: No account creation/topup. Checked new supply and virtual scaling occur after CPI and rollback on error. Deposit scales effective virtual reserve down-rounded; withdraw up-rounded, preserving conservative accounting under positive effective virtual.

**token_assets**: Base transfer fees are not net-adjusted; supported_mint creation gate restricts new candidates, but imported pool extension history is not proved. No automatic LP mint identity beyond stored has_one plus CPI authority/program validation.

**state_time_configuration**: Honors deposit/withdraw flags. Does not enforce BoostPoolLiquidityUnsupported error; instead scales effective virtual reserve. Negative effective virtual fails conversion; zero accounting supply fails division.

**errors_order_rollback**: Events carry pre-transfer cached token balances and computed amounts; no reload. Arithmetic and burn/mint failures propagate. Snapshot evidence does not establish committed balance changes.

<a id="trade"></a>
## trade

Source ranges: trade.rs:90-357. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: TradeV2 has pool has_one mints/vaults, user signer/payer, seeded fee config under Fees, seeded user accumulator, fixed self program/event PDA, Token interfaces. Config not seeded. Buyback requires token owner=quote program, mint match, configured token authority, canonical ATA.

**dynamic_accounts_layout**: Fee config discriminator and owner checked; unchecked decoder slices after 8 relying on checked/init callers. Borsh vectors decoded before 4073/4097 length gates clear stable/exotic fields. No remainder consumption. prepare expands pool to287 and rejects cashback; it does NOT reject mayhem.

**cpi_events**: All transfers fixed Token interfaces; pool signed from stored seeds. Fee schedule selected locally, no Fees CPI. CPI errors propagate. Buyback endpoint receives floor(protocol*bps/10000). Event balances are cached pretransfer values.

**arithmetic**: Exact buy uses floor(q*out/(b-out))+1; equality out=b fails division. Sell uses floor(q*in/(b+in)) minus ceil fees. Exact quote buy subtracts transfer fee and fee estimates, uses curve-1. old accrued<=vault checked BEFORE trade; no explicit post-payout real reserve bound analogous to legacy_sell 210-213. Obligations F03/F04 apply.

**lifecycle_rent**: User funds pool enlargement and accumulator init. Fee accrual adds P+C and subtracts same from virtual, preserving virtual+accrued. Sweep reverses this offset. No proof of post-sell solvency for boosted pools.

**token_assets**: Quote transfer fee accounted separately; base amount remains gross. Creation whitelist limits new extension states, imported states unresolved. Zero transfer skips CPI checks, so zero-path validation is weaker but moves no asset.

**state_time_configuration**: Flags gate buy/sell. Creator override replaces external fee; absent coin_creator zeroes creator charge. Tier ordering and bounded fees assumed from Fees producer. Buyback subtraction uses expect relying on <=10000 config.

**errors_order_rollback**: prepare mutation precedes several validations; transaction failure must rollback rent/init/transfers/counters. No emitted event certifies post-exit success. No historical security equivalence asserted.

<a id="legacy_buy"></a>
## legacy_buy

Source ranges: legacy_buy.rs:7-551. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: User signs; pool binds mints/vaults. Protocol and creator vault ATAs constrained at parse; recipient membership validated. Fee program fixed Fees and seeded fee config; global/user accumulator PDAs; self/event identities fixed. Config lacks seeds.

**dynamic_accounts_layout**: Creator_fee>0 consumes optional cashback ATA, then address-only pool-v2 marker. Buyback owner+ATA required even for zero fee; extras accepted. Cashback destination writable and derived from user accumulator; CPI/ATA creation validates token state.

**cpi_events**: Fees CPI uses fixed discriminator + canonical byte + u128 cap + quote key, two readonly metas. Returned three u64 fees decoded but return producer ignored; requires trusted Fees to replace return data (F05). Base transfer uses pool seeds; quote and fee transfers use user.

**arithmetic**: Buys price q=real+virtual; old fees<=real. Exact output adds ceil fees and inverse pool-transfer fee to slippage bound. Exact quote computes available net/fees then curve-1, but no final aggregate debit<=amount check for split fee transfers (F04, extension reachability unresolved).

**lifecycle_rent**: User funds pool resize, accumulator and protocol/creator/optional fee ATAs. init_if_needed preserves existing counters. Invalid later remaining accounts rollback earlier transfers.

**token_assets**: Fees transfer gross nominal amount, pool quote transfer inversely adjusted; event cashback_earned uses gross fee. Base fee extensions not adjusted. Creation gate rejects them; historical reachable extension populations unknown.

**state_time_configuration**: Honors buy flag; mayhem selects reserved recipients and zero buyback. track is ONLY logged; no mutation of current_sol_volume/global sol_volumes or reward updater (F01 candidate observation).

**errors_order_rollback**: Checked arithmetic except invariant expects on buyback and safe bounded fee product. Cached event balances are before CPI. No saved-case count establishes omitted track semantics.

<a id="legacy_sell"></a>
## legacy_sell

Source ranges: legacy_sell.rs:7-540. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: User signer/payer; same pool/vault and fixed Fees/self/token constraints as buy, without declared accumulators. Protocol recipient membership; seeded creator vault. Optional cashback helper explicitly checks PDA, writable, owner/discriminator or allocates/assigns under AMM.

**dynamic_accounts_layout**: When creator fee>0 cashback consumes ATA+accumulator then pool-v2 marker; ordinary creator consumes marker only. Buyback owner+derived ATA mandatory after those. get() rejects missing accounts. Marker verifies address only; no marker data consumed.

**cpi_events**: Fixed Fees CPI returns decoded fees without producer check. Pool seed-signed quote splits to user/protocol/creator or cashback/buyback. Base source user signed. Helper manually serializes cashback accumulator after transfer.

**arithmetic**: Sell gross base determines quote; subtract ceil fees checked. Explicit quote-lp_fee<=vault-old_accrued protects backing across all payout splits. Net quote after transfer fee>=minimum. Buyback floor and subtraction rely on config cap.

**lifecycle_rent**: Resize/optional cashback account allocation rent from user. System allocate/assign only at canonical PDA with signed seeds; initialized branch demands AMM owner+discriminator. Rewards not settled before cashback increment.

**token_assets**: Gross base input assumes no base transfer fee. Cashback counter gross vs token net may differ for fee quotes; no evidence of theft since claim sweeps actual vault. SPL extension and delegate checks external.

**state_time_configuration**: Mayhem uses reserved recipient list and no buyback. User accumulator user set on cashback. No volume tracking on sell.

**errors_order_rollback**: Fee/precondition failures propagate; earlier token transfers rollback if later dynamic-account validation fails. Events record cached balances, gross amounts and fee metadata; they are not net token receipts.

<a id="sweep"></a>
## sweep

Source ranges: sweep.rs:8-161. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: Permissionless payer signs rent; mutable pool has_one quote/vault. Protocol recipient must be configured (binary search ordinary sorted array, contains reserved mayhem). Creator recipient exact creator_vault/coin_creator PDA. Destination exact ATA; no recipient signature needed.

**dynamic_accounts_layout**: Typed pool/config; config not seeded. Existing unchecked ATA trusted only after address constraint and SPL CPI checks. No variable accounts.

**cpi_events**: Optional idempotent ATA CPI paid by payer; transfer_checked uses pool seeds. Self alias explicitly checks pool owns source. No arbitrary target; event timestamp/bucket/amount identifies gross sweep.

**arithmetic**: Checks total accrued<=real vault before payout; updates virtual+=swept and clears only corresponding bucket. Thus real+virtual stays constant and virtual+accrued unchanged absent transfer-fee effects on destination.

**lifecycle_rent**: Pool expands to287 with actual rent shortfall. Zero amount returns after validation/resize with no event. Never pays payer a fee; payer only funds rent.

**token_assets**: Destination ATA ties quote mint/program/recipient; gross payout may incur transfer fee. Accounting removes gross fee from bucket, which is correct vault debit but recipient net may be smaller.

**state_time_configuration**: No disable gate on sweeps; enables fee settlement before creator transition. Recipient ordering depends on authenticated config creation/update history.

**errors_order_rollback**: Amount and virtual overflow checked before token CPI. Successful transfer then counters mutated; exit/event errors propagate with atomic rollback assumption.

<a id="boost"></a>
## boost

Source ranges: boost.rs:5-87. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: Creator signer, canonical config PDA, pool has_one mints/vaults, boost_vault_authority=[boost_vault,pool], its quote ATA init_if_needed. Handler requires creator equals Pump pool-authority/base PDA; no separate pool.creator equality test.

**dynamic_accounts_layout**: No extra accounts. Effective virtual checked_add returns Option; overflow becomes None and map_or(false) fails to exclude, so accepted-state arithmetic invariant is required.

**cpi_events**: Pool quote transfer signed by stored pool seeds to canonical boost ATA. Reload quote after transfer. Event identifies derived curve address but does not validate a curve account.

**arithmetic**: amount=floor(base*q/10^15), u64 conversion checked; zero or amount>=q returns no-op. Sets virtual=amount after real debit preserving effective pricing reserve for no-fee quote.

**lifecycle_rent**: ATA initialization may occur even for no-op handler; creator funds it. Boost vault rent later returned to boost authority in burn path, not necessarily original payer.

**token_assets**: Quote net received is not used to set virtual; fee extension can reduce boost vault credit. New pools reject transfer-fee extensions; imported state eligibility remains open.

**state_time_configuration**: Noncanonical signer, existing nonzero effective virtual or disabled boost returns Ok, not error. This is a restricted CPI-intended path; Pump authority signing guarantees external.

**errors_order_rollback**: No-op success does not establish boost initialized. System/token/event/exit errors propagate. No historical identity inferred from derived curve address.

<a id="boost_burn"></a>
## boost_burn

Source ranges: boost_burn.rs:7-113. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: Authority signer must equal nonzero configured boost authority; canonical config PDA. Pool has_one but readonly, token vaults/base mint mutable. Seeded boost authority and quote ATA constrain funding source.

**dynamic_accounts_layout**: No remaining accounts. Quote mint not marked mut but runtime writable checked if final harvest is needed. Pool state is not changed or serialized on exit.

**cpi_events**: Boost seed signs quote transfer, pool seeds sign base burn. Reload base mint and all vaults; two events emitted before optional harvest+close. Token2022 harvest targets quote mint/vault, then close rent to authority.

**arithmetic**: used=min(requested,vault), net subtracts quote fee, curve uses net-1, denominator checked; requires burned>0, >=minimum, <old_base. Old fees<=real checked. Effective virtual must be nonzero.

**lifecycle_rent**: Empty boost vault closes; withheld fee harvested first. Later close/harvest failure rolls back burns/transfers despite earlier logs. Authority receives rent, not original init payer.

**token_assets**: Quote extension parser called even for legacy mint, requires retained SPL decoding contract; current retained Anchor wrappers alone insufficient for all versions. No arbitrary transfer-hook metas forwarded.

**state_time_configuration**: Both boost_enabled and buy flag enforced; virtual unchanged, real quote rises and base supply decreases. Negative/non-u64 effective price fails conversion.

**errors_order_rollback**: All nonzero/minimum/reserve checks precede CPIs. Final quote mutability is checked late; atomic rollback is essential, and events can appear in failed traces.

<a id="cashback"></a>
## cashback

Source ranges: cashback.rs:4-29. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: Permissionless user key identifies seeded mutable accumulator; source canonical accumulator ATA; destination token mint/program/authority=user, not necessarily ATA. No arbitrary receiver despite absent user signature.

**dynamic_accounts_layout**: Generic quote mint accepted; no equality to WSOL despite field names. Accumulator cashback counters are shared across mints.

**cpi_events**: Token transfer_checked signs accumulator seeds, full actual source amount. Fixed self program and event PDA. No close or native unwrap.

**arithmetic**: Actual vault amount, including donations, is added checked to total_cashback_claimed. Does not subtract cashback_earned or cap to earned; gross counter may not equal net on fee tokens.

**lifecycle_rent**: No init/topup; recipient account must exist. Repeated claims move zero once empty, except new deposits/donations. Close/reopen accumulator lifecycle handled separately.

**token_assets**: Mint/owner/program ties on both ends prohibit payout to unrelated authority. Cross-mint statistics are not a conserved single-asset amount; accounting interpretation must state units.

**state_time_configuration**: No global cashback toggle check on claims; existing vaults remain claimable. Counter overflow may block payout until state lifecycle changes, impact needs reachable totals.

**errors_order_rollback**: Transfer then checked counter/event; later failure rolls back token movement. Zero amount still emits and writes counter unchanged.

<a id="collect"></a>
## collect

Source ranges: collect.rs:5-24. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: No signer needed; creator determines seeded source vault; destination token authority=creator, mint/program fixed. Creator account owned by Fees is explicitly rejected to avoid bypassing sharing distributions.

**dynamic_accounts_layout**: No remaining accounts; generic quote. Source ATA and destination typed token constraints; unchecked creator used only for key and owner rejection.

**cpi_events**: Pool-independent creator_vault seeds sign transfer_checked. Emits gross fee after successful transfer; amount zero logs and returns.

**arithmetic**: Transfers entire actual vault amount, not a computed reward; no local subtraction or unchecked payout counter.

**lifecycle_rent**: No rent movement or account close. Sharing migration must use other producer path when owner Fees.

**token_assets**: SPL checks same mint/authority; transfer fee reduces net destination but cannot redirect funds. Delegated token semantics external.

**state_time_configuration**: Permissionless trigger cannot change destination authority. Fees owner check alone identifies migration class, not sharing schema.

**errors_order_rollback**: CPI/event failure propagates; no mutable AMM state in context. No claim of Fees distribution security.

<a id="transfer_creator"></a>
## transfer_creator

Source ranges: transfer_creator.rs:5-60. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: Permissionless legacy, v2 payer signs ATA funding. AMM creator_vault authority and Pump creator-vault destination seeded under their respective programs; ATA destination seed includes quote program/mint. Source canonical ATA.

**dynamic_accounts_layout**: Legacy requires native mint. V2 accepts generic quote, branches native by key. Unchecked destinations constrained by PDA/address, not arbitrary owner. No remaining accounts.

**cpi_events**: Native closes WSOL ATA to AMM vault authority, recreates it using authority seeds, then system-transfers ALL authority lamports to Pump vault. Non-native creates destination ATA if empty then transfers full source token balance.

**arithmetic**: Minimum=rent(165)+destination rent shortfall checked. Recreation retains ATA rent; authority preexisting donations also forwarded. No native token amount used to infer lamports.

**lifecycle_rent**: Below minimum returns success no-op. Native authority must be compatible system transfer source and carry sufficient lamports; Pump destination ownership/lifecycle is external. Non-native account kept open.

**token_assets**: Native mint pinned; Token program interface still validated by CPI. Token2022 extensions handled by ATA/CPI dependency; no harvest/close on nonnative path.

**state_time_configuration**: Routing moves fees into Pump custody for same creator; no human authority signature synthesized. Downstream distribution authorization remains outside AMM.

**errors_order_rollback**: No event emitted despite event_cpi contexts. Failure recreating ATA or final transfer rolls back prior close. No live transactions or signed message modifications performed.

<a id="creator"></a>
## creator

Source ranges: creator_reassignment.rs:5-96. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: Migrate binds pool PDA and Fees sharing-config/base PDA plus mint and sharing.admin=old creator; no signer. Set binds Metaplex metadata/base PDA and Pump bonding-curve/base PDA, canonical pool.creator; no signer. CTO requires Pump pool-authority signer and payer, pool.creator match.

**dynamic_accounts_layout**: Sharing decoder checks owner/discriminator, then Borsh variable shareholders/status. Migration does not require Active. Curve decoder expects current fixed fields, no legacy padding. Set indexes first metadata creator if Some; empty vector handling unproved external contract, no new Metaplex probe.

**cpi_events**: Only CTO rent system CPI and self event CPI. External metadata/curve/sharing data reads delegate provenance and lifecycle to owning programs; no target can be substituted without owner/PDA gates.

**arithmetic**: Migrate/CTO require creator_fees==0 before changing beneficiary, protecting accrued bucket ownership. CTO fee>0<=config maximum but no absolute10000 cap; maximum configuration privileged.

**lifecycle_rent**: CTO expands pool to287 from payer actual rent shortfall. Set/migrate do not expand old pools; serializer exit can fail (F06). Migration cannot redirect pending bucket.

**token_assets**: No direct token transfers. Coin creator assignment changes future fee recipient; sharing status and metadata creator verification are material trust dependencies, not proven exploits.

**state_time_configuration**: Migrate rejects holder reward. CTO rejects mayhem; holder reward transition irreversible and requires derived holder-rewards PDA; clears cashback when holder. CTO sets can_edit=false. Set returns no-op if creator already present.

**errors_order_rollback**: State/event order relies on rollback. Some(empty creators) would panic if reachable via accepted external metadata; external producer precondition remains unresolved and excluded runtime lane stays untouched.

<a id="incentives"></a>
## incentives

Source ranges: incentives.rs:4-150. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: AMM ONLY: admin signer matches canonical config.admin; canonical global accumulator writable; mint typed and incentive ATA initialized. Sync permissionless with both accumulator PDAs. Claim user unchecked but destination ATA tied to user, payer signer, global has_one mint.

**dynamic_accounts_layout**: Global has 30 supply and volume buckets. Claim unchecked day indexes depend on schedule bounds; admin assigns mint and seconds_in_a_day unconditionally, even when start/end are zero (F02). This is not the excluded Pump incentive lane.

**cpi_events**: Claim transfers global incentive ATA to user ATA with global_volume_accumulator seeds. ATA creation uses payer; self event fixed. Sync has no asset CPI; admin may create vault but does not fund tokens.

**arithmetic**: Admin uses signed plain subtraction/multiplication/division and unwrap/indexing. Claim reward=floor(user_volume*supply/global_volume) with u128 product, positive divisor check, u64 conversion; total claimed addition relies on release overflow abort. No source bound ensures all previous_day/today indices<30 after arbitrary admin rescheduling.

**lifecycle_rent**: No initializer for global accumulator here; imported bootstrap needed. Claim zero amount returns after possible reset/update. Mint replacement can reinterpret previously accrued reward units unless external operational policy preserves them.

**token_assets**: Token interface ties claim mint/source/destination but gross payout counter ignores transfer fees. Funding adequacy not enforced by schedule admin; insufficient vault balance fails token CPI.

**state_time_configuration**: reset clears claimed counters only when both now and last_update precede schedule start. Sync emits only if total_claimed changes, even if flag changes. Claim realizes one previous bucket, clears volume on reward, advances time in range.

**errors_order_rollback**: Admin may store zero/negative day length without taking validation branch; later division/conversion/index can abort under reachable privileged configuration. Impact on captured original, accepted initialized state and intended admin trust remains unclosed. No security probes run.

<a id="multi_hop"></a>
## multi_hop

Source ranges: multi_hop.rs:11-897. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: User signer, canonical global config and Fees config PDAs, typed input/output tokens, fixed Token/Token2022/System/self/Pump programs. AMM groups deserialize through AmmHop enforcing owner/discriminator/mut/has_one; AMM hop additionally canonical Pump pool creator, no cashback/mayhem.

**dynamic_accounts_layout**: Nonempty remaining length multiple of5; groups=[base mint,quote mint,pool-or-curve,base vault,quote vault]. First scan enforces each input mint on either side, common direction, final mint=output mint. Group2 owner classifies Pump run or AMM; no distinct-pool prohibition.

**cpi_events**: Consecutive Pump runs forwarded to fixed PUMP with discriminator e19a7516d756f667, LE input, u32 count and fee flags. AMM global_config signed with its seed, source signed only with prior pool seeds or existing user signer. Pump globals/fee/event unchecked at AMM boundary, require callee validation. Return producer PUMP +16 bytes required.

**arithmetic**: AMM pretransfer followed by vault reload; reconstructs old reserves subtracting received amount. Endpoint-only fees (protocol first buy/last sell; creator+LP last buy/first sell). Adds accrued and offsets virtual. Final current>=minimum, quote output net; real-fee post-backing and base extension net assumptions remain F03/F04.

**lifecycle_rent**: Each AMM pool expanded to287 as needed and explicit hop.exit serializes before next hop, so repeated appearances can reload latest state. User funds accumulator/rent. Source tokens flow pool-to-pool without user custody between hops.

**token_assets**: program_for rejects unknown mint owners. Token_amount only decodes data (not owner), so its callers require prior typed state or callee validation. Pump nonnative source/destination balances checked with alias/buyback adjustments. Native endpoints skip corresponding comparisons (F07).

**state_time_configuration**: AMM flags enforced inside amm_hop; all-curve path delegates disable/config policies to Pump. prepaid true only after Pump run has deposited into next destination. Unknown Pump implementation is not silently treated as verified.

**errors_order_rollback**: Final slippage checked after hops; transaction failure must undo all CPIs and explicit intermediate exits. Events represent per-hop cached reserves and endpoint snapshots, not final route acceptance. Route topology and fee flags are source guarantees; historical completeness and transitive callee security are not.

<a id="codecs"></a>
## codecs

Source ranges: state.rs:14-67;124-157;203-225;trade.rs:90-114;creator_reassignment.rs:5-22;create.rs:5-49. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: GlobalConfig/Pool Owner returns AMM; discriminator exact eight bytes. TradeFeeConfig owner Fees; SharingConfig owner Fees; BondingCurve owner Pump. Typed Account does owner check separately from decoder. Unchecked decoding is not authentication.

**dynamic_accounts_layout**: GlobalConfig accepts >=907, selects complete prefixes907/940/949, zero-fills missing fields; Pool >=211 selects211/243/244/245/261/270/271/287, zero-fills to287. Bytes between boundaries and tails beyond latest are ignored. Invalid Borsh booleans still reject. Full writers emit949/287 bytes regardless input version.

**cpi_events**: No CPI in codecs. Anchor Account exit serializes mutable current-program accounts only; retained BpfWriter returns WriteZero on insufficient capacity, propagated by both current serializers using ?. Readonly configs do not serialize just because typed.

**arithmetic**: All selected-prefix copies bounded by input and fixed arrays. No fee range validation in decoding: authenticated bytes may still violate economic assumptions. Fee vectors length/alloc bounds are Borsh dependency obligations.

**lifecycle_rent**: Legacy reads do not imply legacy writes succeed. Mutators without realloc require extension beforehand; extend_account can make current-size storage. Extra account tail bytes are not cleared by full field serializer.

**token_assets**: Token mint/account decoding and extension parsing are external dependency semantics, not custom Pool discrimination. Typed token Account owners must match permitted token program set.

**state_time_configuration**: Zero defaults alter semantic flags/counters by version. Full serialization writes current fields; version extension policy needs historical identity and lifecycle evidence. No create_config body establishes bootstrap or singleton.

**errors_order_rollback**: Current writer errors propagate; existing saved report attributes bounded normalized Pool/GlobalConfig exit matches to original inferred windows, not historical function symbols. This review verifies retained source behavior, does not reproduce binary comparisons.

<a id="extend"></a>
## extend

Source ranges: extend.rs:4-53. All are under `inputs/programs/pump-amm/src/`; exact function/field byte spans are in `result.json`.

**authorization_accounts**: Raw mutable account must be AMM-owned, user signer/payer, fixed system program. No admin/PDA requirement: caller can donate rent to any supported discriminator, cannot redirect ownership.

**dynamic_accounts_layout**: First8 bytes select Pool301, GlobalConfig949, User137 or global-volume600; shorter/unrecognized rejected. No full state decoding; this cannot prove valid contents.

**cpi_events**: System transfer from payer to account then realloc(false), log+self event. No token movement or arbitrary CPI target.

**arithmetic**: Topup uses rent(new)-rent(old), NOT target minimum-current lamports. Overfunded accounts still receive full delta; underfunded starting accounts are not necessarily repaired.

**lifecycle_rent**: Already >=target returns no-op. Never shrinks, refunds or closes. Zero-init false and old account suffix semantics need runtime realloc contract; no source probes introduced.

**token_assets**: AMM owner excludes token-owned accounts. Extending Pool to301 leaves14 bytes beyond serializer287; tail not economic fields in current source.

**state_time_configuration**: Permissionless size migration independent of disable flags. Unknown account type explicitly rejected; malformed supported discriminator may be enlarged without becoming valid state.

**errors_order_rollback**: Transfer/realloc/event errors propagate atomically. Logs alone cannot establish account exit; caller spends rent voluntarily.

