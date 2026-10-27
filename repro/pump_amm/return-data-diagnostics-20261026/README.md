# CPI return-data control flow

Read-only evidence; no candidate correction or runtime acceptance claimed.

Original `0x13458` is the Fees CPI helper called by legacy Buy (`0x379a0`), BuyExactQuoteIn (`0x3b0d0`), and Sell (`0x49dd0`). It obtains return data with unwrap and deserializes exactly three u64s: only24 bytes are accepted. Below24 goes to an unexpected-length panic; above24 to `Not all bytes read`. Current legacy sources use `TradeFees::deserialize`, allowing trailing bytes, with recoverable errors.

Original `0xd84b0` is the curve-run CPI Return helper. Its only direct callers are `0x48330` and `0x48e40`, both inside `0x45940`. It unwraps return data and accepts exactly16 bytes, loading TWO u64s. Current multi-hop's16-byte length requirement matches; the differences are panic versus custom mismatch error and explicit returned-program validation in current source. The initial8-byte interpretation was an analysis error and is superseded.

The original helper does not compare the returned program ID. Whether the surrounding caller enforces an equivalent property needs a dedicated probe before changing that condition. Do not remove checks or synthesize an unused error-constructor caller to restore a compiler specialization. `evidence.json` records all actual direct call sites, bounded original byte ranges, current source hashes and affected lines.

Exact original branch addresses and source-location records are included in the JSON. Absent or invalid curve returns panic at original lib.rs:22:1; the Fees equivalents use lib.rs:23:1. The return syscall chain is original106e28 ->108638 -> sol_get_return_data at1086b0. Neither decoder uses the returned program key. The curve wrapper has no additional call to106e28, so the current explicit returned-key check is a semantic difference, subject to proving reachability in a dedicated probe.

## Synthetic dependency observations

The built Rust oracle is explicitly synthetic and loaded only into local LiteSVM at the FEES/PUMP program ID. It scans an appended control trailer in a supplied fee-config account; it changes no accounts. AMM binaries remain genuine, unchanged bytes. The oracle source, exact pinned v1.44 build record and23,584-byte ELF are in results/synthetic-oracle/. The first build was intentionally interrupted after identifying an empty-trailer scan bound; that source and build attempt are separately retained. Two early harness attempts stopped at pre-CPI minimum guards; their logs are retained and excluded from completed counts.

Completed baseline:65 cases,130 signed executions. Each of Buy, BuyExactQuoteIn, Sell, curve buy and curve sell covers absent return plus lengths0,1,7,8,15,16,17,23,24,25,31,32. Fee payload starts with u64s20,5,0; curve payload with0,0. Original absence/empty data panics on Option::unwrap; nonempty short data panics with InvalidInput/Unexpected length of input; trailing data panics with InvalidData/Not all bytes read. Exact24 fee cases pass decoding then reach the fixture's6053 buyback-recipient guard. Exact16 curve cases pass decoding then reach slippage6004 (buy) or balance6085 (sell); oracle deliberately performs no token movement. These later failures are not decoder failures.

Generated-fee candidate: same65/130 matrix retained separately. All39 fee cases have matching errors, effects, events, inner instructions and signed inputs. Thirty-six malformed-return full logs match after excluding compute counters and mapping exactly original lib.rs:23:1 to candidate src/lib.rs:41:1 panic coordinates. Three exact24 cases retain a6053 source-origin discrepancy (global_config.rs:326 versus legacy_buy.rs:369 or legacy_sell.rs:290); the comparison does not hide these. Curve behavior remains the baseline counterexample.

results/{baseline,generated-fee}/observations.json.gz retain raw logs, complete before/after snapshots, transaction bytes and signature checks. verify_observations.py independently checks65-row matrix completeness, source/build/ELF provenance, actual oracle invocation, identical paired inputs and all130 signed executions. This is bounded synthetic dependency evidence, not acceptance against the real deployed dependency or complete contract equivalence.

## Strict fee + curve candidate

Candidate49d275e661057ce0a269f3d60f54e5c9ebad56647234b85a22e364bc57aa2e77 has all65 errors, events, inner instructions, return data, account effects and signed inputs equal to original in the oracle matrix. All60 malformed-return full logs match with only explicit compute exclusion and exact panic-site mappings in strict-comparison.json. Five exact-length cases retain later business-guard source-coordinate differences, deliberately unnormalized. Strict receipts/build/binary are under results/strict/.

No wrong-program-return oracle was exercised. The oracle returns under the expected FEES or PUMP ID; it does not spoof another program, alter syscalls, bypass signatures, or edit AMM bytes. Consequently these observations establish malformed length/absence behavior only, not adversarial returned-program provenance behavior.

The strict candidate has no separate read_cpi_return symbol: its private generic helper was inlined into multi_hop_swap, explaining why original344-byte root0xd84b0 did not become a matched complete symbol. strict-helper-inlining.json records original calls, current get-return call/inlined prefix, and length-error targets.
