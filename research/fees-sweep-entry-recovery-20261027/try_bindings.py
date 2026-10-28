from pathlib import Path
import itertools,subprocess,json
W=Path(__file__).resolve().parent;path=W/'source/programs/pump-fees/src/instructions/buyback/mod.rs';base=(W/'buyback.baseline.rs').read_text();old='    let vault = &mut ctx.accounts.buyback_vault; let bump_value = ctx.bumps.buyback_vault;\n    let destination = &mut ctx.accounts.destination;'
assert base.count(old)==1
parts={'v':'let vault = &mut ctx.accounts.buyback_vault;','b':'let bump_value = ctx.bumps.buyback_vault;','d':'let destination = &mut ctx.accounts.destination;'}
variants={}
for order in itertools.permutations('vbd'):
 if order==('v','b','d'):continue
 variants['bindings-'+''.join(order)]=base.replace(old,'    '+parts[order[0]]+' '+parts[order[1]]+'\n    '+parts[order[2]],1)
whole=base.replace('    let vault = &mut ctx.accounts.buyback_vault;','    let a = &mut *ctx.accounts; let vault = &mut a.buyback_vault;',1)
head,tail=whole.split('pub fn sweep_buyback',1);tail=tail.replace('ctx.accounts.', 'a.');whole=head+'pub fn sweep_buyback'+tail
variants['whole-accounts-borrow']=whole
try:
 for name,source in variants.items():
  path.write_text(source);r=subprocess.run(['python3',str(W/'build.py'),name],stdout=subprocess.PIPE,stderr=subprocess.STDOUT);print(name,r.returncode,r.stdout.decode(),flush=True);folder=W/name;(folder/'buyback.rs').write_text(source)
  if r.returncode==0:subprocess.run(['python3',str(W/'measure.py'),str(folder/'symbols.so'),str(folder/'measure.json')],check=True)
finally:path.write_text(base)
