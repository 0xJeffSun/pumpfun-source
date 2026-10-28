#!/bin/bash
# usage: bb.sh LABEL ROOT(dir or name under roots/) [ir]   (lane mg-M-o84b)
MW=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
L=$MW/mega/mg-M-o84b
LB=mg-M-o84b-$1
T=${BT:-mg-M-o84b}
BASE=${BASESYM:-$MW/mayhem-b/out/builds/o0077-ir-r1-v1/symbols.so}
R=$2; case $R in /*) ;; *) R=$L/roots/$R;; esac
rm -rf $MW/mayhem-b/out/builds/$LB
if [ "$3" = ir ]; then export MAYHEM_ROOT_RUSTC_ARGS_JSON='["--emit=llvm-ir,link"]'; T=${T}-ir; fi
LANE_CLEAN_ANCHOR=${LCA:-0} python3 $MW/sbf_lock.py --slots 6 --name sbf -- python3 -B $MW/mayhem-b/build/build_lane.py $LB $R $T > $L/logs/$1.log 2>&1 || { echo BUILD FAILED; tail -30 $MW/mayhem-b/out/builds/$LB/stderr | cut -c1-200; exit 1; }
S=$MW/mayhem-b/out/builds/$LB/symbols.so
grep -c "exceeded max offset" $MW/mayhem-b/out/builds/$LB/stderr | sed 's/^/stackwarn: /'
if [ "$3" = ir ]; then cp $MW/mayhem-b/target/$T/sbpf-solana-solana/release/deps/mayhem_recovered.ll $L/out/$1.ll; python3 -B $L/tools/fx.py $L/out/$1.ll $L/out/$1-f.ll; fi
python3 -B $L/tools/wr.py $S O0081 O0082 O0083 O0084
python3 -B $L/tools/hunks.py $S 0 999999 0 | head -1
python3 -B $MW/mayhem-b/build/measure.py $S $BASE --json $L/out/$1-measure.json > $L/out/$1-measure.txt 2>&1
python3 -c "import json;d=json.load(open('$L/out/$1-measure.json'));print('matched',d['counts']['matched_after'],'gains',d.get('gains'),'no_losses',d.get('no_losses'))"
