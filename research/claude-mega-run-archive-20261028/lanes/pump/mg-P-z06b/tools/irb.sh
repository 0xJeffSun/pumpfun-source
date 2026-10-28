#!/bin/bash
# irb.sh <src> <name> [fnregex] [workslot]: build with IR emission, save IR (ir/<name>.ll, ir/<name>.x.ll = fn extract), score .so vs L13
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z06b
SRC=$1; N=$2; RX=${3:-control_entry}; WS=${4:-ir}; OUT=$L/res/ir-$N; rm -rf $OUT; mkdir -p $OUT
python3 -B $L/tools/nirbuild.py --src $SRC --work $L/work-$WS --out $OUT > $OUT/fb.json 2>&1
grep -q '"ok": true' $OUT/fb.json || { echo "== $N IR BUILD FAILED"; grep -E "^error" $OUT/build.log | head -5; exit 1; }
cp $L/work-$WS/target-identity/sbpf-solana-solana/release/deps/pump_recovered.ll $L/ir/$N.ll
python3 -B $L/tools/xfn.py $L/ir/$N.ll "$RX" $L/ir/$N.x.ll 2>/dev/null
python3 -B $W/harness/score.py $OUT/unstripped.so --baseline $W/base/L24/inventory.json --json $OUT/score.json --quiet > /dev/null 2>&1
python3 -B -c "
import json;s=json.load(open('$OUT/score.json'))['summary'];r=json.load(open('$OUT/fb.json'))
print('== $N rv',r['runtime_valid'],'stack',r['stack_warnings'][:1],'norm',s['normalized'],'raw',s['raw'],'gains',s['gains'],'losses',s['losses'],'rg',s['raw_gains'],'rl',s['raw_losses'])"
