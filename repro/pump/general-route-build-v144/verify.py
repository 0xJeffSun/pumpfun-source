#!/usr/bin/env python3
from pathlib import Path
import hashlib,json,subprocess,sys,tarfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();load=lambda p:json.loads((P/p).read_text())
m=load('manifest-sha256.json');actual={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p.name!='manifest-sha256.json'};assert actual==set(m),(actual-set(m),set(m)-actual)
for name,d in m.items():assert sha(P/name)==d['sha256']and(P/name).stat().st_size==d['bytes'],name
source=load('build/source-sha256.json');assert len(source)==36
with tarfile.open(P/'build/proposed-source-snapshot.tar.gz')as t:
 files={x.name:hashlib.sha256(t.extractfile(x).read()).hexdigest()for x in t if x.isfile()};assert files==source
comp=load('build/build-comparison.json');attempt=load('build/build-attempt.json');result=load('build/build-result.json');phases=load('build/toolchain-phases.json')
assert attempt['returncode']==result['returncode']==0 and attempt['source_unchanged']and result['source_unchanged']and result['tool_hashes_unchanged']and result['retries']==result['source_repairs']==0
assert attempt['source_sha256']==attempt['source_after_sha256']==comp['source_sha256']
prefix='work/pump-general-route-recovery/run-01/source/'
assert {p.removeprefix(prefix):h for p,h in comp['source_sha256'].items()}==source
assert sha(P/'static/candidate.so')==comp['comparison']['candidate_sha256']==phases['candidate']['sha256']=='5cc1ee21860551e09a4ce1de2d1148f7f4ce22c1fbe0ed7147317c17026c4198'
assert sha(P/'static/unstripped.so')==phases['symbols']['sha256'];assert sha(P/'evidence/original/pump/deployed.so')=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
assert phases['compile']['before']==phases['compile']['after']and phases['compile']['selected_version']=='v1.44'and phases['strip']['actual_distribution']=='v1.52'
assert load('build/dependency-before.json')==load('build/dependency-after.json')
with tarfile.open(P/'prebuild-review.tar.gz')as t:
 inner=json.load(t.extractfile('preflight/manifest-sha256.json'))
 for name,d in inner.items():
  data=t.extractfile('preflight/'+name).read();expected=d['sha256']if isinstance(d,dict)else d;assert hashlib.sha256(data).hexdigest()==expected
for script in ['match-serializer.py','analyze-route.py']:
 r=subprocess.run([sys.executable,'-B',str(P/'static'/script),'--check'],capture_output=True,text=True);assert r.returncode==0,(script,r.stderr)
print(json.dumps(dict(pass_=True,payloads=len(m),source_inputs=len(source),candidate_sha256=sha(P/'static/candidate.so'),runtime_executions=0,whole_original_equal=False)))
