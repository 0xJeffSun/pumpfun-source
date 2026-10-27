"""Optional local compiler-output check; never run by default/source materialization."""
import collections,gzip,hashlib,importlib.util,json,struct,subprocess,tempfile
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def sha(b):return hashlib.sha256(b).hexdigest()
def load(path):return json.loads(path.read_bytes())
def blob(rev,name):return subprocess.check_output(['git','--no-optional-locks','show',rev+':'+name],cwd=ROOT)
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def location(w,image,target):
 rel=dict(w.m.relocations(image));assert rel.get(target,0)&0xffffffff==8
 raw=w.m.at_address(image,target,24);low,ptr,n,line,column=struct.unpack('<IIQII',raw)
 assert low==0 and 0<n<=300 and 0<line<=100000 and 0<column<=300
 section=next(s for s in w.m.elf_layout(image)['sections']if s['name']=='.rodata');assert section['address']<=ptr and ptr+n<=section['address']+section['size']
 name=w.m.at_address(image,ptr,n);assert name.endswith(b'.rs')and all(32<=b<127 for b in name)
 return name.decode(),line,column
def cohort(w,original,candidate,pairs):
 rows={};orr=dict(w.m.relocations(original));crr=dict(w.m.relocations(candidate))
 for pair in pairs:
  a,b=pair['original'],pair['candidate'];x=w.m.instructions(original,a['address'],a['bytes']);y=w.m.instructions(candidate,b['address'],b['bytes']);assert len(x)==len(y)
  for p,q in zip(x,y):
   if orr.get(a['address']+p['offset'],0)&0xffffffff!=8:continue
   assert crr.get(b['address']+q['offset'],0)&0xffffffff==8
   try:left=location(w,original,p['lddw_value'])
   except(AssertionError,ValueError,StopIteration,struct.error):continue
   right=location(w,candidate,q['lddw_value']);rows[(a['address'],p['offset'])]=(left,right)
 return rows
REVISION='fa8ef8040ee642302fd52f88656ddc8cf2b8cad9'
ORDER=['baseline','math','pack','combined']

def direct_edges(w,original,candidate,ow,cw,pairs):
 oi={x['address']:x for x in ow};ci={x['address']:x for x in cw};orr=dict(w.m.relocations(original));crr=dict(w.m.relocations(candidate));edges=[]
 for pair in pairs:
  a,b=pair['original'],pair['candidate'];x=w.m.instructions(original,a['address'],a['bytes']);y=w.m.instructions(candidate,b['address'],b['bytes']);assert len(x)==len(y)
  for p,q in zip(x,y):
   if 'call_target'not in p or orr.get(a['address']+p['offset'],0)&0xffffffff==10:continue
   assert 'call_target'in q and crr.get(b['address']+q['offset'],0)&0xffffffff!=10
   af,bf=oi[p['call_target']],ci[q['call_target']];edges.append([a['address'],p['offset'],af['signature'],bf['signature']])
 return sorted(edges)

