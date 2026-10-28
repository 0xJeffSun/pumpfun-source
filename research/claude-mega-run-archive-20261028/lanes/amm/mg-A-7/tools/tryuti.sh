#!/bin/bash
# tryuti.sh NAME : template gen/va.t1.NAME (+ updater gen/upd_u10.rs) -> build, print 6db20 stats
L=/Users/shawwalters/amm100-run/lanes/mg-A-7; N=$1
cp $L/gen/va.t1 $L/gen/va.t1.bak; cp $L/gen/va.t1.$N $L/gen/va.t1
python3 -B $L/tools/mkva.py $L/gen/upd_u10.rs $L/gen/va.uti_$N > /dev/null; R=$?
cp $L/gen/va.t1.bak $L/gen/va.t1; [ $R = 0 ] || exit 1
cp $L/gen/va.uti_$N $L/src/programs/pump-amm/src/state/volume_accumulator.rs
cd $L && MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-744n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L > $L/out/bu_$N.txt 2>&1
M=$(tail -1 $L/out/bu_$N.txt | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print(d['normalized'], d['raw'], 'g', d['gains'], 'l', d['losses'])" 2>/dev/null || tail -3 $L/out/bu_$N.txt)
cp $L/out/cand.so $L/out/cand_uti_$N.so
python3 -I $L/tools/dis2.py cand $L/out/cand.so GlobalVolumeAccumulator23update_token_incentives | tail -n +2 > $L/gen/c_6db20_$N.s
python3 -I $L/tools/dis2.py diff $L/out/cand.so 0x6db20 GlobalVolumeAccumulator23update_token_incentives > $L/gen/du_$N.txt
echo "$N | $M | $(head -1 $L/gen/du_$N.txt | cut -c1-38) diff=$(grep -c '^[-+][^-+]' $L/gen/du_$N.txt) | $(python3 -I $L/tools/msd.py $L/gen/o_6db20.s $L/gen/c_6db20_$N.s | head -1)"
