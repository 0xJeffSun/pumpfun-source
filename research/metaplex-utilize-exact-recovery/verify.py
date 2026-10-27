"""Offline, read-only checks of exact ELF recovery and signed local receipts."""
from pathlib import Path, PurePosixPath
import argparse, base64, difflib, gzip, hashlib, json, sys, tarfile, tomllib
from solders.transaction import VersionedTransaction

HERE = Path(__file__).resolve().parent
root = HERE.parents[1]
ap = argparse.ArgumentParser(description=__doc__)
ap.add_argument('--packet', type=Path, default=HERE)
packet = ap.parse_args().packet.resolve()
h = lambda b: hashlib.sha256(b).hexdigest()
def load(name):
    return json.loads(gzip.decompress((packet/name).read_bytes()) if name.endswith('.gz') else (packet/name).read_bytes())

manifest = load('manifest.json')
actual = {str(f.relative_to(packet)).replace('\\', '/') for f in packet.rglob('*') if f.is_file()}
assert actual == set(manifest) | {'manifest.json'}, 'packet inventory differs'
for name, digest in manifest.items():
    assert not PurePosixPath(name).is_absolute() and '..' not in PurePosixPath(name).parts
    assert not (packet/name).is_symlink() and h((packet/name).read_bytes()) == digest, name
for name, digest in load('repository-references.json').items():
    assert h((root/name).read_bytes()) == digest, name
old = root/'repro/pump/metaplex-owned-uses-20261026'
def sources(path):
    result = {}
    with tarfile.open(path) as tf:
        for m in tf:
            assert m.isfile() and not PurePosixPath(m.name).is_absolute() and '..' not in PurePosixPath(m.name).parts
            assert m.name not in result
            result[m.name] = tf.extractfile(m).read()
    return result
before, after = sources(old/'source-snapshot.tar.gz'), sources(packet/'source-snapshot.tar.gz')
utilize = 'programs/token-metadata/program/src/processor/uses/utilize.rs'
assert set(before) == set(after) and len(after) == 18
assert [n for n in after if before[n] != after[n]] == [utilize]
assert after[utilize] == (packet/'source/utilize.rs').read_bytes()
patch = ''.join(difflib.unified_diff(before[utilize].decode().splitlines(True), after[utilize].decode().splitlines(True), fromfile='a/'+utilize, tofile='b/'+utilize, n=0))
assert patch.encode() == (packet/'utilize.patch').read_bytes()
source_manifest = load('source-manifest.json')
expected = json.loads((old/'source-manifest.json').read_text())
assert len(expected) == 812 and set(expected) == set(source_manifest)
assert [n for n in expected if expected[n] != source_manifest[n]] == [utilize]
for name, body in after.items():
    assert h(body) == source_manifest[name]
upstream = load('upstream-source-manifest.json')
assert upstream == json.loads((old/'upstream-source-manifest.json').read_text())
assert {n for n in upstream if upstream[n] != source_manifest[n]} == set(after)

sys.path.insert(0, str(root/'repro/pump_fees/framework-matching'))
from elf_reader import Elf
o = Elf(root/'evidence/dependencies/token_metadata/deployed.so')
c = Elf(packet/'candidate.so')
b = Elf(old/'candidate.so')
assert h(o.b) == '31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011'
assert h(c.b) == '99ee61a5159e15a359b01298b52c9f9f912eb19e47bdfe83987c16de52a4b1ff'
assert len(c.b) == 707448 and len(o.b) == 793991
assert c.b == o.b[:len(c.b)] and not any(o.b[len(c.b):])
assert o.entries == c.entries == b.entries and len(o.entries) == 1251
assert sum(x != y for x, y in zip(o.b, b.b)) == 80
for start, end in zip(o.entries, o.entries[1:]+[o.hi]):
    assert o.b[start:end] == c.b[start:end]
report = load('comparison.json')
assert report == {'original_sha256': h(o.b), 'candidate_sha256': h(c.b), 'baseline_sha256': h(b.b),
 'original_bytes': len(o.b), 'candidate_bytes': len(c.b), 'zero_suffix_bytes': 86543,
 'before_different_positions': 80, 'after_different_positions': 0, 'raw_equal_windows': 1251,
 'total_windows': 1251, 'utilize_start': 236632, 'utilize_bytes': 5104,
 'raw_compiler_has_allocation_suffix': False, 'loader_replay_performed': False}
for label in ['fresh', 'portable']:
    receipt = load('builds/'+label+'/result.json')
    assert receipt['returncode'] == 0 and receipt['sha256'] == h(c.b) and receipt['exact_selected_candidate']
    assert all(receipt[k] is True for k in ['source_unchanged', 'target_initially_empty', 'source_mount_readonly', 'registry_and_git_readonly'])
    assert receipt['build_network'] == 'none'
    assert load('builds/'+label+'/source-manifest.json.gz') == source_manifest
    cmd = load('builds/'+label+'/command.json')
    assert cmd[cmd.index('--network')+1] == 'none' and '--offline' in cmd and '--locked' in cmd
    assert any(v.endswith(':/build:ro') for v in cmd)
    assert not any('evidence/' in v or 'candidate.so' in v for v in cmd)
