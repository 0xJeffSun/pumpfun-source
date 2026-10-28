#!/bin/bash
# usage: b.sh tag [src] [work] -> builds, scores vs r5-z01-02, saves so/<tag>.so + .json + .log
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z01; SRC=${2:-$L/src}; WK=${3:-$L/work}
mkdir -p $L/so
rm -f $WK/last/unstripped.so; python3 -B $W/harness/fastbuild.py --src $SRC --work $WK > $L/so/$1.log 2>&1
grep -q '"ok": true' $L/so/$1.log || { echo "BUILD FAILED $1"; grep -E 'error(\[|:)' $L/so/$1.log | head -5; exit 1; }
grep -E 'Stack offset' $L/so/$1.log | head -3
cp $WK/last/unstripped.so $L/so/$1.so
python3 -B $W/harness/score.py $L/so/$1.so --baseline $W/deliveries/r5-z01-02/score.json --json $L/so/$1.json --quiet
