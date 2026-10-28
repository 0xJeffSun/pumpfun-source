from pathlib import Path
import subprocess,tarfile
W=Path('/workspace/fees-recovery');p=W/'source-crank/programs/pump-fees/src/lib.rs';base=(W/'crank583.baseline.rs').read_text()
old='let native_info=ctx.accounts.donation_fee_pda_ata.borrowed_info();';reload='ctx.accounts.donation_fee_pda_ata.reload_from_info(native_info)?;'
assert base.count(old)==base.count(reload)==1
standard=base.replace(old,'let native_info: &AccountInfo=ctx.accounts.donation_fee_pda_ata.as_ref();')
manual='{let data=ctx.accounts.donation_fee_pda_ata.as_ref().try_borrow_data()?; let inner=anchor_spl::token::TokenAccount::try_deserialize(&mut &data[..])?; drop(data);ctx.accounts.donation_fee_pda_ata.set_inner(inner);}'
variants={'public-as-ref':standard.replace(reload,'ctx.accounts.donation_fee_pda_ata.reload()?;'),'public-manual-reload':standard.replace(reload,manual)}
try:
 for label,source in variants.items():
  name='crank583-reload-'+label;p.write_text(source);proc=subprocess.run(['python3',str(W/'build_crank.py'),name],capture_output=True);print(name,proc.returncode,proc.stdout.decode(),proc.stderr.decode(),flush=True)
  dest=W/name
  with tarfile.open(dest/'source.tar.gz','w:gz') as archive:
   for item in sorted((W/'source-crank').rglob('*')):
    if item.is_file():archive.add(item,arcname=item.relative_to(W/'source-crank'))
  if proc.returncode==0:subprocess.run(['python3',str(W/'measure_crank.py'),str(dest/'symbols.so'),str(dest/'measure.json')],check=True)
finally:p.write_text(base)
