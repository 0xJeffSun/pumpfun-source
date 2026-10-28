#!/usr/bin/env python3
"""segs.py <orig_listing.txt> <so> <start_hex> <size>: compare instruction counts between consecutive calls/exits."""
import re,subprocess,sys
o=[l.split(None,1)[1].strip() for l in open(sys.argv[1]).read().splitlines() if l.strip()]
OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
st=int(sys.argv[3],16); sz=int(sys.argv[4])
d=subprocess.check_output([OD,'-d','--no-show-raw-insn',f'--start-address={st:#x}',f'--stop-address={st+sz:#x}',sys.argv[2]],text=True)
c=[re.sub(r'\s+<[^>]*>','',m.group(1)).strip() for m in re.finditer(r'^\s+[0-9a-f]+:\s+(.*)$',d,re.M)]
def seg(x):
    out=[];n=0
    for l in x:
        n+=1 if not l.startswith('lddw') else 2
        if l.startswith('call') or l=='exit': out.append(n); n=0
    out.append(n); return out
a=seg(o); b=seg(c)
print('orig', a); print('ours', b)
