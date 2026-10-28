#!/bin/bash
# bbatch.sh CBTAG BUYTAG... : compose2 gen/cb_CBTAG.rs gen/buy_BUYTAG.rs, emit IR, llc, score buy (and cb); log out/bbatch.log
L=$HOME/amm100-run/lanes/mg-A-3; T=$L/tools; CB=$1; shift
[ -f $L/out/o376b0.txt ] || python3 -I $T/dis2.py orig 0x376b0 > $L/out/o376b0.txt
for v in "$@"; do
  python3 -B $L/gen/compose2.py $L/gen/cb_$CB.rs $L/gen/buy_$v.rs $EXACTTPL | grep -v "bad 0"
  $T/ir.sh $L/ir/b_$v.ll >/dev/null || { echo "$v IRFAIL" | tee -a $L/out/bbatch.log; continue; }
  $T/llc.sh $L/ir/b_$v.ll $L/ir/b_$v.o 2>/dev/null
  python3 -I $T/olist.py $L/ir/b_$v.o ${BUYSYM:-18pump_amm_recovered18pump_amm_recovered3buy17} > $L/out/cb_$v.txt
  python3 -I $T/olist.py $L/ir/b_$v.o 3buy19distribute_cashback > $L/out/cc_$v.txt
  echo "$CB/$v buy: $(python3 -I $T/nd2.py $L/out/o376b0.txt $L/out/cb_$v.txt) | cb: $(python3 -I $T/nd2.py $L/out/o351a8.txt $L/out/cc_$v.txt | cut -d' ' -f3-)" | tee -a $L/out/bbatch.log
  rm -f $L/ir/b_$v.ll
done
