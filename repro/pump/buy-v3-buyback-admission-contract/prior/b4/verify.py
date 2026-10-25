#!/usr/bin/env python3
"""Offline integrity and static evidence verifier; never runs candidate code."""
from pathlib import Path
import hashlib,json,gzip,re,struct
from analyze import analyze
from elf_reader import ELF
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def main():
 manifest=json.loads((P/'manifest.json').read_text())
 assert (P/'manifest.sha256').read_text().split()[0]==H((P/'manifest.json').read_bytes()),'manifest seal'
 actual={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file()}
 assert actual==set(manifest)|{'manifest.json','manifest.sha256'},'inventory'
 assert not any(x.is_symlink() for x in P.rglob('*')),'symlinks'
 for name,r in manifest.items():
  b=(P/name).read_bytes();assert len(b)==r['size'] and H(b)==r['sha256'],name
 for prefix in ['', 'current-']:
  m=P/('prior/'+prefix+'manifest.json');seal=P/('prior/'+prefix+'manifest.sha256')
  assert seal.read_text().split()[0]==H(m.read_bytes()),str(m)
 old=json.loads((P/'prior/manifest.json').read_text());cur=json.loads((P/'prior/current-manifest.json').read_text())
 # Both source manifests may contain a files wrapper or direct records.
 old=old.get('files',old);cur=cur.get('files',cur)
 for r in json.loads((P/'input-bindings.json').read_text()):
  b=(P/r['path']).read_bytes();assert len(b)==r['size'] and H(b)==r['sha256'],r['path']
  src=r['source'];mark='buy-v3-authentic-partial-composition/';cm='final-error-metadata-fortyeight/'
  index=None;key=None
  if mark in src:index=old;key=src.split(mark)[1]
  elif cm in src:index=cur;key=src.split(cm)[1]
  if index is not None and key not in ('manifest.json','manifest.sha256'):
   item=index[key];sha=item if isinstance(item,str) else item['sha256'];assert sha==H(b),key
 assert analyze()==json.loads((P/'byte-ledger.json').read_text()),'recomputed byte ledger'
 e=ELF(P/'evidence/original.so');count=0
 for f in (P/'evidence').glob('*.asm'):
  n=0
  for line in f.read_text().splitlines():
   m=re.match(r'^\s*([0-9a-f]+):\s*((?:[0-9a-f]{2}\s+){7,15}[0-9a-f]{2})(?:\s|$)',line)
   if m:
    b=bytes.fromhex(m[2]);assert e.at(int(m[1],16),len(b))==b,(str(f),m[1]);n+=1
  assert n,str(f);count+=n
 def branch(pc):
  _,_,off,_=struct.unpack('<BBhi',e.at(pc,8));return pc+8+8*off
 for pc,target in [(0x7f150,0x7f888),(0x14b00,0x14da0),(0x14dc0,0x154a0),(0x15fc0,0x14b08),(0x152f0,0x160a8),(0x16640,0x16b88)]:assert branch(pc)==target,hex(pc)
 assert e.at(0x7f5c0,8).hex()=='7a0a18f000000000','actual create flag'
 ledger=json.loads((P/'prior/preservation-ledger.json').read_text())
 receipt=json.loads(gzip.decompress((P/'evidence/v3_configured_fee.json.gz').read_bytes()))
 rows={i:r for i,r in enumerate(receipt['cases']) if r['case']['operation']=='buy_v3'}
 assert len(rows)==len(ledger['rows'])==117
 assert sum(r['original']['error'] is None for r in rows.values())==105
 for rec in ledger['rows']:
  r=rows[rec['index']];assert rec['case']==r['case'];assert rec['original_error']==r['original']['error']
  assert H(json.dumps(r,sort_keys=True,separators=(',',':')).encode())==rec['saved_row_sha256']
  v=rec['volume_key'];assert r['original']['accounts'][v]==r['candidate']['accounts'][v]
  assert len(bytes.fromhex(r['original']['accounts'][v]['data_hex']))==137
 assert json.loads((P/'result.json').read_text())['full_source_recovered'] is False
 owned=json.loads((P/'owned-map.json').read_text());assert set(owned['files'])==actual
 print(json.dumps(dict(status='PASS',scope='static integrity only',assembly_instructions=count,buy_rows=117,success_requirements=105,proposal_runtime_tests=0)))
if __name__=='__main__':main()
