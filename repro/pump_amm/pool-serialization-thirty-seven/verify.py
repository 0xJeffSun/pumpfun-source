#!/usr/bin/env python3
"""Read-only portable package, byte, source, receipt and complete-exit verification."""
from pathlib import Path
import argparse, gzip, hashlib, json, struct, sys, tarfile
sys.dont_write_bytecode = True

HERE = Path(__file__).resolve().parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--original', type=Path)
parser.add_argument('--repo', type=Path, help='Also verify all current source, helper and runtime bindings')
args = parser.parse_args()
repo = args.repo.resolve() if args.repo else next((p for p in HERE.parents if (p / 'evidence/original/pump_amm/deployed.so').is_file()), None)
original_path = args.original or (repo / 'evidence/original/pump_amm/deployed.so' if repo else None)
assert original_path is not None, 'Pass --original when using a standalone package'
sha = lambda data: hashlib.sha256(data).hexdigest()
read = lambda name: json.loads((HERE / name).read_text())
manifest = read('manifest-sha256.json')
for path, digest in manifest.items():
    assert sha((HERE / path).read_bytes()) == digest, path
summary = read('summary.json')
build = read('build-comparison.json')
attempt = read('build-attempt.json')
assert attempt['returncode'] == 0 and attempt['source_unchanged']
assert attempt['source_sha256'] == attempt['source_after_sha256'] == build['source_sha256']
assert len(build['source_sha256']) == 18 and build['selected_toolchain'] == 'v1.44'

def archive_data(name):
    with tarfile.open(HERE / name, 'r:gz') as archive:
        members = [m for m in archive.getmembers() if m.isfile()]
        assert len({m.name for m in members}) == len(members)
        return {m.name: archive.extractfile(m).read() for m in members}

sources = archive_data('source-snapshot.tar.gz')
assert {path: sha(data) for path, data in sources.items()} == build['source_sha256']
tests = archive_data('test-snapshot.tar.gz')
assert {path: sha(data) for path, data in tests.items()} == read('test-source-sha256.json')
assert any(path.endswith('scripts/build_source_manifest.py') for path in tests)
static = archive_data('static-evidence.tar.gz')
assert sha(static['manifest.json']) == summary['static_manifest_sha256']
old_manifest = json.loads(static['manifest.json'])
assert len(old_manifest['files']) == 90
assert set(static) == {r['path'] for r in old_manifest['files']} | {'manifest.json'}
for row in old_manifest['files']:
    assert len(static[row['path']]) == row['bytes'] and sha(static[row['path']]) == row['sha256'], row['path']

candidate = (HERE / 'pump_amm_recovered.so').read_bytes()
assert sha(candidate) == summary['candidate_sha256'] and len(candidate) == summary['candidate_bytes']
assert candidate == (HERE / 'scratch-build/pump_amm_recovered.so').read_bytes()
identity = read('main-scratch-identity.json')
assert identity['whole_file_equal'] and identity['main_sha256'] == identity['scratch_sha256'] == sha(candidate)
scratch_build = read('scratch-build/build-comparison.json')
assert {str(Path(p).relative_to('programs/pump-amm')): h for p,h in build['source_sha256'].items()} == {
    str(Path(p).relative_to('work/amm-pool-serializer-recovery/crate')): h for p,h in scratch_build['source_sha256'].items()}
assert sha((HERE / 'scratch-build/manifest-sha256.json').read_bytes()) == identity['scratch_package_manifest_sha256']
for path, digest in read('scratch-build/manifest-sha256.json').items():
    assert sha((HERE / 'scratch-build' / path).read_bytes()) == digest, path

