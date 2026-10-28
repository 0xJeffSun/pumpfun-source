# Recover the complete AMM multi-hop fee gate helper

An ordinary Rust source change recovers the complete **536-byte / 67-instruction**
original helper at **0x44ab0**. Normal source builds advance this research cohort
from **735 to 736/785 normalized functions**, retaining all **159 raw matches**
and every previous normalized match. The only changed input is
`programs/pump-amm/src/instructions/swap/multi_hop_swap.rs`; `source.patch` and
`proposed/multi_hop_swap.rs` expose the implementation.

This is a source recovery proposal with its reproducible build inputs. Its
research cohort is distinct from the maintained checkpoint's 660-window source
layout; this packet does not change or relabel the maintained score.

## Cause and implementation

The previous wrapper applied three conditional fee pairs directly after `?`.
It emitted separate byte loads and six branches. The original loads the gates
as an aggregate, applies masks, and reads the success/error payloads separately.

The recovery matches the selector result by reference on the successful path,
then calls a pure `HopFeeGates::apply(self, &AppliedFees)` method. Passing the
three-byte gate value across this real helper boundary produces an `i24` load
in optimized LLVM IR. A plain local copy optimizes away and does not do this.
The method selects the LP pair first, then creator and protocol pairs. This
restores the original instruction schedule after inlining. Error propagation,
fee arithmetic and all source line counts are preserved. There is no assembly,
binary patch, forced-inlining attribute, dependency or compiler-flag change.

The intermediate borrowed helper still differed at 24 instruction positions.
A qualified `llc` control reproduced its entire normal function. Changing only
the order of independent LLVM gate calculations established that LP-first
orders reproduce the original schedule. The separate normal Rust source build
then confirmed the whole-function gain. Modified LLVM objects are diagnostic
evidence, not the delivered executable. Rejected source trials and compiler
diagnostic failures are preserved in `rejected.tar.gz`, `compiler/`, and
`controllers/`; the historical status snapshot predates final verification.

## Scope of the static result

`analyze.py` recomputes the complete original-function census, verifies no loss,
and resolves the actual call at offset208. It still targets the reconstructed
`select_and_apply_v2`, corresponding to original **0x14088**. That callee's body
remains unmatched and is unchanged by this patch. The new root contains no
address/data loads. The root's relative call operand is normalized, so this is
**not raw target identity, transitive call closure, or whole-ELF equality**.

## Builds and execution

The baseline is the corrected 735 research source. It imports upstream's H11
incentive guard, which fixes an inherited 128-case boundary regression; neither
that fix nor earlier inverse-fee recoveries are claimed as this contribution.
The earlier 735 artifact with that known regression is not used here.

| Artifact | SHA-256 |
|---|---|
| Original ELF | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |
| Corrected baseline735 | `d7eb57fc57f18b0f6690206d785db576e7c4cd233cca7bdb9c625b443b541ef6` |
| Candidate/repeat736 | `8538bc26ce126d63bf9fbdf0547780e1f893ac2655689a4c4b08c3ef435b20b5` |
| Candidate/repeat with symbols | `86a1414ef62270db1f6267b7f2edac33d0d78f5e82e11532dbd163eaaa50a44f` |

Two normal offline Linux v1.44 builds produce identical stripped and symbol
ELFs. All 54 source inputs are inventoried and all 396 dependency artifacts
remain unchanged. Diagnostic IR captures strip to their corresponding normal
artifacts; their different symbol-bearing outputs are kept separate.
The repeat launch retains a stale narrative hypothesis copied by its controller;
its actual command and all 54 source hashes bind the LP-first candidate. The
unmodified record is preserved rather than silently rewriting that description.

The source-audited local replay exercises **735 multi-hop cases as triples**:
original, corrected baseline, and candidate. It includes one/two/three AMM
routes, captured Pump CPI routes, amount/limit boundaries, fee-table and
transfer-fee boundaries, malformed accounts and signature/permission errors.
There are **2,205 observed transactions, 2,217 verified signature fields, and
306 original successful cases**. Errors, full recorded message-account states,
events, return data and inner instructions agree. There are **157 existing raw
non-compute log differences** against the original in both baseline and
candidate; baseline-to-candidate adds none. Compute identity, exhaustive gate
reachability and whole-program behavior are not established.

The final replay uses a new Python bytecode-cache prefix with writes disabled,
so its imported producer sources are read and hashed. An earlier passing replay
read existing bytecode; its receipts remain separately retained, not retagged.
The observer independently binds each signed transaction, log/error and actual
loaded ELF hash. Synthetic fixtures use local test identities. No live-chain
transaction or deployment is performed.

## Reproduce

Run the saved-evidence audit with Python plus `solders==0.27.1`:

```sh
python -I -B research/amm-hop-gate-recovery/verify.py
```

Materialize the 54 authenticated source inputs in a new directory, then rebuild
with the captured SDK/image and populated offline Cargo inputs:

```sh
python research/amm-hop-gate-recovery/materialize.py /tmp/hop-source
python research/amm-hop-gate-recovery/rebuild.py \
  --source /tmp/hop-source --sdk /path/to/sdk \
  --cargo-home /path/to/cargo-home --target-dir /path/to/build-target \
  --output /tmp/hop-build
```

For a fresh replay, decompress `builds/baseline/candidate.so.gz` to a new
baseline ELF file and use the rebuilt candidate. Choose absent output/cache
paths. The observer verifies signatures and records real program loads:

```sh
python -I -B -X pycache_prefix=/tmp/hop-unused-cache \
  research/amm-hop-gate-recovery/controllers/observer.py /tmp/hop-observed.json.gz \
  research/amm-hop-gate-recovery/replay.py \
  --baseline /tmp/hop-baseline.so --candidate /tmp/hop-build/candidate.so \
  --output /tmp/hop-runtime
```

`builds/*/launch.json` records exact tool hashes, mounts, flags and build inputs.
`controllers/` preserves the original experiment commands, including failed
attempts with historical local paths. `replay.py` and `rebuild.py` provide the
portable entry points; the inventory audit itself does not rerun compilation
or execution. The source recipe and dependency provenance remain bounded by
the existing research cohort rather than proving the historical source.
