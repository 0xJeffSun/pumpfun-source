#!/bin/bash
# mxcmp.sh <tree> <name> <orig_start> <modprefix e.g. swv> k1 k2 ... : IR build (multiplex), llc, compare each variant module's execute
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b; W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work
LLC=~/.cache/solana/v1.44/platform-tools/llvm/bin/llc
T=$1; N=$2; O=$3; P=$4; shift 4
cd $L && bash tools/irb.sh $T $N "_ZN14pump_recovered[0-9]+${P}[0-9]+[0-9a-z_]*" ir 2>&1 | tail -1
$LLC -O3 -march=sbf -mattr=+store-imm,+jmp-ext -function-sections -filetype=obj ir/$N.x.ll -o llx/$N.o || exit 1
for k in "$@"; do m="${P}${k}"; echo -n "$k "; python3 -B $W/lanes/plainbody/tools/sacmp.py llx/$N.o $O "_ZN14pump_recovered${#m}${m}7execute"; done
