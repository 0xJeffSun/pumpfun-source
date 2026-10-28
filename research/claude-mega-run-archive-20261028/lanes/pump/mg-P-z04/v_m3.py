import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1
from v_m2 import FHC,NATIVE,BS_C,fbody
SIG="#[inline(always)]\nfn tq__X<'info>(a:&MigrateV2<'info>,mint:&InterfaceAccount<'info,Mint>,from:&AccountInfo<'info>,authority:&Account<'info,crate::trade_types::BondingCurve>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{\n if amount==0{return Ok(())}\n"
CPI="anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(a.quote_token_program.to_account_info(),anchor_spl::token_2022::TransferChecked{{from:from.clone(),to:a.pool_authority_quote_account.to_account_info(),authority:authority.to_account_info(),mint:{M}}},signer_seeds),amount,decimals)\n}}\n"
TC=f"tq__X(a,&a.quote_mint,&a.associated_quote_bonding_curve,&a.bonding_curve,amount,{BS_C})?;"
FV={}
FV['H1']=fbody(FHC,TC,SIG+" let decimals=mint.decimals;let mint_info:&AccountInfo<'info>=mint.as_ref();\n "+CPI.format(M='mint_info.clone()'))
FV['H2']=fbody(FHC,TC,SIG+" let decimals=mint.decimals;let mint=mint.to_account_info();\n "+CPI.format(M='mint'))
FV['H3']=fbody(FHC,TC,SIG+" let decimals=mint.decimals;\n "+CPI.format(M='mint.to_account_info()'))
FV['H4']=fbody(FHC,TC,SIG+" let decimals=mint.decimals;let mint:&AccountInfo<'info>=mint.as_ref();\n "+CPI.format(M='mint.to_account_info()'))
FV['H5']=fbody(FHC,TC,SIG+" let decimals=mint.decimals;\n "+CPI.replace("to:a.pool_authority_quote_account.to_account_info(),authority:authority.to_account_info(),mint:{M}","mint:{M},to:a.pool_authority_quote_account.to_account_info(),authority:authority.to_account_info()").format(M='mint.to_account_info()'))
FV['H6']=fbody(FHC,TC,SIG+" let mint_info:&AccountInfo<'info>=mint.as_ref();let decimals=mint.decimals;\n "+CPI.format(M='mint_info.clone()'))
FCALL_OLD="fund_quote_token_account_v2(&ctx,quote,native)?;"
if __name__=='__main__':
    d=v_r1.variant('M3')
    p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{201+i}=>{{fund_quote_token_account_v2_{t}(&ctx,quote,native)?;}}" for i,t in enumerate(FV))
    s=s.replace(FCALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{FCALL_OLD}}}}}",1)
    for t,txt in FV.items(): s+=txt.replace('__X','_'+t)+'\n'
    open(p,'w').write(s); print(d,list(FV))
