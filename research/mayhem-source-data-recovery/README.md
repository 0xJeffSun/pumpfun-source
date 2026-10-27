# Mayhem source, data and CPI recovery

This successor composes ordinary Rust recoveries onto the published 411-window
checkpoint. It has **426/441 complete normalized counterparts: 70 raw-local,
356 normalized-only and 15 unmatched windows**. The fifteen new matches cover
36,120 original text bytes. Unmatched windows still span **119,400 / 706,744
original text bytes (16.9%)**. Counts describe inferred machine-function windows,
not perfect public handlers or a source-completion percentage. Whole ELF and
capture identity remain false.

## Recovered bodies and behavior

| Original window | Recovered body |
| --- | --- |
| O0074, O0414 | Fee-recipient initialization and its u8 comparison formatter |
| O0145 | Complete Mayhem-state initializer account parser |
| O0152, O0154, O0155 | Legacy Buy CPI and its account-meta/info builders |
| O0167 | Global-parameter initializer dispatch |
| O0214 | Complete BuyV2 CPI helper |
| O0228, O0229, O0241, O0242, O0289 | Token-2022 close-account/sync-native wrappers, constructors and invoke helper |
| O0236, O0337 | Two runtime TypeId helpers with the Linux target metadata |

All prior normalized/raw matches and positive immediate-call observations remain.
Every new body has matching immediate local callees. All 441 original windows
are listed in `functions.tsv`; `unmatched.json` retains the full remainder.

The source also restores seven actual shared validation calls in the trade
handlers and repairs sweep counter evaluation. A new 48-case matrix exposes ten
parent failures caused by adding the running total before subtracting the prior
total. The repaired source adds only each recipient's own transfer delta. The
ordinary 150-case sweep-rate matrix still preserves the earlier 34 parent
failures and records zero on this candidate. Neither repair is counted as a new
complete sweep-handler match.

Initializer fields now use the original concrete System and Token-2022 Program
types. Two additional signed legacy-token cases reproduce the original
InvalidProgramId rejection; the parent produced a different missing-account error.
The typed legacy Buy keeps its two remaining accounts and correct read-only
volume metadata. Global initialization explicitly sets the observed zero fields.
The complete BuyV2 helper uses its own account type so cleanup stays in the
original body; its serializer/meta/info helpers are used by the real handler.

## Data and build scope

The source restores six account-wrapper/decoder locations, the global-update
event location, and the shared Pump macro's line-19 origin. Moving the actually
used V2 interface into the external-account crate also selects the matching
String formatting methods in both decoder vtables. No code is injected into
an unused function solely to increase the matcher count.

Portable binary checks retain explicit limits:

- The earlier account cohort has 156 data observations: 97 typed-equal, zero
  typed-different and 59 unresolved extents. Repeated counterparts are counted.
- Eight interface bodies have 374 matching immediate callees and 50/50 equal
  Source records. Five native CPI bodies have 54 matching calls and six equal
  bounded data records; two 80-byte constant extents remain explicitly inferred.
- The four added Buy/global-init bodies have 114 matching calls and nineteen
  equal bounded data references.
- In the previously matched cohort, 216 additional Source observations now agree.
  This is not a claim that every data reference or indirect call is proved.

Two builds from 65 source inputs agree:

- Candidate: `e51e600c339f592d75889e82d5b0d9eb397982c32a64f15a5debcf5a114375cf`
- Symbol ELF: `6d90940933cc97c7858fae262e77c0f735ee059c1a71350e500b156cd7809522`

The explicit mixed recipe uses the unchanged installed macOS v1.54 compiler
with the unmodified Linux v1.54 SBF target libraries and v1.52 stripper. All 26
target files were independently checked against their exact members in the
hash-pinned official archive. The 2,328 non-target files match the installed
macOS SDK copy; that is copy-integrity evidence, not a new host-archive check.
The root, Anchor and external-account crate are recompiled; other cached
packages are reused. A full native Linux clean build is still a separate task.
No original ELF is a compiler/linker input, and no output is patched or padded.

## Execution and verification

Fresh local replay covers the exact candidate: 6,636 trade comparisons, 1,032
admin cases, 1,601 fee/sweep/withdrawal cases, three two-step Burn families,
150 sweep-rate cases, 48 counter cases, 53 initializer rejections, sixteen genuine
captured-Pump CPI cases, two token-program cases and six global-init cases.
The Pump CPI corpus includes ten successes; global initialization includes two.
The inherited misleading zero-creator fixture is excluded because it does not
actually put zero in its payload.

Transactions use ordinary signatures and local synthetic fixtures or retained
Burn snapshots. There is no live RPC or mainnet activity. Account changes,
rollback, events, CPI, return data and actual signatures are rechecked from
saved receipts. Diagnostic equality is reported separately; remaining business
body, diagnostic, layout, data, relocation and historical-provenance gaps are
not erased by finite successful tests. Selected checkpoints remain unchanged.

```sh
python3 -B research/mayhem-source-data-recovery/analysis.py --check
python3 -B research/mayhem-source-data-recovery/verify.py
python3 -B research/mayhem-source-data-recovery/test_scope.py
```

These commands require the prepared `solders` environment. They verify saved
evidence without launching a compiler or target VM. Source substitutions,
parent-binary substitution, duplicate cases and altered counter inputs are
covered by negative controls.
