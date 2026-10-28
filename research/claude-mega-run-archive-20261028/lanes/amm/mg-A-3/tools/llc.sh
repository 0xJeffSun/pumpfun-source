#!/bin/bash
# llc.sh IN.ll OUT.o [extra llc args]
PT=$HOME/.cache/solana/v1.44/platform-tools; IN=$1; OUT=$2; shift 2
$PT/llvm/bin/llc -O3 -filetype=obj -relocation-model=pic -function-sections -mattr=+store-imm,+jmp-ext "$@" "$IN" -o "$OUT"
