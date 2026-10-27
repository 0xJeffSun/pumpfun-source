#!/usr/bin/env python3
"""Byte-level translation proof: the reordered ELF is the default ELF under a section permutation.

Given the default-layout ELF and map (`before`) and the reordered ELF and map
(`after`), predict every byte of `after` from `before` and the two maps only:

  * every `.text`, `.rodata` and `.data.rel.ro` input section keeps its size and
    bytes; it moves from its `before` to its `after` map address;
  * direct-call immediates (0x85, src=1, not an imported-call relocation) are
    recomputed from the translated caller and callee addresses; relocated lddw
    immediates and relocated `.data.rel.ro` pointer fields are translated;
  * padding between input sections is zero in both images;
  * `.rel.dyn` is the translated multiset of the `before` records; `.dynsym` /
    `.symtab` values and the entrypoint are translated; `.dynamic` address
    entries follow their sections; `.dynstr`, `.strtab`, `.shstrtab` are equal;
  * ELF/program/section headers equal `before` except the address, offset and
    size fields, which must equal the `after` map's output-section layout;
  * every byte of `after` is covered by one of the checked ranges.

Any byte that is not explained by this permutation fails the proof, so the
reordered output contains no supplied, padded or patched bytes. Pure and
read-only.
"""
import bisect, collections, hashlib, re, struct
from pathlib import Path

OUT = ('.text', '.rodata', '.data.rel.ro')
ADDR_TAGS = {3, 4, 5, 6, 7, 12, 13, 17, 23, 25, 26, 0x6ffffef5}   # PLTGOT HASH STRTAB SYMTAB RELA INIT FINI REL JMPREL INIT/FINI_ARRAY GNU_HASH


def owner_key(owner):
    if owner == '<internal>':
        return owner
    m = re.match(r'(.*)\((.*)\)$', owner)
    return m.group(1).rsplit('/', 1)[-1] + ':' + m.group(2) if m else owner.rsplit('/', 1)[-1]


def parse_map(path):
    """Output sections (name -> (vma, size)) and input sections of OUT."""
    outs, ins, cur = {}, [], None
    for ln in Path(path).read_text().split('\n')[1:]:
        m = re.match(r'\s*([0-9a-f]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+(\d+) (.*)$', ln)
        if not m:
            continue
        vma, _, size, _, rest = m.groups()
        ind = len(rest) - len(rest.lstrip(' '))
        if ind == 0:
            cur = rest.strip()
            outs[cur] = (int(vma, 16), int(size, 16))
        elif ind == 8 and cur in OUT:
            mm = re.match(r'(.*):\((.*)\)$', rest.strip())
            ins.append({'out': cur, 'key': (cur, owner_key(mm.group(1)), mm.group(2)), 'vma': int(vma, 16), 'size': int(size, 16)})
    return outs, ins


class Image:
    def __init__(self, path):
        self.b = Path(path).read_bytes()
        b = self.b
        assert b[:6] == b'\x7fELF\x02\x01'
        self.hdr = list(struct.unpack_from('<16sHHIQQQIHHHHHH', b, 0))
        (_, _, _, _, self.entry, self.phoff, self.shoff, _, _, phentsize, self.phnum, shentsize, self.shnum, shstrndx) = self.hdr
        assert phentsize == 56 and shentsize == 64
        self.ph = [list(struct.unpack_from('<IIQQQQQQ', b, self.phoff + i * 56)) for i in range(self.phnum)]
        raw = [list(struct.unpack_from('<IIQQQQIIQQ', b, self.shoff + i * 64)) for i in range(self.shnum)]
        names = b[raw[shstrndx][4]:raw[shstrndx][4] + raw[shstrndx][5]]
        self.sh = raw
        self.names = [names[s[0]:].split(b'\0', 1)[0].decode() for s in raw]
        self.sec = {n: s for n, s in zip(self.names, raw)}

    def rel(self):
        s = self.sec.get('.rel.dyn')
        out = []
        if s:
            for p in range(s[4], s[4] + s[5], 16):
                out.append(struct.unpack_from('<QQ', self.b, p))
        return out


