# Fees README provenance checkpoint

This checkpoint corrects the current candidate pointer and receipt count in `programs/pump-fees/README.md`, labels earlier authority-guard and external-codec checkpoints as historical, and keeps the older Surfpool receipts attached to their original executable. The README is one of the 22 recorded source/workspace/IDL inputs, so this update has its own clean build and source snapshot. No Rust, Cargo manifest, lockfile, compiler, dependency or build-option change was made. `readme.patch` records the entire edit.

The clean main-source build used the same locked, offline v1.44 recipe, a fresh target directory and the isolated `work/fees-v144-cargo-home` cache. Its **769,000-byte** candidate has SHA-256 **`a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa`**. A complete byte comparison establishes identity with the immutable [FeeConfig serialization candidate](../fee-config-serialization-v144/README.md). All 22 recorded inputs remained unchanged during the build; only the README differs from that earlier source snapshot. All 21 other inputs, three build helpers, the SDK source map and the recorded v1.44 tool hashes are unchanged.

`whole-file-identity.json` supports reuse of that candidate's **17,441 comparison receipts**, including **69 repeat-input checks**, and its separate ten-step donation sequence. This checkpoint executes **zero new runtime comparisons**, adds **zero unique cases**, and makes no new runtime signature-verification claim. `retained-evidence-references.json` binds the old package manifest, runtime and harness artifacts, and external runtime inputs by hash; receipts and harnesses are not duplicated. Existing fixture limits, historical-message replay limits, raw-log/compute differences and prior Surfpool scope remain unchanged.

The captured original is 948,944 bytes, SHA-256 `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`. **Full original byte equality remains false.** This documentation update does not add a recovered handler, prove the historical dependency graph or compiler, complete the audit, or establish a deployable substitute.

The package retains the successful build attempt, raw build comparison, compressed build log, all 22 source inputs, all three build helpers, launcher fingerprints and the unmodified candidate. The existing dependency inventory was checked against 252 locked packages, 504 archives and 13,300 recorded source-file hashes in 477 trees. Four retained v1.44 tool hashes were checked. These records bind the observed inputs; they do not establish a fully hermetic historical build. Earlier packages remain unchanged.

From repository root, the following only checks saved bytes, hashes, snapshots and receipt counts:

```sh
python3 repro/pump_fees/readme-provenance-v144/verify_publication.py
python3 repro/pump_fees/readme-provenance-v144/verify_publication.py --current-main
```

To reproduce the build with the recorded compiler and dependency cache available:

```sh
sh repro/pump_fees/readme-provenance-v144/reproduce-build.sh work/new-fees-readme-build
```

The build script verifies the recorded helper hashes, restores the complete source snapshot to a new repository-local workspace, performs the same locked offline v1.44 build and compares the entire resulting ELF. It does not run runtime probes. If the live helpers or required compiler/cache differ, restore the recorded versions in a separate checkout before reproducing. Preserve any failed build records for inspection.
