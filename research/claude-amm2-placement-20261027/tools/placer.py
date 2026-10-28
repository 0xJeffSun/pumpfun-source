#!/usr/bin/env python3
"""Whitespace-only source-coordinate placement solver (re-runnable).

Input : a source tree (root containing programs/pump-amm/src), the pairs.json that pair.py produced
        for an unstripped build OF THAT SAME TREE, and an output directory (new).
Output: <output>/programs/pump-amm/... (only changed files are rewritten; others copied) and
        <output>/placement-report.json.

Per candidate file the solver
  1. collects coordinate constraints  candidate line -> original line  from window pairs
     (hard: unique / equal / zip; medium: dp; soft: near; keep: windows that already match),
  2. keeps only constraints whose original file equals the candidate file's path (a different
     original path means a module move; reported, see --relocations for #[path] moves),
  3. picks the maximum-weight order-preserving chain (weighted LIS; an out-of-order site means a
     code move and is reported with the move it implies),
  4. realises the chain by changing only whitespace: blank lines at item/statement boundaries,
     a line split before a `.method(` on the anchor line for small shifts, removal of blank lines
     and joining of continuation lines for negative shifts,
  5. verifies the token stream (rlex.same_stream) and the new line of every constrained site.
The report predicts, per original window, whether its coordinates now match.

usage: placer.py --tree <root> --pairs <pairs.json> --output <dir> [--levels hard,medium,soft]
                 [--only-files a.rs,b.rs] [--exclude-files ...] [--max-blank N]
"""
import argparse, bisect, collections, json, os, shutil, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import rlex  # noqa: E402

PFX = 'programs/pump-amm/src/'
LEVEL = {'unique': 'hard', 'equal': 'hard', 'zip': 'hard', 'caller': 'hard', 'caller-subset': 'hard', 'dp': 'medium', 'near': 'soft'}
PRIO = {'keep': 4, 'hard': 3, 'medium': 2, 'soft': 1, 'loc': 0}


class FileModel:
    def __init__(self, text):
        self.text = text
        self.toks = rlex.tokens(text)
        t = self.toks
        # gap g = whitespace before token g (g = len(t) is the trailing gap)
        self.gaps = []
        prev_end = 0
        for x in t:
            self.gaps.append(text[prev_end:x.start]); prev_end = x.end
        self.gaps.append(text[prev_end:])
        self.lines = [x.line for x in t]

    def first_on_line(self, L):
        i = bisect.bisect_left(self.lines, L)
        return i if i < len(self.toks) and self.lines[i] == L else None

    def anchor(self, L):
        """token index of the coordinate site on line L: first `ident !` macro call, else first token."""
        i = self.first_on_line(L)
        if i is None:
            return None
        j = i
        while j < len(self.toks) and self.lines[j] == L:
            if self.toks[j].kind == 'ident' and j + 1 < len(self.toks) and self.toks[j + 1].text == '!':
                return j
            j += 1
        return i

    def render(self, gaps):
        out = []
        for g, x in zip(gaps, self.toks):
            out.append(g); out.append(x.text)
        out.append(gaps[-1])
        return ''.join(out)

    @staticmethod
    def new_lines(toks, gaps):
        """line of each token after replacing gaps."""
        res = []; line = 1
        for g, x in zip(gaps, toks):
            line += g.count('\n'); res.append(line); line += x.text.count('\n')
        return res


def indent_of_gap(g):
    k = g.rfind('\n')
    return g[k + 1:] if k >= 0 else None


