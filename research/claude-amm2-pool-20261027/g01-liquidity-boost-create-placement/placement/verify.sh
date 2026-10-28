#!/bin/bash
# usage: placement/verify.sh <base canonical source root containing programs/pump-amm>  (run from the packet dir)
# 1) whitespace-only proofs (Rust-style lexer) for the four placed files, 2) regenerate the placed boost.rs/create_pool.rs
#    from the unplaced intermediates + anchor specs and require byte equality with source/.
set -euo pipefail
B=$1/programs/pump-amm/src; S=source/programs/pump-amm/src; P=placement; T=$(mktemp -d)
python3 $P/tokproof.py \
  instructions/liquidity/deposit.rs  $B/instructions/liquidity/deposit.rs  $S/instructions/liquidity/deposit.rs \
  instructions/liquidity/withdraw.rs $B/instructions/liquidity/withdraw.rs $S/instructions/liquidity/withdraw.rs \
  instructions/boost.rs              $P/boost.unplaced.rs                  $S/instructions/boost.rs \
  instructions/create_pool.rs        $P/create_pool.unplaced.rs            $S/instructions/create_pool.rs > $T/proof.json
python3 $P/placeto.py $P/boost.unplaced.rs $T/boost.rs $P/boost.json > /dev/null
python3 $P/placeto.py $P/create_pool.unplaced.rs $T/create_pool.rs $P/create_pool.json > /dev/null
cmp $T/boost.rs $S/instructions/boost.rs && cmp $T/create_pool.rs $S/instructions/create_pool.rs
echo "placement verified: token streams identical; placed files regenerate byte-for-byte"
rm -rf $T
