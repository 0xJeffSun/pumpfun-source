# events.py <cand.so> <symregex>: call / Rc-increment event sequence for a candidate fn
import sys,subprocess,re,bisect
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
so,rx=sys.argv[1:3]
syms=[]
for l in subprocess.check_output([OBJ,'-t',so],text=True).splitlines():
    m=re.match(r'^([0-9a-f]+) .* F \S+\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',l)
    if m: syms.append((int(m.group(1),16),int(m.group(2),16),m.group(3)))
syms.sort(); addrs=[s[0] for s in syms]
a,sz,name=[s for s in syms if re.search(rx,s[2])][0]
d=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',f'--start-address={a:#x}',f'--stop-address={a+sz:#x}',so],text=True)
ev=[];n=0
for l in d.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l)
    if not m: continue
    n+=1; ins=m.group(2).strip()
    mc=re.match(r'call (-?0x[0-9a-f]+)',ins)
    if mc:
        imm=int(mc.group(1),16)
        if imm==-1: continue
        t=int(m.group(1),16)+8+imm*8; i=bisect.bisect_right(addrs,t)-1
        ev.append((n,'CALL '+re.sub(r'17h[0-9a-f]{16}E$','',syms[i][2])[-48:]))
    elif re.match(r'add64 r\d, 0x1$',ins): ev.append((n,'inc'))
out=[];prev=None
for k,e in ev:
    if out and e=='inc' and out[-1][1].startswith('inc'):
        c=int(out[-1][1][5:] or 1) if out[-1][1]!='inc' else 1; out[-1]=(out[-1][0],'inc x%d'%(c+1))
    else: out.append((k,e))
for k,e in out: print(k,e)
