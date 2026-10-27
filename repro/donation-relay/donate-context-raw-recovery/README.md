# Relay: three additional raw-equal bodies from a context type name

On the merged [PR189](https://github.com/lalalune/pumpfun-source/pull/189) source,
define the shared donation context as `DonateContext` and retain
`DonationContext` as a public compatibility alias. This one-file ordinary-source
change recovers **three complete raw bodies**, raising raw local matches
**317 → 320**, with **492/492 normalized windows retained and no losses**.

This is a compiler-layout reconstruction hypothesis, **not recovery of the
historical identifier**. The shorter, donation-specific type name changes the
compiler-generated drop symbol's ordinary ordering relative to the BTreeSet
drop function. Their original addresses and the shared worker's actual call
displacements are then reproduced. There is no linker-order file, symbol export
override, assembly input, injected target instruction, padding or output patch.
The alias preserves existing callers and the Rust field layout and business
expressions are unchanged. The source patch is five added/changed lines.

## Reproduced gap and result

The baseline was independently compiled and exactly reproduced PR189's
`0486b905…` stripped output. Its context/BTreeSet cleanup bodies are reversed:
the context begins at 33,872 instead of original 33,384, and BTreeSet cleanup
begins at 33,384 instead of 33,912. The worker therefore calls a different
address even though all normalized instruction bodies already match.

| Original ordinal | Body | Original / corrected address | Complete raw-equal bytes |
| --- | --- | ---: | ---: |
| 51 | Shared donation context cleanup | 33384 | 528 |
| 52 | BTreeSet cleanup | 33912 | 488 |
| 112 | Shared donation worker | 131136 | 10248 |

All **60 direct-call sites** across these bodies have complete normalized
callee matches and recursively closed direct-call shapes. This does not imply
that every callee or referenced object is raw-equal. The three gained bodies
have no indirect instructions; they reference 36 data operands whose full
object extents are not established by this comparison.

| Measure | PR189 baseline | This candidate |
| --- | ---: | ---: |
| Raw local windows | 317 | 320 |
| Normalized windows | 492 | 492 |
| Common-position file differences | 18623 | 18126 |
| `.text` differing bytes | 18453 | 17958 |
| `.rel.dyn` differing bytes | 139 | 137 |
| Stripped ELF bytes | 818280 | 818280 |

Only `.text` and `.rel.dyn` change relative to the baseline. All other sections
are unchanged. The complete 19,863-byte `.rodata` stays equal to the original.
The existing positional data audit still checks 359 pointers and 507 nonpointer
qwords; five referenced text targets contain indirect calls. Raw `.data.rel.ro`
still differs at 25 positions, `.dynsym` at four, and ELF headers at two.

## Local validation performed

* Baseline root build: exact PR189 stripped and symbols hashes reproduced.
* Candidate root-clean build with dependency-cache reuse, then a **fresh
  all-dependency build** in a separate target directory: both output pairs
  identical. The fresh build checked all 253 locked registry archives and their
  extracted files before and after compilation, and all 60 sources were unchanged.
* Compilation used official Anza platform-tools v1.48, the pinned
  `solanafoundation/solana-verifiable-build` image, an explicit clean environment
  and `--network none`. Original program bytes were never mounted in the compiler
  container. Only the standard `llvm-objcopy --strip-all` was applied afterward.
* Fresh local LiteSVM replay: **536/536 saved signed records, 534 unique fixtures,
  zero differences**, and all 536 original outcomes reproduced. Existing
  comparator exclusions are unchanged. No live transaction was submitted.
* Optional remeasurement tests reject an actual changed CALL displacement even
  though the normalized instruction shape masks that operand. Both local ELF
  copies are mutated only in a temporary negative-control directory.

`local-validation.json` records local results and receipt hashes, not the full
runtime receipts. The complete build logs, executable outputs, failed earlier
experiments and signed replay receipt are preserved in the contributor's local
workspace. They are not downloadable runtime proof in this packet. The default
verifier checks source integrity only; it does not execute a compiler or VM.

## Reproduce

Requires Python 3.11+, Git with the pinned public commits, Linux/Docker, official
v1.48 tools and all 253 checksum-pinned registry packages prepared separately.
The exact tool/image pins and isolated build environment are in `build.py`.
Its workspace must contain `sdk/` (extracted official tools) and `cargo-home/`
(Cargo's registry cache). Downloads/installations are not performed by it.

```sh
P=repro/donation-relay/donate-context-raw-recovery
export RELAY_BUILD_WORKSPACE=/absolute/path/to/new-relay-workspace
python3 -I -B "$P/verify.py"
python3 -I -B "$P/verify.py" --variant baseline --materialize "$RELAY_BUILD_WORKSPACE/baseline-source"
python3 -I -B "$P/verify.py" --materialize "$RELAY_BUILD_WORKSPACE/candidate-source"
python3 -I -B "$P/build.py" baseline --fresh
python3 -I -B "$P/build.py" candidate --fresh
python3 -I -B "$P/verify.py" \
  --baseline-build "$RELAY_BUILD_WORKSPACE/builds/baseline" \
  --candidate-build "$RELAY_BUILD_WORKSPACE/builds/candidate"
python3 -I -B "$P/test_verify.py" \
  --baseline-build "$RELAY_BUILD_WORKSPACE/builds/baseline" \
  --candidate-build "$RELAY_BUILD_WORKSPACE/builds/candidate"
```

The build runner refuses existing output directories, serializes shared-target
access, validates the SDK and registry inputs, inventories all sources and saves
the complete command/environment plus actual verbose compiler log. It accepts
`--source /absolute/path` for separately materialized sources. Follow the
[upstream SDK preparation/recipe](../module-layout-facade-source-proposal/README.md#portable-local-compilation-recipe)
without changing locked dependencies, default features or release profile.

For the same bounded replay, from the repository root with an isolated Python
environment containing `solders==0.27.1`, `pyelftools==0.32`, `jsonalias==0.1.1`
and `typing_extensions==4.16.0`:

```sh
python -B repro/donation-relay/shared-worker-artifact-recovery/replay_saved.py \
  "$RELAY_BUILD_WORKSPACE/builds/candidate/candidate.so" \
  "$RELAY_BUILD_WORKSPACE/builds/candidate/replay.json.gz"
```

The executed local sequence used `build_trial.py` (the same build implementation
with a fixed workspace path) for `wrappers492-v1`, `donate-context`, and
`donate-context-fresh --fresh`; fresh replay used the `donate-context` output,
which is byte-identical to the fresh build. The optional verifier remeasures
the fresh output against `wrappers492-v1`. `expected.json` binds all inventories,
section comparisons, gained-body bytes/callees and the complete data-graph digest.

Final hashes:

* Stripped: `5c7468bc4915e54108f6a2ff30cf7fe237870ef54ad597c6f987ff19325a15ca`
* Symbols: `c9d2d4ffd40f5c6915db5fd416ea01a19fb3252b3c6ea5b0b1e7bcf0c33c4742`

## Limits and scope

**Whole-file equality remains false.** The captured original is 830,448 bytes,
including 12,168 allocation-tail bytes beyond the meaningful ELF. The candidate
still has 18,126 different common positions. Window counts are not a percentage
of semantic correctness or remaining effort. Historical source identity,
indirect/data semantics, protected relayer settlement success and exhaustive
allocator/borrow behavior remain unproved. Passing replay is bounded evidence.

PR189 owns the four wrapper recoveries; none is claimed again here. This packet
adds only the subsequent naming/layout hypothesis and three raw-body gains.
Originals, selected checkpoints and all previous evidence are unchanged.
