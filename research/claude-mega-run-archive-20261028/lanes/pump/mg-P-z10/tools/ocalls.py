#!/usr/bin/env python3
"""ocalls.py <orig_start> [score.json]: original window disasm, internal calls resolved to window + matched cand symbol;
lddw into .rodata shown with string preview."""
import sys, json, re, subprocess, bisect
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
from win import demangle
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
st=int(sys.argv[1],0); sj=sys.argv[2] if len(sys.argv)>2 else W+'/lanes/r5-z10/b00.score.json'
wins=sorted(original_windows(), key=lambda w:w['start']); starts=[w['start'] for w in wins]
sc=json.load(open(sj))['windows']
data=open(W+'/base/original.so','rb').read()
# rodata: vma 0x1b59f0; file offset: find via objdump -h? assume vma==offset
def rostr(a):
    s=data[a:a+48]; t=''.join(chr(c) if 32<=c<127 else '.' for c in s); return t
w=wins[starts.index(st)]
txt=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',f'--start-address={st:#x}',f'--stop-address={st+w["bytes"]:#x}',W+'/base/original.so'],text=True)
for line in txt.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',line)
    if not m: continue
    a=int(m.group(1),16); ins=re.sub(r'\s+<.*>','',m.group(2).strip())
    note=''
    mc=re.match(r'call (-?0x[0-9a-f]+)$',ins)
    if mc:
        t=a+8+int(mc.group(1),16)*8
        i=bisect.bisect_right(starts,t)-1
        ww=wins[i]; s=sc.get(str(ww['start']),{})
        sym=demangle(s['symbols'][0]) if s.get('symbols') else ('UNMATCHED' if not s.get('normalized') else '?')
        note=f'  -> {t:#x} win {ww["start"]:#x}+{t-ww["start"]:#x} {sym[:110]}'
    ml=re.match(r'lddw r\d, (0x[0-9a-f]+)$',ins)
    if ml:
        v=int(ml.group(1),16)
        if 0x1b59f0<=v<0x1c0000: note='  "'+rostr(v)+'"'
    print(f'{a:#x}  {ins}{note}')
