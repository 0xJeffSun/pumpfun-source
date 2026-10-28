"""Recompute body identity, allocator edges and ordered direct-call closure."""
from collections import Counter, defaultdict
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
PARENT = ROOT / 'research/mayhem-quotes-current-recovery-20261027'


def require(condition, message):
    if not condition:
        raise ValueError(message)


def key(window):
    return (window['end']-window['start'], window['normalized_sha256'],
            json.dumps(window['normalization_pattern'], sort_keys=True))


def closed_relation(pairs, edges):
    active = set(pairs)
    rounds = []
    while True:
        rejected = {pair for pair in active if any(edge not in active for edge in edges[pair])}
        if not rejected:
            return active, rounds
        active.difference_update(rejected)
        rounds.append(len(rejected))


def derive():
    spec = importlib.util.spec_from_file_location('provider_reader', PARENT / 'reader.py')
    reader = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(reader)
    original = reader.Elf(ROOT / 'evidence/original/mayhem/deployed.so')
    inventory = json.loads((PARENT / 'inventory.json').read_bytes())['rows']
    ow = {r['start']: original.window(r['start'], r['start']+r['bytes']) for r in inventory}
    names_by_start = {r['start']: r['id'] for r in inventory}
    allocator = next(r for r in inventory if r['id'] == 'O0209')
    reserve = next(r for r in inventory if r['id'] == 'O0210')
    cohorts = {}
    for label in ['baseline', 'enabled-a', 'enabled-b', 'enabled-c', 'gated']:
        payload = gzip.decompress((HERE / 'builds' / label / 'symbols.so.gz').read_bytes())
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / 'symbols.so'
            path.write_bytes(payload)
            elf = reader.Elf(path)
        windows = {}
        symbols = defaultdict(set)
        for symbol in elf.symbols:
            if symbol['info'] & 15 == 2 and symbol['size'] >= 8 and elf.lo <= symbol['value'] < elf.hi:
                address = symbol['value']
                window = elf.window(address, address+symbol['size'])
                require(address not in windows or windows[address] == window, 'conflicting symbol extents')
                windows[address] = window
                symbols[address].add(symbol['name'])
        grouped = defaultdict(list)
        for address, window in windows.items():
            grouped[key(window)].append(address)
        pairs = {(a, b) for a, window in ow.items() for b in grouped[key(window)]}
        edges = {}
        for a, b in pairs:
            first, second = ow[a]['direct'], windows[b]['direct']
            require([c['offset'] for c in first] == [c['offset'] for c in second], 'direct-call positions differ')
            edges[(a, b)] = [(x['target'], y['target']) for x, y in zip(first, second)]
        active, rounds = closed_relation(pairs, edges)
        classifications = {}
        for row in inventory:
            hits = grouped[key(ow[row['start']])]
            raw = [a for a in hits if windows[a]['raw_sha256'] == ow[row['start']]['raw_sha256']]
            classifications[row['id']] = 'raw-equal' if raw else 'normalized-only' if hits else 'unmatched'
        allocator_edges = []
        for a, b in sorted(pairs):
            if a != reserve['start']:
                continue
            call = [c for c in windows[b]['direct'] if c['offset'] == 528]
            require(len(call) == 1, 'reserve must have one call at relative offset 528')
            target = call[0]['target']
            allocator_edges.append({'reserve_start': b, 'call_pc': call[0]['pc'], 'target': target,
                                    'target_symbols': sorted(symbols[target]),
                                    'target_bytes': windows[target]['end']-target if target in windows else None,
                                    'target_matches_original_O0209': (allocator['start'], target) in pairs,
                                    'reserve_pair_survives_direct_closure': (a, b) in active})
        cohorts[label] = {'symbols_sha256': hashlib.sha256(payload).hexdigest(),
                          'counts': dict(Counter(classifications.values())), 'classifications': classifications,
                          'normalized_pairs': len(pairs), 'direct_closed_pairs': len(active),
                          'direct_closed_windows': sorted({names_by_start[a] for a, b in active}),
                          'removed_pairs_per_round': rounds, 'allocator_edges': allocator_edges}
    base = cohorts['baseline']
    enabled = cohorts['enabled-a']
    return {'scope': 'Mixed-framework source-context composition; not authenticated historical source or full code/data equivalence',
            'cohorts': cohorts,
            'gained_raw_windows': sorted(i for i, c in enabled['classifications'].items() if c == 'raw-equal' and base['classifications'][i] != 'raw-equal'),
            'lost_raw_windows': sorted(i for i, c in base['classifications'].items() if c == 'raw-equal' and enabled['classifications'][i] != 'raw-equal'),
            'gained_direct_closed_windows': sorted(set(enabled['direct_closed_windows'])-set(base['direct_closed_windows'])),
            'lost_direct_closed_windows': sorted(set(base['direct_closed_windows'])-set(enabled['direct_closed_windows'])),
            'new_normalized_windows': sorted(i for i, c in enabled['classifications'].items() if c != 'unmatched' and base['classifications'][i] == 'unmatched'),
            'limits': ['Direct-call closure is a greatest relation, not an injective global assignment.',
                       'Indirect calls, data/vtables, external implementations and relocation values remain unverified.',
                       'The historical macro/IDL and current runtime are not an authenticated original source cohort.',
                       'Default linker ordering differs from the selected qualified checkpoint.']}


if __name__ == '__main__':
    print(json.dumps(derive(), indent=2))
