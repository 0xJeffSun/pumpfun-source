#!/usr/bin/env python3
"""Recheck the complete recorded typed-account matrix and ordinary signatures."""
import base64,gzip,hashlib,json,re
from pathlib import Path
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):
    if not p.exists() and p.suffix=='.json':p=p.with_suffix('.json.gz')
    data=p.read_bytes();return json.loads(gzip.decompress(data)if p.suffix=='.gz'else data)
def clean(v):return {k:([s for s in x if not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',s)]if k=='logs'else x)for k,x in v.items()}
def verify(report,candidate,build):
    r=load(report);assert r['candidate_sha256']==sha(candidate) and r['build_record_sha256']==sha(build)
    assert r['original_sha256']==sha(ROOT/'evidence/original/pump_amm/deployed.so') and r['probe_sha256']==sha(HERE/'typed_probe.py')
    assert r['harness_sha256']==sha(ROOT/'scripts/pump_amm_creator_reassignment_differential.py')
    assert r['case_count']==len(r['cases'])==216
    expected=[]
    for op,key,limit,extra in [('set_coin_creator','curve',84,[(48,2),(48,255),(81,2),(81,255),(82,2),(82,255)]),('migrate_pool_coin_creator','sharing',116,[(10,2),(10,255),(75,2),(75,255)])]:
        expected += [{'name':key+'-length-'+str(n),'op':op,'lengths':{key:n}}for n in range(limit+1)]
        expected += [{'name':key+'-byte-'+str((off,value)),'op':op,'patches':{key:[[off,bytes([value]).hex()]]}}for off,value in [(0,0),(0,255)]+extra]
    assert [c['case']for c in r['cases']]==expected
    for c in r['cases']:
        x,y=c['original'],c['candidate'];assert clean(x)==clean(y) and c['differences_without_compute']==[]
        assert x['transaction_base64']==y['transaction_base64']
        tx=Transaction.from_bytes(base64.b64decode(x['transaction_base64'],validate=True));assert len(tx.signatures)==1 and all(tx.verify_with_results())
    return {'typed_account_cases':216,'signed_executions':432,'full_logs_match':True,'excluded':'Compute consumption only.'}
