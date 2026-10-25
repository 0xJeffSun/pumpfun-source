#!/usr/bin/env python3
"""Offline integrity/encoding verification, not execution or a semantic proof."""
from pathlib import Path
import hashlib,json,re,struct
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
m=json.loads((P/'manifest-sha256.json').read_text())
actual={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and f!=P/'manifest-sha256.json'}
assert actual==set(m), ('inventory',sorted(actual^set(m)))
for n,h in m.items(): assert sha((P/n).read_bytes())==h,n
for d in (P/'prior').iterdir():
 seal=json.loads((d/'manifest-sha256.json').read_text())
 for f in d.iterdir():
  if f.name!='manifest-sha256.json': assert sha(f.read_bytes())==seal[f.name],str(f)
for x in json.loads((P/'provenance.json').read_text()):
 b=(P/x['path']).read_bytes()
 if 'byte_start' in x:
  assert len(b)==x['byte_end']-x['byte_start']
  assert len(b.splitlines())==x['line_end']-x['line_start']+1
 else:
  assert len(b)==x['size'] and sha(b)==x['sha256']
  assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==x['git_blob']
w=json.loads((P/'windows.json').read_text()); ins={} 
for x in w['windows']:
 if x.get('data'):continue
 b=(P/'bytes'/f"{x['name']}.bin").read_bytes();assert len(b)==x['end']-x['start']
 covered=0
 for l in (P/'asm'/f"{x['name']}.asm").read_text().splitlines():
  q=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)',l);assert q
  a=int(q[1],16);raw=bytes.fromhex(q[2]);assert a==x['start']+covered
  assert raw==b[a-x['start']:a-x['start']+len(raw)];covered+=len(raw);ins[a]=raw
 assert covered==len(b),x['name']
r=json.loads((P/'results.json').read_text())
for a,t in r['direct_edges']:
 a=int(a,16);t=int(t,16);raw=ins[a];assert raw[:2]==b'\x85\x10';assert a+8+8*struct.unpack('<i',raw[4:8])[0]==t
for a,t in r['branch_edges']:
 a=int(a,16);t=int(t,16);assert a+8+8*struct.unpack('<h',ins[a][2:4])[0]==t
for a,v in r['immediates']:
 assert struct.unpack('<i',ins[int(a,16)][4:8])[0]==v
assert (P/'data/system_zero.bin').read_bytes()==bytes(32)
def base58(b):
 n=int.from_bytes(b,'big');s='';abc='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
 while n:n,k=divmod(n,58);s=abc[k]+s
 return '1'*(len(b)-len(b.lstrip(b'\0')))+s
assert base58((P/'data/tokenkeg.bin').read_bytes())=='TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
print(json.dumps({'status':'PASS','files':len(m),'instruction_windows':sum(not x.get('data',False) for x in w['windows']),'semantic_proof':False,'runtime_executed':False}))
