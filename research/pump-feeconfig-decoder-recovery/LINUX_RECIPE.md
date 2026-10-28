# Ordinary native profile used for both sides

The accepted builds use the official Linux x86_64 platform-tools v1.44 SDK,
archive SHA-256 `6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`,
with **sbf-solana-solana** libraries. `toolchain-pins.json` retains the parent's
SDK/library identities. This is not the distinct SBPF profile added later to
PR #342. No custom layout certificate or binary repair is used.

The entire measured Docker argv/environment for each actual run is in
`builds/<stage>/launch.json`. The pinned container image is:

```
solanafoundation/solana-verifiable-build@sha256:6c73adc767ee7ff212f2532d4695472b12f3d4ac20aea3db22b89d8c614dac50
```

All runs use `--network none`, a read-only source mount, read-only SDK and
registry mounts, and the same already-compiled dependency cache. All 355
dependency artifact hashes remain unchanged. The root crate really compiles;
`Fresh pump-recovered` is not acceptable evidence. The separate repeat compiles
the root again and compares both complete outputs. This is root reproducibility
against fixed dependencies, not a claimed new clean dependency rebuild.

Inside the container, the source is at
`/workspace/pumpfun-source-current/work/pump-round37-reserved-fee-site/source`.
The exact source layout and relative filenames matter for Rust error locations.
The SDK is mounted at `/workspace/toolchains/v1.44`. The registry is mounted at
`/workspace/pumpfun-source-current/work/pump-round37-linux-control/cargo-home/registry`.
Only physical host-side mount paths need replacement for another machine.

The recorded Cargo command is:

```sh
/workspace/toolchains/v1.44/rust/bin/cargo rustc --verbose \
  --manifest-path /workspace/pumpfun-source-current/work/pump-round37-reserved-fee-site/source/programs/pump/Cargo.toml \
  --release --target sbf-solana-solana --locked --offline --lib
```

Use the recorded clean `env -i` environment, including
`CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS=-Zremap-cwd-prefix=` and the unchanged
`scripts/pump_physical_source_wrapper.py`. The wrapper canonicalizes registry
source paths; it does not transform source text. Its pinned hash is
`d959fe0074fafe7f310a8f40051ce87f795b1e81b104a38dfe57086efa6bae1b`.
The source workspace already pins panic-abort, overflow checks, LTO-off and one
codegen unit. Its lockfile selects the parent's dependencies. No inherited
RUSTFLAGS or different Cargo config should be introduced.

The accepted controller copies the completed root ELF, then performs only this
ordinary stripping operation:

```sh
/workspace/toolchains/v1.44/llvm/bin/llvm-objcopy --strip-all symbols.so candidate.so
```

For a clean dependency rebuild, prepare the packages/checksums in the pinned
Cargo.lock and fresh target/home directories, then execute this same profile.
That procedure is distinct from the fixed-cache root repeats measured here;
compare actual output and tool/dependency hashes before claiming reproduction.
The output hashes in README are post-build checks, never inputs to compilation.

`controllers/build.py` preserves the first baseline and rejected cache-hit
attempt; `rebuild.py` is the accepted source-change build and `repeat.py` its
separate root repeat. The archive manifest adaptation and rejected attempt are
documented in README. The original captured binary is consumed only by the
subsequent comparisons and local VM, not the compiler.
