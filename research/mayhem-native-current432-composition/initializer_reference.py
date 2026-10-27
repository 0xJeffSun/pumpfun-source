"""Offline native Linux composition check; never compiles, executes a VM, or fetches."""
if not __debug__:
    raise RuntimeError('Evidence assertions require ordinary Python')
import collections
import argparse
import gzip
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import struct
import sys
import tarfile

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
ROOT = P.parents[1]
sha = lambda b: hashlib.sha256(b).hexdigest()
load = lambda p: json.loads(p.read_bytes())
unzip = lambda n: gzip.decompress((P / 'captures' / n).read_bytes())


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    sys.modules[name] = result
    spec.loader.exec_module(result)
    return result


def archive(name):
    with tarfile.open(fileobj=io.BytesIO((P / 'captures' / name).read_bytes()), mode='r:gz') as stream:
        members = stream.getmembers()
        assert all(m.isfile() and not Path(m.name).is_absolute() and '..' not in Path(m.name).parts for m in members)
        files = {m.name: stream.extractfile(m).read() for m in members}
        assert len(files) == len(members)
    return files


def seal():
    assert not any(p.is_symlink() for p in P.rglob('*'))
    actual = {p.relative_to(P).as_posix(): sha(p.read_bytes()) for p in P.rglob('*')
              if p.is_file() and p != P / 'manifest.json'}
    assert actual == load(P / 'manifest.json')


def search_controls(wm, original, original_windows):
    expected = load(P / 'exploration/files.json')
    files = {}
    with tarfile.open(P / 'exploration/captures.tar.xz', 'r|xz') as stream:
        for member in stream:
            assert member.isfile() and not Path(member.name).is_absolute() and '..' not in Path(member.name).parts
            assert member.name not in files and member.name in expected
            raw = stream.extractfile(member).read()
            assert sha(raw) == expected[member.name]
            files[member.name] = raw
    assert files.keys() == expected.keys()
    variants = load(P / 'exploration/summary.json')['variants']
    assert len(variants) == 21
    base = {n[5:]: b for n, b in files.items() if n.startswith('base/')}
    assert len(base) == 67
    for label, observed in variants.items():
        source = dict(base)
        for name in observed['changed']:
            source[name] = files[label + '/overrides/' + name]
        launch = json.loads(files[label + '/launch.json'])
        result = json.loads(files[label + '/result.json'])
        assert {n: sha(b) for n, b in source.items()} == launch['source_inputs'] == observed['source_inputs']
        assert sorted(n for n in base if base[n] != source[n]) == sorted(observed['changed'])
        controller = 'build_native_trace.py' if '-Csave-temps=yes' in launch['command'] else 'build_native.py'
        assert launch['controller_sha256'] == sha(files['controllers/' + controller])
        assert result['returncode'] == 0 and result['source_unchanged'] and result['tools_unchanged']
        for n in ['stdout', 'stderr']:
            assert sha(files[label + '/' + n]) == result[n + '_sha256']
        for n in ['candidate', 'symbols']:
            assert sha(files[label + '/' + n + '.so']) == result[n + '_sha256'] == observed[n + '_sha256']
        catalog = wm.windows(files[label + '/symbols.so'])
        assert 441 - len(wm.compare(original_windows, catalog)['unmatched_original']) == observed['normalized'] == 429
        assert sum(any(x['raw_sha256'] == y['raw_sha256'] for y in catalog) for x in original_windows) == observed['raw_native'] == 84
        assert not observed['accepted'] and not observed['fresh_vm']
        assert files[label + '/candidate.so'] != original
    return 21


