"""Bounded relocated code-reference proof; no compilation or execution."""
from pathlib import Path
import gzip
import hashlib
import importlib.util
import json
import tempfile

if not __debug__:
    raise RuntimeError('Assertions are required')

P = Path(__file__).resolve().parent
R = P.parents[1]
M = R / 'research/mayhem-current-macro-call-closure-20261027'
F = R / 'research/mayhem-current434-composition-20261027'
sha = lambda b: hashlib.sha256(b).hexdigest()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


reader = module('code_reference_elf', M / 'reader.py')
matcher = module('code_reference_matcher', M / 'verify.py')


def inputs():
    return ((R / 'evidence/original/mayhem/deployed.so').read_bytes(),
            gzip.decompress((F / 'builds/first/symbols.so.gz').read_bytes()))


def elves(original, candidate):
    # The unchanged reader accepts paths. Private temporary images are removed.
    with tempfile.TemporaryDirectory() as directory:
        paths = [Path(directory) / name for name in ['original.so', 'candidate.so']]
        for path, data in zip(paths, [original, candidate]):
            path.write_bytes(data)
        return tuple(reader.Elf(path) for path in paths)


def inspect(original, candidate):
    o, c = elves(original, candidate)
    rows = json.loads((M / 'original-windows.json').read_text())
    ow = {r['start']: o.window(r['start'], r['start'] + r['bytes']) for r in rows}
    cw, names = matcher.tables(c)
    groups, pairs, direct_closed, _ = matcher.relation(ow, cw)
    edges, malformed, sites = {}, {}, []
    for a, b in sorted(pairs):
        left, right = ow[a], cw[b]
        edges[a, b] = [(x['target'], y['target'])
                       for x, y in zip(left['direct'], right['direct'])]
        # Include either side's code targets so a masked code-to-data change
        # cannot silently remove an obligation.
        ld = {x['offset']: x for x in left['data_references']}
        rd = {x['offset']: x for x in right['data_references']}
        selected = sorted(k for k in ld.keys() | rd.keys()
                          if ld.get(k, {}).get('kind') == 'code'
                          or rd.get(k, {}).get('kind') == 'code')
        for offset in selected:
            x, y = ld.get(offset), rd.get(offset)
            valid = bool(x and y and x['kind'] == y['kind'] == 'code'
                         and x['target'] in ow and y['target'] in cw)
            sites.append(dict(original=a, candidate=b, offset=offset,
                              original_target=x['target'] if x else None,
                              candidate_target=y['target'] if y else None,
                              bounded_function_targets=valid))
            if valid:
                edges[a, b].append((x['target'], y['target']))
            else:
                malformed.setdefault((a, b), []).append(offset)
    active = set(pairs) - malformed.keys()
    rounds = []
    while True:
        lost = {p for p in active if any(t not in active for t in edges[p])}
        if not lost:
            break
        rounds.append(len(lost))
        active -= lost
    ids = {r['start']: r['id'] for r in rows}
    for x in sites:
        x['id'] = ids[x['original']]
        x['closed'] = ((x['original'], x['candidate']) in active)
        x['candidate_target_names'] = sorted(names.get(x['candidate_target'], []))
    inventory = []
    for r in rows:
        a = r['start']
        hits = groups[matcher.key(ow[a])]
        inventory.append(dict(id=r['id'], original=a, bytes=r['bytes'],
                              matched=bool(hits),
                              direct_closed=any((a, b) in direct_closed for b in hits),
                              direct_and_code_reference_closed=any((a, b) in active for b in hits),
                              indirect_calls=len(ow[a]['indirect']),
                              Source_references=sum(matcher.source(o, x['target']) is not None
                                                    for x in ow[a]['data_references']),
                              non_Source_data_references=sum(matcher.source(o, x['target']) is None
                                                             for x in ow[a]['data_references'])))
    return dict(original_sha256=sha(original), candidate_symbols_sha256=sha(candidate),
                summary=dict(windows=len(rows), matched_windows=sum(x['matched'] for x in inventory),
                             initial_pairs=len(pairs), direct_closed_pairs=len(direct_closed),
                             direct_and_code_reference_closed_pairs=len(active),
                             direct_closed_windows=len({a for a, b in direct_closed}),
                             direct_and_code_reference_closed_windows=len({a for a, b in active}),
                             code_reference_sites=len({(x['original'], x['offset']) for x in sites}),
                             code_reference_pairs=len(sites),
                             bounded_reference_pairs=sum(x['bounded_function_targets'] for x in sites),
                             closed_reference_pairs=sum(x['closed'] for x in sites),
                             distinct_original_code_targets=len({x['original_target'] for x in sites}),
                             pruning_rounds=rounds,
                             malformed_pairs=len(malformed),
                             indirect_calls=sum(x['indirect_calls'] for x in inventory),
                             indirect_call_windows=sum(bool(x['indirect_calls']) for x in inventory),
                             Source_references=sum(x['Source_references'] for x in inventory),
                             Source_references_in_matched=sum(x['Source_references'] for x in inventory if x['matched']),
                             non_Source_references_in_matched=sum(x['non_Source_data_references'] for x in inventory if x['matched'])),
                references=sites, inventory=inventory,
                scope='Recursive whole-window relation over direct calls and relocated code-address loads only. '
                      'A code-address load is not proof that an indirect call consumes it. '
                      'Non-code data, vtables, dynamic dispatch, runtime behavior and whole-ELF identity remain outside this relation.')


def verify():
    files = list(P.rglob('*'))
    assert not any(p.is_symlink() for p in files)
    assert all(p.is_file() or p.is_dir() for p in files), 'Special file in packet'
    assert {p.relative_to(P).as_posix(): sha(p.read_bytes()) for p in files
            if p.is_file() and p != P / 'manifest.json'} == json.loads((P / 'manifest.json').read_text())
    for name, digest in json.loads((P / 'inputs.json').read_text()).items():
        assert sha((R / name).read_bytes()) == digest, name
    report = inspect(*inputs())
    assert report == json.loads((P / 'observations.json').read_text())
    summary = report['summary']
    assert summary['matched_windows'] == 434
    assert summary['direct_and_code_reference_closed_windows'] == summary['direct_closed_windows'] == 425
    assert summary['code_reference_sites'] == 48 and summary['distinct_original_code_targets'] == 15
    assert summary['closed_reference_pairs'] == summary['code_reference_pairs']
    assert summary['malformed_pairs'] == 0
    return summary


if __name__ == '__main__':
    print(json.dumps(verify(), indent=2))
