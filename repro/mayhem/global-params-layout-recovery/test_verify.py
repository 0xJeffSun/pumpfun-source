"""Disposable fixture mutations; no canonical source or artifacts are edited."""
import gzip,hashlib,importlib.util,json,shutil,tempfile,unittest
from pathlib import Path
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('combined_cpi_verifier',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
def reseal(p):
 (p/'manifest.json').write_text(json.dumps({str(f.relative_to(p)):hashlib.sha256(f.read_bytes()).hexdigest()for f in p.rglob('*')if f.is_file()and f.name!='manifest.json'and'__pycache__'not in f.parts},sort_keys=True,indent=2)+'\n')
def change_json(f,fn):
 data=json.loads(gzip.decompress(f.read_bytes())if f.suffix=='.gz'else f.read_bytes());fn(data);b=(json.dumps(data,indent=2)+'\n').encode();f.write_bytes(gzip.compress(b,mtime=0)if f.suffix=='.gz'else b)
class Controls(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.p=Path(self.tmp.name)/'packet';shutil.copytree(P,self.p,ignore=shutil.ignore_patterns('__pycache__'))
 def tearDown(self):self.tmp.cleanup()
 def rejects(self):
  reseal(self.p)
  with self.assertRaises(AssertionError):v.verify(self.p,v.ROOT,False)
 def test_legitimate(self):self.assertEqual(v.verify(self.p,v.ROOT)['expanded_matched'],188)
 def test_extra_source_resealed(self):
  (self.p/'sources/recovered/src/unreviewed.rs.gz').write_bytes(gzip.compress(b'pub fn unreviewed(){}\n'));self.rejects()
 def test_source_symlink_rejected(self):
  f=self.p/'sources/recovered/src/lib.rs.gz';f.unlink();f.symlink_to(P/'sources/recovered/src/lib.rs.gz');self.rejects()
 def test_changed_source_resealed(self):
  f=self.p/'sources/recovered/src/instructions/sell.rs.gz';f.write_bytes(gzip.compress(gzip.decompress(f.read_bytes()).replace(b'input,minimum',b'0,minimum')));self.rejects()
 def test_changed_idl_resealed(self):
  change_json(self.p/'sources/recovered/idls/pump.json.gz',lambda j:j['instructions'][0]['accounts'][6].update(signer=False));self.rejects()
 def test_wrong_message_mapping_resealed(self):
  change_json(self.p/'error-table-recovery.json',lambda j:j['all20'][9].update(message=j['all20'][13]['message']));self.rejects()
 def test_false_runtime_resealed(self):
  change_json(self.p/'runtime/comparison.json.gz',lambda j:j['cases'][0].update(different_fields=['error']));self.rejects()
 def test_sell_missing_log_difference_resealed(self):
  change_json(self.p/'runtime/sell.json.gz',lambda j:j.update(normalized_log_differences=[]));self.rejects()
 def test_changed_serializer_map_resealed(self):
  change_json(self.p/'global-params-field-layout-proposal.json.gz',lambda j:j[13].update(original_object_offset=229));self.rejects()
 def test_wrong_parent_resealed(self):
  change_json(self.p/'parent.json',lambda j:j.update(commit='0'*40));self.rejects()
 def test_forged_admin_receipt_resealed(self):
  change_json(self.p/'runtime/admin.json.gz',lambda j:j['cases'][0]['candidate'].update(data='00'));self.rejects()
 def test_forged_examined_unmatched_body_resealed(self):
  change_json(self.p/'legacy-sell-validation-audit.json.gz',lambda j:j['new_static_admission'][1]['body'].update(normalized_sha256='0'*64));self.rejects()
 def test_wrong_meta_proof_resealed(self):
  change_json(self.p/'legacy-sell-cpi-audit.json.gz',lambda j:j['account_metas'][6].update(field='global'));self.rejects()
 def test_changed_cpi_instruction_even_repin_outer_artifacts(self):
  old_c,old_s=v.CANDIDATE,v.SYMBOLS
  try:
   for name in ['candidate','symbols']:
    f=self.p/f'artifacts/recovered-{name}.so.gz';b=bytearray(gzip.decompress(f.read_bytes()));b[48728+17]^=1;f.write_bytes(gzip.compress(b,mtime=0));h=hashlib.sha256(b).hexdigest()
    if name=='candidate':v.CANDIDATE=h
    else:v.SYMBOLS=h
   change_json(self.p/'builds/recovered/result.json',lambda j:j.update(candidate_sha256=v.CANDIDATE,symbols_sha256=v.SYMBOLS));reseal(self.p)
   with self.assertRaisesRegex(AssertionError,'new helper full-body mismatch'):v.verify(self.p,v.ROOT,False)
  finally:v.CANDIDATE,v.SYMBOLS=old_c,old_s
if __name__=='__main__':unittest.main()
