# Consolidated security assessment

**Status: incomplete; not a security sign-off.** Scope is the four captured original
programs listed in `docs/SCOPE.md`. Partial executable handlers have been recovered; no complete program exists.

| Severity | Confirmed findings |
| --- | ---: |
| CRITICAL | 0 |
| HIGH | 0 |
| MEDIUM | 0 |
| LOW | 0 |

There are no substantiated vulnerability findings in this checkpoint. No hypothetical
issue is presented as a finding, and no informational findings are included.

## Local evidence and applicability

`audit/local-validation.json` records 393 deterministic, local LiteSVM transactions
using solders 0.27.1: 123 Pump, 105 PumpSwap, 98 Pump Fees and 67 Mayhem cases. All
were rejected. Inputs cover empty/short/unknown discriminators, 64 deterministic
random inputs per program, and each available official IDL discriminator with no
accounts or argument payload. Known discriminators reach instruction logs; failures
include missing accounts, argument decoding and explicitly disabled instructions.

This demonstrates basic dispatch and malformed-input rejection for those exact
inputs and captured hashes only. It does not test valid account substitution,
privileged signer constraints, successful trading, balances, token-extension edge
cases, economic invariants, rate limits, migrations, or cross-program calls.
Mayhem has no official IDL in the captured documentation, so its recognized
instruction paths are not tested. External programs are captured as dependencies
but are not security-audited here. No mainnet simulation, transaction submission,
exploit, or broadcast was performed.

The evidence verifier and six comparator mutation tests validate capture integrity
and ensure code/padding changes are not hidden by the comparison utility. They are
not evidence of on-chain program correctness. Source recovery, valid-state security
validation and complete audit coverage remain outstanding.

The recovered selector additionally matches 1,215 local original-program calls
using synthetic fee configurations (see `docs/FEE_SELECTION.md`). This includes
unsorted and duplicate thresholds but does not establish that such configurations
are reachable through authorized update instructions. Empty tiers panic in the
original; no vulnerability is asserted without establishing reachable state and
impact. These checks do not complete the broader audit.

## Imported lifecycle validation

The integrated lab adds 30 freshly replayed, signed transactions against the
captured original Pump, PumpSwap and Pump Fees programs in offline Surfpool 1.6.1.
Seven saved-evidence verifiers and seven fresh-evidence verifiers passed. Covered
paths include synthetic-authority config writes and rejected outsiders; fresh SOL
coin creation, v3 trades and completion; migrate_v2 with the two required remaining
accounts; v2 trading on captured and freshly migrated pools; and synthetic referral
vault withdrawal with signature/PDA/recipient rejection controls. Source provenance,
logs, exact receipts and limitations are under `research/`.

These results expand bounded valid-state coverage to ten distinct published
handlers (five Pump, three PumpSwap and two Fees). They do not establish real
authority control, live fee accrual, all quote/token modes, or behavior for Mayhem.
The tests use the captured core executables with the harness/runtime dependency
configuration; no whole external-dependency version equivalence is claimed. No
additional vulnerability finding or completed source audit follows from these
successful paths.

### Quote-mint fee routing

The recovered native router was compared with 9,428 local original-program
queries covering quote classification, schedule boundaries, exotic fee fallback,
and injected empty/unsorted schedules. No behavioral mismatch was observed.
See `docs/FEE_SELECTION.md` and the complete compressed differential receipt.
The two SBF compiler candidates still differ from the original router; this is
partial implementation evidence, not whole-program equivalence or completed
audit coverage. Empty-schedule panics in directly injected state are not a
confirmed vulnerability without a reachable configuration path.

### Executing recovered handlers

Pump Fees now has ten independently compiled handlers, with 12,087 original-
versus-candidate SBF cases. These cover two query handlers, four authority setters,
global initialization against the historical 740-byte Pump Global layout, and
three configuration setters. The other 21 handlers remain unsupported. Selected compiler and dependency versions
remain candidates rather than an established historical graph.

### Parallel reconstruction checkpoint: 45 implemented handlers and two partial paths

Saved builds cover Pump 4, PumpSwap 14, Pump Fees 10 and Mayhem 17 implemented
handlers, plus Pump's partial regular-SOL buy_v3/sell_v3 branches. Their 25,667 local SBF
comparisons are indexed by `repro/status.json`; each report preserves its own
coverage and limitations. Pump's trade paths exclude quote-token, Mayhem, cashback
and holder-reward branches and has an uninterpreted event suffix. Neither is counted
as a fully recovered trade handler. See [partial sell review](pump/partial-sell-review.md).

PumpSwap deposit/withdraw coverage includes actual captured Token/Token2022 CPIs,
transfer-fee extension fixtures, slippage and exact inner instructions. See
[liquidity recovery](pump_amm/LIQUIDITY_RECOVERY.md). Mayhem coverage adds rent-funded
account extension and privileged SOL withdrawal with signed timestamp/rate-limit
arithmetic. Its permissionless recipient creation does not store a caller-chosen
beneficiary; downstream sweeps and other authorization paths remain under study.
Synthetic invalid states or permissionless instructions alone are not findings.

All four full-file comparisons still differ. Trading, liquidity, fee sharing,
claims, migrations, dependencies and hostile CPI/token-extension paths remain
incompletely reconstructed or audited. No complete audit conclusion follows from
these bounded tests. SPL Token has a fresh Linux source build matching all 108,600
captured bytes, preserved under `repro/pump/verified-spl-token/`; byte identity does
not establish security of that dependency or its callers.

Token2022 now also has a fresh pinned Linux source build matching the full capture
after explicit zero allocation padding. ATA and donation relay have no verified
source attribution in the latest saved registry response. Metaplex's registry
response points to a failed, mismatching Phoenix build; that repository is rejected
as source attribution. The failed registry records are retained separately and
do not establish that the correct source is unavailable.

### Versioned configuration and sweep coverage

Fee schedule updates reject empty schedules, more than 50 tiers, duplicate or
unsorted thresholds and fee totals above 10,000 basis points. Checked-add overflow
aborts and rolls state back. These authorized-update constraints narrow earlier
query observations involving injected empty/unsorted schedules; such injected
states alone do not establish an exploitable path. The decoder intentionally
ignores newer fields in legacy allocations. The configuration setter suite tests
migration boundaries and the exotic setter's resize/rent transfer behavior.

Mayhem's current compiled candidate covers quote withdrawal and both fee sweeps.
The added 1,021 cases include signer/role checks, rate limits, recipient duplicates,
token program substitutions, token ownership/mint errors and counter arithmetic.
They establish bounded agreement only. A separate privileged-PDA initialization
experiment was stopped by automated safety review and is not included in the
implemented-handler count, saved accepted coverage or any security conclusion.
