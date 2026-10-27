#!/usr/bin/env python3
"""Audit a relation of normalized bodies under ordered direct-call edges only."""
from collections import defaultdict
import argparse
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
PARENT = 'research/mayhem-quotes-current-recovery-20261027/'
INPUTS = {
    'evidence/original/mayhem/deployed.so': 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb',
    PARENT + 'reader.py': '7be3a56418587fdc05178529428ab18df40a252fbd46431ceb98e9107fe414b1',
    PARENT + 'inventory.json': '2d94e21c1ff7f5f0ceec8fe90b476a14bf208548f38bf90c7c689e05d5881c24',
    PARENT + 'builds/current/symbols.so.gz': 'dab4d986498905f04a4b34228f156856ac1fa29d355657c33261a7c5a67cbd78',
}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def prune(pairs, edges):
    """Greatest relation closed under all ordered, corresponding direct calls.

    edges[pair] contains target pairs. Simultaneous rounds retain supported
    recursion and remove parents of rejected targets on subsequent rounds.
    This is a relation, not an injective assignment of counterpart functions.
    """
    active = set(pairs)
    removed = {}
    rounds = []
    while True:
        dropped = {pair for pair in active if any(target not in active for target in edges[pair])}
        if not dropped:
            return active, removed, rounds
        round_number = len(rounds) + 1
        for pair in dropped:
            removed[pair] = round_number
        active.difference_update(dropped)
        rounds.append(len(dropped))


def key(window):
    return (window['end'] - window['start'], window['normalized_sha256'],
            json.dumps(window['normalization_pattern'], sort_keys=True))


def derive(root=ROOT):
    for name, digest in INPUTS.items():
        require(hashlib.sha256((root / name).read_bytes()).hexdigest() == digest,
                'input hash mismatch: ' + name)
    spec = importlib.util.spec_from_file_location('closure_reader', root / PARENT / 'reader.py')
    reader = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(reader)
    inventory = json.loads((root / PARENT / 'inventory.json').read_text())
    original = reader.Elf(root / 'evidence/original/mayhem/deployed.so')
    with tempfile.TemporaryDirectory() as temp:
        path = Path(temp) / 'symbols.so'
        path.write_bytes(gzip.decompress((root / PARENT / 'builds/current/symbols.so.gz').read_bytes()))
        candidate = reader.Elf(path)
    require(hashlib.sha256(candidate.b).hexdigest() == inventory['candidate_symbols_sha256'],
            'decompressed artifact binding mismatch')
    rows = inventory['rows']
    require(len(rows) == len({r['start'] for r in rows}) == 441, 'inventory partition differs')
    originals = {r['start']: original.window(r['start'], r['start'] + r['bytes']) for r in rows}
    candidates = {}
    names = defaultdict(set)
    for symbol in candidate.symbols:
        if symbol['info'] & 15 != 2 or symbol['size'] < 8 or not candidate.lo <= symbol['value'] < candidate.hi:
            continue
        address = symbol['value']
        window = candidate.window(address, address + symbol['size'])
        require(address not in candidates or candidates[address] == window, 'conflicting symbol extents')
        candidates[address] = window
        names[address].add(symbol['name'])
    grouped = defaultdict(list)
    for address, window in candidates.items():
        grouped[key(window)].append(address)
    pairs = {(address, counterpart) for address, window in originals.items()
             for counterpart in grouped[key(window)]}
    # Inventory stores only up to five counterparts: independently enumerate all.
    for row in rows:
        hits = sorted(b for a, b in pairs if a == row['start'])
        raw = [b for b in hits if originals[row['start']]['raw_sha256'] == candidates[b]['raw_sha256']]
        classification = 'raw-equal' if raw else 'normalized-only' if hits else 'unmatched'
        require(classification == row['classification'] and len(hits) == row['counterpart_count'],
                'recomputed inventory differs: ' + row['id'])
    edges = {}
    calls = {}
    for pair in sorted(pairs):
        ow, cw = originals[pair[0]], candidates[pair[1]]
        require([c['offset'] for c in ow['direct']] == [c['offset'] for c in cw['direct']],
                'direct-call positions differ in normalized pair')
        calls[pair] = [(o['offset'], (o['target'], c['target']))
                       for o, c in zip(ow['direct'], cw['direct'])]
        edges[pair] = [target for offset, target in calls[pair]]
    active, removed, rounds = prune(pairs, edges)
    by_start = {r['start']: r for r in rows}
    details = []
    for row in rows:
        start = row['start']
        hits = sorted(b for a, b in pairs if a == start)
        retained = [b for b in hits if (start, b) in active]
        rejected = []
        for counterpart in hits:
            pair = (start, counterpart)
            if pair in active:
                continue
            reasons = []
            for offset, target in calls[pair]:
                if target in active:
                    continue
                reason = 'target_pair_not_normalized' if target not in pairs else 'target_pair_removed'
                reasons.append({'call_offset': offset, 'original_target': target[0],
                                'original_target_id': by_start.get(target[0], {}).get('id'),
                                'candidate_target': target[1],
                                'candidate_target_symbols': sorted(names[target[1]]),
                                'reason': reason, 'target_removed_round': removed.get(target)})
            rejected.append({'candidate_start': counterpart, 'removed_round': removed[pair],
                             'unsupported_direct_targets': reasons})
        details.append({'id': row['id'], 'start': start, 'bytes': row['bytes'],
                        'body_classification': row['classification'],
                        'normalized_counterparts': len(hits), 'direct_closed_counterparts': retained,
                        'rejected_counterparts': rejected})
    return {
        'scope': 'Static ordered direct-call relation only; not complete code/data or semantic equivalence',
        'inputs': INPUTS,
        'normalized_pairs': len(pairs), 'normalized_windows': len({a for a, b in pairs}),
        'removed_pairs_per_round': rounds,
        'direct_closed_pairs': len(active), 'direct_closed_windows': len({a for a, b in active}),
        'normalized_windows_without_direct_closed_counterpart':
            [r['id'] for r in details if r['normalized_counterparts'] and not r['direct_closed_counterparts']],
        'unmatched_windows': [r['id'] for r in details if not r['normalized_counterparts']],
        'new_body_matches': 0, 'target_executions': 0,
        'limits': ['External syscalls are identified by retained relocation patterns, not implementation proofs.',
                   'Indirect calls, data references, vtables and relocation value identity remain unverified.',
                   'Only original window starts and candidate function-symbol starts are admitted as direct targets.',
                   'The greatest relation supports recursive cycles; it does not prove an injective assignment.',
                   'Normalized equality still masks address operands and does not prove raw ELF equality.'],
        'rows': details,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    report = derive()
    path = HERE / 'report.json'
    if args.write:
        path.write_text(json.dumps(report, indent=2) + '\n')
    else:
        require(json.loads(path.read_text()) == report, 'saved report differs')
    print(json.dumps({k: v for k, v in report.items() if k not in ('rows', 'inputs', 'limits')}, indent=2))


if __name__ == '__main__':
    main()
