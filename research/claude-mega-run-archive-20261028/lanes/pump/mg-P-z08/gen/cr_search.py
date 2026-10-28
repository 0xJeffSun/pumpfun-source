#!/usr/bin/env python3
"""Random search over create-handler source forms (IR multiplex: unused pub fn copies in pub mod crv at end of lib.rs).
Usage: cr_search.py ROUNDS PER SEED"""
import random, subprocess, sys, json, re, os, shutil
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08'
rounds, per, seed = int(sys.argv[1]), int(sys.argv[2]), int(sys.argv[3]); rnd = random.Random(seed)
CH = {  # dimension -> options
 'acc': ['{let a=&mut *ctx.accounts;let curve:&mut trade_types::BondingCurve=&mut a.bonding_curve;let g=&a.global;',
         '{let g=&ctx.accounts.global;let curve=&mut ctx.accounts.bonding_curve;',
         '{let a=&mut *ctx.accounts;let g=&a.global;let curve:&mut trade_types::BondingCurve=&mut a.bonding_curve;'],
 'qm': ['let quote_mint=Pubkey::default();let virtual_quote_reserves=if quote_mint==Pubkey::default(){g.initial_virtual_sol_reserves}else{g.initial_virtual_quote_reserves};',
        'let quote_mint=Pubkey::default();let virtual_quote_reserves=if quote_mint!=Pubkey::default(){g.initial_virtual_quote_reserves}else{g.initial_virtual_sol_reserves};',
        'let quote_mint=Pubkey::default();let is_sol=quote_mint==Pubkey::default();let virtual_quote_reserves=if is_sol{g.initial_virtual_sol_reserves}else{g.initial_virtual_quote_reserves};'],
 'clones': ['pre', 'inline', 'post'],
 'seeds': ['let', 'inline'],
 'aref': ['let a=&ctx.accounts;', 'let a=&*ctx.accounts;'],
 'ev_ts': ['inline', 'let'],
}
STORES = "curve.virtual_quote_reserves=virtual_quote_reserves;curve.initial_virtual_quote_reserves=virtual_quote_reserves;curve.virtual_token_reserves=g.initial_virtual_token_reserves;curve.real_token_reserves=g.initial_real_token_reserves;curve.real_quote_reserves=0;curve.token_total_supply=g.token_total_supply;curve.creator=creator;curve.quote_mint=quote_mint;curve.post_complete_base_out=0;curve.creator_fee_bps=0;curve.post_complete_quote_in=0;curve.depth=0;curve.is_mayhem_mode=false;curve.is_cashback_coin=false;curve.can_edit_creator_fee=false;curve.is_holder_reward=false;}"
def body(c):
    s = "require_keys_neq!(creator,Pubkey::default(),PumpError::CreatorShouldNotBeZero);\n"
    clones = "let name_c=name.clone();let symbol_c=symbol.clone();let uri_c=uri.clone();"
    if c['clones'] == 'pre': s += clones
    s += CH['acc'][c['acc']] + CH['qm'][c['qm']] + STORES + CH['aref'][c['aref']]
    if c['clones'] == 'post': s += clones
    if c['seeds'] == 'let':
        s += 'let bump=[ctx.bumps.mint_authority];let seeds:&[&[u8]]=&[b"mint-authority",&bump];'; SEED = '&[seeds]'
    else:
        SEED = '&[&[b"mint-authority",&[ctx.bumps.mint_authority]]]'
    nm = ('name_c', 'symbol_c', 'uri_c') if c['clones'] != 'inline' else ('name.clone()', 'symbol.clone()', 'uri.clone()')
    s += ("anchor_spl::metadata::create_metadata_accounts_v3(CpiContext::new_with_signer(a.mpl_token_metadata.to_account_info(),anchor_spl::metadata::CreateMetadataAccountsV3{"
          "metadata:a.metadata.to_account_info(),mint:a.mint.to_account_info(),mint_authority:a.mint_authority.to_account_info(),payer:a.user.to_account_info(),update_authority:a.mint_authority.to_account_info(),system_program:a.system_program.to_account_info(),rent:a.rent.to_account_info(),"
          f"}},{SEED}),anchor_spl::metadata::mpl_token_metadata::types::DataV2{{name:{nm[0]},symbol:{nm[1]},uri:{nm[2]},seller_fee_basis_points:0,creators:Some(vec![anchor_spl::metadata::mpl_token_metadata::types::Creator{{address:creator,verified:false,share:100}}]),collection:None,uses:None}},false,true,None,)?;\n")
    s += f"anchor_spl::token::mint_to(CpiContext::new_with_signer(a.token_program.to_account_info(),anchor_spl::token::MintTo{{mint:a.mint.to_account_info(),to:a.associated_bonding_curve.to_account_info(),authority:a.mint_authority.to_account_info()}},{SEED}),a.global.token_total_supply)?;\n"
    s += f"anchor_spl::token::set_authority(CpiContext::new_with_signer(a.token_program.to_account_info(),anchor_spl::token::SetAuthority{{current_authority:a.mint_authority.to_account_info(),account_or_mint:a.mint.to_account_info()}},{SEED}),anchor_spl::token::spl_token::instruction::AuthorityType::MintTokens,None)?;\n"
    ts = 'Clock::get()?.unix_timestamp'
    if c['ev_ts'] == 'let': s += 'let timestamp=Clock::get()?.unix_timestamp;'; ts = 'timestamp'
    s += ("let event=CreateEvent{name,symbol,uri,mint:a.mint.key(),bonding_curve:a.bonding_curve.key(),user:a.user.key(),creator,timestamp:" + ts +
          ",virtual_token_reserves:a.global.initial_virtual_token_reserves,virtual_sol_reserves:a.global.initial_virtual_sol_reserves,real_token_reserves:a.global.initial_real_token_reserves,token_total_supply:a.global.token_total_supply,token_program:a.token_program.key(),is_mayhem_mode:false,is_cashback_enabled:false,quote_mint:Pubkey::default(),virtual_quote_reserves:a.global.initial_virtual_sol_reserves,creator_fee_bps:0,is_holder_reward:false,depth:0};\n")
    s += "emit!(event);emit_cpi!(event);Ok(())"
    return s
