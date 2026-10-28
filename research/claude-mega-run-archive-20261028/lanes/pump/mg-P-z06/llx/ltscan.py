import re,subprocess,sys
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06'
R='update_quote_control_mints22add_quote_control_mint17'
s=open(L+'/llx/aqh7ax.ll').read()
m=re.search(r'\ndefine [^\n]*'+R+r'[^\n]*\{', s); st=m.start(); en=s.index('\n}\n',st); f=s[st:en]
lines=f.split('\n')
src=int(sys.argv[1]); marker=lines[src]; lo,hi=int(sys.argv[2]),int(sys.argv[3])
best=[]
for k in range(lo,hi):
    l=lines[k]
    if not l.startswith('  ') or l.strip().startswith('%') and ' = phi ' in l: continue
    nl=list(lines); nl.insert(k,marker); del nl[src if src<k else src+1]
    open(L+'/llx/lts.ll','w').write(s[:st]+'\n'.join(nl)+s[en:])
    r=subprocess.run(['/Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llc','-O3','-march=sbf','-mattr=+store-imm,+jmp-ext','-function-sections','-filetype=obj',L+'/llx/lts.ll','-o',L+'/llx/lts.o'],capture_output=True)
    if r.returncode: continue
    o=subprocess.run(['python3','-B',L+'/../plainbody/tools/sacmp.py',L+'/llx/lts.o','0x6a8a8',R],capture_output=True,text=True).stdout
    d=int(re.search(r'diffslots=(\d+)',o).group(1)); best.append((d,k,l.strip()[:70]))
best.sort()
for b in best[:8]: print(b)
