import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1
from mux import mux
MS="vec![AccountMeta::new(a.pool_authority.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false),AccountMeta::new_readonly(curve.key(),false)]"
MU="vec![AccountMeta::new(a.user.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false)]"
DATA="anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()"
IS="&[a.pool_authority.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program,curve.to_account_info()]"
IU="&[a.user.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program]"
HDR="#[inline(never)]\npub fn create_token_account_v2__X<'info>(a:&MigrateV2<'info>,bump:u8,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,native:bool,token_program:&AccountInfo<'info>)->Result<()>{\n"
SEEDS="&[&[b\"pool-authority\",a.base_mint.key().as_ref(),&[bump]]]"
SIGNED_INNER=("#[inline(always)]\nfn cta_signed__X<'info>(a:&MigrateV2<'info>,curve:&Account<'info,crate::trade_types::BondingCurve>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,token_program:AccountInfo<'info>,signer_seeds:&[&[&[u8]]])->anchor_lang::solana_program::entrypoint::ProgramResult{\n"
 f" let ix=Instruction{{program_id:anchor_spl::associated_token::ID,accounts:{MS},data:{DATA}}};\n invoke_signed(&ix,{IS},signer_seeds)\n}}\n")
SIGNED_CALL=f"cta_signed__X(a,&a.bonding_curve,account,wallet,mint,token_program,{SEEDS})?;"
USER_INLINE=f"let ix=Instruction{{program_id:anchor_spl::associated_token::ID,accounts:{MU},data:{DATA}}};anchor_lang::solana_program::program::invoke(&ix,{IU})?;"
USER_INLINE_IX=f"anchor_lang::solana_program::program::invoke(&Instruction{{program_id:anchor_spl::associated_token::ID,accounts:{MU},data:{DATA}}},{IU})?;"
USER_INNER=("#[inline(always)]\nfn cta_user__X<'info>(a:&MigrateV2<'info>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,token_program:AccountInfo<'info>)->Result<()>{\n"
 f" {USER_INLINE}\n Ok(())\n}}\n")
V={}
V['A1']=HDR+f" let token_program=token_program.clone();\n if native{{\n  {SIGNED_CALL}\n }}else{{\n  {USER_INLINE}\n }}\n Ok(())\n}}\n"+SIGNED_INNER
V['A2']=HDR+f" let token_program=token_program.clone();\n if !native{{\n  {USER_INLINE}\n }}else{{\n  {SIGNED_CALL}\n }}\n Ok(())\n}}\n"+SIGNED_INNER
V['A3']=HDR+f" let token_program=token_program.clone();\n if native{{\n  {SIGNED_CALL}\n }}else{{\n  cta_user__X(a,account,wallet,mint,token_program)?;\n }}\n Ok(())\n}}\n"+SIGNED_INNER+USER_INNER
V['A4']=HDR+f" let token_program=token_program.clone();\n if native{{\n  {SIGNED_CALL}\n }}else{{\n  {USER_INLINE_IX}\n }}\n Ok(())\n}}\n"+SIGNED_INNER
V['A5']=HDR+f" if native{{\n  {SIGNED_CALL.replace('token_program,','token_program.clone(),',1)}\n }}else{{\n  {USER_INLINE.replace(',token_program]',',token_program.clone()]')}\n }}\n Ok(())\n}}\n"+SIGNED_INNER
V['A6']=HDR+f" let token_program=token_program.clone();\n if native{{\n  return {SIGNED_CALL[:-2]}.map_err(Into::into);\n }}\n {USER_INLINE}\n Ok(())\n}}\n"+SIGNED_INNER
V['A7']=HDR+f" let token_program=token_program.clone();\n if !native{{\n  {USER_INLINE}\n return Ok(());\n }}\n {SIGNED_CALL}\n Ok(())\n}}\n"+SIGNED_INNER
V['A8']=HDR+f" let token_program=token_program.clone();\n if native{{\n  {SIGNED_CALL}\n  return Ok(());\n }}\n {USER_INLINE}\n Ok(())\n}}\n"+SIGNED_INNER
CALL_OLD="create_token_account_v2(a,bump,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;"
CALL_T="create_token_account_v2__X(a,bump,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;"
if __name__=='__main__':
    d=v_r1.variant('MA1')
    mux(d,'migrate_v2.rs',V,CALL_OLD,CALL_T,'ctx.remaining_accounts.len()')
    print(d, list(V))
