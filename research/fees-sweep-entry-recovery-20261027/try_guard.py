from pathlib import Path
import subprocess
W=Path(__file__).resolve().parent;p=W/'source/programs/pump-fees/src/instructions/buyback/mod.rs';base=(W/'buyback.baseline.rs').read_text();old='    let vault = &mut ctx.accounts.buyback_vault; let bump_value = ctx.bumps.buyback_vault;\n    let destination = &mut ctx.accounts.destination;';sig='pub fn sweep_buyback(ctx:Context<crate::buyback::SweepBuyback>,index:u8)->Result<()>{'
parts={'v':'let vault = &mut ctx.accounts.buyback_vault;','b':'let bump_value = ctx.bumps.buyback_vault;','d':'let destination = &mut ctx.accounts.destination;'}
try:
 for order in ['vbd','dvb','bvd','v','d','b']:
  name='pre-guard-'+order; before=' '.join(parts[x] for x in order);after=' '.join(parts[x] for x in 'vbd' if x not in order)
  source=base.replace(sig,sig+' '+before).replace(old,'    '+after+'\n')
  p.write_text(source);r=subprocess.run(['python3',str(W/'build.py'),name],stdout=subprocess.PIPE,stderr=subprocess.STDOUT);print(name,r.returncode,r.stdout.decode(),flush=True);folder=W/name;(folder/'buyback.rs').write_text(source)
  if r.returncode==0:subprocess.run(['python3',str(W/'measure.py'),str(folder/'symbols.so'),str(folder/'measure.json')],check=True)
finally:p.write_text(base)
