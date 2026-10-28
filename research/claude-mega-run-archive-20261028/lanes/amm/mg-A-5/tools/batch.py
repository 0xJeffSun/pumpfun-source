# batch.py BASE_TEMPLATE VARIANTS_PY : each variant = (name, [(old,new),...]); builds sequentially, logs signature
import sys,subprocess,json,re,os
L='/Users/shawwalters/amm100-run/lanes/sell-r1/'
base=open(L+'gen/'+sys.argv[1]).read()
ns={};exec(open(sys.argv[2]).read(),ns)
log=open(L+'var/batch.log','a')
def sig():
    out=subprocess.run(['python3','-I',L+'tools/dis.py','cand',L+'out/cand.so','swap4sell8cashback17'],capture_output=True,text=True).stdout
    s=[]
    for l in out.split('\n'):
        m=re.match(r'\s*([0-9a-f]+) stw \[r10 - 0x[0-9a-f]+\], (0x1[0-9a-f]{2})$',l.rstrip())
        if m: s.append('%s:%d'%(m.group(1),int(m.group(2),16)))
    return ' '.join(s)
for name,reps in ns['V']:
    t=base
    ok=True
    for a,b in reps:
        if a not in t: print(name,'MISSING',a[:60],file=log,flush=True); ok=False;break
        t=t.replace(a,b)
    if not ok: continue
    fn='var/%s.rs'%name; open(L+'gen/'+fn,'w').write(t)
    r=subprocess.run([L+'tools/try.sh',fn],capture_output=True,text=True).stdout
    m=re.search(r'N (\d+) loss (\[.*?\]) gain# (\d+)',r); d=re.search(r'orig 9024 cand (\d+)',r); dd=re.search(r'diff (-\d+ \+\d+)',r)
    print(name, m.groups() if m else r[-300:], d.group(1) if d else '?', dd.group(1) if dd else '?', sig(), file=log, flush=True)
