# usage: relsites.py STRIPPED.so SYMBOLS.so NAME... -> functions containing R_BPF_64_32 relocations against NAME
import struct, sys
def secs(b):
    shoff, = struct.unpack_from('<Q', b, 0x28); shentsize, shnum, shstrndx = struct.unpack_from('<HHH', b, 0x3a)
    hs = [struct.unpack_from('<IIQQQQIIQQ', b, shoff + i * shentsize) for i in range(shnum)]
    base = hs[shstrndx][4]; nm = lambda o, off: b[o + off:b.index(b'\0', o + off)].decode()
    return {nm(base, h[0]): h for h in hs}, nm
b = open(sys.argv[1], 'rb').read(); s, nm = secs(b)
ds, dstr, rd = s['.dynsym'], s['.dynstr'], s['.rel.dyn']
names = [nm(dstr[4], struct.unpack_from('<I', b, ds[4] + 24 * i)[0]) for i in range(ds[5] // 24)]
rels = [struct.unpack_from('<QQ', b, rd[4] + 16 * i) for i in range(rd[5] // 16)]
y = open(sys.argv[2], 'rb').read(); ys, ynm = secs(y); st, sstr = ys['.symtab'], ys['.strtab']
funcs = []
for i in range(st[5] // 24):
    n, info, other, shndx, val, size = struct.unpack_from('<IBBHQQ', y, st[4] + 24 * i)
    if info & 15 == 2 and size: funcs.append((val, val + size, ynm(sstr[4], n)))
for want in sys.argv[3:]:
    idx = names.index(want)
    for k, (off, info) in enumerate(rels):
        if info >> 32 == idx:
            f = [x for x in funcs if x[0] <= off < x[1]]
            print(want, 'rel#%d' % k, hex(off), 'type', info & 0xffffffff, f[0][2][:110] if f else '?')
