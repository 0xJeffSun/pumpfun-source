#!/usr/bin/env python3
"""Check frozen pending AMM central references without editing repository files."""
from pathlib import Path
import collections,hashlib,json
ROOT=Path(__file__).resolve().parent
J=lambda p:json.loads(p.read_text())

def check(package):
    r=ROOT/'central';b=ROOT/'baseline-central'
    for path,digest in J(ROOT/'central-bindings.json').items():assert hashlib.sha256((r/path).read_bytes()).hexdigest()==digest
    status=J(r/'repro/status.json');prior=J(b/'repro/status.json');proposal=J(package/'status-pump_amm.json')
    assert status['pump_amm']==proposal
    assert {k:v for k,v in status.items()if k!='pump_amm'}=={k:v for k,v in prior.items()if k!='pump_amm'}
    assert len(proposal['implemented_handlers'])==37 and proposal['implemented_handlers']==prior['pump_amm']['implemented_handlers']
    assert proposal['validated_cases']==17462 and proposal['scalar_existing_cases_with_stricter_assertions']==191
    assert proposal['existing_fixture_setup_transactions']==150 and proposal['verified_transaction_signatures']==35418
    completion=J(r/'repro/completion.json');old=J(b/'repro/completion.json');rows=completion['instructions']
    assert len(rows)==len({(x['program'],x['instruction'])for x in rows})==150
    assert dict(collections.Counter(x['status']for x in rows))==completion['counts']==old['counts']=={'bounded_implementation':140,'partial':5,'unrecovered':5}
    oldrows={(x['program'],x['instruction']):x for x in old['instructions']};amm_count=0
    for x in rows:
        previous=oldrows[(x['program'],x['instruction'])]
        if x['program']=='pump_amm':
            amm_count+=1;assert x['candidate_artifact']==proposal['candidate_artifact']
            assert {k:v for k,v in x.items()if k!='candidate_artifact'}=={k:v for k,v in previous.items()if k!='candidate_artifact'}
        else:assert x==previous
    assert amm_count==38
    v=completion['current_validation'];assert v['core_differential_comparisons']==sum(x['differential_comparisons']for x in v['programs'].values())==53735
    expected='a6dbd0dc24e28a9459e50858136a2cfabb59fb8aa8399d58499d047a76ec291f'
    assert v['programs']['pump_amm']['candidate_sha256']==expected and v['programs']['pump_amm']['candidate_artifact']==proposal['candidate_artifact']
    assert {k:x for k,x in v['programs'].items()if k!='pump_amm'}=={k:x for k,x in old['current_validation']['programs'].items()if k!='pump_amm'}
    before=(b/'.github/workflows/verify.yml').read_text();after=(r/'.github/workflows/verify.yml').read_text()
    oldartifact='repro/pump_amm/pool-serialization-thirty-seven/pump_amm_recovered.so';newartifact='repro/pump_amm/scalar-guard-order-v144/candidate.so'
    assert before.count('--candidate '+oldartifact)==after.count('--candidate '+newartifact)==25
    updated=before.replace(oldartifact,newartifact).replace('python repro/pump_amm/pool-serialization-thirty-seven/verify.py','python repro/pump_amm/scalar-guard-order-v144/verify.py --current-main --repo .')
    assert after==updated
    return {'amm_status_equals_owned_proposal':True,'other_status_entries_unchanged':True,'amm_completion_rows_updated':38,'complete_rows':150,
        'counts':completion['counts'],'total_comparison_receipts':53735,'amm_comparison_receipts':17462,'setup_transactions_not_added_to_cases':150,
        'workflow_candidate_references_updated':25,'existing_flags_and_output_names_preserved':True,'candidate_sha256':expected,'findings':[]}

if __name__=='__main__':
    import argparse
    p=argparse.ArgumentParser();p.add_argument('package',type=Path);a=p.parse_args();print(json.dumps(check(a.package),indent=2,sort_keys=True))
