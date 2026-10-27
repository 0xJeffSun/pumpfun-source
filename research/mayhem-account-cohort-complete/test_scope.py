"""All mutations are isolated in-memory copies; reference artifacts stay intact."""
from pathlib import Path
import copy,gzip,importlib.util,json,struct,tempfile,unittest

P=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('bounded_data_refinement',P/'refinement.py')
a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)

class Scope(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.temp=tempfile.TemporaryDirectory();p=Path(cls.temp.name)/'symbols.so'
  p.write_bytes(gzip.decompress((a.PARENT/'artifacts/recovered/symbols.so.gz').read_bytes()))
  elf=a.module('bounded_data_test_elf',a.R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py')
  cls.original=elf.Elf(a.R/'evidence/original/mayhem/deployed.so');cls.candidate=elf.Elf(p)
  cls.refs=[x for x in json.loads((a.PRIOR/'audit.json').read_bytes())['references']if x['equal']is None]
 @classmethod
 def tearDownClass(cls):cls.temp.cleanup()
 def setUp(self):
  self.o=copy.copy(self.original);self.c=copy.copy(self.candidate)
  self.o.b=bytearray(self.original.b);self.c.b=bytearray(self.candidate.b)
 def ref(self,target):return copy.deepcopy(next(x for x in self.refs if x['original_target']==target))
 def audit(self):return a.Refinement(self.o,self.c)
 def test_all_three_references_close(self):
  for r in self.refs:self.assertTrue(self.audit().close(r)['equal'])
 def test_changed_kind_detected(self):
  r=self.ref(0xb1220);self.c.b[r['candidate_target']+16]^=1
  self.assertFalse(self.audit().close(r)['equal'])
 def test_changed_message_detected(self):
  r=self.ref(0xb1220);p=a.Refinement.pointer(self.c,r['candidate_target']);self.c.b[p+26]^=1
  self.assertFalse(self.audit().close(r)['equal'])
 def test_changed_message_length_rejected(self):
  r=self.ref(0xb1220);struct.pack_into('<Q',self.c.b,r['candidate_target']+8,28)
  with self.assertRaises(AssertionError):self.audit().close(r)
 def test_changed_message_pointer_detected(self):
  r=self.ref(0xb1220);p=a.Refinement.pointer(self.c,r['candidate_target']);struct.pack_into('<I',self.c.b,r['candidate_target']+4,p+1)
  self.assertFalse(self.audit().close(r)['equal'])
 def test_changed_tagged_root_pointer_rejected(self):
  r=self.ref(0xb1220);r['candidate_target']+=1
  with self.assertRaises(AssertionError):self.audit().close(r)
 def test_changed_kind_read_width_rejected(self):
  r=self.ref(0xb1220);audit=self.audit();call=next(x for x in audit.cw[r['candidate_body']]['direct']if x['offset']==r['offset']+16)
  self.c.b[call['target']+32]=0x61
  with self.assertRaises(AssertionError):self.audit().close(r)
 def test_changed_empty_control_byte_detected(self):
  r=self.ref(0xb1340);p=a.Refinement.pointer(self.c,r['candidate_target']);self.c.b[p+7]^=1
  self.assertFalse(self.audit().close(r)['equal'])
 def test_changed_control_pointer_detected(self):
  r=self.ref(0xb1340);p=a.Refinement.pointer(self.c,r['candidate_target']);struct.pack_into('<I',self.c.b,r['candidate_target']+4,p+8)
  self.assertFalse(self.audit().close(r)['equal'])
 def test_changed_empty_scalar_detected(self):
  r=self.ref(0xb1340);struct.pack_into('<Q',self.c.b,r['candidate_target']+16,1)
  self.assertFalse(self.audit().close(r)['equal'])
 def test_changed_header_read_width_rejected(self):
  r=self.ref(0xb1340);self.c.b[r['candidate_body']+r['offset']+16]=0x61
  with self.assertRaises(AssertionError):self.audit().close(r)
 def test_changed_constructed_hasher_rejected(self):
  r=self.ref(0xb1340);struct.pack_into('<i',self.c.b,r['candidate_body']+r['offset']+84,1)
  with self.assertRaises(AssertionError):self.audit().close(r)

if __name__=='__main__':unittest.main()
