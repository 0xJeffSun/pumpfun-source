#!/bin/bash
# bfv.sh V1.rs [V2.rs ...] : whole-file buy.rs variants; emit IR, slim+llc, report CB (0x351a8), BUY (0x376b0), EXACT (0x3a5a0) diffs. Restores buy.rs.
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp2; F=$L/src/programs/pump-amm/src/instructions/swap/buy.rs; PT=$HOME/.cache/solana/v1.44/platform-tools
cp "$F" "$F.bak"
for v in "$@"; do
  n=$(basename $v .rs); cp "$v" "$F"
  if $L/tools/ir.sh $L/ir/bfv_$n.ll >/dev/null 2>&1; then
    python3 -I $L/tools/slim.py $L/ir/bfv_$n.ll $L/ir/bfv_s.ll distribute_cashback17,instructions4swap3buy3buy17,pump_amm_recovered18buy_exact_quote_in17
    $PT/llvm/bin/llc -O3 -filetype=obj -relocation-model=pic -function-sections -mattr=+store-imm,+jmp-ext $L/ir/bfv_s.ll -o $L/ir/bfv_$n.o 2>/dev/null
    echo "$n: CB $(python3 -I $L/tools/osdiff.py $L/ir/bfv_$n.o 0x351a8 distribute_cashback17) || BUY $(python3 -I $L/tools/osdiff.py $L/ir/bfv_$n.o 0x376b0 instructions4swap3buy3buy17 | cut -d'|' -f2) || EX $(python3 -I $L/tools/osdiff.py $L/ir/bfv_$n.o 0x3a5a0 pump_amm_recovered18buy_exact_quote_in17 2>/dev/null| cut -d'|' -f1-3)"
  else echo "$n: IR_FAIL $(grep -E '^error' -A7 $L/ir/ir.log | head -12 | tr '\n' ' ' | cut -c1-500)"; fi
done
cp "$F.bak" "$F"; rm -f "$F.bak"
