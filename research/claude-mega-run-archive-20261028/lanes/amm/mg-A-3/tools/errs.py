# errs.py LISTING : list (offset, error code, line) for inline error sites (stw code near stw line + stdw 0x2e)
import sys,re
L=[l.split(None,1) for l in open(sys.argv[1]) if re.match(r'\s*[0-9a-f]+ ',l)]
names={}
for k,(o,i) in enumerate(L):
    i=i.strip()
    if re.match(r'stdw \[r10 - 0x[0-9a-f]+\], 0x2e$',i):
        win=[x[1].strip() for x in L[max(0,k-12):k]]
        ln=[int(m.group(1),16) for w in win for m in [re.match(r'stw \[r10 - 0x[0-9a-f]+\], (0x[0-9a-f]+)$',w)] if m]
        code=[x for x in ln if x>=6000]; line=[x for x in ln if x<6000]
        print(o, 'code', code[-1] if code else '?', 'line', line[-1] if line else '?')
