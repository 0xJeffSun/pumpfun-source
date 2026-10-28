from pathlib import Path
import subprocess
W=Path(__file__).resolve().parent;p=W/'source-crank/programs/pump-fees/src/lib.rs';base=p.read_text();(W/'crank583.baseline.rs').write_text(base)
a='let native_result:Result<()>=try {anchor_lang::solana_program::program::invoke(&ix,&infos)?;};';end='drop(donation_info);native_result};native_result?;';assert base.count(a)==base.count(end)==1
variants={
'crank583-raw-late-map':base.replace(a,'let native_result=anchor_lang::solana_program::program::invoke(&ix,&infos);').replace(end,'drop(donation_info);native_result.map_err(anchor_lang::error::Error::from)};native_result?;'),
'crank583-raw-late-match':base.replace(a,'let native_result=anchor_lang::solana_program::program::invoke(&ix,&infos);').replace(end,'drop(donation_info);match native_result { Ok(())=>Ok(()), Err(error)=>Err(anchor_lang::error::Error::from(error)) }};native_result?;'),
'crank583-early-map':base.replace(a,'let native_result=anchor_lang::solana_program::program::invoke(&ix,&infos).map_err(anchor_lang::error::Error::from);')}
try:
 for name,source in variants.items():
  p.write_text(source);r=subprocess.run(['python3',str(W/'build_crank.py'),name],stdout=subprocess.PIPE,stderr=subprocess.STDOUT);print(name,r.returncode,r.stdout.decode(),flush=True);(W/name/'lib.rs').write_text(source)
  if r.returncode==0:subprocess.run(['python3',str(W/'measure_crank.py'),str(W/name/'symbols.so'),str(W/name/'measure.json')],check=True)
finally:p.write_text(base)
