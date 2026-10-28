#!/usr/bin/env python3
"""xref.py <symregex|0xwin> [inventory]: original window(s) matching the regex (by matched symbol) and every original window calling it."""
import sys, re, json, subprocess, bisect, os, pickle
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
from win import demangle
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
inv=sys.argv[2] if len(sys.argv)>2 else W+'/base/L25/inventory.json'
wins=sorted(original_windows(), key=lambda w:w['start']); starts=[w['start'] for w in wins]
sc=json.load(open(inv))['windows']
def nm(st):
    s=sc.get(str(st),{}); return (re.sub(r'::h[0-9a-f]{16}$','',demangle(s['symbols'][0])).replace('pump_recovered::','')[:80] if s.get('symbols') else 'UNM')+('' if s.get('normalized') else ' (unmatched)')
cache=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','logs','orig_calls.pkl')
if os.path.exists(cache): calls=pickle.load(open(cache,'rb'))
else:
    txt=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',W+'/base/original.so'],text=True)
    calls=[]
    for l in txt.splitlines():
        m=re.match(r'^\s*([0-9a-f]+):\s+call (-?0x[0-9a-f]+)$',l.strip()) or re.match(r'^\s*([0-9a-f]+):\s+call (-?0x[0-9a-f]+)',l)
        if m:
            ad=int(m.group(1),16); calls.append((ad, ad+8+int(m.group(2),16)*8))
    pickle.dump(calls,open(cache,'wb'))
a=sys.argv[1]
if re.match(r'0x[0-9a-f]+$',a): targets=[int(a,16)]
else: targets=[w['start'] for w in wins if re.search(a, nm(w['start']))]
for t in targets:
    cs={}
    for ad,tg in calls:
        if tg==t:
            i=bisect.bisect_right(starts,ad)-1; cs.setdefault(wins[i]['start'],[]).append(ad)
    print(f'{t:#x} {nm(t)}  callers:')
    for c,l in sorted(cs.items()): print(f'   {c:#x} x{len(l)} {nm(c)}')
