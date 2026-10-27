# Contract security scan — 2026-10-26

**Status: incomplete security assessment; completed source inventory and bounded offline Surfpool regression run. This is not a security sign-off.**

## HIGH / CRITICAL results

No HIGH or CRITICAL vulnerability was established by the work completed in this run. **That is not a conclusion that these contracts have no HIGH or CRITICAL vulnerabilities.** No new suspected vulnerability was validated as exploitable, and no exploit claim is made.

The requested parallel vulnerability-analysis workflow did not complete: all three initial analysis workers were rejected by automated cybersecurity safety review with “This content was flagged for possible cybersecurity risk.” They were reassigned only to source/coverage inventory. The remaining work used existing, unmodified local regression suites. This report therefore does not represent the requested comprehensive adversarial scan or verification of newly discovered vulnerabilities. The block was not treated as evidence about any contract's security.

## Scope and working-tree provenance

The five contract source trees present in `programs/` were inventoried, including uncommitted source changes already present when this task started. Commit alone does not identify these bytes. Per-file hashes and handler lists are retained in the linked inventories. No contract source was edited, no commit/push was made, and no external disclosure or public-chain transaction was performed.

| Contract | Public source handlers inventoried | Fresh execution scope | Inventory |
| --- | ---: | --- | --- |
| Pump | 56 | Existing configuration, creation, v3 curve trades, completion and migration lifecycle cases | [Pump](../work/security-scan-2026-10-26/pump/INVENTORY.md) |
| Pump AMM | 38 | Existing v2 trades and post-migration lifecycle cases | [AMM](../work/security-scan-2026-10-26/amm/INVENTORY.md) |
| Pump Fees | 31 | Existing configuration/withdrawal and donation-forwarding cases | [Fees](../work/security-scan-2026-10-26/fees/INVENTORY.md) |
| Mayhem | 25 | Ten administrative handlers, 60 existing cases on each of two identical original-program sides | [Mayhem](../work/security-scan-2026-10-26/mayhem/INVENTORY.md) |
| Donation Relay | 11 | Indirect Fees donation CPI only; not all Relay instructions | [Relay](../work/security-scan-2026-10-26/relay/INVENTORY.md) |

These are lexical public-source handler counts, not audited-handler counts or percentages of captured machine code. Generated Anchor/IDL/event behavior and dependencies are not fully covered by these inventories. Current source and captured originals have no demonstrated complete binary equivalence. Some README checkpoint counts predate current source; the inventory records current working-tree declarations.

Captured SPL Token, Token2022, Associated Token and Token Metadata were recorded as dependencies and are loaded where existing suites require them. Their independent implementation audits were not completed. Hence “all contracts” is not satisfied as a comprehensive review of every executable dependency.

## Fresh Surfpool execution

Surfpool **1.6.1** ran in offline, in-memory mode with no auto-deployment. Each existing runner used local fixture accounts, synthetic balances and test-owned signers. Captured original executables were loaded with the legacy BPF loader, trimming only verified zero allocation padding. This does not recreate upgradeable-loader authority/state or a complete historical chain snapshot.

| Suite | Recorded signed executions | Result | Primary evidence |
| --- | ---: | --- | --- |
| Pump / AMM / Fees lifecycle | 30 unique payloads | 15 successful; 15 expected rejections; all fresh receipt checks passed | [Summary](../work/security-scan-2026-10-26/lifecycle/transaction-summary.json), [run log](../work/security-scan-2026-10-26/lifecycle-run.log) |
| Mayhem administration | 120 executions: 60 existing cases on each side | No cross-side error/state/balance mismatch | [Receipts](../work/security-scan-2026-10-26/mayhem-regression/mayhem-transactions.json), [run log](../work/security-scan-2026-10-26/mayhem-run.log) |
| Fees-to-Relay forwarding | 20 executions: 10 existing cases on each side | 14 successful; 6 expected rejections; no cross-side mismatch; 12 transactions logged a Relay invocation | [Regression report](../work/security-scan-2026-10-26/relay-regression/REGRESSION.md), [receipts](../work/security-scan-2026-10-26/relay-regression/donation-transactions.json) |

The two comparison runners deliberately received the same captured original as their `--candidate`. This is a reproducibility/control run; zero mismatches does **not** demonstrate parity of reconstructed source or absence of vulnerabilities. Execution counts across separate runs are not claimed to be distinct test inputs. Independent deserialization verified every signature on the unique saved transaction payloads: 100 payloads, all valid; see [signature verification](../work/security-scan-2026-10-26/signature-verification.json).

