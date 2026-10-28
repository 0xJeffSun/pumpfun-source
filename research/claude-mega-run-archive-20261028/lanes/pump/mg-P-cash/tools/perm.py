#!/usr/bin/env python3
"""perm.py: IR block-order experiments on claim_c event block. Units = consecutive line groups identified by a start regex
(+ count of lines). Tries given orderings of the units (placing them at the position of the first unit)."""
import re, subprocess, sys, itertools
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-cash'
mod = L + '/ir/m1c.ll'; fn = 'cashback7claim_c17'
s = open(mod).read()
for n in range(54, 59):
    s = re.sub(r'%' + str(n) + r'\b', '%ev' + str(n), s)
lines = s.split('\n')
def find(rx, start=0):
    for i in range(start, len(lines)):
        if re.search(rx, lines[i]): return i
    raise SystemExit('nf ' + rx)
f0 = find(r'^define .*' + fn)
U = {
 'upd': (find(r'store i64 %_133.0, ptr %45', f0), 1),
 'lts': (find(r'lifetime.start.p0\(i64 64, ptr nonnull %event\)', f0), 1),
 'kp':  (find(r'%_140 = load ptr', f0), 1),
 'mc':  (find(r'memcpy.p0.p0.i64\(ptr noundef nonnull align 8 dereferenceable\(32\) %event', f0), 1),
 'ern': (find(r'%ev54 = getelementptr', f0), 2),
 'sa':  (find(r'%ev55 = getelementptr', f0), 2),
 'st':  (find(r'%ev56 = getelementptr', f0), 2),
 'sc':  (find(r'%ev57 = getelementptr', f0), 2),
 'se':  (find(r'%ev58 = getelementptr', f0), 2),
}
order0 = sorted(U, key=lambda k: U[k][0])
lo = U[order0[0]][0]; hi = max(a + c for a, c in U.values())
assert hi - lo == sum(c for a, c in U.values()), (lo, hi)
def run(tag, order):
    blk = []
    for k in order:
        a, c = U[k]; blk += lines[a:a + c]
    t = '\n'.join(lines[:lo] + blk + lines[hi:])
    p = f'{L}/llx/{tag}.ll'; open(p, 'w').write(t)
    r = subprocess.run(['bash', L + '/tools/llf.sh', p, tag, '0x76a28', fn], capture_output=True, text=True)
    print(' '.join(order), '|', (r.stdout.strip() or r.stderr.strip()[-200:]).split('\n')[-1])
if __name__ == '__main__':
    print('base', order0)
    for spec in sys.argv[1:]:
        run('p_' + spec.replace(',', '_'), spec.split(','))
