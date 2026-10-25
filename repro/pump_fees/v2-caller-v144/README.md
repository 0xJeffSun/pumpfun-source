# Fees V2 caller checkpoint

The V2 sharing update now composes the recovered version/authorization and quote
checks, remaining-account preprocessing, AMM V2 CPI, stored-quote payout
selection, executable-account filtering and rescaling, early state serialization,
conditional Pump V2 CPI and final shareholder validation. The retained Pump V2
IDL entry supplies its generated client. Existing account contexts and the prior
legacy compared-value correction remain. Dependencies and tools are unchanged.

The clean main executable and symbols are byte-identical to the isolated tested build:
candidate **b2d02994dbc29680273f0a3589d8d9fd2763445505483c1acbd4c9f09e1502fb**,
852,248 bytes. All 17,461 unchanged comparisons, including 417 sharing cases,
and the separate ten-step sequence pass. Saved verification checks 17,204 baseline
signature fields and 80 focused signature fields. No cases are added.

The full inventory retains 585 original and 575 candidate windows. Five original
windows gain normalized matches: 1008 (the called formatted-value helper),
548160 (Pump V2 CPI), 564232 (shared info builder), 568848 and 595656 (V2 meta
builders). Original dispositions are 453 mapped, 130 unattributed and two call
conflicts. Candidate dispositions are 455 consistent, 118 unmatched and two
conflicts. The full ledgers preserve ambiguous and unresolved rows.

Complete matched V2 CPI/meta/info roots also retain matching immediate targets;
both payout helpers call the matched formatted-value helper. Ten prior bodies,
26 targets, five literals, five codecs/35 targets and five social roots/176
targets remain matched. The 96 legacy CPI/meta/info/exit/event targets retain
their matches. Full legacy and V2 caller/parser/cleanup/data identity is open.

Independent review found no incorrect named-account association. It added
parser-return/spill/context evidence and corrected the scope of the first key
trace: straight-line composition does not evaluate branches, and the AccountInfo
clone abstraction does not establish padding bytes. Neither that review nor
finite runtime evidence proves all parser, error, borrow or target semantics.

Whole-original byte equality remains false and the security audit is incomplete.
Run `python -B verify.py --runtime` for portable saved verification; add
`--current-main --repo /path/to/repo` for current tracked-input checks. Verification
does not execute target programs or submit transactions.

The final independent review also resolves the original bonding-curve container
to AccountInfo pointer bridge, with explicit original-instruction checks. Its
portable verifier reproduces the saved parser links. Complete primitive
acceptance, error and borrow semantics remain outside that narrow result.
