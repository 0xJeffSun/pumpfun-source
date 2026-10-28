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

## Optional visibility788 source

Select `--stage visibility788` and otherwise retain the same ordinary SBPF recipe, SDK, dependencies and library pins. Post-build comparison hashes are candidate SHA256 `7c3e306d4af795b151bcff6363975b556abe9a2a823355eaa0f6c0fc2bb1460b` and symbols SHA256 `cb779ea9d0019552b1150d8ee818e9ef79d45023d4b23354f862b598513b68cf`. These values are never compiler inputs or output-repair instructions. A separate same-source root recompilation reproduced both entire generated ELFs byte-for-byte. Preserve separate outputs for all prior profiles/stages; see [VISIBILITY788.md](VISIBILITY788.md) for bounded helper/contract-route checks and unresolved limits. No runtime or CPI execution is part of this recipe.

## Optional v2rent789 source

Select `--stage v2rent789`; retain the same ordinary SBPF environment, SDK, dependencies and library pins. Candidate SHA256 `c56d333e4baf25e8fff596f43dd27570a0f68b03a4c2fa92be15f85d801eb7d1` and symbols SHA256 `5b4355828fda2dda008093740889dc7d6b5f6bf9096b2f4d8930baa87a37725c` are post-build comparison values only, never compiler inputs or output repairs. A separate root recompilation reproduced both complete generated ELFs byte-for-byte. If a historical cache has been losslessly archived, verify its exact archive/member/preservation identities explicitly; never report a missing cache as live or silently bypass a preservation guard. Active SBPF dependency checks are unchanged. See [V2RENT789.md](V2RENT789.md) for zero-size argument-domain and bounded qualification limits. No runtime/CPI execution is included.

## Optional fourfronts795 source

Select `--stage fourfronts795`; keep the ordinary SBPF environment, SDK, dependency and library pins unchanged. Post-build comparison hashes are candidate SHA256 `1f8cd9b02bb059dc44a61ddccb1f9ae60b0b7d7128b9fef4fd9f16ad83c6b439` and symbols SHA256 `e2bd1fa6ba92b0e71dca8adef9e8a93ccab78ab3727200001dede160c50979bc`. These are comparison values only, never compiler inputs or output-repair instructions. A separate same-source root compilation reproduced both complete generated ELFs byte-for-byte. Preserve earlier stages and explicitly verify any archived historical cache as archived. See [FOURFRONTS795.md](FOURFRONTS795.md) for two unequal typed handler edges, two unresolved panic metadata identities and the other bounded static limits. No runtime/CPI execution is included.

## Optional harvest799 source

Select `--stage harvest799`; retain the ordinary SBPF environment, SDK, dependencies and library pins. Post-build comparison hashes are candidate SHA256 `1199155d0f58b5c3faba4e4409aa3ef8384b0bd7f3f52a8e8dc961785c9d6ad1` and symbols SHA256 `f699de6695faa75dab7cfc8f4673227c15e6b9a1088d3d298920f818b2160a81`. These are comparison values only, never compiler inputs or output-repair instructions. Both complete generated ELFs repeat byte-for-byte after a separate same-source root compile. Preserve prior stages and explicitly verify archived caches as archived. See [HARVEST799.md](HARVEST799.md) for original-backed validation/order repairs, bounded static proof and invalid-domain exclusions. No emitted stack/frame diagnostics were found in captured logs; this is not runtime stack-safety validation. No runtime/CPI execution is included.

## Optional repaired nextfronts804 source

Select `--stage nextfronts804`; retain the ordinary SBPF environment, SDK, dependencies and library pins. Post-build comparison hashes are candidate SHA256 `cb7fe2cd26d621d796d5c28f96b344db4294dc2a875fde5e151f7249ce8f3e60` and symbols SHA256 `1fd5af84889a3ae1b9e8ba3c4b02248ac24cfe02cec129822db0ebc62876aefc`. These belong to the repaired source, not the earlier unaccepted intermediate. Both complete generated ELFs repeat byte-for-byte after a separate same-source root compilation. Hashes are comparison-only, never compiler inputs or output-repair instructions. Preserve prior stages and explicitly verify archived caches as archived. Keep the three unused-variable warnings visible; the fallible checks remain and must not be removed as warning cleanup. See [NEXTFRONTS804.md](NEXTFRONTS804.md) for inferred-helper, prevalidated-domain and unresolved-original-consumer limits. No runtime, mode/helper fixture or CPI execution is included.

## Optional chain805 source

Select `--stage chain805`; keep the existing ordinary SBPF SDK, dependencies, flags and library pins. Post-build comparison hashes are candidate SHA256 `c2bf96ee097a3ea69a90fedfc3ac43be095939161846731f1fc834020a28094a` and symbols SHA256 `c3288264bfda5db1a01947cc4e48246e7e9ba98e302b08214787827e5d5b8eeb`. A separate same-source root compilation reproduced both complete generated files. These hashes are comparison-only, never compiler inputs or output-repair instructions. Preserve prior source stages and explicitly verify historical caches as archived. See [CHAIN805.md](CHAIN805.md) for the inferred source ownership and bounded caller proof. No runtime or held fixture execution is included.
