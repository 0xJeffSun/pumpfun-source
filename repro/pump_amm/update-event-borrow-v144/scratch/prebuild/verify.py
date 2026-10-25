"""Portable read-only evidence/source proposal verification."""
from pathlib import Path
import difflib,hashlib,json,subprocess,sys,tarfile,tomllib
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;sha=lambda b:hashlib.sha256(b).hexdigest();read=lambda p:json.loads((W/p).read_text())
def safe(p):
 p=Path(p);assert not p.is_absolute()and '..'not in p.parts and not any(x.endswith('-keypair.json')for x in p.parts);q=W/p;assert not q.is_symlink()and q.resolve().is_relative_to(W);return q
source_manifest=read('source-package-manifest.json');assert sha(safe('source-package-manifest.json').read_bytes())=='af3d4992a4a9f4b01375d1fec610fb902bab321b5dce418f315e6a8bd6716dd8'
inputs=read('input-manifest.json')
for p,row in inputs.items():
 b=safe(p).read_bytes();assert len(b)==row['bytes']and sha(b)==row['sha256'];source=source_manifest['files'][row['source_package_relative_path']];assert source['sha256']==row['sha256']and source['bytes']==row['bytes']
base=read('baseline-source-sha256.json');proposal=read('proposed-source-sha256.json');assert len(base)==len(proposal)==22
assert base==read('inputs/build-comparison.json')['source_sha256']
for p,h in base.items():assert sha(safe('inputs/source/'+p).read_bytes())==h
assert [p for p,h in base.items()if proposal[p]!=h]==['programs/pump-amm/src/lib.rs']
old=safe('inputs/source/programs/pump-amm/src/lib.rs').read_text();new=safe('proposal/programs/pump-amm/src/lib.rs').read_text();start=old.index('    pub fn update_fee_config(');end=old.index('    pub fn update_buyback_config(',start);chunk=old[start:end];assert chunk.count('emit!(event.clone());')==1
assert new==old[:start]+chunk.replace('emit!(event.clone());','emit!(event);')+old[end:]
assert sha(new.encode())==proposal['programs/pump-amm/src/lib.rs']
assert ''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/programs/pump-amm/src/lib.rs',tofile='b/programs/pump-amm/src/lib.rs'))==safe('remove-update-event-clone.patch').read_text()
d=read('dependency-derivation.json');b=safe(d['archive']).read_bytes();assert sha(b)==d['archive_sha256'];lock=tomllib.loads(safe('inputs/source/programs/pump-amm/Cargo.lock').read_text());assert next(p['checksum']for p in lock['package']if p['name']=='anchor-lang'and p['version']=='0.31.1')==sha(b)
with tarfile.open(safe(d['archive']))as tf:assert tf.extractfile(d['member']).read()==safe(d['copy']).read_bytes()
assert sha(safe(d['copy']).read_bytes())==d['sha256']
assert sha(safe('independent-event-review/manifest.json').read_bytes())=='0dc9c7e6b8ee1f6c1deb2bed86d316a9a298d5962fa66d55348f51f134ce7f1b'
def run(script,*args):
 r=subprocess.run([sys.executable,'-B',str(safe(script)),*args],capture_output=True,text=True);assert r.returncode==0,r.stdout+r.stderr;return json.loads(r.stdout)
independent=run('independent-event-review/verify.py');assert independent['sealed']
static=run('analyze.py','--verify')
live=False
if '--current-source'in sys.argv:
 root=Path(sys.argv[sys.argv.index('--current-source')+1]).resolve()
 for p,h in base.items():assert sha((root/p).read_bytes())==h,p
 live=True
sealed=False
if(W/'manifest.json').exists():
 m=read('manifest.json');actual=set()
 for p in W.rglob('*'):
  assert not p.is_symlink()and not p.name.endswith('-keypair.json')
  if p.is_file()and p!=W/'manifest.json':actual.add(str(p.relative_to(W)))
 assert actual==set(m['files'])
 for p,row in m['files'].items():
  b=safe(p).read_bytes();assert sha(b)==row['sha256']and len(b)==row['bytes'],p
 sealed=True
print(json.dumps({'status':'PASS','sealed':sealed,'payload_files':len(m['files'])if sealed else None,'bound_inputs':len(inputs),'accepted_source_inputs':22,'proposal_changes':1,'current_source_verified':live,'scalar_static':static,'independent_event':independent,'build_or_runtime':False,'initializer_positive_runtime':False},indent=2))
