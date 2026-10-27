#!/usr/bin/env python3
"""Aligned SBF disassembly diff of an original window against a candidate body.

  sbfdiff.py --packet P --candidate unstripped.so --orig 0x101170 [--cand 0x... | --symbol REGEX]
             [--context 3] [--full]

Call targets are shown as symbol names (candidate) or original addresses with the
candidate counterpart symbol when known; lddw section pointers are shown with their
target bytes when they point at short strings.
"""
import argparse, difflib, gzip, json, re, struct, subprocess, sys
from pathlib import Path

HERE = Path(__file__).resolve()
ROOT = next(p for p in HERE.parents if (p / 'evidence/original/pump/deployed.so').is_file())
OBJDUMP = str(Path.home() / '.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')

ALU = {0x0: 'add', 0x1: 'sub', 0x2: 'mul', 0x3: 'div', 0x4: 'or', 0x5: 'and', 0x6: 'lsh', 0x7: 'rsh',
       0x8: 'neg', 0x9: 'mod', 0xa: 'xor', 0xb: 'mov', 0xc: 'arsh', 0xd: 'end'}
JMP = {0x0: 'ja', 0x1: 'jeq', 0x2: 'jgt', 0x3: 'jge', 0x4: 'jset', 0x5: 'jne', 0x6: 'jsgt', 0x7: 'jsge',
       0x8: 'call', 0x9: 'exit', 0xa: 'jlt', 0xb: 'jle', 0xc: 'jslt', 0xd: 'jsle'}
SZ = {0x00: 'w', 0x08: 'h', 0x10: 'b', 0x18: 'dw'}


def read(p):
    b = Path(p).read_bytes()
    return json.loads(gzip.decompress(b) if b[:2] == b'\x1f\x8b' else b)


