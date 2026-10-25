from pathlib import Path
import json,hashlib,shutil,subprocess,tarfile,io,gzip
R=Path.cwd();W=R/'work/fees-legacy-social-build';A=W/'inputs';S=W/'source'
P=R/'work/cli-swarm-2026-10-25/fees_predicate_quote_build/publication';L=R/'work/fees-legacy-quote-admission';T=R/'repro/pump_fees/social-ata-helper-source-proposal'
H=lambda b:hashlib.sha256(b).hexdigest();sha=lambda p:H(p.read_bytes());J=lambda p:json.loads(p.read_text())
def obj(p,x):p.write_text(json.dumps(x,indent=2,sort_keys=True)+'\n')
def cp(p,q):q.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(p,q)
base=J(P/'inputs/corrected-source-sha256.json')
for n,x in J(T/'proposal-source-map.json').items():assert base[n]==x['before_sha256'] and sha(S/n)==x['after_sha256']
assert sha(S/'programs/pump-fees/src/sharing_update.rs')==J(L/'proposal.json')['proposals']['after_parallel']['new_sha256']
changed={n:sha(S/n)for n in base};assert{n for n in base if base[n]!=changed[n]}=={'programs/pump-fees/src/sharing_update.rs','programs/pump-fees/src/social.rs','programs/pump-fees/src/instructions/fee_sharing/mod.rs'}
obj(A/'corrected-source-sha256.json',changed)
for n in ['build-helper-sha256.json','build-helper-snapshot.tar.gz','sbf-sdk-snapshot.tar.gz','cache-integrity.json','default-compile-cache-recheck.json','tools-before.json']:
 cp(P/'inputs'/n,A/n)
helpers=J(A/'build-helper-sha256.json')
for n,h in helpers.items():assert sha(P/'source'/n)==h;cp(P/'source'/n,S/n)
# Copy only the authenticated registry data, never global configuration/credentials.
cache=J(A/'cache-integrity.json');C=W/'cargo-home';C.mkdir()
for p in cache['packages']:
 for a in p['archives']:
  src=R/a['path'];assert sha(src)==a['sha256'];cp(src,C/Path(a['path']).relative_to(cache['cache']))
 for s in p['extracted_sources']:
  for n,h in s['files_sha256'].items():
   src=R/s['path']/n;assert sha(src)==h;cp(src,C/Path(s['path']).relative_to(cache['cache'])/n)
  for a in s['generated_registry_metadata']:
   src=R/s['path']/a['path'];assert sha(src)==a['sha256'];cp(src,C/Path(s['path']).relative_to(cache['cache'])/a['path'])
idx=P.parent/'cargo-home/registry/index';shutil.copytree(idx,C/'registry/index')
obj(A/'registry-index-sha256.json',{str(p.relative_to(C)):sha(p)for p in(C/'registry/index').rglob('*')if p.is_file()})
# The dependency payload closure is immutable; Cargo may separately maintain its own bookkeeping.
def depmap():return{str(p.relative_to(C)):sha(p)for root in ['registry/cache','registry/src']for p in(C/root).rglob('*')if p.is_file()}
obj(A/'dependency-before.json',depmap())
tools=J(A/'tools-before.json')
for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert sha(Path(v['resolved_path']))==v['sha256']
sdk=Path(tools['cli']['resolved_path']).parent/'sdk/sbf'
for n,h in tools['sdk_template_files'].items():assert sha(sdk/n)==h
buf=io.BytesIO()
with tarfile.open(fileobj=buf,mode='w')as t:
 for n in sorted(changed):b=(S/n).read_bytes();i=tarfile.TarInfo(n);i.size=len(b);i.mode=0o644;t.addfile(i,io.BytesIO(b))
(A/'source-snapshot.tar.gz').write_bytes(gzip.compress(buf.getvalue(),mtime=0))
obj(W/'preflight.json',{'passed':True,'source_inputs':26,'changed_paths':sorted(n for n in base if base[n]!=changed[n]),'accepted_manifest_sha256':sha(P/'manifest.json'),'accepted_candidate_sha256':sha(P/'candidate.so'),'legacy_proposal_manifest_sha256':sha(L/'manifest-sha256.json'),'social_proposal_manifest_sha256':sha(T/'manifest.json'),'dependency_packages':len(cache['packages']),'dependency_files':len(depmap()),'compile':'v1.44','strip':'v1.52','builds_executed':0,'mutable_logs_excluded':True})
print(json.dumps(J(W/'preflight.json'),indent=2))
