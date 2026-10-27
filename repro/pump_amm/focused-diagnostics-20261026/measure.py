#!/usr/bin/env python3
"""Compare full original windows using the retained AMM normalization only."""
import argparse
import collections
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[3]
READER = ROOT / 'repro/pump_amm/claim-self-transfer-v144/static-tool'
sys.path.insert(0, str(READER))
from elf_reader import Elf
sys.path.insert(0, str(ROOT / 'scripts'))
from analyze import elf_layout
from compare import compare


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--candidate', type=Path, required=True)
    p.add_argument('--symbols', type=Path, required=True)
    p.add_argument('--output', type=Path, required=True)
    args = p.parse_args()
    assert not args.output.exists()
    original = Elf(ROOT / 'evidence/original/pump_amm/deployed.so')
    candidate, symbols = Elf(args.candidate), Elf(args.symbols)
    assert candidate.b[candidate.lo:candidate.hi] == symbols.b[symbols.lo:symbols.hi]
    assert candidate.pattern(candidate.lo, candidate.hi-candidate.lo) == symbols.pattern(symbols.lo, symbols.hi-symbols.lo)
    digest = lambda data: hashlib.sha256(data).hexdigest()
    index = collections.defaultdict(list)
    for function in symbols.funcs:
        start, size = function['start'], function['size']
        key = (size, digest(candidate.normalized[start:start+size]), json.dumps(candidate.pattern(start, size), sort_keys=True))
        index[key].append({'start': start, 'name': function['name'], 'raw_sha256': digest(candidate.b[start:start+size])})
    entries = sorted(set(original.entries) | {original.lo})
    rows = []
    for start, end in zip(entries, entries[1:] + [original.hi]):
        matches = index[(end-start, digest(original.normalized[start:end]), json.dumps(original.pattern(start,end-start),sort_keys=True))]
        raw = digest(original.b[start:end])
        rows.append({'start': start, 'end': end, 'matches': matches, 'raw_match': any(m['raw_sha256']==raw for m in matches)})
    layout = elf_layout(original.b)
    assert layout['trailing_all_zero']
    result = {'candidate_sha256': digest(candidate.b), 'symbols_sha256': digest(symbols.b),
              'reader_sha256': digest((READER/'elf_reader.py').read_bytes()),
              'whole_capture': compare(original.b,candidate.b),
              'complete_elf': compare(original.b[:layout['elf_extent']],candidate.b),
              'original_allocation_zero_suffix_bytes': len(original.b)-layout['elf_extent'],
              'windows': len(rows), 'raw_matches': sum(row['raw_match'] for row in rows),
              'normalized_matches': sum(bool(row['matches']) for row in rows),
              'unmatched': sum(not row['matches'] for row in rows), 'rows': rows,
              'scope': 'Original entry-to-next-entry windows versus complete candidate symbol bodies. Relocations/direct call operands normalized by retained reader; data and transitive identity remain unproved.'}
    args.output.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({key:value for key,value in result.items() if key!='rows'},indent=2))


if __name__ == '__main__':
    main()
