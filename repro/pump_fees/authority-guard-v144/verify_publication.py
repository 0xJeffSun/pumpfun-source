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
assert len(main)==len(scratch)==22
assert read('build-attempt.json')['returncode']==0 and read('build-attempt.json')['source_unchanged']
assert {p:sha(b) for p,b in main.items()}==read('source-sha256.json')==read('build-comparison.json')['source_sha256']
assert {p:sha(b) for p,b in scratch.items()}==read('scratch/source-sha256.json')
attempt=read('scratch/build-attempt.json');prefix='work/fees-admin-dataflow/workspace/'
assert {n.removeprefix(prefix):d for n,d in attempt['source_sha256'].items()}==read('scratch/source-sha256.json')
assert attempt['returncode']==0 and attempt['source_unchanged']
assert [p for p in main if main[p]!=scratch[p]]==['programs/pump-fees/README.md']
prior=R/'repro/pump_fees/buyback-source-v144'
assert sha((prior/'artifact-hashes.json').read_bytes())==read('prior-checkpoint.json')['artifact_manifest_sha256']
for n,d in json.loads((prior/'artifact-hashes.json').read_text()).items():assert sha((prior/n).read_bytes())==d
previous=archive(prior/'source-snapshot.tar.gz')
assert [p for p in scratch if scratch[p]!=previous[p]]==['programs/pump-fees/src/lib.rs']
old=previous['programs/pump-fees/src/lib.rs'].decode();new=scratch['programs/pump-fees/src/lib.rs'].decode()
assert old.replace('require_keys_neq!(new_authority, Pubkey::default(), FeeError::InvalidAdmin);','require!(new_authority != Pubkey::default(), FeeError::InvalidAdmin);')==new
harness=archive(P/'harness-snapshot.tar.gz')
assert {p:sha(b) for p,b in harness.items()}==read('harness-source-sha256.json')
assert harness['work/fees-admin-dataflow/authority_logs.py']==(P/'authority_logs.py').read_bytes()
assert harness['repro/pump_fees/buyback-source-v144/compared_values.py']==(P/'compared_values.py').read_bytes()

C=Elf(P/'pump_fees_candidate.so');O=Elf(R/'evidence/original/pump_fees/deployed.so');S=Elf(P/'symbol-source.so')
assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi]
assert C.b==(P/'scratch/pump_fees_candidate.so').read_bytes()
digest=sha(C.b);identity=read('main-scratch-identity.json')
assert digest==identity['main_binary_sha256']==identity['scratch_binary_sha256']==read('build-comparison.json')['comparison']['candidate_sha256']
assert C.b!=O.b
proof=read('static/body-analysis.json');a=proof['candidate_symbol']['start'];b=proof['original_entry'];n=proof['original_bytes']
assert a==465144 and b==103408 and n==3320 and O.entries[O.entries.index(b)+1]==b+n
assert O.calls[proof['original_dispatch_wrapper']+proof['original_wrapper_call_offset']]==b
assert [i for i in range(0,n,8) if C.normalized[a+i:a+i+8]!=O.normalized[b+i:b+i+8]]==[816,824]
assert C.pattern(a,n)==O.pattern(b,n)==proof['relocations']
matches=read_gz('function-matches.json.gz');indexed={f['start']:f for f in matches['functions']}
calls=C.callsites(a,n);assert len(calls)==len(proof['calls'])==14
for call in calls:
    actual=O.calls[b+call['offset']]
    allowed=[m['start'] for m in indexed[call['target']]['matches'] if m['entry_bounded'] and m.get('mapped_calls_consistent')]
    assert actual in allowed
for label,elf,start in [('candidate',C,a),('original',O,b)]:
    loc=next(x for x in proof['source_locations'] if x['side']==label)
    ptr=struct.unpack_from('<I',elf.b,start+780)[0]|struct.unpack_from('<I',elf.b,start+788)[0]<<32
    line=struct.unpack_from('<I',elf.b,start+820)[0];length=struct.unpack_from('<I',elf.b,start+828)[0]
    assert line==loc['line'] and length==loc['filename_bytes'] and elf.b[ptr:ptr+length].decode()==loc['filename']

total=0
for name,count in [('differential.json.gz',17331),('codec-rejections.json.gz',9),('initializer-history.json.gz',2),('initializer-rejections.json.gz',28),('messages.json.gz',2),('compared-values.json.gz',9),('authority-logs.json.gz',3)]:
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
print(json.dumps({'artifact_files':len(artifacts),'main_inputs':len(main),'scratch_inputs':len(scratch),'harness_files':len(harness),'handler_body_bytes':n,'mapped_internal_calls':len(calls),'comparisons':total,'mismatches':0,'donation_steps':10,'main_scratch_byte_equal':True,'whole_original_byte_equal':False},indent=2))
