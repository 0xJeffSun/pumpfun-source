#!/usr/bin/env python3
"""Location-independent static seal/byte verification; no target execution."""
import hashlib,importlib.util,json,sys
from pathlib import Path
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
h=lambda b:hashlib.sha256(b).hexdigest()
manifest=json.loads((P/'manifest-sha256.json').read_text())
actual={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file() and x.name!='manifest-sha256.json'}
assert actual==set(manifest),('file set',actual^set(manifest))
for name,digest in manifest.items():
 assert h((P/name).read_bytes())==digest,('sha256',name)
prov=json.loads((P/'provenance.json').read_text())
for x in prov['inputs']:
 b=(P/x['path']).read_bytes()
 assert len(b)==x['size'] and h(b)==x['sha256'],x['path']
 if x['git_blob']:
  assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==x['git_blob'],x['path']
prior=json.loads((P/'evidence/closure/manifest.json').read_text())
for name in ['REPORT.md','provenance.json','fragments.txt','result.json']:
 assert h((P/'evidence/closure'/name).read_bytes())==prior[name],('prior seal',name)
B=(P/'evidence/frozen/inputs/deployed.so').read_bytes()
assert h(B)=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
spec=importlib.util.spec_from_file_location('frozen_disasm',P/'evidence/frozen/disasm.py')
d=importlib.util.module_from_spec(spec);spec.loader.exec_module(d)
r=json.loads((P/'result.json').read_text())
for x in r['windows']:
 assert h(B[x['start']:x['end']])==x['sha256'],x['ordinal']
 assert d.render(x['ordinal'])==(P/f"evidence/frozen/disassembly/{x['ordinal']:03}.txt").read_text(),x['ordinal']
 for c in x['direct_calls']:
  import struct
  op,reg,off,imm=struct.unpack_from('<BBhi',B,c['pc'])
  assert op==133 and c['pc']+8+imm*8==c['target'],c
for c in r['claims']:
 for x in c['ranges']:
  raw=B[x['start']:x['end']]
  assert raw.hex()==x['raw_hex'] and h(raw)==x['sha256'],c['id']
assert r['complete_sort_contract_proved'] is False
print(json.dumps({'ok':True,'sealed_files':len(manifest),'frozen_git_inputs':sum(bool(x['git_blob']) for x in prov['inputs']),'windows':len(r['windows']),'claims':len(r['claims']),'verification':'static hashes, Git objects, prior seal subset, listings, call edges and raw byte ranges only','semantic_proof_certified':False},indent=2))
