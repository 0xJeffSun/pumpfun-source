#!/usr/bin/env bash
# Historical rebuild experiment for the 432-window Mayhem source using installed
# v1.54 tools and the DEFAULT linker, then a 441-window inventory.
#
# This is deliberately NOT the layered toolchain / ordered.ld recipe that produced
# the published 432-window artifact. This script does not authenticate the SDK
# paths; a controlled comparison also needs matching tool and dependency inputs.
#
# Optional: REMAP_FLAGS adds extra rustc flags for the root crate. The historical
# crate path is programs/mayhem-program/, which the original binary embeds in
# every panic/Source record. Set
#   REMAP_FLAGS='--remap-path-prefix=src/=programs/mayhem-program/src/'
# to reproduce those path lengths (see README: 20 windows depend on it).
#
# Prerequisites (see research/mayhem-v154-independent-reproduction-20261028):
#   ~/.cache/solana/v1.54/platform-tools   (sha-pinned osx-aarch64 archive)
#   ~/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy (pinned strip)
#   crates fetched once: (cd <src> && cargo fetch --locked)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="${1:?usage: build_and_measure.sh <new-output-dir>}"
[ -e "$OUT" ] && { echo "refusing to overwrite $OUT" >&2; exit 1; }
mkdir -p "$OUT"
OUT="$(cd "$OUT" && pwd)"   # absolute: the build step cd's into the source tree
T="$HOME/.cache/solana/v1.54/platform-tools"
STRIP="$HOME/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy"
PY="$ROOT/.venv/bin/python"

"$PY" "$ROOT/research/mayhem-frontier-clean-rebuild-20261028/materialize_frontier_source.py" "$OUT/source"

( cd "$OUT/source" && env -i HOME="$HOME" PATH="/usr/bin:/bin:/usr/sbin:/sbin" TERM=xterm \
    CARGO_HOME="$HOME/.cargo" CARGO_TARGET_DIR="$OUT/target" CARGO_NET_OFFLINE=true \
    RUSTC="$T/rust/bin/rustc" RUSTDOC="$T/rust/bin/rustdoc" \
    CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS="-Zremap-cwd-prefix= ${REMAP_FLAGS-}" \
    CC="$T/llvm/bin/clang" AR="$T/llvm/bin/llvm-ar" OBJDUMP="$T/llvm/bin/llvm-objdump" OBJCOPY="$T/llvm/bin/llvm-objcopy" \
    "$T/rust/bin/cargo" build --release --target sbpf-solana-solana --locked --offline >"$OUT/build.log" 2>&1 )

cp "$OUT/target/sbpf-solana-solana/release/mayhem_recovered.so" "$OUT/symbols.so"
"$STRIP" --strip-all "$OUT/symbols.so" "$OUT/candidate.so"
shasum -a 256 "$OUT/symbols.so" "$OUT/candidate.so" | tee "$OUT/sha256.txt"
"$PY" "$ROOT/research/mayhem-window-inventory-tool-20261028/window_inventory.py" \
    "$OUT/symbols.so" --unmatched --out "$OUT/inventory.json" | tee "$OUT/inventory.txt"
