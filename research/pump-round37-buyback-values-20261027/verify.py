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
for label,count in [('parent',789),('candidate',790),('repeat',790)]:
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
assert sum(((oc&counters['parent'])&counters['candidate']).values())==789
assert set(sources['parent'])==set(sources['candidate'])
changed=[k for k in sources['parent']if sources['parent'][k]!=sources['candidate'][k]];assert changed==['src/lib.rs']
lines=sources['parent']['src/lib.rs'].decode().splitlines();assert 'pub fn set_buyback_fee_recipients' in lines[2137]
lines[2136:2143]=['']*7
for n,value in {1892: 'impl Global {', 1893: ' #[inline(never)]', 1894: ' pub fn set_buyback_fee_recipients(&mut self,recipients:[Pubkey;8])->Result<()>{', 1895: '  require!(recipients.iter().all(|key|*key!=Pubkey::default()),PumpError::AllBuybackFeeRecipientsShouldBeNonZero);', 1905: '  for left in 0..8 {for right in left+1..8 {require_neq!(recipients[left],recipients[right],PumpError::NotUniqueBuybackFeeRecipients);}}', 1907: '  self.buyback_fee_recipients=recipients;', 1908: '  Ok(())', 1909: ' }', 1910: '}'}.items():
 n=int(n);assert not lines[n-1];lines[n-1]=value
assert ('\n'.join(lines)+'\n').encode()==sources['candidate']['src/lib.rs']
assert (P/'proposed/src/lib.rs').read_bytes()==sources['candidate']['src/lib.rs']
om={x['address']:x for x in ow};cm={x['address']:x for x in windows['candidate']}
root=0x98af0;assert om[root]['bytes']==5464
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
closure=json.loads((P/'buyback-values-closure.json').read_text());assert edges==closure['edges']and opened==closure['open_edges']
assert len(seen)==closure['visited_pairs']==32 and len(edges)==closure['direct_edges']==145 and not opened
print('Verified 790 / 1,035, all 789 retained, repeated ELF identity, compared-value proposal, closed 32-pair / 145-edge graph.')

reports={}
for label,count,image in [('configuration',351,'candidate'),('recipients',42,'candidate'),('prior-control',42,'parent')]:
 report=json.loads(gzip.decompress((P/'runtime'/(label+'.json.gz')).read_bytes()));reports[label]=report
 assert report['candidate_sha256']==sha(images[image]['candidate.so']) and report['original_sha256']==sha(original)
 assert report['case_count']==len(report['cases'])==count
 loader=json.loads((P/'runtime'/(label+'.loader.json')).read_text());assert {x['elf_sha256']for x in loader['loads']}=={sha(original),sha(images[image]['candidate.so'])}
 assert all(x['program_bytes']==36 and x['programdata_bytes']==10485760 and x['elf_prefix_unchanged']and x['zero_allocation_tail']for x in loader['loads'])
 if label!='prior-control':assert not report['mismatches']and all(not x['different_fields']for x in report['cases'])
 else:assert report['mismatches']==list(range(10,38))and all(x['different_fields']==['comparison_lines']for x in report['cases']if x['different_fields'])
 if label!='configuration':
  assert report['harness_sha256']==sha((P/'pipeline/pump_buyback_recipient_differential.py').read_bytes())
  assert report['configuration_fixture_sha256']==sha((P/'pipeline/pump_validate_config_admin.py').read_bytes())
  for path,name in {'scripts/pump_buyback_recipient_differential.py': 'pump_buyback_recipient_differential.py', 'scripts/pump_validate_config_admin.py': 'pump_validate_config_admin.py', 'evidence/upstream/pump.json': 'pump.json', 'research/imported-lab/analysis/pump_fun/config-snapshot.json': 'config-snapshot.json'}.items():assert report['bound_inputs_sha256'][path]==sha((P/'pipeline'/name).read_bytes())
  assert report['bound_inputs_sha256']['evidence/original/pump/deployed.so']==sha(original)
assert [x['case']for x in reports['recipients']['cases']]==[x['case']for x in reports['prior-control']['cases']]
spec=importlib.util.spec_from_file_location('diagnostics',P/'support/diagnostic_audit.py');audit=importlib.util.module_from_spec(spec);spec.loader.exec_module(audit)
assert not audit.audit({k:v for k,v in reports.items()if k!='prior-control'})['mismatches']
print('Verified 42 targeted recipient cases and 351 configuration cases; prior 789 control differs only in formatting on all 28 duplicate pairs.')
