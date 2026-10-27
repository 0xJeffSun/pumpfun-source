#!/usr/bin/env python3
"""Verify the three-byte initializer Source correction and retained controls offline."""
import argparse
from collections import Counter
import gzip
import hashlib
import importlib.util
import io
import json
from pathlib import Path, PurePosixPath
import struct
import tarfile
import tempfile
from types import SimpleNamespace

HERE = Path(__file__).resolve().parent
BASE = '3971b5de1e074fb5a6fec54b8c3805f98b5de88ef528570960aafcb6a0c5ab8f'
FIXED = 'fc4dadb6d1cb2b1934ddaf303529680ab12f3c47acaf0969fa42fecb056275c1'
STRIPPED = '72f4e080a2cdcc8ed007af7e335b93b5360656ce11163712b8eb668d689bd782'
ACCEPTED = ('origin-only', 'origin-only-repeat', 'portable')


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


v = module('compiler_records', HERE / 'tools/compiler_records.py')
layer = module('unchanged_reader', HERE / 'tools/reader.py')
require, raw, read, digest, identity = v.require, v.raw, v.read, v.digest, v.identity


def archive_sources(data):
    result = {}
    with tarfile.open(fileobj=io.BytesIO(data), mode='r:gz') as archive:
        for row in archive.getmembers():
            if row.isdir():
                continue
            p = PurePosixPath(row.name)
            require(row.isfile() and not p.is_absolute() and '..' not in p.parts and ':' not in row.name
                    and '\\' not in row.name and row.name not in result, 'unsafe source archive')
            result[row.name] = archive.extractfile(row).read()
    return result


def corrected_source(before):
    lines = before.decode().splitlines(True)
    require(lines[530].strip() == 'let now=Clock::get().unwrap().unix_timestamp;' and lines[531] == '\n'
            and lines[532].strip() == 'let state=&mut ctx.accounts.mayhem_state;'
            and lines[533].strip() == 'state.field_8=now as u64;'
            and lines[534].strip() == 'state.end_timestamp=now+duration_hours*3600;', 'parent initializer source differs')
    lines[530] = ' ' * 17 + lines[530].rstrip('\n') + ' ' + lines[532].strip() + ' ' + lines[533].strip() + '\n'
    lines[531] = ' ' * 7 + lines[534]
    lines[532:535] = ['\n'] * 3
    after = ''.join(lines).encode()
    require(b''.join(before.split()) == b''.join(after.split()) and before.count(b'\n') == after.count(b'\n'), 'source tokens/order changed')
    return after


def pointer(elf, at):
    require(at in elf.rel and elf.rel[at]['type'] == 8, 'missing data relocation')
    zero, ptr = struct.unpack_from('<II', elf.b, at)
    require(zero == 0 and ptr < len(elf.b), 'invalid relocated data pointer')
    return ptr


def source_record(elf, at):
    ptr = pointer(elf, at)
    size, line, column = struct.unpack_from('<QII', elf.b, at + 8)
    require(size == 37 and ptr + size <= len(elf.b), 'Source filename extent differs')
    path = elf.b[ptr:ptr + size].decode()
    require(path == 'programs/mayhem-program/src/state.rs\0', 'Source filename differs')
    return dict(path=path, line=line, column=column)


def original_windows(original):
    return {r['start']: original.window(r['start'], r['end'])
            for r in read(HERE / 'reference/prior-inventory.json.gz')['original_rows']}


def initializer(elf):
    found = [s for s in elf.symbols if '5state10initialize' in s['name']]
    require(len(found) == 1, 'ambiguous initializer symbol')
    symbol = found[0]
    return elf.window(symbol['value'], symbol['value'] + symbol['size'])


