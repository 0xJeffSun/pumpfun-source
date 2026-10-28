# remarks.py DIAGLOG CALLERSUB REGEX : inline decisions (inlined / missed with cost/threshold) of matching callees into the caller
import sys,re
log,caller,rx=sys.argv[1],sys.argv[2],re.compile(sys.argv[3])
out=[]
for l in open(log,errors='replace'):
    m=re.search(r"'([^']*)' (inlined into|not inlined into) '([^']*)'(.*)",l)
    if not m or caller not in m.group(3): continue
    c=re.sub(r'17h[0-9a-f]{16}E','',m.group(1))
    if not rx.search(c): continue
    cm=re.search(r'cost=(\w+)(?:, threshold=(\w+))?',m.group(4))
    segs=re.findall(r'\d+([A-Za-z_$][A-Za-z0-9_$.]*)',c);segs=[x for x in segs if x]
    nm=(segs[-2]+'::cl') if segs and 'closure' in segs[-1] and len(segs)>1 else (segs[-1] if segs else c[-30:])
    nm=nm.replace('$GT$','').replace('$LT$','<')[-28:]
    out.append(f"{'IN' if m.group(2)=='inlined into' else 'no'}:{nm}({cm.group(1)}/{cm.group(2)})" if cm else f"{'IN' if m.group(2)=='inlined into' else 'no'}:{nm}")
print(' '.join(out))
