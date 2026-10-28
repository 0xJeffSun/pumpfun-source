#!/usr/bin/env python3
"""calls.py <win_hex> <cand.so> <symregex>: side-by-side call sequences (orig names via L20 inventory)."""
import sys, re, subprocess, json, bisect, difflib
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OD = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
win = int(sys.argv[1], 16); so = sys.argv[2]; sym = sys.argv[3]
inv = json.load(open(W + '/base/L20/inventory.json'))['windows']; starts = sorted(int(k) for k in inv)
def dm(s): return subprocess.run(['c++filt'], input=s, capture_output=True, text=True).stdout.strip()
def short(n):
    n = re.sub(r'::h[0-9a-f]{16}$', '', n); n = n.replace('$LT$', '<').replace('$GT$', '>').replace('$u20$', ' ').replace('..', '::')
    return n[-60:]
def calls(path, start, stop, namer):
    t = subprocess.run([OD, '-d', '--no-show-raw-insn', f'--start-address={start:#x}', f'--stop-address={stop:#x}', path], capture_output=True, text=True).stdout
    r = []
    for l in t.splitlines():
        m = re.match(r'\s*([0-9a-f]+):\s+call (-?0x[0-9a-f]+)', l)
        if m:
            pc = int(m.group(1), 16); imm = int(m.group(2), 16); r.append((pc - start, namer(pc + 8 + imm * 8)))
    return r
def oname(t):
    i = bisect.bisect_right(starts, t) - 1; o = starts[i]; s = (inv[str(o)]['symbols'] or ['?'])[0]
    return short(dm(s)) if t == o else f'mid{t:#x}'
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); from symtab import symtab as _st
symtab = _st(so)
_byaddr = {a: n for a, sz, n in symtab}
def cname(t):
    return short(_byaddr[t]) if t in _byaddr else f'mid{t:#x}'
a, sz, name = next(x for x in symtab if re.search(sym, x[2]))
oc = calls(W + '/base/original.so', win, win + inv[str(win)]['bytes'], oname); cc = calls(so, a, a + sz, cname)
on = [x[1] for x in oc]; cn = [x[1] for x in cc]
for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, on, cn, autojunk=False).get_opcodes():
    for k in range(max(i2 - i1, j2 - j1)):
        lo = f'{oc[i1+k][0]:5x} {oc[i1+k][1]}' if i1 + k < i2 else ''
        lc = f'{cc[j1+k][0]:5x} {cc[j1+k][1]}' if j1 + k < j2 else ''
        print(('  ' if tag == 'equal' else '! ') + f'{lo:68s} | {lc}')
