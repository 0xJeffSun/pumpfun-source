"""Read-only portable integrity/graph verifier. Python3.11+ standard library."""
import argparse,hashlib,json,tomllib
from pathlib import Path
P=Path(__file__).resolve().parent
ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);a=ap.parse_args()
H=lambda b:hashlib.sha256(b).hexdigest()
m=json.loads((P/'manifest.json').read_text());actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()};assert actual==set(m['files'])|{'manifest.json'}
for name,r in m['files'].items():
 b=(P/name).read_bytes();assert len(b)==r['bytes'] and H(b)==r['sha256'],name
f=json.loads((P/'findings.json').read_text());D=P/'inputs'
for name,r in f['input_receipts'].items():
 b=(D/name).read_bytes();assert len(b)==r['bytes'] and H(b)==r['sha256']
lock=tomllib.loads((D/'accepted-Cargo.lock').read_text())['package']
for n,expected in f['reverse_edges'].items():
 got=[{'name':p['name'],'version':p['version']} for p in lock if any(x.split()[0]==n for x in p.get('dependencies',[]))];assert got==expected,n
for pkg in ['anchor-derive-serde-1.0.0','borsh-derive-1.8.1','num_enum_derive-0.7.6']:assert tomllib.loads((D/(pkg+'-Cargo.toml')).read_text())['lib']['proc-macro']
assert tomllib.loads((D/'indexmap-2.14.2-Cargo.toml').read_text())['dependencies']['hashbrown']['version']=='0.17'
for n,expected in [('accepted',['0.17.1']),('prior-mayhem',['0.13.2','0.17.1']),('sysroot',['0.15.4'])]:
 packages=tomllib.loads((D/(n+'-Cargo.lock')).read_text())['package'];assert [p['version'] for p in packages if p['name']=='hashbrown']==expected
assert 'hashbrown-0.17.1/src/lib.rs' in (D/'host-hashbrown.d').read_text()
assert json.loads((D/'host-hashbrown-fingerprint.json').read_text())['compile_kind']==0
assert json.loads((D/'host-indexmap-fingerprint.json').read_text())['compile_kind']==0
receipt=json.loads((D/'build-attempt.json').read_text());assert receipt['returncode']==0 and receipt['selected_toolchain']=='v1.52'
assert receipt['source_sha256']['programs/mayhem/Cargo.lock']==H((D/'accepted-Cargo.lock').read_bytes())
assert f['version_to_original_source_or_compiler_identity_proven'] is False
result={'packet_integrity':True,'source_graph_consistent':True,'host_hashbrown':'0.17.1','sysroot_hashbrown':'0.15.4','fresh_repository_check':False,'new_builds_or_runtime':0}
if a.repo:
 R=a.repo.resolve();checks={**f['source_hashes']}
 for r in f['input_receipts'].values():
  if not Path(r['origin']).is_absolute():checks[r['origin']]=r['sha256']
 for r in f['artifacts'].values():
  if not Path(r['origin']).is_absolute():checks[r['origin']]=r['sha256']
 for name,digest in checks.items():assert H((R/name).read_bytes())==digest,name
 for kind in ['original','candidate']:
  r=f['artifacts'][kind];b=(R/r['origin']).read_bytes()
  for v in r['positive_path_witnesses']:assert b[v['file_offset']:v['file_offset']+len(v['token'])]==v['token'].encode()
 result.update(fresh_repository_check=True,repository_inputs_checked=len(checks))
print(json.dumps(result,indent=2))
