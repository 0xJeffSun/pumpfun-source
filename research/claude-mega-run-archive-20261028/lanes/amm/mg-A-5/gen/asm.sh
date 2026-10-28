#!/bin/bash
# asm.sh EXEC CB -> writes gen/sell.tmpl and gen/sell.rs, installs into src
G=/Users/shawwalters/amm100-run/lanes/mg-A-5/gen
{ cat $G/part_head.rs; cat $G/$1; echo; cat $G/$2; echo '//PAD'; sed -e '1s#$##' $G/part_vp.rs | awk '/require!\(index/{print $0" //@520";next} /require!\(remaining_accounts\[index\]/{print $0" //@526";next} {print}' ; } > $G/sell.tmpl
python3 -I $G/mk.py $G/sell.tmpl $G/sell.rs && cp $G/sell.rs /Users/shawwalters/amm100-run/lanes/mg-A-5/src/programs/pump-amm/src/instructions/swap/sell.rs
