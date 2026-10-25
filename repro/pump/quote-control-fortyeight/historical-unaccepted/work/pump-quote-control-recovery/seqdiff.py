"""Align candidate/original instruction streams (registers/branch offsets/relocs ignored) with difflib."""
import sys,re,pathlib,subprocess,difflib
OBJ=str(pathlib.Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
ROOT=pathlib.Path('.').resolve()
def dis(f,a,n):
    out=subprocess.check_output([OBJ,'-d','--no-show-raw-insn','--start-address=%d'%a,'--stop-address=%d'%(a+n),str(f)],text=True)
    r=[]
    for l in out.splitlines():
        m=re.match(r'\s+([0-9a-f]+):\s+(.*)',l)
        if m: r.append((int(m.group(1),16),m.group(2).strip()))
    return r
def key(s):
    s=re.sub(r'<[^>]*>','',s); s=re.sub(r'\br\d+\b','r',s); s=re.sub(r'([+-])0x[0-9a-f]+(?=\s*$)',r'\1X',s) if s.startswith(('j','call')) else s
    s=re.sub(r'lddw r, .*','lddw r, K',s); return s
cand,ca,oa,n=sys.argv[1],int(sys.argv[2],0),int(sys.argv[3],0),int(sys.argv[4],0)
on=int(sys.argv[5],0) if len(sys.argv)>5 else n
c=dis(cand,ca,n); o=dis('evidence/original/pump/deployed.so',oa,on)
sm=difflib.SequenceMatcher(None,[key(x[1]) for x in c],[key(x[1]) for x in o],autojunk=False)
for tag,i1,i2,j1,j2 in sm.get_opcodes():
    if tag=='equal': continue
    print(tag, 'cand',hex(ca+8*i1-ca) if i1<len(c) else '', 'orig', hex(8*j1))
    for x in c[i1:i2][:12]: print('   -',x[1])
    for x in o[j1:j2][:12]: print('   +',x[1])
print('ratio',round(sm.ratio(),4))
