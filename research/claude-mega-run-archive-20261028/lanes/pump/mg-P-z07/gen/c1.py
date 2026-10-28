import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07/gen')
from lines import *
name=sys.argv[1]; base=sys.argv[2] if len(sys.argv)>2 else L+'/src'
root=clone(name,base=base)
c=F(root,'token_incentives/claim_token_incentives.rs')
c.rep(152,'''  let a=&mut *ctx.accounts;let timestamp=Clock::get()?.unix_timestamp;let min=Rent::get()?.minimum_balance(a.user_volume_accumulator.to_account_info().data_len());let amount=a.user_volume_accumulator.get_lamports().saturating_sub(min);if amount==0{msg!("No cashback to claim");return Ok(());}''',expect='let a=&mut *ctx.accounts;let amount=')
assert c.l[250]=='' and 'total_cashback_claimed' in c.l[251] and 'sub_lamports' in c.l[252], (c.l[250][:40],c.l[251][:40],c.l[252][:40])
c.l[250]='  a.user_volume_accumulator.sub_lamports(amount)?;a.user.add_lamports(amount)?;'
c.l[251]='  a.user_volume_accumulator.total_cashback_claimed=a.user_volume_accumulator.total_cashback_claimed.checked_add(amount).ok_or(error!(PumpError::Overflow))?;'
c.l[252]=''
assert c.l[253].startswith('  let event=ClaimCashbackEvent{'), c.l[253][:40]
c.l[253]='  let event=ClaimCashbackEvent{user:a.user.key(),amount,timestamp,total_claimed:a.user_volume_accumulator.total_cashback_claimed,total_cashback_earned:a.user_volume_accumulator.cashback_earned};emit!(event);emit_cpi!(event);Ok(())'
c.save(); print('ok',root)
