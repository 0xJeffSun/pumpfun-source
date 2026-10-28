#!/bin/bash
# ir.sh OUT.ll : emit crate LLVM IR (same flags as nbuild.sh, through the shared slot lock)
set -e
L=$HOME/amm100-run/lanes/mg-A-3; R=$HOME/amm100-run; PT=$HOME/.cache/solana/v1.44/platform-tools
cd "$L/src"
touch $L/src/programs/pump-amm/src/lib.rs; rm -f $L/target/sbpf-solana-solana/release/deps/pump_amm_recovered*.mir
python3 -I $R/shared/tools/slot.py 6 -- env CARGO_HOME=$R/cargo-home CARGO_TARGET_DIR=$L/target RUSTC=$PT/rust/bin/rustc CC=$PT/llvm/bin/clang AR=$PT/llvm/bin/llvm-ar CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=' $PT/rust/bin/cargo rustc -p pump-amm-recovered --lib --release --target sbpf-solana-solana --locked --offline -j3 -- --emit=mir > "$L/out/ir.log" 2>&1 || { grep -E '^error' -A6 "$L/out/ir.log" | head -20; echo MIR_FAILED; exit 1; }
cp $L/target/sbpf-solana-solana/release/deps/pump_amm_recovered*.mir "$1"; ls -la "$1" | awk '{print $5}'
