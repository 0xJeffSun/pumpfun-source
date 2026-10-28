import subprocess,sys,re
from pathlib import Path
W=Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work')
base=W/'base/L12/pump'
for name in sys.argv[1:]:
    src=W/'deliveries'/name/'src'
    r=subprocess.run(['diff','-rq','-x','target','-x','.DS_Store','-x','*.orig',str(base),str(src)],capture_output=True,text=True).stdout
    out=[]
    for l in r.splitlines():
        m=re.match(r'Files (\S+) and (\S+) differ',l)
        if m: out.append('M:'+m.group(1)[len(str(base))+1:]); continue
        m=re.match(r'Only in (\S+): (\S+)',l)
        if m:
            p=m.group(1); side='A' if p.startswith(str(src)) else 'D'
            rel=(p[len(str(src if side=='A' else base)):].lstrip('/')+'/'+m.group(2)).lstrip('/')
            out.append(side+':'+rel)
    print(name,' '.join(out))
