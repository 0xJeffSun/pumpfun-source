#!/usr/bin/env python3
"""V2 = V1 + `let pool_authority=&a.pool_authority;` before fee (orig hoisted GEP, llc e_pa 0.9516)."""
import sys
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-mig/tools')
from gen import make_variant
import v1
def sub(lines, old, new):
    out = []; n = 0
    for t, x in lines:
        if x == old: out.append((t, new)); n += 1
        else: out.append((t, x))
    assert n == 1, (old, n); return out
E = list(v1.EXEC)
E = sub(E, " let fee=a.global.pool_migration_fee;", " let pool_authority=&a.pool_authority;let fee=a.global.pool_migration_fee;")
E = sub(E, " if native{a.bonding_curve.sub_lamports(fee)?;a.pool_authority.add_lamports(fee)?;}else{crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,&a.pool_authority,fee)?;}",
           " if native{a.bonding_curve.sub_lamports(fee)?;pool_authority.add_lamports(fee)?;}else{crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,pool_authority,fee)?;}")
EXEC = E
if __name__ == '__main__':
    print(make_variant(sys.argv[1] if len(sys.argv) > 1 else 'V2', EXEC))
