# feat.py <orig_start> <cand.so> <symregex>: count feature patterns orig vs cand
import sys,subprocess,re
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
st,so,sym=sys.argv[1:4]
out=subprocess.run([sys.executable,'-B',W+'/harness/win.py','show',st,'--cand',so,'--sym',sym,'--full'],capture_output=True,text=True).stdout.splitlines()
O=[];C=[]
for l in out:
    if l.startswith('- '): O.append(re.sub(r'^-\s+0x[0-9a-f]+\s+','',l).strip())
    elif l.startswith('+ '): C.append(re.sub(r'^\+\s+0x[0-9a-f]+\s+','',l).strip())
    elif re.match(r'^  0x[0-9a-f]+ 0x[0-9a-f]+',l):
        s=re.sub(r'^  0x[0-9a-f]+ 0x[0-9a-f]+\s+','',l).strip(); O.append(s); C.append(s)
P={'rc_inc':r'^add64 r\d, 0x1$','rc_dec':r'^add64 r\d, -0x1$','calls':r'^call ','exit':r'^exit','stack_st':r'^st\w+ \[r10','stack_ld':r'^ldx\w+ r\d, \[r10','lddw':r'^lddw','jne0':r'^jne r\d, 0x0'}
for k,p in P.items(): print(k, sum(1 for x in O if re.search(p,x)), sum(1 for x in C if re.search(p,x)))
