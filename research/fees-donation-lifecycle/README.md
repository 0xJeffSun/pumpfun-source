# Signed lifecycle qualification of the residual Fees candidates

[PR #304](https://github.com/lalalune/pumpfun-source/pull/304) publishes residual
CreateDonation and Crank experiments composed with the recovered Sweep body,
but explicitly supplies no runtime qualification. This packet loads its **exact
two selected public native artifacts** into local LiteSVM, independently checks
the existing creation/crank boundaries, and adds persistent failure/retry cases.
Source recovery and the experimental Anchor extension remain credited to #304.

The existing `scripts/fees_donation_sequence.py` already covers a successful
continuous sequence. This follow-up targets the new artifacts and adds rollback,
re-enablement and retry evidence; it does not claim to invent continuous testing.
No maintained program source, selected binary or progress total changes.

## Artifacts and static limits

Public source: commit `aafecfeda4408193048bbd7df16afd6e95c493fc`.

| Public artifact | Loaded candidate SHA-256 | Residual body / original bytes |
| --- | --- | --- |
| crank583-archive-port | d2456d2af1f564f1c6b4e5f08a085cd44ce3a98de4c37f3ab62db15010bca44e | 15,952 / 15,976 |
| create583-emitter-port | 87fea49412e62d49bf0ee389051e7e7a5f12b86dfa94e50933efd3a10fe2ffe6 | 13,448 / 13,800 |

Original Fees capture:
`4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`.
The verifier independently checks the two complete source archives, macro
vendor inputs, experimental Anchor inputs where applicable, published build
receipts, native symbol/stripped hashes and 583 normalized window matches.
It follows the matching public wrapper's actual call to the examined business
body. **Both residual bodies remain unequal.**

`public/` is an unchanged **selected subset** of #304, including its original
index and manifest for attribution. Its upstream verifier expects all seventeen
builds and should be run in the full upstream packet; use this directory's
top-level verifier for the retained two. The full public packet was independently
verified before selection; that log and its archive hash are retained.
This work executes published artifacts and **does not claim a fresh Cargo build**.
It does not transfer #301's 200 raw matches, readonly-data qualification or
17,331-case coverage to these different binaries.

## Local executions

Each candidate gets its own original/candidate runs:

| Scope, per candidate | Cases or sequences | Paired steps | Actual transactions | Verified signature fields |
| --- | ---: | ---: | ---: | ---: |
| Unchanged creation matrix | 356 cases | 356 | 712 | 1,416 |
| Unchanged crank matrix | 357 cases | 357 | 714 | 1,420 |
| Persistent lifecycle | 15 sequences | 120 | 240 | 420 |

The 713 matrix cases and 15 lifecycle scenarios are repeated for two artifacts;
they are not 1,426 distinct input scenarios. Initial executions total **3,332
transactions / 6,512 signature fields**. A separate portable replay repeats all
480 lifecycle transactions and exactly reproduces their signed bytes, state,
errors, inner instructions, return data and full raw logs.

Lifecycle scenarios cross three initial prefunds (0, 1 and 1,000,000,000 lamports)
with ordinary creation, sharing-config creation, absent whitelist, disabled
crank and readonly donation account. Every donation account is created by the
artifact being tested, then retained in that same VM. Deposits and admin flag
changes are ordinary signed transactions. Repeated crank calls preserve the
2,408,160-lamport rent reserve. Missing-whitelist, disabled and readonly attempts
produce the same errors as the original (3012, 6021 and 2000), roll back
non-fee-payer message accounts, and succeed after the condition is corrected.
There are nine expected failure pairs per candidate.

Synthetic pool/curve/global setup and an immutable mint capture remain explicit
fixture inputs. The local relay whitelist is inserted through fixture setup,
including after its deliberate absence; clock movement is also explicit.
Donation/global/payer/authority state continuity is checked between observed
transactions. No original bootstrap replaces a candidate-created donation.
This is wrapped-SOL donation coverage, not arbitrary mint or live-chain proof.

The observer records hashes of the binaries actually loaded in each VM and
cryptographically verifies every signature before forwarding the unmodified
transaction. It preserves every message non-executable account before/after,
raw logs, CPI instructions and return data. It rejects disabling signature or
blockhash checks and binds the Python/capture inputs actually read.

All compared signed transactions, errors, account states, CPI, return data and
serialized program log/data/return lines agree. Full raw runtime/compute logs
still differ: 333 focused pairs plus 48 lifecycle pairs for the Crank artifact;
467 focused plus 51 lifecycle pairs for the Create artifact. They are retained,
not described as equal or silently discarded. This establishes bounded behavior,
not complete call/data identity, compiler provenance or whole-ELF equivalence.

## Reproduction

With the repository's Python requirements installed:

```sh
python -B research/fees-donation-lifecycle/verify.py
python -B research/fees-donation-lifecycle/test_verify.py
python -B research/fees-donation-lifecycle/replay.py
```

The first command validates saved native provenance and actual receipts.
The second rejects corrupted signatures, wrong loaded-candidate attribution,
changed final account state, a matching off-ledger reset on both sides and a
suppressed expected rejection. Mutations are in memory only. The third loads
the two preserved native candidates into fresh local VMs and repeats the
lifecycle sequences; its temporary outputs are separate from sealed receipts.
The existing Fees CI suite runs the controls and fresh lifecycle replay.

Actual initial execution commands are in `receipts/*/commands.json`;
`environment.json` records Python 3.12.3 and solders 0.27.1. Original captures,
upstream experiments and older evidence are unchanged. No RPC or live transaction
is used. Full program regression, non-native donation composition, further
borrow/alias states and complete binary reconstruction remain open.
