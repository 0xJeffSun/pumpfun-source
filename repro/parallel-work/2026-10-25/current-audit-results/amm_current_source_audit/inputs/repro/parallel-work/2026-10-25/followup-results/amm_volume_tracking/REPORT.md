# AMM F01: original legacy buy volume dataflow

**Disposition: no demonstrated original-versus-candidate reconstruction gap.** The identified original legacy buy bodies preserve the tracking boolean in the event without calling the known volume/reward updater. Saved current5a comparisons include successful track=true trades inside a configured schedule window with unchanged counters. This is evidence of preserved original behavior, not proof that the original authors intended to disable tracking, and not a security or reward-eligibility judgment. No source patch is proposed.

Frozen source checkpoint: `517d77db988d8c63b6cf476f0be138c5a4f3128a`. Original ELF SHA256: `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`. Current candidate identity from the retained summary and receipt: `5a68db39372121c6406727bced3087aa9caf63f14a999ac68206c9b5b3401216`; candidate executable was not rebuilt or consumed. All source inputs come from frozen Git blobs, except the explicitly permitted root-reviewed F01 observation, whose pending-publication status and source hash are recorded. Simultaneous setter trials were not used.

## Identity established from bytes

All hexadecimal addresses below are zero-based original ELF file offsets, end-exclusive for ranges. `result.json` supplies full range SHA256s, call sites and targets. Retained disassembly windows are evidence excerpts, not recovered historical Rust symbols or an assertion that all compiler function boundaries are known.

| Instruction | IDL discriminator | Original dispatch | Wrapper → body |
|---|---|---|---|
| buy | `66063d1201daebea` | LDDW at `0xdbf58`; equality at `0xdbf68` branches to `0xdca88`; call `0xdcad8` | `0xe7648`; body call `0xe78a0` → `0x376b0..0x39d80` |
| buy_exact_quote_in | `c62e1552b4d9e870` | LDDW at `0xdbf78`; equality at `0xdbf88` branches to `0xdcaf8`; call `0xdcb48` | `0xe7d88`; body call `0xe7fe0` → `0x3a5a0..0x3d828` |

The wrapper log literals independently identify Buy and BuyExactQuoteIn. Both wrappers call account context `0xaafd8` and successful exit `0xb1370`. The IDL orders global/user accumulators at account indexes 19/20; global is readonly and user writable. Candidate wrappers at `inputs/programs/pump-amm/src/lib.rs:42–43` select the same two legacy branches. This rules out confusing the v2 handlers with the legacy handlers.

## Boolean, account and event flow

Original Buy wrapper `0xe76c0..0xe7718` reads two u64 arguments and an optional byte. Missing byte defaults to false; 0/1 are accepted, other values branch to deserialization error. It restores the boolean into r5 at `0xe7898`. Exact wrapper has the analogous path `0xe7e00..0xe7e58` and restores r5 at `0xe7fd8`.

Buy saves r5 at `0x376e8` to stack -0x580, reads it at `0x39780`, and stores its byte into the event at `0x39788`. Exact saves r5 at `0x3a5d8` to -0x668, reads it at `0x3d210`, and stores the event byte at `0x3d218`. Each named spill has exactly these two references in the complete retained body. Neither body directly calls `0x6d408` or branches on the saved flag. This is concrete original dataflow, beyond a source-only search.

Buy `0x38e70..0x38ec8` copies the user key into the accumulator object. `0x38ec8..0x38f10` reads its timestamp, volume, claimed and unclaimed values for the event. The Rust object offsets here are **not serialized account offsets**: boxed-account object +0x28/+0x30/+0x38/+0x40 feed the unclaimed/claimed/volume/timestamp event fields; wire offsets are 41/49/57/65. `state.rs:125–135` defines the candidate fields. The exact body repeats this sequence after its payouts at `0x3c8b0..0x3c950`. Cashback may separately increment earned cashback; it is not incentive volume.

Candidate `legacy_buy.rs:41–44` validates canonical global/user PDA seeds; the user may be initialized by account validation. `96–498` contains both trade branches. Payouts occur first, cashback increment is at `369–373`, user assignment at 418, Clock timestamp at 420, and event flag/counters at `451–455`. Event emission occurs at `496–497`. There is no candidate buy reward-update call. No global volume write is present in this candidate handler, and the original IDL's readonly global privilege agrees with that design. Readonly IDL metadata alone is not an exhaustive alias/write proof.

