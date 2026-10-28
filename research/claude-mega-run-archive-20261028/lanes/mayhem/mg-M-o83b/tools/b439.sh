#!/bin/bash
# usage: b439.sh NAME ROOT  -> build label mg-M-o83b-NAME via rbuild.py (parent-439 recipe), score+measure vs 439
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
L=$W/mega/mg-M-o83b
N=$1; ROOT=$2
BASE=$W/mayhem-b/out/builds/mgMint-p439-clean/symbols.so
rm -rf $W/mayhem-b/out/builds/mg-M-o83b-$N
python3 $W/sbf_lock.py --slots 6 --name sbf -- python3 -B $W/mayhem-env/tools/rbuild.py mg-M-o83b-$N $ROOT > $L/logs/b439-$N.log 2>&1
rc=$?; O=$W/mayhem-b/out/builds/mg-M-o83b-$N
if [ $rc -ne 0 ] || [ ! -f $O/symbols.so ]; then echo "$N BUILD FAILED rc=$rc"; grep -E "^error|refusing" -A8 $O/stderr $L/logs/b439-$N.log 2>/dev/null | head -40; exit 1; fi
echo "$N secs=$(python3 -c "import json;print(round(json.load(open('$O/result.json'))['seconds']))") stackwarn=$(python3 -c "import json;print(json.load(open('$O/result.json'))['stack_offset_warnings'])")"
python3 -B $L/tools/sc.py win $O/symbols.so | grep -v O0084
python3 -B $W/mayhem-b/build/measure.py $O/symbols.so $BASE --json $L/logs/m439-$N.json > /dev/null
python3 -B - $L/logs/m439-$N.json <<'P'
import json,sys; d=json.load(open(sys.argv[1]))
print('matched',d['counts']['matched_after'],'raw',d['counts']['raw_after'],'gains',d['gains'],'no_losses',d['no_losses'],'unmatched',d['unmatched_ids'],
      {k:len(d[k]) for k in ['body_losses','raw_losses','edge_losses','source_losses','profile_losses'] if d.get(k)})
P
