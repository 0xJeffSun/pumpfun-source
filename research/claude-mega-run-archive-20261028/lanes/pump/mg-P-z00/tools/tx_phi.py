import sys,re
src,dst=sys.argv[1],sys.argv[2]
t=open(src).read()
m=re.search(r'^define [^\n]*create_v2[^\n]*update_metadata_authority[^\n]*$',t,re.M)
s=m.start(); e=t.index('\n}\n',s); f=t[s:e]
L=f.split('\n')
k=[i for i,l in enumerate(L) if l.startswith('  %.pn = phi { i64, ptr }')][0]
ph=L[k]
ins=re.findall(r'\[ (%[\w.]+), (%"[^"]+"|%[\w.]+) \]',ph)
# extract fields in predecessor? simpler: extractvalue after each call def
A='  %.pn0 = phi i64 '+', '.join(f'[ %x{v[1:]}e0, {b} ]' for v,b in ins)
B='  %.pn1 = phi ptr '+', '.join(f'[ %x{v[1:]}e1, {b} ]' for v,b in ins)
L[k:k+1]=[A,B,'  %.pnx = insertvalue { i64, ptr } poison, i64 %.pn0, 0','  %.pn = insertvalue { i64, ptr } %.pnx, ptr %.pn1, 1']
for v,b in ins:
    j=[i for i,l in enumerate(L) if l.startswith(f'  {v} = call')][0]
    L.insert(j+1,f'  %x{v[1:]}e1 = extractvalue {{ i64, ptr }} {v}, 1'); L.insert(j+1,f'  %x{v[1:]}e0 = extractvalue {{ i64, ptr }} {v}, 0')
open(dst,'w').write(t[:s]+'\n'.join(L)+t[e:]); print('ok')
