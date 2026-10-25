#!/usr/bin/env python3
"""Offline static evidence verifier; never executes or simulates target code."""
from pathlib import Path
import hashlib,json,re,struct
P=Path(__file__).resolve().parent
def sha(b):return hashlib.sha256(b).hexdigest()
def cfg(b,a,z):
 out=[];pc=a
 while pc<z:
  op,regs,off,imm=struct.unpack_from('<BBhi',b,pc);n=16 if op==24 else 8
  row=dict(pc=pc,raw=b[pc:pc+n].hex(),op=op,dst=regs&15,src=regs>>4,offset=off,immediate=imm)
  if op==149:row['successors']=[]
  elif op==133:row.update(successors=[pc+n],call_target=pc+8+imm*8 if regs>>4==1 else 'external_relocation')
  elif op&7 in (5,6):row['successors']=[pc+8+off*8]+([] if op&240==0 else [pc+n])
  else:row['successors']=[pc+n]
  if op&7 in (1,2,3):row['memory']=dict(kind='load' if op&7==1 else 'store',base=regs>>4 if op&7==1 else regs&15,offset=off,width={0:4,8:2,16:1,24:8}[op&24])
  out.append(row);pc+=n
 assert pc==z
 return out
def main():
 manifest=json.loads((P/'manifest-sha256.json').read_text())
 actual={str(x.relative_to(P)):sha(x.read_bytes()) for x in P.rglob('*') if x.is_file() and x.name!='manifest-sha256.json'}
 # Nested prior seal is itself part of this seal.
 actual['evidence/prior/manifest-sha256.json']=sha((P/'evidence/prior/manifest-sha256.json').read_bytes())
 assert actual==manifest,'file set/hash mismatch'
 provenance=json.loads((P/'provenance.json').read_text())
 for ent in provenance['inputs']:
  b=(P/ent['path']).read_bytes();assert sha(b)==ent['sha256'] and len(b)==ent['size']
  if ent['git_blob']:assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==ent['git_blob']
 prior=json.loads((P/'evidence/prior/manifest-sha256.json').read_text())
 for name in ['REPORT.md','result.json','provenance.json','fragment.txt']:
  assert sha((P/'evidence/prior'/name).read_bytes())==prior[name]
 for x in (P/'evidence/frozen').rglob('*'):
  if x.is_file():assert sha(x.read_bytes())==prior['evidence/frozen/'+str(x.relative_to(P/'evidence/frozen'))]
 elf=(P/'evidence/frozen/inputs/deployed.so').read_bytes()
 line_count=0
 for listing in (P/'evidence/frozen/disassembly').glob('*.txt'):
  last=None
  for line in listing.read_text().splitlines():
   m=re.match(r'^(\d+): ([0-9a-f]+)\s+',line);assert m
   pc=int(m[1]);raw=bytes.fromhex(m[2]);assert elf[pc:pc+len(raw)]==raw
   if last is not None:assert pc==last
   last=pc+len(raw);line_count+=1
 ledger=json.loads((P/'ledger.json').read_text())
 assert ledger['instructions']==cfg(elf,44800,49768)
 for row in ledger['claims']:
  for r in row['ranges']:assert sha(elf[r['start']:r['end']])==r['sha256'] and elf[r['start']:r['end']].hex()==r['raw_hex']
 for pc,op in ledger['opcode_anchors']:assert elf[pc]==op
 for group in ledger['record_moves']:
  loads=[];stores=[]
  for pc in group['loads']:
   op,rr,off,imm=struct.unpack_from('<BBhi',elf,pc);assert op==0x79;loads.append((rr>>4,off))
  for pc in group['stores']:
   op,rr,off,imm=struct.unpack_from('<BBhi',elf,pc);assert op==0x7b;stores.append((rr&15,off))
  assert loads==[tuple(x) for x in group['load_operands']]
  assert stores==[tuple(x) for x in group['store_operands']]
 algebra=json.loads((P/'algebra.json').read_text())
 for eq in algebra['identities']:
  total={}
  for term in eq['lhs_terms']:
   for v,c in term.items():total[v]=total.get(v,0)+c
  assert {k:v for k,v in total.items() if v}=={k:v for k,v in eq['rhs'].items() if v},eq['id']
 print(json.dumps(dict(status='PASS',scope='static bytes/CFG/move operands/symbolic linear identities; manual induction not machine-certified',files=len(manifest),listing_instructions=line_count,leaf_instructions=len(ledger['instructions']),claims=len(ledger['claims']),algebraic_identities=len(algebra['identities']),target_executed=False),indent=2))
if __name__=='__main__':main()
