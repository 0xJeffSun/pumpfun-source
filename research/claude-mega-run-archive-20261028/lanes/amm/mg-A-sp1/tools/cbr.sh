#!/bin/bash
# cbr.sh VARIANT.rs [TAG] : put calculate_buy_result variant into trade_v2.rs (lines 245-298), IR build, score 0x50598
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp1; V=$1; T=${2:-$(basename $V .rs)}
python3 -I $L/tools/region.py $L/trade_v2.base.rs $L/src/programs/pump-amm/src/instructions/swap/trade_v2.rs 245 298 $V || exit 1
$L/tools/ir.sh $L/ir/$T.ll || exit 1; $L/tools/llc.sh $L/ir/$T.ll $L/ir/$T.o 2>/dev/null
echo "$T $(python3 -I $L/tools/ostat.py $L/ir/$T.o | head -1)"