def initializer_references(wm, original, ow, image, windows):
    a = next(r for r in ow if r['address'] == 534840)
    b = next(r for r in windows if r['name'] and '5state10initialize17' in r['name'])
    assert a['bytes'] == b['bytes'] == 960 and a['signature'] == b['signature']
    def facts(data, win, catalog):
        relocations = dict(wm.m.relocations(data))
        dynamic = wm.dynamic_symbols(data)
        by_address = {r['address']: r for r in catalog}
        calls, literals = [], []
        for row in wm.m.instructions(data, win['address'], win['bytes']):
            info = relocations.get(win['address'] + row['offset'], 0)
            if row['opcode'] == 0x85:
                calls.append((row['offset'], 'import', dynamic[info >> 32]['name']) if info & 0xffffffff == 10
                             else (row['offset'], 'local', by_address[row['call_target']]['signature']))
            elif info & 0xffffffff == 8:
                address = row['lddw_value']
                if row['offset'] in [736, 936]:
                    pointer, count, line, column = struct.unpack('<QQII', wm.m.at_address(data, address, 24))
                    assert relocations[address] & 0xffffffff == 8 and pointer & 0xffffffff == 0 and count == 37
                    literals.append((row['offset'], wm.m.at_address(data, pointer >> 32, count).hex(), line, column))
                elif row['offset'] == 896:
                    literals.append((row['offset'], wm.m.at_address(data, address, 43).hex()))
                elif row['offset'] == 920:
                    drop, size, align, method = struct.unpack('<QQQQ', wm.m.at_address(data, address, 32))
                    assert (drop, size, align) == (0, 8, 4) and method & 0xffffffff == 0
                    assert relocations[address + 24] & 0xffffffff == 8
                    literals.append((row['offset'], drop, size, align, by_address[method >> 32]['signature']))
                else:
                    raise AssertionError(('unexamined initializer pointer', row))
        assert len(calls) == 6 and len(literals) == 4
        return calls, literals
    assert facts(original, a, ow) == facts(image, b, windows)
    return dict(bytes=960, ordered_immediate_calls=6, typed_pointer_observations=4,
                complete_normalized_equal=True, recursive_closure=False)


