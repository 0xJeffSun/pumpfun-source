"""Offline certificate replay; no compiler, network, Git, VM, or missing-file fallback."""
if not __debug__:
    raise RuntimeError('Evidence assertions require ordinary Python')
import argparse
import base64
import gzip
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import re
import sys
import tarfile

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
ROOT = P.parents[1]
sha = lambda b: hashlib.sha256(b).hexdigest()
load = lambda p: json.loads(p.read_bytes())


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    sys.modules[name] = result
    spec.loader.exec_module(result)
    return result


def manifest():
    paths = list(P.rglob('*'))
    assert not any(p.is_symlink() for p in paths)
    assert all(p.is_file() or p.is_dir() for p in paths), 'packet special file'
    actual = {p.relative_to(P).as_posix(): sha(p.read_bytes()) for p in paths
              if p.is_file() and p != P / 'manifest.json'}
    assert actual == load(P / 'manifest.json'), 'packet seal'


def inputs(scope):
    archive = (P / 'captures/source.tar.gz').read_bytes()
    assert sha(archive) == scope['source_archive_sha256']
    with tarfile.open(fileobj=io.BytesIO(archive), mode='r:gz') as stream:
        members = stream.getmembers()
        assert all(m.isfile() and not Path(m.name).is_absolute() and '..' not in Path(m.name).parts for m in members)
        files = {m.name: stream.extractfile(m).read() for m in members}
    assert len(files) == len(members) == 67
    assert {n: sha(b) for n, b in files.items()} == load(P / 'captures/source-inputs.json')
    return files


def static(scope):
    for n, digest in scope['root_inputs'].items():
        assert sha((ROOT / n).read_bytes()) == digest, n
    source = inputs(scope)
    wm = module('initializer_windows', P / 'window_map.py')
    machine = module('initializer_machine', P / 'machine.py')
    original = gzip.decompress((P / 'captures/original.so.gz').read_bytes())
    assert sha(original) == scope['original_sha256'] == 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
    ow = wm.windows(original)
    oi = next(x for x in ow if x['address'] == 534840)
    assert oi['bytes'] == 960 and oi['instructions'] == 116
    report = {'original_machine': machine.prove(wm, original, oi, ow), 'variants': {}}
    tools = None
    for label, variant in scope['variants'].items():
        directory = P / 'captures' / label
        launch, result = load(directory / 'launch.json'), load(directory / 'result.json')
        actual_source = dict(source)
        if variant['changed']:
            actual_source['src/state.rs'] = gzip.decompress((directory / 'state.rs.gz').read_bytes())
        assert sorted(n for n in source if source[n] != actual_source[n]) == variant['changed']
        assert actual_source['src/lib.rs'] == source['src/lib.rs']
        before, after = source['src/state.rs'], actual_source['src/state.rs']
        assert len(before.splitlines()) == len(after.splitlines())
        for body in [before, after]:
            assert body.count(b'pub fn initialize(ctx:') == 1
        a, b = [x.index(b'pub fn initialize(ctx:') for x in [before, after]]
        assert before[:a] == after[:b]
        a, b = [x.index(b'\nimpl MayhemState {', i) for x, i in [(before, a), (after, b)]]
        assert before[a:] == after[b:]
        assert {n: sha(b) for n, b in actual_source.items()} == launch['source_inputs'] == load(directory / 'source-inputs.json')
        assert launch['controller_sha256'] == sha((P / variant['controller']).read_bytes())
        assert len(launch['checked_tools']) == 6
        if tools is None:
            tools = launch['checked_tools']
        assert tools == launch['checked_tools']
        assert result['source_unchanged'] and result['tools_unchanged']
        for name in ['stdout', 'stderr']:
            assert sha(gzip.decompress((directory / (name + '.gz')).read_bytes())) == result[name + '_sha256']
        if not variant['successful']:
            assert result['returncode'] == 101
            assert b'E0599' in gzip.decompress((directory / 'stderr.gz').read_bytes())
            report['variants'][label] = dict(compiler_rejected=True)
            continue
        assert result['returncode'] == 0
        candidate, symbols = [gzip.decompress((directory / (n + '.so.gz')).read_bytes()) for n in ['candidate', 'symbols']]
        assert sha(candidate) == result['candidate_sha256'] and len(candidate) == result['candidate_bytes']
        assert sha(symbols) == result['symbols_sha256']
        cw = wm.windows(symbols)
        assert {r['address']: r['bytes'] for r in cw} == {r['address']: r['bytes'] for r in wm.m.functions(symbols)}
        ci = next(x for x in cw if x['name'] and '5state10initialize17' in x['name'])
        comparison = wm.compare(ow, cw)
        matched = sorted(x['address'] for x in ow if x not in comparison['unmatched_original'])
        raw = sorted(x['address'] for x in ow if any(x['raw_sha256'] == y['raw_sha256'] for y in cw))
        assert len(matched) == 429 and len(raw) == 84
        assert oi['signature'] != ci['signature'] and original != candidate
        observation = dict(candidate_sha256=sha(candidate), symbols_sha256=sha(symbols),
                           initializer=ci, matched_original=matched, raw_local_original=raw,
                           whole_file_equal=original == candidate,
                           meaningful_elf_equal=original[:wm.m.elf_layout(original)['elf_extent']] == candidate[:wm.m.elf_layout(candidate)['elf_extent']])
        assert not observation['meaningful_elf_equal']
        if label in ['validator429-native-control', 'initializer-direct-fields-preclock']:
            observation['machine'] = machine.prove(wm, symbols, ci, cw)
            for key in ['outcomes', 'concrete_integer_tuples', 'duration_values', 'clock_outcomes']:
                assert observation['machine'][key] == report['original_machine'][key]
        report['variants'][label] = observation
    for left, right in [('initializer-direct-fields-preclock', 'initializer-direct-fields-repeat'),
                        ('initializer-set-inner-preclock', 'initializer-aggregate-preclock')]:
        for key in ['candidate_sha256', 'symbols_sha256']:
            assert report['variants'][left][key] == report['variants'][right][key]
    ir = load(P / 'ir/inventory.json')
    for n, digest in ir['files'].items():
        assert sha(gzip.decompress((P / 'ir' / (n + '.gz')).read_bytes())) == digest
    fragments = list((P / 'ir').glob('*.initialize.txt.gz'))
    assert len(fragments) == 2
    optimized = gzip.decompress(next(p for p in fragments if 'no-opt' not in p.name).read_bytes()).decode()
    assert 'llvm.memcpy.p0.p0.i64' in optimized and 'llvm.sadd.with.overflow.i64' in optimized
    assert 'i64 32, i1 false' in optimized and 'llvm.memset.p0.i64' in optimized
    assert 'i64 32' in optimized
    return report


