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
for label,n in [('parent',793),('candidate',794),('repeat',794)]:
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
for name in ['src/migrate.rs']:assert (P/'proposed'/name).read_bytes()==sources['candidate'][name]
for label,n,image in [('migration',228,'candidate'),('post',20,'candidate'),('prior',20,'parent')]:
 d=P/'runtime';report=json.loads(gzip.decompress((d/(label+'.json.gz')).read_bytes()));assert report['case_count']==len(report['cases'])==n
 assert report['candidate_sha256']==sha(images[image]['candidate.so']) and report['original_sha256']==sha(original)
 receipt=json.loads((d/(label+'.loader.json')).read_text());assert {x['elf_sha256']for x in receipt['loads']}=={sha(original),sha(images[image]['candidate.so'])}
 assert all(x['elf_prefix_unchanged']and x['zero_allocation_tail']and x['program_bytes']==36 and x['programdata_bytes']==10485760 for x in receipt['loads'])
 if label!='prior':assert not report['mismatches']
 else:assert report['mismatches']==[1,2,3,5,6,7,9,10,11,13,14,15,16,19]
 if label!='migration':
  for name in ['pump_migration_quote_differential.py','pump_migrate_probe.py']:
   matches=[v for k,v in report['bound_inputs_sha256'].items()if k.endswith('/scripts/'+name)];assert matches==[sha((P/'pipeline'/name).read_bytes())]
import sys
sys.path.insert(0,str(P/'support'))
from pump_diagnostic_audit import audit
suites={n:json.loads(gzip.decompress((P/'runtime'/(n+'.json.gz')).read_bytes()))for n in ['migration','post']}
check=audit(suites);assert check['log_bearing_cases']==248 and not check['mismatches']
prior=json.loads(gzip.decompress((P/'runtime/prior.json.gz').read_bytes()));assert len(audit({'prior':prior})['mismatches'])==3
assert [k for k in sources['parent']if sources['parent'][k]!=sources['candidate'][k]]==['src/migrate.rs']
print('Verified 794 / 1,035, all 793 retained, repeated ELF identity, 228 migration and 20 targeted cases pass; prior control differs in 14 targeted cases. Whole original ELF equality remains false.')
om={x['address']:x for x in ow};cw=w.windows(images['candidate']['unstripped.so']);cm={x['address']:x for x in cw};queue=[];seen=set();edges=[]
for address in [0x410b0,0x412b8]:
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
  assert om[oa]['signature']==cm[cb]['signature'];edges.append((a,b,x['offset'],oa,cb));queue.append((oa,cb))
assert len(seen)==24 and len(edges)==85
print('Verified 24-pair / 85-edge normalized direct-call closure.')
