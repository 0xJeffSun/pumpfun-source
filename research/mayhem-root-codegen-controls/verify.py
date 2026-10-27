#!/usr/bin/env python3
"""Recompute root-control evidence without executing compilers or target code."""
import argparse
from collections import Counter
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path, PurePosixPath
import re
import struct
import tempfile

HERE = Path(__file__).resolve().parent
PARENT = 'research/mayhem-native-windows-baseline'
GLOBAL = 'repro/mayhem/global-params-layout-recovery'
ORDER = ('metadata', 'paths', 'both', 'baseline-repeat')


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


def safe_file(root, name):
    p = PurePosixPath(name)
    require(bool(name) and not p.is_absolute() and '..' not in p.parts and ':' not in name
            and '\\' not in name and p.as_posix() == name, 'unsafe evidence path')
    path = root
    for part in p.parts:
        path = path / part
        require(not path.is_symlink(), 'symlink evidence path')
    require(path.is_file(), 'missing evidence file: ' + name)
    return path


def pins(root, rows):
    require(len({r['path'] for r in rows}) == len(rows), 'duplicate evidence pin')
    for row in rows:
        data = safe_file(root, row['path']).read_bytes()
        require(identity(data) == {k: row[k] for k in ('bytes', 'sha256')}, 'pinned evidence differs: ' + row['path'])
        if 'git_blob' in row:
            require(hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
                    == row['git_blob'], 'Git blob differs')


