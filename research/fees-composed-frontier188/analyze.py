"""Recompute the independently built composition, including actual callee/data checks."""
from pathlib import Path
import gzip
import hashlib
import importlib.util
import json
import struct
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]

def module(name,path):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m

def analyze():
 wm=module('composed_windows',HERE/'window_map.py')
 helper=module('composed_helpers',ROOT/'research/fees-math-pack-source-proposal/compare.py')
 sharing=module('composed_sharing',ROOT/'research/fees-sharing-create-context/analyze.py')
 admin=module('composed_admin',ROOT/'research/fees-admin-sharing-context/analyze.py')
 original=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes()
 assert hashlib.sha256(original).hexdigest()=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
 ow=wm.windows(original);oi={f['address']:f for f in ow};variants={};details={}
 exp=json.loads((HERE/'experiment.json').read_bytes())
 for label,meta in exp['variants'].items():
  images={}
  for kind,desc in meta['files'].items():
   raw=gzip.decompress((HERE/desc['path']).read_bytes());assert len(raw)==desc['bytes'] and hashlib.sha256(raw).hexdigest()==desc['sha256'];images[kind]=raw
  c,b=images['candidate'],images['symbols'];cw=wm.windows(b);ci={f['address']:f for f in cw};comparison=wm.compare(ow,cw)
  for sec in wm.m.elf_layout(c)['sections']:
   if sec['flags']&2 and sec['type']!=8:
    other=next(s for s in wm.m.elf_layout(b)['sections']if s['name']==sec['name']);assert sec['address']==other['address'];assert wm.m.section_data(c,sec['name'])==wm.m.section_data(b,sec['name'])
  variants[label]=comparison
  pairs={p['original']['address']:p['candidate']for p in comparison['unique_pairs']}
  cohort=helper.cohort(wm,original,c,comparison['unique_pairs']);assert all(a==z for a,z in cohort.values())
  det=dict(normalized=sorted(f['address']for f in ow if f['signature']in{g['signature']for g in cw}),raw=sorted(f['address']for f in ow if f['raw_sha256']in{g['raw_sha256']for g in cw}),location_uses=len(cohort),edges=helper.direct_edges(wm,original,c,ow,cw,comparison['unique_pairs']),candidate_bytes=len(c),candidate_windows=len(cw),whole_capture_equal=c==original,whole_extent_equal=c==original[:wm.m.elf_layout(original)['elf_extent']],pack=helper.pack_proof(wm,original,c,ow,cw,comparison['unique_pairs']))
  if label=='origins':
   targets={}
   for address in (190104,381352,445160,464168,639104,642848):
    a,z=oi[address],pairs[address];left=admin.calls(original,a,oi);right=admin.calls(b,z,ci);assert left.keys()==right.keys()
    calls=[dict(offset=k,original=left[k],candidate=right[k],equal=left[k].get('signature',left[k].get('name'))==right[k].get('signature',right[k].get('name')))for k in left]
    targets[str(address)]=dict(original=a,candidate=z,calls=calls)
    if address in sharing.RANGES:
     x,y=sharing.data_contract(original,a,address),sharing.data_contract(b,z,address);assert x==y;targets[str(address)]['data']=x
    if address in admin.RANGES:
     x,y=admin.literals(original,a,address),admin.literals(b,z,address);assert x==y;targets[str(address)]['literals']=x
   reader_left=admin.reader_contract(original,oi[381352],oi);reader_right=admin.reader_contract(b,pairs[381352],ci);assert reader_left==reader_right
   f=pairs[190104];ins={r['offset']:r for r in wm.m.instructions(b,f['address'],f['bytes'])};strings=[wm.m.at_address(b,ins[k]['lddw_value'],n).decode()for k,n in [(56,29),(104,40),(1256,72)]]
   assert strings==['social_fee_pda already exists','CreateSocialFeePda is currently disabled','programs/pump-fees/src/instructions/fee_sharing/create_social_fee_pda.rs']
   assert ins[1296]['immediate']==67 and ins[1304]['immediate']==72
   det.update(targets=targets,admin_reader=reader_right,social_strings=strings)
  details[label]=det
 before,after=details['baseline'],details['origins'];gains=sorted(set(after['normalized'])-set(before['normalized']));losses=sorted(set(before['normalized'])-set(after['normalized']));assert gains==[190104,381352,445160,464168,639104,642848] and not losses;assert before['raw']==after['raw']
 prior={(a,b):(c,d)for a,b,c,d in before['edges']};current={(a,b):(c,d)for a,b,c,d in after['edges']}
 assert prior.keys()<=current.keys()
 for key,(original_shape,candidate_shape)in prior.items():
  new_original,new_candidate=current[key];assert original_shape==new_original
  assert new_candidate==candidate_shape or new_candidate==original_shape, key
 details['preserved_edges']={'baseline':len(prior),'combined':len(current),'newly_equal_existing_edges':[list(key)for key,(a,b)in prior.items()if a!=b and current[key][0]==current[key][1]]}
 return dict(variants=variants,details=details,gains=gains,losses=losses,raw_losses=[])

if __name__=='__main__':
 r=analyze();(HERE/'analysis.json.gz').write_bytes(gzip.compress((json.dumps(r,indent=2,sort_keys=True)+'\n').encode(),mtime=0));print(r['gains']);print([(k,len(v['unique_pairs']),len(v['unmatched_original']))for k,v in r['variants'].items()])
