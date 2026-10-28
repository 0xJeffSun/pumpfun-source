import sys,shutil,os
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z00'
def mk(name, file, old, new, base=L+'/src'):
    d=f'{L}/var/{name}'
    if os.path.exists(d): shutil.rmtree(d)
    shutil.copytree(base,d)
    p=f'{d}/src/{file}'; t=open(p).read()
    if isinstance(old,str): old=[old]; new=[new]
    for o,n in zip(old,new):
        assert t.count(o)==1,(name,o[:60],t.count(o))
        t=t.replace(o,n)
    open(p,'w').write(t)
    print('made',d)
