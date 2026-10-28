# ocalls.py OBJ SYMSUB : print instruction index of calls/exits (with reloc target names) for a function in a .o
import sys,re,subprocess
P='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/'
o=sys.argv[1]
st=subprocess.run([P+'llvm-readelf','-sW',o],capture_output=True,text=True).stdout.splitlines()
nm=[f[7] for f in (l.split() for l in st) if len(f)>=8 and f[3]=='FUNC' and sys.argv[2] in f[7]][0]
out=subprocess.run([P+'llvm-objdump','-dr','--no-show-raw-insn','-j','.text.'+nm,o],capture_output=True,text=True).stdout.splitlines()
res=[];k=0;last=None
for l in out:
    r=re.search(r'R_\w+\s+(\S+)',l)
    if r:
        if res and res[-1][1]=='call' and len(res[-1])==2: res[-1].append(re.sub(r'17h[0-9a-f]{16}E$','',r.group(1))[-28:])
        continue
    m=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
    if m:
        k+=1;ins=m.group(2).strip()
        if ins.startswith('call') or ins=='exit': last=(k,ins);res.append([k,ins.split()[0]])
        continue
    r=re.search(r'R_\w+\s+(\S+)',l)
    if r and res and res[-1][1]=='call' and len(res[-1])==2:
        n=r.group(1)
        n=re.sub(r'17h[0-9a-f]{16}E$','',n); res[-1].append(n[-28:])
print(' '.join(f'{x[0]}:{x[2] if len(x)>2 else x[1]}' for x in res if not any(s in str(x) for s in ('PumpAmmError','AnchorError','to_string','unwrap_failed','Display'))))
