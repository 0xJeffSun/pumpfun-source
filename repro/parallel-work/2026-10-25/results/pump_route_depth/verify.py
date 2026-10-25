#!/usr/bin/env python3
"""Offline integrity, byte-edge and saved-receipt verification; executes no SBF."""
from pathlib import Path
import hashlib,json,gzip,struct,re,sys
ROOT=Path(__file__).resolve().parent

def sha(b): return hashlib.sha256(b).hexdigest()
def read(p): return (ROOT/p).read_bytes()
def j(p): return json.loads(read(p))
def receipt_summary():
 out=[]
 for name in ['multi_hop_curve_partial','tokenkeg_two_curve']:
  path='inputs/repro/pump/tokenkeg-two-curve-fortyeight/differential/'+name+'.json.gz'
  d=json.loads(gzip.decompress(read(path))); cases=[]
  for c in d['cases']:
   calls=[]
   for group in c['original']['inner']:
    for ix in group:
     inst=ix['instruction']; data=bytes(inst['data'][1:])
     if data[:8]!=bytes.fromhex('e19a7516d756f667'):continue
     count=int.from_bytes(data[16:20],'little');flags=list(data[20:])
     assert len(flags)==count
     calls.append(dict(amount=int.from_bytes(data[8:16],'little'),flags=flags,account_count=len(inst['accounts'])-1))
   if 'pump_calls' in c['original']:
    assert [x['flags'] for x in calls]==[x['flags'] for x in c['original']['pump_calls']]
   assert not c['mismatches']
   cases.append(dict(case=c['case'],error=c['original']['error'],calls=calls))
  out.append(dict(receipt=path,cases=cases,case_count=len(cases),successes=sum(c['error'] is None for c in cases),pump_cpi_cases=sum(bool(c['calls']) for c in cases),flag_vectors=sorted({tuple(x['flags']) for c in cases for x in c['calls']})))
 return json.loads(json.dumps(out))

def verify():
 manifest=j('manifest-sha256.json')
 actual={str(p.relative_to(ROOT)) for p in ROOT.rglob('*') if p.is_file() and p.name!='manifest-sha256.json'}
 assert actual==set(manifest), 'file set differs'
 for p,h in manifest.items():assert sha(read(p))==h,p
 for p in j('provenance.json'):
  b=read(p['path']);assert len(b)==p['size'];assert sha(b)==p['sha256']
  assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==p['git_blob'],p['path']
 ranges=j('original-ranges.json');edge_count=0
 for p in ranges['ranges']:
  b=read(p['path']); m=j(p['metadata']);assert sha(b)==p['sha256']==m['raw_sha256'];assert len(b)==p['end']-p['start']==m['bytes']
  asm=read(p['metadata'][:-5]+'.asm').decode()
  for line in asm.splitlines():
   address=int(line.split(':',1)[0],16);i=address-p['start'];assert 0<=i<len(b)
   op,regs,off,imm=struct.unpack_from('<BBhi',b,i)
   direct=re.search(r'; direct target (0x[0-9a-f]+)',line)
   branch=re.search(r'; branch (0x[0-9a-f]+)',line)
   if direct:
    assert op==0x85 and address+8+8*imm==int(direct[1],16);edge_count+=1
   if branch:
    assert (op&7) in (5,6) and address+8+8*off==int(branch[1],16);edge_count+=1
  for c in m['direct_calls']:
   op,regs,off,imm=struct.unpack_from('<BBhi',b,c['offset']);assert op==0x85 and p['start']+c['offset']+8+8*imm==c['target']
 for a in j('result.json')['byte_assertions']:
  p=next(p for p in ranges['ranges'] if p['path']==a['window']);b=read(p['path']);i=a['address']-p['start']
  assert list(struct.unpack_from('<BBhi',b,i))==a['instruction'],a
 assert receipt_summary()==j('result.json')['saved_receipts']
 assert all(len(call['flags'])<=2 for s in receipt_summary() for c in s['cases'] for call in c['calls'])
 return dict(status='PASS',files=len(manifest),original_ranges=len(ranges['ranges']),checked_control_edges=edge_count,saved_cases=sum(s['case_count'] for s in receipt_summary()),runtime_executed=False,source_built=False,semantic_equivalence_proved=False)
if __name__=='__main__':
 print(json.dumps(verify(),indent=2))
