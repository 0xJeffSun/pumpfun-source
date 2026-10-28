#!/bin/bash
# irtry.sh EXEC [CB] : assemble, emit IR, llc, report sell/cashback diff counts (no link/measure)
L=/Users/shawwalters/amm100-run/lanes/mg-A-5; G=$L/gen; CB=${2:-cb_v8.rs}; t=${1%.rs}
$G/asm.sh $1 $CB | grep -v 'bad 0' ; $L/tools/emitir.sh $L $L/ir/$t.ll || exit 1
$L/tools/llc.sh $L/ir/$t.ll $L/ir/$t.o 2>/dev/null
echo "$t sell: $(python3 -I $L/tools/odiff.py $L/ir/$t.o 0x49b50 4sell7execute17h 0 0 | cut -c1-40) | cb: $(python3 -I $L/tools/odiff.py $L/ir/$t.o 0x4c750 4sell8cashback17h 0 0 | cut -c1-40)"
