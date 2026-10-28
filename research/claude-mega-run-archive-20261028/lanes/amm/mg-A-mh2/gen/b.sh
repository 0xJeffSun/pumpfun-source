#!/bin/bash
# b.sh [TAG] : build+measure lane src vs union-752n frontier; print summary + ratios of the 3 big windows
L=/Users/shawwalters/amm100-run/lanes/mg-A-mh2
TAG=${1:-cur}
cd $L && MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-752n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L > $L/out/m.txt 2>&1
rc=$?
grep -E '^error' -A7 $L/out/build.log | grep -E '^error|-->' | head -8
echo "rc=$rc stack: $(grep -c -i 'stack offset' $L/out/build.log)"
tail -1 $L/out/m.txt | cut -c1-300
cp $L/out/cand.so $L/out/cand-$TAG.so 2>/dev/null
cd $L/tools; for w in 0x3dbc0:multi_hop_swap7execute17 0x40a08:amm_hop 0x45940:curve_run; do echo "${w%%:*} $(python3 -B hunks.py ../out/cand.so ${w%%:*} ${w##*:} 2>/dev/null | head -1)"; done
