#!/usr/bin/env python3
"""Verify exhaustive invalid optional-bool receipts and their signed transactions."""
import base64
import gzip
import hashlib
import json
from pathlib import Path
import re
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent

def load(p):
    if not p.exists() and p.suffix=='.json':p=p.with_suffix('.json.gz')
    b=p.read_bytes();return json.loads(gzip.decompress(b)if p.suffix=='.gz'else b)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def clean(value):return {k:([x for x in v if not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',x)]if k=='logs'else v)for k,v in value.items()if k!='transaction_base64'}
def verify(report_path,sidecar_path,candidate,build):
    r=load(report_path);side=load(sidecar_path);identity=sha(candidate)
    assert r['status']=='passed' and r['candidate_sha256']==identity and r['build_record_sha256']==sha(build) and r['probe_sha256']==sha(HERE/'probe.py')
    assert r['original_sha256']=='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
    assert r['case_count']==len(r['cases'])==1270
    expected=[(v,p)for v in range(2,256)for p in ('create_cashback','create_edit_fee','create_holder','buy','buy_exact_quote_in')]
    assert [(c['byte'],c['position'])for c in r['cases']]==expected
    assert len(side['transactions'])==side['transaction_count']==side['signature_count']==2540
    for i,c in enumerate(r['cases']):
        assert clean(c['original'])==clean(c['candidate']) and c['original']['error'] is not None
        assert 'InstructionDidNotDeserialize' in '\n'.join(c['original']['logs'])
        rows=side['transactions'][i*2:i*2+2]
        assert rows[0]['transaction_base64']==rows[1]['transaction_base64']
        for row,name,program_sha in zip(rows,('original','candidate'),(r['original_sha256'],identity)):
            raw=base64.b64decode(row['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw)
            assert bytes(tx)==raw and len(tx.signatures)==row['signature_count']==1 and all(tx.verify_with_results())
            assert hashlib.sha256(raw).hexdigest()==row['transaction_sha256'] and row['amm_program_sha256']==program_sha
            assert row['error']==c[name]['error'] and row['logs_sha256']==hashlib.sha256(json.dumps(c[name]['logs'],separators=(',',':')).encode()).hexdigest()
    return {'cases':1270,'verified_transactions':2540,'complete_logs':True,'compute_excluded':True}
