import os,runpy
np=runpy.run_path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/ired/p1np.py')['edit']
def edit(b):
    b=np(b)
    L=b.split('\n')
    tgt=os.environ['MV']; after=os.environ['AFTER']
    i=next(k for k,l in enumerate(L) if l.startswith(f'  {tgt} = alloca'))
    ln=L.pop(i)
    if after=='start:': j=next(k for k,l in enumerate(L) if l=='start:')
    else: j=next(k for k,l in enumerate(L) if l.startswith(f'  {after} = alloca'))
    L.insert(j+1,ln)
    return '\n'.join(L)
