"""Recompute the captured native controls. No compiler, VM, Git or network fallback."""
if not __debug__:
    raise RuntimeError('Optimized Python disables evidence assertions')

import collections
import gzip
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import sys
import tarfile

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
ROOT = P.parents[1]
sha = lambda b: hashlib.sha256(b).hexdigest()
load = lambda p: json.loads(p.read_bytes())


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


def sources(scope, label):
    with tarfile.open(fileobj=io.BytesIO((P / 'captures/source.tar.gz').read_bytes()), mode='r:gz') as t:
        members = t.getmembers()
        assert all(m.isfile() and not Path(m.name).is_absolute()
                   and '..' not in Path(m.name).parts for m in members)
        files = {m.name: t.extractfile(m).read() for m in members}
    assert len(files) == len(members) == 67
    assert {n: sha(b) for n, b in files.items()} == load(P / 'captures/source-inputs.json')
    baseline = dict(files)
    directory = P / 'captures' / label
    for n in scope['variants'][label]['changed']:
        files[n] = gzip.decompress((directory / 'overrides' / (n + '.gz')).read_bytes())
    assert files['src/lib.rs'] == baseline['src/lib.rs']
    assert files.keys() == baseline.keys()
    assert sorted(n for n in files if files[n] != baseline[n]) == scope['variants'][label]['changed']
    for n in files:
        assert len(files[n].splitlines()) == len(baseline[n].splitlines())
        if n == 'src/state.rs':
            # These controls touch the ordinary quote helpers only.
            a, b = (x.index(b'pub fn buy_quote(') for x in (baseline[n], files[n]))
            assert baseline[n][:a] == files[n][:b]
            a = baseline[n].index(b'#[account]', a)
            b = files[n].index(b'#[account]', b)
            assert baseline[n][a:] == files[n][b:]
        elif n in ['src/instructions/buy_pump_swap.rs', 'src/instructions/sell_pump_swap.rs']:
            old = b'retained_reserve_bps as u64,a.quote_mint.key())?;'
            new = b'retained_reserve_bps as u64,&a.quote_mint.key())?;'
            assert files[n] in (baseline[n], baseline[n].replace(old, new))
        else:
            assert files[n] == baseline[n]
    assert {n: sha(b) for n, b in files.items()} == load(directory / 'source-inputs.json')
    return files


def calls(wm, image, window, catalog):
    symbols = wm.dynamic_symbols(image)
    relocations = dict(wm.m.relocations(image))
    by_address = {r['address']: r for r in catalog}
    result = []
    for row in wm.m.instructions(image, window['address'], window['bytes']):
        if row['opcode'] != 0x85:
            continue
        absolute = window['address'] + row['offset']
        info = relocations.get(absolute, 0)
        if info & 0xffffffff == 10:
            item = dict(kind='import', name=symbols[info >> 32]['name'])
        else:
            target = by_address[row['call_target']]
            item = dict(kind='local', target=row['call_target'],
                        bytes=target['bytes'], signature=target['signature'])
        result.append(dict(offset=row['offset'], **item))
    return result


def identity(call):
    return (call['kind'], call.get('signature', call.get('name')))


def positive_edges(wm, original, ow, candidate, cw):
    groups = collections.defaultdict(list)
    for row in cw:
        groups[row['signature']].append(row)
    result = []
    for row in ow:
        counterparts = groups[row['signature']]
        if not counterparts:
            continue
        oc = calls(wm, original, row, ow)
        cc = [calls(wm, candidate, c, cw) for c in counterparts]
        for i, call in enumerate(oc):
            assert all(len(x) == len(oc) and x[i]['offset'] == call['offset'] for x in cc)
            if all(identity(x[i]) == identity(call) for x in cc):
                result.append([row['address'], call['offset'], *identity(call)])
    return result


def observe(wm, original, ow, candidate, symbols):
    cw = wm.windows(symbols)
    assert {r['address']: r['bytes'] for r in cw} == {
        r['address']: r['bytes'] for r in wm.m.functions(symbols)}
    by_address = {r['address']: r['bytes'] for r in cw}
    assert all(by_address[r['address']] == r['bytes'] for r in wm.m.functions(symbols))
    comparison = wm.compare(ow, cw)
    missing = [r['address'] for r in comparison['unmatched_original']]
    matched = [r['address'] for r in ow if r['address'] not in missing]
    helpers = {}
    for name, address in [('buy_quote', 185296), ('sell_quote', 186552), ('validate_quote', 188864)]:
        source = next(x for x in ow if x['address'] == address)
        fragment = ('state9buy_quote' if name == 'buy_quote' else
                    'state10sell_quote' if name == 'sell_quote' else 'validate_quote17h')
        choices = [r for r in cw if r['name'] and fragment in r['name']]
        assert len(choices) == 1, (name, choices)
        target = choices[0]
        oc, cc = calls(wm, original, source, ow), calls(wm, symbols, target, cw)
        helpers[name] = dict(original_address=address, original_bytes=source['bytes'],
            candidate_address=target['address'], candidate_bytes=target['bytes'],
            complete_normalized_equal=source['signature'] == target['signature'],
            original_calls=oc, candidate_calls=cc,
            callee_multiset_equal=collections.Counter(map(identity, oc)) == collections.Counter(map(identity, cc)))
    return dict(original_windows=len(ow), candidate_windows=len(cw),
        matched_windows=len(matched), matched_original=matched,
        raw_local_windows=[x['address'] for x in ow if any(x['raw_sha256'] == y['raw_sha256'] for y in cw)],
        unmatched_original=missing, helpers=helpers,
        positive_immediate_edges=positive_edges(wm, original, ow, symbols, cw),
        candidate_sha256=sha(candidate), symbols_sha256=sha(symbols),
        whole_file_equal=original == candidate,
        meaningful_elf_equal=original[:wm.m.elf_layout(original)['elf_extent']] == candidate[:wm.m.elf_layout(candidate)['elf_extent']])


