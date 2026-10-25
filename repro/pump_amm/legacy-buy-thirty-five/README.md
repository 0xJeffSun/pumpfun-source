# PumpSwap legacy buy main-path checkpoint

This candidate adds `buy` and `buy_exact_quote_in` and corrects the zero-fee cashback
sell event labels discovered after AMM33 publication. All 23 original/candidate suites
pass 16,221 comparisons: the preceding 15,194, 16 explicit sell event regressions, and
1,011 legacy buy/exact-quote cases. Source has 35 instruction bodies of 38.

Legacy buy and exact-quote use their actual captured Fees CPI and direct token payouts.
The optional legacy volume flag defaults false when omitted and rejects invalid bool
bytes. A user accumulator is initialized in account validation and its user field is
updated; existing volume/counter fields remain unchanged in the bounded observed paths,
while the track flag appears in the event. A global accumulator is validated as a typed
PDA account. The exact-quote event uses the original instruction's distinct field meanings.

Pricing, quote transfer-fee gross-up, fees, slippage and remaining accounts were recovered
separately from v2. Only the pool deposit is increased to cover its token transfer fee;
protocol, creator, cashback and buyback payouts use gross stated amounts. Buyback events
report the net amount received. Cashback creates its remaining ATA through actual CPI,
pays it and updates earned cashback before validating pool-v2. Configurable creator fees,
quote families, canonical/noncanonical pools, Mayhem/holder flags, account layouts,
identity/ownership/writability, pre-funded creation, self transfers, transfer-fee boundaries,
zero budgets, overflows and rollback/error ordering are included in finite checks.

AMM33 incorrectly reclassified event basis points whenever its cashback flag was set,
even when the creator fee rounded to zero. AMM35 reclassifies only for a positive fee.
`sell-event-correction.json` binds the preserved negative signed receipt to an exact
original result and transaction in the passing sell suite, plus 16 positive regression
cases. This was an event/event-CPI mismatch; account state and payouts matched. The
published AMM33 package and root's historical negative package are not changed.

Every test uses ordinary verified local signatures, synthetic state explicitly marked,
and unmodified captured SPL Token, Token-2022, ATA and Fees dependencies. Existing
migration/reassignment suites retain genuine original-program PDA CPI signing. Full
watched account bytes/lamports/owners, event and inner instruction bytes, return data,
errors and signed transactions are compared as documented per suite. Diagnostic logs
and compute consumption are excluded. These finite fixtures do not establish real-world
reachability of invalid synthetic state, exhaustive equivalence, or historical source.

Clean build 03 uses the unchanged validated AMM v1.44 lock and isolated cache. Its
16 source/manifest/lock inputs and current test/helper closure are hashed and archived.
Compiler provenance and archive checksums are retained. Captured executables are used
only by post-build comparisons and local runtime tests, not compiler inputs. No binary
bytes or headers are edited. Whole-file and ELF-extent identity both remain false.
Independent comparison also preserves the preceding AMM33 executable identity.

Two unsuccessful source drafts, their verified snapshots, logs and exact harness/runtime
receipts are preserved. Build 01 had 23 mismatches among 722 cases, all around quote transfer
fees; build 02 had 5 mismatches among 1,011 cases around missing-cashback errors, zero-creator
cashback event labels and overflow/slippage order. Static excerpts and original-only
observations support those repairs. Final standalone buy and extended sell harnesses
are frozen separately from early probe imports.

The clean main-path v1.44 build is whole-file identical to scratch build 03: 1,034,280
bytes, SHA-256 `657ee4e28efa4d65e44347cd92c2a98c143c9e04055ab31f06002ea19f2caccd`.
`main-scratch-identity.json` binds both complete build input maps. All 23 suites ran
against scratch. The 21 unchanged suite receipts are reused by this executable identity;
the maintained 575-case sell and 1,011-case buy harnesses were also replayed from `/tmp`
against the main executable and exactly match the scratch cases. They do not add new
unique cases to 16,221. Historical scratch receipts and executed commands remain under
`scratch-build/`; the main package holds the new legacy receipts and current test closure.

Restore `source-snapshot.tar.gz` and `test-snapshot.tar.gz` to repository-relative paths,
prepare a checksum-verified cache from the v1.44 lock, and clean-build with
`scripts/build_partial_candidate.py`, manifest `programs/pump-amm/Cargo.toml`, program
`pump_amm`, artifact `pump_amm_recovered.so`, tools version `v1.44` and a new output folder.
`replay-commands.json` lists all 23 suites. The two maintained legacy harnesses resolve
the repository root from their own path, normalize imported fixture readers to it, and
resolve candidate/output arguments against the invoking directory.

The prior AMM33 package and root's independent historical negative package at
`repro/pump_amm/legacy-sell-zero-fee-gap` remain unchanged. Three bodies remain absent:
`boost_buy_and_burn`, `create_config`, and `multi_hop_swap`. Fixed-signer guards have not
been bypassed. The separate frozen security scan does not cover this checkpoint.
