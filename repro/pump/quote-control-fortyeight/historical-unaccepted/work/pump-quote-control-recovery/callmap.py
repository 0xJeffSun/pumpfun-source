"""Pair callees of matched candidate/original functions by call position; recurse into pairs."""
import sys,struct,re,subprocess,pathlib,json
sys.path.insert(0,'scripts')
from pump_quote_control_function_match import sections, mask, ORIGINAL, candidate_functions
cand=pathlib.Path(sys.argv[1])
OBJ=str(pathlib.Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
o=ORIGINAL.read_bytes(); c=cand.read_bytes()
os_=sections(o)['.text']; cs=sections(c)['.text']
funcs=candidate_functions(cand,OBJ,'.')
byaddr={a:(s,n) for a,s,n in funcs}
def cbytes(a,s): return c[a-cs['addr']+cs['offset']:][:s]
def obytes(a,s): return o[a-os_['addr']+os_['offset']:][:s]
def calls(blob,base):
    out=[]
    for i in range(0,len(blob),8):
        if blob[i]==0x85 and (blob[i+1]>>4) in (0,1):
            imm=struct.unpack_from('<i',blob,i+4)[0]
            if imm!=-1: out.append((i,base+i+8+imm*8))
    return out
seeds=[('global24initialize_quote_control',0x132510),('global23set_quote_control_admin',0x132718),('global22add_quote_control_mint',0x132d20),('global25remove_quote_control_mint',0x133338),('global32set_quote_control_reserves_admin',0x133940),('global31set_quote_control_mint_reserves',0x133f48)]
pairs={}
todo=[]
for sym,oa in seeds:
    a,s,n=[f for f in funcs if sym in f[2]][0]; todo.append((a,oa))
seen=set()
while todo:
    ca,oa=todo.pop()
    if ca in seen: continue
    seen.add(ca); s,n=byaddr[ca]
    cb,ob=cbytes(ca,s),obytes(oa,s)
    same=mask(cb)==mask(ob)
    pairs[ca]={'symbol':n,'size':s,'original':oa,'masked_equal':same,'raw_equal':cb==ob}
    # pair calls by position only when instruction streams align
    cc=calls(cb,ca); oc=calls(ob,oa)
    if same or len(cc)==len(oc):
        for (ci,ct),(oi,ot) in zip(cc,oc):
            if ci==oi and ct in byaddr and ct not in seen: todo.append((ct,ot))
for ca,p in sorted(pairs.items(),key=lambda x:x[1]['original']):
    print(f"{p['original']:#8x} {p['size']:6d} masked={int(p['masked_equal'])} raw={int(p['raw_equal'])} {re.sub(r'17h[0-9a-f]{16}E$','',p['symbol'])[-80:]}")
json.dump(pairs,open(sys.argv[2],'w'),indent=1) if len(sys.argv)>2 else None
