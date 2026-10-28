"""origlines.py [FILE_SUBSTR] : (file,line) constants embedded in the ORIGINAL per window (from orig.dis lddw of path strings).
Prints file: line@window(status733/statusC) ..."""
import re,json,sys,collections
from pathlib import Path
H=Path.home()/'amm100-run/lanes'
b=open(Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so','rb').read()
dis=open(H/'mg-A-int/orig.dis').read().splitlines()
R7={int(r['original'],16):r for r in json.load(open(H/'mg-base733/out/rows.json'))}
RC={int(r['original'],16):r for r in json.load(open(H/'collect-C/out/rows.json'))}
ws=sorted(R7)
import bisect
out=collections.defaultdict(set)
for k,l in enumerate(dis):
    m=re.search(r'^\s*([0-9a-f]+):\s+lddw r\d+, 0x([0-9a-f]+)$',l)
    if not m: continue
    v=int(m.group(2),16)
    if v>=len(b) or not b[v:v+9]==b'programs/': continue
    win=dis[max(0,k-8):k+10]
    stores={}
    for x in win:
        mm=re.search(r'(stw|stdw) \[r10 - 0x([0-9a-f]+)\], 0x([0-9a-f]+)$',x)
        if mm: stores.setdefault((mm.group(1),int(mm.group(2),16)),int(mm.group(3),16))
    ln=None; L=None
    for (kind,off),val in stores.items():
        if kind=='stdw' and 20<=val<=90 and ('stw',off-8) in stores:
            L=val; ln=stores[('stw',off-8)]; break
    if L is None: continue
    nm=b[v:v+L].decode(errors='replace')
    a=int(m.group(1),16); w=ws[bisect.bisect_right(ws,a)-1]
    st=('Y' if R7[w]['match'] else '.')+('Y' if RC[w]['match'] else '.')
    out[nm[22:]].add((ln,hex(w),st))
flt=sys.argv[1] if len(sys.argv)>1 else ''
for f in sorted(out):
    if flt in f: print(f+':', ' '.join(f'{l}@{w}{s}' for l,w,s in sorted(out[f],key=lambda t:(t[0] or 0))))
