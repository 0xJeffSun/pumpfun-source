"""Adversarial checks against raw in-memory execution receipts."""
import base64,copy,gzip,json,unittest
from pathlib import Path
import verify
P=Path(__file__).resolve().parent
class RejectCorruption(unittest.TestCase):
 @classmethod
 def setUpClass(cls):cls.rows=[json.loads(x)for x in gzip.decompress((P/'runtime/observed.jsonl.gz').read_bytes()).splitlines()]
 def test_wrong_epoch_at_activation(self):
  with self.assertRaisesRegex(AssertionError,'conservation'):verify.oracle(copy.deepcopy(self.rows[2]),epoch_override=4)
 def test_premature_new_fee(self):
  with self.assertRaisesRegex(AssertionError,'conservation'):verify.oracle(copy.deepcopy(self.rows[0]),epoch_override=5)
 def test_withheld_reset(self):
  row=copy.deepcopy(self.rows[3]);key=next(k for k,a in row['after'].items()if (t:=verify.token_state(a))and t['withheld']>0)
  data=bytearray.fromhex(row['after'][key]['data']);data[170:178]=bytes(8);row['after'][key]['data']=data.hex()
  with self.assertRaisesRegex(AssertionError,'conservation'):verify.oracle(row)
 def test_missing_transfer(self):
  row=copy.deepcopy(self.rows[0]);tx=verify.Transaction.from_bytes(base64.b64decode(row['transaction_base64']));keys=list(tx.message.account_keys)
  group=row['inner'][0];i=next(i for i,x in enumerate(group)if keys[x['instruction']['programIdIndex']]==verify.replay.h.TOKEN22);group.pop(i)
  with self.assertRaisesRegex(AssertionError,'four successful'):verify.oracle(row)
 def test_spendable_balance(self):
  row=copy.deepcopy(self.rows[0]);key=str(verify.replay.h.userquote);data=bytearray.fromhex(row['after'][key]['data']);n=int.from_bytes(data[64:72],'little');data[64:72]=(n+1).to_bytes(8,'little');row['after'][key]['data']=data.hex()
  with self.assertRaisesRegex(AssertionError,'conservation'):verify.oracle(row)
 def test_event_fee(self):
  row=copy.deepcopy(self.rows[0]);i=next(i for i,x in enumerate(row['logs'])if x.startswith('Program data: '));data=bytearray(base64.b64decode(row['logs'][i].removeprefix('Program data: ')));data[-8:] = bytes(8);row['logs'][i]='Program data: '+base64.b64encode(data).decode()
  with self.assertRaisesRegex(AssertionError,'event fee'):verify.oracle(row)
 def test_fee_oracle_cap_rounding(self):
  # Independent exact values at zero, rounding and cap boundaries.
  self.assertEqual([verify.fee(n,3,100)for n in [0,1,100,101,300,301]], [0,1,1,2,3,3])
  self.assertEqual(verify.fee(1000,123,10000),123)
  self.assertEqual(verify.fee(2**64-1,0,0),0)
if __name__=='__main__':unittest.main()
