#!/usr/bin/env python3
"""Offline evidence verifier. Reads existing bytes only; never runs SBF."""
from pathlib import Path
import hashlib,json,re,struct
R=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(p):return (R/p).read_bytes()
def obj(p):return json.loads(read(p))
m=obj('manifest-sha256.json')
# Nested historical seals are ordinary sealed input files.
actual={str(p.relative_to(R)) for p in R.rglob('*') if p.is_file() and p!=R/'manifest-sha256.json'}
assert actual==set(m),'file set differs'
for p,h in m.items():assert sha(read(p))==h,p
for p in obj('provenance.json'):
 b=read(p['copy']);assert sha(b)==p['sha256'];assert len(b)==p['size'];assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==p['git_blob']
prior=obj('prior-package.json');seal=read('inputs/prior/manifest-sha256.json');assert sha(seal)==prior['seal_sha256'];ps=json.loads(seal)
for p in prior['files']:
 assert sha(read(p['copy']))==p['sha256']
 if p['path']!='manifest-sha256.json':assert ps[p['path']]==p['sha256']
b=read('inputs/prior/inputs/original-pump.so');ins={};n=0
for p in (R/'inputs').rglob('*.asm'):
 for line in p.read_text().splitlines():
  q=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)',line)
  if not q:continue
  a=int(q[1],16);v=bytes.fromhex(q[2]);assert b[a:a+len(v)]==v,(p.name,hex(a));ins[a]=v;n+=1
for w in obj('windows.json'):
 lines=read(w['copy']).decode().splitlines();assert len(lines)==w['lines'][1]-w['lines'][0]+1
 cursor=w['start']
 for line in lines:
  q=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)',line);assert q
  assert int(q[1],16)==cursor;cursor+=len(bytes.fromhex(q[2]))
 assert cursor==w['end']
for e in obj('call-edges.json'):
 a=int(e['site'],16);v=ins[a];assert v[:2]==b'\x85\x10';assert a+8+struct.unpack('<i',v[4:8])[0]*8==int(e['target'],16)
for c in obj('constants.json'):
 a=int(c['offset'],16);assert b[a:a+c['size']].hex()==c['hex']
res=obj('result.json');idl=obj('inputs/pump-idl.json');fs=next(t for t in idl['types'] if t['name']=='BondingCurve')['type']['fields'];o=8
for f,l in zip(fs,res['fields']):
 assert f['name']==l['field'] and f['type']==l['type'];assert l['serialized_account_offset']==o;o+=l['size'];assert l['walk_stack_offset']==l['decoded_offset']-0x300;assert l['serializer_account_wrapper_offset']==l['decoded_offset']+8
assert o==166
# Concrete reserve stores in latest decoder and predicate loads in walk.
for a,off in [(0x9ffa0,64),(0x9ffa8,72),(0x9ffb0,80),(0x9ffc0,88)]:
 v=ins[a];assert v[0]==0x7b and v[1]&15==6 and struct.unpack('<h',v[2:4])[0]==off
for a,off in [(0x190b0,-0x2c0),(0x190b8,-0x2b0),(0x190c0,-0x2b8),(0x190c8,-0x2a8)]:
 v=ins[a];assert v[0]==0x79 and v[1]>>4==10 and struct.unpack('<h',v[2:4])[0]==off
print(json.dumps({'status':'PASS','sealed_files':len(m),'assembly_rows_checked':n,'full_git_blobs_checked':len(obj('provenance.json')),'scope':'integrity, direct edges, ranges and selected static typed bindings; no runtime or exhaustive semantic proof'},indent=2))
