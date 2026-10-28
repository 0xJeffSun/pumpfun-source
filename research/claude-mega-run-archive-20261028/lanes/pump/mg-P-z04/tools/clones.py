#!/usr/bin/env python3
"""clones.py <orig|obj/so> <win|fn> : sequence of AccountInfo clones (Rc inc of [p+8]) with p's provenance [base+off]."""
import sys, re, subprocess, json
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools')
OD = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
def get(a1, a2):
    if a1 == 'orig':
        inv = json.load(open(W + '/base/L20/inventory.json'))['windows']; st = int(a2, 16); sz = inv[str(st)]['bytes']
        t = subprocess.run([OD, '-d', '--no-show-raw-insn', f'--start-address={st:#x}', f'--stop-address={st+sz:#x}', W + '/base/original.so'], capture_output=True, text=True).stdout
    elif a1.endswith('.o'):
        name = next(l.split()[-1] for l in subprocess.run([OD, '-t', a1], capture_output=True, text=True).stdout.splitlines() if a2 in l and ' F ' in l)
        t = subprocess.run([OD, '-d', '--no-show-raw-insn', f'--section=.text.{name}', a1], capture_output=True, text=True).stdout
    else:
        from symtab import symtab
        st, sz, _ = next(x for x in symtab(a1) if a2 in x[2])
        t = subprocess.run([OD, '-d', '--no-show-raw-insn', f'--start-address={st:#x}', f'--stop-address={st+sz:#x}', a1], capture_output=True, text=True).stdout
    return [re.sub(r'^\s*[0-9a-f]+:\s+', '', l).split('<')[0].strip() for l in t.splitlines() if re.match(r'\s*[0-9a-f]+:\s', l)]
if __name__ == "__main__":
    ins = get(sys.argv[1], sys.argv[2])
    out = []
    def defof(reg, i, lim=30):
        for j in range(i - 1, max(-1, i - lim), -1):
            mm = re.match(rf'ldxdw {reg}, \[(r\d+) ([+-]) (0x[0-9a-f]+)\]$', ins[j])
            if mm: return j, mm.group(1), mm.group(2) + mm.group(3)
            if re.match(rf'(mov64|add64|ldxb|lddw|ldxw) {reg},', ins[j]): return j, None, ins[j][:24]
        return None, None, '?'
    for i, s_ in enumerate(ins):
        m = re.match(r'add64 (r\d), 0x1$', s_)
        if not m: continue
        c = m.group(1)
        j, base, off = defof(c, i, 4)
        if j is None or off != '+0x0': continue
        k, base2, off2 = defof(base, j, 12)
        if off2 not in ('+0x8', '+0x10'): continue
        kind = 'L' if off2 == '+0x8' else 'D'
        if kind == 'D': continue
        q, base3, off3 = defof(base2, k, 40)
        out.append(f'{i}:{base3}{off3}' if base3 else f'{i}:{off3}')
    print(len(out), ' '.join(out))
    