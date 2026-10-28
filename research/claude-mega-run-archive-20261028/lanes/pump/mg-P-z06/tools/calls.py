import json,sys,re,bisect
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from win import demangle
d=json.load(open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L12/inventory.json'))['windows']
ks=sorted(int(x) for x in d)
def name(t):
    i=bisect.bisect_right(ks,t)-1
    if i<0: return '?'
    k=ks[i]; v=d[str(k)]
    off='' if k==t else f'+{t-k:#x}'
    return f"{'M' if v['normalized'] else 'U'} {hex(k)}{off} "+(demangle(v['symbols'][0]) if v['symbols'] else '-')
for line in open(sys.argv[1]):
    m=re.match(r'(0x[0-9a-f]+)\s+call (-?0x[0-9a-f]+)',line.strip())
    if m:
        a=int(m.group(1),16); t=a+8+int(m.group(2),16)*8
        print(line.strip(), '->', hex(t), name(t)[:150])
    elif re.search(r'exit|stw \[r10 - 0x[0-9a-f]+\], 0x1[0-9a-f]{3}$',line): print(line.strip())
