#!/bin/bash
# usage: b9.sh NAME ROOT [ir]  -> label mg-M-o83c-NAME (parent-439 recipe); measures vs mgMint-p439-clean
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
L=$W/mega/mg-M-o83c
N=$1; ROOT=$2
BASESYM=${BASESYM:-$W/mayhem-b/out/builds/mgMint-p439-clean/symbols.so}
O=$W/mayhem-b/out/builds/mg-M-o83c-$N
[ -d $O ] && rm -rf $O
if [ "$3" = "ir" ]; then TOOL=$L/tools/rbuild_ir.py; export EMIT_IR=1; else TOOL=$W/mayhem-env/tools/rbuild.py; fi
python3 $W/sbf_lock.py --slots 6 --name sbf -- python3 -B $TOOL mg-M-o83c-$N $ROOT > $L/logs/build-$N.log 2>&1
rc=$?
if [ $rc -ne 0 ] || [ ! -f $O/symbols.so ]; then echo "BUILD FAILED rc=$rc"; grep -E '"rendered"' $O/stderr | head -3 | cut -c1-600; tail -3 $L/logs/build-$N.log; exit 1; fi
echo "stack-offset-warnings: $(grep -c 'Stack offset' $O/stderr)"
if [ "$3" = "ir" ]; then cp $O/root-out/mayhem_recovered.ll $L/ir/$N.ll 2>/dev/null || echo "no IR found"; fi
python3 -B $L/tools/winreport.py $O/symbols.so O0081 O0082 O0083 2>&1 | tail -5
python3 -B $L/tools/sc.py $O/symbols.so
python3 -B $W/mayhem-b/build/measure.py $O/symbols.so $BASESYM --json $L/logs/m-$N.json > /dev/null
python3 -B -c "
import json;d=json.load(open('$L/logs/m-$N.json'));print('matched',d['counts']['matched_after'],'raw',d['counts']['raw_after'],'gains',d['gains'],'no_losses',d['no_losses'],'body_losses',d['body_losses'],'raw_losses',len(d['raw_losses']),'edge_losses',len(d['edge_losses']),'source_losses',len(d['source_losses']),'profile_losses',len(d['profile_losses']))"
