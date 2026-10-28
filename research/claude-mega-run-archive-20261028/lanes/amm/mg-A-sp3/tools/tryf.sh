#!/bin/bash
# tryf.sh FILE_REL VARIANT WINDOW SYMSUB [keep] -> copy whole-file variant, build+measure (u754 frontier), diff count; restore unless keep
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp3; F=$L/src/programs/pump-amm/src/$1
cp "$F" "$F.bak"; cp "$2" "$F"
out=$(MEASURE_FRONTIER=$HOME/amm100-run/shared/frontier/matched-union-754n.json $HOME/amm100-run/shared/tools/nbuild.sh $L 2>&1 | tail -3)
j=$(echo "$out" | python3 -I -c 'import json,sys
t=sys.stdin.read()
try:
 j=json.loads(t.strip().splitlines()[-1]);print(j["normalized"],j["raw"],"G",j["gains"],"L",j["losses"])
except Exception: print("ERR",t[-300:].replace("\n"," "))')
c=$($L/tools/cnt.sh $L/out/cand.so $3 $4)
echo "$(basename $2): $j | $(echo "$c" | sed 's/(_ZN[^)]*)//')"
cp $L/out/cand.so $L/out/v_$(basename $2 .rs).so
[ "$5" = keep ] || mv "$F.bak" "$F"; rm -f "$F.bak"
