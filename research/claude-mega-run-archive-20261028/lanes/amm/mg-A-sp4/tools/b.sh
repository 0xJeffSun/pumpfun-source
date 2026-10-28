#!/bin/bash
# b.sh LANEDIR [tag] : build+measure via nbuild (union-754 frontier), print summary + my-window diffs
L=${1:-/Users/shawwalters/amm100-run/lanes/mg-A-sp4}; T=/Users/shawwalters/amm100-run/lanes/mg-A-sp4/tools
R=$(MEASURE_FRONTIER=${FRONT:-/Users/shawwalters/amm100-run/shared/frontier/matched-union-754n.json} /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L 2>&1 | tail -3)
echo "$R" > $L/out/measure.json
echo "${2:-build} $(echo "$R" | python3 -I -c 'import json,sys
t=sys.stdin.read()
try:
  d=json.loads(t.strip().splitlines()[-1]); print("norm",d["normalized"],"raw",d["raw"],"gains",d["gains"],"losses",d["losses"])
except Exception: print("FAILED", t[-300:])')"
grep -c 'Stack offset' $L/out/build.log | sed 's/^/stackwarn /'
[ -z "$NODIFF" ] && $T/w3.sh $L/out/cand.so 2>/dev/null
