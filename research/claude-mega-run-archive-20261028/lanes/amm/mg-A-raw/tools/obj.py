#!/usr/bin/env python3
"""obj.py: minimal ELF64 relocatable reader (sections, symbols, REL/RELA relocations) for BPF objects."""
import struct
from pathlib import Path

class Obj:
    def __init__(self, path):
        b = self.b = Path(path).read_bytes()
        shoff = struct.unpack_from('<Q', b, 40)[0]; shentsize, shnum, shstrndx = struct.unpack_from('<HHH', b, 58)
        self.sh = [struct.unpack_from('<IIQQQQIIQQ', b, shoff + i * shentsize) for i in range(shnum)]
        ss = self.sh[shstrndx]; names = b[ss[4]:ss[4] + ss[5]]
        self.names = [names[s[0]:].split(b'\0', 1)[0].decode() for s in self.sh]
        self.syms = []
        for i, s in enumerate(self.sh):
            if s[1] == 2:  # SYMTAB
                st = self.sh[s[6]]; strs = b[st[4]:st[4] + st[5]]
                for p in range(s[4], s[4] + s[5], 24):
                    n, info, other, shndx, value, size = struct.unpack_from('<IBBHQQ', b, p)
                    self.syms.append(dict(name=strs[n:].split(b'\0', 1)[0].decode(), info=info, shndx=shndx, value=value, size=size))
        self.rels = {}  # target section index -> [(offset, symidx, type, addend)]
        for i, s in enumerate(self.sh):
            if s[1] in (9, 4):
                tgt = s[7]; ent = 16 if s[1] == 9 else 24; lst = []
                for p in range(s[4], s[4] + s[5], ent):
                    off, info = struct.unpack_from('<QQ', b, p); add = struct.unpack_from('<q', b, p + 16)[0] if ent == 24 else None
                    lst.append((off, info >> 32, info & 0xffffffff, add))
                self.rels.setdefault(tgt, []).extend(lst)

    def data(self, i):
        s = self.sh[i]; return self.b[s[4]:s[4] + s[5]]

    def find(self, name):
        return [i for i, n in enumerate(self.names) if n == name]