def prove(before_elf, after_elf, before_map, after_map):
    A, B = Image(before_elf), Image(after_elf)
    outs_a, ins_a = parse_map(before_map)
    outs_b, ins_b = parse_map(after_map)
    ka = {x['key']: x for x in ins_a}
    kb = {x['key']: x for x in ins_b}
    assert len(ka) == len(ins_a) and len(kb) == len(ins_b) and ka.keys() == kb.keys(), 'input-section sets differ'
    for k, x in ka.items():
        assert x['size'] == kb[k]['size'], ('input section size changed', k)
    # maps bind to the images: output-section addresses and sizes equal the section headers
    for img, outs in ((A, outs_a), (B, outs_b)):
        for n in OUT:
            assert (img.sec[n][3], img.sec[n][5]) == outs[n], ('map does not describe image', n)
    rows = sorted(({'a': x['vma'], 'b': kb[k]['vma'], 'n': x['size'], 'out': x['out'], 'key': k} for k, x in ka.items() if x['size']), key=lambda r: r['a'])
    starts = [r['a'] for r in rows]
    ends = {r['a'] + r['n']: r for r in rows}

    def translate(v):
        i = bisect.bisect_right(starts, v) - 1
        if i >= 0 and rows[i]['a'] <= v < rows[i]['a'] + rows[i]['n']:
            return rows[i]['b'] + v - rows[i]['a']
        if v in ends:                                   # one-past-the-end pointer
            r = ends[v]
            return r['b'] + r['n']
        for n in ('.dynamic', '.dynsym', '.dynstr', '.rel.dyn'):
            if A.sec[n][3] <= v < A.sec[n][3] + A.sec[n][5]:
                return B.sec[n][3] + v - A.sec[n][3]
        raise AssertionError('untranslatable address %#x' % v)

    expected = bytearray(len(B.b))
    covered = bytearray(len(B.b))

    def put(off, data):
        expected[off:off + len(data)] = data
        covered[off:off + len(data)] = b'\1' * len(data)

    def file_off(img, n, vma):
        s = img.sec[n]
        return s[4] + vma - s[3]

    relocs_a = {o: i for o, i in A.rel()}
    rel_sorted = sorted(relocs_a)
    seen_rel = set()
    stats = collections.Counter()
    # 1. moved input sections (text bodies with call / lddw translation, data with pointer translation)
    for r in rows:
        body = bytearray(A.b[file_off(A, r['out'], r['a']):file_off(A, r['out'], r['a']) + r['n']])
        if r['out'] == '.text':
            for d in range(0, r['n'], 8):
                pc = r['a'] + d
                op, reg, _, imm = struct.unpack_from('<BBhi', body, d)
                info = relocs_a.get(pc)
                if op == 0x85 and reg == 0x10 and (info is None or info & 0xffffffff != 10):
                    new = translate(pc + 8 + imm * 8) - (r['b'] + d) - 8
                    assert new % 8 == 0
                    struct.pack_into('<i', body, d + 4, new // 8)
                    stats['direct_calls'] += 1
                if info is not None and info & 0xffffffff == 8:
                    assert op == 0x18
                    v = struct.unpack_from('<I', body, d + 4)[0] | struct.unpack_from('<I', body, d + 12)[0] << 32
                    t = translate(v)
                    struct.pack_into('<I', body, d + 4, t & 0xffffffff)
                    struct.pack_into('<I', body, d + 12, t >> 32)
                    stats['lddw_relocations'] += 1
                    stats['lddw_values_moved'] += t != v
            for d in range(0, r['n'], 8):
                if r['a'] + d in relocs_a:
                    seen_rel.add(r['a'] + d)
        else:
            lo = bisect.bisect_left(rel_sorted, r['a'])
            hi = bisect.bisect_left(rel_sorted, r['a'] + r['n'])
            for site in rel_sorted[lo:hi]:
                info, d = relocs_a[site], site - r['a']
                assert info & 0xffffffff == 8 and r['out'] == '.data.rel.ro' and d + 8 <= r['n'], ('unexpected data relocation', r['key'])
                low, v = struct.unpack_from('<II', body, d)
                assert low == 0
                struct.pack_into('<II', body, d, 0, translate(v))
                seen_rel.add(site)
                stats['data_pointers'] += 1
        put(file_off(B, r['out'], r['b']), bytes(body))
        stats['input_sections'] += 1
    # 2. padding inside the moved output sections is zero in both images
    for img, ins in ((A, ins_a), (B, ins_b)):
        for n in OUT:
            lo, size = img.sec[n][3], img.sec[n][5]
            used = sorted((x['vma'], x['vma'] + x['size']) for x in ins if x['out'] == n)
            cur = lo
            for s, e in used:
                assert s >= cur
                assert not any(img.b[file_off(img, n, cur):file_off(img, n, s)]), ('non-zero padding', n)
                if img is B and s > cur:
                    put(file_off(B, n, cur), bytes(s - cur))
                cur = e
            assert cur <= lo + size and not any(img.b[file_off(img, n, cur):file_off(img, n, lo + size)])
            if img is B:
                put(file_off(B, n, cur), bytes(lo + size - cur))
    # 3. dynamic sections
    sa, sb = A.sec['.dynamic'], B.sec['.dynamic']
    assert sa[5] == sb[5]
    dyn = bytearray(A.b[sa[4]:sa[4] + sa[5]])
    for p in range(0, len(dyn), 16):
        tag, val = struct.unpack_from('<qQ', dyn, p)
        if tag in ADDR_TAGS and val:
            struct.pack_into('<qQ', dyn, p, tag, translate(val))
    put(sb[4], bytes(dyn))
    for n in ('.dynsym', '.symtab'):
        if n not in A.sec:
            continue
        sa, sb = A.sec[n], B.sec[n]
        assert sa[5] == sb[5]
        body = bytearray(A.b[sa[4]:sa[4] + sa[5]])
        for p in range(0, len(body), 24):
            name, info, other, shndx, value, size = struct.unpack_from('<IBBHQQ', body, p)
            if value and 0 < shndx < len(A.names) and A.sh[shndx][3]:     # any allocated section
                sname = A.names[shndx]
                if sname in OUT:
                    t = translate(value)
                else:                                   # section-relative for .dynamic etc.
                    assert A.sec[sname][3] <= value <= A.sec[sname][3] + A.sec[sname][5]
                    t = B.sec[sname][3] + value - A.sec[sname][3]
                struct.pack_into('<Q', body, p + 8, t)
                stats['symbol_values'] += 1
        put(sb[4], bytes(body))
    for n in ('.dynstr', '.strtab', '.shstrtab', '.comment'):
        if n in A.sec:
            sa, sb = A.sec[n], B.sec[n]
            assert A.b[sa[4]:sa[4] + sa[5]] == B.b[sb[4]:sb[4] + sb[5]], n
            put(sb[4], A.b[sa[4]:sa[4] + sa[5]])
    assert seen_rel == set(relocs_a), 'relocation outside moved input sections'
    ra, rb = A.rel(), B.rel()
    assert collections.Counter((translate(o), i) for o, i in ra) == collections.Counter(rb), 'relocation multiset differs'
    sb = B.sec['.rel.dyn']
    put(sb[4], B.b[sb[4]:sb[4] + sb[5]])
    stats['relocation_records'] = len(rb)
    # 4. headers: equal to `before` except layout fields, which must match the `after` sections
    hdr = list(A.hdr)
    hdr[4] = translate(A.entry)
    hdr[6] = B.shoff
    assert hdr == B.hdr, 'ELF header differs beyond entry / section-header offset'
    put(0, B.b[:64])
    assert A.names == B.names and len(A.ph) == len(B.ph)
    for i, (sa, sb) in enumerate(zip(A.sh, B.sh)):
        assert [sa[k] for k in (0, 1, 2, 6, 7, 8, 9)] == [sb[k] for k in (0, 1, 2, 6, 7, 8, 9)], A.names[i]
        if A.names[i] not in OUT + ('.dynamic', '.dynsym', '.dynstr', '.rel.dyn') and sa[3] == 0:
            assert sa[5] == sb[5], A.names[i]
        put(B.shoff + i * 64, B.b[B.shoff + i * 64:B.shoff + (i + 1) * 64])
    for i, (pa, pb) in enumerate(zip(A.ph, B.ph)):
        assert (pa[0], pa[1], pa[7]) == (pb[0], pb[1], pb[7])
        members = [s for s in B.sh if s[3] and pb[3] <= s[3] < pb[3] + max(pb[6], 1)]
        assert members and pb[3] == min(s[3] for s in members) and pb[2] == min(s[4] for s in members)
        assert pb[3] + pb[6] == max(s[3] + s[5] for s in members) and pb[5] == pb[6] and pb[4] == pb[3]
        put(B.phoff + i * 56, B.b[B.phoff + i * 56:B.phoff + (i + 1) * 56])
    # 5. inter-section file gaps are zero; every byte accounted for
    gaps = [i for i, c in enumerate(covered) if not c]
    assert not any(B.b[i] for i in gaps), 'unexplained non-zero byte outside checked ranges'
    stats['zero_gap_bytes'] = len(gaps)
    if bytes(expected) != B.b:
        mism = [hex(i) for i in range(len(B.b)) if expected[i] != B.b[i]]
        raise AssertionError(('predicted bytes differ', mism[:8], len(mism)))
    return {'before_sha256': hashlib.sha256(A.b).hexdigest(), 'after_sha256': hashlib.sha256(B.b).hexdigest(),
            'entrypoint': [A.entry, B.entry], 'bytes': len(B.b), **dict(stats),
            'text_bytes_moved': sum(r['n'] for r in rows if r['out'] == '.text' and r['a'] != r['b']),
            'data_bytes_moved': sum(r['n'] for r in rows if r['out'] != '.text' and r['a'] != r['b'])}


if __name__ == '__main__':
    import json, sys
    print(json.dumps(prove(*sys.argv[1:5]), indent=2))
