# Fees Crank: preserve ArithmeticOverflow on native donation credit

`CrankDonationFeePda` currently adds native excess lamports with Rust `+=`.
When the destination ATA has insufficient `u64` headroom, the rebuilt program
panics and returns `ProgramFailedToComplete`. The captured original returns
`ArithmeticOverflow` with the corresponding ordinary ProgramError diagnostic.

The new source change is one line in `donation.rs`: use Anchor 0.31.1's
`Lamports::add_lamports(excess)?`. Its checked addition returns the same error
instead of aborting. There is no custom error number, ELF rewriting, original
code copying, compiler tuning, dependency change or layout adjustment.

These are **offline synthetic extreme-balance cases**. The account balances do
not establish economically reachable mainnet states. This is a reconstruction
error-contract correction, not an exploit, fund-loss or security-severity claim.

## Source provenance and overlap

All variants contain 42 pinned source inputs. `baseline-sources.json` addresses
the exact public Git blobs, and `source-inputs.json` seals each full composition.

| Variant | Source |
| --- | --- |
| baseline | PR195's composition at `74a1f5887941b70a48a63b64cf72266e92ab9342`, plus the public instruction-module recovery at `f7fcc2f063f977ea811ef843733a9a6cb78394be` (553 windows) |
| control | Same 41 inputs plus PR197's exact `donation.rs`, including its three diagnostic corrections |
| proposal | Control plus only the checked destination credit |

PR197 deliberately tested its diagnostics on an older 550-window composition.
Here they are preserved unchanged on the 553-window source and independently
rebuilt before comparing the new arithmetic change. The disabled/empty/total
diagnostics and existing normalized matches belong to those prior contributions.
`control.patch` makes that integration explicit; `proposal.patch` is the new fix.
The PR queue was checked again after #195 and #197 merged; no open PR duplicated
this checked-credit correction at preparation time. The later visibility recovery
is included unchanged; it does not modify the Crank handler.

Immediately before publication, Shaw opened PR201 for native-only Crank work and
account lifetime ordering. Its exact head `bafc0a87df612e5b99849e2ab72159eafdcaf467`
still uses the unchecked destination `+=`. Two fresh local comparisons against
its retained ELF confirm exact-boundary success and the same overflow error/log
mismatch (`pr201-overlap.json.gz`). This is complementary to PR201, not a claim
of its native-flow recovery. `pr201-followup.patch` shows the one-line placement
on that source; do not replace its function with this packet's older whole-file
override when composing the fixes. That combined source is **not** built or
validated here. PR200's separate AdminCto body proposal also remains uncomposed.
PR202 concerns the instruction-module recovery already included in this baseline.

## Local results

The focused harness executes the captured original, rebuilt control and rebuilt
proposal in separate LiteSVM instances, using normal verification of test-owned
signatures. Captured SPL Token, ATA and Relay programs run as external dependencies.

| Check | Result |
| --- | --- |
| Focused cases | 76; control differs in 15 overflow cases; proposal differs in 0 |
| Overflow rollback | Donation PDA and ATA snapshots unchanged after each failed transaction |
| Existing handler suites | 17,331 cases across 18 suites, zero reported mismatches |
| Persistent creation/deposit/crank sequence | 10 steps, 20 signed original/proposal transactions, zero mismatches or errors |
| Independent all-dependency proposal rebuild | Identical stripped and symbol ELF hashes |

The 76 cases include a 6×6 destination-headroom/excess matrix, exact-boundary
success, one-unit overflow, disabled-before-credit precedence, native source
maximum, nonnative maximum and total-counter overflow, plus existing small
amount, malformed account and flag controls. In all 15 reproduced failures the
control differs only in `error` and `program_logs`; the proposal matches all seven
listed fields. Identical signed transaction bytes, tracked before/after account
snapshots, inner instructions, errors, program logs and emitted data are compared.
Raw VM logs and their compute observations remain stored but compute usage,
timing and untracked accounts are outside this comparator. Existing 18-suite
comparators retain their own narrower predicates; their pass count is not a
claim of exhaustive log or behavioral identity.

