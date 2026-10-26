"""Negative tests use memory/temporary copies; never mutate the repository."""
import base64,copy,hashlib,importlib.util,json,tempfile,unittest
from pathlib import Path
P=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('portable_relay_checker',P/'verify.py');v=importlib.util.module_from_spec(spec);spec.loader.exec_module(v)
R=P.parents[3];Q=R/v.BASE;E=Q/'evidence';PROPOSAL=E/'repository/repro/donation-relay/local-validation-proposal'
class PortabilityTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.saved_run=v.J(E/'run/ordinary/ordinary.json');cls.loader=v.J(PROPOSAL/'loader-results.json');cls.parse=v.load(E/'run/ordinary/verify.py','test_unchanged_ordinary').parse
 def temporary_manifest(self,p):
  f=p/'payload';f.write_bytes(b'original');m={'payload':v.H(f)};(p/'manifest.json').write_text(json.dumps(m));(p/'manifest.sha256').write_text(v.H(p/'manifest.json')+'  manifest.json\n')
 def test_python_version_guard(self):
  v.require_python312((3,12,13))
  for version in[(3,11,9),(3,13,0),(3,14,0)]:
   with self.assertRaisesRegex(RuntimeError,r'requires Python 3\.12 and solders 0\.27\.1; found Python'):
    v.require_python312(version)
 def test_saved_signatures_positive(self):self.assertEqual(v.verify_signature_rows(self.saved_run,type(self).parse)['signature_fields'],50)
 def test_corrupt_signature_rejected(self):
  run=copy.deepcopy(self.saved_run);row=run['cases'][0]['original'];raw=bytearray(base64.b64decode(row['transaction_base64']));raw[1]^=1;row['transaction_base64']=base64.b64encode(raw).decode()
  with self.assertRaises(AssertionError):v.verify_signature_rows(run,type(self).parse)
 def test_corrupt_message_rejected(self):
  run=copy.deepcopy(self.saved_run);row=run['cases'][0]['candidate'];raw=bytearray(base64.b64decode(row['transaction_base64']));raw[-1]^=1;row['transaction_base64']=base64.b64encode(raw).decode()
  with self.assertRaises(AssertionError):v.verify_signature_rows(run,type(self).parse)
 def test_corrupt_manifest_payload_rejected(self):
  with tempfile.TemporaryDirectory()as tmp:
   p=Path(tmp);self.temporary_manifest(p);v.manifest(p);(p/'payload').write_bytes(b'corrupted')
   with self.assertRaises(AssertionError):v.manifest(p)
 def test_package_expectation_rejected(self):
  with tempfile.TemporaryDirectory()as tmp:
   p=Path(tmp);self.temporary_manifest(p)
   with self.assertRaises(AssertionError):v.manifest(p,'0'*64)
 def test_source_bytes_rejected(self):
  with tempfile.TemporaryDirectory()as tmp:
   p=Path(tmp);(p/'src').mkdir();f=p/'src/idl.rs';f.write_bytes((Q/'source/src/idl.rs').read_bytes());expected={'src/idl.rs':v.H(f)};v.validate_sources(p,expected);f.write_bytes(f.read_bytes()+b'\n')
   with self.assertRaises(AssertionError):v.validate_sources(p,expected)
 def test_status_rejected(self):
  with tempfile.TemporaryDirectory()as tmp:
   root=Path(tmp);t=root/v.SELECTION;t.mkdir(parents=True);(root/'repro/donation-relay/README.md').write_bytes((R/v.SELECTION/'README.proposed.md').read_bytes());(t/'README.proposed.md').write_bytes((R/v.SELECTION/'README.proposed.md').read_bytes());(t/'current.proposed.json').write_bytes((R/v.SELECTION/'current.proposed.json').read_bytes());c=v.J(t/'current.proposed.json');current=root/'repro/donation-relay/current.json';current.write_bytes((t/'current.proposed.json').read_bytes());v.current_bindings(root,root/v.BASE,t);c['candidate_sha256']='0'*64;current.write_text(json.dumps(c))
   with self.assertRaises(AssertionError):v.current_bindings(root,root/v.BASE,t)
 def test_origin_runtime_map_rejected(self):
  run=copy.deepcopy(self.saved_run);run['runtime_sha256_map']={}
  with self.assertRaises(AssertionError):v.validate_origin(run,self.loader)
 def test_solders_origin_version_rejected(self):
  loader=copy.deepcopy(self.loader);loader['solders_version']='wrong'
  with self.assertRaises(AssertionError):v.validate_origin(self.saved_run,loader)
 def test_old_result_difference_bounded(self):
  saved=v.J(E/'run/saved-verification.json');structural=dict(saved,runtime_signature_reverification=False);v.compare_saved_result(structural,saved);structural['effects_checked']=0
  with self.assertRaises(AssertionError):v.compare_saved_result(structural,saved)
 def test_pure_ast_inventory_source_rejected(self):
  pure=v.load(P/'frozen_inventory.py','test_pure_relay_inventory')
  with tempfile.TemporaryDirectory()as tmp:
   p=Path(tmp);(p/'inventory.py').write_bytes((PROPOSAL/'inventory.py').read_bytes()+b'\n')
   with self.assertRaises(AssertionError):pure.saved_messages(p)
 def test_pure_harness_source_rejected(self):
  pure=v.load(P/'frozen_inventory.py','test_pure_relay_fixture')
  with tempfile.TemporaryDirectory()as tmp:
   p=Path(tmp);(p/'harness_proposal.py').write_bytes((PROPOSAL/'harness_proposal.py').read_bytes()+b'\n')
   with self.assertRaises(AssertionError):pure.fixtures(p)
if __name__=='__main__':unittest.main()
