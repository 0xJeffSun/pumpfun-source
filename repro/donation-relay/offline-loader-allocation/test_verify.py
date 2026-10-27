"""Offline negative controls; no LiteSVM or compiler required."""
import importlib.util,json,tempfile,unittest
from pathlib import Path
HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('allocation_packet',HERE/'verify.py')
v=importlib.util.module_from_spec(spec);spec.loader.exec_module(v)
class Controls(unittest.TestCase):
 def setUp(self):
  self.temp=tempfile.TemporaryDirectory();self.root=Path(self.temp.name)
  self.oldroot,self.oldhere=v.ROOT,v.HERE
  manifest=json.loads((HERE/'manifest.json').read_bytes())
  for name in manifest['bindings']:
   dst=self.root/name;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes((self.oldroot/name).read_bytes())
  v.ROOT=self.root;v.HERE=self.root/HERE.relative_to(self.oldroot)
  (v.HERE/'manifest.json').write_text(json.dumps(manifest))
 def tearDown(self):
  v.ROOT,v.HERE=self.oldroot,self.oldhere;self.temp.cleanup()
 def test_static(self):
  elf,capacity,_=v.verify_static();self.assertGreater(capacity,len(elf))
 def test_extra_file(self):
  (v.HERE/'unexpected.txt').write_text('extra')
  with self.assertRaises(AssertionError):v.verify_static()
 def test_receipt_mutation(self):
  p=v.HERE/'receipt.json';p.write_bytes(p.read_bytes()+b' ')
  with self.assertRaises(AssertionError):v.verify_static()
 def test_artifact_mutation(self):
  meta=v.read(v.ROOT/'repro/donation-relay/access-control-layout-artifact/metadata.json')
  p=v.ROOT/meta['recovered']['candidate']['path'];p.write_bytes(p.read_bytes()+b' ')
  with self.assertRaises(AssertionError):v.verify_static()
 def test_provenance_mutation(self):
  p=v.ROOT/'repro/donation-relay/allocation-provenance/report.json';p.write_bytes(p.read_bytes()+b' ')
  with self.assertRaises(AssertionError):v.verify_static()
if __name__=='__main__':unittest.main()
