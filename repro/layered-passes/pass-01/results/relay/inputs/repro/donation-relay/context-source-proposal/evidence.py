"""Static extraction only; never loads or executes the ELF."""
import json,struct,hashlib
from pathlib import Path
P=Path(__file__).resolve().parent
B=(P/'inputs/deployed.so').read_bytes()
W=json.loads((P/'inputs/windows.json').read_text())
def instructions(start,end):
 p=start
 while p<end:
  op,regs,off,imm=struct.unpack_from('<BBhi',B,p);n=16 if op==24 else 8
  d,s=regs&15,regs>>4
  row=dict(pc=p,raw=B[p:p+n].hex(),opcode=op,dst=d,src=s,offset=off,immediate=imm)
  if op==133:
   row['call_kind']='relative' if s==1 else 'external_or_absolute'
   if s==1:row['target']=p+8+8*imm
  elif op==141:row['call_kind']='register';row['operand_register']=imm
  elif op&7 in (5,6) and op!=149:row['branch_target']=p+8+8*off
  if op==24:row['constant64']=struct.unpack_from('<I',B,p+4)[0]+(struct.unpack_from('<I',B,p+12)[0]<<32)
  yield row;p+=n
 assert p==end

def window(o):
 w=W[o];a,z=w['start'],w['end']
 return dict(ordinal=o,start=a,end=z,sha256=hashlib.sha256(B[a:z]).hexdigest(),instructions=list(instructions(a,z)))
def render(o):
 lines=[]
 for x in window(o)['instructions']:
  p=x['pc'];op=x['opcode'];d=x['dst'];s=x['src'];imm=x['immediate'];off=x['offset'];arg=f'r{s}' if op&8 else str(imm)
  if op==24:t=f'r{d} = {x["constant64"]}'
  elif op==133:t=f'call src={s} signed={imm} target='+str(x.get('target','external/absolute; consult relocation'))
  elif op==141:t=f'callx operand register {imm}'
  elif op==149:t='exit'
  elif op&7 in (4,7):t=f'alu{op&240:x} r{d}, {arg}'
  elif op&7 in (5,6):t=f'branch{op&240:x} r{d}, {arg} -> {x["branch_target"]}'
  elif op&7==1:t=f'load{ {0:32,8:16,16:8,24:64}[op&24]} r{d}, [r{s}{off:+}]'
  elif op&7 in (2,3):t=f'store{ {0:32,8:16,16:8,24:64}[op&24]} [r{d}{off:+}], '+(f'r{s}' if op&7==3 else str(imm))
  else:t=f'op{op}'
  lines.append(f'{p}: {x["raw"]:32} {t}')
 return '\n'.join(lines)+'\n'
