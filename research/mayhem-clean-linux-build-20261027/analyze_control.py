"""Partial Legacy Buy sequence diagnostics; alignment is not a function match."""
import difflib
import gzip
import importlib.util
import json
from pathlib import Path
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]


def derive():
    spec = importlib.util.spec_from_file_location('control_reader', ROOT / 'research/mayhem-quotes-current-recovery-20261027/reader.py')
    reader = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(reader)
    original = reader.Elf(ROOT / 'evidence/original/mayhem/deployed.so')
    target, pattern = original.norm(113672, 127520)
    slots = lambda body: [body[i:i+8] for i in range(0, len(body), 8)]
    rows = []
    with tempfile.TemporaryDirectory() as temp:
        for name in ['build', 'control']:
            path = Path(temp) / (name + '.so')
            path.write_bytes(gzip.decompress((HERE / name / 'symbols.so.gz').read_bytes()))
            elf = reader.Elf(path)
            symbols = [s for s in elf.symbols if '18legacy_buy_handler' in s['name'] and s['info'] & 15 == 2]
            if len(symbols) != 1:
                raise ValueError('nonunique Legacy Buy symbol')
            symbol = symbols[0]
            body, candidate_pattern = elf.norm(symbol['value'], symbol['value'] + symbol['size'])
            a, b = slots(target), slots(body)
            aligned = sum(block.size for block in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks())
            rows.append({'build': name, 'candidate_bytes': len(body), 'original_bytes': len(target),
                         'complete_normalized_match': body == target and candidate_pattern == pattern,
                         'same_offset_equal_slots': sum(x == y for x, y in zip(a, b)),
                         'sequence_matcher_aligned_slots': aligned})
    return {'scope': 'Heuristic partial alignment only; not source recovery acceptance', 'rows': rows,
            'new_matched_windows': 0, 'runtime_executions': 0}


if __name__ == '__main__':
    print(json.dumps(derive(), indent=2))
