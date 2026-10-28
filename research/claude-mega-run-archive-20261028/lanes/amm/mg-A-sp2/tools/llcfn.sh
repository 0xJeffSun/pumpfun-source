#!/bin/bash
# llcfn.sh IN.ll ORIGADDR SYMSUB : llc whole module, dump function section, diff vs orig (normalized counts)
PT=$HOME/.cache/solana/v1.44/platform-tools; L=/Users/shawwalters/amm100-run/lanes/mg-A-sp2
O=$L/ir/tmp-$$.o
$PT/llvm/bin/llc -O3 -filetype=obj -relocation-model=pic -function-sections -mattr=+store-imm,+jmp-ext "$1" -o $O 2>/dev/null || { echo LLC_FAIL; exit 1; }
python3 -I $L/tools/ofn.py $O "$2" "$3" $4; cp $O $L/ir/last.o; rm -f $O
