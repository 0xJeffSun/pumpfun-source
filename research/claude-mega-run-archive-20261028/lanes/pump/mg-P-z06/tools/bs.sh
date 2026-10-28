#!/bin/bash
# usage: bs.sh <variant-src-dir> <res-name> [slot a|b|c]   (L13 base: nested crate aware, baseline L13 inventory)
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z06
SRC=$1; N=$2; S=${3:-a}; OUT=$L/res/$N; rm -rf $OUT; mkdir -p $OUT
python3 -B $L/tools/nbuild.py --src $SRC --work $L/work-$S --out $OUT --baseline $W/base/L14/inventory.json > $OUT/nb.json 2>&1
python3 -B - "$OUT" "$N" <<'P'
import json,sys
o,n=sys.argv[1],sys.argv[2]
try: r=json.load(open(o+'/nb.json'))
except Exception as e: print('==',n,'NBUILD OUTPUT UNPARSEABLE'); print(open(o+'/nb.json').read()[-600:]); sys.exit()
b=r['build']
if not b.get('ok'): print('==',n,'BUILD FAILED', r.get('errors',[])[:4]); sys.exit()
s=r['score']; print('==',n,'rv',b['runtime_valid'],'stack',b['stack_warnings'][:1],'norm',s['normalized'],'raw',s['raw'],'gains',s['gains'],'losses',s['losses'],'rg',s['raw_gains'],'rl',s['raw_losses'])
P
