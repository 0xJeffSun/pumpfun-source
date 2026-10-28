#!/bin/bash
# muxeval.sh X.ll ADDR FNPREFIX names... : llc X.ll and print diff summary for each variant symbol FNPREFIX_<name>
LLC=~/.cache/solana/v1.44/platform-tools/llvm/bin/llc; T=/Users/shawwalters/amm100-run/lanes/mg-A-sp4/tools
X=$1; A=$2; P=$3; shift 3; O=${X%.ll}.o
$LLC -O3 -relocation-model=pic -function-sections -mattr=+store-imm,+jmp-ext -filetype=obj $X -o $O 2>&1 | grep -v 'overwrites values\|^$' | head -3
for n in "$@"; do
 nm="${P}_$n"; s="${#nm}${nm}17h"
 echo "$n: $(python3 -I $T/ndo.py $O $A $s | cut -d, -f2-3 | cut -c1-30) | MJ$(MJ=1 python3 -I $T/ndo.py $O $A $s | cut -d, -f3 | cut -c1-24) | all$(MS=1 MR=1 MJ=1 python3 -I $T/ndo.py $O $A $s | cut -d, -f3 | cut -c1-24)"
done
