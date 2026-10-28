#!/usr/bin/env python3
"""compact.py <skel.txt> : join each block's instructions into one line with terse syntax."""
import sys,re
out=[];cur=None
def terse(t):
    t=re.sub(r'^mov64 (r\d+), r10$',r'\1=fp',t)
    t=re.sub(r'^mov64 (r\d+), (\S+)$',r'\1=\2',t)
    t=re.sub(r'^add64 (r\d+), (\S+)$',r'\1+=\2',t)
    t=re.sub(r'^ldx(\w+) (r\d+), \[(r\d+) ([+-]) (0x[0-9a-f]+)\]$',lambda m:f'{m.group(2)}={m.group(1)}[{m.group(3)}{m.group(4)}{m.group(5)}]',t)
    t=re.sub(r'^stx(\w+) \[(r\d+) ([+-]) (0x[0-9a-f]+)\], (r\d+)$',lambda m:f'{m.group(1)}[{m.group(2)}{m.group(3)}{m.group(4)}]={m.group(5)}',t)
    t=re.sub(r'^st(\w) \[(r\d+) ([+-]) (0x[0-9a-f]+)\], (\S+)$',lambda m:f'{m.group(1)}[{m.group(2)}{m.group(3)}{m.group(4)}]={m.group(5)}',t)
    t=t.replace('[r10-','[fp-').replace('dw[','[')
    return t
for l in open(sys.argv[1]):
    l=l.rstrip('\n')
    if re.match(r'^0x[0-9a-f]+:',l) or l.startswith('  [ERR'):
        if cur: out.append(cur)
        cur=l.strip()+' ' if not l.startswith('  [ERR') else None
        if l.startswith('  [ERR'): out.append(l.strip())
    else:
        if cur is None: cur=''
        cur+=terse(l.strip())+'; '
if cur: out.append(cur)
print('\n'.join(out))
