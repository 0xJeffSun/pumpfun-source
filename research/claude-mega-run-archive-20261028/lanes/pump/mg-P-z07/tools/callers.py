import re,sys,json
# usage: callers.py dis_file target_hex...   prints callers (pc) of target; also 'callees start end'
dis=sys.argv[1]
lines=open(dis).read().splitlines()
pat=re.compile(r'^\s*([0-9a-f]+):\s+call (-?0x[0-9a-f]+|-?\d+)')
calls=[]
for l in lines:
    m=pat.match(l)
    if m:
        pc=int(m.group(1),16); imm=int(m.group(2),0)
        if imm>=0x80000000: imm-=1<<32
        calls.append((pc,pc+(imm+1)*8))
inv=json.load(open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L12/inventory.json'))['windows']
starts=sorted(int(k) for k in inv)
import bisect
def owner(pc):
    i=bisect.bisect_right(starts,pc)-1
    return hex(starts[i]) if i>=0 else '?'
if sys.argv[2]=='callees':
    s=int(sys.argv[3],16); e=int(sys.argv[4],16)
    for pc,t in calls:
        if s<=pc<e: print(hex(pc),'->',hex(t), (inv[str(t)]['symbols'] or ['?'])[0][:110] if str(t) in inv else '')
else:
    for a in sys.argv[2:]:
        t=int(a,16)
        print(a,'callers:',[(hex(pc),owner(pc)) for pc,tt in calls if tt==t])
