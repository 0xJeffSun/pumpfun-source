#!/usr/bin/env python3
"""Whole-ELF differ: the byte-identity scoreboard for an SBF program reconstruction.

Compares a candidate program (stripped, as deployed) with the original deployed
ELF and assigns every byte of the original ELF extent exactly one class, by
region and by cause; candidate bytes with no original counterpart are counted
separately.

Regions (file-offset space): ELF header, program headers, every section, the
padding between them, the section-header table; the original's zero
allocation suffix (beyond the ELF extent) is reported apart.

Classes (exact partition of the original ELF extent):
  in-place                 byte equal at the same file offset (what identity needs)
  *:displaced-equal        content reproduced, at another offset
  *:operand:...equivalent  relocated operand / pointer whose candidate target
                           corresponds to the original target (text: 1:1
                           window->body assignment; .rodata: histogram byte
                           alignment; .data.rel.ro: word alignment with pointers
                           abstracted to their mapped target).  These become
                           equal once everything before them has the original
                           size and order (layout-only).
  text:unmatched-window    original window with no normalized-equal body
  *:operand:...different-target / call:different-target
                           operand whose target does not correspond
  rodata:original-only, data:*, reldyn:original-only
                           data content not reproduced
  structural:*             header / .dynamic / .dynsym / section-header bytes
                           (address-equivalent or a size/offset consequence)

.text windows and normalized matches follow the repository measurement exactly
(repro/pump_amm/focused-diagnostics-20261026/measure.py: the retained reader's
entry-to-next-entry windows, relocation/direct-call operand masking), so the
raw/normalized/unmatched counts printed here equal measure.py's.

Also reported: header/program-header/section-header/.dynamic field diffs,
.dynsym/.dynstr, .rel.dyn sequences under address correspondence, candidate-only
text by crate, the .text size budget, and panic Location records
((file, line, column) multisets with nearest-line deltas per file).

The original is only read.  Usage (from a repository checkout):

  python3 elfdiff.py --candidate C.so --symbols U.so --output report.json [--markdown report.md]
"""
import argparse, bisect, collections, difflib, hashlib, json, re, shutil, struct, subprocess, sys, tempfile
from pathlib import Path


def find_root(starts):
    for start in starts:
        start = Path(start).resolve()
        for p in [start, *start.parents]:
            if (p / 'evidence/original/pump_amm/deployed.so').is_file() and \
                    (p / 'repro/pump_amm/claim-self-transfer-v144/static-tool/elf_reader.py').is_file():
                return p
    return None


def digest(b):
    return hashlib.sha256(b).hexdigest()


DT = {0: 'DT_NULL', 5: 'DT_STRTAB', 6: 'DT_SYMTAB', 10: 'DT_STRSZ', 11: 'DT_SYMENT', 17: 'DT_REL', 18: 'DT_RELSZ',
      19: 'DT_RELENT', 22: 'DT_TEXTREL', 30: 'DT_FLAGS', 0x6ffffffa: 'DT_RELCOUNT', 0x6ffffffb: 'DT_FLAGS_1'}
DT_ADDR = {5: '.dynstr', 6: '.dynsym', 17: '.rel.dyn'}
EHDR = [('e_ident', '16s', 0), ('e_type', 'H', 16), ('e_machine', 'H', 18), ('e_version', 'I', 20), ('e_entry', 'Q', 24),
        ('e_phoff', 'Q', 32), ('e_shoff', 'Q', 40), ('e_flags', 'I', 48), ('e_ehsize', 'H', 52), ('e_phentsize', 'H', 54),
        ('e_phnum', 'H', 56), ('e_shentsize', 'H', 58), ('e_shnum', 'H', 60), ('e_shstrndx', 'H', 62)]
PHDR = [('p_type', 'I', 0), ('p_flags', 'I', 4), ('p_offset', 'Q', 8), ('p_vaddr', 'Q', 16), ('p_paddr', 'Q', 24),
        ('p_filesz', 'Q', 32), ('p_memsz', 'Q', 40), ('p_align', 'Q', 48)]
SHDR = [('sh_name', 'I', 0), ('sh_type', 'I', 4), ('sh_flags', 'Q', 8), ('sh_addr', 'Q', 16), ('sh_offset', 'Q', 24),
        ('sh_size', 'Q', 32), ('sh_link', 'I', 40), ('sh_info', 'I', 44), ('sh_addralign', 'Q', 48), ('sh_entsize', 'Q', 56)]
FSIZE = {'16s': 16, 'H': 2, 'I': 4, 'Q': 8}


