#!/bin/bash
# usage: bb4.sh LABEL ROOT(dir or name under roots/)   (lane mg-M-o84c, parent-439 recipe: mayhem-env/tools/rbuild.py)
MW=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
L=$MW/mega/mg-M-o84c
LB=mg-M-o84c-$1
BASE=${BASESYM:-$MW/mayhem-b/out/builds/mgMint-p439-clean/symbols.so}
R=$2; case $R in /*) ;; *) R=$L/roots/$R;; esac
rm -rf $MW/mayhem-b/out/builds/$LB
python3 $MW/sbf_lock.py --slots 6 --name sbf -- python3 -B $MW/mayhem-env/tools/rbuild.py $LB $R > $L/logs/$1.log 2>&1 || { echo BUILD FAILED; python3 -B $L/tools/err.py $MW/mayhem-b/out/builds/$LB/stderr | head -5; tail -3 $L/logs/$1.log | cut -c1-200; exit 1; }
S=$MW/mayhem-b/out/builds/$LB/symbols.so
grep -c "Stack offset" $MW/mayhem-b/out/builds/$LB/stderr | sed 's/^/stackwarn: /'
python3 -B $L/tools/wr.py $S O0081 O0082 O0083 O0084
python3 -B $L/tools/sc.py $S ${3:-}
if [ -z "$NOMEASURE" ]; then
python3 -B $MW/mayhem-b/build/measure.py $S $BASE --json $L/out/$1-measure.json > $L/out/$1-measure.txt 2>&1
python3 -c "import json;d=json.load(open('$L/out/$1-measure.json'));print('matched',d['counts']['matched_after'],'gains',d.get('gains'),'no_losses',d.get('no_losses'))"
fi
