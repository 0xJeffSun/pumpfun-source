#!/usr/bin/env python3
"""Portable static evidence verification. Does not execute reconstructed/target code."""
import argparse,difflib,hashlib,json,pathlib,re,struct,subprocess
P=pathlib.Path(__file__).resolve().parent
C='476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40'
def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):return json.loads((P/p).read_text())
def check(x,s):
 if not x:raise SystemExit('FAIL: '+s)
def parse(p):
 rows=[]
 for l in (P/p).read_text().splitlines():
  m=re.match(r'^\s*([0-9a-f]+):\s+((?:[0-9a-f]{2}[ \t]+)+)',l)
  if m:rows.append([int(m[1],16),bytes.fromhex(m[2]).hex()])
 return rows
ap=argparse.ArgumentParser();ap.add_argument('--repo',type=pathlib.Path);args=ap.parse_args()
m=read('manifest-sha256.json');files=set()
for p in P.rglob('*'):
 check(not p.is_symlink(),'symlink')
 if p.is_file() and p.name!='manifest-sha256.json':files.add(p.relative_to(P).as_posix())
check(files==set(m),'exact inventory')
for n,h in m.items():check(sha((P/n).read_bytes())==h,'hash '+n)
seals={'pump_route_source_hypothesis':('prior-seals/hypothesis-manifest.json',read('prior-seals/hypothesis-manifest.json')),'pump_route_source_review':('prior-seals/review-manifest.json',read('prior-seals/review-manifest.json'))}
for r in read('inputs.json'):
 b=(P/r['copy']).read_bytes();check(sha(b)==r['sha256'] and len(b)==r['bytes'],'input '+r['copy'])
 for lo,hi in r['consumed_bytes']:check(0<=lo<=hi<=len(b),'input range')
 origin=r['origin']
 if 'publication' in origin:
  path,seal=seals[origin['publication']];check(sha((P/path).read_bytes())==origin['manifest_sha256'],'seal identity');check(seal[origin['path']]==sha(b),'prior member')
for r in read('source-map.json'):
 b=(P/r['path']).read_bytes();check(sha(b)==r['sha256'] and len(b)==r['bytes'] and len(b.splitlines())==r['lines'],'source map')
before=(P/'sources/before.rs').read_text();after=(P/'sources/corrected.rs').read_text()
patch=''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump/src/multi_hop_curve.rs',tofile='b/programs/pump/src/multi_hop_curve.rs'))
check(patch==(P/'source.patch').read_text(),'exact patch')
check(before==(P/'review/sources/proposed.rs').read_text(),'review proposal identity')
check(after.count('preflight_buyback_recipient(')==2,'one declaration and one call')
start=after.index('        admit_vaults(&h)?;');end=after.index('        let buy =',start);site=after[start:end]
check('if flag & 1 != 0' in site and 'preflight_buyback_recipient' in site and '&h.quote_mint.key(),&a.token_program.key())?;' in site,'pre-direction gated integration')
helper=after[after.index('fn preflight_buyback_recipient('):after.index('// N01:')]
need=['require_keys_eq!(*recipient.owner','try_borrow_data()?','TokenAccount::try_deserialize','require_keys_eq!(token.mint','require_keys_neq!(authority','buyback_fee_recipients.contains','get_associated_token_address_with_program_id','require_keys_eq!(*recipient.key','Ok(())']
pos=[helper.index(s) for s in need];check(pos==sorted(pos),'source check ordering')
allrows={};ranges=read('ranges.json')
for r in ranges['assemblies']:
 actual=parse(r['path']);check(actual==r['instructions'],'instruction ledger '+r['path'])
 for pc,h in actual:
  if pc in allrows:check(allrows[pc]==h,'overlap bytes')
  allrows[pc]=h
