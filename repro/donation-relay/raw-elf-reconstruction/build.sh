#!/bin/sh
# Nonhistorical reproducible reconstruction: ordinary source + input-section order.
# Authenticate the official SDK and all Cargo.lock registry checksums first.
# Usage: sh build.sh ABSOLUTE_SOURCE ABSOLUTE_SDK ABSOLUTE_CARGO_HOME NEW_OUTPUT
set -eu
SOURCE=$1 SDK=$2 CACHE=$3 OUT=$4
for p in "$SOURCE" "$SDK" "$CACHE" "$OUT"; do case "$p" in /*) ;; *) echo 'absolute paths required' >&2; exit 2;; esac; done
[ ! -e "$OUT" ] || { echo 'output must not exist' >&2; exit 2; }
python3 - "$OUT" <<'PYGUARD'
from pathlib import Path
import sys
p = Path(sys.argv[1])
if p.exists() or any(x.is_symlink() for x in (p, *p.parents)):
    raise SystemExit('output exists or contains a symlink ancestor')
PYGUARD
mkdir -p "$OUT/home" "$OUT/target"
cd "$SOURCE"
env -i PATH="$SDK/rust/bin:$SDK/llvm/bin:/usr/bin:/bin" HOME="$OUT/home" \
  CARGO_HOME="$CACHE" CARGO_TARGET_DIR="$OUT/target" CARGO_NET_OFFLINE=true \
  CARGO_TERM_COLOR=never CARGO_BUILD_JOBS=3 \
  CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=-Zremap-cwd-prefix= \
  RUSTC="$SDK/rust/bin/rustc" RUSTDOC="$SDK/rust/bin/rustdoc" \
  CC="$SDK/llvm/bin/clang" AR="$SDK/llvm/bin/llvm-ar" \
  OBJDUMP="$SDK/llvm/bin/llvm-objdump" OBJCOPY="$SDK/llvm/bin/llvm-objcopy" \
  LANG=C.UTF-8 LC_ALL=C.UTF-8 \
  "$SDK/rust/bin/cargo" rustc --release --target sbpf-solana-solana \
  --locked --offline --verbose --manifest-path "$SOURCE/Cargo.toml" --lib -- \
  --remap-path-prefix=src/=programs/contracts/src/ \
  -C "link-arg=--script=$SOURCE/inferred-text-layout.ld" \
  -C "link-arg=-Map=$OUT/linker.map" > "$OUT/build.log" 2>&1
cp "$OUT/target/sbpf-solana-solana/release/donation_relay_source_proposal.so" "$OUT/symbols.so"
"$SDK/llvm/bin/llvm-objcopy" --strip-all "$OUT/symbols.so" "$OUT/candidate.so"
sha256sum "$OUT/candidate.so" "$OUT/symbols.so"
