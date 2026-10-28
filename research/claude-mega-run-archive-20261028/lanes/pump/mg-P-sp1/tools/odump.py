#!/usr/bin/env python3
"""odump.py <orig_start_hex> [from_idx] [to_idx]: normalized listing of an original window, instruction-index numbered."""
import sys,subprocess,re
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
st=int(sys.argv[1],16); a=int(sys.argv[2]) if len(sys.argv)>2 else 0; b=int(sys.argv[3]) if len(sys.argv)>3 else 40
w=[x for x in original_windows() if x['start']==st][0]
od=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={st:#x}',f'--stop-address={st+w["bytes"]:#x}',W+'/base/original.so'],capture_output=True,text=True).stdout.splitlines()
k=0
for l in od:
    m=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l)
    if not m: continue
    t=re.sub(r'\s+',' ',m.group(2)).strip()
    if a<=k<b: print(f'{k:3d} {t[:90]}')
    k+=1
