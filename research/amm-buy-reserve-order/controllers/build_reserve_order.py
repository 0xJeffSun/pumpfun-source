from pathlib import Path
import shutil,difflib
D=Path('/home/ahi200/pumpfun-work/20261028-amm-reserve-source')
src=D/'source-reserve-order';assert src.exists()
p=src/'programs/pump-amm/src/instructions/swap/buy.rs';s=p.read_text();before=s
start=s.index("pub fn execute<'info");end=s.index('    let a = &mut *ctx.accounts;',start)
s=s[:start]+"pub fn execute<'info, const EXACT: bool>(ctx: Context<'_, '_, '_, 'info, LegacyBuy<'info>>, amount: u64, limit: u64, track: bool) -> Result<()> {\n"+s[end:]
start=s.index('    let old_virtual = a.pool.virtual_quote_reserves;');end=s.index('    let b = a.pool_base_token_account.amount;',start)
new='''    a.pool.available_quote_reserves(a.pool_quote_token_account.amount)?;
    let q = a.pool.effective_quote_reserves(a.pool_quote_token_account.amount)?;
    let old_virtual = a.pool.virtual_quote_reserves;
    let can_boost = a.pool.can_boost();
    let legacy_quote = |curve: u64, lp: u64, protocol: u64, creator: u64| -> Result<_> {
        let pool_quote = curve
            .checked_add(
                lp,
            )
            .ok_or_else(
                || error!(PumpAmmError::Overflow))?;

        let total = pool_quote
            .checked_add(protocol)
            .ok_or_else(|| error!(PumpAmmError::Overflow))?;

        let total = total
            .checked_add(creator)
            .ok_or_else(|| error!(PumpAmmError::Overflow))?;
        let fee_data = crate::utils::transfer_fee::from_mint(&a.quote_mint.to_account_info())?;
        let user_quote_to_pool = crate::utils::transfer_fee::amount_before_fee(
            &fee_data,
            pool_quote,
        )?;
        let transfer_fee = user_quote_to_pool
            .checked_sub(pool_quote)
            .ok_or_else(
                || error!(PumpAmmError::Overflow))?;
        Ok((curve, lp, protocol, creator, total, transfer_fee, user_quote_to_pool, fee_data)) };
'''
s=s[:start]+new+s[end:]
# Replace the ordinary branch; retain downstream original-backed coordinates.
start=s.index('        let l = initial_lp_fee;');end=s.index('    };\n    let pool_quote = curve.checked_add',start)
old=s[start:end];new='        legacy_quote(curve_initial, initial_lp_fee, initial_protocol_fee, initial_creator_fee)?\n';new+='\n'*(old.count('\n')-1);s=s[:start]+new+s[end:]
print('line totals',len(s.splitlines()),len(before.splitlines()),flush=True)
for line in [387,391,395,404]: assert 'error!(PumpAmmError::Overflow)' in s.splitlines()[line-1], (line,s.splitlines()[line-1])
p.write_text(s);(D/'reserve-order.patch').write_text(''.join(difflib.unified_diff(before.splitlines(True),s.splitlines(True),fromfile='a/programs/pump-amm/src/instructions/swap/buy.rs',tofile='b/programs/pump-amm/src/instructions/swap/buy.rs')))
# Reuse the recorded normal compiler invocation; no flags or dependencies changed.
controller=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-contribution-review/amm-reserve-source-20261028/build_can_boost.py').read_text()
body=controller[controller.index('sha=lambda'):]
body=body.replace("out=D/'reserve-can-boost'", "out=D/'reserve-order'")
body=body.replace("hypothesis='Original suppresses can_boost virtual-sum overflow: conflicting unfunded case returns pool417 and funded virtual overflow returns pool439. First method proposal incorrectly propagates pool426. Use existing Pool::can_boost() fallible sum fallback, preserving original subsequent available/effective validation order.'", "hypothesis='Original buy calls available/effective reserve helpers before quote_for_base. Its four later u64 add/sub error closures are fee totals, not reserve arithmetic; restore those actual callers at their original source coordinates.'")
import json,hashlib,subprocess,os,datetime
W=Path('/home/ahi200/pumpfun-work/20261028-amm-sweep-order')
exec(body)
