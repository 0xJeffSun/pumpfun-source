#!/usr/bin/env python3
"""odis.py <so|o> <start|sym-regex> [n] [skip]: compact disassembly, index-numbered, branch targets as indices."""
import sys,re,subprocess
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
p=sys.argv[1]; a=sys.argv[2]; n=int(sys.argv[3]) if len(sys.argv)>3 else 60; skip=int(sys.argv[4]) if len(sys.argv)>4 else 0
if re.match(r'0x[0-9a-f]+$',a):
    from score import original_windows
    st=int(a,16); w=next(x for x in original_windows() if x['start']==st); size=w['bytes']; args=[f'--start-address={st:#x}',f'--stop-address={st+size:#x}']
else:
    t=subprocess.check_output([OBJ,'-t',p],text=True)
    for l in t.splitlines():
        m=re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',l)
        if m and re.search(a,m.group(4)): st=int(m.group(1),16); size=int(m.group(3),16); sec=m.group(2)
    args=[f'--start-address={st:#x}',f'--stop-address={st+size:#x}']+(['-j',sec] if p.endswith('.o') else [])
out=subprocess.check_output([OBJ,'-d','--no-show-raw-insn']+args+[p],text=True)
ins=[]
for l in out.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l)
    if m: ins.append((int(m.group(1),16),re.sub(r'\s+',' ',re.sub(r'\s+<[^>]*>','',m.group(2).strip()))))
addr2i={ad:i for i,(ad,_) in enumerate(ins)}
res=[]
for i,(ad,t) in enumerate(ins):
    m=re.match(r'^(j\w+ .*?)([+-]0x[0-9a-f]+)$',t)
    if m and not t.startswith('call'):
        tgt=ad+8+int(m.group(2),16)*8; t=m.group(1)+'@'+str(addr2i.get(tgt,'?'))
    res.append(f'{i:3d} {t}')
for r in res[skip:skip+n]: print(r)
