# Parallel Mayhem reconstruction work

The objective remains byte-identical Rust reproduction, including calls, data,
relocations and ELF layout. The published composed checkpoint has 411 matching
original windows and 30 unmatched windows / 155,520 text bytes. These counts are
intermediate evidence; no whole-ELF or exhaustive semantic equality is claimed.

| Lane | Owner | Current scope |
| --- | --- | --- |
| Accounts and codecs | `curve_codec_gap` | Six windows: initializer/context bodies, source coordinates and indirect formatting data |
| Trades and business logic | `burn_gap` | Fifteen windows: handlers, accounting, quotes, sweeps and fee initialization |
| Runtime and binary layout | `runtime_layout` | Nine windows: CPI/runtime helpers, SDK provenance and complete ELF/data identity |
| Integration and validation | Main agent | Compose source, rebuild twice, check all windows/call/data, run signed suites, update docs and review/merge PRs |

Each lane uses a separate source and Cargo target. Frozen candidates are not
changed by later experiments. The main agent validates the actual composition;
independent gains are never added together without a combined build and replay.

The 34 recorded sweep-rate failures are repaired in the published composition.
Remaining cross-cutting work includes 13 differing direct-call observations in
unique counterparts, Source locations, unresolved data extents, formatter vtable
selection, full source/toolchain provenance, layout and relocations. Later private
416-window/native-CPI and fee-initialization variants require their own combined
validation and are not counted here.

| Window | Original start | Bytes | Lane |
| --- | ---: | ---: | --- |
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
| O0090 | 181656 | 2544 | trades |
| O0092 | 185296 | 1256 | trades |
| O0093 | 186552 | 1120 | trades |
| O0095 | 188864 | 1296 | trades |
| O0145 | 430840 | 8784 | accounts |
| O0152 | 452576 | 4576 | accounts |
| O0154 | 461432 | 3528 | accounts |
| O0155 | 464960 | 4392 | accounts |
| O0167 | 516064 | 552 | accounts |
| O0193 | 534840 | 960 | accounts |
| O0214 | 543848 | 5896 | layout |
| O0228 | 594504 | 1656 | layout |
| O0229 | 596160 | 1344 | layout |
| O0236 | 599768 | 40 | layout |
| O0241 | 604984 | 1544 | layout |
| O0242 | 606528 | 568 | layout |
| O0289 | 636152 | 32 | layout |
| O0337 | 666624 | 40 | layout |
| O0414 | 693720 | 360 | layout |
