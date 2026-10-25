# Mayhem: twenty-four recovered handlers

This package adds `buy_pump_swap` and `sell_pump_swap` to the frozen twenty-two-handler
candidate. **9,595 original/candidate instruction comparisons pass across 21 suite
runs**, using 19,190 normally signed transactions. The clean main-source ELF is
wholly identical to the fully tested isolated candidate. It still differs from
the captured original; this is partial recovery, not historical source identity
or a deployable replacement. `initialize_mayhem_state` remains absent.

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| Captured original | 777,408 | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |
| Source-built candidate | 667,552 | `9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b` |

The first difference is byte 24, with 361,719 differing positions in the shared
length and a -109,856-byte length difference. No original executable bytes,
sections, symbols or relocations were patched into the source or output.

## New coverage

| Handler / quote configuration | Cases | Successes | Rejections |
| --- | ---: | ---: | ---: |
| Buy / native WSOL | 419 | 163 | 256 |
| Buy / legacy SPL Token | 419 | 164 | 255 |
| Buy / Token-2022 | 419 | 0 | 419 |
| Sell / native WSOL | 413 | 176 | 237 |
| Sell / legacy SPL Token | 413 | 177 | 236 |
| Sell / Token-2022 | 413 | 0 | 413 |
| **New total** | **2,496** | **680** | **1,816** |

Each pair compares full watched account data, owners, balances, executable/rent
metadata, instruction errors, events, inner CPIs and return data. Six independent
saved-receipt verifiers check every transaction signature, reconstructed CPI
amounts/account order, complete successful state and 303-byte events, strict
buy risk limits and failed rollback. All 7,099 inherited comparisons pass on this
same ELF. The six genuine burn instruction comparisons retain their original
captured snapshots and three sequential rejection cases.

The wrappers retain 31 buy / 29 sell outer accounts and actual 25 / 23-account
PumpSwap CPIs. The configured test-owned trader signs normally. Mayhem itself
signs for its genuine sol-vault PDA using `invoke_signed`. The fixed base token
program is Token-2022; quote token program is constrained to legacy SPL Token,
which explains the Token-2022 quote rejections. The external Pool codec pads short
prefixes to 287 bytes, while GlobalConfig requires its older 418-byte prefix.

Sizing includes signed virtual quote reserves. Native buys transfer SOL and
synchronize WSOL; both native handlers close the quote account back to the SOL
vault. Returned rent therefore participates in actual balance accounting. Small
native buys reproduce checked-subtraction failures in the explicit synthetic
fixtures, with complete rollback. Events use actual post-CPI pool balances.

Twenty-six new panic cases have source diagnostic differences. Eight of these
zero-effective-reserve cases additionally differ in unwrap-message detail.
Compute usage and textual diagnostics are not identity claims; errors, state,
events and inner CPIs match. Starting trade states are synthetic simulator
fixtures, not historical prestate or live authority. No initializer workaround,
foreign signature, signer-flag injection, live broadcast or authorization change
was used. No confirmed vulnerability is claimed.

## Reproduce

Build from current source with the clean-build helper:

```sh
CARGO_HOME="$PWD/work/mayhem-burn-fixtures/cargo-home" python3 scripts/build_partial_candidate.py \
  --manifest programs/mayhem/Cargo.toml --program mayhem \
  --artifact-name mayhem_recovered.so --tools-version v1.52 \
  --output work/mayhem24-clean-build
python3 scripts/mayhem_pump_swap_differential.py \
  --candidate repro/mayhem/twentyfour/mayhem_recovered.so \
  --cases repro/mayhem/twentyfour/buy-pump-swap-cases.json \
  --instruction buy_pump_swap --family native --output work/mayhem24-buy-native.json
python3 scripts/verify_mayhem_pump_swap.py \
  --candidate repro/mayhem/twentyfour/mayhem_recovered.so \
  --receipts work/mayhem24-buy-native.json --output work/mayhem24-buy-native-verification.json
```

Use `sell_pump_swap` with `sell-pump-swap-cases.json` for sell; use `--family token`
or `--family token22` for the other quote configurations. The verifier accepts
both JSON and saved `.json.gz` receipts without executing any program.

Inherited fixture paths are deliberately explicit: legacy buy cases are
`repro/mayhem/twenty/buy-cases.json`, sell-v2 cases are
`repro/mayhem/twentyone/sell-v2-cases.json`, and buy-v2 cases are
`repro/mayhem/twentytwo/buy-v2-cases.json`. Those immutable checkpoints remain intact.

## Provenance

`build-comparison.json` binds all current Cargo/Rust inputs. `source-snapshot.tar.gz`
freezes them with the program README. `test-snapshot.tar.gz`,
`test-source-sha256.json` and `runtime-manifest.json` bind all runner, verifier,
build-helper (including `build_source_manifest.py`), case and dependency inputs.
`manifest.json` hashes every package member. `static-evidence.tar.gz` preserves
byte-checked original disassembly and the independent parser/CPI analysis.

Six inherited administration-suite receipts record the then-current main22
source metadata while executing the combined24 scratch ELF. Its exact candidate
hash, main/scratch whole-file identity, current source closure and the frozen
`inherited-main22-source-snapshot.tar.gz` distinguish these facts explicitly.

`retained-attempts.tar.gz` preserves both scratch builds and source archives,
original-only probes, the first baseline results and all intermediate evidence.
Static follow-up corrected CPI flags and error text between builds. One early
matrix stopped in transaction construction when a replacement signer key had no
keypair; the final fixture instead uses a separate ordinary test-owned keypair.
That setup failure is not counted as a program rejection. The final complete
six-family matrix was rerun from the portable repository scripts.
