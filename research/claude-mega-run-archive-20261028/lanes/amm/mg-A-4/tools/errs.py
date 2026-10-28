import re,sys
s=open('/Users/shawwalters/amm100-run/lanes/mg-A-4/src/programs/pump-amm/src/lib.rs').read()
i=s.index('pub enum PumpAmmError');body=s[i:s.index('\n}',i)]
names=[];n=0
for l in body.split('\n')[1:]:
    l=l.strip()
    mm=re.match(r'([A-Z][A-Za-z0-9]+)\s*(=\s*(\d+))?\s*,?',l)
    if mm and not l.startswith('#') and not l.startswith('//'):
        if mm.group(3): n=int(mm.group(3))
        names.append((n,mm.group(1)));n+=1
d=dict(names)
for a in sys.argv[1:]:
    v=int(a,0); print(a, v, d.get(v-6000 if v>=6000 else v))
