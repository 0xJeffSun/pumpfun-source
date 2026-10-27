#!/usr/bin/env python3
"""Source-agnostic text-order generator for PumpSwap candidates.

Inputs (all from an ordinary default-layout build of *any* AMM checkpoint):
  * the original program            evidence/original/pump_amm/deployed.so
  * the candidate symbol artifact   (unstripped .so)
  * the linker map of that build    (rust-lld -Map output)
  * the SDK default linker script   (captured by link-wrapper.sh)

Output: an order plan that walks the original function windows in address
order and names, for each, the candidate input section believed to correspond
to it, plus a linker script that differs from the SDK script only in the list of
qualified `.text` input-section selectors. Candidate sections without an
original counterpart follow in their default order. No instruction, address or
byte from the original is passed to the compiler or linker; the script contains
only object/archive-member and section names.

Correspondence evidence, strongest first:
  normalized-unique    the window has exactly one normalized-equal candidate
                       body and that body is normalized-equal to no other window
  normalized-graph     one of several normalized-equal bodies, chosen by
                       consistency of direct-call and code-pointer targets with
                       already-placed pairs
  call-graph           no normalized-equal body; chosen by the call / code
                       pointer operands of already-placed callers that target
                       this window (and callee agreement), never a body that is
                       normalized-equal to some other window
Identities other than normalized-unique remain hypotheses; they are ordering
inputs, not provenance claims.
"""
import argparse, collections, hashlib, json, re, struct, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent


def find_root(start):
    for p in [start, *start.parents]:
        if (p / 'evidence/original/pump_amm/deployed.so').is_file() and (p / 'repro/pump_amm/claim-self-transfer-v144/static-tool/elf_reader.py').is_file():
            return p
    return None   # packet copied outside the repository: the caller supplies the reader path and ROOT


