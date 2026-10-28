from pathlib import Path
import subprocess,tarfile
W=Path('/workspace/fees-recovery');p=W/'source-crank/programs/pump-fees/src/lib.rs';base=(W/'crank583.baseline.rs').read_text()
start=base.index('    pub fn crank_donation_fee_pda(');brace=base.index('{',start);end=base.index('\n    }',brace)
body=base[brace+1:end];assert body.count('emit!(event);emit_cpi!(event);Ok(())')==1
variants={
 'closure':base[:brace+1]+'(||{'+body+'})()'+base[end:],
 'inline-helper':base[:brace+1]+'crate::recovered_crank(ctx)'+base[end:]+'\n#[inline(always)] fn recovered_crank(ctx:Context<CrankDonationFeePda>)->Result<()> {'+body+'}\n',
}
helper=body.replace('emit!(event);emit_cpi!(event);Ok(())','emit(&mut ctx,event)')
variants['emitter-boundary']=base[:brace+1]+'crate::recovered_crank(ctx,|ctx,event|{emit!(event);emit_cpi!(event);Ok(())})'+base[end:]+'\n#[inline(always)] fn recovered_crank(mut ctx:Context<CrankDonationFeePda>,emit:impl FnOnce(&mut Context<CrankDonationFeePda>,DonationFeePdaCranked)->Result<()>)->Result<()> {'+helper+'}\n'
try:
 for label,source in variants.items():
  name='crank583-boundary-'+label;p.write_text(source);proc=subprocess.run(['python3',str(W/'build_crank.py'),name],capture_output=True);print(name,proc.returncode,proc.stdout.decode(),proc.stderr.decode(),flush=True)
  dest=W/name
  with tarfile.open(dest/'source.tar.gz','w:gz') as archive:
   for item in sorted((W/'source-crank').rglob('*')):
    if item.is_file():archive.add(item,arcname=item.relative_to(W/'source-crank'))
  if proc.returncode==0:subprocess.run(['python3',str(W/'measure_crank.py'),str(dest/'symbols.so'),str(dest/'measure.json')],check=True)
finally:p.write_text(base)
