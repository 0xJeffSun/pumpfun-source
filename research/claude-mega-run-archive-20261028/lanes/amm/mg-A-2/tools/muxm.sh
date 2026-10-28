#!/bin/bash
# muxm.sh : build L/mux and measure every variant (names.txt) vs orig 0x2ba60
L=/Users/shawwalters/amm100-run/lanes/mg-A-2; M=$L/mux; T=$L/tools
R=$(MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-744n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $M 2>&1 | tail -2)
echo "$R" | grep -q BUILD_FAILED && { echo "$R"; exit 1; }
echo "base $(MS=1 MR=1 MJ=1 python3 -I $T/nd.py $M/out/cand.so 0x2ba60 11create_pool7execute17 | cut -d, -f3)"
while read c n; do
 echo "$c $n | $(python3 -I $T/nd.py $M/out/cand.so 0x2ba60 11${c}7execute17 | cut -d, -f3) | MJ$(MJ=1 python3 -I $T/nd.py $M/out/cand.so 0x2ba60 11${c}7execute17 | cut -d, -f3) | all$(MS=1 MR=1 MJ=1 python3 -I $T/nd.py $M/out/cand.so 0x2ba60 11${c}7execute17 | cut -d, -f3)"
done < $M/names.txt
