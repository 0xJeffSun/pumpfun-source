# Independent AMM pool preparation boundary replay

The published transfer/entrypoint checkpoint already prepares and funds a short
pool before checking its sweep recipient. This packet independently exercises
that public correction at one-lamport boundaries and across eleven instruction
families. It adds no source recovery, function match or selected checkpoint.
Recovery credit belongs to the upstream
[resize-order finding](../../repro/pump_amm/source-abi-recovery-20261027/followup/resize-order/)
and [transfer/entrypoint recovery](../../repro/pump_amm/transfer-abi-recovery-20261027/README.md).

| Fresh signed local replay | Cases | Original/candidate differences | Original successes | Verified signatures |
| --- | ---: | ---: | ---: | ---: |
| Historical 640-window candidate, rent/recipient boundaries | 108 | 16 | 20 | 216 |
| Transfer checkpoint 642, identical rent/recipient boundaries | 108 | 0 | 20 | 216 |
| Transfer checkpoint 642, account-length/funding boundaries | 858 | 0 | 336 | 1,872 |
| Newer quote-guard checkpoint 643, identical rent/recipient boundaries | 108 | 0 | 20 | 216 |
| Newer quote-guard checkpoint 643, account-length/funding boundaries | 858 | 0 | 336 | 1,872 |

The old candidate skips sixteen direct AMM-to-System funding invocations:
24 original calls versus 8 candidate calls in the rent matrix. Both newer
candidates have all 24. Every recorded field is compared: errors, account state,
events, inner instructions, return data and logs. Only the inherited narrow
compute-consumption and source-coordinate log normalization is applied.
No raw-log, compute-budget or complete-ELF identity is asserted.

## What is new

The 108-case roster crosses two sweep instructions, pool lengths 243/286/287,
valid/bad/zero recipients, pool balances 2,888,399/2,888,400/2,888,401 and payer
balances 5,000/5,001. The 287-byte rent minimum is checked against Solders Rent.
Bad-recipient cases deliberately mutate synthetic state; they do not establish
reachability from deployed global state.

The separate 858-case roster crosses eleven instruction families, thirteen
pool lengths (241, 242, 243, 244, 245, 270, 271, 278, 279, 285, 286, 287, 288),
two pool balances (1 and 2,888,400) and three payer balances
(5,000, 5,001, 1,000,000,000). For the two-signature admin instruction, the low
payer cases also exercise transaction fee rejection; not every case enters the
AMM handler. Both successes and failures remain in the receipts.

`producer.py` is upstream's frozen expanded-160 producer with exactly one change:
an explicit requested length now pads with zero bytes as well as truncating.
The previous truncation-only operation could label a 287-byte fixture as a
288-byte test. The new probe and saved-evidence checker require the actual
before-state length and balances to equal the roster. This packet's 858 results
were executed after that correction; the earlier exploratory run is not used.
The observer and normalizer are byte-identical upstream copies.

Within each matrix, every signed-message-plus-before-state pair is distinct.
The historical/newer matrices intentionally repeat inputs; the two new
matrices and inherited corpora may overlap. Do not sum these counts as unique
scenarios or infer exhaustive behavior.

## Exact artifacts and scope

The first three runs used repository `6e18864f1`; the additional two ran after
rebasing onto `abd5ba205`. The fixture/program read receipts bind the exact
inputs on both checkouts. Artifacts are pinned, not a moving latest-main claim:

- Captured original AMM: `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`.
- Historical source/ABI candidate: `e995d6a8211dcd3d05c07cdcb1a7147ec4f4e2b2a81b56c268fd1a3d76a01ce1`.
- Transfer/entrypoint candidate: `3fcae02128464717b29a0b3842fbba993d5d0befb4362c4094c8af8e32a8589d`.
- Quote-guard candidate: `be10ca1a530ef9c62be5c94a5183f339e5d7661dce588a9458767e20a5e488f6`.

This is fresh VM execution of the published artifacts, not fresh compilation.
The [643 checkpoint](../../repro/pump_amm/quote-guard-recovery-20261027/README.md)
has 643/785 normalized windows, 148 raw bodies and 804,704/1,162,040 matched text
bytes, all credited to upstream. The other 142 windows, complete code/data/
relocation identity and historical provenance remain open. Checkpoint 642's
separate
[11/21 reserved-recipient differences](../../repro/pump_amm/transfer-abi-recovery-20261027/followup/reserved-accounts/REPORT.md)
are outside this matrix. Upstream reports those corrected in checkpoint 643;
this packet does not independently rerun that separate reserved-account suite.
The 642 results must not be read as eliminating that checkpoint's known gap.

An independent local compilation of the older public sweep-order proposal was
completed during this investigation, but upstream integrated that correction
before submission. That superseded experiment is not presented here as a new
patch or as compilation evidence for either newer artifact.

The public PR review at 2026-10-27 16:02 UTC found open work on AMM harvest
(#281), Fees extension (#278), and Mayhem recovery (#276/#277/#279/#280/#282).
None proposed this boundary roster. No coordination comment was posted and no
ownership of their implementation scopes is claimed.

## Reproduce and verify

Use Python 3.12 with the repository requirements (`solders==0.27.1`). The
recorded runs used an existing environment on local Linux/WSL. No chain endpoint,
downloaded candidate, signature bypass or live transaction is used.

From the repository root, the saved-evidence check does not run a VM:

```sh
python -B research/amm-pool-preparation-boundaries/verify.py
python -B research/amm-pool-preparation-boundaries/test_verify.py
```

For fresh signed executions, choose an absent output directory outside the
checkout. The runner supplies a separate, initially absent Python cache prefix
per matrix so imported fixture source reads cannot be skipped by existing
bytecode. It records exact argv, working directory, timestamps, exit status and
stdout/stderr for each process.

```sh
python -B research/amm-pool-preparation-boundaries/replay.py \
  --output /tmp/amm-boundaries-fresh
python -B research/amm-pool-preparation-boundaries/verify.py \
  --reports /tmp/amm-boundaries-fresh
```

The first recorded invocation used `replay.py`'s original three-run roster with
`/home/ahi200/pumpfun-work/20261028-amm-preparation-boundaries` as output and
`/home/ahi200/pumpfun-work/20261027-fidelity/runtime-venv/bin/python` as interpreter.
The additional invocation used `--only-643 --output
/home/ahi200/pumpfun-work/20261028-amm-preparation-boundaries-643` with the same
interpreter. The expanded default runner now executes all five matrices.
Per-matrix `results/*/command.json` and `command.log` retain exact commands and
results. Absolute paths in receipts are provenance, not replay prerequisites.

The verifier checks the complete packet inventory, exact upstream program and
source hashes, roster and actual input state, equal signed messages/before
states, all signatures independently, loaded program digests, raw-log digests,
failure pool rollback, nested AMM-to-System invocation counts and recomputed
differences. It requires the sixteen historical counterexamples and zero
differences on both newer artifacts. Eight rejection controls cover tampered
signatures, mislabeled lengths, substituted artifacts, omitted inputs, false
baseline success, undeclared files, hash changes and Python `-O`.

Existing originals and sealed upstream evidence are only read. All output here
is additive. VM receipts are observations under local fixture assumptions,
not proof of live-chain safety or complete behavioral equivalence.
