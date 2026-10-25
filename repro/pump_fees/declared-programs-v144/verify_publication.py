#!/usr/bin/env python3
"""Portable read-only check of snapshots, decoder bytes and saved receipts."""
from pathlib import Path
import base64, gzip, hashlib, io, json, struct, sys, tarfile
from solders.transaction import VersionedTransaction

ROOT = Path(__file__).resolve().parent
REPO = next(p for p in ROOT.parents if (p / 'evidence/original/pump_fees/deployed.so').is_file())
sys.path.insert(0, str(REPO / 'repro/pump_fees/framework-matching'))
from elf_reader import Elf
sha = lambda b:hashlib.sha256(b).hexdigest()
read = lambda name:json.loads((ROOT / name).read_text())
read_gz = lambda name:json.loads(gzip.decompress((ROOT / name).read_bytes()))

def archive(name):
    with tarfile.open(fileobj=io.BytesIO((ROOT / name).read_bytes()),mode='r:gz') as tar:
        return {m.name:tar.extractfile(m).read() for m in tar if m.isfile()}

for name,digest in read('artifact-hashes.json').items():
    assert sha((ROOT / name).read_bytes()) == digest, name
source = archive('source-snapshot.tar.gz')
hashes = read('source-sha256.json')
assert {p:sha(b) for p,b in source.items()} == hashes == read('build-comparison.json')['source_sha256']
assert len(hashes) == 22
control_source = archive('control/workspace-source.tar.gz')
assert sorted(source['programs/pump-fees/src/lib.rs'].splitlines()) == sorted(control_source['programs/pump-fees/src/lib.rs'].splitlines())
assert source['programs/pump-fees/src/lib.rs'].splitlines()[26:28] == [b'declare_program!(pump);',b'declare_program!(pump_amm);']
for name in ['Cargo.toml','Cargo.lock','programs/pump-fees/idls/pump.json','programs/pump-fees/idls/pump_amm.json']:
    assert source[name] == control_source[name]
# Promotion removes only the member manifest's preexisting terminal blank line.
assert source['programs/pump-fees/Cargo.toml'].rstrip() == control_source['programs/pump-fees/Cargo.toml'].rstrip()
harness = archive('harness-snapshot.tar.gz')
assert {p:sha(b) for p,b in harness.items()} == read('harness-source-sha256.json')
old_harness = archive('scratch-build/harness-source.tar.gz')
assert {p:sha(b) for p,b in old_harness.items()} == read('runtime-harness-inputs.json')['script_sha256']
assert old_harness['scripts/build_partial_candidate.py'] == (ROOT / 'scratch-build/build_partial_candidate.py').read_bytes()
assert 'scripts/build_source_manifest.py' in harness

original = Elf(REPO / 'evidence/original/pump_fees/deployed.so')
candidate = Elf(ROOT / 'pump_fees_candidate.so')
symbols = Elf(ROOT / 'symbol-source.so')
control = Elf(ROOT / 'control/pump_fees_candidate.so')
assert candidate.b[candidate.lo:candidate.hi] == symbols.b[symbols.lo:symbols.hi]
identity = read('main-scratch-identity.json')
assert sha(candidate.b) == identity['main_binary_sha256'] == identity['scratch_binary_sha256']
assert sha(candidate.b) == read('build-comparison.json')['comparison']['candidate_sha256']
assert sha(candidate.b) == read('scratch-build/build-comparison.json')['comparison']['candidate_sha256']
assert candidate.b != original.b
matches = read_gz('function-matches.json.gz')
base_matches = read_gz('control/function-matches.json.gz')
for row in read('decoder-comparison.json')['decoders']:
    start, old, size = row['candidate_start'],row['original_start'],row['bytes']
    assert size == 728
    assert candidate.normalized[start:start+size] == original.normalized[old:old+size]
    assert candidate.pattern(start,size) == original.pattern(old,size) == row['relocations']
    match = next(f for f in matches['functions'] if f['start'] == start and f['bytes'] == size)
    assert len(match['matches']) == 1 and match['matches'][0]['start'] == old
    assert match['matches'][0]['entry_bounded'] and match['matches'][0]['mapped_calls_consistent']
    mapping = {f['start']:f['matches'][0]['start'] for f in matches['functions'] if len(f['matches']) == 1 and f['matches'][0]['entry_bounded']}
    call_targets = {c['offset']:c['target'] for c in original.callsites(old,size)}
    calls = candidate.callsites(start,size)
    assert len(calls) == 7
    assert all(mapping[c['target']] == call_targets[c['offset']] for c in calls)
    before = next(f for f in base_matches['functions'] if f['names'] == match['names'])['start']
    assert [n for n in range(0,size,8) if control.normalized[before+n:before+n+8] != original.normalized[old+n:old+n+8]] == [528]
    for elf,at in [(original,old),(candidate,start)]:
        ptr = struct.unpack_from('<I',elf.b,at+492)[0] | struct.unpack_from('<I',elf.b,at+500)[0] << 32
        length = struct.unpack_from('<I',elf.b,at+540)[0]
        assert length == 29 and elf.b[ptr:ptr+length] == b'programs/pump-fees/src/lib.rs'
        assert struct.unpack_from('<I',elf.b,at+532)[0] == (28 if row['type'] == 'Pool' else 27)

total = 0
for name,count in [('differential.json.gz',17331),('codec-rejections.json.gz',9),('initializer-history.json.gz',2),('initializer-rejections.json.gz',28),('messages.json.gz',2)]:
    d = read_gz(name)
    assert d['case_count'] == count and not d['mismatches']
    assert d['candidate_sha256'] == sha(candidate.b) and d['original_sha256'] == sha(original.b)
    total += count
for row in read_gz('codec-rejections.json.gz')['cases']:
    assert [s for s in row['original']['logs'] if 'AnchorError' in s] == [s for s in row['candidate']['logs'] if 'AnchorError' in s]
history = read_gz('initializer-history.json.gz')
for row in history['cases']:
    capture = REPO / f"repro/pump_fees/initializer-history/transactions/admin-success-{row['index']}.json"
    raw = base64.b64decode(json.loads(capture.read_text())['response']['result']['transaction'][0])
    tx = VersionedTransaction.from_bytes(raw)
    assert tx.verify_with_results() == [True]
    for side in ['original','candidate']:
        assert row[side]['raw_transaction_sha256'] == sha(raw)
        assert row[side]['signature'] == str(tx.signatures[0])
        assert row[side]['signed_message_and_signature_unchanged'] and row[side]['sigverify_runtime_enabled']
assert history['freshness_control']['blockhash_freshness_check'] and 'BlockhashNotFound' in history['freshness_control']['error']
donation = read_gz('donation-sequence.json.gz')
assert donation['candidate_sha256'] == sha(candidate.b)
assert len(donation['steps']) == 10 and not donation['mismatches'] and not donation['unexpected_errors']
for row in donation['steps']:
    for side in ['original','candidate']:
        assert all(VersionedTransaction.from_bytes(base64.b64decode(row[side]['transaction_base64'])).verify_with_results())
print(json.dumps({'input_files':22,'harness_files':len(harness),'historical_harness_files':len(old_harness),'full_checked_decoders':3,'comparisons':total,'mismatches':0,'donation_steps':10,'main_scratch_byte_equal':True,'whole_original_byte_equal':False},indent=2))
