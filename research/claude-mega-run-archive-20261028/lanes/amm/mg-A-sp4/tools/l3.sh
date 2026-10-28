#!/bin/bash
# l3.sh X.ll [which] : llc X.ll -> X.o, then masked diffs (plain | MJ | all-masked) for lane windows. which = subset of "lve"
LLC=~/.cache/solana/v1.44/platform-tools/llvm/bin/llc; T=/Users/shawwalters/amm100-run/lanes/mg-A-sp4/tools
O=${1%.ll}.o
$LLC -O3 -relocation-model=pic -function-sections -mattr=+store-imm,+jmp-ext -filetype=obj $1 -o $O 2>&1 | grep -v 'overwrites values\|^$' | head -5
W=${2:-lve}
for p in "l 0x26da8 ${LSYM:-transfer_creator_fees_to_pump6legacy}" "v 0x28dd0 ${VSYM:-transfer_creator_fees_to_pump2v2}" "e 0x2e720 ${ESYM:-14extend_account}"; do
 set -- $p; [[ $W == *$1* ]] || continue
 echo "$2 $(python3 -I $T/ndo.py $O $2 $3 | cut -d, -f2-3) | MJ$(MJ=1 python3 -I $T/ndo.py $O $2 $3 | cut -d, -f3) | all$(MS=1 MR=1 MJ=1 python3 -I $T/ndo.py $O $2 $3 | cut -d, -f3)"
done
