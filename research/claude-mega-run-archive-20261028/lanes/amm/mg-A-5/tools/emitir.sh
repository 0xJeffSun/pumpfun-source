#!/bin/bash
# emitir.sh LANE_DIR OUT.ll : emit post-opt IR for the crate
D=$1; R=$HOME/amm100-run; PT=$HOME/.cache/solana/v1.44/platform-tools
cd $D/src && python3 -I $R/shared/tools/slot.py 6 -- env CARGO_HOME=$R/cargo-home CARGO_TARGET_DIR=$D/target RUSTC=$PT/rust/bin/rustc CC=$PT/llvm/bin/clang AR=$PT/llvm/bin/llvm-ar CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=' $PT/rust/bin/cargo rustc -p pump-amm-recovered --release --target sbpf-solana-solana --locked --offline -j3 --lib -- --emit=llvm-ir > $D/ir.log 2>&1 || { grep -E '^error' -A6 $D/ir.log | head -20; exit 1; }
cp $D/target/sbpf-solana-solana/release/deps/pump_amm_recovered.ll $2