def pack_proof(w,original,candidate,ow,cw,pairs):
 pair=next(p for p in pairs if p['original']['address']==695672);a,b=pair['original'],pair['candidate'];assert a['bytes']==b['bytes']==1792 and a['signature']==b['signature'];assert 'spl_token11instruction16TokenInstruction4pack'in b['name'];edges=[];incoming=[]
 for label,image,windows,target in [('original',original,ow,a['address']),('candidate',candidate,cw,b['address'])]:
  rel=dict(w.m.relocations(image));by={r['address']:r for r in windows};body=w.m.instructions(image,target,1792)
  assert not any(r['opcode']==0x8d or rel.get(target+r['offset'],0)&0xffffffff in [8,10]for r in body)
  calls=[r for r in body if 'call_target'in r];assert [r['offset']for r in calls]==[32,776,1728,1784]
  edges.append([[r['offset'],by[r['call_target']]['signature']]for r in calls])
  refs=[]
  for row in windows:
   instructions=w.m.instructions(image,row['address'],row['bytes']);at={r['offset']:r for r in instructions}
   for call in instructions:
    if call.get('call_target')!=target or rel.get(row['address']+call['offset'],0)&0xffffffff==10:continue
    operand=at[call['offset']-16];assert operand['opcode']==0x18 and operand['destination']==2 and rel.get(row['address']+operand['offset'],0)&0xffffffff==8
    assert int.from_bytes(w.m.at_address(image,operand['lddw_value'],4),'little')==17
    refs.append({'caller':row['address'],'call_offset':call['offset'],'callee':target,'enum_address':operand['lddw_value'],'discriminant_bytes':4,'discriminant':17,'complete_enum_extent_proven':False})
  assert len(refs)==1;incoming.append({'image':label,**refs[0]})
  # Follow only the branch selected by discriminant17; this is static decoding, not VM execution.
  at={r['offset']:r for r in body};pc=64;value=17;path=[]
  while pc<664:
   r=at[pc];path.append(pc)
   if pc==64:assert r['opcode']==0x61 and r['destination']==1;pc+=8
   elif r['opcode']==0x65:pc+=8+(r['displacement']*8 if value>r['immediate']else 0)
   elif r['opcode']==0x15:pc+=8+(r['displacement']*8 if value==r['immediate']else 0)
   else:raise AssertionError('unexpected enum path')
   assert len(path)<12
  assert pc==664 and at[664]['opcode']==0x72 and at[664]['immediate']==17 and at[672]['opcode']==0xb7 and at[672]['destination']==8 and at[672]['immediate']==1
 assert edges[0]==edges[1] and incoming[0]['caller']==147944 and incoming[0]['call_offset']==12888
 return {'original_address':695672,'candidate_address':b['address'],'bytes':1792,'callee_offsets':[r[0]for r in edges[0]],'callee_shapes_equal':True,'incoming':incoming,'static_enum_branch':'Discriminant17 selects byte17 and encoded length1; incoming Crank body remains unmatched.','direct_helper_data_references':0,'indirect_helper_calls':0,'full_recursive_or_semantic_closure':False}

