#!/usr/bin/env python3
"""irsearch.py <module.ll> <fn-substring> <win_hex> <mode> [jobs]: automated single-mutation search on one function.
modes: alloca (move each entry alloca to top / bottom of the alloca block), load (hoist each load to right after its
address def in the same block). Prints baseline and the best mutations by sacmp ratio."""
import sys, re, subprocess, os, tempfile, concurrent.futures as cf
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04'
LLC = os.path.expanduser('~/.cache/solana/v1.44/platform-tools/llvm/bin/llc')
mod, fn, win, mode = sys.argv[1:5]; jobs = int(sys.argv[5]) if len(sys.argv) > 5 else 4
t = open(mod).read()
m = [mm.start() for mm in re.finditer(r'^define [^\n]*' + re.escape(fn), t, re.M)]; assert len(m) == 1
s = m[0]; e = t.index('\n}\n', s) + 3; body = t[s:e]; pre, post = t[:s], t[e:]
lines = body.split('\n')
def run(tag, nb):
    d = tempfile.mkdtemp(dir=L + '/llx')
    p = d + '/m.ll'; open(p, 'w').write(pre + nb + post)
    r = subprocess.run([LLC, '-O3', '-march=sbf', '-mattr=+store-imm,+jmp-ext', '-function-sections', '-filetype=obj', p, '-o', d + '/m.o'], capture_output=True, text=True)
    if r.returncode: subprocess.run(['rm', '-rf', d]); return tag, None
    out = subprocess.run(['python3', '-B', L + '/tools/sacmp.py', d + '/m.o', win, fn], capture_output=True, text=True).stdout
    subprocess.run(['rm', '-rf', d])
    mm = re.search(r'size (\d+) .*ratio=([0-9.]+)', out)
    return tag, (float(mm.group(2)), int(mm.group(1))) if mm else None
muts = []
if mode == 'alloca':
    al = [i for i, l in enumerate(lines) if re.match(r'  %\S+ = alloca ', l)]
    for i in al:
        for where in ('top', 'bottom'):
            L2 = lines[:]; x = L2.pop(i)
            j = al[0] if where == 'top' else al[-1]
            L2.insert(j if where == 'top' else j, x)
            muts.append((f'{lines[i].split("=")[0].strip()}->{where}', '\n'.join(L2)))
elif mode == 'load':
    from_ = re.compile(r'  (%\S+) = load \S+, ptr (%\S+),')
    defs = {}
    for i, l in enumerate(lines):
        mm = re.match(r'  (%\S+) = ', l)
        if mm: defs[mm.group(1)] = i
    for i, l in enumerate(lines):
        mm = from_.match(l)
        if not mm: continue
        addr = mm.group(2); j = defs.get(addr)
        # find start of the block containing i
        b0 = max(k for k in range(i + 1) if k == 0 or lines[k - 1] == '' or lines[k].endswith(':') or ':' in lines[k][:1])
        tgt = (j + 1) if (j is not None and j < i) else None
        if tgt is None:
            # block start (after label line)
            k = i
            while k > 0 and not re.match(r'^\S.*:', lines[k]): k -= 1
            tgt = k + 1
            while re.match(r'  %\S+ = (alloca|phi) ', lines[tgt]): tgt += 1
        if tgt >= i: continue
        L2 = lines[:]; x = L2.pop(i); L2.insert(tgt, x)
        muts.append((f'load{i}:{mm.group(1)}^{tgt}', '\n'.join(L2)))
base = run('base', body)
print('base', base[1], 'muts', len(muts), flush=True)
res = []
with cf.ThreadPoolExecutor(jobs) as ex:
    for tag, r in ex.map(lambda a: run(*a), muts):
        if r: res.append((r[0], r[1], tag))
res.sort(reverse=True)
for r in res[:15]: print(f'{r[0]:.4f} {r[1]} {r[2]}')
