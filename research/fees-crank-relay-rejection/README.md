# Crank relay rejection and complete account parser

The original crank account parser rejects a wrong **executable** relay address
with `AccountOwnedByWrongProgram` (3007). The previous reconstruction returned
`ConstraintAddress` (2012). An explicit error on the existing address constraint
recovers the complete **10,872-byte original window at 408,640**. This maps an
address mismatch to the observed error; it does not add an owner check.

On the PR #168 source, Fees advances from **394 to 395 unique structural pairs**, with **43 unmatched
original windows**. All previous normalized and raw matches survive. The
candidate has 588 windows and 64 unique raw-equal pairs. This new match is
relocation-normalized, not raw body equality or complete crank-handler identity.

## Source, instructions and referenced data

Only one account annotation changes in `donation.rs`. All 36 inputs for each
fresh build are retained in full. The program namespace, generated program-type
references, account types/order, other constraints and business handlers are
unchanged. The control exactly reproduces both retained parent ELFs from
[PR #168](https://github.com/lalalune/pumpfun-source/pull/168), carrying forward
all six newer event-context gains and the earlier panic-location contracts.

The new ELF differs from its control at exactly **two bytes**, the immediate
2012 → 3007. The reader checks the complete parser, all **97 direct local callee
bodies**, the imported call identity, the executable-before-address branch
order, both error values, the actual 32-byte relay ID and 35 selected literal
ranges. The latter include both relay field labels; other transitive metadata
and indirect-call semantics remain unproven. The crank business body at 147,944
is still unmatched.

Three adversarial checks show that changing the error scalar breaks structural
equality, while mutating relay-ID data or retargeting a CALL can preserve the
normalized body and still fail the separate data or callee contract.

## Local execution and provenance

A new 16-case matrix crosses canonical/wrong relay address, executable status,
zero/nonzero donation and ATA existence. Every transaction has normal test-owned
signatures and executes only in a local VM. Both original and candidate reject
non-executable accounts with 2007 before checking the address. Four wrong but
executable cases expose the control's 2012/3007 mismatch; the proposal passes
all 16. Error, account snapshots, inner instructions and events are compared;
logs are retained, not compared by this matrix. The receipt also records the
actual relay account key, owner, executable flag and data hash.

The current proposal freshly passes 17,331 comparisons across 18 suites; 1,542
exact outcome/log/compute query cases; and 24 growth, 32 optional-account,
20 user-ID, 8 extension-log and 30 crank-mint cases. Each harness retains its
observation limits. The control's existing regression receipts are explicitly
reused from the raw-identical parent; its 16 relay cases are fresh.

Both builds use official Linux platform-tools v1.44, `sbpf-solana-solana`,
`RUSTFLAGS=-Zremap-cwd-prefix=` and all three recorded math path remappings.
Compiler logs, input maps, symbols, strip replays and 187 harness hashes are
retained. Proposal: 868,000 bytes, SHA-256
`b5ec49ea0fe6e821049ffc893ef255f2c9e5e1048be15d16d11f60e47a6ce1a9`.
The earlier 388/389-parent experiment was superseded before publication; its
runtime receipts are not retagged as the current candidate.

`raw_compare.py` separately compares all four stored selected artifacts and this
fresh research Fees ELF with their captures and original ELF extents, without
padding or normalization. **Whole-file identity remains 0/4.** The other three
programs were not freshly compiled for this study. The later FeeConfig decoder work is a separate dataset; these counts are not
applied to its different artifact. Selected checkpoints,
program sources, scripts, workflows and ledgers are unchanged.

Run from a complete checkout:

```sh
python3 -I -B research/fees-crank-relay-rejection/verify.py
python3 -I -B research/fees-crank-relay-rejection/test_scope.py
```

The three P27 guards passed on preserved checkout `f8582fbd1`; exact commands,
outputs and scope are retained in `checks/`. This is not a later-branch guard
claim or a historical runtime-byte-identity assertion.

These checks read retained evidence; they do not rebuild or execute target
programs. To repeat runtime checks, use the pinned Python requirements and
`relay_cases.py --candidate <candidate.so> --output <receipt.json>`. The five
`extra-*.py` drivers, `exhaustive_flags.py` and root `scripts/fees_validate_all.py`
retain the other local validation paths. The recorded build driver expects the
same isolated work layout shown in its launch records.
