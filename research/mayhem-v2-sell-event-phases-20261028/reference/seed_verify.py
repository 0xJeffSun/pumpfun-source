#!/usr/bin/env python3
"""Replay saved compiler-output equality and the one-seed control, offline."""
from pathlib import Path
import argparse, gzip, hashlib, importlib.util, json, re, shlex, tempfile

P = Path(__file__).resolve().parent
LABELS = ['build-01', 'build-02-repeat', 'build-03-reversal']
CORRECT = {'symbols.so': 'f03e73e7b82b152e64e9a999f4f9276ece9ebcd42d2273d0b8adaa7c5fb0c229',
           'candidate-v154-strip.so': 'cac32dadb032cc80366124ab3ceb430fdc5bfae23ab9cec1b5d18bb9e0f55e5b'}
REVERSED = {'symbols.so': '9b9db8aeb27e69b3e3edec7d09f834b3e163fb958c3e76bcb2fe0451fedfaa07',
            'candidate-v154-strip.so': '00fe0ffb6e6b442ab1a8d0cf54a6ffd7f8c1f94503423dce290b572ef1b24660'}


def require(ok, message):
    if not ok:
        raise ValueError(message)


def sha(data):
    return hashlib.sha256(data).hexdigest()


def raw(path):
    data = path.read_bytes()
    return gzip.decompress(data) if path.suffix == '.gz' else data


def read(path):
    return json.loads(raw(path))


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def helpers(p):
    return (module('seed_parent', p / 'reference/parent_verify.py'),
            module('seed_reader', p / 'reference/reader.py'),
            module('seed_closure', p / 'reference/closure.py'))


def bindings(p):
    rec = read(p / 'provenance/reference-bindings.json')
    require(rec['revision'] == '5fd637a13395c2d1de8a63457ab117adcadd7613', 'reference revision differs')
    rows = [(x, p / x['local']) for x in rec['files']]
    other = read(p / 'provenance/acquisition.json.gz')
    require(other['revision'] == rec['revision'], 'provider revision differs')
    rows += [(x, p / 'provider-sharing' / x['path'].removeprefix('research/mayhem-provider-sharing/')) for x in other['files']]
    for row, path in rows:
        b = path.read_bytes()
        require(len(b) == row['bytes'] and sha(b) == row['sha256'], 'reference content differs')
        require(hashlib.sha1(b'blob ' + str(len(b)).encode() + b'\0' + b).hexdigest() == row['git_blob'], 'Git blob binding differs')
    return len(rows)


def maps(p):
    before = (p / 'before-controller/metadata-map.tsv').read_bytes()
    after = (p / 'controller/metadata-map.tsv').read_bytes()
    old = b'f40a94ce996608ed\t96cf2e8d7313c997\tsolana_stake_interface'
    new = b'f40a94ce996608ed\tac89a8a18de78c4a\tsolana_stake_interface'
    require(before.count(old) == 1 and before.replace(old, new) == after, 'one metadata row control differs')
    old_builder = (p / 'before-controller/build.py').read_bytes()
    new_builder = (p / 'controller/build.py').read_bytes()
    require(old_builder.count(sha(before).encode()) == 1 and
            old_builder.replace(sha(before).encode(), sha(after).encode()) == new_builder,
            'builder change exceeds map pin')
    return ([x.split('\t') for x in before.decode().splitlines()],
            [x.split('\t') for x in after.decode().splitlines()])


def unit(row):
    cmd = row['command']
    name = cmd[cmd.index('--crate-name') + 1]
    seeds = [x[9:] for x in cmd if x.startswith('metadata=')]
    require(len(seeds) == 1, 'ambiguous metadata argument')
    source = (row.get('cwd', '') + '/' + next(x for x in cmd if x.endswith('.rs'))).replace('\\', '/')
    versions = re.findall('/' + re.escape(name.replace('_', '-')) + r'-([0-9][^/]+)/', source)
    return name, versions[-1] if versions else None, seeds[0]


def target_records(records):
    compiles = [x for x in records if '--crate-name' in x['after'] and any(
        a in x['after'] for a in ['--emit=dep-info,metadata,link', '--emit=dep-info,link'])]
    targets = [x for x in compiles if '--target' in x['after']]
    require(len(compiles) == 163 and len(targets) == 85, 'compiler cohort differs')
    return targets


