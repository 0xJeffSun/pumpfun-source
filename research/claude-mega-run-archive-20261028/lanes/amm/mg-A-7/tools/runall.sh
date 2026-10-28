#!/bin/bash
L=/Users/shawwalters/amm100-run/lanes/mg-A-7
for n in "$@"; do
  $L/tools/tryupd.sh $n > /dev/null 2>&1
  python3 -I $L/tools/dis2.py diff $L/out/cand_$n.so 0x6d408 GlobalVolumeAccumulator30update_user_volume > $L/gen/d_$n.txt 2>/dev/null
  echo "$n $(head -1 $L/gen/d_$n.txt | grep -o 'cand [0-9]* bytes') diff=$(grep -c '^[-+][^-+]' $L/gen/d_$n.txt) $(tail -1 $L/out/b_$n.txt | grep -o '"normalized": [0-9]*, "raw": [0-9]*' ) $(tail -1 $L/out/b_$n.txt | grep -o '"losses": \[[^]]*\]')" >> $L/gen/runall.log
  rm -f $L/out/cand_$n.so
done
