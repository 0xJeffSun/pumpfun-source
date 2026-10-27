# Mayhem GlobalParams: field contracts, handler error/data contracts, and the diagnostics register

Static contracts and read-only chain evidence for the Mayhem program
(`MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e`), built on the merged
configuration history in `research/mayhem-globalparams-field-history`
(PR #148, independently re-decoded in PR #191).

The merged history follow-up in `docs/REMAINING-WORK.md` states what remains
after the history work: the ten updates are recovered, but "field names,
units, and consumer semantics still need independent attribution." This
package is that attribution attempt for the contract layer: what each of
the sixteen `GlobalParams` fields is written by, read by, and constrained
to; what each of the twenty-four bounded non-initializer handlers can
return and emit; and a consolidated register of the known differences
between the recovered code and the original binary.

Two of the project's lanes are stopped, and this package respects the stop.
It contains no execution, simulation, replay, or differential testing of
any handler. The recovered `initialize_mayhem_state` body is read as
evidence (it is merged source) and never run. Differential execution
against the original binary is named in section 6 as future work that runs
only on the maintainers' steer.

Credit: TaoBot x Lightbrush.

## Headline results

1. **field_6 has a consumer, and it is the Mayhem window length.**
   The recovered `initialize_mayhem_state` body reads
   `global_params.reset_middle[0]` (the field_6 storage slot) as
   `duration_hours`, computes `end_timestamp = now + duration_hours * 3600`,
   and stores both into every new MayhemState. The resulting
   `end_timestamp` gates all six trade bodies (error 6004,
   `MayhemModeEnded`) and the burn (which requires the window to have
   ended). With field_6 = 24 for the account's entire life, every Mayhem
   window is 24 hours. Phase 2 corroborates this on chain: a captured
   MayhemState created on 2025-12-04 has `end_timestamp` minus its stored
   creation timestamp equal to exactly 86,400 seconds, and the stored
   creation timestamp equals the creation transaction's blockTime exactly.
   The attribution is labeled **strongly indicated**, not proven: the
   consuming read is a byte-interval read of a shared array in
   reconstructed source, not a named-field read, and the repo's own field
   review warns that an array read cannot be attributed to a field without
   a consumer in the original binary. Section 2 gives the full entry and
   section 5 reconciles this with the repo crosswalk, whose count of three
   field_6 occurrences is correct under its exact-token discipline.

2. **Fields 0, 1, 3, and 10 have no consumer in any recovered source.**
   They appear only in the `update_global_params` writer, the
   `GlobalParamsUpdateEvent` assembly in the same handler, and
   declarations. The package says so plainly per field, and names where a
   consumer could still hide: the unmatched and opaque windows of the
   original binary, concretely including the sweep business bodies O0075
   (attribution unresolved, unassigned) and O0076 (paused scope).

3. **The sibling fields frame the unknowns.** field_2 (per-trade cap,
   native), fields 4 and 5 (overall and per-coin deployment limits, buy
   side), field_7 (per-state trade interval, never armed: always 0),
   field_8 and field_15 (withdrawal intervals, 3600), field_9 (minimum
   reserve threshold), and fields 11 to 14 (the non-native mirrors) all
   have recovered consumers, cited per field in `contracts.json`.

4. **field_10 keeps its #148 verdict, with structure added.** A duration
   in seconds held just under one day (86,400 shaved to 86,280 in the
   v7 single-field update of 2026-04-29). This package adds: dedicated
   storage (the only updateable field not packed in an array),
   preservation across `reset_state`, and the observation that its
   genesis value equals the window length field_6 produces
   (24 hours = 86,400 seconds). Phase 2 screens the observable periodic
   processes around the shave; section 4 reports what the accessible
   data supports, in bounded claims only.

5. **The error surface is one space, 6000 to 6017, with two quirks worth
   writing down.** Code 6004 is shared by two names
   (`SellError::MayhemModeEnded` and `BurnError::MayhemModeEnded`), and
   `resume_trading` returns 6000 (`TradingPaused`) when trading is
   already active, even though 6001 (`TradingActive`) exists; the
   recovered source records the original's behavior in a comment, and the
   pause data-contract packet independently checks the inline 6000.
   Codes 6009 and 6013 are unassigned in every recovered enum.

6. **The diagnostics register (section 3) consolidates ten items** from
   the repo's own packets: the error-return ABI category, 26 panic
   diagnostic differences (8 of them unwrap-detail), the typed-error
   checkpoint (9,595 functional comparisons passing, 61 diagnostic rows),
   the seven surviving `quote_extreme_1_0_1` division-by-zero trade
   differences, the 58 sweep diagnostic cases, the panic Location
   source-path difference, the tagged I/O error data record, and the
   compute-consumption log class. Each item quotes its source; none of
   the counts is recomputed here.

## Contents

| File | What it is |
|---|---|
| `README.md` | This document. |
| `contracts.json` | The full contract data: source pins, subjects, 16 field contracts, named storage, the unified error space, 24 handler contracts, the diagnostics register, reconciliation notes, and the Phase 2 results. |
| `verify.py` | Stdlib-only verifier. Recomputes the manifest hashes, recomputes the git blob SHA-1 of every pinned source copy, re-extracts every citation quote from the pinned copies, re-checks the history values in `contracts.json` against the merged package's `analysis_timeseries.json`, and re-decodes the Phase 2 captures with fresh code. |
| `manifest.json` | SHA-256 and size of every package file except itself. |
| `evidence/src/` | The 21 pinned source files, fetched from the repository's current `main` (head `aa9b3b6ca17859c492c34afef2fee0f0032af4d3`, 2026-10-27). Each file's git blob SHA-1 is recorded in `contracts.json` under `source_pins`. |
| `evidence/capture_*.json` | Read-only Solana RPC captures (#148 format: retrieval metadata inside the file), taken 2026-10-27 against the public mainnet endpoint. |
| `evidence/scan_*.json`, `evidence/phase2_*.json` | The Phase 2 scan working records and result summaries. |

## 1. Subjects and layout

`GlobalParams` is a 254-byte serialized account (extended to 318 bytes on
chain), discriminator `79c1f857c3384c0b`, created by
`initialize_global_params` (admin set to the signer) and configured by
`update_global_params`: one `Option` per field, `None` leaves the field
unchanged, and every call increments `version` by exactly one. The
account's `version` is 10 today, which is what makes the #148 history
provably complete.

The sixteen updateable fields, by storage region:

| Region | Fields | Reset behavior |
|---|---|---|
| `reset_prefix` [8,48) | 0 (u32), 1 (u32), 2, 3, 4, 5 (u64) | zeroed by `reset_state` |
| `preserved_middle_a` [129,137) | 9 | preserved |
| `reset_middle` [137,162) | 6 (u8), then the last-withdraw slot, 7, 8 | zeroed |
| `field_10` [166,174) | 10 (dedicated storage) | preserved |
| `reset_stable_prefix` [182,206) | 11, 12, 13 | zeroed |
| `reset_stable_suffix` [222,246) | 14, 15, then the last-quote-withdraw slot | zeroed |

Named (non-field) storage on the same account: `paused`, `admin`,
`trader`, `sol_deployed` and `stable_deployed` (i128 runtime counters,
not configuration), `version`, the two last-withdraw timestamp slots, and
the sweep caps `max_sol_per_sweep` [174,182) and `max_stable_per_sweep`
[246,254), which have dedicated writer instructions and are not
`update_global_params` fields. `contracts.json` carries a contract entry
for each.

`MayhemState` (106 bytes serialized, discriminator `b1fdbf7dcb16866b`) is
created per Mayhem curve by the stopped initializer lane. Its layout
matters here for two slots: offset 8 stores the creation timestamp (the
initializer writes the creation `Clock` value there and no other writer
exists in recovered source), and offset 16 stores `end_timestamp`.

## 2. Field contracts (summary)

Full entries, with a citation object for every claim, are in
`contracts.json` under `fields`. Verdicts use the #148 vocabulary:
proven, strongly indicated, still open.

| Field | Type | Value record (v1 to v10, #148) | Consumer in recovered source | Verdict |
|---|---|---|---|---|
| 0 | u32 | 8000 at all ten versions | none | still open |
| 1 | u32 | 10, 100, 100, 100, 50, 0, 0, 0, 0, 0 | none | still open |
| 2 | u64 | 20,000,000,000 constant | all six trade bodies: per-trade cap (native) | attributed |
| 3 | u64 | 20,000,000,000 constant | none | still open |
| 4 | u64 | up to 50,000,000,000,000 by v9 | buy bodies: overall deployment limit (native) | attributed |
| 5 | u64 | up to 50,000,000,000,000 by v9 | buy bodies: per-coin deployment limit (native) | attributed |
| 6 | u8 | 24 constant | initializer body: `duration_hours` (byte-interval read) | strongly indicated: Mayhem window duration in hours |
| 7 | u64 | 0 at all ten versions | all six trade bodies: per-state trade interval | attributed (never armed) |
| 8 | u64 | 3600 constant | `withdraw_admin`: SOL withdrawal interval | attributed |
| 9 | u64 | 200,000,000, then 50,000,000 from v4 | all six trade bodies: minimum reserves on the Variant1 transition (native) | attributed |
| 10 | u64 | 86,400 to v6, then 86,280 (v7, 2026-04-29) | none | still open (duration-in-seconds class strongly indicated) |
| 11 | u64 | not in schema to v9; 1,600,000,000 at v10 | v2 and pump-swap bodies: per-trade cap (non-native) | attributed |
| 12 | u64 | not in schema to v9; 4,000,000,000,000 at v10 | v2 and pump-swap buy bodies: overall limit (non-native) | attributed |
| 13 | u64 | not in schema to v9; 4,000,000,000,000 at v10 | v2 and pump-swap buy bodies: per-coin limit (non-native) | attributed |
| 14 | u64 | not in schema to v9; 4,000,000 at v10 | v2 and pump-swap bodies: minimum reserves (non-native) | attributed |
| 15 | u64 | not in schema to v9; 3600 at v10 | `withdraw_quote_admin`: quote withdrawal interval | attributed |

Notes on the open fields:

- **field_0 (8000, constant).** Constancy at every version excludes a
  balance, counter, or timestamp. The value is compatible with a
  basis-point-shaped constant (80.00 percent), a fixed-point factor, or
  a count; no observation distinguishes those classes. Zero variance
  across the account's whole life means no correlational chain lever
  exists; closure is source/binary recovery or a differential case.
- **field_1 (10, 100, 50, 0).** Tuned in round steps during the first
  month, halved on 2025-11-19, zeroed on 2025-12-04, and never
  re-enabled, including in the v10 schema expansion. That lifecycle is
  the signature of an auxiliary or experimental parameter; in this
  configuration's own conventions 0 is the inactive value. Phase 2
  (section 4) tests whether an activity discontinuity is measurable at
  the zeroing and reports a bounded negative result.
- **field_3 (20,000,000,000, constant).** Equal to field_2 at all ten
  versions and adjacent to it in storage: an orphan slot inside the
  native limit family (the per-trade cap with no recovered reader, or a
  reserved mirror). Like field_0 it has zero variance, so no
  correlational lever exists.
- **field_10.** See headline 4 and the Phase 2 screen in section 4.

## 3. Handler contracts and the diagnostics register

`contracts.json` carries one entry per handler for all 24 bounded
non-initializer handlers: account structs with constraints, arguments,
events, per-error guards, and state transitions. The handlers are the six
trades, `burn_tokens`, `sweep_fees`, `sweep_fees_admin`,
`withdraw_admin`, `withdraw_quote_admin`, `extend_account`,
`initialize_fee_recipient`, `initialize_global_params`,
`update_global_params`, `update_admin`, `update_trader`,
`update_max_sol_per_sweep`, `update_max_stable_per_sweep`,
`reset_sol_deployed`, `reset_stable_deployed`, `reset_state`,
`stop_trading`, and `resume_trading`. The twenty-fifth handler,
`initialize_mayhem_state`, is the stopped lane and is covered only as the
field_6 evidence source.

The diagnostics register consolidates the repo's known differences, each
labeled with its evidence source in `contracts.json` under
`diagnostics_register`:

| ID | Item | Count / state |
|---|---|---|
| DG-1 | Error-return ABI and code-generation differences (standing category) | uncounted |
| DG-2 | Panic diagnostic differences, including unwrap-detail differences | 26, of which 8 unwrap-detail |
| DG-3 | Swap typed-error checkpoint: diagnostic rows at full functional parity | 9,595 comparisons pass; 61 rows (58 flat, 3 second-burn location) |
| DG-4 | Surviving trade differences: `quote_extreme_1_0_1` division-by-zero construction | 7 cases |
| DG-5 | Legacy Sell normalized-log survivors after the interval Location correction | 3 named cases (`retained10001`, `retained65535`, `quote_extreme_1_0_1`) |
| DG-6 | Sweep diagnostic cases | 58 |
| DG-7 | Panic Location source-path difference (pause/resume data contract) | 16 data uses, 14 agree |
| DG-8 | Tagged I/O error record and hash-table header (error data contracts) | 3 references bounded |
| DG-9 | Compute-consumption log class | uncounted (class) |
| DG-10 | `resume_trading` returns 6000 when already active (observed behavior, not a difference) | 1 handler |

## 4. Phase 2: chain evidence (read-only)

All captures were taken 2026-10-27 against the public mainnet RPC, in the
#148 capture format, and are re-decoded from the raw bytes by `verify.py`.
A fresh `GlobalParams` capture (slot 462,128,651) decodes to exactly the
v10 event values on all sixteen fields, with `version` still 10: no
eleventh update has occurred, so the merged history remains complete at
the time of writing.

### field_6: landed, one decisive instance

Method: anchored scans of the program's signature history in three eras
(the complete 25-entry pre-v2 genesis history; a 1,000-signature page
before the v6 anchor with the first 60 transactions fetched; the newest
1,000-signature page with the first 60 fetched), scanning each fetched
transaction for an inner `initialize_mayhem_state` call, then capturing
each identified state account in full.

One creation was found: transaction
`4XhHmhy2TEmHh5KyQNBQF5NR9gPKs8eQhgyrx5XuUTcp9p61uTSYiJPxTbEAs6sjZLsmUApohrA733gWi6ySsjm4`,
blockTime 1764874513 (2025-12-04 01:35:13 UTC), twenty-one minutes before
the v6 update. The state account
`4W6EETzDdhmtR1q7kBWdyYLQfpz2n3TfrD1YbNZodPvy` decodes as:

| Quantity | Value |
|---|---|
| Stored creation timestamp (offset 8) | 1764874513 |
| Creation transaction blockTime | 1764874513 |
| Difference | 0 |
| `end_timestamp` (offset 16) | 1764960913 |
| `end_timestamp` minus stored creation | **86,400** |
| field_6 on that date (#148, proven) | 24 |
| 24 times 3600 | 86,400 |

The state's status byte is 2 (Ended): the window closed and the residual
burn ran, which is the field_6 chain completing on chain. Its last-trade
slot reads 48 seconds after creation.

Two bounded negatives accompany the positive instance. The genesis era
contains no creation at all: the complete pre-v2 history of the program
is 25 entries (the deployment, the genesis admin transaction, and 22
Pump transactions that carry the program as an account and execute no
Mayhem instruction), so no `initialize_mayhem_state` execution is
recorded between the program's deployment (2025-11-07) and the v2 update
(2025-11-14). The recent era's 60 fetched transactions contain no
creation either; creations are rare events inside a signature index
dominated by Pump traffic that references the program (see the timeline
note below), and a full census is not feasible through this interface
(a `getProgramAccounts` census attempt produced a response of roughly
480 MB and is recorded as infeasible in `contracts.json`).

### field_1: bounded out at program level

The design was an activity timeline: the wall-clock span of anchored
1,000-signature pages measures transaction density in each field_1 era.
The pages were captured (see `evidence/phase2_field1_timeline.json`), and
they refute the instrument: densities run from 0.45 signatures per hour
in the genesis window to roughly 1,200 per hour before v5, 2,800 per
hour before v6, and 21,000 per hour before v7, with 54 to 117 failed
entries per 1,000 in the dense pages. The genesis census shows what the index actually
contains: ordinary Pump transactions that carry the Mayhem program as an
account key, most executing no Mayhem instruction at all. Program-index
density therefore tracks Pump-side traffic that references Mayhem
accounts, not Mayhem-mode usage, and no field_1 signal can be read out
of it. The sample-level facts that do survive: zero creations and zero
Mayhem trade executions in the complete genesis census; exactly one
creation in the 60 transactions immediately before the zeroing (the
field_6 instance above, created while field_1 still read 50). A
discontinuity at the 2025-12-04 zeroing is not measurable with
accessible data, and the package claims none. Measuring Mayhem-mode
activity directly would require fetching and classifying transactions at
a scale the public RPC does not reasonably support (a 1,000-signature
page before v6 spans 1,303 seconds).

### field_10: screen bounded out, with the bound quantified

The candidate periodic processes were screened by construction first
(section 2 and `contracts.json`): withdrawal spacing is field_8/field_15
(3600, unchanged at v7), burn timing is paced by the field_6-derived
`end_timestamp`, and `extend_account` is a one-off size event. The one
remaining timestamped periodic process readable from the operator side is
the fee sweep (`SweepEvent` carries a timestamp; sweeps are performed by
the `trader` account). The screen paged the trader's signature history
backwards looking for the window 2026-04-19 to 2026-05-10 straddling the
shave. Result: ten pages of 1,000 signatures cover about 720 seconds of
wall time (roughly 14 signatures per second, about 50,000 per hour), so
the April 2026 window sits on the order of two hundred million
signatures back and is unreachable through this interface. No sweep
interval comparison is possible from accessible data, and none is
claimed. What the accessible data supports is exactly this: field_10's
consumer is not identifiable from chain timing through the public RPC,
and its genesis value equality with the field_6 window (86,400) remains
a structural observation, not a mechanism.

### Fields 0 and 3

Zero variance across the account's entire life (8,000 at all ten
versions; 20,000,000,000 at all ten versions, in a fresh capture as in
the history) means there is no correlational lever to pull: nothing on
chain changed when nothing changed. Their closure path is source or
binary recovery of a consumer, or a differential case on the
maintainers' steer. This package states the constraint and stops there.

## 5. Reconciliation with the repo's existing field documents

- **Field review** (`repro/mayhem/global-params-remaining-field-review/`).
  Its byte intervals, reset partition, and Option semantics match this
  package exactly. Its admission is transport-level and explicitly does
  not establish original-binary consumers; this package's consumer map
  comes from the current recovered source at the pinned revision, which
  the review's frozen admission did not cover.
- **Field crosswalk** (`repro/layered-passes/pass-01/followup-results/mayhem-field-crosswalk/`).
  All sibling attributions agree. Its field_6 count (three occurrences:
  writer, event read, reset write) is **not** contradicted by the
  initializer read cited here: the crosswalk counts exact named-field
  tokens, and the initializer reads a byte interval of the shared
  `reset_middle` array, which is not a named-field token; the
  initializer's current composition also postdates the crosswalk's
  frozen admission, and the crosswalk itself states that
  initializer-named windows retain their predecessor opaque status in
  its corpus. Both documents can be, and are, correct under their own
  disciplines. The same applies to field_10, where the crosswalk records
  two occurrences and notes the reset preservation this package relies on.
- **Per-handler packets** (pause data contract, tagged error data,
  interval location recovery, retained-bps recovery, the typed-error
  checkpoint). This package consolidates their findings into the
  diagnostics register, quoting their counts rather than recomputing
  them, and cites them per item.

## 6. What would close the rest, and verification

Fields 0, 1, 3, and 10 close only through a consumer: recovered source
for the windows that remain unmatched or opaque, or differential
execution against the original binary. The differential shape is easy to
state (seed the recovered handlers in the repo's LiteSVM harness, vary
one field at a time, and run boundary trade, sweep, and withdraw cases),
and this package deliberately does not run it: the project's execution
lanes around this program are stopped or paused, and reviving one is the
maintainers' call, not a contributor's. If the maintainers open that
lane, the contracts and the register here are the checklist it should be
run against; the Phase 2 captures stand as the chain-side baseline
either way.

Verify the package offline (Python 3 standard library only):

```
python3 verify.py
```

`verify.py` checks the manifest hashes, recomputes each pinned source
file's git blob SHA-1 and compares it to `contracts.json`, re-extracts
every citation quote from the pinned copies and compares it to the
recorded text, re-checks the per-field history values against the merged
package's `analysis_timeseries.json` (located by relative path if the
two packages sit side by side, or by the SHA-256 recorded in
`contracts.json`; the check reports which mode it used), and re-decodes
the Phase 2 captures (the MayhemState arithmetic, the current
GlobalParams values, the timeline pages, and the screen's paging bound)
with fresh code.
