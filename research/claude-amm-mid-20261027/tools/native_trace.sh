#!/bin/bash
# Diagnostic only: rebuild root crate with LLVM print-after-all filtered to one function.
# usage: native_trace.sh <staged-workspace> <mangled-fn-name> <out-file> [extra llvm args...]
set -euo pipefail
SP=/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bf960843-6806-451b-a211-62c8b228d301/scratchpad
L=$SP/lanes/amm-mid
SRC=$(cd "$1" && pwd); FN=$2; OUTF=$3; shift 3
TC=$HOME/.cache/solana/v1.44/platform-tools
cd "$SRC"
python3 $SP/sbf_lock.py --slots 6 --name sbf -- env -u RUSTFLAGS -u CARGO_ENCODED_RUSTFLAGS \
  CARGO_HOME=$L/cargo-home CARGO_TARGET_DIR=$L/target/trace \
  RUSTC=$TC/rust/bin/rustc RUSTDOC=$TC/rust/bin/rustdoc CC=$TC/llvm/bin/clang AR=$TC/llvm/bin/llvm-ar \
  CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=' CARGO_BUILD_JOBS=4 \
  $TC/rust/bin/cargo rustc --release --target sbpf-solana-solana --lib -p pump-amm-recovered --manifest-path "$SRC/Cargo.toml" --locked --offline -- \
  -C llvm-args=-print-after-all -C llvm-args=-filter-print-funcs=$FN "$@" > "$OUTF" 2>&1 || { tail -20 "$OUTF"; exit 1; }
grep -c "IR Dump After" "$OUTF"
