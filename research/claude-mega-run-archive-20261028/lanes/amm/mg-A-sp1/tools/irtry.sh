#!/bin/bash
# irtry.sh IN.ll TAG ADDR SYMSUB "MOVES..." : apply mvblk moves, llc, print odiff count + hclass summary
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp1; cd $L
IN=$1; T=$2; A=$3; S=$4; shift 4
python3 -I tools/mvblk.py $IN ir/$T.ll $S $@ || exit 1
tools/llc.sh ir/$T.ll ir/$T.o 2>/dev/null
python3 -I tools/odiff.py ir/$T.o $A $S 0 100000 > ir/$T.diff
echo "$T: $(head -1 ir/$T.diff | cut -c1-30) $(python3 -I tools/hclass.py ir/$T.diff 0 | head -1)"
