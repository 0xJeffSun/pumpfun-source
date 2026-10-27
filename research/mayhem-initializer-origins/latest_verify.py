"""Compose the same Source correction onto the newer trade-source checkpoint."""
import hashlib
from pathlib import Path
import struct
import tempfile

BASE = 'c29b81a84b4308170d65eb9a0d602e6246c7a1ba9ec98dc71fcbf6fee3944333'
FIXED = 'c72f4c0bfb91546886aa2ce0383200c5aa9943b5824e0287af67cecd9735cf62'
STRIPPED = 'ce78c7f307a4fb70366831c15cfa9a9b3562edd7709a03966f9e631d94d15529'


def preserve_trade_sources(parent, original, candidate):
    """Rebind all five saved Source improvements through complete entry wrappers."""
    v, require = parent.v, parent.require
    evidence = parent.read(parent.HERE / 'latest/parent/data.json')
    rows = parent.read(parent.HERE / 'reference/prior-inventory.json.gz')['original_rows']
    ow = {r['id']: original.window(r['start'], r['end']) for r in rows}
    cw = {a: w for (a, _), w in v.functions(candidate).items()}
    specs = [(r['wrapper_id'], r['original_id'], [r['original_source']], r['matching_source_records'])
             for r in evidence['retained']['handlers']]
    sell = evidence['sell']
    specs.append((sell['wrapper'], sell['handler'], sell['original_sources'], sell['candidate_sources']))
    out = []
    for wrapper_id, body_id, original_records, candidate_records in specs:
        wrapper, body = ow[wrapper_id], ow[body_id]
        matches = [w for w in cw.values() if v.shape(w) == v.shape(wrapper)]
        indices = [i for i, call in enumerate(wrapper['direct']) if call['target'] == body['start']]
        require(matches and len(indices) == 1, 'trade wrapper binding differs')
        targets = {w['direct'][indices[0]]['target'] for w in matches}
        require(len(targets) == 1 and next(iter(targets)) in cw, 'ambiguous live trade handler')
        live = cw[next(iter(targets))]
        require(len(original_records) == len(candidate_records), 'trade Source cohort differs')
        for a, b in zip(original_records, candidate_records):
            values = []
            for elf, window, row in ((original, body, a), (candidate, live, b)):
                refs = [r for r in window['data_references'] if r['offset'] == row['offset']]
                require(len(refs) == 1 and refs[0]['target'] == row['target'], 'live Source reference differs')
                at = refs[0]['target']
                ptr = parent.pointer(elf, at)
                size, line, col = struct.unpack_from('<QII', elf.b, at + 8)
                require(0 < size < 300 and ptr + size <= len(elf.b), 'trade Source extent differs')
                value = dict(path=elf.b[ptr:ptr + size].decode(), line=line, column=col)
                require(value == {k: row[k] for k in ('path', 'line', 'column')}, 'trade Source changed')
                values.append(value)
            require(values[0] == values[1], 'prior trade Source correction lost')
            out.append(dict(wrapper=wrapper_id, handler=body_id, candidate_start=live['start'], value=values[0]))
    require(len(out) == 5, 'five prior Source observations required')
    return out


