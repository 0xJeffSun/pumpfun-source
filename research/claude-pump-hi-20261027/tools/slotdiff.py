#!/usr/bin/env python3
"""For unmatched original windows, list slot-level differences against equal-size candidates.

Prints, per window, the nearest equal-length candidate bodies (by differing normalized
slots) and decodes each differing slot on both sides. Triage only.
"""
import argparse, gzip, json, re, struct, sys
from pathlib import Path

HERE = Path(__file__).resolve()
ROOT = next(p for p in HERE.parents if (p / 'evidence/original/pump/deployed.so').is_file())
OBJDUMP = str(Path.home() / '.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
sys.path.insert(0, str(HERE.parent))
from sbfdiff import disasm  # noqa: E402


def read(p):
    b = Path(p).read_bytes()
    return json.loads(gzip.decompress(b) if b[:2] == b'\x1f\x8b' else b)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--packet', type=Path, required=True)
    ap.add_argument('--candidate', type=Path, required=True)
    ap.add_argument('--inventory', type=Path, help='inventory for the candidate (default: packet inventory)')
    ap.add_argument('--lo', type=lambda s: int(s, 0), default=0x101170)
    ap.add_argument('--hi', type=lambda s: int(s, 0), default=0x1ab9b8)
    ap.add_argument('--max-slots', type=int, default=12)
    ap.add_argument('--top', type=int, default=2)
    a = ap.parse_args()
    sys.path.insert(0, str(a.packet / 'inputs/scripts'))
    from pump_compare_function_bytes import normalize, body
    from pump_quote_control_function_match import sections, candidate_functions
    iv = read(a.inventory or a.packet / 'inventory.json.gz')
    ob = (ROOT / 'evidence/original/pump/deployed.so').read_bytes()
    cb = a.candidate.read_bytes()
    osec, csec = sections(ob), sections(cb)
    by_len = {}
    for start, length, name in candidate_functions(a.candidate, OBJDUMP, '.'):
        raw = body(cb, csec, start, length)
        by_len.setdefault(length, []).append((start, name, normalize(raw, start, csec)[0], raw))
    for w in iv['windows']:
        s, n = w['start'], w['bytes']
        if w['normalized_matches'] or not (a.lo <= s <= a.hi):
            continue
        raw = body(ob, osec, s, n)
        on = normalize(raw, s, osec)[0]
        ranks = []
        for cs_, name, cn, craw in by_len.get(n, []):
            d = [i for i in range(0, n, 8) if on[i:i + 8] != cn[i:i + 8]]
            ranks.append((len(d), cs_, name, d, craw))
        ranks.sort(key=lambda r: r[0])
        if not ranks or ranks[0][0] > a.max_slots:
            continue
        print(f'== {s:#x} {n}B: best {ranks[0][0]} slots')
        od = {o: t for o, t, k in disasm(raw, s, osec, ob, lambda t: f'{t:#x}')}
        for k, cs_, name, d, craw in ranks[:a.top]:
            if k > a.max_slots:
                break
            sym = re.sub(r'17h[0-9a-f]{16}E$', '', name)[-100:]
            print(f'   cand {cs_:#x} {k} slots {sym}')
            cd = {o: t for o, t, kk in disasm(craw, cs_, csec, cb, lambda t: f'{t:#x}')}
            for i in d[:12]:
                print(f'      +{i:#06x}  orig: {od.get(i, "?"):<50} cand: {cd.get(i, "?")}')


if __name__ == '__main__':
    main()
