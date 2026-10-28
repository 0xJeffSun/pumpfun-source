#!/bin/zsh
# usage: build.sh <tag> [src]   -> builds src (default lane src) into out/<tag>, scores vs L25
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z10b
TAG=$1; SRC=${2:-$L/src}; WORK=${WORK:-$L/work}
mkdir -p $L/out/$TAG
/usr/bin/time -p python3 -B $W/lanes/mg-P-int/tools/nbuild.py --src $SRC --work $WORK --out $L/out/$TAG --baseline $W/base/L25/inventory.json > $L/out/$TAG/result.json 2> $L/out/$TAG/time.txt
cat $L/out/$TAG/result.json | python3 -B -c "import json,sys;d=json.load(sys.stdin);b=d['build'];s=d.get('score',{});print('ok',b['ok'],'rv',b['runtime_valid'],'stackw',b['stack_warnings'],'sec',b['seconds'],'norm',s.get('normalized'),'raw',s.get('raw'),'gains',s.get('gains'),'losses',s.get('losses'),'rawg',s.get('raw_gains'),'rawl',s.get('raw_losses'));[print(e) for e in d.get('errors',[])]"
