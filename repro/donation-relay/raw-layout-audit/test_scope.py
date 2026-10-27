from pathlib import Path
import gzip,importlib.util,json,unittest
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
s=importlib.util.spec_from_file_location('layout_audit',HERE/'analyze.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
class Tests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  p=ROOT/'repro/donation-relay/donation-wrapper-artifact-recovery';meta=json.loads((p/'metadata.json').read_bytes())['variants']['recovered']['artifacts'];cls.original=(ROOT/'evidence/dependencies/donation_relay/deployed.so').read_bytes();cls.candidate=gzip.decompress((p/meta['candidate']['path']).read_bytes());cls.symbols=gzip.decompress((p/meta['symbols']['path']).read_bytes());cls.windows=(ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json').read_bytes()
 def test_non_address_instruction_change_rejected(self):
  a=bytearray(self.candidate);b=bytearray(self.symbols);a[288]^=1;b[288]^=1
  with self.assertRaises(AssertionError):m.audit_images(self.original,bytes(a),bytes(b),self.windows)
 def test_unexplained_header_change_rejected(self):
  a=bytearray(self.candidate);a[48]^=1
  with self.assertRaises(AssertionError):m.audit_images(self.original,bytes(a),self.symbols,self.windows)
 def test_no_source_recovery_claim_in_accounting(self):
  r=m.analyze();self.assertFalse(r['whole_file_equal']);self.assertEqual(r['common_file_differences'],18623);self.assertEqual(sum(r['text_byte_accounting'].values()),18453)
if __name__=='__main__':unittest.main()
