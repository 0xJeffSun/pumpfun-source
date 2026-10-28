#!/bin/bash
# irv.sh TAG [which] : emit IR of current L/src -> L/ir/TAG.ll, llc + window diffs
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp4
$L/tools/ir.sh $L $L/ir/$1.ll >/dev/null 2>&1 || { echo IR_FAILED; grep -E '^error' -A8 $L/out/ir.log | head -30; exit 1; }
echo "== $1"; $L/tools/l3.sh $L/ir/$1.ll ${2:-lve}
