# Independent Mayhem configuration wire verification

The prior [field-history checker](../mayhem-globalparams-field-history/verify.py)
claimed to re-decode transactions, but its original step 3 only read the derived
time series and checked version continuity. It never decoded instruction data or
event payloads from the captured transaction responses. This packet supplies the
missing independent decoder; the existing checker now also calls it.

The decoder reproduces the **entire retained time-series object** from 13 raw
transaction captures: 32 Mayhem instructions, ten update calls and ten event-CPI
payloads, covering the observed version chain 0 through 10. The derived values
are not used to decode the captures. Every `Some` argument equals the paired
post-update event field, and each `None` field equals its preceding event value.
Both current account captures agree with all 16 fields and version 10.

## Wire bindings

The parser resolves each compiled instruction's program and account indices
using static keys followed by loaded writable and loaded readonly keys. It
checks the Mayhem program, target GlobalParams account and event-authority
addresses. Retained `stackHeight` values associate each carrier directly with
its update invocation; matching event order alone is insufficient.

The update wire format has `Option<u32>` for fields 0/1, `Option<u8>` for field 6,
and `Option<u64>` for the other fields. The 11-field and 16-field forms are
decoded separately, requiring valid 0/1 tags, full field widths and exact input
consumption. Missing schema fields remain distinct from `None`.
Event payloads must be exactly 89 or 129 bytes, including their discriminator.
Every observed version transition increments by one, and argument/event schema
sizes must agree. These are observed historical wire forms; this does not assert
that the current 16-field Rust parser accepts the older 11-field instructions.

The event discriminator `63a75c9898e32629` is explicitly observed in the recovered
source; its historical Rust type name is unknown. It is not inferred by hashing
the reconstructed name `GlobalParamsUpdateEvent`.

All ten event payloads also equal the base64 `Program data:` records emitted
while the captured log stack identifies Mayhem as the active program. Their
logs have complete invocation/return nesting. The unrelated seven-recipient
transaction `tx_m0_4iJN5WGToRhx.json` contains **`Log truncated`**; its log is
explicitly marked incomplete, while its seven Mayhem instructions are decoded
from the retained compiled-instruction records. No absence claim is made from
the missing log suffix. Truncated update logs would fail this verifier.

Captured account ownership, request address, discriminator, 318-byte length and
64-byte zero extension are checked. Fields 7, 8 and 15 retain unsigned wire
interpretation, as in the recovered update/event source. The separate activity
counters are decoded as signed **128-bit** values. Between the two captures,
`sol_deployed` changes from 23,655,583,420,698 to 23,647,487,105,919;
`stable_deployed` remains 192,458,764,472. Neither is a configuration field.

## Verified observations and limits

| Captured updates | Set fields |
| --- | --- |
| v1–v6 | All 11 fields, including unchanged values |
| v7 | field_10 only: 86,400 → 86,280 |
| v8–v9 | field_4 and field_5 |
| v10 | Newly present field_11 through field_15 |

`findings.json` retains every decoded field value, each `Some`/`None` pattern,
account snapshot and log-completeness result. The 17 input identities in
`inputs.json` bind the 13 transactions, two accounts, prior derived table and
recovered `programs/mayhem/src/lib.rs` to Git blobs and SHA-256 at upstream
`ba7883511942965c5c9def03971bdaff84963d6b`.

This closes the raw-decoding gap for this **retained cohort**. It does not prove
RPC authenticity, verify transaction signatures or reconstruct ledger state.
The request's `finalized` setting is captured metadata, not an independent
finality attestation. The Squads stored-account sweep and historical signature
pagination are outside this decoder's scope. A continuous version chain and two
current snapshots do not by themselves prove complete lifetime history across
possible upgrades, resets, account replacement or missing RPC records.

Observed numeric values also do not prove units or consumer semantics. Equality
of field_3 and field_2 does not establish a native-quote denomination; field_1
being set to zero does not prove it was disabled. Byte value 24 rules out only a
canonical serialized Borsh boolean at that position, not an enum, bitmask or
flag-like consumer. Near-day values for field_10 motivate a duration hypothesis
without identifying the process or proving units. No field is renamed.

No compiler, program, VM or live RPC is executed by this verifier. It adds no
binary match, behavior/security proof, selected checkpoint or authorization to
resume a stopped execution lane. The preserved raw captures are unchanged.

## Replay

Python 3.12 or newer, standard library only:

```sh
python3 -B research/mayhem-history-wire/verify.py
python3 -I -B research/mayhem-history-wire/verify.py
python3 -B -m unittest discover -s research/mayhem-history-wire -p 'test_*.py'
```

Only this packet and the 17 named input files are required. The tests mutate
arguments, events, parentage, addresses, logs, declared tables and current state;
they cover schema boundaries, unsigned 64-bit values, signed 128-bit counters,
loaded-key order, version gaps and an isolated relocated replay. The original
field-history `verify.py` also performs the new raw decode in its default
offline path; its optional pre-existing `--live` mode was not used here.
