from pathlib import Path
import collections,gzip,hashlib,importlib.util,json
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');B=Path('/home/ahi200/pumpfun-work/20261028-fees-causal')
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
w=module('windows',R/'research/fees-composed-frontier188/window_map.py')
h=module('contracts',R/'research/fees-frontier-prefix-integration/frontier_contract.py')
original=(R/'evidence/original/pump_fees/deployed.so').read_bytes();ow=w.windows(original)
sha=lambda b:hashlib.sha256(b).hexdigest()
assert sha(original)=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
reports={};details={};internals={}
for label in ['before','after']:
 d=B/label;c=(d/'candidate.so').read_bytes();s=(d/'symbols.so').read_bytes();cw=w.windows(s)
 for sec in w.m.elf_layout(c)['sections']:
  if sec['flags']&2 and sec['type']!=8:
   other=next(x for x in w.m.elf_layout(s)['sections']if x['name']==sec['name'])
   assert sec['address']==other['address']and w.m.section_data(c,sec['name'])==w.m.section_data(s,sec['name'])
 comparison=w.compare(ow,cw);pairs=comparison['unique_pairs'];shapes={r['signature']for r in cw};raw={r['raw_sha256']for r in cw}
 locations=h.cohort(w,original,c,pairs);edges=h.direct_edges(w,original,c,ow,cw,pairs)
 matched=[r['address']for r in ow if r['signature']in shapes];raw_matches=[r['address']for r in ow if r['raw_sha256']in raw]
 reports[label]=dict(candidate_sha256=sha(c),symbols_sha256=sha(s),bytes=len(c),normalized=len(matched),raw=len(raw_matches),matched=matched,raw_matches=raw_matches,location_uses=len(locations),location_equal=sum(x==y for x,y in locations.values()),direct_edges=len(edges),equal_edges=sum(e[2]==e[3]for e in edges),whole_capture_equal=c==original,whole_meaningful_elf_equal=c==original[:w.m.elf_layout(original)['elf_extent']])
 details[label]=dict(locations=[[list(k),x,y]for k,(x,y)in locations.items()],edges=edges,windows=cw)
 internals[label]=(c,s,cw,pairs)
 print(label,{k:v for k,v in reports[label].items()if k not in ['matched','raw_matches']},flush=True)
 for f in cw:
  if f['name']and any(n in f['name']for n in ['crank_donation_fee_pda','create_donation_fee_pda']):print({k:f[k]for k in ['address','bytes','name']},flush=True)
before,after=reports['before'],reports['after']
assert before['matched']==after['matched']and before['raw_matches']==after['raw_matches']
assert details['before']['locations']==details['after']['locations']
prior={(r[0],r[1]):r[2:]for r in details['before']['edges']}
current={(r[0],r[1]):r[2:]for r in details['after']['edges']}
assert prior.keys()==current.keys()
assert all(current[k]==v for k,v in prior.items()if v[0]==v[1])
changed_open=[dict(caller=k[0],offset=k[1],before=v,after=current[k])for k,v in prior.items()if v!=current[k]]
assert all(row['before'][0]!=row['before'][1]for row in changed_open)
details['changed_preexisting_open_edges']=changed_open
(B/'static.json.gz').write_bytes(gzip.compress(json.dumps(dict(reports=reports,details=details),sort_keys=True).encode(),mtime=0))
print('no previous matched body/Location/direct-callee loss',flush=True)
