#!/bin/bash
# llx.sh <in.ll> <tag> <orig_start> <symregex>  : llc the module, compare symbol with the original window
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07b
~/.cache/solana/v1.44/platform-tools/llvm/bin/llc -O3 -march=sbf -mattr=+store-imm,+jmp-ext -function-sections -filetype=obj $1 -o $L/llx/$2.o || exit 1
python3 -B $L/tools/sacmp.py $L/llx/$2.o $3 "$4"
