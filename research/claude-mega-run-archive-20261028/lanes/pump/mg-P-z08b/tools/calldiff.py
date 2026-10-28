#!/usr/bin/env python3
"""calldiff.py <orig_start> <cand.so> <cand_symregex> [inventory.json]: aligned diff of callee sequences (orig callees named via
inventory matched symbols; cand via its symbols). Prints only non-equal opcodes + summary."""
import sys, csv, json, subprocess, re, difflib
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from win import demangle, Cand
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
inv = json.load(open(sys.argv[4] if len(sys.argv) > 4 else W + '/base/L29/inventory.json'))['windows']
rows = {}
for r in csv.DictReader(open(W + '/base/functions.tsv'), delimiter='\t'):
    if r['program'] == 'pump' and r['variant'] == 'selected': rows[int(r['original_start'])] = r
def short(n):
    n = demangle(n); n = re.sub(r'::h[0-9a-f]{16}$', '', n); n = re.sub(r'\{\{closure\}\}', 'CL', n); return n.split('::')[-1][-40:] if 'closure' not in n and 'CL' not in n else n[-40:]
def calls(so, a, n):
    txt = subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', f'--start-address={a:#x}', f'--stop-address={a+n:#x}', so], text=True)
    out = []
    for line in txt.splitlines():
        m = re.match(r'^\s*([0-9a-f]+):\s+call\s+(-?0x[0-9a-f]+|-?\d+)', line)
        if m:
            pc = int(m.group(1), 16); imm = int(m.group(2), 0); out.append((pc, pc + 8 + imm * 8 if imm != -1 else -1))
    return out
a = int(sys.argv[1], 16); e = int(rows[a]['original_end'])
oc = calls(W + '/base/original.so', a, e - a)
def oname(t):
    if t == -1: return 'EXT'
    w = inv.get(str(t))
    if w and w.get('symbols'): return short(w['symbols'][0])
    return f'?{t:#x}'
cand = Cand(sys.argv[2]); names = {s: nm for (s, _, nm) in cand.funcs}
fs = [(s, n, nm) for (s, n, nm) in cand.funcs if re.search(sys.argv[3], demangle(nm))]
s0, n0, nm0 = fs[0]
cc = calls(sys.argv[2], s0, n0)
on = [oname(t) for _, t in oc]; cn = [short(names[t]) if t in names else ('EXT' if t == -1 else f'?{t:#x}') for _, t in cc]
print(f'orig {len(on)} calls, cand {len(cn)} calls ({demangle(nm0)[:60]} {n0}B)')
sm = difflib.SequenceMatcher(None, on, cn, autojunk=False)
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal': print(f'  = {i2-i1} [{on[i1]} .. {on[i2-1]}]'); continue
    print(f'  {tag[0]} o{i1}: {on[i1:i2]}  |  c{j1}: {cn[j1:j2]}')
