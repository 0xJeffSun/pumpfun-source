# Main Pump: claim integration and accrual recovery

This pass integrates `claim_token_incentives` into the main Pump source and
recovers behavior missing from the previous isolated candidate. The main crate
now declares 55 of the captured IDL's 56 instructions. The overall reconstruction
is still unfinished and the original ELF is not reproduced.

The old candidate passes its original 60-case suite, but differs in 205 of the
expanded 334 cases. The recovered candidate matches all 334 cases, plus all
334 cases in a second deterministic seed. The matrices overlap; their counts
must not be added as unique cases. Both include the original 60 cases.

## Recovered behavior

The original claim wrapper calls the volume-accrual worker before deciding
whether to pay the pending balance. It can pay previously accrued tokens when
no new day is eligible, including after a schedule ends or when its period is
zero. Accrual itself depends on the previous and current day, the final schedule
day, and the prior day's volume denominator. Individual time fields are
converted to unsigned indices in the observed order. Invalid conversions and
checked-add overflow abort; a quotient that cannot fit in u64 reports
`Truncation` (6025).

The worker rewrites the stored user identity from the supplied beneficiary.
Successful payment refreshes the timestamp and claim flags. The user ATA is
created if absent, including a zero-payout claim. The payer signs normally;
the beneficiary is not required to sign. Malformed, frozen, wrongly owned,
and wrongly derived ATA controls are retained.

The captured dispatch calls wrapper `0x12e870`, which calls claim body
`0x75308`; the latter calls accrual worker `0x7bfd8`, with the end-day helper at
`0x7dfc8`. Complete original function windows, byte hashes and their assembly
are included. Function labels are analyst attributions, not recovered symbols.
No full body-byte match is claimed.

The existing 38-suite Pump corpus passes all 9,259 cases on this same final
artifact. Together with the 334-case claim suite, all 39 currently registered
suites pass (9,593 cases; overlapping scenarios remain overlapping). This
evidence comes from the full 38-suite invocation and the separate claim-suite
invocation, not from a fabricated combined run. `regression-summary.json` binds
the two results. The second claim seed remains a separate holdout.

## Evidence and limits

The fixture's beneficiary, volume account, mint and user token account derive
from a saved signed Pump lifecycle. Daily schedules and the incentive vault's
funding are synthetic local state. The matrices do not establish that every
malformed state is reachable through legitimate administration. No public
transaction was sent and no real funds moved.

The saved verifier checks both builds, source snapshots, matching errors,
account data, events, inner instructions, signed transaction bytes and payout
conservation. It reads evidence without executing either binary. Scheduler
regression has 575 passing cases and the v3 token-extension regression has
126 passing cases on this same candidate.

The candidate is 1,662,536 bytes, SHA-256
`816b093541883e76e5c58e63087c341ad8a0711db8ecb2943cb5f9cdfd97325d`.
A second fresh-target build reproduces both stripped and unstripped artifacts.
The recorded v1.44 compiler is invoked directly with locked offline dependencies.
This is a reproducible reconstruction build, not proof of the historical build
recipe. Original whole-file equality remains false.

```sh
work/test-env/bin/python repro/pump/focused-incentive-claim-20261026/verify.py
```
