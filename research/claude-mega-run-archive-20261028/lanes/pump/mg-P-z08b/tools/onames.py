#!/usr/bin/env python3
"""onames.py <orig_start> [inventory.json]: calls in an original window, callee named via the inventory's matched symbols
(N=normalized match, '-'=unmatched window, then best guess from functions.tsv)."""
import sys, csv, json, subprocess, re
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from win import demangle
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
inv = json.load(open(sys.argv[2] if len(sys.argv) > 2 else W + '/base/L29/inventory.json'))['windows']
rows = {}
for r in csv.DictReader(open(W + '/base/functions.tsv'), delimiter='\t'):
    if r['program'] == 'pump' and r['variant'] == 'selected': rows[int(r['original_start'])] = r
def short(n):
    n = demangle(n); n = re.sub(r'::h[0-9a-f]{16}$', '', n); return n[-90:]
def name(a):
    w = inv.get(str(a))
    if w and w.get('symbols'): return ('N ' if w['normalized'] else '- ') + short(w['symbols'][0])
    r = rows.get(a)
    if r:
        n = json.loads(r['candidate_names']) if r['candidate_names'] else []
        return '- ?' + (short(n[0]) if n else '')
    return '?'
a = int(sys.argv[1], 16); e = int(rows[a]['original_end'])
txt = subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', f'--start-address={a:#x}', f'--stop-address={e:#x}', W + '/base/original.so'], text=True)
for line in txt.splitlines():
    m = re.match(r'^\s*([0-9a-f]+):\s+call\s+(-?0x[0-9a-f]+|-?\d+)', line)
    if m:
        pc = int(m.group(1), 16); imm = int(m.group(2), 0); t = pc + 8 + imm * 8
        print(f'{pc:#x} {t:#x} {name(t) if imm != -1 else "syscall/ext"}')
