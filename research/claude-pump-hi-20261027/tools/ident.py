#!/usr/bin/env python3
"""Identify original windows: callers, callees (with match status) and referenced strings."""
import argparse, gzip, json, re, sys
from pathlib import Path

HERE = Path(__file__).resolve()
ROOT = next(p for p in HERE.parents if (p / 'evidence/original/pump/deployed.so').is_file())


def read(p):
    b = Path(p).read_bytes()
    return json.loads(gzip.decompress(b) if b[:2] == b'\x1f\x8b' else b)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--packet', type=Path, required=True)
    ap.add_argument('--inventory', type=Path)
    ap.add_argument('windows', nargs='+')
    a = ap.parse_args()
    sys.path.insert(0, str(a.packet / 'inputs/scripts'))
    from pump_quote_control_function_match import sections
    iv = read(a.inventory or a.packet / 'inventory.json.gz')
    wins = {w['start']: w for w in iv['windows']}
    ob = (ROOT / 'evidence/original/pump/deployed.so').read_bytes()
    secs = sections(ob)
    callers = {}
    for w in iv['windows']:
        for op in w['original_operands']:
            if op['kind'] == 'direct-call':
                callers.setdefault(op['target'], []).append((w['start'], op['offset']))

    def nm(a_):
        w = wins.get(a_)
        if not w:
            return '?'
        m = w['normalized_matches']
        return (re.sub(r'17h[0-9a-f]{16}E$', '', m[0]['symbol'])[-80:] + (' [raw]' if w['raw_match'] else '')) if m else f'UNMATCHED({w["bytes"]})'

    def string_at(v):
        for name, s in secs.items():
            if s['addr'] and s['addr'] <= v < s['addr'] + s['size'] and name == '.rodata':
                d = ob[s['offset'] + v - s['addr']: s['offset'] + v - s['addr'] + 48]
                return ''.join(chr(c) if 32 <= c < 127 else '.' for c in d)
        return None

    for x in a.windows:
        s = int(x, 16)
        w = wins[s]
        print(f'=== {s:#x} {w["bytes"]}B {nm(s)}')
        for c, off in callers.get(s, []):
            print(f'   caller {c:#x}+{off:#x} {nm(c)}')
        for op in w['original_operands']:
            if op['kind'] == 'direct-call':
                print(f'   +{op["offset"]:#06x} call {op["target"]:#x} {nm(op["target"])}')
            elif '.rodata' in op.get('sections', []):
                st = string_at(op['value'])
                print(f'   +{op["offset"]:#06x} rodata {st!r}')


if __name__ == '__main__':
    main()
