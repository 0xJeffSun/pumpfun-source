#!/bin/bash
# mxcb.sh <name> k1 k2 ... : build multiplex tree from var/cb1 with cashback variants k*, IR build, llc, compare vs 0x6cd78
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b; W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work
LLC=~/.cache/solana/v1.44/platform-tools/llvm/bin/llc
N=$1; shift
BASE=${CBBASE:-$L/var/cb1}
python3 -B $L/gen/cbvar.py $L/var/$N $BASE "$@" || exit 1
cd $L && bash tools/irb.sh $L/var/$N $N "_ZN14pump_recovered[0-9]+cbv[0-9]+[0-9]+process_cashback" ir 2>&1 | tail -1
$LLC -O3 -march=sbf -mattr=+store-imm,+jmp-ext -function-sections -filetype=obj ir/$N.x.ll -o llx/$N.o || exit 1
for k in "$@"; do m="cbv${k}"; echo -n "$k "; python3 -B $W/lanes/plainbody/tools/sacmp.py llx/$N.o 0x6cd78 "_ZN14pump_recovered${#m}${m}16process_cashback"; done
