#!/usr/bin/env python3
"""mx1: pool_authority GEP hoist forms."""
import sys
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-mig/tools')
import v1
from mx import make_mx, run
def sub(lines, old, new):
    out = []; n = 0
    for t, x in lines:
        if x == old: out.append((t, new)); n += 1
        else: out.append((t, x))
    assert n == 1, (old, n); return out
FEE = " let fee=a.global.pool_migration_fee;"
PAY = " if native{a.bonding_curve.sub_lamports(fee)?;a.pool_authority.add_lamports(fee)?;}else{crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,&a.pool_authority,fee)?;}"
E = v1.EXEC
V = {}
V['0'] = E
x = sub(E, FEE, " let pool_authority=&a.pool_authority;let fee=a.global.pool_migration_fee;")
V['a'] = sub(x, PAY, " if native{a.bonding_curve.sub_lamports(fee)?;Lamports::add_lamports(pool_authority,fee)?;}else{crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,pool_authority,fee)?;}")
x = sub(E, FEE, " let fee=a.global.pool_migration_fee;let pool_authority=&a.pool_authority;")
V['c'] = sub(x, PAY, " if native{a.bonding_curve.sub_lamports(fee)?;Lamports::add_lamports(pool_authority,fee)?;}else{crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,pool_authority,fee)?;}")
HB = """
fn pay_migration_fee<'info>(a:&MigrateV2<'info>,pool_authority:&UncheckedAccount<'info>,native:bool,fee:u64)->Result<()>{
 if native{a.bonding_curve.sub_lamports(fee)?;pool_authority.add_lamports(fee)?;}else{crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,pool_authority,fee)?;}
 Ok(())
}
"""
V['b'] = (sub(E, PAY, " pay_migration_fee(a,&a.pool_authority,native,fee)?;"), HB)
HD = """
fn pay_migration_fee<'info>(native:bool,curve:&Account<'info,crate::trade_types::BondingCurve>,pool_authority:&UncheckedAccount<'info>,system_program:&AccountInfo<'info>,user:&Signer<'info>,fee:u64)->Result<()>{
 if native{curve.sub_lamports(fee)?;pool_authority.add_lamports(fee)?;}else{crate::migrate::native_payments::transfer_native(system_program,user,pool_authority,fee)?;}
 Ok(())
}
"""
V['d'] = (sub(E, PAY, " pay_migration_fee(native,&a.bonding_curve,&a.pool_authority,a.system_program.as_ref(),&a.user,fee)?;"), HD)
if __name__ == '__main__':
    make_mx('MX1', E, V)
    run('MX1', list(V))
