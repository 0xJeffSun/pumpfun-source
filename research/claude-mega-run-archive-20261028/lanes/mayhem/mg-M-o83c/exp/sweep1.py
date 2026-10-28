import sys, itertools, subprocess
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/tools'); import evvar
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c'
base=evvar.O79_LIT.split(',')
pos=[base.index(k) for k in ['tvb','stn','vt','et']]
for i,perm in enumerate(itertools.permutations(['tvb','stn','vt','et'])):
    if perm==('tvb','stn','vt','et'): continue
    lit=list(base)
    for p,k in zip(pos,perm): lit[p]=k
    n=f's1-{i:02d}'
    evvar.make(n,evvar.CUR_LETS,','.join(lit))
    r=subprocess.run(['bash',L+'/tools/qb.sh',n,L+'/roots/'+n],capture_output=True,text=True).stdout.strip()
    print(','.join(perm),'|',r.split('|')[1].strip()[:60],'|',r.split('|')[3].strip(),flush=True)
    subprocess.run(['rm','-rf',L+'/roots/'+n])
