#!/usr/bin/env python3
"""Source-coordinate sites of an SBF ELF (analysis only; nothing executable is written).

Two kinds of coordinate site:
  S  Anchor `error!` Source { filename: &str, line: u32 } built in code:
       lddw rA, <str>; stxdw [rB+X], rA; stdw [rB+X+8], <len>; stw [rB+X+16], <line>
     The len and line are instruction immediates and are NOT masked by the repo
     normalizer, so they decide normalized window identity.
  L  core::panic::Location { file: &str, line: u32, col: u32 } 24-byte records in
     .rodata/.data.rel.ro, referenced from code through lddw (masked by the
     normalizer).  They decide raw/whole-ELF identity only.

API: Sites(elf_path).windows -> list of (start, end, name) ; .s_sites ; .l_records ; .l_refs
"""
import struct, sys, json, collections
from pathlib import Path

HERE = Path(__file__).resolve().parent


def _find_root():
    for p in [Path.cwd(), *Path.cwd().parents, HERE, *HERE.parents]:
        if (p / 'repro/pump_amm/claim-self-transfer-v144/static-tool/elf_reader.py').is_file():
            return p
    raise SystemExit('run from a pumpfun-source checkout (needs repro/pump_amm/claim-self-transfer-v144)')


ROOT = _find_root()
sys.path.insert(0, str(ROOT / 'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf  # noqa: E402

SZ = {0x00: 'w', 0x08: 'h', 0x10: 'b', 0x18: 'dw'}


def decode(b, at):
    """Return (size, op, dst, src, off, imm[, imm64])."""
    op = b[at]; regs = b[at + 1]; dst = regs & 15; src = regs >> 4
    off = struct.unpack_from('<h', b, at + 2)[0]; imm = struct.unpack_from('<i', b, at + 4)[0]
    if op == 0x18:
        hi = struct.unpack_from('<I', b, at + 12)[0]
        return 16, op, dst, src, off, (imm & 0xffffffff) | (hi << 32)
    return 8, op, dst, src, off, imm


class Sites:
    def __init__(self, path, entries_from=None):
        self.path = Path(path)
        self.elf = e = Elf(self.path)
        self.b = e.b
        # windows: for the original (no symbols) use entry-to-next-entry; for a candidate use symbols
        if '.symtab' in e.secs:
            self.windows = sorted((f['start'], f['start'] + f['size'], f['name']) for f in e.funcs)
        else:
            ents = sorted(set(e.entries) | {e.lo})
            self.windows = [(s, t, '') for s, t in zip(ents, ents[1:] + [e.hi])]
        self._starts = [w[0] for w in self.windows]
        self.ro = [(n, s[3], s[4], s[5]) for n, s in e.secs.items() if n in ('.rodata', '.data.rel.ro')]
        self.s_sites = []
        self.l_records = {}
        self.l_refs = collections.defaultdict(list)   # record va -> [code addr]
        self.lddw = {}                                # code addr -> imm64
        self._scan_code()
        self._scan_locations()
        for at, v in self.lddw.items():
            if v in self.l_records:
                self.l_refs[v].append(at)

    # ---------------------------------------------------------------- helpers
    def off(self, va):
        for n, addr, off, size in self.ro:
            if addr <= va < addr + size:
                return off + va - addr
        return None

    def string(self, va, n):
        o = self.off(va)
        if o is None or n <= 0 or n > 400:
            return None
        try:
            return self.b[o:o + n].decode()
        except UnicodeDecodeError:
            return None

    def window_of(self, at):
        import bisect
        i = bisect.bisect_right(self._starts, at) - 1
        if i >= 0 and self.windows[i][0] <= at < self.windows[i][1]:
            return self.windows[i]
        return None

    # ---------------------------------------------------------------- S sites
    def _scan_code(self):
        b = self.b
        for (ws, we, name) in self.windows:
            at = ws
            regval = {}           # reg -> (imm64, lddw addr)
            stores = {}           # (base, off) -> list of (kind, value, at)
            ins = []
            while at < we:
                n, op, dst, src, off, imm = decode(b, at)
                ins.append((at, n, op, dst, src, off, imm))
                at += n
            for (at, n, op, dst, src, off, imm) in ins:
                if op == 0x18:
                    regval[dst] = (imm, at); self.lddw[at] = imm
                    continue
                cls = op & 7
                if cls == 3 and (op & 0x18) == 0x18:        # stxdw [dst+off], src
                    if src in regval:
                        stores.setdefault((dst, off), []).append(('ptr', regval[src][0], at, regval[src][1]))
                elif cls == 2:                               # st{w,dw} [dst+off], imm
                    k = SZ[op & 0x18]
                    stores.setdefault((dst, off), []).append((k, imm, at, None))
                elif cls in (4, 7, 1):                       # alu / ldx write dst
                    regval.pop(dst, None)
                elif cls == 5 and (op & 0xf0) == 0x80:       # call clobbers r0..r5
                    for r in range(6):
                        regval.pop(r, None)
                if cls == 7 and (op & 0xf0) == 0xb0 and (op & 8) and src in regval:   # mov dst, src
                    regval[dst] = regval[src]
            for (base, X), lst in stores.items():
                for kind, ptr, sat, lat in lst:
                    if kind != 'ptr':
                        continue
                    lens = [x for x in stores.get((base, X + 8), []) if x[0] == 'dw']
                    lines = [x for x in stores.get((base, X + 16), []) if x[0] == 'w']
                    if not lens or not lines:
                        continue
                    # nearest stores after/around the pointer store
                    ln = min(lens, key=lambda x: abs(x[2] - sat))
                    li = min(lines, key=lambda x: abs(x[2] - sat))
                    s = self.string(ptr, ln[1])
                    if s and s.endswith('.rs'):
                        self.s_sites.append({'kind': 'S', 'win': ws, 'name': name, 'file': s, 'line': li[1],
                                             'line_at': li[2], 'len_at': ln[2], 'ptr_at': lat, 'store_at': sat})

    # ---------------------------------------------------------------- L records
    def _scan_locations(self):
        b = self.b
        for n, addr, off, size in self.ro:
            for p in range(off, off + size - 24 + 1, 8):
                ptr, ln, line, col = struct.unpack_from('<QQII', b, p)
                if not (3 < ln < 300 and 0 < line < 100000 and 0 < col < 2000):
                    continue
                cand = [ptr >> 32, ptr & 0xffffffff, ptr]
                for va in cand:
                    s = self.string(va, ln) if va else None
                    if s and s.endswith('.rs'):
                        self.l_records[addr + (p - off)] = {'kind': 'L', 'va': addr + (p - off), 'file': s,
                                                            'line': line, 'col': col}
                        break

    def l_sites(self):
        out = []
        for va, refs in self.l_refs.items():
            r = self.l_records[va]
            for at in refs:
                w = self.window_of(at)
                out.append({**r, 'ref_at': at, 'win': w[0] if w else None, 'name': w[2] if w else ''})
        return out


def masked_key(st, ws, we, extra_mask=()):
    """normalized bytes of a window with S len/line immediates masked, + relocation pattern."""
    import hashlib
    e = st.elf
    nb = bytearray(e.normalized[ws:we])
    for at in extra_mask:
        if ws <= at < we:
            nb[at - ws + 4:at - ws + 8] = bytes(4)
    return (we - ws, hashlib.sha256(bytes(nb)).hexdigest(), json.dumps(e.pattern(ws, we - ws), sort_keys=True))


if __name__ == '__main__':
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument('elf')
    ap.add_argument('--json')
    a = ap.parse_args()
    st = Sites(a.elf)
    ls = st.l_sites()
    print(f'{len(st.windows)} windows, {len(st.s_sites)} S sites, {len(st.l_records)} L records, {len(ls)} L refs')
    byf = collections.Counter(s['file'] for s in st.s_sites)
    for f, n in sorted(byf.items()):
        print(f'  S {n:4d} {f}')
    byf = collections.Counter(s['file'] for s in st.l_records.values())
    for f, n in sorted(byf.items()):
        print(f'  L {n:4d} {f}')
    if a.json:
        json.dump({'s_sites': st.s_sites, 'l_records': list(st.l_records.values()), 'l_sites': ls},
                  open(a.json, 'w'), indent=1)
