"""Portable saved static evidence checks only. Never runs the collector/disassembler."""
from pathlib import Path
import json,hashlib,struct,sys
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
L=lambda n:json.loads((P/n).read_text())
PLAN='acc8f159907a21182cfc1402d979e00d1193c7303364e958c51c23a6ee4fe8c8'
def verify():
 manifest=L('manifest.json'); seal=H((P/'manifest.json').read_bytes())
 assert (P/'manifest.sha256').read_text()==seal+'  manifest.json\n'
 actual={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file() and x.name not in ['manifest.json','manifest.sha256']}
 # Nested admitted-plan manifest files are payloads too.
 actual.update(['admitted-plan/manifest.json','admitted-plan/manifest.sha256'])
 assert actual==set(manifest['files'])
 for n,r in manifest['files'].items():
  b=(P/n).read_bytes(); assert H(b)==r['sha256'] and len(b)==r['bytes'],n
 assert H((P/'admitted-plan/manifest.json').read_bytes())==PLAN
 plan=L('admitted-plan/manifest.json')
 for n,r in plan['files'].items():
  b=(P/'admitted-plan'/n).read_bytes(); assert H(b)==r['sha256'] and len(b)==r['bytes']
 admission=L('admitted-plan/admission.UNRUN.json'); metadata=L('admitted-plan/selected-existing-metadata.json')
 assert admission['status']=='UNEXECUTED_NOT_ADMITTED' # Frozen plan; later root admission is recorded separately.
 assert admission['new_body_budget']['original_windows']==[[753072,754592]]
 assert admission['new_body_budget']['candidate_windows']==[[738112,739632]]
 cap=L('capture.json'); assert cap['plan_seal']==PLAN and len(cap['rows'])==2
 assert L('preflight.json')['gate']=='PASS' and L('outer-runner-exit.json')['returncode']==0
 flow=L('complete-control-flow.json'); parsed={}
 for side,start,end in [('original',753072,754592),('candidate',738112,739632)]:
  name=f'{side}-{start}-{end}'; raw=(P/(name+'.bin')).read_bytes(); expected=admission[side+'_complete_window']; row=metadata[f'{side}-{start}']
  assert len(raw)==1520 and H(raw)==expected['raw_sha256']==row['raw_sha256']
  child=next(x for x in cap['rows'] if x['side']==side)
  assert child['returncode']==0 and child['start']==start and child['end']==end and child['raw_sha256']==H(raw)
  assert '--start-address='+str(start) in child['command'] and '--stop-address='+str(end) in child['command']
  assert (P/(name+'.stderr')).read_bytes()==b''
  ins=L(side+'-instructions.json'); parsed[side]=ins
  assert len(ins)==177 and b''.join(bytes.fromhex(x['raw_hex']) for x in ins)==raw
  assert [x['offset'] for x in ins]==[x['pc']-start for x in ins]
  pcs={x['pc'] for x in ins}; branches=[]; calls=[]; exits=[]; loads=[]
  for x in ins:
   b=bytes.fromhex(x['raw_hex']); assert start<=x['pc']<end and raw[x['offset']:x['offset']+len(b)]==b
   if b[0]==0x18: assert len(b)==16;loads.append(x)
   else:assert len(b)==8
   if b[0]&7==5 and b[0] not in [0x85,0x95]:
    target=x['pc']+8+struct.unpack_from('<h',b,2)[0]*8; assert target in pcs
    z=next(y for y in flow[side]['branches'] if y['pc']==x['pc'])
    assert z['offset']==x['offset'] and z['raw_hex']==x['raw_hex'] and z['target']==target and z['target_offset']==target-start
    assert z['fallthrough']==(None if b[0]==5 else x['pc']+8) and z['role'];branches.append(x)
   if b[0]==0x85:
    target=x['pc']+8+struct.unpack_from('<i',b,4)[0]*8
    z=next(y for y in flow[side]['direct_calls'] if y['pc']==x['pc']);assert target==z['target'] and z['callee_body_newly_decoded'] is False
    m=next(y for y in row['dependencies']['direct'] if y['pc']==x['pc']);assert target==m['target'];calls.append(x)
   if b[0]==0x95:exits.append(x['pc'])
  assert len(branches)==30 and len(calls)==10 and len(loads)==13
  assert exits==[start+968]==flow[side]['exits']
  assert not row['dependencies']['indirect'] and not row['dependencies']['external']
  assert flow[side]['relocated_loads']==row['dependencies']['relocated_targets']
  assert {x['offset'] for x in loads}=={x['offset'] for x in row['dependencies']['relocated_targets']}
  assert ins[-1]['offset']==1512 and bytes.fromhex(ins[-1]['raw_hex'])[0]==0x85
  wrapper=(P/(side+'-wrapper.already-admitted.bin')).read_bytes(); edge=admission['already_admitted_caller_edge'][side]
  assert len(wrapper)==40 and H(wrapper)==edge['raw_sha256'] and wrapper[24:32].hex()==edge['raw_call_hex']
  assert edge['call_pc']+8+struct.unpack_from('<i',wrapper,28)[0]*8==start
  assert wrapper[:24].hex()=='bf13000000000000bf21000000000000bf32000000000000'
 assert (P/'original-wrapper.already-admitted.bin').read_bytes()==(P/'candidate-wrapper.already-admitted.bin').read_bytes()
 witness=L('complete-byte-difference-witness.json');differences=[]
 for a,b in zip(parsed['original'],parsed['candidate']):
  assert a['offset']==b['offset'];x=bytes.fromhex(a['raw_hex']);y=bytes.fromhex(b['raw_hex']);assert len(x)==len(y)
  if x!=y:
   offsets=[i for i,(l,r) in enumerate(zip(x,y)) if l!=r]
   allowed=list(range(4,8)) if x[0]==0x85 else list(range(4,8))+list(range(12,16))
   assert x[0] in [0x85,0x18] and set(offsets)<=set(allowed)
   z=next(r for r in witness['rows'] if r['offset']==a['offset']);assert z['original_raw_hex']==x.hex() and z['candidate_raw_hex']==y.hex() and z['differing_byte_offsets']==offsets;differences.append(z)
 assert len(differences)==23 and sum(x['kind']=='direct_call_target_immediate' for x in differences)==10
 assert sum(x['kind']=='relocated_lddw_immediate' for x in differences)==13
 data=L('data-consumers.json');assert data['data_bytes_read_or_extracted'] is False and data['literal_values_opaque'] is True
 for side,base in [('original',815847),('candidate',804569)]:
  byoff={x['offset']:bytes.fromhex(x['raw_hex']) for x in parsed[side]}
  assert byoff[1032].hex()=='2501210039000000' # unsigned >57 guard before table load
  assert byoff[1064].hex()=='7151800000000000' # one byte at base+index+128
  assert struct.unpack_from('<I',byoff[1040],4)[0]==base
  sl=data['table_consumer']['minimal_possible_load_slice'];assert sl[side+'_start']==base+128 and sl[side+'_end']==base+186 and sl['bytes']==58
 return {'result':'PASS','scope':'Portable saved body/edge/branch/call/hash witness checks; no collector, disassembler, data read, lower decode, compiler or runtime','plan_payloads':len(plan['files']),'body_bytes_each':1520,'instructions_each':177,'branches_each':30,'direct_calls_each':10,'relocated_loads_each':13,'normal_exit_each':1,'different_instructions':23,'source_patch':False,'raw_body_equality':False,'transitive_data_equivalence':False,'admin_authorization_runtime_coverage':0}
if __name__=='__main__':
 print(json.dumps(verify(),indent=2))
