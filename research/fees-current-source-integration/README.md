# Pump Fees: reconcile pinned PR171 ownership with source recovery

This source-only integration combines the independently reproduced public
[PR171 source](https://github.com/lalalune/pumpfun-source/pull/171) with the
[isolated source recovery in PR173](https://github.com/lalalune/pumpfun-source/pull/173).
It preserves the exact union of their complete normalized windows:
**544/585**, with **397 unique pairs**, **118 raw-local matches** and **41 unmatched
original windows**. Compared with PR171's 542 windows, the only additional
complete bodies are the previously recovered extension parser 291864 and global
wrapper 632080. The 15 newer upstream matches are **not new discoveries here**.

All **161 Location-shaped record uses** in the integrated unique-pair cohort
have equal decoded file/line/column values, versus 134/161 on the public PR171
baseline. This preserves the earlier 160-use cohort and one newly matched
social-global use at 645864+2080 (`programs/pump-fees/src/lib.rs:38:1`).
The same 27 coordinate corrections from PR173 are carried forward, not counted
again as new independent discoveries.

**Whole-byte completion remains 0/4 core programs.** This compiler output is
868,984 bytes versus 873,256 meaningful original ELF bytes and 948,944 captured
bytes. The capture includes 75,688 zero allocation bytes. Neither full capture
nor meaningful ELF equals this output. The 41 unmatched original windows span
234,392 of 799,648 original text bytes; that is not a count of missing source.

## What this source-only packet establishes

Two fresh root-clean local builds reproduced the same stripped and symbol
outputs. Fresh offline differential execution compared 17,331 cases across 18
suites with zero mismatches. A deterministic executable-wrong-relay-key case
also matched the original error, complete logs, state snapshots and inner
instructions. These are **local observations, not published replay evidence**.
No ELF, compressed/encoded binary payload, replay cases, fixture output, build
receipt or archived receipt excerpt is included. Default verification reports
`runtime_verified=false`; neither default nor optional checking replays a VM.

The baseline map pins all 36 public source blobs at
`fa8ef8040ee642302fd52f88656ddc8cf2b8cad9`, a pinned PR171 revision rather than
the latest moving PR head. This packet does not claim the newest global frontier.
The local clean control
exactly reproduced its public stripped hash `b5ec49ea…` and symbols `9c850f0f…`.
The integration has 41 inputs and 18 changed/added source paths. Its ordinary
changes are exactly the prior extension AccountInfo declaration, nine event
module/coordinate moves, fee-tier math-module move and authentic locked
`solana-program-entrypoint 2.3.0→2.2.1` dependency selection. All other locked
packages remain unchanged. The 27 coordinate fixes are not raw output patches.

The five upstream ownership/error files were reconciled without reverting the
source-coordinate work. Three copied files matched their exact upstream source;
two overlapping event-module files used uniquely matching changed field lines
and adjacent comments, with no fuzzy matching. Complete source hashes and the
patch from the current public baseline are the reproducible result, not a claim
that an old context-free patch applies unchanged.

## Verify and materialize

Use Python 3.11+ from a Git clone containing the pinned public commit:

```sh
P=research/fees-current-source-integration
python3 -I -B "$P/verify.py"
python3 -I -B "$P/test_verify.py"
python3 -I -B "$P/verify.py" --materialize work/fees-current-source-fresh
python3 -I -B "$P/verify.py" --baseline --materialize work/fees-current-baseline-fresh
```

Default checks verify all public source blobs, before/after source maps, the
exact patch, the single locked dependency substitution and the packet manifest.
They do not read program ELF or replay receipts. Materialization writes only
verified inputs into a new destination; traversal, existing outputs and symlinks
are rejected. Fifteen stdlib tests cover integrity mutations and read boundaries.

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
SOURCE=/absolute/path/to/fees-current-source-fresh
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

## Optional comparison of your own outputs

Return to the repository root and supply both compiler products:

```sh
python3 -I -B "$P/verify.py" --candidate "$OUTPUT/candidate.so" --symbols "$SYMBOLS"
```

This opt-in path hash-checks local outputs, reads the captured original and
already-public PR171 baseline artifacts, and loads hash-pinned public analysis
code at the pinned revision. It recomputes 542→544 with only the two extension
gains and no losses, 118 raw matches, 397 unique pairs, allocated strip/symbol
equality, and all 161 full 24-byte Location-shaped values. Rust Location type
identity is inferred; equal values do not mean equal relocated pointer bytes.

It also checks 99 actual direct-callee bodies for the 13 coordinate-corrected or
extension-recovered functions. The single known unmatched target remains the
extension global's business call at 632080+416→76384; 98 others match. This is
not all-data, indirect-call, recursive semantic or arbitrary-state closure.
Existing source-program functions, selected checkpoints and prior sealed
packages are not overwritten by this packet.

Expected local output hashes, not artifact payloads:

| Output | SHA-256 |
| --- | --- |
| Stripped | `c4bea9829ce0594a8bb0a9080f67232ae840018e8f6f7746e626c4a3984dcded` |
| Symbols | `ae6beb80af8cafcaa9b5175c976eee1344e385765b27c413ab50d02fd4236b46` |

## Raw gaps, not a completion percentage

| Section | Original bytes | Integrated bytes | Common-position differing bytes |
| --- | ---: | ---: | ---: |
| `.text` |799648|793352|424113|
| `.rodata` |21079|21299|18341|
| `.data.rel.ro` |6744|7360|2530|
| `.rel.dyn` |43968|45152|6815|
| `.dynamic` |176|176|9|
| `.dynsym` |432|432|6|

`.dynstr` 268 bytes and `.shstrtab` 72 bytes are exact. Whole-file common-position
bytes differ at 461,447 positions. The text length gap is 6,296 bytes and the
meaningful-ELF length gap is 4,272 bytes; neither is a measure of remaining
engineering effort. Normalization preserves registers, stack offsets, opcodes,
ordinary immediates and external import identities, masking only established
local call displacements and relocated addresses. No target bytes are compiler
inputs and no program output is patched or padded to manufacture identity.
