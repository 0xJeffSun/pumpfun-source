#!/usr/bin/env python3
"""Recheck full legacy mint-constraint observations and raw signatures."""
import base64,gzip,hashlib,json,re
from pathlib import Path
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):
    if not p.exists()and p.suffix=='.json':p=p.with_suffix('.json.gz')
    data=p.read_bytes();return json.loads(gzip.decompress(data)if p.suffix=='.gz'else data)
def clean(value):return {k:([s for s in v if not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',s)]if k=='logs'else v)for k,v in value.items()}
def verify(report,candidate,build):
    r=load(report);assert r['candidate_sha256']==sha(candidate)and r['build_record_sha256']==sha(build)and r['probe_sha256']==sha(HERE/'probe.py')
    assert r['original_sha256']==sha(ROOT/'evidence/original/pump_amm/deployed.so')
    assert r['input_sha256']=={n:sha(ROOT/n)for n in ['scripts/pump_amm_transfer_creator_differential.py','scripts/pump_amm_liquidity_differential.py','scripts/pump_amm_reusable_harness.py']}
    assert [(c['kind'],c['amount'],c['lamports'])for c in r['cases']]==[(k,a,l)for k in ['native','token','token2022']for a in [0,1]for l in [1,2039280,10**9]]
    for c in r['cases']:
        x,y=c['original'],c['candidate'];assert clean(x)==clean(y)
        raw=base64.b64decode(x['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw);assert bytes(tx)==raw and len(tx.signatures)==1 and all(tx.verify_with_results())
        if c['kind']=='native':assert x['error']is None
        else:
            assert '6007' in x['error']
            assert sum('UnsupportedQuoteMint' in s for s in x['logs'])==1
            assert not any(s in ['Program log: Left:','Program log: Right:']for s in x['logs'])
    return {'cases':18,'verified_signed_executions':36,'full_logs_match':True,'excluded':'Compute consumption only.'}
