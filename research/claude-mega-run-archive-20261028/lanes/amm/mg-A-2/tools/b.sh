#!/bin/bash
# b.sh LANEDIR [tag] : build+measure via nbuild (733 frontier), print summary + my-window diffs
L=${1:-/Users/shawwalters/amm100-run/lanes/mg-A-2}; T=/Users/shawwalters/amm100-run/lanes/mg-A-2/tools
R=$(MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-744n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L 2>&1 | tail -3)
echo "$R" > $L/out/measure.json
echo "${2:-build} $(echo "$R" | python3 -I -c 'import json,sys
t=sys.stdin.read()
try:
  d=json.loads(t.strip().splitlines()[-1]); print("norm",d["normalized"],"raw",d["raw"],"gains",d["gains"],"losses",d["losses"])
except Exception: print("FAILED", t[-300:])')"
grep -c 'Stack offset' $L/out/build.log | sed 's/^/stackwarn /'
[ -z "$NODIFF" ] && MS=1 MR=1 MJ=1 $T/all.sh $L/out/cand.so 2>/dev/null | cut -c1-75
