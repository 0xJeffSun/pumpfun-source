from pathlib import Path
import sys,json,hashlib,struct
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'static-tool'));from elf_reader import Elf
O=Elf(W/'source/evidence/original/pump_amm/deployed.so');C=Elf(W/'candidate.so');S=Elf(W/'unstripped.so');rows=json.loads((W/'context-static.json').read_text());ends=dict(zip(O.entries,O.entries[1:]+[O.hi]));cf={f['start']:f['size']for f in S.funcs};H=lambda b:hashlib.sha256(b).hexdigest();out={}
for label in ['init_parser','init_wrapper','init_handler']:
 r=rows[label];a=r['original_start'];b=r['candidate']['start'];n=r['original_bytes'];assert r['original_normalized_equal'];calls=[]
 for call in O.callsites(a,n):
  old=call['target'];new=C.calls[b+call['offset']];k=ends[old]-old;m=cf.get(new)
  eq=k==m and O.normalized[old:old+k]==C.normalized[new:new+m]and O.pattern(old,k)==C.pattern(new,m)
  calls.append({'offset':call['offset'],'original_target':old,'candidate_target':new,'original_bytes':k,'candidate_bytes':m,'complete_normalized_equal':eq})
 data=[]
 for rel in O.pattern(a,n):
  if rel['type']!=8:continue
  off=rel['offset'];ptr=lambda e,p:struct.unpack_from('<I',e.b,p+4)[0]|struct.unpack_from('<I',e.b,p+12)[0]<<32
  x=ptr(O,a+off);y=ptr(C,b+off);data.append({'offset':off,'original_pointer':x,'candidate_pointer':y,'extent':'unresolved unless separately bound by admitted ledger; not equality from pointer normalization'})
 out[label]={'complete_root_normalized_equal':True,'all_immediate_callees':calls,'relocated_data':data}
# Previous exact contexts and remaining handlers must be unchanged, not merely same length.
for label,r in rows.items():
 if not label.startswith('init_'):assert r['baseline_normalized_equal'],label
# New original context ownership / handler order anchors at same relative offsets.
a=rows['init_parser']['candidate']['start'];b=rows['init_wrapper']['candidate']['start'];c=rows['init_handler']['candidate']['start']
anchors=[]
for root,old,base in [(0xcfa98,0xcfb90,a),(0xcfa98,0xcfc30,a),(0xcfa98,0xd0f88,a),(0xe6710,0xe6800,b),(0xe6710,0xe6980,b),(0xe6710,0xe6988,b),(0x5d090,0x5d150,c),(0x5d090,0x5d218,c)]:
 p=base+old-root;assert O.normalized[old:old+8]==C.normalized[p:p+8];anchors.append({'original':old,'candidate':p,'instruction':C.b[p:p+8].hex()})
result={'roots':out,'ownership_order_anchors':anchors,'unchanged_other_contexts':True,'claim_existing_diagnostic_line':149,'claim_prior_line':147,'limits':['Root normalized equality does not establish all target-body or relocated-data equality.','No new runtime fixtures or initializer-success coverage.','Claim147→149 remains a prior explicit diagnostic difference; current proposal causes no additional change.']}
(W/'init-effects.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:{'root_equal':True,'callees':len(v['all_immediate_callees']),'callee_matches':sum(x['complete_normalized_equal']for x in v['all_immediate_callees'])}for k,v in out.items()}))
