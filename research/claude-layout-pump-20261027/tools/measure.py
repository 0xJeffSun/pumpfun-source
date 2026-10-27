#!/usr/bin/env python3
"""Recompute the main-Pump window inventory for one unstripped candidate.

Uses the repository's own measurement primitives unchanged
(scripts/pump_compare_function_bytes.normalize/body and
scripts/pump_quote_control_function_match.sections, with function symbols
read from .symtab by elf_functions, equivalent to its candidate_functions):
for every original window, a candidate function symbol of the same size whose
normalized body is equal is a normalized match, and a window is raw-matched
when any such candidate body is byte-identical. Window boundaries come from a
frontier packet inventory (they are fixed properties of the original).
`--check-against` asserts the result equals that packet's recorded inventory.
"""
import argparse
import gzip
import hashlib
import json
import struct
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = next(p for p in HERE.parents if (p / 'evidence/original/pump/deployed.so').is_file())
sys.path.insert(0, str(ROOT / 'scripts'))
from pump_compare_function_bytes import normalize, body  # noqa: E402
from pump_quote_control_function_match import sections  # noqa: E402

sha = lambda b: hashlib.sha256(b).hexdigest()


def elf_functions(path):
    """Function symbols of an unstripped ELF, read directly from .symtab.

    Pure-Python equivalent of the repository's
    `pump_quote_control_function_match.candidate_functions(path, llvm-objdump, '.')`:
    STT_FUNC symbols defined in `.text` with nonzero size and default or hidden
    visibility, as (address, size, name) in symbol-table order. No external tool runs.
    """
    b = Path(path).read_bytes()
    shoff, = struct.unpack_from('<Q', b, 0x28)
    shentsize, shnum, shstrndx = struct.unpack_from('<HHH', b, 0x3a)
    hdrs = [struct.unpack_from('<IIQQQQIIQQ', b, shoff + i * shentsize) for i in range(shnum)]
    cstr = lambda base, off: b[base + off:b.index(b'\0', base + off)].decode()
    names = [cstr(hdrs[shstrndx][4], h[0]) for h in hdrs]
    text = names.index('.text')
    symtab = next(h for h in hdrs if h[1] == 2)  # SHT_SYMTAB
    strbase, entsize = hdrs[symtab[6]][4], symtab[9]
    funcs = []
    for off in range(symtab[4] + entsize, symtab[4] + symtab[5], entsize):  # entry 0 is the null symbol
        st_name, st_info, st_other, st_shndx, value, size = struct.unpack_from('<IBBHQQ', b, off)
        if st_info & 0xf == 2 and st_shndx == text and size and st_other & 3 in (0, 2):
            name = cstr(strbase, st_name)
            if name:
                funcs.append((value, size, name))
    return funcs


def read(p):
    b = Path(p).read_bytes()
    return json.loads(gzip.decompress(b) if b[:2] == b'\x1f\x8b' else b)


def inventory(candidate_path, windows):
    ob = (ROOT / 'evidence/original/pump/deployed.so').read_bytes()
    cb = Path(candidate_path).read_bytes()
    os_, cs = sections(ob), sections(cb)
    by_size, cache = {}, {}
    for addr, size, name in elf_functions(candidate_path):
        if (addr, size) not in cache:  # alias symbols share one body; each symbol is listed (objdump order)
            raw = body(cb, cs, addr, size)
            cache[addr, size] = (raw, *normalize(raw, addr, cs))
        by_size.setdefault(size, []).append((addr, name, *cache[addr, size]))
    rows = []
    for w in windows:
        a, n = w['start'], w['bytes']
        o = body(ob, os_, a, n)
        on, oo = normalize(o, a, os_)
        matches, raw_match = [], False
        for addr, name, raw, norm, ops in by_size.get(n, []):
            if norm == on:
                matches.append({'start': addr, 'symbol': name, 'raw_sha256': sha(raw), 'operands': ops})
                raw_match |= raw == o
        rows.append({'start': a, 'end': a + n, 'bytes': n, 'raw_sha256': sha(o), 'raw_match': raw_match,
                     'normalized_matches': matches, 'original_operands': oo})
    counts = {'total': len(rows), 'raw': sum(r['raw_match'] for r in rows),
              'normalized': sum(bool(r['normalized_matches']) for r in rows),
              'unmatched': sum(not r['normalized_matches'] for r in rows),
              'matched_text_bytes': sum(r['bytes'] for r in rows if r['normalized_matches']),
              'raw_text_bytes': sum(r['bytes'] for r in rows if r['raw_match'])}
    return {'original_sha256': sha(ob), 'candidate_sha256': sha(cb), 'scope': __doc__.split('\n')[0],
            'windows': rows, 'counts': counts}


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--candidate', type=Path, required=True, help='unstripped candidate ELF')
    ap.add_argument('--windows-from', type=Path, required=True, help='frontier inventory.json.gz')
    ap.add_argument('--output', type=Path)
    ap.add_argument('--check-against', type=Path, help='assert equality with a recorded inventory')
    a = ap.parse_args()
    ref = read(a.windows_from)
    windows = [{'start': w['start'], 'bytes': w['bytes']} for w in ref['windows']]
    inv = inventory(a.candidate, windows)
    for w, r in zip(ref['windows'], inv['windows']):
        assert w['raw_sha256'] == r['raw_sha256'], w['start']
    if a.check_against:
        chk = read(a.check_against)
        assert chk['candidate_sha256'] == inv['candidate_sha256'], 'check inventory is for another candidate'
        for x, y in zip(chk['windows'], inv['windows']):
            assert x['raw_match'] == y['raw_match'], (x['start'], 'raw')
            assert [(m['start'], m['symbol'], m['raw_sha256']) for m in x['normalized_matches']] == \
                   [(m['start'], m['symbol'], m['raw_sha256']) for m in y['normalized_matches']], (x['start'], 'norm')
            assert x['original_operands'] == y['original_operands'], (x['start'], 'ops')
        assert {k: chk['counts'][k] for k in ['total', 'raw', 'normalized', 'unmatched']} == \
               {k: inv['counts'][k] for k in ['total', 'raw', 'normalized', 'unmatched']}
        inv['checked_against'] = {'path': str(a.check_against), 'sha256': sha(a.check_against.read_bytes()), 'equal': True}
    if a.output:
        a.output.parent.mkdir(parents=True, exist_ok=True)
        data = json.dumps(inv, indent=1).encode() + b'\n'
        a.output.write_bytes(gzip.compress(data, mtime=0) if a.output.suffix == '.gz' else data)
    print(json.dumps(inv['counts'] | ({'checked_against_recorded_inventory': True} if a.check_against else {})))


if __name__ == '__main__':
    main()
