# Consolidated security assessment

**Status: incomplete; not a security sign-off.** Scope is the four captured original
programs listed in `docs/SCOPE.md`. No reconstructed source exists to audit.

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
