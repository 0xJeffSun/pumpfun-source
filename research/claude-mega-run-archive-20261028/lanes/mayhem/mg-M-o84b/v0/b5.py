import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/o0084-brute-r1/tools')
import t4
H=t4.H; BASEROOT=t4.BASEROOT; rep=t4.rep
SA=' let (input,minimum)='+t4.SELL_CALL+';\n'
NAT=' let native=a.quote_mint.key()==WSOL;\n'
BEF=' let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;\n'
V=[('h4-copy',H)]
V.append(('qk-bound',rep(rep(H,SA,' let quote_mint_key=a.quote_mint.key();\n'+SA.replace('a.quote_mint.key(),a.mayhem','quote_mint_key,a.mayhem')),NAT,' let native=quote_mint_key==WSOL;\n')))
V.append(('qk-bound-native-first',rep(rep(H,SA,' let quote_mint_key=a.quote_mint.key();let native=quote_mint_key==WSOL;\n'+SA.replace('a.quote_mint.key(),a.mayhem','quote_mint_key,a.mayhem')),NAT,'')))
V.append(('native-early',rep(rep(H,NAT,''),SA,NAT+SA)))
V.append(('native-very-early',rep(rep(H,NAT,''),' let a=&mut *ctx.accounts;\n',' let a=&mut *ctx.accounts;\n'+NAT)))
V.append(('before-tokens-first',rep(H,BEF,' let before_tokens=a.mayhem_base_token_vault.amount;let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};\n')))
V.append(('c-before-validate',rep(rep(H,' let c=&a.bonding_curve;\n',''),' a.mayhem_state.validate_quote(',' let c=&a.bonding_curve;\n a.mayhem_state.validate_quote(')) if False else ('skip',H))
V.append(('a-noreborrow',rep(rep(H,' let a=&mut *ctx.accounts;',' let a=&mut ctx.accounts;'),'pub fn sell_v2_handler(ctx:','pub fn sell_v2_handler(mut ctx:')))
V.append(('reload-curve-first',rep(H,'a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;','a.bonding_curve.reload()?;a.mayhem_base_token_vault.reload()?;')))
V.append(('balance-bound',rep(H,SA,' let balance=a.mayhem_base_token_vault.amount;\n'+SA.replace('a.mayhem_base_token_vault.amount,','balance,'))))
V.append(('vtok-bound',rep(H,SA,' let virtual_tokens=c.virtual_token_reserves;\n'+SA.replace('(c.virtual_token_reserves,','(virtual_tokens,'))))
V.append(('pricecheck-iflet',rep(H,'})();price_check?;','})();if let Err(e)=price_check{return Err(e.into());}')))
V.append(('pricecheck-match',rep(H,'})();price_check?;','})();match price_check{Ok(())=>{},Err(e)=>return Err(e.into())}')))
V.append(('pricecheck-direct',rep(H,' let price_check:std::result::Result<(),MayhemError> = (|| {','(|| -> std::result::Result<(),MayhemError> {').replace('})();price_check?;','})()?;')))
V.append(('cref-explicit',rep(H,' let c=&a.bonding_curve;',' let c:&curve_accounts::BondingCurve=&a.bonding_curve;')) if False else ('skip2',H))
V.append(('gp-ref-bound',rep(H,SA,' let global_params=&a.global_params;\n'+SA.replace(',&a.global_params,',',global_params,'))))
V.append(('gp-deref',rep(H,SA,SA.replace(',&a.global_params,',',&**a.global_params,'))))
V.append(('validate-key-bound',rep(H,'&a.global_params,&a.quote_mint.key())?;','&a.global_params,&a.quote_mint.key())?;')))
V.append(('qk-ref',rep(H,SA,SA.replace('a.quote_mint.key(),a.mayhem','*a.quote_mint.key,a.mayhem'))))
V.append(('record-key-bound',rep(H,' crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;',' let qk=a.quote_mint.key();crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&qk)?;')))
V=[v for v in V if not v[0].startswith('skip')]
VARIANTS=[(l,t,None) for l,t in V]
