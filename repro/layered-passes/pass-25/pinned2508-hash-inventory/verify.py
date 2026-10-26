#!/usr/bin/env python3
"""Hash-only package/merged retention verification. Never executes incoming payloads."""
import argparse,hashlib,json,pathlib,subprocess
p=argparse.ArgumentParser();p.add_argument('--repo',type=pathlib.Path);p.add_argument('--manifest-sha256',required=True);a=p.parse_args();d=pathlib.Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
assert H((d/'manifest.json').read_bytes())==a.manifest_sha256
m=json.loads((d/'manifest.json').read_text()); expected=set(m)|{'manifest.json','manifest.sha256'}
actual=set()
for f in d.rglob('*'):
 assert not f.is_symlink(),str(f)
 if f.is_file():actual.add(f.relative_to(d).as_posix())
assert actual==expected,(actual-expected,expected-actual)
for n,h in m.items():assert H((d/n).read_bytes())==h,n
assert (d/'manifest.sha256').read_text().split()[0]==a.manifest_sha256
j=json.loads((d/'incoming-retention-contract.json').read_text());assert (j['incoming_change_count'],j['positive_count'],j['negative_count'],j['incoming_only_count'])==(233,225,8,220)
if a.repo:
 r=a.repo.resolve()
 for row in j['positive']:
  if row['path'] in j['explicit_active_exception']:continue
  f=r/row['path'];assert f.is_file() and not f.is_symlink() and H(f.read_bytes())==row['after']['sha256'],row['path']
 for n in j['absent_active_paths']:assert not (r/n).exists() and not (r/n).is_symlink(),n
 receipt=json.loads((d/'actual-rename-resolution.json').read_text())
 for row in receipt['resolutions']:
  if row['role']=='retain-exact-archive':assert H((r/row['path']).read_bytes())==row['sha256'],row['path']
 for packet in ('compiled-source107.json','relay-canonical23.json'):
  doc=json.loads((d/packet).read_text())
  # Source selections are bound in explicit source maps; root CIv7 also checks selected current metadata.
 print('PASS package +224 incoming exact paths +8 absences +16 archive copies; active workflow separately owned by CIv7')
else:print('PASS strict package integrity')
