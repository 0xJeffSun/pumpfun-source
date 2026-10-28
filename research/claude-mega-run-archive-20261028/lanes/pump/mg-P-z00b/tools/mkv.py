# mkv.py: make variant dir var/<name> from a base tree (default lane src) and apply replacements.
# usage (as module): mk(name, {file: [(old,new),...]}, base=None, copies={file: srcpath})
import sys,shutil,os
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z00b'
def mk(name, reps=None, base=None, copies=None):
    d=f'{L}/var/{name}'
    if os.path.exists(d): shutil.rmtree(d)
    shutil.copytree(base or L+'/src', d, copy_function=shutil.copy2)
    for f,src in (copies or {}).items(): shutil.copy2(src, f'{d}/src/{f}')
    for f,rl in (reps or {}).items():
        p=f'{d}/src/{f}'; t=open(p).read()
        for o,n in rl:
            assert t.count(o)==1,(name,f,o[:70],t.count(o))
            t=t.replace(o,n)
        open(p,'w').write(t)
    return d
