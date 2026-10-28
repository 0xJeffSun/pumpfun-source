# stat.py SO : per-window normalized diff line counts for my 6 windows (+ given extra addr:name pairs)
import sys,subprocess,re,difflib
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
src=(T/'dis.py').read_text().split("if sys.argv[1]=='orig':")[0]
g={'__file__':str(T/'dis.py'),'__name__':'x'};exec(compile(src,'dis','exec'),g)
def norm(i):
    i=re.sub(r' <[^>]*>','',i);i=re.sub(r'lddw (r\d+), 0x[0-9a-f]+',r'lddw \1, X',i);i=re.sub(r'^call .*','call X',i);return i
W=[('0x50598','trade_v220calculate_buy_result'),('0x50f00','trade_v218estimate_buy_quote'),('0x51d08','13buy_transfers'),
   ('0x53350','trade_v211execute_buy17'),('0x54a20','trade_v223execute_buy_exact_quote'),('0x56710','trade_v212execute_sell17')]
so=sys.argv[1]
for x in sys.argv[2:]:
    a,n=x.split(':');W.append((a,n))
o=g['m'].Elf(g['ORIG'])
for a,name in W:
    addr=int(a,16);z=next(x for x in o.entries+[o.hi] if x>addr)
    e,fs=g['cand'](so,name)
    if not fs: print(a,'NOFN',name);continue
    f=fs[0]
    A=[norm(i) for _,i in g['lines'](g['ORIG'],addr,z,{})];B=[norm(i) for _,i in g['lines'](so,f['start'],f['start']+f['size'],{})]
    d=[l for l in difflib.unified_diff(A,B,n=0,lineterm='') if l[:1] in '+-' and l[:3] not in ('---','+++')]
    print(a,z-addr,f['size'],'diff',len(d),'(-%d +%d)'%(sum(1 for l in d if l[0]=='-'),sum(1 for l in d if l[0]=='+')))
