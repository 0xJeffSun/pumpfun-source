#!/bin/bash
# cbv.sh V1.rs [V2.rs ...] : splice each variant into buy.rs lines 29..107 (distribute_cashback; padded with blank lines), emit IR, slim+llc,
# report cashback (0x351a8) exact/struct diff and buy (0x376b0) diff. Restores buy.rs.
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp2; F=$L/src/programs/pump-amm/src/instructions/swap/buy.rs; PT=$HOME/.cache/solana/v1.44/platform-tools
cp "$F" "$F.bak"
for v in "$@"; do
  n=$(basename $v .rs)
  python3 -B - "$F.bak" "$v" "$F" <<'PY' || { echo "$n: SPLICE_FAIL"; continue; }
import sys
src,var,out=sys.argv[1:4]
t=open(src).read().split('\n'); v=open(var).read().rstrip('\n').split('\n')
assert t[28].startswith('fn distribute_cashback'), t[28]
assert t[107].startswith('pub(crate) fn get_buyback_accounts'), t[107]
if len(v)>79: print('TOO LONG',len(v)); sys.exit(1)
v=v+['']*(79-len(v))
t[28:107]=v
open(out,'w').write('\n'.join(t))
PY
  if $L/tools/ir.sh $L/ir/cbv_$n.ll >/dev/null 2>&1; then
    python3 -I $L/tools/slim.py $L/ir/cbv_$n.ll $L/ir/cbv_s.ll distribute_cashback17,instructions4swap3buy3buy17
    $PT/llvm/bin/llc -O3 -filetype=obj -relocation-model=pic -function-sections -mattr=+store-imm,+jmp-ext $L/ir/cbv_s.ll -o $L/ir/cbv_$n.o 2>/dev/null
    echo "$n: CB $(python3 -I $L/tools/osdiff.py $L/ir/cbv_$n.o 0x351a8 distribute_cashback17) || BUY $(python3 -I $L/tools/osdiff.py $L/ir/cbv_$n.o 0x376b0 instructions4swap3buy3buy17 | cut -d'|' -f2)"
  else echo "$n: IR_FAIL $(grep -E '^error' -A5 $L/ir/ir.log | head -8 | tr '\n' ' ' | cut -c1-300)"; fi
done
cp "$F.bak" "$F"; rm -f "$F.bak"
