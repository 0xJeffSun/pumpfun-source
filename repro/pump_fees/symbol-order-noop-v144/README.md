# Pump Fees v1.44 no-op symbol-ordering gate

This package answers one narrow question: can the actual Linux v1.44 linker consume a complete, no-swap Pump Fees function order without changing the current-source output?

It does not derive a target order, inspect the deployed Pump Fees program, patch an ELF, or establish a reconstructed deployment recipe. The retained run establishes that the current Linux v1.44 baseline is reproducible and the linker option exists, then stops because this ELF cannot express a complete no-op order by bare symbol name.

## Result: baseline exact, name-only ordering not applicable

The compatible-host attempt compiled the unchanged 26-input source successfully. Independent v1.52 stripping reproduced the retained Linux current-source candidate exactly: 863,800 bytes, SHA-256 `6c44d9f2ffe9b18c79a6344b256d8acd7a34c10e77b894c51f46512a447b8ce6`. The actual pinned v1.44 `rust-lld` advertises `--symbol-ordering-file`.

The unstripped ELF then produced the fail-closed result:

- 647 defined `STT_FUNC` rows;
- 635 unique bare names;
- 8 names duplicated across 20 rows;
- duplicate rows occupy distinct addresses, and some have different sizes.

Pinned LLD keys the order map by bare `Symbol::getName()` and applies one priority to every matching local or global symbol. It therefore cannot represent the existing separated address positions of those duplicate names. The runner emitted no order file, started no ordered build, read no deployed artifact, and performed no binary mutation. `results/` retains both baseline ELFs, linker help, source/tool receipts, the exact duplicate rows, and the terminal result. This closes the ATA-style complete-name-order route for this Fees baseline; it does not rule out a future object-qualified linker mechanism or source-level removal of duplicate local-name collisions.

## Fixed inputs

- Repository branch: `main`
- Source revision: `58519a8e601ed17bc6d931483686a08ee656233d`
- Fresh Linux current-source stripped baseline: 863,800 bytes, SHA-256 `6c44d9f2ffe9b18c79a6344b256d8acd7a34c10e77b894c51f46512a447b8ce6`
- Compile distribution: Linux x86_64 platform-tools v1.44, archive SHA-256 `6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`
- Strip distribution: Linux x86_64 platform-tools v1.52, archive SHA-256 `8b3861e93daf085ec12b65c4fac374d9bec4587a3de16871da6b08ab0c1d907e`
- Strip operation: the recorded v1.52 `llvm-objcopy --strip-all` phase
- ELF contract: ELF64, little endian, `ET_DYN`, strict `EM_SBF = 263`

`source-inputs.json` pins all 26 current source/workspace/IDL inputs. `policy.json` pins the tool archives, selected compiler/stripper files, container digest, baseline, architecture, and required equalities.

The pinned container supplies only the Linux x86_64 host shell and system build prerequisites. It uses the official Token-2022 image already pinned by this repository (`sha256:6c73adc7…`), whose glibc 2.41 and GLIBCXX 3.4.30 satisfy the v1.44 compiler. The older Solana 1.10.33 image was measured first and stopped before compilation because its glibc could not execute v1.44; that blocked receipt is retained outside this additive package under ignored `work/`. Compilation invokes the authenticated v1.44 distribution's Cargo and Rust compiler directly. Both builds use the current `sbf-solana-solana` release profile and `-Zremap-cwd-prefix=`. Both outputs use the authenticated v1.52 `llvm-objcopy --strip-all`. The ordered build adds exactly one target link argument; the control adds none.

## Run

Docker must be able to execute `linux/amd64` containers. The output and verified download cache must remain under the repository's ignored `work/` directory. Every attempt uses a fresh output directory.

```sh
python3 -B repro/pump_fees/symbol-order-noop-v144/run.py \
  --output work/symbol-order-noop-v144-run
```

The host exports only the 26 pinned Git blobs and the four driver inputs into the container. It does not mount the repository, `evidence/`, or any deployed executable.

The runner proceeds in this order:

1. Require clean tracked state on `main` at `5faca894…`; only untracked files in this additive package are allowed.
2. Export and rehash the 26 pinned source inputs from Git.
3. Verify the pinned Linux/amd64 container and both downloaded platform-tools archives.
4. Record the actual v1.44 `rust-lld` version, bytes, and complete `-flavor gnu --help`; require that help to advertise `--symbol-ordering-file`.
5. Fetch the locked public dependency graph, then build offline with v1.44 and strip with v1.52.
6. Retain `baseline.unstripped.so` and `baseline.stripped.so`. Require the stripped file to equal the fixed 863,800-byte `6c44…8ce6` baseline. A mismatch stops before an order file or ordered build exists.
7. Parse only the fresh unstripped baseline. Require strict `EM_SBF = 263`, one valid `.symtab`, and every defined `STT_FUNC` to have a unique, positive, non-overlapping `.text` extent.
8. Emit every accepted function name in existing address order. `symbol-order.json` requires requested order to equal baseline order and records zero swaps.
9. Rebuild from a separate target directory with only `-C link-arg=--symbol-ordering-file=/gate/run/evidence/symbol-order.txt` added to the target flags. Reject linker ordering warnings or any other observed link argument.
10. Strip with the same v1.52 phase and require exact equality of the function symbol map, `.text` bytes/layout/hash, every REL/RELA relocation entry and raw section hash, and the complete stripped ELF.

"Function symbol map" means every defined, named, positive-size `.symtab` `STT_FUNC` entry in `.text`, sorted by `(address, original symbol-table index)`. Ambiguous aliases, overlaps, zero-size functions, duplicate names, malformed ranges, or functions outside `.text` stop the gate instead of being omitted.

## Retained output

A terminal attempt retains:

- host checkout, image, command, source-export, and driver receipts;
- exact archive/tool hashes and tool version logs;
- actual v1.44 `rust-lld` help;
- baseline and ordered build/strip logs;
- both stripped and unstripped outputs for both phases when produced;
- baseline and ordered function maps, text records, relocation maps, and allocated-section strip bindings;
- the exact emitted order file and no-swap receipt when the baseline gate passed;
- a machine-readable terminal result or the exact blocker and stage.

Failed attempts are immutable. Use another output path rather than deleting or overwriting evidence.

## Verify

Verify package seals only:

```sh
python3 -B repro/pump_fees/symbol-order-noop-v144/verify.py
```

Verify a successful retained run:

```sh
python3 -B repro/pump_fees/symbol-order-noop-v144/verify.py \
  --output work/symbol-order-noop-v144-run
```

Validate the integrity and fail-closed behavior of a blocked run without calling it applicable:

```sh
python3 -B repro/pump_fees/symbol-order-noop-v144/verify.py \
  --output work/symbol-order-noop-v144-run --allow-blocked
```

The verifier never compiles, executes a program, contacts the network, or reads a deployed artifact.
