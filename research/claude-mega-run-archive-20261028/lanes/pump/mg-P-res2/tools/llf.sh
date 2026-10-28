#!/bin/bash
# llf.sh <in.ll> <tag> <orig_start> <symregex> : llc one module, compare symbol with original window
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-res2
~/.cache/solana/v1.44/platform-tools/llvm/bin/llc -O3 -march=sbf -mattr=+store-imm,+jmp-ext -function-sections -filetype=obj $1 -o $L/llx/$2.o || exit 1
python3 -B $L/tools/sacmp.py $L/llx/$2.o $3 "$4" | tail -1
