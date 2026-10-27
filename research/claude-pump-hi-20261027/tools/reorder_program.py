#!/usr/bin/env python3
"""Reorder the #[program] handlers of main-Pump lib.rs into the original dispatch order.

Evidence: Anchor's generated `entry`/dispatch compares the 8-byte instruction
discriminator (sha256("global:<name>")[..8]) against each handler in the order the
handlers are declared in the #[program] module. The original dispatcher (original
window 0x11b758, 8,696 bytes) checks the discriminators in a specific order; this tool
reads that order from evidence/original/pump/deployed.so and permutes the existing
handler items of a lib.rs into it. Handler text is not modified; only item order
changes (blank separator lines inside the module are dropped).

  reorder_program.py --lib programs/pump/src/lib.rs [--check]
"""
import argparse, hashlib, re, struct, sys
from pathlib import Path

HERE = Path(__file__).resolve()
ROOT = next(p for p in HERE.parents if (p / 'evidence/original/pump/deployed.so').is_file())
DISPATCH = 0x11b758
DISPATCH_BYTES = 8696


def text_section(blob):
    shoff, = struct.unpack_from('<Q', blob, 0x28)
    shentsize, shnum, shstrndx = struct.unpack_from('<HHH', blob, 0x3a)
    hdrs = [struct.unpack_from('<IIQQQQIIQQ', blob, shoff + i * shentsize) for i in range(shnum)]
    strtab = hdrs[shstrndx]
    for h in hdrs:
        name = blob[strtab[4] + h[0]:blob.index(b'\0', strtab[4] + h[0])].decode()
        if name == '.text':
            return h[3], h[4]
    raise SystemExit('no .text')


def original_order():
    ob = (ROOT / 'evidence/original/pump/deployed.so').read_bytes()
    addr, off = text_section(ob)
    code = ob[off + DISPATCH - addr: off + DISPATCH - addr + DISPATCH_BYTES]
    out, i = [], 0
    while i < len(code):
        if code[i] == 0x18:
            out.append(struct.unpack_from('<I', code, i + 4)[0] | struct.unpack_from('<I', code, i + 12)[0] << 32)
            i += 16
        else:
            i += 8
    return out


def disc(name):
    return struct.unpack('<Q', hashlib.sha256(('global:' + name).encode()).digest()[:8])[0]


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--lib', type=Path, required=True)
    ap.add_argument('--check', action='store_true', help='only report whether the order already matches')
    a = ap.parse_args()
    lines = a.lib.read_text().split('\n')
    start = next(i for i, l in enumerate(lines) if l.strip() == '#[program]')
    assert lines[start + 1].startswith('pub mod ') and lines[start + 1].rstrip().endswith('{'), lines[start + 1]
    head = start + 2
    while lines[head].strip().startswith('use '):
        head += 1
    end = next(i for i in range(head, len(lines)) if lines[i] == '}')
    items, cur = [], None
    for l in lines[head:end]:
        m = re.match(r'^    pub fn (\w+)', l)
        if m:
            cur = [m.group(1), [l]]
            items.append(cur)
        elif l.strip() == '':
            continue
        else:
            assert cur is not None, l
            cur[1].append(l)
    by_disc = {disc(n): (n, body) for n, body in items}
    assert len(by_disc) == len(items), 'duplicate handler names'
    order = [d for d in original_order() if d in by_disc]
    missing = [n for n, _ in items if disc(n) not in set(order)]
    current = [n for n, _ in items]
    wanted = [by_disc[d][0] for d in order] + missing
    print(f'{len(items)} handlers; {len(order)} located in the original dispatcher; {len(missing)} not located: {missing}')
    if current == wanted:
        print('already in original order')
        return
    if a.check:
        print('order differs')
        sys.exit(1)
    new = lines[:head] + [x for n in wanted for x in by_disc[disc(n)][1]] + lines[end:]
    a.lib.write_text('\n'.join(new))
    print('reordered:', ' '.join(wanted))


if __name__ == '__main__':
    main()
