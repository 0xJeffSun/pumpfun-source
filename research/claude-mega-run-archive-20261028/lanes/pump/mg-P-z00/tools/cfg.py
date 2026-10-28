# cfg.py <annotated listing> [from to]: compact CFG summary (block starts, branches w/ targets as insn#, calls, field loads from key regs)
import sys,re
L=open(sys.argv[1]).read().splitlines()
st=int(L[0].split()[0],16)
lo=int(sys.argv[2]) if len(sys.argv)>2 else 0; hi=int(sys.argv[3]) if len(sys.argv)>3 else 10**9
ins=[]
for l in L:
    m=re.match(r'(0x[0-9a-f]+)\s+(.*)$',l)
    if m: ins.append((int(m.group(1),16),m.group(2)))
tgt=set()
for pc,s in ins:
    m=re.match(r'(j\w+) .*?([+-]0x[0-9a-f]+)$',s.split('   ->')[0].strip())
    if m and not s.startswith('call'): tgt.add((pc-st)//8+1+int(m.group(2),16))
out=[]
for pc,s in ins:
    k=(pc-st)//8
    if k<lo or k>hi: continue
    s0=s.split('   ->')[0].strip()
    lead='\n'+f'B{k}:' if k in tgt else ''
    if s.startswith('call'):
        n=s.split('-> ')[-1] if '->' in s else s0
        n=re.sub(r'.*?(_ZN\w+?|\w+)$',lambda m:m.group(0)[-38:],n.split()[1] if len(n.split())>1 else n)
        out.append(lead+f' [{k}]CALL {n}')
    elif re.match(r'j\w+ ',s0) or s0=='exit':
        m=re.match(r'(j\w+) (.*?)([+-]0x[0-9a-f]+)$',s0)
        out.append(lead+(f' [{k}]{m.group(1)} {m.group(2)}->B{k+1+int(m.group(3),16)}' if m else f' [{k}]{s0}'))
    elif lead: out.append(lead+f' {s0[:22]}')
print(''.join(out))
