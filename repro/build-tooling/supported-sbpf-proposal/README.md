# Source-only supported SBPF builder proposal

This packet proposes tooling; it has **not** changed repository scripts or performed a Cargo/rustc build. The historical `scripts/build_partial_candidate.py` is byte-preserved. The default map remains Pump/AMM/Feesv1.44 and Mayhemv1.52. Only explicit `--tools-version v1.53` or `v1.54` routes to the proposed direct-Cargo adapter. Every older explicit override still reaches the historical helper.

The concrete recipe comes from the completed frozen Mayhem experiments, including their exact tool/sysroot fingerprints, supported genericV0 target, release profile, cwd-remap flag and fixedv1.52 strip tool. Policies contain38 measured distribution files plus archive-verified CC/AR/objdump fingerprints; each plan binds42 paths including strip. Target-spec/adaptation receipts are included in policy data. No guessed CPU/feature flag, installer, rustup alias or historical-compiler claim is introduced.

## Proposed integration, after root review

- Add `build_supported_sbpf_candidate.py` beside the existing scripts.
- Add `supported_sbpf_policies/v1.53.json` and `v1.54.json` beside that adapter.
- Apply `wrapper-routing.patch` only to `build_reconstruction_candidate.py`.
- Keep `build_partial_candidate.py` and `build_source_manifest.py` unchanged.

The proposal files also run from this packet inside the repository, allowing review before integration. The existing manifest/program/artifact-name/tools-version/output/repeated extra-input arguments are preserved; `--dry-run` is added. The four existing program selectors remain accepted, subject to the measured recipe/profile checks. Only Mayhem has the completedv1.53/v1.54 program measurements; accepting the other selectors is not a claim that those sources or compilers have been validated by a new build here.

## Read-only dry-run

For example, from the repository root:

```sh
python3 -B work/supported-sbpf-builder-proposal/build_reconstruction_candidate.py \
  --manifest programs/mayhem/Cargo.toml --program mayhem \
  --artifact-name mayhem_recovered.so --tools-version v1.54 \
  --output work/reviewed-v154-adapter-build --dry-run
```

This prints a complete plan without creating the output/cache/target/RUSTUP_HOME or invoking Cargo/rustc. It reads source/lock/profile and pinned tool bytes. It does not query a compiler version or read captured program bytes. `dry-run-v153.json` and `dry-run-v154.json` retain real filesystem plans:14 Mayhem inputs,42 pinned tool paths, no created output directories. Installed version.md records are labeled as distribution data, not fresh compiler-query results.

With an old/default route, wrapper dry-run prints the historical command/default map only; it does not pretend to validate that helper's SDK/toolchain setup. Omit `--dry-run` only after reviewing the concrete plan and approving a build. No such build was performed in this task.

## Execution contract of the proposed adapter

The source snapshot preserves repository-relative layout, including recorded local path dependencies/IDLs/assets. The existing source-manifest utility is hash-pinned before import. Missing local dependency/workspace manifests require explicit extra-inputs. Known capture paths, common precompiled executable/object inputs, external paths and symlink files in the source inventory are rejected. Git/custom-registry dependency caches are outside this initial measured adapter. Arbitrary include/build-script assets still require explicit extra-inputs; this inventory is not a hermetic source-build proof.

The adapter supports the measured Darwinarm64 distributions only. It verifies pinned compiler/runtime/sysroot, environment tool and strip hashes rather than installing or selecting new tools. Cargo receives the supported `sbpf-solana-solana` target with stock intrinsic features, locked/offline resolution, default declared features and the measured release profile: abort panic, overflow checks, opt-level3, noLTO, one codegen unit. No target-CPU, LTO, feature or new optimization override is accepted.

Unrecorded Rust/Cargo flag, wrapper, linker, profile, registry, C-tool/flag and dynamic-loader overrides are rejected explicitly. Cargo configs are rejected before snapshot creation and rechecked before compilation. This strictness avoids silently clearing user overrides and then calling the result the measured recipe. A changed profile, nonempty default feature set, unsupported host/distribution or changed source-manifest utility needs a separately reviewed recipe.

Only the registry subtree of the caller's selected CARGO_HOME (or default~/.cargo) is copied into a private Cargo home. Top-level credentials/configs are not copied. Original cache sources are read only. Output target and RUSTUP_HOME are private; no `solana` alias is created or changed. Each available locked registry source tree is byte-checked against its authenticated crate archive before and after compilation, using the completed experiment's archive/member method. Locally unavailable platform packages are recorded without being called absent target dependencies. A source tree without an authentic matching archive fails before compilation; no installation or online resolution is attempted.

The receipt records the exact command/environment, source hashes before/after (including detection of newly added source/config files), tool/policy/adapter/utility hashes, profile/target/distribution records, registry archive/member proofs, stdout/stderr logs and hashes, actual Cargo and strip return codes, wrapper exit status and compiler/stripped output hashes/headers. Failed compile/strip attempts retain their actual codes and never read the capture. Expected output is ELF64 little endian machine263/flags0.

Only after successful compilation, source-integrity validation and successful strip does the adapter open the selected original capture for whole-file comparison. A mismatch is an honest comparison result, not a failed compilation. No padding, executable patching, historical-coordinate spoofing, VM transaction, deployment or source promotion is part of this adapter.

## Validation and review limits

`python3 -B test_proposal.py` passes17 synthetic tests. They cover argument/version/artifact rejection; unchanged defaults and older routing; no-spawn/no-output planning; wrapper/flag/config rejection including config appearance after planning; source/lock and tool drift; added source detection; authenticated registry-source mismatch; compile/strip exit propagation; and proof that capture reads occur only after successful compile and strip. Process results and ELF-like bytes in the tests are synthetic fixtures, never Rust-compiled or executed. One child Python process tests bytecode-free planning; it invokes no toolchain.

`verify.py` checks the sealed proposal/history/policies/dry-plans, reruns those compiler-free tests, and optionally rechecks repository script hashes with `--check-repository`. Source-validation receipts are not a real adapter build or preservation result. Root review and one separately authorized build are still needed before integrating or relying on this adapter.

The initial fixture test used a noncanonical/var path and was corrected to compare resolved paths. An initial wrapper dry-run could create Python utility bytecode; that generated cache was removed, bytecode writes are suppressed in the adapter and a plain-Python regression test now covers it. Repository script/source bytes stayed unchanged. No Cargo/rustc/VM/network run, source/lock/status edit, commit or push occurred in this proposal task.