def verify(parent):
    root, v = parent.HERE / 'latest', parent.v
    raw, read, digest, identity, require = parent.raw, parent.read, parent.digest, parent.identity, parent.require
    for name, row in read(root / 'upstream-inputs.json').items():
        data = (root / name).read_bytes()
        require(identity(data) == {k: row[k] for k in ('bytes', 'sha256')} and
                hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest() == row['git_blob'], 'latest upstream input differs')
    sources = parent.archive_sources((root / 'parent/source.tar.gz').read_bytes())
    hashes = {n: digest(b) for n, b in sources.items()}
    require(len(sources) == 66 and hashes == read(root / 'parent/source-inputs.json'), 'latest source map differs')
    corrected = dict(sources)
    corrected['src/state.rs'] = parent.corrected_source(sources['src/state.rs'])
    corrected_hashes = {n: digest(b) for n, b in corrected.items()}
    require({r['path']: r['sha256'] for r in read(root / 'source-inputs.json')['source_files']} == corrected_hashes,
            'latest correction edits unrelated source')
    for n, b in corrected.items():
        require(raw(root / 'sources' / (n + '.gz')) == b, 'latest retained source differs')
    require(raw(root / 'overrides/src/state.rs.gz') == corrected['src/state.rs'], 'latest override differs')
    # Parallel Cargo scheduling may change log order, but each unit's metadata/options must agree.
    old = v.published_units(raw(parent.HERE / 'parent/builds/recovered/stderr.gz').decode())
    new = v.published_units(raw(root / 'parent/builds/recovered/stderr.gz').decode())
    signature = lambda units: sorted((v.value(a, '--crate-name'), v.metadata(a), v.signature(a)) for a in units)
    require(len(new) == 4 and signature(new) == signature(old), 'latest target compiler identities/options differ')
    for n in ('metadata-map.tsv', 'path-map.tsv', 'wrapper.rs', 'sdk-components.json.gz', 'target-components.json', 'vendor-inputs.json', 'host-tools.json'):
        require(raw(root / n) == raw(parent.HERE / n), 'latest shared compiler input differs')
    mapping = {(a, name): b for a, b, name in (line.split('\t') for line in raw(root / 'metadata-map.tsv').decode().splitlines())}
    paths = [tuple(line.split('\t')) for line in raw(root / 'path-map.tsv').decode().splitlines()]
    baseline = raw(root / 'parent/artifacts/recovered/symbols.so.gz')
    original = raw(parent.HERE / 'reference/original.so.gz')
    require(digest(baseline) == BASE and len(baseline) == 867744, 'latest baseline ELF differs')
    report = dict(builds={}, primary_cargo_crate_compilations=652, host_wrapper_compilations=4,
                  original_matches=428, raw_local_matches=70, new_original_windows=0, target_executions=0)
    require({p.name for p in (root / 'builds').iterdir()} == {'baseline', 'corrected', 'repeat', 'portable'}, 'latest build cohort differs')
    with tempfile.TemporaryDirectory() as td:
        td = Path(td)
        (td / 'baseline.so').write_bytes(baseline)
        (td / 'original.so').write_bytes(original)
        base_elf, original_elf = parent.layer.Elf(td / 'baseline.so'), parent.layer.Elf(td / 'original.so')
        before = None
        fixed = None
        for label in ('baseline', 'corrected', 'repeat', 'portable'):
            folder = root / 'builds' / label
            launch, result = read(folder / 'launch.json.gz'), read(folder / 'result.json.gz')
            env = launch['environment_overrides']
            require(result['status'] == 'SUCCEEDED' and result['returncode'] == 0 and result['source_unchanged'] and
                    result['root_invocations'] == 1 and result['target_executions'] == 0 and launch['target_directory_initially_absent'], 'latest build incomplete')
            require(launch['source_inputs'] == (hashes if label == 'baseline' else corrected_hashes) and
                    launch['checked_executables'] == read(root / 'host-tools.json') and '--locked' in launch['command'] and '--offline' in launch['command'], 'latest build inputs differ')
            for name, pin in {**result['outputs'], **result['logs']}.items():
                require(identity(raw(folder / (name + '.gz'))) == pin, 'latest output/log differs')
            host = read(folder / 'wrapper-compile-result.json.gz')
            require(host == launch['wrapper_build'] and host['returncode'] == 0 and host['source_sha256'] == digest(raw(root / 'wrapper.rs'))
                    and host['wrapper_sha256'] == digest(raw(folder / 'wrapper.exe.gz')) and host['compiler_sha256'] == '89c781244d73bda9434ad6fc47aafb8cb6de96a78fd8b3b649c3e7ef03a5f8ba', 'latest wrapper differs')
            records = read(folder / 'records.json.gz')
            require(env['MAYHEM_METADATA_MODE'] == 'published-with-paths-relative' and all(r['compiler'] == env['RUSTC'] for r in records), 'latest compiler mode differs')
            compiled, counts = v.check_records(records, 'published-with-paths-relative', mapping, paths)
            v.cargo_binding(raw(folder / 'stderr.log.gz').decode(), compiled, env['RUSTC_WRAPPER'], env['RUSTC'])
            build_root = env['CARGO_TARGET_DIR'].replace('\\', '/').rsplit('/', 1)[0]
            relocate = lambda s: s.replace('\\', '/').replace(build_root, '<build>')
            arguments = {(v.value(r['before'], '--crate-name'), v.is_target(r['before']), v.metadata(r['before'])):
                         ([relocate(a) for a in r['before']], relocate(r['cwd'])) for r in compiled}
            if before is None:
                before = arguments
            require(before == arguments, 'latest compiler arguments differ beyond root relocation')
            data, stripped = raw(folder / 'symbols.so.gz'), raw(folder / 'candidate-v154-strip.so.gz')
            counts.update(identity(data), stripped=identity(stripped))
            if label == 'baseline':
                require(data == baseline and stripped == raw(root / 'parent/artifacts/recovered/candidate.so.gz'), 'latest native baseline differs from published ELF')
            else:
                require(digest(data) == FIXED and digest(stripped) == STRIPPED and len(stripped) == 733352, 'latest correction/repetition differs')
                (td / 'fixed.so').write_bytes(data)
                fixed = data
                elf = parent.layer.Elf(td / 'fixed.so')
                counts['exact_change'] = parent.exact_change(base_elf, elf, (684096, 684100, 684156))
                counts['initializer'] = parent.typed_initializer(original_elf, elf)
                counts['preserved_trade_sources'] = preserve_trade_sources(parent, original_elf, elf)
                parent_stripped = raw(root / 'parent/artifacts/recovered/candidate.so.gz')
                require([i for i, (a, b) in enumerate(zip(parent_stripped, stripped)) if a != b] == [684096, 684100, 684156], 'latest stripped correction differs')
            report['builds'][label] = counts
        progress = parent.module('latest_parent_progress', parent.HERE / 'reference/parent-progress.py')
        (td / 'reader.py').write_bytes(raw(parent.HERE / 'tools/reader.py'))
        (td / 'inputs').mkdir()
        (td / 'inputs/parent-audit.json.gz').write_bytes((parent.HERE / 'reference/parent-audit.json.gz').read_bytes())
        progress.P = td
        report['preservation'] = progress.compare(original, baseline, fixed)
        require(report['preservation']['matches'] == 428 and report['preservation']['raw_matches'] == 70 and
                report['preservation']['positive_direct_edges_before'] == report['preservation']['positive_direct_edges_after'] == 4280 and
                report['preservation']['positive_Source_records_before'] == report['preservation']['positive_Source_records_after'] == 444, 'latest preservation counts differ')
    return report
