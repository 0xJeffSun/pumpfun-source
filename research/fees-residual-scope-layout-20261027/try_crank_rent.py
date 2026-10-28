from pathlib import Path
import subprocess,tarfile
W=Path('/workspace/fees-recovery');p=W/'source-crank/programs/pump-fees/src/lib.rs';base=p.read_text()
old='let rent_value=Rent::get()?;';assert base.count(old)==1
variants={
 'try':'let rent_result:Result<Rent>=try {Rent::get()?}; let rent_value=rent_result?;',
 'match':'let rent_value=match Rent::get(){Ok(value)=>value,Err(error)=>return Err(error.into())};',
 'map':'let rent_value=Rent::get().map_err(anchor_lang::error::Error::from)?;',
}
for hint in ['likely','unlikely']:
 variants[hint]='let rent_raw=Rent::get(); let rent_value=if core::intrinsics::'+hint+'(rent_raw.is_ok()) {rent_raw.unwrap()}else{return Err(rent_raw.unwrap_err().into())};'
try:
 for label,replacement in variants.items():
  name='crank583-rent-'+label;p.write_text(base.replace(old,replacement));proc=subprocess.run(['python3',str(W/'build_crank.py'),name],capture_output=True);print(name,proc.returncode,proc.stdout.decode(),proc.stderr.decode(),flush=True)
  dest=W/name
  with tarfile.open(dest/'source.tar.gz','w:gz') as archive:
   for item in sorted((W/'source-crank').rglob('*')):
    if item.is_file():archive.add(item,arcname=item.relative_to(W/'source-crank'))
  if proc.returncode==0:subprocess.run(['python3',str(W/'measure_crank.py'),str(dest/'symbols.so'),str(dest/'measure.json')],check=True)
finally:p.write_text(base)
