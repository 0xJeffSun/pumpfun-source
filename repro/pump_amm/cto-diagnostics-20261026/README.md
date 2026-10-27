# PumpSwap CTO diagnostic recovery

The original `admin_cto_pool` emits plain errors at two guards. Current source
adds compared public keys for error 6028 and numeric values for error 6081.
`source.patch` replaces only those two macros inside `admin_cto`. Predicates,
error numbers, branch order and truthful source coordinates remain intact.
The separate `set_coin_creator` and `migrate_pool_coin_creator` handlers do not
change. The exact input source is retained as `baseline-creator-reassignment.rs`.

The parent produced corrected candidate `739ebefb…`. A fresh fifteen-case CTO
replay passes all strict comparisons, and all twelve actual-receipt mutation
checks reject malformed evidence. `corrected-runtime-verification.json` binds
the exact candidate, receipt, source, compiler record and verification scripts.
Parent work owns compilation and the full AMM regression gate.

## Original evidence

`original-guards.asm` retains 792 checked instruction bytes from original AMM
SHA-256 `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`.

- The 32-byte comparison prepares an operand at `r6 + 0x438` and the computed
  value on the stack before calling its comparator at `0x14a38`. A zero result
  at `0x14a50` branches to `0x14c48` past error construction. The failed path
  stores error 6028 at `0x14be0` and source line 64 at `0x14bf0`.
- The fee guard loads the scalar at `r2 + 0x540` at `0x15760`. Its zero branch at
  `0x15768` targets `0x15840` after the error path. That path stores line 121 at
  `0x157e0` and error 6081 at `0x157f8`.
- Both paths reference the exact source-path literal at `0x11c574`:
  `programs/pump-amm/src/instructions/admin/admin_cto_pool.rs`.

These byte observations correlate with signed runtime rows. They do not establish
the complete helper implementation, historical Rust spelling, transitive data
identity or whole-binary equality.

The accepted prior AMM candidate is `03554fa0…`. Its full 159-case CTO receipt has
nine compared-value differences: rows 12–14 and 123–125 for error 6028; rows
58, 59 and 151 for error 6081. `saved-evidence.json` binds compressed/raw receipt
hashes, exact source hash, cases, origins and signed-message hashes. Every affected
pair has identical signed transaction bytes and all non-log result fields.

## Focused actual observation and pending acceptance

`observation.json` reruns fifteen existing cases against the original, prior and
same prior candidate: all nine affected rows, five successful controls and a
holder-immutability precedence rejection. This is an observation of the gap,
not a corrected acceptance. Ninety signature fields verify independently; repeated
messages across different fixture states are counted explicitly. The exact
producer is `observation-producer.py`.

Transactions use ordinary fixture-owned payer and authority signatures. The
captured Pump program calls the AMM and supplies the pool-authority PDA signature
through real CPI. The PDA is never a top-level signer. Each focused case is bound
to the prior signed message, including payload, account routing and privileges,
and to its complete recorded pre-state, post-state, CPIs, events and return data.

Check original evidence and observations:

```sh
work/test-env/bin/python -B repro/pump_amm/cto-diagnostics-20261026/verify_evidence.py
```

After a genuine cumulative source build, run:

```sh
work/test-env/bin/python -B repro/pump_amm/cto-diagnostics-20261026/probe.py \
  --candidate <new-candidate.so> \
  --source <compiled-source>/programs/pump-amm/src/creator_reassignment.rs \
  --build-record <actual-build-comparison.json> --output <new-receipt.json>
work/test-env/bin/python -B repro/pump_amm/cto-diagnostics-20261026/test_runtime.py \
  --report <new-receipt.json> --candidate <new-candidate.so> \
  --source <compiled-source>/programs/pump-amm/src/creator_reassignment.rs \
  --build-record <actual-build-comparison.json>
```

Corrected mode rechecks the successful build record and all thirty actual source
inputs, the exact two-line creator source change, ELF identity and dependencies.
It rejects incomplete effect schemas and verifies every raw signature against
the prior signed instruction. Full original/candidate logs must match after
excluding compute-use lines and three exact original/current source-coordinate
pairs (the two corrected sites and the existing holder guard). The prior output
must continue to reproduce its retained full logs, including the unwanted values.
Twelve mutation checks pass against the actual corrected receipt. Failed
receipts remain failed; output paths must be new.

The first corrected replay failed validation because the live harness represented
the exotic case's patch pairs as tuples while retained JSON uses lists. The
producer now applies a JSON round-trip before comparison, preserving exactly
the values it records. The failed receipt is unchanged; a fresh execution
passes fifteen cases, ninety signature fields and three unique signed messages.

This is bounded synthetic execution. It does not establish all possible CTO
inputs, live-chain acceptance, complete AMM reconstruction or byte identity.
