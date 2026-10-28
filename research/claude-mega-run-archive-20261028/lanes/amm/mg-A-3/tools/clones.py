# clones.py FILE(dis2/ndo-style listing 'off ins') : list Rc-increment sites: index, base reg, and its last def
import sys,re
L=[]
for l in open(sys.argv[1]):
    m=re.match(r'\s*([0-9a-f]+):?\s+(.*)',l)
    if m:
        try: L.append((int(m.group(1),16),m.group(2).strip()))
        except: pass
def lastdef(k,r):
    for j in range(k-1,max(0,k-40),-1):
        ins=L[j][1]
        m=re.match(r'(ldxdw|mov64|ldxb) (r\d+), (.*)',ins)
        if m and m.group(2)==r: return f'{L[j][0]:x}:{ins}'
    return '?'
for k,(o,ins) in enumerate(L):
    m=re.match(r'ldxdw (r\d+), \[(r\d+) \+ 0x(8|10)\]$',ins)
    if m and k+2<len(L) and re.match(rf'ldxdw r\d+, \[{m.group(1)} \+ 0x0\]',L[k+1][1]) and 'add64' in L[k+2][1] and ', 0x1' in L[k+2][1]:
        print(f'{o:5x} +{m.group(3)} base {m.group(2)} <- {lastdef(k,m.group(2))}')
