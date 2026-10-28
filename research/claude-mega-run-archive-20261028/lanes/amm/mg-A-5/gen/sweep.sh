#!/bin/bash
# sweep.sh CB EXEC1 EXEC2 ... : build each exec variant with cashback CB; log diff counts
L=/Users/shawwalters/amm100-run/lanes/mg-A-5; G=$L/gen; CB=$1; shift
for e in "$@"; do
  $G/asm.sh $e $CB > /dev/null || { echo "$e ASM FAIL"; continue; }
  grep -q 'bad 0' <(python3 -I $G/mk.py $G/sell.tmpl /dev/null) || { echo "$e ALIGN FAIL"; python3 -I $G/mk.py $G/sell.tmpl /dev/null | head -3; continue; }
  r=$($L/tools/nb.sh sw 2>&1 | tail -1); s=$($L/tools/sz.sh ${e%.rs})
  echo "$e | $r | $s" | tee -a $G/sweep.log
done
