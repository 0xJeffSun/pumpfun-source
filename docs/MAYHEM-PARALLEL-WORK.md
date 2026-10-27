# Parallel Mayhem reconstruction work

The objective remains byte-identical Rust reproduction, including calls, data,
relocations and ELF layout. The latest published research has 428 matching
windows and 13 unmatched windows / 112,584 text bytes. Normalized matches are
intermediate evidence; complete semantic and whole-ELF equality remain unproved.

| Lane | Owner | Remaining scope |
| --- | --- | --- |
| Account and state recovery | `curve_codec_gap` | Initializer O0193 and remaining state/data work |
| Trade/business recovery | `burn_gap` | Trade bodies and quote arithmetic |
| Runtime/layout | `runtime_layout` | Data/indirect closure, sweep layout and exact ELF layout |
| Integration and validator recovery | Main agent | O0095; compose, verify, replay, document and review/merge PRs |

All frozen checkpoints retain their original artifacts and scope. Later changes
are validated against their actual composed source, not by summing independent
gains. The 34 rate failures and 10 counter failures are repaired. The ordinary 692
sweep cases retain 58 diagnostic differences. The explicit mixed SDK recipe is
not a fully native Linux clean-build or historical-source claim.

The [AMM sell-call successor](../research/mayhem-sell-quote-call-recovery/README.md)
adds the real O0093 call and closes its eight recorded trade diagnostic gaps.
Its full body remains unmatched (1,096 versus 1,120 bytes), despite matching
callee and typed-data multisets. O0093 remains among the thirteen open rows below.
Each lane uses an isolated clone of the warm build cache. Search builds use a
stable per-lane source directory and content-based package invalidation; cached
source timestamps alone are insufficient. Final acceptance still requires
agreement with the original controller's clean root build.

The [completed account-data cohort](../research/mayhem-account-cohort-complete/README.md)
has 156 typed-equal references, including the tagged I/O error at `0xb1220` and
the empty hash-table header at `0xb1340`. No references remain unresolved in
that cohort. The independent [tagged-data review](../research/mayhem-tagged-error-data/README.md)
checks the same last three references with consumer-derived bounds; its results
are not added again to the 156 observations. Other unexamined data and transitive/indirect edges remain in the
account/layout lanes.

O0073 now has a [complete block correspondence](../research/mayhem-sweep-branch-layout/README.md)
under the stated abort ABI. All eleven data references match, but the ordered
body still differs in 19 instruction slots. Its remaining placement work stays
in the trade/layout lanes and does not reduce the thirteen-row inventory below.

The [accounting/ExtendAccount checkpoint](../research/mayhem-accounting-extend-recovery/README.md)
composes the two completed bodies and the real AMM native-transfer call. Its
6,636 trade comparisons and 301 ExtendAccount cases pass. The [trade-source successor](../research/mayhem-trade-source-origins/README.md)
now composes the retained-reserve fix and AMM Sell Source corrections. Its fresh
6,636 trade comparisons leave seven diagnostic differences. Independent
checkpoints and runtime receipts must not be summed.

The parallel workers hit their account usage limit after saving their completed
proofs; the main agent continues integration and remaining reconstruction work.

The following table assigns every remaining original window exactly once.
Account-data extents, ambiguous counterparts, function placement, absolute
addresses, full section contents and relocations remain cross-cutting work.

| Window | Original start | Bytes | Remaining body | Owner |
| --- | ---: | ---: | --- | --- |
| O0073 | 65472 | 912 | Sweep-rate helper: block placement | main agent |
| O0075 | 69192 | 8008 | Sweep business body A | burn_gap |
| O0076 | 77200 | 8400 | Sweep business body B | burn_gap |
| O0077 | 85600 | 9736 | AMM Buy | burn_gap |
| O0079 | 95848 | 17312 | AMM Sell | burn_gap |
| O0081 | 113672 | 13848 | Legacy Buy | burn_gap |
| O0082 | 127520 | 12992 | Legacy Sell | burn_gap |
| O0083 | 140512 | 18648 | BuyV2 | burn_gap |
| O0084 | 159160 | 18096 | SellV2 | burn_gap |
| O0092 | 185296 | 1256 | AMM Buy quote | burn_gap |
| O0093 | 186552 | 1120 | AMM Sell quote | burn_gap |
| O0095 | 188864 | 1296 | Quote/state validation | main agent |
| O0193 | 534840 | 960 | Initializer business body | curve_codec_gap |

These body labels are reconstruction attributions, not authenticated original
symbol names. The complete raw/normalized/unmatched function partition is in
the checkpoint's [441-row inventory](../research/mayhem-accounting-extend-recovery/functions.tsv).
