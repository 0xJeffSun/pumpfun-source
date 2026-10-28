#!/bin/bash
# mxscore.sh <so> <ll> <orig> <prefix> <names...>: score each multiplexed variant symbol + count aggregate phis in its IR
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-res2
so=$1; ll=$2; orig=$3; pre=$4; shift 4
for n in "$@"; do
  r=$(python3 -B $L/tools/wd.py $orig $so "${pre}${n}17h" -q 2>&1 | head -1 | sed -E 's/.*@0x[0-9a-f]+ //')
  a=$(awk "/^define.*${pre}${n}17h/,/^}/" $ll | grep -c "phi { i64, ptr }")
  echo "$n: $r aggphi=$a"
done
