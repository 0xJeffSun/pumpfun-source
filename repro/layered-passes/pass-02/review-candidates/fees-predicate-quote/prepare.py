from pathlib import Path
import json,hashlib,tarfile,shutil,subprocess
W=Path(__file__).resolve().parent
R=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source')
P=R/'repro/pump_fees/donation-borrow-v144'
H=lambda b:hashlib.sha256(b).hexdigest()
def sha(p):return H(p.read_bytes())
def save(p,v):p.write_text(json.dumps(v,indent=2)+'\n')
def cp(src,dst):dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dst)
A=W/'inputs';A.mkdir()
seals={'fees-sharing':'8ad432b810ef4a0ec6a80a791d7fe16217f7f23f1278d502831bdfae3b62bb77','fees-quote-ownership':'5f29f97327a5aed7d5145ec603cf680af37da80f4c78cd0e0d6d5badb05ee3bb'}
for name,seal in seals.items():
 src=R/'repro/layered-passes/pass-01/followup-results'/name
 assert sha(src/'manifest.json')==seal
 m=json.loads((src/'manifest.json').read_text())
 for n,v in m.items():
  assert not Path(n).is_absolute() and '..' not in Path(n).parts and 'keypair' not in n
  assert sha(src/n)==v['sha256'],n
  cp(src/n,A/name/n)
 for n in ['manifest.json','MANIFEST.sha256']:cp(src/n,A/name/n)
base=json.loads((P/'source-sha256.json').read_text());assert len(base)==26
for n in ['source-sha256.json','source-snapshot.tar.gz','tools-before.json','build-launch.json','build-helper-sha256.json','build-helper-snapshot.tar.gz','sbf-sdk-snapshot.tar.gz']:cp(P/n,A/n)
for archive,dst,m in [('source-snapshot.tar.gz',W/'source',base),('build-helper-snapshot.tar.gz',W/'source',json.loads((P/'build-helper-sha256.json').read_text()))]:
 with tarfile.open(A/archive) as t:
  assert set(t.getnames())==set(m)
  for member in t:
   assert member.isfile() and 'keypair' not in member.name
   b=t.extractfile(member).read();assert H(b)==m[member.name]
   p=dst/member.name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
for name,patch in [('fees-sharing','pending-sharing.patch'),('fees-quote-ownership','quote-ownership.patch')]:
 p=subprocess.run(['patch','--batch','--fuzz=0','-p1','-i',str(A/name/patch)],cwd=W/'source',capture_output=True,text=True)
 (A/(patch+'.log')).write_text(p.stdout+p.stderr);assert p.returncode==0
assert sha(W/'source/programs/pump-fees/src/donation.rs')==sha(A/'fees-quote-ownership/proposed-donation.rs')
assert sha(W/'source/programs/pump-fees/src/sharing_update.rs')==sha(A/'fees-sharing/pending-sharing_update.rs')
save(A/'corrected-source-sha256.json',{n:sha(W/'source'/n) for n in base})
T=json.loads((A/'tools-before.json').read_text())
for v in [*T['compile_tools'].values(),T['strip_tool'],T['cli']]:assert sha(Path(v['resolved_path']))==v['sha256']
sdk=Path(T['cli']['resolved_path']).parent/'sdk/sbf'
for n,h in T['sdk_template_files'].items():assert sha(sdk/n)==h
pre=R/'work/fees-donation-borrow-build/handoff/prebuild'
for n,h in [('cache-integrity.json','fd5166c7f79a852f56b625790a32edb118769af265455c4511cf8b3be45c72cd'),('default-compile-cache-recheck.json','dff56cdb17b10c2a19a48861e2bcea4224a1d8fd089e00a152238f6d4f016218')]:
 assert sha(pre/n)==h;cp(pre/n,A/n)
cache=json.loads((A/'cache-integrity.json').read_text());C=W/'cargo-home';C.mkdir()
for p in cache['packages']:
 for a in p['archives']:
  assert sha(R/a['path'])==a['sha256'];cp(R/a['path'],C/Path(a['path']).relative_to(cache['cache']))
 for s in p['extracted_sources']:
  for n,h in s['files_sha256'].items():
   src=R/s['path']/n;assert sha(src)==h;cp(src,C/Path(s['path']).relative_to(cache['cache'])/n)
  for a in s['generated_registry_metadata']:
   src=R/s['path']/a['path'];assert sha(src)==a['sha256'];cp(src,C/Path(s['path']).relative_to(cache['cache'])/a['path'])
# Public registry index only; no global cargo configuration or credentials.
idx=R/cache['cache']/'registry/index'
shutil.copytree(idx,C/'registry/index')
save(A/'registry-index-sha256.json',{str(p.relative_to(C)):sha(p) for p in (C/'registry/index').rglob('*') if p.is_file()})
for v in json.loads((A/'default-compile-cache-recheck.json').read_text())['tools'].values():assert sha(Path(v['default_cli_path']))==v['sha256']
cp(R/'work/fees-donation-borrow-main/build_once.py',A/'main-build_once.py')
save(W/'preflight.json',{'passed':True,'source_inputs':26,'patch_seals':seals,'dependency_packages':len(cache['packages']),'compile':'v1.44','strip':'v1.52','builds_executed':0,'mutable_logs_excluded':True})
print('Preflight passed')