def plan_file(fm, chain, max_blank, stmt_joins=False):
    """chain: sorted list of (anchor_token, target_line). returns new gaps or raises ValueError."""
    toks, gaps = fm.toks, list(fm.gaps)
    prev_tok, prev_target = -1, 1
    notes = []
    for a, T in chain:
        # current line distance between previous anchor (or file start) and this anchor
        cur = FileModel.new_lines(toks, gaps)
        prev_line = cur[prev_tok] if prev_tok >= 0 else 1
        need = (T - prev_target) - (cur[a] - prev_line)
        seg = range(prev_tok + 1, a + 1)          # gaps whose newlines lie between the anchors
        if need > 0:
            g = choose_insert(fm, gaps, seg, a, need)
            if g is None:
                raise ValueError(f'no insertion point before token {a}')
            gk, how = g
            if how == 'split':
                ind, starts_dot = line_indent(fm, gaps, gk)
                gaps[gk] = '\n' + ind + ('' if starts_dot else '    ')
                need -= 1
                if need:
                    g2 = choose_insert(fm, gaps, seg, a, need, allow_split=False)
                    if g2 is None:
                        raise ValueError(f'no insertion point before token {a}')
                    gaps[g2[0]] = add_blank(gaps[g2[0]], need)
                notes.append(f'split before token {gk} ({toks[gk].text}{toks[gk+1].text if gk+1 < len(toks) else ""}) line {cur[gk]}')
            else:
                if need > max_blank:
                    raise ValueError(f'shift {need} exceeds --max-blank {max_blank}')
                gaps[gk] = add_blank(gaps[gk], need)
                notes.append(f'+{need} blank line(s) before original line {fm.lines[gk]} ({how})')
        elif need < 0:
            rem = -need
            # (1) drop existing blank lines, largest runs first
            cands = sorted([g for g in seg if gaps[g].count('\n') >= 2], key=lambda g: -gaps[g].count('\n'))
            for g in cands:
                if not rem:
                    break
                k = min(rem, gaps[g].count('\n') - 1)
                gaps[g] = '\n' * (gaps[g].count('\n') - k) + indent_of_gap(gaps[g])
                rem -= k
                notes.append(f'-{k} blank line(s) before original line {fm.lines[g]}')
            # (2) join continuation lines (never after a line comment, never gluing punctuation)
            if rem:
                js = [g for g in seg if gaps[g].count('\n') == 1 and g > 0 and joinable(toks, g, stmt_joins)]
                def cont(g):
                    p = toks[g - 1].text
                    return 0 if p not in (';', '{', '}') and toks[g].text != '#' else 1
                js.sort(key=lambda g: (cont(g), -g))
                for g in js:
                    if not rem:
                        break
                    gaps[g] = join_ws(toks[g - 1], toks[g])
                    rem -= 1
                    notes.append(f'join before original line {fm.lines[g]}')
            if rem:
                raise ValueError(f'cannot remove {rem} more line break(s) before token {a}')
        prev_tok, prev_target = a, T
    return gaps, notes


def joinable(toks, g, stmt_joins):
    """may the single newline before token g become a space?"""
    p, n = toks[g - 1], toks[g]
    if p.kind == 'comment' or p.text.startswith('//'):
        return False
    if p.text in (';', '{', '}') or n.text in ('#', '}') or n.kind == 'comment':
        return stmt_joins
    return True


def capacity(fm, lo, hi, stmt_joins):
    """removable newlines in gaps lo+1..hi (blank lines + joinable breaks)."""
    c = 0
    for g in range(lo + 1, hi + 1):
        k = fm.gaps[g].count('\n')
        if k >= 2:
            c += k - 1
        if k >= 1 and g > 0 and joinable(fm.toks, g, stmt_joins):
            c += 1
    return c


def add_blank(g, k):
    n = g.count('\n')
    ind = indent_of_gap(g)
    return '\n' * (n + k) + (ind or '')


def join_ws(prev, nxt):
    if prev.text in ('(', '[') or nxt.text in (')', ']'):
        return ''
    if nxt.text in ('.', ',', ';', '?') and prev.kind != 'punct':
        return ''
    return ' '


def first_tok_of_line(fm, gaps, g):
    return g


def line_indent(fm, gaps, g):
    """(indent, starts_with_dot) of the line containing token g-1 (the line being split)."""
    k = g - 1
    while k >= 0 and '\n' not in gaps[k]:
        k -= 1
    if k < 0:
        return '', False
    return indent_of_gap(gaps[k]), fm.toks[k].text == '.'


