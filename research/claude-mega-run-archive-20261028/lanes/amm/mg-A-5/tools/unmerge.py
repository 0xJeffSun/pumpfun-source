# unmerge.py IN.ll OUT.ll : split execute's merged error block bb102 (phi of {i64,ptr}) into per-pred blocks
import sys,re
s=open(sys.argv[1]).read()
st=s.index('define', s.index('4sell7execute17h')-300); st=s.rfind('\ndefine',0,s.index('4sell7execute17h'))+1
en=s.index('\n}\n',st)+3; f=s[st:en]
m=re.search(r'\nbb102:[^\n]*\n  %\.pn = phi \{ i64, ptr \} (\[.*?\])\n  %_0\.sroa\.0\.1 = phi i64 (\[.*?\])\n  %_0\.sroa\.31\.1 = extractvalue \{ i64, ptr \} %\.pn, 1\n  br label %bb107\n',f)
assert m, 'pattern'
pn=re.findall(r'\[ (%\d+), %(\w+) \]',m.group(1)); tg=dict((b,v) for v,b in re.findall(r'\[ (%\d+), %(\w+) \]',m.group(2)))
blocks=''
for v,b in pn:
    blocks+=f'\nbb102.{b}:\n  %pl.{b} = extractvalue {{ i64, ptr }} {v}, 1\n  br label %bb107\n'
    # retarget pred terminator
    i=f.index(f'\n{b}:'); j=f.index('\n\n',i)
    f=f[:i]+f[i:j].replace('label %bb102',f'label %bb102.{b}')+f[j:]
f=f.replace(m.group(0),blocks)
# fix bb107 phis: entries [ X, %bb102 ] -> one per new block
def fixphi(mm):
    line=mm.group(0)
    if '%bb102 ]' not in line: return line
    e=re.search(r'\[ ([^\]]*?), %bb102 \]',line).group(1)
    reps=[]
    for v,b in pn:
        val={'%_0.sroa.31.1':f'%pl.{b}','%_0.sroa.0.1':tg[b]}.get(e,e)
        reps.append(f'[ {val}, %bb102.{b} ]')
    return line.replace(f'[ {e}, %bb102 ]',', '.join(reps))
i=f.index('\nbb107:'); j=f.index('\n\n',i)
seg=re.sub(r'(?m)^  %\S+ = phi .*$',fixphi,f[i:j]); seg=seg.replace('%bb102,',' '.join(f'%bb102.{b},' for _,b in pn),1)
f=f[:i]+seg+f[j:]
open(sys.argv[2],'w').write(s[:st]+f+s[en:])
