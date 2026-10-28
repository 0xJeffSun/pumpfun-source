#!/usr/bin/env python3
"""hot.py orig <start> | cand <so> <symregex>  [--all]
Hot-path skeleton of a function in layout order: per non-error basic block print calls, Source lines, and
conditional branches into error blocks annotated with the error code / line they reach.
Error blocks = blocks containing error-construction calls or 60xx immediates (and blocks only reaching them)."""
import sys, re, json, bisect
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
sys.path.insert(0, W + '/harness')
import win, coords
from score import original_windows, body
args = [a for a in sys.argv[1:] if not a.startswith('--')]
ALL = '--all' in sys.argv
inv = json.load(open(W + '/base/L27/inventory.json'))['windows']; starts = sorted(int(k) for k in inv)
def oname(t):
    i = bisect.bisect_right(starts, t) - 1; s = starts[i]; sy = inv[str(s)].get('symbols') or []
    n = (win.demangle(sy[0]) if sy else '?%x' % s).split('::')
    n = [p for p in n if not p.startswith('_{{')]
    return '::'.join(n[-2:])[:40] + ('' if s == t else '+%x' % (t - s))
if args[0] == 'orig':
    st = int(args[1], 0); w = next(x for x in original_windows() if x['start'] == st); size = w['bytes']
    path = W + '/base/original.so'; blob = win.ORIG; secs = win.ORIG_SECS; nm = oname
else:
    path = args[1]; c = win.Cand(path); f = [x for x in c.funcs if re.search(args[2], x[2])]
    st, size, _ = f[0]; blob = c.blob; secs = c.secs
    fmap = sorted((a, win.demangle(b)) for a, _, b in c.funcs); ks = [x[0] for x in fmap]
    def nm(t):
        i = bisect.bisect_right(ks, t) - 1; s, n = fmap[i]; n = [p for p in n.split('::') if not p.startswith('_{{')]
        return '::'.join(n[-2:])[:40] + ('' if s == t else '+%x' % (t - s))
raw = body(blob, secs, st, size)
sites = {}
for s in coords.sites(blob, secs, st, raw):
    sites[s['slot']] = s['line']
txt = win.objdump_text(path, st, st + size)
pcs = sorted(txt)
lead = {st}; tgt = {}
for i, pc in enumerate(pcs):
    t = txt[pc]; m = re.match(r'(j\w+)\s.*?([+-]0x[0-9a-f]+|[+-]\d+)$', t.split('<')[0].strip())
    if t.startswith('j') and m:
        d = pc + 8 + int(m.group(2), 0) * 8; tgt[pc] = d; lead.add(d)
        if i + 1 < len(pcs): lead.add(pcs[i + 1])
    elif t.startswith('exit') and i + 1 < len(pcs): lead.add(pcs[i + 1])
Ls = sorted(x for x in lead if st <= x < st + size); bi = {a: i for i, a in enumerate(Ls)}
ERRC = re.compile(r'PumpError::name|AnchorError>>::from|with_values|ProgramError>>::from|unwrap_failed|Display>::fmt|ToString>::to_string|ErrorCode')
B = []
for i, a in enumerate(Ls):
    e = Ls[i + 1] if i + 1 < len(Ls) else st + size
    ps = [p for p in pcs if a <= p < e]
    calls = []; codes = []; lines = []
    for p in ps:
        t = txt[p]
        m = re.match(r'call (-?0x[0-9a-f]+)$', t)
        if m: calls.append(nm((p // 8 + 1 + int(m.group(1), 16)) * 8))
        elif t.startswith('call'): calls.append(t.split()[1])
        if p - st in sites: lines.append(sites[p - st])
        for m2 in re.finditer(r'\b(0x[0-9a-f]+|\d+)\b', t.split(',')[-1] if ',' in t else ''):
            v = int(m2.group(1), 0)
            if 6000 <= v < 6200: codes.append(v)
    last = txt[ps[-1]]; succ = []
    if ps[-1] in tgt: succ.append(bi.get(tgt[ps[-1]], -1))
    ft = not last.startswith('ja') and not last.startswith('exit') and i + 1 < len(Ls)
    B.append(dict(a=a, idx=(a - st) // 8, n=len(ps), calls=calls, codes=codes, lines=lines, br=(bi.get(tgt[ps[-1]], -1) if ps[-1] in tgt else None),
                  cond=last.startswith('j') and not last.startswith('ja'), ft=(i + 1 if ft else None), last=last, exit=last.startswith('exit')))
err = [bool(b['codes']) or any(ERRC.search(c) for c in b['calls']) for b in B]
# propagate: a block whose every successor is an error block and which has no non-error call is an error block
for _ in range(6):
    for i, b in enumerate(B):
        if err[i] or b['exit']: continue
        su = [s for s in (b['br'], b['ft']) if s is not None and s >= 0]
        if su and all(err[s] for s in su) and not [c for c in b['calls'] if not ERRC.search(c) and 'memcpy' not in c]: err[i] = True
def reach(s, d=0):
    """first error code/line reachable from error block s"""
    seen = set(); st_ = [s]; codes = []; lines = []
    while st_ and len(seen) < 12:
        k = st_.pop(0)
        if k in seen or k is None or k < 0: continue
        seen.add(k); codes += B[k]['codes']; lines += B[k]['lines']
        if codes and lines: break
        for x in (B[k]['ft'], B[k]['br']):
            if x is not None and x >= 0 and err[x]: st_.append(x)
    return ('E%d' % codes[0] if codes else 'E?') + ('/L%d' % lines[0] if lines else '')
out = []
for i, b in enumerate(B):
    if err[i] and not ALL: continue
    s = 'B%d+%d' % (i, b['idx'])
    if b['calls']: s += ' C[' + '; '.join(b['calls']) + ']'
    if b['lines'] and not err[i]: s += ' L' + ','.join(map(str, b['lines']))
    if b['cond'] and b['br'] is not None:
        op = b['last'].split()[0]
        if b['br'] >= 0 and err[b['br']]: s += ' %s->ERR %s' % (op, reach(b['br']))
        elif b['ft'] is not None and err[b['ft']]: s += ' %s(ft->ERR %s)->B%d' % (op, reach(b['ft']), b['br'])
        else: s += ' %s->B%d' % (op, b['br'])
    elif b['last'].startswith('ja'): s += ' ja->B%d%s' % (b['br'], '(ERR %s)' % reach(b['br']) if b['br'] >= 0 and err[b['br']] else '')
    elif b['exit']: s += ' EXIT'
    if err[i]: s = '  !' + s + ' ' + ','.join('E%d' % c for c in b['codes']) + ' ' + ','.join('L%d' % l for l in b['lines'])
    out.append(s)
print('\n'.join(out))
