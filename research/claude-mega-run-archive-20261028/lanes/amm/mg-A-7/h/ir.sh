#!/bin/bash
# ir.sh SRC.rs OUT.ll
PT=$HOME/.cache/solana/v1.44/platform-tools
$PT/rust/bin/rustc --edition 2021 --crate-type rlib --crate-name native_transfer_fee --target sbpf-solana-solana -C opt-level=3 -C panic=abort -C overflow-checks=on -C codegen-units=1 -C debuginfo=0 --emit llvm-ir -o "$2" "$1" 2>&1 | grep -E "^error" -A5 | head -20
