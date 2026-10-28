import subprocess,os
PT=os.path.expanduser('~/.cache/solana/v1.44/platform-tools')
HEAD='''#![no_std]
pub struct G { pub start_time:i64, pub end_time:i64, pub seconds_in_a_day:i64, pub mint:[u8;32], pub total_token_supply:[u64;30], pub sol_volumes:[u64;30] }
pub struct U { pub user:[u8;32], pub needs_claim:bool, pub total_unclaimed_tokens:u64, pub total_claimed_tokens:u64, pub current_sol_volume:u64, pub last_update_timestamp:i64 }
'''
V={
'a':'''#[inline(never)] pub fn f(g:&G,u:&mut U,day:usize,cur:usize)->Result<(),()> {
 if day < cur && g.sol_volumes[day] > 0 && u.current_sol_volume > 0 {
  let t = (u.current_sol_volume as u128) * (g.total_token_supply[day] as u128) / (g.sol_volumes[day] as u128);
  let Ok(t) = u64::try_from(t) else { return Err(()) };
  u.total_unclaimed_tokens = u.total_unclaimed_tokens.checked_add(t).ok_or(())?;
 }
 Ok(()) }''',
'b':'''#[inline(never)] pub fn f(g:&G,u:&mut U,day:usize,cur:usize)->Result<(),()> {
 if day < cur {
  let volume = g.sol_volumes[day];
  let supply = g.total_token_supply[day];
  if volume > 0 && u.current_sol_volume > 0 {
  let t = (u.current_sol_volume as u128) * (supply as u128) / (volume as u128);
  let Ok(t) = u64::try_from(t) else { return Err(()) };
  u.total_unclaimed_tokens = u.total_unclaimed_tokens.checked_add(t).ok_or(())?;
 }}
 Ok(()) }''',
}
for k,v in V.items():
    open(f'{k}.rs','w').write(HEAD+v)
    subprocess.run([PT+'/rust/bin/rustc','--edition','2021','--crate-type','rlib','--crate-name','g','--target','sbpf-solana-solana','-C','opt-level=3','-C','panic=abort','-C','overflow-checks=on','-C','codegen-units=1','-C','debuginfo=0','--emit','llvm-ir','-o',f'{k}.ll',f'{k}.rs'])
    s=open(f'{k}.ll').read(); f=s[s.index('define'):]; f=f[:f.index('\n}\n')]
    print(k,[l.strip()[:90] for l in f.split('\n') if 'getelementptr' in l and ('272' in l or '32' in l or '[30 x' in l or 'i64, ptr %g' in l)])
