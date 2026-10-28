import json,sys,re,subprocess
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
sys.path.insert(0,W+'/harness')
import win
inv=json.load(open(W+'/base/L12/inventory.json'))['windows']
starts=sorted(int(k) for k in inv)
import bisect
def wof(a):
    i=bisect.bisect_right(starts,a)-1
    s=starts[i]; return s
def name(a):
    s=wof(a); w=inv[str(s)]
    sy=w.get('symbols') or []
    return hex(s)+('' if s==a else '+%x'%(a-s)), (win.demangle(sy[0]) if sy else '?'), w['normalized']
st=int(sys.argv[1],16)
out=subprocess.run([sys.executable,W+'/harness/win.py','orig',sys.argv[1]],capture_output=True,text=True).stdout
for line in out.splitlines():
    m=re.match(r'(0x[0-9a-f]+)\s+call (-?0x[0-9a-f]+)',line)
    if m:
        pc=int(m.group(1),16); imm=int(m.group(2),16)
        t=(pc//8+1+imm)*8
        print(m.group(1), hex(t), *name(t))