def integrity(repo, package):
    rows = read(package / 'manifest.json')['files']
    actual = {p.relative_to(package).as_posix() for p in package.rglob('*')
              if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
    require(actual == {r['path'] for r in rows}, 'packet membership differs')
    pins(package, rows)
    pins(repo, read(package / 'inputs.json')['files'])


def source_checks(repo):
    parent = repo / PARENT
    rows = read(parent / 'source-inputs.json')['source_files']
    require(len(rows) == 15 and len({r['path'] for r in rows}) == 15, 'source cohort differs')
    for row in rows:
        require(identity(raw(parent / 'sources' / (row['path'] + '.gz')))
                == {k: row[k] for k in ('bytes', 'sha256')}, 'source content differs')
    launch = read(parent / 'builds/build-01/launch.json.gz')
    require(launch['source_inputs'] == {r['path']: r['sha256'] for r in rows}, 'source map differs')
    log = raw(repo / GLOBAL / 'builds/recovered/stderr.gz').decode()
    root = [s for s in log.splitlines() if '--crate-name mayhem_recovered ' in s]
    require(len(root) == 1 and '-C metadata=e3c44ab51b8399da ' in root[0], 'published metadata observation differs')
    return launch


def receipt_checks(repo, package):
    base = source_checks(repo)
    b = load('root_controls_build', package / 'build.py')
    expected = read(package / 'expected-artifacts.json')
    require(set(expected) == set(ORDER), 'artifact cohort differs')
    deps = read(package / 'dependency-inputs.json')
    require(len(deps) == 144 and all(n.endswith(('.rlib', '.dll')) and 'mayhem_recovered' not in n for n in deps),
            'dependency cache cohort differs')
    for series in ('exploratory', 'replay'):
        for label in ORDER:
            folder = package / 'builds' / series / label
            launch, result = read(folder / 'launch.json.gz'), read(folder / 'result.json.gz')
            require(launch['variant'] == label and launch['changed_root_arguments'] == b.flags(label, base['source_inputs'])
                    and launch['command'] == base['command'] + b.flags(label, base['source_inputs']), 'root flags differ')
            for key in ('cwd', 'source_inputs', 'checked_executables', 'environment_overrides'):
                require(launch[key] == base[key], 'controlled launch input differs: ' + key)
            require(result['returncode'] == 0 and result['source_unchanged'] is True
                    and result['dependency_artifacts_unchanged'] is True and result['target_executions'] == 0,
                    'unsuccessful or changed-input build')
            require(set(result['logs']) == {'stdout.log', 'stderr.log'}, 'build log set differs')
            for name, row in result['logs'].items():
                require(identity(raw(folder / (name + '.gz'))) == row, 'build log hash differs')
            log = raw(folder / 'stderr.log.gz').decode()
            invocations = re.findall(r'^\s+Running .*rustc\.exe --crate-name (\w+) ([^\r\n]+)', log, re.MULTILINE)
            require(len(invocations) == 1 and invocations[0][0] == 'mayhem_recovered'
                    and '--target sbpf-solana-solana' in invocations[0][1] and 'Finished ' in log,
                    'actual root-only compilation missing')
            invocation = invocations[0][1]
            require('-C metadata=c76d00b312df7907' in invocation, 'native metadata observation differs')
            for flag in b.flags(label, base['source_inputs']):
                require(flag in invocation, 'compiler did not receive control flag')
            require(('metadata=e3c44ab51b8399da' in invocation) == (label in ('metadata', 'both')),
                    'unexpected metadata flag')
            data = raw(folder / 'symbols.so.gz')
            require(identity(data) == result['symbols'] == expected[label], 'root artifact differs')
            if series == 'replay':
                require(result['status'] == 'SUCCEEDED' and result['executables_unchanged'] is True
                        and result['root_invocations'] == 1 and result['equal_to_exploratory'] is True,
                        'replay failed or differs')
                require(data == raw(package / 'builds/exploratory' / label / 'symbols.so.gz'), 'repeated bytes differ')
    series = read(package / 'builds/replay/series.json')
    require(series['status'] == 'SUCCEEDED' and series['root_compilations'] == 4
            and series['target_executions'] == 0 and series['checked_before_and_after'] is True
            and series['dependency_artifacts'] == len(deps)
            and series['sdk_files'] == 2639 and series['target_components'] == 27, 'series receipt differs')


def section(elf, name):
    row = elf.sec[name]
    return elf.b[row['offset']:row['offset'] + row['size']]


def object_parts(data):
    require(data[:6] == b'\x7fELF\x02\x01', 'invalid probe object')
    head = struct.unpack_from('<HHIQQQIHHHHHH', data, 16)
    require(head[0] == 1, 'probe is not a relocatable object')
    sections = [struct.unpack_from('<IIQQQQIIQQ', data, head[5] + i * head[10]) for i in range(head[11])]
    names = sections[head[12]]
    strings = data[names[4]:names[4] + names[5]]
    by_name = {strings[s[0]:].split(b'\0', 1)[0].decode(): s for s in sections}
    text = by_name['.text']
    symbols = []
    for s in sections:
        if s[1] != 2:
            continue
        names = sections[s[6]]
        strings = data[names[4]:names[4] + names[5]]
        for at in range(s[4], s[4] + s[5], s[9]):
            name, info, _, _, _, size = struct.unpack_from('<IBBHQQ', data, at)
            if info & 15 == 2 and size:
                symbols.append(strings[name:].split(b'\0', 1)[0].decode())
    require(len(symbols) == 1 and 'metadata_probe' in symbols[0] and 'bump' in symbols[0], 'probe symbol cohort differs')
    return data[text[4]:text[4] + text[5]], symbols


def metadata_option_checks(repo, package):
    folder = package / 'metadata-option'
    source = (folder / 'probe.rs').read_bytes()
    require(source == b'#![no_std]\n#[inline(never)]\npub fn bump(value: u64) -> u64 { value.wrapping_add(1) }\n', 'probe source differs')
    base = read(repo / PARENT / 'builds/build-01/launch.json.gz')
    variants = {'native': ['c76d00b312df7907'], 'added': ['c76d00b312df7907', 'e3c44ab51b8399da'],
                'combined': ['c76d00b312df7907 e3c44ab51b8399da'], 'published': ['e3c44ab51b8399da']}
    artifacts, parts, commands = {}, {}, []
    for label, values in variants.items():
        root = folder / label
        launch, result = read(root / 'launch.json.gz'), read(root / 'result.json.gz')
        require(launch['metadata_values'] == values and launch['source_sha256'] == digest(source)
                and launch['environment_overrides'] == base['environment_overrides'], 'probe inputs differ')
        command = launch['command']
        rustc = base['environment_overrides']['RUSTC']
        require(command[0] == rustc and launch['compiler_sha256'] == base['checked_executables'][rustc], 'probe compiler differs')
        tail = [x for value in values for x in ('-C', 'metadata=' + value)]
        require(command[-len(tail):] == tail, 'probe metadata argument differs')
        prefix = command[:-len(tail)]
        require(prefix[-2] == '-o' and prefix[-1].replace('\\', '/').endswith('/' + label + '/probe.o'), 'probe output locator differs')
        commands.append(prefix[:-1])
        require(result['returncode'] == 0 and result['source_unchanged'] is True and result['target_executions'] == 0,
                'probe compilation failed')
        for name, row in result['logs'].items():
            require(identity(raw(root / (name + '.gz'))) == row, 'probe log differs')
        data = raw(root / 'probe.o.gz')
        require(identity(data) == result['object'] and len(data) == 592, 'probe artifact differs')
        artifacts[label], parts[label] = data, object_parts(data)
    require(all(c == commands[0] for c in commands), 'non-metadata probe arguments changed')
    require(artifacts['added'] == artifacts['combined'], 'repeated metadata is not equal to the combined list')
    require(len({artifacts[k] for k in ('native', 'added', 'published')}) == 3, 'metadata lists collapsed')
    require(len({text for text, _ in parts.values()}) == 1, 'probe instructions differ')
    require(len({tuple(parts[k][1]) for k in ('native', 'added', 'published')}) == 3, 'metadata symbol names collapsed')
    return dict(retained_tiny_compilations=4, additive_flags_equal_combined_list=True,
                added_value_differs_from_replacement=True, all_instruction_sections_equal=True)


def derive(repo, package):
    m = load('root_control_layer', repo / GLOBAL / 'tools/layer01.py')
    v = load('root_control_parent_verify', repo / PARENT / 'verify.py')
    prior = read(repo / GLOBAL / 'prior-inventory.json.gz')['original_rows']
    admitted = read(repo / 'research/mayhem-quote-validator-followups/analysis.json')['baseline-clean']['matches']
    with tempfile.TemporaryDirectory() as temp:
        root = Path(temp)
        blobs = {label: raw(package / 'builds/exploratory' / label / 'symbols.so.gz') for label in ORDER}
        blobs.update(native=raw(repo / PARENT / 'builds/build-01/symbols.so.gz'),
                     published=raw(repo / GLOBAL / 'artifacts/recovered-symbols.so.gz'))
        for label, data in blobs.items():
            (root / label).write_bytes(data)
        elfs = {label: m.Elf(root / label) for label in blobs}
        native, published = elfs['native'], elfs['published']
        original = m.Elf(repo / 'evidence/original/mayhem/deployed.so')
        originals = {r['id']: original.window(r['start'], r['end']) for r in prior}
        windows = {label: v.functions(elf) for label, elf in elfs.items()}
        counts = {label: Counter(map(v.shape, ws)) for label, ws in windows.items()}
        require(len(windows['native']) == 409 and len(windows['published']) == 411, 'function cohort differs')
        delta = sorted((key[0], counts['published'][key], counts['native'][key])
                       for key in set(counts['published']) | set(counts['native'])
                       if counts['published'][key] != counts['native'][key])
        require(delta == [(312, 7, 6), (408, 3, 2)], 'published multiplicity delta differs')
        rows = {}
        for label, elf in elfs.items():
            shapes = set(counts[label])
            raw_hashes = {w['raw_sha256'] for w in windows[label]}
            normalized = sorted(k for k, w in originals.items() if v.shape(w) in shapes)
            raw_matches = sorted(k for k, w in originals.items() if w['raw_sha256'] in raw_hashes)
            examined = sorted(k for k, matched in admitted.items() if matched and k in normalized)
            sections = {name: dict(**identity(section(elf, name)), equal_to_native=section(elf, name) == section(native, name))
                        for name in native.sec if name in elf.sec}
            changes = [i for i, (a, b) in enumerate(zip(native.b, elf.b)) if a != b]
            paths = [dict(offset=elf.sec['.rodata']['offset'] + x.start(), value=x.group().decode())
                     for x in re.finditer(rb'programs/mayhem-program/src/[A-Za-z0-9_./\\]+\.rs', section(elf, '.rodata'))]
            rows[label] = dict(file=identity(elf.b), function_extents=len(windows[label]),
                raw_original_matches=raw_matches, normalized_original_matches=normalized, examined_matches=examined,
                sections=sections, source_paths=paths, shape_multiset_equal_to_native=counts[label] == counts['native'])
            if label != 'published':
                require(len(elf.b) == len(native.b), 'unexpected artifact length')
                rows[label].update(changed_bytes=len(changes), changed_ranges=m.ranges(changes))
        for label in ORDER:
            row = rows[label]
            require(row['shape_multiset_equal_to_native'], 'function shapes changed')
            for key, size in [('raw_original_matches', 58), ('normalized_original_matches', 327), ('examined_matches', 188)]:
                require(row[key] == rows['native'][key] == rows['published'][key] and len(row[key]) == size,
                        'original match cohort changed')
            require(published.hi - published.lo - (elfs[label].hi - elfs[label].lo) == 720, 'text gap differs')
            require(elfs[label].b != published.b and elfs[label].b != original.b, 'unexpected full artifact equality')
        require(elfs['baseline-repeat'].b == native.b, 'baseline return did not reproduce')
        require(section(elfs['paths'], '.text') == section(native, '.text'), 'path remap changed instructions')
        require(section(elfs['metadata'], '.text') == section(elfs['both'], '.text'), 'combined instruction effect differs')
        require(section(elfs['metadata'], '.rodata') == section(native, '.rodata'), 'metadata changed read-only strings')
        require(section(elfs['paths'], '.rodata') == section(elfs['both'], '.rodata'), 'combined string effect differs')
        for label in ('paths', 'both'):
            require(len(rows[label]['source_paths']) == 18 and all('\\' not in x['value'] for x in rows[label]['source_paths']),
                    'source-path remapping incomplete')
        for label in ('native', 'metadata', 'baseline-repeat'):
            require(sum('\\' in x['value'] for x in rows[label]['source_paths']) == 14, 'mixed-path control differs')
        changed = rows['paths']['changed_ranges']
        permitted = [(native.sec[n]['offset'], native.sec[n]['offset'] + native.sec[n]['size'])
                     for n in ('.rodata', '.data.rel.ro')]
        require(rows['paths']['changed_bytes'] == 1415 and all(any(lo <= a < b <= hi for lo, hi in permitted) for a, b in changed),
                'path control changed bytes outside data sections')
        return dict(artifacts=rows, root_controls=4, retained_root_compilations=8, fresh_executions=0,
                    published_text_gap=720, new_original_windows=0, original_raw_identity=False,
                    published_baseline_reproduced=False, behavioral_equivalence_proven=False)


def verify(repo, package=HERE):
    integrity(repo, package)
    receipt_checks(repo, package)
    option = metadata_option_checks(repo, package)
    findings = derive(repo, package)
    require(findings == read(package / 'findings.json.gz'), 'recomputed findings differ')
    return dict(retained_root_compilations=8, dependency_artifacts=144, sdk_components_in_replay=2639,
                fresh_executions=0, repeated_variants_identical=True, path_only_changed_bytes=1415,
                path_only_instruction_section_equal=True, normalized_windows_preserved=327,
                raw_windows_preserved=58, published_text_gap=720, new_original_windows=0,
                published_baseline_reproduced=False, metadata_option_control=option,
                mayhem_root_metadata_replacement_measured=False)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, default=HERE.parent.parent)
    args = parser.parse_args()
    print(json.dumps(verify(args.repo.resolve()), indent=2))
