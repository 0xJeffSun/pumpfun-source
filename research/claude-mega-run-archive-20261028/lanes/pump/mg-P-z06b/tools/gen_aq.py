import sys, subprocess
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b'
REL='src/quote_control/update_quote_control_mints.rs'
base=open(f'{L}/var/aq2/{REL}').read().split('\n')
assert base[73].strip()=='if new_space > info.data_len() {' and base[89].strip()=='}'
# lines 75..89 (idx 74..88) = body of the if (15 lines)
CALL={
 'h7a': ['        let lamports_diff = Rent::get()?.minimum_balance(new_space).saturating_sub(info.lamports());',
         '        pay_rent(&ctx.accounts.system_program, &ctx.accounts.authority, &info, lamports_diff)?;',
         '        info.realloc(new_space, false)?;'],
 'h7b': ['        let required = Rent::get()?.minimum_balance(new_space);',
         '        let lamports_diff = required.saturating_sub(info.lamports());',
         '        pay_rent(&ctx.accounts.system_program, &ctx.accounts.authority, &info, lamports_diff)?;',
         '        info.realloc(new_space, false)?;'],
}
HELP={
 'h7a': '''
fn pay_rent<'info>(
    system_program: &AccountInfo<'info>,
    payer: &AccountInfo<'info>,
    to: &AccountInfo<'info>,
    lamports: u64,
) -> Result<()> {
    if lamports > 0 {
        transfer(
            CpiContext::new(
                system_program.clone(),
                Transfer {
                    from: payer.clone(),
                    to: to.clone(),
                },
            ),
            lamports,
        )?;
    }
    Ok(())
}''',
 'h7c': '''
fn pay_rent<'info>(
    system_program: &Program<'info, System>,
    payer: &Signer<'info>,
    to: &AccountInfo<'info>,
    lamports: u64,
) -> Result<()> {
    if lamports > 0 {
        transfer(
            CpiContext::new(
                system_program.to_account_info(),
                Transfer {
                    from: payer.to_account_info(),
                    to: to.clone(),
                },
            ),
            lamports,
        )?;
    }
    Ok(())
}''',
}
VARS={'aqh7a':('h7a','h7a'),'aqh7b':('h7b','h7a'),'aqh7c':('h7b','h7c')}
for name in sys.argv[1:]:
    c,h=VARS[name]; body=CALL[c]
    out=base[:74]+body+['']*(15-len(body))+base[89:]
    assert len(out)==len(base)
    txt='\n'.join(out).rstrip('\n')+'\n'+HELP[h]+'\n'
    d=f'{L}/var/{name}'; subprocess.run(['rm','-rf',d]); subprocess.run(['cp','-c','-R',f'{L}/var/aq2',d],check=True)
    open(f'{d}/{REL}','w').write(txt); print(name)
