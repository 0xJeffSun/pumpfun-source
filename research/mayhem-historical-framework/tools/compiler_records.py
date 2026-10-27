#!/usr/bin/env python3
"""Replay saved argument bindings and raw ELF comparisons offline; execute no target."""
import argparse
from collections import Counter
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path, PureWindowsPath
import re
import shlex
import tempfile
import tomllib

HERE = Path(__file__).resolve().parent
LABELS = ('passthrough', 'published', 'published-repeat', 'paths', 'relative', 'relative-repeat', 'portable')
TARGET = 'sbpf-solana-solana'
RAW = '6d90940933cc97c7858fae262e77c0f735ee059c1a71350e500b156cd7809522'
STRIPPED = 'e51e600c339f592d75889e82d5b0d9eb397982c32a64f15a5debcf5a114375cf'
ORIGINAL = 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'


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


def value(args, flag):
    require(args.count(flag) == 1, 'missing/duplicate argument: ' + flag)
    return args[args.index(flag) + 1]


def source(args):
    found = [a for a in args if not a.startswith('-') and a.endswith('.rs')]
    require(len(found) == 1, 'source argument differs')
    return found[0]


def source_key(path):
    path = path.replace('\\', '/')
    if path in ('src/lib.rs', 'curve-accounts/src/lib.rs', 'vendor/anchor-lang/src/lib.rs'):
        return path
    match = re.search(r'/([^/]+-\d+\.\d+\.\d+[^/]*)/(.+\.rs)$', path)
    require(match is not None, 'unbound source identity')
    return match[1] + '/' + match[2]


def metadata(args):
    found = [a[9:] for a in args if a.startswith('metadata=')]
    require(len(found) == 1, 'metadata count differs')
    return found[0]


def is_compile(args):
    return '--crate-name' in args and any(a in ('--emit=dep-info,metadata,link', '--emit=dep-info,link') for a in args)


def is_target(args):
    return '--target' in args and value(args, '--target') == TARGET


def signature(args):
    """Compare retained options; explicitly exclude locator/identity arguments."""
    out = []
    i = 0
    while i < len(args):
        a = args[i]
        if a in ('--out-dir', '-L', '--extern'):
            i += 2
            continue
        if a == '-C' and args[i + 1].startswith(('metadata=', 'extra-filename=')):
            i += 2
            continue
        if a.startswith('--sysroot='):
            i += 1
            continue
        out.append(source_key(a) if not a.startswith('-') and a.endswith('.rs') else a)
        i += 1
    return out


