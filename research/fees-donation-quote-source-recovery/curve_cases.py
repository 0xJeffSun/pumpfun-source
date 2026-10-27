from pathlib import Path
import sys,json,hashlib,base64,argparse
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R/'scripts'))
import fees_donation_create_differential as d
from solders.account import Account
from solders.transaction import Transaction
class CurveVM:
 def __init__(self,vm):self.vm=vm;self.case={}
 def __getattr__(self,name):return getattr(self.vm,name)
 def set_account(self,key,account):
  if key==d.CURVE:
   data=bytearray(account.data);case=self.case
   data[case['reserve_offset']:case['reserve_offset']+8]=case['reserve'].to_bytes(8,'little')
   data[83:115]=bytes.fromhex(case['quote'])
   data=data[:case['curve_length']]
   account=Account(account.lamports,bytes(data),account.owner,account.executable,account.rent_epoch)
  self.vm.set_account(key,account)
class Fixture(d.Fixture):
 def __init__(self,binary):super().__init__(binary);self.vm=CurveVM(self.vm)
 def run(self,case):self.vm.case=case;return super().run(case)
def cases():
 return [{'name':f'curve-{offset}-{reserve}-{quote_name}-{size}','reserve_offset':offset,'reserve':reserve,'quote':quote.hex(),'curve_length':size}
  for offset in [8,16,24,32]for reserve in [1,2**64-1]
  for quote_name,quote in [('zero',bytes(32)),('native',bytes(d.QUOTE)),('token',bytes(d.MINT))]
  for size in [83,114,115,200]]
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--candidate',type=Path,required=True);ap.add_argument('--output',type=Path,required=True);a=ap.parse_args()
 candidate=a.candidate;original=R/'evidence/original/pump_fees/deployed.so'
 o,c=Fixture(original),Fixture(candidate);rows=[];bad=[]
 for case in cases():
  left,right=o.run(case),c.run(case)
  for result in [left,right]:
   tx=Transaction.from_bytes(base64.b64decode(result['transaction_base64']));assert all(tx.verify_with_results())
  keys=['error','data','owner','lamports','payer_delta','authority_delta','events','inner']
  application=lambda x:[s for s in x['logs']if s.startswith(('Program log:','Program data:'))]
  same=all(left[k]==right[k]for k in keys)and application(left)==application(right)
  rows.append({'case':case,'original':left,'candidate':right,'match':same})
  if not same:bad.append(case['name'])
 report={'original_sha256':hashlib.sha256(original.read_bytes()).hexdigest(),'candidate_sha256':hashlib.sha256(candidate.read_bytes()).hexdigest(),'cases':rows,'mismatches':bad,'successes':sum(x['original']['error']is None for x in rows)}
 a.output.write_text(json.dumps(report,separators=(',',':'))+'\n')
 print(json.dumps({'cases':len(rows),'successes':report['successes'],'mismatches':bad}),flush=True)
 assert not bad
if __name__=='__main__':main()
