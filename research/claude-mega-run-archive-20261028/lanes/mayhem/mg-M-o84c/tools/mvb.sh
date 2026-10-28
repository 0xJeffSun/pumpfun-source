#!/bin/bash
# usage: mvb.sh NAME  -> build roots/NAME on target BT (default r436-o0084-brute-r1-mv), score variants into out/NAME.res
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c
export BT=${BT:-r436-o0084-brute-r1-mv}
$L/tools/b.sh $1 $1 > $L/out/$1.res 2>&1
python3 -B $L/tools/mv.py score $L/../../mayhem-b/out/builds/o0084-brute-r1-$1/symbols.so $L/roots/$1/variants.json >> $L/out/$1.res 2>&1
