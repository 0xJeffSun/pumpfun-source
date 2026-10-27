#!/usr/bin/env python3
"""Verify every field and log of the nonzero-return and source-arithmetic probes."""
import base64,hashlib,struct
from pathlib import Path
from solders.transaction import Transaction
from verify_cpi_returns import load,sha,curve_normalizer
VALUES=[(0,0),(1,0),(0,1),(1,1),(1000,0),(0,1000),(1000,1000),(2**64-1,0),(0,2**64-1),(2**64-1,2**64-1)]
SOURCE_VALUES=[(10**15,0),(10**15,1),(10**15+1,0),(10**15+1,1),(2**64-1,0),(2**64-1,1)]
MAGIC=b'AMM_RETURN_ORACLE_V1'
def validate_pairs(rows,normal):
    for c in rows:
        x,y=c['original'],c['candidate']
        assert {k:v for k,v in x.items()if k!='logs'}=={k:v for k,v in y.items()if k!='logs'}
        assert normal(x['logs'])==normal(y['logs'])
        assert x['before']==y['before'] and x['transaction_base64']==y['transaction_base64']
        raw=base64.b64decode(x['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw);assert bytes(tx)==raw and all(tx.verify_with_results())
        control=bytes.fromhex(c['control_hex']);assert control[:len(MAGIC)]==MAGIC and control[len(MAGIC):len(MAGIC)+3]==b'\1\x10\0'
        assert any(a and bytes.fromhex(a['data_hex']).endswith(control)for a in x['before'].values())
        for side in [x,y]:assert side['signature_verification']==tx.verify_with_results() and [s for s in side['logs']if 'SYNTHETIC_RETURN_ORACLE'in s]==['Program log: SYNTHETIC_RETURN_ORACLE mode=1 length=16']
def verify(d,candidate,build,source):
    normal=curve_normalizer(source);identity=sha(candidate)
    extended=load(d/'cpi/curve-observations.json');amounts=load(d/'cpi/source-amount-observations.json')
    assert extended['candidate_sha256']==amounts['candidate_sha256']==identity
    assert extended['candidate_record_sha256']==amounts['candidate_record_sha256']==sha(build)
    assert extended['producer_sha256']==sha(d/'cpi/probe_curve_balances.py') and amounts['producer_sha256']==sha(d/'cpi/probe_source_amounts.py')
    assert [(c['suite'],c['amount_out'],c['buyback'])for c in extended['cases']]==[(s,o,b)for s in ['curve_buy','curve_sell']for o,b in VALUES]
    assert [(c['amount'],c['amount_out'])for c in amounts['cases']]==SOURCE_VALUES
    assert len(extended['cases'])==extended['case_count']==20 and extended['signed_executions']==40 and len(amounts['cases'])==6
    oracle=d/'cpi/oracle';assert extended['synthetic_oracle_sha256']==amounts['oracle_sha256']==sha(oracle/'synthetic-oracle.so')
    assert extended['oracle_record_sha256']==amounts['oracle_record_sha256']==sha(oracle/'build-comparison.json')
    for c in extended['cases']:assert bytes.fromhex(c['control_hex'])[-16:]==struct.pack('<QQ',c['amount_out'],c['buyback'])
    for c in amounts['cases']:assert bytes.fromhex(c['control_hex'])[-16:]==struct.pack('<QQ',c['amount_out'],0)
    validate_pairs(extended['cases'],normal);validate_pairs(amounts['cases'],normal)
    return {'nonzero_return_cases':20,'source_amount_cases':6,'verified_signed_executions':52,'full_logs_match':True,'excluded':'Compute consumption and exact reviewed source coordinates only.'}