def manifest_check(root=None):
    root = P if root is None else root
    paths = list(root.rglob('*'))
    assert not any(p.is_symlink() for p in paths), 'packet symlink'
    assert all(p.is_dir() or p.is_file() for p in paths), 'packet special file'
    actual = {p.relative_to(root).as_posix():sha(p.read_bytes()) for p in paths
              if p.is_file() and p != root/'manifest.json'}
    assert actual == load(root/'manifest.json'), 'packet manifest'


def verify(check_manifest=True):
    scope = load(P / 'scope.json')
    assert len(scope['variants']) == 16 and len(scope['frozen_harness']) == 220
    for n, h in scope['root_inputs'].items():
        assert sha((ROOT / n).read_bytes()) == h, n
    if check_manifest:
        manifest_check()
    assert sha((P / 'captures/source.tar.gz').read_bytes()) == scope['source_archive_sha256']
    original = gzip.decompress((P / 'captures/original.so.gz').read_bytes())
    assert sha(original) == scope['original_sha256'] == 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
    wm = module('quote_windows', P / 'window_map.py')
    ow = wm.windows(original)
    observations = {}
    tool_set = None
    for label in scope['variants']:
        directory = P / 'captures' / label
        launch, result = load(directory / 'launch.json'), load(directory / 'result.json')
        files = sources(scope, label)
        assert {n: sha(b) for n, b in files.items()} == launch['source_inputs']
        assert launch['controller_sha256'] == sha((P / 'build_native.py').read_bytes())
        assert len(launch['checked_tools']) == 6
        if tool_set is None:
            tool_set = launch['checked_tools']
        assert launch['checked_tools'] == tool_set
        assert result['returncode'] == 0 and result['source_unchanged'] and result['tools_unchanged']
        for n in ['stdout', 'stderr']:
            assert sha(gzip.decompress((directory / (n + '.gz')).read_bytes())) == result[n + '_sha256']
        candidate, symbols = (gzip.decompress((directory / (n + '.so.gz')).read_bytes())
                              for n in ['candidate', 'symbols'])
        assert sha(candidate) == result['candidate_sha256'] and len(candidate) == result['candidate_bytes']
        assert sha(symbols) == result['symbols_sha256']
        strip = load(directory / 'strip-replay.json')
        assert strip['returncode'] == 0 and strip['candidate_equal']
        assert strip['symbols_sha256'] == sha(symbols) and strip['output_sha256'] == sha(candidate)
        assert strip['tool_sha256'] == tool_set[strip['command'][0]]
        observations[label] = observe(wm, original, ow, candidate, symbols)
    base = observations['validator429-native-control']
    repeat = observations['validator429-native-repeat']
    assert base['candidate_sha256'] == repeat['candidate_sha256'] and base['symbols_sha256'] == repeat['symbols_sha256']
    for label, row in observations.items():
        assert row['matched_windows'] == base['matched_windows'] == 429
        assert row['matched_original'] == base['matched_original']
        assert not row['whole_file_equal'] and not row['meaningful_elf_equal']
        assert row['helpers']['validate_quote']['complete_normalized_equal']
        assert not row['helpers']['buy_quote']['complete_normalized_equal']
        assert not row['helpers']['sell_quote']['complete_normalized_equal']
        assert {tuple(x) for x in base['positive_immediate_edges']} <= {tuple(x) for x in row['positive_immediate_edges']}
    for label in ['buy-retained-checked', 'sell-retained-checked', 'both-retained-checked']:
        assert observations[label]['candidate_sha256'] == base['candidate_sha256']
        assert observations[label]['symbols_sha256'] == base['symbols_sha256']
    if check_manifest:
        assert observations == json.loads(gzip.decompress((P / 'observations.json.gz').read_bytes()))
    return observations


if __name__ == '__main__':
    rows = verify(check_manifest='--record' not in sys.argv)
    if '--record' in sys.argv:
        (P / 'observations.json.gz').write_bytes(gzip.compress((json.dumps(rows, indent=2) + '\n').encode(), mtime=0))
    for label, row in rows.items():
        print(label, row['matched_windows'], len(row['raw_local_windows']),
              row['helpers']['buy_quote']['candidate_bytes'],
              row['helpers']['sell_quote']['candidate_bytes'],
              len(row['positive_immediate_edges']))
