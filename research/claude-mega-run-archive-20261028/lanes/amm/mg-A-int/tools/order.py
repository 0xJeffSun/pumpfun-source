"""order.py SYMBOLS.so ROWS.json : compare function order (orig address order vs candidate address order) for matched windows.
Prints LIS size and module-level runs (first path components of demangled names) in original order with cand ranks."""
import json, sys, types, subprocess, bisect
from pathlib import Path
T = Path.home()/'amm100-run/shared/tools'
m = types.ModuleType('e'); p = T/'elf_reader_src.py'; m.__file__ = str(p); exec(compile(p.read_bytes(), str(p), 'exec'), m.__dict__)
c = m.Elf(Path(sys.argv[1])); rows = json.load(open(sys.argv[2]))
addr = {f['name']: f['start'] for f in c.funcs}
pairs = sorted((int(r['original'], 16), addr[r['match']], r['match']) for r in rows if r['match'] and r['match'] in addr)
seq = [b for _, b, _ in pairs]
# LIS
tails = []; 
for x in seq:
    i = bisect.bisect_left(tails, x)
    if i == len(tails): tails.append(x)
    else: tails[i] = x
print('matched', len(pairs), 'LIS', len(tails))
names = subprocess.run(['c++filt', '-n'], input='\n'.join(n for _, _, n in pairs), capture_output=True, text=True).stdout.split('\n')
def mod(n):
    n = n.replace('pump_amm_recovered::', '')
    if n.startswith('<'): n = n[1:]
    parts = n.split('::')
    return '::'.join(parts[:2]) if parts[0] in ('instructions', 'state', 'utils', 'curve') else parts[0]
runs = []
for (oa, ca, _), n in zip(pairs, names):
    k = mod(n)
    if runs and runs[-1][0] == k: runs[-1][1].append(ca)
    else: runs.append((k, [ca], oa))
for k, cas, oa in runs:
    if len(cas) >= 2 or True: print(hex(oa), k[:50], len(cas), 'cand', hex(min(cas)), hex(max(cas)))
