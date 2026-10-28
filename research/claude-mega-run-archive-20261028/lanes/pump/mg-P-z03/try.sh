#!/bin/bash
# try.sh <tag> [src dir] [work dir] : snapshot src to runs/<tag>/src, build (nbuild, nested crates), score vs L13
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work
L=$W/lanes/mg-P-z03
B=${BASELINE:-$W/base/L15/inventory.json}
T=$1; S=${2:-$L/src}; K=${3:-$L/work}
mkdir -p $L/runs/$T
rsync -a --delete --exclude target $S/ $L/runs/$T/src/
python3 -B $L/tools/nbuild.py --src $L/runs/$T/src --work $K --out $L/runs/$T --baseline $B > $L/runs/$T/nb.json 2> $L/runs/$T/nb.err
python3 -B -c "
import json,sys
d=json.load(open('$L/runs/$T/nb.json'))
b=d['build']
if not b.get('ok'): print('BUILD FAIL $T'); print('\n'.join(d.get('errors',[]))); sys.exit(1)
s=d['score']; print('norm',s['normalized'],'raw',s['raw'],'gains',s['gains'],'losses',s['losses'],'rawg',s['raw_gains'],'rawl',s['raw_losses'],'rv',b['runtime_valid'],'sw',b['stack_warnings'])
"
