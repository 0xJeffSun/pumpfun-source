# Consolidated security assessment

**Status: incomplete; not a security sign-off.** Scope is the four captured original
programs listed in `docs/SCOPE.md`. Only one partial fee-tier selector has been recovered; no complete program exists.

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
