#!/bin/bash
# quick build+score: qb.sh NAME ROOT  -> one line: NAME masked stackmasked regions size | matched no_losses O81/O82
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
L=$W/mega/mg-M-o83c
N=$1; ROOT=$2
O=$W/mayhem-b/out/builds/mg-M-o83c-$N
[ -d $O ] && rm -rf $O
python3 $W/sbf_lock.py --slots 6 --name sbf -- python3 -B $W/mayhem-env/tools/rbuild.py mg-M-o83c-$N $ROOT > $L/logs/build-$N.log 2>&1
if [ ! -f $O/symbols.so ]; then echo "$N BUILD FAILED"; grep -E '"rendered"' $O/stderr 2>/dev/null | head -2 | cut -c1-400; exit 1; fi
SW=$(grep -c 'Stack offset' $O/stderr)
R=$(python3 -B $L/tools/rs.py $O/symbols.so | sed 's/size [0-9]* //')
python3 -B $W/mayhem-b/build/measure.py $O/symbols.so $W/mayhem-b/out/builds/mgMint-p439-clean/symbols.so --json $L/logs/m-$N.json > /dev/null
M=$(python3 -B -c "
import json;d=json.load(open('$L/logs/m-$N.json'));print('m',d['counts']['matched_after'],'nl',d['no_losses'],'g',d['gains'])")
WR=$(python3 -B $L/tools/winreport.py $O/symbols.so O0081 O0082 O0083 | awk '{print $1,$5,$6,$9}' | tr '\n' ' ')
echo "$N | $R | sw=$SW | $M | $WR"
