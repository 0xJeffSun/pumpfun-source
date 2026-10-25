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
queries, but its compiled instructions still differ. All 31 Fees instruction bodies pass 17,441 SBF comparison receipts; forty-two recovered Pump
handlers plus four partial creation/trading paths pass 8,654. Thirty-seven PumpSwap
handlers pass 17,462 comparisons, and twenty-four Mayhem handlers pass 9,595. These
53,152 saved comparisons cover 134 implemented handlers and four partial paths, not the
complete programs. The Fees total includes 69 repeated-input checks with stronger log or signature assertions. Two Fees handlers are deprecated dispatches that always reject.
The current Pump checkpoint corrects the previously reported stored creator-fee
override gap and passes 1,024 additional Surfpool comparisons with 2,048 signed transactions.
The current Pump `sell_v2` has a confirmed quote transfer-fee minimum-output and event mismatch; its saved passes do not cover that boundary.
The current PumpSwap checkpoint corrects the earlier zero-fee cashback event mismatch;
the [signed negative probe](repro/pump_amm/legacy-sell-zero-fee-gap/README.md) preserves evidence against the prior executable.
A separate native accounting fragment is tested against 206
original Pump sell cases. See [the recovery experiment](docs/FEE_SELECTION.md).

The [controlled compiler comparison](repro/pump_fees/compiler-family/CONTROLLED-HELPER-REPORT.md)
favors platform-tools v1.44 among the tested Fees builds: two complete runtime
helper bodies match the capture exactly. The current Fees candidate uses that
compiler. The [previous retained Fees build](repro/pump_fees/all-thirtyone-v144/README.md)
also passed 112 independent Surfpool comparisons with 224 signed local transactions.
The current Fees build adds typed buyback guards and a boxed account context, reproducing
compared-value error logs and three more original function shapes. It retains the
full SBF regression and targeted message/decoder checks. These results do not prove the complete historical build configuration.

[Recovery status](docs/RECOVERY.md) separates observed evidence from unresolved work.
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
