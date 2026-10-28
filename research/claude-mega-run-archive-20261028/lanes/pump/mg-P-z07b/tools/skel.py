#!/usr/bin/env python3
"""skel.py: compact basic-block skeleton of a function (original window or candidate symbol).
  skel.py orig START [--from A --to B] [--noerr]
  skel.py cand SO SYMREGEX [--from A --to B] [--noerr]
Error-construction blocks (calls to PumpError::name / fmt / From / with_values) are collapsed to ERR{..}.
Addresses printed relative to the function start (+off) so original and candidate can be compared."""
import sys, re, json, subprocess, bisect
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
L = W + '/lanes/mg-P-z07b'
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
sys.path.insert(0, W + '/harness')
args = sys.argv[1:]
def opt(name, default=None):
    if name in args:
        i = args.index(name); v = args[i + 1]; del args[i:i + 2]; return v
    return default
fr = opt('--from'); to = opt('--to')
noerr = '--noerr' in args
if noerr: args.remove('--noerr')
mode = args[0]
inv = json.load(open(W + '/base/L26/inventory.json'))['windows']
def short(sym):
    s = re.sub(r'17h[0-9a-f]{16}E$', '', sym)
    parts = re.findall(r'(\d+)([A-Za-z_$.][^\d]*?)(?=\d+[A-Za-z_$.]|$)', s)
    t = '::'.join(p[1] for p in parts[-2:]) if parts else s
    return t.replace('$LT$', '<').replace('$GT$', '>').replace('$u20$', ' ').replace('..', '::')[:48]
if mode == 'orig':
    st = int(args[1], 16)
    from score import original_windows
    w = next(x for x in original_windows() if x['start'] == st); en = st + w['bytes']
    lines = []
    for l in open(L + '/orig.dis'):
        m = re.match(r'^\s*([0-9a-f]+):\s*\t(.*)$', l)
        if not m: continue
        a = int(m.group(1), 16)
        if a < st: continue
        if a >= en: break
        lines.append((a, m.group(2).strip()))
    def callname(pc, ins):
        m = re.match(r'call (-?0x[0-9a-f]+|-?\d+)', ins); imm = int(m.group(1), 0)
        if imm >= 0x80000000: imm -= 1 << 32
        t = pc + (imm + 1) * 8
        e = inv.get(str(t))
        return short(e['symbols'][0]) if e and e['symbols'] else hex(t)
    import coords
    sites = {}
    try:
        out = subprocess.check_output([sys.executable, '-B', W + '/harness/coords.py', 'window', hex(st)], text=True)
        for x in json.loads(out): sites[st + x['line_slot']] = x['line']
    except Exception: pass
elif mode == 'obj':
    so, rx = args[1], args[2]
    t = subprocess.check_output([OBJ, '-t', so], text=True)
    sec = None
    for line in t.splitlines():
        m = re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
        if m and re.search(rx, m.group(4)): sec = m.group(2); st = int(m.group(1), 16); size = int(m.group(3), 16)
    en = st + size
    d = subprocess.check_output([OBJ, '-d', '-r', '--no-show-raw-insn', '-j', sec, so], text=True)
    lines = []; relo = {}
    for l in d.splitlines():
        m = re.match(r'^\s*([0-9a-f]+):\s*R_\w+\s+(\S+)', l)
        if m: relo[int(m.group(1), 16)] = m.group(2); continue
        m = re.match(r'^\s*([0-9a-f]+):\s*(.*)$', l)
        if m and m.group(2) and not m.group(2).endswith(':'): lines.append((int(m.group(1), 16), m.group(2).strip()))
    def callname(pc, ins):
        return short(relo.get(pc, '?'))
    sites = {}
