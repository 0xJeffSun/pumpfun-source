# Fees Cargo/Rust 1.79 compatibility audit

Read-only audit of `programs/pump-fees/Cargo.lock`. No application source or lockfile was edited, and no candidate program was executed. The audited lock was copied to `fees-Cargo.lock.snapshot` for reproducibility.

Lock SHA-256: `1a5f16ca085fe1e68d019a3d08e99fa484a406fb34ee1fddc4808c3f66661abf`; format 4; 210 packages, including 209 registry packages. All cached Cargo.toml files exactly matched their cached published `.crate` archives; all archive SHA-256 values matched Cargo.lock checksums. `audit_fees_lock.py` reproduces this audit.

## Recommended first pin set

| Package | Current | Candidate | Why this candidate |
|---|---|---|---|
| blake3 | 1.8.7 | **1.8.2** | Edition 2021; requires constant_time_eq ^0.3.1 and optional digest ^0.10.1, avoiding the current 1.85+ crypto chain. No declared rust-version; compatibility is a candidate pending build. |
| proc-macro-crate | 3.5.0 | **3.3.0** | Edition 2021, MSRV 1.67; requires toml_edit ^0.22.24, avoiding current toml 0.25 and its edition-2024 graph. |
| indexmap | 2.14.2 | **2.11.4** | Edition 2021, MSRV 1.63; accepts hashbrown >=0.15,<0.17. Current toml_edit requires ^2.13, so downgrade proc-macro-crate before this pin. |
| unicode-segmentation | 1.13.3 | **1.12.0** | Edition 2018; no declared rust-version. Avoids current package’s declared MSRV 1.85. |

This is a practical four-pin starting set while retaining the current top-level Anchor dependency. It is not a proof that four pins is globally minimal across every possible alternative dependency graph. The exact cached downstream candidates are `toml_edit 0.22.27` (MSRV 1.66), `hashbrown 0.16.1` (MSRV 1.65), and `constant_time_eq 0.3.1` (MSRV 1.66). All six tabulated/inspected candidate package manifests use editions supported by Cargo 1.79.

The published sparse index confirms the relevant dependency constraints. `borsh-derive 1.8.1` accepts `proc-macro-crate ^3`, and toml_edit 0.22.27 accepts `indexmap ^2.3.0`. The Solana dependencies permit blake3 1.8.2. These pins are compatible with the relevant declared semver ranges; a full resolver/build run must still verify the resulting graph.

Use a modern Cargo in a scratch copy to resolve these pins, because old Cargo may reject currently locked edition-2024 manifests before it can finish an individual downgrade. Then test the resulting fixed graph with platform-tools v1.43 and explicit `--locked --offline`, preserving the generated lockfile and build log. The root agent already observed Cargo 1.79 reaching the indexmap edition error with this format-4 lock, so this report does **not** assert lockfile format 4 as the present blocker.

No complete candidate resolution or build was performed by this audit. Declared MSRV and edition do not prove compilation, and packages without rust-version can still use unsupported language or library features. Further build failures can justify additional precise pins; do not silently ignore MSRV checks.

## Current declared incompatibilities

| Package | Version | Declared rust-version | Edition |
|---|---|---|---|
| blake3 | 1.8.7 | unspecified | 2024 |
| block-buffer | 0.12.1 | 1.85 | 2024 |
| cmov | 0.5.4 | 1.85 | 2024 |
| constant_time_eq | 0.4.2 | 1.85.0 | 2024 |
| cpufeatures | 0.3.1 | 1.85 | 2024 |
| crypto-common | 0.2.2 | 1.85 | 2024 |
| ctutils | 0.4.5 | 1.87 | 2024 |
| digest | 0.11.3 | 1.85 | 2024 |
| hashbrown | 0.17.1 | 1.85.0 | 2024 |
| hybrid-array | 0.4.15 | 1.85 | 2024 |
| indexmap | 2.14.2 | 1.85 | 2024 |
| js-sys | 0.3.106 | 1.81 | 2021 |
| proc-macro-crate | 3.5.0 | 1.82.0 | 2021 |
| toml_datetime | 1.1.2+spec-1.1.0 | 1.85 | 2024 |
| toml_edit | 0.25.17+spec-1.1.0 | 1.85 | 2024 |
| toml_parser | 1.1.5+spec-1.1.0 | 1.85 | 2024 |
| unicode-segmentation | 1.13.3 | 1.85.0 | 2018 |
| wasm-bindgen | 0.2.129 | 1.81 | 2021 |
| wasm-bindgen-macro | 0.2.129 | 1.81 | 2021 |
| wasm-bindgen-macro-support | 0.2.129 | 1.81 | 2021 |
| wasm-bindgen-shared | 0.2.129 | 1.81 | 2021 |
| web-sys | 0.3.106 | 1.81 | 2021 |

