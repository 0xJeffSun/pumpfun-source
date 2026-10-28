import struct, sys
def dyn(path):
    b = open(path, 'rb').read()
    shoff, = struct.unpack_from('<Q', b, 0x28); shentsize, shnum, shstrndx = struct.unpack_from('<HHH', b, 0x3a)
    hs = [struct.unpack_from('<IIQQQQIIQQ', b, shoff + i * shentsize) for i in range(shnum)]
    base = hs[shstrndx][4]; nm = lambda o, off: b[o + off:b.index(b'\0', o + off)].decode()
    sec = {nm(base, h[0]): h for h in hs}
    ds, dstr = sec['.dynsym'], sec['.dynstr']
    out = []
    for i in range(ds[5] // 24):
        st_name, st_info, st_other, st_shndx, st_value, st_size = struct.unpack_from('<IBBHQQ', b, ds[4] + 24 * i)
        out.append((i, nm(dstr[4], st_name), st_info, st_shndx, st_value))
    return out
for p in sys.argv[1:]:
    print(p.split('/')[-2] if '/' in p else p, [(i, n, hex(info)) for i, n, info, sh, v in dyn(p)])
