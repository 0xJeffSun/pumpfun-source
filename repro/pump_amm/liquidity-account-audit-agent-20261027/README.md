# Deposit/withdraw account-parser audit

Both original instruction wrappers call the same compiled account-parser body: Deposit at `0xe5278` calls `0xa8460` from `0xe5380`, and Withdraw at `0xe57b0` calls it from `0xe58b8`. The wrapper log strings identify these operations directly. The shared8,936-byte parser matches the maintained `Liquidity::try_accounts` body under the retained normalization, and every actual direct callee body also matches in the selected Pool/GlobalConfig recovery build.

The captured IDL gives both operations the same account order and flags. The parser uses the same Pool/GlobalConfig account types, boxed mint/token wrappers, token-program checks, `has_one` relationships, user-token authority check and event-authority seeds as the current shared context. The user is not writable and no initialization instruction is present in the context. No substantive parser difference or reason to split this context was found in this bounded audit.

This does not prove whether the original Rust source declared one shared type or two types that the compiler deduplicated. It also does not turn direct-callee identity into full transitive or referenced-data identity. The liquidity business arithmetic and state-update ordering are separate work owned by the other agent.

`audit.py` recomputes the parser, actual-call and wrapper-identity checks. `evidence.json` binds the inspected candidate. No maintained source edit was made for this audit.