def choose_insert(fm, gaps, seg, a, need, allow_split=True):
    toks = fm.toks
    segl = list(seg)
    if not segl:
        return None
    # (A) small shift: split before `.method(` on the anchor's line, before the anchor
    if allow_split and need <= 2:
        cur = FileModel.new_lines(toks, gaps)
        L = cur[a]
        for g in range(a, segl[0] - 1, -1):
            if cur[g] != L:
                break
            if g < a and '\n' not in gaps[g] and toks[g].text == '.' and g > 0 and toks[g - 1].kind != 'punct' \
                    and g + 2 < len(toks) and toks[g + 1].kind == 'ident' and toks[g + 2].text in ('(', '::'):
                # not the first token of the line
                if cur[g - 1] == L:
                    return g, 'split'
    # (B) existing blank lines (item boundaries), closest to the anchor
    b = [g for g in segl if gaps[g].count('\n') >= 2]
    if b:
        return b[-1], 'item-boundary'
    # (C) statement / item boundaries
    c = [g for g in segl if gaps[g].count('\n') >= 1 and g > 0 and toks[g - 1].text in (';', '{', '}', ',')]
    if c:
        return c[-1], 'statement-boundary'
    d = [g for g in segl if gaps[g].count('\n') >= 1]
    if d:
        return d[-1], 'line-boundary'
    return None