class Img:
    """Minimal ELF64 little-endian reader: headers, sections, .dynsym, .rel.dyn, .dynamic."""

    def __init__(self, path):
        self.path = Path(path)
        b = self.b = self.path.read_bytes()
        assert b[:6] == b'\x7fELF\x02\x01', path
        self.eh = {n: struct.unpack_from('<' + f, b, o)[0] for n, f, o in EHDR}
        phoff, phnum, shoff, shnum = self.eh['e_phoff'], self.eh['e_phnum'], self.eh['e_shoff'], self.eh['e_shnum']
        self.ph = [{n: struct.unpack_from('<' + f, b, phoff + 56 * i + o)[0] for n, f, o in PHDR} for i in range(phnum)]
        self.sh = [{n: struct.unpack_from('<' + f, b, shoff + 64 * i + o)[0] for n, f, o in SHDR} for i in range(shnum)]
        ss = self.sh[self.eh['e_shstrndx']]
        names = b[ss['sh_offset']:ss['sh_offset'] + ss['sh_size']]
        for i, s in enumerate(self.sh):
            s['index'] = i
            s['name'] = names[s['sh_name']:].split(b'\0', 1)[0].decode()
        self.secs = {s['name']: s for s in self.sh if s['index']}
        end = max(64, phoff + 56 * phnum, shoff + 64 * shnum)
        for s in self.sh:
            if s['sh_type'] != 8:
                end = max(end, s['sh_offset'] + s['sh_size'])
        for p in self.ph:
            end = max(end, p['p_offset'] + p['p_filesz'])
        self.extent = end
        self.alloc = sorted((s['sh_addr'], s['sh_addr'] + s['sh_size'], s['name']) for s in self.sh
                            if s['index'] and s['sh_flags'] & 2 and s['sh_size'])
        self.dynsym = []
        if '.dynsym' in self.secs:
            s = self.secs['.dynsym']
            st = self.sh[s['sh_link']]
            strs = b[st['sh_offset']:st['sh_offset'] + st['sh_size']]
            for p in range(s['sh_offset'], s['sh_offset'] + s['sh_size'], 24):
                n, info, other, shndx, value, size = struct.unpack_from('<IBBHQQ', b, p)
                self.dynsym.append({'name': strs[n:].split(b'\0', 1)[0].decode(), 'st_name': n, 'info': info, 'other': other,
                                    'shndx': shndx, 'value': value, 'size': size})
        self.rel = []
        if '.rel.dyn' in self.secs:
            s = self.secs['.rel.dyn']
            for p in range(s['sh_offset'], s['sh_offset'] + s['sh_size'], 16):
                at, info = struct.unpack_from('<QQ', b, p)
                sym = info >> 32
                self.rel.append({'offset': at, 'type': info & 0xffffffff, 'sym': sym,
                                 'symbol': self.dynsym[sym]['name'] if sym < len(self.dynsym) else '?'})
        self.relat = {r['offset']: r for r in self.rel}
        self.dyn = []
        if '.dynamic' in self.secs:
            s = self.secs['.dynamic']
            for p in range(s['sh_offset'], s['sh_offset'] + s['sh_size'], 16):
                self.dyn.append(struct.unpack_from('<qQ', b, p))

    def region_of(self, addr):
        i = bisect.bisect_right(self.alloc, (addr, float('inf'), '')) - 1
        if i >= 0 and self.alloc[i][0] <= addr < self.alloc[i][1]:
            return self.alloc[i][2]
        return None

    def off(self, addr):
        s = self.secs[self.region_of(addr)]
        return s['sh_offset'] + addr - s['sh_addr']

    def regions(self):
        """file-offset regions tiling [0, extent): headers, sections, padding, section headers"""
        rs = [('ELF header', 0, 64), ('program headers', self.eh['e_phoff'], 56 * self.eh['e_phnum'])]
        for s in self.sh:
            if s['index'] and s['sh_type'] != 8 and s['sh_size']:
                rs.append((s['name'], s['sh_offset'], s['sh_size']))
        rs.append(('section headers', self.eh['e_shoff'], 64 * self.eh['e_shnum']))
        rs.sort(key=lambda r: (r[1], r[2]))
        out, pos = [], 0
        for name, o, n in rs:
            if o > pos:
                out.append(('padding before ' + name, pos, o - pos))
            assert o >= pos, ('overlapping regions', name)
            out.append((name, o, n))
            pos = o + n
        if pos < self.extent:
            out.append(('padding at end', pos, self.extent - pos))
        return out


def data_ptr(b, at):
    # SBPF v0 data relocation: the 32-bit target sits in the upper half of the u64
    return struct.unpack_from('<I', b, at + 4)[0]


def lddw_imm(b, at):
    return struct.unpack_from('<I', b, at + 4)[0] | (struct.unpack_from('<I', b, at + 12)[0] << 32)


def align_tokens(a, b):
    """Monotone alignment of two token sequences (git histogram diff; difflib fallback): [(i, j, n)]."""
    if a == b:
        return [(0, 0, len(a))] if a else []
    git = shutil.which('git')
    if git:
        with tempfile.TemporaryDirectory() as d:
            pa, pb = Path(d) / 'a', Path(d) / 'b'
            pa.write_text(''.join(t + '\n' for t in a))
            pb.write_text(''.join(t + '\n' for t in b))
            r = subprocess.run([git, 'diff', '--no-index', '--no-color', '--no-ext-diff', '-U0', '--diff-algorithm=histogram',
                                str(pa), str(pb)], capture_output=True, text=True)
            if r.returncode in (0, 1):
                blocks, i, j = [], 0, 0
                for m in re.finditer(r'^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@', r.stdout, re.M):
                    la, na, lb, nb = int(m.group(1)), int(m.group(2) or 1), int(m.group(3)), int(m.group(4) or 1)
                    sa = la - 1 if na else la
                    sb = lb - 1 if nb else lb
                    assert sa - i == sb - j and sa >= i, (sa, i, sb, j)
                    if sa > i:
                        blocks.append((i, j, sa - i))
                    i, j = sa + na, sb + nb
                assert len(a) - i == len(b) - j
                if len(a) > i:
                    blocks.append((i, j, len(a) - i))
                return blocks
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    return [tuple(x) for x in sm.get_matching_blocks() if x[2]]


class IntervalMap:
    """piecewise-linear candidate address -> original address map"""

    def __init__(self):
        self.iv = []
        self.starts = []
        self.cov, self.cov_starts = [], []

    def add(self, c_lo, n, o_lo):
        if n > 0:
            self.iv.append((c_lo, c_lo + n, o_lo))

    def freeze(self):
        self.iv.sort()
        self.starts = [x[0] for x in self.iv]
        self.cov = sorted((o, o + (hi - lo)) for lo, hi, o in self.iv)
        self.cov_starts = [x[0] for x in self.cov]
        return self

    def covers_original(self, o):
        i = bisect.bisect_right(self.cov_starts, o) - 1
        return i >= 0 and self.cov[i][0] <= o < self.cov[i][1]

    def __call__(self, c):
        i = bisect.bisect_right(self.starts, c) - 1
        if i >= 0:
            lo, hi, o = self.iv[i]
            if lo <= c < hi:
                return o + c - lo
        return None


