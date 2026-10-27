# Epoch close: source-only recovery proposal

Ordinary Rust source recovers complete original window **96** (4,000 bytes), advancing the isolated baseline from **483 to 484/492 normalized windows (98.37%)**, retaining **130 raw local-body matches** with no losses. This is normalized instruction-window coverage, **not whole-binary identity**.

## Published scope and limits

Only readable source, patches, source-input hashes, static verifier/tests and a compiler recipe are included. There are no program artifacts, compressed or encoded binary payloads, replay cases, or archived replay derivatives. Local source builds and fresh offline replay were performed, but archived replay publication is blocked. This packet is **not self-contained or downloadable replay proof**; its default verifier reports `runtime_verified=false`.

Protected relayer settlement success is not dynamically covered. Complete relocated-data extents, indirect behavior and arbitrary-state equivalence remain unproved. No selected checkpoint is promoted; no original instructions, register masks or post-build byte patches are compiler inputs.

## Source boundary

* Cache the state epoch before reading/checking the gross amount, then compare the cached state epoch on the left of the wire epoch.
* Build the CPI with `CpiContext::new(...).with_signer(...)` and one nested signer array with its bump byte inline.
* Increment using the appended inherent `EpochTrackerV1::increment(&mut self) -> Result<()>` method. Existing checked arithmetic/error semantics and earlier source coordinates are preserved.

Only `src/settlement_handlers.rs` (the close-epoch prefix) and `src/state/v1/epoch_tracker.rs` change from the 483-window baseline. Later settlement bodies remain unchanged.

The materializer calls the already-published security-metadata parent's `sources()` to reconstruct its **before-metadata** 482-window source state, pinned through `parent-inputs.json`. Small ordinary-source `baseline_overrides` reconstruct this proposal's immediate baseline; `recovered_overrides` apply only the isolated change. All three complete 56-input maps are pinned in `source-inputs.json`. This works without any unmerged proposal or new binary snapshot.

`source.patch` is recomputed exactly between the immediate baseline and recovered source. Source text is a reproducing construction, not proof of unique historical Rust source.

## Verify and materialize

With Python 3.11 or newer, from the repository root:

```sh
P=repro/donation-relay/epoch-close-source-proposal
python3 -I -B "$P/verify.py"
python3 -I -B "$P/test_verify.py"
python3 -I -B "$P/verify.py" --materialize work/epoch-source-fresh
# Optional immediate-baseline source for a separate local build:
python3 -I -B "$P/verify.py" --variant baseline --materialize work/epoch-baseline-fresh
```

Default verification/materialization checks complete source maps, parent pins, exact source patch and manifest without reading program ELF bytes, running a compiler/VM, contacting a network or consuming runtime receipts. Eight tests cover acceptance, forbidden ELF/replay reads, altered source, extra inputs, unsafe names, source symlinks and exact fresh materialization.

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
SOURCE=/absolute/path/to/epoch-source-fresh
OUTPUT=/absolute/path/to/new-epoch-build
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

## Optional comparison of local compiler outputs

Build both materialized source states independently using the same recipe. From the repository root, provide all four local compiler outputs:

```sh
python3 -I -B "$P/verify.py" \
  --baseline-candidate /absolute/path/to/baseline-build/candidate.so \
  --baseline-symbols /absolute/path/to/baseline-build/target/sbpf-solana-solana/release/donation_relay_source_proposal.so \
  --recovered-candidate /absolute/path/to/new-epoch-build/candidate.so \
  --recovered-symbols /absolute/path/to/new-epoch-build/target/sbpf-solana-solana/release/donation_relay_source_proposal.so
```

The supplied ELF files are comparison inputs only, never materializer/compiler inputs. The optional check pins their hashes, recomputes the public 492-window inventory and allocated stripped/symbol equality, proves the gain is exactly ordinal 96 with no losses, and checks all **11/11 direct-callee sites** bind complete normalized-matched bodies. It reports raw whole-file differences and does not verify replay or semantic/data closure.

Expected recovered SHA-256 checks (not binary payloads):

| Object | SHA-256 |
| --- | --- |
| Stripped | `512ff8b6227f39dc17cc9e4665878173864dd2894ebbff1d53017c97fe7f05ab` |
| Symbols | `35af53d284c17b3fb6c72af901bff4c439c58a9592650f0f8408d7f412af2b82` |
| Normalized function | `91e48285074f640df36bdbad9305cac2eb2d87e97c48968adaf607c4e78bd975` |

The pinned parser masks only established local-call displacements and relocated `lddw` addresses, not registers, opcodes or stack offsets. The gained function is not a raw-body match. Overall byte-identical completion remains unestablished.
