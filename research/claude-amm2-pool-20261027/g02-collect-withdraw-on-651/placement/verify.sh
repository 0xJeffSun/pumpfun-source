#!/bin/bash
# usage: placement/verify.sh <base canonical source root containing programs/pump-amm (optional-context-recovery-20261027)>  (run from the packet dir)
# 1) source.patch reproduces source/ from the base; 2) step1 (= g01 on 651) + step2 (line-count-preserving code edits) compose to the same tree;
# 3) the new collect_coin_creator_fee.rs placement is whitespace-only and regenerates byte-for-byte. g01's own placement proofs live in
#    ../g01-liquidity-boost-create-placement/placement (deposit/withdraw/boost/create_pool).
set -euo pipefail
B=$1; T=$(mktemp -d); P=placement
cp -R $B/programs $T/a; cp -R $B/programs $T/b
(cd $T && mkdir x y && mv a x/programs && mv b y/programs)
(cd $T/x && patch -p1 -E -s < $OLDPWD/source.patch)
(cd $T/y && patch -p1 -E -s < $OLDPWD/$P/step1-g01-rebased-on-651.patch && patch -p1 -E -s < $OLDPWD/$P/step2-code-on-g01.patch)
for f in $(cd source && find programs -type f); do cmp $T/x/$f source/$f; cmp $T/y/$f source/$f; done
python3 $P/tokproof.py instructions/coin_creator/collect_coin_creator_fee.rs $P/collect_coin_creator_fee.unplaced.rs \
  source/programs/pump-amm/src/instructions/coin_creator/collect_coin_creator_fee.rs > /dev/null
python3 $P/placeto.py $P/collect_coin_creator_fee.unplaced.rs $T/collect.rs $P/collect.json > /dev/null
cmp $T/collect.rs source/programs/pump-amm/src/instructions/coin_creator/collect_coin_creator_fee.rs
echo "verified: patches compose to source/, collect placement is token-identical and regenerates"
rm -rf $T
