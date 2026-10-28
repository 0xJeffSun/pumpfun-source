import sys, subprocess
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06'
REL='src/token_incentives/claim_token_incentives.rs'
base=open(f'{L}/var/cl_c10/{REL}').read().split('\n')
assert base[63].strip()=='{' and base[79].strip()=='}'
def body(auth, seeds_first):
    b=['    let transfer = |amount: u64| -> Result<()> {',
       '        let authority = accounts.global_volume_accumulator.to_account_info();']
    if seeds_first:
        b.append('        let signer_seeds: &[&[&[u8]]] = &[&[b"global_volume_accumulator", &[ctx.bumps.global_volume_accumulator]]];')
    b+=['        token_interface::transfer_checked(',
        '            CpiContext::new_with_signer(',
        '                accounts.token_program.to_account_info(),',
        '                TransferChecked {',
        '                    from: accounts.global_incentive_token_account.to_account_info(),',
        '                    mint: accounts.mint.to_account_info(),',
        '                    to: accounts.user_ata.to_account_info(),',
        f'                    {auth}',
        '                },',
        '                signer_seeds,' if seeds_first else '                &[&[b"global_volume_accumulator", &[ctx.bumps.global_volume_accumulator]]],',
        '            ),',
        '            amount,',
        '            accounts.mint.decimals,',
        '        )',
        '    };',
        '    transfer(amount)?;']
    return b
V={'clh18':('authority,',False),'clh19':('authority: authority.clone(),',False),'clh20':('authority,',True)}
for name in sys.argv[1:]:
    b=body(*V[name]); out=base[:63]+b+base[80:]
    extra=len(out)-len(base)
    # drop `extra` blank pad lines after the event literal (orig pads at lines 91-93, 96-111)
    k=63+len(b)
    while extra>0:
        if out[k]=='' : del out[k]; extra-=1
        else: k+=1
    assert len(out)==len(base)
    d=f'{L}/var/{name}'; subprocess.run(['rm','-rf',d]); subprocess.run(['cp','-c','-R',f'{L}/var/cl_c10',d],check=True)
    open(f'{d}/{REL}','w').write('\n'.join(out)); print(name)
