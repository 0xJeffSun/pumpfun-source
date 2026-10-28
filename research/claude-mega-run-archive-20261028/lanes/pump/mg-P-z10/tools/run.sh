#!/bin/bash
# run.sh <exp>: build exp/<exp>/src with fastbuild (work dir work$SLOT), score vs L17, print summary line
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z10; e=$1
BASE=${BASE:-$W/base/L17/inventory.json}
mkdir -p $L/exp/$e/out
python3 -B $W/harness/fastbuild.py --src $L/exp/$e/src --work $L/work${SLOT:-} --out $L/exp/$e/out > $L/exp/$e/build.log 2>&1
if ! grep -q '"ok": true' $L/exp/$e/build.log; then echo "$e BUILD FAIL"; grep -E "^error" -A8 $L/exp/$e/build.log | head -30; exit 1; fi
python3 -B $W/harness/score.py $L/exp/$e/out/unstripped.so --baseline $BASE --json $L/exp/$e/score.json --quiet > /dev/null
python3 -B - "$L/exp/$e" <<'PY'
import json,sys
d=sys.argv[1]
b=json.load(open(d+'/score.json'))['summary']
lg=open(d+'/build.log').read()
rv='"runtime_valid": true' in lg; sw='"stack_warnings": []' in lg
print(d.split('/')[-1], b['normalized'], b['raw'], 'gains', b['gains'], 'losses', b['losses'], 'rawl', b['raw_losses'], 'rv', rv, 'nostackwarn', sw)
PY
