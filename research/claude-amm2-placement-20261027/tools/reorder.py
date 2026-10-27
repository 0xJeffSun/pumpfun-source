#!/usr/bin/env python3
"""Item-reorder pre-pass for the placement solver (re-runnable; analysis + source rewrite).

Some original coordinate sites are impossible by order: the original file defines the enclosing
functions in a different order than the candidate.  Whitespace cannot fix that; moving whole items can.
This pass moves only WHOLE ITEMS (fns/consts with their attributes and leading comments) among the
inherent `impl T { ... }` blocks of one file that share an identical, generic-free header (`impl T`),
and (with --toplevel) among top-level `fn` items of the file.  An item keeps its exact text and
indentation, so columns are unchanged and a candidate line maps to a new line by a constant offset per
item.  The pass therefore also writes a REMAPPED pairs.json, so placer.py can run on the reordered tree
without a rebuild.

Order rule: items with coordinate constraints (S sites of paired windows whose original file equals the
candidate file; exact windows' sites always count, other levels per --levels) are sorted by their
smallest original line and written back into the slots that constrained items occupied; unconstrained
items stay in their slots.  The pass verifies that the new file is a permutation of items: the
skeleton token stream (everything outside the moved items) is identical and the multiset of item token
streams is identical.

usage: reorder.py --tree <root> --pairs <pairs.json> --output <dir> --files a.rs,b.rs [--levels hard]
                  [--toplevel]
outputs: <output>/programs/... (whole tree copied, reordered files rewritten), <output>/pairs.json
         (remapped), <output>/reorder-report.json
"""
import argparse
import collections
import copy
import json
import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import rlex  # noqa: E402
import cxxfilt_lite  # noqa: E402

PFX = 'programs/pump-amm/src/'
LEVEL = {'unique': 'hard', 'equal': 'hard', 'zip': 'hard', 'caller': 'hard', 'dp': 'medium', 'near': 'soft'}
OPEN, CLOSE = '([{', ')]}'


def match_close(toks, i):
    d = 0
    for j in range(i, len(toks)):
        t = toks[j].text
        if toks[j].kind == 'delim':
            if t in OPEN:
                d += 1
            elif t in CLOSE:
                d -= 1
                if d == 0:
                    return j
    raise ValueError('unbalanced')


def split_items(toks, a, b):
    """Split toks[a:b] (inside a block) into items; returns list of (first, last) token indices.
    Leading comments/attributes belong to the following item."""
    items, i = [], a
    while i < b:
        start = i
        j = i
        while j < b:
            t = toks[j]
            if t.kind == 'delim' and t.text in OPEN:
                k = match_close(toks, j)
                if t.text == '{':
                    # a body brace at item level ends the item unless followed by more item tokens
                    j = k
                    if j + 1 < b and toks[j + 1].text in (';',):
                        j += 1
                    break
                j = k + 1
                continue
            if t.text == ';':
                break
            j += 1
        if j >= b:
            # trailing comments only
            if all(toks[x].kind == 'comment' for x in range(start, b)):
                break
            raise ValueError('item did not terminate')
        items.append((start, j))
        i = j + 1
    return items


def item_name(toks, f, l):
    for x in range(f, l):
        if toks[x].text in ('fn', 'const', 'type', 'static') and toks[x].kind == 'ident' and x + 1 <= l:
            return toks[x + 1].text
    return '?'


def analyse(text, toplevel):
    toks = rlex.tokens(text)
    groups = collections.defaultdict(list)   # key -> list of (first, last) item token ranges
    i, n = 0, len(toks)
    while i < n:
        t = toks[i]
        if t.kind == 'delim' and t.text in OPEN:
            if t.text == '{':
                i = match_close(toks, i) + 1
                continue
            i = match_close(toks, i) + 1
            continue
        pv = i - 1
        while pv >= 0 and toks[pv].kind == 'comment':
            pv -= 1
        at_item_start = pv < 0 or toks[pv].text in ('}', ';', ']')
        if t.kind == 'ident' and t.text == 'impl' and at_item_start:
            j = i + 1
            while j < n and not (toks[j].kind == 'delim' and toks[j].text == '{'):
                j += 1
            header = tuple(x.text for x in toks[i:j])
            close = match_close(toks, j)
            generic_free = '<' not in header and 'for' not in header and 'where' not in header
            # attributes directly before `impl` (e.g. #[cfg]) make the block unsafe to mix
            prev = i - 1
            while prev >= 0 and toks[prev].kind == 'comment':
                prev -= 1
            if generic_free and not (prev >= 0 and toks[prev].text == ']'):
                for it in split_items(toks, j + 1, close):
                    groups[('impl',) + header[1:]].append(it)
            i = close + 1
            continue
        if toplevel and t.kind == 'ident' and t.text == 'fn':
            # top-level fn: back up over visibility/attrs/comments on preceding lines
            f = i
            while f > 0 and toks[f - 1].text in ('pub', 'crate', 'unsafe', 'const', 'async', 'extern') or \
                    (f > 0 and toks[f - 1].text == ')' and f > 2 and toks[f - 3].text == 'pub'):
                f -= 1
            j = i
            while j < n and not (toks[j].kind == 'delim' and toks[j].text == '{'):
                j += 1
            close = match_close(toks, j)
            # absorb attributes and comments before f
            while f > 0 and (toks[f - 1].kind == 'comment' or toks[f - 1].text == ']'):
                if toks[f - 1].text == ']':
                    # find matching '#['
                    d, k = 0, f - 1
                    while k >= 0:
                        if toks[k].text == ']':
                            d += 1
                        elif toks[k].text == '[':
                            d -= 1
                            if d == 0:
                                break
                        k -= 1
                    if k > 0 and toks[k - 1].text == '#':
                        f = k - 1
                        continue
                    break
                f -= 1
            groups[('toplevel',)].append((f, close))
            i = close + 1
            continue
        i += 1
    return toks, groups


