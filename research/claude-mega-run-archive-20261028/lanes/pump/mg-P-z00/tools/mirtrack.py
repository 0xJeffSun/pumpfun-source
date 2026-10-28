import sys,re,os
d=sys.argv[1]; var=sys.argv[2]   # e.g. val
fs=sorted(f for f in os.listdir(d) if f.endswith('.mir') and re.search(r'\.\d{3}-\d{3}\.',f))
prev=None
for f in fs:
    t=open(os.path.join(d,f)).read()
    m=re.search(r'debug %s => (_\d+);'%var,t)
    if not m: s='(no debug)'
    else:
        l=m.group(1); sl=len(re.findall(r'StorageLive\(%s\)'%l,t)); sd=len(re.findall(r'StorageDead\(%s\)'%l,t))
        s=f'{l} SL={sl} SD={sd}'
    if s!=prev: print(f.split('.',2)[2][:60], s)
    prev=s
