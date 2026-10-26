# Mayhem hashbrown graph audit

The claim “original hashbrown0.15.4 versus candidate0.17.1 target codegen drift, fixed by a direct pin” is unsupported and contradicted by the retained positive evidence. The accepted candidate itself embeds the same **hashbrown0.15.4** source-family path as the original. The project lock's **0.17.1** is selected through host proc-macro tooling; the installed target sysroot separately locks0.15.4. These two graphs must be reported separately. This audit changed no source/lock, invoked no Cargo or compiler, and ran no target/VM/stopped lane.

## Actual accepted graph and compilation witnesses

The accepted Mayhem Cargo.toml declares only anchor-lang1.0.0 and anchor-spl1.0.0 as direct dependencies. Its current Cargo.lock contains one project hashbrown version,0.17.1. The exact reverse edges are:

`hashbrown0.17.1 <- indexmap2.14.2 <- toml_edit0.25.17+spec-1.1.0 <- proc-macro-crate3.5.0 <- {anchor-derive-serde1.0.0, borsh-derive1.8.1, num_enum_derive0.7.6}`.

Each of those final three manifests declares `proc-macro=true`. There is no second incoming project-lock edge to hashbrown or indexmap. The copied manifests retain the actual semver declarations, including indexmap's hashbrown0.17 requirement. This is a resolved source/manifest graph analysis, without a newly generated Cargo metadata graph.

Positive retained compilation evidence is the actual accepted-build target directory from2026-10-24: host `target/release/deps/hashbrown-418e238472dd724c.d` names source files under hashbrown-0.17.1. The host hashbrown and indexmap fingerprints have compile_kind0; indexmap's fingerprint records a hashbrown dependency. These match the host/proc-macro classification rather than an SBF-target hashbrown0.17 library. The accepted build receipt records tools-versionv1.52, locked/offline command, returncode0 and the accepted lock hash. The build log contains `Compiling hashbrown v0.17.1`, but that line alone has no host/target distinction. There were no target-tree standalone hashbrown depinfo files in the inspected retained target directory; this observation is **not** used as proof of runtime dependency absence.

The installed v1.52 target sysroot's `library/std/Cargo.toml` separately requires hashbrown0.15 with rustc-dep-of-std; its `library/Cargo.lock` resolves0.15.4 and rustc-std-workspace dependencies. The target sysroot supplies `libhashbrown-a37bb642aaee996c.rlib`, whose positive path witnesses name0.15.4. Its size/hash and witnesses are recorded without copying the archive. This installed sysroot/source correspondence and the candidate's recorded tool selection do not independently prove the precise sysroot archive used by the historical build, or identify the original compiler.

## What the compiled target files actually establish

`findings.json` binds original, accepted candidate and accepted symbol-bearing ELF hashes and path offsets. Both original and candidate have a0.15.4/src/raw/mod.rs path in an **allocated target ELF section**. The roots differ `/home/runner` versus `/Users/runner`. The accepted symbol-bearing target contains four concrete hashbrown code functions: map insertion, raw-table reserve/rehash, capacity overflow and allocation error, with addresses, sizes and body hashes. Thus “candidate only uses0.17” is false as an interpretation of the target evidence.

A path is a source-family witness, not a recovered project Cargo.lock, a unique SDK/version pin, or proof that all target hashbrown monomorphizations came from one source archive. The four symbol names do not encode a crate version. This audit supplies no new machine-body-to-authentic-hashbrown-source proof and no complete linker provenance. Nothing here attributes the original's entire runtime to the current sysroot by assumption. Host proc-macro dependency changes can affect generated source in principle; the host classification does not prove such changes can never affect target output. It does refute using project0.17 versus embedded0.15 alone as an established runtime-codegen cause.

## Coexisting versions and alleged failed pin

The accepted current project lock contains only0.17.1, while the separate target sysroot graph resolves0.15.4. A preserved earlier Mayhem project lock explicitly contains **both0.13.2 and0.17.1**. Multiple versions already coexist in retained evidence. A project-level `hashbrown="=0.15.4"` addition would not automatically replace indexmap's0.17 dependency, nor rewrite the target std sysroot dependency. Those semver-incompatible versions may resolve as separate packages. Forcing the selected indexmap dependency itself to0.15 would violate its declared0.17 requirement; that is a different action from adding an independent direct dependency. No new resolution experiment was run.

The retained FULL-GAP-REPORT lines121–126 assert that a lone pin was attempted and blocked. A bounded search of43 retained text/log/JSON/patch inputs under that report's review directory found the claim but **no associated command, modified manifest/lock, solver error output or exit-status receipt**. The exact selection, hashes and matches are retained. Therefore the particular reported failure is unverified here. This is not a claim that no command was ever run or that every file on disk was searched. Neither an unverified pin failure nor the source-family path proves a lost historical lockfile differs in the claimed way, or that the entire older dependency graph is necessary to resolve a project pin.

## Verification and limits

`findings.json` records exact copied input hashes, accepted Rust source hashes, external archive/artifact hashes, lock reverse edges, target symbol/body hashes and the bounded receipt search. `verify.py` is standard-library-only and checks the immutable packet plus manifest/lock graph consistency. Optional `--repo` freshly rehashes accepted sources, the original/candidate ELFs and retained in-repository receipts. It does not require the old checkout, toolchain cache, Cargo, a compiler or a VM; it does not write files.

There is no arbitrary version proposal, SDK exclusion, MSRV-to-compiler inference, target absence inference from missing strings, new build/coverage, historical recipe closure or full-identity claim. The actionable documentation correction is to distinguish host project dependencies from target sysroot witnesses and withdraw the unsupported concrete pin/codegen-drift attribution.