def line_span(text, toks, f, l):
    """Whole-line span [L0, L1] (1-based) of an item; None if it shares a line with other tokens."""
    L0, L1 = toks[f].line, toks[l].line + toks[l].text.count('\n')
    ok_before = f == 0 or toks[f - 1].line + toks[f - 1].text.count('\n') < L0
    ok_after = l + 1 >= len(toks) or toks[l + 1].line > L1
    return (L0, L1) if ok_before and ok_after else None


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--tree', required=True)
    ap.add_argument('--pairs', required=True)
    ap.add_argument('--output', required=True)
    ap.add_argument('--files', required=True, help='comma list of files (relative to src/) to reorder')
    ap.add_argument('--levels', default='hard')
    ap.add_argument('--toplevel', action='store_true', help='also permute top-level fn items')
    a = ap.parse_args()
    tree, out = Path(a.tree), Path(a.output)
    assert not out.exists(), f'{out} exists'
    levels = set(a.levels.split(',')) | {'keep'}
    P = json.load(open(a.pairs))
    files = [f if f.startswith(PFX) else PFX + f for f in a.files.split(',') if f]
    out.mkdir(parents=True)
    shutil.copytree(tree / 'programs', out / 'programs', symlinks=True)
    # original text order: candidate symbol -> original windows paired with it (exact/coord bodies)
    from sites import Sites
    csyms = Sites(P['candidate_symbols']).windows
    orig_of = collections.defaultdict(list)
    for w in P['windows']:
        if w.get('pair') is not None and w['status'] in ('exact', 'coord'):
            orig_of[w['pair']].append(w['start'])
    def item_orig_addrs(cfile, group_key, name):
        mod = cfile[len(PFX):-3].split('/')
        if mod[-1] in ('mod', 'lib'):
            mod = mod[:-1]
        res = []
        for (cs, ce, sym) in csyms:
            sg = cxxfilt_lite.segs(sym)
            if sg[:1] != ['pump_amm_recovered'] or sg[1:1 + len(mod)] != mod:
                continue
            rest = sg[1 + len(mod):]
            if group_key[0] == 'impl':
                ty = group_key[-1]
                if len(rest) < 2 or not rest[0].startswith('<impl ') or not rest[0].rstrip('>').endswith('::' + ty) \
                        or rest[1] != name:
                    continue
            elif not rest or rest[0] != name:
                continue
            res += orig_of.get(cs, [])
        return sorted(res)
    report = {'tree': str(tree), 'pairs': a.pairs, 'levels': sorted(levels), 'files': {}}
    linemaps = {}
    for cfile in files:
        text = (tree / cfile).read_text()
        lines = text.split('\n')
        toks, groups = analyse(text, a.toplevel)
        cons = collections.defaultdict(list)    # cline -> [oline]   (S sites: decide normalized identity)
        lcons = collections.defaultdict(list)   # cline -> [oline]   (L Location records: fallback order key)
        for p in P['pairs']:
            if p.get('cfile') != cfile or p.get('ofile') != cfile:
                continue
            if p['kind'] == 'L':
                lcons[p['cline']].append(p['oline'])
                continue
            lvl = 'keep' if p['status'] == 'exact' else LEVEL.get(p['how'], 'soft')
            if lvl in levels:
                cons[p['cline']].append(p['oline'])
        rep = {'groups': [], 'moved': []}
        moves = []   # (old L0, old L1, new L0)
        for key, items in groups.items():
            spans = []
            for f, l in items:
                sp = line_span(text, toks, f, l)
                if sp is None:
                    spans = None
                    break
                spans.append((sp, item_name(toks, f, l), (f, l)))
            if spans is None or len(spans) < 2:
                continue
            keyed = []
            for (L0, L1), name, fl in spans:
                ol = sorted(o for c in range(L0, L1 + 1) for o in cons.get(c, []))
                ll = sorted(o for c in range(L0, L1 + 1) for o in lcons.get(c, []))
                k0 = ol[0] if ol else (ll[0] if ll else None)
                keyed.append({'span': (L0, L1), 'name': name, 'key': k0, 'olines': ol, 'loc_olines': ll, 'tok': fl,
                              'oaddr': item_orig_addrs(cfile, key, name)})
            # unconstrained items whose bodies match original windows follow the original text order
            # (in the original, functions of one file are laid out in source order): key = just after the
            # constrained item with the nearest smaller original address (or before the nearest larger)
            anchors = sorted((x['oaddr'][0], x['key']) for x in keyed if x['key'] is not None and x['oaddr'])
            for x in keyed:
                if x['key'] is None and x['oaddr'] and anchors:
                    lo = [k for a_, k in anchors if a_ < x['oaddr'][0]]
                    hi = [k for a_, k in anchors if a_ > x['oaddr'][0]]
                    x['key'] = (max(lo) + 0.5) if lo else (min(hi) - 0.5)
                    x['key_from'] = 'original text order'
            slots = [k for k, x in enumerate(keyed) if x['key'] is not None]
            order = sorted(slots, key=lambda k: (keyed[k]['key'], k))
            rep['groups'].append({'group': ' '.join(key), 'items': [(x['name'], x['span'], x['key'], [hex(v) for v in x['oaddr']]) for x in keyed],
                                  'new_order': [keyed[k]['name'] for k in order]})
            if order == slots:
                continue
            for slot, src in zip(slots, order):
                if slot != src:
                    moves.append((keyed[slot]['span'], keyed[src]['span'], keyed[src]['name']))
        if not moves:
            report['files'][cfile] = rep
            continue
        # rebuild the file: replace each destination slot's lines by the source item's lines
        dest_by_start = {}
        for dslot, sspan, name in moves:
            dest_by_start[dslot[0]] = (dslot, sspan, name)
        new_lines, lm = [], {}
        ln = 1
        while ln <= len(lines):
            if ln in dest_by_start:
                (d0, d1), (s0, s1), name = dest_by_start[ln]
                base = len(new_lines) + 1
                for k in range(s0, s1 + 1):
                    lm[k] = base + (k - s0)
                    new_lines.append(lines[k - 1])
                rep['moved'].append({'item': name, 'old_lines': [s0, s1], 'new_lines': [base, base + s1 - s0]})
                ln = d1 + 1
                continue
            # line not in any moved destination slot: identity
            if not any(d0 <= ln <= d1 for (d0, d1), _, _ in dest_by_start.values()):
                lm[ln] = len(new_lines) + 1
            new_lines.append(lines[ln - 1])
            ln += 1
        new_text = '\n'.join(new_lines)
        # verify: permutation of items
        t2, g2 = analyse(new_text, a.toplevel)
        def item_streams(tk, gr):
            return sorted(tuple((x.kind, x.text) for x in tk[f:l + 1]) for its in gr.values() for f, l in its)
        def skeleton(tk, gr):
            inside = set()
            for its in gr.values():
                for f, l in its:
                    inside.update(range(f, l + 1))
            return [(x.kind, x.text) for k, x in enumerate(tk) if k not in inside]
        ok = item_streams(toks, groups) == item_streams(t2, g2) and skeleton(toks, groups) == skeleton(t2, g2)
        rep['verified_permutation'] = ok
        if not ok:
            rep['error'] = 'permutation verification failed; file left unchanged'
            report['files'][cfile] = rep
            continue
        (out / cfile).write_text(new_text)
        linemaps[cfile] = lm
        report['files'][cfile] = rep
    # remap pairs
    P2 = copy.deepcopy(P)
    nmap = 0
    for p in P2['pairs']:
        lm = linemaps.get(p.get('cfile'))
        if lm and p.get('cline') in lm:
            p['cline'] = lm[p['cline']]
            nmap += 1
    P2['remapped_by'] = {'tool': 'reorder.py', 'files': sorted(linemaps), 'pairs_remapped': nmap}
    json.dump(P2, open(out / 'pairs.json', 'w'))
    json.dump(report, open(out / 'reorder-report.json', 'w'), indent=1)
    for f, r in report['files'].items():
        print(f.replace(PFX, ''), 'moved', len(r.get('moved', [])), 'verified', r.get('verified_permutation'),
              r.get('error', ''))
        for g in r['groups']:
            print('   ', g['group'], '->', ' '.join(g['new_order']))


if __name__ == '__main__':
    main()
