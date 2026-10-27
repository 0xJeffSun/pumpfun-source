"""Small saved-evidence mutation controls; never compiles or executes target code."""
from pathlib import Path
import copy,importlib.util,json,unittest,gzip,hashlib,base64
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('native_verify',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
class Scope(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.sources=v.source_inputs();d=P/'builds/native-current-authenticated';cls.launch=v.load(d/'launch.json');cls.result=v.load(d/'result.json');cls.log=v.raw(d/'build.log.gz')
 def test_real_build(self):self.assertEqual(v.check_build(self.launch,self.result,self.log,self.sources),163)
 def test_cached_build_rejected(self):
  launch=copy.deepcopy(self.launch);launch['fresh']=False
  with self.assertRaises(AssertionError):v.check_build(launch,self.result,self.log,self.sources)
 def test_source_substitution_rejected(self):
  sources=dict(self.sources);sources['src/state.rs']+=b'\n'
  with self.assertRaises(AssertionError):v.check_build(self.launch,self.result,self.log,sources)
 def test_missing_dependency_compile_rejected_after_rehash(self):
  log=self.log.replace(b'--crate-name anchor_lang ',b'--crate-name missing_lang ');result=copy.deepcopy(self.result);result['build_log_sha256']=v.sha(log)
  with self.assertRaises(AssertionError):v.check_build(self.launch,result,log,self.sources)
 def test_parent_binary_rejected(self):
  result=copy.deepcopy(self.result);result['artifacts']['candidate.so']['sha256']=v.sha(v.raw(v.PARENT/'artifacts/recovered/candidate.so.gz'))
  with self.assertRaises(AssertionError):v.check_build(self.launch,result,self.log,self.sources)
 def test_network_enabled_rejected(self):
  launch=copy.deepcopy(self.launch);launch['command'][launch['command'].index('--network')+1]='host'
  with self.assertRaises(AssertionError):v.check_build(launch,self.result,self.log,self.sources)
 def test_omitted_sdk_check_rejected(self):
  launch=copy.deepcopy(self.launch);launch['sdk_checks']['1.54']['files']-=1
  with self.assertRaises(AssertionError):v.check_build(launch,self.result,self.log,self.sources)
 def test_missing_trade_receipt_rejected(self):
  check=v.module('negative_parent',v.PARENT/'verify.py');r=v.load(P/'validation/native-current-buy-legacy.json.gz');r['cases'].pop()
  with self.assertRaises(AssertionError):check.check_receipts('buy',r,v.raw(P/'artifacts/recovered/candidate.so.gz'))
 def test_bad_signature_rejected(self):
  check=v.module('negative_parent_signature',v.PARENT/'verify.py');r=v.load(P/'validation/native-current-buy-legacy.json.gz');tx=bytearray(base64.b64decode(r['cases'][0]['original']['transaction_base64']));tx[1]^=1
  for phase in ['original','candidate']:r['cases'][0][phase]['transaction_base64']=base64.b64encode(tx).decode()
  with self.assertRaises(AssertionError):check.check_receipts('buy',r,v.raw(P/'artifacts/recovered/candidate.so.gz'))
if __name__=='__main__':unittest.main()
