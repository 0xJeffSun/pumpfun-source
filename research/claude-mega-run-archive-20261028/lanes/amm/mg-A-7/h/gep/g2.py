import subprocess,os,re
PT=os.path.expanduser('~/.cache/solana/v1.44/platform-tools')
HEAD=open('a.rs').read().split('#[inline(never)]')[0]
R='''  let t = (u.current_sol_volume as u128) * (SUP as u128) / (VOL as u128);
  let Ok(t) = u64::try_from(t) else { return Err(()) };
  u.total_unclaimed_tokens = u.total_unclaimed_tokens.checked_add(t).ok_or(())?;'''
V={
'c':'''#[inline(never)] pub fn f(g:&G,u:&mut U,day:usize,cur:usize)->Result<(),()> {
 if day < cur {
  let volume = g.sol_volumes[day]; let supply = g.total_token_supply[day];
  if volume > 0 { if u.current_sol_volume > 0 {
'''+R.replace('SUP','supply').replace('VOL','volume')+'''
 }}}
 Ok(()) }''',
'e':'''#[inline(never)] pub fn f(g:&G,u:&mut U,day:usize,cur:usize)->Result<(),()> {
 if day < cur {
  let volume = g.sol_volumes[day];
  if volume > 0 { let supply = g.total_token_supply[day]; if u.current_sol_volume > 0 {
'''+R.replace('SUP','supply').replace('VOL','volume')+'''
 }}}
 Ok(()) }''',
'f':'''#[inline(never)] pub fn f(g:&G,u:&mut U,day:usize,cur:usize)->Result<(),()> {
 if day < cur && g.sol_volumes[day] > 0 {
  if u.current_sol_volume == 0 { return Ok(()); }
'''+R.replace('SUP','g.total_token_supply[day]').replace('VOL','g.sol_volumes[day]')+'''
 }
 Ok(()) }''',
}
for k,v in V.items():
    open(f'{k}.rs','w').write(HEAD+v)
    subprocess.run([PT+'/rust/bin/rustc','--edition','2021','--crate-type','rlib','--crate-name','g','--target','sbpf-solana-solana','-C','opt-level=3','-C','panic=abort','-C','overflow-checks=on','-C','codegen-units=1','-C','debuginfo=0','--emit','llvm-ir','-o',f'{k}.ll',f'{k}.rs'])
    subprocess.run(['../llc.sh',f'{k}.ll',f'{k}.o'])
    out=subprocess.run([os.path.expanduser('~/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'),'-d','--no-show-raw-insn',f'{k}.o'],capture_output=True,text=True).stdout
    ins=[re.sub(r'\s+',' ',l.split(':',1)[1]).strip()[:28] for l in out.splitlines() if re.match(r'\s+[0-9a-f]+:',l)]
    s=open(f'{k}.ll').read()
    print(k,'select' if ' select ' in s else 'nosel', 'shl x', sum('lsh64' in i for i in ins[:20]), '|', ' ; '.join(ins[2:14]))
