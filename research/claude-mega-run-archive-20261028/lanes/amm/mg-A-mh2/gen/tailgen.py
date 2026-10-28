# tailgen.py VARIANT : lane file = gen/mh_best_k35.rs with tail (lines 390..393) variants; line 389 kept
import sys
L='/Users/shawwalters/amm100-run/lanes/mg-A-mh2'
s=open(L+'/gen/mh_best_k35.rs').read().split('\n')
assert 'require_gte!(amount, min_amount_out' in s[388]
old=s[389:394]
assert old[0].startswith('    if ctx.accounts.user_volume_accumulator.user == Pubkey::default()') and old[4]=='}', old
V={
'T1':['    let user = ctx.accounts.user.key();','    if ctx.accounts.user_volume_accumulator.user == Pubkey::default() {','        ctx.accounts.user_volume_accumulator.user = user;','    }','    Ok(())'],
'T2':['    let accumulator = &mut ctx.accounts.user_volume_accumulator;','    if accumulator.user == Pubkey::default() {','        accumulator.user = ctx.accounts.user.key();','    }','    Ok(())'],
'T4':['    if ctx.accounts.user_volume_accumulator.user != Pubkey::default() {','        return Ok(());','    }','    ctx.accounts.user_volume_accumulator.user = ctx.accounts.user.key();','    Ok(())'],
'T5':['    let user = &ctx.accounts.user;','    if ctx.accounts.user_volume_accumulator.user == Pubkey::default() {','        ctx.accounts.user_volume_accumulator.user = user.key();','    }','    Ok(())'],
'T6':['    let accounts = ctx.accounts;','    if accounts.user_volume_accumulator.user == Pubkey::default() {','        accounts.user_volume_accumulator.user = accounts.user.key();','    }','    Ok(())'],
}
new=V[sys.argv[1]]
s[389:394]=new
open(L+'/src/programs/pump-amm/src/instructions/swap/multi_hop_swap.rs','w').write('\n'.join(s)); print('ok')
