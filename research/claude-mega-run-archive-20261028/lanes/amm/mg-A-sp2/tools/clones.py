#!/usr/bin/env python3
"""clones.py orig ADDR | o OBJ SUB : track AccountInfo Rc clone order in cashback (linear symbolic scan)"""
import sys,re,subprocess
L='/Users/shawwalters/amm100-run/lanes/mg-A-sp2'
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
def clean(i): return re.sub(r'\s+',' ',re.sub(r' *<[^>]*>','',i).strip())
if sys.argv[1]=='orig':
    ins=[(int(l.split()[0],16),clean(l.split(None,1)[1])) for l in subprocess.run(['python3','-I',L+'/tools/dis.py','orig',sys.argv[2]],capture_output=True,text=True).stdout.splitlines() if l.strip()]
else:
    secs=subprocess.run([OBJ,'-h',sys.argv[2]],capture_output=True,text=True).stdout
    sec=next(l.split()[1] for l in secs.splitlines() if sys.argv[3] in l and '.text' in l)
    out=subprocess.run([OBJ,'-d','--no-show-raw-insn','-j',sec,sys.argv[2]],capture_output=True,text=True).stdout
    ins=[(int(m.group(1),16),clean(m.group(2))) for m in re.finditer(r'^\s*([0-9a-f]+):\s+(.*)$',out,re.M)]
stackargs={0x1000:'uva',0xff8:'uq',0xff0:'dec',0xfe8:'qmint',0xfe0:'qtp',0xfd8:'sys',0xfd0:'atp',0xfc8:'amount',0xfc0:'base_mint'}
R={'r2':'INFO:ata','r3':'remlen','r4':'INFO:payer','r1':'sret'}
S={}
ev=[]
for at,i in ins:
    m=re.match(r'mov64 (r\d+), (r\d+)$',i)
    if m: R[m.group(1)]=R.get(m.group(2)); continue
    m=re.match(r'ldxdw (r\d+), \[r5 - 0x([0-9a-f]+)\]$',i)
    if m:
        a=stackargs.get(int(m.group(2),16),'?'); R[m.group(1)]=('INFO:'+a) if a in ('qmint','qtp','sys','atp') else ('P:'+a); continue
    m=re.match(r'ldxdw (r\d+), \[r10 - 0x([0-9a-f]+)\]$',i)
    if m: R[m.group(1)]=S.get(int(m.group(2),16)); continue
    m=re.match(r'stxdw \[r10 - 0x([0-9a-f]+)\], (r\d+)$',i)
    if m: S[int(m.group(1),16)]=R.get(m.group(2)); continue
    m=re.match(r'ldxdw (r\d+), \[(r\d+) \+ 0x([0-9a-f]+)\]$',i)
    if m:
        d,b,off=m.group(1),m.group(2),int(m.group(3),16); v=R.get(b)
        nv=None
        if off in (8,0x10) and not (v and not v.startswith('INFO:')):
            nv=('LAMP:' if off==8 else 'DATA:')+(v[5:] if v else '?'+b); ev.append((at,nv))
        elif v and v.startswith('INFO:') and off==0: nv='KEYP:'+v[5:]
        elif v in ('P:uva',) and off==0: nv='INFO:uva'
        elif v and v.startswith('P:uq'): nv=f'UQ+{off:x}'
        elif v and v.startswith('UQ+'): nv=f'{v}>{off:x}'
        R[d]=nv; continue
    m=re.match(r'(\w+) (r\d+)',i)
    if m and not i.startswith(('st','j','call','exit')): R[m.group(2)]=None
    if i.startswith('call'): ev.append((at,'CALL')); [R.__setitem__(r,None) for r in ('r0','r1','r2','r3','r4','r5')]
out=[]
for at,e in ev:
    out.append(f'{at:x}:{e}')
print(' '.join(out))
