#!/bin/zsh
# llone.sh <in.ll> <fnregex> <tag> <orig_start> : extract fn, llc, compare (sacmp) -> prints ratio/diff
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10b
python3 -B $L/tools/xfn.py $1 "$2" $L/llx/$3.ll 2>/dev/null || exit 1
~/.cache/solana/v1.44/platform-tools/llvm/bin/llc -O3 -march=sbf -mattr=+store-imm,+jmp-ext -function-sections -filetype=obj $L/llx/$3.ll -o $L/llx/$3.o || exit 1
python3 -B $L/tools/sacmp.py $L/llx/$3.o $4 "${5:-$2}"
