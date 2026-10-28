#!/usr/bin/env python3
"""Name unmatched original windows by searching every function the linked archives contain.

Dependency rlibs hold every function their crate compiled, including ones that
--gc-sections drops because the current source never references them. Each
relocatable object's function sections are compared with the original windows
after masking every call immediate and every lddw immediate on both sides (the
object's operands are unrelocated). An equal size and masked body is a
heuristic identification of which dependency function the original links;
it is not proof of semantics or of the referenced data.
"""
import sys
sys.dont_write_bytecode = True  # keep the packet free of __pycache__
import argparse
import collections
import hashlib
import json
import struct
import subprocess
import sys
import tempfile
from pathlib import Path

import correspond as C


def mask_all(code):
    out = bytearray(code)
    i = 0
    while i + 8 <= len(out):
        op = out[i]
        if op == 0x18 and i + 16 <= len(out):
            out[i + 4:i + 8] = bytes(4)
            out[i + 12:i + 16] = bytes(4)
            i += 16
            continue
        if op == 0x85:
            out[i + 4:i + 8] = bytes(4)
        i += 8
    return bytes(out)


def object_functions(path):
    b = Path(path).read_bytes()
    if b[:4] != b'\x7fELF':
        return []
    shoff = struct.unpack_from('<Q', b, 0x28)[0]
    shentsize, shnum, shstrndx = struct.unpack_from('<HHH', b, 0x3a)
    hdrs = [struct.unpack_from('<IIQQQQIIQQ', b, shoff + i * shentsize) for i in range(shnum)]
    sname = lambda off, tab=hdrs[shstrndx]: b[tab[4] + off:b.index(b'\0', tab[4] + off)].decode(errors='replace')
    out = []
    for h in hdrs:
        if h[1] != 2:  # SHT_SYMTAB
            continue
        strtab = hdrs[h[6]]
        for off in range(h[4], h[4] + h[5], h[9]):
            st_name, st_info, st_other, st_shndx, st_value, st_size = struct.unpack_from('<IBBHQQ', b, off)
            if st_info & 0xf != 2 or not st_size or st_shndx == 0 or st_shndx >= len(hdrs):
                continue
            sec = hdrs[st_shndx]
            name = b[strtab[4] + st_name:b.index(b'\0', strtab[4] + st_name)].decode(errors='replace')
            body = b[sec[4] + st_value:sec[4] + st_value + st_size]
            out.append({'symbol': name, 'section': sname(sec[0]), 'bytes': st_size, 'masked': mask_all(body)})
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--linker-invocation', type=Path, required=True, help='link/linker-invocation.json of a build')
    ap.add_argument('--windows', type=Path, required=True, help='residuals.json.gz or inventory with unmatched windows')
    ap.add_argument('--output', type=Path, required=True)
    a = ap.parse_args()
    from classify import read
    inv = read(a.windows)
    windows = [{'start': w['start'], 'bytes': w['bytes']} for w in inv['windows']]
    unmatched = [w['start'] for w in inv['windows'] if not w['normalized_matches']]
    orig = C.Image(C.ROOT / 'evidence/original/pump/deployed.so', windows)
    want = collections.defaultdict(list)
    for o in unmatched:
        f = orig.funcs[o]
        want[f['bytes'], mask_all(f['raw'])].append(o)
    link = json.loads(a.linker_invocation.read_text())
    archives = [x for x in link['incoming'] if x.endswith('.rlib')]
    found = collections.defaultdict(list)
    with tempfile.TemporaryDirectory(prefix='layout-ar-') as tmp:
        for archive in archives:
            dest = Path(tmp) / Path(archive).name
            dest.mkdir()
            subprocess.run([str(Path.home() / '.cache/solana/v1.44/platform-tools/llvm/bin/llvm-ar'), 'x', archive], cwd=dest, check=True)
            for obj in sorted(dest.iterdir()):
                for fn in object_functions(obj):
                    for o in want.get((fn['bytes'], fn['masked']), []):
                        found[o].append({'archive': Path(archive).name, 'member': obj.name, 'section': fn['section'], 'symbol': fn['symbol']})
    rows = [{'original_start': o, 'bytes': orig.funcs[o]['bytes'], 'archive_functions': found.get(o, [])} for o in unmatched]
    result = {'scope': __doc__.split('\n')[0], 'unmatched_windows': len(unmatched),
              'identified_in_archives': sum(1 for r in rows if r['archive_functions']), 'windows': rows}
    a.output.write_text(json.dumps(result, indent=1) + '\n')
    print(json.dumps({k: result[k] for k in ['unmatched_windows', 'identified_in_archives']}))
    for r in rows:
        if r['archive_functions']:
            x = r['archive_functions'][0]
            print(hex(r['original_start']), r['bytes'], len(r['archive_functions']), x['archive'][:40], x['symbol'][:110])


if __name__ == '__main__':
    main()
