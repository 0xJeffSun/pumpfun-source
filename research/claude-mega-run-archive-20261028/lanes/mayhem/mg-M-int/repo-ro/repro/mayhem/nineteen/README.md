# Mayhem nineteen-handler checkpoint

The clean main-source candidate adds legacy `sell` to the eighteen-handler
checkpoint. It is 415,168 bytes, SHA-256
`5edd4491c5f171f8f1d6fda72047ac8a9545fbe188e89a86a719ccffdf57a620`.
The clean main build is byte-for-byte identical to the independently built and
tested scratch artifact. The captured 777,408-byte original differs beginning at
byte 24. This is bounded source recovery, not whole-program or historical build
identity. The previous `../eighteen/` package is preserved.

There are **3,355 instruction comparisons across eight suites**: 396 synthetic
sell cases, 2,953 inherited cases, and six comparisons in three genuine captured
burn/second-burn sequences. These account for 6,710 original/candidate signed
transactions. Sell has 134 successes and 262 rejections, including typed-account,
PDA/ATA, program-ID, owner, signature and writable constraints; every truncated
curve length through 141; payload lengths; rate/deadline ordering; tolerance and
reserve boundaries; real Pump CPI errors; checked accounting and rollback.

The portable sell runner was executed against the clean main artifact. Its
original and candidate receive byte-identical transactions from test-owned
payer/trader keypairs with signature and blockhash checks enabled. Synthetic
GlobalParams names the signing trader. Mayhem itself signs its real sol-vault
PDA CPI. Watched snapshots include all transaction and outer instruction accounts;
only the changed executable Mayhem account is excluded from cross-binary state
equality. Full nonprogram bytes, metadata, balances, errors, return data, events
and inner CPI agree. Failed transactions alter only the ordinary payer fee.

`sell-verification.json` comes from an independent offline verifier, which checks
all 792 signatures, 524 failed-side rollback observations, and 268 successful-side
quote/CPI/state/event checks. Expected state changes and the complete 303-byte
event are calculated from the saved account bytes. Historical sell prestate is
not available, so this is not a full historical replay. Eight historical sell
event encodings and the earlier 52-case host model remain in the host evidence
archive, separately from the actual SBF comparison.

The recovered arguments are a u128 price reference, u16 tolerance and u16 amount
subtracted from 10,000 for the retained real-SOL reserve limit. Sell validates a
fixed Token-2022 program and Mayhem self-program; its twenty-first account is the
buyback recipient. The v2 curve address is derived under Mayhem, matching the
captured parser. Sell's external curve decoder pads to 141 zero-filled bytes
before deserialization, unlike the distinct strict burn codec. Static excerpts
are checked against unchanged original ELF bytes and contain corrected relative
branch/call targets. No original machine code is embedded or patched into the
candidate.

Known diagnostic differences are retained. Compute units and source locations
differ. Four sell panic cases retain different source locations, and the
zero-virtual-SOL case additionally logs an Option-unwrapping message in the
candidate. Both executions return `ProgramFailedToComplete` and roll back fully.
The burn sequence report retains its three known second-burn source-location
log differences. Exact source/compiler revision and executable layout remain
unresolved; five other trade handlers and Mayhem-state initialization are absent.

`build-comparison.json` binds the actual current main sources and clean v1.52
toolchain. The inherited six-suite receipts were run on the byte-identical scratch
candidate and retain baseline-source metadata; those fields identify the frozen
eighteen-handler main source at that time, not the tested nineteen-handler code.
`main-scratch-identity.json`, the clean main build hashes and source snapshot
make this distinction explicit. Fresh portable sell and burn runs use the
published candidate path. `runtime-manifest.json` records the exact simulator,
dependency binaries and fixture inputs. Source/test snapshots and retained
negative build attempts are archived; executable bytes are never rewritten.

Run sell and verify its saved receipts from the repository root:

```sh
python3 scripts/mayhem_sell_differential.py \
  --candidate repro/mayhem/nineteen/mayhem_recovered.so \
  --output work/mayhem19-sell.json
python3 scripts/verify_mayhem_sell.py \
  --candidate repro/mayhem/nineteen/mayhem_recovered.so \
  --receipts work/mayhem19-sell.json --output work/mayhem19-sell-verification.json
```

The saved compressed sell report can also be passed directly to the verifier.
To replay burn sequences, extract `captured-fixtures.tar.gz` into a new work
directory and run `scripts/mayhem_burn_sequence.py --fixtures <directory>
--candidate repro/mayhem/nineteen/mayhem_recovered.so --output <new-output>`,
then `scripts/verify_mayhem_burn_sequence.py --fixtures <directory> --receipts
<new-output>`. The captures and normal signer checks are unchanged.
