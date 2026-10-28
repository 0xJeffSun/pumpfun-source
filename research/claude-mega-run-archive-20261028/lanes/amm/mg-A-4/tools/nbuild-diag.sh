#!/bin/bash
# DIAGNOSIS ONLY (never deliver its output): like shared nbuild.sh (same slot lock) but `cargo rustc -- EXTRA...` on the
# program crate only, in a separate target dir (target-diag). Usage: nbuild-diag.sh LANE_DIR EXTRA_RUSTC_ARGS...
set -e
L=$(cd "$1" && pwd); shift; R=$HOME/amm100-run; PT=$HOME/.cache/solana/v1.44/platform-tools
mkdir -p "$L/out"; [ -d "$L/target-diag" ] || cp -c -R "$L/target" "$L/target-diag"
cd "$L/src"
python3 -I $R/shared/tools/slot.py 6 -- env CARGO_HOME=$R/cargo-home CARGO_TARGET_DIR=$L/target-diag RUSTC=$PT/rust/bin/rustc CC=$PT/llvm/bin/clang AR=$PT/llvm/bin/llvm-ar CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=' $PT/rust/bin/cargo rustc -p pump-amm-recovered --lib --release --target sbpf-solana-solana --locked --offline -j3 -- "$@" > "$L/out/diag.log" 2>&1 || { grep -E '^error' -A6 "$L/out/diag.log" | head -20; echo DIAG_FAILED; exit 1; }
echo DIAG_OK $(wc -l < "$L/out/diag.log") lines
