import sys,json,pathlib,re
sys.path.insert(0,'scripts')
from pump_quote_control_function_match import sections, mask, ORIGINAL
import subprocess
cand=pathlib.Path(sys.argv[1]); pairs=json.load(open(sys.argv[2])); pat=sys.argv[3]; n=int(sys.argv[4]) if len(sys.argv)>4 else 12
OBJ=str(pathlib.Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
o=ORIGINAL.read_bytes(); c=cand.read_bytes(); os_=sections(o)['.text']; cs=sections(c)['.text']
for ca,p in pairs.items():
    if not re.search(pat,p['symbol']): continue
    ca=int(ca); s=p['size']; oa=p['original']
    cb=c[ca-cs['addr']+cs['offset']:][:s]; ob=o[oa-os_['addr']+os_['offset']:][:s+64]
    mc,mo=mask(cb),mask(ob)
    d=[i for i in range(0,s,8) if mc[i:i+8]!=mo[i:i+8]]
    print('==',re.sub(r'17h[0-9a-f]{16}E$','',p['symbol'])[-70:],'size',s,'diffslots',len(d),'first',d[:8])
    if d and n:
        st=max(0,d[0]-24)
        def dis(blob,addr,off):
            t=subprocess.run([OBJ,'-d','--no-show-raw-insn','--start-address=%d'%(addr+off),'--stop-address=%d'%(addr+off+8*n)],input=None,capture_output=True,text=True)
        # simple decode via objdump on files
        for which,f,addr in (('cand',cand,ca),('orig',ORIGINAL,oa)):
            out=subprocess.check_output([OBJ,'-d','--no-show-raw-insn','--start-address=%d'%(addr+st),'--stop-address=%d'%(addr+st+8*n),str(f)],text=True)
            print(' ',which,' | '.join(l.split('\t',1)[-1].strip() for l in out.splitlines() if re.match(r'\s+[0-9a-f]+:',l)))
