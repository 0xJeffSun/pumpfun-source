# Relay module layout and Anchor facade: source-only reconstruction

Ordinary Rust module ownership/declaration order and dependency ownership improve
raw output agreement while retaining **483/492 normalized windows**.
Across six attributable source states, complete **raw local-window matches rise
127 → 134 → 142**, with no raw or normalized losses. This is an isolated layout
series: original windows 92–100 remain unmatched, and later independent epoch/just
body recoveries are not silently composed into these results.

**Neither whole ELF nor allocated capture is byte-identical.** The final ELF is
818,600 bytes, versus original meaningful ELF extent 818,280 and captured 830,448
bytes (12,168 allocation-tail zero bytes). Its instruction section remains 320
bytes longer. Equal sizes or normalized windows do not establish data semantics,
indirect behavior, exhaustive runtime equivalence or unique historical source.

## Source-only boundary

Only readable Rust/Cargo sources, source hash maps/diffs, static comparison
counts/hashes, verifier/tests and this recipe are included. There are no ELF,
compressed/encoded binary payloads, replay cases, archived build/runtime receipts
or their excerpts. All six reports in this packet were freshly recomputed from
local original/compiler outputs without reading replay or build receipts.

Default verification checks source integrity and recorded static report structure;
it **does not independently remeasure ELF bytes**. It reports
`compiler_executed=false` and `runtime_verified=false`. Optional local comparison
rehashes and recomputes all six full-window/section inventories using the pinned
public parser. No mode runs a compiler, target VM or live-chain operation.
Local builds/replay elsewhere in the task do not make this downloadable replay
proof. No checkpoint promotion or runtime success coverage is claimed here.

## Attributable six-stage results

| Stage | ELF bytes | Normalized / raw | `.rodata` differing positions | `.data.rel.ro` differing positions | Whole-file common differing positions |
| --- | ---: | ---: | ---: | ---: | ---: |
| Natural topology/metadata baseline | 818600 | 483 / 127 | 4856 | 945 | 397175 |
| Ordinary event modules | 818608 | 483 / 127 | 15131 | 943 | 405768 |
| Ordinary instruction modules | 818600 | 483 / 134 | 3336 | 925 | 389888 |
| Ordinary state modules | 818600 | 483 / 134 | 3021 | 899 | 390847 |
| Earlier security declaration | 818600 | 483 / 134 | 1879 | 862 | 390822 |
| Anchor facade dependency ownership | 818600 | 483 / 142 | 321 | 677 | 388587 |

Intermediate positional regressions are disclosed, not hidden. A positional byte
count is not a percentage of missing code or remaining engineering effort.
All stages retain 644 recursively direct-call-shape-closed pairs; this is not
semantic/data closure. `.dynstr` and `.shstrtab` match raw in the final output;
all non-`.text` section lengths match, but most section contents still differ.

The instruction-module step gains raw ordinals 43, 44, 48, 50, 231, 252, 253. The facade
step gains 110, 111, 300, 301, 304, 314, 334, 335. These are whole local-window comparisons,
not assertions of raw equality at their referenced addresses. No normalized
match is added by this packet, and coincident function indices are not unique
source attribution.

## Ordinary source changes

`base-source/` contains 60 complete ordinary source inputs for the frozen natural
module/worker baseline with prior semantic security metadata and source-coordinate
corrections. It is a reconstructed compiler recipe, not a recovered source archive.
Five sequential `overrides/` groups preserve the attributable changes:

1. Real event modules before instruction modules, replacing delayed includes with
   compatibility reexports; each event macro retains line 5, column 1.
2. Real donation/relayer instruction modules in the measured expansion order,
   with crate-visible generated client-account aliases for Anchor resolution.
3. Real state modules and compatibility type reexports in measured order.
4. Move the existing security-module declaration from line 111 to a blank line 18;
   the program macro remains line 36, column 1.
5. Remove the root's direct `solana-program = "=2.2.1"` dependency and its root
   Cargo.lock edge; use Anchor's corresponding reexports in lib.rs and codec/wire.rs.
   All other locked package records remain unchanged. No registry code is patched.

The last step changes four inputs only. Its improvement is attributable to ordinary
crate/dependency ownership, not a symbol-order file, linker-script trick, assembly,
output padding, copied target instructions or post-build patching. Full source
maps and exact source diffs are included for each stage.

## Verify and materialize

From the repository root with Python 3.11+:

```sh
P=repro/donation-relay/module-layout-facade-source-proposal
python3 -I -B "$P/verify.py"
python3 -I -B "$P/test_verify.py"
python3 -I -B "$P/verify.py" --variant anchor-facade --materialize work/layout-source-fresh
```

The baseline and each intermediate can also be materialized using `--variant`.
Every state has exactly 60 hash-verified inputs. Existing destinations and unsafe
paths are rejected. Tests cover source mutation, traversal/symlinks, exact source
materialization, the no-ELF/no-receipt default read boundary and the exact dependency
edge change. No captured executable payload, assembly template or ELF artifact enters compiler inputs.

