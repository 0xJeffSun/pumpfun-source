#!/bin/bash
# dstat.sh SO : difflines for my windows
L=/Users/shawwalters/amm100-run/lanes/mg-A-7; SO=${1:-$L/out/cand.so}
while read a n; do
  python3 -I $L/tools/dis2.py diff $SO $a $n > $L/gen/cur_$a.txt 2>&1
  echo "$a $(head -1 $L/gen/cur_$a.txt | sed 's/(.*//') difflines=$(grep -c '^[-+][^-+]' $L/gen/cur_$a.txt)"
done <<LIST
0x6d408 GlobalVolumeAccumulator30update_user_volume_accumulator
0x6db20 GlobalVolumeAccumulator23update_token_incentives
0xf28b8 supported_mint_data
0xf31d8 decode_transfer_fees
LIST
