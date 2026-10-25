# Pump creator-fee recovery review

The independently compiled checkpoint implements creator-fee collection,
distribution v1/v2 and the minimum-distributable query alongside the existing
fourteen recovered handlers and partial buy/sell v3 paths. Full-file byte identity
remains false. The captured original is 10,485,715 bytes with SHA-256
`7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`.
The main-path v1.44 build is 536,168 bytes with SHA-256
`ebc76c833fa4edb373ec90b4285d05b6865d889922164f9a2933385aebc54108`.

## Recovered behavior

Collection transfers native vault lamports above the empty-account rent floor.
An executable recipient or zero available amount returns without a payout event.
PDA seeds bind the vault to the recipient; System Program enforces its transfer
ownership/data rules. The reconstruction does not replace that authorization.

Distribution binds mint, curve, foreign-owned sharing state and creator vault.
A stored creator mismatch or paused sharing configuration rejects distribution.
Ordered remaining recipients must match the shareholders, be non-executable and
have nonzero shares. Native distribution computes the maximum recipient rent
deficit scaled by its share. Below this threshold it returns a zero-distribution
structure without transferring or emitting the event. At and above the threshold,
payouts use floor division, retaining rounding residue. Duplicate recipients,
nonstandard aggregate share totals, sharing versions and the revoked flag are
accepted in the tested stored-state variants; these synthetic states are not
proof that every such state is reachable through original creation/update paths.

The minimum-fee query shares recipient validation and rent arithmetic but permits
paused sharing state. It emits a log event and returns the minimum, available fees
and eligibility result without modifying accounts. Legacy curve fields preserve
the original defaults and invalid-Boolean decoding errors.

V2 token distribution parses the source token account before recipient validation,
checks the quote, and uses grouped wallet/ATA remaining accounts. Missing recipient
ATAs either reject or are created through the actual associated-token program.
SPL Token and Token2022 enforce transfer ownership, mint and frozen-account rules.
Normal test-owned transaction signatures and genuine program CPI signing are used.

## Evidence and limits

The maintained differential suites compare full relevant account snapshots,
errors, event bytes, return data and recorded inner instructions. Surfpool performs
signed offline transactions and compares state/errors and events with only the
known timestamp normalized; raw payloads and signatures remain in its receipts.
Source-to-capture identity, exhaustive state-space equivalence, every token extension
combination and unrecovered handlers remain unproven. No new vulnerability claim
is inferred solely from permissive synthetic state or dependency errors.

All 1,924 differential cases and 50 Surfpool comparisons (100 signed transactions)
passed on the integrated candidate. Frozen artifacts and exact counts are recorded under `repro/pump/creator-eighteen/`.
The build records compiler identity, source hashes, lockfile and command. Original
ELF bytes are read only after compilation for comparison and are not compiler inputs.


## Expanded creator and lifecycle checkpoint

The creator-twentyfive source adds token collection, extension, volume sync,
creator/protocol sweeps, creator migration and administrative creator changes.
Each focused implementation was independently compiled and compared before
combined regression. The integration candidate remains byte-different.

Additional destination-substitution coverage found that the original rejects an
existing same-mint ATA belonging to a different wallet with6054; the earlier
reconstruction omitted that address check. The new implementation preserves the
original rejection. The test creates the alternative ATA through the captured
ATA program with an ordinary signature, without editing its token authority.
Earlier bounded passing fixtures did not cover this substitution. Treat this as
a corrected reconstruction gap, not a vulnerability in the captured original.

The migration path requires matching sharing administration, rejects holder
creator changes, and requires accrued creator fees to be swept. It allows protocol
fees to remain. Short legacy curve layouts preserve original post-event write
failures and transaction rollback. Administrative CTO includes actual captured
Fees/AMM CPIs, token/native payouts, frozen-wallet behavior, holder conversion,
fee configuration constraints and curve rent/size handling. These observations
remain bounded by saved synthetic fixtures and normal signature verification.


The combined creator-twentyfive candidate is 690,480 bytes with SHA-256
`a1edac573ea08b5456116ca8bea53ed570d4e5dcae21c72cc438103d75774213`.
All 3,741 differential cases across 16 suites and 176 Surfpool comparisons
(352 signed transactions) passed. The eight destination-substitution cases now
reject consistently in the original and candidate. Surfpool replays initialized
poststates; the genuine signed ATA-creation bootstrap transactions and initialized
account snapshots are retained separately, rather than claiming the bootstrap was
rerun by Surfpool. Exact source/build/receipt manifests are in
`repro/pump/creator-twentyfive/`. These results supersede the earlier candidate for
this expanded scope, without establishing full binary equality.
