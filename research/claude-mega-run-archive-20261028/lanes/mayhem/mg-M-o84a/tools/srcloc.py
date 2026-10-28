import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build')
import measure as M
from pathlib import Path
p=sys.argv[1] if len(sys.argv)>1 else None
o=M.m.Elf(M.ORIG.resolve())
start,end=159160,159160+18096
if p is None:
    w=o.window(start,end); e=o
else:
    e=M.m.Elf(Path(p).resolve()); ws=M.windows(e)
    import re
    # find candidate window whose symbol name contains pattern
    pat=sys.argv[2] if len(sys.argv)>2 else 'sell_v2_handler'
    a=[s for s in e.symbols if pat in s.get('name','')]
    s=a[0]; w=e.window(s['value'],s['value']+s['size'])
for d in w['data_references']:
    s=M.source(e,d['target'])
    if s: print(d['offset'], s['path'].strip('\0').split('/')[-1], s['line'], s['column'])
