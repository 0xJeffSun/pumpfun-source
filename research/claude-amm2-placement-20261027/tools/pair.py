#!/usr/bin/env python3
"""Pair original coordinate sites with candidate coordinate sites.

Window pairing (original entry-to-next-entry window -> candidate symbol body):
  exact : equal under the repo normalizer (measure.py key)
  coord : equal once the S-site filename-length and line immediates are masked in both
          (a pure source-coordinate residual: whitespace placement / module path fixes it)
  near  : best candidate body by masked instruction alignment (soft)
Ambiguous exact/coord groups (e.g. 32 identical `|_| error!(Overflow)` closures) are resolved
through their callers: a call at aligned offsets of a paired caller pairs the callees.
Remaining ambiguity is resolved by nearest estimated line within the mapped file.

Each paired S site yields  candidate (file,line) -> original (file,line);
each paired L reference yields candidate (file,line,col) -> original (file,line,col).

usage: pair.py --candidate-symbols <unstripped.so> --output <pairs.json>
"""
import argparse, bisect, collections, difflib, hashlib, json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from sites import Sites, ROOT, decode  # noqa: E402

PFX = 'programs/pump-amm/src/'


def digest(b):
    return hashlib.sha256(b).hexdigest()


class Side:
    def __init__(self, path):
        self.st = st = Sites(path)
        self.e = st.elf
        self.coord_ats = collections.defaultdict(set)
        self.s_by_win = collections.defaultdict(list)
        for s in st.s_sites:
            self.coord_ats[s['win']].update([s['line_at'], s['len_at']])
            self.s_by_win[s['win']].append(s)
        self.l_by_win = collections.defaultdict(list)
        for s in st.l_sites():
            self.l_by_win[s['win']].append(s)
        self.win = {w[0]: w for w in st.windows}
        self.callers = collections.defaultdict(list)     # target -> [call addr]
        for at, t in self.e.calls.items():
            self.callers[t].append(at)
        self._text = {}

    def key(self, ws, we, mask_coords):
        nb = bytearray(self.e.normalized[ws:we])
        if mask_coords:
            for at in self.coord_ats[ws]:
                nb[at - ws + 4:at - ws + 8] = bytes(4)
        return (we - ws, digest(bytes(nb)), json.dumps(self.e.pattern(ws, we - ws), sort_keys=True))

    def text(self, ws):
        if ws not in self._text:
            ws_, we, _ = self.win[ws]
            b = self.e.normalized; out = []; at = ws
            ca = self.coord_ats[ws]
            while at < we:
                n, op, dst, src, off, imm = decode(b, at)
                if at in ca:
                    imm = 'C'
                out.append((at, f'{op:02x} {dst} {src} {off} {imm}'))
                at += n
            self._text[ws] = out
        return self._text[ws]


