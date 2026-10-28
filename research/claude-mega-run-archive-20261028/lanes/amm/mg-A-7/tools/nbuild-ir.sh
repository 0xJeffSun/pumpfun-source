#!/bin/bash
# Usage: nbuild.sh LANE_DIR   (LANE_DIR contains src/ = workspace copy). Native v1.44 SBF build + measure.
# Prints measure JSON (normalized/raw/gains/losses vs native frontier). Artifact: LANE_DIR/out/cand.so
set -e
L=$(cd "$1" && pwd); R=$HOME/amm100-run; PT=$HOME/.cache/solana/v1.44/platform-tools
mkdir -p "$L/out"
cd "$L/src"
python3 -I $R/shared/tools/slot.py 6 -- env CARGO_HOME=$R/cargo-home CARGO_TARGET_DIR=$L/target-ir RUSTC=$PT/rust/bin/rustc CC=$PT/llvm/bin/clang AR=$PT/llvm/bin/llvm-ar CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=' $PT/rust/bin/cargo rustc --release --target sbpf-solana-solana --locked --offline -j3 -p pump-amm-recovered --lib -- --emit=llvm-ir > "$L/out/build-ir.log" 2>&1 || { grep -E '^(error|warning: unused)' -A6 "$L/out/build.log" | head -40; echo BUILD_FAILED; exit 1; }
ls -t $L/target-ir/sbpf-solana-solana/release/deps/pump_amm_recovered*.ll | head -1 | xargs -I{} cp {} $L/out/crate.ll; ls -la $L/out/crate.ll; exit 0
python3 -I $R/shared/tools/measure.py "$L/out/cand.so" --json "$L/out/rows.json"
