#!/usr/bin/env python3
"""Verify one fixed source-build proposal without invoking any compiler or VM."""
from pathlib import Path,PurePosixPath
import argparse,difflib,gzip,hashlib,json,runpy,subprocess,sys,tarfile,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
p=argparse.ArgumentParser(description=__doc__);p.add_argument('--repo',type=Path);a=p.parse_args()
assert not any(f.is_symlink() for f in P.rglob('*'))
assert {f.relative_to(P).as_posix():H(f.read_bytes()) for f in P.rglob('*') if f.is_file() and f!=P/'manifest-sha256.json'}==J(P/'manifest-sha256.json')
def archive(name):
 result={}
 with tarfile.open(P/name) as t:
  for m in t:
   n=PurePosixPath(m.name);assert m.isfile() and not n.is_absolute() and '..' not in n.parts and m.name not in result
   result[m.name]=t.extractfile(m).read()
 return result
base=J(P/'baseline-source-sha256.json');new=J(P/'proposed-source-sha256.json');assert len(base)==len(new)==36 and base==J(P/'baseline/source-sha256.json')
target='programs/pump/src/multi_hop_curve.rs';assert [n for n in new if new[n]!=base[n]]==[target]
before=archive('baseline-source-snapshot.tar.gz');after=archive('proposed-source-snapshot.tar.gz')
assert {n:H(b) for n,b in before.items()}==base and {n:H(b) for n,b in after.items()}==new
for n,b in after.items():assert b==(P/'source'/n).read_bytes()
assert after[target]==(P/'corrected-source.rs').read_bytes() and new[target]=='55c6441320779ff06357831cf081b4a6da8267750c7a5f185d89e1f3e803980f'
assert len(after[target])==24234 and len(after[target].splitlines())==414
assert ''.join(difflib.unified_diff(before[target].decode().splitlines(True),after[target].decode().splitlines(True),fromfile='a/'+target,tofile='b/'+target)).encode()==(P/'source.patch').read_bytes()
plan=J(P/'build-plan.json');assert plan['source_sha256']==new and plan['source_count']==36 and plan['changed_paths']==[target] and not plan['lib_wrapper_change_required'] and not plan['main_source_modified'] and not plan['nested_candidate_included'] and plan['builds_executed']==plan['runtime_executions']==0
origin=J(P/'entrypoint-origin.json');lib=after['programs/pump/src/lib.rs'];assert H(lib)==origin['whole_sha256']==new['programs/pump/src/lib.rs']=='47f03b7c4e64e94fe19078ffe73b32827b1868c7e2c857d21917ccef0382a977'
assert len(lib)==origin['whole_bytes'] and b"Context<'_,'_,'info,'info,MultiHopCurve<'info>>" in lib.splitlines()[62]
assert all(r['identical'] and r['review_checkpoint_sha256']==r['current_sha256']==base[r['path']] for r in J(P/'review-baseline-comparison.json')['rows'])
assert J(P/'future-build-source-sha256.json')=={plan['future_source_root']+'/'+n:h for n,h in new.items()}
actual=J(P/'actual-proposed-build-inputs.json');prefix='work/pump-general-route-build-preflight/source/';assert all(n.startswith(prefix) for n in actual) and {n[len(prefix):]:h for n,h in actual.items()}==new
helpers=J(P/'build-helper-sha256.json');assert helpers==J(P/'baseline/build-helper-sha256.json') and len(helpers)==3
for n,h in helpers.items():assert H((P/'build-helpers'/n).read_bytes())==h
sdk=archive('sdk-source-snapshot.tar.gz');assert len(sdk)==53 and {n:H(b) for n,b in sdk.items()}==J(P/'sdk-source-sha256.json')==J(P/'baseline/build-comparison.json')['sdk_source_sha256']
assert b'version=v1.52' in sdk['scripts/install.sh'] and b'platform-tools/llvm/bin/llvm-objcopy --strip-all' in sdk['scripts/strip.sh']
depraw=gzip.decompress((P/'baseline-dependency-provenance.json.gz').read_bytes());dep=json.loads(depraw);record=J(P/'dependency-preflight.json');assert H(depraw)==record['prior_inventory_sha256'] and record['lock_sha256']==new['programs/pump/Cargo.lock'] and len(dep['packages'])==record['registry_packages']==252
count=sum(len(x['archives'])+sum(len(t['source_files_sha256']) for t in x['source_trees_observed']) for x in dep['packages']);assert count==record['reverified_files']==14281 and record['all_prior_hashes_match']
review=archive('corrected-review.tar.gz');seal=review['manifest-sha256.json'];assert H(seal)==plan['review_seal_sha256'] and {n:H(b) for n,b in review.items() if n!='manifest-sha256.json'}==json.loads(seal)
assert review['source-hypothesis.rs']==after[target] and J(P/'corrected-review-verification.json')['returncode']==0
with tempfile.TemporaryDirectory(prefix='pump-route-prebuild-review-') as d:
 root=Path(d)
 for n,b in review.items():
  f=root/n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(b)
 r=subprocess.run([sys.executable,'-B',str(root/'verify.py')],cwd=root,text=True,capture_output=True);assert r.returncode==0,(r.stdout,r.stderr)
if a.repo:
 root=a.repo.resolve()
 for n,h in {**base,**helpers}.items():assert H((root/n).read_bytes())==h,n
 assert H((root/'repro/pump/tokenkeg-two-curve-fortyeight/candidate.so').read_bytes())==plan['baseline_candidate_sha256']
 for n,r in J(P/'tools-observed.json')['files'].items():assert H(Path(r['path']).read_bytes())==r['sha256'],n
 for item in dep['packages']:
  for r in item['archives']:assert H((root/r['path']).read_bytes())==r['sha256']==item['lock_checksum']
  for tree in item['source_trees_observed']:
   for n,h in tree['source_files_sha256'].items():assert H((root/tree['path']/n).read_bytes())==h
print(json.dumps({'verified':True,'source_inputs':36,'changed_source_paths':[target],'lib_wrapper_change_required':False,'corrected_module_sha256':new[target],'registry_packages':252,'dependency_files_prechecked':14281,'sdk_files':53,'current_repo_tool_cache_drift_checked':bool(a.repo),'builds_executed':0,'runtime_executions':0,'main_source_modified':False},indent=2))
