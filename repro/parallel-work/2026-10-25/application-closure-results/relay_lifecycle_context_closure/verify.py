#!/usr/bin/env python3
"""Portable read-only static verifier. No target or source proposal execution."""
import ast,hashlib,json,struct,sys
from pathlib import Path
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def read(n):return (P/n).read_bytes()
def js(n):return json.loads(read(n))
def check(ok,msg):
 if not ok:raise SystemExit('FAIL: '+msg)
manifest=read('manifest.json'); seal=read('SEAL.sha256').decode().strip().split()
check(seal==[H(manifest),'manifest.json'],'manifest seal')
m=json.loads(manifest)
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}
check(actual==set(m['files'])|{'manifest.json','SEAL.sha256'},'exact publication file set')
for n,x in m['files'].items():
 check(not (P/n).is_symlink(),'symlink '+n)
 b=read(n);check(len(b)==x['size'] and H(b)==x['sha256'],'manifest '+n)
for x in js('input-manifest.json'):
 b=read(x['path']);check(len(b)==x['size'] and H(b)==x['sha256'],'frozen input '+x['path'])
# Static decoder only. Never load source/lifecycle.py as executable Python.
import disasm
B=read('inputs/deployed.so');W=js('inputs/prior-windows.json')
check(len(B)==830448 and H(B)=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563','original ELF')
E=js('static-evidence.json');seen={}
for x in E['windows']:
 o=x['ordinal'];a=x['start'];z=x['end'];check((a,z)==(W[o]['start'],W[o]['end']),'window extent')
 check(H(B[a:z])==x['sha256']==W[o]['sha256'],'window digest')
 instructions=list(disasm.instructions(a,z));check([[p,r] for p,r,t in instructions]==x['instructions'],'instruction decoding')
 check(read(f'listings/{o}.txt').decode()==disasm.render(o),'listing '+str(o))
 for pc,raw,txt in instructions:seen[pc]=(o,raw,txt)
 for c in x['calls']:
  pc=c['pc'];op,r,off,imm=struct.unpack_from('<BBhi',B,pc)
  if 'callx_register_operand' in c:check(op==141 and imm==c['callx_register_operand'] and r==c['raw_register_byte'],'callx operand')
  else:
   check(op==133 and r>>4==c['source_register'] and imm==c['signed_immediate'],'call operands')
   check(c['target']==(None if pc in disasm.EXTERNAL else pc+8+8*imm),'direct target')
   check(c['external']==disasm.EXTERNAL.get(pc),'external relocation')
 for c in x['branches']:
  pc=c['pc'];op,r,off,imm=struct.unpack_from('<BBhi',B,pc)
  check((op,r&15,r>>4,off,imm,pc+8+off*8)==(c['opcode'],c['dst_reg'],c['src_reg'],c['offset'],c['immediate'],c['target']),'branch operand')
 for c in x['stores']:
  op,r,off,imm=struct.unpack_from('<BBhi',B,c['pc'])
  check(op&7 in (2,3) and r&15==c['base_register'] and off==c['offset'] and {0:4,8:2,16:1,24:8}[op&24]==c['width'],'store layout')
for d in E['data']:
 b=B[d['start']:d['end']];check(b.hex()==d['hex'] and H(b)==d['sha256'],'data range')
for c in js('control-flow-anchors.json'):
 check(seen[c['pc']]==(c['ordinal'],c['raw'],c['instruction']),'semantic anchor '+c['claim'])
# Explicit checks resist accidental call-target relabeling and changed branch meaning.
def ins(pc,op,imm):
 v=struct.unpack_from('<BBhi',B,pc);check(v[0]==op and v[3]==imm,'critical opcode '+str(pc))
def call(pc,target):
 op,r,off,imm=struct.unpack_from('<BBhi',B,pc);check(op==133 and r>>4==1 and pc+8+8*imm==target,'critical call')
for pc,target in [(443368,455264),(444136,461928),(475360,461928),(457304,659728),(459072,661000),(460192,657648),(461216,658688),(461280,9968),(464744,613312),(464792,5320),(613384,645256)]:call(pc,target)
for pc,op,imm in [(455328,85,0),(455688,21,0),(455712,183,49),(645264,122,0),(645184,122,6),(651008,183,3010),(412024,183,33),(414880,183,6),(431776,183,6),(495416,21,1037)]:ins(pc,op,imm)
source=ast.parse(read('source/lifecycle.py').decode());constants={}
for n in source.body:
 if isinstance(n,ast.Assign) and isinstance(n.targets[0],ast.Name):
  try:constants[n.targets[0].id]=ast.literal_eval(n.value)
  except (ValueError,TypeError):pass
alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
def b58(b):
 n=int.from_bytes(b,'big');s=''
 while n:n,r=divmod(n,58);s=alphabet[r]+s
 return '1'*(len(b)-len(b.lstrip(b'\0')))+s
check(constants['RELAYER']==b58(B[752896:752928])=='RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc','fixed relayer')
names={142:'close_donation_epoch_v1',146:'distribute_after_just_swapping_v1',148:'distribute_non_swap_output_mint_v1',150:'just_swap_v1',154:'swap_then_distribute_v1',156:'upsert_mint_whitelist_v1'}
idl={v['name']:v for v in js('inputs/idl.json')['instructions']}
for o,name in names.items():
 check([n for n,k in constants['ORDERS'][o]]==[a['name'] for a in idl[name]['accounts']],'IDL order '+name)
 check(('signer','Signer') in constants['ORDERS'][o],'genuine signer type')
for r in js('source-ranges.json'):
 b=read(r['path']);check(r['whole_input_bytes']==[0,len(b)],'whole input extent')
 for q in r.get('selected_records',[]):
  a,z=q['bytes'];check(H(b[a:z])==q['sha256'],'selected JSON range')
  check(json.loads(b[a:z])['ordinal']==q['ordinal'],'selected window record')
check(js('result.json')['completion_count_delta']==0,'no count changes')
print(json.dumps({'status':'PASS','files':len(m['files']),'windows':len(E['windows']),'anchors':len(js('control-flow-anchors.json')),'source_executed':False,'target_executed':False,'manifest_sha256':H(manifest)},sort_keys=True))
