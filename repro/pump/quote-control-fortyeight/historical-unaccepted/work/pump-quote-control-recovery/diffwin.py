import sys,struct,re,subprocess,pathlib
sys.path.insert(0,'scripts')
from pump_quote_control_function_match import sections, mask, ORIGINAL
cand=pathlib.Path(sys.argv[1]); sym=sys.argv[2]; oaddr=int(sys.argv[3],0)
OBJ=str(pathlib.Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
o=ORIGINAL.read_bytes(); c=cand.read_bytes()
os_=sections(o)['.text']; cs=sections(c)['.text']
t=subprocess.check_output([OBJ,'-t',str(cand)],text=True)
line=[l for l in t.splitlines() if sym in l and ' F ' in l][0].split()
ca,sz=int(line[0],16),int(line[-2],16)
cb=c[ca-cs['addr']+cs['offset']:][:sz]; ob=o[oaddr-os_['addr']+os_['offset']:][:sz]
mc,mo=mask(cb),mask(ob)
diffs=[i for i in range(0,sz,8) if mc[i:i+8]!=mo[i:i+8]]
print('size',sz,'diff slots',len(diffs),'first',diffs[:20])
def dis(blob,addr,i):
    import tempfile
    return blob[i:i+8].hex()
for i in diffs[:int(sys.argv[4]) if len(sys.argv)>4 else 30]:
    print(f'{i:5d} cand {cb[i:i+8].hex()}  orig {ob[i:i+8].hex()}')
