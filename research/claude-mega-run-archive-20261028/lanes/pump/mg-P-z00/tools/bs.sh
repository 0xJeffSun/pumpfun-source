#!/bin/bash
# usage: bs.sh <variant name> <workslot> [windows...]   (variant dir = var/<v>; L13 base via nbuild; scores vs BASELINE)
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z00
BASE=${BASELINE:-$W/base/L28/inventory.json}
v=$1; slot=$2; shift 2
out=$L/var/$v.out
python3 -B $L/tools/nbuild.py --src $L/var/$v --work $L/work$slot --out $L/var/$v.build --baseline $BASE > $L/var/$v.log 2>&1
python3 -B - "$L/var/$v.log" > $out <<'P'
import json,sys
t=open(sys.argv[1]).read()
try: d=json.loads(t[t.index('{'):])
except Exception: print('PARSEFAIL',t[-300:]); sys.exit()
b=d['build']; s=d.get('score',{})
print('ok=%s rv=%s sw=%s'%(b.get('ok'),b.get('runtime_valid'),b.get('stack_warnings')), 'norm=%s raw=%s gains=%s losses=%s rawg=%s rawl=%s'%(s.get('normalized'),s.get('raw'),s.get('gains'),s.get('losses'),s.get('raw_gains'),s.get('raw_losses')), d.get('errors',''))
P
for w in "$@"; do python3 -B $W/harness/win.py show $w --cand $L/var/$v.build/unstripped.so 2>&1 | sed -n 2p >> $out; done
cat $out
