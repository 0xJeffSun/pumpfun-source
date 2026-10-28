#!/bin/bash
# llc.sh X.ll [ADDR SYMSUB] -> X.o + masked diff summaries
LLC=~/.cache/solana/v1.44/platform-tools/llvm/bin/llc; T=/Users/shawwalters/amm100-run/lanes/mg-A-sp4/tools
$LLC -O3 -relocation-model=pic -function-sections -mattr=+store-imm,+jmp-ext -filetype=obj $1 -o ${1%.ll}.o 2>&1 | grep -v 'overwrites values\|^$' | head -5
A=${2:-0x2ba60}; S=${3:-11create_pool7execute17}
echo "$(python3 -I $T/ndo.py ${1%.ll}.o $A $S | cut -c1-70) | MJ $(MJ=1 python3 -I $T/ndo.py ${1%.ll}.o $A $S | cut -d, -f3) | all $(MS=1 MR=1 MJ=1 python3 -I $T/ndo.py ${1%.ll}.o $A $S | cut -d, -f3)"
