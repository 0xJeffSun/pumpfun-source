from pathlib import Path
import json,struct,hashlib
from elf_reader import ELF
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def analyze():
 o=ELF(P/'evidence/original.so');c=ELF(P/'evidence/candidate.so');s=ELF(P/'evidence/unstripped.so')
 assert o.record()['sha256']=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
 assert H(c.b)=='2aa18c73e517d9f74063633ea5d5b15f187d63e4dd4c09678b852afdd588cbc3'
 assert H(s.b)=='78cbc62e21a5df9f16ee346f0609441168f52088157bc601851d10e7e3cf757d'
 assert c.data(c.text)==s.data(s.text)
 def reloc(e,pc,n=8):return [r for r in e.reloc if pc<=r['offset']<pc+n]
 def call(e,pc,reg,imm):
  rr=reloc(e,pc)
  return dict(pc=hex(pc),encoded=imm,actual=hex(pc+8+8*imm) if reg==16 and not rr else None,relocations=rr)
 def norm(e,a,z):
  b=bytearray(e.at(a,z-a))
  for pc,op,reg,off,imm in e.instructions(a,z):
   if op==0x85:b[pc-a+4:pc-a+8]=b'\0'*4
   if op==0x18:
    b[pc-a+4:pc-a+8]=b'\0'*4;b[pc-a+12:pc-a+16]=b'\0'*4
  return H(b)
 starts={o.text['addr']};end=o.text['addr']+o.text['size']
 for pc,op,reg,off,imm in o.instructions(o.text['addr'],end):
  t=pc+8+8*imm
  if op==0x85 and reg==16 and not reloc(o,pc) and o.text['addr']<=t<end:starts.add(t)
 starts=sorted(starts);bounds=dict(zip(starts,starts[1:]+[end]))
 symbols=[x for x in s.syms if x['info']&15==2 and x['size'] and s.at(x['value'],x['size'])]
 index={}
 for x in symbols:index.setdefault((x['size'],norm(s,x['value'],x['value']+x['size'])),[]).append(x)
 rows=[];targets=set()
 for a,z in [(0x7f010,0x7fde8),(0x14910,0x160d0),(0x160d0,0x16bb8), (0x7e490,0x7f010), (0x94908,0x94e28), (0x185ed0,0x1862f0), (0x1991e0,0x1993f0), (0x1993f0,0x1998f0), (0x199918,0x199940)]:
  assert bounds[a] == z, (hex(a),hex(bounds[a]),hex(z))
  ins=[]
  for pc,op,reg,off,imm in o.instructions(a,z):
   r=dict(pc=hex(pc),bytes=o.at(pc,16 if op==24 else 8).hex())
   if op==0x85:
    r['call']=call(o,pc,reg,imm)
    if r['call']['actual']:targets.add(int(r['call']['actual'],16))
   elif op&7 in (5,6) and op!=0x95:r['branch']=hex(pc+8+off*8)
   if op==0x18:
    v=struct.unpack('<I',o.at(pc+4,4))[0]+(struct.unpack('<I',o.at(pc+12,4))[0]<<32)
    b=o.at(v,32);r['lddw']=dict(value=hex(v),relocations=reloc(o,pc,16),bounded_preview_hex=b.hex() if b else None,extent_type='unresolved; preview is not object extent')
   ins.append(r)
  rows.append(dict(start=hex(a),end=hex(z),boundary='next encoded direct call target; inferred',raw_sha256=H(o.at(a,z-a)),instructions=ins))
 out=[]
 for a in sorted(targets):
  z=bounds.get(a)
  if z is None:out.append(dict(start=hex(a),status='boundary unresolved'));continue
  matches=index.get((z-a,norm(o,a,z)),[])
  out.append(dict(start=hex(a),end=hex(z),raw_sha256=H(o.at(a,z-a)),candidates=[dict(address=hex(x['value']),size=x['size'],name=x['name'],raw_equal=o.at(a,z-a)==s.at(x['value'],x['size'])) for x in matches],status='shape candidates only; call and LDDW immediates masked; no semantic identity'))
 edges=[]
 for pc in [0x1480b8,0x7f600,0x7f868]:
  op,reg,off,imm=struct.unpack('<BBhi',o.at(pc,8));assert op==0x85;edges.append(call(o,pc,reg,imm))
 return dict(anchors=edges,windows=rows,immediate_targets=out,current_quote_symbols=[x for x in symbols if '5trade11check_quote' in x['name']],whole_original_equal=o.b==c.b,proposal_built=False,transitive_closure=False)
if __name__=='__main__':print(json.dumps(analyze(),indent=2))
