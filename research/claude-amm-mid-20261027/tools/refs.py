#!/usr/bin/env python3
"""Show lddw data references (strings / Location records) and stw/stdw immediates in a window."""
import argparse, struct, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from sbf import load, insns, windows


def addr_to_off(e, addr):
    for name, s in e.secs.items():
        # (name, type, flags, addr, offset, size, link, info, align, entsize)
        sa, so, sz = s[3], s[4], s[5]
        if sa <= addr < sa + sz:
            return so + (addr - sa), name
    return None, None


def describe(e, addr, n=None):
    off, sec = addr_to_off(e, addr)
    if off is None:
        return 'unmapped %x' % addr
    raw = e.b[off:off + 96]
    txt = raw.split(b'\0')[0]
    printable = sum(32 <= ch < 127 for ch in raw[:40])
    if printable > 30:
        return '%s+%x str %r' % (sec, addr, raw[:n or 80].decode('latin1'))
    q = struct.unpack_from('<QQII', e.b, off) if off + 24 <= len(e.b) else None
    return '%s+%x bytes %s q=%s' % (sec, addr, raw[:32].hex(), q)


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--elf', required=True)
    p.add_argument('--start', type=lambda x: int(x, 0), required=True)
    p.add_argument('--size', type=lambda x: int(x, 0))
    a = p.parse_args()
    from sbf import elf
    e = elf.Elf(Path(a.elf))
    if a.size:
        en = a.start + a.size
    else:
        en = dict(windows(e))[a.start]
    for at, op, dst, src, off, imm, w in insns(e, a.start, en):
        if op == 0x18:
            print('%5x lddw r%d %s' % (at - a.start, dst, describe(e, imm)))
        elif op in (0x62, 0x7a, 0x6a, 0x72) and dst == 10:
            print('%5x st%s [r10%+d] = %d' % (at - a.start, {0x62: 'w', 0x7a: 'dw', 0x6a: 'h', 0x72: 'b'}[op], off, imm))
        elif op in (0xb7, 0xb4) and abs(imm) > 255:
            print('%5x mov r%d = %d (0x%x)' % (at - a.start, dst, imm, imm & 0xffffffff))


if __name__ == '__main__':
    main()
