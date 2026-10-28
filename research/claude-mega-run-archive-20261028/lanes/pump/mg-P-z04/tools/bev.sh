#!/bin/bash
# bev.sh <variant_dir> <tag> <workdir-name> [win:sym ...]  -> build + score + ev
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z04
src=$1; tag=$2; wk=$3; shift 3
mkdir -p $L/out/$tag
python3 -B $W/lanes/mg-P-int/tools/nbuild.py --src $src --work $L/$wk --out $L/out/$tag --baseline $W/base/L20/inventory.json > $L/out/$tag/nbuild.json 2>&1
ok=$(python3 -B -c "import json;d=json.load(open('$L/out/$tag/nbuild.json'));b=d['build'];s=d.get('score') or {};print('ok' if b['ok'] else 'FAIL', b.get('runtime_valid'), len(b.get('stack_warnings') or []), s.get('normalized'), s.get('raw'), 'G',s.get('gains'), 'L',s.get('losses'), 'RL',s.get('raw_losses'), (d.get('errors') or [''])[:3])" 2>&1)
echo "$tag: $ok" | tee -a $L/logs/RESULTS.txt
if [[ "$ok" == ok* ]]; then python3 -B $L/tools/ev.py $L/out/$tag/unstripped.so "$@" | tee -a $L/logs/RESULTS.txt; fi
