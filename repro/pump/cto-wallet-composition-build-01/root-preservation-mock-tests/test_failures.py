from pathlib import Path
import contextlib,hashlib,importlib.util,io,json,tempfile,unittest
from unittest.mock import patch
P=Path(__file__).resolve().parent;C=P.parent/'cto-wallet-preservation-plan/controller.py'
spec=importlib.util.spec_from_file_location('capsule',C);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
SEAL=hashlib.sha256((m.P/'manifest.json').read_bytes()).hexdigest()
class Child: returncode=0
class Tests(unittest.TestCase):
 def scenario(self,kind):
  with tempfile.TemporaryDirectory()as tmp:
   out=Path(tmp)/'attempt'
   def child(*args,**kw):
    data={'candidate_sha256':m.EXPECTED,'case_count':1,'cases':[{'match':True,'original':{'signatures_verified':True,'pool_authority_top_level_signer':False},'candidate':{'signatures_verified':True,'pool_authority_top_level_signer':False}}],'mismatches':[]}
    if kind=='raise':raise OSError('mock launch failed')
    if kind=='nonzero':
     c=Child();c.returncode=7;return c
    if kind=='missing':return Child()
    if kind=='malformed':(out/'receipt.json').write_text('{bad');return Child()
    if kind=='wrongcandidate':data['candidate_sha256']='bad'
    if kind=='count':data['case_count']=2
    if kind=='mismatch':data['cases'][0]['match']=False;data['mismatches']=['bad']
    if kind=='signature':data['cases'][0]['candidate']['signatures_verified']=False
    (out/'receipt.json').write_text(json.dumps(data));return Child()
   with patch.object(m,'OUT',out),patch.object(m,'check'),patch.object(m.subprocess,'run',side_effect=child)as native,patch.object(m.sys,'argv',['controller','--execute','--expected-seal',SEAL]),contextlib.redirect_stdout(io.StringIO()):code=m.main()
   saved=json.loads((out/'exit.json').read_text());self.assertEqual(native.call_count,1);self.assertEqual(code,0 if kind=='valid'else 2);self.assertEqual(saved['passed'],kind=='valid');self.assertTrue(saved['inputs_unchanged'])
 def test_cases(self):
  for k in ['missing','malformed','wrongcandidate','count','mismatch','signature','raise','nonzero','valid']:
   with self.subTest(kind=k):self.scenario(k)
if __name__=='__main__':unittest.main()
