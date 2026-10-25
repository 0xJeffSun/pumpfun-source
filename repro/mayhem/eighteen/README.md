# Mayhem eighteen-handler checkpoint

The independently compiled main-source candidate implements 18 of 25 identified
instruction paths. It is 359,832 bytes, SHA-256
`2bcbfb642d6f970cf0e486d6ccf3fa1b6adbb4ba507db565e13a1b1e666e174c`.
The 777,408-byte original differs, beginning at byte 24. Full reconstruction,
historical build identity and a complete original-program audit remain unfinished.

`burn_tokens` adds the recovered 106-byte MayhemState codec, deadline/status
guards, full-vault token burn, burned-amount update, two independently timestamped
events and final ended status. The context retains the original typed-account,
PDA, token-interface and duplicate-mutable checks. Unresolved fields keep neutral
names. The codec's width does not establish their semantics or signedness.

All 2,953 inherited regression cases pass against this executable. Three genuine
eligible account families captured at finalized slot 461064598 each pass a first
burn and a second-burn rejection, for **2,959 comparisons** in total. These six
additional instruction comparisons use 12 normally signed local transactions.
The input account bytes, owners, rent metadata, balances and captured Clock remain
unchanged; only an ordinary test-owned fee payer is added. The second transaction
uses the first transaction's actual post-state and a fresh blockhash, without reset
or business-account mutation. It returns 6004 and changes only the payer's fee.

The independent receipt verifier checks complete nonprogram account state,
balances, error name/number/message, event payloads, signed transactions and inner
calls. Raw compute logs and the second-burn source location differ. The raw
comparison records those three log mismatches; `burn-sequences/verification.json`
records agreement only for its expressly listed fields. The six burn comparisons
are counted by executed instruction, while the raw runner groups them into three
sequences. They are genuine current-snapshot tests, **not historical replay**.
Four historical signed batch-burn transactions are retained as evidence, but their
pre-state bank/account bytes are unavailable and were not invented.

The crate now uses locked Anchor 1.0.0 and platform-tools v1.52. Static evidence
for that framework family includes error 2040, typed mutable-account duplicate
checks, a Pubkey-based CPI context and the event-authority constant. These do not
uniquely identify the historical revision. Official Anchor 1.0.0 skips the zero-ID
System address check through its unit-program special case. An explicit source
wrapper restores the captured ID-before-executable check. The first full build
had 25 mismatches on wrong-System inputs; the retained source wrapper resolves
those cases. Dependency sources and executable bytes were not patched.

The clean main-path build is byte identical to the fully tested scratch build.
The inherited receipts' source metadata identifies the frozen seventeen-handler
baseline, not the candidate source. `build-comparison.json` and the source
snapshot bind the actual integrated eighteen-handler code. `full18-summary.json`
preserves that distinction. Build attempts 1/2/4/5 failed compilation; their input
hashes/logs are retained, but complete source snapshots for those failed attempts
were not retained. The failed behavioral build 3 has its source and artifact.

To replay the genuine sequences from the repository root:

```sh
mkdir -p work/mayhem-captured-fixtures
python -c "import tarfile; tarfile.open('repro/mayhem/eighteen/captured-fixtures.tar.gz').extractall('work/mayhem-captured-fixtures', filter='data')"
python work/mayhem-captured-fixtures/verify_fixtures.py
python scripts/mayhem_burn_sequence.py --fixtures work/mayhem-captured-fixtures \
  --candidate repro/mayhem/eighteen/mayhem_recovered.so --output work/mayhem-burn-replay
python scripts/verify_mayhem_burn_sequence.py --fixtures work/mayhem-captured-fixtures \
  --receipts work/mayhem-burn-replay
```

Use a new output directory for each run. The source snapshot, local test snapshot,
exact toolchain/build records, captured RPC responses, raw account/transaction
bytes, failed attempts and receipt hashes are retained. Seven identified paths
remain absent: state initialization and six Pump/PumpSwap trade paths. The source
security review frozen at commit 329fc44 does not cover this addition.
