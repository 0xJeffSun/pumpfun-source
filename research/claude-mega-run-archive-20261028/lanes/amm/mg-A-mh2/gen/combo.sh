#!/bin/bash
# combo.sh HELPER-LOOP1 : v1gen loop-1 variant + loop-2 'b' (named reallocs) + HopKind enum match -> lane src; then exp.sh TAG
L=/Users/shawwalters/amm100-run/lanes/mg-A-mh2; F=$L/src/programs/pump-amm/src/instructions/swap/multi_hop_swap.rs
python3 -B $L/gen/v1gen.py $1 >/dev/null || exit 1
cp $F $L/gen/var/$1.l1.rs
python3 -B $L/gen/l2gen.py b $L/gen/var/$1.l1.rs >/dev/null || exit 1
cp $F $L/gen/var/$1.l2.rs
python3 -B $L/gen/kind.py $L/gen/var/$1.l2.rs $F eq >/dev/null || exit 1
cp $F $L/gen/var/$1.k.rs
$L/gen/exp.sh k-$1 2>&1 | grep -E '^0x3dbc0|masked' | sed 's/orig 1145 //' | tr '\n' ' '
python3 -B $L/tools/rsm.py $L/ir/k-$1.o multi_hop_swap7execute17 0x3dbc0 | head -1
