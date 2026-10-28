from pathlib import Path
import subprocess,tarfile
W=Path('/workspace/fees-recovery');p=W/'source-create/programs/pump-fees/src/instructions/fee_sharing/create_donation_fee_pda.rs';lib=p.parents[2]/'lib.rs';base=(W/'create583.baseline.rs').read_text();libbase=(W/'stdlib-copy.base.lib.rs').read_text();lib.write_text(libbase)
old='let curve = &ctx.accounts.bonding_curve;';begin='let creator_result:Result<(Pubkey,Pubkey)>=try {if curve.real_sol_reserves != 0';end='}}; let (creator, quote_mint) = creator_result?;';assert all(base.count(x)==1 for x in [old,begin,end])
source=base.replace(old,'#[inline(always)] fn creator_pair(ctx:&Context<CreateDonationFeePda>)->Result<(Pubkey,Pubkey)> { let curve = &ctx.accounts.bonding_curve;').replace(begin,'let pair=if curve.real_sol_reserves != 0').replace(end,'}; Ok(pair) } let (creator, quote_mint) = creator_pair(ctx)?;')
assert len(source.splitlines())==len(base.splitlines())
try:
 p.write_text(source);name='create583-creator-function';r=subprocess.run(['python3',str(W/'build_create.py'),name],capture_output=True);print(r.returncode,r.stdout.decode(),r.stderr.decode(),flush=True)
 with tarfile.open(W/name/'source.tar.gz','w:gz') as a:
  for x in sorted((W/'source-create').rglob('*')):
   if x.is_file():a.add(x,arcname=x.relative_to(W/'source-create'))
 if r.returncode==0:subprocess.run(['python3',str(W/'measure_create.py'),str(W/name/'symbols.so'),str(W/name/'measure.json')],check=True)
finally:p.write_text(base)
