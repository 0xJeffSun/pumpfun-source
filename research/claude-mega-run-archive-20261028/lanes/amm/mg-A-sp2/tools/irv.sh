#!/bin/bash
# irv.sh FILE_REL VARIANT ADDR SYMSUB [keep] -> copy whole-file variant into src, emit IR, llc, diff counts vs orig; restore unless keep
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp2; F=$L/src/programs/pump-amm/src/$1; V=$2
cp "$F" "$F.bak"; cp "$V" "$F"
n=$(basename $V .rs)
if $L/tools/ir.sh $L/ir/v_$n.ll >/dev/null 2>$L/ir/v_$n.err; then
  echo "$n: $($L/tools/llcfn.sh $L/ir/v_$n.ll $3 $4 | sed 's/^.*\.\. //')"
else echo "$n: IR_FAIL $(head -c 300 $L/ir/ir.log)"; fi
[ "$5" = keep ] || mv "$F.bak" "$F"; rm -f "$F.bak"
