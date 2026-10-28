#!/usr/bin/env python3
"""Offline saved-evidence replay. No compiler, VM, network or subprocess calls."""
from collections import Counter, defaultdict
from pathlib import Path, PurePosixPath
import argparse, fnmatch, gzip, hashlib, importlib.util, io, json, re, tarfile, tempfile

P = Path(__file__).resolve().parent
ORIGINAL = 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
UPSTREAM = 'f03e73e7b82b152e64e9a999f4f9276ece9ebcd42d2273d0b8adaa7c5fb0c229'
READER = '7be3a56418587fdc05178529428ab18df40a252fbd46431ceb98e9107fe414b1'
LABELS = ['build-01', 'build-02-current', 'build-03-paths', 'build-04-repeat', 'build-05-v2path', 'build-06-repeat']


def require(ok, message):
    if not ok:
        raise ValueError(message)


def sha(b):
    return hashlib.sha256(b).hexdigest()


def raw(p):
    b = p.read_bytes()
    return gzip.decompress(b) if p.suffix == '.gz' else b


def read(p):
    return json.loads(raw(p))


def identity(b):
    return dict(bytes=len(b), sha256=sha(b))


def module(name, p):
    spec = importlib.util.spec_from_file_location(name, p)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def unpack(p):
    out = {}
    with tarfile.open(fileobj=io.BytesIO(raw(p)), mode='r:') as tf:
        for m in tf:
            n = PurePosixPath(m.name)
            require(m.isfile() and not n.is_absolute() and '..' not in n.parts
                    and ':' not in m.name and '\\' not in m.name and str(n) == m.name
                    and m.name not in out, 'invalid archive member')
            out[m.name] = tf.extractfile(m).read()
    return out


def verify_manifest(p):
    paths = list(p.rglob('*'))
    require(not any(x.is_symlink() for x in paths), 'packet symlink')
    require(all(x.is_file() or x.is_dir() for x in paths), 'packet special file')
    actual = {x.relative_to(p).as_posix(): sha(x.read_bytes()) for x in paths
              if x.is_file() and x != p / 'manifest.json'}
    require(actual == read(p / 'manifest.json'), 'packet manifest differs')


def source_inputs(p):
    files = unpack(p / 'upstream/source.tar.gz')
    pins = read(p / 'upstream/composed-inputs.json')
    require(len(files) == 67 and {n: sha(b) for n, b in files.items()} == pins,
            'source archive differs')
    rows = read(p / 'controller/source-inputs.json')['source_files']
    require(len(rows) == 67 and {r['path']: r['sha256'] for r in rows} == pins,
            'controller source inventory differs')
    for row in rows:
        b = raw(p / 'controller/sources' / (row['path'] + '.gz'))
        require(b == files[row['path']] and len(b) == row['bytes'], 'controller source bytes differ')
    return pins


