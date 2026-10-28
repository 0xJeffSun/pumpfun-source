# MayhemState neutral-field attribution: layout, writers, readers, lifecycle

Static attribution for the Mayhem program's per-curve state account
(`MayhemState`, program `MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e`),
built on the merged GlobalParams contracts in
`research/mayhem-globalparams-contracts` (PR #284) and the repo's own
exact-token field crosswalk.

`docs/COMPLETION.md` closes its Mayhem paragraph with two open items side
by side: the five unknown GlobalParams roles, and the neutral MayhemState
fields. PR #284 took the first item as far as recovered source allows.
This package takes the second. Of the account's nine fields, five still
carry the recoverers' neutral names (`field_8`, `field_56`, `field_72`,
`flag_88`, `field_89`), chosen, in the words of `state.rs`, to avoid
claiming unavailable historical semantics. Here each field gets its full
writer and reader map from the current recovered sources, a role verdict
at an explicit confidence label, and whatever the chain itself can add.

The stopped lanes stay stopped. This package contains no execution,
simulation, replay, or differential testing of any handler, and no
candidate build. The recovered `initialize_mayhem_state` body is read as
evidence (it is merged source) and never run. The paused sweep lane
(O0073, O0075, O0076) is not entered; its bodies are named only as places
an unattributed consumer could hide. All chain work is read-only.

Credit: TaoBot x Lightbrush.

## Headline results

1. **Eight of nine fields are attributed; one is honestly not.**
   `field_89`, `status`, `end_timestamp`, `mint`, and `burned_amount`
   are established in recovered source: the code itself performs the
   role. `field_8`, `field_56`, and `field_72` are strongly indicated:
   their behavior is fully determined by recovered code and, where the
   wire or the chain can speak, corroborated. `flag_88` is unresolved:
   written once at creation, read by nothing recovered, and section 5
   names the windows where a consumer could still hide.

2. **field_8 is the creation timestamp, and the chain proves the stored
   value.** The initializer writes it once, to the current Clock time,
   and nothing recovered reads it again. The one fully decoded state
   (section 2, field_8) stores at offset 8 exactly the blockTime of its
   creation transaction, 1,764,874,513
   (`4XhHmhy2TEmHh5KyQNBQF5NR9gPKs8eQhgyrx5XuUTcp9p61uTSYiJPxTbEAs6sjZLsmUApohrA733gWi6ySsjm4`).
   PR #284's duration check already
   used this offset as the stored creation time without naming the
   field; this package names it and records why the reading holds and
   what it does not prove (a later reader in the original binary is not
   excluded).

3. **field_56 goes negative on chain, as its type says it should.**
   The per-coin net quote deployment accumulator is i128 checked
   arithmetic, buys adding and sells subtracting, gated on buys by the
   per-coin limit of PR #284 (fields 5 and 13). The decoded state holds
   -137,977,914 after its full lifecycle, so the signed reading is not
   a source-level guess: sells drove it below zero in production.

4. **The status lifecycle is fully closed in recovered source.**
   Variant0 at creation; Variant1 at the first committed trade, gated
   on minimum real reserves (GlobalParams fields 9 and 14); Ended at
   the terminal burn, which also sets `burned_amount` to the full
   vault balance. Ended is unreachable by trades, not by a status test
   in the trade bodies, but because the burn can only run after
   `end_timestamp` and every trade requires the window still open.

5. **No tension with PR #284.** The four GlobalParams and MayhemState
   interaction pairs (field_6 with `end_timestamp`, field_7 with
   `field_89`, fields 5/13 with `field_56`, fields 9/14 with the
   Variant1 transition) all check out consistent, in section 4.

## 1. The account

`MayhemState` is a 106-byte PDA (seeds `[b"mayhem-state", mint]`),
created by Pump's `create_v2` Mayhem-mode CPI. Offsets are the
serialized positions recovered from the codec at `0x685f0` and `0x68ce0`,
as recorded in `state.rs`. Accounts can be extended to 170 bytes; the
interval [106, 170) is unmodeled capacity, not fields.

