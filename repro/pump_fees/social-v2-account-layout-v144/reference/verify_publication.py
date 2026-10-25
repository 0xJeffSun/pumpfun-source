#!/usr/bin/env python3
"""Read-only checks of exact inputs, whole-ELF reuse, static bodies, and signed receipts."""
from pathlib import Path
import base64,gzip,hashlib,io,json,struct,sys,tarfile
from solders.transaction import VersionedTransaction
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
sys.path.insert(0,str(R/'repro/pump_fees/framework-matching'))
from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
read=lambda n:json.loads((P/n).read_text())
read_gz=lambda n:json.loads(gzip.decompress((P/n).read_bytes()))
def archive(path):
    with tarfile.open(fileobj=io.BytesIO(path.read_bytes()),mode='r:gz') as tar:
        return {m.name:tar.extractfile(m).read() for m in tar if m.isfile()}
artifacts=read('artifact-hashes.json')
for n,d in artifacts.items():assert sha((P/n).read_bytes())==d,n
main=archive(P/'source-snapshot.tar.gz');scratch=archive(P/'scratch/source-snapshot.tar.gz')
assert len(main)==22 and main==scratch
assert {n:sha(b) for n,b in main.items()}==read('source-sha256.json')==read('build-comparison.json')['source_sha256']
assert read('build-attempt.json')['returncode']==0 and read('build-attempt.json')['source_unchanged']
attempt=read('scratch/build-attempt.json');prefix='work/fees-config-serialization/source/'
assert {n.removeprefix(prefix):d for n,d in attempt['source_sha256'].items()}==read('scratch/source-sha256.json')
assert attempt['returncode']==0 and attempt['source_unchanged']
prior=R/'repro/pump_fees/update-admin-dataflow-v144'
assert sha((prior/'artifact-hashes.json').read_bytes())==read('prior-checkpoint.json')['artifact_manifest_sha256']
for n,d in json.loads((prior/'artifact-hashes.json').read_text()).items():assert sha((prior/n).read_bytes())==d
previous=archive(prior/'source-snapshot.tar.gz')
assert set(n for n in main if main[n]!=previous[n])=={'programs/pump-fees/src/types.rs'}
before='        writer.write_all(&Self::DISCRIMINATOR).map_err(|_| ProgramError::InvalidAccountData)?;\n        self.serialize(writer).map_err(|e| ProgramError::BorshIoError(e.to_string()).into())'
after='        writer.write_all(&Self::DISCRIMINATOR)?;\n        self.serialize(writer)?;\n        Ok(())'
assert previous['programs/pump-fees/src/types.rs'].decode().replace(before,after)==main['programs/pump-fees/src/types.rs'].decode()
harness=archive(P/'harness-snapshot.tar.gz');assert {n:sha(b) for n,b in harness.items()}==read('harness-source-sha256.json')
assert harness['work/fees-config-serialization/serialization_error.py']==(P/'serialization_error.py').read_bytes()
C=Elf(P/'pump_fees_candidate.so');O=Elf(R/'evidence/original/pump_fees/deployed.so');S=Elf(P/'symbol-source.so')
assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi] and C.b==(P/'scratch/pump_fees_candidate.so').read_bytes()
digest=sha(C.b);identity=read('main-scratch-identity.json')
assert digest==identity['main_binary_sha256']==identity['scratch_binary_sha256']==read('build-comparison.json')['comparison']['candidate_sha256'] and C.b!=O.b
proof=read('static/body-analysis.json');matches=read_gz('function-matches.json.gz');indexed={f['start']:f for f in matches['functions']};unknown=[]
for row in proof['rows']:
    a,b,n=row['candidate_start'],row['original_start'],row['bytes']
    assert O.entries[O.entries.index(b)+1]==b+n and C.normalized[a:a+n]==O.normalized[b:b+n]
    assert C.pattern(a,n)==O.pattern(b,n)==row['relocations']
    assert sha(C.b[a:a+n])==row['candidate_raw_sha256'] and sha(O.b[b:b+n])==row['original_raw_sha256']
    calls=C.callsites(a,n);assert len(calls)==len(row['all_direct_calls'])
    for call in calls:
        actual=O.calls[b+call['offset']]
        allowed=[m['start'] for m in indexed[call['target']]['matches'] if m['entry_bounded'] and m.get('mapped_calls_consistent')]
        saved=next(c for c in row['all_direct_calls'] if c['offset']==call['offset'])
        assert saved['observed_original_target']==actual and saved['observed_target_supported']==(actual in allowed)
        if actual not in allowed:unknown.append((row['name'],call['offset'],call['target'],actual))
assert unknown==[]
assert indexed[23280]['bytes']==992 and O.entries[O.entries.index(24192)+1]-24192==992
assert O.calls[634776+160]==326272 and O.calls[634776+400]==94072
def target(e,at):
    assert e.b[at]==0x18
    return struct.unpack_from('<I',e.b,at+4)[0]|(struct.unpack_from('<I',e.b,at+12)[0]<<32)
def read_va(e,addr,n):
    for sec in e.raw:
        if sec[3]<=addr and addr+n<=sec[3]+sec[5] and sec[1]!=8:
            pos=sec[4]+addr-sec[3];return e.b[pos:pos+n]
    raise AssertionError(addr)
assert read_va(C,target(C,23280+248),8)==read_va(O,target(O,24192+248),8)==bytes([143,52,146,187,219,123,76,155])
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
print(json.dumps({'artifact_files':len(artifacts),'main_inputs':len(main),'harness_files':len(harness),'normalized_body_matches':4,'unresolved_direct_callees':len(unknown),'prior_comparison_receipts':17440,'repeated_serialization_error_receipts':1,'total_receipts':total,'new_unique_cases_from_repeats':0,'mismatches':0,'donation_steps':10,'main_scratch_byte_equal':True,'whole_original_byte_equal':False},indent=2))
