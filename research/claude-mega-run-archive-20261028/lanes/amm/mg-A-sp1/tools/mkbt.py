# mkbt.py VARIANTS_PY : append buy_transfers variants (dict name->tail) to trade_v2.rs from base
import sys
L='/Users/shawwalters/amm100-run/lanes/mg-A-sp1'
F=L+'/src/programs/pump-amm/src/instructions/swap/trade_v2.rs'
head='''#[inline(never)]
pub fn NAME<'info>(a: &mut TradeV2<'info>, result: &BuyResult) -> Result<u64> {
    crate::utils::token::transfer_from_pool(a.base_token_program.as_ref(), &a.base_mint, &a.pool_base_token_account, &a.user_base_token_account, result.base_amount_out, &a.pool)?;
    let buyback_fee = a.pool.accrue_fees(&a.global_config, result.fees.protocol_fee, result.fees.creator_fee)?;
    crate::utils::token::transfer_checked(a.quote_token_program.as_ref(), &a.quote_mint, &a.user_quote_token_account, &a.pool_quote_token_account, a.user.as_ref(), result.pool_quote_amount_in, &[])?;
'''
g={};exec(open(sys.argv[1]).read(),g)
s=open(L+'/trade_v2.base.rs').read()
for k,t in g['V'].items():
    s+=head.replace('NAME',k)+t+'    Ok(buyback_fee)\n}\n'
open(F,'w').write(s)
print(' '.join(g['V']))