## The reward updater exists, but is not called by these buy bodies

The permitted complete helper excerpt `claimupdate.asm` covers `0x6d408..0x6db20`; `endday.asm` covers `0x6f3c8..0x6f4b0`. Identity is grounded by the published incentive recovery ranges and the claim body call `0x5a640`, not by a speculative function-name match. Static direct-call decoding across the original ELF .text, excluding relocation type 10 syscall sites, finds **one direct caller** of `0x6d408`: that claim site. Claim explicitly sets r5=0 at `0x5a638`.

The shared helper is capable of accepting nonzero volume in r5:

- `0x6d408..0x6d4e0`: reset claimed fields only when both timestamps precede start; reject negative conversions, skip accrual before start or with zero period.
- `0x6d4e0..0x6d5d8`: compute current/previous days, consult end-day helper, require completed eligible previous day and nonzero global/user volume; indexes must be below 30.
- `0x6d5d8..0x6d6f8`: wide product of user volume and daily supply divided by global daily volume; reject truncation and unclaimed-total overflow; update reward, timestamp, needs-claim and clear previous volume.
- `0x6d918..0x6da38`: while now is at or before end, read today's global bucket, checked-add r5 and store it; checked-add r5 to user volume, update timestamp and needs-claim. Overflow paths at `0x6dac0` and `0x6d9c8` are explicit. **The claim caller passes zero**, so these are not evidence that buys feed trade volume into this helper.
- End-day helper checks nonnegative times/period, end>=start and nonzero period before division. The complete permitted sync body is retained separately; candidate `incentives.rs:24–40` only performs the pre-start claimed-field reset and conditional event.

Candidate claim `incentives.rs:112–150` uses Clock and mirrors the zero-input helper specialization: settle prior volume, touch time/needs-claim, then early-return on zero unclaimed amount or transfer and update claim totals. Global typed memory stores of old+0 in the original helper do not imply a persisted global increment. This analysis does not invoke administration or establish any initializer's semantics.

## Saved active-time evidence and its limits

The current package's `legacy_buy-differential.json.gz` identifies original/current5a and the exact harness SHA256 `f50117d8d9cfb15ab540c467a6bc50c135ad7878b84fba71adb370436ed1097d`. That harness was recovered from the current package's tracked test archive, not substituted with the older recovery harness. It was read, never executed.

`saved-cases.json` selects 30 existing rows by their original array indexes: track=01, individually varied accumulator fields, and schedule-time variants for each legacy instruction. It retains consumed accumulator before/after bytes and parsed counters. Every selected row has matching original/candidate results. The two `global-volume-times=(1234500000, 1234600000, 86400)` cases succeed at harness Clock 1234567890 with track=true. Global account bytes are unchanged; user unclaimed/claimed/current-volume/last-update remain zero. The 30 supply and volume buckets are zero. Thus these are **active-time, zero-supply synthetic cases**, not funded reward-schedule or production reachability evidence. Existing-field variations are separate cases, not combined active funded schedules.

## Remaining precise boundary

Do not add `incentives::claim` logic or a volume increment to legacy buy on the strength of F01. That would introduce Clock, day-index, overflow, account-writability and event-order behavior that is absent from the identified original flag path. The known helper's general ability to increment is insufficient authorization to wire it into a buy.

An exhaustive absence proof still requires transitive account-alias effects through the identified context/exit/CPI helper graph and any indirect edges; this package does not certify those. A financial undercount claim additionally requires already-public authenticated pre/post evidence for a funded active schedule and preexisting accumulators. Neither missing prerequisite is replaced with new fixtures, runtime probes or initializer analysis. Author intent remains unproved. All four original whole-file equality claims remain false; no inventory count or manifest establishes exhaustive semantics/security.

## Verification and delivery

Run `python3 verify.py` from any working directory. It checks every sealed file hash, available complete Git blob identities, range hashes, IDL dispatch/body edges, retained call/branch annotations against original bytes, flag-spill references, claim's zero argument, saved harness identity and selected receipt state projections. It does not execute the saved harness or original program and is not a proof checker for all prose semantics. `provenance.json` distinguishes complete blobs from bounded archive members/source excerpts. Archive source hashes and Git IDs are provenance assertions when the whole archive is intentionally omitted.

The manifest excludes itself. Copy-verification outcome is outside the seal in `verification-outcome.json`. No parent source changed; no builds, transactions, signature changes, initializer work, staging, commits, pushes, private audit packages or other worker outputs were used.
