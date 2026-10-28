# hist.py <orig_start> <cand.so> <symregex>: mnemonic histogram differences (orig vs cand)
import sys,subprocess,re,collections
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
st,so,sym=sys.argv[1:4]
out=subprocess.run([sys.executable,'-B',W+'/harness/win.py','show',st,'--cand',so,'--sym',sym,'--full'],capture_output=True,text=True).stdout.splitlines()
O=collections.Counter();C=collections.Counter()
for l in out:
    if l.startswith('- '): O[re.sub(r'^-\s+0x[0-9a-f]+\s+','',l).split()[0]]+=1
    elif l.startswith('+ '): C[re.sub(r'^\+\s+0x[0-9a-f]+\s+','',l).split()[0]]+=1
    elif re.match(r'^  0x[0-9a-f]+ 0x[0-9a-f]+',l):
        k=l.split()[2]; O[k]+=1; C[k]+=1
print('orig',sum(O.values()),'cand',sum(C.values()))
print(' '.join(f'{k}:{O[k]}/{C[k]}' for k in sorted(set(O)|set(C)) if O[k]!=C[k]))
