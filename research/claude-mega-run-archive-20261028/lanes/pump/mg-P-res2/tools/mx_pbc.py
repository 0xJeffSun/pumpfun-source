#!/usr/bin/env python3
"""mx_pbc.py <base_src> <out_src> <variants.py>: multiplex prepare_bonding_curve variants (VARIANTS={name: body}) into one tree.
Each variant = #[inline(never)] pub fn pbc_<name>(curve, system_program, payer) -> Result<()> appended to trade_types.rs,
called from sweep_fees.rs under a dummy match on virtual_token_reserves. Never deliver."""
import sys, shutil, subprocess, runpy
from pathlib import Path
base, out, vf = Path(sys.argv[1]), Path(sys.argv[2]), sys.argv[3]
V = runpy.run_path(vf)['VARIANTS']
if out.exists(): shutil.rmtree(out)
subprocess.run(['cp', '-c', '-R', str(base), str(out)], check=True)
tt = out / 'src/trade_types.rs'
s = tt.read_text()
for n, body in V.items():
    s += (f"\n#[inline(never)]\npub fn pbc_{n}<'info>(curve: &Account<'info, BondingCurve>, system_program: &Program<'info, System>,"
          f" payer: &Signer<'info>) -> Result<()> {{\n{body}\n}}\n")
tt.write_text(s)
sw = out / 'src/sweep_fees.rs'
t = sw.read_text()
old = " crate::trade_types::prepare_bonding_curve(&a.bonding_curve,&a.system_program,&a.payer)?;"
assert old in t
arms = ''.join(f"{100+i}=>crate::trade_types::pbc_{n}(&a.bonding_curve,&a.system_program,&a.payer)?," for i, n in enumerate(V))
t = t.replace(old, f" match a.bonding_curve.virtual_token_reserves {{{arms}_=>crate::trade_types::prepare_bonding_curve(&a.bonding_curve,&a.system_program,&a.payer)?}};", 1)
sw.write_text(t)
print('ok', list(V))
