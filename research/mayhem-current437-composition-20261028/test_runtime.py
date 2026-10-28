"""Actual signed-receipt corruption controls, with no target execution."""
from pathlib import Path
import base64, copy, importlib.util, unittest
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('runtime437_tests',P/'runtime_check.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
class Records(unittest.TestCase):
 @classmethod
 def setUpClass(cls):cls.report=v.read(P/'runtime/trades/buy.json.xz')
 def rejects(self,change):
  r=copy.deepcopy(self.report);change(r)
  with self.assertRaises((AssertionError,ValueError)):v.trade_family('buy',r)
 def test_original_and_candidate_signature_corruption(self):
  def change(r):
   for side in ['original','candidate']:
    b=bytearray(base64.b64decode(r['cases'][0][side]['transaction_base64']));b[1]^=1;r['cases'][0][side]['transaction_base64']=base64.b64encode(b).decode()
  self.rejects(change)
 def test_executed_program_hash(self):self.rejects(lambda r:r['cases'][0]['candidate']['before'][v.MAY].update(data_sha256='0'*64))
 def test_preset_mutation(self):self.rejects(lambda r:r['cases'][0]['case'].update(name='not-a-prescribed-case'))
 def test_noncompute_log_difference(self):self.rejects(lambda r:r['cases'][0]['candidate']['metadata']['logs'].append('Program log: corruption'))
 def test_account_bytes_and_hash_disagree(self):
  def change(r):
   accounts=r['cases'][0]['candidate']['before'];a=next(x for x in accounts.values()if x and not x['executable']and x['data_base64']);b=bytearray(base64.b64decode(a['data_base64']));b[0]^=1;a['data_base64']=base64.b64encode(b).decode()
  self.rejects(change)
if __name__=='__main__':unittest.main(verbosity=2)
