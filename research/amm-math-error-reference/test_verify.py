"""Falsify address-masked data and actual transaction evidence in memory only."""
from pathlib import Path
import base64,copy,gzip,json,struct,unittest
import proof,verify
P=Path(__file__).resolve().parent;R=P.parents[1]
class RejectCorruption(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.original=(R/'evidence/original/pump_amm/deployed.so').read_bytes()
  cls.candidate=gzip.decompress((P/'public/c726/unstripped.so.gz').read_bytes())
  cls.report=json.loads(gzip.decompress((P/'report.json.gz').read_bytes()))['static']['c726']
 def mutate(self,address,data):
  image=bytearray(self.candidate)
  s=next(s for s in proof.w.m.elf_layout(bytes(image))['sections']if s['type']!=8 and s['address']<=address and address+len(data)<=s['address']+s['size'])
  off=s['offset']+address-s['address'];image[off:off+len(data)]=data
  return bytes(image)
 def ref(self,offset):return next(r['candidate']for r in self.report['typed_references']if r['offset']==offset)
 def test_filename_same_length(self):
  with self.assertRaisesRegex(AssertionError,'actual string referent'):proof.compare(self.original,self.mutate(self.ref(784),b'X'))
 def test_error_discriminant(self):
  with self.assertRaisesRegex(AssertionError,'error discriminant'):proof.compare(self.original,self.mutate(self.ref(432),struct.pack('<I',24)))
 def test_panic_location(self):
  with self.assertRaisesRegex(AssertionError,'panic Location'):proof.compare(self.original,self.mutate(self.ref(664)+16,struct.pack('<I',1)))
 def test_vtable_actual_target(self):
  with self.assertRaisesRegex(AssertionError,'vtable method body'):proof.compare(self.original,self.mutate(self.ref(280)+24,struct.pack('<Q',self.report['roots'][0][1]<<32)))
 def test_loaded_candidate_relabel(self):
  row=json.loads(gzip.decompress((P/'runtime/observed.jsonl.gz').read_bytes()).splitlines()[3])
  with self.assertRaisesRegex(AssertionError,'loaded AMM artifact'):verify.signed(row,'0'*64)
 def test_signed_transaction(self):
  row=json.loads(gzip.decompress((P/'runtime/observed.jsonl.gz').read_bytes()).splitlines()[0]);data=bytearray(base64.b64decode(row['transaction_base64']));data[1]^=1;row['transaction_base64']=base64.b64encode(data).decode()
  with self.assertRaisesRegex(AssertionError,'valid transaction signatures'):verify.signed(row,row['amm_sha256'])
if __name__=='__main__':unittest.main()
