#!/usr/bin/env python3
"""Offline evidence checks; never executes a compiler, linker or target program."""
import argparse
from collections import Counter, defaultdict
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import tarfile
import tempfile
import tomllib

HERE = Path(__file__).resolve().parent
PARENT = 'repro/mayhem/global-params-layout-recovery'


def require(ok, message):
    if not ok:
        raise ValueError(message)


def raw(path):
    data = path.read_bytes()
    return gzip.decompress(data) if path.suffix == '.gz' else data


def read(path):
    return json.loads(raw(path))


def digest(data):
    return hashlib.sha256(data).hexdigest()


def identity(data):
    return dict(bytes=len(data), sha256=digest(data))


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def integrity(package=HERE):
    b = load('native_build_checks', package / 'build.py')
    rows = read(package / 'manifest.json')['files']
    actual = {p.relative_to(package).as_posix() for p in package.rglob('*')
              if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
    require(actual == {r['path'] for r in rows}, 'packet membership differs')
    b.pin(package, rows)
    return b


def source_checks(repo, package=HERE):
    source = read(package / 'source-inputs.json')['source_files']
    parent = read(repo / PARENT / 'source-inputs.json')['recovered']
    require(len(source) == 15 and {r['path']: r['sha256'] for r in source} == parent,
            'source map differs from published baseline')
    for row in source:
        data = raw(package / 'sources' / (row['path'] + '.gz'))
        require(identity(data) == {k: row[k] for k in ('bytes', 'sha256')}, 'source content differs')
    lock = tomllib.loads(raw(package / 'sources/Cargo.lock.gz').decode())
    expected = {p['name'] + '-' + p['version']: p['checksum'] for p in lock['package'] if p.get('source')}
    require(len(expected) == 215, 'locked package cohort differs')
    metadata = read(package / 'locked-packages.json')
    require({p['name'] + '-' + p['version']: p['checksum'] for p in metadata} == expected,
            'retained dependency list differs')
    vendor = read(package / 'vendor-inputs.json')['packages']
    require(len(vendor) == 215 and {r['directory']: r['package_sha256'] for r in vendor} == expected,
            'vendor pins differ')
    receipts = read(package / 'crate-acquisition.json.gz')
    require(len(receipts) == 215 and len({r['name'] for r in receipts}) == 215, 'acquisition cohort differs')
    require(all(r['status'] == 'complete' and r['sha256'] == expected.get(r['name'])
                and r['expected_sha256'] == r['sha256'] for r in receipts), 'crate acquisition failed/differs')
    return parent


def build_checks(package, expected_sources):
    original = read(package / 'builds/build-01/result.json.gz')
    for label in ('build-01', 'portable-replay'):
        root = package / 'builds' / label
        result, launch = read(root / 'result.json.gz'), read(root / 'launch.json.gz')
        require(result['status'] == 'SUCCEEDED' and result['returncode'] == 0
                and result['root_invocations'] == 1 and result['source_unchanged'] is True,
                'root build did not succeed with unchanged source')
        require(launch['source_inputs'] == expected_sources, 'compiled source identities differ')
        command = launch['command']
        require(command[1] == 'rustc' and command.count('--locked') == command.count('--offline') == 1
                and command[command.index('--target') + 1] == 'sbpf-solana-solana'
                and command[-2:] == ['--', '--remap-path-prefix=src/=programs/mayhem-program/src/'],
                'build command differs')
        env = launch['environment_overrides']
        require(env['CARGO_NET_OFFLINE'] == 'true'
                and env['CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS'].startswith('-Zremap-cwd-prefix= --sysroot='),
                'compiler environment differs')
        require(result['strip']['returncode'] == 0 and result['strip']['command'][1] == '--strip-all',
                'strip failed/differs')
        for name, row in result['logs'].items():
            require(identity(raw(root / (name + '.gz'))) == row, 'build log differs')
        log = raw(root / 'stderr.log.gz').decode()
        require(log.count('--crate-name mayhem_recovered ') == 1
                and 'Finished ' in log and 'release' in log, 'actual root compilation log missing')
        invocations = re.findall(r'^\s+Running .*rustc\.exe --crate-name ([a-zA-Z0-9_]+) ([^\r\n]+)',
                                 log, re.MULTILINE)
        require(len(invocations) == 162
                and sum('--target sbpf-solana-solana' in args for _, args in invocations) == 84,
                'dependency compilation cohort differs')
        for name, row in result['outputs'].items():
            require(identity(raw(root / (name + '.gz'))) == row, 'build artifact differs')
        require(set(result['outputs']) == {'symbols.so', 'candidate-v154-strip.so'}, 'artifact cohort differs')
        require(result['outputs'] == original['outputs'], 'fresh full build is unequal')
    repeated = read(package / 'builds/portable-replay/launch.json.gz')
    require(repeated['target_directory_initially_absent'] is True, 'fresh-target observation absent')
    require(read(package / 'builds/portable-replay/result.json.gz')['equal_to_first_native_build'] is True,
            'fresh reproduction observation absent')
    map_root = package / 'builds/build-02-map'
    mapped = read(map_root / 'result.json.gz')
    require(mapped['returncode'] == 0 and mapped['equal_to_build01'] is True
            and digest(raw(map_root / 'symbols.so.gz')) == original['outputs']['symbols.so']['sha256'],
            'diagnostic relink changed output')
    require(raw(map_root / 'link.map.gz').startswith(b'             VMA'), 'link map absent')
    control = read(package / 'strip-control.json')
    require(control['raw_equal'] is True and control['actual_output_sha256']
            == control['retained_v152_output_sha256']
            == digest(raw(package / 'strip-control-output.so.gz')), 'strip control differs')


def shape(window):
    return (window['end'] - window['start'], window['normalized_sha256'],
            json.dumps(window['normalization_pattern'], sort_keys=True))


def functions(elf):
    names = defaultdict(list)
    for symbol in elf.symbols:
        if symbol['info'] & 15 == 2 and symbol['size'] >= 8 and elf.lo <= symbol['value'] < elf.hi:
            names[(symbol['value'], symbol['value'] + symbol['size'])].append(symbol['name'])
    return [dict(**elf.window(*extent), names=sorted(ns)) for extent, ns in sorted(names.items())]


def compare(m, baseline, native, original, prior, admitted):
    all_windows, results = {}, {}
    originals = {r['id']: original.window(r['start'], r['end']) for r in prior}
    for label, elf in [('published', baseline), ('native', native)]:
        windows = functions(elf)
        all_windows[label] = windows
        by_shape = defaultdict(list)
        for window in windows:
            by_shape[shape(window)].append(window['start'])
        matches = {k: by_shape.get(shape(w), []) for k, w in originals.items()}
        raw_hashes = {w['raw_sha256'] for w in windows}
        raw_matches = sorted(k for k, w in originals.items() if w['raw_sha256'] in raw_hashes)
        results[label] = dict(file=identity(elf.b), function_extents=len(windows),
            matches=matches, raw_matches=raw_matches, admitted_matches=sorted(k for k in admitted if matches[k]),
            sections={s['name']: dict(bytes=s['size'], sha256=digest(elf.b[s['offset']:s['offset']+s['size']]))
                      for s in elf.sections})
    a, b = (results[k] for k in ('published', 'native'))
    require(a['admitted_matches'] == b['admitted_matches'] == sorted(k for k, v in admitted.items() if v),
            'admitted correspondence changed')
    require(len(b['admitted_matches']) == 188, 'admitted match count differs')
    require(a['raw_matches'] == b['raw_matches'] and len(b['raw_matches']) == 58, 'raw cohort changed')
    require({k for k, v in a['matches'].items() if v} == {k for k, v in b['matches'].items() if v},
            'all-window pattern coverage changed')
    require(sum(bool(v) for v in b['matches'].values()) == 327, 'all-window count differs')
    counts = {label: Counter(map(shape, windows)) for label, windows in all_windows.items()}
    deltas = []
    for key in sorted(set(counts['published']) | set(counts['native'])):
        ca, cb = counts['published'][key], counts['native'][key]
        if ca != cb:
            deltas.append(dict(bytes=key[0], normalized_sha256=key[1],
                normalization_pattern=json.loads(key[2]), published_count=ca, native_count=cb,
                functions={label: [dict(start=w['start'], end=w['end'], names=w['names'],
                    raw_sha256=w['raw_sha256']) for w in windows if shape(w) == key]
                    for label, windows in all_windows.items()}))
    require([(d['bytes'], d['published_count'], d['native_count']) for d in deltas]
            == [(312, 7, 6), (408, 3, 2)], 'unexpected function-shape multiplicity delta')
    require(baseline.hi - baseline.lo - (native.hi - native.lo) == 720, 'text extent delta differs')
    path_witnesses = []
    sec = native.sec['.rodata']
    data = native.b[sec['offset']:sec['offset']+sec['size']]
    for match in re.finditer(rb'[ -~]*programs/mayhem-program/src/[ -~]*?\.rs', data):
        text = match.group()
        if b'\\' not in text:
            continue
        converted = text.replace(b'\\', b'/')
        offset = baseline.b.find(converted)
        if offset >= 0:
            path_witnesses.append(dict(native_file_offset=sec['offset']+match.start(),
                native_string=text.decode(), published_file_offset=offset, published_string=converted.decode()))
    require(path_witnesses, 'Windows path separator evidence missing')
    return dict(artifacts=results, shape_multiplicity_differences=deltas, path_witnesses=path_witnesses,
                full_published_elf_equal=baseline.b == native.b, newly_recovered_original_windows=0,
                whole_program_or_behavior_equivalence_proven=False)


def derive(repo, package=HERE):
    m = load('native_windows_layer', repo / PARENT / 'tools/layer01.py')
    prior = read(repo / PARENT / 'prior-inventory.json.gz')['original_rows']
    admitted = read(repo / 'research/mayhem-quote-validator-followups/analysis.json')['baseline-clean']['matches']
    with tempfile.TemporaryDirectory() as temp:
        root = Path(temp)
        for label, data in [('published', raw(repo / PARENT / 'artifacts/recovered-symbols.so.gz')),
                            ('native', raw(package / 'builds/build-01/symbols.so.gz'))]:
            (root / label).write_bytes(data)
        return compare(m, m.Elf(root / 'published'), m.Elf(root / 'native'),
                       m.Elf(repo / 'evidence/original/mayhem/deployed.so'), prior, admitted)


def crate_archive_check(path, name, record, safe):
    require(digest(path.read_bytes()) == record['package_sha256'], 'publisher crate archive differs')
    files = {}
    with tarfile.open(path, 'r:gz') as archive:
        for member in archive:
            if member.isdir():
                continue
            require(member.isfile() and member.name.startswith(name + '/'), 'invalid crate member')
            relative = safe(member.name[len(name) + 1:])
            require(relative not in files, 'duplicate crate member')
            files[relative] = digest(archive.extractfile(member).read())
    newline = record['checksum_file_newline']
    require(newline in ('\n', '\r\n'), 'unknown vendor metadata newline')
    generated = (json.dumps(dict(package=record['package_sha256'], files=files)) + newline).encode()
    require(digest(generated) == record['checksum_file_sha256']
            and len(files) == record['file_count'], 'vendor map does not derive from publisher archive')


def verify(repo, package=HERE, vendor=None, archives=None):
    b = integrity(package)
    b.pin(repo, read(package / 'inputs.json')['files'])
    for row in read(package / 'inputs.json')['files']:
        data = (repo / row['path']).read_bytes()
        blob = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
        require(blob == row['git_blob'], 'repository Git blob differs')
    sources = source_checks(repo, package)
    build_checks(package, sources)
    control = read(package / 'strip-control.json')
    require(control['input_sha256'] == digest(raw(repo / PARENT / 'artifacts/recovered-symbols.so.gz'))
            and raw(package / 'strip-control-output.so.gz') == raw(repo / PARENT / 'artifacts/recovered-candidate.so.gz'),
            'strip control is not bound to published artifacts')
    findings = derive(repo, package)
    require(findings == read(package / 'findings.json.gz'), 'derived findings differ')
    checks = dict(vendor_files_rechecked=False, publisher_crate_archives_rechecked=False)
    if vendor:
        b.vendor_check(vendor, package)
        checks['vendor_files_rechecked'] = True
    if archives:
        expected = {r['directory']: r for r in read(package / 'vendor-inputs.json')['packages']}
        for name, record in expected.items():
            path = archives / (name + '.crate')
            crate_archive_check(path, name, record, b.safe)
        checks['publisher_crate_archives_rechecked'] = True
    return dict(retained_full_builds=2, retained_root_relinks=1, rustc_invocations_per_full_build=162,
        host_rustc_invocations_per_full_build=78, target_rustc_invocations_per_full_build=84, fresh_executions=0,
        native_full_builds_equal=True, published_baseline_reproduced=False, text_size_difference=720,
        examined_matches_retained=188, all_row_raw_matches_retained=58,
        all_row_pattern_matches=327, new_original_windows=0, optional_checks=checks)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, default=HERE.parents[1])
    parser.add_argument('--vendor', type=Path)
    parser.add_argument('--crate-archives', type=Path)
    args = parser.parse_args()
    print(json.dumps(verify(args.repo, vendor=args.vendor, archives=args.crate_archives), indent=2))
