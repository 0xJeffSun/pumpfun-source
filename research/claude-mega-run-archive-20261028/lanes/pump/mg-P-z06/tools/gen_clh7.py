import sys, subprocess
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06'
REL='src/token_incentives/claim_token_incentives.rs'
base=open(f'{L}/var/cl_c10/{REL}').read().split('\n')
assert base[63].strip()=='{' and base[79].strip()=='}'
CT="ctx: &Context<'_, '_, '_, '_, ClaimTokenIncentives<'info>>"
V={
'clh7': (['    let authority = accounts.global_volume_accumulator.to_account_info();',
          '    transfer_incentive_tokens(&ctx, &authority, amount)?;'], '    let accounts = &mut *ctx.accounts;',
f'''
fn transfer_incentive_tokens<'info>({CT}, authority: &AccountInfo<'info>, amount: u64) -> Result<()> {{
    token_interface::transfer_checked(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            TransferChecked {{
                from: ctx.accounts.global_incentive_token_account.to_account_info(),
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.user_ata.to_account_info(),
                authority: authority.clone(),
            }},
            &[&[b"global_volume_accumulator", &[ctx.bumps.global_volume_accumulator]]],
        ),
        amount,
        ctx.accounts.mint.decimals,
    )
}}'''),
'clh9': (['    let authority = accounts.global_volume_accumulator.to_account_info();',
          '    transfer_incentive_tokens(accounts, &authority, ctx.bumps.global_volume_accumulator, amount)?;'], None,
'''
fn transfer_incentive_tokens<'info>(accounts: &ClaimTokenIncentives<'info>, authority: &AccountInfo<'info>, bump: u8, amount: u64) -> Result<()> {
    token_interface::transfer_checked(
        CpiContext::new_with_signer(
            accounts.token_program.to_account_info(),
            TransferChecked {
                from: accounts.global_incentive_token_account.to_account_info(),
                mint: accounts.mint.to_account_info(),
                to: accounts.user_ata.to_account_info(),
                authority: authority.clone(),
            },
            &[&[b"global_volume_accumulator", &[bump]]],
        ),
        amount,
        accounts.mint.decimals,
    )
}'''),
}
for name in sys.argv[1:]:
    call, rebind, h = V[name]
    body = call + [''] * (17 - len(call))
    if rebind: body[-1] = rebind
    out = base[:63] + body + base[80:]
    assert len(out) == len(base)
    txt = '\n'.join(out).rstrip('\n') + '\n' + h + '\n'
    d=f'{L}/var/{name}'; subprocess.run(['rm','-rf',d]); subprocess.run(['cp','-c','-R',f'{L}/var/cl_c10',d],check=True)
    open(f'{d}/{REL}','w').write(txt); print(name)
