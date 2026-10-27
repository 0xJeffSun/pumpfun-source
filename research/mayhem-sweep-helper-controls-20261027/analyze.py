"""Recompute bounded source-control diagnostics; no VM execution or ELF editing."""
from collections import Counter, defaultdict
import difflib
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
PARENT = ROOT / 'research/mayhem-quotes-current-recovery-20261027'


def derive():
    spec = importlib.util.spec_from_file_location('sweep_reader', PARENT / 'reader.py')
    reader = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(reader)
    original = reader.Elf(ROOT / 'evidence/original/mayhem/deployed.so')
    inventory = json.loads((PARENT / 'inventory.json').read_text())
    originals = {r['id']: original.window(r['start'], r['start'] + r['bytes']) for r in inventory['rows']}
    key = lambda w: (w['end']-w['start'], w['normalized_sha256'], json.dumps(w['normalization_pattern'], sort_keys=True))
    target, target_pattern = original.norm(65472, 66384)
    slots = lambda data: [data[i:i+8] for i in range(0, len(data), 8)]
    reports = []
    with tempfile.TemporaryDirectory() as temp:
        for folder in sorted((HERE / 'controls').iterdir()):
            path = Path(temp) / 'symbols.so'
            path.write_bytes(gzip.decompress((folder / 'symbols.so.gz').read_bytes()))
            elf = reader.Elf(path)
            symbols = [s for s in elf.symbols if '14validate_sweep' in s['name'] and s['info'] & 15 == 2]
            if len(symbols) != 1:
                raise ValueError('nonunique helper symbol')
            symbol = symbols[0]
            body, pattern = elf.norm(symbol['value'], symbol['value']+symbol['size'])
            windows = {}
            for s in elf.symbols:
                if s['info'] & 15 == 2 and s['size'] >= 8 and elf.lo <= s['value'] < elf.hi:
                    windows[s['value']] = elf.window(s['value'], s['value']+s['size'])
            grouped = defaultdict(list)
            for address, window in windows.items():
                grouped[key(window)].append(address)
            classified = []
            for row in inventory['rows']:
                window = originals[row['id']]
                hits = grouped[key(window)]
                raw = [a for a in hits if windows[a]['raw_sha256'] == window['raw_sha256']]
                classified.append((row['id'], 'raw-equal' if raw else 'normalized-only' if hits else 'unmatched'))
            reports.append({'control': folder.name, 'symbols_sha256': hashlib.sha256(elf.b).hexdigest(),
                            'helper_bytes': len(body), 'original_bytes': len(target),
                            'complete_normalized_match': body == target and pattern == target_pattern,
                            'same_offset_equal_slots': sum(a == b for a, b in zip(slots(target), slots(body))),
                            'sequence_aligned_slots': sum(b.size for b in difflib.SequenceMatcher(None, slots(target), slots(body), autojunk=False).get_matching_blocks()),
                            'counts': dict(Counter(c for _, c in classified)),
                            'unmatched': [i for i, c in classified if c == 'unmatched'],
                            'classification_sha256': hashlib.sha256(json.dumps(classified).encode()).hexdigest()})
    return {'scope': 'Partial helper controls; no function recovery or runtime qualification',
            'rows': reports, 'new_body_matches': 0, 'target_executions': 0}


if __name__ == '__main__':
    print(json.dumps(derive(), indent=2))
