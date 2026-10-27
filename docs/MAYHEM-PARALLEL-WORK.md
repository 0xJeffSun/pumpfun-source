# Parallel Mayhem reconstruction work

The objective remains byte-identical Rust reproduction, including calls, data,
relocations and ELF layout. The latest published research has 426 matching
windows and 15 unmatched windows / 119,400 text bytes. Normalized matches are
intermediate evidence; complete semantic and whole-ELF equality remain unproved.

| Lane | Owner | Remaining scope |
| --- | --- | --- |
| Account and data review | `curve_codec_gap` | Unresolved data extents and initializer body O0193 |
| Trade/business recovery | `burn_gap` | Fourteen larger handler/arithmetic bodies and diagnostic gaps |
| Runtime/layout | `runtime_layout` | Transitive/indirect closure, provenance and exact ELF layout |
| Integration | Main agent | Compose, rebuild, verify all observations, replay, document and review/merge PRs |

All frozen checkpoints retain their original artifacts and scope. Later changes
are validated against their actual composed source, not by summing independent
gains. The 34 rate failures and 10 counter failures are repaired. The ordinary 692
sweep cases retain 58 diagnostic differences. The explicit mixed SDK recipe is
not a fully native Linux clean-build or historical-source claim.

The [AMM sell-call successor](../research/mayhem-sell-quote-call-recovery/README.md)
adds the real O0093 call and closes its eight recorded trade diagnostic gaps.
Its full body remains unmatched (1,096 versus 1,120 bytes), despite matching
callee and typed-data multisets. All fifteen rows below therefore remain open.
The three agents' last runs stopped at account usage limits; the main agent is
continuing from their frozen source/evidence rather than claiming live parallel
execution.

The following table assigns every remaining original window exactly once.
Account-data extents, ambiguous counterparts, function placement, absolute
addresses, full section contents and relocations remain cross-cutting work.

| Window | Original start | Bytes | Lane |
| --- | ---: | ---: | --- |
| O0072 | 61200 | 4272 | trades |
| O0073 | 65472 | 912 | trades |
| O0075 | 69192 | 8008 | trades |
| O0076 | 77200 | 8400 | trades |
| O0077 | 85600 | 9736 | trades |
| O0079 | 95848 | 17312 | trades |
| O0081 | 113672 | 13848 | trades |
| O0082 | 127520 | 12992 | trades |
| O0083 | 140512 | 18648 | trades |
| O0084 | 159160 | 18096 | trades |
| O0090 | 181656 | 2544 | trades |
| O0092 | 185296 | 1256 | trades |
| O0093 | 186552 | 1120 | trades |
| O0095 | 188864 | 1296 | trades |
| O0193 | 534840 | 960 | accounts |
