import sys, subprocess
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b'
REL='src/token_incentives/claim_token_incentives.rs'
base=open(f'{L}/var/cl_c10/{REL}').read().split('\n')
assert base[63].strip()=='{' and base[79].strip()=='}'
def blk(clone):
    a='authority: authority.clone(),' if clone else 'authority,'
    return ['    {',
     '        let authority = accounts.global_volume_accumulator.to_account_info();',
     '        let signer_seeds: &[&[&[u8]]] = &[&[b"global_volume_accumulator", &[ctx.bumps.global_volume_accumulator]]];',
     '        token_interface::transfer_checked(',
     '            CpiContext::new_with_signer(',
     '                accounts.token_program.to_account_info(),',
     '                TransferChecked {',
     '                    from: accounts.global_incentive_token_account.to_account_info(),',
     '                    mint: accounts.mint.to_account_info(),',
     '                    to: accounts.user_ata.to_account_info(),',
     f'                    {a}',
     '                },',
     '                signer_seeds,',
     '            ),',
     '            amount,',
     '            accounts.mint.decimals,',
     '        )?;', '    }']
CT="ctx: &Context<'_, '_, '_, '_, ClaimTokenIncentives<'info>>"
H17=f'''
pub fn transfer_incentive_tokens<'info>({CT}, amount: u64) -> Result<()> {{
    let authority = ctx.accounts.global_volume_accumulator.to_account_info();
    let signer_seeds: &[&[&[u8]]] = &[&[b"global_volume_accumulator", &[ctx.bumps.global_volume_accumulator]]];
    token_interface::transfer_checked(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            TransferChecked {{
                from: ctx.accounts.global_incentive_token_account.to_account_info(),
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.user_ata.to_account_info(),
                authority,
            }},
            signer_seeds,
        ),
        amount,
        ctx.accounts.mint.decimals,
    )
}}'''
for name in sys.argv[1:]:
    if name in ('clh15','clh16'):
        b=blk(name=='clh15'); out=base[:63]+b+base[80:]   # 17 lines replaced by 18 -> drop one pad line later
        # remove one blank pad line after (lines 91-93 are blank pads)
        k=out.index('',63+len(b)+5); del out[k]
    else:
        b=['    transfer_incentive_tokens(&ctx, amount)?;']+['']*15+['    let accounts = &mut *ctx.accounts;']
        out=base[:63]+b+base[80:]
    assert len(out)==len(base), (len(out),len(base))
    txt='\n'.join(out)
    if name=='clh17': txt=txt.rstrip('\n')+'\n'+H17+'\n'
    d=f'{L}/var/{name}'; subprocess.run(['rm','-rf',d]); subprocess.run(['cp','-c','-R',f'{L}/var/cl_c10',d],check=True)
    open(f'{d}/{REL}','w').write(txt); print(name)
