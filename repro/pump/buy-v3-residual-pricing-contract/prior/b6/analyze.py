"""Offline static inventory. Does not execute a program or model runtime fixtures."""
from pathlib import Path
import json,struct,hashlib,re
from elf_reader import ELF
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def analyze():
 e=ELF(P/'evidence/original.so'); bs=json.loads((P/'boundaries.json').read_text())
 bs += [dict(start=0x83c00,end=0x84970,boundary='settlement inferred interval'),dict(start=0x1286c8,end=0x128c28,boundary='wrapper inferred interval')]
 rows=[]
 for w in bs:
  ins=[]
  for pc,op,reg,off,imm in e.instructions(w['start'],w['end']):
   raw=e.at(pc,16 if op==0x18 else 8);r=dict(pc=pc,raw=raw.hex(),opcode=op,dst=reg&15,src=reg>>4,offset=off,immediate=imm)
   rel=[x for x in e.reloc if pc<=x['offset']<pc+len(raw)]
   if rel:r['relocations']=rel
   if op==0x85:
    r['call']={'kind':'relocation' if rel else 'relative' if reg==16 else 'unresolved-immediate','target':pc+8+8*imm if reg==16 and not rel else None,'symbols':[x['symbol']['name'] if x['symbol'] else None for x in rel]}
   elif op==0x8d:r['call']={'kind':'indirect-unresolved','target':None}
   elif op&7 in (5,6) and op!=0x95:r['branch_target']=pc+8+8*off
   if op==0x18:
    v=(imm&0xffffffff)|(struct.unpack_from('<I',raw,12)[0]<<32);r['lddw']=v
    sample=e.at(v,32)
    r['data']={'extent':'unresolved; 32 bytes only a fingerprint, not an object bound','prefix32':sample.hex() if sample else None,'relocation_bound':bool(rel)}
   ins.append(r)
  rows.append(dict(**w,raw_sha256=H(e.at(w['start'],w['end']-w['start'])),instructions=ins))
 return {'original_sha256':H(e.b),'normalization':'none','rows':rows,'recursive_closure':False,'boundary_warning':'Inferred intervals are not historical symbols; every frontier call is retained, not certified.'}
def verify_asm():
 e=ELF(P/'evidence/original.so');n=0
 for f in (P/'evidence').glob('*.asm'):
  last=None
  for s in f.read_text().splitlines():
   m=re.match(r'\s*([a-fA-F0-9]+):\s*((?:[0-9a-f]{2}\s+){7,15}[0-9a-f]{2})\s',s)
   if not m:continue
   pc=int(m[1],16);b=bytes.fromhex(m[2]);assert e.at(pc,len(b))==b,(f,hex(pc));n+=1
   if last is not None:assert pc==last,(f,hex(pc),hex(last))
   last=pc+len(b)
 return n
if __name__=='__main__':
 (P/'byte-ledger.json').write_text(json.dumps(analyze(),indent=2)+'\n')
 print('assembly instructions checked:',verify_asm())
