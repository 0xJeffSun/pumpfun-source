#!/bin/bash
# ex3.sh IN.ll [TAG] : score the 3 executors (+cashback) from an IR file via single-fn llc
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp1; cd $L; T=${2:-x}
for f in "0x53350:trade_v211execute_buy17" "0x54a20:trade_v223execute_buy_exact_quote" "0x56710:trade_v212execute_sell17" "0x4c750:4sell8cashback17h"; do
  a=${f%%:*}; s=${f##*:}
  python3 -I tools/irone.py $1 ir/tmp/$T.ll $s && tools/llc.sh ir/tmp/$T.ll ir/tmp/$T-$a.o 2>/dev/null && echo "$a $(python3 -I tools/odiff.py ir/tmp/$T-$a.o $a $s 0 0 | cut -c1-40)"
done
