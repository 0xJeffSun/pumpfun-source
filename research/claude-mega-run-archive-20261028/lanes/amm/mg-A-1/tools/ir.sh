#!/bin/bash
# ir.sh OUT.ll [extra rustc args] : emit post-opt LLVM IR (diagnostic; target-ir)
L=/Users/shawwalters/amm100-run/lanes/mg-A-1; R=$HOME/amm100-run; PT=$HOME/.cache/solana/v1.44/platform-tools
OUT=$1; shift
cd $L/src && python3 -I $R/shared/tools/slot.py 6 -- env CARGO_HOME=$R/cargo-home CARGO_TARGET_DIR=$L/target-ir RUSTC=$PT/rust/bin/rustc CC=$PT/llvm/bin/clang AR=$PT/llvm/bin/llvm-ar CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=' $PT/rust/bin/cargo rustc -p pump-amm-recovered --release --target sbpf-solana-solana --locked --offline -j3 --lib -- --emit=llvm-ir "$@" > $L/ir/ir.log 2>&1 || { grep -E '^error' -A6 $L/ir/ir.log | head -20; exit 1; }
cp $L/target-ir/sbpf-solana-solana/release/deps/pump_amm_recovered.ll "$OUT"; echo "ir -> $OUT ($(wc -c < $OUT) bytes)"
