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
