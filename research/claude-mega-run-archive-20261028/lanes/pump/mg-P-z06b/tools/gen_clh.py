import sys, subprocess
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b'
REL='src/token_incentives/claim_token_incentives.rs'
base=open(f'{L}/var/cl_c10/{REL}').read().split('\n')
assert base[63].strip()=='{' and base[79].strip()=='}' and base[80].strip().startswith('let user = &mut accounts.user_volume_accumulator')
def helper(param, acc, auth_clone):
    a='authority: authority.clone(),' if auth_clone else 'authority,'
    return f'''
fn transfer_incentive_tokens<'info>({param}, amount: u64) -> Result<()> {{
    let authority = {acc}.global_volume_accumulator.to_account_info();
    token_interface::transfer_checked(
        CpiContext::new_with_signer(
            {acc}.token_program.to_account_info(),
            TransferChecked {{
                from: {acc}.global_incentive_token_account.to_account_info(),
                mint: {acc}.mint.to_account_info(),
                to: {acc}.user_ata.to_account_info(),
                {a}
            }},
            &[&[b"global_volume_accumulator", &[BUMP]]],
        ),
        amount,
        {acc}.mint.decimals,
    )
}}'''
V={
 'clh2': (['    transfer_incentive_tokens(accounts, ctx.bumps.global_volume_accumulator, amount)?;'],
          helper("accounts: &ClaimTokenIncentives<'info>, bump: u8", 'accounts', False).replace('BUMP','bump'), None),
 'clh2b':(['    transfer_incentive_tokens(accounts, ctx.bumps.global_volume_accumulator, amount)?;'],
          helper("accounts: &ClaimTokenIncentives<'info>, bump: u8", 'accounts', True).replace('BUMP','bump'), None),
 'clh1': (['    transfer_incentive_tokens(&ctx, amount)?;'],
          helper("ctx: &Context<'_, '_, '_, '_, ClaimTokenIncentives<'info>>", 'ctx.accounts', False).replace('BUMP','ctx.bumps.global_volume_accumulator'),
          '    let accounts = &mut *ctx.accounts;'),
}
for name in sys.argv[1:]:
    call, h, rebind = V[name]
    body = call + [''] * (17 - len(call))
    if rebind: body[-1] = rebind
    out = base[:63] + body + base[80:]
    assert len(out) == len(base)
    txt = '\n'.join(out).rstrip('\n') + '\n' + h + '\n'
    d=f'{L}/var/{name}'; subprocess.run(['rm','-rf',d]); subprocess.run(['cp','-c','-R',f'{L}/var/cl_c10',d],check=True)
    open(f'{d}/{REL}','w').write(txt); print(name)
