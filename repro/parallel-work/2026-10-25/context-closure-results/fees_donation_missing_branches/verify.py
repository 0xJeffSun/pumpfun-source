#!/usr/bin/env python3
"""Offline bounded evidence verification; never executes SBF or builds source."""
import hashlib,json,struct
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def read(p):return (P/p).read_bytes()
def js(p):return json.loads(read(p))
def main():
 seal=js('manifest-sha256.json')
 actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p.name!='manifest-sha256.json'}
 # Nested inherited manifests are payload; only our root manifest is excluded.
 actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p!=P/'manifest-sha256.json'}
 assert actual==set(seal),'inventory mismatch'
 for name,digest in seal.items():
  assert not (P/name).is_symlink();assert H(read(name))==digest,name
 prior=js('inputs/approved/manifest-sha256.json')
 for p in (P/'inputs/approved').iterdir():
  if p.name!='manifest-sha256.json':assert H(p.read_bytes())==prior[p.name],p.name
 wide=js('inputs/pump_route_wide/manifest-sha256.json')
 for n in ['REPORT.md','CONTRACTS.md']:assert H(read('inputs/pump_route_wide/'+n))==wide[n]
 prov=js('provenance.json'); assert prov['source_commit']=='4d3c19e3c58427f3604caede144b3322fa56d2b5'
 for x in prov['sources']:
  z=read(x['file']);assert H(z)==x['sha256'];assert len(z)==x['end_byte_exclusive']-x['start_byte']
 for x in prov['ranges']:
  z=read(x['file']);assert H(z)==x['sha256'];assert len(z)==x['end_exclusive']-x['start']
 ledger=js('inputs/approved/instruction-ledger.json'); checked=0
 for pair in ledger.values():
  for rows in pair.values():
   for i,row in enumerate(rows):
    z=bytes.fromhex(row['raw']);pc=row['pc'];op,regs,off,imm=struct.unpack('<BBhi',z[:8]); assert (op,regs&15,regs>>4,off,imm)==(row['opcode'],row['dst'],row['src'],row['offset_signed'],row['immediate_signed']);assert len(z)==row['size']
    if i+1<len(rows):assert pc+len(z)==rows[i+1]['pc']
    if 'direct_target' in row:assert pc+8+8*imm==row['direct_target']
    if 'branch_target' in row:assert pc+8+8*off==row['branch_target']
    checked+=1
 handler=read('inputs/bytes/handler.bin');rows=ledger['handler']['original'];by_pc={r['pc']:r for r in rows}
 for r in rows: assert handler[r['pc']-163920:r['pc']-163920+r['size']].hex()==r['raw']
 calls=js('calls.json'); assert len(calls)==80;assert sum(x['target'] is not None for x in calls)==77
 for c in calls:
  r=by_pc[c['pc']];assert c['raw']==r['raw'];assert c['target']==r.get('direct_target');assert c['relocation']==r.get('relocation')
  if c['target'] is not None:assert c['admission']['original_start']==c['target']
 def norm(z,start,rs):
  out=bytearray(z);rel={r['at']-start:r['type'] for r in rs}
  for i in range(0,len(z),8):
   if z[i:i+2]==b'\x85\x10' and rel.get(i)!=10:out[i+4:i+8]=bytes(4)
   if rel.get(i)==8 and z[i]==24:out[i+4:i+8]=bytes(4);out[i+12:i+16]=bytes(4)
   elif rel.get(i)==10 and z[i]==133:out[i+4:i+8]=bytes(4)
  return bytes(out)
 helpers=js('helper-windows.json');match_count=0
 mapping={x['original_start']:x for x in js('inputs/approved/analysis.json')['direct_body_mapping']}
 for h in helpers:
  z=read(h['original_file']);m=mapping[h['target']];assert H(z)==m['original_raw_sha256'];nz=norm(z,h['target'],h['relocations']);assert H(nz)==m['original_normalized_sha256']
  for v in h['matches']:
   assert nz==norm(read(v['file']),v['start'],v['relocations']);match_count+=1
 assert len(helpers)==25
 results=js('results.json')
 for c in results['anchors']:
  r=by_pc[c['pc']]
  for k,v in c['expect'].items():assert r[k]==v,(c['pc'],k)
 data={r['label']:r for r in js('inputs/exact-data.json')}
 for d in data.values():assert H(bytes.fromhex(d['hex']))==d['sha256'];assert len(bytes.fromhex(d['hex']))==d['end_exclusive']-d['start']
 assert bytes.fromhex(data['existing_log']['hex'])==b'donation_fee_pda already exists'
 assert bytes.fromhex(data['disabled_log']['hex'])==b'CreateDonationFeePda is currently disabled'
 assert hashlib.sha256(b'event:DonationFeePdaCreated').digest()[:8].hex()=='5e1489ef234de1eb'
 # Native mint identity from the actual four LDDW immediates, decoded without libraries.
 def lddw(pc):
  z=bytes.fromhex(by_pc[pc]['raw']);return z[4:8]+z[12:16]
 native=lddw(165696)+lddw(165672)+lddw(165648)+lddw(165624)
 alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';n=int.from_bytes(native,'big');s=''
 while n:s=alphabet[n%58]+s;n//=58
 assert s=='So11111111111111111111111111111111111111112'
 # Exact extension input-byte union, including unaligned reconstruction.
 ext=[(0x59,8),(0x61,1),(0x53,4),(0x57,2),(0x62,8),(0x72,1),(0x6a,8)]
 assert set().union(*(set(range(a,a+n)) for a,n in ext))==set(range(83,115))
 print(json.dumps({'status':'PASS','payload_files':len(seal),'decoded_instructions_checked':checked,'handler_calls':len(calls),'helper_targets':len(helpers),'normalized_candidate_matches':match_count,'semantic_scope':'static anchors and seals; manual dataflow/prose not machine proved; no runtime'},sort_keys=True))
if __name__=='__main__':main()
