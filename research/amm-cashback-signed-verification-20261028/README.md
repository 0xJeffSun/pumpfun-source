# PumpSwap cashback signed verification

This packet strengthens the runtime qualification of the still-unmatched
PumpSwap `distribute_cashback` helper at original window
`0x351a8..0x37150`. It does **not** claim recovery of that window.

## Why this packet exists

The frozen maintained `scripts/pump_amm_cashback_differential.py` suite has two
fail-open properties:

1. its final mismatch gate was a Python `assert`, which disappears under
   `python -O`;
2. it deliberately omitted ordered logs from case comparison.

Union10 retained an aggregate `146`-case result but not signed per-case
cashback outcomes. The packet-local producer makes signature verification and
mismatch failure explicit, compares ordered logs and return data, records the
loaded program identity for each outcome, and retains a compact signed receipt.
It leaves the repository's frozen `scripts/` inventory unchanged.

## Fresh execution

The hardened producer was freshly executed against the captured original and
the exact Union10 source-only candidate:

| Measurement | Result |
| --- | ---: |
| cases | 146 |
| paired executions | 292 |
| cryptographically verified signatures | 292/292 |
| distinct signed transactions | 35 |
| paired transaction-byte differences | 0 |
| error differences | 0 |
| account-state differences | 0 |
| ordered-log differences | 0 |
| CPI differences | 0 |
| event differences | 0 |
| return-data differences | 0 |

The producer was also rerun with `python -O`; its complete JSON output was
byte-identical (`a3f2502875b21e1a46a6e180d01a12ac6504bf6e3101125db66b8e5c03c658f9`).

The executable identities are:

- captured original:
  `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`
- Union10 source-only candidate:
  `c5f40baa226d181e16e95eaa8838e0fa7967acb05e17ae78d5d3858fb77484f7`

The receipt is bound to the exact producer, reusable harness, captured trade
fixture, classic SPL program and Token-2022 program.

## Fail-closed verification

`verify.py` checks the underlying compressed receipt and external repository
inputs rather than trusting its aggregate counts. It verifies:

- original and candidate executable bytes;
- producer, harness, dependency and fixture hashes;
- all 146 unique case identities;
- paired serialized transaction equality;
- all 292 Ed25519 signatures;
- the PumpSwap program identity in each transaction;
- role-specific loaded executable hashes;
- errors, account state, ordered logs, CPI instructions, events and return
  data;
- exact packet inventory, file hashes and absence of symlinks.

The verifier and its mutation tests contain no Python assertions. The
producer-guard test executes the actual mismatch gate and log-difference AST
under optimized Python.

## Static recovery investigation

The accompanying measurement records a separate finding from the source
recovery work: the earlier nine-window regression was caused by physical
line-count drift in `buy.rs`, not by `.first()` or helper semantics. A
one-blank-line negative control left the helper byte-identical while losing
the same nine Source-coordinate-sensitive windows.

Line-neutral variants preserve the existing frontier. The best bounded
candidate remains 8,088 bytes / 988 instructions and is not normalized-equal
to the original 8,104-byte / 990-instruction function. It is retained only as
diagnostic research and is not included as a source correction.

Both original callers already materialize the helper ABI identically after
normalization, so this packet does not modify the helper signature or callers.

## Scope and limitations

- No PumpSwap program source is changed.
- `0x351a8` remains unmatched.
- Union10 remains 782/785 normalized and 236/785 raw source-only because the
  executable is unchanged.
- This is bounded, synthetic-but-original-backed local LiteSVM coverage, not
  whole-program equivalence, deployment validation or a security assurance.
- The full 25-suite corpus is not rerun by this packet; Union10's published
  full-corpus result remains separately qualified by its own evidence.

See [REPRODUCE.md](REPRODUCE.md) for commands.
