from pathlib import Path
import sys,struct,json
sys.path.insert(0,'repro/layered-passes/pass-01/results/pump/source-tools');from elf_reader import Elf
O=Elf(Path('evidence/original/pump/deployed.so'));C=Elf(Path('repro/pump/nested-general-route-fortyeight/candidate.so'));S=Elf(Path('repro/pump/nested-general-route-fortyeight/unstripped.so'))
# Static constant propagation through a read-only formatter's decision tree.
def trace(e,start,value,mode):
 regs={1:value if mode=='debug' else 0x100000000,2:0x200000000};mem={0x100000000:value};pc=start;trace=[]
 for _ in range(1000):
  op,r,off,im=struct.unpack_from('<BBhi',e.b,pc);d,s=r&15,r>>4;row={'pc':pc,'op':op,'dst':d,'src':s,'off':off,'imm':im};trace.append(row);n=pc+8
  if op==0x85:return {'path':trace,'regs':regs,'call_target':e.calls.get(pc)}
  if op==0x18:regs[d]=(im&0xffffffff)|struct.unpack_from('<I',e.b,pc+12)[0]<<32;n=pc+16
  elif op==0x79:regs[d]=mem.get(regs[s]+off,('load64',regs[s]+off))
  elif op==0x61:regs[d]=mem.get(regs[s]+off,('load32',regs[s]+off))
  elif op in (0xb7,0xbf):regs[d]=regs[s] if op==0xbf else im
  elif op in (0x67,0x77):regs[d]=((regs[d]<<im)&((1<<64)-1)) if op==0x67 else regs[d]>>im
  elif op==0x05:n=pc+8+off*8
  elif op in (0x15,0x25,0x35,0x65,0x55,0x75):
   a,b=regs[d],im
   if op in (0x65,0x75):a=a-(1<<64)if a>(1<<63)-1 else a
   yes={0x15:lambda:a==b,0x25:lambda:a>b,0x35:lambda:a>=b,0x65:lambda:a>b,0x55:lambda:a!=b,0x75:lambda:a>=b}[op]()
   row['taken']=yes
   if yes:n=pc+8+off*8
  else:raise Exception(row)
  pc=n
 raise Exception('steps')
for side,e,ds,ps in [('original',O,1436840,1433224),('candidate',C,1222920,1219304)]:
 for d in [108,109,110]:
  for mode,start in [('debug',ds),('display',ps)]:
   t=trace(e,start,d,mode);print(side,d,mode,{k:v for k,v in t.items()if k!='path'})
   if mode=='debug':print(repr(e.b[t['regs'][2]:t['regs'][2]+t['regs'][3]]))
   else:
    a=t['regs'][1];print('slice',a,e.b[a:a+24].hex());p=struct.unpack_from('<Q',e.b,a)[0]>>32;n=struct.unpack_from('<Q',e.b,a+8)[0];print(p,n,repr(e.b[p:p+n]))
# Exact metadata-use references only; containing bodies are not interpreted.
for target in [1432720,O.calls[1432784],1433224,1436840]:
 callers=[]
 for pc,t in O.calls.items():
  if t==target:
   found=[]
   for k in range(pc-64,pc,8):
    op,r,off,im=struct.unpack_from('<BBhi',O.b,k)
    if im==110:found.append(k)
   callers.append({'call_pc':pc,'preceding_immediate_110_sites':found})
 print('target',target,'count',len(callers),'110', [x for x in callers if x['preceding_immediate_110_sites']])
