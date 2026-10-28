"""Unchanged normalized-body keys and ordered direct-call fixed point, all symbols."""
import collections
import hashlib
import importlib.util
import json
from pathlib import Path


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


def derive(root, symbols):
    reader = module('allocator_reader', root/'research/mayhem-quotes-current-recovery-20261027/reader.py')
    audit = module('allocator_pruning', root/'research/mayhem-direct-call-closure-20261027/verify.py')
    rows = json.loads((root/'research/mayhem-quotes-current-recovery-20261027/inventory.json').read_bytes())['rows']
    original = reader.Elf(root/'evidence/original/mayhem/deployed.so')
    candidate = reader.Elf(symbols)
    originals = {r['start']: original.window(r['start'], r['start']+r['bytes']) for r in rows}
    candidates, names = {}, collections.defaultdict(set)
    for symbol in candidate.symbols:
        if symbol['info'] & 15 != 2 or symbol['size'] < 8 or not candidate.lo <= symbol['value'] < candidate.hi:
            continue
        address = symbol['value']
        window = candidate.window(address, address+symbol['size'])
        assert address not in candidates or candidates[address] == window
        candidates[address] = window
        names[address].add(symbol['name'])
    grouped = collections.defaultdict(list)
    for address, window in candidates.items():
        grouped[audit.key(window)].append(address)
    pairs = {(address, target) for address, window in originals.items() for target in grouped[audit.key(window)]}
    calls, edges = {}, {}
    for pair in pairs:
        a, b = originals[pair[0]], candidates[pair[1]]
        assert [c['offset'] for c in a['direct']] == [c['offset'] for c in b['direct']]
        calls[pair] = [(x['offset'], (x['target'], y['target'])) for x, y in zip(a['direct'], b['direct'])]
        edges[pair] = [target for _, target in calls[pair]]
    active, removed, rounds = audit.prune(pairs, edges)
    details = []
    for row in rows:
        start = row['start']
        hits = sorted(b for a, b in pairs if a == start)
        raw = [b for b in hits if originals[start]['raw_sha256'] == candidates[b]['raw_sha256']]
        details.append(dict(id=row['id'], start=start, bytes=row['bytes'], raw_counterparts=raw,
            normalized_counterparts=hits, direct_closed_counterparts=[b for b in hits if (start,b) in active],
            calls=[dict(candidate=b, removed_round=removed.get((start,b)), targets=[dict(offset=offset,
                original_target=target[0], candidate_target=target[1], candidate_symbols=sorted(names[target[1]]),
                target_normalized=target in pairs, target_closed=target in active) for offset,target in calls[(start,b)]]) for b in hits]))
    legacy = [s for s in candidate.symbols if 'legacy_buy_handler17' in s['name']]
    assert len(legacy) == 1
    s = legacy[0]
    w = candidate.window(s['value'], s['value']+s['size'])
    return dict(symbols_sha256=hashlib.sha256(candidate.b).hexdigest(), normalized_pairs=len(pairs),
        direct_closed_pairs=len(active), pruning_rounds=rounds, normalized_windows=len({a for a,b in pairs}),
        direct_closed_windows=len({a for a,b in active}), raw_windows=sum(bool(r['raw_counterparts']) for r in details),
        legacy_buy=dict(bytes=s['size'], normalized_sha256=w['normalized_sha256'], pattern=w['normalization_pattern']),
        rows=details)
