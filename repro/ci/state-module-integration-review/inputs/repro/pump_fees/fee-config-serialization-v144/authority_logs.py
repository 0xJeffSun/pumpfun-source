#!/usr/bin/env python3
"""Ordinary signed offline authority success/rejection cases with raw key-log assertions."""
from pathlib import Path
import argparse,base64,hashlib,json,sys
ROOT=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
sys.path.insert(0,str(ROOT/'scripts'))
import fees_admin_differential as fixture
from solders.litesvm import LiteSVM
from solders.transaction import Transaction

class RecordingVM:
    def __init__(self):
        self.inner=LiteSVM().with_sigverify(True).with_blockhash_check(True)
        self.last_signed_transaction=None
    def __getattr__(self,name):return getattr(self.inner,name)
    def with_transaction_history(self,value):self.inner.with_transaction_history(value);return self
    def send_transaction(self,tx):
        assert all(tx.verify_with_results())
        self.last_signed_transaction=base64.b64encode(bytes(tx)).decode()
        return self.inner.send_transaction(tx)

def main():
    p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
    fixture.LiteSVM=RecordingVM
    original=ROOT/'evidence/original/pump_fees/deployed.so'
    rows=[];failures=[]
    for name,key in [('zero',bytes(32)),('same-authority',bytes(fixture.AUTH.pubkey())),('different-authority',bytes(fixture.OTHER.pubkey()))]:
        c={'name':'set-authority-'+name,'instruction':'set_authority','arg':key.hex()}
        results=[]
        for binary in [original,a.candidate]:
            f=fixture.Fixture(binary);r=f.run(c);r['transaction_base64']=f.vm.last_signed_transaction
            assert all(Transaction.from_bytes(base64.b64decode(r['transaction_base64'])).verify_with_results())
            results.append(r)
        x,y=results
        checks={'state_error_balances_events_inner':all(x[k]==y[k] for k in ['error','data_hex','lamports','owner','payer_delta','events','inner_instructions']),
                'no_compared_pubkey_logs':all(not any(s.startswith(('Program log: Left:','Program log: Right:')) for s in r['logs']) for r in results),
                'expected_result': all(('6001' in r['error']) if name=='zero' else r['error'] is None for r in results)}
        if not all(checks.values()):failures.append(name)
        rows.append({'case':c,'checks':checks,'original':x,'candidate':y})
    sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
    report={'scope':'Three additional ordinarily signed synthetic offline cases, overlapping existing administrative cases with explicit raw compared-public-key log assertions. Signature and fresh-blockhash checks explicitly enabled. Source-location and compute-unit differences are retained, not equated. No live submission.',
            'original_sha256':sha(original),'candidate_sha256':sha(a.candidate),'runner_sha256':sha(Path(__file__)),
            'fixture_sha256':sha(ROOT/'scripts/fees_admin_differential.py'),'case_count':len(rows),'signed_transactions':len(rows)*2,
            'signature_verification_enabled':True,'blockhash_check_enabled':True,'mismatches':failures,'cases':rows}
    a.output.parent.mkdir(parents=True,exist_ok=True);a.output.write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps({k:report[k] for k in ['candidate_sha256','case_count','signed_transactions','mismatches']}));assert not failures

if __name__=='__main__':main()
