#!/usr/bin/env python3
"""Static sealed-evidence verification only. No SBF execution or network."""
import hashlib,json,pathlib,re,sys
P=pathlib.Path(__file__).resolve().parent
def read(p): return json.loads((P/p).read_text())
def sha(b): return hashlib.sha256(b).hexdigest()
def safe(rel):
 p=pathlib.PurePosixPath(rel)
 if p.is_absolute() or '..' in p.parts: raise ValueError('unsafe manifest path')
 q=P.joinpath(*p.parts)
 if q.is_symlink(): raise ValueError('symlink')
 return q
manifest=read('manifest-sha256.json')
actual={p.relative_to(P).as_posix() for p in P.rglob('*') if p.is_file() and p!=P/'manifest-sha256.json'}
assert actual==set(manifest), ('file set mismatch',actual^set(manifest))
for rel,h in manifest.items(): assert sha(safe(rel).read_bytes())==h, rel
prior=read('prior/manifest-sha256.json')
assert {p.relative_to(P/'prior').as_posix() for p in (P/'prior').rglob('*') if p.is_file() and p!=P/'prior/manifest-sha256.json'}==set(prior)
for rel,h in prior.items(): assert sha(safe('prior/'+rel).read_bytes())==h,rel
rows={}; groups={}
for w in read('windows.json'):
 pcs=[]; cursor=w['start']; raw=b''; source=(P/w['asm']).read_text().splitlines()
 for line in source:
  m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)',line)
  assert m,line
  pc=int(m[1],16); code=bytes.fromhex(m[2]); assert len(code) in (8,16)
  assert pc==cursor,(hex(pc),hex(cursor)); assert len(code)==(16 if code[0]==0x18 else 8)
  assert pc not in rows or rows[pc]==code
  rows[pc]=code; pcs.append(pc); cursor+=len(code); raw+=code
 assert cursor==w['end']; assert len(source)==w['lines'][1]-w['lines'][0]+1
 assert raw==(P/w['binary']).read_bytes(); assert sha(raw)==w['sha256']
 groups.setdefault(w['group'],set()).update(pcs)
config=read('cfg.json'); gates={int(k,16):int(v,16) for k,v in config['gates'].items()}
for group,start in config['entries'].items():
 allowed=groups[group]; todo=[start]; seen=set()
 while todo:
  pc=todo.pop()
  if pc in seen: continue
  assert pc in allowed,(group,hex(pc),'outside retained CFG')
  seen.add(pc); raw=rows[pc]; op=raw[0]
  if group=='handler-ordinary' and pc in gates:
   assert op==0x55 and raw[1]==8 and int.from_bytes(raw[4:8],'little')==0
   assert gates[pc]==pc+8
   todo.append(gates[pc]); continue
  if op==0x95: continue
  if op&7==5 and op!=0x85:
   todo.append(pc+8+8*int.from_bytes(raw[2:4],'little',signed=True))
   if op==5: continue
  todo.append(pc+len(raw))
 assert seen==allowed,(group,'unreachable retained instructions',len(allowed-seen))
for e in read('call-edges.json'):
 raw=rows[e['pc']]; assert raw.hex()==e['raw'] and raw[0]==0x85
 imm=int.from_bytes(raw[4:8],'little',signed=True)
 target=e['pc']+8+8*imm if raw[1]==0x10 and imm!=-1 else None
 assert target==e['target']
for w in read('constants.json'):
 d=(P/w['path']).read_bytes(); assert len(d)==w['end']-w['start'] and sha(d)==w['sha256']
# Independent expected targets for admission spine and slice/walk composition.
for pc,target in [(0xacaa0,0x127a0),(0xacae8,0x13b80),(0xacb30,0x13ff0),(0xacb78,0x13938),(0x12840,0x19b4e0),(0xad4c8,0xb0158),(0xae018,0xb3b90),(0xae390,0xb54d0),(0xb3ab0,0x32d8),(0xb5318,0x4238),(0xb6010,0x2e48),(0x21e90,0x18678),(0x185e0,0x6a1e0),(0x6a5d8,0x68918),(0x68948,0x1b55c8),(0x1272f8,0xb61d0)]:
 raw=rows[pc]; assert raw[:2]==b'\x85\x10'; assert pc+8+8*int.from_bytes(raw[4:8],'little',signed=True)==target
assert 0x21338 not in groups['handler-ordinary']
print(json.dumps(dict(status='passed',sealed_files=len(manifest),prior_files=len(prior),new_windows=len(read('windows.json')),cfg_groups=len(config['entries']),instructions=len(rows),semantic_proof=False,full_instruction_admission=False),sort_keys=True))
