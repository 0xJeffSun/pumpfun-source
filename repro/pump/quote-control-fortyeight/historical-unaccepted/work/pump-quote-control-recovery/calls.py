import sys,json,re,struct,pathlib
sys.path.insert(0,'scripts')
from pump_quote_control_function_match import sections, ORIGINAL
pairs=json.load(open(sys.argv[1])); start=int(sys.argv[2],0); n=int(sys.argv[3])
names={p['original']:re.sub(r'17h[0-9a-f]{16}E$','',p['symbol'])[-70:] for p in pairs.values()}
o=ORIGINAL.read_bytes(); t=sections(o)['.text']
for i in range(0,n*8,8):
    a=start+i; b=o[a-t['addr']+t['offset']:][:8]
    if b[0]==0x85:
        imm=struct.unpack_from('<i',b,4)[0]
        tgt=a+8+imm*8 if imm!=-1 else None
        print(hex(a),'call',hex(tgt) if tgt else 'syscall', names.get(tgt,''))
    if b[0]==0x95: print(hex(a),'exit'); 