def recompute(builds):
 original=blob(REVISION,'evidence/original/pump_fees/deployed.so');assert sha(original)=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
 with tempfile.TemporaryDirectory(prefix='fees-math-pack-static-')as temp:
  d=Path(temp)
  for name,digest in load(HERE/'parser-inputs.json').items():
   b=blob(REVISION,name);assert sha(b)==digest;p=d/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
  w=module('fees_math_pack_public_parser',d/'research/fees-crank-relay-rejection/window_map.py');ow=w.windows(original);ol=w.m.elf_layout(original);reports={};internals={};out={}
  for label in ORDER:
   folder=builds[label];candidate=(folder/'candidate.so').read_bytes();symbols=(folder/'symbols.so').read_bytes();cl=w.m.elf_layout(candidate);sl=w.m.elf_layout(symbols)
   for sec in cl['sections']:
    if sec['flags']&2 and sec['type']!=8:
     other=next(x for x in sl['sections']if x['name']==sec['name']);assert sec['address']==other['address']and w.m.section_data(candidate,sec['name'])==w.m.section_data(symbols,sec['name'])
   cw=w.windows(symbols);comparison=w.compare(ow,cw);pairs=comparison['unique_pairs'];signatures={r['signature']for r in cw};raw={r['raw_sha256']for r in cw};edges=direct_edges(w,original,candidate,ow,cw,pairs);locations=cohort(w,original,candidate,pairs);assert len(locations)==161 and all(a==b for a,b in locations.values())
   normalized=[r['address']for r in ow if r['signature']in signatures];rawmatches=[r['address']for r in ow if r['raw_sha256']in raw];order=[{'original':p['original']['address'],'candidate':p['candidate']['address'],'bytes':p['original']['bytes']}for p in pairs if 698680<=p['original']['address']<=701136];order.sort(key=lambda r:r['original']);assert len(order)==7
   sections=[]
   for sec in ol['sections']:
    if not sec['name']:continue
    x=w.m.section_data(original,sec['name']);y=w.m.section_data(candidate,sec['name']);sections.append({'name':sec['name'],'original_bytes':len(x),'candidate_bytes':len(y),'raw_equal':x==y,'common_position_differences':sum(a!=b for a,b in zip(x,y))})
   report={'candidate_sha256':sha(candidate),'symbols_sha256':sha(symbols),'candidate_bytes':len(candidate),'original_sha256':sha(original),'original_capture_bytes':len(original),'original_elf_extent':ol['elf_extent'],'normalized':len(normalized),'raw':len(rawmatches),'unique_pairs':len(pairs),'candidate_windows':len(cw),'location_uses':161,'location_equal':161,'candidate_signature_multiset_sha256':sha(json.dumps(sorted(collections.Counter(r['signature']for r in cw).items())).encode()),'actual_direct_edges':len(edges),'preexisting_mismatched_callee_edges':sum(x[2]!=x[3]for x in edges),'semantic_edge_ledger_sha256':sha(json.dumps(edges).encode()),'math_order':order,'sections':sections,'normalized_inventory':normalized,'raw_inventory':rawmatches,'whole_capture_equal':original==candidate,'whole_meaningful_elf_equal':original[:ol['elf_extent']]==candidate,'common_position_differences':sum(a!=b for a,b in zip(original,candidate)),'runtime_verified':False}
   math=[]
   for address in [700568,700760]:
    p=next(p for p in pairs if p['original']['address']==address);a,b=p['original'],p['candidate'];x=w.m.instructions(original,a['address'],a['bytes']);y=w.m.instructions(candidate,b['address'],b['bytes']);orr=dict(w.m.relocations(original));crr=dict(w.m.relocations(candidate));xr=[r for r in x if orr.get(a['address']+r['offset'],0)&0xffffffff==8];yr=[r for r in y if crr.get(b['address']+r['offset'],0)&0xffffffff==8];assert len(xr)==len(yr)==1 and xr[0]['offset']==yr[0]['offset'];left=location(w,original,xr[0]['lddw_value']);right=location(w,candidate,yr[0]['lddw_value']);assert left==right;math.append({'original':address,'candidate':b['address'],'bytes':a['bytes'],'data_reference_offset':xr[0]['offset'],'location_path_line_column':list(left),'location_record_bytes':24,'type_identity_inferred':True})
   report['math_direct_locations']=math
   if label in ['pack','combined']:report['pack']=pack_proof(w,original,candidate,ow,cw,pairs)
   reports[label]=report;internals[label]={'edges':edges,'multiset':sorted(collections.Counter(r['signature']for r in cw).items())}
  for a,b in [('baseline','math'),('pack','combined')]:
   assert internals[a]==internals[b]
  for label in ['math','combined']:
   rows=reports[label]['math_order'];assert [r['candidate']for r in rows]==sorted(r['candidate']for r in rows);assert all(x['candidate']+x['bytes']==y['candidate']for x,y in zip(rows,rows[1:]))
  transitions={}
  for label,parent in [('math','baseline'),('pack','baseline'),('combined','math')]:
   a=reports[parent];b=reports[label];g=sorted(set(b['normalized_inventory'])-set(a['normalized_inventory']));l=sorted(set(a['normalized_inventory'])-set(b['normalized_inventory']));assert g==([]if label=='math'else[695672])and not l;assert a['raw_inventory']==b['raw_inventory'];transitions[label]={'parent':parent,'gains':g,'losses':l,'raw_gains':[],'raw_losses':[]}
  return {'reports':reports,'transitions':transitions,'scope':'Independent static complete-window/callee/Location/order checks only; no archived measurement/runtime receipts consumed, no target execution.'}

def compare(builds):
 result=recompute(builds);assert result==load(HERE/'expected.json');return {'stages':4,'normalized':[544,544,545,545],'raw':118,'location_uses_equal':161,'sole_pack_gain':695672,'runtime_verified':False}
