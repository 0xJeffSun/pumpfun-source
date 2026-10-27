# AMM harvest: attributed native-source reproduction

This is an independent Linux composition of the harvest recovery already
published by the authors of [PR #264](https://github.com/lalalune/pumpfun-source/pull/264),
not a first-discovery claim. Their
[AMM-high source patch](https://github.com/lalalune/pumpfun-source/blob/204ee2513d0532193ad88ca4ea43f00a765bcc99/research/claude-amm-hi-20261027/source.patch)
and progress record recover the same Anchor-SPL helper and a three-AccountInfo
utility boundary on an older native-host baseline. This packet isolates two causal stages on the independently reproduced
**public 638-window source snapshot**, with exact Linux output repeats,
actual-call and duplicate-capacity checks, and separately performed finite
offline regression checks. Later main checkpoints
and the separate event-capture PR #274 are not composed or counted here.

## Exact scientific parent and source-only scope

The immutable parent is
[`40e3bccd4439e03d82be227a6c99ede1b5168ccc`](https://github.com/lalalune/pumpfun-source/tree/40e3bccd4439e03d82be227a6c99ede1b5168ccc/repro/pump_amm/guard-data-recovery-20261027/results/canonical-source).
Its 48 canonical public inputs produce 49 workspace inputs with the existing
[workspace recipe](https://github.com/lalalune/pumpfun-source/blob/40e3bccd4439e03d82be227a6c99ede1b5168ccc/repro/pump_amm/native-fee-cpi-recovery-20261027/workspace_recipe_v2.py)
(SHA256 `aec4787cdd4361ce5a825398661f5a13e96c31610db4990ebc13dd72aa8792bf`).
That conversion changes Cargo workspace/profile placement and lockfile location,
not Rust. The caller must separately obtain and review that public parent and
produce the **exact 49-file workspace** pinned in `source-inputs.json`.
**This small packet does not download or supply the parent, dependencies, compiler
or candidate images; it is not self-contained native/runtime reproduction.**

`helper.patch` changes only `boost_burn.rs`, preserving its physical line count,
guards, account identities and subsequent close-account seeds. The active manual
SPL instruction construction/invoke becomes the genuine pinned Anchor-SPL
`harvest_withheld_tokens_to_mint` call. It intentionally restores the helper's
AccountInfo order **program, mint, vault**, rather than the old manual
**mint, vault, program**. Signer seeds remain empty. No registry edit, dead helper,
forced linker inclusion, assembly, byte payload or compiler hint is added.

`wrapper.patch` then changes only that caller and appends one ordinary utility
in `utils/token.rs`. The utility accepts three borrowed `AccountInfo` values,
constructs the same genuine helper accounts/vector, and returns its result
without a new error wrapper. Existing utility text and physical source
coordinates are preserved. This is the same API/ownership mechanism as PR #264,
with different inferred module/function spelling, not a new discovery.

All files in this packet are source, hashes, tests or technical documentation.
There are no ELF/IR/build/runtime receipts, transaction records or encoded
substitutes for them. Default verification proves only packet/source integrity;
`native_build_verified`, `runtime_verified` and
`whole_binary_identity_verified` remain false.

## Locally measured static result

The unchanged original partition contains 785 windows. Counts are not total task
completion or proof of semantic equivalence.

| Stage | Normalized membership | Maximum injective shape capacity | Raw bodies | Direct-call-closed membership / capacity |
|---|---:|---:|---:|---:|
| Frozen public parent | 638 | 636 | 128 | 583 / 582 |
| Direct helper composition | 639 | 639 | 128 | 585 / 585 |
| Used three-AccountInfo utility | 640 | 640 | 128 | 586 / 586 |

No prior matched window or call-closed original is lost. The helper at original
**1,011,376 / 2,664 bytes** now has a complete normalized match, all **28 actual
direct callee bodies** match, and it has no relocated data operands. Its actual
call at offset 1,520 reaches the needed reserve instance; that instance's call
at offset 288 reaches the needed finish-grow instance. Those used instances close
two allocator multiplicity deficits: the membership gain is one, while injective
capacity gains three. Duplicate signatures are never resolved by address rank.

The direct-helper stage invokes that helper from the still-unmatched Boost body.
The original **478,768 / 1,480-byte intermediate** remains unequal in that first
stage. The second stage recovers this complete intermediate and its **two actual
direct callee bodies**, including the harvest helper at offset 1,424. It has no
relocated data operands and is actually called by the still-unmatched Boost
body. The complete **130,776 / 11,688-byte Boost body** remains unequal in both
stages. No transient Rc clone-count parity with the old manual source is asserted.

Classified original/candidate call and data obligations retain their previous
equality status. **1,832 data extents remain unclassified; 31 of 135 classified
Location values remain unequal** (104 equal). The direct-call greatest fixed
point is not indirect-call, complete allocation, recursive data or behavior
closure. Whole captured and meaningful ELF identity are false. The final
utility candidate is 1,307,848 bytes versus original meaningful extent 1,268,504;
there are 704,569 differing common file positions (helper stage: 704,262).
Its `.text` is 1,199,296 versus 1,162,040 original bytes; `.rodata` is 25,563
versus 25,715. A lower positional
difference count is layout-sensitive, not a byte-recovery percentage.

## Build and finite execution limitations

The public parent was locally reproduced twice with byte-identical full stripped
and symbol outputs. The helper composition has one guarded real root compilation;
the final utility composition has **two real root compilations with identical
complete stripped and symbol outputs**, retaining the pinned registry and 363
compiled dependency artifacts. All source,
SDK and dependency checks passed. **Three inherited
`admin_update_token_incentives` backend stack/frame diagnostics remain.** This is
source-guarded compilation with inherited diagnostics, not warning-free compiler
success, public-output reproduction of the changed source, or a stack-safety proof.
A new diagnostic is not excused by this qualification.

Local offline execution was performed separately. The unchanged public Boost
suite reported **506/506 defined comparisons passing separately for parent,
helper and final utility composition**. The final utility was also checked with
fresh VM instances rather than only cached program images, with the same results;
15 cases actually executed the harvest instruction in each run. Those comparisons cover the
suite's declared state/error/event/inner-CPI/return-data/transaction fields, not
all logs. Separate inspection found **148 inherited application-log mismatches
and 389 full-log mismatches against original in each build**, with zero
parent-to-helper and parent-to-utility application-log or declared-field changes. This is finite no-new-regression
observation, not complete semantic/log equivalence. Receipts and cases are
**not published**, so the packet offers no downloadable runtime proof. Broader
AMM suites, exhaustive paths and authentic fixed-admin success are not claimed.

## Source verification and optional local comparison

```sh
python3 -B source_tools.py
python3 -B -m unittest discover -s . -p 'test_*.py'
python3 -B source_tools.py --parent /exact/public638-workspace \
  --stage wrapper --materialize /new/harvest-workspace
```

Choose `--stage helper` to stop after the first source change.

The transformer rejects wrong or extra inputs, symlink roots/ancestors/entries,
unsafe paths, existing outputs, patch-context drift, changed untouched sources
and fabricated native/runtime claims. It rechecks all 49 output hashes and the
reversible patch. No network, subprocess, compiler or VM is used by it.

For an ordinary native experiment, use official Anza platform-tools **v1.44**
Rust/LLVM (rustc SHA256 `c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97`),
the unchanged full lock and workspace profiles, `cargo build --release --target
sbpf-solana-solana --locked --offline --verbose`, and target Rust flags
` -Zremap-cwd-prefix=`. Use a fresh output or explicitly clean only the root package
in an independently authenticated dependency cache; require an actual root rustc
invocation. Strip the copied output with official v1.48 `llvm-objcopy --strip-all`
(SHA256 `3a871eab7279dee53f2580e8a022c980305738b575755b7d3529a6230ec4f672`).
The local experiment used a minimal explicit environment and Cargo offline,
**not an additional OS network/filesystem sandbox**. Fresh dependency builds,
relocated paths and different recipes must be measured, not presumed byte-equal.

`compare.py` optionally reads caller-supplied full ELF pairs. It authenticates
three already-public parser files at the hashes embedded in the reader before
loading their code. `--parser-root` must contain those exact repository-relative
paths; no private work scripts or saved measurement/runtime reports are loaded.
The original and each complete candidate/symbol pair are hash-pinned.

```sh
python3 -B compare.py --parser-root /public-parser-tree \
  --original /captured/pump_amm.so \
  --before-candidate /public638/candidate.so --before-symbols /public638/symbols.so \
  --candidate /utility/candidate.so --symbols /utility/symbols.so --stage wrapper
```

This recomputes complete window/multiplicity inventories, classified no-loss
obligations, actual utility/helper/allocator calls and raw section differences.
The pure regression tests exercise source rejection contracts and finite
call-graph/multiplicity counterexamples, without loading a target program. It does
not compile, execute, fetch anything or attest the unpublished runtime claims.
The source/module spelling remains inferred, not proven historical source text.