Static analysis retains **553 normalized original counterparts, 118 raw-local
counterparts, 406 unique structural pairs and 163 equal Location uses** at every
stage. All 3,255 direct-edge observations remain, including the 15 previously
unequal callee shapes. No normalized/raw inventory or previously equal callee
edge is lost. The SyncNative packing body and incoming discriminant17 branch
remain separately checked. **Crank's complete body remains unmatched**, with
32 unmatched original windows overall. Whole meaningful ELF/capture equality
remains false. Positional differing bytes are 465,329 → 456,375 → 456,603: the
checked-credit proposal worsens that separate metric by 228 bytes. Neither counts
nor reduced file size prove whole-program identity or historical source recovery.

The proposal is 870,680 bytes, SHA-256
`81bf72391551d076b9af8a3d7d90faa61afb7052372a106c7cb8bf8e7ba9b2d2`.
The fresh baseline reproduces the visibility recovery's stripped and symbol hashes exactly.
Baseline and repeat use empty dependency targets; control and proposal rebuild
the root and local math crate with verified dependency caches. All 252 locked
registry archives and extracted source files were checked before and after each
build. Compiler containers use an empty environment, no network and read-only
source/SDK mounts. The original binary is never mounted in the compiler.

## Reproduce

Python 3.11+ and the complete public Git history are needed for source integrity.
Default verification hashes and checks the recorded observations; it does **not**
run a compiler or VM. Full local observations, output artifacts and compiler logs
are retained separately, rather than treated as proof of a new execution.

```sh
P=research/fees-crank-lamport-overflow
python3 -I -B "$P/verify.py"
python3 -I -B "$P/verify.py" --variant control --materialize /fresh/control
python3 -I -B "$P/verify.py" --variant proposal --materialize /fresh/proposal
```

Use the official Linux platform-tools v1.44 SDK and a verified v1.48 strip SDK,
the pinned Docker image and locked registry cache. The build driver verifies
tool hashes and locked archives/extracted sources before running build scripts.
Its explicit `env -i`, source mappings and exact compiler/strip commands are in
`build.py`; original executed commands and paths are in `builds/*/launch.json`
and `recorded-tools/`. Tool acquisition is outside the offline build:
the v1.44 archive hash is recorded in `provenance.json`.

```sh
python3 "$P/build.py" control --source /fresh/control --fresh \
  --work /fresh/build-work --sdk /sdk/v1.44 --strip-sdk /sdk/v1.48 \
  --cargo-home /verified/cargo-home
python3 "$P/build.py" proposal --source /fresh/proposal --fresh \
  --work /fresh/build-work --sdk /sdk/v1.44 --strip-sdk /sdk/v1.48 \
  --cargo-home /verified/cargo-home
```

For fresh execution install `solders==0.27.1`, `pyelftools==0.32` in an isolated
Python environment. The scripts do not send live transactions or disable
signature verification.

```sh
python3 -I -B "$P/boundary.py" \
  --control /fresh/build-work/builds/control/candidate.so \
  --proposal /fresh/build-work/builds/proposal/candidate.so \
  --output /fresh/boundary.json.gz
python3 -B scripts/fees_validate_all.py \
  --candidate /fresh/build-work/builds/proposal/candidate.so \
  --output /fresh/full-validation.json
python3 -B scripts/fees_donation_sequence.py \
  --candidate /fresh/build-work/builds/proposal/candidate.so \
  --output /fresh/sequence.json
```

Materialize/build `baseline` too for the complete three-stage static comparison:

```sh
python3 -I -B "$P/static.py" --builds /fresh/build-work/builds \
  --output /fresh/static.json.gz
```

No selected sources, checkpoints, prior artifacts, existing harnesses or workflows
are replaced. This additive packet preserves the negative control and the source
proposal for review; it does not promote a selected release.
