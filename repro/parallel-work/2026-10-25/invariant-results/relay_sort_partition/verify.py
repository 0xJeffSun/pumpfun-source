#!/usr/bin/env python3
"""Location-independent static evidence verification. Does not execute target code."""
from pathlib import Path
import hashlib,json,re,struct
ROOT=Path(__file__).resolve().parent

def sha(b): return hashlib.sha256(b).hexdigest()
def main():
 manifest=json.loads((ROOT/'manifest-sha256.json').read_text())
 actual={p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and p!=ROOT/'manifest-sha256.json'}
 assert actual==set(manifest), 'file-set mismatch'
 assert not any(p.is_symlink() for p in ROOT.rglob('*')), 'symlink'
 for name,digest in manifest.items(): assert sha((ROOT/name).read_bytes())==digest,name
 prov=json.loads((ROOT/'provenance.json').read_text())
 prior=json.loads((ROOT/'evidence/prior/manifest-sha256.json').read_text())
 frozen=0; prior_count=0
 for row in prov['inputs']:
  b=(ROOT/row['path']).read_bytes()
  assert len(b)==row['size'] and sha(b)==row['sha256'],row['path']
  if row['git_blob']:
   assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==row['git_blob'],row['path']
   frozen+=1
  if row['seal_key']:
   assert sha(b)==prior[row['seal_key']],row['path'];prior_count+=1
 elf=(ROOT/'evidence/frozen/inputs/deployed.so').read_bytes()
 insns=0
 for p in (ROOT/'evidence/frozen/disassembly').glob('*.txt'):
  last=None
  for line in p.read_text().splitlines():
   m=re.fullmatch(r'(\d+): ([0-9a-f]+)\s+(.+)',line);assert m,line
   a=int(m[1]);b=bytes.fromhex(m[2]);assert len(b) in (8,16)
   assert elf[a:a+len(b)]==b,(p.name,a)
   if last is not None: assert last==a,(p.name,a)
   last=a+len(b);insns+=1
   c=re.fullmatch(r'call (\d+)',m[3])
   if c and b[0]==0x85 and b[1]==0x10:
    assert a+8+8*struct.unpack_from('<i',b,4)[0]==int(c[1])
   j=re.search(r'-> (\d+)$',m[3])
   if j: assert a+8+8*struct.unpack_from('<h',b,2)[0]==int(j[1])
   g=re.fullmatch(r'goto (\d+)',m[3])
   if g: assert a+8+8*struct.unpack_from('<h',b,2)[0]==int(g[1])
 result=json.loads((ROOT/'result.json').read_text())
 for r in result['ledger']+result['additional_witnesses']:
  assert r['start']<r['end'] and r['start']%8==r['end']%8==0
  assert sha(elf[r['start']:r['end']])==r['sha256']
 for r in result['calls']:
  a=r['offset'];assert elf[a:a+2]==bytes([0x85,0x10])
  assert a+8+8*struct.unpack_from('<i',elf,a+4)[0]==r['target']
 print(json.dumps({'status':'PASS','sealed_files':len(manifest),'frozen_blob_identities':frozen,'copied_prior_seal_members':prior_count,'listing_instructions_bound_to_elf':insns,'ledger_ranges':len(result['ledger']),'additional_ranges':len(result['additional_witnesses']),'proof_checked':False,'target_executed':False},sort_keys=True))
if __name__=='__main__': main()