def upstream_units(p):
    out = []
    for line in raw(p / 'provider-sharing/builds/recovered/stderr.gz').decode().splitlines():
        line = line.strip()
        if not (line.startswith('Running `') and line.endswith('`')):
            continue
        cmd = shlex.split(line[9:-1])
        if '--crate-name' in cmd and '--target' in cmd and any(a in cmd for a in
                ['--emit=dep-info,metadata,link', '--emit=dep-info,link']):
            out.append(dict(command=cmd))
    require(len(out) == 85, 'upstream target cohort differs')
    return out


def compare_seeds(targets, upstream):
    result = []
    for row in targets:
        name, version, seed = unit(dict(command=row['after'], cwd=row['cwd']))
        candidates = [x for x in upstream if unit(x)[0] == name]
        if len(candidates) > 1:
            candidates = [x for x in candidates if unit(x)[1] == version]
        require(len(candidates) == 1, 'ambiguous upstream unit binding')
        result.append(dict(crate=name, version=version, native=seed, upstream=unit(candidates[0])[2],
                           equal=seed == unit(candidates[0])[2]))
    return sorted(result, key=lambda x: (x['crate'], x['version'] or ''))


def commands(p, v, pins):
    old, new = maps(p)
    upstream = upstream_units(p)
    result = {}
    leaf = lambda s: s.replace('\\', '/').split('/')[-1]
    expected_tools = {leaf(n): h for n, h in read(p / 'controller/host-tools.json').items()}
    require(len(expected_tools) == 9, 'host executable inventory differs')
    for label in LABELS:
        b = p / 'builds' / label
        launch, receipt = read(b / 'launch.json'), read(b / 'result.json')
        require(launch['source_inputs'] == pins and launch['target_directory_initially_absent']
                and '--locked' in launch['command'] and '--offline' in launch['command'], 'source/build scope differs')
        require(receipt['status'] == 'SUCCEEDED' and receipt['returncode'] == 0
                and receipt['target_executions'] == 0 and receipt['source_unchanged']
                and receipt['historical_macro_dependencies_unchanged'], 'build result differs')
        require({leaf(n): h for n, h in launch['checked_executables'].items()} == expected_tools,
                'compiler executable identities differ')
        for n, h in launch['pinned_controller_inputs'].items():
            directory = 'before-controller' if label == LABELS[-1] and n == 'metadata-map.tsv' else 'controller'
            require(sha((p / directory / n).read_bytes()) == h, 'controller input differs')
        rows = [json.loads(x) for x in v.unpack(b / 'wrapper-records.tar.gz').values()]
        targets = target_records(rows)
        mapping = old if label == LABELS[-1] else new
        for row in targets:
            name = row['after'][row['after'].index('--crate-name') + 1]
            before = [a[9:] for a in row['before'] if a.startswith('metadata=')]
            after = [a[9:] for a in row['after'] if a.startswith('metadata=')]
            require(len(before) == len(after) == 1 and [before[0], after[0], name] in mapping,
                    'delivered metadata mapping differs')
            if name == 'solana_stake_interface':
                require('codegen-units=2' in row['before'] and 'codegen-units=2' in row['after'],
                        'stake codegen units differ')
            require(any(a.startswith('historical_anchor_program=') for a in row['after']) ==
                    (name == 'curve_accounts'), 'historical host macro delivery differs')
        seeds = compare_seeds(targets, upstream)
        differences = [x for x in seeds if not x['equal']]
        require(differences == ([dict(crate='solana_stake_interface', version='2.0.2',
                native='96cf2e8d7313c997', upstream='ac89a8a18de78c4a', equal=False)]
                if label == LABELS[-1] else []), 'upstream seed comparison differs')
        inv = read(b / 'link/invocation.json.gz')
        before, after = inv['incoming'], inv['forwarded']
        changes = [(x, y) for x, y in zip(before, after) if x != y]
        require(len(after) == len(before) + 1 and after[-1].startswith('-Map=') and len(changes) == 1
                and changes[0][0].endswith('.ld') and changes[0][1].endswith('ordered-native.ld'), 'linker transformation differs')
        require(raw(b / 'link/exit-code.txt.gz').strip() == b'0' and receipt['strip']['returncode'] == 0
                and '--strip-all' in receipt['strip']['command'], 'link/strip result differs')
        for row in read(b / 'link/input-identities.json'):
            if row['retained']:
                data = raw(b / 'link' / (row['retained'] + '.gz'))
                require(v.identity(data) == {k: row[k] for k in ('bytes', 'sha256')}, 'retained linker input differs')
        provider = read(b / 'provider/archive.json')
        data = raw(b / 'provider' / (provider['filename'] + '.gz'))
        require(v.identity(data) == {k: provider[k] for k in ('bytes', 'sha256')}, 'stake archive differs')
        result[label] = dict(compile_commands=163, target_commands=85, source_files=67,
                             matching_upstream_seeds=85 - len(differences), seed_comparison=seeds,
                             provider=provider, historical_host_macro_reused=True)
    return result


