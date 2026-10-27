from pathlib import Path
import subprocess,json
W=Path(__file__).resolve().parent;p=W/'source/programs/pump-fees/src/instructions/buyback/mod.rs';base=(W/'buyback.baseline.rs').read_text()
old='    let vault = &mut ctx.accounts.buyback_vault; let bump_value = ctx.bumps.buyback_vault;\n    let destination = &mut ctx.accounts.destination;'
variants={
'accounts-reference':base.replace(old,'    let accounts = &mut *ctx.accounts; let bump_value = ctx.bumps.buyback_vault;\n    let vault = &mut accounts.buyback_vault; let destination = &mut accounts.destination;'),
'bump-reference':base.replace('let bump_value = ctx.bumps.buyback_vault;','let bump_value = &ctx.bumps.buyback_vault;').replace('&[bump_value]','&[*bump_value]'),
'bump-after-claim':base.replace('let bump_value = ctx.bumps.buyback_vault;','').replace('vault.claim()?;','vault.claim()?; let bump_value = ctx.bumps.buyback_vault;'),
'bump-at-transfer':base.replace('let bump_value = ctx.bumps.buyback_vault;','').replace('&[bump_value]','&[ctx.bumps.buyback_vault]'),
'context-mut-reference':base.replace('ctx:Context<crate::buyback::SweepBuyback>','mut ctx:Context<crate::buyback::SweepBuyback>').replace(old,'    let ctx = &mut ctx; let vault = &mut ctx.accounts.buyback_vault; let bump_value = ctx.bumps.buyback_vault;\n    let destination = &mut ctx.accounts.destination;'),
'accounts-tuple':base.replace(old,'    let (vault, destination, bump_value) = (&mut ctx.accounts.buyback_vault, &mut ctx.accounts.destination, ctx.bumps.buyback_vault);\n'),
}
try:
 for name,source in variants.items():
  if (W/name).exists():continue
  p.write_text(source);r=subprocess.run(['python3',str(W/'build.py'),name],stdout=subprocess.PIPE,stderr=subprocess.STDOUT);print(name,r.returncode,r.stdout.decode(),flush=True);folder=W/name;(folder/'buyback.rs').write_text(source)
  if r.returncode==0:subprocess.run(['python3',str(W/'measure.py'),str(folder/'symbols.so'),str(folder/'measure.json')],check=True)
finally:p.write_text(base)
