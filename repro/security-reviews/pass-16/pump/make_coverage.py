from pathlib import Path
import json
W=Path(__file__).resolve().parent;S=W/'source-view/programs/pump/src';D=json.loads((W/'dispatch.json').read_text());rows=[]
def loc(f,token):
 s=(S/f).read_text();return {'path':'programs/pump/src/'+f,'line':s[:s.index(token)].count('\n')+1}
admin={'add_quote_mint','remove_quote_mint','set_virtual_quote_reserves','update_buyback_config','update_creator_fee_config','update_holder_reward_config','toggle_create_v2','toggle_mayhem_mode','toggle_cashback_enabled','set_max_curve_depth','set_reserved_fee_recipients','update_global_authority'}
for r in D:
 n=r['name'];entry={'path':'programs/pump/src/lib.rs','line':r['line']};body=entry;scope='current-source reviewed';a=e=l=''
 if n in ['sell_v2','sell_v3']:
  scope='excluded-opaque';a='No body review.';e='No corrective/transfer-fee or old V3 extension work reopened.';l='Shared type declarations only; no whole-entry security conclusion.';body=None
 elif n in admin:
  a='Canonical owned global with configured authority signer; settings/admin destinations selected by that signer.';e='Whitelist capacity/membership, <=10000 buyback, flags/authority updates as applicable; events after changes.';l='Zero/new authority and arbitrary max creator/reserve/depth settings remain privileged policy; serialization/late errors require rollback.'
 elif n.startswith('set_quote_control') or n in ['add_quote_control_mint','remove_quote_control_mint','initialize_quote_control']:
  f='quote_control/initialize_quote_control.rs'if n=='initialize_quote_control'else'quote_control/update_quote_control_mints.rs';body=loc(f,'pub fn '+n)
  a='Canonical owned global/control PDA; global authority controls admin, global/admin/reserves-admin delegation varies by operation; init is permissionless.';e='Bounded256-entry mint list, duplicate/default/native rejection, checked growth and rent; per-mint reserve changes.';l='Reserves are admin supplied and may be zero; removals do not rewrite existing curves. Init leaves delegated authorities zero.'
 elif n=='initialize':
  body=loc('global_init.rs','pub fn execute');a='Any signer can initialize canonical global PDA once.';e='Sets initialized=true and authority to payer.';l='Fresh deployment first-caller authority policy, not takeover of initialized state.'
 elif n=='admin_set_idl_authority':
  body=loc('idl_authority.rs','pub fn execute');a='Configured global authority signer; canonical IDL and program signer PDA.';e='System-owned IDL balance drain via seeded transfer; otherwise owner-check/realloc10240, discriminator, set authority/event.';l='Privileged IDL behavior; late error after resize relies rollback; live upgrade/config authority not audited.'
 elif n=='set_params':
  body=loc('set_params.rs','pub fn execute');a='Configured global authority signer; eight nonzero rent-exempt sorted unique recipients.';e='Initial reserve inequalities, each fee<=1000, nonzero withdrawal key, migrationfee<computed finalreserve; assign/event.';l='Economic parameters trusted; no outside feed validates value.'
 elif n in ['set_creator','set_metaplex_creator','migrate_bonding_curve_creator']:
  f='creator_migration.rs'if n=='migrate_bonding_curve_creator'else'set_creator.rs';token='pub fn execute'if n=='migrate_bonding_curve_creator'else('pub fn set('if n=='set_creator'else'pub fn sync(');body=loc(f,token)
  a='Full owned canonical curve; setter configured set_creator signer; sync permissionless canonical metadata; migration Fees-owned mint/admin-matching sharing PDA.';e='Existing nonzero creator returns; metadata first creator preferred or configured fallback; migration rejects holder/nonzero fees then creator change/event.';l='Some(empty) metadata panics; original metadata policy not established. Old short allocation can fail full serializer. Sharing status/revocation not checked in migration.'
 elif n=='admin_cto':
  body=loc('admin_cto.rs','pub fn execute');a='Global configured admin-set-creator signer; canonical curve/fee/AMM/Fees program and vault addresses.';e='Policy rejects mayhem/invalid holder/fee/new creator; resize; sweep old fees; reset sharing and AMM creator; raw curve updates; event.';l='Large delegated CPI/serialization closure; partial DistributionCurve/raw writes differ from full setter paths; no external security proof.'
 elif n in ['collect_creator_fee','collect_creator_fee_v2']:
  if n.endswith('_v2'):body=loc('collect_v2.rs','pub fn execute')
  a='Permissionless; fixed creator-vault PDA; native destination creator or canonical token ATA.';e='Skip executable/zero funds; native rent excess or token balance to creator; event.';l='Token ownership/state partly deferred to actual transfer; no arbitrary wallet redirect shown.'
 elif n in ['distribute_creator_fees','distribute_creator_fees_v2','get_minimum_distributable_fee']:
  f='minimum.rs'if n.startswith('get_')else'distribution.rs';token='pub fn execute_v2'if n.endswith('_v2')else'pub fn execute';body=loc(f,token)
  a='Permissionless; canonical curve and Fees-owned sharing config mint binding; creator equality; distributions require active config.';e='Check recipient keys/nonexecutable/positive shares; rent threshold or canonical ATAs; weighted payouts with optional ATA creation; query computes minimum.';l='No local total10000/duplicate validation, relies on Fees state writers; raw payout arithmetic can overdraw/fail for invalid external state.'
 elif n=='distribute_fee_to_holders':
  body=loc('holder_distribution.rs','pub fn execute');a='Configured holder-reward claim authority signer; mint-derived holder PDA; optional token source authority/mint/program checked.';e='Two accounts per supplied amount; optional native close; direct native/token transfers, totalchecked, rentfloor after native; event.';l='Privileged recipient/amount selection; no proof of real token-holder entitlement in this source.'
 elif n in ['sweep_creator_fee','sweep_protocol_fee']:
  body=loc('sweep.rs','pub fn execute');a='Payer signer; canonical curve; creator-vault or configured protocol recipient; canonical token addresses.';e='Fund curve rent, read liabilities, transfer selected bucket, clear bucket/event.';l='Legacy raw-layout parsing and serialization; token authorities partly delegated; source-only conservation review.'
 elif n in ['claim_cashback','claim_cashback_v2']:
  body=loc('cashback.rs','pub fn claim_v2'if n.endswith('_v2')else'pub fn claim(');a='Permissionless; user-derived owned accumulator; destination user or token-owner user.';e='Transfer full rent-excess native or token source balance; update nominal claim counter/event.';l='V2 token CPI target unchecked locally, source ATA reachability bounds concern P1; no drain established.'
 elif n in ['init_user_volume_accumulator','close_user_volume_accumulator','sync_user_volume_accumulator']:
  if n.startswith('sync'):body=loc('volume_sync.rs','pub fn execute')
  a='Init any payer for user PDA; close user signer; sync canonical global/user accumulator.';e='Init user field/event; close refunds user and drops state; sync resets pre-schedule claim summary only.';l='Reward entitlement/account accrual paths excluded; no incentive completeness claim.'
 elif n=='extend_account':
  body=loc('extend.rs','pub fn execute');a='Permissionless signer funding explicitly Pump-owned supported-discriminator account.';e='Rent delta then supported target size realloc/event; larger accounts no-op.';l='Ownership/discriminator not complete state semantics; late failure is reverted.'
 elif n in ['create','create_v2']:
  body=loc(n+'.rs','pub fn execute');a='User signer, new mint/mint-authority PDA, owned curve, canonical vault; V2 quote/control/ancestor checks.';e='Create metadata, mint configured supply, revoke mint authority, initialize reserves and creator, events.';l='V2 deliberately rejects Mayhem and cashback branches; nested quote source conditional, not historical whole-function proof.';scope='partial source domain'if n=='create_v2'else scope
 elif n in ['migrate','migrate_v2']:
  body=loc(n+'.rs','pub fn execute');a='Permissionless payer; canonical completed curve and AMM pool/mints/vaults; configured withdrawal destination.';e='Move liquidity via pool-authority PDA, create AMM pool/boost, close temporaries/burnLP, zero curve reserves, event.';l='External AMM/token contracts and late failure rollback; terminal balances/source sidecars not complete proof.'
 elif n in ['buy','buy_exact_sol_in','sell','buy_v2','buy_exact_quote_in_v2']:
  f='legacy_sell.rs'if n=='sell'else'buy_v2.rs'if '_v2'in n else'legacy_buy.rs';body=loc(f,'pub fn execute');a='User signer, canonical curve, mint/authority token constraints, fixed Fees program/PDA, authorized fee/buyback recipients.';e='Fee CPI; capped/partial constant-product trade; asset and fee transfers; update reserves/cashback/event; rent preparation.';l='Return-data producer ID trusted to fixed Fees; token assumptions and full error order not exhaustive; incentive mutation excluded.'
 elif n in ['buy_v3','buy_exact_quote_in_v3']:
  body=loc('trade.rs','pub fn buy('if n=='buy_v3'else'pub fn buy_exact_quote');scope='partial: excluded shared quote helper';a='Owned canonical curve, user signer, typed base, external FeeConfig owner/PDA; quote helper opaque in this review.';e='Prepare rent; ordered complete/cashback guards, pretrade fee basis, math and balance/fee state updates; completion/exact crossing.';l='Old V3 token-extension closure deliberately not reviewed. Original typed FeeConfig/four-zero whitelist bypass still unintegrated.'
 elif n=='multi_hop_curve_swap':
  body=loc('multi_hop_curve.rs','pub fn execute');scope='partial source domain';a='AMM global-config PDA signer plus user/source authority; owned global/FeeConfig/curves.';e='5-account hops and fee flags, ordinary Tokenkeg domain fences, per-hop math/transfers/exit, final mint check.';l='Reconstruction fences reject extensions/completion/Mayhem/holder domains; not original general route semantics.'
 else:raise Exception(n)
 rows.append({'instruction':n,'review_scope':scope,'entry':entry,'body':body,'authorization_accounts':a,'effects_order':e,'limits':l})
for n in ['admin_update_token_incentives','claim_token_incentives']:rows.append({'instruction':n,'review_scope':'excluded-opaque; absent current entry','entry':None,'body':None,'authorization_accounts':'Not reviewed.','effects_order':'No investigation.','limits':'Hard exclusion retained.'})
(W/'coverage.json').write_text(json.dumps(rows,indent=2)+'\n')
def ref(x):return 'opaque'if x is None else f"`{x['path']}:{x['line']}`"
s='# Current Pump entry coverage\n\nThe checkpoint reports48 bounded handlers and5 partial paths; these are inherited finite-evidence labels, not independent security certification. This review lists all53 current dispatch entries, plus two absent excluded incentive slots. Its own source-domain exclusions are stricter and explicit.\n\n|Entry / review domain / source|Authorization/accounts|Effects/order|Limits|\n|---|---|---|---|\n'
for r in rows:s+=f"|`{r['instruction']}` ({r['review_scope']})<br>{ref(r['body'])}|{r['authorization_accounts']}|{r['effects_order']}|{r['limits']}|\n"
(W/'COVERAGE.md').write_text(s)
