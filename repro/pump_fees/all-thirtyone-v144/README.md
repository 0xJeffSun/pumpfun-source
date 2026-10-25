# All31 instruction-body checkpoint

The main-path v1.44 build is 769,816 bytes, SHA-256
`e50bac42ecdaedf440984a9c62dc347b61f03108236d5b744faad60a3e919cd4`.
The captured 948,944-byte original still differs, starting at byte24. All31 IDL
instruction bodies now have implementations, including two deprecated rejecting
dispatches. Context equivalence, historical source/compiler/dependency identity
and complete security remain unproven.

The same executable passes 17,331 synthetic signed/query SBF comparisons, two
authentic historical initializer replays, and28 ordinary initializer rejection
cases: **17,361 saved SBF comparisons**. It also passes112 independent Surfpool
comparisons using224 signed local transactions, plus the persistent ten-step
donation sequence with20 transactions. Each receipt retains its normalization,
synthetic-state and coverage limits. Tests execute captured external dependencies;
their presence is not a source-reconstruction or audit claim.

The initializer uses the original unchanged313-byte signed messages from two
public transactions. Both explicit and runtime signature verification remain on.
Only blockhash freshness is disabled for replay; a freshness-enabled control
rejects the old message. Successful account bytes, balances, events and inner
CPIs agree. The current capture postdates the transactions, and full historical
account data/bank state is unavailable. [Historical evidence and portable runners](../initializer-history/REPORT.md)
preserve these limitations and the initial harness correction.

The clean build uses the pinned lockfile and checksum-verified isolated Cargo
cache with locked/offline resolution. Source hashes, actual toolchain/environment,
log and full-byte comparison are retained. The raw helper report is preserved as
`build-comparison.generated.json`; `build-comparison.json` corrects only its generic
unsupported-handler scope wording. Build facts and comparison fields are unchanged.
The frozen source and helper are included. Original executable bytes never enter
the compiler or replace candidate output.

Reproduce using [the crate build instructions](../../../programs/pump-fees/README.md),
then run `scripts/fees_validate_all.py` and both initializer runners in
`repro/pump_fees/initializer-history/` with the new candidate and separate output
files. `repro/status.json` indexes all current receipts.
