import re,sys
s=open(sys.argv[1]).read()
i=s.index('pub enum PumpError'); j=s.index('}',i)
body=s[i:j]
names=[m.group(1) for m in re.finditer(r'^\s*([A-Z][A-Za-z0-9_]*)\s*,?\s*$',body,re.M)]
for k,n in enumerate(names): print(6000+k,n)
