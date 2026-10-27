"""Native payout arithmetic, normal signatures and isolated synthetic accounts."""
from pathlib import Path
import argparse,sys,json,gzip,hashlib
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'scripts'))
import fees_social_claim_differential as legacy
import fees_social_claim_v2_differential as v2
import fees_buyback_differential as buyback
from solders.litesvm import LiteSVM
from solders.account import Account
FIELDS=['error','before','after','inner','return','transaction_base64','application_logs']
MODULES={'legacy':legacy,'v2':v2,'buyback':buyback}

class FixtureVM:
    def __init__(self,recipient,lamports,executable=False):self.vm=LiteSVM();self.recipient=recipient;self.lamports=lamports;self.executable=executable
    def __getattr__(self,name):return getattr(self.vm,name)
    def with_transaction_history(self,n):self.vm.with_transaction_history(n);return self
    def set_account(self,key,account):
        if key==self.recipient:
            if self.executable:
                # Install an unmodified ELF as a non-invoked executable account
                # at the test-owned recipient key; never replace a signer/CPI target.
                self.vm.add_program_from_file(key,ROOT/'evidence/dependencies/spl_token/deployed.so')
                account=self.vm.get_account(key)
            account=Account(self.lamports,account.data,account.owner,account.executable,account.rent_epoch)
        return self.vm.set_account(key,account)

def cases():
    for handler in MODULES:
        for room in [0,1,2,99,100,1000000]:
            for amount in [0,1,2,99,100,1000000]:
                yield dict(name=f'{handler}-headroom-{room}-amount-{amount}',handler=handler,recipient_lamports=2**64-1-room,amount=amount,overflow=amount>room)
        yield dict(name=f'{handler}-ordinary',handler=handler,recipient_lamports=10**12,amount=1000000,overflow=False)
        if handler!='buyback':
            for amount in [0,1]:
                c=dict(name=f'{handler}-program-recipient-{amount}',handler=handler,recipient_lamports=10**12,amount=amount,overflow=False,program_recipient=True)
                c.update({'recipient_program':True}if handler=='legacy'else{'recipient_kind':'program'})
                yield c
                yield dict(name=f'{handler}-executable-recipient-{amount}',handler=handler,recipient_lamports=10**12,amount=amount,overflow=False,executable_recipient=True)

def execute(binary,case):
    handler=case['handler'];h=MODULES[handler]
    c=dict(case,native=case['amount'],tokens=0)
    if handler=='buyback':c.update(op='sweep_buyback',native=True)
    original_vm=h.LiteSVM;h.LiteSVM=lambda:FixtureVM(h.OTHER.pubkey(),case['recipient_lamports'],case.get('executable_recipient',False))
    try:row=h.Fixture(binary).run(c)if handler=='legacy'else h.run(c,binary)
    finally:h.LiteSVM=original_vm
    row['application_logs']=[s for s in row['logs']if s.startswith(('Program log:','Program data:','Program return:'))]
    return row

def main():
    p=argparse.ArgumentParser();p.add_argument('--control',type=Path,required=True);p.add_argument('--proposal',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
    binaries={'original':ROOT/'evidence/original/pump_fees/deployed.so','control':a.control,'proposal':a.proposal};rows=[]
    for case in cases():
        results={label:execute(binary,case)for label,binary in binaries.items()}
        diff={label:[f for f in FIELDS if results['original'][f]!=results[label][f]]for label in ['control','proposal']}
        rows.append(dict(case=case,results=results,differences=diff));print(case['name'],diff,flush=True)
    report=dict(case_count=len(rows),fields=FIELDS,hashes={n:hashlib.sha256(p.read_bytes()).hexdigest()for n,p in binaries.items()},cases=rows,mismatches={n:[r['case']['name']for r in rows if r['differences'][n]]for n in ['control','proposal']})
    a.output.write_bytes(gzip.compress(json.dumps(report,sort_keys=True).encode(),mtime=0))
    assert not report['mismatches']['proposal']
    assert report['mismatches']['control']==[r['case']['name']for r in rows if r['case']['handler']!='legacy'and(r['case']['overflow']or r['case'].get('executable_recipient')or(r['case']['handler']=='v2'and r['case']['amount']==0 and not r['case'].get('program_recipient')))]
    for row in rows:
        c=row['case'];r=row['results']
        if c['overflow']:
            error='ArithmeticOverflow'if c['handler']=='buyback'else'UnbalancedInstruction'
            assert error in r['original']['error'];assert error in r['control']['error']if c['handler']=='legacy'else'ProgramFailedToComplete'in r['control']['error']
            accounts=['buyback_vault','destination']if c['handler']=='buyback'else['social_fee_pda','recipient']
            for result in r.values():
                for account in accounts:assert result['before'][account]==result['after'][account]
            if c['handler']!='buyback':
                data=bytes(r['original']['return']['data']);assert data[0]==1
                # Option<Event>: tag, timestamp, Borsh user ID, platform, three Pubkeys,
                # amount/claimable/lifetime/before/after. This checks the emitted clamp.
                n=int.from_bytes(data[9:13],'little');offset=13+n+1+96
                assert int.from_bytes(data[offset+32:offset+40],'little')==2**64-1
    print(json.dumps(dict(cases=len(rows),control_mismatches=len(report['mismatches']['control']),proposal_mismatches=0)),flush=True)
if __name__=='__main__':main()
