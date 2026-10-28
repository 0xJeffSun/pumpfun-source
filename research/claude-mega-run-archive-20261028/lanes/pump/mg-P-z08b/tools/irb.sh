#!/bin/bash
# irb.sh <src> <name> : IR build (nirbuild) into work-ir, save ir/<name>.ll, score vs L15 (one line)
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z08b
SRC=$1; N=$2; OUT=$L/v/ir-$N; rm -rf $OUT; mkdir -p $OUT
[ -d $L/work-ir ] || cp -c -R $L/work $L/work-ir
python3 -B $W/lanes/mg-P-z06/tools/nirbuild.py --src $SRC --work $L/work-ir --out $OUT > $OUT/fb.json 2>&1
grep -q '"ok": true' $OUT/fb.json || { echo "== $N IR BUILD FAILED"; grep -E "^error" $OUT/build.log | head -5; exit 1; }
cp $L/work-ir/target-identity/sbpf-solana-solana/release/deps/pump_recovered.ll $L/ir/$N.ll
python3 -B $W/harness/score.py $OUT/unstripped.so --baseline $W/base/L29/inventory.json --json $OUT/score.json --quiet | python3 -c "import json,sys;s=json.load(sys.stdin);print('== $N',s['normalized'],s['raw'],'gains',s['gains'],'losses',s['losses'],s['raw_losses'])"
