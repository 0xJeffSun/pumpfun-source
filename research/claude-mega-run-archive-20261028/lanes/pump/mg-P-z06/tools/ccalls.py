# ccalls.py <so> <symregex|addr>  : list calls in candidate function with resolved symbol names
import sys,re,subprocess,bisect
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from win import demangle
so=sys.argv[1]
NM=__import__('os').path.expanduser('~/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-nm')
OD=__import__('os').path.expanduser('~/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
syms=[]
RE=OD.replace('llvm-objdump','llvm-readelf')
for l in subprocess.check_output([RE,'-sW',so],text=True).splitlines():
    p=l.split()
    if len(p)>=8 and p[3]=='FUNC': syms.append((int(p[1],16),int(p[2]),p[7]))
syms.sort(); addrs=[s[0] for s in syms]
def nm(t):
    i=bisect.bisect_right(addrs,t)-1; a,sz,n=syms[i]; return demangle(n)+('' if a==t else f'+{t-a:#x}')
tgt=sys.argv[2]
if tgt.startswith('0x'): a=int(tgt,16); s=[x for x in syms if x[0]==a][0]
else: s=[x for x in syms if re.search(tgt,demangle(x[2]))][0]
a,sz,n=s; print(hex(a),sz,demangle(n))
txt=subprocess.check_output([OD,'-d','--no-show-raw-insn',f'--start-address={a:#x}',f'--stop-address={a+sz:#x}',so],text=True)
for line in txt.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+call (-?0x[0-9a-f]+)',line)
    if m:
        ad=int(m.group(1),16); t=ad+8+int(m.group(2),16)*8; print(hex(ad), 'call', nm(t)[:120])
    elif re.search(r'exit|stw \[r10 - 0x[0-9a-f]+\], 0x1[0-9a-f]{3}$',line): print(line.strip())
