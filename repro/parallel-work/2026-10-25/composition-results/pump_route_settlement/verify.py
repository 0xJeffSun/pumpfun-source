#!/usr/bin/env python3
"""Offline evidence integrity checks; no runtime or behavioral certification."""
from pathlib import Path
import hashlib,json,re,struct
R=Path(__file__).resolve().parent
h=lambda b:hashlib.sha256(b).hexdigest()
def main():
 m=json.loads((R/'manifest-sha256.json').read_text())
 actual={str(p.relative_to(R)) for p in R.rglob('*') if p.is_file() and p.name!='manifest-sha256.json'}
 assert actual==set(m),('file set',actual^set(m))
 for p,d in m.items():assert h((R/p).read_bytes())==d,p
 p=json.loads((R/'provenance.json').read_text())
 s=(R/'evidence/source.rs').read_bytes();o=next(o for o in p['objects'] if o['path']=='programs/pump/src/multi_hop_curve.rs')
 assert h(s)==o['sha256']
 assert hashlib.sha1(b'blob '+str(len(s)).encode()+b'\0'+s).hexdigest()==o['git_blob']
 pm=json.loads((R/'evidence/prior-manifest-sha256.json').read_text())
 assert h((R/'evidence/prior-manifest-sha256.json').read_bytes())==p['prior_seal_sha256']
 for n in ['REPORT.md','result.json','provenance.json']:assert h((R/'evidence'/('prior-'+n)).read_bytes())==pm[n]
 old=json.loads((R/'evidence/prior-provenance.json').read_text())
 for label,path in [('original','evidence/original/pump/deployed.so'),('disassembly','repro/function-inventory/2026-10-24-374fcf0/work/disassembly/pump.asm')]:
  obj=next(o for o in p['objects'] if o['path']==path)
  for k in ['git_blob','sha256','size']:assert obj[k]==old[label][k]
 instructions={};count=0
 for w in p['windows']:
  raw=(R/'evidence'/(w['name']+'.bin')).read_bytes();assert len(raw)==w['end']-w['start'];assert h(raw)==w['sha256']
  found=[]
  for line in (R/'evidence'/(w['name']+'.asm')).read_text().splitlines():
   z=re.match(r'([0-9a-f]+): ((?:[0-9a-f]{2} )+)',line);assert z,line
   a=int(z[1],16);b=bytes.fromhex(z[2]);assert raw[a-w['start']:a-w['start']+len(b)]==b
   instructions[a]=b;found.append(a);count+=1
   if b[0]==0x85 and b[1]==0x10:assert '; target '+hex(a+8+struct.unpack('<i',b[4:8])[0]*8) in line
   elif b[0]&7 in (5,6) and b[0] not in (0x85,0x95,0x8d):assert '; branch '+hex(a+8+struct.unpack('<h',b[2:4])[0]*8) in line
  assert found==w['addresses']
 for d in p['data']:
  b=(R/d['path']).read_bytes();assert len(b)==d['end']-d['start'];assert h(b)==d['sha256']
 def edge(a,t):
  b=instructions[a];got=a+8+(struct.unpack('<i',b[4:8])[0] if b[0]==0x85 else struct.unpack('<h',b[2:4])[0])*8
  assert got==t,(hex(a),hex(got),hex(t))
 for a,t in [(0x5d8b8,0xa1bd8),(0x5e6a8,0x8bbd0),(0x94950,0x94b00),(0x94b20,0x94d90),(0x94e50,0x950d8),(0x95268,0x95358),(0x5d470,0x5d7e8),(0x5e0c0,0x5e130),(0x5d8f0,0x5d990),(0x5e200,0x5e2d8),(0x5e220,0x5e3b8),(0x5d518,0x8eda0),(0x5e1d0,0x93050),(0x5e398,0x940c0),(0x5e9e0,0x1a0530)]:edge(a,t)
 # Exact ABI stores: first protocol, then creator; return amount/buyback offsets.
 for a,reg,offset in [(0xa1cf0,0x32,0x78),(0xa1ff8,0x32,0x70),(0x5f558,0x21,0x28),(0x5f568,0x21,0x20)]:
  b=instructions[a];assert b[0]==0x7b and b[1]==reg and struct.unpack('<h',b[2:4])[0]==offset
 assert (R/'evidence/data-1b6ec8.bin').read_bytes()==b'multi_hop_swap'
 alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';v=0
 for c in 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb':v=v*58+alphabet.index(c)
 assert (R/'evidence/data-1b5ca8.bin').read_bytes()==v.to_bytes(32,'big')
 print(json.dumps({'status':'pass','sealed_files':len(m),'instructions_checked':count,'verification':'integrity, instruction bytes, direct edges and bounded ABI assertions only'}))
if __name__=='__main__':main()
