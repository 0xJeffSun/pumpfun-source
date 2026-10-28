#!/bin/bash
# scorev.sh ADDR NAME... : emit IR, llc, score each variant name (mangled substring 'len+name17') vs ADDR, show aliases
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp1; A=$1; shift
$L/tools/ir.sh $L/ir/v.ll || exit 1; $L/tools/llc.sh $L/ir/v.ll $L/ir/v.o 2>/dev/null
for n in "$@"; do pat="${#n}${n}17"; al=$(grep -E "^@[^ ]*${pat}h[0-9a-f]+E = .*alias" $L/ir/v.ll | sed -E 's/.*ptr @[^ ]*swap8trade_v2[0-9]+([a-z0-9_]+)17h.*/\1/'); echo "$n $(python3 -I $L/tools/ostat.py $L/ir/v.o $A:$pat | tail -1 | cut -d' ' -f3-) ${al:+alias->$al}"; done
