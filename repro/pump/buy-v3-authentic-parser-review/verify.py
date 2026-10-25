#!/usr/bin/env python3
"""Offline integrity/byte-evidence checks, never target execution."""
import json,hashlib,re,struct,sys
from pathlib import Path
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
from analyze import analyze
from contracts import contracts
from elf_reader import ELF
H=lambda b:hashlib.sha256(b).hexdigest()
def verify():
 m=json.loads((P/'manifest.json').read_text());assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
 files={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}; assert files==set(m)|{'manifest.json','manifest.sha256'}
 for path,x in m.items():
  p=P/path;assert not p.is_symlink();b=p.read_bytes();assert len(b)==x['size'] and H(b)==x['sha256'],path
 owned=json.loads((P/'owned-map.json').read_text());assert set(owned['files'])==files;assert owned['main_changes']==[]
 for x in json.loads((P/'input-bindings.json').read_text()):assert H((P/x['path']).read_bytes())==x['sha256'],x['path']
 for name in ['finalized','composition','review']:
  assert H((P/f'evidence/{name}-manifest.json').read_bytes())==(P/f'evidence/{name}-manifest.sha256').read_text().split()[0]
 a=analyze();assert a==json.loads((P/'analysis.json').read_text());assert not a['whole_file_equal']
 assert a['identities']['current']['sha256']=='731003570927c206353555d9743d70229234e7e3fa167a5915fa146f3007fc93'
 c=contracts();assert c==json.loads((P/'contracts.json').read_text());assert c['preservation']['count']==117 and c['preservation']['successes']==105
 assert c['preservation']['candidate_sha256']==a['identities']['current']['sha256'];assert all(x['match'] for x in c['preservation']['rows'])
 e=ELF(P/'evidence/original.so'); checked=0
 for d in json.loads((P/'data-contract.json').read_text()):assert e.at(d['address'],d['size']).hex()==d['bytes']
 for path in sorted((P/'evidence').glob('*.asm')):
  n=0
  for line in path.read_text().splitlines():
   mt=re.match(r'^\s*([0-9a-fA-F]{4,16}):\s*((?:[0-9a-fA-F]{2} ){7,15}[0-9a-fA-F]{2}|[0-9a-fA-F]{16,32})\s',line)
   if not mt:continue
   addr=int(mt[1],16);b=bytes.fromhex(mt[2]);assert e.at(addr,len(b))==b,(path.name,hex(addr));n+=1
  assert n,path;checked+=n
 for pc,target in [(0x128808,0x102578),(0x128930,0x147ba0),(0x128978,0x107b38),(0x102738,0x288),(0x102890,0x288),(0x1038f8,0x105b78),(0x105300,0x1a7ff0),(0x107d80,0x6158),(0x147c08,0x3cd50),(0x83ed8,0x8f5c8)]:
  b=e.at(pc,8);assert b[:2]==b'\x85\x10' and pc+8+8*struct.unpack('<i',b[4:])[0]==target
 for addr,b in [(0x1b7dd3,b'Instruction: BuyV3'),(0x1b6f73,b'user_volume_accumulator'),(0x1b7491,b'fee_config')]:assert e.at(addr,len(b))==b
 assert e.at(0x128928,8).hex()=='79a538fe00000000' # flag reload into r5
 assert e.at(0x147ba0,8).hex()=='bf56000000000000' # retain flag in r6
 assert e.at(0x147cf0,8).hex()=='1506020000000000' # conditional flag test
 return dict(status='PASS',scope='static bytes, hashes, calls, inventory and saved receipts; no semantic/runtime certification',owned_files=len(files),assembly_instructions_checked=checked,buy_rows=117,successes=105,main_changes=[],compiled=False,target_executed=False)
if __name__=='__main__':print(json.dumps(verify(),indent=2))
