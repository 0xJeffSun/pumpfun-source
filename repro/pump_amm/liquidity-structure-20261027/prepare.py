#!/usr/bin/env python3
from pathlib import Path
import argparse,hashlib,json,shutil,difflib
ROOT=Path(__file__).resolve().parents[3]
def transform(s):
 old='''    let fees = a.pool.protocol_fees.checked_add(a.pool.creator_fees).ok_or_else(|| error!(PumpAmmError::Overflow))?;
    let quote_reserve = a.pool_quote_token_account.amount.checked_sub(fees).ok_or_else(|| error!(PumpAmmError::Overflow))?;'''
 new='''    let quote_reserve = liquidity_quote_reserves(&a.pool, a.pool_quote_token_account.amount)?;'''
 assert s.count(old)==1;s=s.replace(old,new)
 old='''    let effective_virtual = a.pool.virtual_quote_reserves.checked_add(fees as i128).ok_or_else(|| error!(PumpAmmError::Overflow))?;
    if effective_virtual != 0 {
        let virtual_reserve = u128::try_from(effective_virtual).map_err(|_| error!(PumpAmmError::Overflow))?;'''
 new='''    if liquidity_can_boost(&a.pool) {
        let effective_virtual = liquidity_effective_virtual(&a.pool)?;
        let virtual_reserve = u128::try_from(effective_virtual).map_err(|_| error!(PumpAmmError::Overflow))?;'''
 assert s.count(old)==1;s=s.replace(old,new)
 helpers='''fn liquidity_total_fees(pool: &Pool) -> Result<u64> {
    pool.protocol_fees.checked_add(pool.creator_fees).ok_or_else(|| error!(PumpAmmError::Overflow))
}
fn liquidity_quote_reserves(pool: &Pool, quote_token_amount: u64) -> Result<u64> {
    quote_token_amount.checked_sub(liquidity_total_fees(pool)?).ok_or_else(|| error!(PumpAmmError::Overflow))
}
fn liquidity_effective_virtual(pool: &Pool) -> Result<i128> {
    pool.virtual_quote_reserves.checked_add(liquidity_total_fees(pool)? as i128).ok_or_else(|| error!(PumpAmmError::Overflow))
}
fn liquidity_can_boost(pool: &Pool) -> bool {
    liquidity_effective_virtual(pool).is_ok_and(|value| value != 0)
}
'''
 marker='fn liquidity(ctx: Context<Liquidity>'
 assert s.count(marker)==1;return s.replace(marker,helpers+marker)
def main():
 p=argparse.ArgumentParser();p.add_argument('--source',type=Path,required=True);p.add_argument('--output-source',type=Path,required=True);p.add_argument('--patch',type=Path,required=True);a=p.parse_args();assert not a.output_source.exists();file=a.source/'programs/pump-amm/src/lib.rs';before=file.read_text();after=transform(before);shutil.copytree(a.source,a.output_source);(a.output_source/'programs/pump-amm/src/lib.rs').write_text(after);a.patch.write_text(''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump-amm/src/lib.rs',tofile='b/programs/pump-amm/src/lib.rs')));print(json.dumps({'before':hashlib.sha256(before.encode()).hexdigest(),'after':hashlib.sha256(after.encode()).hexdigest()}))
if __name__=='__main__':main()
