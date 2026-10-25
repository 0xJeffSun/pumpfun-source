"""Structural diff ignoring register numbers; reports first divergence with objdump context."""
import sys,json,re,struct,pathlib,subprocess
sys.path.insert(0,'scripts')
from pump_quote_control_function_match import sections, mask, ORIGINAL
cand=pathlib.Path(sys.argv[1]); ca=int(sys.argv[2],0); oa=int(sys.argv[3],0); size=int(sys.argv[4],0); ctx=int(sys.argv[5]) if len(sys.argv)>5 else 10
OBJ=str(pathlib.Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
o=ORIGINAL.read_bytes(); c=cand.read_bytes(); os_=sections(o)['.text']; cs=sections(c)['.text']
cb=mask(c[ca-cs['addr']+cs['offset']:][:size]); ob=mask(o[oa-os_['addr']+os_['offset']:][:size+400])
def norm(b,i): return (b[i], b[i+2:i+8])
regmap={}; first=None; ndiff=0
for i in range(0,size,8):
    if norm(cb,i)!=norm(ob,i):
        ndiff+=1
        if first is None: first=i
print('structural diff slots',ndiff,'first',first)
if first is not None:
    for which,f,a in (('cand',cand,ca),('orig',ORIGINAL,oa)):
        out=subprocess.check_output([OBJ,'-d','--no-show-raw-insn','--start-address=%d'%(a+max(0,first-8*3)),'--stop-address=%d'%(a+first+8*ctx),str(f)],text=True)
        print(which); [print('   ',l.strip()) for l in out.splitlines() if re.match(r'\s+[0-9a-f]+:',l)]
