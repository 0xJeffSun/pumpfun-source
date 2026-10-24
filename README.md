# pumpfun-source

Deployment evidence and reconstruction tooling for the official Pump.fun Solana
programs. **Byte-for-byte source reconstruction is not complete.** There is no
rebuilt executable, recovered implementation, pinned compiler recipe, or successful
source-to-binary comparison yet.

Verified captures include Pump, PumpSwap, Pump Fees and Mayhem, plus five separately
deployed dependencies. Each capture preserves the entire account payload, including
allocation padding, with SHA-256, finalized observation slots and available loader
metadata. See [scope and hashes](docs/SCOPE.md).

```sh
python3 scripts/verify_evidence.py
python3 scripts/test_tooling.py
```

[Recovery status](docs/RECOVERY.md) separates observed evidence from unresolved work.
[Tooling](docs/TOOLING.md) covers recapture, disassembly and strict candidate comparison.
The [security assessment](audit/AUDIT.md) is incomplete: 393 local malformed-input
checks passed, but no valid-state security or differential suite has been completed.
Zero confirmed findings does not establish security.

Original bytes live under `evidence/`, never as rebuilt artifacts. This project
contains no deployment or transaction-broadcast tooling. Upstream IDLs retain their
original authorship; this repository does not assert a license over Pump's materials.
