"""Minimal sBPF disassembler for diff display."""
import struct
ALU = {0x0:'add',0x1:'sub',0x2:'mul',0x3:'div',0x4:'or',0x5:'and',0x6:'lsh',0x7:'rsh',0x8:'neg',0x9:'mod',0xa:'xor',0xb:'mov',0xc:'arsh',0xd:'end'}
JMP = {0x0:'ja',0x1:'jeq',0x2:'jgt',0x3:'jge',0x4:'jset',0x5:'jne',0x6:'jsgt',0x7:'jsge',0x8:'call',0x9:'exit',0xa:'jlt',0xb:'jle',0xc:'jslt',0xd:'jsle'}
SZ = {0x00:'w',0x08:'h',0x10:'b',0x18:'dw'}
def dis(b, at):
    op = b[at]; regs = b[at+1]; dst = regs & 0xf; src = regs >> 4
    off = struct.unpack_from('<h', b, at+2)[0]; imm = struct.unpack_from('<i', b, at+4)[0]
    cls = op & 7
    if op == 0x18:
        hi = struct.unpack_from('<i', b, at+12)[0]
        return 16, 'lddw r%d, 0x%x' % (dst, (imm & 0xffffffff) | ((hi & 0xffffffff) << 32))
    if cls in (4, 7):
        name = ALU.get(op >> 4, '?') + ('64' if cls == 7 else '32')
        if op & 8: return 8, '%s r%d, r%d' % (name, dst, src)
        return 8, '%s r%d, %d' % (name, dst, imm)
    if cls in (5, 6):
        name = JMP.get(op >> 4, '?')
        if op == 0x85: return 8, 'call %s%d' % ('rel ' if src == 1 else 'sys ', imm)
        if op == 0x8d: return 8, 'callx r%d' % imm
        if op == 0x95: return 8, 'exit'
        if op == 0x05: return 8, 'ja %+d' % off
        if op & 8: return 8, '%s r%d, r%d, %+d' % (name, dst, src, off)
        return 8, '%s r%d, %d, %+d' % (name, dst, imm, off)
    sz = SZ.get(op & 0x18, '?')
    if cls == 1: return 8, 'ldx%s r%d, [r%d%+d]' % (sz, dst, src, off)
    if cls == 2: return 8, 'st%s [r%d%+d], %d' % (sz, dst, off, imm)
    if cls == 3: return 8, 'stx%s [r%d%+d], r%d' % (sz, dst, off, src)
    return 8, 'op%02x' % op
def listing(b, start, end):
    out = []
    at = start
    while at < end:
        n, t = dis(b, at)
        out.append((at, n, t))
        at += n
    return out
