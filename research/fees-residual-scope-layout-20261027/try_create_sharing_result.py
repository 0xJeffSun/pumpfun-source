from pathlib import Path
import subprocess,tarfile
W=Path('/workspace/fees-recovery');S=W/'source-create'
with tarfile.open(W/'create583-stdlib-copy-canonical-source/source.tar.gz') as a:a.extractall(S,filter='data')
p=S/'programs/pump-fees/src/instructions/fee_sharing/create_donation_fee_pda.rs';base=p.read_text();old='fn sharing_pair(ctx: &Context<CreateDonationFeePda>, creator: Pubkey, quote_mint: Pubkey) -> Result<(Pubkey, Pubkey)>';end='Ok((creator,quote_mint)) } let (creator, quote_mint) = sharing_pair(ctx,creator,quote_mint)?;';assert base.count(old)==base.count(end)==1
variants={
 'creator-only':base.replace(old,'fn sharing_pair(ctx: &Context<CreateDonationFeePda>, creator: Pubkey) -> Result<Pubkey>').replace(end,'Ok(creator) } let creator = sharing_pair(ctx,creator)?;'),
 'creator-quote-reference':base.replace(old,'fn sharing_pair(ctx: &Context<CreateDonationFeePda>, creator: Pubkey, quote_mint: &Pubkey) -> Result<(Pubkey, Pubkey)>').replace(end,'Ok((creator,*quote_mint)) } let (creator, quote_mint) = sharing_pair(ctx,creator,&quote_mint)?;'),
}
try:
 for label,source in variants.items():
  name='create583-sharing-'+label;p.write_text(source);proc=subprocess.run(['python3',str(W/'build_create_opts.py'),name,'--remap-path-prefix=programs/pump-fees/src/recovered_string.rs=/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs'],capture_output=True);print(name,proc.returncode,proc.stdout.decode(),proc.stderr.decode(),flush=True)
  dest=W/name
  with tarfile.open(dest/'source.tar.gz','w:gz') as a:
   for x in sorted(S.rglob('*')):
    if x.is_file():a.add(x,arcname=x.relative_to(S))
  if proc.returncode==0:subprocess.run(['python3',str(W/'measure_create.py'),str(dest/'symbols.so'),str(dest/'measure.json')],check=True)
finally:p.write_text(base)
