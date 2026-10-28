import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1
from v_ata1 import MS,MU,DATA,IS,IU,SEEDS,SIGNED_INNER,USER_INLINE,USER_INLINE_IX,CALL_OLD
from mux import mux
CTXT="ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>"
HDRC=f"#[inline(never)]\nfn create_token_account_v2__X<'info>({CTXT},account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,native:bool,token_program:&AccountInfo<'info>)->Result<()>{{\n"
SEEDSC=SEEDS.replace('&[bump]','&[ctx.bumps.pool_authority]')
SCALL=f"cta_signed__X(a,&a.bonding_curve,account,wallet,mint,token_program,{SEEDSC})?;"
V={}
V['C1']=HDRC+f" let a=&ctx.accounts;let token_program=token_program.clone();\n if native{{\n  {SCALL}\n }}else{{\n  {USER_INLINE_IX}\n }}\n Ok(())\n}}\n"+SIGNED_INNER
V['C2']=HDRC+f" let a=&ctx.accounts;let token_program=token_program.clone();\n if native{{\n  {SCALL}\n }}else{{\n  {USER_INLINE}\n }}\n Ok(())\n}}\n"+SIGNED_INNER
V['C3']=HDRC+f" let a=&ctx.accounts;let token_program=token_program.clone();\n if native{{\n  return {SCALL[:-2]}.map_err(Into::into);\n }}\n {USER_INLINE_IX}\n Ok(())\n}}\n"+SIGNED_INNER
V['C4']=HDRC+f" let token_program=token_program.clone();let a=&ctx.accounts;\n if native{{\n  {SCALL}\n }}else{{\n  {USER_INLINE_IX}\n }}\n Ok(())\n}}\n"+SIGNED_INNER
V['C5']=HDRC+f" let a=&ctx.accounts;let bump=ctx.bumps.pool_authority;let token_program=token_program.clone();\n if native{{\n  {SCALL.replace('ctx.bumps.pool_authority','bump')}\n }}else{{\n  {USER_INLINE_IX}\n }}\n Ok(())\n}}\n"+SIGNED_INNER
V['C6']=HDRC+f" let a=&ctx.accounts;let token_program=token_program.clone();\n if !native{{\n  {USER_INLINE_IX}\n }}else{{\n  {SCALL}\n }}\n Ok(())\n}}\n"+SIGNED_INNER
CALL_C="create_token_account_v2__X(&ctx,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;"
# ---- fund variants
FHC=f"#[inline(never)]\nfn fund_quote_token_account_v2__X<'info>({CTXT},amount:u64,native:bool)->Result<()>{{\n let a=&ctx.accounts;\n"
FHP="#[inline(never)]\npub fn fund_quote_token_account_v2__X<'info>(a:&MigrateV2<'info>,bump:u8,amount:u64,native:bool)->Result<()>{\n"
NATIVE=" a.bonding_curve.sub_lamports(amount)?;a.pool_authority_quote_account.add_lamports(amount)?;\n  anchor_lang::solana_program::program::invoke(&Instruction{program_id:anchor_spl::token::ID,accounts:vec![AccountMeta::new(a.pool_authority_quote_account.key(),false),AccountMeta::new_readonly(a.rent.key(),false),AccountMeta::new(a.bonding_curve.key(),false)],data:anchor_spl::token::spl_token::instruction::TokenInstruction::SyncNative.pack()},&[a.pool_authority_quote_account.to_account_info(),a.rent.to_account_info(),a.bonding_curve.to_account_info()])?;"
TQ1=("#[inline(always)]\nfn tq__X<'info>(a:&MigrateV2<'info>,from:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,authority:&Account<'info,crate::trade_types::BondingCurve>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{\n"
 " if amount==0{return Ok(())}\n let decimals=mint.decimals;\n anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(a.quote_token_program.to_account_info(),anchor_spl::token_2022::TransferChecked{from:from.clone(),to:a.pool_authority_quote_account.to_account_info(),authority:authority.to_account_info(),mint:mint.to_account_info()},signer_seeds),amount,decimals)\n}\n")
TQ3=TQ1.replace("from:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,authority:&Account<'info,crate::trade_types::BondingCurve>","authority:&Account<'info,crate::trade_types::BondingCurve>,from:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>")
BS_C="&[&[b\"bonding-curve\",a.base_mint.key().as_ref(),&[ctx.bumps.bonding_curve]]]"
BS_P="&[&[b\"bonding-curve\",a.base_mint.key().as_ref(),&[bump]]]"
T1C=f"tq__X(a,&a.associated_quote_bonding_curve,&a.quote_mint,&a.bonding_curve,amount,{BS_C})?;"
T3C=f"tq__X(a,&a.bonding_curve,&a.associated_quote_bonding_curve,&a.quote_mint,amount,{BS_C})?;"
def fbody(hdr,tcall,tq,neg=False):
    if neg: return hdr+f" if !native{{\n  {tcall}\n }}else{{\n {NATIVE}\n }}\n Ok(())\n}}\n"+tq
    return hdr+f" if native{{\n {NATIVE}\n }}else{{\n  {tcall}\n }}\n Ok(())\n}}\n"+tq
FV={}
FV['F1']=fbody(FHC,T1C,TQ1)
FV['F2']=fbody(FHC,T1C,TQ1,True)
FV['F3']=fbody(FHC,T3C,TQ3)
FV['F4']=fbody(FHC,T3C,TQ3,True)
FV['F6']=fbody(FHP,T1C.replace(BS_C,BS_P),TQ1)
FV['F7']=fbody(FHP,T3C.replace(BS_C,BS_P),TQ3)
FV['F8']=fbody(FHP,T3C.replace(BS_C,BS_P),TQ3,True)
FCALL_OLD="fund_quote_token_account_v2(&ctx,quote,native)?;"
def fcall(tag): return "fund_quote_token_account_v2__X(a,ctx.bumps.bonding_curve,quote,native)?;" if tag in ('F6','F7','F8') else "fund_quote_token_account_v2__X(&ctx,quote,native)?;"
if __name__=='__main__':
    d=v_r1.variant('M2')
    mux(d,'migrate_v2.rs',V,CALL_OLD,CALL_C,'ctx.remaining_accounts.len()')
    # fund mux: per-variant call shapes differ -> build arms manually
    p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{201+i}=>{{{fcall(t).replace('__X','_'+t)}}}" for i,t in enumerate(FV))
    s=s.replace(FCALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{FCALL_OLD}}}}}",1)
    for t,txt in FV.items(): s+=txt.replace('__X','_'+t)+'\n'
    open(p,'w').write(s)
    print(d,list(V),list(FV))
