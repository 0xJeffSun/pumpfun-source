# Pump final-error metadata: one controlled source build

The approved four-file metadata separation builds cleanly and restores matching
complete `PumpError` Debug, Display, name and From-error bodies. It does not add an
instruction, writable-account check, fixture or coverage case. Main was not edited.
This is a scratch source-fidelity checkpoint; full original ELF equality and the
security audit remain incomplete.

## Exact source and build

The baseline is the 37-input Pump source checkpoint producing
`731003570927c206353555d9743d70229234e7e3fa167a5915fa146f3007fc93`.
The immutable approved proposal is retained unchanged under `approved-proposal/`,
including seal `1771c21aedc459181abcf8ac4c664512cbc38731e930ec99a0d9bbc498f0fce9`.
Only the approved `lib.rs`, `create_v2.rs`, `trade.rs` and `multi_hop_curve.rs`
bytes differ. `PumpError` ends in binary-evidenced `QuoteMintNotWritable = 110`;
all 11 preexisting reconstruction fences use a separate local error declaration
with their unchanged name, message and code 6110. The captured official IDL still
ends at 6109. The accepted migration-specific enum is unchanged. No compatibility
Buy mux or other source hypothesis was included.

One clean isolated build used the unchanged accepted helper, lockfile, profile,
v1.44 compiler selection and actual v1.52 SDK strip phase. All 37 source inputs,
three build helpers, five measured tools, 53 SDK files and the existing 252-package
cache inventory (14,281 archive/source-file measurements) were verified before
and after compilation. The SDK, rustup alias and target were isolated. Compiler
and launcher exited 0, with no backend stack-limit failure. There was no build
retry, source repair, dependency change, path/flag variant or executable patch.

The resulting stripped ELF is 1,582,168 bytes,
`2aa18c73e517d9f74063633ea5d5b15f187d63e4dd4c09678b852afdd588cbc3`.
The symbol ELF is 2,165,456 bytes,
`78cbc62e21a5df9f16ee346f0609441168f52088157bc601851d10e7e3cf757d`.
`prebuild-snapshot.tar.gz`, source snapshots, actual input maps, build attempt,
complete log, tool phases and dependency rechecks preserve the measured recipe.
No generated deployment keypair was read, hashed or retained; the build target
was never archived wholesale.

## Complete metadata bodies and remaining data obligations

| Method | Original half-open window | New half-open window | Bytes | Actual direct calls whose complete target patterns match |
|---|---|---|---:|---:|
| Debug |1436840–1441232|1226160–1230552|4392|1/1|
| Display |1433224–1436840|1222544–1226160|3616|19/19|
| name |1405824–1432720|1195144–1222040|26896|38/38|
| From |1432720–1433224|1222040–1222544|504|4/4|

All four full instruction patterns agree after normalizing only actual direct-call
and relocation immediates. None is raw-byte identical. These are actual called
targets, not a substituted unused helper. Each original extent is inferred from
captured entry evidence; candidate extents come from the fresh symbol ELF.
All 111 Debug selections agree. The established final 108–110 Display selection
checks agree, including the 115-byte final message. The complete name and conversion
bodies, calls and literals are recorded separately. No surrounding excluded
business branch was interpreted or changed. The local reconstruction enum has no
separately named method symbol in this optimized ELF; source preservation and the
unchanged regression corpus are not represented as a complete fence-path proof.

The 62 matched direct call sites do not close every transitive data obligation.
`metadata-closure.json` retains every metadata relocation, complete actual direct
target body and the selected consumed literals. In particular, From's diagnostic
path passes the same 55-byte panic message but still has different source-location
data: the original uses `/home/runner/.../alloc/src/string.rs` (84 bytes), while the
candidate uses `/Users/runner/...` (85 bytes); both records contain line 2559, column 14.
Two other From relocated tables have unresolved extent/type and are explicitly
not treated as string slices. Additional helper/transitive data behavior remains
unproved. A matching normalized formatter is never claimed to establish blanket
semantic or full-binary equivalence.

## Exhaustive inventory with comparable denominators

