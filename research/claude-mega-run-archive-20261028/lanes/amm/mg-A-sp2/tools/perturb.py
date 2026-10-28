#!/usr/bin/env python3
"""perturb.py SLIM.ll FNSUB ORIGADDR [maxblocks] : try swapping each adjacent independent instruction pair in FNSUB; report llc diff counts (best first)"""
import sys,re,subprocess,os
src,sub,addr=sys.argv[1],sys.argv[2],sys.argv[3]
L='/Users/shawwalters/amm100-run/lanes/mg-A-sp2'
PT=os.path.expanduser('~/.cache/solana/v1.44/platform-tools')
t=open(src).read()
i=0
while True:
    i=t.index('\ndefine ',i)+1
    hdr=t[i:t.index('\n',i)]
    if sub in hdr: break
j=t.index('\n}\n',i)+3
fn=t[i:j]; pre=t[:i]; post=t[j:]
lines=fn.split('\n')
def defs(l):
    m=re.match(r'\s*(%[\w.$"-]+) = ',l); return m.group(1) if m else None
def uses(l):
    return set(re.findall(r'%[\w.$-]+|%"[^"]+"',l.split(' = ',1)[1] if ' = ' in l else l))
def mem(l):
    s=l.strip()
    return any(k in s for k in ('load ','store ','call ','invoke ','memcpy','memset','fence','atomic'))
def isload(l): return ' = load ' in l
def run(fnt,tag):
    open(L+'/ir/pt.ll','w').write(pre+fnt+post)
    r=subprocess.run(['bash',L+'/tools/llcfn.sh',L+'/ir/pt.ll',addr,sub],capture_output=True,text=True).stdout.strip()
    m=re.search(r'\| -(\d+) \+(\d+)',r)
    return (int(m.group(1))+int(m.group(2))) if m else 9999, r
base,_=run(fn,'base'); print('base',base,flush=True)
res=[]
for k in range(1,len(lines)-2):
    a,b=lines[k],lines[k+1]
    sa,sb=a.strip(),b.strip()
    if not sa or not sb or sa.startswith(';') or sb.startswith(';') or sa.endswith(':') or re.match(r'^("[^"]+"|[\w.$-]+):',a) or re.match(r'^("[^"]+"|[\w.$-]+):',b): continue
    if any(sb.startswith(x) or sa.startswith(x) for x in ('br ','ret ','switch ','unreachable','resume')): continue
    if ' = phi ' in a or ' = phi ' in b: continue
    da,db=defs(a),defs(b)
    if da and da in uses(b): continue
    if db and db in uses(a): continue
    if mem(a) and mem(b) and not (isload(a) and isload(b)): continue
    nl=lines[:]; nl[k],nl[k+1]=b,a
    c,r=run('\n'.join(nl),k)
    res.append((c,k,sa[:70],sb[:70]))
    if c<base: print(c,k,'|',sa[:80],'<->',sb[:80],flush=True)
res.sort()
print('BEST',res[:10])
