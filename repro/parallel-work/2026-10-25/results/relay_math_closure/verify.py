#!/usr/bin/env python3
"""Location-independent sealed-byte/static derivation verifier. No SBF execution."""
from pathlib import Path
import sys, json, hashlib, struct
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
manifest=json.loads((P/'manifest.json').read_text())
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p.name!='manifest.json'}
assert actual==set(manifest),'Unexpected/missing sealed files'
for name,sha in manifest.items():assert H((P/name).read_bytes())==sha,name
for x in json.loads((P/'provenance.json').read_text()):
 b=(P/x['path']).read_bytes()
 assert len(b)==x['size'] and H(b)==x['sha256']
 assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==x['git_blob']
sys.path.insert(0,str(P))
from analyze import derive, B
result=json.loads((P/'result.json').read_text())
assert derive()==result,'Static derivation mismatch'
windows=json.loads((P/'evidence/inputs/prior-windows.json').read_text())
assert len(windows)==492
for w in windows:assert H(B[w['start']:w['end']])==w['sha256']
for d in result['dispatch_evidence']:
 c=d['constant_pc'];p=d['comparison_pc'];call=d['dispatch_call_pc']
 assert B[c]==24 and (B[c+4:c+8]+B[c+12:c+16]).hex()==d['discriminator']
 assert B[p]==29 and p+8+8*struct.unpack_from('<h',B,p+2)[0]==d['branch_target']
 assert B[call]==133 and call+8+8*struct.unpack_from('<i',B,call+4)[0]==d['direct_callee_start']
 assert H(B[d['direct_callee_start']:d['direct_callee_end']])==d['direct_callee_sha256']
import disasm
for path in (P/'disassembly').glob('*.txt'):assert path.read_text()==disasm.render(int(path.stem))
# Independently pin the principal new arithmetic/relocation witnesses.
assert result['callback_tables'][0]['encoded_target']==50616
assert result['callback_tables'][0]['target_window']==64
assert next(v for v in result['literals_116'] if v['data']['start']==755544)['text']=='Arithmetic overflow'
assert B[642072:642080].hex()=='7927400000000000'
assert B[643176:643184].hex()=='7b76400000000000'
assert B[142496:142504].hex()=='79a2a0ff00000000'
assert B[142504:142512].hex()=='79a3a8ff00000000'
assert B[142512:142520].hex()=='7b2a58ff00000000'
assert B[142736:142744].hex()=='7b31000000000000'
assert result['static_equation_vectors'][4]['output']==[10210272844798236813]
print(json.dumps(dict(status='PASS',sealed_files=len(manifest),git_blobs=len(json.loads((P/'provenance.json').read_text())),window_hashes=492,dispatch_witnesses=11,literal_extents=34,callback_tables=4,static_vectors=len(result['static_equation_vectors']),target_executed=False,source_built=False,semantic_proof=False),indent=2))