class ElfDiff:
    def __init__(self, original, candidate, symbols=None, root=None):
        self.O, self.C = Img(original), Img(candidate)
        self.S = Img(symbols) if symbols else None
        self.root = root
        self.maps = {n: IntervalMap().freeze() for n in ('.text', '.rodata', '.data.rel.ro')}
        ext = self.O.extent
        self.names, self.ids = [], {}
        self.INPLACE = self.cid('in-place')
        # class id per original ELF byte; 255 = not yet classified
        self.cls = bytearray(b'\xff') * ext
        ob, cb = self.O.b, self.C.b
        n = min(ext, len(cb))
        same = 0
        for p in range(0, n, 4096):          # raw statistic only: equal at the same offset, coincidences included
            q = min(p + 4096, n)
            same += (q - p) if ob[p:q] == cb[p:q] else sum(1 for x, y in zip(ob[p:q], cb[p:q]) if x == y)
        self.same_offset_equal = same

    def cid(self, name):
        if name not in self.ids:
            self.ids[name] = len(self.names)
            self.names.append(name)
            assert len(self.names) < 255
        return self.ids[name]

    def mark(self, fo, n, name):
        """classify the still unclassified original bytes [fo, fo+n) as `name`"""
        k = self.cid(name)
        cl = self.cls
        for i in range(fo, min(fo + n, len(cl))):
            if cl[i] == 255:
                cl[i] = k

    def corr(self, fo, fc, n, eq_name, ne_name):
        """original bytes [fo, fo+n) correspond to candidate bytes [fc, fc+n):
        equal at the same offset -> in-place; equal elsewhere -> eq_name; different -> ne_name"""
        a, b = self.O.b[fo:fo + n], self.C.b[fc:fc + n]
        ke, kn = (self.INPLACE if fo == fc else self.cid(eq_name)), self.cid(ne_name)
        cl = self.cls
        if a == b:
            for i in range(fo, fo + n):
                if cl[i] == 255:
                    cl[i] = ke
            return
        for i, (x, y) in enumerate(zip(a, b)):
            if cl[fo + i] == 255:
                cl[fo + i] = ke if x == y else kn

    def amap(self, vc):
        m = self.maps.get(self.C.region_of(vc))
        return m(vc) if m else None

    # ---- .text windows (repository measurement semantics) ---------------------------------
    def text_windows(self):
        if not (self.S and self.root):
            return False
        sys.path.insert(0, str(self.root / 'repro/pump_amm/claim-self-transfer-v144/static-tool'))
        from elf_reader import Elf as RElf
        o, c, s = RElf(self.O.path), RElf(self.C.path), RElf(self.S.path)
        assert c.b[c.lo:c.hi] == s.b[s.lo:s.hi], 'symbols artifact does not match candidate text'
        self.ro, self.rc = o, c
        index = collections.defaultdict(list)
        self.funcs = sorted({f['start']: f for f in reversed(s.funcs)}.values(), key=lambda f: f['start'])
        for f in s.funcs:                                # exactly measure.py's index
            st, sz = f['start'], f['size']
            key = (sz, digest(c.normalized[st:st + sz]), json.dumps(c.pattern(st, sz), sort_keys=True))
            index[key].append({'start': st, 'name': f['name'], 'raw': digest(c.b[st:st + sz])})
        entries = sorted(set(o.entries) | {o.lo})
        rows = []
        for st, en in zip(entries, entries[1:] + [o.hi]):
            m = index[(en - st, digest(o.normalized[st:en]), json.dumps(o.pattern(st, en - st), sort_keys=True))]
            raw = digest(o.b[st:en])
            rows.append({'start': st, 'end': en, 'matches': m, 'raw_match': any(x['raw'] == raw for x in m), 'rawd': raw})
        used, assign = set(), {}
        for k, r in enumerate(rows):                     # 1: a body at the same address
            for x in r['matches']:
                if x['start'] == r['start'] and x['start'] not in used:
                    assign[k] = x
                    used.add(x['start'])
        for want_raw in (True, False):                   # 2: nearest unused raw-equal, 3: nearest unused normalized
            for k, r in enumerate(rows):
                if k in assign:
                    continue
                cands = [x for x in r['matches'] if x['start'] not in used and (not want_raw or x['raw'] == r['rawd'])]
                if cands:
                    x = min(cands, key=lambda x: abs(x['start'] - r['start']))
                    assign[k] = x
                    used.add(x['start'])
        for k, r in enumerate(rows):                     # 4: every body already taken: shared copy
            if k not in assign and r['matches']:
                x = min(r['matches'], key=lambda x: (x['raw'] != r['rawd'], abs(x['start'] - r['start'])))
                assign[k] = dict(x, shared=True)
        tmap = IntervalMap()
        for k, x in assign.items():
            if not x.get('shared'):
                tmap.add(x['start'], rows[k]['end'] - rows[k]['start'], rows[k]['start'])
        self.maps['.text'] = tmap.freeze()
        self.rows, self.assign = rows, assign
        self.win_at = {r['start']: k for k, r in enumerate(rows)}
        return True

    def target_class(self, vo, vc):
        """relation of a candidate operand target vc to the original target vo"""
        if self.amap(vc) == vo:
            return 'equivalent'
        n = self.O.region_of(vo)
        if n == '.text' and hasattr(self, 'win_at'):
            k = self.win_at.get(vo)
            if k is not None:
                if not self.rows[k]['matches']:
                    return 'target-not-reproduced'          # callee window unmatched
                if any(x['start'] == vc for x in self.rows[k]['matches']):
                    return 'equivalent'                     # an identical copy of the original target body
        m = self.maps.get(n)
        if m is not None and n != '.text' and not m.covers_original(vo):
            return 'target-not-reproduced'                  # target data bytes have no candidate counterpart
        return 'different-target'

    def slot_label(self, a_o, a_c):
        o, c, O, C = self.ro, self.rc, self.O, self.C
        if a_o in o.calls and a_c in c.calls:
            return 'call:' + self.target_class(o.calls[a_o], c.calls[a_c])
        if O.b[O.off(a_o)] == 0x18 and a_o in O.relat and O.relat[a_o]['type'] == 8:
            vo, vc = lddw_imm(O.b, O.off(a_o)), lddw_imm(C.b, C.off(a_c))
            return 'lddw:%s:%s' % (O.region_of(vo) or 'none', self.target_class(vo, vc))
        if a_o in O.relat and O.relat[a_o]['type'] == 10:
            return 'syscall'
        return 'other'

    def text_classify(self):
        O, C = self.O, self.C
        rows_out, status, status_bytes, slots = [], collections.Counter(), collections.Counter(), collections.Counter()
        for k, r in enumerate(self.rows):
            st, en = r['start'], r['end']
            size, fo = en - st, O.off(st)
            ob = O.b[fo:fo + size]
            x = self.assign.get(k)
            if x is None:
                stt = 'unmatched'
            elif x['start'] == st and ob == C.b[C.off(st):C.off(st) + size]:
                stt = 'in-place'
            elif r['raw_match']:
                stt = 'raw-equal-displaced'
            else:
                stt = 'normalized'
            status[stt] += 1
            status_bytes[stt] += size
            row = {'start': hex(st), 'size': size, 'status': stt}
            if stt == 'unmatched':
                self.mark(fo, size, 'text:unmatched-window')
            else:
                p = x['start']
                fc = C.off(p)
                cb = C.b[fc:fc + size]
                row['body'] = {'start': hex(p), 'name': x['name'], 'shared': bool(x.get('shared'))}
                labels = collections.Counter()
                for kk in range(0, size, 8):
                    so, sc = ob[kk:kk + 8], cb[kk:kk + 8]
                    lab = 'same'
                    if so != sc:
                        a_o, a_c = st + kk, p + kk
                        if kk >= 8 and ob[kk - 8] == 0x18 and (a_o - 8) in O.relat:
                            lab = self.slot_label(a_o - 8, a_c - 8)     # second half of a relocated lddw
                        else:
                            lab = self.slot_label(a_o, a_c)
                            labels[lab] += 1
                    self.corr(fo + kk, fc + kk, 8, 'text:displaced-equal', 'text:operand:' + lab)
                if labels:
                    row['slots'] = dict(labels)
                for lab, n in labels.items():
                    slots[lab] += n
            rows_out.append(row)
        used = {x['start'] for x in self.assign.values()}
        conly = [f for f in self.funcs if f['start'] not in used]
        by_crate = collections.Counter()
        for f in conly:
            by_crate[crate_of(f['name'])] += f['size']
        ctext, otext = C.secs['.text']['sh_size'], O.secs['.text']['sh_size']
        covered = sum(f['size'] for f in self.funcs)
        shared_bytes = sum(self.rows[k]['end'] - self.rows[k]['start'] for k, x in self.assign.items() if x.get('shared'))
        return {
            'windows': len(self.rows),
            'raw_matches': sum(r['raw_match'] for r in self.rows),
            'normalized_matches': sum(bool(r['matches']) for r in self.rows),
            'unmatched': sum(not r['matches'] for r in self.rows),
            'raw_matched_original_bytes': sum(r['end'] - r['start'] for r in self.rows if r['raw_match']),
            'normalized_matched_original_bytes': sum(r['end'] - r['start'] for r in self.rows if r['matches']),
            'status_windows': dict(status), 'status_bytes': dict(status_bytes),
            'windows_sharing_a_body': sum(1 for x in self.assign.values() if x.get('shared')),
            'differing_slots': dict(slots.most_common()),
            'candidate_only': {'functions': len(conly), 'bytes': sum(f['size'] for f in conly),
                               'by_crate': dict(by_crate.most_common()),
                               'largest': [{'size': f['size'], 'name': f['name'], 'start': hex(f['start'])}
                                           for f in sorted(conly, key=lambda f: -f['size'])[:40]]},
            'candidate_text_bytes_outside_function_symbols': ctext - covered,
            'size_budget': {'original_text': otext, 'candidate_text': ctext, 'delta': ctext - otext,
                            'original_unmatched_window_bytes': status_bytes['unmatched'],
                            'candidate_only_function_bytes': sum(f['size'] for f in conly),
                            'shared_body_window_bytes': shared_bytes,
                            'identity': 'delta = candidate_only + outside_symbols - unmatched - shared'},
            'window_rows': rows_out,
        }

    # ---- readonly data -----------------------------------------------------------------
    def rodata(self):
        O, C = self.O, self.C
        so, sc = O.secs['.rodata'], C.secs['.rodata']
        a = O.b[so['sh_offset']:so['sh_offset'] + so['sh_size']]
        b = C.b[sc['sh_offset']:sc['sh_offset'] + sc['sh_size']]
        blocks = align_tokens(['%02x' % x for x in a], ['%02x' % x for x in b])
        m = IntervalMap()
        for i, j, n in blocks:
            m.add(sc['sh_addr'] + j, n, so['sh_addr'] + i)
        self.maps['.rodata'] = m.freeze()
        self.ro_blocks = blocks
        matched = sum(n for _, _, n in blocks)
        gaps, i0, j0 = [], 0, 0
        for i, j, n in blocks + [(len(a), len(b), 0)]:
            if i > i0 or j > j0:
                gaps.append({'original_offset': i0, 'original_bytes': i - i0, 'candidate_offset': j0, 'candidate_bytes': j - j0,
                             'original_preview': preview(a[i0:i]), 'candidate_preview': preview(b[j0:j])})
            i0, j0 = i + n, j + n
        same_rel = sum(n for i, j, n in blocks if i == j)
        return {'aligned_bytes': matched, 'aligned_at_same_section_offset': same_rel,
                'original_only_bytes': len(a) - matched, 'candidate_only_bytes': len(b) - matched,
                'hunks': len(gaps), 'largest_hunks': sorted(gaps, key=lambda g: -(g['original_bytes'] + g['candidate_bytes']))[:30]}

    def rodata_classify(self):
        so, sc = self.O.secs['.rodata'], self.C.secs['.rodata']
        for i, j, n in self.ro_blocks:
            self.corr(so['sh_offset'] + i, sc['sh_offset'] + j, n, 'rodata:displaced-equal', 'rodata:BUG')
        self.mark(so['sh_offset'], so['sh_size'], 'rodata:original-only')

    def data_tokens(self, img, mapper):
        s = img.secs['.data.rel.ro']
        lo, n, off = s['sh_addr'], s['sh_size'], s['sh_offset']
        toks, kinds = [], []
        for k in range(0, n - n % 8, 8):
            at = lo + k
            inner = any(r in img.relat for r in range(at + 1, at + 8))
            if at in img.relat and img.relat[at]['type'] == 8 and not inner:
                v = data_ptr(img.b, off + k)
                t = mapper(v)
                toks.append('P' + (('%x' % t) if t is not None else ('?%x' % v)) + ':' + img.b[off + k:off + k + 4].hex())
                kinds.append('P')
            else:
                toks.append('D' + img.b[off + k:off + k + 8].hex())
                kinds.append('D')
        if n % 8:
            toks.append('T' + img.b[off + n - n % 8:off + n].hex())
            kinds.append('D')
        return toks, kinds

    def datarelro(self):
        O, C = self.O, self.C
        so, sc = O.secs['.data.rel.ro'], C.secs['.data.rel.ro']
        for _ in range(3):          # pointers into .data.rel.ro itself need the map of the previous pass
            to, ko = self.data_tokens(O, lambda v: v)
            tc, kc = self.data_tokens(C, self.amap)
            blocks = align_tokens(to, tc)
            m = IntervalMap()
            for i, j, n in blocks:
                m.add(sc['sh_addr'] + 8 * j, 8 * n, so['sh_addr'] + 8 * i)
            self.maps['.data.rel.ro'] = m.freeze()
        self.dr = (to, ko, tc, kc, blocks)
        cls, examples = collections.Counter(), []
        i0 = j0 = 0
        self.dr_word_class = {}
        for i, j, n in blocks + [(len(to), len(tc), 0)]:
            da, db = i - i0, j - j0
            if da or db:
                for q in range(da):
                    if q < db:
                        a, b = ko[i0 + q], kc[j0 + q]
                        if a == b == 'P':
                            vo = data_ptr(O.b, so['sh_offset'] + 8 * (i0 + q))
                            vc = data_ptr(C.b, sc['sh_offset'] + 8 * (j0 + q))
                            c = 'pointer-' + self.target_class(vo, vc)
                        else:
                            c = 'different-content' if a == b == 'D' else 'pointer-vs-data'
                    else:
                        c = 'original-only'
                    self.dr_word_class[i0 + q] = c
                    cls[c] += 8
                cls['candidate-only'] += 8 * max(0, db - da)
                if len(examples) < 25:
                    examples.append({'original_offset': 8 * i0, 'original_words': da, 'candidate_offset': 8 * j0, 'candidate_words': db})
            i0, j0 = i + n, j + n
        return {'words': [len(to), len(tc)], 'aligned_words': sum(n for _, _, n in blocks),
                'aligned_words_at_same_section_offset': sum(n for i, j, n in blocks if i == j),
                'original_pointer_words': ko.count('P'), 'candidate_pointer_words': kc.count('P'),
                'unaligned_word_bytes': dict(cls), 'hunk_examples': examples}

    def datarelro_classify(self):
        so, sc = self.O.secs['.data.rel.ro'], self.C.secs['.data.rel.ro']
        to, ko, tc, kc, blocks = self.dr
        for i, j, n in blocks:
            self.corr(so['sh_offset'] + 8 * i, sc['sh_offset'] + 8 * j, 8 * n, 'data:displaced-equal', 'data:pointer-equivalent')
        for w, c in self.dr_word_class.items():
            self.mark(so['sh_offset'] + 8 * w, 8, 'data:' + c)
        self.mark(so['sh_offset'], so['sh_size'], 'data:unclassified')

    # ---- structures ------------------------------------------------------------------------
    def sec_start_equiv(self, vo, vc):
        so = {s['sh_addr']: s['name'] for s in self.O.sh if s['index'] and s['sh_flags'] & 2}
        sc = {s['sh_addr']: s['name'] for s in self.C.sh if s['index'] and s['sh_flags'] & 2}
        return so.get(vo) is not None and so.get(vo) == sc.get(vc)

    def headers(self):
        O, C = self.O, self.C
        eh, ph, sh = [], [], []
        for n, f, off in EHDR:
            a, b = O.eh[n], C.eh[n]
            eq = a != b and n == 'e_entry' and self.maps['.text'](b) == a
            if a != b:
                eh.append({'field': n, 'original': fmt(a), 'candidate': fmt(b), 'equivalent': bool(eq)})
            self.corr(off, off, FSIZE[f], 'structural:displaced-equal',
                      'structural:' + ('address-equivalent' if eq else 'layout-consequence'))
        for k, (p, q) in enumerate(zip(O.ph, C.ph)):
            for n, f, off in PHDR:
                eq = p[n] != q[n] and n in ('p_offset', 'p_vaddr', 'p_paddr') and self.sec_start_equiv(p['p_vaddr'], q['p_vaddr'])
                if p[n] != q[n]:
                    ph.append({'phdr': k, 'field': n, 'original': fmt(p[n]), 'candidate': fmt(q[n]), 'equivalent': bool(eq)})
                fo = O.eh['e_phoff'] + 56 * k + off
                fc = C.eh['e_phoff'] + 56 * k + off
                self.corr(fo, fc, FSIZE[f], 'structural:displaced-equal',
                          'structural:' + ('address-equivalent' if eq else 'layout-consequence'))
        cs = {s['name']: s for s in C.sh}
        for s in O.sh:
            t = cs.get(s['name'])
            fo = O.eh['e_shoff'] + 64 * s['index']
            if t is None:
                sh.append({'section': s['name'], 'field': 'missing in candidate'})
                self.mark(fo, 64, 'structural:missing-section')
                continue
            fc = C.eh['e_shoff'] + 64 * t['index']
            for n, f, off in SHDR:
                eq = s[n] != t[n] and (n == 'sh_addr' and self.sec_start_equiv(s[n], t[n]) or
                                       n == 'sh_offset' and s['sh_addr'] != 0 and self.sec_start_equiv(s['sh_addr'], t['sh_addr']))
                if s[n] != t[n]:
                    sh.append({'section': s['name'] or '(null)', 'field': n, 'original': fmt(s[n]), 'candidate': fmt(t[n])})
                self.corr(fo + off, fc + off, FSIZE[f], 'structural:displaced-equal',
                          'structural:' + ('address-equivalent' if eq else 'layout-consequence'))
        for name in ('.shstrtab', '.dynstr'):
            if name in O.secs and name in C.secs:
                a, b = O.secs[name], C.secs[name]
                self.corr(a['sh_offset'], b['sh_offset'], min(a['sh_size'], b['sh_size']), 'structural:displaced-equal',
                          'structural:%s-differs' % name)
        for name, off, size in O.regions():
            if name.startswith('padding'):
                self.corr(off, off, size, 'structural:displaced-equal', 'structural:padding-differs')
        extra = [s['name'] for s in C.sh if s['name'] not in {x['name'] for x in O.sh}]
        return {'elf_header': eh, 'program_headers': ph, 'section_headers': sh, 'candidate_only_sections': extra,
                'phnum': [O.eh['e_phnum'], C.eh['e_phnum']], 'shnum': [O.eh['e_shnum'], C.eh['e_shnum']]}

    def dynamic(self):
        O, C = self.O, self.C
        rows = []
        bo, bc = O.secs['.dynamic']['sh_offset'], C.secs['.dynamic']['sh_offset']
        for k in range(max(len(O.dyn), len(C.dyn))):
            a = O.dyn[k] if k < len(O.dyn) else None
            b = C.dyn[k] if k < len(C.dyn) else None
            eq = bool(a and b and a != b and a[0] == b[0] and a[0] in DT_ADDR and a[1] == O.secs[DT_ADDR[a[0]]]['sh_addr']
                      and b[1] == C.secs[DT_ADDR[b[0]]]['sh_addr'])
            if a != b:
                rows.append({'index': k, 'original': a and [DT.get(a[0], a[0]), fmt(a[1])],
                             'candidate': b and [DT.get(b[0], b[0]), fmt(b[1])], 'equivalent': eq})
            if a and b:
                self.corr(bo + 16 * k, bc + 16 * k, 16, 'structural:displaced-equal',
                          'structural:' + ('address-equivalent' if eq else 'layout-consequence'))
        return rows

    def dynsym(self):
        O, C = self.O, self.C
        on, cn = [s['name'] for s in O.dynsym], [s['name'] for s in C.dynsym]
        rows = []
        cby = {s['name']: (k, s) for k, s in enumerate(C.dynsym)}
        bo, bc = O.secs['.dynsym']['sh_offset'], C.secs['.dynsym']['sh_offset']
        for k, s in enumerate(O.dynsym):
            kt, t = cby.get(s['name'], (None, None))
            if t is None:
                rows.append({'name': s['name'], 'status': 'missing in candidate'})
                continue
            diffs = {f: [fmt(s[f]), fmt(t[f])] for f in ('info', 'other', 'shndx', 'size', 'st_name') if s[f] != t[f]}
            if s['value'] != t['value']:
                eq = self.maps['.text'](t['value']) == s['value']
                diffs['value'] = [fmt(s['value']), fmt(t['value']), 'equivalent' if eq else 'different']
            if diffs:
                rows.append({'name': s['name'], 'diffs': diffs})
            only_value_eq = set(diffs) == {'value'} and diffs['value'][2] == 'equivalent'
            self.corr(bo + 24 * k, bc + 24 * kt, 24, 'structural:displaced-equal',
                      'structural:' + ('address-equivalent' if only_value_eq else 'symbol-differs'))
        so, sc = O.secs['.dynstr'], C.secs['.dynstr']
        return {'same_names_same_order': on == cn, 'original_only': sorted(set(on) - set(cn)), 'candidate_only': sorted(set(cn) - set(on)),
                'symbol_diffs': rows,
                'dynstr_equal': O.b[so['sh_offset']:so['sh_offset'] + so['sh_size']] == C.b[sc['sh_offset']:sc['sh_offset'] + sc['sh_size']]}

    def reldyn(self):
        O, C = self.O, self.C
        to = ['%d:%s:%x' % (r['type'], r['symbol'], r['offset']) for r in O.rel]
        tc = []
        for r in C.rel:
            m = self.amap(r['offset'])
            tc.append('%d:%s:%s' % (r['type'], r['symbol'], ('%x' % m) if m is not None else '?c%x' % r['offset']))
        blocks = align_tokens(to, tc)
        bo, bc = O.secs['.rel.dyn']['sh_offset'], C.secs['.rel.dyn']['sh_offset']
        for i, j, n in blocks:
            self.corr(bo + 16 * i, bc + 16 * j, 16 * n, 'reldyn:displaced-equal', 'reldyn:offset-equivalent')
        self.mark(bo, 16 * len(O.rel), 'reldyn:original-only')
        matched = sum(n for _, _, n in blocks)
        reg = lambda img, rs: dict(collections.Counter('%s/%d' % (img.region_of(r['offset']), r['type']) for r in rs))
        return {'entries': [len(O.rel), len(C.rel)], 'aligned_equivalent_entries': matched,
                'equivalent_entries_any_order': sum((collections.Counter(to) & collections.Counter(tc)).values()),
                'original_only_entries': len(to) - matched, 'candidate_only_entries': len(tc) - matched,
                'by_region_type': {'original': reg(O, O.rel), 'candidate': reg(C, C.rel)},
                'relative_relocations': [sum(r['type'] == 8 for r in O.rel), sum(r['type'] == 8 for r in C.rel)]}

    def locations(self):
        def recs(img):
            s = img.secs['.data.rel.ro']
            lo, off, n = s['sh_addr'], s['sh_offset'], s['sh_size']
            out = []
            for k in range(0, n - 23, 8):
                at = lo + k
                if at not in img.relat or (at + 8) in img.relat or (at + 16) in img.relat:
                    continue
                ln, line, col = struct.unpack_from('<QII', img.b, off + k + 8)
                if not (0 < ln < 256 and 0 < line < 100000 and col < 1000):
                    continue
                p = data_ptr(img.b, off + k)
                if img.region_of(p) != '.rodata':
                    continue
                name = img.b[img.off(p):img.off(p) + ln]
                if name.endswith(b'.rs'):
                    out.append((name.decode(errors='replace'), line, col))
            return out
        ro, rc = recs(self.O), recs(self.C)
        co, cc = collections.Counter(ro), collections.Counter(rc)
        oonly, conly = co - cc, cc - co
        byfile = collections.defaultdict(lambda: [[], []])
        for (f, l, c), n in oonly.items():
            byfile[f][0] += [(l, c)] * n
        for (f, l, c), n in conly.items():
            byfile[f][1] += [(l, c)] * n
        files = []
        for f, (a, b) in sorted(byfile.items()):
            deltas = collections.Counter()
            if a and b:
                for l, c in a:
                    best = min(b, key=lambda x: (abs(x[0] - l), abs(x[1] - c)))
                    deltas['%+d' % (l - best[0])] += 1
            files.append({'file': f, 'original_only': len(a), 'candidate_only': len(b),
                          'original_minus_nearest_candidate_line': dict(deltas.most_common(5)),
                          'original_only_records': ['%d:%d' % x for x in sorted(a)][:40],
                          'candidate_only_records': ['%d:%d' % x for x in sorted(b)][:40]})
        return {'records': [len(ro), len(rc)], 'common': sum((co & cc).values()), 'original_only': sum(oonly.values()),
                'candidate_only': sum(conly.values()), 'files': files}

    # ---- driver ------------------------------------------------------------------------------
    def run(self):
        O, C = self.O, self.C
        have_text = self.text_windows()
        ro = self.rodata()
        dr = self.datarelro()
        tr = self.text_classify() if have_text else None
        if not have_text:
            self.mark(O.secs['.text']['sh_offset'], O.secs['.text']['sh_size'], 'text:not-classified (no --symbols)')
        self.rodata_classify()
        self.datarelro_classify()
        hd = self.headers()
        dy = self.dynamic()
        ds = self.dynsym()
        rd = self.reldyn()
        for name, off, size in O.regions():
            self.mark(off, size, 'structural:%s:not-reproduced' % ('padding' if name.startswith('padding') else name))
        assert 255 not in self.cls
        counts = collections.Counter(self.cls)
        by_class = {self.names[k]: v for k, v in counts.items()}
        regs = []
        cr = {n: (s['sh_offset'], s['sh_size']) for n, s in C.secs.items()}
        for name, off, size in O.regions():
            c = collections.Counter(self.cls[off:off + size])
            co = cr.get(name)
            regs.append({'region': name, 'original': [off, size], 'candidate': list(co) if co else None,
                         'size_delta': (co[1] - size) if co else None,
                         'classes': {self.names[k]: v for k, v in sorted(c.items(), key=lambda kv: -kv[1])}})
        good = lambda k: k == 'in-place' or 'displaced-equal' in k or k.endswith('equivalent')
        equivalent = sum(v for k, v in by_class.items() if good(k))
        cand_only = (tr['candidate_only']['bytes'] if tr else 0) + ro['candidate_only_bytes'] + \
            dr['unaligned_word_bytes'].get('candidate-only', 0) + 16 * rd['candidate_only_entries']
        ext = O.extent
        rep = {
            'scope': 'whole-ELF byte accounting of the original ELF extent; every original byte has exactly one class',
            'tool_sha256': digest(Path(__file__).read_bytes()),
            'original': {'path': str(O.path), 'sha256': digest(O.b), 'elf_sha256': digest(O.b[:ext]), 'elf_extent': ext,
                         'file_bytes': len(O.b), 'zero_suffix_bytes': len(O.b) - ext, 'zero_suffix_all_zero': not any(O.b[ext:])},
            'candidate': {'path': str(C.path), 'sha256': digest(C.b), 'elf_extent': C.extent, 'file_bytes': len(C.b)},
            'identity': {
                'complete_elf_equal': O.b[:ext] == C.b,
                'padded_capture_equal': len(C.b) <= len(O.b) and O.b == C.b + bytes(len(O.b) - len(C.b)),
                'first_difference': next((i for i, (x, y) in enumerate(zip(O.b[:ext], C.b)) if x != y),
                                         None if len(C.b) == ext else min(ext, len(C.b))),
                'elf_extent_delta': C.extent - ext,
                'in_place_bytes': by_class.get('in-place', 0),
                'in_place_fraction': round(by_class.get('in-place', 0) / ext, 6),
                'reproduced_modulo_layout_bytes': equivalent,
                'reproduced_modulo_layout_fraction': round(equivalent / ext, 6),
                'not_reproduced_original_bytes': ext - equivalent,
                'candidate_only_bytes': cand_only,
                'same_offset_equal_bytes_including_coincidences': self.same_offset_equal,
            },
            'by_class': dict(sorted(by_class.items(), key=lambda kv: -kv[1])),
            'regions': regs,
            'text': {k: v for k, v in (tr or {}).items() if k != 'window_rows'},
            'rodata': ro, 'data_rel_ro': dr, 'headers': hd, 'dynamic': dy, 'dynsym': ds, 'rel_dyn': rd,
            'locations': self.locations(),
            'text_windows': tr['window_rows'] if tr else None,
        }
        assert sum(by_class.values()) == ext
        return rep


