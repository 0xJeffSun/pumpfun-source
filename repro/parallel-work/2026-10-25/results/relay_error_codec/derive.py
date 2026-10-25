"""Offline static instruction/constant ledger. Does not execute program code."""
import hashlib, json, struct, importlib.util, sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parent

def derive():
 b=(ROOT/'inputs/prior/inputs/deployed.so').read_bytes()
 sha=lambda x:hashlib.sha256(x).hexdigest()
 spec=importlib.util.spec_from_file_location('prior_analysis',ROOT/'inputs/prior/analyze.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 prior=m.derive()
 def ins(p):
  op,r,o,i=struct.unpack_from('<BBhi',b,p);n=16 if op==24 else 8
  q=dict(pc=p,opcode=op,dst=r&15,src=r>>4,offset=o,immediate=i,raw=b[p:p+n].hex())
  if op==24:q['u64']=int.from_bytes(b[p+4:p+8]+b[p+12:p+16],'little')
  if op==133 and r>>4==1:q['call_target']=p+8+i*8
  if op&7==5 and op not in (133,149):q['branch_target']=p+8+o*8
  return q
 def decode(a,z):
  out=[]
  while a<z:
   q=ins(a);out.append(q);a+=len(bytes.fromhex(q['raw']))
  assert a==z
  return out
 # Only fold comparisons in two immutable numeric selector trees. No SBF execution.
 def selector(start,code):
  p=start+8;path=[]
  while True:
   q=ins(p);path.append(q)
   if q['opcode']==24:return path,q['u64']
   assert q['opcode'] in [0x65,0x15]
   taken=code>q['immediate'] if q['opcode']==0x65 else code==q['immediate']
   p=q['branch_target'] if taken else p+8
 h=struct.unpack_from('<16sHHIQQQIHHHHHH',b,0)
 sections=[struct.unpack_from('<IIQQQQIIQQ',b,h[6]+i*h[11]) for i in range(h[12])]
 rel={}
 for s in sections:
  if s[1]==9:
   for p in range(s[4],s[4]+s[5],s[9]):
    off,info=struct.unpack_from('<QQ',b,p);rel[off]=dict(record_range=[p,p+16],raw=b[p:p+16].hex(),type=info&0xffffffff,symbol_index=info>>32)
 errors=[]
 for code,name,msg in [(3001,'AccountDiscriminatorNotFound','No discriminator was found on the account'),(3002,'AccountDiscriminatorMismatch','Account discriminator did not match what was expected'),(3003,'AccountDidNotDeserialize','Failed to deserialize the account')]:
  np,addr=selector(662256,code);mp,desc=selector(665904,code)
  assert b[addr:addr+len(name)]==name.encode()
  rawptr,length=struct.unpack_from('<QQ',b,desc);msgaddr=rawptr>>32
  assert rawptr&0xffffffff==0 and length==len(msg) and b[msgaddr:msgaddr+length]==msg.encode()
  assert rel[desc]['type']==8
  errors.append(dict(code=code,name=name,message=msg,name_range=[addr,addr+len(name)],name_selector=np,message_selector=mp,message_descriptor_range=[desc,desc+16],descriptor_raw=b[desc:desc+16].hex(),descriptor_relocation=rel[desc],message_range=[msgaddr,msgaddr+length],pointer_note='Raw descriptor upper word corresponds to string ELF offset; file not relocated or patched.'))
 windows=json.loads((ROOT/'inputs/prior/inputs/prior-windows.json').read_text());by={w['start']:w for w in windows}
 starts=[18400,19368,21392,22416,62552,62736,63304,63488,372816,402000,515416,542112,547224,566024,646064,652392,652688,655256,657016,662256,665312,665904,692392]
 out=[]
 for a in starts:
  w=by[a];z=w['end'];assert sha(b[a:z])==w['sha256']
  out.append(dict(range=[a,z],sha256=sha(b[a:z]),boundary_status='inferred window; not historical source identity',instructions=decode(a,z)))
 # Selected operand facts link return conversion, optional fields, and caller forwarding.
 expected={657024:dict(opcode=87,immediate=1),657040:dict(opcode=97,src=6,offset=152),657048:dict(opcode=24,u64=1<<63),657064:dict(opcode=123,dst=1,offset=0),657072:dict(opcode=99,dst=1,offset=8),692968:dict(opcode=97,src=1,offset=8),692976:dict(opcode=21,immediate=0),692984:dict(opcode=191,dst=6,src=3),693416:dict(opcode=191,dst=0,src=6),566264:dict(call_target=692392),566328:dict(opcode=191,dst=0,src=8),655272:dict(branch_target=656520,immediate=0),655280:dict(branch_target=656152,immediate=1),655616:dict(branch_target=657008,immediate=2),505952:dict(opcode=122,offset=0,immediate=1),375072:dict(opcode=122,offset=0,immediate=1),405064:dict(opcode=122,offset=0,immediate=1),404768:dict(opcode=122,offset=0,immediate=1)}
 checks=[]
 for p,e in expected.items():
  q=ins(p)
  for k,v in e.items():assert q[k]==v,(p,k,q[k],v)
  checks.append(dict(instruction=q,expected=e))
 paths=[('DebouncerV1','close_donation_epoch_v1',[(542112,542536,372816),(372816,374120,62736),(62736,62904,19368),(19368,20024,505216)]),('EpochTrackerV1','close_donation_epoch_v1',[(542112,542536,372816),(372816,373552,63304),(63304,63472,21392),(21392,22048,509800)]),('DistributionV1','distribute_after_just_swapping_v1',[(547224,547520,402000),(402000,403184,62552),(62552,62720,22416),(22416,23072,507440)]),('SwapReceiptV1','distribute_after_just_swapping_v1',[(547224,547520,402000),(402000,403968,63488),(63488,63656,18400),(18400,19056,513680)])]
 dispatch=json.loads((ROOT/'inputs/dispatch.json').read_text());idl=json.loads((ROOT/'inputs/prior/inputs/idl.json').read_text());routes=[]
 for name,ix,edges in paths:
  d=next(d for d in dispatch if d['name']==ix);ii=next(i for i in idl['instructions'] if i['name']==ix)
  assert ins(d['constant_pc'])['u64']==int.from_bytes(bytes(ii['discriminator']),'little')
  assert ins(d['comparison_pc'])['branch_target']==d['branch_target']
  assert ins(d['dispatch_call_pc'])['call_target']==edges[0][0]
  for a,p,t in edges:assert a<=p<by[a]['end'] and ins(p)['call_target']==t
  routes.append(dict(account=name,instruction=ix,dispatch_constant_pc=d['constant_pc'],dispatch_comparison_pc=d['comparison_pc'],dispatch_call_pc=d['dispatch_call_pc'],edges=[list(edge) for edge in edges],note='Direct-call and dispatcher identity proof; resource-failure closure is not implied.'))
 data=[]
 for a,z in [(775328,775568),(776520,776568)]:
  ds=[]
  for p in range(a,z,16):
   ptr,n=struct.unpack_from('<QQ',b,p)
   if p in rel and ptr&0xffffffff==0 and 752776<=ptr>>32<772640:
    s=ptr>>32;ds.append(dict(descriptor=p,relocation=rel[p],string_range=[s,s+n],text=b[s:s+n].decode('utf-8',errors='replace')))
  data.append(dict(range=[a,z],raw=b[a:z].hex(),descriptors=ds))
 return dict(checkpoint='517d77db988d8c63b6cf476f0be138c5a4f3128a',binary_sha256=sha(b),elf_entry=h[4],prior_wire_evidence=prior,error_selectors=errors,dispatcher_routes=routes,assertions=checks,windows=out,optional_field_log_descriptors=data)
if __name__=='__main__':
 (ROOT/'static-evidence.json').write_text(json.dumps(derive(),indent=2)+'\n')
