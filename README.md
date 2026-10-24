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
queries, but its compiled instructions still differ. Two complete Fees query handlers
now pass 10,789 independent SBF comparisons; four recovered Pump admin handlers
pass 93 comparisons. Five PumpSwap handlers pass 8,331 comparisons,
and eleven Mayhem handlers pass 1,051. These 20,264 SBF cases cover only the listed
22 handlers, not the complete programs. See [the recovery experiment](docs/FEE_SELECTION.md).

[Recovery status](docs/RECOVERY.md) separates observed evidence from unresolved work.
[Tooling](docs/TOOLING.md) covers recapture, disassembly and strict candidate comparison.
The [security assessment](audit/AUDIT.md) remains incomplete. Local validation
includes 393 malformed-input checks and 30 signed offline lifecycle transactions;
these bounded checks do not establish full security or differential coverage.
Zero confirmed findings does not establish security.

Original bytes live under `evidence/`, never as rebuilt artifacts. This project
contains no on-chain deployment or transaction-broadcast tooling; the imported
signed test harness submits only to offline loopback simulators. Upstream IDLs retain their
original authorship; this repository does not assert a license over Pump's materials.

The [integrated research lab](research/README.md) supplies pinned Pump.fun lifecycle
fixtures, signed offline replay harnesses, receipt verifiers and an explicitly
incomplete 31-handler Fees scaffold. Its import provenance and validation status
are separate from source-reconstruction claims.
