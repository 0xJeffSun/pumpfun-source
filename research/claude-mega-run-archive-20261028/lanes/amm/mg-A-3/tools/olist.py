# olist.py OBJ SYMSUB : listing 'off ins' of a function in a .o (function-sections), call targets from relocs
import sys,re,subprocess
P='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/'
o=sys.argv[1]
st=subprocess.run([P+'llvm-readelf','-sW',o],capture_output=True,text=True).stdout.splitlines()
nm=[f[7] for f in (l.split() for l in st) if len(f)>=8 and f[3]=='FUNC' and sys.argv[2] in f[7]][0]
out=subprocess.run([P+'llvm-objdump','-dr','--no-show-raw-insn','-j','.text.'+nm,o],capture_output=True,text=True).stdout.splitlines()
res=[]
for l in out:
    r=re.search(r'R_\w+\s+(\S+)',l)
    if r:
        if res and res[-1][1].startswith('call'): res[-1][1]='call <'+re.sub(r'17h[0-9a-f]{16}E$','',r.group(1))[-60:]+'>'
        continue
    m=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
    if m:
        ins=re.sub(r'\s*<[^>]*>$','',m.group(2).strip()); res.append([int(m.group(1),16),re.sub(r'\s+',' ',ins)])
for a,i in res: print(f'{a:5x} {i}')
