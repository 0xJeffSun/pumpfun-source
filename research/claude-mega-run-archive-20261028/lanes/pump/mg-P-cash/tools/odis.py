import sys,re
# usage: odis.py START END [dis_file]  -> compact "addr insn; " lines (5 per line)
s=int(sys.argv[1],16); e=int(sys.argv[2],16)
f=sys.argv[3] if len(sys.argv)>3 else '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07/orig.dis'
out=[]
for l in open(f):
    m=re.match(r'^\s*([0-9a-f]+):\s*\t(.*)$',l)
    if not m: continue
    a=int(m.group(1),16)
    if a<s: continue
    if a>=e: break
    ins=re.sub(r'\s+',' ',m.group(2).strip()); ins=re.sub(r' <[^>]*>','',ins)
    out.append(f'{a:x} {ins}')
for i in range(0,len(out),5): print(' ; '.join(out[i:i+5]))
