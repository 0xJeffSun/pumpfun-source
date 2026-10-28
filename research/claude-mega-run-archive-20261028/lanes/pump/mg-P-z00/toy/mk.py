import sys,subprocess,re
V={
 'c3':'upd(ctx!(x,signer), OK::try_from(None)?)',
 'a':'upd(ctx!(x,signer), {let r=OK::try_from(None);r?})',
 'g':'upd(ctx!(x,signer), {let v=OK::try_from(None)?;v})',
 'h':'upd(ctx!(x,signer), OK::try_from(None)?.clone())',
 'i':'upd(ctx!(x,signer), [OK::try_from(None)?][0])',
 'j':'upd(ctx!(x,signer), (OK::try_from(None)?,).0)',
 'k':'{let c=ctx!(x,signer); let v=OK::try_from(None)?; upd(c,v)}',
 'l':'upd(ctx!(x,signer), *&OK::try_from(None)?)',
 'm':'upd(ctx!(x,signer), {let r=&OK::try_from(None); match r {Ok(v)=>*v, Err(_)=>return Err(E(3,core::ptr::null()))}})',
 'n':'upd(ctx!(x,signer), OK(OK::try_from(None)?.0))',
 'o':'upd(ctx!(x,signer), {let mut v=OK::try_from(None)?; v})',
 'q':'w1(ctx!(x,signer), None)',
 'r':'w2(ctx!(x,signer), None)',
 's':'w3(ctx!(x,signer), None)',
 'p':'upd(ctx!(x,signer), OK::try_from(None).map_err(E::from)?)',
}
keys=sys.argv[1:] or list(V)
src=open('base.rs').read()
for k in keys:
    src+="#[inline(never)] pub fn v_%s(bump:u8, x:&(&Info,&Info,&Info))->Result<(),E>{ let signer:&[&[&[u8]]]=&[&[b\"mint-authority\",&[bump]]]; %s }\n"%(k,V[k])
open('t.rs','w').write(src)
R='/Users/shawwalters/.cache/solana/v1.44/platform-tools/rust/bin/rustc'
r=subprocess.run([R,'--edition','2021','--crate-type=lib','-C','opt-level=3','-C','overflow-checks=on','-C','panic=abort','-C','no-prepopulate-passes','--emit=mir,llvm-ir','--target','sbf-solana-solana','t.rs','-o','t'],capture_output=True,text=True)
if r.returncode: print(r.stderr[-2000:]); sys.exit(1)
ll=open('t.ll').read()
for k in keys:
    m=re.search(r'^define [^\n]*v_%s[^\n]*\{\n(.*?)\n\}'%k,ll,re.M|re.S)
    f=m.group(1)
    allocas=re.findall(r'%(\S+) = alloca \[(\d+) x i8\]',f)
    marked=set(re.findall(r'lifetime\.start\.p0\(i64 \d+, ptr %(\S+)\)',f))
    mir=open('t.mir').read()
    mm=re.search(r'fn v_%s\(.*?\n}\n'%k,mir,re.S)
    call=re.findall(r'= upd\((.*?)\)',mm.group(0))
    print(k,call,' '.join(f'{n}:{s}{"*" if n in marked else ""}' for n,s in allocas if s in ('32','33','40','24')))
