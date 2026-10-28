# offmap.py <orig_start> <cand.so> <symregex>: stack-offset mapping orig->cand from paired diff lines (counts only)
import sys,subprocess,re,collections
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
st,so,sym=sys.argv[1:4]
out=subprocess.run([sys.executable,'-B',W+'/harness/win.py','show',st,'--cand',so,'--sym',sym,'--full'],capture_output=True,text=True).stdout.splitlines()
hunks=[];cur=([],[])
for l in out:
    if l.startswith('- '): cur[0].append(re.sub(r'^-\s+0x[0-9a-f]+\s+','',l).strip())
    elif l.startswith('+ '): cur[1].append(re.sub(r'^\+\s+0x[0-9a-f]+\s+','',l).strip())
    else:
        if cur[0] or cur[1]: hunks.append(cur)
        cur=([],[])
m=collections.Counter(); other=0
rx=re.compile(r'r10 - (0x[0-9a-f]+)')
for O,C in hunks:
    for a,b in zip(O,C):
        ka=rx.sub('X',a); kb=rx.sub('X',b)
        if ka==kb and rx.search(a): m[(rx.search(a).group(1),rx.search(b).group(1))]+=1
        else: other+=1
print('paired-offset-only',sum(m.values()),'other',other)
for (a,b),n in sorted(m.items(),key=lambda x:-int(x[0][0],16)): print(f' -{a} -> -{b} x{n}')
