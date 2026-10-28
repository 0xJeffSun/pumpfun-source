#!/bin/bash
# exp.sh TAG : diag IR build (+inline remarks) of lane src -> ir/TAG.ll, llc -> ir/TAG.o, ratios, key inline decisions into execute
L=/Users/shawwalters/amm100-run/lanes/mg-A-mh2; T=$1; PT=$HOME/.cache/solana/v1.44/platform-tools
$L/tools/nbuild-diag.sh $L --emit=llvm-ir -C remark=inline >/dev/null || { grep -E '^error' -A6 $L/out/diag.log | head -20; exit 1; }
cp $L/target-diag/sbpf-solana-solana/release/deps/pump_amm_recovered.ll $L/ir/$T.ll
$L/ir/llc.sh $L/ir/$T.ll $L/ir/$T.o 2>/dev/null
for w in 0x3dbc0:multi_hop_swap7execute17 0x40a08:multi_hop_swap7amm_hop 0x45940:multi_hop_swap9curve_run; do echo "${w%%:*} $(python3 -B $L/tools/ocmp.py $L/ir/$T.o ${w##*:} ${w%%:*} | sed 's/orig [0-9]*i //')"; done
python3 -B $L/tools/slotmap.py $L/ir/$T.o 0x3dbc0 multi_hop_swap7execute17 | head -1 | sed 's/orig 1145 //'
python3 -B $L/tools/remarks.py $L/out/diag.log multi_hop_swap7execute17 'exchange_malloc|BTreeSet|Clone|from_iter|to_string|closure'
python3 -B $L/tools/lt.py $L/ir/$T.ll multi_hop_swap7execute17 mint mint2 mint1 output_mint quote_mint _145 flags
