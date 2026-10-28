#!/bin/bash
# usage: bnoopt.sh LABEL ROOTNAME  -> pre-opt IR (no-prepopulate-passes) into out/LABEL-noopt.ll
MW=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
L=$MW/r436/o0084-ir-r1
LB=o0084-ir-r1-$1
T=r436-o0084-ir-r1-noopt
rm -rf $MW/mayhem-b/out/builds/$LB
export MAYHEM_ROOT_RUSTC_ARGS_JSON='["--emit=llvm-ir,link","-Cno-prepopulate-passes"]'
LANE_CLEAN_ANCHOR=0 python3 $MW/sbf_lock.py --slots 6 --name sbf -- python3 -B $MW/mayhem-b/build/build_lane.py $LB $L/roots/$2 $T > $L/out/$1.log 2>&1
cp $MW/mayhem-b/target/$T/sbpf-solana-solana/release/deps/mayhem_recovered.ll $L/out/$1-noopt.ll && echo "noopt -> $L/out/$1-noopt.ll"
