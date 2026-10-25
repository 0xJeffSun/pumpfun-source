# Candidate-source security review, pass16

These reports review reconstructed source. They do not certify deployed programs,
recover all original code, or establish that a conditional issue is exploitable.
No new target execution, live transaction, account fixture or dependency runtime
was introduced for these reviews.

| Report | Reviewed source scope | Principal unresolved observations |
| --- | --- | --- |
| [Pump](pump/REPORT.md) | All53 current entries inventoried;37 bound compiler inputs; excluded bodies opaque | Unchecked cashback CPI target with unresolved reachability; creator allocation/metadata preconditions; bootstrap and partial V3/reward contracts |
| [Fees](fees/REPORT.md) | All31 current entries;26 exact compiler inputs | Short FeeConfig stable-tier persistence; projected social-token balances; delegated authority and token-account policy |
| [AMM](amm/REPORT.md) | All37 bounded entries plus static-only create_config;28 exact compiler inputs at the preceding claim-context checkpoint | Conditional reserve-liability bound; incentive schedule domain; missing local volume accrual; empty metadata creator vector |
| [Mayhem](mayhem/REPORT.md) | All24 current entries;14 exact compiler inputs; excluded initializer remains opaque | First-caller bootstrap; low64 risk comparisons; trusted parameter domains; extension payer mutability |

The per-entry coverage tables distinguish local authorization, ownership, state
effects and delegated validation. Findings retain their conditions, authority
requirements and evidence limits. No unauthorized withdrawal, arbitrary signer
bypass or deployed-original exploit is established by these reports.

Pump, Fees and Mayhem bind their current accepted source. AMM binds the preceding
claim-context executable `6f258948…`. Its sole subsequent compiled-source change
computes the fallible total-claimed addition before accumulator mutation. The
[overflow evidence](../../pump_amm/claim-overflow-order-v144/README.md) retains the
exact patch and original/candidate control flow. This ordering correction does
not resolve or amplify the report's separate conditional economic observations.
The verifier checks the exact one-change relationship instead of calling the
older review a review of unchanged current source.

Run `python3 -B verify.py --repo ../../..` from this directory, or pass an absolute
repository path. Verification checks package integrity, source bindings, complete
entry inventories and the explicit AMM delta; it does not execute a program.

Original program equivalence, external CPI contracts, deployment authority/state,
all account-alias combinations, compiler/runtime correctness and excluded scopes
remain unresolved. Security review is incomplete. The Pump report keeps excluded incentive, sell and old token-extension bodies
opaque and marks partially reviewed paths explicitly.
