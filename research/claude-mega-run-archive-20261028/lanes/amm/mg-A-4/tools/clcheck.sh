#!/bin/bash
# clcheck.sh MHFILE : diag build (inline remarks) with MHFILE installed; report the inlining decision for execute's error closures
L=/Users/shawwalters/amm100-run/lanes/mg-A-4
cp "$1" $L/src/programs/pump-amm/src/instructions/swap/multi_hop_swap.rs
$L/tools/nbuild-diag.sh $L -C remark=inline > /dev/null 2>&1 || { echo DIAG_FAILED; grep -E '^error' -A5 $L/out/diag.log | head -12; exit 1; }
grep -E "inline \((success|missed)\): '_ZN[^']*multi_hop_swap(7execute|17require_direction)28_[^']*closure[^']*' (not )?inlined into" $L/out/diag.log | sed -E "s/'_ZN[^']*'/F/; s/'_ZN[^']*'/G/" | cut -c1-140 | sort | uniq -c
