# cseq.py SO ADDR NAME : side-by-side call sequence (orig vs cand) with instruction index
import sys,subprocess,re,difflib
from pathlib import Path
D=str(Path(__file__).parent/'dis.py')
def calls(args):
    out=subprocess.run(['python3','-I',D]+args,capture_output=True,text=True).stdout.splitlines()
    r=[]
    for i,l in enumerate(x for x in out if re.match(r'\s*[0-9a-f]+ ',x)):
        m=re.match(r'\s*([0-9a-f]+) call (.*)',l)
        if m:
            n=re.sub(r'17h[0-9a-f]{16}E?','',m.group(2)); n=re.sub(r'[<>]','',n)
            p=re.findall(r'\d+([A-Za-z_][\w$.]*)',n); r.append((i,(p[-1] if p else n)[:34]))
    return r
so,addr,name=sys.argv[1:4]
A=calls(['orig',addr]); B=calls(['cand',so,name])
sa=[x[1] for x in A]; sb=[x[1] for x in B]
for t,i1,i2,j1,j2 in difflib.SequenceMatcher(None,sa,sb,autojunk=False).get_opcodes():
    if t=='equal':
        for k in range(i2-i1): print('  %4d %4d  %s'%(A[i1+k][0],B[j1+k][0],sa[i1+k]))
    else:
        for k in range(i1,i2): print('- %4d       %s'%(A[k][0],sa[k]))
        for k in range(j1,j2): print('+      %4d  %s'%(B[k][0],sb[k]))
