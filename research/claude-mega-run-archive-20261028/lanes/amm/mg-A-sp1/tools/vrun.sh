#!/bin/bash
# vrun.sh FILE.rs... : for each trade_v2 variant file, emit IR from srcx and score executors; log to ir/vrun.log
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp1; cd $L
for f in "$@"; do
  t=$(basename $f .rs)
  cp $f srcx/programs/pump-amm/src/instructions/swap/trade_v2.rs
  if tools/irx.sh $L/ir/v_$t.ll > /dev/null 2>&1; then
    echo "== $t $(tools/ex3.sh ir/v_$t.ll $t | grep -v 0x4c750 | awk '{print $1, $6, $7}' | tr '\n' ' ')" | tee -a ir/vrun.log
  else echo "== $t BUILD FAIL" | tee -a ir/vrun.log; grep -E '^error' -A5 ir/irx.log | head -8; fi
done
