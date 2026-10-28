# irsearch.py IN.ll FUNCSUB ORIGADDR SYMSUB : try every single block move (b>a); print best
import sys,subprocess,re,itertools
src,sub,oa,sym=sys.argv[1:5]; import os; OUTLL='srch%d.ll'%os.getpid(); OUTO='srch%d.o'%os.getpid()
s=open(src).read();i=s.index('define')
while sub not in s[i:s.index('\n',i)]: i=s.index('\ndefine',i)+1
names=[m.group(1) for m in re.finditer(r'^([\w.$-]+):',s[i:s.index('\n}\n',i)],re.M)]
res=[]
for b in names:
    for a in ['^']+names:
        if a==b: continue
        mv=f'{b}>{a}'
        subprocess.run(['python3','-B','irmove.py',src,OUTLL,sub,mv])
        r=subprocess.run(['./llc.sh',OUTLL,OUTO],capture_output=True,text=True)
        out=subprocess.run(['python3','-I','cmp.py',OUTO,sym,oa],capture_output=True,text=True).stdout
        try: nd=int(out.split('difflines=')[1])
        except: continue
        res.append((nd,mv))
res.sort();print(res[:8])
