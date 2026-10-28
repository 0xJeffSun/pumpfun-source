#!/bin/bash
# ex.sh EST.rs EXEC.rs [TAG] : trade_v2 = win03 + estimate variant (305-367) + old estimate blanked + executor block at 587-1100
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp1; T=${3:-$(basename $2 .rs)}
python3 -I $L/tools/region.py $L/trade_v2.win03.rs $L/src/programs/pump-amm/src/instructions/swap/trade_v2.rs 305 367 $1 567 586 - 587 1100 $2 || exit 1
$L/tools/ir.sh $L/ir/$T.ll || exit 1; $L/tools/llc.sh $L/ir/$T.ll $L/ir/$T.o 2>/dev/null
echo "$T $(python3 -I $L/tools/ostat.py $L/ir/$T.o | tr '\n' ' ' | sed 's/(-[0-9]* +[0-9]*)//g')"
