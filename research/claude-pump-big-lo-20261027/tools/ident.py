#!/usr/bin/env python3
"""Identify an original window: direct-call targets (named via matched g04 windows), rodata strings, error codes.

  ident.py <orig_start> [--cand unstripped.so]
"""
import argparse, json, re, struct, sys, pickle
from pathlib import Path
H = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
sys.path.insert(0, str(H))
from score import sections, body, original_windows, score, BASE  # noqa
from win import demangle  # noqa

ORIG = (BASE / 'original.so').read_bytes(); OS = sections(ORIG)
WINS = {w['start']: w for w in original_windows()}
STARTS = sorted(WINS)


def names_for(cand):
    cache = Path(str(cand) + '.names.pkl')
    if cache.exists():
        return pickle.loads(cache.read_bytes())
    cur = score(cand)
    names = {s: [demangle(x) for x in v['symbols']] for s, v in cur.items() if v['normalized']}
    cache.write_bytes(pickle.dumps(names))
    return names


def relocs():
    rel = OS['.rel.dyn']; dsym = OS['.dynsym']; dstr = OS['.dynstr']
    out = {}
    for k in range(rel['size'] // 16):
        off, info = struct.unpack_from('<QQ', ORIG, rel['offset'] + k * 16)
        si = info >> 32
        if si:
            no = struct.unpack_from('<I', ORIG, dsym['offset'] + si * 24)[0]
            nm = ORIG[dstr['offset'] + no:ORIG.index(b'\0', dstr['offset'] + no)].decode()
            out[off] = nm
    return out


RELOCS = relocs()


def rodata_str(v, maxlen=80):
    for nm, s in OS.items():
        if s['addr'] and s['addr'] <= v < s['addr'] + s['size'] and nm.startswith('.rodata'):
            o = v - s['addr'] + s['offset']
            b = ORIG[o:o + maxlen]
            pr = bytes(c if 32 <= c < 127 else 46 for c in b)
            return nm, pr.decode()
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('start')
    ap.add_argument('--cand', type=Path, default=Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/g04/unstripped.so'))
    a = ap.parse_args()
    st = int(a.start, 0); w = WINS[st]; raw = w['raw']
    names = names_for(a.cand)
    t = OS['.text']
    calls = []; strs = []; imms = []
    i = 0
    while i < len(raw):
        op = raw[i]
        if op == 0x18:
            v = struct.unpack_from('<I', raw, i + 4)[0] | struct.unpack_from('<I', raw, i + 12)[0] << 32
            r = rodata_str(v)
            if r: strs.append((hex(st + i), hex(v), r[1][:60]))
            i += 16; continue
        _, regs, off, imm = struct.unpack_from('<BBhi', raw, i)
        if op == 0x85 and imm == -1:
            calls.append((hex(st + i), ('reloc', RELOCS.get(st + i, '?'))))
        elif op == 0x85 and regs >> 4 == 1:
            tgt = st + i + 8 + imm * 8
            calls.append((hex(st + i), tgt))
        elif op == 0x85:
            calls.append((hex(st + i), ('syscall', hex(imm & 0xffffffff))))
        if op in (0x62, 0x7a, 0xb7, 0xb4) and imm > 0x1000 and imm < 0x2000:
            imms.append((hex(st + i), imm))
        i += 8
    print(f"window {st:#x} {w['bytes']} B")
    seen = {}
    for at, tgt in calls:
        if isinstance(tgt, tuple):
            key = tgt
            label = f"{tgt[0]} {tgt[1]}"
        else:
            key = tgt
            nm = names.get(tgt)
            label = f"{tgt:#x} " + (nm[0][:120] if nm else ('UNMATCHED ' + str(WINS[tgt]['bytes']) + 'B' if tgt in WINS else '?'))
        seen.setdefault(label, []).append(at)
    for label, ats in seen.items():
        print(f"  call x{len(ats):2d} {label}")
    print('  strings:')
    for s in strs[:60]:
        print('   ', s)
    print('  error-ish imms (0x1000..0x2000):', sorted(set(x[1] for x in imms)))


if __name__ == '__main__':
    main()
