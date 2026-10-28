#!/bin/bash
# vsetx.sh NAME : setx transform -> IR -> llc -> score 0x24fd8
L=/Users/shawwalters/amm100-run/lanes/mg-A-res1; T=$L/tools
python3 -B $L/gen/setx.py "$1" $L/src/programs/pump-amm/src/instructions/coin_creator/set_coin_creator.rs || exit 1
$T/ir.sh $L $L/ir/vset.ll > /dev/null || { echo "$1 IR_FAILED"; exit 1; }
~/.cache/solana/v1.44/platform-tools/llvm/bin/llc -O3 -relocation-model=pic -function-sections -mattr=+store-imm,+jmp-ext -filetype=obj $L/ir/vset.ll -o $L/ir/vset.o 2>/dev/null
echo "$1 | $(python3 -I $T/ndo.py $L/ir/vset.o 0x24fd8 16set_coin_creator3set17 | sed 's/.*cand \([0-9]*\) ins, diff \([0-9]*\) mset \([0-9]*\).*/c\1 d\2 m\3/') | all $(MS=1 MR=1 MJ=1 python3 -I $T/ndo.py $L/ir/vset.o 0x24fd8 16set_coin_creator3set17 | sed 's/.*diff \([0-9]*\) mset.*/\1/')"
