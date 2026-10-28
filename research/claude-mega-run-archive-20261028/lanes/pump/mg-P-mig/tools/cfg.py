#!/usr/bin/env python3
"""cfg.py orig <win_hex> | cfg.py <so> <symregex> : compact basic-block summary (offset, n insns, calls, error codes, succs).
Calls named via L27 inventory (orig) or the so's symtab (cand)."""
import sys, re, subprocess, json, bisect
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OD = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
sys.path.insert(0, W + '/lanes/mg-P-z04/tools'); from symtab import symtab
inv = json.load(open(W + '/base/L27/inventory.json'))['windows']; starts = sorted(int(k) for k in inv)
def short(n):
    n = re.sub(r'(::h|17h)[0-9a-f]{16}E?$', '', n)
    for a, b in (('$LT$', '<'), ('$GT$', '>'), ('$u20$', ' '), ('..', '::'), ('$u7b$$u7b$closure$u7d$$u7d$', '{cl}')): n = n.replace(a, b)
    n = re.sub(r'^_ZN', '', n); n = re.sub(r'\d+([A-Za-z_<{])', r'::\1', n)
    return n.split('::')[-1] if 'closure' not in n and '{cl}' not in n else 'closure'
if sys.argv[1] == 'orig':
    so = W + '/base/original.so'; start = int(sys.argv[2], 16)
    size = next(len(w['raw']) for w in __import__('score').original_windows() if w['start'] == start) if False else None
    sys.path.insert(0, W + '/harness'); from score import original_windows
    size = next(len(w['raw']) for w in original_windows() if w['start'] == start)
    def name(t):
        i = bisect.bisect_right(starts, t) - 1; o = starts[i]
        if t != o: return f'mid{t:#x}'
        v = inv[str(o)]; s = (v['symbols'] or [''])[0]
        return (short(s) if s else 'UNM') + f'@{t:#x}'
else:
    so = sys.argv[1]; st = symtab(so)
    start, size, nm = next(x for x in st if re.search(sys.argv[2], x[2]))
    by = {a: n for a, s, n in st}
    def name(t): return short(by[t]) if t in by else f'mid{t:#x}'
t = subprocess.run([OD, '-d', '--no-show-raw-insn', f'--start-address={start:#x}', f'--stop-address={start+size:#x}', so], capture_output=True, text=True).stdout
ins = []
for l in t.splitlines():
    m = re.match(r'\s*([0-9a-f]+):\s+(\S+)\s*(.*)', l)
    if m and int(m.group(1), 16) >= start: ins.append((int(m.group(1), 16) - start, m.group(2), m.group(3)))
def tgt(op, args, pc):
    m = re.search(r'([+-]0x[0-9a-f]+)\s*<', args) or re.search(r'([+-]0x[0-9a-f]+)$', args)
    return pc + 8 + int(m.group(1), 16) * 8 if m else None
leaders = {0}
for i, (pc, op, args) in enumerate(ins):
    if op.startswith('j'):
        x = tgt(op, args, pc)
        if x is not None: leaders.add(x)
        if i + 1 < len(ins): leaders.add(ins[i + 1][0])
    if op == 'exit' and i + 1 < len(ins): leaders.add(ins[i + 1][0])
blocks = []; cur = None
for pc, op, args in ins:
    if pc in leaders: cur = [pc, []]; blocks.append(cur)
    cur[1].append((pc, op, args))
mode = sys.argv[3] if len(sys.argv) > 3 else ''
for b0, body in blocks:
    feats = []
    for pc, op, args in body:
        if op == 'call':
            m = re.search(r'(-?0x[0-9a-f]+)', args); imm = int(m.group(1), 16)
            feats.append('C:' + ('syscall' if imm == -1 else name(start + pc + 8 + imm * 8)))
        elif op.startswith('st') and re.search(r'0x17[0-9a-f]{2}$|0x1770$|0x1[0-9a-f]{3}$', args) and re.search(r', 0x1[0-9a-f]{3}$', args):
            v = int(args.split(',')[-1], 16)
            if 6000 <= v < 6200 or 100 <= v < 5000: feats.append(f'E{v}')
        elif op == 'lddw' and mode == 'all': feats.append('L')
    lp, lo, la = body[-1]
    if lo.startswith('j'):
        x = tgt(lo, la, lp); term = (f'{lo} {la.split(",")[0] if "," in la else ""} ->{x:#x}' if lo != 'ja' else f'ja ->{x:#x}')
        if lo != 'ja': term += ' | ft'
    elif lo == 'exit': term = 'EXIT'
    else: term = 'ft'
    print(f'{b0:#06x} n{len(body):<3d} {" ".join(feats)[:150]}  [{term}]')
