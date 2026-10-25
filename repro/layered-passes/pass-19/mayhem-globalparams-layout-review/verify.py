from pathlib import Path
import argparse,json,gzip,hashlib,struct
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args();w=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for rel,h in json.loads((w/'inputs.json').read_text()).items():assert H(a.repo/rel)==h,rel
b=(a.repo/'evidence/original/mayhem/deployed.so').read_bytes();assert hashlib.sha256(b[421840:423672]).hexdigest()=='840b3b5f0ec9f4a2401fbe788c9ae8d0836883d4cb15df6df68650881aaede04'
old=json.loads((a.repo/'repro/mayhem/global-params-remaining-field-review/field-ledger.json').read_text());assert json.loads((w/'original-serializer-row.json').read_text())==next(r for r in old['selected_call_data_ledger']if r.get('kind')=='original'and r.get('label')=='global_serializer')
map=json.loads((w/'member-map.json').read_text());pos=8;assert len(map)==26
for r in map:
 assert r['serialized_offset_including_discriminator']==pos;pos+=r['bytes'];pc=r['source_instruction_pc'];call=r['writer_call_pc'];assert b[pc:pc+8].hex()==r['source_instruction_hex'];op,reg,off,imm=struct.unpack_from('<BBhi',b,call);assert(op,reg)==(0x85,0x10)and call+8+imm*8==r['writer_target']==0x97730
 assert struct.unpack_from('<BBhi',b,call-8)==(0xb7,3,0,r['bytes'])
assert pos==254
ledger=json.loads(gzip.decompress((a.repo/'repro/mayhem/sell-result-error-twentyfour/static/complete-inventory.json.gz').read_bytes()));cb=(a.repo/'repro/mayhem/sell-result-error-twentyfour/build01/artifacts/mayhem_recovered.so').read_bytes()
rows=json.loads((w/'current-codec-rows.json').read_text());assert [r['id'] for r in rows]==['N0173','N0174']
for r in rows:
 assert r==next(x for x in ledger['candidate_rows']if x['id']==r['id']);assert r['scope']=='static_window';assert hashlib.sha256(cb[r['start']:r['end']]).hexdigest()==r['raw_sha256']
s=(a.repo/'programs/mayhem/src/lib.rs').read_text();start=s.index('pub struct GlobalParams {');end=s.index('\n}\n',start)+3;assert (w/'current-GlobalParams.rs').read_text()==s[start:end]
if(w/'manifest.json').exists():
 m=json.loads((w/'manifest.json').read_text());assert set(m)=={str(f.relative_to(w))for f in w.rglob('*')if f.is_file()and f not in[w/'manifest.json',w/'manifest.sha256']}
 for rel,h in m.items():assert H(w/rel)==h,rel
 assert H(w/'manifest.json')==(w/'manifest.sha256').read_text().strip()
print('PASS: admitted original serializer;26 complete member transports; current admitted codecs; source excerpt. No typed restoration or semantic equivalence asserted.')