`full-before-after-inventory.json.gz` recomputes both 731003 and 2aa18c with the same
published pass01 window/section/relocation/call-fixed-point algorithm. Its adapter
changes only the image-loading API and removes stale source/status fields.

| Metric |731003 baseline|2aa18c candidate|
|---|---:|---:|
| Original inferred windows |1035|1035|
| Candidate symbol windows |785|786|
| Candidate windows with a normalized relocation-pattern match |492|494|
| Candidate windows retaining a call-consistent match |423|428|
| Original windows retaining a call-consistent match |450|455|
| Call-consistent candidate/original pairs |1076|1081|
| Raw-equal pairs, including aliases/ambiguity |617|617|

A second simpler ledger reports original windows having any normalized-pattern
match: 526→528; original windows with any raw match stay 98. That is a different
denominator from candidate 492→494. Both ledgers retain every row, actual call
relationship, ambiguity and hash. Unmatched or stopped bodies remain opaque;
this inventory is not new semantic or vulnerability research.

The fresh BondingCurve serializer remains a complete 1840-byte normalized match,
with all 25 actual direct targets and the exact consumed discriminator checked
against the new symbols. Old candidate addresses are not reused as proof.

## Fresh unchanged offline validation

The complete current corpus was repeated: 9,269 differential comparisons across
40 suites, plus 1,024 comparisons across 28 unchanged signed Surfpool runners.
All numeric process exits are recorded as 0 and all reports pass. These are the
same accepted inputs, not new unique coverage. The differential reports contain
15,934 signed transaction records/24,352 verified signatures; Surfpool contains
2048 signed transactions/2980 verified signatures. The additional nested
original-only prerequisite repeats 16 cases / 32 signatures separately.

The published 36 baseline suites, native partial 56, two-curve 20, nested 16 and
three-hop route 16 retain their original cases, assertions and signing/history
controls. The unchanged nested harness's `new_unique_cases: 16` field describes its historical fixture definition, not new coverage added by this replay. Only two explicit provenance adaptations were needed: the nested
expected-source map names the four changed hashes, and the route binding reader
normalizes one verified scratch prefix before checking its 37 source paths.
No fixture, condition, packet limit, account order or test assertion changed.
The exact adaptation diffs and before/after hashes are retained.

All 68 receipt bindings identify this exact ELF, original ELF and actual 37 compiler
inputs. Incidental main-checkout source maps embedded by unchanged legacy runners
are retained as checkout snapshots, not mislabeled as the compiled scratch source.
Nested journals, original/candidate route packets and results, full process logs,
loaded Python/Solders identities and historical Surfpool executable identity are
retained. A portable saved-data verification requires no local Surfpool executable
and performs no VM execution or signing.

## Diagnostic preservation and verification

The first static selector attempt asked the established helper to handle earlier
Display forms outside its supported final-slice domain and stopped. Its script and
trace are retained; the final check uses all 111 Debug and the existing final three
Display forms. Its first child numeric exit was not separately captured by the
initial grouped shell call; it is not fabricated. A separate static data collector
initially assumed every official IDL entry supplied `msg` and exited 1; it now reads
only existing message entries. Neither diagnostic was a compiler, target-runtime
or source failure. A table-shaped relocation was also explicitly separated from
Display slice decoding; unresolved tables are retained as unresolved.

Run `python -B /path/to/handoff/verify.py` with the accepted Solders dependency.
Optionally add `--repo /path/to/pumpfun-source` to check the still-unchanged baseline
source and maintained input files. The verifier checks seals, approved exact source
changes, build and tool bindings, complete fresh metadata/inventory/serializer
results, all saved signatures, strict nested and route assertions, original
messages, state/events/return data/log comparisons, and all receipt/source mappings.
Copied-directory positive and missing/tamper negative checks accompany this handoff.

No main promotion, new function count, new coverage, completed audit or original
full-byte equality is claimed. Previously excluded Pump sell-v2 transfer-fee,
incentive, Mayhem-initializer and old-extension work remains excluded; repeating
the approved unchanged corpus did not reopen those lanes.