Existing negative cases test bounded rejection/rollback behavior. Synthetic invalid state, authorized actions, a panic, or successful ordinary behavior alone does not establish a HIGH/CRITICAL vulnerability. No new exploit or severity claim follows from these tests.

### Reproduction commands

Run from the repository root, using fresh output directories if these already exist:

```sh
work/localnet/venv/bin/python localnet/test_transactions.py --output work/security-scan-2026-10-26/lifecycle
work/localnet/venv/bin/python localnet/mayhem_transactions.py --candidate evidence/original/mayhem/deployed.so --output work/security-scan-2026-10-26/mayhem-regression
work/localnet/venv/bin/python localnet/donation_transactions.py --candidate evidence/original/pump_fees/deployed.so --surfpool work/localnet/surfpool --output work/security-scan-2026-10-26/relay-regression
```

The lifecycle runner uses 19831/19832, 19851/19852, 19871/19872 and 19891/19892; Mayhem uses 19931/19932; donation forwarding uses 19951/19952. Existing port-collision protections remained intact. The canonical donation runner was used because its archived byte-identical copy assumes a repository-relative location; see its regression report.

## Coverage gaps and interpretation

- Comprehensive vulnerability analysis and new candidate reproduction remain incomplete due to the automatic review block. No claim of exhaustive authorization, arithmetic, state-machine, economic, account-substitution, reentrancy/CPI, extension or denial-of-service analysis is made.
- Pump/AMM/Fees lifecycle tests exercise only the paths explicitly listed by their runner. All other current handlers and their cross-instruction combinations remain outside this fresh validation.
- Mayhem trading, burn, sweeps, withdrawals and its Pump-signed initialization are not exercised by the fresh Mayhem administration suite.
- Relay settlement, Jupiter routes, distribution and privileged whitelist behavior are not validated by the indirect donation-forwarding suite. Privileged signatures were not forged.
- The four additional executable dependencies were fingerprinted, not independently audited. Token-extension combinations and arbitrary external CPI behavior are not exhaustively tested.
- Authority fields and balances in fixtures can be synthetic. Results do not establish control of live authorities, real exploit reachability, or economic impact against live state.
- Mayhem compares errors, account data/owners/lamports and balance deltas, excluding timestamp-sensitive event logs. Donation forwarding excludes `DonationFeePda.last_crank_ts` from cross-run state comparison and retains, but does not compare, timestamp-sensitive logs. These exclusions limit conclusions.
- Full source reconstruction and toolchain provenance remain unresolved. Source-only suspicions would need independent captured-original confirmation before being reported as original-contract findings.

## Captured artifacts

Git HEAD at inventory: `db3544a9c607206bd1c60d59ab37791e71d07c82`. Full source hashes and machine-readable handler lists are in each inventory's `inventory.json`. The following hashes identify actual captured payload files, including their captured allocation padding.

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| `evidence/original/mayhem/deployed.so` | 777408 | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |
| `evidence/original/pump/deployed.so` | 10485715 | `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d` |
| `evidence/original/pump_amm/deployed.so` | 10485715 | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |
| `evidence/original/pump_fees/deployed.so` | 948944 | `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e` |
| `evidence/dependencies/associated_token/deployed.so` | 105032 | `6804554e69fd3a58caa191dc4a58f4c67223d30ca28ab8987f39fc18d2f7374d` |
| `evidence/dependencies/donation_relay/deployed.so` | 830448 | `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563` |
| `evidence/dependencies/spl_token/deployed.so` | 108600 | `8190d3f7ceb6cb7a7a8d8924bff89f9f611e15ce1f806f2b6237f3311a98f697` |
| `evidence/dependencies/spl_token_2022/deployed.so` | 1382016 | `15a2e615a42e20f31714bbaaee43002ae6f1cda2e8d7118243117ab3c1342e2d` |
| `evidence/dependencies/token_metadata/deployed.so` | 793991 | `31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011` |

Surfpool SHA-256: `76b3ab8da78f69e75ba0d4092c35296518ddc4ce83fa58de34e2586092055ef3`. Machine-readable capture provenance: [provenance.json](../work/security-scan-2026-10-26/provenance.json).

## Result disposition

There is no substantiated HIGH/CRITICAL finding to report from this limited run. The requested full security scan remains incomplete; the deliverables are current-source inventories, verified local regression receipts, and explicit coverage limits. Further authorized analysis would need to complete the blocked review and establish a concrete reachable impact with captured-original reproduction before assigning severity.
