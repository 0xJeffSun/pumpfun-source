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

Pump Fees now has eighteen independently compiled handlers, with 13,811 original-
versus-candidate SBF cases. These cover two query handlers, four authority setters,
global initialization against the historical 740-byte Pump Global layout, and
three configuration setters, permissionless resize, and two deprecated rejection
dispatches, two tier upserts and FeeConfig administrator transfer, and two donation handlers. The other 13 handlers remain unsupported. Selected compiler and dependency versions
remain candidates rather than an established historical graph.

### Parallel reconstruction checkpoint: 63 implemented handlers and two partial paths

Saved builds cover Pump 10, PumpSwap 18, Pump Fees 18 and Mayhem 17 implemented
handlers, plus Pump's partial SOL/USDC buy_v3/sell_v3 branches. Their 29,193 local SBF
comparisons are indexed by `repro/status.json`; each report preserves its own
coverage and limitations. Pump's SOL trade paths include Mayhem buyback suppression,
holder-reward event fields and explicit cashback rejection. USDC quote behavior adds 130 synthetic SPL/Token2022 cases; other quote routes
and the final event suffix remain incomplete. Neither is counted
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

The two deprecated Fees authority-sharing dispatches are counted only as observed
unconditional rejection behavior (6023), not successful authority changes. The
297-case permissionless resize suite compares owner/discriminator/stored-bump
checks, exact rent-delta transfers, no-op behavior, new zero-filled bytes and
rollback. Injecting an underfunded synthetic account can fail rent checks after
execution; that observation alone is not a vulnerability finding.

PumpSwap's three v2 trade handlers add 870 original/candidate cases covering
canonical and noncanonical pool fee selection, SOL/USDC/exotic quote schedules,
legacy account resizing, Token2022 transfer fees, exact token/System/event CPI
payloads and failure rollback. See [v2 trade recovery](pump_amm/TRADE_V2_RECOVERY.md)
for semantic details and untested extension combinations. The first-generation
trade handlers and multi-hop routes remain outside this recovered checkpoint.

AMM pool creation adds 283 signed comparisons, including calls through the original
Pump migration path with its actual PDA signer. Pool/LP/vault creation, locked LP
supply, existing vault balances, optional argument parsing and tested mint extension
checks agree. Non-Mayhem migration still requires the absent `init_boost` handler;
rollback observations do not establish complete migration support. See
[pool creation recovery](pump_amm/CREATE_POOL_RECOVERY.md).

The combined Fees executable now also passes the 713 donation creation/forwarding
fixtures. Creation validates canonical pool and creator/sharing authorization;
forwarding validates its stored-bump donation PDA, retains rent for 218 bytes,
wraps excess native SOL and calls the captured relay. Zero token balance returns
after ATA initialization. The relay amount, config, message, credited program,
account flags and signer seeds are compared. A persistent 10-step signed sequence
and 10 independent Surfpool comparisons also pass against the combined build.
No cooldown was observed at the tested same-time, one-second and one-day intervals;
this is an observed rule, not a vulnerability claim or complete timing audit.

Six additional Pump administrative handlers add 351 original/candidate cases:
quote whitelist add/remove, initial virtual quote reserves, buyback configuration,
creator-fee configuration and holder-reward configuration. The existing four
administration and partial-trade suites also pass against the same new executable.
Buyback basis points reject values above 10,000, whereas tested configurable
creator-fee maxima retain full u64 inputs. Only the creator-fee configuration
setter emits an event in these six recovered paths. These recovered permissions
and boundaries do not establish that every downstream use is safe.
