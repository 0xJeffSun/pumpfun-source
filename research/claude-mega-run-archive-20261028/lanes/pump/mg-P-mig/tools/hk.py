#!/usr/bin/env python3
"""hk.py <obj.o|so> <sym-regex> [win=0x49888] [--show K[,K..]] [--max N]
Hunk summary of a compiled fn vs the original window, normalized like score.py (call imm + lddw imm masked).
Default: one line per differing hunk (index, orig insn idx, tag, -n/+m, first differing insn of each side, truncated).
--show K: print hunk K fully (capped at --max lines per side, default 12)."""
import sys, re, subprocess, difflib
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OD = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
sys.path.insert(0, W + '/harness'); from score import original_windows
a = sys.argv[1:]
show = []; mx = 12
if '--show' in a: i = a.index('--show'); show = [int(x) for x in a[i+1].split(',')]; del a[i:i+2]
if '--max' in a: i = a.index('--max'); mx = int(a[i+1]); del a[i:i+2]
obj, rx = a[0], a[1]; win = int(a[2], 16) if len(a) > 2 else 0x49888
w = next(x for x in original_windows() if x['start'] == win)
def dis_bytes(raw):
    out = []; i = 0
    while i < len(raw):
        n = 16 if raw[i] == 0x18 else 8; out.append(raw[i:i+n]); i += n
    return out
def norm(t):
    t = bytearray(t)
    if t[0] == 0x18: t[4:8] = bytes(4); t[12:16] = bytes(4)
    if t[0] == 0x85: t[4:8] = bytes(4)
    return bytes(t)
FNINFO = {}
def fn_bytes(path):
    txt = subprocess.check_output([OD, '-t', path], text=True); best = None
    for line in txt.splitlines():
        m = re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
        if m and re.search(rx, m.group(4)): best = (m.group(2), int(m.group(1), 16), int(m.group(3), 16), m.group(4))
    sec, off, size, name = best
    FNINFO.update(sec=sec, off=off, size=size, name=name)
    if path.endswith('.so'):
        b = open(path, 'rb').read(); import struct
        shoff = struct.unpack_from('<Q', b, 0x28)[0]; shentsize, shnum = struct.unpack_from('<HH', b, 0x3a)
        for i in range(shnum):
            o = shoff + i * shentsize; nm, typ, fl, addr, offs, sz = struct.unpack_from('<IIQQQQ', b, o)
            if addr <= off < addr + sz and typ == 1: return b[offs + off - addr: offs + off - addr + size]
    dump = subprocess.check_output([OD, '-s', '-j', sec, path], text=True); data = bytearray()
    for line in dump.splitlines():
        mm = re.match(r'^ ([0-9a-f]{4,}) ((?:[0-9a-f]{8} ?){1,4})', line)
        if mm: data += bytes.fromhex(mm.group(2).replace(' ', ''))
    return bytes(data[off:off + size])
def text(tokens):
    import tempfile, os
    f = tempfile.NamedTemporaryFile(delete=False, suffix='.bin'); f.write(b''.join(tokens)); f.close()
    t = subprocess.run([OD, '-d', '--no-show-raw-insn', '--triple=sbf', '-b', 'binary', '-D', f.name], capture_output=True, text=True).stdout
    os.unlink(f.name)
    return [re.sub(r'\s+', ' ', l.split(':', 1)[1]).strip() for l in t.splitlines() if re.match(r'\s+[0-9a-f]+:', l)]
ot = dis_bytes(w['raw']); ct = dis_bytes(fn_bytes(obj))
def odlines(path, start, stop, sec=None):
    cmd = [OD, '-d', '--no-show-raw-insn', f'--start-address={start:#x}', f'--stop-address={stop:#x}']
    if sec: cmd += ['-j', sec]
    t = subprocess.run(cmd + [path], capture_output=True, text=True).stdout
    return [re.sub(r'\s+', ' ', l.split(':', 1)[1]).split('<')[0].strip() for l in t.splitlines() if re.match(r'\s+[0-9a-f]+:\s', l)]
OT = odlines(W + '/base/original.so', win, win + len(w['raw']))
CT = odlines(obj, FNINFO['off'], FNINFO['off'] + FNINFO['size'], FNINFO['sec'] if obj.endswith('.o') else None)
on = [norm(x) for x in ot]; cn = [norm(x) for x in ct]
sm = difflib.SequenceMatcher(None, on, cn, autojunk=False)
ops = [o for o in sm.get_opcodes() if o[0] != 'equal']
diff = sum(max(i2 - i1, j2 - j1) for t, i1, i2, j1, j2 in ops)
print(f'{len(on)} vs {len(cn)} insns ratio={sm.ratio():.4f} diffslots={diff} hunks={len(ops)}' + (' MATCH' if on == cn else ''))
def txo(i, j): return OT[i:j] or ['']
def txc(i, j): return CT[i:j] or ['']
for k, (tag, i1, i2, j1, j2) in enumerate(ops):
    if show and k not in show: continue
    if not show:
        oa = txo(i1, i1+1) if i2 > i1 else ['']; ca = txc(j1, j1+1) if j2 > j1 else ['']
        print(f'#{k:<3d} o{i1:<5d} {tag[:3]} -{i2-i1}/+{j2-j1}  {oa[0][:34]:34s} | {ca[0][:34]}')
    else:
        print(f'#{k} o{i1} c{j1} {tag} -{i2-i1}/+{j2-j1}')
        for l in txo(i1, min(i2, i1 + mx)): print('  -', l)
        for l in txc(j1, min(j2, j1 + mx)): print('  +', l)
