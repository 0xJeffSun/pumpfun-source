#!/bin/bash
# bld.sh <variant_dir> <tag> [workdir-suffix] : nbuild (L27 baseline) -> out/<tag>/, summary line to out/<tag>.json
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-mig
src=$1; tag=$2; wk=$L/work${3:-}
python3 -B $W/lanes/mg-P-int/tools/nbuild.py --src $src --work $wk --out $L/out/$tag --baseline $W/base/L27/inventory.json > $L/out/$tag.json 2>&1
python3 -B - "$L/out/$tag.json" <<'PY'
import json,sys
t=open(sys.argv[1]).read()
try:
    d=json.loads(t)
except Exception:
    print('BUILD-ERR', t[-600:]); sys.exit()
b=d['build']; s=d.get('score') or {}
print('ok',b.get('ok'),'rv',b.get('runtime_valid'),'stk',len(b.get('stack_warnings') or []),'n',s.get('normalized'),'raw',s.get('raw'),'G',s.get('gains'),'L',s.get('losses'),'RG',s.get('raw_gains'),'RL',s.get('raw_losses'),d.get('errors','')[:6] if d.get('errors') else '')
PY
