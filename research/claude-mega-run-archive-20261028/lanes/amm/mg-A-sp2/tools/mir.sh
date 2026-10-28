#!/bin/bash
# mir.sh OUT.mir : emit crate MIR (same flags as nbuild), via slot lock, using target-ir
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp2; R=$HOME/amm100-run; PT=$HOME/.cache/solana/v1.44/platform-tools
cd "$L/src"
rm -f $L/target-ir/sbpf-solana-solana/release/deps/pump_amm_recovered*.mir
python3 -I $R/shared/tools/slot.py 6 -- env CARGO_HOME=$R/cargo-home CARGO_TARGET_DIR=$L/target-ir RUSTC=$PT/rust/bin/rustc CC=$PT/llvm/bin/clang AR=$PT/llvm/bin/llvm-ar CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=' $PT/rust/bin/cargo rustc -p pump-amm-recovered --lib --release --target sbpf-solana-solana --locked --offline -j3 -- --emit=mir > "$L/ir/mir.log" 2>&1 || { grep -E '^error' -A6 "$L/ir/mir.log" | head -20; echo MIR_FAILED; exit 1; }
cp $L/target-ir/sbpf-solana-solana/release/deps/pump_amm_recovered*.mir "$1"; ls -la "$1" | awk '{print $5}'