def typed_initializer(original, candidate):
    ow = original_windows(original)
    cw = {a: w for (a, _), w in v.functions(candidate).items()}
    o, c = ow[534840], initializer(candidate)
    require(o['end'] - o['start'] == 960 and c['end'] - c['start'] == 920, 'initializer extent differs')
    require(len(o['direct']) == len(c['direct']) == 5, 'callee cohort differs')
    calls = []
    for a, b in zip(o['direct'], c['direct']):
        require(a['target'] in ow and b['target'] in cw and v.shape(ow[a['target']]) == v.shape(cw[b['target']]), 'direct callee differs')
        calls.append(dict(original_offset=a['offset'], candidate_offset=b['offset'], original_target=a['target'],
                          candidate_target=b['target'], bytes=ow[a['target']]['end'] - a['target'], normalized_equal=True))
    require(len(o['external']) == len(c['external']) == 1 and
            o['external'][0]['relocation']['symbol'] == c['external'][0]['relocation']['symbol'] == 'abort', 'external import differs')
    require(len(o['data_references']) == len(c['data_references']) == 4, 'initializer data cohort differs')
    observations = []
    for index, (a, b) in enumerate(zip(o['data_references'], c['data_references'])):
        p, q = a['target'], b['target']
        item = dict(original_offset=a['offset'], candidate_offset=b['offset'], original_target=p, candidate_target=q)
        if index in (0, 3):
            aa, bb = source_record(original, p), source_record(candidate, q)
            require(aa == bb, 'initializer Source differs')
            expected = (532, 32) if index == 0 else (531, 43)
            require((aa['line'], aa['column']) == expected, 'original panic location differs')
            item.update(kind='Rust Source', bytes=24, filename_bytes=37, value=aa, typed_equal=True)
        elif index == 1:
            # The following r2 immediate supplies the string length at both actual consumers.
            for e, ref in ((original, a), (candidate, b)):
                require(struct.unpack_from('<BBhi', e.b, ref['pc'] + 16) == (0xb7, 2, 0, 43), 'unwrap string consumer differs')
            require(original.b[p:p + 43] == candidate.b[q:q + 43] == b'called `Result::unwrap()` on an `Err` value', 'unwrap literal differs')
            item.update(kind='counted unwrap literal', bytes=43, typed_equal=True)
        else:
            slots = []
            for i in range(4):
                x, y = p + 8 * i, q + 8 * i
                if i == 3:
                    aa, bb = pointer(original, x), pointer(candidate, y)
                    require(aa in ow and bb in cw and v.shape(ow[aa]) == v.shape(cw[bb]), 'Debug formatter body differs')
                    slots.append(dict(slot=i, original_target=aa, candidate_target=bb, normalized_equal=True))
                else:
                    require(x not in original.rel and y not in candidate.rel, 'unexpected vtable relocation')
                    aa, bb = struct.unpack_from('<Q', original.b, x)[0], struct.unpack_from('<Q', candidate.b, y)[0]
                    require(aa == bb == (0, 8, 4)[i], 'Debug vtable scalar differs')
                    slots.append(dict(slot=i, value=aa))
            item.update(kind='ProgramError Debug vtable', bytes=32, slots=slots, typed_equal=True)
        observations.append(item)
    return dict(original_start=o['start'], candidate_start=c['start'], original_bytes=960, candidate_bytes=920,
                normalized_body_equal=v.shape(o) == v.shape(c), direct_callees=calls, data=observations,
                scope='Ordinal immediate callee/data comparisons with explicit extents; caller body, recursive callees and behavior remain unproved.')