def windows_split(line):
    """Decode the quoted Windows argv representation in Cargo's verbose lines."""
    result, i = [], 0
    while i < len(line):
        while i < len(line) and line[i] in ' \t':
            i += 1
        if i == len(line):
            break
        word, quoted = [], False
        while i < len(line) and (quoted or line[i] not in ' \t'):
            count = 0
            while i < len(line) and line[i] == '\\':
                count += 1
                i += 1
            if i < len(line) and line[i] == '"':
                word.extend('\\' * (count // 2))
                if count % 2:
                    word.append('"')
                else:
                    quoted = not quoted
                i += 1
            else:
                word.extend('\\' * count)
                if i < len(line) and (quoted or line[i] not in ' \t'):
                    word.append(line[i])
                    i += 1
        require(not quoted, 'unclosed Cargo quote')
        result.append(''.join(word))
    return result


def published_units(log):
    result = []
    for line in log.splitlines():
        if 'Running `' not in line or '--crate-name' not in line:
            continue
        args = shlex.split(line.strip()[len('Running `'):-1])[1:]
        if is_target(args) and is_compile(args):
            result.append(args)
    return result


def dependency_edges(units):
    artifacts = {}
    for args in units:
        extra = [a.split('=', 1)[1] for a in args if a.startswith('extra-filename=')]
        require(len(extra) <= 1, 'multiple output identities')
        if extra:
            artifact = 'lib' + value(args, '--crate-name') + extra[0]
            require(artifact not in artifacts, 'duplicate target artifact')
            artifacts[artifact] = source_key(source(args))
    edges = []
    for args in units:
        for i, a in enumerate(args):
            if a != '--extern':
                continue
            alias, path = args[i + 1].split('=', 1)
            path = path.replace('\\', '/')
            if '/' + TARGET + '/' not in path:
                continue  # host proc-macro dependencies are outside this target-edge binding
            stem = Path(path).stem
            require(stem in artifacts, 'unbound target dependency')
            edges.append((source_key(source(args)), alias, artifacts[stem]))
    require(len(artifacts) == 84 and len(edges) == 295, 'target dependency cohort differs')
    return sorted(edges)


def derive_map(baseline):
    old = published_units(raw(HERE / 'reference/main-build.log').decode())
    recent = published_units(raw(HERE / 'reference/source-data-stderr.gz').decode())
    require(len(old) == 84 and len(recent) == 4, 'published log cohort differs')
    replaced = {value(a, '--crate-name') for a in recent}
    require(replaced == {'anchor_lang', 'anchor_spl', 'curve_accounts', 'mayhem_recovered'}, 'latest roots differ')
    combined = [a for a in old if value(a, '--crate-name') not in replaced] + recent
    by_source = {source_key(source(a)): a for a in combined}
    require(len(combined) == len(by_source) == 85, 'ambiguous published source')
    native = [r['before'] for r in baseline if is_compile(r['before']) and is_target(r['before'])]
    require(len(native) == 85 and {source_key(source(a)) for a in native} == set(by_source), 'native source cohort differs')
    require(dependency_edges(native) == dependency_edges(combined), 'native/published target dependency graph differs')
    mappings = {}
    for args in native:
        pub = by_source[source_key(source(args))]
        require(value(args, '--crate-name') == value(pub, '--crate-name') and signature(args) == signature(pub),
                'remaining source/feature/codegen arguments differ')
        key = (metadata(args), value(args, '--crate-name'))
        require(key not in mappings, 'duplicate native identity')
        mappings[key] = metadata(pub)
    expected = ''.join(a + '\t' + b + '\t' + n + '\n' for (a, n), b in sorted(mappings.items()))
    require(raw(HERE / 'metadata-map.tsv').decode() == expected, 'metadata map does not derive from retained logs')
    require(sum(a != b for (a, _), b in mappings.items()) == 65, 'changed identity count differs')
    return mappings


def derive_paths():
    names = {line.split('\t')[2] for line in raw(HERE / 'metadata-map.tsv').decode().splitlines()}
    sources = [r['path'] for r in read(HERE / 'source-inputs.json')['source_files']]
    common = ['src/lib.rs', 'src/instruction.rs', 'src/state.rs', 'src/syscalls.rs', 'src/internal.rs',
              'src/encode.rs', 'src/ser/mod.rs', 'src/extension/mod.rs', 'src/account_wrapper.rs']
    rows = []
    for name in sorted(names):
        if name == 'mayhem_recovered':
            pairs = [(p, p if p == 'src/account_wrapper.rs' else 'programs/mayhem-program/' + p)
                     for p in sources if p.startswith('src/') and p.endswith('.rs')]
        elif name == 'anchor_lang':
            pairs = [(p, p) for p in sources if p.startswith('vendor/anchor-lang/') and p.endswith('.rs')]
        elif name == 'curve_accounts':
            pairs = [(p, p) for p in common] + [(p, p.removeprefix('curve-accounts/'))
                     for p in sources if p.startswith('curve-accounts/') and p.endswith('.rs')]
        else:
            pairs = [(p, p) for p in common]
        rows.extend((name, a, b) for a, b in pairs)
    require(len(rows) == 719 and len(names) == 76, 'path-map cohort differs')
    require(raw(HERE / 'path-map.tsv').decode() == ''.join('\t'.join(r) + '\n' for r in rows), 'path map differs')
    return rows


def relative_source(path, cwd):
    p = PureWindowsPath(path)
    require(p.is_absolute(), 'expected absolute registry input')
    result = p.relative_to(PureWindowsPath(cwd))
    require('..' not in result.parts and result.parts, 'source escapes crate cwd')
    require(PureWindowsPath(cwd) / result == p, 'relative input changes source')
    return result.as_posix()


def check_records(records, mode, mappings, paths):
    require(len(records) == len({r['record_id'] for r in records}), 'duplicate wrapper record')
    compiled, changed, relativized = [], 0, 0
    for r in records:
        require(r['mode'] == mode, 'wrapper mode differs')
        before, expected = r['before'], list(r['before'])
        target_compile = is_compile(before) and is_target(before)
        replaced = mode != 'passthrough' and target_compile
        if replaced:
            key = (metadata(before), value(before, '--crate-name'))
            require(key in mappings, 'unbound metadata replacement')
            i = expected.index('metadata=' + key[0])
            require(expected[i - 1] == '-C', 'metadata is not a codegen option')
            expected[i] = 'metadata=' + mappings[key]
            changed += key[0] != mappings[key]
        if mode.startswith('published-with-paths') and target_compile:
            name = value(before, '--crate-name')
            expected.extend('--remap-path-prefix=' + a + '=' + b for n, a, b in paths if n == name)
        if mode == 'published-with-paths-relative' and target_compile:
            path = source(before)
            if PureWindowsPath(path).is_absolute():
                expected[expected.index(path)] = relative_source(path, r['cwd'])
                relativized += 1
        require(r['metadata_replaced'] == int(replaced) and r['after'] == expected, 'unexpected forwarded argument edit')
        if is_compile(before):
            compiled.append(r)
    require(len(compiled) == 163 and sum(is_target(r['before']) for r in compiled) == 85, 'incomplete compiler trace')
    require(len({(value(r['before'], '--crate-name'), is_target(r['before']), metadata(r['before'])) for r in compiled}) == 163,
            'duplicate compiler invocation')
    require(changed == (0 if mode == 'passthrough' else 65), 'changed metadata count differs')
    require(relativized == (82 if mode == 'published-with-paths-relative' else 0), 'relative source count differs')
    require(len(records) == 176 and sum('--emit=llvm-ir' in r['before'] for r in records) == 2,
            'auxiliary compiler cohort differs')
    return compiled, dict(observations=len(records), crate_compilations=len(compiled), target=85, host=78,
                         metadata_replacements=0 if mode == 'passthrough' else 85, metadata_values_changed=changed,
                         source_inputs_relativized=relativized, auxiliary_invocations=len(records) - len(compiled),
                         auxiliary_compile_probes=sum('--emit=llvm-ir' in r['before'] for r in records))


def cargo_binding(log, records, wrapper, compiler):
    calls = []
    for line in log.splitlines():
        if 'Running `' in line and '--crate-name' in line:
            args = windows_split(line.strip()[len('Running `'):-1])
            require(args[:2] == [wrapper, compiler], 'Cargo compiler/wrapper differs')
            calls.append(tuple(args[2:]))
    require(Counter(calls) == Counter(tuple(r['before']) for r in records) and len(calls) == 163,
            'Cargo log and actual wrapper argument cohort differ')
    require('Finished ' in log, 'Cargo completion missing')


def functions(elf):
    spans = {(s['value'], s['value'] + s['size']) for s in elf.symbols
             if s['info'] & 15 == 2 and s['size'] >= 8 and elf.lo <= s['value'] < elf.hi}
    return {span: elf.window(*span) for span in sorted(spans)}


def shape(w):
    return w['end'] - w['start'], w['normalized_sha256'], json.dumps(w['normalization_pattern'], sort_keys=True)


def compare(layer, path, reference, original_windows):
    elf = layer.Elf(path)
    windows = functions(elf)
    shapes, hashes = {shape(w) for w in windows.values()}, {w['raw_sha256'] for w in windows.values()}
    sections = {}
    for name in ('.text', '.rodata', '.data.rel.ro', '.rel.dyn', '.symtab', '.strtab'):
        a, b = reference.sec[name], elf.sec[name]
        aa, bb = reference.b[a['offset']:a['offset'] + a['size']], elf.b[b['offset']:b['offset'] + b['size']]
        sections[name] = dict(reference_bytes=len(aa), candidate_bytes=len(bb), equal=aa == bb,
                              differing_overlap_positions=sum(x != y for x, y in zip(aa, bb)), tail_bytes=abs(len(aa) - len(bb)))
    return dict(**identity(elf.b), functions=len(windows), text_bytes=elf.hi - elf.lo, raw_reference_equal=elf.b == reference.b,
                ordered_normalized_text_equal=reference.norm(reference.lo, reference.hi) == elf.norm(elf.lo, elf.hi),
                normalized_ids=sorted(k for k, w in original_windows.items() if shape(w) in shapes),
                raw_ids=sorted(k for k, w in original_windows.items() if w['raw_sha256'] in hashes), sections=sections)


def verify(write=False):
    if not write:
        pins = read(HERE / 'manifest.json')
        actual = {p.relative_to(HERE).as_posix(): identity(p.read_bytes()) for p in HERE.rglob('*')
                  if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
        require(actual == pins, 'packet membership/content differs')
    for name, row in read(HERE / 'upstream-inputs.json').items():
        data = (HERE / name).read_bytes()
        require(identity(data) == {k: row[k] for k in ('bytes', 'sha256')} and
                hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest() == row['git_blob'], 'upstream blob differs')
    sources = read(HERE / 'source-inputs.json')['source_files']
    require(len(sources) == 65, 'source cohort differs')
    for row in sources:
        require(identity(raw(HERE / 'sources' / (row['path'] + '.gz'))) == {k: row[k] for k in ('bytes', 'sha256')}, 'source differs')
    source_hashes = {r['path']: r['sha256'] for r in sources}
    require(source_hashes == read(HERE / 'reference/source-inputs.json'), 'source differs from published reconstruction')
    require(len(read(HERE / 'sdk-components.json.gz')['files']) == 2639 and
            len(read(HERE / 'target-components.json')['files']) == 27 and
            len(read(HERE / 'vendor-inputs.json')['packages']) == 215, 'compiler/vendor cohort differs')
    lock = tomllib.loads(raw(HERE / 'sources/Cargo.lock.gz').decode())
    locked = {p['name'] + '-' + p['version']: p['checksum'] for p in lock['package'] if p.get('source', '').startswith('registry+')}
    vendored = {r['directory']: r['package_sha256'] for r in read(HERE / 'vendor-inputs.json')['packages']}
    require(len(locked) == 214 and all(vendored.get(n) == h for n, h in locked.items()), 'locked registry pins differ')
    baseline = read(HERE / 'builds/passthrough/records.json.gz')
    mapping, paths = derive_map(baseline), derive_paths()
    collected = read(HERE / 'derivation/collected-logs.json.gz')
    for label, row in collected['logs'].items():
        require(identity(raw(HERE / 'derivation/logs' / (label + '.log.gz'))) ==
                dict(bytes=row['raw_bytes'], sha256=row['raw_sha256']), 'scanned upstream log differs')
    for name, label in [('main-build.log', 'main-v154'), ('source-data-stderr.gz', 'source-data')]:
        require(raw(HERE / 'reference' / name) == raw(HERE / 'derivation/logs' / (label + '.log.gz')), 'primary log binding differs')
    reference_raw = raw(HERE / 'reference/symbols.so.gz')
    reference_stripped = raw(HERE / 'reference/candidate-v154-strip.so.gz')
    original = raw(HERE / 'reference/original.so.gz')
    require(digest(reference_raw) == RAW and len(reference_raw) == 868280 and
            digest(reference_stripped) == STRIPPED and len(reference_stripped) == 733568 and
            digest(original) == ORIGINAL and len(original) == 777408, 'comparison input differs')
    spec = importlib.util.spec_from_file_location('retained_layer', HERE / 'tools/layer01.py')
    layer = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(layer)
    report = dict(builds={}, target_executions=0, new_original_matches=0, deployed_elf_equal=False,
                  historical_recipe_proven=False, target_metadata_units=85, changed_target_metadata=65,
                  target_dependency_edges=295, primary_cargo_crate_compilations=7 * 163,
                  host_wrapper_compilations=4, tiny_successful_compilations=4, tiny_failed_compilations=1)
    arguments = None
    with tempfile.TemporaryDirectory() as td:
        td = Path(td)
        (td / 'reference.so').write_bytes(reference_raw)
        (td / 'original.so').write_bytes(original)
        reference, deployed = layer.Elf(td / 'reference.so'), layer.Elf(td / 'original.so')
        originals = {r['id']: deployed.window(r['start'], r['end']) for r in read(HERE / 'reference/prior-inventory.json.gz')['original_rows']}
        require(len(originals) == 441, 'original window cohort differs')
        for label in LABELS:
            folder = HERE / 'builds' / label
            launch, result = read(folder / 'launch.json.gz'), read(folder / 'result.json.gz')
            env = launch['environment_overrides']
            require(result['status'] == 'SUCCEEDED' and result['returncode'] == 0 and result['source_unchanged'] and
                    result['root_invocations'] == 1 and result['target_executions'] == 0, 'build incomplete')
            require(launch['source_inputs'] == source_hashes and launch['target_directory_initially_absent'] and
                    '--locked' in launch['command'] and '--offline' in launch['command'], 'fresh offline source build differs')
            require(launch['checked_executables'] == read(HERE / 'host-tools.json'), 'compiler cohort differs')
            for name, pin in {**result['outputs'], **result['logs']}.items():
                require(identity(raw(folder / (name + '.gz'))) == pin, 'retained build output differs')
            rows = read(folder / 'records.json.gz')
            mode = 'passthrough' if label == 'passthrough' else 'published-target-metadata' if label.startswith('published') else 'published-with-paths' if label == 'paths' else 'published-with-paths-relative'
            require(env['MAYHEM_METADATA_MODE'] == mode and all(r['compiler'] == env['RUSTC'] for r in rows), 'forwarded compiler/mode differs')
            compiled, counts = check_records(rows, mode, mapping, paths)
            wrapper_name = 'wrapper' if label in ('passthrough', 'published', 'published-repeat') else 'wrapper-paths' if label == 'paths' else 'wrapper-relative'
            if label != 'portable':
                wrapper_hash = read(HERE / 'exploration' / (wrapper_name + '-compile-result.json.gz'))['wrapper_sha256']
                controller = raw(HERE / 'exploration/controllers' / (label + '-build.py.gz')).decode()
                require(wrapper_hash in controller and PureWindowsPath(env['RUSTC_WRAPPER']).name == wrapper_name + '.exe', 'wrapper/controller binding differs')
            cargo_binding(raw(folder / 'stderr.log.gz').decode(), compiled, env['RUSTC_WRAPPER'], env['RUSTC'])
            root = env['CARGO_TARGET_DIR'].replace('\\', '/').rsplit('/', 1)[0]
            relocate = lambda s: s.replace('\\', '/').replace(root, '<build>')
            cohort = {(value(r['before'], '--crate-name'), is_target(r['before']), metadata(r['before'])):
                      ([relocate(a) for a in r['before']], relocate(r['cwd'])) for r in compiled}
            if arguments is None:
                arguments = cohort
            require(cohort == arguments, 'pre-wrapper arguments differ beyond build-root relocation')
            data = raw(folder / 'symbols.so.gz')
            stripped = raw(folder / 'candidate-v154-strip.so.gz')
            path = td / (label + '.so')
            path.write_bytes(data)
            analysis = compare(layer, path, reference, originals)
            require(len(analysis['normalized_ids']) == 426 and len(analysis['raw_ids']) == (75 if label == 'passthrough' else 70), 'original window counts differ')
            exact = label in ('relative', 'relative-repeat', 'portable')
            require((data == reference_raw) == exact and (stripped == reference_stripped) == exact and data != original,
                    'raw/stripped reference identity differs')
            counts.update(analysis, stripped_reference_equal=stripped == reference_stripped, stripped=identity(stripped))
            report['builds'][label] = counts
            expected_hash = RAW if exact else 'fff636e050d7053d97ad7655be66a714d5ca423b54bf6f3421e9e0df23141f6c' if label == 'passthrough' else '192477ed968dc4e32352b04892755069f356378ab4b6e22623ff5201d010b0f4' if label == 'paths' else '5d2ad6b5d7ff6b80a9f8a70d3fc68726b30cec01b976b5e7d8e975ddf37a08e9'
            require(digest(data) == expected_hash, 'bounded control ELF differs')
    require(raw(HERE / 'builds/published/symbols.so.gz') == raw(HERE / 'builds/published-repeat/symbols.so.gz') and
            raw(HERE / 'builds/published/candidate-v154-strip.so.gz') == raw(HERE / 'builds/published-repeat/candidate-v154-strip.so.gz'), 'metadata-only repetition differs')
    for label in ('published', 'published-repeat', 'paths'):
        require(report['builds'][label]['ordered_normalized_text_equal'], 'normalized text control differs')
    require(not report['builds']['passthrough']['ordered_normalized_text_equal'], 'baseline negative control differs')
    for name in ('wrapper', 'wrapper-paths', 'wrapper-relative'):
        launch = read(HERE / 'exploration' / (name + '-compile-launch.json.gz'))
        result = read(HERE / 'exploration' / (name + '-compile-result.json.gz'))
        require(result['returncode'] == 0 and launch['source_sha256'] == digest(raw(HERE / 'exploration' / (name + '.rs.gz'))) and
                result['wrapper_sha256'] == digest(raw(HERE / 'exploration' / (name + '.exe.gz'))) and
                launch['compiler_sha256'] == '89c781244d73bda9434ad6fc47aafb8cb6de96a78fd8b3b649c3e7ef03a5f8ba', 'host wrapper build differs')
    portable = read(HERE / 'builds/portable/wrapper-compile-result.json.gz')
    require(portable == read(HERE / 'builds/portable/launch.json.gz')['wrapper_build'] and portable['returncode'] == 0 and
            portable['source_sha256'] == digest(raw(HERE / 'wrapper.rs')) and
            portable['wrapper_sha256'] == digest(raw(HERE / 'builds/portable/wrapper.exe.gz')), 'portable wrapper differs')
    probes = read(HERE / 'exploration/path-probe-02/results.json.gz')
    for name, row in probes.items():
        folder = HERE / 'exploration/path-probe-02'
        obj = raw(folder / name / 'out.o.gz')
        require(digest(obj) == row['sha256'] and row['target_executions'] == 0, 'tiny path control differs')
        require(all(s.encode() in obj for s in row['strings']), 'path spelling absent from object')
        for source_name, sha in row['source_files'].items():
            require(digest(raw(folder / 'source/src' / (source_name + '.gz'))) == sha, 'tiny source differs')
    require(len(probes) == 4 and b'error' in raw(HERE / 'exploration/path-probe/relative/stderr.log.gz'), 'failed path control missing')
    if write:
        (HERE / 'findings.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf8', newline='\n')
    else:
        require(read(HERE / 'findings.json') == report, 'saved findings differ')
    print(json.dumps(dict(full_builds=7, cargo_crate_compilations=1141, exact_raw_and_stripped_builds=3,
                         metadata_units=85, target_edges=295, original_normalized_matches=426,
                         exact_candidate_original_raw_matches=70, target_executions=0), indent=2))
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write-findings', action='store_true')
    verify(parser.parse_args().write_findings)
