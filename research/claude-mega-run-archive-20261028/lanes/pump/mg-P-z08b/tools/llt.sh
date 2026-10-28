#!/bin/bash
# llt.sh <in.ll> <tag> <orig_start> <symregex> : llc one (extracted) module and compare symbol to the original window
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z08b
LLC=/Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llc
$LLC -O3 -march=sbf -mattr=+store-imm,+jmp-ext -function-sections -filetype=obj $1 -o $L/llx/$2.o || { echo LLC FAIL; exit 1; }
python3 -B $W/lanes/plainbody/tools/sacmp.py $L/llx/$2.o $3 "$4"
