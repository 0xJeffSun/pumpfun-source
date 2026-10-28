#!/usr/bin/env python3
"""mx_prep.py <out_src_dir> <variants.py>: multiplex prepare_bonding_curve variants into one build.
variants.py defines VARIANTS = {name: body_text} (body of fn returning Result<()> with args curve, system_program, payer)."""
import sys, shutil, subprocess, runpy
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z03')
out = Path(sys.argv[1]); V = runpy.run_path(sys.argv[2])['VARIANTS']
if out.exists(): shutil.rmtree(out)
out.parent.mkdir(parents=True, exist_ok=True)
subprocess.run(['cp', '-c', '-R', str(L / 'src'), str(out)], check=True)
tt = out / 'src/trade_types.rs'
s = tt.read_text()
for n, body in V.items():
    s += f"\n#[allow(unused)]\npub fn pbc_{n}<'info>(curve: &Account<'info, BondingCurve>, system_program: &Program<'info, System>, payer: &Signer<'info>) -> Result<()> {{\n{body}\n}}\n"
tt.write_text(s)
sw = out / 'src/sweep_fees.rs'
t = sw.read_text()
old = " crate::trade_types::prepare_bonding_curve(&a.bonding_curve,&a.system_program,&a.payer)?;"
assert old in t
arms = ''.join(f"{100+i}=>crate::trade_types::pbc_{n}(&a.bonding_curve,&a.system_program,&a.payer)?," for i, n in enumerate(V))
t = t.replace(old, f" match a.bonding_curve.virtual_token_reserves {{{arms}_=>crate::trade_types::prepare_bonding_curve(&a.bonding_curve,&a.system_program,&a.payer)?}};", 1)
sw.write_text(t)
print('ok', list(V))
