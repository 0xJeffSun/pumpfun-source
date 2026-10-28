import sys,re,subprocess
so,start,end=sys.argv[1],int(sys.argv[2],16),int(sys.argv[3],16)
OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
syms={}
for l in subprocess.run([OD,'-t',so],capture_output=True,text=True).stdout.split('\n'):
    p=l.split()
    if len(p)>=5 and p[-1].startswith('_Z'):
        try: syms[int(p[0],16)]=p[-1]
        except: pass
dem=subprocess.run(['xcrun','c++filt'],input='\n'.join(syms.values()),capture_output=True,text=True).stdout.split('\n')
names=dict(zip(syms.keys(),dem))
txt=subprocess.run([OD,'-d','--no-show-raw-insn',f'--start-address={start:#x}',f'--stop-address={end:#x}',so],capture_output=True,text=True).stdout
for l in txt.split('\n'):
    m=re.match(r'\s*([0-9a-f]+):\s+call (-?0x[0-9a-f]+)',l)
    if m:
        a=int(m.group(1),16); v=int(m.group(2),16)
        if v!=-1:
            t=a+8+v*8; print(hex(a), hex(t), names.get(t,'?')[:110])
        else: print(hex(a),'syscall')
