"""Verify the source-coordinate recovery without compiling or running a VM."""
from pathlib import Path
import base64,gzip,hashlib,json,sys,tarfile
from solders.transaction import VersionedTransaction
p=Path(__file__).resolve().parent;root=p.parents[2];h=lambda b:hashlib.sha256(b).hexdigest()
manifest=json.loads((p/'manifest.json').read_text())
for n,d in manifest.items():assert h((p/n).read_bytes())==d,n
for n,d in json.loads((p/'harness-references.json').read_text()).items():assert h((root/n).read_bytes())==d,n
inputs=json.loads((p/'patch-source-inputs.json').read_text());assert len(inputs['patched'])==18
with tarfile.open(p/'source-snapshot.tar.gz') as tf:
 sources={m.name:tf.extractfile(m).read() for m in tf if m.isfile()}
assert {n:h(b) for n,b in sources.items()}==inputs['patched']
sys.path.insert(0,str(root/'repro/pump_fees/framework-matching'));from elf_reader import Elf
o=Elf(root/'evidence/dependencies/token_metadata/deployed.so');c=Elf(p/'candidate.so');b=Elf(root/'repro/pump/metaplex-candidate-build-11/token_metadata.so')
report=json.loads((p/'comparison.json').read_text());assert h(o.b)==report['binary_hashes']['original'] and h(c.b)==report['binary_hashes']['candidate']
assert h(b.b)==report['binary_hashes']['baseline'];assert len(c.b)==707448 and len(o.b)==793991
assert (p/'allocation-image.so').read_bytes()==c.b+bytes(86543);assert not any(o.b[707448:])
assert o.entries==c.entries==b.entries and len(o.entries)==1251
bad=[]
for i,(a,z) in enumerate(zip(o.entries,o.entries[1:]+[o.hi])):
 if i!=346:assert b.b[a:z]==c.b[a:z]
 if o.b[a:z]!=c.b[a:z]:bad.append(i)
 else:assert o.pattern(a,z-a)==c.pattern(a,z-a) and o.callsites(a,z-a)==c.callsites(a,z-a)
assert bad==[346]
for name in o.secs:
 if name in ['', '.text','.rel.dyn']:continue
 os=o.secs[name];cs=c.secs[name];assert os[4:6]==cs[4:6];assert o.b[os[4]:os[4]+os[5]]==c.b[cs[4]:cs[4]+cs[5]],name
rawdiff=[i for i,(x,y) in enumerate(zip(o.b,(p/'allocation-image.so').read_bytes())) if x!=y]
assert len(rawdiff)==80 and report['differing_payload_positions']==80 and not report['whole_file_equal']
lo,hi=o.entries[346],o.entries[347];rs=o.secs['.rel.dyn'];assert sum(lo<=i<hi for i in rawdiff)==79;assert sum(rs[4]<=i<rs[4]+rs[5] for i in rawdiff)==1
assert len(json.loads((p/'source-location-comparison.json').read_text()))==29
assert all(r['equal'] for r in json.loads((p/'source-location-comparison.json').read_text()))
cases=transactions=0
for name in ['edition','uses','burn','context','validation']:
 data=json.loads(gzip.decompress((p/(name+'-validation.json.gz')).read_bytes()));assert data['candidate_sha256']==h(c.b) and not data['mismatches'];assert data['case_count']==len(data['cases'])
 for row in data['cases']:
  left,right=row['original'],row['candidate'];assert left['error']==right['error'] and left['after']==right['after'];key='inner_instructions' if 'inner_instructions' in left else 'inner';assert left[key]==right[key]
  for result in [left,right]:assert all(VersionedTransaction.from_bytes(base64.b64decode(result['transaction_base64'])).verify_with_results());transactions+=1
  cases+=1
assert cases==135 and transactions==270
data=json.loads(gzip.decompress((p/'utilize-validation.json.gz').read_bytes()))
assert data['binary_sha256']['candidate']==h(c.b) and data['binary_sha256']['original']==h(o.b)
from solders.pubkey import Pubkey
mint=Pubkey(bytes([182])*32);token=Pubkey(bytes([183])*32);program=Pubkey.from_string('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');metadata=Pubkey.find_program_address([b'metadata',bytes(program),bytes(mint)],program)[0]
import struct
def read_uses(hex_data):
 raw=bytes.fromhex(hex_data);offset=65
 for _ in range(3):size=struct.unpack_from('<I',raw,offset)[0];offset+=4+size
 offset+=2;tag=raw[offset];offset+=1
 if tag:size=struct.unpack_from('<I',raw,offset)[0];offset+=4+34*size
 offset+=2
 for size in [1,1,33]:
  tag=raw[offset];offset+=1
  if tag:offset+=size
 assert raw[offset]==1
 return struct.unpack_from('<BQQ',raw,offset+1)
for row in data['cases']:
 left,right=row['results']['original'],row['results']['candidate'];case=row['case']
 assert all(left[k]==right[k] for k in ['error','after','inner']) and not row['mismatches']
 for result in [left,right]:
  assert all(VersionedTransaction.from_bytes(base64.b64decode(result['transaction_base64'])).verify_with_results());transactions+=1
  assert any('IX: Use/Utilize Token' in line for line in result['logs'])
  assert (result['error'] is None)==case['success']
  if case['success']:
   assert read_uses(result['after'][str(metadata)]['data_hex'])==(case['method'],case['remaining']-case['count'],case['total'])
   expected=0 if case['method']==0 and case['remaining']==case['count'] else 1
   assert struct.unpack_from('<Q',bytes.fromhex(result['after'][str(mint)]['data_hex']),36)[0]==expected
   assert struct.unpack_from('<Q',bytes.fromhex(result['after'][str(token)]['data_hex']),64)[0]==expected
  else:
   assert 'InstructionErrorCustom(86)' in result['error']
   for key in [mint,token,metadata]:assert result['before'][str(key)]==result['after'][str(key)]
 cases+=1
assert cases==147 and transactions==294
print(json.dumps({'raw_equal_function_windows':1250,'total_windows':1251,'read_only_data_bytes_equal':12752,'remaining_different_bytes':80,'runtime_cases':cases,'verified_transactions':transactions,'whole_file_equal':False},indent=2))
