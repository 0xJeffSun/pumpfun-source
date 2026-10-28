#!/bin/bash
# ebq.sh VARIANT.rs : trade_v2 = win03 layout + estimate variant at 305-367, old preview(306-330)/estimate(567-586) blanked, preview appended at end
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp1; V=$1; T=$(basename $V .rs)
python3 -I $L/tools/region.py $L/trade_v2.win03.rs $L/src/programs/pump-amm/src/instructions/swap/trade_v2.rs 305 367 $V 567 586 - 1040 1070 $L/gen/preview.rs || exit 1
$L/tools/ir.sh $L/ir/$T.ll || exit 1; $L/tools/llc.sh $L/ir/$T.ll $L/ir/$T.o 2>/dev/null
echo "$T $(python3 -I $L/tools/ostat.py $L/ir/$T.o | tr '\n' ' ' | sed 's/(-[0-9]* +[0-9]*)//g')"
