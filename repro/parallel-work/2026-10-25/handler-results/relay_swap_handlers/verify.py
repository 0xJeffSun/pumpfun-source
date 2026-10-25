#!/usr/bin/env python3
"""Portable offline integrity + operand verification. No semantic-equivalence claim."""
import hashlib,json,struct,sys
from pathlib import Path
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
sys.path.insert(0,str(P))
def require(ok,msg):
    if not ok: raise SystemExit('FAIL: '+msg)
m=json.loads((P/'manifest.json').read_text())
require(hashlib.sha256((P/'manifest.json').read_bytes()).hexdigest()==(P/'manifest.sha256').read_text().split()[0],'manifest seal')
files={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and '__pycache__' not in f.parts}
require(files==set(m)|{'manifest.json','manifest.sha256'},'artifact set')
for f,expected in m.items(): require(hashlib.sha256((P/f).read_bytes()).hexdigest()==expected,f)
import disasm,derive
actual=derive.derive()
require(actual==json.loads((P/'static-evidence.json').read_text()),'rederived static ledger')
for w in actual['windows']:
    o=w['ordinal'];require(w['sha256']==disasm.W[o]['sha256'],f'prior window {o}')
    require((P/f'disassembly/{o}.txt').read_text()==disasm.render(o),f'disassembly {o}')
    for c in w['calls']:
        if 'target' in c and not c['external']:
            require(c['src']==1,f'local call source nibble {c["pc"]}')
# Fixed, independently stated semantic anchors: opcode/register/offset/immediate.
checks={
56464:(0xa5,8,37,4),58712:(0xa5,8,37,4),59528:(0xa5,8,25,3),
67344:(0x79,0x71,104,0),67368:(0x79,0x91,104,0),
67744:(0xad,0x12,1,0),67896:(0x1f,0x12,0,0),67904:(0x1d,0x82,1,0),
67936:(0xad,0x21,1,0),68640:(0x1d,0x21,1,0),70168:(0x1f,0x21,0,0),
68328:(0x62,0x0a,-144,6021),68968:(0x62,0x0a,-144,6023),
65520:(0x71,0x91,41,0),65368:(0x73,0x16,-1,0),
105496:(0x7b,0x92,280,0),105512:(0x73,0x02,288,0),
103224:(0x62,0x0a,-96,6028),104464:(0x62,0x0a,-96,6007),
108056:(0x55,0x01,8,10000),108064:(0x3d,0x45,78,0),
108856:(0x27,0x03,0,48),108880:(0x1f,0x45,0,0),
107976:(0x5d,0x40,553,0),108464:(0x62,0x0a,-232,6022),
127984:(0x55,0x06,43,0),636240:(0x62,0x0a,-80,8),
633904:(0x72,0x00,0,8),634672:(0x72,0x00,0,9),
115040:(0x62,0x0a,-128,6015),
}
for pc,t in checks.items(): require(struct.unpack_from('<BBhi',disasm.B,pc)==t,f'operand {pc}')
for pc,target in {105400:67320,109432:67320,67568:64824,67632:17712,
67696:17712,66584:668496,111288:119440,129680:616736,128272:621096,
111736:127704,112032:621096,546096:436696,544528:469568,
546936:665312,545408:665312,547152:465512,545656:486200}.items():
    op,reg,off,imm=struct.unpack_from('<BBhi',disasm.B,pc)
    require(op==0x85 and reg>>4==1 and pc+8+8*imm==target,f'call {pc}')
require(disasm.B[754884:754899]==b'distribution_v1','signer seed')
require(disasm.B[759376:759380]==b'\x09\0\0\0','close token enum')
print(json.dumps({'status':'pass','windows':len(actual['windows']),'operand_anchors':len(checks),'scope':'static only; no SBF/build/runtime/transaction fixtures'}))