| Offset | Width | Type | Name | Verdict |
| --- | --- | --- | --- | --- |
| [0, 8) | 8 | discriminator | (Anchor) | n/a |
| [8, 16) | 8 | u64 | field_8 | strongly indicated: creation timestamp |
| [16, 24) | 8 | i64 | end_timestamp | established: window end |
| [24, 56) | 32 | Pubkey | mint | established: the state's mint |
| [56, 72) | 16 | i128 | field_56 | strongly indicated: per-coin net quote deployed |
| [72, 88) | 16 | i128 | field_72 | strongly indicated: net token accounting |
| [88, 89) | 1 | bool | flag_88 | unresolved |
| [89, 97) | 8 | u64 | field_89 | established: last trade timestamp |
| [97, 98) | 1 | enum | status | established: lifecycle stage |
| [98, 106) | 8 | u64 | burned_amount | established: terminal burn amount |

Confidence labels, used throughout: **established in recovered source**
means the recovered code itself performs the role, so the attribution is
a reading of the code, not an inference from values. **Strongly
indicated** means the behavior is fully determined by recovered code and
the remaining gap is only the historical name or an original-binary
consumer. **Unresolved** means the evidence does not support a role.

## 2. Field entries

Every writer, reader, and event site below is cited in
`attribution.json` to a pinned source line, and `verify.py` re-extracts
each citation from the pinned copies in `evidence/src/`.

### field_8, [8, 16), u64: strongly indicated, creation timestamp

Written exactly once, by `initialize_mayhem_state`, to the current
Clock timestamp (`lib.rs`: `state.field_8 = now as u64;`). No recovered
handler reads it and no second writer exists in the pinned corpus. The
repo crosswalk records zero occurrences for it in the six trade bodies
and corrects twelve historical rows that were substring matches on
`field_89`; its `lib.rs` admission excluded the initializer span, so
the initializer write sits outside its corpus rather than in conflict
with it.

Chain corroboration: the decoded state stores 1,764,874,513 at offset
8, exactly the blockTime of its creation transaction (recorded in
PR #284). What remains open is narrow:
whether the original binary reads offset 8 after creation. A reader
could only sit in a window with no recovered source (section 5).

### end_timestamp, [16, 24), i64: established, window end

Computed at creation as `now + duration_hours * 3600`, with
`duration_hours` read from the GlobalParams field_6 slot. Every trade
body rejects at or after it (`MayhemModeEnded`); the burn requires it
to have passed (`MayhemModeNotEnded`, 6005). Emitted in every trade
event. In the decoded state it exceeds `field_8` by exactly 86,400
seconds, the field_6 value of 24 hours proven in PR #284.

### mint, [24, 56), Pubkey: established, the state's mint

Written once at creation from the mint account key. No recovered
handler reads the stored copy: handlers receive the mint as their own
account and derive this PDA from it. The stored copy is therefore
informational in the recovered code. Whether the original binary
validates against it anywhere is not inferable, and the crosswalk
declines to infer it too.

### field_56, [56, 72), i128: strongly indicated, per-coin net quote deployed

Initialized to 0. Every buy adds the measured quote amount with
checked i128 arithmetic; every sell subtracts it. The amounts are the
trade's quote amounts (SOL in the legacy bodies). On buy paths only,
after the update, a positive `field_56` must be strictly below the
per-coin deployment limit or the trade fails with
`CoinRiskExceeded`; the limit is the GlobalParams field_5 storage
natively and the field_13 storage on non-native trades, and the
comparison truncates `field_56` to its low u64 limb, a quirk the
recovered buy code comments on explicitly. Sells do not re-run the
check.

Emitted in every trade event twice, as `state_sol_deployed` and as
`state_quote_deployed`, except that the v2 and pump-swap bodies report
`state_sol_deployed` as 0 on non-native trades while
`state_quote_deployed` always carries the value. The mirrored global
accumulators (`sol_deployed`, `stable_deployed`) are updated in the
same handlers with the same amounts, split by accounting family;
`field_56` is the per-state quantity the per-coin limit reads.

Chain value: -137,977,914 in the decoded state. The accumulator ended
negative, which settles the signedness question the `state.rs` comment
leaves open ("exact width; signedness not proven here") in favor of a
genuinely signed counter, at least as a description of observed
behavior.

### field_72, [72, 88), i128: strongly indicated, net token accounting

Initialized to 0. Every buy subtracts the actual tokens received;
every sell adds the actual tokens sent, in raw token units, with
checked i128 arithmetic. No handler gates on it; its only readers are
the trade events, which emit it as `state_token_net` on native and
non-native trades alike. The decoded state holds 7,003,298,844,045,
consistent with a lifecycle whose later trades were net sells back
into the curve. The repo crosswalk's role text ("signed base-token net
accounting") agrees; this package adds the initializer write, the
event-only readership, and the on-chain value.

### flag_88, [88, 89), bool: unresolved

Written exactly once, by the initializer, to `false`. Nothing in the
full pinned corpus (lib.rs, state.rs, all eight instruction modules,
checked_program.rs, mod.rs, pump_swap_types.rs) reads or writes it
again; the exact-token search behind that statement is the repo
crosswalk's own discipline, and the crosswalk independently records
zero occurrences. The codec accepts only 0 or 1 at this offset. The
decoded state, which was created, traded, expired, and burned, holds
0. One lifecycle cannot distinguish a flag nothing uses from one set
only by code with no recovered source. Section 5 names the hiding
places; this package does not enter them.

### field_89, [89, 97), u64: established, last trade timestamp

Initialized to the creation timestamp. Every trade body reads it
first: when it is nonzero and the GlobalParams field_7 interval is
nonzero, the trade requires `now >= field_89 + interval` or fails
with `TradeRateLimit`. The body then rewrites it to `now` before
pricing, so a reverted trade cannot move it and a committed trade
always does. It is the per-state half of the rate-limit contract
whose global half PR #284 records as field_7 (which was 0 at every
proven GlobalParams version, so the limit has never been armed on
chain; the contract is source-side). In the decoded state `field_89`
sits 48 seconds after `field_8`: this state's last committed trade
landed 48 seconds in, and nothing traded again before the burn.

