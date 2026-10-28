from pathlib import Path
import importlib.util,json,sys
D=Path(__file__).resolve().parent;s=importlib.util.spec_from_file_location('v2_build',D/'build_control.py');b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
rel='src/instructions/pump_interface_v2.rs';rr=D/'upstream/r/source';overrides={n:(rr/n).read_bytes() for n in ['src/instructions/buy_v2.rs',rel]};text=overrides[rel].decode();handler=text.index('pub fn sell_v2_handler');begin=text.index(' let (sol_amount,sol_vault_balance,',handler);end=text.index(' emit!(event);',begin)
phase=''' let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native_accounting{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()}; let event=SellEvent{side:true,quote_vault_balance,state_quote_deployed,global_sol_deployed,virtual_quote,real_quote,global_quote_deployed,sol_amount,sol_vault_balance,state_sol_deployed,virtual_sol,real_sol,sol_vault:a.sol_vault.key(),mint:a.mint.key(),token_amount:tokens,token_vault_balance:a.mayhem_base_token_vault.amount,state_token_net:a.mayhem_state.field_72,virtual_tokens:a.bonding_curve.virtual_token_reserves,end_timestamp:a.mayhem_state.end_timestamp,timestamp:Clock::get()?.unix_timestamp,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_mint};
'''
assert phase.count('\n')<=text[begin:end].count('\n');phased=text[:begin]+phase+'\n'*(text[begin:end].count('\n')-phase.count('\n'))+text[end:];assert phased.count('\n')==text.count('\n')
controls={
 '02-r-on439':(overrides,'Rebase only the two archived R V2 source files onto exact qualified439; preserves a separate base for new controls.'),
 '03-sell-phased':({**overrides,rel:phased.encode()},'Transfer the now proven AMM scalar event phase to V2 Sell, preserving distinct real/virtual reserves and native-accounting condition. Keys remain short-lived literal temporaries before Clock; preserve all source line counts. This targets the observed event-frame displacement and store-order differences, not code padding.')}
reused=phased.replace('let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};','let state_sol_deployed=if native{state_quote_deployed}else{0};').replace('let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};','let virtual_sol=if native{virtual_quote}else{0};').replace('let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};','let real_sol=if native{real_quote}else{0};')
controls['04-shared-scalars']=({**overrides,rel:reused.encode()},'Reuse the already read state/real/virtual scalar values for native event fields, retaining all field values and key timings. Tests whether repeated conditional loads caused the four extra event CFG blocks in03.')
literal=phase[phase.index(' let event='):];old_prefix=text[begin:text.index(' let event=',begin)]
tuple_prefix=old_prefix.replace('virtual_sol,real_sol,quote_mint,quote_vault_balance','virtual_sol,real_sol,quote_vault_balance').replace('virtual_reserve,real_reserve,Pubkey::default(),vault_balance','virtual_reserve,real_reserve,vault_balance').replace('let mint=a.quote_mint.key();','').replace('(0,0,0,0,0,0,mint,vault_balance','(0,0,0,0,0,0,vault_balance')
assert 'quote_mint' not in tuple_prefix
late=tuple_prefix.replace(' };\n',' };let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};\n')+literal
assert late.count('\n')==text[begin:end].count('\n')
late_text=text[:begin]+late+text[end:]
controls['05-tuple-quote-last']=({**overrides,rel:late_text.encode()},'Keep the original R scalar branch grouping, move only the Pubkey result out of its 12-field tuple to a late key expression, and use03 final store ordering. This separates tuple key lifetime from scalar branch topology while preserving native-accounting behavior.')
price_start=text.index(' let price_check:std::result::Result<(),MayhemError> = (|| {',handler);price_end=text.index('})();price_check?;',price_start)+len('})();price_check?;')
old_price=text[price_start:price_end];price_body=old_price.split('(|| {',1)[1].rsplit('})();price_check?;',1)[0]
assert price_body.count('let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;')==1
price_body=price_body.replace('let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;','')
call=' v2_price_check(c.virtual_token_reserves as u128,c.virtual_sol_reserves as u128,reference,tolerance_bps)?;'
named=text[:price_start]+call+'\n'*old_price.count('\n')+text[price_end:]+'\n#[inline(always)]\nfn v2_price_check(vt:u128,vs:u128,reference:u128,tolerance_bps:u16)->core::result::Result<(),MayhemError> {'+price_body+'}\n'
controls['06-named-price']=({**overrides,rel:named.encode()},'Extract only SellV2 existing price closure into an inline scalar-argument helper, as in completed AMM Sell. Same arithmetic and error order, no compiler flags or guard changes. Tests caller borrow/register lifetimes against the first opcode divergence near original offset696.')
native_old='let native_accounting=a.quote_mint.key()==Pubkey::default()||a.quote_mint.key()==WSOL;let cap='
assert late_text[handler:].count(native_old)==1
head,tail=late_text[:handler],late_text[handler:]
native_new=tail.replace(native_old,'let native=a.quote_mint.key()==WSOL;let native_accounting=native||a.quote_mint.key()==Pubkey::default();let cap=',1)
assert native_new.count('\n let native=a.quote_mint.key()==WSOL;\n')==1
native_new=native_new.replace('\n let native=a.quote_mint.key()==WSOL;\n','\n \n',1)
controls['07-native-first']=({**overrides,rel:(head+native_new).encode()},'On05, compute the existing WSOL flag before the default-key accounting test and reuse it after sizing. Pure key membership is unchanged. Tests short-circuit/phi lifetime behind the first sizing CFG divergence, without changing price arithmetic or event values.')
if __name__=='__main__':
 for label in sys.argv[1:]:
  sources,hypothesis=controls[label];(D/(label+'-hypothesis.json')).write_text(json.dumps(dict(hypothesis=hypothesis,source_paths=list(sources)),indent=2)+'\n',encoding='utf-8');b.run(label,sources)
