#!/bin/bash
# irt.sh <in.ll> <tag> <transform.py|-> <orig_start> <symregex> : (transform) + llc + compare symbol to original window
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z03
IN=$1; T=$2; X=$3
if [ "$X" != "-" ]; then python3 -B $X $IN $L/llx/$T.ll || exit 1; IN=$L/llx/$T.ll; fi
~/.cache/solana/v1.44/platform-tools/llvm/bin/llc -O3 -march=sbf -mattr=+store-imm,+jmp-ext -function-sections -filetype=obj $IN -o $L/llx/$T.o || exit 1
python3 -B /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/plainbody/tools/sacmp.py $L/llx/$T.o $4 "$5" | tail -3
[ "$X" != "-" ] && rm -f $L/llx/$T.ll
