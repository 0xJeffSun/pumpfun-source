#!/usr/bin/env python3
"""Offline integrity and bounded static checks; no execution of program bytes."""
import pathlib,json,hashlib,struct,re
P=pathlib.Path(__file__).resolve().parent
def sha(b):return hashlib.sha256(b).hexdigest()
def check():
 m=json.loads((P/'manifest.json').read_text())
 actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p.name!='manifest.json'}
 assert actual==set(m)
 for f,h in m.items():assert sha((P/f).read_bytes())==h,f
 for x in json.loads((P/'provenance.json').read_text()):
  b=(P/x['file']).read_bytes();assert sha(b)==x['sha256'];assert len(b)==x['end']-x['start']
  if x['start']==0 and x['end']==x['full_size']:
   assert sha(b)==x['full_sha256'];assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==x['git_blob']
 b=(P/'inputs/original.so').read_bytes();assert b[:6]==b'\x7fELF\x02\x01'
 shoff=struct.unpack_from('<Q',b,40)[0];ents,n=struct.unpack_from('<HH',b,58)
 sections=[struct.unpack_from('<IIQQQQIIQQ',b,shoff+i*ents) for i in range(n)]
 def at(a,l):
  for s in sections:
   if s[1]!=8 and s[3]<=a and a+l<=s[3]+s[5]:return b[s[4]+a-s[3]:s[4]+a-s[3]+l]
  raise AssertionError(hex(a))
 ins={};count=0
 for p in (P/'inputs').glob('*.asm'):
  for line in p.read_text().splitlines():
   m=re.match(r'\s*([0-9a-f]+):\s+((?:[0-9a-f]{2} )+)',line)
   if not m:continue
   a=int(m[1],16);raw=bytes.fromhex(m[2]);assert raw==at(a,len(raw)),(p.name,hex(a));ins[a]=raw;count+=1
 r=json.loads((P/'result.json').read_text())
 for c in r['calls']:
  a=int(c['pc'],16);raw=ins[a];assert raw[0]==0x85
  assert a+8+8*struct.unpack_from('<i',raw,4)[0]==int(c['target'],16)
 for c in r['branches']:
  a=int(c['pc'],16);assert a+8+8*struct.unpack_from('<h',ins[a],2)[0]==int(c['target'],16)
 for c in r['instruction_assertions']:
  assert ins[int(c['pc'],16)].hex()==c['bytes']
 assert at(0x1b64ef,8).hex()=='17b7f83760d8ac60'
 return {'status':'PASS','files':len(actual),'instruction_rows':count,'unique_instruction_addresses':len(ins),'semantic_closure':False,'checks':'manifest, input hashes, full-input git blobs, ELF byte mapping, specified calls/branches/register bytes, curve discriminator'}
if __name__=='__main__':print(json.dumps(check(),indent=2))
