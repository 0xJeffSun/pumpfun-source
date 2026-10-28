#!/bin/bash
# usage: vb.sh NAME SLOT WINDOW...   (variant src at v/NAME/src; builds with work dir w$SLOT)
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work
H=$W/harness
BL=${BL:-$W/base/L13/inventory.json}
N=$1; S=$2; shift 2
mkdir -p $L/v/$N/out
rm -f $L/v/$N/out/unstripped.so
python3 -B ${FB:-$H/fastbuild.py} --src $L/v/$N/src --work $L/w$S --out $L/v/$N/out > $L/v/$N/build.log 2>&1
if ! grep -q '"ok": true' $L/v/$N/build.log || ! grep -q '"runtime_valid": true' $L/v/$N/build.log; then echo "$N BUILD FAIL/INVALID"; grep -m6 "^error\|error\[\|Stack offset" $L/v/$N/build.log | cut -c1-200; exit 1; fi
python3 -B $H/score.py $L/v/$N/out/unstripped.so --baseline $BL --json $L/v/$N/score.json --quiet > /dev/null 2>&1
python3 -B - "$N" <<'PY'
import json,sys
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07'
n=sys.argv[1]; s=json.load(open(f'{L}/v/{n}/score.json'))['summary']
print(n, s['normalized'], s['raw'], 'gains',s['gains'],'losses',s['losses'],'rawg',s['raw_gains'],'rawl',s['raw_losses'])
PY
for w in "$@"; do python3 -B $H/win.py show $w --cand $L/v/$N/out/unstripped.so 2>/dev/null | sed -n 2,3p | cut -c1-160 | sed "s/^/  $w /"; done
