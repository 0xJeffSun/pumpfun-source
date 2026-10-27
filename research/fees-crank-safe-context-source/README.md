# Safe Crank source ownership and bounded static preservation

This is a **source-only research proposal**, not a complete Crank-body recovery
or a self-contained native reproduction. It carries a three-file ordinary-Rust
delta on one exact **47-input scientific parent**, producing 48 inputs. The
caller must already have that exact parent; its hashes are in `source-inputs.json`.
No public revision is falsely assigned to that local composition, and this
packet does not download or materialize its other source files.

The locally built safe composition preserves **579/585 normalized windows and
143 raw windows**, with no complete body gain. The different public
[PR #262](https://github.com/lalalune/pumpfun-source/pull/262) source also reports
579 normalized, but 198 raw and a different body inventory; neither its qualified
layout nor its Social body is claimed composed here. A later local composition
is separately being qualified. This packet is not a claim to the newest or
best overall checkpoint.

## What changes

- Blank the old `donation::crank` span without moving later source lines.
- Replace the real root handler's delegate with an `include!` expression.
- Add `instructions/fee_sharing/crank_donation_fee_pda.rs`, exact SHA-256
  `b8c834db90ba419b50c05ac65bcec049ce5f5ee2fbf114749aed8858aaa0a384`.

The body scopes Rent/account work to the native branch, keeps normal checked
lamport APIs, explicitly owns three `AccountInfo` clones through unsigned CPI,
converts an error before dropping those clones, and uses a safe typed-account
reload helper. The helper has **one explicit `#[inline(always)]`** annotation:
this is inferred, nonhistorical compiler guidance, not recovered historical
spelling. The include boundary and clone/drop formulation are likewise source
hypotheses. No unsafe typed allocator, global optimizer cutoff, registry edit,
assembly template, captured executable input or output-byte patch is included.

Native-only flow is credited to [PR #201](https://github.com/lalalune/pumpfun-source/pull/201),
checked overflow to [PR #205](https://github.com/lalalune/pumpfun-source/pull/205),
and prior diagnostics to [PR #197](https://github.com/lalalune/pumpfun-source/pull/197).
Their earlier corrections are not claimed as new discoveries. This packet's
progress is the measured safe ownership/inlining composition and explicit
preservation checks.

## Measured local static result

Two root-clean native builds yielded identical stripped and symbol-bearing
files. Their exact hashes are pinned by the optional reader; neither artifact
nor a build receipt is published here.

The actual matched wrapper binds original Crank **147944 / 15,976 bytes** to
candidate **632088 / 15,688 bytes**. Of 35 ordered direct calls, **34 complete
callee shapes match**. Original allocator 32 versus candidate allocator 272
remains unequal. All ten direct data operands match at justified used extents,
including the complete two-entry formatting descriptor and its explicit strings.
Callback 40 plus its one actual callee match; recursive callback data semantics
and complete allocation boundaries remain unproved. Ordered-callee comparison
is not identical caller CFG or effect-order proof.

Only Crank changes shape among retained candidate bodies. Three real outlined
bodies, whose every actual caller was Crank, disappear: reload 688, array-drop 392
and event serialization 664. Handler growth 2,992 minus removed 1,744 gives net
`.text` growth 1,248. All previous matched bodies survive.

Fresh independent checks preserve 3,961 positive actual callee observations,
183 complete Location-shaped values and explicit paths, 511 forced function
identities / 4,226 identity-bound calls, and 1,970 data uses across 772 bijective
addresses. Adding nine non-code role-bound Crank operands gives 1,979 uses /
776 addresses without splits or merges. These are bounded structural claims,
not a whole-program semantic bijection. The separate broader conditional
all-different/table analyses are not counted as strict identities here.

The optional exact-map comparison rederives all 623 native input sections:
21,064 payload bytes with the same payload-hash/size/alignment multiset. Natural
alignment gaps grow 7→19, explaining **all +12 `.rodata` bytes without new
payload**. This does not authorize arbitrary zero insertion or establish
historical allocation ownership.

| Raw measure | Safe composition | Original meaningful ELF |
|---|---:|---:|
| `.text` | 799,616 | 799,648 |
| `.rodata` | 21,083 | 21,079 |
| `.data.rel.ro` | 6,744 | 6,744 |
| `.rel.dyn` | 44,016 | 43,968 |
| ELF bytes | 873,280 | 873,256 |

**The −32 text gap is cancellation**, not near identity: six original residual
bodies total 59,792 bytes versus seven candidate residual windows 59,760 (including
an Extend closure). There are **442,902 differing common-position bytes**.
The six original residual addresses are 76384, 120816, 137280, 147944, 163920, 243184.
Neither the meaningful ELF nor the full 948,944-byte capture equals the candidate.

## Verify source / materialize conditionally

```sh
python3 -B research/fees-crank-safe-context-source/source_tools.py
python3 -B -m unittest discover -s research/fees-crank-safe-context-source -p 'test_*.py'
python3 -B research/fees-crank-safe-context-source/source_tools.py \
  --parent /absolute/exact-union25-source --materialize /absolute/new-safe-source
```

Default verification checks packet integrity, safe include identity, the exact
three-path patch and map shape. It explicitly reports
`exact_source_materialization_verified=false`: **the 47-file parent is an
external prerequisite, not supplied by this packet**. With that exact parent,
materialization validates all input hashes, every patch context/reverse hunk,
physical line counts, unchanged donor tail and all 48 output hashes. It does no
network, compiler, VM or subprocess work. Output must not exist; unsafe paths,
symlinks and unexpected inputs are rejected. No target/cache or original ELF
enters compiler source materialization.

### Portable build procedure, not a newly verified fresh-host recipe

Use official Linux Anza platform-tools **v1.44**, rustc SHA-256
`c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97`.
Set `RUSTC`, `RUSTDOC`, `CC`, `AR`, `PATH` to its Rust/LLVM tools;
`CARGO_HOME` to an authenticated unchanged locked dependency cache;
`CARGO_NET_OFFLINE=true`, `RUSTFLAGS=-Zremap-cwd-prefix=`, and a separate target
folder. Keep the materialized manifests/profile/default features unchanged:

```sh
cd /absolute/new-safe-source
"$SDK/rust/bin/cargo" rustc --release --target sbpf-solana-solana \
  --locked --offline --verbose --manifest-path programs/pump-fees/Cargo.toml --lib -- \
  "--remap-path-prefix=$PWD/programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/" \
  "--remap-path-prefix=$PWD/pump-fees-math/=pump-fees-math/" \
  --remap-path-prefix=programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/
```

Require a real root compiler invocation, preserve the symbol ELF and strip a
separate copy with official v1.48 `llvm-objcopy --strip-all`. The local repeats
reused authenticated dependencies; no empty-dependency, relocated-host or
extra OS-isolation reproduction is established by this packet.

### Optional user-supplied local static inputs

`compare.py` pins three already-public parser files before loading them:
`research/fees-crank-relay-rejection/{window_map,elf_helpers}.py` and
`scripts/analyze.py`. It reads no private work scripts or saved reports/receipts.

```sh
python3 -B research/fees-crank-safe-context-source/compare.py \
  --parser-root /absolute/repository-or-pinned-parser-root \
  --original /absolute/original-fees.so \
  --before-candidate /absolute/union25.so --before-symbols /absolute/union25-symbols.so \
  --candidate /absolute/safe.so --symbols /absolute/safe-symbols.so --mutations
```

Optionally pass both `--before-map` and `--after-map` for the exact output-bound
native text maps. All inputs are required externally and authenticated by
whole-file hashes. Nine used-data corruptions are rejected only in memory;
no changed image is saved or executed. The smaller public reader rechecks the
strict cohort and Crank used fields, not all separate local table/metadata
analyses. Build/runtime/whole-identity verification flags remain false.

## Finite local execution observations — unpublished evidence

The exact candidate locally passed 17,331 cases / 18 suites, 357 Crank cases plus
two arithmetic boundaries, and 14 supplemental commands preserving prior Social,
sharing, creation, Withdraw and Sweep diagnostics/signatures. These counts
overlap. All prior 17 sharing application-log repairs survive. This prose is a
local observation, **not downloadable or self-contained runtime proof**.

No build/runtime receipts, logs, fixtures, transaction/signature records, ELF,
IR, archive or encoded artifact derivatives are included. No exhaustive
semantics, compute/runtime-log equality, authentic fixed-admin success or
whole core binary identity follows. No selected checkpoint is changed, and no
live transaction, deployment or merge is requested.
