"""Signed, offline Crank account-balance boundary differential."""
import argparse,gzip,hashlib,json,sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
import probe
h=probe.h
FIELDS=['error','before','after','inner','transaction_base64','program_logs','events']

def cases():
    yield from probe.cases()
    reserve=h.LiteSVM().minimum_balance_for_rent_exemption(165)
    for headroom in [0,1,2,99,100,1000000]:
        for excess in [0,1,2,99,100,1000000]:
            yield dict(name=f'credit-room-{headroom}-excess-{excess}',token_amount=2**64-1-headroom-reserve,amount=excess,credit_overflow=excess>headroom)
    for flags in [8,12,255]:
        yield dict(name=f'disabled-before-credit-{flags}',token_amount=2**64-1-reserve,amount=1,flags=flags)
    yield dict(name='native-source-max',amount=2**64-1-h.LiteSVM().minimum_balance_for_rent_exemption(218))
    for total in [0,1]:
        yield dict(name=f'nonnative-max-total-{total}',quote=str(h.MINT),amount=0,token_amount=2**64-1,listed=True,total=total)

def main():
    p=argparse.ArgumentParser();p.add_argument('--control',type=Path,required=True);p.add_argument('--proposal',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
    original=probe.ROOT/'evidence/original/pump_fees/deployed.so'
    binaries={'original':original,'control':a.control,'proposal':a.proposal};rows=[]
    for case in cases():
        results={label:probe.execute(binary,case)for label,binary in binaries.items()}
        diffs={label:[f for f in FIELDS if results['original'][f]!=results[label][f]]for label in ['control','proposal']}
        rows.append(dict(case=case,results=results,differences=diffs))
        print(case['name'],diffs,flush=True)
    result=dict(scope='Normally verified test-owned signatures; synthetic offline balances. Complete program logs, emitted data, error, tracked account snapshots, inner instructions and identical signed transaction bytes. VM compute/timing logs and untracked accounts are outside this comparator.',hashes={n:hashlib.sha256(p.read_bytes()).hexdigest()for n,p in binaries.items()},fields=FIELDS,cases=rows,case_count=len(rows),mismatches={n:[r['case']['name']for r in rows if r['differences'][n]]for n in ['control','proposal']})
    a.output.write_bytes(gzip.compress(json.dumps(result,sort_keys=True).encode(),mtime=0))
    assert not result['mismatches']['proposal']
    failures=[r for r in rows if r['case'].get('credit_overflow')]
    assert result['mismatches']['control']==[r['case']['name']for r in failures]
    for r in failures:
        assert r['differences']['control']==['error','program_logs']
        assert 'ArithmeticOverflow' in r['results']['original']['error']
        assert 'ProgramFailedToComplete' in r['results']['control']['error']
        for n in binaries:
            row=r['results'][n]
            for account in ['donation','donation_ata']:
                assert row['before'][account]==row['after'][account]
    print(json.dumps({'cases':len(rows),'reproduced_failures':len(failures),'proposal_mismatches':0}),flush=True)
if __name__=='__main__':main()
