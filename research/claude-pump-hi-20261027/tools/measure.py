#!/usr/bin/env python3
"""Measure a main-Pump candidate exactly like the frontier inventory, and diff it.

Equivalent to Codex's work/pump-reserve-byte-recovery/inventory_current.py: candidate
function symbols are bucketed by (length, sha256(normalized body)) using the frontier
packet's own normalizer; each original window (same 1,035-window list as the frontier
inventory) matches every candidate symbol with equal length and equal normalized
bytes; raw_match means one of those candidates is byte-identical.

Reports counts plus normalized/raw gains and losses against a baseline inventory.
"""
import argparse, gzip, hashlib, json, sys
from pathlib import Path

HERE = Path(__file__).resolve()
ROOT = next(p for p in HERE.parents if (p / 'evidence/original/pump/deployed.so').is_file())
OBJDUMP = str(Path.home() / '.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')


def read(p):
    b = Path(p).read_bytes()
    return json.loads(gzip.decompress(b) if b[:2] == b'\x1f\x8b' else b)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--packet', type=Path, required=True, help='frontier packet (normalizer + baseline inventory)')
    ap.add_argument('--candidate', type=Path, required=True, help='unstripped candidate .so')
    ap.add_argument('--baseline', type=Path, help='baseline inventory (default packet/inventory.json.gz)')
    ap.add_argument('--output', type=Path, required=True)
    ap.add_argument('--lo', type=lambda s: int(s, 0), default=0x101170)
    ap.add_argument('--hi', type=lambda s: int(s, 0), default=0x1ab9b8)
    a = ap.parse_args()
    sys.path.insert(0, str(a.packet / 'inputs/scripts'))
    from pump_compare_function_bytes import normalize, body
    from pump_quote_control_function_match import sections, candidate_functions
    base = read(a.baseline or a.packet / 'inventory.json.gz')
    cand = a.candidate.read_bytes()
    orig = (ROOT / 'evidence/original/pump/deployed.so').read_bytes()
    cs, os_ = sections(cand), sections(orig)
    by_hash = {}
    for start, length, name in candidate_functions(a.candidate, OBJDUMP, '.'):
        raw = body(cand, cs, start, length)
        normal, operands = normalize(raw, start, cs)
        by_hash.setdefault((length, hashlib.sha256(normal).hexdigest()), []).append(
            {'start': start, 'symbol': name, 'raw_sha256': hashlib.sha256(raw).hexdigest(), 'operands': operands})
    rows = []
    for w in base['windows']:
        start, end = w['start'], w['end']
        raw = body(orig, os_, start, end - start)
        normal, operands = normalize(raw, start, os_)
        rh = hashlib.sha256(raw).hexdigest()
        m = by_hash.get((end - start, hashlib.sha256(normal).hexdigest()), [])
        rows.append({'start': start, 'end': end, 'bytes': end - start, 'raw_sha256': rh,
                     'raw_match': any(x['raw_sha256'] == rh for x in m), 'normalized_matches': m,
                     'original_operands': operands})
    counts = {'total': len(rows), 'raw': sum(r['raw_match'] for r in rows),
              'normalized': sum(bool(r['normalized_matches']) for r in rows),
              'unmatched': sum(not r['normalized_matches'] for r in rows),
              'matched_text_bytes': sum(r['bytes'] for r in rows if r['normalized_matches'])}
    bn = {w['start'] for w in base['windows'] if w['normalized_matches']}
    br = {w['start'] for w in base['windows'] if w['raw_match']}
    nn = {r['start'] for r in rows if r['normalized_matches']}
    nr = {r['start'] for r in rows if r['raw_match']}
    delta = {'normalized_gains': sorted(nn - bn), 'normalized_losses': sorted(bn - nn),
             'raw_gains': sorted(nr - br), 'raw_losses': sorted(br - nr)}
    in_range = lambda xs: [hex(x) for x in xs if a.lo <= x <= a.hi]
    result = {'original_sha256': hashlib.sha256(orig).hexdigest(),
              'candidate_sha256': hashlib.sha256(cand).hexdigest(),
              'baseline_candidate_sha256': base.get('candidate_sha256'),
              'scope': 'Complete function windows; only internal direct-call operands and pointers into known ELF sections are masked.',
              'windows': rows, 'counts': counts, 'delta_vs_baseline': delta}
    a.output.parent.mkdir(parents=True, exist_ok=True)
    a.output.write_text(json.dumps(result, indent=1) + '\n')
    summary = {'counts': counts,
               'normalized_gains': [hex(x) for x in delta['normalized_gains']],
               'normalized_losses': [hex(x) for x in delta['normalized_losses']],
               'raw_gains': [hex(x) for x in delta['raw_gains']],
               'raw_losses': [hex(x) for x in delta['raw_losses']],
               'gains_in_range': in_range(delta['normalized_gains'])}
    print(json.dumps(summary, indent=1))


if __name__ == '__main__':
    main()
