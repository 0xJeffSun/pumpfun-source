#!/usr/bin/env python3
"""skel.py <so> <orig_start|symregex> [inventory]: skeleton = calls (named), error codes (stw 0x17xx), Source line stores, exits."""
import sys,re,subprocess,bisect,json
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
from win import demangle
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
p=sys.argv[1]; a=sys.argv[2]; inv=sys.argv[3] if len(sys.argv)>3 else W+'/base/L17/inventory.json'
wins=sorted(original_windows(), key=lambda w:w['start']); starts=[w['start'] for w in wins]
sc=json.load(open(inv))['windows']
t=subprocess.check_output([OBJ,'-t',p],text=True); syms={}
for l in t.splitlines():
    m=re.match(r'^([0-9a-f]+) .* F \S+\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',l)
    if m: syms.setdefault(int(m.group(1),16),(int(m.group(2),16),m.group(3)))
if re.match(r'0x[0-9a-f]+$',a):
    st=int(a,16); size=next(x for x in wins if x['start']==st)['bytes']; orig=True
else:
    c=[(k,v) for k,v in syms.items() if re.search(a,demangle(v[1]))]; c.sort(key=lambda x:-x[1][0]); st,(size,_)=c[0]; orig=False
out=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',f'--start-address={st:#x}',f'--stop-address={st+size:#x}',p],text=True)
def nm(tgt):
    if orig:
        i=bisect.bisect_right(starts,tgt)-1; s=sc.get(str(wins[i]['start']),{})
        return re.sub(r'::h[0-9a-f]{16}$','',demangle(s['symbols'][0])).replace('pump_recovered::','') if s.get('normalized') and s.get('symbols') else f'UNMATCHED@{wins[i]["start"]:#x}'
    v=syms.get(tgt); return re.sub(r'::h[0-9a-f]{16}$','',demangle(v[1])).replace('pump_recovered::','') if v else f'@{tgt:#x}'
for l in out.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l)
    if not m: continue
    ad=int(m.group(1),16); ins=re.sub(r'\s+<[^>]*>','',m.group(2)).strip(); ins=re.sub(r'\s+',' ',ins); s=(ad-st)//8
    mc=re.match(r'call (-?0x[0-9a-f]+)$',ins)
    if mc:
        print(f'{s:5d} call {nm(ad+8+int(mc.group(1),16)*8)[:95]}'); continue
    me=re.match(r'stw \[r10 - (0x[0-9a-f]+)\], (0x17[0-9a-f]{2})$',ins)
    if me: print(f'{s:5d}   ERR {int(me.group(2),16)}'); continue
    ml=re.match(r'stw \[r10 - (0x[0-9a-f]+)\], (0x[0-9a-f]+)$',ins)
    if ml and 300<int(ml.group(2),16)<3000: print(f'{s:5d}   line? {int(ml.group(2),16)}'); continue
    if ins=='exit': print(f'{s:5d} exit')
