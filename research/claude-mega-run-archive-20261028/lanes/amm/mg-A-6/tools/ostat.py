# ostat.py OBJ.o [ADDR:NAMESUB ...] [-v ADDR] : normalized diff counts of my windows vs functions in an object file
import sys,subprocess,re,difflib
from pathlib import Path
B=Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin'
T=Path.home()/'amm100-run/shared/tools'
src=(T/'dis.py').read_text().split("if sys.argv[1]=='orig':")[0]
g={'__file__':str(T/'dis.py'),'__name__':'x'};exec(compile(src,'dis','exec'),g)
def norm(i):
    i=re.sub(r' <[^>]*>','',i);i=re.sub(r'\s+',' ',i.strip());i=re.sub(r'lddw (r\d+), 0x[0-9a-f]+',r'lddw \1, X',i);i=re.sub(r'^call\b.*','call X',i);return i
W=[('0x50598','trade_v220calculate_buy_result'),('0x50f00','trade_v218estimate_buy_quote'),('0x51d08','13buy_transfers'),
   ('0x53350','trade_v211execute_buy17'),('0x54a20','trade_v223execute_buy_exact_quote'),('0x56710','trade_v212execute_sell17')]
args=sys.argv[1:];obj=args.pop(0);verbose=None
if args and args[0]=='-v': verbose=args[1];args=args[2:]
for x in args: a,n=x.split(':');W.append((a,n))
syms={l.split()[-1]:(int(l.split()[1],16),int(l.split()[2])) for l in subprocess.run([str(B/'llvm-readelf'),'-sW',obj],capture_output=True,text=True).stdout.splitlines() if ' FUNC ' in l}
o=g['m'].Elf(g['ORIG'])
for a,name in W:
    if verbose and a!=verbose and not (len(W)>6 and (a,name)==W[-1]): continue
    ss=[s for s in syms if name in s]
    if not ss: print(a,'NOFN',name);continue
    sa,sz=syms[ss[0]];out=subprocess.run([str(B/'llvm-objdump'),'-d','--no-show-raw-insn','-j','.text',f'--start-address={sa}',f'--stop-address={sa+sz}',obj],capture_output=True,text=True).stdout
    Bi=[norm(m.group(1)) for m in (re.match(r'\s*[0-9a-f]+:\s+(.*)',l) for l in out.splitlines()) if m]
    addr=int(a,16);z=next(x for x in o.entries+[o.hi] if x>addr)
    A=[norm(i) for _,i in g['lines'](g['ORIG'],addr,z,{})]
    d=list(difflib.unified_diff(A,Bi,n=1,lineterm=''))
    dd=[l for l in d if l[:1] in '+-' and l[:3] not in ('---','+++')]
    print(a,z-addr,len(Bi)*8,'diff',len(dd),'(-%d +%d)'%(sum(1 for l in dd if l[0]=='-'),sum(1 for l in dd if l[0]=='+')))
    if verbose:
        import os
        for l in d[2:int(os.environ.get('VMAX','80'))]: print(l)
