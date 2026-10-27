# Pump Fees: ownership, published SDK and source-coordinate recovery

Four ordinary source changes recover two complete instruction windows and close
27 measured source-location discrepancies in a pinned **core Pump Fees** build.
Local builds measured **529/585 normalized windows, 382 unique pairs and 118 raw
body matches**, up from 527/380/118 without losing a prior match. The 160-use
Location-shaped-record cohort changes from 133 to **160 equal values**.

**This is not byte identity.** The research output is 861,984 bytes; the captured
original is 948,944 bytes, including 75,688 trailing zero allocation bytes. Its
meaningful ELF extent is 873,256 bytes. Neither whole capture nor meaningful ELF
equals the compiler output. Fifty-six original windows remain unmatched. The
four-core-program byte-identical completion count remains **0/4**.

## Source-only publication boundary

This packet contains readable Rust, Cargo.lock, a unified source patch, source
hash maps, Python verifier/tests and this recipe. It contains **no ELF, compressed
payload, replay cases, archived receipt excerpts or encoded binary payloads**.
Two independent local root-clean builds agreed on both stripped and symbol
outputs, and a fresh offline differential run compared **17,331 cases across
18 suites with no mismatches**. Those are local observations, not published
replay evidence: archived runtime/build receipts are not included or consumed.
Default verification reports `runtime_verified=false` and does not run a compiler
or VM. The optional comparison also does not verify runtime behavior.

The baseline is the public PR162 research state, not the repository's selected
Fees artifact. `baseline-sources.json` lists all **36 public source-path mappings**
at commit `dcb34a1a89bd11e454daee2ab862d929c5ed50ed`; each blob is hash-checked.
The original research source revision was `87f85e2e5351e0cbac13338f2f7a5bc256906325`;
the later pinned commit retains the exact same 36 inputs. The recovered source
has 41 inputs, including five new ordinary modules. Eighteen paths change or
are added. No sealed prior evidence package or selected build is overwritten.

## Four independently isolated causes

1. `ExtendFeeConfig.fee_config` is an owned `AccountInfo`, rather than borrowed
   `UncheckedAccount`. This recovers the complete 3,512-byte parser at original
   address 291864 and 1,272-byte global wrapper at 632080. The parser's 19 direct
   callees match original bodies; the wrapper's business callee remains unmatched.
2. Nine existing event definitions move into ordinary instruction modules at the
   captured macro invocation coordinates. Field names/order/types are unchanged.
   This corrects nine generated event panic-location values, not event semantics.
3. The unchanged fee-tier selector moves into the existing math module, placing
   the first bounds-checked access at `pump-fees-math/src/lib.rs:49:23`.
4. The lock selects published `solana-program-entrypoint` **2.2.1** instead of
   2.3.0. No registry source is patched. All 17 deserializer Location records
   recover their captured `src/lib.rs` coordinates. Its non-test deserialization
   source region is unchanged between those two releases, while preceding API
   additions in 2.3.0 shift the region by 51 lines. This is a reproducible published
   version hypothesis, not proof of a unique historical dependency version.

