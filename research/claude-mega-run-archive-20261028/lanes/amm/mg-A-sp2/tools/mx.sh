#!/bin/bash
# mx.sh FILE_REL BASEFILE ADDR NAMEPREFIX V1.rs V2.rs ... : multiplex: BASEFILE + each variant (a fn whose name is rewritten to hv_<basename>)
# appended; emit IR once, llc once, score each hv_* symbol vs orig ADDR. Restores the file.
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp2; F=$L/src/programs/pump-amm/src/$1; B=$2; A=$3; P=$4; shift 4
cp "$F" "$F.bak"; cp "$B" "$F"; subs=""
for v in "$@"; do n=$(basename $v .rs); python3 -B -c "
import re,sys
t=open('$v').read()
t=re.sub(r'pub fn [a-z_0-9]+\(', 'pub fn hv_$n(', t, count=1)
open('$F','a').write('\n'+t+'\n')"; subs="$subs hv_${n}17h"; done
PT=$HOME/.cache/solana/v1.44/platform-tools
if $L/tools/ir.sh $L/ir/mx.ll >/dev/null 2>&1; then
  $PT/llvm/bin/llc -O3 -filetype=obj -relocation-model=pic -function-sections -mattr=+store-imm,+jmp-ext $L/ir/mx.ll -o $L/ir/mx.o && python3 -I $L/tools/ofnm.py $L/ir/mx.o $A $subs
else echo IR_FAIL; grep -E '^error' -A8 $L/ir/ir.log | head -30; fi
mv "$F.bak" "$F"
