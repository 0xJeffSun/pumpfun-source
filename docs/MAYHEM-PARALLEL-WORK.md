# Parallel Mayhem reconstruction work

The objective remains byte-identical Rust reproduction, including calls, data,
relocations and ELF layout. The latest published research has 426 matching
windows and 15 unmatched windows / 119,400 text bytes. Normalized matches are
intermediate evidence; complete semantic and whole-ELF equality remain unproved.

| Lane | Owner | Remaining scope |
| --- | --- | --- |
| Account and state recovery | `curve_codec_gap` | Initializer O0193 and shared accounting O0090 |
| Trade/business recovery | `burn_gap` | Trade bodies and quote arithmetic |
| Runtime/layout | `runtime_layout` | ExtendAccount O0072, data/indirect closure and exact ELF layout |
| Integration and validator recovery | Main agent | O0095; compose, verify, replay, document and review/merge PRs |

All frozen checkpoints retain their original artifacts and scope. Later changes
are validated against their actual composed source, not by summing independent
gains. The 34 rate failures and 10 counter failures are repaired. The ordinary 692
sweep cases retain 58 diagnostic differences. The explicit mixed SDK recipe is
not a fully native Linux clean-build or historical-source claim.

The [AMM sell-call successor](../research/mayhem-sell-quote-call-recovery/README.md)
adds the real O0093 call and closes its eight recorded trade diagnostic gaps.
Its full body remains unmatched (1,096 versus 1,120 bytes), despite matching
callee and typed-data multisets. All fifteen rows below therefore remain open.
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
in the trade/layout lanes and does not reduce the fifteen-row inventory below.

The following table assigns every remaining original window exactly once.
Account-data extents, ambiguous counterparts, function placement, absolute
addresses, full section contents and relocations remain cross-cutting work.

| Window | Original start | Bytes | Lane |
| --- | ---: | ---: | --- |
| O0072 | 61200 | 4272 | runtime_layout |
| O0073 | 65472 | 912 | trades |
| O0075 | 69192 | 8008 | trades |
| O0076 | 77200 | 8400 | trades |
| O0077 | 85600 | 9736 | trades |
| O0079 | 95848 | 17312 | trades |
| O0081 | 113672 | 13848 | trades |
| O0082 | 127520 | 12992 | trades |
| O0083 | 140512 | 18648 | trades |
| O0084 | 159160 | 18096 | trades |
| O0090 | 181656 | 2544 | curve_codec_gap |
| O0092 | 185296 | 1256 | trades |
| O0093 | 186552 | 1120 | trades |
| O0095 | 188864 | 1296 | main agent |
| O0193 | 534840 | 960 | curve_codec_gap |
