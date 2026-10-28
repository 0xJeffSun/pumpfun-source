from pathlib import Path
import subprocess
W=Path(__file__).resolve().parent;p=W/'source-crank/programs/pump-fees/src/lib.rs';base=(W/'crank583.baseline.rs').read_text();binding='let native_info=ctx.accounts.donation_fee_pda_ata.borrowed_info(); let native_credit=native_info.to_account_info(); ';assert base.count(binding)==1
without=base.replace(binding,'');variants={
'crank583-credit-before-excess':without.replace('if excess>0 {',binding+'if excess>0 {',1),
'crank583-credit-before-rent':without.replace('let rent_value=Rent::get()?;',binding+'let rent_value=Rent::get()?;',1),
'crank583-credit-after-sub':without.replace('donation.sub_lamports(excess)?;', 'donation.sub_lamports(excess)?; '+binding,1)}
try:
 for name,source in variants.items():
  p.write_text(source);r=subprocess.run(['python3',str(W/'build_crank.py'),name],stdout=subprocess.PIPE,stderr=subprocess.STDOUT);print(name,r.returncode,r.stdout.decode(),flush=True);(W/name/'lib.rs').write_text(source)
  if r.returncode==0:subprocess.run(['python3',str(W/'measure_crank.py'),str(W/name/'symbols.so'),str(W/name/'measure.json')],check=True)
finally:p.write_text(base)
