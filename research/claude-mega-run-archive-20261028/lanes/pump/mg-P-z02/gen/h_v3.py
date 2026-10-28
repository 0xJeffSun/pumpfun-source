import os, runpy
g = runpy.run_path(os.path.dirname(os.path.abspath(__file__)) + '/h_v2.py')
C, OLD, R = g['C'], g['OLD'], g['R']
SIG = "fn transfer_tokens_{S}<'info>(token_program:&Interface<'info,TokenInterface>,from:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,to:&AccountInfo<'info>,authority:&UncheckedAccount<'info>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{\n"
TC = "anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(token_program.to_account_info(),anchor_spl::token_2022::TransferChecked{from:from.clone(),mint:mint.to_account_info(),to:to.clone(),authority:authority.to_account_info()},signer_seeds),amount,%s)"
CALL = "   transfer_tokens_{S}(&a.quote_token_program,&source.to_account_info(),&a.quote_mint,recipient_token_account,&a.holder_rewards,amount,&[seeds])?;\n"
H = {
 'i': (SIG + " if amount==0{return Ok(())}\n " + TC % 'mint.decimals' + "\n}\n", CALL),
 'j': (SIG + " if amount==0{return Ok(())}\n let decimals=mint.decimals;\n " + TC % 'decimals' + "\n}\n", CALL),
 'k': (SIG.replace("authority:&UncheckedAccount<'info>", "authority:&AccountInfo<'info>") + " if amount==0{return Ok(())}\n " + (TC % 'mint.decimals').replace('authority:authority.to_account_info()', 'authority:authority.clone()') + "\n}\n", CALL),
 'm': (SIG + " if amount==0{return Ok(())}\n " + TC % 'mint.decimals' + "\n}\n", "   let from=source.to_account_info();\n" + CALL.replace('&source.to_account_info()', '&from')),
}
VARIANTS = {k: h + R(C, OLD, call) for k, (h, call) in H.items()}
