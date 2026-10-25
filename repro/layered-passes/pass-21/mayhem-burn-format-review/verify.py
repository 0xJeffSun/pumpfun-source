from pathlib import Path
import argparse,json,hashlib,gzip,struct
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args();w=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n,h in json.loads((w/'inputs.json').read_text()).items():assert H(a.repo/n)==h,n
j=json.loads((w/'current-rows.json').read_text());prior=json.loads((a.repo/'repro/mayhem/burn-formatting-gap-review/selection-ledger.json').read_text());b=(a.repo/'repro/mayhem/sell-result-error-twentyfour/build01/artifacts/mayhem_recovered.so').read_bytes();o=(a.repo/'evidence/original/mayhem/deployed.so').read_bytes()
assert H(a.repo/'repro/mayhem/sell-result-error-twentyfour/build01/artifacts/mayhem_recovered.so')=='7d416f848f03e46d9a514f4c505a8e903cdb908f52280bb961254eed90aebe1f'
ledger=json.loads(gzip.decompress((a.repo/'repro/mayhem/sell-result-error-twentyfour/static/complete-inventory.json.gz').read_bytes()))
for side,blob in [('original',o),('candidate',b)]:
 for r in j[side]:
  assert r==next(x for x in ledger[side+'_rows']if x['id']==r['id']);assert r['scope']=='static_window';assert hashlib.sha256(blob[r['start']:r['end']]).hexdigest()==r['raw_sha256']
helper=next(r for r in j['candidate']if r['id']=='N0051');assert helper['body_analysis']['normalized_sha256']==prior['candidate_helper']['body_analysis']['normalized_sha256']
for r in prior['new_witnesses']:
 if r['side']=='original':assert o[r['pc']:r['pc']+8].hex()==r['raw_hex'];continue
 pc=r['pc'];base=63776 if 63776<=pc<69792 else 42160;curbase=64000 if base==63776 else 42384;np=curbase+pc-base;assert b[np]==bytes.fromhex(r['raw_hex'])[0]
 if b[np]!=0x85:assert b[np:np+8].hex()==r['raw_hex']
 else:
  oldtarget=pc+8+struct.unpack_from('<i',bytes.fromhex(r['raw_hex']),4)[0]*8
  assert np+8+struct.unpack_from('<i',b,np+4)[0]*8==oldtarget+224
assert(w/'burn.rs').read_bytes()==(a.repo/'programs/mayhem/src/instructions/burn.rs').read_bytes()
if(w/'manifest.json').exists():
 m=json.loads((w/'manifest.json').read_text());assert set(m)=={str(f.relative_to(w))for f in w.rglob('*')if f.is_file()and f not in[w/'manifest.json',w/'manifest.sha256']}
 for n,h in m.items():assert H(w/n)==h,n
 assert H(w/'manifest.json')==(w/'manifest.sha256').read_text().strip()
print('PASS: admitted Burn original/current rows and formatting witnesses rebound to7d416f84; no source correction established.')
