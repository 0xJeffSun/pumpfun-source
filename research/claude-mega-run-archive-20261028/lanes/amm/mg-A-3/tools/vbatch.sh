#!/bin/bash
# vbatch.sh TAG... : for each TAG, compose gen/cb_TAG.rs (EXTRA env honored), emit IR, llc, score; append to out/vbatch.log
L=$HOME/amm100-run/lanes/mg-A-3; T=$L/tools
for v in "$@"; do
  python3 -B $L/gen/compose.py $L/gen/cb_$v.rs | grep -v "bad 0"
  $T/ir.sh $L/ir/$v.ll >/dev/null || { echo "$v IRFAIL" | tee -a $L/out/vbatch.log; continue; }
  $T/llc.sh $L/ir/$v.ll $L/ir/$v.o 2>/dev/null
  python3 -I $T/olist.py $L/ir/$v.o 3buy19distribute_cashback > $L/out/c_$v.txt
  echo "$v $(python3 -I $T/nd2.py $L/out/o351a8.txt $L/out/c_$v.txt)" | tee -a $L/out/vbatch.log
  rm -f $L/ir/$v.ll
done