def runtime(scope, signatures=False):
    if signatures:
        from solders.transaction import Transaction
    mayhem = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
    pump = json.loads((P / 'runtime/inputs/evidence/upstream/pump.json').read_bytes())['address']
    result = []
    candidate = gzip.decompress((P / 'captures' / scope['runtime_candidate'] / 'candidate.so.gz').read_bytes())
    original = gzip.decompress((P / 'captures/original.so.gz').read_bytes())
    for n, digest in scope['runtime_frozen_inputs'].items():
        assert sha((P / 'runtime/inputs' / n).read_bytes()) == digest
    for kind, count in [('rejections', 53), ('pump-cpi', 16)]:
        receipt = json.loads(gzip.decompress((P / 'runtime' / (kind + '.json.gz')).read_bytes()))
        assert receipt['candidate_sha256'] == sha(candidate) and receipt['original_sha256'] == sha(original)
        producer = 'replay.py' if kind == 'rejections' else 'run_remaining_initializer_cpi.py'
        assert receipt['runner_sha256'] == sha((P / 'producers' / producer).read_bytes())
        assert len(receipt['cases']) == receipt['case_count'] == count and not receipt['mismatches']
        for n, digest in receipt['harness_sha256'].items():
            if n == 'research/mayhem-initializer-source-origins/runtime/replay.py':
                assert sha((P / 'producers/replay.py').read_bytes()) == digest
            else:
                assert scope['runtime_frozen_inputs'][n] == digest
        cases = load(P / 'runtime' / (kind + '-cases.json'))
        assert [r['case'] for r in receipt['cases']] == cases
        expected_fields = (['error', 'anchor_errors', 'before', 'after', 'events', 'inner', 'return', 'signed_transaction_base64']
                           if kind == 'rejections' else ['before', 'after', 'error', 'events', 'inner', 'return'])
        assert receipt['compared_fields'] == expected_fields
        signed, success, raw_logs = 0, 0, 0
        consumption = re.compile(r'^Program \S+ consumed \d+ of \d+ compute units$')
        for row in receipt['cases']:
            assert not row['differences']
            for field in receipt['compared_fields']:
                assert row['original'][field] == row['candidate'][field], (kind, row['case'], field)
            a, b = row['original']['logs'], row['candidate']['logs']
            raw_logs += a != b
            assert [x for x in a if not consumption.fullmatch(x)] == [x for x in b if not consumption.fullmatch(x)]
            success += row['original']['error'] is None
            left, right = [row[s + '_executions'] for s in ['original', 'candidate']]
            expected_count = 1 if kind == 'rejections' or not row['case'].get('init_global_params', True) else 2
            assert len(left) == len(right) == expected_count
            assert [r['signed_transaction_base64'] for r in left] == [r['signed_transaction_base64'] for r in right]
            for side, binary in [('original', original), ('candidate', candidate)]:
                for execution in row[side + '_executions']:
                    raw = base64.b64decode(execution['signed_transaction_base64'], validate=True)
                    assert raw
                    if signatures:
                        tx = Transaction.from_bytes(raw)
                        assert all(tx.verify_with_results())
                    signed += 1
                    assert execution['program_accounts'][mayhem] == dict(sha256=sha(binary), bytes=len(binary), executable=True)
                    if kind == 'pump-cpi':
                        assert execution['program_accounts'][pump] == dict(sha256=scope['runtime_original_pump_sha256'], bytes=scope['runtime_original_pump_bytes'], executable=True)
        assert success == (0 if kind == 'rejections' else 10)
        assert raw_logs == (0 if kind == 'rejections' else 9)
        result.append(dict(kind=kind, cases=count, successes=success, signed_execution_records=signed,
                           raw_log_differences=raw_logs, noncompute_log_differences=0))
    assert sum(r['signed_execution_records'] for r in result) == 168
    return result


def verify(check_manifest=True, signatures=False):
    if check_manifest:
        manifest()
    scope = load(P / 'scope.json')
    result = static(scope)
    result['runtime'] = runtime(scope, signatures)
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--record', action='store_true')
    parser.add_argument('--signatures', action='store_true')
    args = parser.parse_args()
    result = verify(check_manifest=not args.record, signatures=args.signatures)
    if args.record:
        (P / 'observations.json').write_text(json.dumps(result, indent=2) + '\n')
    else:
        assert result == load(P / 'observations.json')
    print(json.dumps(dict(result='PASS', scope='Conditional initializer machine contract; zero new matched windows or whole identity', signatures_checked=args.signatures, runtime=result['runtime'])))
