# mhunks.py <orig_start> <cand.so> <symregex> [maxhunks]: print hunks whose register/offset-masked text differs (short)
import sys,subprocess,re,collections
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
st,so,sym=sys.argv[1:4]; mx=int(sys.argv[4]) if len(sys.argv)>4 else 3
out=subprocess.run([sys.executable,'-B',W+'/harness/win.py','show',st,'--cand',so,'--sym',sym,'--full'],capture_output=True,text=True).stdout.splitlines()
n=lambda s: re.sub(r'<.*>','',re.sub(r'([+-]0x[0-9a-f]+)$','OFF',re.sub(r'r10 - 0x[0-9a-f]+','r10-X',re.sub(r'\br\d\b','rN',s)))).strip()
hunks=[];cur=[]
for l in out:
    if l.startswith('- ') or l.startswith('+ '): cur.append(l)
    else:
        if cur: hunks.append(cur)
        cur=[]
k=0
for h in hunks:
    O=collections.Counter(n(re.sub(r'^-\s+0x[0-9a-f]+\s+','',l)) for l in h if l.startswith('-'))
    C=collections.Counter(n(re.sub(r'^\+\s+0x[0-9a-f]+\s+','',l)) for l in h if l.startswith('+'))
    if O!=C:
        k+=1
        for l in h[:14]: print(l[:70])
        print('  ~~~')
        if k>=mx: break
