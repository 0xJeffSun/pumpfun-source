# Withdraw: mint-first tuple and fallible amount ownership

Three ordinary Rust source overrides on exact public [PR #227](https://github.com/lalalune/pumpfun-source/pull/227)
recover the complete **original `249264` / 8,000-byte Withdraw body**. Each match
arm evaluates the mint key before the fallible amount helper, then returns the
successful `(mint, amount)` tuple. The two real private helpers are naturally
inlined; there is no inline directive, assembly, target-byte input, binary patch
or new normalization. Helper names and original historical spelling are inferred.

## Bounded measurements, not latest-main arithmetic

The measured historical source changes **573→574 / 585 normalized bodies**, with
no losses and **143 raw-local bodies unchanged**. The matched dispatcher at
`657672`, actual call offset 440, reaches the recovered body. Fresh static checking
binds all 967 normalized instruction rows, **25 actual same-offset complete callee
shapes**, 14 direct used operands (including trait-vtable callback shapes and a
Rust Location/path), and the two actual Source constructors at lines 91/125.
These are not recursive data/behavior closure or whole ELF identity.

The exact source overrides also survive in our accepted local union25, which
has **579 normalized / 143 raw-local** bodies. The optional checker rederives the
same real Withdraw body there; it does not materialize that separate 47-input
union. Its only extra normalized original body relative to public #252 is
`249264`. The six still-unmatched originals are `76384`, `120816`, `137280`,
`147944`, `163920`, and `243184`.

**Public [#252](https://github.com/lalalune/pumpfun-source/pull/252) has a stronger
raw layout: 578 normalized / 198 raw-local and exact 21,079-byte readonly data.**
Its authenticated current source retains a monolithic `is_none`/`unwrap`
Withdraw branch, and its published map emits a 7,824-byte body. Its current Source
lines 91/125 and native-first diagnostics are already upstream work, not new gains
against it. This packet has **not** compiled this tuple source into that qualified
layout and does not claim 579/198 or preserve #252's exact readonly order.
The subsequent merged [#256](https://github.com/lalalune/pumpfun-source/pull/256)
program-ID reference correction preserves 578/198 and the same Withdraw source
hash; its allocation-identity work is separate and not claimed by this packet.

## Source-only use

Exactly 44 public parent inputs are pinned at commit
`c5fb4efd18521f4c6aa6d5db3479e9d7b1b67ac2`. `source-inputs.json` records each
immutable repository path, decompressed source hash and published compressed
hash. The new real `instructions/withdraw.rs` module makes 45 inputs. No dependency
manifest or lockfile changes. Existing account/event declarations remain exact.

```sh
python3 -B research/fees-withdraw-tuple-ownership-source/source_tools.py
python3 -B research/fees-withdraw-tuple-ownership-source/test_scope.py
python3 -B research/fees-withdraw-tuple-ownership-source/source_tools.py \
  --parent /absolute/exact-public227-source \
  --materialize /absolute/new-withdraw-source
```

The default verifier checks exact packet membership/hashes, public source maps,
the reversible three-path patch, real delegate/module wiring and physical Source
lines. Materialization requires the complete exact parent directory, rejects
symlinks/path escapes and refuses existing output. Neither command downloads,
compiles or executes a target. Default native/runtime/whole-identity claims are
explicitly false. Parent compressed **source** files are existing public inputs;
this packet contains no gzip, executable, build/runtime receipt, transaction,
signature/log fixture, IR or encoded artifact payload.

### Portable native recipe

Use official Linux Anza platform-tools **v1.44** (`rustc` SHA-256
`c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97`),
the unchanged locked registry sources, and the materialized workspace. Set
`RUSTC`, `RUSTDOC`, `CC`, `AR` and `PATH` to that SDK's Rust/LLVM tools;
`CARGO_HOME` to the reviewed locked cache; `CARGO_NET_OFFLINE=true` and
`RUSTFLAGS=-Zremap-cwd-prefix=`. Keep manifest profile/default features unchanged.
Use a separate target directory and require a real root compiler invocation:

```sh
cd /absolute/new-withdraw-source
"$SDK/rust/bin/cargo" rustc --release --target sbpf-solana-solana \
  --locked --offline --verbose --manifest-path programs/pump-fees/Cargo.toml \
  --lib -- \
  "--remap-path-prefix=$PWD/programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/" \
  "--remap-path-prefix=$PWD/pump-fees-math/=pump-fees-math/" \
  --remap-path-prefix=programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/
```

Retain the symbol ELF, then strip a separate output with official v1.48
`llvm-objcopy --strip-all`, the stripper actually used for these observations.
Two local root-clean builds repeated both complete historical files exactly,
reusing authenticated dependencies. This is not a newly verified empty-dependency,
relocated-host or OS-isolated reproduction; do not assume a fresh cache has been
authenticated merely because it builds. Original captures are comparison inputs,
never compiler inputs.

### Optional explicit local static proof

`compare.py` authenticates three already-public parser files by hashes in
`source-inputs.json` before loading them. It accepts explicit local originals and
symbol/stripped files, pins the selected observation's whole hashes, recomputes
the inventory and actual Withdraw call/data proof, and never reads saved reports
or runtime receipts. Use `--stage historical` or `--stage union25`:

```sh
python3 -B research/fees-withdraw-tuple-ownership-source/compare.py \
  --stage historical --parser-root /absolute/repository-or-pinned-parser-root \
  --original /absolute/original-fees.so --candidate /absolute/candidate.so \
  --symbols /absolute/symbols.so --mutations
```

Nine adversarial changes to real call targets, used data/Source fields and the
incoming dispatcher are rejected in memory; no altered ELF is saved or executed.
The parser pins are the existing files under
`research/fees-crank-relay-rejection/{window_map,elf_helpers}.py` and
`scripts/analyze.py`. No arbitrary duplicate-function assignment is used for the
Withdraw body or wrapper. Normalized matches are not raw target-address matches.

## Local runtime observations and unresolved identity

The historical output passed 17,331 finite cases across 18 suites plus 113 focused
Withdraw comparisons, fixing seven prior application-log differences against
that **historical** parent. Those synthetic offline receipts and signature records
remain unpublished: the source packet does not independently prove runtime or
provide downloadable replay evidence. The local union25 passed its separately
retained full/supplementary scopes. No historical fixed-admin reachability,
arbitrary-state behavior, complete VM logs/CU identity or executable-account
snapshot completeness is claimed. No live transactions or deployments occurred.

Historical candidate length 878,552 exceeds meaningful original 873,256;
common-position differences worsen 462,972→464,254. Local union25 is 872,016 bytes,
but its full hash also differs. **Whole meaningful ELF and capture equality remain
false.** This is a source recovery and bounded proof, not a selected checkpoint
promotion or an overall completion percentage.