state_f = f'{L}/v/cr_state.json'
best = json.load(open(state_f)) if os.path.exists(state_f) else {'c': {'acc': 0, 'qm': 0, 'clones': 'pre', 'seeds': 'let', 'aref': 0, 'ev_ts': 'inline'}, 'score': [99999, 0]}
def mutate(c):
    c = dict(c)
    for _ in range(rnd.choice([1, 1, 2])):
        k = rnd.choice(list(CH)); opts = CH[k]
        c[k] = rnd.randrange(len(opts)) if isinstance(c[k], int) else rnd.choice(opts)
    return c
log = open(f'{L}/v/cr_search.log', 'a')
for r in range(rounds):
    cands = {f'r{r}k{k}': (best['c'] if (r == 0 and k == 0) else mutate(best['c'])) for k in range(per)}
    shutil.rmtree(f'{L}/v/crS', ignore_errors=True); os.makedirs(f'{L}/v/crS')
    src = f'{L}/v/crS/src'; subprocess.run(['cp', '-c', '-R', f'{L}/src', src], check=True)
    p = src + '/src/lib.rs'; t = open(p).read()
    mod = "\npub mod crv {\n use super::*;\n"
    for name, c in cands.items():
        mod += f" #[inline(never)]\n pub fn create_{name}(ctx:Context<Create>,name:String,symbol:String,uri:String,creator:Pubkey)->Result<()>{{\n{body(c)}\n }}\n"
    open(p, 'w').write(t + mod + "}\n")
    b = subprocess.run([f'{L}/tools/irb.sh', src, 'crS'], capture_output=True, text=True)
    if 'FAILED' in b.stdout: log.write(f'round {r} build failed: {b.stdout[-400:]}\n'); log.flush(); break
    ir = f'{L}/ir/crS.ll'; irt = open(ir).read()
    for name, c in cands.items():
        fn = f'create_{name}17'
        if re.search(r'@\S*' + fn + r'\S* = .*alias', irt): continue
        subprocess.run([sys.executable, '-B', f'{L}/../mg-P-z06/tools/xfn.py', ir, fn, f'{L}/llx/C.ll'], capture_output=True)
        out = subprocess.run([f'{L}/tools/llt.sh', f'{L}/llx/C.ll', 'C', '0x138b20', fn], capture_output=True, text=True).stdout
        m = re.search(r'size (\d+) .*ratio=([\d.]+) diffslots=(\d+)', out)
        if not m: continue
        sc = [int(m.group(3)), -float(m.group(2))]
        log.write(f'{name} {json.dumps(c)} size={m.group(1)} ratio={m.group(2)} diff={m.group(3)}\n')
        if sc < best['score']:
            best = {'c': c, 'score': sc}; json.dump(best, open(state_f, 'w')); log.write(f'  NEW BEST {sc}\n')
    log.flush()
log.write(f'done best={best}\n'); log.close()
