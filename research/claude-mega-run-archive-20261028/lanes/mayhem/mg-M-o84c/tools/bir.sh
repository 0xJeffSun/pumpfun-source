#!/bin/bash
# bir.sh ROOTNAME  -> build with IR emit; copies mayhem_recovered.ll to out/ROOTNAME.ll and the sell_v2 fn to out/ROOTNAME-f.ll
MW=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work; L=$MW/mega/mg-M-o84c; LB=mg-M-o84c-$1-ir
rm -rf $MW/mayhem-b/out/builds/$LB
python3 $MW/sbf_lock.py --slots 6 --name sbf -- python3 -B $L/tools/rbuild_ir.py $LB $L/roots/$1 > $L/logs/$1-ir.log 2>&1 || { echo FAIL; python3 -B $L/tools/err.py $MW/mayhem-b/out/builds/$LB/stderr | head -4; exit 1; }
LL=$(ls $MW/mayhem-b/out/builds/$LB/root-out/*.ll 2>/dev/null | head -1)
[ -z "$LL" ] && { echo "no .ll"; ls $MW/mayhem-b/out/builds/$LB/root-out/ | head; exit 1; }
cp $LL $L/out/$1.ll; python3 -B $L/tools/fx.py $L/out/$1.ll $L/out/$1-f.ll 2>/dev/null; wc -l $L/out/$1.ll $L/out/$1-f.ll 2>/dev/null
