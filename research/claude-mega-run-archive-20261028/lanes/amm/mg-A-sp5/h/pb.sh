#!/bin/bash
# pb.sh SRC.rs PASS OUT.txt : dump IR before PASS (diagnosis only)
PT=$HOME/.cache/solana/v1.44/platform-tools
$PT/rust/bin/rustc --edition 2021 --crate-type rlib --crate-name native_transfer_fee --target sbpf-solana-solana -C opt-level=3 -C panic=abort -C overflow-checks=on -C codegen-units=1 -C debuginfo=0 --emit obj -o v/pb_tmp.o -C llvm-args=-print-before=$2 -C llvm-args=-filter-print-funcs=_ZN19native_transfer_fee19supported_mint_data17h9252bc5a9a60970eE "$1" > "$3" 2>&1
