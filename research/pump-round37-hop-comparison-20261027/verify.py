from pathlib import Path
from collections import Counter
from functools import lru_cache
import gzip,hashlib,importlib.util,json,tarfile
P=Path(__file__).resolve().parent;R=P.parents[1]
sha=lambda b:hashlib.sha256(b).hexdigest()
assert json.loads((P/'MANIFEST.json').read_text())=={f.relative_to(P).as_posix():sha(f.read_bytes())for f in sorted(P.rglob('*'))if f.is_file()and f.name!='MANIFEST.json'and '__pycache__'not in f.parts}
spec=importlib.util.spec_from_file_location('windows',P/'support/window_map.py');w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
original=(R/'evidence/original/pump/deployed.so').read_bytes();assert sha(original)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
ow=w.windows(original);oc=Counter(x['signature']for x in ow);assert len(ow)==1035
images={};sources={};counters={};windows={}
for label,count in [('parent',778),('candidate',779),('repeat',779)]:
 p=P/'builds'/label;rec=json.loads((p/'build-comparison.json').read_text());assert rec['returncode']==0 and rec['source_unchanged']and rec['dependency_cache']['main_freshly_compiled']
 with tarfile.open(p/'primary.tar.gz')as a:sources[label]={m.name:a.extractfile(m).read()for m in a.getmembers()if m.isfile()}
 parts=Path(rec['primary_source_directory']).parts;bound=rec['primary_source_sha256'];prefix=None
 for n in range(1,len(parts)):
  trial='/'.join(parts[-n:])+'/'
  if all(k.startswith(trial)for k in bound):prefix=trial;break
 assert prefix and all(sha(sources[label][k[len(prefix):]])==h for k,h in bound.items())
 images[label]={n:gzip.decompress((p/(n+'.gz')).read_bytes())for n in ['candidate.so','unstripped.so']}
 assert sha(images[label]['candidate.so'])==rec['comparison']['candidate_sha256']and sha(images[label]['unstripped.so'])==rec['unstripped_sha256']
 windows[label]=w.windows(images[label]['unstripped.so']);counters[label]=Counter(x['signature']for x in windows[label]);assert sum((oc&counters[label]).values())==count
assert images['candidate']==images['repeat']and sources['candidate']==sources['repeat']
assert sum(((oc&counters['parent'])&counters['candidate']).values())==778
assert set(sources['parent'])==set(sources['candidate'])
changed=[k for k in sources['parent']if sources['parent'][k]!=sources['candidate'][k]];assert changed==['src/multi_hop_curve_swap.rs']
key=changed[0];old=b'bonding_curve.quote_mint==quote_mint.key()';new=b'quote_mint.key()==bonding_curve.quote_mint'
assert sources['parent'][key].count(old)==1 and sources['parent'][key].replace(old,new)==sources['candidate'][key]
assert (P/'proposed'/key).read_bytes()==sources['candidate'][key]
om={x['address']:x for x in ow};cm={x['address']:x for x in windows['candidate']}
root=0xdd700;assert om[root]['bytes']==3512
hits=[x for x in windows['candidate']if x['signature']==om[root]['signature']];assert len(hits)==1
queue=[(root,hits[0]['address'])];seen=set();edges=[];opened=[]
while queue:
 a,b=queue.pop()
 if(a,b)in seen:continue
 seen.add((a,b));left,right=om[a],cm[b];assert left['signature']==right['signature']
 for x,y in zip(w.m.instructions(original,a,left['bytes']),w.m.instructions(images['candidate']['unstripped.so'],b,right['bytes'])):
  if 'call_target'not in x:continue
  oa,cb=x['call_target'],y['call_target'];assert x['offset']==y['offset']
  if oa not in om or cb not in cm:continue
  match=om[oa]['signature']==cm[cb]['signature'];edge=dict(original_caller=a,candidate_caller=b,offset=x['offset'],original_target=oa,candidate_target=cb,callee_normalized_equal=match);edges.append(edge)
  if match:queue.append((oa,cb))
  else:opened.append(edge)
closure=json.loads((P/'hop-closure.json').read_text());assert edges==closure['edges']and opened==closure['open_edges']
assert len(seen)==closure['visited_pairs']==62 and len(edges)==closure['direct_edges']==212 and len(opened)==1
print('Verified 779 / 1,035, all 778 retained, identical repeated ELFs, single equality reversal, 62 matching pairs / 212 direct edges / one unresolved deserializer edge.')

runtime=json.loads(gzip.decompress((P/'runtime/multi-hop.json.gz').read_bytes()))
assert runtime['candidate_sha256']==sha(images['candidate']['candidate.so']) and runtime['original_pump_sha256']==sha(original)
assert runtime['passed']==runtime['case_count']==len(runtime['cases'])==56
assert all(not x['mismatches']for x in runtime['cases'])
loader=json.loads((P/'runtime/multi-hop.loader.json').read_text());assert {x['elf_sha256']for x in loader['loads']}=={sha(original),sha(images['candidate']['candidate.so'])}
assert all(x['program_bytes']==36 and x['programdata_bytes']==10485760 and x['elf_prefix_unchanged']and x['zero_allocation_tail']for x in loader['loads'])
print('Verified 56 focused multi-hop cases passed with this exact candidate and captured-loader receipts.')
