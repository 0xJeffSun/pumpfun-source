# Current collector build: Cargo unit and source-version witnesses

This packet authenticates metadata and source-input observations from the single current collector build bound to plan `ff7a857b…`, candidate `6e0c9002…` and symbols `f09ac569…`. It performs no build, harness, VM, original ELF decode, install or network action. The candidate remains unselected. Its original controller result stays `requires-cache-review` with helper/build-sbf aggregate0 and unobserved inner compiler/strip exit statuses.

## What is newly witnessed

| Evidence | Count and scope |
| --- | --- |
| Raw target metadata | 533 files, 1,374,344 bytes: fingerprint JSON, textual dep-info, build-output triplets and rustc query cache |
| Fingerprint records | 239: host71 library +20 build-script +12 run-build; SBF122 library +14 run-build |
| Artifact fingerprints with source/version association | 213, joined to textual `.d` records; not a complete Cargo unit graph or invocation count |
| Textual `.d` files | 215; one primary `.rlib` dep-info file remains outside the filename join and is retained with its source version |
| Selected registry lock entries | 252 |
| Registry source name/version roots observed in `.d` | 176; the other76 lock entries lack a source witness in this retained metadata, which does not establish universal non-use |
| Registry source byte authentication | All1,283 unique files named by `.d`, 18,566,442 bytes, match actual fresh cache, approved hashes and exact selected `.crate` members |
| Primary crate source paths | 31 source37 files appear in both relative and absolute dep-info forms; all actual bytes match source37 |
| Generated source inputs | Six raw files,653 bytes, retained as data under `generated-source/`; no file was imported or executed |
| Compiler log observations | 177 distinct `Compiling name version` pairs, including the local primary crate; these are log observations, not a count of compiler processes |

For every registry source member, the containing archive SHA256 matches the selected Cargo.lock checksum and approved cache entry. Byte comparison happens in memory against the exact archive member; no archive is extracted to the filesystem. Borsh's package-local `../` spellings are normalized and proven not to escape their named package. Raw spellings, canonical cache keys, archive paths/member names and hashes are retained in `archive-source-bindings.json`.

The metadata-only packet does not duplicate all archives or registry source bytes. Actual archive-member equality is a recorded capture observation; portable verification independently checks all retained bytes and its hash/path/lock relations, rather than re-reading omitted cache/source/archive bytes. The scripts and raw successful capture streams are retained so this distinction is inspectable.

## Current version discrepancies are real build observations

| Package family | Source/version witnessed |
| --- | --- |
| Anchor language and SPL | 0.31.1 |
| Anchor syn, six attribute and three derive packages | 0.31.2 |
| Solana program / pubkey | 2.3.0 /2.4.0 |
| Borsh | 0.10.4 and1.8.1; both derive generations are also observed |
| SPL Token / Token-2022 | 7.0.0 /6.0.0 |
| Syn proc-macro parser | 1.0.109,2.0.119 and3.0.9 |

This strengthens the earlier lock-only version witness: these roots are associated with actual fresh target metadata and authenticated dep-info source bytes. It does not identify which versions produced the deployed originals or prove that every observed file contributes bytes to the final linked program. The selected lock relates Syn3.0.9 to several newer macro packages, but a lock edge is not itself a recovered compiler invocation or runtime-linked edge.

Observed SBF Anchor language features are `derive,event-cpi,init-if-needed`. Anchor SPL records `associated_token,default,mint,spl-associated-token-account,spl-pod,spl-token,spl-token-2022,spl-token-group-interface,spl-token-metadata-interface,token,token_2022,token_2022_extensions`. Host Anchor syn records `event-cpi,hash,init-if-needed`. Complete per-record feature strings, dependency tuples and opaque fingerprint fields remain in raw JSON and `analysis.json`.

## Compiler and flags boundaries

All136 SBF-layout fingerprint records contain rustflags `[-Zremap-cwd-prefix=]`; all103 host-layout records contain `[]`. These are Cargo's recorded extra-flag fields, not complete actual rustc argv. Numeric `rustc`, `path`, `profile`, `target`, `compile_kind`, `config` and `metadata` fingerprint fields are opaque identifiers/hashes. In particular, the `metadata` number is not claimed to recover a `-C metadata` argument.

The rustc query cache separately records `rustc1.79.0-dev`, LLVM18.1.7, host `aarch64-apple-darwin`, with unknown commit hash/date, matching the build comparison record. That record pins selected rustc SHA256 `1f26338cc2cabd0a6057dcbd0528bba262b23ca1296d357a55304ee31d1d9e5a`. The build explicitly selected tools v1.44 while cargo-build-sbf's version banner reports its v1.43 default. The banner is not evidence that v1.43 actually compiled this candidate. Successful cached query statuses do not fill the unobserved compiler/strip child exit fields.

Target cfg/query output is not a per-unit compile command: default query entries such as debug assertions cannot be substituted for the release profile's actual argv. Historical compiler/sysroot, standard-library and native-loader identity remain open. Host native linking and actual CC/clang choice/argv are not recovered here. Seven prior build-plan tool pins do not cover CC; the separate current compiler inventory is a different observation, not proof of an executed or historical native link step.

## Build scripts and generated inputs

All26 build-output/stdout, stderr and root-output triplets are retained. They contain34 `rustc-cfg`,94 `rustc-check-cfg`,56 rerun-if-changed,12 rerun-if-env-changed and2 warning directives. There are **zero retained rustc-link-lib, rustc-link-search, rustc-env or rustc-flags directives**. This does not prove there was no implicit native compiler/linker invocation or that every directive became an actual compiler argument. `analysis.json` retains the exact cfg/link/env directive categories, including empty categories.

Six run-build fingerprint records use a literal `Precalculated` payload instead of `RerunIfChanged.output`; both forms are retained. Their opaque dependency IDs are not promoted into a recovered complete execution graph. No build script is executed by this packet.

Generated raw inputs are Rustversion's `version.expr`, host Serde and SerdeCore `private.rs`, and SBF Serde, SerdeCore and Thiserror `private.rs`. Their original target paths and hashes are mapped by `generated-source-retention.json`. They are generated current compiler-input witnesses, not publisher-authored source. Their generator execution provenance, complete build-script input reads, actual argv and historical counterparts remain unresolved. The earlier capture's hash-only status is preserved; the later raw-data retention supersedes that field only.

## Reproduction and remaining limits

Run `python -B verify.py --expected-seal <manifest SHA256>` with Python3.11 or newer. It checks complete package membership/hashes, context/plan/source/cache/lock bindings, raw metadata analysis, all recorded source/archive relations and raw generated inputs. It uses local retained data only and never invokes Cargo, a compiler, an archived collector, a build script, source code, a VM or network. Do not run `collect*.py` or capture scripts as a portable replay: those are machine-local capture procedures retained as history.

Three collector assumption failures are preserved: unnormalized package-local paths; relative primary-source paths; and an incorrect vendor-checksum-file assumption. The registry cache has no `.cargo-checksum.json`, so actual archive checksums and member bytes were used instead. One initial analyzer assumption also failed because six run-build records use `Precalculated`. Failed sources, available raw streams/exits, explicit author summaries where raw streams were not retained, and method diffs remain visible. These were read-only metadata failures; no native build was retried and no source/target/cache input was changed.

This is a current partial source-input witness, not complete linked closure or historical source reconstruction. `.d` does not cover every runtime file/environment read of build scripts and proc macros, implicit linker inputs, prebuilt core/alloc/std/compiler-builtins, complete unit scheduling, original source origins/ABI/layout, or original-byte equality. Those gaps remain explicit.