def weighted_chain(cons, fm=None, stmt_joins=False):
    """cons: list of dict(cline, oline, w, anchor). Max-weight chain with cline and oline strictly increasing
    and every segment realisable (enough removable line breaks when the target gap is shorter)."""
    cons = sorted(cons, key=lambda c: c['cline'])
    n = len(cons)
    def ok(j, i):
        lo = cons[j]['anchor'] if j >= 0 else -1
        lj = cons[j]['cline'] if j >= 0 else 1
        tj = cons[j]['oline'] if j >= 0 else 1
        need = (cons[i]['oline'] - tj) - (cons[i]['cline'] - lj)
        return need >= 0 or fm is None or capacity(fm, lo, cons[i]['anchor'], stmt_joins) >= -need
    best = [c['w'] if ok(-1, k) else float('-inf') for k, c in enumerate(cons)]; prev = [-1] * n
    for i in range(n):
        for j in range(i):
            if best[j] == float('-inf'):
                continue
            if cons[j]['cline'] < cons[i]['cline'] and cons[j]['oline'] < cons[i]['oline'] \
                    and ok(j, i) and best[j] + cons[i]['w'] > best[i]:
                best[i] = best[j] + cons[i]['w']; prev[i] = j
    if not n or max(best) == float('-inf'):
        return [], cons
    k = max(range(n), key=lambda i: best[i])
    chain = []
    while k >= 0:
        chain.append(cons[k]); k = prev[k]
    chain.reverse()
    ids = {id(c) for c in chain}
    return chain, [c for c in cons if id(c) not in ids]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--tree', required=True)
    ap.add_argument('--pairs', required=True)
    ap.add_argument('--output', required=True)
    ap.add_argument('--levels', default='hard', help='comma list of hard,medium,soft,loc (keep is always on; loc = Location-record lines)')
    ap.add_argument('--only-files', default='')
    ap.add_argument('--exclude-files', default='')
    ap.add_argument('--max-blank', type=int, default=10 ** 6)
    ap.add_argument('--stmt-joins', action='store_true', help='also join lines across statements/items (dense)')
    ap.add_argument('--copy-tree', action='store_true', help='copy the whole input tree, then rewrite placed files')
    a = ap.parse_args()
    tree = Path(a.tree); out = Path(a.output)
    assert not out.exists(), f'{out} exists'
    levels = set(a.levels.split(',')) | {'keep'}
    only = {f if f.startswith(PFX) else PFX + f for f in a.only_files.split(',') if f}
    excl = {f if f.startswith(PFX) else PFX + f for f in a.exclude_files.split(',') if f}
    P = json.load(open(a.pairs))
    wsize = {w['start']: w['size'] for w in P['windows']}
    wstat = {w['start']: w for w in P['windows']}

    # constraints per candidate file: (cline) -> list of (ofile, oline, level, owin, w)
    byfile = collections.defaultdict(lambda: collections.defaultdict(list))
    for p in P['pairs']:
        if p['kind'] == 'L':
            # core::panic::Location records (raw/whole-ELF only): lowest-priority line constraints, never part of
            # a window's atomic site set; only same-file pairs of the program crate
            if 'loc' in levels and p.get('cfile') == p.get('ofile') and (p.get('cfile') or '').startswith(PFX):
                byfile[p['cfile']][p['cline']].append({'ofile': p['ofile'], 'oline': p['oline'], 'level': 'loc',
                                                       'owin': None, 'w': 0})
            continue
        if p['kind'] != 'S':
            continue
        lvl = 'keep' if p['status'] == 'exact' else LEVEL.get(p['how'], 'soft')
        byfile[p['cfile']][p['cline']].append({'ofile': p['ofile'], 'oline': p['oline'], 'level': lvl,
                                               'owin': p['owin'], 'w': wsize[p['owin']]})
    report = {'tree': str(tree), 'pairs': a.pairs, 'levels': sorted(levels), 'files': {}}
    out.mkdir(parents=True)
    if a.copy_tree:
        shutil.copytree(tree / 'programs', out / 'programs', symlinks=True)
    changed = {}
    for cfile in sorted(byfile):
        if only and cfile not in only:
            continue
        if cfile in excl:
            continue
        path = tree / cfile
        if not path.is_file():
            report['files'][cfile] = {'error': 'file not in tree'}
            continue
        text = path.read_text()
        fm = FileModel(text)
        rep = {'dropped': [], 'conflicts': [], 'chain': [], 'notes': []}
        cons = []
        for cline, lst in sorted(byfile[cfile].items()):
            use = [x for x in lst if x['level'] in levels]
            if not use:
                continue
            same = [x for x in use if x['ofile'] == cfile]
            other = [x for x in use if x['ofile'] != cfile]
            for x in other:
                rep['dropped'].append({'cline': cline, 'ofile': x['ofile'], 'oline': x['oline'], 'level': x['level'],
                                       'owin': hex(x['owin']), 'reason': 'original path differs (module/file move)'})
            if not same:
                continue
            top = max(PRIO[x['level']] for x in same)
            same = [x for x in same if PRIO[x['level']] == top]
            tl = collections.Counter(x['oline'] for x in same)
            if len(tl) > 1:
                rep['conflicts'].append({'cline': cline, 'targets': sorted(tl), 'owins': sorted({hex(x['owin']) for x in same}),
                                         'reason': 'one candidate site serves several original sites (needs a code duplicate)'})
            # weight: sum of window sizes of the windows wanting this target, keep >> others
            best_t = max(tl, key=lambda t: (sum(x['w'] for x in same if x['oline'] == t), -t))
            wins = sorted({x['owin'] for x in same if x['oline'] == best_t and x['owin'] is not None})
            nsites = lambda ow: sum(1 for cl2, l2 in byfile[cfile].items() for y in l2 if y['owin'] == ow) or 1
            w = sum(10 ** 6 // nsites(x['owin']) + x['w'] for x in same if x['oline'] == best_t) * (1000 if top == PRIO['keep'] else (100 if top == 3 else (10 if top == 2 else 1))) if top > 0 else 1
            anc = fm.anchor(cline)
            if anc is None:
                rep['conflicts'].append({'cline': cline, 'reason': 'no token on that line in the tree (stale pairs?)'})
                continue
            cons.append({'cline': cline, 'oline': best_t, 'w': w, 'level': [k for k, v in PRIO.items() if v == top][0],
                         'owins': [hex(x) for x in wins], 'anchor': anc})
        if not cons:
            report['files'][cfile] = rep
            continue
        # window-atomic: a window gains only if all of its sites are placed; drop partial windows and retry
        dropped_partial = []
        while True:
            chain, rest = weighted_chain(cons, fm, a.stmt_joins)
            inch = collections.Counter(w for c in chain for w in c['owins'])
            need = collections.Counter(w for c in cons for w in c['owins'])
            partial = {w for w in inch if inch[w] < need[w]}
            if not partial:
                break
            keep_cons = []
            for c in cons:
                if set(c['owins']) & partial and c['level'] != 'keep':
                    dropped_partial.append(c)
                else:
                    keep_cons.append(c)
            cons = keep_cons
        rest = rest + dropped_partial
        for c in rest:
            before = [x for x in chain if x['oline'] < c['oline']]
            after = [x for x in chain if x['oline'] > c['oline']]
            hint = (f"original puts it after candidate line {before[-1]['cline']} (orig {before[-1]['oline']})" if before else 'original puts it first') + \
                   (f" and before candidate line {after[0]['cline']} (orig {after[0]['oline']})" if after else '')
            rep['dropped'].append({'cline': c['cline'], 'oline': c['oline'], 'level': c['level'], 'owin': c['owins'],
                                   'reason': 'out of order or not realisable by whitespace: needs the enclosing item moved (code move)',
                                   'implied_move': hint})
        # iterate: drop the weakest anchor of an infeasible segment
        while True:
            try:
                gaps, notes = plan_file(fm, [(c['anchor'], c['oline']) for c in chain], a.max_blank, a.stmt_joins)
                break
            except ValueError as e:
                # drop lowest-weight non-keep anchor
                cand = [c for c in chain if c['level'] != 'keep'] or chain
                worst = min(cand, key=lambda c: c['w'])
                chain.remove(worst)
                rep['dropped'].append({'cline': worst['cline'], 'oline': worst['oline'], 'level': worst['level'],
                                       'owin': worst['owins'], 'reason': f'infeasible: {e}'})
                if not chain:
                    gaps, notes = list(fm.gaps), []
                    break
        new = fm.render(gaps)
        ok, where = rlex.same_stream(text, new)
        assert ok, f'{cfile}: token stream changed at {where}'
        nl = FileModel.new_lines(fm.toks, gaps)
        for c in chain:
            got = nl[c['anchor']]
            rep['chain'].append({'cline': c['cline'], 'oline': c['oline'], 'new_line': got, 'level': c['level'],
                                 'owin': c['owins']})
            assert got == c['oline'], (cfile, c, got)
        # predicted new line of every site line (all macro idents on that old line)
        newmap = {}
        for cline in byfile[cfile]:
            i = fm.first_on_line(cline)
            if i is None:
                continue
            ls = set()
            j = i
            while j < len(fm.toks) and fm.lines[j] == cline:
                if fm.toks[j].kind == 'ident' and j + 1 < len(fm.toks) and fm.toks[j + 1].text == '!':
                    ls.add(nl[j])
                j += 1
            if not ls:
                ls = {nl[i]}
            newmap[cline] = sorted(ls)
        rep['new_lines'] = {str(k): v for k, v in sorted(newmap.items())}
        rep['notes'] = notes
        rep['changed'] = new != text
        report['files'][cfile] = rep
        if new != text:
            changed[cfile] = (new, newmap)
    # write changed files
    for cfile, (new, _) in changed.items():
        dst = out / cfile
        dst.parent.mkdir(parents=True, exist_ok=True)
        dst.write_text(new)
    # predicted window status
    newline = {}
    for cfile, (_, m) in changed.items():
        for k, v in m.items():
            newline[(cfile, k)] = v
    pred = collections.Counter(); gained = []; lost = []
    for w in P['windows']:
        ps = [p for p in P['pairs'] if p['kind'] == 'S' and p['owin'] == w['start']]
        if not ps or w['status'] == 'none':
            continue
        okall = True
        for p in ps:
            nlst = newline.get((p['cfile'], p['cline']), [p['cline']])
            if not (len(nlst) == 1 and nlst[0] == p['oline'] and p['cfile'] == p['ofile']):
                okall = False
        if w['status'] == 'coord' and okall:
            gained.append(hex(w['start']))
        if w['status'] == 'exact' and not okall:
            lost.append(hex(w['start']))
    report['predicted_gained'] = gained
    report['predicted_lost'] = lost
    report['changed_files'] = sorted(changed)
    (out / 'placement-report.json').write_text(json.dumps(report, indent=1) + '\n')
    print(f'changed files: {len(changed)}  predicted gained windows: {len(gained)}  predicted lost: {len(lost)}')
    print('  gained:', ' '.join(gained))
    if lost:
        print('  LOST:', ' '.join(lost))
    for cfile, rep in report['files'].items():
        if 'error' in rep:
            print('  ', cfile, rep['error']); continue
        nd = len(rep['dropped']); nc = len(rep.get('chain', []))
        print(f"  {cfile.replace(PFX, '')}: placed {nc}, dropped {nd}, conflicts {len(rep['conflicts'])}")


if __name__ == '__main__':
    main()
