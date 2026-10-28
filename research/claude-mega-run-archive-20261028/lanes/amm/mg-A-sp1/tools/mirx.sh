#!/bin/bash
# mirx.sh OUT.mir : emit optimized MIR of pump-amm-recovered from $L/srcx (target-mir)
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp1; R=$HOME/amm100-run; PT=$HOME/.cache/solana/v1.44/platform-tools
cd $L/srcx && python3 -I $R/shared/tools/slot.py 6 -- env CARGO_HOME=$R/cargo-home CARGO_TARGET_DIR=$L/target-ir RUSTC=$PT/rust/bin/rustc CC=$PT/llvm/bin/clang AR=$PT/llvm/bin/llvm-ar CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=' $PT/rust/bin/cargo rustc -p pump-amm-recovered --release --target sbpf-solana-solana --locked --offline -j3 --lib -- --emit=mir > $L/ir/mirx.log 2>&1 || { grep -E '^error' -A8 $L/ir/mirx.log | head -30; exit 1; }
cp $L/target-ir/sbpf-solana-solana/release/deps/pump_amm_recovered.mir "$1"
