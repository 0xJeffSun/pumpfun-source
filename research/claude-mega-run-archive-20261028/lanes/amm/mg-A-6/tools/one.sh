#!/bin/bash
# one.sh TAG : emit IR for current src, llc, score all 6 windows -> ir/TAG.{ll,o}
L=/Users/shawwalters/amm100-run/lanes/mg-A-6
$L/tools/ir.sh $L/ir/$1.ll || exit 1; $L/tools/llc.sh $L/ir/$1.ll $L/ir/$1.o 2>/dev/null; python3 -I $L/tools/ostat.py $L/ir/$1.o | tr '\n' ' ' | sed 's/(-[0-9]* +[0-9]*)//g'; echo
