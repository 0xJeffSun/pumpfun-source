#!/usr/bin/env python3
"""Minimal SBF disassembler + window/candidate alignment helpers (analysis only)."""
import struct, sys, difflib, json, hashlib
from pathlib import Path
WT = Path('/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bf960843-6806-451b-a211-62c8b228d301/scratchpad/lanes/amm-lo/wt')
sys.path.insert(0, str(WT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf

ALU = {0x00:'add',0x10:'sub',0x20:'mul',0x30:'div',0x40:'or',0x50:'and',0x60:'lsh',0x70:'rsh',0x80:'neg',0x90:'mod',0xa0:'xor',0xb0:'mov',0xc0:'arsh',0xd0:'end'}
JMP = {0x00:'ja',0x10:'jeq',0x20:'jgt',0x30:'jge',0x40:'jset',0x50:'jne',0x60:'jsgt',0x70:'jsge',0x80:'call',0x90:'exit',0xa0:'jlt',0xb0:'jle',0xc0:'jslt',0xd0:'jsle'}
SZ = {0x00:'w',0x08:'h',0x10:'b',0x18:'dw'}

def decode(b, at):
    op = b[at]; regs = b[at+1]; dst = regs & 15; src = regs >> 4
    off = struct.unpack_from('<h', b, at+2)[0]; imm = struct.unpack_from('<i', b, at+4)[0]
    cls = op & 7
    if op == 0x18:
        hi = struct.unpack_from('<i', b, at+12)[0]
        val = (imm & 0xffffffff) | ((hi & 0xffffffff) << 32)
        return 16, ('lddw', f'r{dst}', val)
    if cls in (4, 7):
        name = ALU.get(op & 0xf0, '?%02x' % op) + ('32' if cls == 4 else '')
        if (op & 0xf0) == 0xd0:
            return 8, (('be' if op & 8 else 'le') + str(imm), f'r{dst}')
        if (op & 0xf0) == 0x80:
            return 8, (name, f'r{dst}')
        if op & 8:
            return 8, (name, f'r{dst}', f'r{src}')
        return 8, (name, f'r{dst}', imm)
    if cls == 5:
        name = JMP.get(op & 0xf0, '?%02x' % op)
        if name == 'exit': return 8, ('exit',)
        if name == 'call':
            if op & 8: return 8, ('callx', f'r{imm}' if imm else f'r{dst}')
            return 8, ('call', src, imm)
        if name == 'ja': return 8, ('ja', off)
        if op & 8: return 8, (name, f'r{dst}', f'r{src}', off)
        return 8, (name, f'r{dst}', imm, off)
    if cls == 1:  # ldx
        return 8, ('ldx' + SZ[op & 0x18], f'r{dst}', f'[r{src}{off:+d}]')
    if cls == 3:  # stx
        return 8, ('stx' + SZ[op & 0x18], f'[r{dst}{off:+d}]', f'r{src}')
    if cls == 2:  # st
        return 8, ('st' + SZ[op & 0x18], f'[r{dst}{off:+d}]', imm)
    return 8, ('?%02x' % op, regs, off, imm)

def disasm(elf, start, end, mask=True):
    b = elf.b; at = start; out = []
    while at < end:
        n, ins = decode(b, at)
        txt = list(ins)
        if mask:
            if ins[0] == 'call' and ins[1] == 1 and at in elf.calls:
                tgt = elf.calls[at]
                txt = ['call', 'F']
            elif ins[0] == 'call' and at in elf.relocations:
                txt = ['syscall', elf.relocations[at]['symbol']]
            elif ins[0] == 'lddw' and at in elf.relocations:
                txt = ['lddw', ins[1], 'RELOC']
        # branch targets as relative pc index
        out.append((at, n, ' '.join(str(x) for x in txt), ins))
        at += n
    return out

def funcs_by_name(elf):
    return {f['name']: f for f in elf.funcs}

def load(cand_dir=None):
    orig = Elf(WT/'evidence/original/pump_amm/deployed.so')
    return orig

def show(elf, start, end, label=''):
    for at, n, t, ins in disasm(elf, start, end):
        extra = ''
        if ins[0] == 'call' and ins[1] == 1 and at in elf.calls:
            extra = f'   ; -> {elf.calls[at]:#x}'
        if ins[0] == 'lddw' and at in elf.relocations:
            extra = f'   ; {ins[2]:#x}'
        if ins[0].startswith('j') and ins[0] != 'ja' or ins[0] == 'ja':
            o = ins[-1]
            extra = f'   ; -> +{(at + 8 + o*8) - start:#x}'
        print(f'{label}{at-start:6x} {at:8x}: {t}{extra}')

def cand(path=None):
    return Elf(Path(path) if path else WT/'repro/pump_amm/structural-tlv-recovery-20261027/results/build/unstripped.so')

def lines(elf, start, end, mask_branch=False):
    out = []
    for at, n, t, ins in disasm(elf, start, end):
        out.append(t)
    return out

def diff(o, os_, oe, c, cs, ce, ctx=3, full=False):
    a = lines(o, os_, oe); b = lines(c, cs, ce)
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    print(f'ratio={sm.ratio():.3f} orig={len(a)} cand={len(b)}')
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            if full:
                for k in range(i2-i1): print(f'  {i1+k:4d} {j1+k:4d}  {a[i1+k]}')
            else:
                print(f'  ... {i2-i1} equal ({i1}..{i2} / {j1}..{j2})')
            continue
        for k in range(i1, i2): print(f'- {k:4d}       {a[k]}')
        for k in range(j1, j2): print(f'+      {k:4d}  {b[k]}')

def find(c, sub):
    return [f for f in c.funcs if sub in f['name']]

def body_sources(elf, s, e):
    """Source records (file,line) inside a body plus nearby 6000+ error-code immediates."""
    import coords
    recs = coords.source_records(elf, s, e)
    out = []
    L = disasm(elf, s, e, mask=False)
    idx = {at: i for i, (at, n, t, ins) in enumerate(L)}
    for r in recs:
        i = idx[r['at']]
        near = [ins for (at, n, t, ins) in L[max(0, i-40): i+40] if ins[0] in ('stw', 'mov32', 'mov') and isinstance(ins[-1], int) and 6000 <= ins[-1] < 6200]
        out.append((r['at'] - s, r['file'].split('/')[-1], r['line'], sorted(set(x[-1] for x in near))))
    return out