def symtab(path):
    out = subprocess.check_output([OBJDUMP, '-t', str(path)], text=True)
    funcs = {}
    for line in out.splitlines():
        m = re.match(r'^([0-9a-f]+) .* F \.text\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
        if m and int(m.group(2), 16):
            funcs.setdefault(int(m.group(1), 16), (int(m.group(2), 16), m.group(3)))
    return funcs


def short(name):
    try:
        d = subprocess.check_output(['c++filt', '-n', name], text=True).strip()
    except Exception:
        d = name
    d = re.sub(r'::h[0-9a-f]{16}$', '', d)
    return d[-110:]


def disasm(code, base, secs, blob, callname):
    """Return list of (offset, text, masked_key)."""
    out = []
    i = 0
    while i < len(code):
        op, regs, off, imm = struct.unpack_from('<BBhi', code, i)
        dst, src = regs & 0xf, regs >> 4
        cls = op & 7
        if op == 0x18:
            hi = struct.unpack_from('<I', code, i + 12)[0]
            val = (imm & 0xffffffff) | hi << 32
            tgt = [n for n, s in secs.items() if s['addr'] > 0 and s['addr'] <= val < s['addr'] + s['size']]
            if tgt:
                s = secs[tgt[0]]
                peek = blob[s['offset'] + val - s['addr']: s['offset'] + val - s['addr'] + 24]
                txt = ''.join(chr(c) if 32 <= c < 127 else '.' for c in peek)
                t = f'lddw r{dst}, <{tgt[0]}+{val - s["addr"]:#x}> "{txt}"'
                key = f'lddw r{dst}, <{tgt[0]}>'
            else:
                t = key = f'lddw r{dst}, {val:#x}'
            out.append((i, t, key))
            i += 16
            continue
        if cls in (4, 7):  # alu32 / alu64
            w = '' if cls == 7 else '32'
            name = ALU.get(op >> 4, f'alu{op >> 4:x}') + w
            if op >> 4 == 0xd:
                t = f'{"be" if op & 8 else "le"}{imm} r{dst}'
            elif op & 8:
                t = f'{name} r{dst}, r{src}'
            else:
                t = f'{name} r{dst}, {imm}'
        elif cls == 5 or cls == 6:  # jmp / jmp32
            name = JMP.get(op >> 4, f'j{op >> 4:x}') + ('' if cls == 5 else '32')
            if op == 0x85:
                if src == 1 and imm != -1:
                    tgt = base + i + 8 + imm * 8
                    t = f'call {callname(tgt)}'
                    key = 'call <rel>'
                    out.append((i, t, key))
                    i += 8
                    continue
                t = f'syscall {imm:#x}' if src == 0 else f'callx {imm}'
            elif op == 0x8d:
                t = f'callx r{imm if imm else src}'
            elif op == 0x95:
                t = 'exit'
            elif op == 0x05:
                t = f'ja {off:+d}'
            elif op & 8:
                t = f'{name} r{dst}, r{src}, {off:+d}'
            else:
                t = f'{name} r{dst}, {imm}, {off:+d}'
        elif cls == 1:  # ldx
            t = f'ldx{SZ[op & 0x18]} r{dst}, [r{src}{off:+d}]'
        elif cls == 3:  # stx
            t = f'stx{SZ[op & 0x18]} [r{dst}{off:+d}], r{src}'
        elif cls == 2:  # st
            t = f'st{SZ[op & 0x18]} [r{dst}{off:+d}], {imm}'
        else:
            t = f'op{op:#x} {regs:#x} {off} {imm}'
        out.append((i, t, t))
        i += 8
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--packet', type=Path, required=True)
    ap.add_argument('--candidate', type=Path, required=True)
    ap.add_argument('--orig', type=lambda s: int(s, 0), required=True)
    ap.add_argument('--cand', type=lambda s: int(s, 0))
    ap.add_argument('--symbol')
    ap.add_argument('--context', type=int, default=3)
    ap.add_argument('--full', action='store_true')
    ap.add_argument('--inventory', type=Path)
    a = ap.parse_args()
    sys.path.insert(0, str(a.packet / 'inputs/scripts'))
    from pump_quote_control_function_match import sections
    iv = read(a.inventory or a.packet / 'inventory.json.gz')
    wins = {w['start']: w for w in iv['windows']}
    ob = (ROOT / 'evidence/original/pump/deployed.so').read_bytes()
    cb = a.candidate.read_bytes()
    osec, csec = sections(ob), sections(cb)
    funcs = symtab(a.candidate)
    # original call target -> matched candidate symbol name
    o2name = {}
    for s, w in wins.items():
        if w['normalized_matches']:
            o2name[s] = short(w['normalized_matches'][0]['symbol'])
    w = wins[a.orig]
    n = w['bytes']
    ot = osec['.text']
    ocode = ob[ot['offset'] + a.orig - ot['addr']: ot['offset'] + a.orig - ot['addr'] + n]
    if a.cand is None:
        pat = re.compile(a.symbol)
        hits = [(s, v) for s, v in funcs.items() if pat.search(v[1])]
        if not hits:
            sys.exit('no symbol match')
        hits.sort(key=lambda kv: abs(kv[1][0] - n))
        a.cand = hits[0][0]
    clen, cname = funcs[a.cand]
    ct = csec['.text']
    ccode = cb[ct['offset'] + a.cand - ct['addr']: ct['offset'] + a.cand - ct['addr'] + clen]

    def oname(t):
        st = 'MATCHED ' + o2name[t] if t in o2name else ('unmatched' if t in wins else '?')
        return f'{t:#x} [{st}]'

    def cn(t):
        return short(funcs[t][1]) if t in funcs else f'{t:#x}'

    od = disasm(ocode, a.orig, osec, ob, oname)
    cd = disasm(ccode, a.cand, csec, cb, cn)
    print(f'original {a.orig:#x} ({n} bytes)  vs  candidate {a.cand:#x} ({clen} bytes) {short(cname)}')
    sm = difflib.SequenceMatcher(None, [x[2] for x in od], [x[2] for x in cd], autojunk=False)
    print(f'ratio {sm.ratio():.4f}')
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            if a.full:
                for k in range(i2 - i1):
                    print(f'  {od[i1 + k][0]:5x} {od[i1 + k][1]:<60} | {cd[j1 + k][1]}')
                continue
            ctx = a.context
            if i2 - i1 <= 2 * ctx:
                for k in range(i2 - i1):
                    print(f'  {od[i1 + k][0]:5x} {od[i1 + k][1]:<60} | {cd[j1 + k][1]}')
            else:
                for k in range(ctx):
                    print(f'  {od[i1 + k][0]:5x} {od[i1 + k][1]:<60} | {cd[j1 + k][1]}')
                print(f'  ... {i2 - i1 - 2 * ctx} equal ...')
                for k in range(i2 - i1 - ctx, i2 - i1):
                    print(f'  {od[i1 + k][0]:5x} {od[i1 + k][1]:<60} | {cd[j1 + k][1]}')
        else:
            L = max(i2 - i1, j2 - j1)
            for k in range(L):
                o = od[i1 + k] if i1 + k < i2 else None
                c = cd[j1 + k] if j1 + k < j2 else None
                ot_ = f'{o[0]:5x} {o[1]}' if o else ''
                ct_ = c[1] if c else ''
                print(f'{tag[0]} {ot_:<66} | {ct_}')


if __name__ == '__main__':
    main()