def provenance(p, pins):
    for receipt, prefix in [('acquisition.json', 'upstream/'), ('helper-acquisition.json', '')]:
        rec = read(p / 'provenance' / receipt)
        require(rec['revision'] == '18131c169d26d10fb0899bf42d981da2cb47aa45', 'source revision differs')
        for row in rec['files']:
            n = prefix + row['path'].removeprefix(rec['prefix']) if prefix else row['local']
            b = (p / n).read_bytes()
            require(identity(b) == {k: row[k] for k in ['bytes', 'sha256']}, 'Git source bytes differ')
            require(hashlib.sha1(b'blob ' + str(len(b)).encode() + b'\0' + b).hexdigest() == row['git_blob'], 'Git blob binding differs')
    h = read(p / 'controller/historical-macro.json')
    require(sha(raw(p / 'provenance/historical-host-macro.dll.gz')) == h['macro']['sha256']
            == 'f27a8319f76f19654145bac61c5076745fd667e3167221f38e904d1024616551', 'historical macro differs')
    require(len(h['host_dependencies']) == 61, 'historical dependency inventory differs')
    unit_counts = {}
    current = {x['crate']: [a[9:] for a in x['command'] if a.startswith('metadata=')][0]
               for x in read(p / 'upstream/current-unit-builds.json')}
    for label in LABELS:
        b = p / 'builds' / label
        launch, result = read(b / 'launch.json'), read(b / 'result.json')
        require(launch['source_inputs'] == pins and result['status'] == 'SUCCEEDED'
                and result['returncode'] == 0 and result['source_unchanged']
                and result['historical_macro_dependencies_unchanged']
                and result['target_executions'] == 0, 'build receipt differs')
        require(launch['target_directory_initially_absent'] and '--offline' in launch['command']
                and '--locked' in launch['command'], 'fresh offline build scope differs')
        leaf = lambda n: n.replace('\\', '/').split('/')[-1]
        expected_tools = {leaf(n): h for n, h in read(p / 'controller/host-tools.json').items()}
        require(len(expected_tools) == 9 and {leaf(n): h for n, h in launch['checked_executables'].items()}
                == expected_tools, 'compiler executable cohort differs')
        for n, digest in launch['pinned_controller_inputs'].items():
            require(sha((b / 'controller' / n).read_bytes()) == digest, 'controller binding differs')
        for n, expected in result['outputs'].items():
            require(identity(raw(b / (n + '.gz'))) == expected, 'compiler output binding differs')
        require(result['strip']['returncode'] == 0 and '--strip-all' in result['strip']['command'], 'ordinary stripping differs')
        records = [json.loads(x) for x in unpack(b / 'wrapper-records.tar.gz').values()]
        compiles = [x for x in records if '--crate-name' in x['after'] and any(
            a in x['after'] for a in ('--emit=dep-info,link', '--emit=dep-info,metadata,link'))]
        target = [x for x in compiles if '--target' in x['after']]
        require(len(compiles) == 163 and len(target) == 85, 'compile cohort differs')
        mapping = [x.split('\t') for x in (b / 'controller/metadata-map.tsv').read_text().splitlines()]
        for x in target:
            name = x['after'][x['after'].index('--crate-name') + 1]
            before = [a[9:] for a in x['before'] if a.startswith('metadata=')]
            after = [a[9:] for a in x['after'] if a.startswith('metadata=')]
            require(len(before) == len(after) == 1, 'metadata argument ambiguity')
            mapped = [before[0], after[0], name] in mapping
            if label == 'build-01' and name in current:
                mapped = sum(m[1:] == [after[0], name] for m in mapping) == 1
            require(mapped, 'metadata mapping differs')
            if label != 'build-01' and name in current:
                require(after[0] == current[name], 'current upstream seed differs')
            macro = [a for a in x['after'] if a.startswith('historical_anchor_program=')]
            require(bool(macro) == (name == 'curve_accounts'), 'historical macro command differs')
        inv = read(b / 'link/invocation.json.gz')
        before, after = inv['incoming'], inv['forwarded']
        changed = [(a, z) for a, z in zip(before, after) if a != z]
        require(len(after) == len(before) + 1 and after[-1].startswith('-Map=')
                and len(changed) == 1 and changed[0][0].endswith('.ld')
                and changed[0][1].endswith('ordered-native.ld'), 'linker transformation differs')
        require(raw(b / 'link/exit-code.txt.gz').strip() == b'0', 'linker failed')
        unit_counts[label] = dict(compilation_commands=len(compiles), target_commands=len(target))
    return unit_counts


def maximum_assignment(hits):
    assigned = {}
    def visit(row, seen):
        for address in hits[row]:
            if address in seen:
                continue
            seen.add(address)
            if address not in assigned or visit(assigned[address], seen):
                assigned[address] = row
                return True
        return False
    return sum(visit(row, set()) for row in hits)


