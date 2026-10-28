def elf_functions(blob):
    """FUNC symbols in .text from the ELF symbol table (no external tools)."""
    import struct
    shoff, = struct.unpack_from('<Q', blob, 0x28); shentsize, shnum, shstrndx = struct.unpack_from('<HHH', blob, 0x3a)
    hdrs = [struct.unpack_from('<IIQQQQIIQQ', blob, shoff + i * shentsize) for i in range(shnum)]
    names = hdrs[shstrndx]
    secname = lambda off: blob[names[4] + off:blob.index(b'\0', names[4] + off)].decode()
    text_index = next(i for i, h in enumerate(hdrs) if secname(h[0]) == '.text')
    out = []
    for h in hdrs:
        if h[1] != 2:  # SHT_SYMTAB
            continue
        strtab = hdrs[h[6]]
        for k in range(h[5] // 24):
            st_name, st_info, st_other, st_shndx, st_value, st_size = struct.unpack_from('<IBBHQQ', blob, h[4] + k * 24)
            if st_info & 0xf == 2 and st_shndx == text_index and st_size:
                nm = blob[strtab[4] + st_name:blob.index(b'\0', strtab[4] + st_name)].decode()
                out.append((st_value, st_size, nm))
    return out