ROOT = find_root(HERE)
if ROOT is not None:
    sys.path.insert(0, str(ROOT / 'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf  # noqa: E402  (the measurement tool's own reader)


def digest(b):
    return hashlib.sha256(b).hexdigest()


def parse_map(path):
    """Return .text input sections in output order: dict(vma,size,owner,section,symbols)."""
    rows, sec = [], None
    for ln in Path(path).read_text().split('\n')[1:]:
        m = re.match(r'\s*([0-9a-f]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+(\d+) (.*)$', ln)
        if not m:
            continue
        vma, _, size, _, rest = m.groups()
        ind = len(rest) - len(rest.lstrip(' '))
        if ind == 0:
            sec = rest.strip()
            continue
        if sec != '.text':
            continue
        if ind == 8:
            owner, section = re.match(r'(.*):\((.*)\)$', rest.strip()).groups()
            rows.append({'vma': int(vma, 16), 'size': int(size, 16), 'owner': owner, 'section': section, 'symbols': []})
        elif ind == 16:
            name = rest.strip()
            if name and not re.match(r'LBB\d+_\d+$', name):
                rows[-1]['symbols'].append(name)
    return rows


def selector_owner(owner):
    """Qualified file pattern for a map owner: object basename or archive basename:member."""
    m = re.match(r'(.*)\((.*)\)$', owner)
    if m:
        return '*' + m.group(1).rsplit('/', 1)[-1] + ':' + m.group(2)
    return '*' + owner.rsplit('/', 1)[-1]


def windows_of(o):
    entries = sorted(set(o.entries) | {o.lo})
    return [(s, e) for s, e in zip(entries, entries[1:] + [o.hi])]


def key_of(e, start, size):
    return (size, digest(e.normalized[start:start + size]), json.dumps(e.pattern(start, size), sort_keys=True))


def code_refs(e, start, size):
    """Direct calls and relocated lddw code pointers inside [start,start+size): offset -> target."""
    out = {}
    for at, target in e.calls.items():
        if start <= at < start + size:
            out[at - start] = target
    for at, r in e.relocations.items():
        if start <= at < start + size and r['type'] == 8 and e.b[at] == 0x18:
            ptr = struct.unpack_from('<I', e.b, at + 4)[0] | (struct.unpack_from('<I', e.b, at + 12)[0] << 32)
            if e.lo <= ptr < e.hi:
                out[at - start] = ptr
    return out


class Plan:
    def __init__(self, original, symbols, mapfile):
        self.o = Elf(Path(original))
        self.s = Elf(Path(symbols))
        self.sections = parse_map(mapfile)
        o, s = self.o, self.s
        self.W = windows_of(o)
        self.wstart = {st: i for i, (st, _) in enumerate(self.W)}
        # every candidate symbol body must be exactly one input section
        self.cstart = {r['vma']: i for i, r in enumerate(self.sections)}
        for f in s.funcs:
            assert f['start'] in self.cstart, f
            assert self.sections[self.cstart[f['start']]]['size'] == f['size'], f
        assert sum(r['size'] for r in self.sections) == s.hi - s.lo
        self.ckey = [key_of(s, r['vma'], r['size']) for r in self.sections]
        self.wkey = [key_of(o, st, en - st) for st, en in self.W]
        by = collections.defaultdict(list)
        for i, k in enumerate(self.ckey):
            by[k].append(i)
        self.C = [by.get(k, []) for k in self.wkey]
        self.wref = [{off: self.win_of(t) for off, t in code_refs(o, st, en - st).items()} for st, en in self.W]
        self.cref = [{off: self.cstart.get(t) for off, t in code_refs(s, r['vma'], r['size']).items()} for r in self.sections]

    def win_of(self, addr):
        if addr in self.wstart:
            return self.wstart[addr]
        lo, hi = 0, len(self.W) - 1
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if self.W[mid][0] <= addr:
                lo = mid
            else:
                hi = mid - 1
        return lo

    def assign(self):
        W, C, S = self.W, self.C, self.sections
        nwin = len(W)
        users = collections.Counter(c for cs in C for c in cs)
        A, basis, used = {}, {}, set()
        root = self.root_owner()
        for w in range(nwin):
            if len(C[w]) == 1 and users[C[w][0]] == 1:
                A[w] = C[w][0]; basis[w] = 'normalized-unique'; used.add(C[w][0])
        normalized_any = set(users)

        def consistency(w, c):
            good = bad = 0
            for off, tw in self.wref[w].items():
                tc = self.cref[c].get(off)
                if tw in A:
                    if A[tw] == tc:
                        good += 1
                    else:
                        bad += 1
            return good, bad

        def votes():
            v = collections.defaultdict(collections.Counter)
            for w, c in A.items():
                if self.wkey[w] != self.ckey[c]:
                    continue  # only aligned (normalized-equal) pairs give operand correspondences
                for off, tw in self.wref[w].items():
                    tc = self.cref[c].get(off)
                    if tc is not None:
                        v[tw][tc] += 1
            return v

        def neighbours(w):
            wp = next((x for x in range(w - 1, -1, -1) if x in A), None)
            wn = next((x for x in range(w + 1, nwin) if x in A), None)
            return wp, wn

        def locality(w, c):
            # dependency objects keep their compiler-emitted section order, so a
            # body between two placed sections of the same object should come
            # from that object and lie between them in default order
            wp, wn = neighbours(w)
            own, score = S[c]['owner'], 0
            for nb in (wp, wn):
                if nb is not None and S[A[nb]]['owner'] == own:
                    score += 1
            if (wp is not None and wn is not None and S[A[wp]]['owner'] == own == S[A[wn]]['owner']
                    and S[A[wp]]['vma'] < S[c]['vma'] < S[A[wn]]['vma']):
                score += 2
            return score * (1 if own == root else 10)

        def score(w, c, v):
            good, bad = consistency(w, c)
            return locality(w, c) + v[w][c] * 4 + good * 2 - bad * 3

        while True:
            v = votes()
            best = {}
            for w in range(nwin):
                if w in A or not C[w]:
                    continue
                opts = sorted(((score(w, c, v), -c, c) for c in C[w] if c not in used), reverse=True)
                if opts:
                    best[w] = opts
            if best:
                # clear winners first (best strictly above the runner-up), else the single best pair
                clear = [(o[0][0], w, o[0][2]) for w, o in best.items() if len(o) == 1 or o[0][0] > o[1][0]]
                pick = max(clear) if clear else max((o[0][0], w, o[0][2]) for w, o in best.items())
                _, w, c = pick
                A[w] = c; basis[w] = 'normalized-graph'; used.add(c)
                continue
            # windows with no normalized-equal body: callers' operands, then locality
            opts = []
            for w in range(nwin):
                if w in A or C[w]:
                    continue
                for c, n in v[w].items():
                    if c is None or c in used or c in normalized_any:
                        continue
                    opts.append((n * 4 + locality(w, c), -abs(S[c]['size'] - (W[w][1] - W[w][0])), w, c))
            if not opts:
                break
            _, _, w, c = max(opts)
            A[w] = c; basis[w] = 'call-graph'; used.add(c)
        # same-object gap fill: an unplaced window between two placed sections of one
        # dependency object takes the only unplaced section of that object between them
        changed = True
        while changed:
            changed = False
            for w in range(nwin):
                if w in A:
                    continue
                wp, wn = neighbours(w)
                if wp is None or wn is None:
                    continue
                own = S[A[wp]]['owner']
                if own == root or S[A[wn]]['owner'] != own:
                    continue
                gap = [c for c in range(len(S)) if c not in used and S[c]['owner'] == own
                       and S[A[wp]]['vma'] < S[c]['vma'] < S[A[wn]]['vma'] and c not in normalized_any]
                holes = [x for x in range(wp + 1, wn) if x not in A]
                if len(gap) == 1 and len(holes) == 1:
                    A[w] = gap[0]; basis[w] = 'object-order'; used.add(gap[0]); changed = True
        self.A, self.basis = A, basis
        return A

    def root_owner(self):
        counts = collections.Counter(r['owner'] for r in self.sections)
        return counts.most_common(1)[0][0]

    def order(self):
        seq, placed = [], set()
        for w in range(len(self.W)):
            c = self.A.get(w)
            if c is not None and c not in placed:
                seq.append(c); placed.add(c)
        tail = [c for c in range(len(self.sections)) if c not in placed]
        return seq, tail

    def script(self, default_text, seq, tail):
        old = '  .text : { *(.text*) } :text'
        assert default_text.count(old) == 1
        lines = []
        for c in seq + tail:
            r = self.sections[c]
            lines.append('    ' + selector_owner(r['owner']) + '(' + json.dumps(r['section']) + ')')
        new = '  .text : {\n' + '\n'.join(lines) + '\n    *(.text*)\n  } :text'
        return default_text.replace(old, new)

    def report(self, seq, tail):
        rows = []
        for w, (st, en) in enumerate(self.W):
            c = self.A.get(w)
            r = self.sections[c] if c is not None else None
            rows.append({'window': w, 'original_start': st, 'original_size': en - st,
                         'basis': self.basis.get(w), 'candidate_section': r['section'] if r else None,
                         'candidate_owner': selector_owner(r['owner']) if r else None,
                         'candidate_size': r['size'] if r else None,
                         'candidate_default_vma': r['vma'] if r else None,
                         'normalized_equal': bool(r) and self.wkey[w] == self.ckey[c],
                         'normalized_alternatives': len(self.C[w])})
        return {'windows': rows,
                'tail': [{'candidate_section': self.sections[c]['section'], 'candidate_owner': selector_owner(self.sections[c]['owner']),
                          'candidate_size': self.sections[c]['size'], 'candidate_default_vma': self.sections[c]['vma']} for c in tail],
                'counts': dict(collections.Counter(b for b in self.basis.values()), unplaced_windows=len(self.W) - len(self.A),
                               ordered_sections=len(seq), tail_sections=len(tail), sections=len(self.sections), windows=len(self.W))}


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument('--original', type=Path, default=ROOT / 'evidence/original/pump_amm/deployed.so')
    p.add_argument('--symbols', type=Path, required=True)
    p.add_argument('--map', type=Path, required=True)
    p.add_argument('--default-script', type=Path, required=True)
    p.add_argument('--out-dir', type=Path, required=True)
    a = p.parse_args()
    pl = Plan(a.original, a.symbols, a.map)
    pl.assign()
    seq, tail = pl.order()
    a.out_dir.mkdir(parents=True, exist_ok=True)
    (a.out_dir / 'ordered.ld').write_text(pl.script(a.default_script.read_text(), seq, tail))
    rep = pl.report(seq, tail)
    rep['inputs'] = {'original_sha256': digest(pl.o.b), 'symbols_sha256': digest(pl.s.b), 'map_sha256': digest(a.map.read_bytes()),
                     'default_script_sha256': digest(a.default_script.read_bytes()), 'generator_sha256': digest(Path(__file__).read_bytes())}
    (a.out_dir / 'order-plan.json').write_text(json.dumps(rep, indent=1) + '\n')
    print(json.dumps(rep['counts'], indent=2))


if __name__ == '__main__':
    main()