def measure(c, original, ow, rows, e):
    windows, names = c.tables(e)
    grouped, pairs, active, rounds = c.relation(ow, windows)
    hits = {r['id']: sorted(grouped[c.key(ow[r['start']])]) for r in rows}
    raw_ids, positive_calls, sources, inventory = [], [], [], []
    for row in rows:
        ident, start = row['id'], row['start']
        w, found = ow[start], hits[ident]
        if any(windows[a]['raw_sha256'] == w['raw_sha256'] for a in found):
            raw_ids.append(ident)
        for call in w['direct']:
            if call['target'] not in ow:
                continue
            if any(any(x['offset'] == call['offset'] and x['target'] in windows
                       and c.key(windows[x['target']]) == c.key(ow[call['target']])
                       for x in windows[a]['direct']) for a in found):
                positive_calls.append([ident, call['offset']])
        profiles = [c.profile(e, windows[a]) for a in found]
        for d in w['data_references']:
            expected = c.source(original, d['target'])
            if expected is not None and any(x.get(str(d['offset'])) == expected for x in profiles):
                sources.append([ident, d['offset'], list(expected)])
        inventory.append(dict(id=ident, matches=found, raw=ident in raw_ids,
                              closed=sorted(a for a in found if (start, a) in active),
                              Source_profiles=profiles))
    return dict(normalized=sum(bool(v) for v in hits.values()), injective=maximum_assignment(hits),
                raw_local=len(raw_ids), raw_ids=raw_ids, direct_closed=sum(bool(x['closed']) for x in inventory),
                positive_calls=positive_calls, positive_Sources=sources, inventory=inventory,
                linked_windows=len(windows), prune_rounds=rounds)


def linked_comparison(c, upstream, native):
    uw, un = c.tables(upstream)
    nw, nn = c.tables(native)
    def group(windows, names):
        out = defaultdict(list)
        for a, ns in names.items():
            for name in ns:
                out[name].append(windows[a])
        return out
    a, b = group(uw, un), group(nw, nn)
    changed, profiles = [], []
    for name in sorted(a.keys() & b.keys()):
        if Counter(c.key(w) for w in a[name]) != Counter(c.key(w) for w in b[name]):
            changed.append(name)
        if Counter(json.dumps(c.profile(upstream, w), sort_keys=True) for w in a[name]) != Counter(
                json.dumps(c.profile(native, w), sort_keys=True) for w in b[name]):
            profiles.append(name)
    extra = [dict(start=x, bytes=w['end'] - x, names=sorted(nn[x]))
             for x, w in sorted(nw.items()) if not nn[x] & a.keys()]
    return dict(lost_names=sorted(a.keys() - b.keys()), changed_shared_shapes=changed,
                changed_shared_Source_profiles=profiles, extra_windows=extra)


def sections(e):
    return {s['name']: dict(address=s['address'], bytes=s['size'], flags=s['flags'],
                           sha256=sha(e.b[s['offset']:s['offset'] + s['size']]))
            for s in e.sections if s['flags'] & 2}


def selector_evidence(p):
    source = (p / 'upstream/builds/first/ordered.ld').read_text()
    script = (p / 'controller/ordered-native.ld').read_text()
    selectors = lambda s: [x.split('("', 1)[1] for x in s.splitlines() if '("' in x]
    require(selectors(source) == selectors(script), 'upstream section selectors changed')
    observation = read(p / 'provenance/final-link-bindings.json')
    require(len(observation['witnesses']) == 447, 'selector count differs')
    for w in observation['witnesses']:
        prefix, selector = script.splitlines()[w['line'] - 1].strip().split('("', 1)
        require(selector == w['selector'], 'selector witness differs')
        if 'archive' in w:
            require(prefix == '*' + w['archive'] + ':' + w['member'], 'archive locator differs')
            require(observation['archive_tables'][w['archive']]['members'].count(w['member']) == 1,
                    'recorded archive member differs')
        else:
            require(fnmatch.fnmatchcase(w['root_object'], prefix), 'root object locator differs')
    return dict(selectors=447, source_order_preserved=True,
                scope='Replay of recorded post-build member tables; most archives are external inputs.')


