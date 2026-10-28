#!/bin/bash
# thr.sh SRC.rs : find unswitch threshold boundary (diagnosis only) - prints thr -> insn count
PT=$HOME/.cache/solana/v1.44/platform-tools
for t in "$@"; do :; done
SRC=$1; shift
for t in $*; do
$PT/rust/bin/rustc --edition 2021 --crate-type rlib --crate-name native_transfer_fee --target sbpf-solana-solana -C opt-level=3 -C panic=abort -C overflow-checks=on -C codegen-units=1 -C debuginfo=0 --emit obj -o v/thr.o -C llvm-args=-unswitch-threshold=$t "$SRC" 2>&1 | head -3
echo "$t $(python3 -I cmp2.py v/thr.o supported_mint 0xf28b8 | sed 's/.*orig=149 //')"
done
