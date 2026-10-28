#![no_std]
pub struct G { pub start_time:i64, pub end_time:i64, pub seconds_in_a_day:i64, pub mint:[u8;32], pub total_token_supply:[u64;30], pub sol_volumes:[u64;30] }
pub struct U { pub user:[u8;32], pub needs_claim:bool, pub total_unclaimed_tokens:u64, pub total_claimed_tokens:u64, pub current_sol_volume:u64, pub last_update_timestamp:i64 }
#[inline(never)] pub fn f(g:&G,u:&mut U,day:usize,cur:usize)->Result<(),()> {
 if day < cur {
  let volume = g.sol_volumes[day]; let supply = g.total_token_supply[day];
  if volume > 0 {
  if u.current_sol_volume == 0 { return Ok(()); }
  let t = (u.current_sol_volume as u128) * (supply as u128) / (volume as u128);
  let Ok(t) = u64::try_from(t) else { return Err(()) };
  u.total_unclaimed_tokens = u.total_unclaimed_tokens.checked_add(t).ok_or(())?;
 }}
 Ok(()) }