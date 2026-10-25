#!/usr/bin/env python3
"""Offline evidence checks only. No SBF execution, fixtures, network or Git needed."""
import hashlib,json,pathlib,re,struct
R=pathlib.Path(__file__).resolve().parent
def sha(b):return hashlib.sha256(b).hexdigest()
def blob(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def read(p):return (R/p).read_bytes()
def obj(p):return json.loads(read(p))
def check(ok,msg):
 if not ok:raise SystemExit('FAIL: '+msg)
m=obj('manifest-sha256.json');actual={p.relative_to(R).as_posix() for p in R.rglob('*') if p.is_file() and p.name!='manifest-sha256.json'}
# Only the root seal is excluded, not predecessor manifests.
actual={p.relative_to(R).as_posix() for p in R.rglob('*') if p.is_file() and p!=R/'manifest-sha256.json'}
check(actual==set(m),'exact inventory')
for p,h in m.items():check(sha(read(p))==h,'seal '+p)
d=obj('provenance.json');ins={};count=0
for w in d['windows']:
 name=w['name'];b=read('evidence/'+name+'.bin');check(len(b)==w['end']-w['start'],'window length '+name);check(sha(b)==w['sha256'],'window hash '+name)
 covered=set()
 for line in read('evidence/'+name+'.asm').decode().splitlines():
  mt=re.match(r'^\s*([0-9a-f]+):\s*((?:[0-9a-f]{2}\s+)+)\s*(.*)$',line);check(mt is not None,'asm format '+name)
  a=int(mt[1],16);raw=bytes.fromhex(mt[2]);check(len(raw) in (8,16),'instruction length');check(b[a-w['start']:a-w['start']+len(raw)]==raw,'raw encoding '+hex(a));covered.update(range(a,a+len(raw)))
  if a in ins:check(ins[a]==raw,'overlapping encoding '+hex(a))
  ins[a]=raw;count+=1
 check(covered==set(range(w['start'],w['end'])),'complete excerpt encoding '+name)
for x in d['copied']:
 b=read(x['local']);check(sha(b)==x['sha256'] and blob(b)==x['git_blob'],'copied provenance '+x['local'])
 if not x['local'].endswith('manifest-sha256.json'):
  pp=pathlib.PurePosixPath(x['local']);seal=obj(str(pp.parent/'manifest-sha256.json'));check(seal[pp.name]==sha(b),'predecessor seal '+str(pp))
for x in d['data']:check(len(read(x['path']))==x['end']-x['start'] and sha(read(x['path']))==x['sha256'],'data '+x['path'])
s=d['source_excerpt'];check(sha(read(s['local']))==s['sha256'],'source excerpt')
r=obj('results.json')
for e in r['direct_edges']:
 a=int(e['site'],16);raw=ins[a];op,regs,off,imm=struct.unpack('<BBhi',raw[:8]);check(op==0x85 and regs==0x10,'direct call opcode');check(a+8+8*imm==int(e['target'],16),'direct target '+e['site'])
for e in r['opcode_assertions']:
 check(ins[int(e['address'],16)].hex()==e['bytes'],'ABI opcode '+e['address'])
alpha='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
def b58(b):
 n=int.from_bytes(b,'big');s=''
 while n:n,v=divmod(n,58);s=alpha[v]+s
 return '1'*(len(b)-len(b.lstrip(b'\0')))+s
check(b58(read('evidence/tokenkeg.bin'))=='TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA','Tokenkeg constant')
check(b58(read('evidence/token2022-comparison-only.bin'))=='TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb','comparison constant')
check(read('evidence/bonding-curve.bin')==b'bonding-curve','seed bytes')
h=struct.unpack('<16sHHIQQQIHHHHHH',read('evidence/elf-header.bin'));sec=read('evidence/elf-section-table.bin');ss=[struct.unpack_from('<IIQQQQIIQQ',sec,i*h[11]) for i in range(h[12])]
for rel in obj('relocations.json'):
 parts=rel['parts'];raws=[]
 for p in parts:
  b=read(p['path']);check(sha(b)==p['sha256'] and len(b)==p['end']-p['start'],'relocation slice');raws.append(b)
 off,info=struct.unpack('<QQ',raws[0]);check(off==int(rel['callsite'],16) and (info&0xffffffff)==10,'relocation target/type');check(ins[off]==bytes.fromhex('85100000ffffffff'),'relocated call encoding')
 owner=[s for s in ss if s[1]==9 and s[4]<=parts[0]['start']<s[4]+s[5]];check(len(owner)==1,'relocation section');sy=ss[owner[0][6]];check(sy[4]+(info>>32)*sy[9]==parts[1]['start'],'symbol table linkage');name=struct.unpack_from('<I',raws[1])[0];strings=ss[sy[6]];check(strings[4]+name==parts[2]['start'],'symbol name linkage');check(raws[2]==rel['symbol'].encode()+b'\0','symbol name')
print(json.dumps({'status':'pass','files':len(m),'windows':len(d['windows']),'instruction_rows':count,'direct_edges':len(r['direct_edges']),'scope':'static integrity/encoding/ABI checks; not semantic proof or SBF execution'},sort_keys=True))
