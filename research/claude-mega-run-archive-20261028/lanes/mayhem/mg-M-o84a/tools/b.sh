#!/bin/bash
# usage: b.sh LABEL ROOTNAME [ir]  -> builds roots/ROOTNAME; label o0084-ir-r1-LABEL; if ir, copies IR to out/LABEL.ll + fn to out/LABEL-f.ll
MW=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
L=$MW/r436/o0084-brute-r1
LB=o0084-brute-r1-$1
T=${BT:-r436-o0084-brute-r1}
rm -rf $MW/mayhem-b/out/builds/$LB
if [ "$3" = ir ]; then export MAYHEM_ROOT_RUSTC_ARGS_JSON='["--emit=llvm-ir,link"]'; T=r436-o0084-brute-r1-ir; fi
LANE_CLEAN_ANCHOR=0 python3 $MW/sbf_lock.py --slots 6 --name sbf -- python3 -B $MW/mayhem-b/build/build_lane.py $LB $L/roots/$2 $T > $L/out/$1.log 2>&1 || { echo BUILD FAILED; tail -30 $MW/mayhem-b/out/builds/$LB/stderr; exit 1; }
S=$MW/mayhem-b/out/builds/$LB/symbols.so
grep -c "exceeded max offset" $MW/mayhem-b/out/builds/$LB/stderr | sed 's/^/stackwarn: /'
if [ "$3" = ir ]; then cp $MW/mayhem-b/target/$T/sbpf-solana-solana/release/deps/mayhem_recovered.ll $L/out/$1.ll; python3 -B $L/tools/fx.py $L/out/$1.ll $L/out/$1-f.ll; fi
python3 -B $MW/mayhem-b/build/winreport.py $S O0084
python3 -B $L/tools/hunks.py $S 0 999999 0 | head -1
python3 -B $MW/mayhem-b/build/measure.py $S $MW/mayhem-b/out/builds/pl-o82-final2-434/symbols.so --json $L/out/$1-measure.json > $L/out/$1-measure.txt 2>&1
python3 -c "import json;d=json.load(open('$L/out/$1-measure.json'));print('matched',d['counts']['matched_after'],'gains',d.get('gains'),'no_losses',d.get('no_losses'))"
