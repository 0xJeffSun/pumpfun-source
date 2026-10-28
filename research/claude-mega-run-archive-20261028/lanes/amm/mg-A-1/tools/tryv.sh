#!/bin/bash
# tryv.sh FILE_REL MARKER VARIANT WINDOW SYMSUB [keep] -> splice variant, build+measure (u744 frontier), diff count; restore unless keep
L=/Users/shawwalters/amm100-run/lanes/mg-A-1; F=$L/src/programs/pump-amm/src/$1
cp "$F" "$F.bak"
python3 -I $L/tools/splice.py "$F" "$2" "$3" >/dev/null
out=$(MEASURE_FRONTIER=$HOME/amm100-run/shared/frontier/matched-union-744n.json $HOME/amm100-run/shared/tools/nbuild.sh $L 2>&1 | tail -3)
j=$(echo "$out" | python3 -I -c 'import json,sys
t=sys.stdin.read()
try:
 j=json.loads(t.strip().splitlines()[-1]);print(j["normalized"],j["raw"],"G",j["gains"],"L",j["losses"])
except Exception: print("ERR",t[-300:].replace("\n"," "))')
echo "$(basename $3): $j | $($L/tools/cnt.sh $L/out/cand.so $4 $5 | cut -d'|' -f1 | sed 's/(_ZN.*)//') | $($L/tools/cnt.sh $L/out/cand.so $4 $5 | cut -d'|' -f2)"
cp $L/out/cand.so $L/out/v_$(basename $3 .rs).so; [ "$6" = keep ] || mv "$F.bak" "$F"; rm -f "$F.bak"