def crate_of(name):
    """first crate-like path component of a legacy-mangled symbol (impl blocks: the Self type's crate)"""
    if name.startswith('_ZN'):
        m = re.match(r'_ZN(\d+)', name)
        if m:
            n = int(m.group(1))
            s = name[3 + len(m.group(1)):3 + len(m.group(1)) + n]
            s = re.sub(r'^_?(\$LT\$|\$RF\$|\$u5b\$|\$BP\$|\$u20\$|mut\$u20\$|dyn\$u20\$)+', '', s)
            return re.split(r'\.\.|\$', s, maxsplit=1)[0] or s
    if name.startswith('_R'):
        return '(v0-mangled)'
    return '(unmangled)'


def preview(b, n=48):
    s = ''.join(chr(x) if 32 <= x < 127 else '.' for x in b[:n])
    return s + ('...' if len(b) > n else '')


def fmt(v):
    if isinstance(v, bytes):
        return v.hex()
    return hex(v) if isinstance(v, int) and v > 9 else v


def markdown(rep):
    idn, o, c = rep['identity'], rep['original'], rep['candidate']
    L = ['# Whole-ELF diff', '',
         'original ELF `%s...` (extent %s B; capture adds %s zero allocation bytes); candidate `%s...` (%s B)' % (
             o['elf_sha256'][:16], f"{o['elf_extent']:,}", f"{o['zero_suffix_bytes']:,}", c['sha256'][:16], f"{c['file_bytes']:,}"),
         '', '| measure | value |', '| --- | ---: |',
         '| complete ELF equal | %s |' % idn['complete_elf_equal'],
         '| first differing offset | %s |' % (hex(idn['first_difference']) if idn['first_difference'] is not None else '-'),
         '| ELF extent delta (candidate - original) | %+d |' % idn['elf_extent_delta'],
         '| original bytes in place (corresponding and equal at the same offset) | %s (%.2f%%) |' % (
             f"{idn['in_place_bytes']:,}", 100 * idn['in_place_fraction']),
         '| (raw statistic: bytes equal at the same offset, coincidences included) | %s |' % (
             f"{idn['same_offset_equal_bytes_including_coincidences']:,}"),
         '| original bytes reproduced modulo layout | %s (%.2f%%) |' % (
             f"{idn['reproduced_modulo_layout_bytes']:,}", 100 * idn['reproduced_modulo_layout_fraction']),
         '| original bytes not reproduced | %s |' % f"{idn['not_reproduced_original_bytes']:,}",
         '| candidate-only bytes (functions, .rodata, .data.rel.ro, .rel.dyn) | %s |' % f"{idn['candidate_only_bytes']:,}"]
    t = rep.get('text') or {}
    if t.get('windows'):
        L.append('| windows normalized / raw / unmatched (repo measure) | %d / %d / %d of %d |' % (
            t['normalized_matches'], t['raw_matches'], t['unmatched'], t['windows']))
        L.append('| windows equal in place | %d |' % t['status_windows'].get('in-place', 0))
    L += ['', '## Byte classes (original ELF extent)', '', '| class | bytes |', '| --- | ---: |']
    for k, v in rep['by_class'].items():
        L.append('| %s | %s |' % (k, f'{v:,}'))
    L += ['', '## Regions', '', '| region | original off+size | candidate off+size | size delta | classes (bytes) |',
          '| --- | --- | --- | ---: | --- |']
    for r in rep['regions']:
        cl = ', '.join('%s %s' % (k, f'{v:,}') for k, v in r['classes'].items())
        L.append('| %s | %s+%s | %s | %s | %s |' % (
            r['region'], hex(r['original'][0]), f"{r['original'][1]:,}",
            ('%s+%s' % (hex(r['candidate'][0]), f"{r['candidate'][1]:,}")) if r['candidate'] else '-',
            ('%+d' % r['size_delta']) if r['size_delta'] is not None else '-', cl))
    if t.get('windows'):
        sb = t['size_budget']
        L += ['', '## .text', '',
              'window status (count / original bytes): ' + ', '.join(
                  '%s %d / %s' % (k, t['status_windows'][k], f"{t['status_bytes'][k]:,}") for k in t['status_windows']), '',
              'differing instruction slots in matched windows: ' + ', '.join('%s %d' % kv for kv in t['differing_slots'].items()), '',
              'size budget: candidate .text %s - original %s = %+d = candidate-only functions %s + bytes outside symbols %d '
              '- original unmatched windows %s - windows sharing one body %s' % (
                  f"{sb['candidate_text']:,}", f"{sb['original_text']:,}", sb['delta'], f"{sb['candidate_only_function_bytes']:,}",
                  t['candidate_text_bytes_outside_function_symbols'], f"{sb['original_unmatched_window_bytes']:,}",
                  f"{sb['shared_body_window_bytes']:,}"), '',
              'candidate-only text by crate: ' + ', '.join('%s %s' % (k, f'{v:,}') for k, v in list(t['candidate_only']['by_crate'].items())[:12])]
    ro, dr, lo = rep['rodata'], rep['data_rel_ro'], rep['locations']
    L += ['', '## .rodata / .data.rel.ro', '',
          '.rodata: aligned %s B, original-only %s B, candidate-only %s B in %d hunks' % (
              f"{ro['aligned_bytes']:,}", f"{ro['original_only_bytes']:,}", f"{ro['candidate_only_bytes']:,}", ro['hunks']), '',
          '.data.rel.ro: words %d / %d, aligned with pointer targets mapped %d; unaligned bytes %s' % (
              dr['words'][0], dr['words'][1], dr['aligned_words'], json.dumps(dr['unaligned_word_bytes'])), '',
          'panic Location records: original %d, candidate %d, common %d, original-only %d, candidate-only %d' % (
              lo['records'][0], lo['records'][1], lo['common'], lo['original_only'], lo['candidate_only']), '',
          '| file | original-only | candidate-only | original minus nearest candidate line |', '| --- | ---: | ---: | --- |']
    for f in lo['files']:
        L.append('| %s | %d | %d | %s |' % (f['file'], f['original_only'], f['candidate_only'],
                                           ', '.join('%s x%d' % kv for kv in f['original_minus_nearest_candidate_line'].items())))
    rd, ds, h = rep['rel_dyn'], rep['dynsym'], rep['headers']
    L += ['', '## Dynamic structures and headers', '',
          '.rel.dyn: entries %d / %d; aligned equivalent %d; original-only %d; candidate-only %d; relative %s' % (
              rd['entries'][0], rd['entries'][1], rd['aligned_equivalent_entries'], rd['original_only_entries'],
              rd['candidate_only_entries'], rd['relative_relocations']), '',
          '.dynsym: same names in same order %s; .dynstr equal %s; differing symbols %s' % (
              ds['same_names_same_order'], ds['dynstr_equal'], json.dumps(ds['symbol_diffs'])), '',
          '.dynamic differing entries: ' + json.dumps(rep['dynamic']), '',
          'ELF header: ' + json.dumps(h['elf_header']), '',
          'program headers: ' + json.dumps(h['program_headers']), '',
          'section headers: %d differing fields %s; candidate-only sections %s' % (
              len(h['section_headers']), json.dumps(sorted({x['field'] for x in h['section_headers']})), h['candidate_only_sections'])]
    return '\n'.join(L) + '\n'


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--original', type=Path)
    ap.add_argument('--candidate', type=Path, required=True, help='stripped candidate (as deployed)')
    ap.add_argument('--symbols', type=Path, help='unstripped candidate (function symbols for window matching)')
    ap.add_argument('--root', type=Path, help='repository root (default: search from cwd and this file)')
    ap.add_argument('--output', type=Path, required=True)
    ap.add_argument('--markdown', type=Path)
    a = ap.parse_args()
    root = a.root or find_root([Path.cwd(), Path(__file__).resolve().parent])
    orig = a.original or (root / 'evidence/original/pump_amm/deployed.so')
    rep = ElfDiff(orig, a.candidate, a.symbols, root).run()
    a.output.write_text(json.dumps(rep, indent=1) + '\n')
    md = markdown(rep)
    if a.markdown:
        a.markdown.write_text(md)
    print(md)


if __name__ == '__main__':
    main()
