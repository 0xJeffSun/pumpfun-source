# Parallel Mayhem reconstruction work

The full objective remains byte-identical reproduction from Rust, including data,
relocations and ELF layout. Normalized body counts are intermediate evidence.
The composed checkpoint has 375 matching original windows and 66 unmatched.
Known behavioral and diagnostic differences remain; no entire public interface
is declared semantically proven by these counts.

| Lane | Owner | Scope |
| --- | --- | --- |
| Accounts and codecs | `curve_codec_gap` | 35 unmatched windows: parsing, initialization, serialization |
| Trades and business logic | `burn_gap` | 17 unmatched windows: trade bodies, quotes, accounting, sweeps, withdrawals |
| Runtime and binary layout | `runtime_layout` | 14 unmatched windows plus data, relocation, toolchain and whole-ELF gaps |
| Integration and validation | Main agent | Compose source changes, verify exact deltas, run signed differential suites, update docs and review/merge PRs |

Each agent uses copied source and an isolated copy-on-write Cargo target. Builds
recompile affected dependencies; source/command/output hashes are retained.
Shared immutable dependency caches may briefly take Cargo locks. All three lanes
can compile concurrently and do not write another lane's source or canonical
checkpoints. The main agent validates composed artifacts before publication.

Cross-cutting work includes all matched functions' call/data closure, raw byte
and whole-ELF equality, correct SDK/dependency provenance, and behavioral cases
beyond the current synthetic suites. The known missing sweep rate check is
assigned to the trade lane. The source/body inventory below assigns every
remaining original window once; routing is scheduling, not proof of names.

| Window | Original start | Bytes | Lane |
| --- | ---: | ---: | --- |
| O0003 | 2752 | 3352 | accounts |
| O0004 | 6104 | 4160 | accounts |
| O0025 | 24496 | 824 | accounts |
| O0027 | 26272 | 880 | accounts |
| O0030 | 28976 | 864 | accounts |
| O0068 | 49464 | 1064 | trades |
| O0069 | 50528 | 1448 | trades |
| O0070 | 51976 | 3472 | accounts |
| O0072 | 61200 | 4272 | trades |
| O0073 | 65472 | 912 | trades |
| O0074 | 66384 | 2808 | trades |
| O0075 | 69192 | 8008 | trades |
| O0076 | 77200 | 8400 | trades |
| O0077 | 85600 | 9736 | trades |
| O0079 | 95848 | 17312 | trades |
| O0081 | 113672 | 13848 | trades |
| O0082 | 127520 | 12992 | trades |
| O0083 | 140512 | 18648 | trades |
| O0084 | 159160 | 18096 | trades |
| O0087 | 178792 | 1792 | accounts |
| O0090 | 181656 | 2544 | trades |
| O0092 | 185296 | 1256 | trades |
| O0093 | 186552 | 1120 | trades |
| O0095 | 188864 | 1296 | trades |
| O0116 | 250656 | 7904 | accounts |
| O0118 | 263400 | 3328 | accounts |
| O0126 | 310296 | 4224 | accounts |
| O0128 | 333176 | 4224 | accounts |
| O0130 | 352408 | 3696 | accounts |
| O0132 | 370832 | 3696 | accounts |
| O0133 | 374528 | 4056 | accounts |
| O0135 | 396248 | 3944 | accounts |
| O0137 | 417896 | 3944 | accounts |
| O0145 | 430840 | 8784 | accounts |
| O0146 | 439624 | 3328 | accounts |
| O0147 | 442952 | 5032 | accounts |
| O0148 | 447984 | 1552 | accounts |
| O0152 | 452576 | 4576 | accounts |
| O0154 | 461432 | 3528 | accounts |
| O0155 | 464960 | 4392 | accounts |
| O0160 | 481752 | 5472 | accounts |
| O0161 | 487224 | 5176 | accounts |
| O0162 | 492400 | 5040 | accounts |
| O0163 | 497440 | 6296 | accounts |
| O0164 | 503736 | 4608 | accounts |
| O0165 | 508344 | 5752 | accounts |
| O0166 | 514096 | 1968 | accounts |
| O0167 | 516064 | 552 | accounts |
| O0184 | 524888 | 3224 | accounts |
| O0185 | 528112 | 456 | accounts |
| O0193 | 534840 | 960 | layout |
| O0202 | 538104 | 288 | layout |
| O0212 | 540936 | 640 | accounts |
| O0213 | 541576 | 2272 | accounts |
| O0214 | 543848 | 5896 | layout |
| O0220 | 584568 | 640 | layout |
| O0221 | 585208 | 3336 | layout |
| O0222 | 588544 | 528 | layout |
| O0228 | 594504 | 1656 | layout |
| O0229 | 596160 | 1344 | layout |
| O0236 | 599768 | 40 | layout |
| O0241 | 604984 | 1544 | layout |
| O0242 | 606528 | 568 | layout |
| O0289 | 636152 | 32 | layout |
| O0337 | 666624 | 40 | layout |
| O0414 | 693720 | 360 | layout |
