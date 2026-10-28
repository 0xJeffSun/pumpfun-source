#!/bin/bash
# coldcheck.sh MHFILE : diag build, report inline decisions into execute for exchange_malloc / BTreeSet drop / error closures
L=/Users/shawwalters/amm100-run/lanes/mg-A-mh2
cp "$1" $L/src/programs/pump-amm/src/instructions/swap/multi_hop_swap.rs
$L/tools/nbuild-diag.sh $L -C remark=inline > /dev/null 2>&1 || { echo DIAG_FAILED; grep -E '^error' -A5 $L/out/diag.log | head -10; exit 1; }
for k in exchange_malloc 'drop_in_place[^ ]*BTreeSet' 'multi_hop_swap7execute28' 'SpecFromIter'; do
  grep -E "'[^']*${k}[^']*' (not )?inlined into '[^']*multi_hop_swap7execute17" $L/out/diag.log | sed -E "s/.*(missed|success)\): '[^']*' (not )?inlined into '[^']*'(.*)/\1\3/" | cut -c1-80 | sort | uniq -c | sed "s/^/$k: /" | cut -c1-110
done
