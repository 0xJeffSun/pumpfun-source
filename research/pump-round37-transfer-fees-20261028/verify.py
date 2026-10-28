from pathlib import Path
from collections import Counter
from functools import lru_cache
import json,gzip,hashlib,tarfile,importlib.util
P=Path(__file__).resolve().parent;R=P.parents[1];sha=lambda b:hashlib.sha256(b).hexdigest()
assert all(sha((P/k).read_bytes())==v for k,v in json.loads((P/'MANIFEST.json').read_text()).items())
s=importlib.util.spec_from_file_location('windows',P/'support/window_map.py');w=importlib.util.module_from_spec(s);s.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=6)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=6)(w.m.relocations)
original=(R/'evidence/original/pump/deployed.so').read_bytes();assert sha(original)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
ow=w.windows(original);oc=Counter(x['signature']for x in ow);images={};counts={};sources={}
for label,n in [('parent',792),('candidate',793),('repeat',793)]:
 d=P/'builds'/label;images[label]={k:gzip.decompress((d/(k+'.gz')).read_bytes())for k in ['candidate.so','unstripped.so']};record=json.loads((d/'build-comparison.json').read_text());assert record['returncode']==0 and record['source_unchanged']
 cc=Counter(x['signature']for x in w.windows(images[label]['unstripped.so']));counts[label]=oc&cc;assert sum(counts[label].values())==n
 with tarfile.open(d/'primary.tar.gz')as a:sources[label]={m.name:a.extractfile(m).read()for m in a.getmembers()if m.isfile()}
 parts=Path(record['primary_source_directory']).parts;bound=record['primary_source_sha256'];prefix=None
 for i in range(1,len(parts)):
  trial='/'.join(parts[-i:])+'/'
  if all(k.startswith(trial)for k in bound):prefix=trial;break
 assert prefix and all(sha(sources[label][k[len(prefix):]])==v for k,v in bound.items())
 assert sha(images[label]['candidate.so'])==record['comparison']['candidate_sha256'] and sha(images[label]['unstripped.so'])==record['unstripped_sha256']
assert images['candidate']==images['repeat'] and sources['candidate']==sources['repeat']
assert counts['parent']<=counts['candidate']
for name in ['src/lib.rs','src/trade_v3.rs','src/util/transfer_fee.rs','src/v3_native_transfer_fee.rs']:assert (P/'proposed'/name).read_bytes()==sources['candidate'][name]
for label,n in [('sell',301),('exact_quote',352),('configured_fee',372)]:
 d=P/'runtime';report=json.loads(gzip.decompress((d/(label+'.json.gz')).read_bytes()));assert report['case_count']==n and not report['mismatches']
 assert report['candidate_sha256']==sha(images['candidate']['candidate.so']) and report['original_sha256']==sha(original)
 receipt=json.loads((d/(label+'.loader.json')).read_text());assert {x['elf_sha256']for x in receipt['loads']}=={sha(original),sha(images['candidate']['candidate.so'])}
 assert all(x['elf_prefix_unchanged']and x['zero_allocation_tail']and x['program_bytes']==36 and x['programdata_bytes']==10485760 for x in receipt['loads'])
print('Verified 793 / 1,035; all 792 retained; fresh repeat identical; 1,025 bounded runtime cases pass. Whole ELF identity remains false.')

import sys
sys.path.insert(0,str(P/'support'))
from pump_diagnostic_audit import audit
suites={n:json.loads(gzip.decompress((P/'runtime'/(n+'.json.gz')).read_bytes()))for n in ['sell','exact_quote','configured_fee']}
check=audit(suites);assert check['log_bearing_cases']==1025 and not check['mismatches']
print('Independent diagnostic audit: 1,025 paired cases, zero mismatches.')

om={x['address']:x for x in ow};cw=w.windows(images['candidate']['unstripped.so']);cm={x['address']:x for x in cw};queue=[];seen=set();edges=[];opened=[]
for address in [0x950e0]:
 hits=[x for x in cw if x['signature']==om[address]['signature']];assert len(hits)==1;queue.append((address,hits[0]['address']))
while queue:
 a,b=queue.pop()
 if (a,b)in seen:continue
 seen.add((a,b));assert om[a]['signature']==cm[b]['signature']
 left,right=[w.m.instructions(image,row['address'],row['bytes'])for image,row in [(original,om[a]),(images['candidate']['unstripped.so'],cm[b])]]
 for x,y in zip(left,right):
  if 'call_target'not in x:continue
  oa,cb=x['call_target'],y['call_target']
  if oa not in om or cb not in cm:continue
  edges.append((a,b,x['offset'],oa,cb))
  if om[oa]['signature']==cm[cb]['signature']:queue.append((oa,cb))
  else:opened.append(edges[-1])
closed=json.loads((P/'closure.json').read_text());assert len(opened)==len(closed['open_edges'])==1 and len(seen)==closed['visited_pairs']==23 and len(edges)==closed['direct_edges']==82
assert opened[0][2:]==(32,0x94e28,closed['open_edges'][0]['candidate_target'])
print('Verified bounded direct-call graph: 23 pairs, 82 edges, one open fee-calculator edge.')
