# Pump Round34 / AMM643 migration composition replay

The existing Pump migration fixtures normally load the captured AMM even when
Pump itself is replaced. This packet independently tests the published recovered
pair together. Four modes separate each replacement from their interaction:

| Mode | Pump program | AMM program |
| --- | --- | --- |
| original | Captured original | Captured original |
| pump_only | Published Round34 | Captured original |
| amm_only | Captured original | Published quote-guard checkpoint643 |
| both | Published Round34 | Published quote-guard checkpoint643 |

**65 distinct signed-message/before-state inputs, 260 actual executions and 520
independently checked signature fields pass. All 195 comparisons against the
original mode have zero differences.** Thirty-one original inputs succeed;
the remainder exercise failures, including rollback after nested calls.
The original-mode logs contain 161 AMM invocations, including event self-CPIs;
this is not a count of distinct direct Pump-to-AMM calls.

This adds bounded inter-program execution evidence. It does not modify contract
source, recover another function, compile a new candidate or establish whole-ELF
identity. All source-recovery credit belongs to the existing
[Pump Round34](../../repro/pump/main-contract-round34-20261027/README.md) and
[AMM quote-guard](../../repro/pump_amm/quote-guard-recovery-20261027/README.md)
packets. No source-recovery total or selected checkpoint is changed.

## Coverage and observations

The five fixture configurations are legacy migration, V2 native with Token-2022
base, V2 native with Token base, V2 stable with Token quote, and V2 stable with
Token-2022 quote. Each has thirteen profiles: ordinary boost; omitted boost;
readonly boost vault; one remaining account; three existing pool-authority
balances; user balances 0, 2,039,279, 2,039,280 and 2,039,281; disabled AMM
configuration; and the mayhem flag. The flag is a migration input, not a replay
of the recovered Mayhem program. Fees and Mayhem programs are not loaded here.

These are existing synthetic fixture mutations evaluated under a new four-way
artifact composition. They are not claimed as 65 new scenarios against the
upstream corpora. The full migration, other instruction and other-contract
corpora were not rerun on the composed pair. Some errors occur before an AMM
call; successful fixtures and deeper failing calls are retained separately in
the complete results, rather than describing every case as a successful CPI.

Comparisons cover every returned field, account balances/owners/data, errors,
events through raw logs, inner instructions and return data. The only
normalization is upstream's narrow compute-consumption and source-coordinate
log normalization. The before states and serialized signed transactions must
be identical in all four modes. Raw compute/log identity is not asserted.

The three fixture/loader source files are byte-identical to the immutable
Round34 archive. They execute from those physical archived bytes, with logical
`__file__` values under `scripts/` solely to preserve their existing repository
asset lookup. Both paths and the hard-pinned source hashes are recorded and
checked. Current mutable fixture scripts are not imported. The new producer intercepts the loader call
only to select the pinned AMM artifact and observes transaction forwarding.
It refuses signature-verification disablement and verifies both signatures
before forwarding the unchanged transaction. A separate offline verifier
rechecks signatures, all five program selections, mode separation, raw-log
digests, transaction-account snapshots and failure rollback. In particular,
using the original AMM in `both` cannot silently pass as composed coverage.

## Loader and artifact binding

The Pump program is installed through the existing captured upgradeable-loader
adapter, including the captured ProgramData header and allocation length.
The published ELF prefix is unchanged; only the allocation tail is zero-filled
by that adapter. The verifier independently derives each expected ProgramData
image from the pinned ELF and captured header, then checks the image hash
observed after execution. Native fixture loading remains in use for AMM and
Token/Token-2022/ATA, equally in all four modes. This is not complete captured
loader-layout qualification for those dependencies.

- Pump Round34: `908bd16ef0ccdb04e857e86c2de31f36b24a9c6ae77154f7407173823a1d8113`.
- AMM643: `be10ca1a530ef9c62be5c94a5183f339e5d7661dce588a9458767e20a5e488f6`.
- Original Pump: `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`.
- Original AMM: `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`.

The working baseline was upstream `4df2641ad`. The sixteen recorded repository
reads bind both fixture scripts, captured loader implementation and captures,
fixture state, IDL, dependencies and candidate artifacts. Inputs were checked
again after the run. Existing originals and sealed evidence are untouched.

Before starting, the current ownership queues and PRs were reviewed. Main
Pump/AMM remaining source windows were assigned. The final 16:51 UTC PR review
found #289 (Fees frame/inlining research) and #290 (Mayhem portable builds) open.
This packet does not compete for those source implementations and no
coordination comment was posted.

## Reproduce

Use Python3.12 and the repository requirements (Solders0.27.1). From the root,
run the saved-evidence verifier and its eight actual rejection controls:

```sh
python -B research/pump-amm-migration-composition/verify.py
python -B research/pump-amm-migration-composition/test_verify.py
```

Fresh VM replay requires a new output directory outside the checkout and a
unique absent bytecode-cache prefix, so existing bytecode cannot suppress
fixture source-read receipts:

```sh
PYTHONPYCACHEPREFIX=/tmp/migration-composition-new-cache python -B \
  research/pump-amm-migration-composition/probe.py \
  --output /tmp/migration-composition-new
python -B research/pump-amm-migration-composition/verify.py \
  --reports /tmp/migration-composition-new
```

The completed local run's exact interpreter, argv, cwd, cache prefix, start/end
times and exit code are in `results/command.json`; per-input outcomes and
completion are in `results/run.log`. Runtime is recorded in the report and is
not a benchmark claim. An initial
pre-execution attempt hit a Python module-name collision with `scripts/compare.py`.
The helper was given the unique name `composition_compare.py`, and the whole
run was executed in a new directory. A passing 65-input root-import run was
then superseded by a complete fresh execution using the immutable archived
sources. That failed attempt, the root-import run and an earlier ten-input
exploratory run are preserved in local work records; none is added to the
accepted execution totals here.

Rejection controls cover an original dependency mislabeled as composed,
swapped mode receipts, a corrupted real signature with a consistent digest,
a wrong captured ProgramData image, changed user balance, omitted fixture
source, unlisted files and Python `-O`. No VM, compiler or network is invoked
by the saved verifier or these controls. Synthetic accounts and owned fixture
keys are used only locally; no current-chain acceptance or safety claim follows.
