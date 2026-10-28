import sys, subprocess
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/tools'); import evvar, tupgen
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c'
lit=evvar.O79_LIT.replace('vt,et','et,vt')
def mk(name,l1):
    d=evvar.make(name,evvar.CUR_LETS,lit)
    p=f'{d}/{evvar.F}'; ls=open(p).read().split('\n'); ls[395]=' '+l1; open(p,'w').write('\n'.join(ls))
    return d
V=[(a,b,c) for a,b,c in [x.split('|') for x in sys.argv[1:]]]
for n,s,q in V:
    d=mk(n,tupgen.line(s,q))
    r=subprocess.run(['bash',L+'/tools/qbi.sh',n,d],capture_output=True,text=True).stdout.strip().replace('\n',' | ')
    print(n,s,q,'::',r,flush=True)
