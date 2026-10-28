# ccalls.py <cand.so> <symregex>: list call targets (symbol names) of a candidate function, run-length compressed
import sys,subprocess,re,bisect
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
so,rx=sys.argv[1:3]
syms=[]
for l in subprocess.check_output([OBJ,'-t',so],text=True).splitlines():
    m=re.match(r'^([0-9a-f]+) .* F \S+\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',l)
    if m: syms.append((int(m.group(1),16),int(m.group(2),16),m.group(3)))
syms.sort(); addrs=[s[0] for s in syms]
f=[s for s in syms if re.search(rx,s[2])]
a,sz,name=f[0]
d=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',f'--start-address={a:#x}',f'--stop-address={a+sz:#x}',so],text=True)
out=[]
for l in d.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+call (-?0x[0-9a-f]+)',l)
    if not m: continue
    pc=int(m.group(1),16); imm=int(m.group(2),16)
    if imm==-1: out.append('abort/-1'); continue
    t=pc+8+imm*8; i=bisect.bisect_right(addrs,t)-1
    n=syms[i][2] if i>=0 else '?'
    n=re.sub(r'17h[0-9a-f]{16}E$','',n); out.append(n[-70:])
prev=None;c=0
for x in out+[None]:
    if x==prev: c+=1; continue
    if prev is not None: print(f'{c:3} {prev}')
    prev=x;c=1
