# Manual Pump Fees handler and function review

Every conclusion concerns the frozen candidate. Source spans are exact inclusive lines; result.json also records half-open byte ranges and SHA256. Common dependency qualifications in REPORT.md apply.

## buyback:initialize_buyback:5

[Source programs/pump-fees/src/buyback.rs:5-5](inputs/programs/pump-fees/src/buyback.rs#L5)

**authorization_accounts**: Any mutable payer signer initializes canonical buyback-vault(index); no global authority needed. Fixed System/ATA and token interface.

**dynamic_accounts_layout**: index u8 required <8 in body, after init constraints; no dynamic accounts.

**cpi_events**: No event or business CPI in body; generated init and ATA creation CPIs occur.

**arithmetic**: No counters assigned: zero-initialized authority, totals, timestamps and rate.

**lifecycle_rent**: 208 bytes =8+32+5*8+128; init (not if_needed) prevents reinit. ATA init_if_needed.

**token_assets**: Any interface mint may be used for initial ATA; vault is not bound to one mint.

**state_time_configuration**: Cannot sweep until global authority assigns vault authority. Permissionless initialization cannot choose that authority.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Operational provisioning required; no first-caller ownership capture established.

Evidence: [programs/pump-fees/src/buyback.rs:5-5](inputs/programs/pump-fees/src/buyback.rs#L5), [programs/pump-fees/src/buyback.rs:22-34](inputs/programs/pump-fees/src/buyback.rs#L22), [programs/pump-fees/src/buyback.rs:62-65](inputs/programs/pump-fees/src/buyback.rs#L62)

## buyback:update_buyback_authority:6

[Source programs/pump-fees/src/buyback.rs:6-6](inputs/programs/pump-fees/src/buyback.rs#L6)

**authorization_accounts**: Global authority signer has_one gate on typed global PDA; typed mutable canonical indexed vault. Vault current authority need not consent.

**dynamic_accounts_layout**: index<8; no dynamic accounts.

**cpi_events**: No event or CPI in body; event accounts are present but unused.

**arithmetic**: Authority accepts zero; signed i64 rate accepts negative, zero, positive.

**lifecycle_rent**: No transfers or allocation.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Global role can reset per-vault recipient authority or cooldown; no two-step acceptance.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Negative/huge cooldown effects are privileged configuration, not proven unauthorized bypass.

Evidence: [programs/pump-fees/src/buyback.rs:6-7](inputs/programs/pump-fees/src/buyback.rs#L6), [programs/pump-fees/src/buyback.rs:35-45](inputs/programs/pump-fees/src/buyback.rs#L35)

## buyback:update_buyback_claim_rate_limit:7

[Source programs/pump-fees/src/buyback.rs:7-7](inputs/programs/pump-fees/src/buyback.rs#L7)

**authorization_accounts**: Global authority signer has_one gate on typed global PDA; typed mutable canonical indexed vault. Vault current authority need not consent.

**dynamic_accounts_layout**: index<8; no dynamic accounts.

**cpi_events**: No event or CPI in body; event accounts are present but unused.

**arithmetic**: Authority accepts zero; signed i64 rate accepts negative, zero, positive.

**lifecycle_rent**: No transfers or allocation.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Global role can reset per-vault recipient authority or cooldown; no two-step acceptance.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Negative/huge cooldown effects are privileged configuration, not proven unauthorized bypass.

Evidence: [programs/pump-fees/src/buyback.rs:6-7](inputs/programs/pump-fees/src/buyback.rs#L6), [programs/pump-fees/src/buyback.rs:35-45](inputs/programs/pump-fees/src/buyback.rs#L35)

## buyback:sweep_buyback:8

[Source programs/pump-fees/src/buyback.rs:8-21](inputs/programs/pump-fees/src/buyback.rs#L8)

**authorization_accounts**: Mutable authority signer must equal vault.authority; canonical index PDA; arbitrary mutable destination; both ATAs canonical and token-program-bound; fixed System/ATA.

**dynamic_accounts_layout**: index<8. No dynamic accounts or explicit destination!=vault guard.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates. transfer_checked signed by buyback-vault,index,bump; whole token amount then direct SOL move.

**arithmetic**: now-last_claimed is plain signed subtraction; strict >rate unless rate0. Checked counters abort on overflow; SOL above actual data-length rent. Destination alias with vault can make SOL debit/credit net zero while counter/time advance; requires authorized signer.

**lifecycle_rent**: No close; both ATAs must exist. Successful zero sweep can advance time if transfer0 succeeds.

**token_assets**: TokenInterface accepts both families; native mint increments token1, every other mint token2. Gross units combined across unrelated mints; no reload for net credit.

**state_time_configuration**: No global disable flag check; last_claimed shared across tokens and SOL.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement. Transfer happens before counter overflow check; all must roll back together.

**unclosed**: F4 metrics/alias and signed-clock boundary policy; Token2022 extensions and actual destination credit unresolved.

Evidence: [programs/pump-fees/src/buyback.rs:8-21](inputs/programs/pump-fees/src/buyback.rs#L8), [programs/pump-fees/src/buyback.rs:46-65](inputs/programs/pump-fees/src/buyback.rs#L46)

## donation:crank:11

[Source programs/pump-fees/src/donation.rs:11-43](inputs/programs/pump-fees/src/donation.rs#L11)

**authorization_accounts**: Permissionless mutable payer signer; typed global and donation PDA from stored base/config/bump. Fixed executable RELAY; fixed legacy Token/System/ATA/rent. Quote key equals stored quote; canonical donation ATA.

**dynamic_accounts_layout**: Relay event authority, whitelist, epoch_tracker, debouncer and debouncer_ata unchecked locally; last three mutable. Must be validated by relay.

**cpi_events**: Native direct SOL deposit into ATA then legacy SyncNative discriminator17 and reload. Relay payload [120,217,57,241,135,104,139,184]+u64 amount+config key+u16 zero+Borsh base,creator string+Fees ID. Ordered13 infos; first7 writable, donation and payer sign; remaining readonly. Only donation seeds delegated. emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: Amount is reloaded entire ATA balance; checked total_donated+amount errors after relay. Mixed units impossible within one immutable quote config, but gross debit need not prove relay destination credit.

**lifecycle_rent**: Retains minimum218 native rent; init_if_needed ATA may occur even on disabled/zero paths before body; transaction rejection rolls it back; zero amount no event/time change.

**token_assets**: Crank uses legacy token only; quote created via Interface can exceed this support. No Token2022 transfer path.

**state_time_configuration**: disable bit8; last_crank_ts records successful nonzero relay call; no cooldown enforced.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement. Relay effects/counter update must commit atomically; no post-relay balance reload confirms actual debit.

**unclosed**: Relay source/constraints/upgrade identity not closed. Historical donation sequence proves finite observations, not all config routing.

Evidence: [programs/pump-fees/src/donation.rs:11-43](inputs/programs/pump-fees/src/donation.rs#L11), [programs/pump-fees/src/donation.rs:111-140](inputs/programs/pump-fees/src/donation.rs#L111)

## donation:create:44

[Source programs/pump-fees/src/donation.rs:44-80](inputs/programs/pump-fees/src/donation.rs#L44)

**authorization_accounts**: Mutable payer signer; canonical donation PDA(base_mint,config_id); typed base mint and Pump curve PDA. Raw pool requires AMM owner, Pool discriminator, base mint, Pump pool-authority creator and pool PDA. If coin_creator=canonical sharing PDA, requires Fees owner, matching mint, Active, !revoked, admin=payer; otherwise pool.coin_creator=payer.

**dynamic_accounts_layout**: config_id is arbitrary identifier; body validates pool only when donation version0. Existing version returns no-op after context checks.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: Counters zeroed; no division or share arithmetic.

**lifecycle_rent**: init_if_needed218 exact space and rent; initializes creator and pool quote once, no later refresh.

**token_assets**: Base mint accepts TokenInterface; stored quote from pool need not be legacy-token supported although crank is legacy-only.

**state_time_configuration**: disable bit4 blocks; donation routing snapshots creator/config/quote even if sharing admin changes later.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Relay config identifier ownership/consent and quote-support eligibility unresolved; no arbitrary caller can initialize creator route without authorization.

Evidence: [programs/pump-fees/src/donation.rs:44-109](inputs/programs/pump-fees/src/donation.rs#L44)

## lib:admin_cto_sharing_config:35

[Source programs/pump-fees/src/lib.rs:35-37](inputs/programs/pump-fees/src/lib.rs#L35)

Accounts: AdminCtoSharingConfig

**authorization_accounts**: Requires BOTH Pump-derived pool-authority(mint) signer and external authority signer equal Pump global.admin_set_creator_authority; canonical Pump global and Fees sharing PDA+has_one mint. An ordinary wallet cannot sign foreign PDA.

**dynamic_accounts_layout**: Option<Pubkey>: None clears, Some accepts any key including zero; typed mint and state. Fixed self program key.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: One10000-share or empty vector; no asset transfer.

**lifecycle_rent**: No resize/close; previous shareholders cloned to event; reset version2.

**token_assets**: No fee settlement or token transfer occurs before reset.

**state_time_configuration**: Some=>Active,!revoked; None=>Paused,revoked,zero admin,no shares. New admin can update again after reset; balances are not locally settled.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Caller must ensure accrued-fee policy before reset. Reachability through exact captured Pump caller and all upstream guards not exhaustively proved; no outsider reset identified.

Evidence: [programs/pump-fees/src/sharing_admin.rs:6-30](inputs/programs/pump-fees/src/sharing_admin.rs#L6)

## lib:claim_social_fee_pda:40

[Source programs/pump-fees/src/lib.rs:40-42](inputs/programs/pump-fees/src/lib.rs#L40)

Accounts: ClaimSocialFeePda

**authorization_accounts**: Global has_one social_claim_authority signer. Typed mutable social PDA bound to requested user_id/platform+stored bump. Arbitrary writable recipient chosen by authority; no recipient signer or ID ownership binding.

**dynamic_accounts_layout**: Stored user_id/platform used for event; request seeds select state, but no explicit equality with stored fields. Reachable create writes matching fields.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: now=i64 timestamp as u64; saturating elapsed; zero last_claimed bypasses cooldown; negative timestamp casts large. Amount=balance-minimum179 saturating; counters saturate.

**lifecycle_rent**: Moves only above hard-coded179-byte rent; executable recipient or zero amount returns None. Simultaneous mutable borrows reject source==recipient. No close.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: disable bit2, shared cooldown; only successful payment advances last_claimed. Globally trusted authority can select any recipient.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement. Native credit uses plain +=; valid runtime total supply bounds assumed, not adversarial arbitrary-ledger proof.

**unclosed**: Historical account sizes/clock domains and authority operational safeguards unproved. No outsider drain established.

Evidence: [programs/pump-fees/src/social.rs:45-57](inputs/programs/pump-fees/src/social.rs#L45), [programs/pump-fees/src/social.rs:75-90](inputs/programs/pump-fees/src/social.rs#L75)

## lib:claim_social_fee_pda_v2:45

[Source programs/pump-fees/src/lib.rs:45-47](inputs/programs/pump-fees/src/lib.rs#L45)

Accounts: ClaimSocialFeePdaV2

**authorization_accounts**: Same social role/PDA gate; mutable Interface mint; source/destination canonical ATAs derived under fixed ATA program using selected TokenInterface ID. No recipient signer.

**dynamic_accounts_layout**: Native branch still requires mint/ATA address context. token_amount checks live lamports, token-family owner, decoding, mint; token-account authority delegated to CPI/canonical ATA. social_claim_authority lacks mut annotation despite optional ATA funding.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates. Non-native optional ATA create then signed transfer_checked from social PDA using stored user_id/platform/bump. Native branch directly moves SOL.

**arithmetic**: Shared timestamp/cooldown as v1. Native min179; token amount is whole source; counters saturate; token event after=before.saturating_add(amount), not observed credit.

**lifecycle_rent**: ATA creation can occur before amount==0 returns None; successful no-claim transaction may still fund ATA. No close/realloc.

**token_assets**: Token and Token2022 interface accepted; mint-owner/program consistency and extensions ultimately handled by token CPI; no remaining hook accounts passed. Native mint selects raw SOL, not ATA wSOL transfer. No explicit recipient!=social PDA or token source!=destination guard; an authorized self-transfer needs token-processor semantics to assess counter fidelity, so net payout is not proven by successful CPI.

**state_time_configuration**: Shared last_claimed throttles every quote; non-native amounts of different mints/decimals accumulate in total_stable_claimed.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: F3 payer mutability; F4 transfer-fee/net-credit and cross-mint metric semantics; extension support not fully reviewed.

Evidence: [programs/pump-fees/src/social.rs:5-34](inputs/programs/pump-fees/src/social.rs#L5), [programs/pump-fees/src/social.rs:92-119](inputs/programs/pump-fees/src/social.rs#L92)

## lib:crank_donation_fee_pda:50

[Source programs/pump-fees/src/lib.rs:50-52](inputs/programs/pump-fees/src/lib.rs#L50)

Accounts: CrankDonationFeePda

**authorization_accounts**: Permissionless mutable payer signer; typed global and donation PDA from stored base/config/bump. Fixed executable RELAY; fixed legacy Token/System/ATA/rent. Quote key equals stored quote; canonical donation ATA.

**dynamic_accounts_layout**: Relay event authority, whitelist, epoch_tracker, debouncer and debouncer_ata unchecked locally; last three mutable. Must be validated by relay.

**cpi_events**: Native direct SOL deposit into ATA then legacy SyncNative discriminator17 and reload. Relay payload [120,217,57,241,135,104,139,184]+u64 amount+config key+u16 zero+Borsh base,creator string+Fees ID. Ordered13 infos; first7 writable, donation and payer sign; remaining readonly. Only donation seeds delegated. emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: Amount is reloaded entire ATA balance; checked total_donated+amount errors after relay. Mixed units impossible within one immutable quote config, but gross debit need not prove relay destination credit.

**lifecycle_rent**: Retains minimum218 native rent; init_if_needed ATA may occur even on disabled/zero paths before body; transaction rejection rolls it back; zero amount no event/time change.

**token_assets**: Crank uses legacy token only; quote created via Interface can exceed this support. No Token2022 transfer path.

**state_time_configuration**: disable bit8; last_crank_ts records successful nonzero relay call; no cooldown enforced.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement. Relay effects/counter update must commit atomically; no post-relay balance reload confirms actual debit.

**unclosed**: Relay source/constraints/upgrade identity not closed. Historical donation sequence proves finite observations, not all config routing.

Evidence: [programs/pump-fees/src/donation.rs:11-43](inputs/programs/pump-fees/src/donation.rs#L11), [programs/pump-fees/src/donation.rs:111-140](inputs/programs/pump-fees/src/donation.rs#L111)

## lib:create_donation_fee_pda:55

[Source programs/pump-fees/src/lib.rs:55-57](inputs/programs/pump-fees/src/lib.rs#L55)

Accounts: CreateDonationFeePda

**authorization_accounts**: Mutable payer signer; canonical donation PDA(base_mint,config_id); typed base mint and Pump curve PDA. Raw pool requires AMM owner, Pool discriminator, base mint, Pump pool-authority creator and pool PDA. If coin_creator=canonical sharing PDA, requires Fees owner, matching mint, Active, !revoked, admin=payer; otherwise pool.coin_creator=payer.

**dynamic_accounts_layout**: config_id is arbitrary identifier; body validates pool only when donation version0. Existing version returns no-op after context checks.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: Counters zeroed; no division or share arithmetic.

**lifecycle_rent**: init_if_needed218 exact space and rent; initializes creator and pool quote once, no later refresh.

**token_assets**: Base mint accepts TokenInterface; stored quote from pool need not be legacy-token supported although crank is legacy-only.

**state_time_configuration**: disable bit4 blocks; donation routing snapshots creator/config/quote even if sharing admin changes later.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Relay config identifier ownership/consent and quote-support eligibility unresolved; no arbitrary caller can initialize creator route without authorization.

Evidence: [programs/pump-fees/src/donation.rs:44-109](inputs/programs/pump-fees/src/donation.rs#L44)

## lib:create_fee_sharing_config:60

[Source programs/pump-fees/src/lib.rs:60-62](inputs/programs/pump-fees/src/lib.rs#L60)

Accounts: CreateFeeSharingConfig

**authorization_accounts**: Payer signer authorized as current curve.creator or validated graduated pool.coin_creator; typed canonical Pump global/curve and mint; own canonical init_if_needed sharing config. Optional pool requires AMM-owned typed decoder and full pool PDA checks on graduated branch.

**dynamic_accounts_layout**: Graduated means real_token_reserves==0, not complete flag. Existing version nonzero returns no-op; graduated requires pool + AMM program/event.

**cpi_events**: Explicit state.exit before Pump extend/migrate CPI exposes curve-creator admin and10000 share; then state.exit with selected pool creator before AMM extend/migrate. Fixed typed program IDs, no signer seeds manufactured; payer privileges forwarded. emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: One shareholder at10000; no transfer arithmetic locally.

**lifecycle_rent**: Alloc1024; state version2 Active !revoked; downstream extend funds curve/pool rent with payer. No close.

**token_assets**: Mint interface identity only; no local token transfer.

**state_time_configuration**: Two interim serialized configurations are deliberate to satisfy distinct curve/pool creator checks. Foreign Account exit does not overwrite CPI changes because owner differs from Fees.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement. Any later AMM failure must revert earlier Pump creator migration and sharing creation.

**unclosed**: Selected dependency source supports CPI relationships but is candidate code, not closure of captured originals. Migration helper holder/unswept-fee guards and historical layout compatibility remain external obligations.

Evidence: [programs/pump-fees/src/sharing.rs:11-61](inputs/programs/pump-fees/src/sharing.rs#L11)

## lib:create_social_fee_pda:65

[Source programs/pump-fees/src/lib.rs:65-67](inputs/programs/pump-fees/src/lib.rs#L65)

Accounts: CreateSocialFeePda

**authorization_accounts**: Any mutable payer signer may fund canonical social-fee-pda + user_id + platform PDA; global typed PDA; fixed System program. No identity proof needed to reserve this deterministic escrow.

**dynamic_accounts_layout**: String byte length <=20 in body; seeds validation may reject >32 before handler. Account version nonzero returns unchanged; platform any u8.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: No fee amount arithmetic; initializes counters to zero.

**lifecycle_rent**: init_if_needed space179 =8+1+1+4+20+1+24+120. Existing account exact space/owner/rent enforced by macro; handler preserves nonzero-version state.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: disable bit1 blocks; version1 initialization fixes user ID/platform and reserved bytes.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement. Initialization macro CPIs precede body disable/length checks; rejection rolls back.

**unclosed**: Social identity-to-recipient ownership is deliberately delegated to claim signer, not proven by creation.

Evidence: [programs/pump-fees/src/social.rs:36-44](inputs/programs/pump-fees/src/social.rs#L36), [programs/pump-fees/src/social.rs:58-73](inputs/programs/pump-fees/src/social.rs#L58)

## lib:extend_fee_config:70

[Source programs/pump-fees/src/lib.rs:70-92](inputs/programs/pump-fees/src/lib.rs#L70)

Accounts: ExtendFeeConfig

**authorization_accounts**: Permissionless signer user; mutable raw config must have Fees owner, exact discriminator, stored bump and matching fee_config namespace PDA. Namespace identifier is unchecked.

**dynamic_accounts_layout**: Reads only first 9 bytes for eligibility; does not deserialize vectors. Thus validates identity but not full FeeConfig well-formedness.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates. System transfer from user; user is Signer without #[account(mut)], so a transaction must actually supply writable privilege for transfer.

**arithmetic**: Transfers rent.minimum(new)-rent.minimum(old), not deficit from actual balance; surplus remains in config. Assumes monotonic runtime rent schedule.

**lifecycle_rent**: No-op >=4097 without event; otherwise zeroed realloc to4097. Does not withdraw surplus or close.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Enables length-gated stable/exotic decoding; assumes existing serialized prefixes are coherent.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Missing writable declaration can cause client-generated readonly funding failures (F3); callers can mark writable. Rent behavior and exact error compatibility remain bounded.

Evidence: [programs/pump-fees/src/lib.rs:70-92](inputs/programs/pump-fees/src/lib.rs#L70), [programs/pump-fees/src/contexts.rs:6-16](inputs/programs/pump-fees/src/contexts.rs#L6)

## lib:get_fees:95

[Source programs/pump-fees/src/lib.rs:95-99](inputs/programs/pump-fees/src/lib.rs#L95)

Accounts: GetFees

**authorization_accounts**: Read-only Fees-owned typed FeeConfig namespace PDA, stored bump; no signer/caller-program allowlist. Public quote reads do not mutate funds.

**dynamic_accounts_layout**: OptionBool missing byte defaults false and rejects byte>1; get_fees trade_size is unused. quote-mint variant accepts a key, not an authenticated mint account.

**cpi_events**: Returns Fees via generated return handling; no explicit CPI or event.

**arithmetic**: Flat branch avoids tier indexing. Pump tier branch indexes [0], picks highest threshold <=cap, and below first uses first. Empty tier vector panics; no arithmetic on trade size.

**lifecycle_rent**: No allocation or transfers.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Zero/wSOL/OTHER_NORMAL_QUOTE select normal; USDC selects stable; other keys use exotic or all-zero fallback. get_fees bool directly selects stable.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: F1 empty vectors reachable after initialize; F2 short stable decoder. Prices supplied by caller are not authenticated here; upstream caller economic correctness is separate.

Evidence: [programs/pump-fees/src/lib.rs:95-113](inputs/programs/pump-fees/src/lib.rs#L95), [programs/pump-fees/src/lib.rs:303-312](inputs/programs/pump-fees/src/lib.rs#L303), [programs/pump-fees/src/contexts.rs:18-32](inputs/programs/pump-fees/src/contexts.rs#L18), [programs/pump-fees/src/types.rs:26-35](inputs/programs/pump-fees/src/types.rs#L26)

## lib:get_fees_with_quote_mint:102

[Source programs/pump-fees/src/lib.rs:102-113](inputs/programs/pump-fees/src/lib.rs#L102)

Accounts: GetFeesWithQuoteMint

**authorization_accounts**: Read-only Fees-owned typed FeeConfig namespace PDA, stored bump; no signer/caller-program allowlist. Public quote reads do not mutate funds.

**dynamic_accounts_layout**: OptionBool missing byte defaults false and rejects byte>1; get_fees trade_size is unused. quote-mint variant accepts a key, not an authenticated mint account.

**cpi_events**: Returns Fees via generated return handling; no explicit CPI or event.

**arithmetic**: Flat branch avoids tier indexing. Pump tier branch indexes [0], picks highest threshold <=cap, and below first uses first. Empty tier vector panics; no arithmetic on trade size.

**lifecycle_rent**: No allocation or transfers.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Zero/wSOL/OTHER_NORMAL_QUOTE select normal; USDC selects stable; other keys use exotic or all-zero fallback. get_fees bool directly selects stable.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: F1 empty vectors reachable after initialize; F2 short stable decoder. Prices supplied by caller are not authenticated here; upstream caller economic correctness is separate.

Evidence: [programs/pump-fees/src/lib.rs:95-113](inputs/programs/pump-fees/src/lib.rs#L95), [programs/pump-fees/src/lib.rs:303-312](inputs/programs/pump-fees/src/lib.rs#L303), [programs/pump-fees/src/contexts.rs:18-32](inputs/programs/pump-fees/src/contexts.rs#L18), [programs/pump-fees/src/types.rs:26-35](inputs/programs/pump-fees/src/types.rs#L26)

## lib:initialize_buyback:116

[Source programs/pump-fees/src/lib.rs:116-118](inputs/programs/pump-fees/src/lib.rs#L116)

Accounts: InitializeBuyback

**authorization_accounts**: Any mutable payer signer initializes canonical buyback-vault(index); no global authority needed. Fixed System/ATA and token interface.

**dynamic_accounts_layout**: index u8 required <8 in body, after init constraints; no dynamic accounts.

**cpi_events**: No event or business CPI in body; generated init and ATA creation CPIs occur.

**arithmetic**: No counters assigned: zero-initialized authority, totals, timestamps and rate.

**lifecycle_rent**: 208 bytes =8+32+5*8+128; init (not if_needed) prevents reinit. ATA init_if_needed.

**token_assets**: Any interface mint may be used for initial ATA; vault is not bound to one mint.

**state_time_configuration**: Cannot sweep until global authority assigns vault authority. Permissionless initialization cannot choose that authority.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Operational provisioning required; no first-caller ownership capture established.

Evidence: [programs/pump-fees/src/buyback.rs:5-5](inputs/programs/pump-fees/src/buyback.rs#L5), [programs/pump-fees/src/buyback.rs:22-34](inputs/programs/pump-fees/src/buyback.rs#L22), [programs/pump-fees/src/buyback.rs:62-65](inputs/programs/pump-fees/src/buyback.rs#L62)

## lib:initialize_fee_config:121

[Source programs/pump-fees/src/lib.rs:121-132](inputs/programs/pump-fees/src/lib.rs#L121)

Accounts: InitializeFeeConfig

**authorization_accounts**: Fixed 8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8 signer funds canonical fee_config namespace PDA; typed System target.

**dynamic_accounts_layout**: No remaining accounts consumed; account order and types are fixed by the linked context.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: Only bump/admin assigned; zero-initialized flat/exotic fees and empty tier vectors result. No fee validation runs.

**lifecycle_rent**: init allocates 2512 bytes once; repeat initialization fails. Serialized zero config fits.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: An admin must populate both desired tier vectors and extend before stable use; initialized is not quote-ready.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Empty-tier quote reachability is a candidate availability concern (F1); captured-original equivalence and intended initialization sequence unproved.

Evidence: [programs/pump-fees/src/lib.rs:121-132](inputs/programs/pump-fees/src/lib.rs#L121), [programs/pump-fees/src/contexts.rs:34-45](inputs/programs/pump-fees/src/contexts.rs#L34), [programs/pump-fees/src/types.rs:37-79](inputs/programs/pump-fees/src/types.rs#L37)

## lib:initialize_fee_program_global:135

[Source programs/pump-fees/src/lib.rs:135-149](inputs/programs/pump-fees/src/lib.rs#L135)

Accounts: InitializeFeeProgramGlobal

**authorization_accounts**: Mutable authority signer must match Pump Global.authority; Pump-owned discriminator-checked inline Account<Global> is canonical global PDA under Pump ID. No first-caller capture of Fees global without that role.

**dynamic_accounts_layout**: No remaining accounts consumed; account order and types are fixed by the linked context.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: claim_rate_limit u64 and disable_flags u8 copied without bounds.

**lifecycle_rent**: Canonical fee-program-global init allocates 338 bytes (8+1+32+1+32+8+256); payer authority. No reinitialization.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Stores supplied social_claim_authority, including zero; role is independently replaceable by global authority.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Inline field review is of frozen contexts.rs, not the uncommitted state-module trial. Historical Global codec compatibility beyond retained IDL and finite receipts remains open.

Evidence: [programs/pump-fees/src/lib.rs:135-149](inputs/programs/pump-fees/src/lib.rs#L135), [programs/pump-fees/src/contexts.rs:47-58](inputs/programs/pump-fees/src/contexts.rs#L47), [programs/pump-fees/src/pump_global.rs:1-4](inputs/programs/pump-fees/src/pump_global.rs#L1), [programs/pump-fees/src/types.rs:81-90](inputs/programs/pump-fees/src/types.rs#L81)

## lib:revoke_fee_sharing_authority:152

[Source programs/pump-fees/src/lib.rs:152-154](inputs/programs/pump-fees/src/lib.rs#L152)

Accounts: RevokeFeeSharingAuthority

**authorization_accounts**: Empty Accounts contexts; no authorization is needed to fail.

**dynamic_accounts_layout**: No account data read, no dynamic accounts consumed.

**cpi_events**: No event, CPI, state or value movement.

**arithmetic**: Not applicable: unconditional DeprecatedInstruction.

**lifecycle_rent**: No lifecycle effects.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Rejected dispatches, not working revoke/transfer functionality.

**errors_order_rollback**: Always error after instruction decoding; no handler side effects.

**unclosed**: 

Evidence: [programs/pump-fees/src/lib.rs:152-154](inputs/programs/pump-fees/src/lib.rs#L152), [programs/pump-fees/src/lib.rs:221-223](inputs/programs/pump-fees/src/lib.rs#L221), [programs/pump-fees/src/contexts.rs:60-61](inputs/programs/pump-fees/src/contexts.rs#L60), [programs/pump-fees/src/contexts.rs:116-117](inputs/programs/pump-fees/src/contexts.rs#L116)

## lib:set_authority:157

[Source programs/pump-fees/src/lib.rs:157-165](inputs/programs/pump-fees/src/lib.rs#L157)

Accounts: SetAuthority

**authorization_accounts**: Signer authority must equal FeeProgramGlobal.authority; writable Fees-owned typed global PDA fee-program-global with stored bump. Other global setters share this role.

**dynamic_accounts_layout**: No remaining accounts consumed; account order and types are fixed by the linked context.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: Rejects default Pubkey, no arithmetic.

**lifecycle_rent**: No allocation or transfers.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: One-step role replacement; no new-authority consent, so authorized misconfiguration can lock access. Old/new keys emitted.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Possession/recoverability of new authority is operational, not enforced.

Evidence: [programs/pump-fees/src/lib.rs:157-165](inputs/programs/pump-fees/src/lib.rs#L157), [programs/pump-fees/src/contexts.rs:63-71](inputs/programs/pump-fees/src/contexts.rs#L63)

## lib:set_claim_rate_limit:168

[Source programs/pump-fees/src/lib.rs:168-174](inputs/programs/pump-fees/src/lib.rs#L168)

Accounts: SetClaimRateLimit

**authorization_accounts**: Signer authority must equal FeeProgramGlobal.authority; writable Fees-owned typed global PDA fee-program-global with stored bump. Other global setters share this role.

**dynamic_accounts_layout**: No remaining accounts consumed; account order and types are fixed by the linked context.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: Any u64 accepted, including zero and very large limits.

**lifecycle_rent**: No allocation or transfers.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Changes shared social SOL/token cooldown; zero permits immediate repeat claims when balances arrive.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Clock cast and cooldown edge policy are tracked on social handlers.

Evidence: [programs/pump-fees/src/lib.rs:168-174](inputs/programs/pump-fees/src/lib.rs#L168), [programs/pump-fees/src/contexts.rs:73-81](inputs/programs/pump-fees/src/contexts.rs#L73)

## lib:set_disable_flags:177

[Source programs/pump-fees/src/lib.rs:177-183](inputs/programs/pump-fees/src/lib.rs#L177)

Accounts: SetDisableFlags

**authorization_accounts**: Signer authority must equal FeeProgramGlobal.authority; writable Fees-owned typed global PDA fee-program-global with stored bump. Other global setters share this role.

**dynamic_accounts_layout**: No remaining accounts consumed; account order and types are fixed by the linked context.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: Any u8 accepted; bits 1/2/4/8 control social-create/social-claim/donation-create/donation-crank. Upper bits unused here.

**lifecycle_rent**: No allocation or transfers.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Does not pause buyback, referral or sharing paths; this is actual scoped behavior, not a program-wide circuit breaker.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: No evidence of a promised program-wide pause; broader policy is not inferred.

Evidence: [programs/pump-fees/src/lib.rs:177-183](inputs/programs/pump-fees/src/lib.rs#L177), [programs/pump-fees/src/contexts.rs:83-91](inputs/programs/pump-fees/src/contexts.rs#L83)

## lib:set_exotic_flat_fees:186

[Source programs/pump-fees/src/lib.rs:186-204](inputs/programs/pump-fees/src/lib.rs#L186)

Accounts: SetExoticFlatFees

**authorization_accounts**: Signer admin must equal FeeConfig.admin; writable Fees-owned discriminator-checked FeeConfig PDA uses fee_config + config_program_id + stored bump. Namespace key need not be executable or one of Pump/AMM. No outsider write path follows from namespace freedom.

**dynamic_accounts_layout**: No remaining accounts consumed; account order and types are fixed by the linked context.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates. System transfer uses admin as payer and FeeConfig destination.

**arithmetic**: Three u64 values checked-summed <=10000; overflow aborts. Rent top-up uses minimum(4097).saturating_sub(actual_lamports).

**lifecycle_rent**: Reallocates to 4097 with zeroing only when short. At 50+50 tiers size=4097 exactly.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: All-zero exotic fees make get_fees_with_quote_mint fall back to flat fees; cannot independently express exotic zero-fee override when flat is nonzero.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Zero override behavior is intentional-looking routing, not established economic vulnerability.

Evidence: [programs/pump-fees/src/lib.rs:186-204](inputs/programs/pump-fees/src/lib.rs#L186), [programs/pump-fees/src/contexts.rs:93-104](inputs/programs/pump-fees/src/contexts.rs#L93), [programs/pump-fees/src/types.rs:65-76](inputs/programs/pump-fees/src/types.rs#L65)

## lib:set_social_claim_authority:207

[Source programs/pump-fees/src/lib.rs:207-213](inputs/programs/pump-fees/src/lib.rs#L207)

Accounts: SetSocialClaimAuthority

**authorization_accounts**: Signer authority must equal FeeProgramGlobal.authority; writable Fees-owned typed global PDA fee-program-global with stored bump. Other global setters share this role.

**dynamic_accounts_layout**: No remaining accounts consumed; account order and types are fixed by the linked context.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: Pubkey copied without zero guard.

**lifecycle_rent**: No allocation or transfers.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Single-step transfer can disable claims if next key cannot sign; globally authorized.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: No separate user proof or recipient binding in social claim; configured authority is trusted.

Evidence: [programs/pump-fees/src/lib.rs:207-213](inputs/programs/pump-fees/src/lib.rs#L207), [programs/pump-fees/src/contexts.rs:106-114](inputs/programs/pump-fees/src/contexts.rs#L106)

## lib:sweep_buyback:216

[Source programs/pump-fees/src/lib.rs:216-218](inputs/programs/pump-fees/src/lib.rs#L216)

Accounts: SweepBuyback

**authorization_accounts**: Mutable authority signer must equal vault.authority; canonical index PDA; arbitrary mutable destination; both ATAs canonical and token-program-bound; fixed System/ATA.

**dynamic_accounts_layout**: index<8. No dynamic accounts or explicit destination!=vault guard.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates. transfer_checked signed by buyback-vault,index,bump; whole token amount then direct SOL move.

**arithmetic**: now-last_claimed is plain signed subtraction; strict >rate unless rate0. Checked counters abort on overflow; SOL above actual data-length rent. Destination alias with vault can make SOL debit/credit net zero while counter/time advance; requires authorized signer.

**lifecycle_rent**: No close; both ATAs must exist. Successful zero sweep can advance time if transfer0 succeeds.

**token_assets**: TokenInterface accepts both families; native mint increments token1, every other mint token2. Gross units combined across unrelated mints; no reload for net credit.

**state_time_configuration**: No global disable flag check; last_claimed shared across tokens and SOL.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement. Transfer happens before counter overflow check; all must roll back together.

**unclosed**: F4 metrics/alias and signed-clock boundary policy; Token2022 extensions and actual destination credit unresolved.

Evidence: [programs/pump-fees/src/buyback.rs:8-21](inputs/programs/pump-fees/src/buyback.rs#L8), [programs/pump-fees/src/buyback.rs:46-65](inputs/programs/pump-fees/src/buyback.rs#L46)

## lib:transfer_fee_sharing_authority:221

[Source programs/pump-fees/src/lib.rs:221-223](inputs/programs/pump-fees/src/lib.rs#L221)

Accounts: TransferFeeSharingAuthority

**authorization_accounts**: Empty Accounts contexts; no authorization is needed to fail.

**dynamic_accounts_layout**: No account data read, no dynamic accounts consumed.

**cpi_events**: No event, CPI, state or value movement.

**arithmetic**: Not applicable: unconditional DeprecatedInstruction.

**lifecycle_rent**: No lifecycle effects.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Rejected dispatches, not working revoke/transfer functionality.

**errors_order_rollback**: Always error after instruction decoding; no handler side effects.

**unclosed**: 

Evidence: [programs/pump-fees/src/lib.rs:152-154](inputs/programs/pump-fees/src/lib.rs#L152), [programs/pump-fees/src/lib.rs:221-223](inputs/programs/pump-fees/src/lib.rs#L221), [programs/pump-fees/src/contexts.rs:60-61](inputs/programs/pump-fees/src/contexts.rs#L60), [programs/pump-fees/src/contexts.rs:116-117](inputs/programs/pump-fees/src/contexts.rs#L116)

## lib:update_admin:226

[Source programs/pump-fees/src/lib.rs:226-231](inputs/programs/pump-fees/src/lib.rs#L226)

Accounts: UpdateAdmin

**authorization_accounts**: Signer admin must equal FeeConfig.admin; writable Fees-owned discriminator-checked FeeConfig PDA uses fee_config + config_program_id + stored bump. Namespace key need not be executable or one of Pump/AMM. No outsider write path follows from namespace freedom.

**dynamic_accounts_layout**: new_admin is raw AccountInfo; neither signer nor nonzero restriction. Its key alone becomes authority.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: No amount arithmetic.

**lifecycle_rent**: No allocation or transfers.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Old admin alone authorizes one-step replacement; zero/nonsigner keys intentionally accepted by candidate.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Cannot classify authorized irreversible admin choice as unauthorized takeover. Historical error ordering requires bounded receipt applicability.

Evidence: [programs/pump-fees/src/lib.rs:226-231](inputs/programs/pump-fees/src/lib.rs#L226), [programs/pump-fees/src/contexts.rs:119-131](inputs/programs/pump-fees/src/contexts.rs#L119)

## lib:update_buyback_authority:234

[Source programs/pump-fees/src/lib.rs:234-236](inputs/programs/pump-fees/src/lib.rs#L234)

Accounts: UpdateBuyback

**authorization_accounts**: Global authority signer has_one gate on typed global PDA; typed mutable canonical indexed vault. Vault current authority need not consent.

**dynamic_accounts_layout**: index<8; no dynamic accounts.

**cpi_events**: No event or CPI in body; event accounts are present but unused.

**arithmetic**: Authority accepts zero; signed i64 rate accepts negative, zero, positive.

**lifecycle_rent**: No transfers or allocation.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Global role can reset per-vault recipient authority or cooldown; no two-step acceptance.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Negative/huge cooldown effects are privileged configuration, not proven unauthorized bypass.

Evidence: [programs/pump-fees/src/buyback.rs:6-7](inputs/programs/pump-fees/src/buyback.rs#L6), [programs/pump-fees/src/buyback.rs:35-45](inputs/programs/pump-fees/src/buyback.rs#L35)

## lib:update_buyback_claim_rate_limit:239

[Source programs/pump-fees/src/lib.rs:239-241](inputs/programs/pump-fees/src/lib.rs#L239)

Accounts: UpdateBuyback

**authorization_accounts**: Global authority signer has_one gate on typed global PDA; typed mutable canonical indexed vault. Vault current authority need not consent.

**dynamic_accounts_layout**: index<8; no dynamic accounts.

**cpi_events**: No event or CPI in body; event accounts are present but unused.

**arithmetic**: Authority accepts zero; signed i64 rate accepts negative, zero, positive.

**lifecycle_rent**: No transfers or allocation.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Global role can reset per-vault recipient authority or cooldown; no two-step acceptance.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Negative/huge cooldown effects are privileged configuration, not proven unauthorized bypass.

Evidence: [programs/pump-fees/src/buyback.rs:6-7](inputs/programs/pump-fees/src/buyback.rs#L6), [programs/pump-fees/src/buyback.rs:35-45](inputs/programs/pump-fees/src/buyback.rs#L35)

## lib:update_fee_config:244

[Source programs/pump-fees/src/lib.rs:244-252](inputs/programs/pump-fees/src/lib.rs#L244)

Accounts: UpdateFeeConfig

**authorization_accounts**: Signer admin must equal FeeConfig.admin; writable Fees-owned discriminator-checked FeeConfig PDA uses fee_config + config_program_id + stored bump. Namespace key need not be executable or one of Pump/AMM. No outsider write path follows from namespace freedom.

**dynamic_accounts_layout**: No remaining accounts consumed; account order and types are fixed by the linked context.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: flat sum checked_add then unwrap; overflow aborts, sum >10000 errors. 1..50 tiers, each fee sum <=10000, strict ascending u128 thresholds.

**lifecycle_rent**: Replaces normal vector/flat only; no realloc. Full serialization is 97+40*(normal+stable) bytes and can exceed 2512 despite separate vector bounds.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Stable/exotic fields retained in decoded state, subject to length-gated decoder.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement. Validation precedes mutation; exit failure can occur after event logs.

**unclosed**: Combined storage capacity at short lengths and decoder gating (F2) are explicit; no successful over-capacity write claimed.

Evidence: [programs/pump-fees/src/lib.rs:244-252](inputs/programs/pump-fees/src/lib.rs#L244), [programs/pump-fees/src/lib.rs:391-417](inputs/programs/pump-fees/src/lib.rs#L391), [programs/pump-fees/src/contexts.rs:133-142](inputs/programs/pump-fees/src/contexts.rs#L133), [programs/pump-fees/src/types.rs:50-79](inputs/programs/pump-fees/src/types.rs#L50)

## lib:update_fee_shares:255

[Source programs/pump-fees/src/lib.rs:255-257](inputs/programs/pump-fees/src/lib.rs#L255)

Accounts: UpdateFeeShares

**authorization_accounts**: Signer authority==sharing.admin, !revoked, Active; version!=1; typed canonical mint-bound sharing/curve/global. Fixed Pump/AMM/ATA/System IDs; canonical creator vaults and ATAs.

**dynamic_accounts_layout**: Remaining count>=old shareholders*n; first N keys equal old shareholder addresses. For token branch second N ATA keys deferred to Pump; surplus accounts forwarded with their writable/signer flags.

**cpi_events**: Optional AMM transfer when graduated and ATA non-system/nonzero; Pump distribution always called before validating/installing new shares. New shares not serialized for CPI. v2 Pump data has trailing1 (initialize ATA). emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: New1..10 unique nonzero shares, checked u16 sum exactly10000; malformed sum overflow errors. Old balances distributed by dependency floor(available*bps/10000); dust and ineligible native transfers can remain.

**lifecycle_rent**: No realloc/close; successful update revokes admin. Old dust can subsequently belong to new shares; does not prove complete settlement.

**token_assets**: Legacy requires wSOL/legacy token. v2 reads curve bytes83..115, defaults absent/zero to wSOL; quote equality enforced. Interface quote/program, dependency handles token accounts.

**state_time_configuration**: No version change; version1 permanently rejects ordinary update, version2 can update once until privileged reset.

**errors_order_rollback**: New shares validation follows CPI; failure relies on transaction rollback of distribution. Return value from distribution is ignored; successful zero distribution does not block update.

**unclosed**: F5 accrued-fee redistribution if dependency returns success without full distribution; exact captured dependency behavior and material balances require evidence. No exploit/probe performed.

Evidence: [programs/pump-fees/src/sharing_update.rs:8-114](inputs/programs/pump-fees/src/sharing_update.rs#L8)

## lib:update_fee_shares_v2:260

[Source programs/pump-fees/src/lib.rs:260-262](inputs/programs/pump-fees/src/lib.rs#L260)

Accounts: UpdateFeeSharesV2

**authorization_accounts**: Signer authority==sharing.admin, !revoked, Active; version!=1; typed canonical mint-bound sharing/curve/global. Fixed Pump/AMM/ATA/System IDs; canonical creator vaults and ATAs.

**dynamic_accounts_layout**: Remaining count>=old shareholders*n; first N keys equal old shareholder addresses. For token branch second N ATA keys deferred to Pump; surplus accounts forwarded with their writable/signer flags.

**cpi_events**: Optional AMM transfer when graduated and ATA non-system/nonzero; Pump distribution always called before validating/installing new shares. New shares not serialized for CPI. v2 Pump data has trailing1 (initialize ATA). emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: New1..10 unique nonzero shares, checked u16 sum exactly10000; malformed sum overflow errors. Old balances distributed by dependency floor(available*bps/10000); dust and ineligible native transfers can remain.

**lifecycle_rent**: No realloc/close; successful update revokes admin. Old dust can subsequently belong to new shares; does not prove complete settlement.

**token_assets**: Legacy requires wSOL/legacy token. v2 reads curve bytes83..115, defaults absent/zero to wSOL; quote equality enforced. Interface quote/program, dependency handles token accounts.

**state_time_configuration**: No version change; version1 permanently rejects ordinary update, version2 can update once until privileged reset.

**errors_order_rollback**: New shares validation follows CPI; failure relies on transaction rollback of distribution. Return value from distribution is ignored; successful zero distribution does not block update.

**unclosed**: F5 accrued-fee redistribution if dependency returns success without full distribution; exact captured dependency behavior and material balances require evidence. No exploit/probe performed.

Evidence: [programs/pump-fees/src/sharing_update.rs:8-114](inputs/programs/pump-fees/src/sharing_update.rs#L8)

## lib:update_stable_fee_config:265

[Source programs/pump-fees/src/lib.rs:265-272](inputs/programs/pump-fees/src/lib.rs#L265)

Accounts: UpdateStableFeeConfig

**authorization_accounts**: Signer admin must equal FeeConfig.admin; writable Fees-owned discriminator-checked FeeConfig PDA uses fee_config + config_program_id + stored bump. Namespace key need not be executable or one of Pump/AMM. No outsider write path follows from namespace freedom.

**dynamic_accounts_layout**: No remaining accounts consumed; account order and types are fixed by the linked context.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: Validates 1..50 strictly increasing tiers, checked fee totals <=10000.

**lifecycle_rent**: No resize: on 2512-byte config a small write fits but next decode suppresses stable tiers below 4073.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Stable vector replaced, flat left unchanged and included in event.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: F2 candidate round-trip inconsistency requires parent review; no original vulnerability claim.

Evidence: [programs/pump-fees/src/lib.rs:265-272](inputs/programs/pump-fees/src/lib.rs#L265), [programs/pump-fees/src/contexts.rs:144-153](inputs/programs/pump-fees/src/contexts.rs#L144), [programs/pump-fees/src/types.rs:65-76](inputs/programs/pump-fees/src/types.rs#L65)

## lib:upsert_fee_tiers:275

[Source programs/pump-fees/src/lib.rs:275-280](inputs/programs/pump-fees/src/lib.rs#L275)

Accounts: UpsertFeeTiers

**authorization_accounts**: Signer admin must equal FeeConfig.admin; writable Fees-owned discriminator-checked FeeConfig PDA uses fee_config + config_program_id + stored bump. Namespace key need not be executable or one of Pump/AMM. No outsider write path follows from namespace freedom.

**dynamic_accounts_layout**: No remaining accounts consumed; account order and types are fixed by the linked context.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: Incoming nonempty; offset<=current.len; resulting len<=50; overwrite/append then validate whole vector, including boundary ordering and fee sums. offset u8, bounded vector growth; no truncation.

**lifecycle_rent**: No resize; resulting combined serialized size still must fit. Stable vector can be discarded by short-account decoder.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Mutation before final validation remains local until successful exit; offset cannot create gaps.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Stable upsert shares F2; source-level validation closes ordering, not historical ABI or storage compatibility.

Evidence: [programs/pump-fees/src/lib.rs:275-288](inputs/programs/pump-fees/src/lib.rs#L275), [programs/pump-fees/src/lib.rs:405-417](inputs/programs/pump-fees/src/lib.rs#L405), [programs/pump-fees/src/contexts.rs:155-174](inputs/programs/pump-fees/src/contexts.rs#L155)

## lib:upsert_stable_fee_tiers:283

[Source programs/pump-fees/src/lib.rs:283-288](inputs/programs/pump-fees/src/lib.rs#L283)

Accounts: UpsertStableFeeTiers

**authorization_accounts**: Signer admin must equal FeeConfig.admin; writable Fees-owned discriminator-checked FeeConfig PDA uses fee_config + config_program_id + stored bump. Namespace key need not be executable or one of Pump/AMM. No outsider write path follows from namespace freedom.

**dynamic_accounts_layout**: No remaining accounts consumed; account order and types are fixed by the linked context.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: Incoming nonempty; offset<=current.len; resulting len<=50; overwrite/append then validate whole vector, including boundary ordering and fee sums. offset u8, bounded vector growth; no truncation.

**lifecycle_rent**: No resize; resulting combined serialized size still must fit. Stable vector can be discarded by short-account decoder.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: Mutation before final validation remains local until successful exit; offset cannot create gaps.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Stable upsert shares F2; source-level validation closes ordering, not historical ABI or storage compatibility.

Evidence: [programs/pump-fees/src/lib.rs:275-288](inputs/programs/pump-fees/src/lib.rs#L275), [programs/pump-fees/src/lib.rs:405-417](inputs/programs/pump-fees/src/lib.rs#L405), [programs/pump-fees/src/contexts.rs:155-174](inputs/programs/pump-fees/src/contexts.rs#L155)

## lib:withdraw:291

[Source programs/pump-fees/src/lib.rs:291-293](inputs/programs/pump-fees/src/lib.rs#L291)

Accounts: Withdraw

**authorization_accounts**: Mutable user signer selects canonical referral-vault(user) SystemAccount; any token source must have authority=vault, mint=quote, owner=selected token program; destination authority=user and same mint/program.

**dynamic_accounts_layout**: quote/vaultATA/userATA/tokenProgram are Options; provided quote requires other three. Token constraints can reject inconsistent option sets before handler. Names ATA do not require associated addresses.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates. Native system transfer signed referral-vault,user,bump; token transfer_checked uses same authority seeds.

**arithmetic**: Native available=lamports-minimum0 saturating; token whole balance; amount0 errors. No lifetime counters.

**lifecycle_rent**: Leaves minimum0 native rent; token account rent stays; no account close.

**token_assets**: Both TokenInterface programs; destination need not canonical ATA but must be user-owned token account. No extra hook accounts.

**state_time_configuration**: No global pause or cooldown; user can reclaim only own referral namespace.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: System transfer requires valid empty-data source under runtime; Token2022 extension credit semantics unclosed.

Evidence: [programs/pump-fees/src/withdrawal.rs:5-38](inputs/programs/pump-fees/src/withdrawal.rs#L5)

## lib:select_fee_tier:303

[Source programs/pump-fees/src/lib.rs:303-309](inputs/programs/pump-fees/src/lib.rs#L303)

**conclusion**: Requires nonempty tier slice; first-index panic on empty, reverse scan selects greatest satisfied threshold, no multiplication/division. Sorting is guaranteed only by successful setter validation; initialized vectors are empty. F1.

## lib:validate_fees:392

[Source programs/pump-fees/src/lib.rs:392-398](inputs/programs/pump-fees/src/lib.rs#L392)

**conclusion**: checked additions with unwrap intentionally abort on overflow before <=10000 check. A successful call proves total bounds and each nonnegative u64 component<=10000; no partial state mutation.

## lib:validate_tiers:399

[Source programs/pump-fees/src/lib.rs:399-405](inputs/programs/pump-fees/src/lib.rs#L399)

**conclusion**: Rejects empty/>50; validates every sum; strict windows threshold ordering prohibits duplicate thresholds. Does not prove serialized capacity or market-cap unit correctness.

## lib:upsert_tiers:407

[Source programs/pump-fees/src/lib.rs:407-417](inputs/programs/pump-fees/src/lib.rs#L407)

**conclusion**: Validates nonempty, continuous offset and final<=50 before writes; then validates entire mutated vector. Caller owns transaction rollback on error. No source of arbitrary gap/tier deletion.

## sharing:id:9

[Source programs/pump-fees/src/sharing.rs:9-9](inputs/programs/pump-fees/src/sharing.rs#L9)

**conclusion**: Pump/Amm Id implementations are fixed constants PUMP/AMM, making typed Program key/executable checks meaningful; no variable CPI target.

## sharing:id:10

[Source programs/pump-fees/src/sharing.rs:10-10](inputs/programs/pump-fees/src/sharing.rs#L10)

**conclusion**: Pump/Amm Id implementations are fixed constants PUMP/AMM, making typed Program key/executable checks meaningful; no variable CPI target.

## sharing:create_sharing:11

[Source programs/pump-fees/src/sharing.rs:11-35](inputs/programs/pump-fees/src/sharing.rs#L11)

**authorization_accounts**: Payer signer authorized as current curve.creator or validated graduated pool.coin_creator; typed canonical Pump global/curve and mint; own canonical init_if_needed sharing config. Optional pool requires AMM-owned typed decoder and full pool PDA checks on graduated branch.

**dynamic_accounts_layout**: Graduated means real_token_reserves==0, not complete flag. Existing version nonzero returns no-op; graduated requires pool + AMM program/event.

**cpi_events**: Explicit state.exit before Pump extend/migrate CPI exposes curve-creator admin and10000 share; then state.exit with selected pool creator before AMM extend/migrate. Fixed typed program IDs, no signer seeds manufactured; payer privileges forwarded. emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: One shareholder at10000; no transfer arithmetic locally.

**lifecycle_rent**: Alloc1024; state version2 Active !revoked; downstream extend funds curve/pool rent with payer. No close.

**token_assets**: Mint interface identity only; no local token transfer.

**state_time_configuration**: Two interim serialized configurations are deliberate to satisfy distinct curve/pool creator checks. Foreign Account exit does not overwrite CPI changes because owner differs from Fees.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement. Any later AMM failure must revert earlier Pump creator migration and sharing creation.

**unclosed**: Selected dependency source supports CPI relationships but is candidate code, not closure of captured originals. Migration helper holder/unswept-fee guards and historical layout compatibility remain external obligations.

Evidence: [programs/pump-fees/src/sharing.rs:11-61](inputs/programs/pump-fees/src/sharing.rs#L11)

## sharing:call:36

[Source programs/pump-fees/src/sharing.rs:36-36](inputs/programs/pump-fees/src/sharing.rs#L36)

**conclusion**: Constructs metas by zipping infos with flags. All current callsites manually checked: 5/5 Pump extend,5/5 migrate,5/5 AMM extend,4/4 migrate. No signer seeds, fixed caller-supplied constant target. Future mismatched lengths would silently omit metas; no current mismatch.

## sharing_admin:admin_cto_sharing_config:6

[Source programs/pump-fees/src/sharing_admin.rs:6-16](inputs/programs/pump-fees/src/sharing_admin.rs#L6)

**authorization_accounts**: Requires BOTH Pump-derived pool-authority(mint) signer and external authority signer equal Pump global.admin_set_creator_authority; canonical Pump global and Fees sharing PDA+has_one mint. An ordinary wallet cannot sign foreign PDA.

**dynamic_accounts_layout**: Option<Pubkey>: None clears, Some accepts any key including zero; typed mint and state. Fixed self program key.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: One10000-share or empty vector; no asset transfer.

**lifecycle_rent**: No resize/close; previous shareholders cloned to event; reset version2.

**token_assets**: No fee settlement or token transfer occurs before reset.

**state_time_configuration**: Some=>Active,!revoked; None=>Paused,revoked,zero admin,no shares. New admin can update again after reset; balances are not locally settled.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: Caller must ensure accrued-fee policy before reset. Reachability through exact captured Pump caller and all upstream guards not exhaustively proved; no outsider reset identified.

Evidence: [programs/pump-fees/src/sharing_admin.rs:6-30](inputs/programs/pump-fees/src/sharing_admin.rs#L6)

## sharing_update:update_fee_shares:8

[Source programs/pump-fees/src/sharing_update.rs:8-19](inputs/programs/pump-fees/src/sharing_update.rs#L8)

**authorization_accounts**: Signer authority==sharing.admin, !revoked, Active; version!=1; typed canonical mint-bound sharing/curve/global. Fixed Pump/AMM/ATA/System IDs; canonical creator vaults and ATAs.

**dynamic_accounts_layout**: Remaining count>=old shareholders*n; first N keys equal old shareholder addresses. For token branch second N ATA keys deferred to Pump; surplus accounts forwarded with their writable/signer flags.

**cpi_events**: Optional AMM transfer when graduated and ATA non-system/nonzero; Pump distribution always called before validating/installing new shares. New shares not serialized for CPI. v2 Pump data has trailing1 (initialize ATA). emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: New1..10 unique nonzero shares, checked u16 sum exactly10000; malformed sum overflow errors. Old balances distributed by dependency floor(available*bps/10000); dust and ineligible native transfers can remain.

**lifecycle_rent**: No realloc/close; successful update revokes admin. Old dust can subsequently belong to new shares; does not prove complete settlement.

**token_assets**: Legacy requires wSOL/legacy token. v2 reads curve bytes83..115, defaults absent/zero to wSOL; quote equality enforced. Interface quote/program, dependency handles token accounts.

**state_time_configuration**: No version change; version1 permanently rejects ordinary update, version2 can update once until privileged reset.

**errors_order_rollback**: New shares validation follows CPI; failure relies on transaction rollback of distribution. Return value from distribution is ignored; successful zero distribution does not block update.

**unclosed**: F5 accrued-fee redistribution if dependency returns success without full distribution; exact captured dependency behavior and material balances require evidence. No exploit/probe performed.

Evidence: [programs/pump-fees/src/sharing_update.rs:8-114](inputs/programs/pump-fees/src/sharing_update.rs#L8)

## sharing_update:update_fee_shares_v2:20

[Source programs/pump-fees/src/sharing_update.rs:20-36](inputs/programs/pump-fees/src/sharing_update.rs#L20)

**authorization_accounts**: Signer authority==sharing.admin, !revoked, Active; version!=1; typed canonical mint-bound sharing/curve/global. Fixed Pump/AMM/ATA/System IDs; canonical creator vaults and ATAs.

**dynamic_accounts_layout**: Remaining count>=old shareholders*n; first N keys equal old shareholder addresses. For token branch second N ATA keys deferred to Pump; surplus accounts forwarded with their writable/signer flags.

**cpi_events**: Optional AMM transfer when graduated and ATA non-system/nonzero; Pump distribution always called before validating/installing new shares. New shares not serialized for CPI. v2 Pump data has trailing1 (initialize ATA). emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: New1..10 unique nonzero shares, checked u16 sum exactly10000; malformed sum overflow errors. Old balances distributed by dependency floor(available*bps/10000); dust and ineligible native transfers can remain.

**lifecycle_rent**: No realloc/close; successful update revokes admin. Old dust can subsequently belong to new shares; does not prove complete settlement.

**token_assets**: Legacy requires wSOL/legacy token. v2 reads curve bytes83..115, defaults absent/zero to wSOL; quote equality enforced. Interface quote/program, dependency handles token accounts.

**state_time_configuration**: No version change; version1 permanently rejects ordinary update, version2 can update once until privileged reset.

**errors_order_rollback**: New shares validation follows CPI; failure relies on transaction rollback of distribution. Return value from distribution is ignored; successful zero distribution does not block update.

**unclosed**: F5 accrued-fee redistribution if dependency returns success without full distribution; exact captured dependency behavior and material balances require evidence. No exploit/probe performed.

Evidence: [programs/pump-fees/src/sharing_update.rs:8-114](inputs/programs/pump-fees/src/sharing_update.rs#L8)

## sharing_update:authorize:38

[Source programs/pump-fees/src/sharing_update.rs:38-42](inputs/programs/pump-fees/src/sharing_update.rs#L38)

**conclusion**: Exact signer key match, not revoked and Active; no authority delegation by shareholder membership. Version checked by callers before helper.

## sharing_update:validate_remaining:43

[Source programs/pump-fees/src/sharing_update.rs:43-46](inputs/programs/pump-fees/src/sharing_update.rs#L43)

**conclusion**: Minimum N*stride; indexes first N recipients, not interleaved stride. Correct for retained Pump candidate grouped recipients then ATAs. No writable/ATA/owner checks here; dependencies handle them. Stored N bounded by reachable writes (1 or<=10).

## sharing_update:validate_shares:47

[Source programs/pump-fees/src/sharing_update.rs:47-52](inputs/programs/pump-fees/src/sharing_update.rs#L47)

**conclusion**: 1..10, each>0, checked u16 accumulation, no duplicate pubkeys, sum exactly10000. Zero/executable/PDA addresses not rejected; future distribution may fail for an executable recipient. Caller deliberately permits such choices; no outsider bypass.

## sharing_update:call:53

[Source programs/pump-fees/src/sharing_update.rs:53-56](inputs/programs/pump-fees/src/sharing_update.rs#L53)

**conclusion**: All callsites flags lengths agree (10,7,12,12). Appends every remaining meta retaining actual signer/writable; cannot create signer privilege. Fixed Pump/AMM target. No return decoding or post-CPI balance check.

## social:claim_v2:5

[Source programs/pump-fees/src/social.rs:5-34](inputs/programs/pump-fees/src/social.rs#L5)

**authorization_accounts**: Same social role/PDA gate; mutable Interface mint; source/destination canonical ATAs derived under fixed ATA program using selected TokenInterface ID. No recipient signer.

**dynamic_accounts_layout**: Native branch still requires mint/ATA address context. token_amount checks live lamports, token-family owner, decoding, mint; token-account authority delegated to CPI/canonical ATA. social_claim_authority lacks mut annotation despite optional ATA funding.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates. Non-native optional ATA create then signed transfer_checked from social PDA using stored user_id/platform/bump. Native branch directly moves SOL.

**arithmetic**: Shared timestamp/cooldown as v1. Native min179; token amount is whole source; counters saturate; token event after=before.saturating_add(amount), not observed credit.

**lifecycle_rent**: ATA creation can occur before amount==0 returns None; successful no-claim transaction may still fund ATA. No close/realloc.

**token_assets**: Token and Token2022 interface accepted; mint-owner/program consistency and extensions ultimately handled by token CPI; no remaining hook accounts passed. Native mint selects raw SOL, not ATA wSOL transfer. No explicit recipient!=social PDA or token source!=destination guard; an authorized self-transfer needs token-processor semantics to assess counter fidelity, so net payout is not proven by successful CPI.

**state_time_configuration**: Shared last_claimed throttles every quote; non-native amounts of different mints/decimals accumulate in total_stable_claimed.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: F3 payer mutability; F4 transfer-fee/net-credit and cross-mint metric semantics; extension support not fully reviewed.

Evidence: [programs/pump-fees/src/social.rs:5-34](inputs/programs/pump-fees/src/social.rs#L5), [programs/pump-fees/src/social.rs:92-119](inputs/programs/pump-fees/src/social.rs#L92)

## social:create_social:36

[Source programs/pump-fees/src/social.rs:36-45](inputs/programs/pump-fees/src/social.rs#L36)

**authorization_accounts**: Any mutable payer signer may fund canonical social-fee-pda + user_id + platform PDA; global typed PDA; fixed System program. No identity proof needed to reserve this deterministic escrow.

**dynamic_accounts_layout**: String byte length <=20 in body; seeds validation may reject >32 before handler. Account version nonzero returns unchanged; platform any u8.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: No fee amount arithmetic; initializes counters to zero.

**lifecycle_rent**: init_if_needed space179 =8+1+1+4+20+1+24+120. Existing account exact space/owner/rent enforced by macro; handler preserves nonzero-version state.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: disable bit1 blocks; version1 initialization fixes user ID/platform and reserved bytes.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement. Initialization macro CPIs precede body disable/length checks; rejection rolls back.

**unclosed**: Social identity-to-recipient ownership is deliberately delegated to claim signer, not proven by creation.

Evidence: [programs/pump-fees/src/social.rs:36-44](inputs/programs/pump-fees/src/social.rs#L36), [programs/pump-fees/src/social.rs:58-73](inputs/programs/pump-fees/src/social.rs#L58)

## social:claim:45

[Source programs/pump-fees/src/social.rs:45-57](inputs/programs/pump-fees/src/social.rs#L45)

**authorization_accounts**: Global has_one social_claim_authority signer. Typed mutable social PDA bound to requested user_id/platform+stored bump. Arbitrary writable recipient chosen by authority; no recipient signer or ID ownership binding.

**dynamic_accounts_layout**: Stored user_id/platform used for event; request seeds select state, but no explicit equality with stored fields. Reachable create writes matching fields.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates.

**arithmetic**: now=i64 timestamp as u64; saturating elapsed; zero last_claimed bypasses cooldown; negative timestamp casts large. Amount=balance-minimum179 saturating; counters saturate.

**lifecycle_rent**: Moves only above hard-coded179-byte rent; executable recipient or zero amount returns None. Simultaneous mutable borrows reject source==recipient. No close.

**token_assets**: No token balances are read or moved by this body.

**state_time_configuration**: disable bit2, shared cooldown; only successful payment advances last_claimed. Globally trusted authority can select any recipient.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement. Native credit uses plain +=; valid runtime total supply bounds assumed, not adversarial arbitrary-ledger proof.

**unclosed**: Historical account sizes/clock domains and authority operational safeguards unproved. No outsider drain established.

Evidence: [programs/pump-fees/src/social.rs:45-57](inputs/programs/pump-fees/src/social.rs#L45), [programs/pump-fees/src/social.rs:75-90](inputs/programs/pump-fees/src/social.rs#L75)

## social:token_amount:92

[Source programs/pump-fees/src/social.rs:92-98](inputs/programs/pump-fees/src/social.rs#L92)

**conclusion**: Requires nonzero lamports and owner legacy Token or Token2022; interface decoder and mint equality return amount. Does not check account authority or selected token program; callers rely on canonical address and token transfer. No net-credit or extension analysis.

## types:deserialize_reader:27

[Source programs/pump-fees/src/types.rs:27-34](inputs/programs/pump-fees/src/types.rs#L27)

**conclusion**: OptionBool reads one byte; EOF defaults false,0/1 accepted,other values InvalidData. Missing trailing bool backward compatibility is explicit; extra bytes not consumed by helper.

## types:owner:46

[Source programs/pump-fees/src/types.rs:46-46](inputs/programs/pump-fees/src/types.rs#L46)

**conclusion**: FeeConfig owner fixed to crate::ID; Account wrapper independently compares actual owner before decoder. No caller-supplied owner.

## types:try_serialize:51

[Source programs/pump-fees/src/types.rs:51-56](inputs/programs/pump-fees/src/types.rs#L51)

**conclusion**: Writes exact8 discriminator then Borsh entire struct including both vectors/exotic regardless of account length. No short-layout serialization variant: mismatch with length-gated decoder causes F2; capacity errors must abort exit.

## types:try_deserialize:59

[Source programs/pump-fees/src/types.rs:59-63](inputs/programs/pump-fees/src/types.rs#L59)

**conclusion**: At least8 bytes and exact discriminator checked before delegated unchecked decode; account owner enforced by Account<T>, not here.

## types:try_deserialize_unchecked:64

[Source programs/pump-fees/src/types.rs:64-77](inputs/programs/pump-fees/src/types.rs#L64)

**conclusion**: Requires>=2512. After8 reads bump/admin/flat/normal; stable only>=4073 and exotic only>=4097. No semantic bounds on deserialized vectors or fee totals; programmer-owned account writes supply invariant. Borsh bounds failures map to ProgramError. Short stable fields ignored (F2).

## withdrawal:execute:5

[Source programs/pump-fees/src/withdrawal.rs:5-22](inputs/programs/pump-fees/src/withdrawal.rs#L5)

**authorization_accounts**: Mutable user signer selects canonical referral-vault(user) SystemAccount; any token source must have authority=vault, mint=quote, owner=selected token program; destination authority=user and same mint/program.

**dynamic_accounts_layout**: quote/vaultATA/userATA/tokenProgram are Options; provided quote requires other three. Token constraints can reject inconsistent option sets before handler. Names ATA do not require associated addresses.

**cpi_events**: emit! followed by emit_cpi!; retained 0.31.2 expansion fixes target to crate::ID and signs only __event_authority PDA. Failure propagates. Native system transfer signed referral-vault,user,bump; token transfer_checked uses same authority seeds.

**arithmetic**: Native available=lamports-minimum0 saturating; token whole balance; amount0 errors. No lifetime counters.

**lifecycle_rent**: Leaves minimum0 native rent; token account rent stays; no account close.

**token_assets**: Both TokenInterface programs; destination need not canonical ATA but must be user-owned token account. No extra hook accounts.

**state_time_configuration**: No global pause or cooldown; user can reclaim only own referral namespace.

**errors_order_rollback**: Errors propagate; committed state requires successful outer transaction and account exit. Runtime rollback is an explicit dependency assumption; logs from a failed transaction are not proof of settlement.

**unclosed**: System transfer requires valid empty-data source under runtime; Token2022 extension credit semantics unclosed.

Evidence: [programs/pump-fees/src/withdrawal.rs:5-38](inputs/programs/pump-fees/src/withdrawal.rs#L5)

# Accounts context matrix

## InitializeBuyback

Reviewed with: initialize_buyback. [Exact context](inputs/programs/pump-fees/src/buyback.rs#L24) lines 24-34.

```rust
pub struct InitializeBuyback<'info>{
 #[account(mut)]pub payer:Signer<'info>,
 #[account(init,payer=payer,space=208,seeds=[b"buyback-vault".as_ref(),&[index]],bump)]pub buyback_vault:Account<'info,BuybackVault>,
 #[account(init_if_needed,payer=payer,associated_token::mint=mint,associated_token::authority=buyback_vault,associated_token::token_program=token_program)]pub buyback_vault_ata:InterfaceAccount<'info,anchor_spl::token_interface::TokenAccount>,
 pub system_program:Program<'info,System>,pub associated_token_program:Program<'info,anchor_spl::associated_token::AssociatedToken>,
 pub mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,pub token_program:Interface<'info,anchor_spl::token_interface::TokenInterface>,
 /// CHECK: event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 /// CHECK: event target.
 pub program:UncheckedAccount<'info>,
}
```

## UpdateBuyback

Reviewed with: update_buyback_authority, update_buyback_claim_rate_limit. [Exact context](inputs/programs/pump-fees/src/buyback.rs#L37) lines 37-45.

```rust
pub struct UpdateBuyback<'info>{
 #[account(mut)]pub authority:Signer<'info>,
 #[account(mut,seeds=[b"fee-program-global"],bump=fee_program_global.bump,has_one=authority @ FeeError::NotAuthorized)]pub fee_program_global:Account<'info,FeeProgramGlobal>,
 #[account(mut,seeds=[b"buyback-vault".as_ref(),&[index]],bump)]pub buyback_vault:Box<Account<'info,BuybackVault>>,
 /// CHECK: event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 /// CHECK: event target.
 pub program:UncheckedAccount<'info>,
}
```

## SweepBuyback

Reviewed with: sweep_buyback. [Exact context](inputs/programs/pump-fees/src/buyback.rs#L48) lines 48-61.

```rust
pub struct SweepBuyback<'info>{
 /// CHECK: arbitrary destination.
 #[account(mut)]pub destination:UncheckedAccount<'info>,
 #[account(mut)]pub authority:Signer<'info>,
 #[account(mut,seeds=[b"buyback-vault".as_ref(),&[index]],bump,has_one=authority @ FeeError::NotAuthorized)]pub buyback_vault:Account<'info,BuybackVault>,
 #[account(mut,associated_token::mint=mint,associated_token::authority=buyback_vault,associated_token::token_program=token_program)]pub buyback_vault_ata:InterfaceAccount<'info,anchor_spl::token_interface::TokenAccount>,
 #[account(mut,associated_token::mint=mint,associated_token::authority=destination,associated_token::token_program=token_program)]pub destination_ata:InterfaceAccount<'info,anchor_spl::token_interface::TokenAccount>,
 pub system_program:Program<'info,System>,pub associated_token_program:Program<'info,anchor_spl::associated_token::AssociatedToken>,
 pub mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,pub token_program:Interface<'info,anchor_spl::token_interface::TokenInterface>,
 /// CHECK: event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 /// CHECK: event target.
 pub program:UncheckedAccount<'info>,
}
```

## ExtendFeeConfig

Reviewed with: extend_fee_config. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L8) lines 8-16.

```rust
pub struct ExtendFeeConfig<'info> {
    /// CHECK: owner, discriminator, stored bump and PDA are validated by handler.
    #[account(mut)]
    pub fee_config: UncheckedAccount<'info>,
    pub user: Signer<'info>,
    /// CHECK: used only as the configuration PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}
```

## GetFees

Reviewed with: get_fees. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L19) lines 19-24.

```rust
pub struct GetFees<'info> {
    #[account(seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump)]
    pub fee_config: Account<'info, FeeConfig>,
    /// CHECK: Exact deployed constraint not recovered.
    pub config_program_id: UncheckedAccount<'info>,
}
```

## GetFeesWithQuoteMint

Reviewed with: get_fees_with_quote_mint. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L27) lines 27-32.

```rust
pub struct GetFeesWithQuoteMint<'info> {
    #[account(seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump)]
    pub fee_config: Account<'info, FeeConfig>,
    /// CHECK: Exact deployed constraint not recovered.
    pub config_program_id: UncheckedAccount<'info>,
}
```

## InitializeFeeConfig

Reviewed with: initialize_fee_config. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L36) lines 36-45.

```rust
pub struct InitializeFeeConfig<'info> {
    #[account(mut, address = anchor_lang::solana_program::pubkey!("8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8") @ FeeError::InvalidAdmin)]
    pub admin: Signer<'info>,
    #[account(init, payer = admin, space = 2512,
              seeds = [b"fee_config", config_program_id.key().as_ref()], bump)]
    pub fee_config: Account<'info, FeeConfig>,
    pub system_program: Program<'info, System>,
    /// CHECK: Key is the FeeConfig PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
}
```

## InitializeFeeProgramGlobal

Reviewed with: initialize_fee_program_global. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L49) lines 49-58.

```rust
pub struct InitializeFeeProgramGlobal<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(seeds = [b"global"], bump, seeds::program = crate::pump_global::PUMP_ID,
              has_one = authority @ FeeError::NotAuthorized)]
    pub pump_global: Account<'info, crate::pump_global::Global>,
    #[account(init, payer = authority, space = 338, seeds = [b"fee-program-global"], bump)]
    pub fee_program_global: Account<'info, FeeProgramGlobal>,
    pub system_program: Program<'info, System>,
}
```

## RevokeFeeSharingAuthority

Reviewed with: revoke_fee_sharing_authority. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L61) lines 61-61.

```rust
pub struct RevokeFeeSharingAuthority {}
```

## SetAuthority

Reviewed with: set_authority. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L65) lines 65-71.

```rust
pub struct SetAuthority<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut, seeds = [b"fee-program-global"], bump = fee_program_global.bump,
              has_one = authority @ FeeError::NotAuthorized)]
    pub fee_program_global: Account<'info, FeeProgramGlobal>,
}
```

## SetClaimRateLimit

Reviewed with: set_claim_rate_limit. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L75) lines 75-81.

```rust
pub struct SetClaimRateLimit<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut, seeds = [b"fee-program-global"], bump = fee_program_global.bump,
              has_one = authority @ FeeError::NotAuthorized)]
    pub fee_program_global: Account<'info, FeeProgramGlobal>,
}
```

## SetDisableFlags

Reviewed with: set_disable_flags. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L85) lines 85-91.

```rust
pub struct SetDisableFlags<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut, seeds = [b"fee-program-global"], bump = fee_program_global.bump,
              has_one = authority @ FeeError::NotAuthorized)]
    pub fee_program_global: Account<'info, FeeProgramGlobal>,
}
```

## SetExoticFlatFees

Reviewed with: set_exotic_flat_fees. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L95) lines 95-104.

```rust
pub struct SetExoticFlatFees<'info> {
    #[account(mut, seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump,
              has_one = admin @ FeeError::InvalidAdmin)]
    pub fee_config: Account<'info, FeeConfig>,
    #[account(mut)]
    pub admin: Signer<'info>,
    /// CHECK: only used as the configuration PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}
```

## SetSocialClaimAuthority

Reviewed with: set_social_claim_authority. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L108) lines 108-114.

```rust
pub struct SetSocialClaimAuthority<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut, seeds = [b"fee-program-global"], bump = fee_program_global.bump,
              has_one = authority @ FeeError::NotAuthorized)]
    pub fee_program_global: Account<'info, FeeProgramGlobal>,
}
```

## TransferFeeSharingAuthority

Reviewed with: transfer_fee_sharing_authority. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L117) lines 117-117.

```rust
pub struct TransferFeeSharingAuthority {}
```

## UpdateAdmin

Reviewed with: update_admin. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L121) lines 121-130.

```rust
pub struct UpdateAdmin<'info> {
    pub admin: Signer<'info>,
    #[account(mut, seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump,
              has_one = admin @ FeeError::InvalidAdmin)]
    pub fee_config: Account<'info, FeeConfig>,
    /// CHECK: accepted as the next authority key; zero and nonsigner keys are allowed.
    pub new_admin: AccountInfo<'info>,
    /// CHECK: configuration PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
}
```

## UpdateFeeConfig

Reviewed with: update_fee_config. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L134) lines 134-141.

```rust
pub struct UpdateFeeConfig<'info> {
    #[account(mut, seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump,
              has_one = admin @ FeeError::InvalidAdmin)]
    pub fee_config: Account<'info, FeeConfig>,
    pub admin: Signer<'info>,
    /// CHECK: only used as the configuration PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
}
```

## UpdateStableFeeConfig

Reviewed with: update_stable_fee_config. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L145) lines 145-152.

```rust
pub struct UpdateStableFeeConfig<'info> {
    #[account(mut, seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump,
              has_one = admin @ FeeError::InvalidAdmin)]
    pub fee_config: Account<'info, FeeConfig>,
    pub admin: Signer<'info>,
    /// CHECK: only used as the configuration PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
}
```

## UpsertFeeTiers

Reviewed with: upsert_fee_tiers. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L156) lines 156-163.

```rust
pub struct UpsertFeeTiers<'info> {
    #[account(mut, seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump,
              has_one = admin @ FeeError::InvalidAdmin)]
    pub fee_config: Account<'info, FeeConfig>,
    pub admin: Signer<'info>,
    /// CHECK: configuration PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
}
```

## UpsertStableFeeTiers

Reviewed with: upsert_stable_fee_tiers. [Exact context](inputs/programs/pump-fees/src/contexts.rs#L167) lines 167-174.

```rust
pub struct UpsertStableFeeTiers<'info> {
    #[account(mut, seeds = [b"fee_config", config_program_id.key().as_ref()], bump = fee_config.bump,
              has_one = admin @ FeeError::InvalidAdmin)]
    pub fee_config: Account<'info, FeeConfig>,
    pub admin: Signer<'info>,
    /// CHECK: configuration PDA namespace.
    pub config_program_id: UncheckedAccount<'info>,
}
```

## CreateDonationFeePda

Reviewed with: create_donation_fee_pda. [Exact context](inputs/programs/pump-fees/src/donation.rs#L82) lines 82-98.

```rust
pub struct CreateDonationFeePda<'info> {
    /// CHECK: event PDA validated.
    #[account(seeds=[b"__event_authority"],bump)] pub event_authority: UncheckedAccount<'info>,
    pub program: Program<'info, crate::program::PumpFeesCandidate>,
    #[account(mut)] pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
    #[account(seeds=[b"fee-program-global"],bump=fee_program_global.bump)] pub fee_program_global: Account<'info,FeeProgramGlobal>,
    #[account(init_if_needed,payer=payer,space=218,seeds=[b"donation-fee-pda",base_mint.key().as_ref(),config_id.key().as_ref()],bump)] pub donation_fee_pda: Account<'info,DonationFeePda>,
    /// CHECK: identifier only.
    pub config_id: UncheckedAccount<'info>,
    pub base_mint: InterfaceAccount<'info,Mint>,
    #[account(seeds=[b"bonding-curve",base_mint.key().as_ref()],bump,seeds::program=PUMP)] pub bonding_curve: Account<'info,BondingCurve>,
    /// CHECK: validated in handler.
    pub pool: UncheckedAccount<'info>,
    /// CHECK: derived identifier; state rules under recovery.
    #[account(seeds=[b"sharing-config",base_mint.key().as_ref()],bump)] pub sharing_config: UncheckedAccount<'info>,
}
```

## CrankDonationFeePda

Reviewed with: crank_donation_fee_pda. [Exact context](inputs/programs/pump-fees/src/donation.rs#L112) lines 112-138.

```rust
pub struct CrankDonationFeePda<'info> {
    /// CHECK: event PDA.
    #[account(seeds=[b"__event_authority"],bump)] pub event_authority:UncheckedAccount<'info>,
    pub program:Program<'info,crate::program::PumpFeesCandidate>,
    #[account(mut)]pub payer:Signer<'info>,
    pub system_program:Program<'info,System>,
    pub token_program:Program<'info,anchor_spl::token::Token>,
    pub associated_token_program:Program<'info,anchor_spl::associated_token::AssociatedToken>,
    /// CHECK: rent address.
    #[account(address=anchor_lang::solana_program::sysvar::rent::ID)]pub rent:UncheckedAccount<'info>,
    #[account(seeds=[b"fee-program-global"],bump=fee_program_global.bump)]pub fee_program_global:Account<'info,FeeProgramGlobal>,
    #[account(mut,seeds=[b"donation-fee-pda",donation_fee_pda.base_mint.as_ref(),donation_fee_pda.config_id.as_ref()],bump=donation_fee_pda.bump)]pub donation_fee_pda:Account<'info,DonationFeePda>,
    #[account(mut,address=donation_fee_pda.quote_mint @ anchor_lang::error::ErrorCode::ConstraintMintTokenProgram)]pub quote_mint:Account<'info,anchor_spl::token::Mint>,
    #[account(init_if_needed,payer=payer,associated_token::mint=quote_mint,associated_token::authority=donation_fee_pda)]pub donation_fee_pda_ata:Account<'info,anchor_spl::token::TokenAccount>,
    /// CHECK: fixed executable dependency.
    #[account(executable,address=RELAY)]pub donation_relay_program:UncheckedAccount<'info>,
    /// CHECK: dependency enforces its constraints.
    pub donation_relay_event_authority:UncheckedAccount<'info>,
    /// CHECK: dependency enforces its constraints.
    pub mint_whitelist:UncheckedAccount<'info>,
    /// CHECK: dependency enforces its constraints.
    #[account(mut)]pub epoch_tracker:UncheckedAccount<'info>,
    /// CHECK: dependency enforces its constraints.
    #[account(mut)]pub debouncer:UncheckedAccount<'info>,
    /// CHECK: dependency enforces its constraints.
    #[account(mut)]pub debouncer_ata:UncheckedAccount<'info>,
}
```

## CreateFeeSharingConfig

Reviewed with: create_fee_sharing_config. [Exact context](inputs/programs/pump-fees/src/sharing.rs#L38) lines 38-56.

```rust
pub struct CreateFeeSharingConfig<'info>{
 /// CHECK: event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 pub program:Program<'info,crate::program::PumpFeesCandidate>,
 #[account(mut)]pub payer:Signer<'info>,
 #[account(seeds=[b"global"],bump,seeds::program=PUMP)]pub global:Box<Account<'info,pump_global::Global>>,
 pub mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 #[account(init_if_needed,payer=payer,space=1024,seeds=[b"sharing-config",mint.key().as_ref()],bump)]pub sharing_config:Account<'info,SharingConfig>,
 pub system_program:Program<'info,System>,
 #[account(mut,seeds=[b"bonding-curve",mint.key().as_ref()],bump,seeds::program=PUMP)]pub bonding_curve:Account<'info,BondingCurve>,
 pub pump_program:Program<'info,Pump>,
 /// CHECK: external event PDA.
 #[account(seeds=[b"__event_authority"],bump,seeds::program=PUMP)]pub pump_event_authority:UncheckedAccount<'info>,
 /// CHECK: optional pool validated in handler.
 #[account(mut)]pub pool:Option<Account<'info,SharingPool>>,
 pub pump_amm_program:Option<Program<'info,Amm>>,
 /// CHECK: external event PDA.
 #[account(seeds=[b"__event_authority"],bump,seeds::program=AMM)]pub pump_amm_event_authority:Option<UncheckedAccount<'info>>,
}
```

## AdminCtoSharingConfig

Reviewed with: admin_cto_sharing_config. [Exact context](inputs/programs/pump-fees/src/sharing_admin.rs#L19) lines 19-29.

```rust
pub struct AdminCtoSharingConfig<'info>{
 #[account(seeds=[b"pool-authority",mint.key().as_ref()],bump,seeds::program=pump_global::PUMP_ID)]pub pool_authority:Signer<'info>,
 pub authority:Signer<'info>,
 #[account(seeds=[b"global"],bump,seeds::program=pump_global::PUMP_ID,constraint=global.admin_set_creator_authority==authority.key() @ FeeError::NotAuthorized)]pub global:Account<'info,pump_global::Global>,
 pub mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 #[account(mut,seeds=[b"sharing-config",mint.key().as_ref()],bump=sharing_config.bump,has_one=mint @ FeeError::InvalidSharingConfig)]pub sharing_config:Account<'info,SharingConfig>,
 /// CHECK: canonical event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 /// CHECK: fixed self program used for event CPI.
 #[account(address=ID)]pub program:UncheckedAccount<'info>,
}
```

## UpdateFeeShares

Reviewed with: update_fee_shares. [Exact context](inputs/programs/pump-fees/src/sharing_update.rs#L60) lines 60-85.

```rust
pub struct UpdateFeeShares<'info>{
 /// CHECK: event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 pub program:Program<'info,crate::program::PumpFeesCandidate>,
 pub authority:Signer<'info>,
 #[account(seeds=[b"global"],bump,seeds::program=PUMP)]pub global:Box<Account<'info,pump_global::Global>>,
 pub mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 #[account(mut,seeds=[b"sharing-config",mint.key().as_ref()],bump=sharing_config.bump,has_one=mint @ FeeError::InvalidSharingConfig)]pub sharing_config:Account<'info,SharingConfig>,
 #[account(seeds=[b"bonding-curve",mint.key().as_ref()],bump,seeds::program=PUMP)]pub bonding_curve:Account<'info,BondingCurve>,
 /// CHECK: creator vault PDA.
 #[account(mut,seeds=[b"creator-vault",sharing_config.key().as_ref()],bump,seeds::program=PUMP)]pub pump_creator_vault:UncheckedAccount<'info>,
 pub system_program:Program<'info,System>,
 pub pump_program:Program<'info,Pump>,
 /// CHECK: Pump event PDA.
 #[account(seeds=[b"__event_authority"],bump,seeds::program=PUMP)]pub pump_event_authority:UncheckedAccount<'info>,
 pub pump_amm_program:Program<'info,Amm>,
 /// CHECK: AMM event PDA.
 #[account(seeds=[b"__event_authority"],bump,seeds::program=AMM)]pub amm_event_authority:UncheckedAccount<'info>,
 #[account(address=anchor_spl::token::spl_token::native_mint::ID)]pub wsol_mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 #[account(address=anchor_spl::token::ID)]pub token_program:Interface<'info,anchor_spl::token_interface::TokenInterface>,
 pub associated_token_program:Program<'info,anchor_spl::associated_token::AssociatedToken>,
 /// CHECK: AMM creator vault PDA.
 #[account(mut,seeds=[b"creator_vault",sharing_config.key().as_ref()],bump,seeds::program=AMM)]pub coin_creator_vault_authority:UncheckedAccount<'info>,
 /// CHECK: canonical token account address; dependency validates data.
 #[account(mut,address=anchor_spl::associated_token::get_associated_token_address_with_program_id(&coin_creator_vault_authority.key(),&wsol_mint.key(),&token_program.key()))]pub coin_creator_vault_ata:UncheckedAccount<'info>,
}
```

## UpdateFeeSharesV2

Reviewed with: update_fee_shares_v2. [Exact context](inputs/programs/pump-fees/src/sharing_update.rs#L87) lines 87-114.

```rust
pub struct UpdateFeeSharesV2<'info>{
 /// CHECK: event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 pub program:Program<'info,crate::program::PumpFeesCandidate>,
 #[account(mut)]pub authority:Signer<'info>,
 #[account(seeds=[b"global"],bump,seeds::program=PUMP)]pub global:Box<Account<'info,pump_global::Global>>,
 pub mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 #[account(mut,seeds=[b"sharing-config",mint.key().as_ref()],bump=sharing_config.bump,has_one=mint @ FeeError::InvalidSharingConfig)]pub sharing_config:Account<'info,SharingConfig>,
 #[account(seeds=[b"bonding-curve",mint.key().as_ref()],bump,seeds::program=PUMP)]pub bonding_curve:Account<'info,BondingCurve>,
 /// CHECK: creator vault PDA.
 #[account(mut,seeds=[b"creator-vault",sharing_config.key().as_ref()],bump,seeds::program=PUMP)]pub pump_creator_vault:UncheckedAccount<'info>,
 /// CHECK: canonical token address, validated by dependency.
 #[account(mut,seeds=[pump_creator_vault.key().as_ref(),token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub pump_creator_vault_ata:UncheckedAccount<'info>,
 pub system_program:Program<'info,System>,
 pub pump_program:Program<'info,Pump>,
 /// CHECK: Pump event PDA.
 #[account(seeds=[b"__event_authority"],bump,seeds::program=PUMP)]pub pump_event_authority:UncheckedAccount<'info>,
 pub pump_amm_program:Program<'info,Amm>,
 /// CHECK: AMM event PDA.
 #[account(seeds=[b"__event_authority"],bump,seeds::program=AMM)]pub amm_event_authority:UncheckedAccount<'info>,
pub quote_mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
pub token_program:Interface<'info,anchor_spl::token_interface::TokenInterface>,
 pub associated_token_program:Program<'info,anchor_spl::associated_token::AssociatedToken>,
 /// CHECK: AMM creator vault PDA.
 #[account(mut,seeds=[b"creator_vault",sharing_config.key().as_ref()],bump,seeds::program=AMM)]pub coin_creator_vault_authority:UncheckedAccount<'info>,
 /// CHECK: canonical token account address; dependency validates data.
 #[account(mut,seeds=[coin_creator_vault_authority.key().as_ref(),token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub coin_creator_vault_ata:UncheckedAccount<'info>,
}
```

## CreateSocialFeePda

Reviewed with: create_social_fee_pda. [Exact context](inputs/programs/pump-fees/src/social.rs#L60) lines 60-69.

```rust
pub struct CreateSocialFeePda<'info>{
 #[account(mut)]pub payer:Signer<'info>,
 #[account(init_if_needed,payer=payer,space=179,seeds=[b"social-fee-pda",user_id.as_bytes(),&[platform]],bump)]pub social_fee_pda:Account<'info,SocialFeePda>,
 pub system_program:Program<'info,System>,
 #[account(seeds=[b"fee-program-global"],bump=fee_program_global.bump)]pub fee_program_global:Account<'info,FeeProgramGlobal>,
 /// CHECK: event authority PDA validated.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 /// CHECK: event-CPI program account; original imposes no typed-program constraint.
 pub program:UncheckedAccount<'info>,
}
```

## ClaimSocialFeePda

Reviewed with: claim_social_fee_pda. [Exact context](inputs/programs/pump-fees/src/social.rs#L77) lines 77-87.

```rust
pub struct ClaimSocialFeePda<'info>{
 /// CHECK: arbitrary recipient validated in handler.
 #[account(mut)]pub recipient:UncheckedAccount<'info>,
 #[account(mut,seeds=[b"social-fee-pda",user_id.as_bytes(),&[platform]],bump=social_fee_pda.bump)]pub social_fee_pda:Account<'info,SocialFeePda>,
 #[account(seeds=[b"fee-program-global"],bump=fee_program_global.bump,has_one=social_claim_authority @ FeeError::NotAuthorized)]pub fee_program_global:Account<'info,FeeProgramGlobal>,
 pub social_claim_authority:Signer<'info>,
 /// CHECK: event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 /// CHECK: event CPI target.
 pub program:UncheckedAccount<'info>,
}
```

## ClaimSocialFeePdaV2

Reviewed with: claim_social_fee_pda_v2. [Exact context](inputs/programs/pump-fees/src/social.rs#L101) lines 101-119.

```rust
pub struct ClaimSocialFeePdaV2<'info>{
 /// CHECK: recipient.
 #[account(mut)]pub recipient:UncheckedAccount<'info>,
 #[account(mut,seeds=[b"social-fee-pda",user_id.as_bytes(),&[platform]],bump=social_fee_pda.bump)]pub social_fee_pda:Account<'info,SocialFeePda>,
 #[account(mut)]pub quote_mint:Box<InterfaceAccount<'info,anchor_spl::token_interface::Mint>>,
 /// CHECK: canonical ATA; data validated on token branch.
 #[account(mut,seeds=[social_fee_pda.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub associated_social_fee_pda:UncheckedAccount<'info>,
 /// CHECK: canonical ATA; data validated on token branch.
 #[account(mut,seeds=[recipient.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub associated_recipient:UncheckedAccount<'info>,
 pub quote_token_program:Interface<'info,anchor_spl::token_interface::TokenInterface>,
 pub associated_token_program:Program<'info,anchor_spl::associated_token::AssociatedToken>,
 #[account(seeds=[b"fee-program-global"],bump=fee_program_global.bump,has_one=social_claim_authority @ FeeError::NotAuthorized)]pub fee_program_global:Account<'info,FeeProgramGlobal>,
 pub social_claim_authority:Signer<'info>,
 pub system_program:Program<'info,System>,
 /// CHECK: event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:AccountInfo<'info>,
 /// CHECK: event CPI target.
 pub program:AccountInfo<'info>,
}
```

## Withdraw

Reviewed with: withdraw. [Exact context](inputs/programs/pump-fees/src/withdrawal.rs#L24) lines 24-36.

```rust
pub struct Withdraw<'info>{
 #[account(mut)]pub user:Signer<'info>,
 #[account(mut,seeds=[b"referral-vault",user.key().as_ref()],bump)]pub referral_vault:SystemAccount<'info>,
 pub quote_mint:Option<InterfaceAccount<'info,Mint>>,
 #[account(mut,token::mint=quote_mint,token::authority=referral_vault,token::token_program=token_program)]pub vault_ata:Option<InterfaceAccount<'info,TokenAccount>>,
 #[account(mut,token::mint=quote_mint,token::authority=user,token::token_program=token_program)]pub user_ata:Option<InterfaceAccount<'info,TokenAccount>>,
 pub token_program:Option<Interface<'info,TokenInterface>>,
 pub system_program:Program<'info,System>,
 /// CHECK: canonical event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 /// CHECK: CPI receives this account; no typed program constraint observed.
 pub program:UncheckedAccount<'info>,
}
```

