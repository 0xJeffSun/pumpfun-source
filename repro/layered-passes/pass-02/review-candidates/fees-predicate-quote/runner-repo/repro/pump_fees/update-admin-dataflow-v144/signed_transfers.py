#!/usr/bin/env python3
"""Retain authentic test-owned transaction signatures for existing transfer fixtures."""
from pathlib import Path
import argparse,base64,hashlib,json,sys
R=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
sys.path.insert(0,str(R/'scripts'))
import fees_admin_differential as admin
import fees_admin_transfer_differential as transfer
from solders.litesvm import LiteSVM
from solders.transaction import Transaction
class RecordingVM:
    def __init__(self):self.inner=LiteSVM().with_sigverify(True).with_blockhash_check(True);self.tx=None
    def __getattr__(self,n):return getattr(self.inner,n)
    def with_transaction_history(self,n):self.inner.with_transaction_history(n);return self
    def send_transaction(self,tx):
        assert all(tx.verify_with_results());self.tx=base64.b64encode(bytes(tx)).decode();return self.inner.send_transaction(tx)
def main():
    p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
    admin.LiteSVM=RecordingVM
    original=R/'evidence/original/pump_fees/deployed.so';o=transfer.TransferFixture(original);c=transfer.TransferFixture(a.candidate)
    rows=[];bad=[]
    for case in transfer.cases():
        x=o.run(case);y=c.run(case);x['transaction_base64']=o.vm.tx;y['transaction_base64']=c.vm.tx
        matches=all(x[k]==y[k] for k in ['error','data_hex','lamports','owner','payer_delta','events','inner_instructions'])
        for r in [x,y]:assert all(Transaction.from_bytes(base64.b64decode(r['transaction_base64'])).verify_with_results())
        rows.append({'case':case,'original':x,'candidate':y,'match':matches})
        if not matches:bad.append(case['name'])
    sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
    out={'scope':'Re-execution of the existing 56 update_admin cases with explicit signature and fresh-blockhash verification and all 112 ordinary signed transactions retained. This repeats full-suite inputs; it adds receipt/signature evidence, not new unique case coverage. Raw logs remain retained without equality assertions.',
         'original_sha256':sha(original),'candidate_sha256':sha(a.candidate),'runner_sha256':sha(Path(__file__)),
         'fixture_source_sha256':{str(p.relative_to(R)):sha(p) for p in [R/'scripts/fees_admin_transfer_differential.py',R/'scripts/fees_config_differential.py',R/'scripts/fees_admin_differential.py']},
         'case_count':len(rows),'signed_transactions':len(rows)*2,'overlaps_existing_suite':True,'signature_verification_enabled':True,'blockhash_check_enabled':True,'mismatches':bad,'cases':rows}
    a.output.parent.mkdir(parents=True,exist_ok=True);a.output.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:out[k] for k in ['candidate_sha256','case_count','signed_transactions','mismatches']}));assert not bad
if __name__=='__main__':main()
