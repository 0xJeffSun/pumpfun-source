import sys, subprocess
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b'
REL='src/quote_control/update_quote_control_mints.rs'
s=open(f'{L}/var/aqh7a/{REL}').read()
lines=s.split('\n')
assert lines[75].strip().startswith('pay_rent(&ctx.accounts.system_program') and lines[90].strip()=='' and lines[91].strip().startswith('quote_control.mints.push')
CTXT="ctx: &Context<'_, '_, '_, '_, UpdateQuoteControlMints<'info>>"
H={
'a':'''
fn pay_rent<'info>(
    %s,
    to: &AccountInfo<'info>,
    lamports: u64,
) -> Result<()> {
    if lamports > 0 {
        transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.authority.to_account_info(),
                    to: to.clone(),
                },
            ),
            lamports,
        )?;
    }
    Ok(())
}''' % CTXT,
'b':'''
fn pay_rent<'info>(
    %s,
    to: &AccountInfo<'info>,
    lamports: u64,
) -> Result<()> {
    if lamports > 0 {
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.authority.to_account_info(),
                to: to.clone(),
            },
        );
        transfer(cpi_context, lamports)?;
    }
    Ok(())
}''' % CTXT,
'c':'''
fn pay_rent<'info>(
    %s,
    to: &AccountInfo<'info>,
    lamports: u64,
) -> Result<()> {
    if lamports == 0 {
        return Ok(());
    }
    transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.authority.to_account_info(),
                to: to.clone(),
            },
        ),
        lamports,
    )
}''' % CTXT,
}
for k in sys.argv[1:]:
    nl=list(lines)
    nl[75]='        pay_rent(&ctx, &info, lamports_diff)?;'
    nl[90]='    let quote_control = &mut ctx.accounts.quote_control;'
    body='\n'.join(nl)
    i=body.index('\nfn pay_rent<'); body=body[:i]+'\n'+H[k].lstrip('\n')+'\n'
    name='aqh8'+k; d=f'{L}/var/{name}'; subprocess.run(['rm','-rf',d]); subprocess.run(['cp','-c','-R',f'{L}/var/aqh7a',d],check=True)
    open(f'{d}/{REL}','w').write(body); print(name)
