#!/bin/bash
# run.sh <exp> [slot]: build exp/<exp>/src, score vs start baseline, print summary + ratios of my windows
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z02; e=$1; s=${2:-1}
BL=${BL:-$W/deliveries/r5-z02-02/score.json}
mkdir -p $L/exp/$e/out
python3 -B $W/harness/fastbuild.py --src $L/exp/$e/src --work $L/work/w$s --out $L/exp/$e/out > $L/exp/$e/build.log 2>&1
if ! grep -q '"ok": true' $L/exp/$e/build.log; then echo "$e BUILD FAIL"; grep -E "^error" -A8 $L/exp/$e/build.log | head -30; exit 1; fi
python3 -B $W/harness/score.py $L/exp/$e/out/unstripped.so --baseline $BL --json $L/exp/$e/score.json --quiet > /dev/null
python3 -B - "$L/exp/$e" <<'PY'
import json,sys
d=sys.argv[1]
b=json.load(open(d+'/score.json'))['summary']
lg=open(d+'/build.log').read()
rv='"runtime_valid": true' in lg; sw='"stack_warnings": []' in lg
print(d.split('/')[-1], b['normalized'], b['raw'], 'gains', b['gains'], 'losses', b['losses'], 'rawl', b['raw_losses'], 'rv', rv, 'nostackwarn', sw)
PY
for w in ${WINS:-0x3b8d8 0x34558 0x2fa60}; do python3 -B $W/harness/win.py show $w --cand $L/exp/$e/out/unstripped.so ${SYM:+--sym "$SYM"} 2>/dev/null | sed -n 2p | sed "s/^/  $w /"; done