else:
    so, rx = args[1], args[2]
    t = subprocess.check_output([OBJ, '-t', so], text=True)
    best = None
    for line in t.splitlines():
        m = re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
        if m and re.search(rx, m.group(4)): best = (int(m.group(1), 16), int(m.group(3), 16), m.group(4))
    st, size, name = best; en = st + size
    d = subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', f'--start-address={st:#x}', f'--stop-address={en:#x}', so], text=True)
    lines = []
    for l in d.splitlines():
        m = re.match(r'^\s*([0-9a-f]+):\s*(.*)$', l)
        if m and m.group(2) and not m.group(2).endswith(':'): lines.append((int(m.group(1), 16), m.group(2).strip()))
    syms = {}
    for line in t.splitlines():
        m = re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
        if m: syms[int(m.group(1), 16)] = m.group(4)
    def callname(pc, ins):
        m = re.match(r'call (-?0x[0-9a-f]+|-?\d+)', ins); imm = int(m.group(1), 0)
        if imm >= 0x80000000: imm -= 1 << 32
        tt = pc + (imm + 1) * 8
        return short(syms[tt]) if tt in syms else hex(tt)
    sites = {}
    try:
        out = subprocess.check_output([sys.executable, '-B', W + '/harness/coords.py', 'fn', hex(st), '--cand', so], text=True)
        for x in json.loads(out): sites[st + x['line_slot']] = x['line']
    except Exception: pass
def tgt(pc, ins):
    m = re.search(r'([+-]0x[0-9a-f]+|[+-]\d+)(?:\s|$|<)', ins.split(',')[-1] + ' ')
    off = int(m.group(1), 0)
    return pc + (off + 1) * 8
def cmp(ins):
    return {'jeq': '==', 'jne': '!=', 'jgt': '>u', 'jge': '>=u', 'jlt': '<u', 'jle': '<=u', 'jsgt': '>s', 'jsge': '>=s', 'jslt': '<s', 'jsle': '<=s', 'jset': '&'}
leaders = {st}
for i, (a, ins) in enumerate(lines):
    op = ins.split()[0]
    if op.startswith('j'):
        leaders.add(tgt(a, re.sub(r'\s*<.*>', '', ins)))
        if i + 1 < len(lines): leaders.add(lines[i + 1][0])
    if op == 'exit' and i + 1 < len(lines): leaders.add(lines[i + 1][0])
blocks = []; cur = None
for a, ins in lines:
    if a in leaders or cur is None:
        cur = [a, []]; blocks.append(cur)
    cur[1].append((a, re.sub(r'\s*<.*>', '', ins)))
def comp(a, ins):
    op = ins.split()[0]; rest = ins[len(op):].strip()
    m = re.match(r'(r\d+), \[(r\d+) ([+-]) 0x([0-9a-f]+)\]', rest)
    if op.startswith('ldx') and m: return f"{m.group(1)}=[{m.group(2)}{m.group(3)}{m.group(4)}]{op[3]}"
    m = re.match(r'\[(r\d+) ([+-]) 0x([0-9a-f]+)\], (\S+)', rest)
    if (op.startswith('stx') or op.startswith('st')) and m: return f"[{m.group(1)}{m.group(2)}{m.group(3)}]{op[-1] if op.startswith('st') and not op.startswith('stx') else op[3]}={m.group(4)}"
    if op.startswith('mov'): r, v = rest.split(', '); return f"{r}={v}"
    if op == 'call': return 'call ' + callname(a, ins)
    if op == 'lddw': r, v = rest.split(', '); return f"{r}=L{v}"
    if op.startswith('j') and op != 'ja':
        x, y = rest.split(', ')[:2]; return f"if {x}{cmp(ins)[op]}{y} ->{tgt(a, ins) - st:+#x}"
    if op == 'ja': return f"goto {tgt(a, ins) - st:+#x}"
    m = re.match(r'(add|sub|mul|div|and|or|xor|lsh|rsh|arsh|mod)(64|32) (r\d+), (\S+)', ins)
    if m: return f"{m.group(3)}{ {'add':'+','sub':'-','mul':'*','div':'/','and':'&','or':'|','xor':'^','lsh':'<<','rsh':'>>','arsh':'>>s','mod':'%'}[m.group(1)]}={m.group(4)}" + ('' if m.group(2) == '64' else 'w')
    return ins
ERRC = ('PumpError::name', 'fmt', 'From<', 'with_values')
for a, insl in blocks:
    if fr and a - st < int(fr, 16): continue
    if to and a - st > int(to, 16): continue
    calls = [callname(x, i) for x, i in insl if i.startswith('call')]
    lns = [sites[x] for x, _ in insl if x in sites]
    errish = any(any(k in c for k in ERRC) for c in calls)
    last = insl[-1][1]
    if errish:
        codes = sorted({int(v, 0) for _, i in insl for v in re.findall(r'0x[0-9a-f]+|\b\d+\b', i) if 6000 <= int(v, 0) < 6300})
        succ = comp(insl[-1][0], last) if last.split()[0].startswith('j') else ''
        if not noerr: print(f"{a - st:+#06x} ERR codes={codes} lines={lns} n={len(insl)} {succ}")
        continue
    body = '; '.join(comp(x, i) for x, i in insl)
    print(f"{a - st:+#06x} {body}" + (f"  @L{lns}" if lns else ''))
