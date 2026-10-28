#!/bin/bash
# usage: b.sh NAME ROOT [ir] [mv]  -> build label mg-M-o83b-NAME, score windows, measure vs 438 base
#   env TGT=target name (default mg-M-o83b), BASE=baseline symbols (default 438)
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
L=$W/mega/mg-M-o83b
N=$1; ROOT=$2; TGT=${TGT:-mg-M-o83b}
BASE=${BASE:-$W/mayhem-b/out/builds/o0077-ir-r1-v1/symbols.so}
if [ "$3" = "ir" ]; then export MAYHEM_ROOT_RUSTC_ARGS_JSON='["--emit=llvm-ir,link"]'; fi
LANE_CLEAN_ANCHOR=${LANE_CLEAN_ANCHOR:-0} python3 $W/sbf_lock.py --slots 6 --name sbf -- python3 -B $W/mayhem-b/build/build_lane.py mg-M-o83b-$N $ROOT $TGT > $L/logs/b-$N.log 2>&1
rc=$?; O=$W/mayhem-b/out/builds/mg-M-o83b-$N
if [ $rc -ne 0 ] || [ ! -f $O/symbols.so ]; then echo "$N BUILD FAILED rc=$rc"; grep -E "^error" -A10 $O/stderr | head -40; exit 1; fi
if [ "$3" = "ir" ]; then cp $W/mayhem-b/target/$TGT/sbpf-solana-solana/release/deps/mayhem_recovered*.ll $L/ir/$N.ll 2>/dev/null || echo "no IR found"; fi
echo "$N secs=$(python3 -c "import json;print(round(json.load(open('$O/result.json'))['seconds']))") stackwarn=$(grep -c 'exceeded max offset' $O/stderr)"
if [ "$4" = "mv" ] || [ "$3" = "mv" ]; then python3 -B $L/tools/sc.py mv $O/symbols.so $ROOT/variants.json > $L/logs/mv-$N.txt; sort -t= -k4 -n $L/logs/mv-$N.txt | head -${MVN:-12}; fi
python3 -B $L/tools/sc.py win $O/symbols.so | grep -v O0084
python3 -B $W/mayhem-b/build/measure.py $O/symbols.so $BASE --json $L/logs/m-$N.json > /dev/null
python3 -B - $L/logs/m-$N.json <<'P'
import json,sys; d=json.load(open(sys.argv[1]))
print('matched',d['counts']['matched_after'],'raw',d['counts']['raw_after'],'gains',d['gains'],'no_losses',d['no_losses'],'unmatched',d['unmatched_ids'],
      {k:len(d[k]) for k in ['body_losses','raw_losses','edge_losses','source_losses','profile_losses'] if d.get(k)})
P
