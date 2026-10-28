#!/usr/bin/env python3
"""Verify fresh native437 outputs and exact source/recipe composition offline."""
from pathlib import Path
import argparse, gzip, hashlib, importlib.util, json, shlex, tempfile

P = Path(__file__).resolve().parent
LABELS = ['build-01', 'build-02-repeat']
OUTPUTS = {'symbols.so': dict(bytes=889032, sha256='32098641a885e48451df4f6d8cb62f45afafc96651106f5e467ac3f7e0a9ab9a'),
           'candidate-v154-strip.so': dict(bytes=755968, sha256='da217317cd82d23898b846c1d3b47d8643b495fad90796c2a6ef62b37cfbbeef')}


def require(ok, message):
    if not ok:
        raise ValueError(message)


def sha(b):
    return hashlib.sha256(b).hexdigest()


def raw(path):
    b = path.read_bytes()
    return gzip.decompress(b) if path.suffix == '.gz' else b


def read(path):
    return json.loads(raw(path))


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def helpers(p):
    return tuple(module('native437_' + n, p / 'reference' / (n + '.py'))
                 for n in ['parent_verify', 'seed_verify', 'reader', 'closure'])


def bindings(p):
    rows = []
    for filename in ['acquisition.json', 'reference-bindings.json']:
        receipt = read(p / 'provenance' / filename)
        require(receipt['revision'] == '317ae39d097620176f5c42474a8082edc90d3160', 'reference revision differs')
        rows += [(r, p / ('upstream/' + r['path'].removeprefix(receipt['prefix'])
                        if filename == 'acquisition.json' else r['local'])) for r in receipt['files']]
    for row, path in rows:
        b = path.read_bytes()
        require(len(b) == row['bytes'] and sha(b) == row['sha256'], 'reference content differs')
        require(hashlib.sha1(b'blob ' + str(len(b)).encode() + b'\0' + b).hexdigest() == row['git_blob'], 'Git object binding differs')
    return len(rows)


def source_composition(p, v):
    pins = v.source_inputs(p)
    before = v.unpack(p / 'reference/parent436-source.tar.gz')
    after = v.unpack(p / 'upstream/source.tar.gz')
    require(before.keys() == after.keys(), 'source filename set differs')
    before_rows = read(p / 'reference/parent436-inputs.json')['source_files']
    require({r['path']: r['sha256'] for r in before_rows} == {n: sha(b) for n, b in before.items()}, 'parent source binding differs')
    changed = [n for n in before if before[n] != after[n]]
    require(changed == ['src/instructions/fee_recipients.rs'], 'one-file source scope differs')
    for n, h in read(p / 'provenance/parent-controller.json').items():
        require(sha((p / 'controller' / n).read_bytes()) == h, 'parent compiler recipe differs')
    return pins


def compile_records(p, v, seed, pins):
    upstream = []
    for line in raw(p / 'reference/upstream-compiler-stderr.gz').decode().splitlines():
        line = line.strip()
        if not (line.startswith('Running `') and line.endswith('`')):
            continue
        command = shlex.split(line[9:-1])
        if '--target' in command and '--crate-name' in command and any(a in command for a in
                ['--emit=dep-info,metadata,link', '--emit=dep-info,link']):
            upstream.append(dict(command=command))
    require(len(upstream) == 85, 'upstream compiler cohort differs')
    mapping = [x.split('\t') for x in (p / 'controller/metadata-map.tsv').read_text().splitlines()]
    leaf = lambda s: s.replace('\\', '/').split('/')[-1]
    expected_tools = {leaf(n): h for n, h in read(p / 'controller/host-tools.json').items()}
    require(len(expected_tools) == 9, 'host tool cohort differs')
    results = {}
    for label in LABELS:
        b = p / 'builds' / label
        launch, result = read(b / 'launch.json'), read(b / 'result.json')
        require(result['status'] == 'SUCCEEDED' and result['returncode'] == 0 and result['source_unchanged']
                and result['historical_macro_dependencies_unchanged'] and result['target_executions'] == 0,
                'build result differs')
        require(launch['source_inputs'] == pins and launch['target_directory_initially_absent']
                and '--offline' in launch['command'] and '--locked' in launch['command'], 'fresh source/build scope differs')
        require({leaf(n): h for n, h in launch['checked_executables'].items()} == expected_tools, 'compiler executable identity differs')
        for n, h in launch['pinned_controller_inputs'].items():
            require(sha((p / 'controller' / n).read_bytes()) == h, 'delivered controller differs')
        records = [json.loads(x) for x in v.unpack(b / 'wrapper-records.tar.gz').values()]
        targets = seed.target_records(records)
        for row in targets:
            name = row['after'][row['after'].index('--crate-name') + 1]
            before = [a[9:] for a in row['before'] if a.startswith('metadata=')]
            after = [a[9:] for a in row['after'] if a.startswith('metadata=')]
            require(len(before) == len(after) == 1 and [before[0], after[0], name] in mapping, 'metadata delivery differs')
            require(any(a.startswith('historical_anchor_program=') for a in row['after']) == (name == 'curve_accounts'),
                    'historical macro delivery differs')
        seeds = seed.compare_seeds(targets, upstream)
        require(len(seeds) == 85 and all(r['equal'] for r in seeds), 'recorded upstream metadata seed differs')
        invocation = read(b / 'link/invocation.json.gz')
        incoming, forwarded = invocation['incoming'], invocation['forwarded']
        delta = [(a, z) for a, z in zip(incoming, forwarded) if a != z]
        require(len(forwarded) == len(incoming) + 1 and forwarded[-1].startswith('-Map=') and len(delta) == 1
                and delta[0][0].endswith('.ld') and delta[0][1].endswith('ordered-native.ld'), 'linker transform differs')
        require(raw(b / 'link/exit-code.txt.gz').strip() == b'0' and result['strip']['returncode'] == 0
                and '--strip-all' in result['strip']['command'], 'link/strip outcome differs')
        for row in read(b / 'link/input-identities.json'):
            if row['retained']:
                require(v.identity(raw(b / 'link' / (row['retained'] + '.gz'))) ==
                        {k: row[k] for k in ('bytes', 'sha256')}, 'retained linker input differs')
        results[label] = dict(compilation_commands=163, target_commands=85, matched_upstream_seeds=85,
                              seed_comparison=seeds, historical_host_macro_reused=True)
    return results


