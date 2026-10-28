#!/bin/bash
# mirdump.sh LANEDIR FILTER OUTDIR : per-pass MIR dumps for fns matching FILTER (diagnosis only; -Z flag)
L=$(cd "$1" && pwd); R=$HOME/amm100-run; PT=$HOME/.cache/solana/v1.44/platform-tools; F=$2; O=$3
rm -rf "$O"; mkdir -p "$O"; cd "$L/src"
touch programs/pump-amm/src/lib.rs
python3 -I $R/shared/tools/slot.py 6 -- env CARGO_HOME=$R/cargo-home CARGO_TARGET_DIR=$L/target-ir RUSTC=$PT/rust/bin/rustc CC=$PT/llvm/bin/clang AR=$PT/llvm/bin/llvm-ar CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=' $PT/rust/bin/cargo rustc -p pump-amm-recovered --lib --release --target sbpf-solana-solana --locked --offline -j3 -- -Zdump-mir="$F" -Zdump-mir-dir="$O" > "$L/out/mirdump.log" 2>&1 || { grep -E '^error' -A6 "$L/out/mirdump.log" | head -30; echo FAILED; exit 1; }
ls "$O" | wc -l