The blake3 pin removes the current 0.11 digest branch and its block-buffer/crypto-common/hybrid-array/ctutils/cmov chain, plus constant_time_eq 0.4 and cpufeatures 0.3. The proc-macro-crate/indexmap pins remove the current toml_edit/toml_datetime/toml_parser/indexmap/hashbrown incompatibilities. Each remaining incompatible family must be checked against the selected target’s resolved graph.

## Wasm target caveat

The six packages js-sys, wasm-bindgen, wasm-bindgen-macro, wasm-bindgen-macro-support, wasm-bindgen-shared, and web-sys all declare Rust 1.81 in the current lock. Inspected Solana manifests introduce their parent dependencies under `cfg(target_arch = "wasm32")`; getrandom uses wasm32/wasm64 + unknown OS target conditions. They should not need compilation for SBF, but this audit has not executed Cargo to prove the full selected-target graph.

If all-target compatibility is required or Cargo still parses an incompatible wasm manifest, the official index advertises `wasm-bindgen 0.2.128`, `js-sys 0.3.105`, and `web-sys 0.3.105` at MSRV 1.77. Those versions are coupled by exact requirements and should move together. Their archives were not present locally and were not downloaded or built; they are lower-confidence optional candidates than the four cached primary pins.

## Registry provenance and exact package hashes

Official registry metadata was downloaded directly from [index.crates.io](https://index.crates.io/). `registry/sources.json` records each exact endpoint and downloaded response hash. The candidate archive hashes below match that official metadata and the local cached archives; their Cargo.toml bytes also match the archives.

| Candidate | Published crate SHA-256 | Cargo.toml SHA-256 |
|---|---|---|
| blake3 1.8.2 | `3888aaa89e4b2a40fca9848e400f6a658a5a3978de7be858e209cafa8be9a4a0` | `aeadc0f6b8df9bc88ea038352584beb3dba55f81b1532cc55630039d00bb6898` |
| proc-macro-crate 3.3.0 | `edce586971a4dfaa28950c6f18ed55e0406c1ab88bbce2c6f6293a7aaba73d35` | `4c723b24d21a10acab4ad16f249bcb8ffb30d769afada2e90c8e6bcc31b30620` |
| toml_edit 0.22.27 | `41fe8c660ae4257887cf66394862d21dbca4a6ddd26f04a3560410406a2f819a` | `58fbce212c22e56a096a000ec10af471f77aa616ed9fa2a75894cee41e848287` |
| indexmap 2.11.4 | `4b0f83760fb341a774ed326568e19f5a863af4a952def8c39f9ab92fd95b88e5` | `28e0d18a8dd2b95f6d29cfc7bd64422f7a14f5e1b1a3ee47f964a670087bb036` |
| hashbrown 0.16.1 | `841d1cc9bed7f9236f321df977030373f4a4163ae1a7dbfe1a51a2c1a51d9100` | `e5cbc66eeb71d7544bcbbda22065478c5ea270dd620fbcc6d9757e7b18485d47` |
| unicode-segmentation 1.12.0 | `f6ccf251212114b54433ec949fd6a7841275f9ada20dddd2f29e9ceea4501493` | `483a1ec00d7b705eff7b41dbfc9385c280d15c0631779ed55749f76d921633c6` |

Primary package metadata links:

- [blake3 index](https://index.crates.io/bl/ak/blake3)
- [proc-macro-crate index](https://index.crates.io/pr/oc/proc-macro-crate)
- [indexmap index](https://index.crates.io/in/de/indexmap)
- [unicode-segmentation index](https://index.crates.io/un/ic/unicode-segmentation)

Compatibility does not establish historical correctness. The captured Pump panic locations support prioritizing a Rust 1.79 stdlib family, but their actual Cargo.lock and application crate versions remain unrecovered. Several compatible latest crates could still produce code different from the original graph. Preserve this distinction when assessing byte equality.
