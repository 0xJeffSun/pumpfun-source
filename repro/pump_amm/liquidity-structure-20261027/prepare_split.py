#!/usr/bin/env python3
"""Isolated source-structure trial for separate compile-time liquidity paths."""
from pathlib import Path
import argparse,difflib,re,shutil

def transform(s):
 for mode in ['true','false']:
  old=f'liquidity(ctx, lp_token_amount_{"out"if mode=="true"else"in"}, {"max_base_amount_in, max_quote_amount_in"if mode=="true"else"min_base_amount_out, min_quote_amount_out"}, {mode})'
  new=old.replace('liquidity(',f'liquidity::<{mode}>(').replace(f', {mode})',')')
  assert s.count(old)==1;s=s.replace(old,new)
 begin=s.index('fn liquidity(ctx: Context<Liquidity>');end=s.index('\n}',begin)+2
 body=s[begin:end];body=body.replace('fn liquidity(ctx:', 'fn liquidity<const DEPOSIT: bool>(ctx:').replace(', deposit: bool) -> Result<()>', ') -> Result<()>')
 body=re.sub(r'\bdeposit\b','DEPOSIT',body)
 old='''        let mut n = (reserve as u128).checked_mul(amount as u128).ok_or(PumpAmmError::Overflow)?;
        if DEPOSIT { n = n.checked_add(old_supply as u128).ok_or(PumpAmmError::Overflow)?.checked_sub(1).ok_or_else(|| error!(PumpAmmError::Overflow))?; }
        let n = n.checked_div(old_supply as u128).ok_or_else(|| error!(PumpAmmError::DivisionByZero))?;'''
 new='''        let n = if DEPOSIT {
            liquidity_ceil_div((reserve as u128) * (amount as u128), old_supply as u128)?
        } else {
            liquidity_floor_ratio(reserve, amount, old_supply)?
        };'''
 assert old in body;body=body.replace(old,new)
 old='''        if !DEPOSIT { change = change.checked_add(old_supply as u128).ok_or(PumpAmmError::Overflow)?.checked_sub(1).ok_or_else(|| error!(PumpAmmError::Overflow))?; }
        change = change.checked_div(old_supply as u128).ok_or(PumpAmmError::DivisionByZero)?;'''
 new='''        change = if DEPOSIT {
            change.checked_div(old_supply as u128).ok_or(PumpAmmError::DivisionByZero)?
        } else {
            liquidity_ceil_div(change, old_supply as u128)?
        };'''
 assert old in body;body=body.replace(old,new)
 helpers='''fn liquidity_floor_ratio(reserve: u64, amount: u64, supply: u64) -> Result<u128> {
    ((reserve as u128) * (amount as u128)).checked_div(supply as u128)
        .ok_or_else(|| error!(PumpAmmError::DivisionByZero))
}
fn liquidity_ceil_div(numerator: u128, denominator: u128) -> Result<u128> {
    numerator.checked_add(denominator).ok_or_else(|| error!(PumpAmmError::Overflow))?
        .checked_sub(1).ok_or_else(|| error!(PumpAmmError::Overflow))?
        .checked_div(denominator).ok_or_else(|| error!(PumpAmmError::DivisionByZero))
}
'''
 return s[:begin]+helpers+body+s[end:]

def main():
 p=argparse.ArgumentParser();p.add_argument('--source',type=Path,required=True);p.add_argument('--output-source',type=Path,required=True);p.add_argument('--patch',type=Path,required=True);a=p.parse_args();assert not a.output_source.exists();f=a.source/'programs/pump-amm/src/lib.rs';before=f.read_text();after=transform(before);shutil.copytree(a.source,a.output_source);(a.output_source/'programs/pump-amm/src/lib.rs').write_text(after);a.patch.write_text(''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump-amm/src/lib.rs',tofile='b/programs/pump-amm/src/lib.rs')))
if __name__=='__main__':main()
