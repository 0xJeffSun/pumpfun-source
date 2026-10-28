#!/bin/bash
# sz.sh [TAG]: sizes + normalized diff counts for the two windows (compact); saves diffs as out/{sell,cb}_diff[.TAG].txt
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp1; cd $L; T=${1:+.$1}
S=$(python3 -I tools/fn.py out/cand.so 4sell7execute17h 4sell8cashback17h | awk '{printf "%s/", $2}')
python3 -I tools/rdiff.py out/cand.so 0x49b50 4sell7execute17h 0 100000 > out/sell_diff$T.txt 2>/dev/null
python3 -I tools/rdiff.py out/cand.so 0x4c750 4sell8cashback17h 0 100000 > out/cb_diff$T.txt 2>/dev/null
echo "size $S sell -$(grep -c '^-' out/sell_diff$T.txt)+$(grep -c '^+' out/sell_diff$T.txt) cb -$(grep -c '^-' out/cb_diff$T.txt)+$(grep -c '^+' out/cb_diff$T.txt)"
