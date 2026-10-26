"""Metadata/byte-hash negative tests; no repository mutations or execution."""
from pathlib import Path
import copy,hashlib,importlib.util,json,tempfile,unittest
P=Path(__file__).resolve().parent;R=P.parents[2]
spec=importlib.util.spec_from_file_location('relay_alias_guard',P/'verify.py');v=importlib.util.module_from_spec(spec);spec.loader.exec_module(v)
class GuardTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.source=v.J(R/(v.BASE+'/source-map.json'));cls.metadata=v.J(R/'programs/donation-relay/source-selected.json');cls.current=v.J(R/'repro/donation-relay/current.json');cls.preservation=v.J(P/'preservation.json')
 def test_selected23_positive(self):v.match_sources(v.source_map(R/'programs/donation-relay'),self.source)
 def test_source_drift_rejected(self):
  actual=dict(self.source);actual['src/idl.rs']='0'*64
  with self.assertRaises(AssertionError):v.match_sources(actual,self.source)
 def test_extra_source_rejected(self):
  actual=dict(self.source);actual['src/extra.rs']='0'*64
  with self.assertRaises(AssertionError):v.match_sources(actual,self.source)
 def test_selection_pointer_rejected(self):
  c=dict(self.current);c['source_snapshot']='programs/donation-relay'
  with self.assertRaises(AssertionError):v.verify_selected_metadata(self.metadata,c,self.source)
 def test_fresh_build_claim_rejected(self):
  m=dict(self.metadata);m['fresh_build_from_this_path']=True
  with self.assertRaises(AssertionError):v.verify_selected_metadata(m,self.current,self.source)
 def test_equality_claim_rejected(self):
  m=dict(self.metadata);m['full_original_byte_equality']=True
  with self.assertRaises(AssertionError):v.verify_selected_metadata(m,self.current,self.source)
 def test_preserved_blob_negative(self):
  p=copy.deepcopy(self.preservation);p['files']['programs/donation-relay/src/idl.rs']['git_blob']='0'*40
  with self.assertRaises(AssertionError):v.verify_preservation(P,p)
 def test_preserved_sha_negative(self):
  p=copy.deepcopy(self.preservation);p['files']['programs/mayhem/src/lib.rs']['sha256']='0'*64
  with self.assertRaises(AssertionError):v.verify_preservation(P,p)
 def test_incoming_semantics_claim_rejected(self):
  p=copy.deepcopy(self.preservation);p['mayhem_incoming_semantics_reviewed']=True
  with self.assertRaises(AssertionError):v.verify_preservation(P,p)
 def test_path_escape_rejected(self):
  with self.assertRaises(AssertionError):v.safe(R,'../outside')
 def test_symlink_rejected(self):
  with tempfile.TemporaryDirectory()as tmp:
   p=Path(tmp);(p/'link').symlink_to(P)
   with self.assertRaises(AssertionError):v.safe(p,'link/preservation.json')
if __name__=='__main__':unittest.main()
