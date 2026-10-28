import os, runpy
v1 = runpy.run_path(os.path.dirname(os.path.abspath(__file__)) + '/h_v1.py')
C = v1['VARIANTS']['c']
def R(t, a, b):
    assert t.count(a) == 1, a; return t.replace(a, b)
OLD = ("   let from=source.to_account_info();\n"
       "   if amount!=0 {anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(a.quote_token_program.to_account_info(),anchor_spl::token_2022::TransferChecked{from,mint:a.quote_mint.to_account_info(),to:recipient_token_account.clone(),authority:a.holder_rewards.to_account_info()},&[seeds]),amount,a.quote_mint.decimals)?;}\n")
assert OLD in C, 'old'
CALL = "   transfer_tokens_{S}(&a.quote_token_program,source.to_account_info(),&a.quote_mint,recipient_token_account,&a.holder_rewards,amount,&[seeds])?;\n"
SIG = "fn transfer_tokens_{S}<'info>(token_program:&Interface<'info,TokenInterface>,from:AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,to:&AccountInfo<'info>,authority:&UncheckedAccount<'info>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{\n"
TC = "anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(token_program.to_account_info(),anchor_spl::token_2022::TransferChecked{from,mint:mint.to_account_info(),to:to.clone(),authority:authority.to_account_info()},signer_seeds),amount,%s)"
H = {
 'e': SIG + " if amount==0{return Ok(())}\n " + TC % 'mint.decimals' + "\n}\n",
 'f': SIG + " if amount>0{\n  " + TC % 'mint.decimals' + "?;\n }\n Ok(())\n}\n",
 'g': SIG + " if amount==0{return Ok(())}\n let decimals=mint.decimals;\n " + TC % 'decimals' + "\n}\n",
}
VARIANTS = {k: h + R(C, OLD, CALL) for k, h in H.items()}
# h: control - helper takes &source and clones inside
SIGH = SIG.replace('from:AccountInfo<\'info>', 'source:&InterfaceAccount<\'info,TokenAccount>')
VARIANTS['h'] = SIGH + " if amount==0{return Ok(())}\n " + (TC % 'mint.decimals').replace('{from,', '{from:source.to_account_info(),') + "\n}\n" + R(C, OLD, CALL.replace('source.to_account_info()', 'source'))