def provider_evidence(p, c, e, upstream):
    record = read(p / 'provider/archive.json')
    data = raw(p / 'provider' / (record['filename'] + '.gz'))
    require(identity(data) == {k: record[k] for k in ('bytes', 'sha256')}, 'provider archive differs')
    objects = c.archive_objects(data)
    executable = c.executable_sections(data)
    ew, en = c.tables(e)
    uw, un = c.tables(upstream)
    extras = linked_comparison(c, upstream, e)['extra_windows']
    map_text = raw(p / 'builds/build-05-v2path/link/link.map.gz').decode()
    result = []
    for row in extras:
        start, size = row['start'], row['bytes']
        lines = [line for line in map_text.splitlines() if re.match(
            r'^\s*' + format(start, 'x') + r'\s+' + format(start, 'x') + r'\s+' + format(size, 'x') + r'\s+', line)
            and record['filename'] in line and ':(.text' in line]
        require(len(lines) == 1, 'allocator link-map provider differs')
        section = lines[0].rsplit(':(', 1)[1].removesuffix(')')
        require(section in executable and len(executable[section]) == size, 'allocator object extent differs')
        hits = [a for a, w in uw.items() if c.key(w) == c.key(ew[start])]
        require(bool(hits), 'allocator normalized counterpart missing')
        result.append(dict(**row, section=section, provider_line=lines[0].strip(),
                           normalized_counterparts=hits, object_section_sha256=sha(executable[section]),
                           all_counterparts_raw_unequal=all(uw[a]['raw_sha256'] != ew[start]['raw_sha256'] for a in hits)))
    return dict(archive=record, object_members=len(objects), extra_windows=result,
                scope='Actual archived sections, linked extents and body counterparts; no unique source or semantic-equivalence claim.')


