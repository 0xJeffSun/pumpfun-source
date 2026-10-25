#!/usr/bin/env python3
"""Offline evidence checks only. No SBF execution or repository access."""
import hashlib,json,pathlib,re,struct
P=pathlib.Path(__file__).resolve().parent
def read(p):return (P/p).read_bytes()
def js(p):return json.loads(read(p))
def sha(b):return hashlib.sha256(b).hexdigest()
def git(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
m=js('manifest-sha256.json')
# Nested predecessor manifests are sealed members too.
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p!=P/'manifest-sha256.json'}
assert actual==set(m),('inventory',actual^set(m))
for f,h in m.items():assert sha(read(f))==h,f
for p in js('provenance.json'):
 b=read(p['path'])
 if 'excerpt_start' in p:assert sha(b)==p['excerpt_sha256']
 else:assert sha(b)==p['sha256'] and git(b)==p['git_blob'] and len(b)==p['size'],p['path']
for p in js('reviewed-inputs.json'):
 base='prior/'+p['source_path'].split('/')[-1]+'/'
 assert sha(read(base+'manifest-sha256.json'))==p['manifest_sha256']
 seal=js(base+'manifest-sha256.json')
 for f in p['copied']:assert sha(read(base+f))==seal[f]
for d in js('consumed-data.json'):
 assert len(read(d['path']))==d['end']-d['start'] and sha(read(d['path']))==d['sha256']
assert read('data/bonding-curve.bin')==b'bonding-curve'
ins={}; count=0
for w in js('windows.json')['windows']:
 raw=read('bytes/'+w['name']+'.bin');assert len(raw)==w['end']-w['start']
 for line in read('asm/'+w['name']+'.asm').decode().splitlines():
  match=re.match(r'^\s*([0-9a-f]+):\s+((?:[0-9a-f]{2}\s+)+)\s*\S',line);assert match,line
  addr=int(match[1],16);b=bytes.fromhex(match[2]);assert raw[addr-w['start']:addr-w['start']+len(b)]==b,(w['name'],hex(addr))
  if addr in ins:assert ins[addr]==b
  ins[addr]=b;count+=1
for edge in js('result.json')['checked_calls']:
 a=int(edge['site'],16);t=int(edge['target'],16);b=ins[a];assert b[0]==0x85 and a+8+struct.unpack('<i',b[4:8])[0]*8==t,edge
for x in js('result.json')['instruction_assertions']:
 assert ins[int(x['address'],16)].hex()==x['bytes'],x
fields=js('global-wire-layout.json');offset=8
for f in fields:assert f['serialized_offset']==offset;offset+=f['size']
assert next(f for f in fields if f['field']=='creator_fee_configurable')['serialized_offset']==1045
curve=js('prior/pump_nested_types/result.json')['fields']
assert next(f for f in curve if f['field']=='creator_fee_bps')['decoded_offset']==104
assert next(f for f in curve if f['field']=='creator_fee_bps')['serialized_account_offset']==115
assert 'buy_v3' in read('prior/pump_partial_types/REPORT.md').decode()
assert ins[0x1864e8][0]==0x15 and 0x1864e8+8+struct.unpack('<h',ins[0x1864e8][2:4])[0]*8==0x1866a0
print(json.dumps({'status':'PASS','sealed_files':len(m),'instruction_records_checked':count,'unique_instruction_addresses':len(ins),'calls_checked':len(js('result.json')['checked_calls']),'semantics_certified':False,'builds':0,'runtime_probes':0},sort_keys=True))
