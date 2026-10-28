# irskel.py IN.ll FUNCSUB : block order + terminators (short)
import sys,re
src=open(sys.argv[1]).read();sub=sys.argv[2]
i=src.index('define')
while sub not in src[i:src.index('\n',i)]: i=src.index('\ndefine',i)+1
body=src[i:src.index('\n}\n',i)].split('\n')[1:]
cur='start';stores=0;out=[]
for l in body:
    m=re.match(r'^([\w.$-]+):',l)
    if m: cur=m.group(1);stores=0;continue
    t=l.strip()
    if t.startswith('store'): stores+=1
    if t.startswith(('br ','ret','switch','unreachable')):
        t=re.sub(r'label %','',t);t=re.sub(r', !\w+ !\d+','',t)
        out.append(f'{cur}[{stores}st]: {t[:90]}')
print('\n'.join(out))
