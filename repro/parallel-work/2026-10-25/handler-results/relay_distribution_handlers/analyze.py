"""Static byte decoding only; never loads or executes the ELF."""
import hashlib,json,struct
from pathlib import Path
import disasm
P=Path(__file__).resolve().parent
SELECTED=[8,21,78,81,97,98,105,108,109,113,119,146,147,148,149,186,187,200,201,226,227,229,244,246,247,248,282]
LITERALS=[(752896,32),(753024,32),(753088,32),(753152,32),(753248,32),(754884,15),(756958,17),(757412,12),(757487,15),(759092,64),(759376,4)]
def derive():
 b=disasm.B; rows=[]
 for n in SELECTED:
  w=disasm.W[n]; a,z=w['start'],w['end']; calls=[]; branches=[]; mem=[]
  for pc,raw,_ in disasm.instructions(a,z):
   op,r,o,i=struct.unpack_from('<BBhi',b,pc)
   if op==0x85: calls.append(dict(pc=pc,register_byte=r,immediate=i,target=None if pc in disasm.EXTERNAL else pc+8+8*i,external=disasm.EXTERNAL.get(pc)))
   elif op==0x8d: calls.append(dict(pc=pc,register_byte=r,callx_operand=i))
   elif op&7 in (5,6) and op!=0x95: branches.append(dict(pc=pc,target=pc+8+o*8,opcode=op,dst=r&15,src=r>>4,immediate=i))
   if op&7 in (1,2,3): mem.append(dict(pc=pc,opcode=op,dst=r&15,src=r>>4,offset=o,immediate=i))
  rows.append(dict(ordinal=n,start=a,end=z,sha256=hashlib.sha256(b[a:z]).hexdigest(),calls=calls,branches=branches,memory_operands=mem))
 return dict(windows=rows,literals=[dict(start=a,end=a+l,hex=b[a:a+l].hex(),sha256=hashlib.sha256(b[a:a+l]).hexdigest()) for a,l in LITERALS])
if __name__=='__main__':
 (P/'static-evidence.json').write_text(json.dumps(derive(),indent=2)+'\n')
 q=P/'listings';q.mkdir(exist_ok=True)
 for n in SELECTED:(q/f'{n}.asm').write_text(disasm.render(n))
