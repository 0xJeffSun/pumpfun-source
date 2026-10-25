#!/usr/bin/env python3
from pathlib import Path
import argparse,difflib,gzip,hashlib,json,tarfile
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda n:json.loads((P/n).read_text());p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);a=p.parse_args();m=J('manifest-sha256.json');actual={str(q.relative_to(P))for q in P.rglob('*')if q.is_file()and q.name!='manifest-sha256.json'};assert actual==set(m)
for n,d in m.items():assert H(P/n)==d['sha256']and(P/n).stat().st_size==d['bytes'],n
base=J('baseline-source-sha256.json');prop=J('proposed-source-sha256.json');plan=J('build-plan.json');target='programs/pump/src/multi_hop_curve.rs';assert len(base)==len(prop)==plan['source_count']==37 and set(base)==set(prop)
assert [n for n in base if base[n]!=prop[n]]==[target]and prop[target]=='f8091a092a7974c1f33e53ff65113e48c628435ffaa266c5de5a12bc0447a92d'
assert {n:H(P/'source'/n)for n in prop}==prop and plan['source_sha256']==prop
snapshots={}
for n,expected in [('baseline-source-snapshot.tar.gz',base),('proposed-source-snapshot.tar.gz',prop)]:
 with tarfile.open(P/n)as t:files={x.name:t.extractfile(x).read()for x in t if x.isfile()};assert {k:hashlib.sha256(v).hexdigest()for k,v in files.items()}==expected;snapshots[n]=files
old=snapshots['baseline-source-snapshot.tar.gz'][target].decode();new=(P/'source'/target).read_text();assert(P/'source.patch').read_text()==''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/'+target,tofile='b/'+target))
assert J('future-build-source-sha256.json')=={plan['future_source_root']+'/'+n:h for n,h in prop.items()}
assert J('accepted-nested/build-comparison.json')['source_sha256']==base and plan['baseline_candidate_sha256']=='568546bcf038740d995325c1e742528f218f630840ac152f96dcf5c2147eabc2'
for label in ['route-build','label-proposal','paired-route']:
 with tarfile.open(P/(label+'.tar.gz'))as t:
  b=t.extractfile(label+'/manifest-sha256.json').read();assert hashlib.sha256(b).hexdigest()==J(label+'-binding.json')['manifest_sha256'];inner=json.loads(b)
  for n,d in inner.items():assert hashlib.sha256(t.extractfile(label+'/'+n).read()).hexdigest()==d['sha256']
  if label=='label-proposal':assert t.extractfile(label+'/proposed.rs').read()==(P/'source'/target).read_bytes()
assert J('future-focused-binding-plan.json')['successful_5cc_receipts_transfer_to_combined']is False
assert plan['builds_executed']==plan['runtime_executions']==0 and plan['main_source_modified']is False
if a.repo:
 R=a.repo.resolve();assert {n:H(R/n)for n in base}==base
 for n,h in J('build-helper-sha256.json').items():assert H(R/n)==h
 for d in J('accepted-nested-artifacts.json').values():
  if isinstance(d,dict)and 'path'in d:assert H(R/d['path'])==d['sha256']
 for n,d in J('tools-observed.json')['files'].items():assert H(Path(d['path']))==d['sha256']
 root=Path(J('tools-observed.json')['sdk_source']);assert {n:H(root/n)for n in J('sdk-source-sha256.json')}==J('sdk-source-sha256.json')
 dep=json.loads(gzip.decompress((P/'baseline-dependency-provenance.json.gz').read_bytes()));count=0
 for item in dep['packages']:
  for d in item['archives']:assert H(R/d['path'])==d['sha256']==item['lock_checksum'];count+=1
  for tree in item['source_trees_observed']:
   for n,h in tree['source_files_sha256'].items():assert H(R/tree['path']/n)==h;count+=1
 assert count==14281 and len(dep['packages'])==252
print(json.dumps({'pass':True,'payloads':len(m),'source_inputs':37,'changed_paths':[target],'proposed_route_sha256':prop[target],'builds':0,'runtime_executions':0}))
