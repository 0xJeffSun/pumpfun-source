# Ordinary Linux reproduction profile

Use the official x86_64 Linux platform-tools v1.44 archive, SHA-256 `6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`, with its **sbf-solana-solana** target libraries. This is a separate Linux profile, not the archived macOS-host/hybrid reproduction recipe. Do not change target libraries to sbpf, alter the compiler/stdlib, or import a custom text/data layout certificate.

Prerequisites: an authenticated extracted SDK, an independently prepared Cargo home containing the 254 packages selected by the pinned Cargo.lock (verify package checksums against that lockfile), and fresh output/target/home directories. Cargo offline is not OS sandboxing: dependency build scripts and proc macros execute natively. No program VM or CPI tests are involved.

First materialize source using the README commands. The workspace release profile is already pinned: panic abort, overflow checks enabled, LTO false, one codegen unit. Use the existing repository `scripts/pump_physical_source_wrapper.py`, SHA-256 `d959fe0074fafe7f310a8f40051ce87f795b1e81b104a38dfe57086efa6bae1b`. The wrapper canonicalizes registry source paths, not source text or coordinates. `source-pins.json` also pins SDK binaries and all 25 target library files; verify those identities before building.

With absolute paths assigned to `SDK`, `CARGO_HOME`, `SOURCE`, `OUT`, and `WRAPPER`, create fresh `$OUT/home` and use this environment (no inherited RUSTFLAGS or Cargo config):

```sh
cd "$SOURCE"
env -i \
 PATH="$SDK/rust/bin:$SDK/llvm/bin:/usr/bin:/bin" \
 HOME="$OUT/home" CARGO_HOME="$CARGO_HOME" CARGO_TARGET_DIR="$OUT/target" \
 CARGO_NET_OFFLINE=true CARGO_TERM_COLOR=never CARGO_BUILD_JOBS=2 \
 RUSTC="$SDK/rust/bin/rustc" RUSTDOC="$SDK/rust/bin/rustdoc" \
 RUSTC_WRAPPER="$WRAPPER" PUMP_LOGICAL_REGISTRY_SRC="$CARGO_HOME/registry/src" \
 PUMP_SOURCE_WRAPPER_LOG="$OUT/physical-source-calls.jsonl" \
 CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS=-Zremap-cwd-prefix= \
 CC="$SDK/llvm/bin/clang" AR="$SDK/llvm/bin/llvm-ar" \
 LD_LIBRARY_PATH="$SDK/rust/lib:$SDK/llvm/lib" \
 GIT_CEILING_DIRECTORIES="$OUT" LANG=C.UTF-8 LC_ALL=C.UTF-8 \
 PYTHONDONTWRITEBYTECODE=1 PYTHONPYCACHEPREFIX="$OUT/empty-python-cache" \
 "$SDK/rust/bin/cargo" build --release --target sbf-solana-solana \
 --manifest-path "$SOURCE/Cargo.toml" --locked --offline --verbose \
 >"$OUT/build.log" 2>&1
```

Require Cargo exit 0, one freshly compiled root crate, no backend error lines, unchanged source/SDK/registry checksums, and the expected target/profile. Copy `$OUT/target/sbf-solana-solana/release/pump_recovered.so` to `$OUT/symbols.so`, then use the pinned ordinary strip operation:

```sh
LD_LIBRARY_PATH="$SDK/rust/lib:$SDK/llvm/lib" \
 "$SDK/llvm/bin/llvm-objcopy" --strip-all "$OUT/symbols.so" "$OUT/candidate.so"
```

The measured control produced candidate SHA-256 `3222ecbdea27ba8190a410c354f7e40d961988e77666ec4c4d966fb51b7f9114` and symbols SHA-256 `0be153b2a2a67a70882f06f76b7f19a3d9a7c00a7f29d17576f64cb97a7d2c96`. Treat these strictly as **post-build comparisons**, never compiler inputs. Different output hashes require investigation, not byte patching. The original binary is needed only for a subsequent independent static comparison, not building. This prose recipe is a transparent description of the measured ordinary build; the source materializer/tests do not launch it.

For another independent build use fresh outputs and preserve prior artifacts. A result from a reused dependency cache must establish every dependency unchanged and the root freshly compiled. The measured independent root recompilation reproduced both complete output files byte-for-byte; this does not qualify future builds without checking their actual outputs. Runtime remains NOT RUN. This packet does not include or execute runtime fixtures.