sys.path.insert(0, str(HERE))
from elf_reader_portable import Elf
original = Elf(original_path.resolve())
current = Elf(HERE / 'pump_amm_recovered.so')
symbols = Elf(HERE / 'unstripped.so')
match = read('function-match.json')
assert sha(original.b) == match['original']['sha256']
assert sha(current.b) == match['candidate']['sha256']
assert current.b[current.lo:current.hi] == symbols.b[symbols.lo:symbols.hi]
assert original.b != current.b and summary['full_byte_equality'] is False
original_bounds = dict(zip(original.entries, original.entries[1:] + [original.hi]))
symbols_by_start = {}
for row in symbols.funcs:
    symbols_by_start.setdefault(row['start'], set()).add(row['size'])
for role, row in match['functions'].items():
    selected = row['selected_function']; a = row['original_start']; b = selected['start']; size = selected['bytes']
    assert original_bounds[a] - a == size and symbols_by_start[b] == {size}
    assert original.normalized[a:a+size] == current.normalized[b:b+size]
    assert original.pattern(a, size) == current.pattern(b, size) == selected['relocations']
    assert sha(current.b[b:b+size]) == selected['raw_sha256']
    actual_calls = current.callsites(b, size)
    assert len(actual_calls) == len(row['direct_target_checks']) == 24
    for call, check in zip(actual_calls, row['direct_target_checks']):
        assert call['offset'] == check['offset'] and call['target'] == check['candidate_target']
        target = call['target']; orig_target = original.calls[a + call['offset']]
        assert orig_target == check['original_target']
        length = original_bounds[orig_target] - orig_target
        assert symbols_by_start[target] == {length}
        assert current.normalized[target:target+length] == original.normalized[orig_target:orig_target+length]
        assert current.pattern(target, length) == original.pattern(orig_target, length)
    for check in row['relocated_discriminator_checks']:
        for label, elf in [('original', original), ('candidate', current)]:
            expected = check[label]; at = expected['instruction']
            pointer = struct.unpack_from('<I', elf.b, at+4)[0] | struct.unpack_from('<I', elf.b, at+12)[0] << 32
            assert pointer == expected['pointer'] and elf.b[pointer:pointer+8].hex() == expected['consumed_bytes_hex']
for row in json.loads(static['windows.json']):
    if row['label'] == 'original':
        lo, hi = int(row['start'], 16), int(row['end'], 16)
        assert hi - lo == row['bytes'] and sha(original.b[lo:hi]) == row['raw_sha256']
run = read('regression-run.json')
assert len(run) == len(summary['suites']) == 25
for row in run:
    suite = row['suite']; count = summary['suites'][suite]
    raw = gzip.decompress((HERE / (suite + '-differential.json.gz')).read_bytes())
    receipt = json.loads(raw)
    assert row['returncode'] == 0 and row['case_count'] == count and row['mismatches'] == []
    assert row['output_sha256'] == sha(raw) and row['candidate_sha256'] == sha(candidate)
    assert receipt['candidate_sha256'] == sha(candidate) and receipt['case_count'] == count and receipt['mismatches'] == []
assert sum(summary['suites'].values()) == 17462
archived_work_inputs_only = []
if repo:
    for group in [build['source_sha256'], read('test-source-sha256.json'), read('runtime-input-sha256.json')]:
        for path, digest in group.items():
            if path.startswith('work/') and not (repo / path).exists():
                assert path in tests and sha(tests[path]) == digest
                archived_work_inputs_only.append(path)
                continue
            assert sha((repo / path).read_bytes()) == digest, path
result = {'package_files': len(manifest), 'source_inputs': len(sources), 'test_inputs': len(tests),
          'static_files': 90, 'runtime_inputs_verified': len(read('runtime-input-sha256.json')) if repo else 0,
          'archived_work_inputs_only': archived_work_inputs_only,
          'candidate_sha256': sha(candidate), 'main_scratch_whole_file_equal': True,
          'pool_exit_bytes': 1704, 'global_config_exit_bytes': 1648, 'direct_calls_per_exit': 24,
          'fresh_existing_cases': 17462, 'suites': 25, 'mismatches': [], 'full_byte_equality': False}
print(json.dumps(result, indent=2))
