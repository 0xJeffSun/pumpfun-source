import sys, subprocess
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'; L=W+'/lanes/mg-P-z06'
S12=W+'/lanes/r5-z06/var/srf12/src'
lib=open(f'{L}/src/src/lib.rs').read().split('\n')
lib12=open(f'{S12}/lib.rs').read().split('\n')
assert lib[294].strip().startswith('pub fn set_reserved_fee_recipients') and lib[300].strip()=='}'
new_lib=lib[:294]+lib12[294:300]+lib[300:]
assert len(new_lib)==len(lib)
mod=open(f'{S12}/set_reserved_fee_recipients.rs').read().split('\n')
assert mod[54].strip().startswith('let recipients: Vec<Pubkey>')
V={
 'srfA':["    let recipients: [Pubkey; 8] = ctx.remaining_accounts[..8].iter().map(|account| account.key()).collect::<Vec<Pubkey>>().try_into().map_err(|_| error!(PumpError::NotEnoughRemainingAccounts))?;",
         "    let reserved_fee_recipient = recipients[0];",
         "    let reserved_fee_recipients: [Pubkey; 7] = recipients[1..].try_into().unwrap();"],
 'srfB':["    let recipients: Vec<Pubkey> = ctx.remaining_accounts[..8].iter().map(|account| account.key()).collect();",
         "    let reserved_fee_recipient: Pubkey = recipients[0].to_bytes().try_into().map_err(|_| error!(PumpError::NotEnoughRemainingAccounts))?;",
         "    let reserved_fee_recipients: [Pubkey; 7] = recipients[1..].try_into().unwrap();"],
 'srfD':["    let recipients: [Pubkey; 8] = ctx.remaining_accounts[..8].iter().map(|account| account.key()).collect::<Vec<Pubkey>>().try_into().map_err(|_| ProgramError::InvalidArgument)?;",
         "    let reserved_fee_recipient = recipients[0];",
         "    let reserved_fee_recipients: [Pubkey; 7] = recipients[1..].try_into().unwrap();"],
 'srfE':["    let recipients: [Pubkey; 8] = ctx.remaining_accounts[..8].iter().map(|account| account.key()).collect::<Vec<Pubkey>>().try_into().map_err(|_| ProgramError::NotEnoughAccountKeys)?;",
         "    let reserved_fee_recipient = recipients[0];",
         "    let reserved_fee_recipients: [Pubkey; 7] = recipients[1..].try_into().map_err(|_| ProgramError::InvalidArgument)?;"],
 'srfG':["    let recipients: [Pubkey; 8] = ctx.remaining_accounts[..8].iter().map(|account| account.key()).collect::<Vec<Pubkey>>().try_into().unwrap();",
         "    let [reserved_fee_recipient, reserved_fee_recipients @ ..] = recipients;",
         ""],
 'srfH':["    let recipients: [Pubkey; 8] = ctx.remaining_accounts[..8].iter().map(|account| account.key()).collect::<Vec<Pubkey>>().try_into().unwrap();",
         "    let (reserved_fee_recipient, reserved_fee_recipients) = recipients.split_first().unwrap();",
         "    let (reserved_fee_recipient, reserved_fee_recipients): (Pubkey, [Pubkey; 7]) = (*reserved_fee_recipient, reserved_fee_recipients.try_into().unwrap());"],
 'srfI':["    let recipients: [Pubkey; 8] = core::array::from_fn(|i| ctx.remaining_accounts[i].key());",
         "    let reserved_fee_recipient = recipients[0];",
         "    let reserved_fee_recipients: [Pubkey; 7] = recipients[1..].try_into().unwrap();"],
 'srfC':["    let recipients: [Pubkey; 8] = ctx.remaining_accounts[..8].iter().map(|account| account.key()).collect::<Vec<Pubkey>>().try_into().unwrap();",
         "    let reserved_fee_recipient = recipients[0];",
         "    let reserved_fee_recipients: [Pubkey; 7] = recipients[1..].try_into().unwrap();"],
}
for name in sys.argv[1:]:
    d=f'{L}/var/{name}'; subprocess.run(['rm','-rf',d]); subprocess.run(['cp','-c','-R',f'{L}/src',d],check=True)
    open(f'{d}/src/lib.rs','w').write('\n'.join(new_lib))
    m=list(mod); m[54:57]=V[name]; assert len(m)==len(mod)
    open(f'{d}/src/set_reserved_fee_recipients.rs','w').write('\n'.join(m)); print(name)
