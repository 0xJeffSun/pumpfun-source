#!/bin/bash
# usage: build.sh NAME ROOT [ir] [TGT]  -> label mg-M-o83c-NAME ; measures vs 438 symbols
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
L=$W/mega/mg-M-o83c
N=$1; ROOT=$2; TGT=${4:-mg-M-o83c}
BASESYM=${BASESYM:-$W/mayhem-b/out/builds/o0077-ir-r1-v1/symbols.so}
if [ "$3" = "ir" ]; then export MAYHEM_ROOT_RUSTC_ARGS_JSON='["--emit=llvm-ir"]'; fi
LANE_CLEAN_ANCHOR=${LANE_CLEAN_ANCHOR:-0} python3 $W/sbf_lock.py --slots 6 --name sbf -- python3 -B $W/mayhem-b/build/build_lane.py mg-M-o83c-$N $ROOT $TGT > $L/logs/build-$N.log 2>&1
rc=$?
O=$W/mayhem-b/out/builds/mg-M-o83c-$N
if [ $rc -ne 0 ] || [ ! -f $O/symbols.so ]; then echo "BUILD FAILED rc=$rc"; grep -E "^(error)" -A12 $O/stderr | head -60; tail -5 $L/logs/build-$N.log; exit 1; fi
echo "stack-offset-warnings: $(grep -c 'exceeded max offset' $O/stderr)"
if [ "$3" = "ir" ]; then cp $W/mayhem-b/target/$TGT/sbpf-solana-solana/release/deps/mayhem_recovered.ll $L/ir/$N.ll 2>/dev/null || echo "no IR found"; fi
python3 -B $L/tools/winreport.py $O/symbols.so O0081 O0082 O0083 2>&1 | tail -5
python3 -B $W/mayhem-b/build/measure.py $O/symbols.so $BASESYM --json $L/logs/m-$N.json > /dev/null
python3 -B -c "
import json;d=json.load(open('$L/logs/m-$N.json'));print('matched',d['counts']['matched_after'],'raw',d['counts']['raw_after'],'gains',d['gains'],'no_losses',d['no_losses'],'losses',{k:d[k] for k in ['body_losses','raw_losses','edge_losses','source_losses'] if d[k]}, 'profile_losses',len(d['profile_losses']))"
