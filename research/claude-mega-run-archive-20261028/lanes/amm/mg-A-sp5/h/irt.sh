#!/bin/bash
# irt.sh SRC.rs OUT.ll [extra llvm-args...] : emit post-opt IR (diagnosis flags allowed only for analysis)
PT=$HOME/.cache/solana/v1.44/platform-tools
SRC=$1; OUT=$2; shift 2
EXTRA=""; for a in "$@"; do EXTRA="$EXTRA -C llvm-args=$a"; done
$PT/rust/bin/rustc --edition 2021 --crate-type rlib --crate-name native_transfer_fee --target sbpf-solana-solana -C opt-level=3 -C panic=abort -C overflow-checks=on -C codegen-units=1 -C debuginfo=0 --emit llvm-ir -o "$OUT" $EXTRA "$SRC" 2>&1 | grep -E "^error" -A5 | head -20
