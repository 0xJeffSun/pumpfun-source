#!/usr/bin/env python3
"""Static evidence verifier; does not execute or simulate target instructions."""
from pathlib import Path
import hashlib,json,re,struct
P=Path(__file__).resolve().parent
def sha(b): return hashlib.sha256(b).hexdigest()
def read(p): return (P/p).read_bytes()
m=json.loads(read('manifest-sha256.json'))
# Only the root seal is excluded, not nested public seals.
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p!=P/'manifest-sha256.json'}
assert actual==set(m),('file set mismatch',actual^set(m))
for path,digest in m.items(): assert sha(read(path))==digest,path
prov=json.loads(read('provenance.json'))
for e in prov['inputs']:
 b=read(e['path']);assert len(b)==e['size'] and sha(b)==e['sha256'],e['path']
 if e['git_blob']:
  assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==e['git_blob'],e['path']
prior=json.loads(read('evidence/prior/manifest-sha256.json'))
for name in ['REPORT.md','provenance.json']:
 assert sha(read('evidence/prior/'+name))==prior[name]
for name in ['disassembly/059.txt','disassembly/060.txt','disassembly/436.txt','inputs/deployed.so']:
 assert sha(read('evidence/frozen/'+name))==prior['evidence/frozen/'+name]
elf=read('evidence/frozen/inputs/deployed.so'); instructions={}; edge_count=0
for path in sorted((P/'evidence/frozen/disassembly').glob('*.txt')):
 last=None
 for line in path.read_text().splitlines():
  match=re.fullmatch(r'(\d+): ([0-9a-f]+)\s+(.+)',line);assert match,line
  off=int(match[1]);raw=bytes.fromhex(match[2]);desc=match[3]
  assert elf[off:off+len(raw)]==raw,(path.name,off)
  assert len(raw)==(16 if raw[0]==0x18 else 8),(off,len(raw))
  if last is not None: assert off==last,(off,last)
  last=off+len(raw);instructions[off]=len(raw)
  op,regs,delta,imm=struct.unpack('<BBhi',raw[:8])
  if ' -> ' in desc or desc.startswith('goto '):
   target=int(desc.split(' -> ')[-1] if ' -> ' in desc else desc[5:])
   assert target==off+8+8*delta,(off,target);edge_count+=1
  if desc.startswith('call ') and regs>>4==1:
   assert int(desc[5:])==off+8+8*imm,off;edge_count+=1
r=json.loads(read('result.json'))
for w in r['byte_witnesses']:
 a,b=w['start'],w['end'];assert sha(elf[a:b])==w['sha256']
 cur=a
 while cur<b:
  assert cur in instructions,cur
  cur+=instructions[cur]
 assert cur==b
for a,b in r['assigned_ranges']:
 for off in range(a,b,8):
  assert any(lo<=off<hi for row in r['ledger'] for lo,hi in row['ranges']),off
assert r['source_changes']==[] and not r['target_execution']
print(json.dumps(dict(status='PASS',sealed_files=len(m),git_blobs=sum(bool(x['git_blob']) for x in prov['inputs']),listing_instructions=len(instructions),static_edges=edge_count,range_witnesses=len(r['byte_witnesses']),scope='Integrity, bytes, static edges and ledger coverage; not target execution or formal proof'),indent=2))
