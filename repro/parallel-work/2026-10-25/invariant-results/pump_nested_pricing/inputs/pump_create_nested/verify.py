#!/usr/bin/env python3
"""Offline integrity and bounded static byte checks; no VM or source builds."""
from pathlib import Path
import hashlib,json,re,struct
ROOT=Path(__file__).resolve().parent
def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):return (ROOT/p).read_bytes()
def js(p):return json.loads(read(p))
def need(ok,msg):
 if not ok:raise SystemExit('FAIL: '+msg)
manifest=js('manifest-sha256.json')
actual={str(p.relative_to(ROOT)) for p in ROOT.rglob('*') if p.is_file() and p.name!='manifest-sha256.json'}
need(actual==set(manifest),'sealed file set differs')
for p,h in manifest.items():need(sha(read(p))==h,'hash '+p)
prov=js('provenance.json');p=next(x for x in prov if x['path']=='evidence/original/pump/deployed.so');b=read(p['copy'])
need(sha(b)==p['sha256'] and len(b)==p['size'],'original full SHA256/size')
need(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==p['git_blob'],'original Git blob')
need(js('inputs/dispatch-create.json')['binary_sha256']==sha(b),'dispatch binary binding')
checked=0
for w in js('windows.json'):
 lo,hi=w['start'],w['end_exclusive'];need(sha(b[lo:hi])==w['binary_sha256'],'window '+w['name'])
 for line in read(w['asm']).decode().splitlines():
  m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)',line)
  need(m is not None,'assembly syntax');a=int(m[1],16);raw=bytes.fromhex(m[2]);need(lo<=a and a+len(raw)<=hi,'window bounds');need(b[a:a+len(raw)]==raw,'assembly bytes '+hex(a));checked+=1
for row in prov:
 for e in row.get('excerpts',[]):need(sha(read(e['copy']))==e['sha256'],'source excerpt')
for e in js('call-edges.json'):
 a=e['site'];raw=b[a:a+8];need(raw.hex()==e['bytes'],'call bytes');need(raw[:2]==b'\x85\x10','direct call opcode');need(a+8+struct.unpack('<i',raw[4:])[0]*8==e['target'],'call target')
# Specific existing-byte anchors, not newly generated runtime fixtures.
anchors={0x18688:'a508c10204000000',0x18700:'07020000c0000000',0x18d70:'07080000fcffffff',0x18d78:'07020000c0000000',0x19468:'0701000030000000',0x19478:'07080000ffffffff',0x18da8:'0709000038000000',0x18e28:'1509dd0018010000',0x60a88:'7127980000000000',0x60a90:'0707000001000000',0x639a8:'07090000c8ffffff',0x63a08:'07080000c8ffffff'}
for a,h in anchors.items():need(b[a:a+8].hex()==h,'control anchor '+hex(a))
need(b[0x1b683a:0x1b683a+13]==b'bonding-curve','parser seed')
need(b[0x19728+4:0x19728+8]==(6107).to_bytes(4,'little'),'awaiting-migration code')
need(b[0x19e50+4:0x19e50+8]==(6109).to_bytes(4,'little'),'missing-chain code')
print(json.dumps({'status':'PASS','sealed_files':len(manifest),'assembly_instructions_checked':checked,'call_edges_checked':len(js('call-edges.json')),'scope':'offline byte/provenance/control anchors only; semantic obligations remain'},indent=2))
