#!/usr/bin/env python3
"""Portable static evidence verification. No target execution or dependency imports."""
import argparse,hashlib,json,re,struct,subprocess
from pathlib import Path
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
blob=lambda b:hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def read(p):return (P/p).read_bytes()
def js(p):return json.loads(read(p))
def check(c,m):
 if not c:raise ValueError(m)
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--repo');a=parser.parse_args()
 seal=js('manifest-sha256.json')
 actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p.name!='manifest-sha256.json'}
 check(actual==set(seal),'inventory mismatch')
 for p,h in seal.items():check(sha(read(p))==h,'hash mismatch: '+p)
 info=js('inputs.json');old=js('prior-seals/route-proposal-manifest.json')
 for x in info['inputs']:
  check(sha(read(x['copy']))==x['copy_sha256'],'input copy mismatch')
  if x['origin']=='frozen-publication':check(old[x['path']]==x['sha256'],'prior seal mismatch')
 # Strict application of the supplied unified patch to exact git-sourced original.
 original=read('sources/programs__pump__src__multi_hop_curve.rs').decode().splitlines(True)
 patch=read('inputs/source.patch').decode().splitlines(True);output=[];pos=0;i=2
 while i<len(patch):
  m=re.match(r'@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@',patch[i]);check(m is not None,'invalid patch hunk')
  start=int(m[1])-1;check(start>=pos,'overlapping patch');output.extend(original[pos:start]);pos=start;i+=1
  old_count=new_count=0
  while i<len(patch) and not patch[i].startswith('@@ '):
   line=patch[i];i+=1
   if line.startswith('\\'):continue
   check(line[:1] in (' ','-','+'),'invalid patch line')
   if line[0] in ' -':
    check(pos<len(original) and original[pos]==line[1:],'patch original mismatch');pos+=1;old_count+=1
   if line[0] in ' +':output.append(line[1:]);new_count+=1
  check(old_count==int(m[2] or 1) and new_count==int(m[4] or 1),'patch count mismatch')
 output.extend(original[pos:]);check(''.join(output).encode()==read('sources/proposed.rs'),'patch proposed mismatch')
 # Parse retained byte columns and bind every saved instruction to its source.
 pattern=re.compile(r'^\s*([0-9a-f]+):\s*((?:[0-9a-f]{2}\s+){8,16})')
 parsed={}
 for p in sorted({r['source'] for r in js('ranges.json')}):
  rows=[]
  for line in read(p).decode().splitlines():
   m=pattern.match(line);check(m is not None,'invalid asm line');rows.append((int(m[1],16),bytes.fromhex(m[2])))
  parsed[p]=rows
 expected={}
 raw={}
 for r in js('ranges.json'):
  off=r['offset'];b=bytes.fromhex(r['hex']);check(len(b) in (8,16),'instruction width')
  expected.setdefault(r['source'],[]).append((off,b))
  if off in raw:check(raw[off]==b,'conflicting original bytes')
  raw[off]=b
 check(parsed==expected,'asm/range mismatch')
 def call(off,target):
  b=raw[off];check(b[:2]==bytes.fromhex('8510'),'not a relative call')
  check(off+8+struct.unpack_from('<i',b,4)[0]*8==target,'wrong call target')
 def branch(off,target,opcode):
  b=raw[off];check(b[0]==opcode,'wrong branch opcode')
  check(off+8+struct.unpack_from('<h',b,2)[0]*8==target,'wrong branch target')
 def exact(off,b):check(raw[off].hex()==b,'decisive instruction mismatch '+hex(off))
 call(0x5c5a8,0x7e490);branch(0x5c498,0x5c5c8,0x15);branch(0x5c5b8,0x5cc50,0x55)
 exact(0x5c488,'5701000001000000');exact(0x5c4a0,'7963380000000000');exact(0x5c5a0,'b704000000000000')
 check(struct.unpack_from('<i',raw[0x5c5b8],4)[0]==2,'preflight success tag')
 call(0x5cdb8,0x89ec8);call(0x5cef8,0x89ec8);call(0x5ce50,0x806c8)
 call(0x5d420,0xa13e0);call(0x5e078,0xa0bf0)
 exact(0xa1cf0,'7b32780000000000');exact(0xa1ff8,'7b32700000000000')
 branch(0x3d2e0,0x3d4b8,0x55)
 call(0x5e030,0x8df98);call(0x5eb68,0x58f58)
 constants=js('constants.json');src=read('sources/proposed.rs').decode()
 for x in constants:
  m=re.search(r'const '+x['name']+r':.*?\[([^\]]+)\]',src)
  check(m is not None,'missing literal')
  check(bytes(map(int,m[1].split(','))).hex()==x['hex'],'quote constant mismatch')
 # Confirm that the reviewed source actually omits an operation at R1's insertion point.
 check('admit_vaults(&h)?;\n        let buy =' in src,'review finding no longer applies')
 # Byte spans are actual union coverage, not broad inferred historical functions.
 spans=[]
 for off,b in sorted(raw.items()):
  end=off+len(b)
  if spans and off<=spans[-1][1]:spans[-1][1]=max(spans[-1][1],end)
  else:spans.append([off,end])
 check(js('consumed-ranges.json')==spans,'coalesced spans mismatch')
 rebound=False
 if a.repo:
  def git(p):return subprocess.check_output(['git','-C',a.repo,'show',info['checkpoint']+':'+p])
  w=info['original'];elf=git(w['path']);check(len(elf)==w['bytes'] and sha(elf)==w['sha256'] and blob(elf)==w['git_blob'],'whole original mismatch')
  for off,b in raw.items():check(elf[off:off+len(b)]==b,'original byte mismatch')
  for x in constants:check(elf[x['offset']:x['offset']+32].hex()==x['hex'],'original literal mismatch')
  for x in info['inputs']:
   if x['origin']!='git':continue
   b=git(x['path']);check(sha(b)==x['sha256'] and blob(b)==x['git_blob'] and len(b)==x['bytes'],'whole source mismatch')
   lo,hi=x['lines'];check(b''.join(b.splitlines(keepends=True)[lo-1:hi])==read(x['copy']),'source range mismatch')
  rebound=True
 print(json.dumps({'ok':True,'files':len(seal),'instruction_records':len(js('ranges.json')),'unique_instructions':len(raw),'whole_git_rebound':rebound,'target_executed':False,'semantics_proved':False,'finding':'R1 missing checked call confirmed'}))
if __name__=='__main__':main()
