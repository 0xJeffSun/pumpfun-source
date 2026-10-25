#!/usr/bin/env python3
"""Map byte-diff offsets to ELF64 sections. Read-only ELF header parse.
Usage: elf_classify.py <original.so> <candidate.so>
"""
import sys, struct
from collections import defaultdict

def sections(path):
    with open(path, "rb") as f:
        data = f.read()
    assert data[:4] == b"\x7fELF", "not ELF"
    is64 = data[4] == 2
    assert is64
    e_shoff = struct.unpack_from("<Q", data, 0x28)[0]
    e_shentsize = struct.unpack_from("<H", data, 0x3a)[0]
    e_shnum = struct.unpack_from("<H", data, 0x3c)[0]
    e_shstrndx = struct.unpack_from("<H", data, 0x3e)[0]
    secs = []
    for i in range(e_shnum):
        off = e_shoff + i * e_shentsize
        name, s_type, flags, addr, offset, size, link, info, align, entsize = struct.unpack_from("<IIQQQQIIQQ", data, off)
        secs.append([name, s_type, flags, addr, offset, size])
    # resolve names
    strtab_off = secs[e_shstrndx][4]
    out = []
    for s in secs:
        n = s[0]
        end = data.index(b"\x00", strtab_off + n)
        nm = data[strtab_off + n:end].decode("latin1")
        out.append({"name": nm, "type": s[1], "offset": s[4], "size": s[5]})
    return out, data

def main():
    op, cp = sys.argv[1], sys.argv[2]
    secs, odata = sections(op)
    with open(cp, "rb") as f:
        cdata = f.read()
    n = min(len(odata), len(cdata))
    diffs = [i for i in range(n) if odata[i] != cdata[i]]
    print(f"total diffs={len(diffs)}  first={diffs[0] if diffs else None} last={diffs[-1] if diffs else None}")
    def find_sec(off):
        for s in secs:
            if s["size"] and s["offset"] <= off < s["offset"] + s["size"]:
                return s["name"]
        return "<nosec/header>"
    bucket = defaultdict(list)
    for d in diffs:
        bucket[find_sec(d)].append(d)
    print("\nsection layout (name offset size):")
    for s in secs:
        if s["size"]:
            print(f"  {s['name']:20s} off=0x{s['offset']:06x} size=0x{s['size']:06x} ({s['size']})")
    print("\ndiffs per section:")
    for name, lst in sorted(bucket.items(), key=lambda kv: -len(kv[1])):
        print(f"  {name:20s} {len(lst)} bytes   range 0x{lst[0]:x}-0x{lst[-1]:x}")
    return bucket, secs

if __name__ == "__main__":
    main()
