#!/bin/bash
# run13.sh <exp> [slot]: build exp/<exp>/src (L13-based) with nbuild (nested crate), score vs L13 (or $BL)
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z02; e=$1; s=${2:-1}
BL=${BL:-$W/base/L13/inventory.json}
mkdir -p $L/exp/$e/out
python3 -B $L/tools/nbuild.py --src $L/exp/$e/src --work $L/work/n$s --out $L/exp/$e/out --baseline $BL > $L/exp/$e/nbuild.json 2>&1
python3 -B - "$L/exp/$e" <<'PY'
import json,sys
d=sys.argv[1]; r=json.load(open(d+'/nbuild.json')); b=r.get('build',{}); s=r.get('score')
if not b.get('ok'): print(d.split('/')[-1],'BUILD FAIL', r.get('errors')); sys.exit(1)
print(d.split('/')[-1], s['normalized'], s['raw'], 'gains', s['gains'], 'losses', s['losses'], 'rawl', s['raw_losses'], 'rv', b['runtime_valid'], 'stackw', b['stack_warnings'])
PY
for w in ${WINS:-0x3b8d8 0x34558 0x2fa60}; do python3 -B $W/harness/win.py show $w --cand $L/exp/$e/out/unstripped.so ${SYM:+--sym "$SYM"} 2>/dev/null | sed -n 2p | sed "s/^/  $w /"; done
