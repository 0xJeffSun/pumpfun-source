#!/usr/bin/env python3
"""Read-only checks of saved source, code boundaries, calls and signed receipts."""
from pathlib import Path
import base64,gzip,hashlib,io,json,struct,sys,tarfile
from solders.transaction import VersionedTransaction
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
sys.path.insert(0,str(R/'repro/pump_fees/framework-matching'))
from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
read=lambda name:json.loads((P/name).read_text())
read_gz=lambda name:json.loads(gzip.decompress((P/name).read_bytes()))
def archive(path):
    with tarfile.open(fileobj=io.BytesIO(path.read_bytes()),mode='r:gz') as tar:
        return {m.name:tar.extractfile(m).read() for m in tar if m.isfile()}

artifacts=read('artifact-hashes.json')
for name,digest in artifacts.items():assert sha((P/name).read_bytes())==digest,name
source=archive(P/'source-snapshot.tar.gz')
assert {p:sha(b) for p,b in source.items()}==read('source-sha256.json')==read('build-comparison.json')['source_sha256']
assert len(source)==22
previous=archive(R/'repro/pump_fees/declared-programs-v144/source-snapshot.tar.gz')
changed=[p for p in source if source[p]!=previous[p]]
assert changed==['programs/pump-fees/src/buyback.rs'],changed
old=previous[changed[0]].decode();new=source[changed[0]].decode()
old=old.replace('require!(index<8,FeeError::InvalidBuybackIndex)','require_gt!(8u8,index,FeeError::InvalidBuybackIndex)',3)
start=old.index("pub struct UpdateBuyback<'info>");end=old.index('#[derive(Accounts)]',start)
old=old[:start]+old[start:end].replace("pub buyback_vault:Account<'info,BuybackVault>","pub buyback_vault:Box<Account<'info,BuybackVault>>")+old[end:]
assert old==new
harness=archive(P/'harness-snapshot.tar.gz')
assert {p:sha(b) for p,b in harness.items()}==read('harness-source-sha256.json')
assert harness['work/fees-body-followup/compared_values.py']==(P/'compared_values.py').read_bytes()
for name in ['macro','macro-box','typed-macro-box']:
    files=archive(P/f'scratch/{name}/workspace-source.tar.gz')
    hashes=read(f'scratch/{name}/source-sha256.json')
    assert {p:sha(b) for p,b in files.items()}==hashes and len(files)==22
    attempt=read(f'scratch/{name}/build-attempt.json')
    prefix=f'work/fees-body-followup/{name}-workspace/'
    assert {p.removeprefix(prefix):d for p,d in attempt['source_sha256'].items()}==hashes
    assert attempt['returncode']==0 and attempt['source_unchanged']
    assert sha((P/f'scratch/{name}/pump_fees_candidate.so').read_bytes())==read(f'scratch/{name}/build-comparison.json')['comparison']['candidate_sha256']

candidate=Elf(P/'pump_fees_candidate.so');original=Elf(R/'evidence/original/pump_fees/deployed.so');symbols=Elf(P/'symbol-source.so')
assert candidate.b[candidate.lo:candidate.hi]==symbols.b[symbols.lo:symbols.hi]
assert candidate.b==(P/'scratch/typed-macro-box/pump_fees_candidate.so').read_bytes()
digest=sha(candidate.b);identity=read('main-scratch-identity.json')
assert digest==identity['main_binary_sha256']==identity['scratch_binary_sha256']==read('build-comparison.json')['comparison']['candidate_sha256']
assert candidate.b!=original.b
matches=read_gz('function-matches.json.gz');indexed={f['start']:f for f in matches['functions']}
for row in read('static/typed-macro-box-analysis.json')['rows']:
    c,o=row['candidate'],row['original'];a,b,n=c['start'],o['start'],c['size']
    assert n==o['size'] and original.entries[original.entries.index(b)+1]==b+n
    assert original.calls[o['wrapper']+o['wrapper_call_offset']]==b
    assert sha(candidate.b[a:a+n])==c['raw_sha256'] and sha(original.b[b:b+n])==o['raw_sha256']
    assert [i for i in range(0,n,8) if candidate.normalized[a+i:a+i+8]!=original.normalized[b+i:b+i+8]]==row['same_offset_instruction_differences']
    assert candidate.pattern(a,n)==original.pattern(b,n)==row['candidate_relocations']==row['original_relocations']
    for elf,start,location in [(candidate,a,c['location']),(original,b,o['location'])]:
        at=start+location['filename_relocation_offset'];ptr=struct.unpack_from('<I',elf.b,at+4)[0]|struct.unpack_from('<I',elf.b,at+12)[0]<<32
        line=struct.unpack_from('<I',elf.b,at+44)[0];length=struct.unpack_from('<I',elf.b,at+52)[0]
        assert line==location['line'] and length==location['filename_bytes'] and elf.b[ptr:ptr+length].decode()==location['filename']
    for call in candidate.callsites(a,n):
        actual=original.calls[b+call['offset']]
        allowed=[m['start'] for m in indexed[call['target']]['matches'] if m['entry_bounded'] and m.get('mapped_calls_consistent')]
        assert actual in allowed
