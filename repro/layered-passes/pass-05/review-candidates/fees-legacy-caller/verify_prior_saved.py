#!/usr/bin/env python3
"""Reuse the prior immutable runtime assertions on fresh current-main receipts."""
from pathlib import Path
from types import SimpleNamespace
import base64,gzip,hashlib,json
from solders.transaction import VersionedTransaction
P=Path(__file__).resolve().parent
R=P/'runner-repo'
sha=lambda b:hashlib.sha256(b).hexdigest()
read_gz=lambda name:json.loads(gzip.decompress((P/'runtime'/name).read_bytes()))
O=SimpleNamespace(b=(R/'evidence/original/pump_fees/deployed.so').read_bytes())
digest=sha((P/'candidate.so').read_bytes())
total=0
for name,count in [('differential.json.gz',17331),('codec-rejections.json.gz',9),('initializer-history.json.gz',2),('initializer-rejections.json.gz',28),('messages.json.gz',2),('compared-values.json.gz',9),('authority-logs.json.gz',3),('signed-transfers.json.gz',56),('serialization-error.json.gz',1)]:
    data=read_gz(name);assert data['case_count']==count and not data['mismatches']
    assert data['candidate_sha256']==digest and data['original_sha256']==sha(O.b);total+=count
for name in ['compared-values.json.gz','authority-logs.json.gz']:
    data=read_gz(name);assert data['signature_verification_enabled'] and data['blockhash_check_enabled']
    for row in data['cases']:
        assert all(row['checks'].values())
        for side in ['original','candidate']:
            assert all(VersionedTransaction.from_bytes(base64.b64decode(row[side]['transaction_base64'])).verify_with_results())
            lines=[s for s in row[side]['logs'] if s.startswith(('Program log: Left:','Program log: Right:'))]
            if name=='authority-logs.json.gz':assert not lines
            else:
                index=row['case']['index'];assert lines==([] if index==7 else ['Program log: Left: 8',f'Program log: Right: {index}'])
for row in read_gz('codec-rejections.json.gz')['cases']:
    assert [s for s in row['original']['logs'] if 'AnchorError' in s]==[s for s in row['candidate']['logs'] if 'AnchorError' in s]
history=read_gz('initializer-history.json.gz')
for row in history['cases']:
    capture=R/f"repro/pump_fees/initializer-history/transactions/admin-success-{row['index']}.json"
    raw=base64.b64decode(json.loads(capture.read_text())['response']['result']['transaction'][0]);tx=VersionedTransaction.from_bytes(raw);assert tx.verify_with_results()==[True]
    for side in ['original','candidate']:
        assert row[side]['raw_transaction_sha256']==sha(raw) and row[side]['signature']==str(tx.signatures[0])
        assert row[side]['signed_message_and_signature_unchanged'] and row[side]['sigverify_runtime_enabled']
assert history['freshness_control']['blockhash_freshness_check'] and 'BlockhashNotFound' in history['freshness_control']['error']
donation=read_gz('donation-sequence.json.gz')
assert donation['candidate_sha256']==digest and len(donation['steps'])==10 and not donation['mismatches'] and not donation['unexpected_errors']
for row in donation['steps']:
    for side in ['original','candidate']:assert all(VersionedTransaction.from_bytes(base64.b64decode(row[side]['transaction_base64'])).verify_with_results())
signed=read_gz('signed-transfers.json.gz')
assert signed['case_count']==56 and signed['signed_transactions']==112 and not signed['mismatches']
assert signed['candidate_sha256']==digest and signed['signature_verification_enabled'] and signed['blockhash_check_enabled']
for row in signed['cases']:
    assert row['match']
    for side in ['original','candidate']:assert all(VersionedTransaction.from_bytes(base64.b64decode(row[side]['transaction_base64'])).verify_with_results())
error=read_gz('serialization-error.json.gz')
assert error['case_count']==1 and error['signed_transactions']==2 and error['new_unique_cases']==0
assert error['candidate_sha256']==digest and error['signature_verification_enabled'] and error['blockhash_check_enabled']
expected='Program log: ProgramError caused by account: fee_config. Error Code: BorshIoError("failed to write whole buffer"). Error Number: 64424509440. Error Message: IO Error: failed to write whole buffer.'
for row in error['cases']:
    assert row['match'] and all(row['checks'].values())
    for side in ['original','candidate']:
        v=row[side];assert all(VersionedTransaction.from_bytes(base64.b64decode(v['transaction_base64'])).verify_with_results())
        assert v['serialization_error_logs']==[expected]
        assert v['before_data_hex']==v['data_hex'] and v['before_lamports']==v['lamports'] and v['before_owner']==v['owner']
assert total==17441

def transactions(value):
    if isinstance(value,dict):
        if isinstance(value.get('transaction_base64'),str):yield value['transaction_base64']
        for key,child in value.items():
            if key!='transaction_base64':yield from transactions(child)
    elif isinstance(value,list):
        for child in value:yield from transactions(child)

signature_counts={}
for name in ['differential','codec-rejections','initializer-history','initializer-rejections','messages','compared-values','authority-logs','signed-transfers','serialization-error','donation-sequence']:
    counts={'encoded_transaction_fields':0,'verified_signatures':0}
    for encoded in transactions(read_gz(name+'.json.gz')):
        raw=base64.b64decode(encoded);tx=VersionedTransaction.from_bytes(raw)
        assert bytes(tx)==raw and all(tx.verify_with_results())
        counts['encoded_transaction_fields']+=1;counts['verified_signatures']+=len(tx.signatures)
    signature_counts[name]=counts
aggregate=read_gz('differential.json.gz')
assert len(aggregate['suites'])==18 and sum(v['case_count']for v in aggregate['suites'].values())==17331
RESULT={'comparison_receipts':total,'aggregate_suites':18,'aggregate_cases':17331,'donation_steps':10,'unchanged_genuine_historical_transactions':2,'repeat_input_comparisons':69,'new_unique_cases':0,'signature_fields_by_report':signature_counts,'encoded_transaction_fields':sum(x['encoded_transaction_fields']for x in signature_counts.values()),'verified_signatures_in_encoded_fields':sum(x['verified_signatures']for x in signature_counts.values()),'mismatches':0}
if __name__=='__main__':print(json.dumps(RESULT,indent=2))
