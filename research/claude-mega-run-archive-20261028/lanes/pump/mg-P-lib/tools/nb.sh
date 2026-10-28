#!/bin/bash
# nb.sh <name> <srcdir> [workdir]  L13-based build via mg-P-int nbuild.py; baseline BASELINE (default L13 inventory)
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-lib
n=$1; s=$2; w=${3:-$L/work_$n}
BL=${BASELINE:-$W/base/L13/inventory.json}
[ -d $w ] || cp -c -R $L/work_s13base $w 2>/dev/null || mkdir -p $w
python3 -B $W/lanes/mg-P-int/tools/nbuild.py --src $s --work $w --out $L/res/$n --baseline $BL > $L/res/$n.json 2>&1
cp $L/res/$n/build.log $L/res/$n.log 2>/dev/null; cp $L/res/$n/score.json $L/res/$n.score.json 2>/dev/null
python3 -B -c "
import json,sys; d=json.load(open('$L/res/$n.json')); b=d['build']; s=d.get('score')
sw=open('$L/res/$n.log').read().count('exceeded max offset')
print('ok',b['ok'],'rv',b['runtime_valid'],'sw',len(b['stack_warnings'] or []),sw)
print('N',s['normalized'],'raw',s['raw'],'gains',s['gains'],'losses',s['losses'],'rg',s['raw_gains'],'rl',s['raw_losses']) if s else print(d.get('errors'))"
