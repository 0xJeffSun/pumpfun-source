#!/usr/bin/env python3
"""cseq.py <orig_start> <cand.so> <cand_symregex> [inventory.json]: diff the CALL sequences (callee names) of the original
window and a candidate function. Original callees named via the inventory's matched symbols (else UNMATCHED@addr)."""
import sys, re, json, subprocess, bisect, difflib
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
from win import demangle
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
st=int(sys.argv[1],0); so=sys.argv[2]; rx=sys.argv[3]; inv=sys.argv[4] if len(sys.argv)>4 else W+'/base/L17/inventory.json'
wins=sorted(original_windows(), key=lambda w:w['start']); starts=[w['start'] for w in wins]
sc=json.load(open(inv))['windows']
def short(n):
    n=demangle(n); n=re.sub(r'::h[0-9a-f]{16}$','',n); n=n.replace('pump_recovered::','')
    return n[:90]
def calls(path,a,b):
    txt=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',f'--start-address={a:#x}',f'--stop-address={b:#x}',path],text=True)
    out=[]
    for l in txt.splitlines():
        m=re.match(r'^\s*([0-9a-f]+):\s+call (-?0x[0-9a-f]+)',l)
        if m: out.append(int(m.group(1),16)+8+int(m.group(2),16)*8)
        m2=re.match(r'^\s*([0-9a-f]+):\s+call (\w+)$',l)
    return out
w=wins[starts.index(st)]
oc=[]
for t in calls(W+'/base/original.so',st,st+w['bytes']):
    i=bisect.bisect_right(starts,t)-1; s=sc.get(str(wins[i]['start']),{})
    oc.append(short(s['symbols'][0]) if s.get('normalized') and s.get('symbols') else f'UNMATCHED@{wins[i]["start"]:#x}')
# candidate
t=subprocess.check_output([OBJ,'-t',so],text=True); syms={}; best=None
for l in t.splitlines():
    m=re.match(r'^([0-9a-f]+) .* F \S+\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',l)
    if m:
        a=int(m.group(1),16); syms.setdefault(a,m.group(3))
        if re.search(rx,demangle(m.group(3))) and (best is None or int(m.group(2),16)>best[1]): best=(a,int(m.group(2),16),m.group(3))
a,sz,nm=best; print('cand',short(nm),sz,'B')
cc=[short(syms.get(x,f'@{x:#x}')) for x in calls(so,a,a+sz)]
sm=difflib.SequenceMatcher(None,oc,cc,autojunk=False)
for tg,i1,i2,j1,j2 in sm.get_opcodes():
    if tg=='equal': print(f'   = {i2-i1} same: '+' | '.join(x[:40] for x in oc[i1:i2])[:300])
    else:
        for x in oc[i1:i2]: print('   -',x)
        for x in cc[j1:j2]: print('   +',x)
