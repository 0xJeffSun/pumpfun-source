from pathlib import Path
import subprocess
W=Path(__file__).resolve().parent;p=W/'source-create/programs/pump-fees/src/instructions/fee_sharing/create_donation_fee_pda.rs';base=p.read_text();(W/'create583.baseline.rs').write_text(base)
macro=base.splitlines()[6];assert macro.startswith('macro_rules! recovered_pool_keys')
local=macro.replace('return Err(', 'let error_code = FeeError::InvalidPool; return Err(',1).replace('FeeError::InvalidPool.name()','error_code.name()').replace('FeeError::InvalidPool.into()','error_code.into()').replace('FeeError::InvalidPool.to_string()','error_code.to_string()')
variants={'create583-local-error':local,'create583-format-args':macro.replace('FeeError::InvalidPool.to_string()','format!("{}", FeeError::InvalidPool)'),'create583-write-message':macro.replace('FeeError::InvalidPool.to_string()','{ let mut text = String::new(); use core::fmt::Write; write!(&mut text, "{}", FeeError::InvalidPool).unwrap(); text }')}
try:
 for name,new in variants.items():
  source=base.replace(macro,new,1);p.write_text(source);r=subprocess.run(['python3',str(W/'build_create.py'),name],stdout=subprocess.PIPE,stderr=subprocess.STDOUT);print(name,r.returncode,r.stdout.decode(),flush=True);(W/name/'create.rs').write_text(source)
  if r.returncode==0:subprocess.run(['python3',str(W/'measure_create.py'),str(W/name/'symbols.so'),str(W/name/'measure.json')],check=True)
finally:p.write_text(base)
