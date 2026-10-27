#!/usr/bin/env python3
"""Instruction diff between an original window and a candidate symbol (by name substring or start).
Uses the repo normalizer's masking (call/lddw relocated operands) and shows each differing insn."""
import argparse, difflib, json, struct, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from sbf import load, insns, windows

OPN = {0x07: 'add64 i', 0x0f: 'add64 r', 0x17: 'sub64 i', 0x1f: 'sub64 r', 0x27: 'mul64 i', 0x2f: 'mul64 r', 0x37: 'div64 i', 0x3f: 'div64 r',
       0x47: 'or64 i', 0x4f: 'or64 r', 0x57: 'and64 i', 0x5f: 'and64 r', 0x67: 'lsh64 i', 0x6f: 'lsh64 r', 0x77: 'rsh64 i', 0x7f: 'rsh64 r',
       0x87: 'neg64', 0x97: 'mod64 i', 0x9f: 'mod64 r', 0xa7: 'xor64 i', 0xaf: 'xor64 r', 0xb7: 'mov64 i', 0xbf: 'mov64 r', 0xc7: 'arsh64 i', 0xcf: 'arsh64 r',
       0x04: 'add32 i', 0x0c: 'add32 r', 0x14: 'sub32 i', 0x1c: 'sub32 r', 0x24: 'mul32 i', 0x2c: 'mul32 r', 0x34: 'div32 i', 0x3c: 'div32 r', 0x44: 'or32 i', 0x4c: 'or32 r',
       0x54: 'and32 i', 0x5c: 'and32 r', 0x64: 'lsh32 i', 0x6c: 'lsh32 r', 0x74: 'rsh32 i', 0x7c: 'rsh32 r', 0x84: 'neg32', 0xa4: 'xor32 i', 0xac: 'xor32 r', 0xb4: 'mov32 i', 0xbc: 'mov32 r', 0xc4: 'arsh32 i', 0xcc: 'arsh32 r',
       0x18: 'lddw', 0x61: 'ldxw', 0x69: 'ldxh', 0x71: 'ldxb', 0x79: 'ldxdw', 0x62: 'stw', 0x6a: 'sth', 0x72: 'stb', 0x7a: 'stdw', 0x63: 'stxw', 0x6b: 'stxh', 0x73: 'stxb', 0x7b: 'stxdw',
       0x05: 'ja', 0x15: 'jeq i', 0x1d: 'jeq r', 0x25: 'jgt i', 0x2d: 'jgt r', 0x35: 'jge i', 0x3d: 'jge r', 0xa5: 'jlt i', 0xad: 'jlt r', 0xb5: 'jle i', 0xbd: 'jle r',
       0x45: 'jset i', 0x4d: 'jset r', 0x55: 'jne i', 0x5d: 'jne r', 0x65: 'jsgt i', 0x6d: 'jsgt r', 0x75: 'jsge i', 0x7d: 'jsge r', 0xc5: 'jslt i', 0xcd: 'jslt r', 0xd5: 'jsle i', 0xdd: 'jsle r',
       0x85: 'call', 0x8d: 'callx', 0x95: 'exit', 0xd4: 'le', 0xdc: 'be'}


def fmt(e, at, op, dst, src, off, imm, w, start, label=None):
    n = OPN.get(op, 'op%02x' % op)
    rel = e.relocations.get(at)
    s = '%5x %-8s d%d s%d off=%-6d imm=%d' % (at - start, n, dst, src, off, imm)
    if op == 0x85 and src == 1 and (not rel or rel.get('type') != 10):
        s = '%5x call  -> %s' % (at - start, label or hex(e.calls.get(at, 0)))
    elif rel:
        s += '  [rel%d %s]' % (rel['type'], rel['symbol'])
        if op == 0x18:
            s = '%5x lddw r%d, <REL %s>' % (at - start, dst, rel['symbol'] or '')
    return s


def norm_key(e, at, op, dst, src, off, imm, w):
    # same masking as retained reader: internal call imm, relocated lddw/syscall imm
    rel = e.relocations.get(at)
    if op == 0x85 and src == 1 and (not rel or rel.get('type') != 10):
        return ('call',)
    if rel and op == 0x18 and rel['type'] == 8:
        return ('lddw', dst)
    if rel and op == 0x85 and rel['type'] == 10:
        return ('syscall', rel['symbol'])
    return (op, dst, src, off, imm)


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--candidate', required=True)
    p.add_argument('--symbols', required=True)
    p.add_argument('--orig', type=lambda x: int(x, 0), required=True)
    p.add_argument('--cand', required=True, help='candidate symbol substring or 0xstart')
    p.add_argument('--measure')
    p.add_argument('--context', type=int, default=1)
    p.add_argument('--full', action='store_true')
    a = p.parse_args()
    o, c, s = load(a.candidate, a.symbols)
    ow = dict(windows(o))
    st = a.orig; en = ow[st]
    if a.cand.startswith('0x'):
        f = [f for f in s.funcs if f['start'] == int(a.cand, 16)][0]
    else:
        fs = [f for f in s.funcs if a.cand in f['name']]
        assert len(fs) >= 1, 'no candidate'
        if len(fs) > 1:
            print('multiple:', [(hex(f['start']), f['size'], f['name'][-60:]) for f in fs])
        f = fs[0]
    cs, ce = f['start'], f['start'] + f['size']
    names = {}
    if a.measure:
        m = json.load(open(a.measure))
        for r in m['rows']:
            if r['matches']:
                names[r['start']] = r['matches'][0]['name']
    cnames = {g['start']: g['name'] for g in s.funcs}
    oi = list(insns(o, st, en)); ci = list(insns(s, cs, ce))
    ok = [norm_key(o, *x) for x in oi]; ck = [norm_key(s, *x) for x in ci]
    print('orig %x..%x (%d)  cand %s %x (%d)' % (st, en, en - st, f['name'], cs, f['size']))
    sm = difflib.SequenceMatcher(None, ok, ck, autojunk=False)
    print('ratio %.4f' % sm.ratio())
    def short(nm):
        return nm if len(nm) < 90 else nm[:40] + '..' + nm[-45:]
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal' and not a.full:
            continue
        print('--- %s o[%d:%d] c[%d:%d]' % (tag, i1, i2, j1, j2))
        for k in range(i1, i2):
            x = oi[k]; lab = None
            if x[1] == 0x85 and x[0] in o.calls:
                t = o.calls[x[0]]; lab = short(names.get(t, 'U:%x' % t))
            print('  O ' + fmt(o, *x, st, lab))
        for k in range(j1, j2):
            x = ci[k]; lab = None
            if x[1] == 0x85 and x[0] in s.calls:
                t = s.calls[x[0]]; lab = short(cnames.get(t, 'c:%x' % t))
            print('  C ' + fmt(s, *x, cs, lab))


if __name__ == '__main__':
    main()
