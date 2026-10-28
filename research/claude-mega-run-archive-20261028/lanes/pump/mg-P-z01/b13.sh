#!/bin/bash
# usage: b13.sh tag [src] [work] -> nbuild on L13-based tree, score vs L13; saves so/<tag>.{so,json,log}
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z01; SRC=${2:-$L/s13}; WK=${3:-$L/w13}
mkdir -p $L/so $L/out/$1
python3 -B $L/tools/nbuild.py --src $SRC --work $WK --out $L/out/$1 --baseline $W/base/L13/inventory.json > $L/so/$1.log 2>&1
grep -q '"ok": true' $L/so/$1.log || grep -q '"ok": true' $L/out/$1/build.log 2>/dev/null || { echo "BUILD FAILED $1"; grep -E 'error(\[|:)' $L/so/$1.log $L/out/$1/build.log 2>/dev/null | head -5; exit 1; }
grep -E 'Stack offset' $L/so/$1.log $L/out/$1/build.log 2>/dev/null | head -3
cp $L/out/$1/unstripped.so $L/so/$1.so
python3 -B $W/harness/score.py $L/so/$1.so --baseline $W/base/L13/inventory.json --json $L/so/$1.json --quiet