def analyze(p=P):
    p = p.resolve()
    count = bindings(p)
    v, reader, c = helpers(p)
    pins = v.source_inputs(p)
    receipts = commands(p, v, pins)
    original_data = raw(p / 'reference/original-allocation.so.gz')
    require(sha(original_data) == v.ORIGINAL and len(original_data) == 777408, 'original allocation image differs')
    upstream_data = {'symbols.so': raw(p / 'upstream/builds/first/symbols.so.gz'),
                     'candidate-v154-strip.so': raw(p / 'upstream/builds/first/candidate.so.gz')}
    require({n: sha(b) for n, b in upstream_data.items()} == CORRECT, 'upstream raw outputs differ')
    results = {}
    with tempfile.TemporaryDirectory() as tmp:
        def elf(name, data):
            path = Path(tmp) / name
            path.write_bytes(data)
            return reader.Elf(path)
        original = elf('original.so', original_data)
        upstream = elf('upstream.so', upstream_data['symbols.so'])
        rows = read(p / 'upstream/inventory.json')
        ow = {r['start']: original.window(r['start'], r['start'] + r['bytes']) for r in rows}
        baseline = v.measure(c, original, ow, rows, upstream)
        for label in LABELS:
            b = p / 'builds' / label
            result = read(b / 'result.json')
            images = {n: raw(b / (n + '.gz')) for n in CORRECT}
            require({n: v.identity(x) for n, x in images.items()} == result['outputs'], 'output receipt differs')
            expected = REVERSED if label == LABELS[-1] else CORRECT
            require({n: sha(x) for n, x in images.items()} == expected, 'controlled output hashes differ')
            exact = all(images[n] == upstream_data[n] for n in images)
            require(exact == (label != LABELS[-1]), 'whole upstream output comparison differs')
            require(all(x != original_data for x in images.values()), 'unexpected original allocation equality')
            symbols, stripped = [elf(label + n, images[n]) for n in CORRECT]
            require(v.sections(symbols) == v.sections(stripped), 'stripping changed allocated sections')
            measured = v.measure(c, original, ow, rows, symbols)
            require(measured['normalized'] == measured['injective'] == 436 and measured['raw_local'] == 141
                    and measured['direct_closed'] == 429 and len(measured['positive_calls']) == 4473
                    and len(measured['positive_Sources']) == 486, 'original-window static frontier differs')
            require(measured['raw_ids'] == baseline['raw_ids'] and measured['positive_calls'] == baseline['positive_calls']
                    and measured['positive_Sources'] == baseline['positive_Sources'], 'positive original observations differ')
            comparison = v.linked_comparison(c, upstream, symbols)
            require(not comparison['lost_names'] and not comparison['changed_shared_shapes']
                    and not comparison['changed_shared_Source_profiles'], 'linked function preservation differs')
            require([x['bytes'] for x in comparison['extra_windows']] == ([312, 408] if label == LABELS[-1] else []),
                    'extra allocator ranges differ')
            results[label] = dict(outputs=result['outputs'], whole_upstream_equal=exact, whole_original_equal=False,
                                 text_bytes=symbols.sec['.text']['size'], measurement=measured, linked=comparison)
    return dict(reference_blobs=count, source_files=67, changed_metadata_rows=1, commands=receipts,
                baseline=baseline, builds=results, target_executions=0,
                scope='Full raw compiler ELF and ordinary stripped ELF reproduce the archived436 reconstruction. They do not reproduce the original allocation image. No target/runtime execution or new original function recovery.')


def verify(p=P):
    p = p.resolve()
    v, _, _ = helpers(p)
    v.verify_manifest(p)
    report = analyze(p)
    require(json.loads(json.dumps(report)) == read(p / 'report.json.gz'), 'saved report differs')
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--packet', type=Path, default=P)
    result = verify(parser.parse_args().packet)
    print(json.dumps(dict(source_files=67, changed_metadata_rows=1, fresh_builds=3,
                          corrected_compiler_and_stripped_bytes_equal_upstream=True,
                          reversal_reproduces_parent=True, whole_original_equal=False,
                          target_executions=0), indent=2))
