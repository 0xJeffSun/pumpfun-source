# AMM buyback helper reconstruction

This published research packet does not promote canonical source or replace
the selected owner6048 artifact.

The final reconstructed Rust build adds one complete normalized body match:
original `[412888,413216)` now corresponds to the328-byte emitted
`GlobalConfig::split_buyback` at67480. Of785 original inferred windows,93 have a
raw body match,396 additional windows match after the documented direct-call and
ELF relocation mask, and296 remain unmatched. All488 previous normalized matches
and all93 raw matches are preserved. This is489 total normalized matches, not489
raw matches and not whole-ELF equality.

`python3 -B verify.py` checks every losslessly compressed input, compiled source
bindings, whole artifact identities, independently recomputed full-window sets,
helper/callee bodies, known panic data, previous Location positives, and signed
runtime receipts. It requires Python with `solders` (observed0.27.1) for signature
verification. No compiler or VM runs. `python3 -B mutation_tests.py` checks rejection
of rehashed source/artifact tampering, false window counts, runtime-value changes,
and invalid signatures.

## Artifact identities

| Artifact | SHA256 |
| --- | --- |
| Original capture | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |
| Exact reproduced baseline | `09bee0dfd751dc6ae0240bbac262933c6bda6e0c94aa643f82c57f2956c3a117` |
| Final reconstructed candidate | `e6a687e8d8fd1152cd2113af5aa1c5e13e0d36eb4ca362cfb641fac23d5359dd` |
| Final symbols | `de6c3ac93f6b7272d7ad5c028e280809ba52e79b5a38b7d96a651202449bc647` |

The unchanged baseline first reproduced both full selected candidate and symbols
exactly using isolated native v1.44 compiler/cache/registry/SDK/rustup copies.
Both baseline and final builds have exit0 and zero backend diagnostic errors.
Their actual commands, logs, source30 manifests and fingerprints are retained.

## Source recipe and explicit nonhistorical layout

The change extracts the existing buy/sell buyback arithmetic into a public method
on publicly reachable `GlobalConfig`, with an early Mayhem return. The method
loads its basis points only after that guard. The original328-byte body has that
receiver load, branch ordering and common result layout. The first private-method
probe was336 bytes because LLVM promoted its receiver to a scalar. Public type
reachability restores the pointer ABI; early return restores complete normalized
instruction equality. No assembly, compiler intrinsic barrier, inline attribute,
extern export, or emitted-byte patch is used.

This is reconstructed source, **not a claim of historical source text**. Its
`state/global_config.rs` intentionally contains345 documented spacer/comment lines
after the existing setter methods and indentation positioning. These reproduce
the measured conversion Location at388:45 and subtraction Location at391:14
without inventing missing code. Earlier setter line numbers remain unchanged.
A conditional root-crate rustc wrapper adds exactly
`--remap-path-prefix=src/=programs/pump-amm/src/`; dependency invocations receive no
new argument. The original `-Zremap-cwd-prefix=` remains unchanged. The wrapper and
actual root compiler arguments are separate recorded recipe inputs.

The method's35- and38-byte panic messages match raw bytes. Its two decoded
Location file/line/column triples match exactly. The pointer-bearing Location
records and Debug vtable match only under their declared relocations; their raw
bytes differ. All51 pre-existing recognized Location observations survive, and
the two helper Locations add two for53. The scan recognizes complete Location
structures with plausible Rust path/line/column fields; it is not a global proof
of every data object's type or consumed extent.

Four direct helper callees have complete normalized body correspondences.
Original `__multi3` and `expect_failed` are also raw matches; other referenced
pointers and transitive data remain separate obligations. Original three caller
bodies belong to buy, buy-exact-quote, and sell. The reconstructed candidate has
two direct callers because it shares one legacy-buy routine behind an `exact`
boolean. Complete neighborhoods for all original and current callers are retained.

## Runtime evidence

The unchanged trusted legacy-buy suite includes both buy modes and1011 cases;
legacy-sell contains575. Both the exact baseline and final candidate pass all1586
synthetic-state cases with no compared-field mismatches. Each build's3172 signed
transactions are independently signature-verified by the existing observer and
again by this package verifier. Comparisons include errors, account bytes,
lamports/owners, events, inner instructions, return data, and transaction bytes;
diagnostic logs are excluded by the unchanged suites. This does not establish
exhaustive behavior, live acceptance, or whole-ELF identity. Stopped executions
are excluded.

## Reproduction

All153 logical evidence objects are losslessly gzip-encoded and listed in
`manifest.json` with both logical and compressed hashes. Sources for baseline and
final contain all30 recorded compiler inputs; no whitespace-sensitive file relies
on Git attributes. `materialize.py --variant final --output NEW_DIRECTORY` restores
source, original reference, builder scripts and wrapper without executing them.

Use separate owned native copies of the pinned v1.44 tools, v1.52 stripping tools,
SDK53, stable host rustup toolchain, and locked registry. Set private HOME,
RUSTUP_HOME, CARGO_HOME and CARGO_NET_OFFLINE=true. The actual build command is in
`builds/final/launch.json.gz`; resolve its paths to the restored tree, set
RUSTC_WRAPPER to the restored root_remap.py, then run the unchanged
build_partial_candidate.py with `--tools-version v1.44`, artifact name
`pump_amm_recovered.so`, and the complete vendored solana-pubkey extra input.
Do not install tools, edit shared caches, or alter the target/optimization flags
when attributing source changes. Baseline reproduction is the first gate.

Whole captured-file equality, whole meaningful-ELF equality, raw helper equality,
raw pointer/data identity, and original source identity remain false or unresolved.

The materializer also restores the builder’s transitive `analyze.py` import. Its import-only `--help` preflight is checked without starting a compiler. Verification binds ordered direct callees, the captured original, the decoder and exact package membership.
