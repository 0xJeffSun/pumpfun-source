#!/bin/bash
# irt3.sh <in.ll> <tag> <orig_start> <symregex>  (FN, SUBS env) : irsub + llc + compare
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z03
python3 -B $L/tools/irsub.py $1 $L/llx/$2.ll || exit 1
~/.cache/solana/v1.44/platform-tools/llvm/bin/llc -O3 -march=sbf -mattr=+store-imm,+jmp-ext -function-sections -filetype=obj $L/llx/$2.ll -o $L/llx/$2.o || exit 1
python3 -B /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/plainbody/tools/sacmp.py $L/llx/$2.o $3 "$4" | tail -1
rm -f $L/llx/$2.ll
