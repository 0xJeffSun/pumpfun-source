#!/bin/bash
# usage: sc.sh SO [cb|buy|exact|all]  -> shape score + normalized diff line count
T=$(dirname "$0"); SO=$1; W=${2:-all}
run(){ s=$(python3 -I $T/dd.py score "$SO" $1 $2 2>&1 | tail -1); n=$(python3 -I $T/dis2.py diff "$SO" $1 $2 2>/dev/null | grep -c '^[-+][^-+]'); echo "$s ndiff=$n"; }
[[ $W == all || $W == cb ]] && run 0x351a8 3buy19distribute_cashback
[[ $W == all || $W == buy ]] && run 0x376b0 ${BUYSYM:-pump_amm_recovered3buy17}
[[ $W == all || $W == exact ]] && run 0x3a5a0 ${EXSYM:-pump_amm_recovered18buy_exact_quote_in17}
