#!/usr/bin/env python3
"""Report source-coordinate-only near misses (error!/Source file+line immediates).

For each unmatched original window in a range whose nearest equal-length candidate body
differs only in `stw [r10+x], line` / `stdw [r10+x-8], filename_len` store immediates,
print the original and candidate (file, line) pairs. The file is read from the
.rodata pointer loaded just before the stores (filename_len bytes). Triage only:
coordinate-only differences are not closed by this lane (no line padding).
"""
import argparse, gzip, json, re, struct, sys
from pathlib import Path

HERE = Path(__file__).resolve()
ROOT = next(p for p in HERE.parents if (p / 'evidence/original/pump/deployed.so').is_file())
OBJDUMP = str(Path.home() / '.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')


def read(p):
    b = Path(p).read_bytes()
    return json.loads(gzip.decompress(b) if b[:2] == b'\x1f\x8b' else b)


def sources(raw, secs, blob):
    """Yield (offset, file, line) for Source{filename,line} stores in a body."""
    out = []
    i = 0
    last_ptr = None
    while i < len(raw):
        op, regs, off, imm = struct.unpack_from('<BBhi', raw, i)
        if op == 0x18:
            v = (imm & 0xffffffff) | struct.unpack_from('<I', raw, i + 12)[0] << 32
            ro = secs['.rodata']
            last_ptr = v if ro['addr'] <= v < ro['addr'] + ro['size'] else last_ptr
            i += 16
            continue
        if op == 0x62 and i + 8 < len(raw):  # stw [r10+off], imm  (line)
            op2, regs2, off2, imm2 = struct.unpack_from('<BBhi', raw, i + 8)
            if op2 == 0x7a and off2 == off - 8 and 8 <= imm2 <= 80 and last_ptr:  # stdw len
                ro = secs['.rodata']
                s = blob[ro['offset'] + last_ptr - ro['addr']: ro['offset'] + last_ptr - ro['addr'] + imm2]
                name = s.decode('utf-8', 'replace')
                if name.endswith('.rs'):
                    out.append((i, name, imm))
        i += 8
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--packet', type=Path, required=True)
    ap.add_argument('--candidate', type=Path, required=True)
    ap.add_argument('--inventory', type=Path)
    ap.add_argument('--lo', type=lambda s: int(s, 0), default=0x101170)
    ap.add_argument('--hi', type=lambda s: int(s, 0), default=0x1ab9b8)
    ap.add_argument('--output', type=Path)
    a = ap.parse_args()
    sys.path.insert(0, str(a.packet / 'inputs/scripts'))
    from pump_compare_function_bytes import normalize, body
    from pump_quote_control_function_match import sections, candidate_functions
    iv = read(a.inventory or a.packet / 'inventory.json.gz')
    ob = (ROOT / 'evidence/original/pump/deployed.so').read_bytes()
    cb = a.candidate.read_bytes()
    osec, csec = sections(ob), sections(cb)
    by_len = {}
    for s, n, name in candidate_functions(a.candidate, OBJDUMP, '.'):
        raw = body(cb, csec, s, n)
        by_len.setdefault(n, []).append((s, name, normalize(raw, s, csec)[0], raw))
    rows = []
    for w in iv['windows']:
        s, n = w['start'], w['bytes']
        if w['normalized_matches'] or not (a.lo <= s <= a.hi):
            continue
        raw = body(ob, osec, s, n)
        on = normalize(raw, s, osec)[0]
        best = None
        for cs_, name, cn, craw in by_len.get(n, []):
            d = [i for i in range(0, n, 8) if on[i:i + 8] != cn[i:i + 8]]
            if not d or len(d) > 4:
                continue
            if not all(on[i] in (0x62, 0x7a) and on[i:i + 4] == cn[i:i + 4] for i in d):
                continue
            if best is None or len(d) < len(best[0]):
                best = (d, cs_, name, craw)
        if not best:
            continue
        d, cs_, name, craw = best
        o = sources(raw, osec, ob)
        c = sources(craw, csec, cb)
        rows.append({'original_start': hex(s), 'bytes': n, 'candidate_start': hex(cs_),
                     'candidate_symbol': re.sub(r'17h[0-9a-f]{16}E$', '', name),
                     'different_slots': len(d), 'original_sources': [(f, l) for _, f, l in o],
                     'candidate_sources': [(f, l) for _, f, l in c]})
    for r in rows:
        print(f"{r['original_start']:>9} {r['bytes']:6d} slots={r['different_slots']} orig={r['original_sources']} cand={r['candidate_sources']} {r['candidate_symbol'][-60:]}")
    if a.output:
        a.output.write_text(json.dumps(rows, indent=1) + '\n')


if __name__ == '__main__':
    main()
