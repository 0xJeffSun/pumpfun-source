import struct, sys
def sections(blob):
    shoff, = struct.unpack_from('<Q', blob, 0x28)
    shentsize, shnum, shstrndx = struct.unpack_from('<HHH', blob, 0x3a)
    hdrs = [struct.unpack_from('<IIQQQQIIQQ', blob, shoff + i * shentsize) for i in range(shnum)]
    strtab = hdrs[shstrndx]
    name = lambda off: blob[strtab[4] + off:blob.index(b'\0', strtab[4] + off)].decode()
    return [(name(h[0]), h[3], h[4], h[5]) for h in hdrs]
for f in sys.argv[1:]:
    b = open(f,'rb').read()
    print(f.split('/')[-2] + '/' + f.split('/')[-1], 'filesize', len(b))
    for n,a,o,s in sections(b):
        print('  %-14s addr=%#9x off=%#9x size=%#8x (%d)' % (n,a,o,s,s))
