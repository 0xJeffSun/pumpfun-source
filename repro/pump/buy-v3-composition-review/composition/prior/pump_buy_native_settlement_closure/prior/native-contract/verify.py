#!/usr/bin/env python3
"""Offline static integrity and selected-interface checks. No program execution."""
from pathlib import Path
import hashlib,json,re,struct
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(x):return (P/x).read_bytes()
def obj(x):return json.loads(read(x))
def require(v,msg):
 if not v:raise SystemExit('FAIL: '+msg)
manifest=obj('manifest-sha256.json')
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p.name!='manifest-sha256.json'}
# Nested predecessor manifests are sealed too.
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p!=P/'manifest-sha256.json'}
require(actual==set(manifest),'exact file inventory')
require(not any(p.is_symlink() for p in P.rglob('*')),'no symlinks')
for f,h in manifest.items():require(sha(read(f))==h,'seal '+f)
for prior in obj('prior-inputs.json'):
 root='prior/'+prior['name']+'/'
 require(sha(read(root+'manifest-sha256.json'))==prior['seal_sha256'],'prior seal identity')
 m=obj(root+'manifest-sha256.json')
 for f in prior['members']:require(sha(read(root+f))==m[f],'prior member '+root+f)
prov=obj('provenance.json');r=obj('results.json');instructions={};count=0
require(prov['checkpoint']==r['checkpoint']=='4d3c19e3c58427f3604caede144b3322fa56d2b5','checkpoint')
for w in prov['windows']:
 base='evidence/'+w['name'];raw=read(base+'.bin');require(len(raw)==w['end']-w['start'],'slice size '+base);require(sha(raw)==w['sha256'],'slice hash '+base)
 covered=set()
 for line in read(base+'.asm').decode().splitlines():
  m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2}\s+)+)',line);require(m is not None,'assembly format')
  a=int(m[1],16);b=bytes.fromhex(m[2]);off=a-w['start']
  require(len(b) in [8,16] and off>=0 and off+len(b)<=len(raw),'instruction range')
  require(raw[off:off+len(b)]==b,'instruction bytes '+hex(a));covered.update(range(off,off+len(b)));instructions[a]=b;count+=1
 require(len(covered)==len(raw),'complete excerpt coverage '+base)
for edge in r['edges']:
 a=edge['address'];b=instructions[a];require(b[:2]==b'\x85\x10','relative call '+hex(a));require(b[:8].hex()==edge['instruction_hex'],'edge encoding');require(a+8+8*struct.unpack_from('<i',b,4)[0]==edge['target'],'call target '+hex(a))
for c in r['opcode_assertions']:require(instructions[c['address']][:8].hex()==c['instruction_hex'],'decisive opcode '+hex(c['address']))
for d in obj('data.json'):
 b=read('evidence/'+d['name']+'.bin');require(b.hex()==d['hex'] and sha(b)==d['sha256'] and len(b)==d['end']-d['start'],'data '+d['name'])
require(read('evidence/event_seed.bin')==b'__event_authority','event seed')
require(read('evidence/system_key.bin')==bytes(32),'System key')
require(read('evidence/sync_variant.bin')==struct.pack('<I',17),'sync variant')
for e in obj('source-provenance.json')['excerpts']:require(sha(read(e['file']))==e['sha256'],'source excerpt')
header=read('evidence/elf_header.bin');require(header[:6]==b'\x7fELF\x02\x01','ELF64 LE')
shoff=struct.unpack_from('<Q',header,40)[0];shsz,n=struct.unpack_from('<HH',header,58);raw=read('evidence/elf_sections.bin');require(len(raw)==shsz*n,'section metadata length');secs=[struct.unpack_from('<IIQQQQIIQQ',raw,i*shsz) for i in range(n)]
for rel in obj('relocations.json'):
 stem='evidence/reloc_'+format(rel['callsite'],'x')+'_';rr=read(stem+'reloc.bin');sy=read(stem+'symbol.bin');name=read(stem+'name.bin');addr,info=struct.unpack('<QQ',rr)
 require(addr==rel['callsite'] and info>>32==rel['symbol_index'],'relocation index')
 require(name==rel['symbol'].encode()+b'\0','relocation name')
 candidates=[s for s in secs if s[1]==9 and s[4]<=rel['relocation_offset']<s[4]+s[5]];require(len(candidates)==1,'relocation section')
 sec=candidates[0];sym=secs[sec[6]];strings=secs[sym[6]]
 require(rel['symbol_offset']==sym[4]+(info>>32)*sym[9],'symbol linkage')
 require(rel['name_offset']==strings[4]+struct.unpack_from('<I',sy)[0],'string linkage')
 require(instructions[addr][:8]==bytes.fromhex('85100000ffffffff'),'syscall opcode')
require(any(x['symbol']=='sol_get_rent_sysvar' and x['callsite']==0x1a0a60 for x in obj('relocations.json')),'rent syscall identity')
print(json.dumps({'ok':True,'sealed_files':len(manifest),'instruction_lines_checked':count,'call_edges_checked':len(r['edges']),'claim':'integrity and selected static interface checks only; not automated semantic proof'}))