The official [2.2.1 archive](https://static.crates.io/crates/solana-program-entrypoint/solana-program-entrypoint-2.2.1.crate)
has registry-pinned SHA-256
`473ffe73c68d93e9f2aa726ad2985fe52760052709aaab188100a42c618060ec`.
All other locked packages remain unchanged. The isolated dependency change also
reorders some same-shaped functions; it is **not** merely 17 patched output bytes.
There is no assembly, register/stack mask, copied program code or output patch.

## Verify and materialize

From a Git clone containing the pinned commit, using Python 3.11+:

```sh
P=research/fees-core-source-recovery
python3 -I -B "$P/verify.py"
python3 -I -B "$P/test_verify.py"
python3 -I -B "$P/verify.py" --materialize work/fees-source-fresh
# Optional independently buildable control:
python3 -I -B "$P/verify.py" --baseline --materialize work/fees-baseline-fresh
```

Default verification checks the manifest, all before/after source hashes, exact
patch and single locked dependency change. It reads public **source** Git blobs,
not program artifacts or runtime receipts. Materialization rejects an existing
destination, unsafe paths and source symlinks, and writes only verified inputs.
Tests include source mutation, missing/extra inputs, traversal/symlink rejection,
the no-artifact read boundary and incorrect optional-output hash rejection.

## Guarded portable build recipe

Prepare and authenticate official **Linux x86_64 Anza platform-tools v1.44**
separately. The [official release archive](https://github.com/anza-xyz/platform-tools/releases/download/v1.44/platform-tools-linux-x86_64.tar.bz2)
has observed SHA-256
`6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`.
This is a hash pin, not a publisher signature. Verify the extracted toolchain
against that archive before execution. Use all **252 locked registry packages**,
with archives and extracted source verified against their public checksum-pinned
archives. Cargo build scripts/procedural macros execute as native build inputs.
Do not put captured programs in the source tree or pass them to the compiler.

Set absolute paths. `OUTPUT` must be a new directory outside `SOURCE`. Preserve
the existing release profile (`panic=abort`, overflow checks, one codegen unit,
`lto=false`) and default features. The explicit environment contains no wallet,
live-service or credential settings. Cargo offline mode is not an OS sandbox.

```sh
SDK=/absolute/path/to/platform-tools-v1.44
CARGO_CACHE=/absolute/path/to/verified-public-cargo-home
SOURCE=/absolute/path/to/fees-source-fresh
OUTPUT=/absolute/path/to/new-fees-build
test ! -e "$OUTPUT" && mkdir -p "$OUTPUT/home" || exit 1
cd "$SOURCE"
env -i PATH="$SDK/rust/bin:$SDK/llvm/bin:/usr/bin:/bin" \
  HOME="$OUTPUT/home" CARGO_HOME="$CARGO_CACHE" \
  CARGO_TARGET_DIR="$OUTPUT/target" CARGO_NET_OFFLINE=true \
  CARGO_TERM_COLOR=never CARGO_BUILD_JOBS=3 RUSTFLAGS=-Zremap-cwd-prefix= \
  RUSTC="$SDK/rust/bin/rustc" RUSTDOC="$SDK/rust/bin/rustdoc" \
  CC="$SDK/llvm/bin/clang" AR="$SDK/llvm/bin/llvm-ar" \
  OBJDUMP="$SDK/llvm/bin/llvm-objdump" OBJCOPY="$SDK/llvm/bin/llvm-objcopy" \
  LANG=C.UTF-8 LC_ALL=C.UTF-8 \
  "$SDK/rust/bin/cargo" rustc --release --target sbpf-solana-solana \
  --locked --offline --verbose --manifest-path "$SOURCE/programs/pump-fees/Cargo.toml" --lib \
  -- --remap-path-prefix="$SOURCE/programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/" \
     --remap-path-prefix="$SOURCE/pump-fees-math/=pump-fees-math/" \
     --remap-path-prefix=programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/ \
  >"$OUTPUT/build.log" 2>&1 || exit 1
grep -- '--crate-name pump_fees_candidate' "$OUTPUT/build.log" || exit 1
SYMBOLS="$OUTPUT/target/sbpf-solana-solana/release/pump_fees_candidate.so"
```

Recheck source, tool and registry hashes after compilation. Local observations
used copied immutable dependency targets with an explicit root-package clean and
exactly one actual root rustc invocation. A fresh all-dependency build at relocated
paths is a separate reproduction to verify, not assumed identical. Do not repair
an output-hash discrepancy by copying or modifying a program artifact.

For the locally used strip step, use separately authenticated platform-tools
v1.48 `llvm-objcopy`, whose executable SHA-256 is
`3a871eab7279dee53f2580e8a022c980305738b575755b7d3529a6230ec4f672`:

```sh
OBJCOPY=/absolute/path/to/platform-tools-v1.48/llvm/bin/llvm-objcopy
"$OBJCOPY" --strip-all "$SYMBOLS" "$OUTPUT/candidate.so"
```

## Optional local output comparison

Return to the repository root, then supply your own compiler outputs:

```sh
python3 -I -B "$P/verify.py" --candidate "$OUTPUT/candidate.so" --symbols "$SYMBOLS"
```

The optional path hash-checks supplied outputs, reads the captured original and
already-public PR162 baseline artifacts at the pinned commit, and loads only
hash-pinned public ELF analysis code. It recomputes complete original windows,
allocated stripped/symbol equality, exact gains/losses, all 160 full 24-byte
Location-shaped values and 99 direct-call target comparisons for the 13 touched
functions. The known unresolved call is global extension wrapper 632080+416 to
business handler 76384; 98 other direct target bodies match. It does not consume
replay receipts or assert all-data, indirect-call or transitive semantic closure.
The Rust Location type identity is inferred from the decoded layout and pointers.

Expected output hashes, **not artifact payloads**:

| Output | SHA-256 |
| --- | --- |
| Stripped | `b71379447cad1d7154a9e84bbd34b5d3497693ecd87362f3e4fee47ddbc0cea1` |
| Symbols | `3daa944475d8ecf85b8078f7a6c57347fddb35e32d3f62ec4178f9f96cb628dc` |

Raw section gaps remain: `.text` 786,320 versus 799,648 original bytes;
`.rodata` 21,299 versus 21,079; `.data.rel.ro` 7,360 versus 6,744.
The original/candidate common-position difference count is 469,722, which is
**not** a measure of missing code or remaining engineering effort. Normalization
masks only local call displacements and established relocated pointer values;
external import names are preserved. It never masks registers, stack offsets,
opcodes or ordinary immediates. This packet does not include the later Crank or
Withdraw ownership experiments.
