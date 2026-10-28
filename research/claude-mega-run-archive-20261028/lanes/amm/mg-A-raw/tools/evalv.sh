#!/bin/bash
# evalv.sh NAME : Linux build of var/NAME/src (stock link, saved inputs) + full evaluation:
#   stock measure vs u755 Linux rows; ordered.ld (lay.py) relink measure vs WIN-01 rows (169 raw); pool shard diffs;
#   end-state raw readiness (lay.py --predict). Outputs in var/NAME/out.
set -e
L=/Users/shawwalters/amm100-run/lanes/mg-A-raw; V=$L/var/$1; O=$V/out; T=$L/tools
$T/lbuild-raw.sh $V/src $O > $O.buildlog 2>&1 || { tail -5 $O.buildlog; echo BUILD_FAILED; exit 1; }
grep -E '^linux build' $O.buildlog
echo "stock: $(python3 -I -B $T/cmp.py $O/symbols.so $L/base/u755-rows-linux.json --json $O/rows.json)"
ROOT=$(ls $O/link/in/*-cgu.0.rcgu.o | head -1)
python3 -I -B $T/lay.py $O/symbols.so $O/link/link.map --ld $O/ordered.ld --report $O/lay-report.json --predict $O/predict.json | python3 -I -B -c "import json,sys; d=json.load(sys.stdin); print('lay:', 'unbound', d['unbound_windows'], 'predict', d['predict'])"
python3 -I -B $T/relink.py $O/link $O/ordered.ld $O/ord.so --strip
echo "ordered: $(python3 -I -B $T/cmp.py $O/ord.so $L/WIN-01/rows-linux.json --json $O/ord-rows.json)"
python3 -I -B $T/shards.py $O/symbols.so $O/link/link.map $ROOT --quiet | tr '\n' ' '; echo