def analyze(p=P):
    p = p.resolve()
    count = bindings(p)
    v, seed, reader, c = helpers(p)
    pins = source_composition(p, v)
    commands = compile_records(p, v, seed, pins)
    original = raw(p / 'reference/original-allocation.so.gz')
    require(sha(original) == v.ORIGINAL and len(original) == 777408, 'original allocation image differs')
    upstream = {'symbols.so': raw(p / 'upstream/builds/first/symbols.so.gz'),
                'candidate-v154-strip.so': raw(p / 'upstream/builds/first/candidate.so.gz')}
    require({n: v.identity(b) for n, b in upstream.items()} == OUTPUTS, 'upstream output differs')
    reports = {}
    with tempfile.TemporaryDirectory() as temp:
        def elf(name, data):
            path = Path(temp) / name; path.write_bytes(data)
            return reader.Elf(path)
        original_elf = elf('original.so', original)
        rows = read(p / 'upstream/inventory.json')
        require(len(rows) == 441, 'original inventory differs')
        ow = {r['start']: original_elf.window(r['start'], r['start'] + r['bytes']) for r in rows}
        for label in LABELS:
            b = p / 'builds' / label
            images = {n: raw(b / (n + '.gz')) for n in OUTPUTS}
            require(images == upstream, 'complete raw upstream equality differs')
            require({n: v.identity(data) for n, data in images.items()} == read(b / 'result.json')['outputs'], 'output receipt differs')
            require(all(data != original for data in images.values()), 'unexpected original allocation equality')
            e, stripped = [elf(label + n, images[n]) for n in OUTPUTS]
            require(v.sections(e) == v.sections(stripped), 'ordinary stripping changed allocated bytes')
            measured = v.measure(c, original_elf, ow, rows, e)
            require(measured['normalized'] == measured['injective'] == 437 and measured['raw_local'] == 141
                    and measured['direct_closed'] == 431 and len(measured['positive_calls']) == 4525
                    and len(measured['positive_Sources']) == 499, 'current437 static frontier differs')
            for actual, expected in zip(measured['inventory'], rows):
                require(actual['id'] == expected['id'] and bool(actual['closed']) == expected['direct_closed']
                        and ('raw' if actual['raw'] else 'normalized' if actual['matches'] else 'unmatched') == expected['status'],
                        'current437 inventory row differs')
            sweep = next(x for x in measured['inventory'] if x['id'] == 'O0076')
            require(bool(sweep['closed']) and not sweep['raw'], 'Sweep normalized/direct/raw scope differs')
            reports[label] = dict(outputs=OUTPUTS, whole_upstream_equal=True, whole_original_equal=False,
                                  measurement=measured, sections=v.sections(e), Sweep=sweep)
    require(reports[LABELS[0]] == reports[LABELS[1]], 'fresh build reports differ')
    return dict(reference_blobs=count, source_files=67, changed_source_files=['src/instructions/fee_recipients.rs'],
                compiler_recipe_changes=0, commands=commands, builds=reports, target_executions=0,
                scope='Fresh native target-dependency/root builds reproduce both complete current437 compiler outputs. Historical host macro reused; no original allocation equality, new function recovery, VM execution, or fresh runtime/signature verification claimed.')


def verify(p=P):
    p = p.resolve(); v, _, _, _ = helpers(p)
    v.verify_manifest(p)
    report = analyze(p)
    require(json.loads(json.dumps(report)) == read(p / 'report.json.gz'), 'saved report differs')
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--packet', type=Path, default=P)
    result = verify(parser.parse_args().packet)
    print(json.dumps(dict(fresh_target_builds=2, source_files=67, compiler_recipe_changes=0,
                          both_complete_outputs_equal_upstream=True, normalized=437, raw_local=141,
                          direct_closed=431, positive_calls=4525, positive_Sources=499,
                          whole_original_equal=False, target_executions=0), indent=2))
