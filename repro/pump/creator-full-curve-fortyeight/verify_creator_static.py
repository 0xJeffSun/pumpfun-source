from pathlib import Path
import json,re,hashlib,struct,difflib
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def run():
 Q=P/'approved-proposal';o=(P/'static-inputs/original.so').read_bytes();c=(P/'unstripped.so').read_bytes();count=0
 for f in (Q/'evidence').rglob('*.asm'):
  for line in f.read_text().splitlines():
   m=re.match(r'^(\d+):\s+([0-9a-f]+)\s+',line)
   if m:
    pc=int(m[1]);b=bytes.fromhex(m[2]);assert o[pc:pc+len(b)]==b,(f,pc);count+=1
 assert count==6036,count
 for pc,to in [(816584,77896),(823392,77896),(831432,77896),(34224,635208),(230024,1706296)]:
  op,r,off,imm=struct.unpack_from('<BBhi',o,pc);assert op==0x85 and pc+8+imm*8==to
 for pc in [229976,229984,229992,230000]:assert o[pc]==0x7b
 assert o[1797315:1797352]==b'Bonding curve has creator already set'
 assert o[1797352:1797377]==b'Missing metaplex creators'
 diff=''
 for name in ['set_creator.rs','creator_migration.rs']:
  before=(Q/'before'/name).read_text();after=(Q/'source'/name).read_text();diff+=''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump/src/'+name,tofile='b/programs/pump/src/'+name))
 assert diff==(Q/'source.patch').read_text()
 ledger=json.loads(__import__('gzip').decompress((P/'full-candidate-call-data-ledger.json.gz').read_bytes()))
 rows=json.loads((P/'creator-static/current-applications.json').read_text())
 assert len(rows)==3
 for row in rows:
  assert row in ledger
  for line in (P/'creator-static'/str(row['start'])).with_suffix('.asm').read_text().splitlines():
   m=re.match(r'^(\d+):\s+([0-9a-f]+)\s+',line)
   if m:
    pc=int(m[1]);b=bytes.fromhex(m[2]);assert c[pc:pc+len(b)]==b
 return {'original_instruction_rows':count,'candidate_applications':len(rows)}
