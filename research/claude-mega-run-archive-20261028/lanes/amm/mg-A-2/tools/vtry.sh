#!/bin/bash
# vtry.sh NAME TARGETFILE VARIANTFILE ADDR SYMSUB : copy VARIANTFILE over TARGETFILE (in L/src), build, print window diff + measure
L=/Users/shawwalters/amm100-run/lanes/mg-A-2; T=$L/tools
cp "$3" "$2"
R=$(MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-744n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L 2>&1 | tail -2)
echo "$R" | grep -q BUILD_FAILED && { echo "$1 BUILD_FAILED"; echo "$R" | head -12; exit 1; }
S=$(echo "$R" | tail -1 | python3 -I -c 'import json,sys; d=json.loads(sys.stdin.read()); print("norm",d["normalized"],"raw",d["raw"],"gains",d["gains"],"losses",d["losses"])')
echo "$1 | $S | stack $(grep -c 'Stack offset' $L/out/build.log) | $(python3 -I $T/nd.py $L/out/cand.so $4 $5 | cut -d, -f2-3) | all$(MS=1 MR=1 MJ=1 python3 -I $T/nd.py $L/out/cand.so $4 $5 | cut -d, -f3 | cut -c1-12)"
