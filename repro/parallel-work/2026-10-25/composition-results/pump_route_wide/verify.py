#!/usr/bin/env python3
"""Static seal/byte/CFG verification only. No program execution or fixtures."""
import hashlib,json,pathlib,re,struct
ROOT=pathlib.Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(p):return (ROOT/p).read_bytes()
def obj(p):return json.loads(read(p))
seal=obj('manifest-sha256.json')
actual={p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and p.name!='manifest-sha256.json'}
# The inherited manifest is evidence and is sealed, unlike the root manifest.
actual.add('prior/manifest-sha256.json')
assert actual==set(seal), (actual-set(seal),set(seal)-actual)
for p,h in seal.items():assert sha(read(p))==h,p
prov=obj('provenance.json'); prior=obj('prior/provenance.json'); ps=obj('prior/manifest-sha256.json')
assert sha(read('prior/manifest-sha256.json'))==prov['prior_seal_sha256']
for p in (ROOT/'prior').rglob('*'):
 if p.is_file() and p.name!='manifest-sha256.json':
  n=p.relative_to(ROOT/'prior').as_posix();assert sha(p.read_bytes())==ps[n],n
assert prov['checkpoint']=='517d77db988d8c63b6cf476f0be138c5a4f3128a'
assert prov['objects'][0]['sha256']==prior['original']['sha256']
assert prov['objects'][0]['git_blob']==prior['original']['git_blob']
assert prov['objects'][1]['sha256']==prior['disassembly']['sha256']

def instructions(path):
 out={}
 for line in read(path).decode().splitlines():
  m=re.fullmatch(r'([0-9a-f]+): ((?:[0-9a-f]{2} )*[0-9a-f]{2})  (.*)',line)
  assert m,line
  a=int(m[1],16);b=bytes.fromhex(m[2]);assert a not in out
  assert len(b)==(16 if b[0]==0x18 else 8)
  out[a]=(b,m[3])
 return out
count=0
for prefix,windows in [('',prov['windows']),('prior/',prior['windows'])]:
 for w in windows:
  ap=prefix+'asm/'+w['name']+'.asm';bp=prefix+'bytes/'+w['name']+'.bin'
  if not (ROOT/ap).exists():continue
  raw=read(bp);assert len(raw)==w['end']-w['start'];assert sha(raw)==w['sha256']
  ins=instructions(ap);assert sorted(ins)==w['addresses']
  seen=set();todo=[w['start']];calls=[]
  while todo:
   a=todo.pop()
   if a in seen:continue
   assert a in ins,(w['name'],hex(a));seen.add(a)
   b,t=ins[a];assert raw[a-w['start']:a-w['start']+len(b)]==b
   op=b[0];off=struct.unpack_from('<h',b,2)[0];imm=struct.unpack_from('<i',b,4)[0]
   if op==0x95:continue
   if op==0x85:
    target=a+8+imm*8;calls.append((a,target));assert ('target '+hex(target)) in t
    todo.append(a+8)
   elif op&7 in (5,6):
    target=a+8+off*8;assert ('branch '+hex(target)) in t;todo.append(target)
    if op!=5:todo.append(a+8)
   else:todo.append(a+len(b))
  assert seen==set(ins)
  expected=[(int(c['site'],16),int(c['target'],16)) if isinstance(c['site'],str) else (c['site'],c['target']) for c in w['calls']]
  assert sorted(calls)==sorted(expected)
  if not prefix:assert all(t in {x['start'] for x in prov['windows']} for _,t in calls)
  count+=len(ins)
# Pin decisive ABI and zero-denominator branch opcodes; no input execution.
checks={'mul':{0x1b56b8:'7b73000000000000',0x1b5718:'7b53080000000000'},'div_core':{0x1b4658:'9f29000000000000',0x1b4788:'9f60000000000000',0x1b46f8:'b708000001000000',0x1b4850:'7b91100000000000',0x1b4858:'7b81000000000000',0x1b4860:'7b01180000000000',0x1b4868:'7b21080000000000'}}
for n,cs in checks.items():
 ins=instructions('asm/'+n+'.asm')
 for a,h in cs.items():assert ins[a][0].hex()==h
r=obj('result.json');assert r['source_changes']==[];assert r['runtime_executed'] is False
print(json.dumps({'status':'pass','sealed_files':len(seal),'instruction_records_checked':count,'primitive_instructions':sum(len(w['addresses']) for w in prov['windows']),'checks':['sha256 seal','copied prior subset against inherited seal','caller and primitive bytes','complete local CFG','all primitive transitive call edges','decisive ABI/zero-divisor opcodes'],'limits':['does not execute arithmetic or prove prose','whole ELF rebinding was done at extraction; full ELF not copied','opaque constructors and VM mod64-by-zero remain unclosed']},indent=2))