def static():
    scope = load(P / 'scope.json')
    for name, digest in scope['root_inputs'].items():
        assert sha((ROOT / name).read_bytes()) == digest
    source = archive('source.tar.gz')
    assert len(source) == 67
    assert {n: sha(b) for n, b in source.items()} == load(P / 'captures/source-inputs.json')
    changed = dict(source)
    for n in scope['changed']:
        changed[n] = unzip('overrides/' + n + '.gz')
    assert changed['src/lib.rs'] == source['src/lib.rs']
    path = 'curve-accounts/src/interface_definition.rs'
    assert changed[path] == source[path].replace(b'declare_program!(pump);', b'historical_anchor_program::declare_program!(pump);')
    assert source[path].count(b'declare_program!(pump);') == 1
    assert sorted(n for n in source if source[n] != changed[n]) == scope['changed']
    assert sha(changed['curve-accounts/idls/pump.json']) == scope['historical_idl_sha256']
    historical = archive('historical-source.tar.gz')
    tree = load(P / 'captures/historical-source-tree.json')
    assert len(tree['files']) == len(historical) == 121
    for row in tree['files']:
        data = historical[row['path']]
        assert hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest() == row['sha']
    host = dict(historical)
    for name in ['Cargo.toml', 'Cargo.lock']:
        host[name] = unzip('host-' + name + '.gz')
    for package in load(P / 'captures/supplement-packages.json'):
        name = package['name'] + '-' + package['version'] + '.crate'
        assert sha((P / 'captures/supplements' / name).read_bytes()) == package['checksum']
    host_launch = load(P / 'builds/host/launch.json')
    assert {n: sha(b) for n, b in host.items()} == host_launch['source_inputs']
    assert host_launch['controller_sha256'] == sha((P / 'controllers/build_historical_macro_linux.py').read_bytes())
    assert load(P / 'builds/host/result.json')['returncode'] == 0
    macro = unzip('host-macro.so.gz')
    assert sha(macro) == scope['host_macro_sha256']
    assert struct.unpack_from('<H', macro, 18)[0] == 62, 'host artifact must be x86-64 ELF'
    composed = load(P / 'builds/composed/builds.json')
    assert len(composed) == 2
    for record in composed:
        assert record['returncode'] == 0 and record['source_unchanged'] and record['dependencies_unchanged']
        assert record['source_inputs'] == {n: sha(b) for n, b in changed.items()}
        assert record['macro_sha256'] == sha(macro)
        assert record['controller_sha256'] == sha((P / 'controllers/replay_historical_macro_linux.py').read_bytes())
        assert not any('evidence/original' in arg for arg in record['command'])
    control_launch, control_result = [load(P / 'builds/control' / n) for n in ['launch.json', 'result.json']]
    assert control_launch['source_inputs'] == {n: sha(b) for n, b in source.items()}
    assert control_result['returncode'] == 0 and control_result['source_unchanged'] and control_result['tools_unchanged']
    assert control_launch['controller_sha256'] == sha((P / 'controllers/build_native.py').read_bytes())
    repeat = load(P / 'builds/repeat/launch.json')
    assert repeat['source_inputs'] == composed[-1]['source_inputs'] and repeat['macro_sha256'] == sha(macro)
    assert repeat['controller_sha256'] == sha((P / 'controllers/repeat_historical_linux_root.py').read_bytes())
    for label, record in [('control', control_result), ('candidate', load(P / 'builds/composed/result.json')),
                          ('repeat-candidate', load(P / 'builds/repeat/result.json'))]:
        assert sha(unzip(label + '.so.gz')) == record['candidate_sha256']
    for label, record in [('control-symbols', control_result), ('symbols', load(P / 'builds/composed/result.json')),
                          ('repeat-symbols', load(P / 'builds/repeat/result.json'))]:
        assert sha(unzip(label + '.so.gz')) == record['symbols_sha256']
    assert unzip('candidate.so.gz') == unzip('repeat-candidate.so.gz')
    assert unzip('symbols.so.gz') == unzip('repeat-symbols.so.gz')
    wm = module('linux_windows', P / 'window_map.py')
    original, control, candidate = [unzip(n + '.so.gz') for n in ['original', 'control-symbols', 'symbols']]
    assert sha(original) == scope['original_sha256']
    ow, aw, bw = map(wm.windows, [original, control, candidate])
    assert len(ow) == 441 and len(aw) == len(bw) == 449
    before, after = [], []
    cohorts = []
    for image, catalog, raw in [(control, aw, before), (candidate, bw, after)]:
        assert {r['address']: r['bytes'] for r in catalog} == {r['address']: r['bytes'] for r in wm.m.functions(image)}
        comparison = wm.compare(ow, catalog)
        matched = sorted(x['address'] for x in ow if x not in comparison['unmatched_original'])
        assert len(matched) == 429
        cohorts.append(matched)
        raw.extend(x['address'] for x in ow if any(x['raw_sha256'] == y['raw_sha256'] for y in catalog))
    assert cohorts[0] == cohorts[1]
    assert len(before) == 84 and len(after) == 85 and set(before) < set(after)
    assert set(after) - set(before) == {538944}
    # Preserve duplicate instances. This is a named-shape multiset, not an ordering proof.
    key = lambda x: (x['name'], x['signature'], x['bytes'])
    before_shapes, after_shapes = [collections.Counter(map(key, rows)) for rows in [aw, bw]]
    removed, added = before_shapes - after_shapes, after_shapes - before_shapes
    assert sum(removed.values()) == sum(added.values()) == 1
    allocator_name = '_ZN5alloc7raw_vec11finish_grow17h6c92f6057670c916E'
    old_allocator, = [x for x in aw if x['name'] == allocator_name]
    new_allocator, = [x for x in bw if x['name'] == allocator_name]
    assert removed == {key(old_allocator): 1} and added == {key(new_allocator): 1}
    assert old_allocator['bytes'] == 312 and new_allocator['bytes'] == 328
    signature = new_allocator['signature']
    assert sum(x['signature'] == signature for x in ow) == 2
    assert sum(x['signature'] == signature for x in aw) == 1
    assert sum(x['signature'] == signature for x in bw) == 2
    # A real upstream macro gate restores the control's complete named-shape multiset.
    # The resulting native ELF does not reproduce the control's layout/call bytes.
    gated_host = dict(historical)
    for name in ['Cargo.toml', 'Cargo.lock', 'lang/attribute/program/src/declare_program/mods/utils.rs']:
        gated_host[name] = unzip('gated-host/' + name + '.gz')
    utils = 'lang/attribute/program/src/declare_program/mods/utils.rs'
    old = b'        /// Program utilities.\n        pub mod utils {'
    new = b'        /// Program utilities.\n        #[cfg(not(target_os = "solana"))]\n        pub mod utils {'
    assert historical[utils].count(old) == 1 and gated_host[utils] == historical[utils].replace(old, new)
    blob = gated_host[utils]
    assert hashlib.sha1(b'blob ' + str(len(blob)).encode() + b'\0' + blob).hexdigest() == '4fb84b0879c07819886ba419fee5b6434436555d'
    assert {n: sha(b) for n, b in gated_host.items()} == load(P / 'builds/gated-host/launch.json')['source_inputs']
    assert load(P / 'builds/gated-host/result.json')['returncode'] == 0
    assert sha(unzip('gated-host-macro.so.gz')) == scope['gated_host_macro_sha256']
    gated_records = load(P / 'builds/gated/builds.json')
    for record in gated_records:
        assert record['returncode'] == 0 and record['source_unchanged'] and record['dependencies_unchanged']
        assert record['source_inputs'] == composed[-1]['source_inputs']
        assert record['macro_sha256'] == scope['gated_host_macro_sha256']
    gated = unzip('gated-symbols.so.gz')
    assert collections.Counter(map(key, wm.windows(gated))) == before_shapes
    gated_result = load(P / 'builds/gated/result.json')
    assert sha(gated) == gated_result['symbols_sha256']
    assert sha(unzip('gated-candidate.so.gz')) == gated_result['candidate_sha256']
    assert unzip('gated-candidate.so.gz') != unzip('control.so.gz')
    assert original != unzip('candidate.so.gz')
    assert original[:wm.m.elf_layout(original)['elf_extent']] != unzip('candidate.so.gz')[:wm.m.elf_layout(unzip('candidate.so.gz'))['elf_extent']]
    search_count = search_controls(wm, original, ow)
    source430 = archive('initializer430-source.tar.gz')
    assert len(source430) == 67
    assert {n: sha(b) for n, b in source430.items()} == load(P / 'captures/initializer430-source-inputs.json')
    assert sorted(n for n in source if source[n] != source430[n]) == ['src/state.rs']
    composed430 = dict(changed)
    composed430['src/state.rs'] = source430['src/state.rs']
    source_sets = {'control430': source430, 'current430': composed430, 'repeat430': composed430}
    current = {}
    current_raws = {}
    for label, inputs in source_sets.items():
        launch, result = [load(P / 'builds' / label / n) for n in ['launch.json', 'result.json']]
        assert launch['source_inputs'] == {n: sha(b) for n, b in inputs.items()}
        assert result['returncode'] == 0 and result['source_unchanged']
        assert launch['checked_tools'] == control_launch['checked_tools']
        producer = 'build_native.py' if label == 'control430' else 'replay_historical_linux_430.py'
        assert launch['controller_sha256'] == sha((P / 'controllers' / producer).read_bytes())
        if label == 'control430':
            assert result['tools_unchanged']
        else:
            assert result['dependencies_unchanged'] and launch['macro_sha256'] == scope['host_macro_sha256']
        assert not any('evidence/original' in arg for arg in launch['command'])
        assert sha(unzip(label + '-candidate.so.gz')) == result['candidate_sha256']
        symbols = unzip(label + '-symbols.so.gz')
        assert sha(symbols) == result['symbols_sha256']
        rows = wm.windows(symbols)
        comparison = wm.compare(ow, rows)
        assert 441 - len(comparison['unmatched_original']) == 430
        raw = [x['address'] for x in ow if any(x['raw_sha256'] == r['raw_sha256'] for r in rows)]
        assert len(raw) == (84 if label == 'control430' else 85)
        current_raws[label] = set(raw)
        reference = initializer_references(wm, original, ow, symbols, rows)
        current[label] = dict(candidate_sha256=result['candidate_sha256'], symbols_sha256=result['symbols_sha256'],
                              normalized=430, native_raw=len(raw), initializer=reference)
    assert unzip('current430-candidate.so.gz') == unzip('repeat430-candidate.so.gz')
    assert unzip('current430-symbols.so.gz') == unzip('repeat430-symbols.so.gz')
    assert current_raws['control430'] < current_raws['current430']
    assert current_raws['current430'] - current_raws['control430'] == {538944}
    return dict(normalized=429, native_raw_before=84, native_raw_after=85,
                new_native_raw_original=[538944], new_native_raw_bytes=544,
                allocator_original_copies=2, allocator_before=1, allocator_after=2,
                gated_control_named_shapes_equal=True, gated_control_complete_elf_equal=False,
                changed_function=allocator_name, unchanged_normalized_candidate_functions=448,
                unaccepted_search_controls=search_count,
                current430=current,
                source_inputs=67, authenticated_historical_files=121,
                candidate_sha256=sha(unzip('candidate.so.gz')), symbols_sha256=sha(candidate),
                whole_original_equal=False, meaningful_elf_equal=False)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--static-only', action='store_true')
    args = parser.parse_args()
    seal()
    result = static()
    assert result == load(P / 'observations.json')
    if not args.static_only:
        runtime = module('native_linux_runtime', P / 'runtime_check.py').check()
        assert runtime == load(P / 'runtime-summary.json')
        result['runtime'] = runtime
    print(json.dumps(result, sort_keys=True))
