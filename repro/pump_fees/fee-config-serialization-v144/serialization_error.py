#!/usr/bin/env python3
"""One existing buffer-write failure with ordinary signed transactions retained."""
from pathlib import Path
import argparse,base64,hashlib,json,sys
R=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
sys.path.insert(0,str(R/'scripts'))
import fees_admin_differential as admin
import fees_config_differential as config
from solders.litesvm import LiteSVM
from solders.transaction import Transaction
class RecordingVM:
 def __init__(self):self.inner=LiteSVM().with_sigverify(True).with_blockhash_check(True);self.tx=None;self.before=None
 def __getattr__(self,n):return getattr(self.inner,n)
 def with_transaction_history(self,n):self.inner.with_transaction_history(n);return self
 def send_transaction(self,tx):
  assert all(tx.verify_with_results());self.tx=base64.b64encode(bytes(tx)).decode();self.before=self.inner.get_account(config.CONFIG);return self.inner.send_transaction(tx)
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();admin.LiteSVM=RecordingVM
 case=next(c for c in config.cases() if c['name']=='update_stable_fee_config-normal_count:61')
 original=R/'evidence/original/pump_fees/deployed.so';o=config.ConfigFixture(original);c=config.ConfigFixture(a.candidate);x=o.run(case);y=c.run(case)
 for vm,row in [(o.vm,x),(c.vm,y)]:
  row['transaction_base64']=vm.tx;assert all(Transaction.from_bytes(base64.b64decode(vm.tx)).verify_with_results())
  row['before_data_hex']=vm.before.data.hex();row['before_lamports']=vm.before.lamports;row['before_owner']=str(vm.before.owner)
  row['serialization_error_logs']=[l for l in row['logs'] if 'ProgramError caused by account: fee_config.' in l]
 expected='Program log: ProgramError caused by account: fee_config. Error Code: BorshIoError("failed to write whole buffer"). Error Number: 64424509440. Error Message: IO Error: failed to write whole buffer.'
 checks={'compared_results_equal':all(x[k]==y[k] for k in ['error','data_hex','lamports','owner','balance_deltas','events','inner_instructions']),
         'expected_error_kind':all('BorshIoError' in row['error'] for row in [x,y]),
         'exact_error_log':x['serialization_error_logs']==y['serialization_error_logs']==[expected],
         'fee_config_rollback':all(row['data_hex']==row['before_data_hex'] and row['lamports']==row['before_lamports'] and row['owner']==row['before_owner'] for row in [x,y])}
 sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();bad=[k for k,v in checks.items() if not v]
 out={'scope':'Repeat of one existing full-suite case that reaches FeeConfig exit serialization failure; stronger exact ProgramError log, rollback and retained-signature assertions. Zero new unique inputs. Raw logs retained; compute logs are not asserted equal.',
      'original_sha256':sha(original),'candidate_sha256':sha(a.candidate),'runner_sha256':sha(Path(__file__)),'case_count':1,'signed_transactions':2,'overlaps_existing_suite':True,'new_unique_cases':0,'signature_verification_enabled':True,'blockhash_check_enabled':True,'mismatches':bad,'cases':[{'case':case,'original':x,'candidate':y,'checks':checks,'match':not bad}]}
 a.output.parent.mkdir(parents=True,exist_ok=True);a.output.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'checks':checks,'mismatches':bad}));assert not bad
if __name__=='__main__':main()
