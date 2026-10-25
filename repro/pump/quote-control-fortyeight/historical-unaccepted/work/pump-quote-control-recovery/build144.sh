#!/bin/sh
# Iteration build of the scratch crate with platform-tools v1.44 (Fees-pinned lockfile, isolated cargo home).
W=$(cd "$(dirname "$0")" && pwd)
CARGO_HOME=$W/../fees-v144-cargo-home CARGO_TARGET_DIR=$W/b144/target RUSTUP_HOME=$W/b144/rustup \
  cargo build-sbf --manifest-path $W/ws/programs/pump/Cargo.toml --tools-version v1.44 --offline --sbf-sdk $W/b144/sdk \
  --sbf-out-dir $W/b144/artifacts -- --offline > $W/b144/build.log 2>&1
rc=$?; grep -E '^error|Stack offset' $W/b144/build.log | cut -c1-250; echo "build rc=$rc"; exit $rc
