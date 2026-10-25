# pumpfun-source

Deployment evidence and reconstruction tooling for the official Pump.fun Solana
programs. **Byte-for-byte source reconstruction is not complete.** Experimental executables now contain recovered handlers with pinned candidate build recipes,
but the implementations remain partial and all whole-program comparisons differ.

Verified captures include Pump, PumpSwap, Pump Fees and Mayhem, plus five separately
deployed dependencies. Each capture preserves the entire account payload, including
allocation padding, with SHA-256, finalized observation slots and available loader
metadata. See [scope and hashes](docs/SCOPE.md).

```sh
python3 scripts/verify_evidence.py
python3 scripts/test_tooling.py
```

A partial Rust fee-tier selector now matches the original instruction sequence except
for unresolved relocations with platform-tools v1.43, and passes 1,215 local
differential cases. Recovered quote-mint routing additionally passes 9,428 original-program
queries, but its compiled instructions still differ. All 31 Fees instruction bodies pass 17,461 SBF comparison receipts; forty-eight recovered Pump
handlers plus five partial creation/trading paths pass 9,269. Thirty-seven PumpSwap
handlers pass 17,462 comparisons, and twenty-four Mayhem handlers pass 9,595. These
53,787 saved comparisons cover 140 implemented handlers and five partial paths, not the
complete programs. The Fees total includes 69 repeated-input checks with stronger log or signature assertions. Two Fees handlers are deprecated dispatches that always reject.
The current [Pump buy-order checkpoint](repro/pump/buy-mode-order-fortyeight/README.md) restores complete-before-cashback rejection order in the admitted buy path. Its entire executable differs from the preceding fee-basis build at nine bytes, all within buy; exact-quote is raw-unchanged. All 9,269 differential and 1,024 Surfpool comparisons pass, with no new cases. The inspected existing fixtures do not cover simultaneous complete/cashback flags or divergent mint/curve supplies. Whitelist admission, broader settlement and whole-original identity remain incomplete.
The current Pump `sell_v2` has a confirmed quote transfer-fee minimum-output and event mismatch; its saved passes do not cover that boundary.
The current PumpSwap checkpoint corrects the earlier zero-fee cashback event mismatch;
the [signed negative probe](repro/pump_amm/legacy-sell-zero-fee-gap/README.md) preserves evidence against the prior executable.
The current [AMM accumulator-order checkpoint](repro/pump_amm/accumulator-order-v144/README.md) puts the accumulator user-field assignment after successful Clock retrieval, as in the captured original. Its clean main executable and symbols equal the tested scratch build; all 17,462 existing comparisons and 35,418 saved signature checks pass. The full inventory still has 310 unmatched original windows. Scalar specialization, recipient diagnostics, transitive data, authentic initializer success and whole ELF identity remain unresolved.

The [controlled compiler comparison](repro/pump_fees/compiler-family/CONTROLLED-HELPER-REPORT.md)
favors platform-tools v1.44 among the tested Fees builds: two complete runtime
helper bodies match the capture exactly. The current Fees candidate uses that
compiler. The [previous retained Fees build](repro/pump_fees/all-thirtyone-v144/README.md)
also passed 112 independent Surfpool comparisons with 224 signed local transactions.
The current [Fees V2 caller checkpoint](repro/pump_fees/v2-caller-v144/README.md) composes quote admission, remaining-account preprocessing, generated AMM/Pump V2 CPIs, payout filtering/rescaling and early serialization. All 17,461 existing comparisons and the separate ten-step sequence pass; a clean main build matches the tested executable and symbols. Five original windows gain normalized matches, leaving 130 unattributed and two conflicting windows. Whole-file identity, complete caller/parser/error/cleanup equivalence and the security audit remain incomplete.

The current [Mayhem swap-sell typed-error checkpoint](repro/mayhem/sell-result-error-twentyfour/README.md) restores the typed zero-divisor error in SellPumpSwap, following the prior buy correction. All 9,595 functional comparisons pass; 61 diagnostic rows remain explicit. Saved verification checks 13,284 retained transaction strings and 26,500 signatures; 19,190 remains the recorded/derived signed-execution count. Both clean main builds equal their tested scratch executables and symbols.

