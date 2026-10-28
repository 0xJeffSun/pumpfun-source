#!/usr/bin/env python3
"""mux.py NAME BASE_SRC_DIR variants.rs : multiplex experiment tree v/NAME/src.
variants.rs holds `pub fn claim_X(ctx:Context<ClaimCashback>)->Result<()>{...}` items (one per X, any line count),
inserted at the end of `pub mod cashback`; lib.rs claim_cashback dispatches on remaining_accounts.len()==11.. to each.
Experiment only (never deliver)."""
import re, subprocess, sys
from pathlib import Path
LANE = Path(__file__).resolve().parents[1]
name, base, vf = sys.argv[1], Path(sys.argv[2]), Path(sys.argv[3])
dst = LANE / 'v' / name / 'src'
if dst.exists(): subprocess.run(['rm', '-rf', str(dst)], check=True)
dst.parent.mkdir(parents=True, exist_ok=True)
subprocess.run(['cp', '-c', '-R', str(base), str(dst)], check=True)
vt = vf.read_text()
names = re.findall(r'pub fn (claim_\w+)\(', vt)
f = dst / 'src/token_incentives/claim_token_incentives.rs'
t = f.read_text().rstrip('\n')
assert t.endswith('}')
t = t[:-1] + vt.rstrip('\n') + '\n}\n'
f.write_text(t)
lib = dst / 'src/lib.rs'
L = lib.read_text().split('\n')
i = next(k for k, l in enumerate(L) if 'pub fn claim_cashback(ctx:Context<ClaimCashback>)' in l)
disp = ''.join(f'if ctx.remaining_accounts.len()=={11+j}{{return cashback::{n}(ctx);}}' for j, n in enumerate(names))
L[i] = '    pub fn claim_cashback(ctx:Context<ClaimCashback>)->Result<()>{' + disp + 'cashback::claim(ctx)}'
lib.write_text('\n'.join(L))
print(dst, names)