helper=read('static/with-values-calls.json')
assert candidate.normalized[1008:2872]==original.normalized[2312:4176]
assert len(helper['direct_calls'])==12
for row in helper['direct_calls']:
    assert candidate.calls[1008+row['offset']]==row['candidate_target'] and original.calls[2312+row['offset']]==row['original_target']
    assert row['original_target'] in row['all_bounded_consistent_matches']

total=0
for name,count in [('differential.json.gz',17331),('codec-rejections.json.gz',9),('initializer-history.json.gz',2),('initializer-rejections.json.gz',28),('messages.json.gz',2),('compared-values.json.gz',9)]:
    d=read_gz(name);assert d['case_count']==count and not d['mismatches']
    assert d['candidate_sha256']==digest and d['original_sha256']==sha(original.b);total+=count
for row in read_gz('codec-rejections.json.gz')['cases']:
    assert [s for s in row['original']['logs'] if 'AnchorError' in s]==[s for s in row['candidate']['logs'] if 'AnchorError' in s]
history=read_gz('initializer-history.json.gz')
for row in history['cases']:
    capture=R/f"repro/pump_fees/initializer-history/transactions/admin-success-{row['index']}.json"
    raw=base64.b64decode(json.loads(capture.read_text())['response']['result']['transaction'][0]);tx=VersionedTransaction.from_bytes(raw)
    assert tx.verify_with_results()==[True]
    for side in ['original','candidate']:
        assert row[side]['raw_transaction_sha256']==sha(raw) and row[side]['signature']==str(tx.signatures[0])
        assert row[side]['signed_message_and_signature_unchanged'] and row[side]['sigverify_runtime_enabled']
assert history['freshness_control']['blockhash_freshness_check'] and 'BlockhashNotFound' in history['freshness_control']['error']
focused=read_gz('compared-values.json.gz')
assert focused['signature_verification_enabled'] and focused['blockhash_check_enabled']
for row in focused['cases']:
    assert all(row['checks'].values())
    index=row['case']['index'];expected=[] if index==7 else ['Program log: Left: 8',f'Program log: Right: {index}']
    for side in ['original','candidate']:
        assert all(VersionedTransaction.from_bytes(base64.b64decode(row[side]['transaction_base64'])).verify_with_results())
        assert [s for s in row[side]['logs'] if s.startswith(('Program log: Left:','Program log: Right:'))]==expected
donation=read_gz('donation-sequence.json.gz')
assert donation['candidate_sha256']==digest and len(donation['steps'])==10 and not donation['mismatches'] and not donation['unexpected_errors']
for row in donation['steps']:
    for side in ['original','candidate']:assert all(VersionedTransaction.from_bytes(base64.b64decode(row[side]['transaction_base64'])).verify_with_results())
print(json.dumps({'artifact_files':len(artifacts),'input_files':len(source),'harness_files':len(harness),'static_body_mappings':5,'compared_value_helper_bytes':1864,'comparisons':total,'mismatches':0,'donation_steps':10,'main_scratch_byte_equal':True,'whole_original_byte_equal':False},indent=2))