## Portable local compilation recipe

Use the official **Linux x86_64 Anza platform-tools v1.48**, including its target
libraries. The release URL is
<https://github.com/anza-xyz/platform-tools/releases/download/v1.48/platform-tools-linux-x86_64.tar.bz2>.
The observed archive SHA-256 is
`a9d3157f937d5f6faf4321a35a8035e0f827114a663b0150db492e893ec27597`;
this is an observed pin, not a publisher signature. Authenticate and prepare the
SDK separately. Use a Cargo registry cache containing all **253 locked public
packages**, with archives and extracted inputs verified against `Cargo.lock`.
Do not copy original program files into the source tree or use them as compiler
inputs. Native dependency build scripts/proc macros will execute during a build.

Set absolute paths for `SDK`, `CARGO_CACHE` and `SOURCE` below. `OUTPUT` must be a
new directory outside `SOURCE`. The fresh target avoids stale root artifacts;
keep the existing release profile (`overflow-checks=true`, `lto=false`,
`codegen-units=1`, `panic="abort"`) and default features unchanged.

```sh
SDK=/absolute/path/to/platform-tools-v1.48
CARGO_CACHE=/absolute/path/to/checksummed/cargo-home
SOURCE=/absolute/path/to/layout-source-fresh
OUTPUT=/absolute/path/to/new-layout-build
[ ! -e "$OUTPUT" ] && mkdir -p "$OUTPUT/home" || exit 1
cd "$SOURCE"
env -i \
  PATH="$SDK/rust/bin:$SDK/llvm/bin:/usr/bin:/bin" \
  HOME="$OUTPUT/home" CARGO_HOME="$CARGO_CACHE" \
  CARGO_TARGET_DIR="$OUTPUT/target" CARGO_NET_OFFLINE=true \
  CARGO_TERM_COLOR=never CARGO_BUILD_JOBS=3 \
  CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=-Zremap-cwd-prefix= \
  RUSTC="$SDK/rust/bin/rustc" RUSTDOC="$SDK/rust/bin/rustdoc" \
  CC="$SDK/llvm/bin/clang" AR="$SDK/llvm/bin/llvm-ar" \
  OBJDUMP="$SDK/llvm/bin/llvm-objdump" OBJCOPY="$SDK/llvm/bin/llvm-objcopy" \
  LANG=C.UTF-8 LC_ALL=C.UTF-8 \
  "$SDK/rust/bin/cargo" rustc --release --target sbpf-solana-solana \
  --locked --offline --verbose --manifest-path "$SOURCE/Cargo.toml" --lib \
  -- --remap-path-prefix=src/=programs/contracts/src/ \
  >"$OUTPUT/build.log" 2>&1 || exit 1
SYMBOLS="$OUTPUT/target/sbpf-solana-solana/release/donation_relay_source_proposal.so"
"$SDK/llvm/bin/llvm-objcopy" --strip-all "$SYMBOLS" "$OUTPUT/candidate.so"
```

Require the actual root `rustc --crate-name donation_relay_source_proposal`
invocation in the verbose log. Recheck all source and locked registry input
hashes before and after compilation. This recipe does not download dependencies,
install tools or establish an OS network/filesystem sandbox. Local observations
used root-clean dependency-cache reuse; a fresh all-dependency build at relocated
paths must be checked independently rather than assumed identical. Never repair
an output-hash discrepancy by copying or patching an archived binary.

## Optional local remeasurement

This mode requires your independently produced local outputs for all six stages,
not downloadable artifacts from this packet. Under `/path/to/local-layout-builds`,
place each variant's stripped/symbol outputs at
`<variant>-build01/{candidate.so,symbols.so}`. The captured original, parser and
original-window inventory come from their hash-pinned public repository paths:

```sh
python3 -I -B "$P/verify.py" --repo-root /path/to/pumpfun-source \
  --verify-local /path/to/local-layout-builds
```

The optional checker rehashes all inputs, recomputes normalized/raw match sets,
full section comparisons and allocated stripped/symbol equality, and compares
all source-stage gains/losses. The earlier security-order expansion-index check
is retained, with duplicate alternatives explicitly not interpreted as uniqueness.
It consumes no replay/build receipts and makes no runtime claim.

Final local hashes, provided only as checks:

* Stripped: `b2b16a5c4182f04da1d20ade6ac5e35f6066f16ad2fa4c706dd48bae28982589`
* Symbols: `fc2190e9943d3f26252996402ec838321dac58339462a205b3fcb3d1f7b4b5ba`

The parser masks only established call displacements and relocated pointer
immediates—not registers, opcodes or stack offsets. The remaining 321 `.rodata`
and 677 `.data.rel.ro` positional mismatches are not claims to measure semantic
closure. Overall byte-identical completion remains unestablished.
