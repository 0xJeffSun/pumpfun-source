#!/bin/bash
# llc.sh IN.ll OUT.o : compile crate IR exactly like the build
PT=$HOME/.cache/solana/v1.44/platform-tools
$PT/llvm/bin/llc -O3 -filetype=obj -relocation-model=pic -function-sections -mattr=+store-imm,+jmp-ext "$1" -o "$2"