def exact_change(baseline, fixed, expected_positions=(684176, 684180, 684236)):
    require(len(baseline.b) == len(fixed.b), 'whole-file size differs')
    a, b = initializer(baseline), initializer(fixed)
    require(a == b, 'initializer executable bytes/addresses changed')
    source_targets = [a['data_references'][i]['target'] for i in (0, 3)]
    allowed = [source_targets[0] + 16, source_targets[0] + 20, source_targets[1] + 20]
    actual = [i for i, (x, y) in enumerate(zip(baseline.b, fixed.b)) if x != y]
    require(actual == allowed and (expected_positions is None or actual == list(expected_positions)), 'change escapes the three Source fields')
    require([(baseline.b[i], fixed.b[i]) for i in actual] == [(23, 20), (25, 32), (26, 43)], 'Source field values differ')
    require(baseline.b[baseline.lo:baseline.hi] == fixed.b[fixed.lo:fixed.hi], 'raw text changed')
    owners = []
    for span, w in v.functions(fixed).items():
        if any(r['target'] in source_targets for r in w['data_references']):
            owners.append(span)
    require(owners == [(a['start'], a['end'])], 'changed Source records have another direct function reference')
    return dict(raw_byte_positions=actual, byte_values=[[baseline.b[i], fixed.b[i]] for i in actual],
                raw_text_equal=True, raw_initializer_equal=True, all_other_raw_bytes_equal=True,
                direct_function_reference_owners=[list(x) for x in owners])


def metadata_binding(baseline):
    old = v.published_units(raw(HERE / 'reference/main-build.log').decode())
    recent = v.published_units(raw(HERE / 'parent/builds/recovered/stderr.gz').decode())
    require(len(old) == 84 and len(recent) == 4, 'published invocation cohort differs')
    replaced = {v.value(a, '--crate-name') for a in recent}
    require(replaced == {'anchor_lang', 'anchor_spl', 'curve_accounts', 'mayhem_recovered'}, 'current root cohort differs')
    combined = [a for a in old if v.value(a, '--crate-name') not in replaced] + recent
    by_source = {v.source_key(v.source(a)): a for a in combined}
    native = [r['before'] for r in baseline if v.is_compile(r['before']) and v.is_target(r['before'])]
    require(len(native) == len(by_source) == 85 and v.dependency_edges(native) == v.dependency_edges(combined), 'target graph differs')
    result = {}
    for args in native:
        pub = by_source[v.source_key(v.source(args))]
        require(v.signature(args) == v.signature(pub), 'remaining target arguments differ')
        result[v.metadata(args), v.value(args, '--crate-name')] = v.metadata(pub)
    text = ''.join(a + '\t' + b + '\t' + n + '\n' for (a, n), b in sorted(result.items()))
    require(text.encode() == raw(HERE / 'metadata-map.tsv') == raw(HERE / 'reference/native-metadata-map.tsv'), 'metadata map differs')
    return result


def check_manifest(root):
    manifest = root / 'manifest.json'
    actual = {p.relative_to(root).as_posix(): identity(p.read_bytes()) for p in root.rglob('*')
              if p.is_file() and p != manifest and '__pycache__' not in p.relative_to(root).parts}
    require(actual == read(manifest), 'packet membership/content differs')


