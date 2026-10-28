#!/bin/bash
# llc1.sh <in.ll> <tag> [orig_start symregex]... : llc the module once, then compare each (start, symregex) pair
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-v3a
IN=$1; TAG=$2; shift 2
~/.cache/solana/v1.44/platform-tools/llvm/bin/llc -O3 -march=sbf -mattr=+store-imm,+jmp-ext -function-sections -filetype=obj $IN -o $L/llx/$TAG.o || exit 1
while [ $# -ge 2 ]; do python3 -B $L/tools/sacmp.py $L/llx/$TAG.o $1 "$2"; shift 2; done
