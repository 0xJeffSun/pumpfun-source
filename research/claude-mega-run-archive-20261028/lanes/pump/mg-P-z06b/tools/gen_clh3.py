import sys, subprocess
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b'
REL='src/token_incentives/claim_token_incentives.rs'
src=open(f'{L}/var/clh2/{REL}').read()
i=src.index("\nfn transfer_incentive_tokens<'info>"); head=src[:i]
H={
'clh3':'''
fn transfer_incentive_tokens<'info>(accounts: &ClaimTokenIncentives<'info>, bump: u8, amount: u64) -> Result<()> {
    let authority = accounts.global_volume_accumulator.to_account_info();
    let signer_seeds: &[&[&[u8]]] = &[&[b"global_volume_accumulator", &[bump]]];
    token_interface::transfer_checked(
        CpiContext::new_with_signer(
            accounts.token_program.to_account_info(),
            TransferChecked {
                from: accounts.global_incentive_token_account.to_account_info(),
                mint: accounts.mint.to_account_info(),
                to: accounts.user_ata.to_account_info(),
                authority,
            },
            signer_seeds,
        ),
        amount,
        accounts.mint.decimals,
    )
}''',
'clh4':'''
fn transfer_incentive_tokens<'info>(accounts: &ClaimTokenIncentives<'info>, bump: u8, amount: u64) -> Result<()> {
    let authority = accounts.global_volume_accumulator.to_account_info();
    let bump = [bump];
    let signer_seeds: &[&[u8]] = &[b"global_volume_accumulator", &bump];
    token_interface::transfer_checked(
        CpiContext::new_with_signer(
            accounts.token_program.to_account_info(),
            TransferChecked {
                from: accounts.global_incentive_token_account.to_account_info(),
                mint: accounts.mint.to_account_info(),
                to: accounts.user_ata.to_account_info(),
                authority,
            },
            &[signer_seeds],
        ),
        amount,
        accounts.mint.decimals,
    )
}''',
'clh5':'''
fn transfer_incentive_tokens<'info>(accounts: &ClaimTokenIncentives<'info>, bump: u8, amount: u64) -> Result<()> {
    let authority = accounts.global_volume_accumulator.to_account_info();
    let signer_seeds: &[&[&[u8]]] = &[&[b"global_volume_accumulator", &[bump]]];
    let cpi_context = CpiContext::new_with_signer(
        accounts.token_program.to_account_info(),
        TransferChecked {
            from: accounts.global_incentive_token_account.to_account_info(),
            mint: accounts.mint.to_account_info(),
            to: accounts.user_ata.to_account_info(),
            authority,
        },
        signer_seeds,
    );
    token_interface::transfer_checked(cpi_context, amount, accounts.mint.decimals)
}''',
}
for name in sys.argv[1:]:
    d=f'{L}/var/{name}'; subprocess.run(['rm','-rf',d]); subprocess.run(['cp','-c','-R',f'{L}/var/clh2',d],check=True)
    open(f'{d}/{REL}','w').write(head+'\n'+H[name].lstrip('\n')+'\n'); print(name)
