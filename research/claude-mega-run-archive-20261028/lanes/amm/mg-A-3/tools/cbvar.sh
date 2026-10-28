#!/bin/bash
# cbvar.sh TEMPLATE TAG : compose buy.rs with template, emit IR, llc, score cashback (no .so build)
L=$HOME/amm100-run/lanes/mg-A-3; T=$L/tools
python3 -B $L/gen/compose.py "$1" | grep -v "bad 0" ; $T/ir.sh $L/ir/$2.ll >/dev/null || exit 1
$T/llc.sh $L/ir/$2.ll $L/ir/$2.o 2>/dev/null
echo "$2 $(python3 -I $T/ndo.py 0x351a8 $L/ir/$2.o 3buy19distribute_cashback) | $(python3 -I $T/ocalls.py $L/ir/$2.o 3buy19distribute_cashback | tr ' ' '\n' | grep -E 'data_is|create|validate_self|transfer_checked|pool_v2' | cut -d: -f1 | tr '\n' ' ')"