def verify(write=False):
    if not write:
        check_manifest(HERE)
    for name, row in read(HERE / 'upstream-inputs.json').items():
        data = (HERE / name).read_bytes()
        require(identity(data) == {k: row[k] for k in ('bytes', 'sha256')} and
                hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest() == row['git_blob'], 'upstream input differs')
    parent = archive_sources((HERE / 'parent/source.tar.gz').read_bytes())
    parent_hashes = {n: digest(b) for n, b in parent.items()}
    require(parent_hashes == read(HERE / 'parent/source-inputs.json') and len(parent) == 66, 'parent source cohort differs')
    expected = dict(parent)
    expected['src/state.rs'] = corrected_source(parent['src/state.rs'])
    source_rows = read(HERE / 'source-inputs.json')['source_files']
    require(len(source_rows) == 66 and {r['path']: r['sha256'] for r in source_rows} == {n: digest(b) for n, b in expected.items()}, 'accepted source map differs')
    for row in source_rows:
        require(raw(HERE / 'sources' / (row['path'] + '.gz')) == expected[row['path']] and
                len(expected[row['path']]) == row['bytes'], 'retained source differs')
    require(raw(HERE / 'overrides/src/state.rs.gz') == expected['src/state.rs'], 'materialized source differs')
    mapping = metadata_binding(read(HERE / 'builds/baseline/records.json.gz'))
    paths = [tuple(line.split('\t')) for line in raw(HERE / 'path-map.tsv').decode().splitlines()]
    require(len(paths) == 720 and ('mayhem_recovered', 'src/instructions/extend_account.rs', 'programs/mayhem-program/src/instructions/extend_account.rs') in paths,
            'current source remap missing')
    baseline = raw(HERE / 'parent/artifacts/recovered/symbols.so.gz')
    original = raw(HERE / 'reference/original.so.gz')
    require(digest(baseline) == BASE and digest(original) == v.ORIGINAL, 'reference ELF differs')
    report = dict(builds={}, target_executions=0, new_original_windows=0, historical_source_proven=False,
                  normalized_matches=428, raw_local_matches=70, primary_cargo_crate_compilations=15 * 163,
                  host_wrapper_compilations=15, current_target_metadata_units=85, target_dependency_edges=295)
    with tempfile.TemporaryDirectory() as td:
        td = Path(td)
        (td / 'baseline.so').write_bytes(baseline)
        (td / 'original.so').write_bytes(original)
        base_elf, original_elf = layer.Elf(td / 'baseline.so'), layer.Elf(td / 'original.so')
        original_rows = read(HERE / 'reference/prior-inventory.json.gz')['original_rows']
        originals = {r['id']: original_elf.window(r['start'], r['end']) for r in original_rows}
        baseline_shapes = Counter(v.shape(w) for w in v.functions(base_elf).values())
        before_arguments = None
        folders = sorted((HERE / 'builds').iterdir())
        require(len(folders) == 15, 'full-build cohort differs')
        fixed_data = None
        for folder in folders:
            label = folder.name
            launch, result = read(folder / 'launch.json.gz'), read(folder / 'result.json.gz')
            env = launch['environment_overrides']
            require(result['status'] == 'SUCCEEDED' and result['returncode'] == 0 and result['source_unchanged'] and
                    result['root_invocations'] == 1 and result['target_executions'] == 0 and launch['target_directory_initially_absent'], 'incomplete build')
            require('--locked' in launch['command'] and '--offline' in launch['command'] and launch['checked_executables'] == read(HERE / 'host-tools.json'), 'compiler/tool inputs differ')
            hashes = dict(parent_hashes)
            if label != 'baseline':
                state = expected['src/state.rs'] if label in ACCEPTED else raw(folder / 'state.rs.gz')
                hashes['src/state.rs'] = digest(state)
            require(launch['source_inputs'] == hashes, 'source changes outside initializer control')
            for name, pin in {**result['outputs'], **result['logs']}.items():
                require(identity(raw(folder / (name + '.gz'))) == pin, 'retained compiler output differs')
            host = read(folder / 'wrapper-compile-result.json.gz')
            require(host == launch['wrapper_build'] and host['returncode'] == 0 and host['source_sha256'] == digest(raw(HERE / 'wrapper.rs'))
                    and host['wrapper_sha256'] == digest(raw(folder / 'wrapper.exe.gz')) and host['compiler_sha256'] == '89c781244d73bda9434ad6fc47aafb8cb6de96a78fd8b3b649c3e7ef03a5f8ba', 'host wrapper differs')
            records = read(folder / 'records.json.gz')
            require(env['MAYHEM_METADATA_MODE'] == 'published-with-paths-relative' and all(r['compiler'] == env['RUSTC'] for r in records), 'compiler mode differs')
            compiled, counts = v.check_records(records, 'published-with-paths-relative', mapping, paths)
            v.cargo_binding(raw(folder / 'stderr.log.gz').decode(), compiled, env['RUSTC_WRAPPER'], env['RUSTC'])
            root = env['CARGO_TARGET_DIR'].replace('\\', '/').rsplit('/', 1)[0]
            relocate = lambda x: x.replace('\\', '/').replace(root, '<build>')
            arguments = {(v.value(r['before'], '--crate-name'), v.is_target(r['before']), v.metadata(r['before'])):
                         ([relocate(a) for a in r['before']], relocate(r['cwd'])) for r in compiled}
            if before_arguments is None:
                before_arguments = arguments
            require(arguments == before_arguments, 'compiler arguments differ beyond build-root relocation')
            data, stripped = raw(folder / 'symbols.so.gz'), raw(folder / 'candidate-v154-strip.so.gz')
            (td / 'candidate.so').write_bytes(data)
            elf = layer.Elf(td / 'candidate.so')
            windows = v.functions(elf)
            shapes = Counter(v.shape(w) for w in windows.values())
            raw_hashes = {w['raw_sha256'] for w in windows.values()}
            normalized_ids = sorted(k for k, w in originals.items() if v.shape(w) in shapes)
            raw_ids = sorted(k for k, w in originals.items() if w['raw_sha256'] in raw_hashes)
            require(len(normalized_ids) == 428 and len(raw_ids) == 70, 'preserved original matches differ')
            init = initializer(elf)
            counts.update(identity(data), stripped=identity(stripped), normalized_ids=normalized_ids, raw_ids=raw_ids,
                          initializer_bytes=init['end'] - init['start'], initializer_normalized_equal=v.shape(init) == v.shape(originals['O0193']))
            require(not counts['initializer_normalized_equal'], 'initializer unexpectedly matched; update the evidence')
            if label == 'baseline':
                require(data == baseline and stripped == raw(HERE / 'parent/artifacts/recovered/candidate.so.gz'), 'native baseline is not published artifact')
            if label in ACCEPTED:
                require(digest(data) == FIXED and digest(stripped) == STRIPPED and shapes == baseline_shapes, 'accepted repeated output differs')
                counts['exact_change'] = exact_change(base_elf, elf)
                counts['typed_initializer'] = typed_initializer(original_elf, elf)
                if fixed_data is None:
                    fixed_data = data
                require(data == fixed_data, 'raw repeat differs')
            report['builds'][label] = counts
        require(fixed_data is not None, 'accepted build missing')
        # Replay the parent's existing all-window preservation checker against these exact bytes.
        progress = module('parent_progress', HERE / 'reference/parent-progress.py')
        (td / 'reader.py').write_bytes(raw(HERE / 'tools/reader.py'))
        (td / 'inputs').mkdir()
        (td / 'inputs/parent-audit.json.gz').write_bytes((HERE / 'reference/parent-audit.json.gz').read_bytes())
        progress.P = td
        report['preservation'] = progress.compare(original, baseline, fixed_data)
        require(report['preservation']['matches'] == 428 and report['preservation']['raw_matches'] == 70 and
                report['preservation']['positive_direct_edges_before'] == report['preservation']['positive_direct_edges_after'] == 4280 and
                report['preservation']['positive_Source_records_before'] == report['preservation']['positive_Source_records_after'] == 444, 'prior positive observations differ')
        report['preservation_scope_note'] = 'The baseline already includes O0072/O0090: its 428-body cohort has 4280 positive edges and 444 Source observations. The parent report started from 426 bodies and counted 4235/441; this difference is cohort expansion, not gains from this patch.'
    latest = module('latest_composition', HERE / 'latest_verify.py')
    report['latest_composition'] = latest.verify(SimpleNamespace(**globals()))
    report['totals'] = dict(full_builds=19, cargo_crate_compilations=3097,
                          host_wrapper_compilations=19, auxiliary_invocations=247,
                          auxiliary_compile_probes=38)
    if write:
        (HERE / 'findings.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf8', newline='\n')
    else:
        require(read(HERE / 'findings.json') == report, 'saved findings differ')
    print(json.dumps(dict(full_builds=19, cargo_crate_compilations=3097, latest_correction_repeats=3,
                         changed_raw_bytes=3, raw_text_equal=True, original_matches=428, new_original_windows=0,
                         initializer_typed_data_observations=4, target_executions=0), indent=2))
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write-findings', action='store_true')
    verify(parser.parse_args().write_findings)