### status, [97, 98), enum: established, lifecycle stage

`MayhemStatus`: Variant0 (0), Variant1 (1), Ended (2); the codec
accepts only those three bytes. Transitions are in section 3.

### burned_amount, [98, 106), u64: established, terminal burn amount

Initialized to 0. The burn handler reads the mayhem token vault's
full amount, burns exactly that amount through the token program,
and assigns it here (assignment, not accumulation; re-entry is
impossible, below). Also emitted in the `BurnEvent`. The decoded
state holds 992,996,701,155,955, the vault balance its burn consumed.

## 3. Lifecycle

1. **Creation.** Pump's `create_v2` Mayhem-mode CPI calls
   `initialize_mayhem_state`. All nine fields are written in one
   handler: `field_8` and `field_89` to the creation timestamp,
   `end_timestamp` to creation plus the field_6 duration, `mint`
   copied, `field_56` and `field_72` zeroed, `flag_88` false,
   `status` Variant0, `burned_amount` 0.
2. **First trade.** Whichever trade body runs first finds
   `status != Variant1`, requires the bonding curve's real reserves
   to meet the minimum threshold (GlobalParams field_9 natively,
   field_14 storage on non-native trades) or fails with
   `SolReservesTooLow`, and sets Variant1. Later trades skip the
   check.
3. **Trading.** Bounded by `now < end_timestamp` and paced, in the
   source contract, by the field_7 and `field_89` interval check.
4. **Expiry and burn.** Once `end_timestamp` has passed, the burn may
   run: it requires `status != Ended` (a second burn fails with
   `MayhemModeEnded`, 6004), burns the full token vault balance,
   records it in `burned_amount`, and sets `status` to Ended.
   Nothing in recovered source leaves Ended.

The decoded state lived the whole arc in one account: created
2025-12-04 01:35:13 UTC, last trade 48 seconds later, window closed
86,400 seconds after creation, burned for 992,996,701,155,955 tokens,
and still on chain, byte-identical when re-captured for this study.

## 4. Cross-check against the PR #284 GlobalParams contracts

| Pair | Result |
| --- | --- |
| GlobalParams field_6 (duration hours) with `end_timestamp` | consistent: the initializer computes `end_timestamp` from the field_6 slot; the decoded delta is exactly 86,400 s at the proven value 24 |
| GlobalParams field_7 (trade interval) with `field_89` | consistent: all six bodies perform the check #284 describes and rewrite `field_89`; field_7 was never armed on chain |
| GlobalParams fields 5 and 13 (per-coin limits) with `field_56` | consistent: buy bodies gate on `field_56` against the native (field_5) and non-native (field_13) limit storage, as #284's family split predicts |
| GlobalParams fields 9 and 14 (reserve thresholds) with the Variant1 transition | consistent: the first-trade gate reads field_9 storage natively and field_14 storage on non-native trades |
| `field_56` sign behavior with the buy code's truncation comment | consistent, with an observation: the decoded negative value exercises the positivity test's skip path exactly as the comment describes |