def analyze(p=P):
    p = p.resolve()
    pins = source_inputs(p)
    commands = provenance(p, pins)
    require(sha((p / 'reference/reader.py').read_bytes()) == READER, 'reader differs')
    c = module('q436_closure', p / 'reference/closure.py')
    reader = module('q436_reader', p / 'reference/reader.py')
    rows = read(p / 'upstream/inventory.json')
    require(len(rows) == 441, 'original catalog differs')
    images = {'original': raw(p / 'reference/original-allocation.so.gz'),
              'upstream': raw(p / 'upstream/builds/first/symbols.so.gz')}
    upstream_stripped = raw(p / 'upstream/builds/first/candidate.so.gz')
    require(sha(images['original']) == ORIGINAL and sha(images['upstream']) == UPSTREAM, 'reference ELF differs')
    for label in LABELS:
        images[label] = raw(p / 'builds' / label / 'symbols.so.gz')
        images[label + '-strip'] = raw(p / 'builds' / label / 'candidate-v154-strip.so.gz')
    require(images['build-03-paths'] == images['build-04-repeat']
            and images['build-05-v2path'] == images['build-06-repeat']
            and images['build-03-paths-strip'] == images['build-04-repeat-strip']
            and images['build-05-v2path-strip'] == images['build-06-repeat-strip'], 'fresh output repeat differs')
    with tempfile.TemporaryDirectory() as temp:
        paths = {}
        for name, data in images.items():
            path = Path(temp) / (name + '.so')
            path.write_bytes(data)
            paths[name] = reader.Elf(path)
        original, upstream = paths['original'], paths['upstream']
        ow = {r['start']: original.window(r['start'], r['start'] + r['bytes']) for r in rows}
        baseline = measure(c, original, ow, rows, upstream)
        require(baseline['normalized'] == 436 and baseline['raw_local'] == 141
                and baseline['direct_closed'] == 429 and len(baseline['positive_Sources']) == 486,
                'upstream frontier differs')
        for row, actual in zip(rows, baseline['inventory']):
            require(row['id'] == actual['id'] and row['status'] ==
                    ('raw' if actual['raw'] else 'normalized' if actual['matches'] else 'unmatched')
                    and row['direct_closed'] == bool(actual['closed']), 'upstream catalog status differs')
        builds = {}
        for label in LABELS:
            e, stripped = paths[label], paths[label + '-strip']
            require(sections(e) == sections(stripped), 'stripping changed allocated sections')
            measured = measure(c, original, ow, rows, e)
            require(measured['normalized'] == measured['injective'] == 436
                    and measured['direct_closed'] == 429 and len(measured['positive_calls']) == 4473,
                    'native body/call frontier differs')
            require(measured['positive_calls'] == baseline['positive_calls'], 'positive call set differs')
            for old, new in zip(baseline['inventory'], measured['inventory']):
                require(old['id'] == new['id'] and bool(old['matches']) == bool(new['matches'])
                        and bool(old['closed']) == bool(new['closed']), 'body/closure ID set differs')
                if label not in LABELS[:2]:
                    require(all(profile in new['Source_profiles'] for profile in old['Source_profiles']),
                            'matched Source profile lost')
            expected_raw = 78 if label == 'build-01' else 141
            expected_sources = 485 if label in LABELS[:2] else 486
            require(measured['raw_local'] == expected_raw and len(measured['positive_Sources']) == expected_sources,
                    'raw/Source frontier differs')
            if label != 'build-01':
                require(measured['raw_ids'] == baseline['raw_ids'], 'raw ID set differs')
            if label not in LABELS[:2]:
                require(measured['positive_Sources'] == baseline['positive_Sources'], 'positive Source set differs')
            comparison = linked_comparison(c, upstream, e)
            require(not comparison['changed_shared_shapes'], 'shared normalized function body differs')
            if label in LABELS[-2:]:
                require(not comparison['changed_shared_Source_profiles'] and not comparison['lost_names'],
                        'final linked Source/name preservation differs')
                a, b = sections(upstream)['.rodata'], sections(e)['.rodata']
                require(a['bytes'] == b['bytes'] == 18500 and a['sha256'] == b['sha256']
                        and b['address'] - a['address'] == 720, 'final rodata payload/address differs')
            whole_original = e.b == original.b or stripped.b == original.b
            require(not whole_original and e.b != upstream.b and stripped.b != upstream_stripped,
                    'unexpected whole-file equality')
            builds[label] = dict(measurement=measured, linked=comparison,
                                 outputs={n: identity(images[n]) for n in (label, label + '-strip')},
                                 sections=sections(e), whole_original_equal=whole_original,
                                 whole_upstream_equal=e.b == upstream.b,
                                 whole_upstream_stripped_equal=stripped.b == upstream_stripped)
        provider = provider_evidence(p, c, paths['build-05-v2path'], upstream)
        require([x['bytes'] for x in provider['extra_windows']] == [312, 408], 'extra allocator extents differ')
        return dict(source_files=67, compilation_commands=commands, baseline=baseline,
                    builds=builds, upstream_sections=sections(upstream), selectors=selector_evidence(p),
                    provider=provider, target_executions=0,
                    limits='Raw compiler ELF and ordinary stripped output remain unequal to upstream and original allocation image. Normalized windows, local raw bytes, direct-call relation and Source descriptors are separate bounded static checks. No VM, live transaction, indirect-call, generic data or semantic equivalence proof.')


def verify(p=P):
    verify_manifest(p)
    report = analyze(p)
    require(json.loads(json.dumps(report)) == read(p / 'report.json.gz'), 'saved report differs')
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--packet', type=Path, default=P)
    args = parser.parse_args()
    result = verify(args.packet)
    print(json.dumps(dict(source_files=result['source_files'], builds=len(result['builds']),
                          final_normalized=436, final_raw_local=141, final_direct_closed=429,
                          final_positive_calls=4473, final_positive_Sources=486,
                          extra_text_bytes=720, whole_original_equal=False, target_executions=0), indent=2))
