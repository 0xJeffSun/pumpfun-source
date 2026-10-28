# dsum.py <orig_start> <cand.so> <symregex>: summarize aligned diff (counts only, no listings)
import sys,subprocess,re,collections
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
st,so,sym=sys.argv[1:4]
out=subprocess.run([sys.executable,'-B',W+'/harness/win.py','show',st,'--cand',so,'--sym',sym,'--full'],capture_output=True,text=True).stdout.splitlines()
O=[];C=[];eq=0
for l in out:
    if l.startswith('- '): O.append(re.sub(r'^-\s+0x[0-9a-f]+\s+','',l).strip())
    elif l.startswith('+ '): C.append(re.sub(r'^\+\s+0x[0-9a-f]+\s+','',l).strip())
    elif re.match(r'^  0x[0-9a-f]+ 0x[0-9a-f]+',l): eq+=1
print('equal',eq,'orig-only',len(O),'cand-only',len(C))
norm=lambda s: re.sub(r'r10 - 0x[0-9a-f]+','r10-X',re.sub(r'\br\d\b','rN',re.sub(r'<.*>','',s))).strip()
co=collections.Counter(map(norm,O)); cc=collections.Counter(map(norm,C))
common=sum((co&cc).values())
print('after reg+stack masking: orig-only',sum((co-cc).values()),'cand-only',sum((cc-co).values()),'common',common)
for k,v in list((co-cc).items())[:int(sys.argv[4]) if len(sys.argv)>4 else 0]: print(' -',v,k)
for k,v in list((cc-co).items())[:int(sys.argv[4]) if len(sys.argv)>4 else 0]: print(' +',v,k)
