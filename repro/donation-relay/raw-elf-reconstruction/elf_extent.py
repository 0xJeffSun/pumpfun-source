"""ELF extent metadata only; does not normalize or rewrite bytes."""
import struct

def elf_extent(data):
    if len(data) < 64 or data[:7] != b'\x7fELF\x02\x01\x01':
        raise ValueError('expected complete little-endian ELF64')
    header = struct.unpack_from('<16sHHIQQQIHHHHHH', data)
    _, _, _, version, _, phoff, shoff, _, ehsize, phsize, phnum, shsize, shnum, _ = header
    if version != 1 or ehsize != 64 or phsize != 56 or shsize != 64 or not shnum:
        raise ValueError('unsupported ELF header or extended section numbering')
    end = max(64, phoff + phsize * phnum, shoff + shsize * shnum)
    if end > len(data):
        raise ValueError('truncated ELF metadata')
    for i in range(phnum):
        _, _, offset, _, _, size, _, _ = struct.unpack_from('<IIQQQQQQ', data, phoff + i * phsize)
        end = max(end, offset + size)
    for i in range(shnum):
        _, kind, _, _, offset, size, _, _, _, _ = struct.unpack_from('<IIQQQQIIQQ', data, shoff + i * shsize)
        if kind != 8:  # SHT_NOBITS occupies no file bytes.
            end = max(end, offset + size)
    if end > len(data):
        raise ValueError('truncated ELF payload')
    return end
