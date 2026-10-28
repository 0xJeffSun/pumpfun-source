import sys,subprocess,re,difflib,importlib.util,types
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
src=(T/'dis.py').read_text().split("if sys.argv[1]=='orig':")[0]
g={'__file__':str(T/'dis.py'),'__name__':'x'};exec(compile(src,'dis','exec'),g)
def norm(i):
    i=re.sub(r' <[^>]*>','',i);i=re.sub(r'lddw (r\d+), 0x[0-9a-f]+',r'lddw \1, X',i);i=re.sub(r'^call .*','call X',i);return i
so,addr,name=sys.argv[1],int(sys.argv[2],16),sys.argv[3]
o=g['m'].Elf(g['ORIG']);z=next(x for x in o.entries+[o.hi] if x>addr)
e,fs=g['cand'](so,name);f=fs[0]
A=[norm(i) for _,i in g['lines'](g['ORIG'],addr,z,{})];B=[norm(i) for _,i in g['lines'](so,f['start'],f['start']+f['size'],{})]
print(f'orig {z-addr} cand {f["size"]} {f["name"][:90]}')
n=0
for l in difflib.unified_diff(A,B,'o','c',n=int(sys.argv[4]) if len(sys.argv)>4 else 1,lineterm=''):
    print(l);n+=1
    if n>int(sys.argv[5] if len(sys.argv)>5 else 80):break