for pc,h in ranges['data']:check(len(bytes.fromhex(h))>0,'data slice')
for r in ranges['cfg']:
 ledger=read(r);rows={pc:bytes.fromhex(h) for pc,h in ledger['instructions']};seen=set();todo=[int(ledger['entry'],16)];calls=[]
 while todo:
  pc=todo.pop()
  if pc in seen:continue
  check(pc in rows,'CFG missing '+hex(pc));seen.add(pc);b=rows[pc];check(allrows[pc]==b.hex(),'CFG byte')
  op=b[0];off=struct.unpack_from('<h',b,2)[0];imm=struct.unpack_from('<i',b,4)[0]
  if op==0x95:continue
  if op==0x85:calls.append({'site':hex(pc),'target':hex(pc+8+imm*8),'registers':b[1]})
  if op&7 in (5,6) and op not in (0x85,0x95):
   todo.append(pc+8+off*8)
   if op==5:continue
  todo.append(pc+len(b))
 check(seen==set(rows),'complete CFG inventory '+r);check(calls==ledger['calls'],'relative calls '+r)
def branch(pc):return pc+8+struct.unpack_from('<h',bytes.fromhex(allrows[pc]),2)[0]*8
def call(pc):return pc+8+struct.unpack_from('<i',bytes.fromhex(allrows[pc]),4)[0]*8
for pc,dest in [(0x5c498,0x5c5c8),(0x5c5b8,0x5cc50),(0x5cc58,0x5c1f0),(0x7e500,0x7e838),(0x7e900,0x7ecc0),(0x7ed88,0x7ed98),(0x7ee58,0x7f000)]:check(branch(pc)==dest,'branch '+hex(pc))
check(call(0x5c5a8)==0x7e490 and call(0x7ed78)==0x98438,'application calls')
for pc,code in [(0x7e718,6010),(0x7eba8,6004),(0x7eee8,2006),(0x98900,6062),(0x98a88,6057)]:check(struct.unpack_from('<I',bytes.fromhex(allrows[pc]),4)[0]==code,'error code')
rel=read('evidence/memcmp-relocation.json');check(bytes.fromhex(rel['name_hex'])==b'sol_memcmp_\0' and rel['instruction']==0x1b3690,'relocated syscall')
check(struct.unpack_from('<Q',bytes.fromhex(rel['relocation_hex']))[0]==rel['instruction'],'relocation address')
for r in read('evidence/data.json'):check(int.from_bytes(bytes.fromhex(r['hex']),'little')==r['u32'],'error enum literal')
if args.repo:
 def git(spec):return subprocess.check_output(['git','-C',str(args.repo),'show',spec])
 originals={r['path']:git(r['checkpoint']+':'+r['path']) for r in read('original-inputs.json')}
 for r in read('original-inputs.json'):check(sha(originals[r['path']])==r['sha256'],'whole original '+r['path'])
 elf=originals['evidence/original/pump/deployed.so']
 for pc,h in list(allrows.items())+ranges['data']:
  b=bytes.fromhex(h);check(elf[pc:pc+len(b)]==b,'original slice '+hex(pc))
 for r in read('inputs.json'):
  o=r['origin']
  if 'path' in o and 'checkpoint' in o:
   raw=git(o['checkpoint']+':'+o['path']);expected=(P/r['copy']).read_bytes()
   if 'whole_sha256' in o:
    check(sha(raw)==o['whole_sha256'],'whole source');lo,hi=o['consumed_source_bytes'];raw=raw[lo:hi]
   check(raw==expected,'frozen source '+r['copy'])
 cs=read('evidence/route-callsites.json');lo,hi=cs['scanned_interval'];found=[]
 # Scan actual instruction addresses from the frozen assembly, respecting lddw width.
 asm=originals['repro/function-inventory/2026-10-24-374fcf0/work/disassembly/pump.asm'].decode()
 for l in asm.splitlines():
  m=re.match(r'^\s*([0-9a-f]+):\s+((?:[0-9a-f]{2}[ \t]+)+)',l)
  if not m:continue
  pc=int(m[1],16);b=bytes.fromhex(m[2])
  if lo<=pc<hi and b[:2]==b'\x85\x10':
   target=pc+8+struct.unpack_from('<i',b,4)[0]*8
   if target==cs['target']:found.append([pc,b.hex(),target])
 check(found==cs['calls'],'all admitted body callsites')
print(json.dumps({'status':'PASS','files':len(files),'unique_instructions':len(allrows),'complete_local_cfgs':len(ranges['cfg']),'repository_rebound':bool(args.repo),'target_execution':False},sort_keys=True))
