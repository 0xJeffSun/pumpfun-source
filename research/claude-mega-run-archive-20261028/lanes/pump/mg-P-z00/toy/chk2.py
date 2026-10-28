import sys,subprocess,re,json,os
EXTRA=os.environ.get('TOYX','').split()
V=json.load(open(sys.argv[1]))
hdr=open('hdr_extra.rs').read() if False else '''#![no_std]
#![allow(dead_code,unused)]
extern crate alloc; extern crate dep;
use dep::*;
macro_rules! ctx { ($x:ident, $s:ident) => { Ctx::new($x.0.clone(), Accts{a:$x.0.clone(),b:$x.1.clone(),c:$x.2.clone(),d:$x.1.clone()}, $s) } }
'''
src=hdr+(open(os.environ['TOYITEMS']).read() if os.environ.get('TOYITEMS') else '')
for k,b in V.items():
    src+="#[inline(never)] pub fn v_%s(bump:u8, x:&(&Info,&Info,&Info))->Result<(),E>{ let signer:&[&[&[u8]]]=&[&[b\"mint-authority\",&[bump]]]; %s }\n"%(k,b)
open('t2.rs','w').write(src)
R='/Users/shawwalters/.cache/solana/v1.44/platform-tools/rust/bin/rustc'
r=subprocess.run([R,'--edition','2021','--crate-type=lib','-C','opt-level=3','-C','overflow-checks=on','-C','panic=abort','--emit=obj','--target','sbf-solana-solana','--extern','dep=libdep.rlib','-L','.']+EXTRA+['t2.rs','-o','t2.o'],capture_output=True,text=True)
if r.returncode: print(r.stderr[-3000:]); sys.exit(1)
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
d=subprocess.check_output([OBJ,'-d','--no-show-raw-insn','-r','t2.o'],text=True)
funcs={}; cur=None
for l in d.splitlines():
    m=re.match(r'^[0-9a-f]+ <(_ZN.*)>:',l)
    if m: cur=m.group(1); funcs[cur]=[]; continue
    if cur: funcs[cur].append(l)
for k in V:
    name=[f for f in funcs if re.search(r'v_%s17h'%k,f)]
    if not name: print(k,'??'); continue
    L=funcs[name[0]]; txt='\n'.join(L)
    n=len([l for l in L if re.match(r'\s+[0-9a-f]+:',l)])
    # find try_from call and upd call by relocation names
    def regarg(i,reg):
        for j in range(i-1,max(0,i-12),-1):
            m=re.search(r'add64 %s, (-?0x[0-9a-f]+)'%reg,L[j])
            if m: return m.group(1)
        return '?'
    tf=[i for i,l in enumerate(L) if 'try_from' in l and 'R_' in l]
    up=[i for i,l in enumerate(L) if '3upd' in l and 'R_' in l]
    s=f'{k:5} insns={n}'
    if tf: i=tf[0]-1; s+=f' tf(r1={regarg(i,"r1")},r2={regarg(i,"r2")})'
    if up: i=up[0]-1; s+=f' upd(r2={regarg(i,"r2")},r3={regarg(i,"r3")})'
    print(s,'|',V[k][:60])
