# irblk.py IN.ll FNSUB [FROM [TO]] : list IR blocks of fn: label, #insts, calls, terminator
import sys,re
s=open(sys.argv[1]).read(); sub=sys.argv[2]
m=re.search(r'(?m)^define [^\n]*'+re.escape(sub)+r'[^\n]*\{\n',s); st=m.end(); en=s.index('\n}\n',st)
body=s[st:en].split('\n')
blocks=[];cur=['entry',[]]
for l in body:
    mm=re.match(r'^([\w.$-]+):',l)
    if mm: blocks.append(cur); cur=[mm.group(1),[]]; continue
    if l.strip(): cur[1].append(l.strip())
blocks.append(cur)
lo=int(sys.argv[3]) if len(sys.argv)>3 else 0; hi=int(sys.argv[4]) if len(sys.argv)>4 else 10**9
def short(c):
    c=re.sub(r'_ZN\d+','',c); c=re.sub(r'17h[0-9a-f]{16}E','',c)
    p=re.findall(r'\d*([A-Za-z_][\w$.]*)',c); return '.'.join(p[-2:])[:40] if p else c[:40]
for k,(lab,ins) in enumerate(blocks):
    if not (lo<=k<hi): continue
    calls=[short(x) for x in re.findall(r'call [^@]*@([\w$.]+)',' '.join(ins)) if 'llvm.lifetime' not in x and 'llvm.dbg' not in x]
    lts=sum(1 for x in ins if 'llvm.lifetime' in x)
    t=ins[-1] if ins else ''
    t=re.sub(r'label %','%',t); t=re.sub(r', !prof !\d+','',t); t=t.replace('br i1 ','br ')
    print(k,lab,len(ins),'lt%d'%lts if lts else '',' '.join(calls)[:120],'|',t[:90])
