from pathlib import Path
import subprocess
W=Path(__file__).resolve().parent;p=W/'source/programs/pump-fees/src/instructions/buyback/mod.rs';base=(W/'buyback.baseline.rs').read_text();head,body=base.split('pub fn sweep_buyback',1)
variants={}
for label,decl,restore in [('context-destructure','let Context { program_id, accounts, remaining_accounts, bumps } = ctx;','let ctx = Context { program_id, accounts, remaining_accounts, bumps };'),('context-field-restore','let accounts = ctx.accounts;','let ctx = Context { accounts, ..ctx };')]:
 b=body.replace('ctx.accounts.','accounts.').replace('    let vault =', '    '+decl+' let vault =',1).replace('emit_cpi!(event)',restore+' emit_cpi!(event)')
 if label=='context-destructure':b=b.replace('ctx.bumps.','bumps.')
 variants[label]=head+'pub fn sweep_buyback'+b
b=body.replace('ctx.accounts.','accounts.').replace('    let vault =','    let accounts = &mut *ctx.accounts; let vault =',1)
variants['whole-accounts-consistent']=head+'pub fn sweep_buyback'+b
try:
 for name,source in variants.items():
  if (W/name).exists():continue
  p.write_text(source);r=subprocess.run(['python3',str(W/'build.py'),name],stdout=subprocess.PIPE,stderr=subprocess.STDOUT);print(name,r.returncode,r.stdout.decode(),flush=True);folder=W/name;(folder/'buyback.rs').write_text(source)
  if r.returncode==0:subprocess.run(['python3',str(W/'measure.py'),str(folder/'symbols.so'),str(folder/'measure.json')],check=True)
finally:p.write_text(base)
