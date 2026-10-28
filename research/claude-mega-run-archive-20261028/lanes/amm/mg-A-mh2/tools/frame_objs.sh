#!/bin/bash
# frame_objs.sh IN.ll FUNCSUB : MIR frame objects (id name offset size) of the function after PEI
PT=$HOME/.cache/solana/v1.44/platform-tools; D=$(dirname $1)
$PT/llvm/bin/llc -O3 -relocation-model=pic -function-sections -mattr=+store-imm,+jmp-ext $1 -stop-after=prologepilog -o $D/_pei.mir 2>/dev/null
python3 -B - $D/_pei.mir $2 <<'PY'
import re,sys
s=open(sys.argv[1]).read();sub=sys.argv[2]
for mm in re.finditer(r'\nname:\s+(\S+)\n',s):
    if sub in mm.group(1) and 'closure' not in mm.group(1): i=mm.start();break
j=s.find('\n---',i);body=s[i:j];k=body.index('stack:');k2=body.find('\ncallSites:',k)
for e in re.findall(r"- \{ id: (\d+), name: '?([^,']*)'?, type: (\w+), offset: (-?\d+), size: (\d+)",body[k:k2]):
    if e[2]!='spill-slot' and int(e[0])<200: print(f'fi{e[0]:>3} {e[1]:18s} {hex(-int(e[3])):>6} {e[4]}')
PY
rm -f $D/_pei.mir
