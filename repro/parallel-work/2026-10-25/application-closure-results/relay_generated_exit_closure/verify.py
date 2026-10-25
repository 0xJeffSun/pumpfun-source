#!/usr/bin/env python3
"""Offline evidence checks only. Does not load, emulate or execute the SBF."""
import hashlib,json,struct,sys
from pathlib import Path
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def need(v,m):
 if not v:raise ValueError(m)
def read(n):return (P/n).read_bytes()
def js(n):return json.loads(read(n))
def filecheck(n,v):
 b=read(n);need(len(b)==v['size'] and H(b)==v['sha256'],'file '+n)
m=js('manifest.json');need(H(read('manifest.json'))==read('manifest.sha256').decode().split()[0],'manifest seal')
actual={p.relative_to(P).as_posix() for p in P.rglob('*') if p.is_file()}
need(actual==set(m['files'])|{'manifest.json','manifest.sha256'},'sealed inventory')
for n,v in m['files'].items():filecheck(n,v)
for d in ['prior','tooling-prior']:
 pm=js(d+'/manifest.json')
 if d=='prior':need(H(read(d+'/manifest.json'))==read(d+'/manifest.sha256').decode().split()[0],'prior seal')
 for p in (P/d).rglob('*'):
  if p.is_file():
   n=p.relative_to(P/d).as_posix()
   if n in pm['files']:filecheck(d+'/'+n,pm['files'][n])
for x in js('input-manifest.json'):filecheck(x['path'],x)
B=read('inputs/deployed.so');W=js('inputs/windows.json')
need(H(B)=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563','original ELF')
# Resolve actual ELF relocation symbol names, not inferred function labels.
shoff=struct.unpack_from('<Q',B,40)[0];shsize,shnum=struct.unpack_from('<HH',B,58)
sections=[struct.unpack_from('<IIQQQQIIQQ',B,shoff+i*shsize) for i in range(shnum)]
def relcheck(pc,r):
 rp=r['record_pc'];target,info=struct.unpack_from('<QQ',B,rp)
 need(target==pc and (info&0xffffffff)==r['type'],'relocation operand')
 sec=next(s for s in sections if s[1]==9 and s[4]<=rp<s[4]+s[5])
 syms=sections[sec[6]];strings=sections[syms[6]]
 nameoff=struct.unpack_from('<I',B,syms[4]+(info>>32)*syms[9])[0]
 a=strings[4]+nameoff;name=B[a:B.index(b'\0',a)].decode()
 need(name==r['symbol'],'relocation symbol')
def decode(a,z):
 out=[]
 while a<z:
  op,r,off,imm=struct.unpack_from('<BBhi',B,a);n=16 if op==24 else 8
  need(a+n<=z,'instruction extent');out.append((a,op,r,off,imm,n));a+=n
 need(a==z,'window end');return out
import disasm
rows=js('consumed-code.json');by={r['ordinal']:r for r in rows}
for row in rows:
 a,z=row['range'];need([W[row['ordinal']]['start'],W[row['ordinal']]['end']]==[a,z],'window bounds')
 need(H(B[a:z])==row['sha256'],'window digest')
 ins=decode(a,z);need(len(ins)==len(row['instructions']),'instruction count')
 for (pc,op,r,off,imm,n),x in zip(ins,row['instructions']):
  need(x['pc']==pc and x['raw']==B[pc:pc+n].hex(),'instruction bytes')
  if 'target' in x:need(op==133 and r>>4==1 and x['target']==pc+8+imm*8,'relative call')
  if 'relocation' in x:need(op==133,'external call');relcheck(pc,x['relocation'])
  if 'branch_target' in x:need(op&7 in (5,6) and x['branch_target']==pc+8+off*8,'branch')
  if 'indirect_operand' in x:need(op==141 and x['indirect_operand']==imm,'callx')
 need(read('disassembly/'+str(row['ordinal'])+'.txt').decode()==disasm.render(row['ordinal']),'render')
for x in js('consumed-data.json'):
 a,z=x['range'];need(B[a:z].hex()==x['hex'] and H(B[a:z])==x['sha256'],'data')
for x in js('consumed-metadata.json'):
 a,z=x['range'];need(H(B[a:z])==x['sha256'],'ELF metadata range')
for x in js('source-ranges.json'):
 b=read(x['path']);need(x['bytes']==[0,len(b)] and x['lines']==[1,len(b.splitlines())] and H(b)==x['sha256'],'source extent')
# Independent operand anchors for semantic claims; no execution/model inputs.
def call(pc,target):
 op,r,_,imm=struct.unpack_from('<BBhi',B,pc)
 need(op==133 and r>>4==1 and pc+8+imm*8==target,'anchor call '+str(pc))
for pc,t in {201840:14936,201920:13984,398768:16672,399048:14936,399832:13984,418112:651352,418960:651352,434880:651352,465584:16672,486808:651352,651384:689424,651408:689424,651664:690592,651704:690144,652376:689752,401024:4192,467992:4192}.items():call(pc,t)
for pc,raw in {651528:'7b02000000000000',651608:'7a02000000000000',690384:'7b32f8ff00000000',690392:'7b36200000000000',531592:'1500010000000000',545576:'55000f0000000000',504248:'2d12170000000000',466728:'0500a30000000000',468080:'150157ff00000000'}.items():need(B[pc:pc+8].hex()==raw,'store/branch anchor '+str(pc))
need(B[753088:753120]==bytes(32),'System owner')
# CFG dominance: removing the indicated phase call must make exit unreachable.
# Calls are opaque returning nodes; external nonreturning panic at end has no successor.
def reachable(n,target,removed=None):
 a,z=by[n]['range'];ins={x[0]:x for x in decode(a,z)};todo=[a];seen=set()
 while todo:
  p=todo.pop()
  if p in seen or p==removed or p not in ins:continue
  if p==target:return True
  seen.add(p);_,op,r,off,imm,k=ins[p]
  if op==149:continue
  if op&7 in (5,6) and op not in (133,141):
   todo.append(p+8+off*8)
   if op&240==0:continue
  todo.append(p+k)
 return False
ledger=js('phase-ledger.json');need(len(ledger)==11,'wrapper count')
for x in ledger:
 n=x['wrapper']['ordinal'];need(len(x['exit_call'])==1,'exit edge')
 ep=x['exit_call'][0];call(ep,x['exit']['range'][0]);need(reachable(n,ep),'reachable exit')
 for field in ['parser_call','body_or_adapter_call','return_serializer_call','set_return_data_call']:
  for pc in x[field]:need(not reachable(n,ep,pc),'phase dominates exit: '+field)
 need(bool(x['set_return_data_call'])==(n!=188),'whitelist return distinction')
 for op in x['operations']:need(by[x['exit']['ordinal']]['range'][0]<=op['anchor_pc']<by[x['exit']['ordinal']]['range'][1],'operation anchor')
# Explicit exclusion of close282 from just-swap, and exact close counts elsewhere.
for n,count in {125:0,130:0,141:0,145:0,147:2,149:1,153:0,155:1,158:0}.items():
 need(sum(x.get('target')==651352 for x in by[n]['instructions'])==count,'close count')
print(json.dumps({'status':'PASS','windows':len(rows),'wrappers':len(ledger),'checks':'seals, inputs, original bytes, relocations, source extents, static phase dominance, close/store/branch anchors','target_execution':False,'semantic_equivalence_proved':False},indent=2))