def align(O, ows, C, cws):
    """map original instruction addr -> candidate instruction addr (equal or equal-length replace runs)."""
    ot, ct = O.text(ows), C.text(cws)
    sm = difflib.SequenceMatcher(None, [x[1] for x in ot], [x[1] for x in ct], autojunk=False)
    m = {}
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal' or (tag == 'replace' and i2 - i1 == j2 - j1):
            for k in range(i2 - i1):
                m[ot[i1 + k][0]] = ct[j1 + k][0]
    return sm.ratio(), m


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--original', default=str(ROOT / 'evidence/original/pump_amm/deployed.so'))
    ap.add_argument('--candidate-symbols', required=True)
    ap.add_argument('--output', required=True)
    ap.add_argument('--near-min-ratio', type=float, default=0.75)
    ap.add_argument('--quiet', action='store_true')
    a = ap.parse_args()
    O = Side(a.original); C = Side(a.candidate_symbols)

    cex = collections.defaultdict(list); cco = collections.defaultdict(list)
    for (ws, we, name) in C.st.windows:
        cex[C.key(ws, we, False)].append(ws)
        cco[C.key(ws, we, True)].append(ws)
    rows = {}
    for (ws, we, _) in O.st.windows:
        ex = cex.get(O.key(ws, we, False), [])
        co = cco.get(O.key(ws, we, True), [])
        status = 'exact' if ex else ('coord' if co else 'none')
        rows[ws] = {'start': ws, 'end': we, 'size': we - ws, 'status': status, 'cands': ex or co,
                    'pair': None, 'how': None}
    # 1. unique pairs
    for r in rows.values():
        if len(r['cands']) == 1:
            r['pair'] = r['cands'][0]; r['how'] = 'unique'

    # 2. near pairs for unmatched windows that carry coordinates or call ambiguous callees
    def near_pair(ows):
        ows_, owe, _ = O.win[ows]; size = owe - ows
        best = None
        ot = [x[1] for x in O.text(ows)]
        for (cs, ce, cname) in C.st.windows:
            if not (0.6 * size <= ce - cs <= 1.6 * size):
                continue
            ct = [x[1] for x in C.text(cs)]
            sm = difflib.SequenceMatcher(None, ot, ct, autojunk=False)
            if sm.real_quick_ratio() < a.near_min_ratio or sm.quick_ratio() < a.near_min_ratio:
                continue
            rr = sm.ratio()
            if best is None or rr > best[0]:
                best = (rr, cs)
        return best
    for r in rows.values():
        if r['status'] == 'none':
            b = near_pair(r['start'])
            if b and b[0] >= a.near_min_ratio:
                r['pair'] = b[1]; r['how'] = 'near'; r['ratio'] = round(b[0], 4)

    # 3. ambiguous groups (identical bodies up to coordinates, e.g. 32 `|_| error!(Overflow)` closures).
    #    Members of one coord-key group are interchangeable byte-wise, so only the multiset of
    #    coordinates per file matters.  (a) originals whose coordinates already equal a member's are
    #    paired with it; (b) the callers of each remaining original vote for the file region it belongs
    #    to; (c) inside each original file the remaining originals and the members mapped there are
    #    zipped in line order (the only order whitespace placement can produce).
    align_cache = {}
    def site_pairs_fixed(ows, cws):
        cm = {s['line_at'] - cws: s for s in C.s_by_win[cws]}
        return [(s, cm.get(s['line_at'] - ows)) for s in O.s_by_win[ows] if cm.get(s['line_at'] - ows)]
    def coords_of(side, ws):
        return tuple(sorted((s['line_at'] - ws, s['file'], s['line']) for s in side.s_by_win[ws]))
    okey = {}
    for r in rows.values():
        okey[r['start']] = O.key(r['start'], r['end'], True)
    groups = collections.defaultdict(list)
    for r in rows.values():
        if r['status'] in ('exact', 'coord') and len(r['cands']) > 1:
            groups[okey[r['start']]].append(r)
    # file maps: smap cfile -> [(cline, ofile, oline)] anchors; filemap cfile -> Counter(ofile)
    smap = collections.defaultdict(list); filemap = collections.defaultdict(collections.Counter)
    def add_anchors(r):
        if r['pair'] is None:
            return
        if r['status'] in ('exact', 'coord'):
            sp = site_pairs_fixed(r['start'], r['pair'])
        else:
            key = (r['start'], r['pair'])
            if key not in align_cache:
                align_cache[key] = align(O, r['start'], C, r['pair'])[1]
            m = align_cache[key]
            cm = {x['line_at']: x for x in C.s_by_win[r['pair']]}
            sp = [(x, cm.get(m.get(x['line_at']))) for x in O.s_by_win[r['start']] if cm.get(m.get(x['line_at']))]
        for x, t in sp:
            filemap[t['file']][x['file']] += 1
            if r['how'] != 'near':
                smap[t['file']].append((t['line'], x['file'], x['line']))
    for r in rows.values():
        if r['how'] in ('unique', 'near'):
            add_anchors(r)
    for f in smap:
        smap[f].sort()
    def estimate(cfile, cline):
        lst = smap.get(cfile)
        if not lst:
            return None
        i = bisect.bisect_left(lst, (cline, '', 0))
        nb = [lst[j] for j in (i - 1, i) if 0 <= j < len(lst)]
        best = min(nb, key=lambda x: abs(x[0] - cline))
        return best[1], best[2] + (cline - best[0])
    def caller_file_votes(r):
        votes = collections.Counter()
        cands = set(r['cands'])
        for cat in O.callers.get(r['start'], []):
            w = O.st.window_of(cat)
            pr = rows.get(w[0]) if w else None
            if not pr or pr['pair'] is None:
                continue
            cw = C.win[pr['pair']]
            if pr['how'] in ('unique', 'equal', 'zip') and pr['status'] in ('exact', 'coord'):
                cat2 = cw[0] + (cat - w[0])
            else:
                key = (w[0], cw[0])
                if key not in align_cache:
                    align_cache[key] = align(O, w[0], C, cw[0])[1]
                cat2 = align_cache[key].get(cat)
            t = C.e.calls.get(cat2) if cat2 is not None else None
            if t in cands:
                votes[t] += 1
        return votes
    for passno in range(2):
      for K, rs in groups.items():
        members = list(rs[0]['cands'])
        free = set(members) - {r['pair'] for r in rs if r['pair'] is not None}
        # (a) coordinates already equal
        for r in sorted(rs, key=lambda r: r['start']):
            if r['pair'] is not None:
                continue
            oc = [(x[0], x[1], x[2]) for x in coords_of(O, r['start'])]
            for c in sorted(free):
                if [(x[0], x[1], x[2]) for x in coords_of(C, c)] == oc:
                    r['pair'] = c; r['how'] = 'equal'; free.discard(c); break
        rest = [r for r in rs if r['pair'] is None]
        if not rest:
            continue
        # (b0) call-graph pairing of the callers: an original caller W corresponds to the candidate
        #      function F that calls the most counterparts of W's already-paired callees; W's members
        #      and F's free members are then zipped in line order (equal counts only).
        by_ocaller = collections.defaultdict(list)
        for r in rest:
            cl = {O.st.window_of(x)[0] for x in O.callers.get(r['start'], []) if O.st.window_of(x)}
            if len(cl) == 1:
                by_ocaller[cl.pop()].append(r)
        c_by_caller = collections.defaultdict(list)
        for c in free:
            cl = {C.st.window_of(x)[0] for x in C.callers.get(c, []) if C.st.window_of(x)}
            if len(cl) == 1:
                c_by_caller[cl.pop()].append(c)
        for wo, ors in by_ocaller.items():
            votes = collections.Counter()
            for at, t in O.e.calls.items():
                if not (wo <= at < O.win[wo][1]):
                    continue
                tr = rows.get(t)
                if not tr or tr['pair'] is None or tr['how'] not in ('unique', 'equal', 'zip', 'caller', 'caller-subset') \
                        or tr['status'] not in ('exact', 'coord'):
                    continue
                fs = {C.st.window_of(cat)[0] for cat in C.callers.get(tr['pair'], []) if C.st.window_of(cat)}
                for f in fs:
                    votes[f] += 1.0 / len(fs)      # specific callees weigh more than shared helpers
            if not votes:
                continue
            ofiles = {O.s_by_win[r['start']][0]['file'] for r in ors if O.s_by_win[r['start']]}
            def same_file(F):
                return [c for c in c_by_caller.get(F, []) if c in free and C.s_by_win[c]
                        and C.s_by_win[c][0]['file'] in ofiles]
            # prefer callers whose free members already sit in the original file (strong evidence)
            filt = collections.Counter({F: v for F, v in votes.items() if len(ofiles) == 1 and same_file(F)})
            ranked = (filt or votes).most_common(2) + [(None, 0)]
            (F, nv), more = ranked[0], ranked[1:]
            if nv < (1 if filt else 2) or more[0][1] * 1.5 > nv:
                continue
            cc = same_file(F) if filt else [c for c in c_by_caller.get(F, []) if c in free]
            if len(cc) < len(ors) or not cc:
                continue
            ors.sort(key=lambda r: O.s_by_win[r['start']][0]['line'] if O.s_by_win[r['start']] else 0)
            cc.sort(key=lambda c: C.s_by_win[c][0]['line'] if C.s_by_win[c] else 0)
            if len(cc) > len(ors):
                # members are byte-interchangeable: choose the order-preserving subset whose line gaps best
                # match the original gaps (DP over subsets; cost = sum |d_orig - d_cand| of consecutive pairs)
                ol = [O.s_by_win[r['start']][0]['line'] for r in ors]
                cl = [C.s_by_win[c][0]['line'] for c in cc]
                n, m = len(ol), len(cl)
                INF = float('inf')
                D = {(0, j): (0, None) for j in range(m)}
                for i in range(1, n):
                    for j in range(i, m):
                        best = (INF, None)
                        for k in range(i - 1, j):
                            if (i - 1, k) in D and D[(i - 1, k)][0] < INF:
                                v = D[(i - 1, k)][0] + abs((ol[i] - ol[i - 1]) - (cl[j] - cl[k]))
                                if v < best[0]:
                                    best = (v, k)
                        D[(i, j)] = best
                j = min((jj for jj in range(n - 1, m) if (n - 1, jj) in D), key=lambda jj: D[(n - 1, jj)][0])
                pick = [j]
                for i in range(n - 1, 0, -1):
                    j = D[(i, j)][1]; pick.append(j)
                cc = [cc[k] for k in reversed(pick)]
                how = 'caller-subset'
            else:
                how = 'caller'
            for r, c in zip(ors, cc):
                r['pair'] = c; r['how'] = how; r['caller_pair'] = [wo, F, round(nv, 2)]; free.discard(c)
        rest = [r for r in rs if r['pair'] is None]
        if not rest:
            continue
        # (b) region of each member: original file it maps to
        member_ofile = {}
        for r in rest:
            for c, n in caller_file_votes(r).items():
                if c in free:
                    member_ofile.setdefault(c, collections.Counter())[O.s_by_win[r['start']][0]['file'] if O.s_by_win[r['start']] else ''] += n
        def mfile(c):
            if c in member_ofile:
                return member_ofile[c].most_common(1)[0][0]
            ss = C.s_by_win[c]
            if not ss:
                return None
            est = estimate(ss[0]['file'], ss[0]['line'])
            if est:
                return est[0]
            if filemap.get(ss[0]['file']):
                return filemap[ss[0]['file']].most_common(1)[0][0]
            return ss[0]['file']
        def mline(c):
            ss = C.s_by_win[c]
            if not ss:
                return 0
            est = estimate(ss[0]['file'], ss[0]['line'])
            return est[1] if est else ss[0]['line']
        byfile = collections.defaultdict(list)
        for c in free:
            byfile[mfile(c)].append(c)
        for r in rest:
            ss = O.s_by_win[r['start']]
            of = ss[0]['file'] if ss else None
            r['_ofile'] = of
        for of in {r['_ofile'] for r in rest}:
            orr = sorted([r for r in rest if r['_ofile'] == of], key=lambda r: O.s_by_win[r['start']][0]['line'] if O.s_by_win[r['start']] else 0)
            cc = byfile.get(of, [])
            # members in source order: by candidate file then line (estimated original line orders files)
            cc = sorted(cc, key=lambda c: (mline(c), C.s_by_win[c][0]['line'] if C.s_by_win[c] else 0))
            if len(cc) == len(orr):
                for r, c in zip(orr, cc):
                    r['pair'] = c; r['how'] = 'zip'
            elif cc:
                # monotone DP alignment minimising |estimated - original| line distance
                n, m = len(orr), len(cc)
                INF = float('inf')
                D = [[INF] * (m + 1) for _ in range(n + 1)]; P = {}
                for j in range(m + 1):
                    D[0][j] = 0
                for i in range(1, n + 1):
                    ol = O.s_by_win[orr[i - 1]['start']][0]['line']
                    for j in range(1, m + 1):
                        best = (D[i][j - 1], 'skipc') if D[i][j - 1] < INF else (INF, None)
                        v = D[i - 1][j - 1] + abs(mline(cc[j - 1]) - ol)
                        if v < best[0]:
                            best = (v, 'pair')
                        if D[i - 1][j] + 10 ** 6 < best[0]:
                            best = (D[i - 1][j] + 10 ** 6, 'skipo')
                        D[i][j] = best[0]; P[(i, j)] = best[1]
                i, j = n, m
                while i > 0 and j > 0:
                    t = P[(i, j)]
                    if t == 'pair':
                        orr[i - 1]['pair'] = cc[j - 1]; orr[i - 1]['how'] = 'dp'; i -= 1; j -= 1
                    elif t == 'skipc':
                        j -= 1
                    else:
                        i -= 1
        for r in rest:
            r.pop('_ofile', None)
      # anchors learned in this pass feed the next one
      for r in rows.values():
          if r['how'] in ('zip', 'dp', 'equal', 'caller', 'caller-subset'):
              add_anchors(r)
      for f in smap:
          smap[f].sort()

    def site_pairs(r):
        if r['pair'] is None:
            return []
        cs = r['pair']; ws = r['start']
        if r['status'] in ('exact', 'coord'):
            return site_pairs_fixed(ws, cs)
        key = (ws, cs)
        if key not in align_cache:
            align_cache[key] = align(O, ws, C, cs)[1]
        m = align_cache[key]
        cm = {s['line_at']: s for s in C.s_by_win[cs]}
        return [(s, cm.get(m.get(s['line_at']))) for s in O.s_by_win[ws] if cm.get(m.get(s['line_at']))]

    # 5. emit site pairs
    pairs = []
    for r in rows.values():
        if r['pair'] is None:
            continue
        cs = r['pair']; cname = C.win[cs][2]
        for s, t in site_pairs(r):
            pairs.append({'kind': 'S', 'status': r['status'], 'how': r['how'], 'owin': r['start'], 'cwin': cs,
                          'cname': cname, 'ofile': s['file'], 'oline': s['line'],
                          'cfile': t['file'], 'cline': t['line']})
        # L sites
        ws = r['start']
        if r['status'] in ('exact', 'coord'):
            cm = {s['ref_at'] - cs: s for s in C.l_by_win[cs]}
            lp = [(s, cm.get(s['ref_at'] - ws)) for s in O.l_by_win[ws]]
        else:
            key = (ws, cs)
            if key not in align_cache:
                align_cache[key] = align(O, ws, C, cs)[1]
            m = align_cache[key]
            cm = {s['ref_at']: s for s in C.l_by_win[cs]}
            lp = [(s, cm.get(m.get(s['ref_at']))) for s in O.l_by_win[ws]]
        for s, t in lp:
            if t is None:
                continue
            pairs.append({'kind': 'L', 'status': r['status'], 'how': r['how'], 'owin': ws, 'cwin': cs,
                          'cname': cname, 'ofile': s['file'], 'oline': s['line'], 'ocol': s['col'],
                          'cfile': t['file'], 'cline': t['line'], 'ccol': t['col']})
    cnt = collections.Counter((r['status'], r['how']) for r in rows.values())
    out = {'original': a.original, 'candidate_symbols': a.candidate_symbols,
           'counts': {f'{k[0]}/{k[1]}': v for k, v in cnt.items()},
           'windows': list(rows.values()), 'pairs': pairs}
    Path(a.output).write_text(json.dumps(out, indent=1) + '\n')
    print(json.dumps(out['counts']))
    if not a.quiet:
        for r in rows.values():
            if r['status'] == 'coord':
                ps = [p for p in pairs if p['owin'] == r['start'] and p['kind'] == 'S']
                diffs = [(p['cfile'].replace(PFX, ''), p['cline'], p['ofile'].replace(PFX, ''), p['oline'])
                         for p in ps if (p['cfile'], p['cline']) != (p['ofile'], p['oline'])]
                nm = C.win[r['pair']][2][:60] if r['pair'] is not None else '?'
                print(f"coord {r['start']:#x}/{r['size']} [{r['how']}] {nm} {diffs}")


if __name__ == '__main__':
    main()