No pair shows tension. Where #284 could only name the MayhemState side
of a pair from the GlobalParams side (it calls `field_89` "the
per-state trade interval" counterpart and `field_56` the gated
quantity), this package supplies the state-side contracts.

## 5. What remains unresolved, and where it can hide

- **flag_88**: no role attributable. See its entry in section 2.
- **A post-creation reader of field_8**: the stored value and its
  writer are settled; a consumer in the original binary is not
  excluded.
- **A reader of the stored mint copy**: none in recovered source;
  validation against the stored copy, if the original performs it,
  is invisible from here.
- **The historical names** behind the neutral names: this package
  attributes roles, not original identifiers, and proposes no rename,
  in line with the crosswalk's position that no program edit or
  semantic renaming is justified by this evidence.

If any of the first three exists, it sits in a window with no
recovered source: the seven admitted unmatched Mayhem windows and
the 257 opaque windows of `docs/REMAINING-WORK.md`, concretely
including the sweep business bodies O0075 (attribution unresolved)
and O0076 (paused scope), and the excluded initializer wrapper.
Closing them is those lanes' work, when the maintainers open it.

## 6. Method and bounds

- **Corpus.** The complete recovered Mayhem source at the pinned
  revision: `state.rs`, `lib.rs`, `checked_program.rs`, and all nine
  files under `src/instructions/`, pinned by git blob SHA in
  `attribution.json` and copied into `evidence/src/`. Field access
  was mapped with the repo crosswalk's exact-token discipline
  (complete identifier tokens, owner-qualified: `MayhemState.field_8`
  is not GlobalParams `field_8`, and neither is `field_89`), then
  every site was read in context. The crosswalk's frozen-admission
  counts are quoted per field in `attribution.json`; its corpus
  predates the current initializer composition and excluded the
  initializer span of `lib.rs`, which is why it records no
  initializer writes. The counts and this package agree everywhere
  their corpora overlap.
- **Chain evidence.** One state, fully decoded: retained from PR
  #284's capture set and re-captured fresh for this study with
  byte-identical results (a terminal Ended state does not change).
  Its creation transaction and lifecycle are independently recorded
  in PR #284. A population census of MayhemState accounts through
  `getProgramAccounts` on the public endpoint was attempted twice
  and timed out at 50 seconds both times, so no population claim is
  made; value-behavior statements rest on the single decoded state
  and say so.
- **Masked and recovered evidence.** The initializer body is a
  bounded recovery from the stopped initializer lane, merged source
  read as evidence only. Its stored-offset annotations (for example
  the handler read at `[ctx+0x2c4]`) are the recoverers' annotations,
  and claims resting on the initializer are labeled accordingly:
  the field roles it writes are established as recovered-source
  behavior, and `field_8`'s role is labeled strongly indicated
  rather than established for exactly this reason.

## 7. Verification

`verify.py` (standard library only, offline) checks, in order:

1. `manifest.json`: SHA-256 and size of every package file; every
   package file except the manifest itself is listed.
2. Source pins: each pinned copy in `evidence/src/` recomputes to
   the git blob SHA-1 recorded in `attribution.json` at the pinned
   revision.
3. Citations: every citation in `attribution.json` is re-extracted
   from the pinned copies and compared to the recorded quote.
4. Captures: both retained captures decode to the recorded field
   values; the fresh capture's account bytes equal the retained
   capture's; the derived checks hold (`field_8` equals the creation
   blockTime recorded in PR #284, `end_timestamp` minus `field_8`
   equals 86,400, `field_89` minus `field_8` equals 48, status byte
   2).
5. Cross-check: the sibling `mayhem-globalparams-contracts` package
   is located by relative path and its field_6 entry is confirmed to
   record the value 24 and the same creation transaction (a SKIP is
   reported, with the recorded values printed, when the sibling is
   not present).
6. README hygiene: no em dash characters; credit line present.

Exit code 0 means every check passed.