dependencies = load('builds/portable/dependencies.json')
lock_bytes = gzip.decompress((packet/'source/Cargo.lock.gz').read_bytes())
assert h(lock_bytes) == source_manifest['programs/token-metadata/Cargo.lock']
lock = tomllib.loads(lock_bytes.decode())
registry = {p['name']+'-'+p['version']:p['checksum'] for p in lock['package'] if p.get('source', '').startswith('registry+')}
assert {Path(n).name[:-6]:v for n,v in dependencies['registry_archives'].items()} == registry
assert dependencies['extracted_packages_verified'] == len(registry) > 0
assert dependencies['extracted_source_files_verified'] > 1000
assert {r['commit'] for r in dependencies['git_checkouts']} == {p['source'].split('#')[1] for p in lock['package'] if p.get('source', '').startswith('git+')}
sdk = load('builds/portable/sdk-verification.json')
assert sdk['archive_sha256'] == '8d5153589dbe19635affe937663cf4555a7e69a62d91ab4a1df064aaa8d5f066'
assert sdk['files']['rust/bin/rustc'] == '7194df9c12e893cfa88fff5dd821d02d45910b4d375e13677b4723f45769a384'
for label, digest in [('owned-control-stages', h(b.b)), ('admission-early-cleanup-stages', h(c.b))]:
    prefix = 'compiler/'+label+'/'
    receipt = load(prefix+'result.json')
    assert receipt['returncode'] == 0 and receipt['source_unchanged'] and receipt['exact_control']
    assert receipt['sha256'] == digest
    if label == 'admission-early-cleanup-stages':
        assert receipt['expected_sha256'] == digest
    trace = gzip.decompress((packet/(prefix+'trace.log.gz')).read_bytes())
    assert len(trace) == receipt['trace_bytes']
    for row in load(prefix+'stage-index.json'):
        body = gzip.decompress((packet/(prefix+f"{row['id']:03d}.txt.gz")).read_bytes())
        assert h(body) == row['sha256'] and body in trace

p = packet/'runtime'
assert h(gzip.decompress((packet/'builds/portable/compiler-output.so.gz').read_bytes())) == load('builds/portable/result.json')['compiler_output_sha256'] == 'd38edf7b5c03c25b9c323568932ac6e9c593c0e141bcea3781ee13132d88c6b0'
def verify_runtime(p):
    cases=transactions=0
    for name in ['edition','uses','burn','context','validation']:
     data=json.loads(gzip.decompress((p/(name+'-validation.json.gz')).read_bytes()));assert data['candidate_sha256']==h(c.b) and data['original_sha256']==h(o.b) and not data['mismatches'];assert data['case_count']==len(data['cases'])
     for row in data['cases']:
      left,right=row['original'],row['candidate'];assert left['transaction_base64']==right['transaction_base64'];assert left['error']==right['error'] and left['after']==right['after'];key='inner_instructions' if 'inner_instructions' in left else 'inner';assert left[key]==right[key]
      for result in [left,right]:assert all(VersionedTransaction.from_bytes(base64.b64decode(result['transaction_base64'])).verify_with_results());transactions+=1
      cases+=1
    assert cases==135 and transactions==270
    data=json.loads(gzip.decompress((p/'utilize-validation.json.gz').read_bytes()))
    assert data['binary_sha256']['candidate']==h(c.b) and data['binary_sha256']['original']==h(o.b)
    from solders.pubkey import Pubkey
    mint=Pubkey(bytes([182])*32);token=Pubkey(bytes([183])*32);program=Pubkey.from_string('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');metadata=Pubkey.find_program_address([b'metadata',bytes(program),bytes(mint)],program)[0]
    import struct
    def read_uses(hex_data):
     raw=bytes.fromhex(hex_data);offset=65
     for _ in range(3):size=struct.unpack_from('<I',raw,offset)[0];offset+=4+size
     offset+=2;tag=raw[offset];offset+=1
     if tag:size=struct.unpack_from('<I',raw,offset)[0];offset+=4+34*size
     offset+=2
     for size in [1,1,33]:
      tag=raw[offset];offset+=1
      if tag:offset+=size
     assert raw[offset]==1
     return struct.unpack_from('<BQQ',raw,offset+1)
    for row in data['cases']:
     left,right=row['results']['original'],row['results']['candidate'];case=row['case'];assert left['transaction_base64']==right['transaction_base64']
     assert all(left[k]==right[k] for k in ['error','after','inner']) and not row['mismatches']
     for result in [left,right]:
      assert all(VersionedTransaction.from_bytes(base64.b64decode(result['transaction_base64'])).verify_with_results());transactions+=1
      assert any('IX: Use/Utilize Token' in line for line in result['logs'])
      assert (result['error'] is None)==case['success']
      if case['success']:
       assert read_uses(result['after'][str(metadata)]['data_hex'])==(case['method'],case['remaining']-case['count'],case['total'])
       expected=0 if case['method']==0 and case['remaining']==case['count'] else 1
       assert struct.unpack_from('<Q',bytes.fromhex(result['after'][str(mint)]['data_hex']),36)[0]==expected
       assert struct.unpack_from('<Q',bytes.fromhex(result['after'][str(token)]['data_hex']),64)[0]==expected
      else:
       assert 'InstructionErrorCustom(86)' in result['error']
       for key in [mint,token,metadata]:assert result['before'][str(key)]==result['after'][str(key)]
     cases+=1
    assert cases==147 and transactions==294
    return cases, transactions

for folder in ['runtime', 'runtime-portable']:
    assert verify_runtime(packet/folder) == (147,294)
print(json.dumps({'raw_equal_function_windows':1251,'meaningful_elf_bytes_equal':707448,'zero_suffix_bytes':86543,'remaining_different_bytes':0,'local_replays':2,'cases_per_replay':147,'verified_signed_records_per_replay':294,'loader_replay_performed':False},indent=2))
