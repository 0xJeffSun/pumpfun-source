# Signed outcome witnesses for the final PumpSwap selector + H11 candidate

This verification-only packet strengthens the runtime evidence for the final candidate published
by [PR #436](https://github.com/lalalune/pumpfun-source/pull/436). It does not change Rust source,
recover a function, rebuild an executable, or claim the already-integrated H11 guard as new work.

The exact executed artifacts are:

- captured original: `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`
- final #436 candidate: `e708c278cdda90f08f0aafb8739d857c69b5878bca78ab16d62af820ca3c7231`
- #436 qualification: 760/785 normalized windows and 159 raw-equal windows

The candidate is decompressed from #436's already-published build artifact and hash-checked before
execution. No compiler or dependency cache is included.

## Distinct verification property

PR #436 correctly verifies 17,462 original/candidate behavior pairs and independently checks their
signed transaction sidecars and executable hashes. Its broad-suite audit explicitly notes that most
account-state receipts are not individually joined to transaction bytes. Its focused 735 triples do
provide that join.

This packet supplies that missing association for a focused **1,805-case** accumulator and incentive
matrix. Around each unchanged LiteSVM `send_transaction` call, it records one occurrence identified
by `case_id + side` and binds:

- the actual serialized transaction, transaction hash, message hash, and verified signatures;
- exact AMM and dependency executable hashes;
- every outer-message account's prestate and poststate (executable data is represented by exact
  length and SHA-256); their non-executable state digests; error/success and changed-account set;
- inner instructions, events, return data, and full ordered logs;
- the fixture input, fixture hash, report outcome hash, and a digest of the retained outcome.

The verifier requires injective case and occurrence identities and checks every association against
the retained fixture report. Duplicate transaction hashes are permitted; duplicate occurrence IDs
are not. A transaction signature authenticates the transaction bytes only—it does **not** sign or
cryptographically attest the runtime outcome. The outcome association instead comes from exact
executable/input provenance, direct around-send capture, deterministic offline replay, and
hash-verified joins.

## Scope, overlap, and results

The core matrix reuses the historical fixture sources retained in the earlier local packet
`research/amm-union2-incentive-order-20261028/`. Copies are included here so review and replay do
not depend on that unpublished worktree; `evidence/provenance.json` binds the committed fixture
copies by SHA-256.

| Suite | Cases | Relationship to #436 |
| --- | ---: | --- |
| admin | 668 | exact overlap with `incentives_admin` |
| sync | 222 | exact overlap with `incentives_sync` |
| claim | 807 | exact overlap with `incentives_claim` |
| accumulator | 76 | exact overlap with `accumulator` |
| negative-time edges | 32 | not present as a #436 broad suite |
| **Core total** | **1,805** | **1,773 overlap; 32 additional inputs** |

Five exact H11 schedule anchors are replayed separately and are explicitly overlapping cases already
published by #436. They confirm the final candidate follows the original error order for the two
`stored_end < now < stored_start` failures and the active, equality, and zero-supply controls.
Overlapping counts are not additive unique coverage.

Fresh results against the final #436 ELF:

- 1,810 case associations: 1,805 core plus five schedule anchors;
- 3,620 signed executions and 3,626 verified signature fields;
- zero mismatches in errors, non-executable prestate/poststate, changed-account/rollback effects,
  inner instructions, events, or return data;
- 1,219 raw ordered-log differences;
- 327 differences after excluding only compute-consumption lines;
- all 327 are source filename/line/column differences under the two documented coordinate rules;
- zero remaining log differences after that separate categorization.

Raw logs are retained. Source-coordinate differences are reported, not silently removed, and no log
normalization is used for behavioral acceptance.

Two complete replays from separate output directories produced identical 15-file evidence trees:
`365567ffdb0f29419ac048afc821bc4301c3e2abdf265a00c18db1051491613a`.

## Verify and replay

From a fresh checkout with `requirements.txt` installed:

```sh
python -I -B research/amm-h11-signed-outcome-witness-20261028/audit.py --root .
python -I -B research/amm-h11-signed-outcome-witness-20261028/test_controls.py
python -m py_compile \
  research/amm-h11-signed-outcome-witness-20261028/{audit,capture,replay,test_controls}.py
```

Re-execute entirely offline into a new directory:

```sh
python -I -B research/amm-h11-signed-outcome-witness-20261028/replay.py \
  --output /tmp/amm-h11-outcome-replay
```

`audit.py --root /path/to/checkout` also works when this packet is copied to a relocated directory.
No RPC or live transaction is used.

## Negative controls

`test_controls.py` mutates actual retained witnesses in isolated temporary copies and requires
rejection of invalid signed bytes, a valid transaction attached to the wrong case, swapped sides,
forged executable identity, wrong prestate, changed final state, changed error, event, or CPI,
duplicate and missing occurrences, an extra file, and altered replay source or expected source hash.

## Limitations

All state and clock inputs are synthetic. This is not a production-reachability proof, security
claim, whole-program proof, build qualification, or maintained-source promotion. The 1,773
overlapping cases do not expand #436's input coverage; they strengthen the independently testable
case-to-transaction-to-outcome relationship. The five schedule anchors and 32 edge inputs also do
not make the matrix exhaustive.
