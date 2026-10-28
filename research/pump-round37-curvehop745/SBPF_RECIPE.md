# Ordinary SBPF recipe delta

Start with the same source-only materializer and select `--stage sourcefronts780`. Preserve its 60-source inventory and all earlier selectable stages. Use the existing ordinary Linux SBF recipe unchanged except for these coordinated profile selections:

1. Use `--target sbpf-solana-solana` instead of `--target sbf-solana-solana`.
2. Set `CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=-Zremap-cwd-prefix=` instead of the SBF-specific environment key. Do not set both keys or introduce a global/inherited `RUSTFLAGS`.
3. Read the root output from `$OUT/target/sbpf-solana-solana/release/pump_recovered.so` rather than the SBF subtree.

Retain the same official x86_64 Linux platform-tools v1.44 archive, SHA256 `6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`, including its authentic built-in SBPF libraries. The 25 installed library files were verified against the official archive inspection and exact-head PR307 library manifest. Do not copy SBPF libraries into an SBF directory, alter the SDK, replace TypeId constants, modify linker layout, or inject original machine bytes.

Keep the same clean environment, Cargo build invocation, jobs, package checksums, locked/offline dependency resolution, release settings and physical-source wrapper. This trial used a distinct cold target. SBF target artifacts are not SBPF dependency artifacts; never claim a warm root-only build by reusing them. A reused cache needs its own independently checked eligibility and preservation evidence. Keep SBF and SBPF output directories separate.

The ordinary control produced candidate SHA256 `fe466dec57eb9f95e01de30c97483618bcd633008ea99a02be1ba0438d7d3d5f` and symbols SHA256 `64666b00aff8210f13c62f7cb02fcd29e6c236c7c33bdc6e6d4f4d32640492e0`. These are post-build comparison values only, never compiler inputs. The standard pinned `llvm-objcopy --strip-all` operation remains unchanged. Different hashes require investigation, not output patching.

Require successful terminal completion, a genuinely compiled root, expected target/profile, unchanged source/SDK/registry and independently validated complete outputs. Perform the full 1,035-window census and explicit prior-match/qualified-boundary preservation checks. A separate same-source root recompilation reproduced both complete generated output files byte-for-byte with all SBPF dependencies unchanged and SBF artifacts preserved. An old SBF repeat or published SBPF result cannot substitute for that independently checked result. No VM, runtime fixture, CPI or live transaction is part of this recipe.

`sbpf-target-libs.sha256` lists the exact 25 official library pins, with paths relative to `$SDK/rust/lib/rustlib/`. Check every listed file before building; preserve the official empty `sbpf-solana-solana/lib/self-contained` directory. This is a UTF-8 identity list, not SDK or archive payload.

## Optional clamp786 source

For the separately qualified clamp stage, change only the materializer selection to `--stage clamp786`. Keep the ordinary SBPF recipe and all 25 library pins above unchanged. The output comparison hashes for this source are candidate SHA256 `9f9f6b1183059aef57d20fd223b9fdbd0661e81c1835d2496cf44b48aaaff42a` and symbols SHA256 `9f96bb16e66eb7b264b90906b6875801240fa9cff0d1cd7dd7b6d829818df883`. These are post-build comparison values only, not compiler inputs or requested output repairs. A separate same-source root recompilation reproduced both complete generated ELFs byte-for-byte. See [CLAMP786.md](CLAMP786.md) for the bounded static qualification, source-coordinate caveat and unchanged runtime restrictions. The SBPF785 hashes and unchanged-source profile above remain valid for `sourcefronts780`.
