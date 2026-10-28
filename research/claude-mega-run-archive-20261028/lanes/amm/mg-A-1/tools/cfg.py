#!/usr/bin/env python3
"""cfg.py orig ADDR | cfg.py SO NAME  -> branch/call/exit summary with targets"""
import sys,re,subprocess
D='/Users/shawwalters/amm100-run/lanes/mg-A-1/tools/dis.py'
if sys.argv[1]=='orig': out=subprocess.run(['python3','-I',D,'orig',sys.argv[2]],capture_output=True,text=True).stdout
else: out=subprocess.run(['python3','-I',D,'cand',sys.argv[1],sys.argv[2]],capture_output=True,text=True).stdout
for l in out.splitlines():
    if l.startswith('=='): print(l[:120]); continue
    p=l.split(None,1)
    if len(p)<2: continue
    a=int(p[0],16); b=p[1].strip()
    m=re.match(r'(j\w+) .*?([+-]0x[0-9a-f]+)$',b)
    if m or b.startswith('call') or b=='exit':
        t=hex(a+8+int(m.group(2),16)*8) if m else ''
        print(hex(a),b[:58],'->',t)