[Recovery status](docs/RECOVERY.md) separates observed evidence from unresolved work. The [twentieth layered pass](repro/layered-passes/pass-20/README.md) records the latest fixes, complete byte differences, function/call/data inventories and the next source obligations.
The [completion and remaining-work ledger](docs/COMPLETION.md) enumerates all 150 instruction dispositions: 140 bounded implementations (93.3%), five partial and five unrecovered. Whole-binary completion remains 0/4; this is not a 93.3% overall completion estimate.
[Parallel worker results and concurrency configuration](docs/PARALLEL_WORK.md) document the completed CLI research waves, focused follow-ups and configured concurrency.
[Tooling](docs/TOOLING.md) covers recapture, disassembly and strict candidate comparison.
The [security assessment](audit/AUDIT.md) remains incomplete. Local validation
includes 393 malformed-input checks and 30 signed offline lifecycle transactions;
these bounded checks do not establish full security or differential coverage.
Zero confirmed findings does not establish security.

The SPL Token dependency now has a fresh Linux source build matching the entire
captured 108,600-byte payload. [Build evidence](repro/pump/verified-spl-token/README.md)
is separate from the still-unmatched four Pump.fun programs. Token2022 also has a
[verified fresh source build](repro/pump/verified-token-2022/README.md), including
explicitly regenerated zero allocation padding.

Original bytes live under `evidence/`, never as rebuilt artifacts. This project
contains no on-chain deployment or transaction-broadcast tooling; the imported
signed test harness submits only to offline loopback simulators. Upstream IDLs retain their
original authorship; this repository does not assert a license over Pump's materials.

The [integrated research lab](research/README.md) supplies pinned Pump.fun lifecycle
fixtures, signed offline replay harnesses, receipt verifiers and an explicitly
incomplete 31-handler Fees scaffold. Its import provenance and validation status
are separate from source-reconstruction claims.

The prior [AMM formatter checkpoint](repro/pump_amm/formatter-restoration-v144/README.md) restores the evidenced stack-buffer base58 and checked UTF-8 algorithm in a narrowly patched dependency. All 17,462 unchanged comparisons and 35,418 saved signatures pass; the clean main build equals scratch. Four more original function windows match under the existing normalization, leaving 306 unmatched at that checkpoint (the current claim checkpoint has302). Full original byte identity and historical dependency identity remain unresolved.

The prior [Relay IDL header checkpoint](repro/donation-relay/source-build-09-idl-owned/README.md) restores the reviewed I/O-to-owned-error path. The unchanged12 ordinary cases and all saved signature/effect checks pass. Complete source is bound by [current.json](repro/donation-relay/current.json);369 original windows and whole-file identity remain unresolved.

The latest [Fees withdrawal checkpoint](repro/pump_fees/withdraw-owned-error-v144/README.md) restores missing-option-only, origin-free error conversion. The [AMM claim context checkpoint](repro/pump_amm/claim-context-v144/README.md) restores original account ownership and inline storage. Both clean main builds equal their tested executables and symbols. Unchanged corpora pass; whole-original equality remains incomplete.

The [sixteenth layered pass](repro/layered-passes/pass-16/README.md) restores full BondingCurve decoding and mutation/log order in three Pump creator paths, plus AMM claim overflow-before-mutation order. Both main builds exactly reproduce their tested executables and symbols. Core byte identity remains0/4; the [complete remaining-work report](repro/layered-passes/pass-16/REMAINING.md) retains every mismatch.

The [seventeenth layered pass](repro/layered-passes/pass-17/README.md) restores the AMM Claim self-transfer predicate, Fees sharing missing-pool error ownership, and Relay IDL header-read owned errors. Main/scratch builds and unchanged corpora are verified; all whole-core originals still differ.

The [eighteenth layered pass](repro/layered-passes/pass-18/README.md) restores AMM Sync ownership and its no-change log, Fees' four-reserve graduation predicate, and Relay's owned missing-discriminator error. AMM now has300 unmatched original windows. The unchanged corpora and main/scratch identities pass; all four original core binaries still differ.

The [nineteenth layered pass](repro/layered-passes/pass-19/README.md) restores Pump admin-CTO typed curve state, AMM initializer user ownership, and Fees late account-check/state-exit order. All existing corpora pass; AMM retains297 unmatched original windows. Whole original byte identity remains0/4.

The [twentieth layered pass](repro/layered-passes/pass-20/README.md) restores Pump owned CTO error metadata, Fees first typed CPI ownership, and AMM logical module provenance. All three main builds equal tested scratch artifacts;0/4 core originals match. Upstream history is reconciled with excluded executions retained.
