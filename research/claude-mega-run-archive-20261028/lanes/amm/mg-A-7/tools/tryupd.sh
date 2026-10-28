#!/bin/bash
# tryupd.sh NAME : build gen/upd_NAME.rs as the updater block; print measure + 0x6d408/0x6db20 diff stats
L=/Users/shawwalters/amm100-run/lanes/mg-A-7; N=$1
python3 -B $L/tools/mkva.py $L/gen/upd_$N.rs $L/gen/va.$N > /dev/null || exit 1
cp $L/gen/va.$N $L/src/programs/pump-amm/src/state/volume_accumulator.rs
cd $L && MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-744n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L > $L/out/b_$N.txt 2>&1
M=$(tail -1 $L/out/b_$N.txt | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print(d['normalized'], d['raw'], 'g', d['gains'], 'l', d['losses'])" 2>/dev/null || tail -3 $L/out/b_$N.txt)
python3 -I $L/tools/dis2.py cand $L/out/cand.so GlobalVolumeAccumulator30update_user_volume | tail -n +2 > $L/gen/c_6d408_$N.s
MS=$(python3 -I $L/tools/msd.py $L/gen/o_6d408.s $L/gen/c_6d408_$N.s | head -1)
SZ=$(( $(wc -l < $L/gen/c_6d408_$N.s) * 8 ))
cp $L/out/cand.so $L/out/cand_$N.so
echo "$N | $M | 6d408 size=$SZ $MS"
