from pathlib import Path
import subprocess
W=Path(__file__).resolve().parent;p=W/'source-create/programs/pump-fees/src/instructions/fee_sharing/create_donation_fee_pda.rs';base=(W/'create583.baseline.rs').read_text()
forms={'create583-to-string-reference':'ToString::to_string(&&FeeError::InvalidPool)','create583-to-string-mut-reference':'{ let mut error = FeeError::InvalidPool; ToString::to_string(&&mut error) }'}
try:
 for name,value in forms.items():
  source=base.replace('FeeError::InvalidPool.to_string()',value);p.write_text(source);r=subprocess.run(['python3',str(W/'build_create.py'),name],stdout=subprocess.PIPE,stderr=subprocess.STDOUT);print(name,r.returncode,r.stdout.decode(),flush=True);(W/name/'create.rs').write_text(source)
  if r.returncode==0:subprocess.run(['python3',str(W/'measure_create.py'),str(W/name/'symbols.so'),str(W/name/'measure.json')],check=True)
finally:p.write_text(base)
