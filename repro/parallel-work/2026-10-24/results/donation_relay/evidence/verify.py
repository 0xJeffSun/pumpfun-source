#!/usr/bin/env python3
"""Portable read-only verifier; stdlib only; never loads or executes SBF/Rust."""
import hashlib,json,struct,sys,zlib
from pathlib import Path
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent
sys.path.insert(0,str(W))
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads((W/p).read_text())
for x in J('inputs-manifest.json'):
 b=(W/x['copy']).read_bytes();assert len(b)==x['bytes'] and H(b)==x['sha256'],x['copy']
for p,h in J('artifact-sha256.json').items():assert H((W/p).read_bytes())==h,p
b=(W/'inputs/deployed.so').read_bytes()
assert H(b)=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
assert H((W/'inputs/idl.json').read_bytes())=='b075f7b39b019630067e5f6a67015396ccbd66d282c7da048753660506472d6c'
a=(W/'inputs/idl-account.bin').read_bytes();n=struct.unpack_from('<I',a,40)[0];raw=zlib.decompress(a[44:44+n]);assert json.loads(raw)==J('inputs/idl.json');assert H(raw)==J('inputs/idl-capture.json')['idl_sha256']
from analyze import derive
for name,value in derive().items():assert J(name)==value,name
from codec_analysis import derive as codec_derive
assert J('codecs.json')==codec_derive()
r=J('windows.json');assert len(r)==492 and r[0]['start']==288 and r[-1]['end']==752776
assert all(x['end']==y['start'] for x,y in zip(r,r[1:]));assert sum(x['bytes'] for x in r)==752488
assert sorted(i for g in J('groups.json').values() for i in g)==list(range(492))
assert sorted(i for q in J('reconstruction-queues.json') for i in q['ordinals'])==list(range(492))
# Raw opcode witnesses independent of the JSON formatting/graph derivation.
def op(pc,o,dst=None,src=None,offset=None,imm=None):
 actual,reg,off,i=struct.unpack_from('<BBhi',b,pc)
 assert actual==o and (dst is None or reg&15==dst) and (src is None or reg>>4==src) and (offset is None or off==offset) and (imm is None or i==imm),(pc,actual,reg,off,i)
for pc in [506376,508632,510992]:op(pc,0x71,offset=9)
for pc in [506400,508656,511016]:op(pc,0x55,imm=1)
for pc in [506360,508616,510976,514872]:op(pc,0x71,offset=8)
for pc,subtract,need in [(506704,42,32),(506760,74,8),(508960,42,32),(509024,74,16),(509040,90,8),(511320,42,32),(511376,74,16),(514912,41,8)]:
 op(pc,0x07,imm=-subtract);op(pc+8,0xa5,imm=need)
for pc,off in [(506848,74),(509152,90),(509168,74),(509184,82),(511464,74),(511480,82),(515168,41)]:op(pc,0x79,offset=off)
# Vector prefix reads count as u32, width scaling is 32 (not a recovered allocation contract).
op(60344,0xa5,imm=4);op(60352,0x61,offset=0);op(60528,0x67,imm=5)
assert b[629280:629312].hex()=='b7000000650100001501010063010000bf100000000000009500000000000000'
print(json.dumps({'verified':True,'windows':492,'text_bytes':752488,'dispatches':11,'account_codec_records':5,'fixed_codec_records':4,'pure_fragments':1,'idl_compressed_range':[44,44+n],'runtime_tests':0,'builds':0,'source_provenance_recovered':False},indent=2))
