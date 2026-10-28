#!/usr/bin/env python3
"""place.py <template> <out> [total_lines]: template lines; a line starting with '@N ' must land on line N (1-based).
Pads with a '// layout-pad' comment + blank lines before anchored lines. If total_lines given, pads the end."""
import sys
tpl=open(sys.argv[1]).read().split('\n')
if tpl and tpl[-1]=='': tpl=tpl[:-1]
out=[]
for l in tpl:
    if l.startswith('@'):
        n,rest=l[1:].split(' ',1); n=int(n)
        cur=len(out)+1
        if cur>n: sys.exit(f'cannot place line {n}: already at {cur}: {rest[:60]}')
        gap=n-cur
        if gap>0:
            out.append(f'// layout-pad({gap}): aligns the next Source site with the original line')
            out.extend(['']*(gap-1))
        out.append(rest)
    else: out.append(l)
if len(sys.argv)>3:
    t=int(sys.argv[3])
    if len(out)>t: sys.exit(f'too long: {len(out)}>{t}')
    gap=t-len(out)
    if gap>0:
        out.append(f'// layout-pad({gap}): keeps the file length'); out.extend(['']*(gap-1))
open(sys.argv[2],'w').write('\n'.join(out)+'\n')
print('lines',len(out))
