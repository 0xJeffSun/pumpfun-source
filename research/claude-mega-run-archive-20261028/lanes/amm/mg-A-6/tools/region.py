# region.py FILE_BASE FILE_OUT START END VARIANT [VARIANT2 START2 END2 ...]
# Replace lines START..END (1-based, inclusive) of FILE_BASE with VARIANT text; lines ending with '//@N' are padded
# (blank lines inserted before) so they land exactly on line N; the marker is stripped. Region is padded to its size.
import sys,re
base=open(sys.argv[1]).read().split('\n')
out=sys.argv[2]
args=sys.argv[3:]
reps=[]
while args:
    s,e,v=int(args[0]),int(args[1]),args[2];args=args[3:]
    reps.append((s,e,v))
reps.sort(reverse=True)
mx=max(e for s,e,v in reps)
if mx>len(base): base+=['']*(mx-len(base))
for s,e,v in reps:
    txt=[] if v=='-' else open(v).read().rstrip('\n').split('\n')
    res=[]
    for l in txt:
        m=re.search(r'\s*//@(\d+)\s*$',l)
        if m:
            n=int(m.group(1));l=l[:m.start()]
            while s+len(res)<n: res.append('')
            if s+len(res)!=n: sys.exit(f'overshoot: line {n} wanted, at {s+len(res)} in {v}')
        res.append(l)
    if len(res)>e-s+1: sys.exit(f'region overflow {len(res)} > {e-s+1} in {v}')
    res+=['']*(e-s+1-len(res))
    base[s-1:e]=res
open(out,'w').write('\n'.join(base))
