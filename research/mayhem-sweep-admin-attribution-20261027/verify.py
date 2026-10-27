#!/usr/bin/env python3
"""Re-derive a bounded static attribution; never executes or edits ELF inputs."""
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


def derive(root=ROOT):
    for name, digest in INPUTS.items():
        require(hashlib.sha256((root / name).read_bytes()).hexdigest() == digest,
                'input hash mismatch: ' + name)
    spec = importlib.util.spec_from_file_location('attribution_reader', root / PARENT / 'reader.py')
    reader = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(reader)
    inventory = json.loads((root / PARENT / 'inventory.json').read_text())
    original = reader.Elf(root / 'evidence/original/mayhem/deployed.so')
    rows = inventory['rows']
    target = next(r for r in rows if r['id'] == 'O0075')
    require((target['start'], target['bytes'], target['classification']) ==
            (69192, 8008, 'unmatched'), 'target inventory changed')
    callers = []
    for row in rows:
        window = original.window(row['start'], row['start'] + row['bytes'])
        for call in window['direct']:
            if call['target'] == target['start']:
                callers.append((row, call))
    require(len(callers) == 1, 'expected one direct call to window start')
    row, call = callers[0]
    require(row['id'] == 'O0170' and row['counterpart_count'] == 1,
            'caller attribution is not unique')
    require(len(row['counterparts']) == 1, 'truncated/ambiguous counterpart list')
    counterpart = row['counterparts'][0]
    with tempfile.TemporaryDirectory() as temp:
        path = Path(temp) / 'symbols.so'
        path.write_bytes(gzip.decompress((root / PARENT / 'builds/current/symbols.so.gz').read_bytes()))
        candidate = reader.Elf(path)
        require(hashlib.sha256(candidate.b).hexdigest() == inventory['candidate_symbols_sha256'],
                'decompressed artifact binding mismatch')
        start = counterpart['start']
        original_norm, original_pattern = original.norm(row['start'], row['start'] + row['bytes'])
        candidate_norm, candidate_pattern = candidate.norm(start, start + row['bytes'])
        require(original_norm == candidate_norm and original_pattern == candidate_pattern,
                'complete caller normalized body differs')
        wrapper_symbols = sorted({s['name'] for s in candidate.symbols
                                  if s['value'] == start and s['size'] == row['bytes'] and s['info'] & 15 == 2})
        require(wrapper_symbols == counterpart['names'] and len(wrapper_symbols) == 1 and
                '9__private8__global16sweep_fees_admin' in wrapper_symbols[0],
                'wrapper symbol attribution differs')
        paired = [c for c in candidate.window(start, start + row['bytes'])['direct']
                  if c['offset'] == call['offset']]
        require(len(paired) == 1, 'missing paired direct call')
        callee = paired[0]['target']
        symbols = [s for s in candidate.symbols if s['value'] == callee and
                   s['info'] & 15 == 2 and '16mayhem_recovered16mayhem_recovered16sweep_fees_admin' in s['name']]
        require(len(symbols) == 1, 'handler target symbol is not unique')
        symbol = symbols[0]
        return {
            'scope': 'Static reconstruction attribution, not original symbol authentication or a new body match',
            'inputs': INPUTS,
            'original_window': {'id': target['id'], 'start': target['start'], 'bytes': target['bytes'],
                                'raw_sha256': original.window(target['start'], target['start'] + target['bytes'])['raw_sha256']},
            'caller': {'id': row['id'], 'original_start': row['start'], 'bytes': row['bytes'],
                       'candidate_start': start, 'candidate_symbol': wrapper_symbols[0],
                       'complete_normalized_body_equal': True, 'direct_call_offset': call['offset'],
                       'original_call_pc': call['pc'], 'candidate_call_pc': paired[0]['pc']},
            'candidate_callee': {'start': callee, 'bytes': symbol['size'], 'symbol': symbol['name']},
            'attributed_role': 'SweepFeesAdmin handler',
            'direct_callers_to_window_start': 1,
            'new_matched_windows': 0,
            'target_executions': 0,
            'whole_elf_equal': original.b == candidate.b,
            'limits': ['Direct calls only; indirect or interior-entry callers are not excluded.',
                       'Caller body normalization masks call/data operands; transitive equivalence remains open.',
                       'Candidate names are reconstruction symbols, not recovered original symbols.',
                       'No sweep execution or source-build qualification is claimed.'],
        }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', action='store_true', help='write report instead of checking it')
    args = parser.parse_args()
    report = derive()
    path = HERE / 'report.json'
    if args.write:
        path.write_text(json.dumps(report, indent=2) + '\n')
    else:
        require(json.loads(path.read_text()) == report, 'saved report differs')
    print('O0075: SweepFeesAdmin attribution verified; zero new body matches or executions')


if __name__ == '__main__':
    main()
