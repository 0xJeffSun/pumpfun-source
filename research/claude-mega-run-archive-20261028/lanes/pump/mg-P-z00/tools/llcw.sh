#!/bin/bash
exec /Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llc -O3 -march=sbf -mattr=+store-imm,+jmp-ext -function-sections -filetype=obj "$1" -o "$2"
