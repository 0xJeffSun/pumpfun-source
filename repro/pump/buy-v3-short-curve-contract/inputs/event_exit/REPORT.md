# BuyV3 B7 event, volume and exit contract

**B7 remains partial and this packet is not integratable.** The ordinary event field producer, three wire schemas, volume prefix and success-only exit are tied to original bytes. The event also requires upstream descriptor-adjusted quantities whose complete semantics are not closed, and its actual recursive runtime/error targets remain a frontier. This package supplies a natural field-construction fragment with explicit required inputs, not a whole event/BuyV3 implementation. No build, runtime, new fixture, account mutation or main-source change was performed.

The fixed original ELF is `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. The 37 current Pump source hashes bind the published `final-error-metadata-fortyeight` checkpoint (candidate `2aa18c73e517d9f74063633ea5d5b15f187d63e4dd4c09678b852afdd588cbc3`). This is no new candidate or candidate-equivalence result. Upstream event/parser packages remain historical source hypotheses; the frozen B6 settlement correction and B4 quote report are retained separately with exact seals. No old report was rewritten.

## Actual entry, data and ownership

Settlement `1488c0 -> 83c00` must return tag0: `1488d8` then branches to `148920`. The caller passes its account context, event-authority bump, selected first base amount and outgoing frame to `1489d8 -> 859b0`. That actual helper occupies `[859b0,87ca0)` (8,944 bytes). `closure-ledger.json` retains the entire helper, the full TradeEvent and PostComplete serializers, complete generated exit/volume bodies and bounded caller/whitelist continuation windows. It enumerates 50 immediate targets: 49 complete decoded windows and one explicitly opaque whitelist validator. The 113 unique unclosed call edges are enumerated individually; included bytes are not a claim of transitive semantic closure.

The event takes a single Clock reading at `859e8 -> 1a0938`. A failure propagates before construction. The successful timestamp is reused by all three event types. No reload of the curve/volume from account data is inserted: the original producer reads their settled decoded values. This matters because account serialization happens later, after body success.

The caller's outgoing words fix three distinct quantities: first adjusted buyback from settlement return+8, second adjusted buyback from return+16, and a separate trailing adjustment from the cost-helper result+24. The last is saved at `148630..148638`, passed at `148970..148978` and consumed at `85a50 -> 86128`. B6 records the first/second descriptor adjustment contract but does not close every present-descriptor case. None of these three quantities may be invented as zero or universally replaced by raw fee calculations. The new `source/ordinary_event_fields.rs` therefore requires the first adjusted buyback and trailing adjustment as input. Second adjusted buyback remains a required PostComplete input in the contract below.

## Complete ordinary TradeEvent field and serialization map

The retained `inputs/event/fields.json`, recomputed into the ledger, lists all **36** fields in order, each with wire offset/width, decoded-object offset, original producer store and serializer load. Verification checks every field's producer destination and serializer source against raw original instructions; it also checks wire contiguity and discriminators. These are dataflow anchors plus manual interpretation, not a mechanical proof of Rust semantics.

The producer selects:

- Base mint and user keys from admitted context accounts; selected **first** base amount, not combined first+residual transfer; first quote amount; one Clock timestamp.
- Stored quote key==zero determines SOL-field masking. First quote and post-first virtual/real quote reserves become zero only in the SOL-named fields for nonnative quotes. Quote-named fields retain their values. First base reserves are read from settled curve state; residual pool balances do not replace them.
- Explicit zero fee-recipient key; creator key from the curve; first fee tuple's independent protocol amount/rate and creator amount/rate. A zero creator does not erase a retained rate.
- Four decoded volume metadata words, read at `85c30..85c60`: total_unclaimed_tokens, total_claimed_tokens, current_sol_volume, last_update_timestamp. `track_volume=false` is explicit; it does **not** mean these fields are zero.
- Name exactly `buy`, three bytes, not `buy_v3`. Cashback amount/rate are explicit zero. Mode flag is copied; ordinary mode is the fragment's required precondition. Buyback rate is Global's rate under that ordinary precondition; the actual original has its mode gate. Buyback amount is the first adjusted input described above.
- Empty shareholders vector (capacity0, pointer2 alignment sentinel, length0). Pointer2 is not two entries. Holder flag selects the first creator rate/amount into holder fields without changing creator fields. This describes event selection, not arbitrary holder-account admission.
- `creator_fee_unclaimed` is curve creator accrual **after both fee legs**, including preexisting accrual, read at `85dd0` and stored at `86130`. The final unnamed u64 is the required cost adjustment, stored at `86128`; its original business name is unproved.

Both `86188` and `86360` call full serializer `[1624b0,1639e8)`. Wire length for this three-byte name and empty vector is **390**, including discriminator `bddb7fd34ee661ee`. Integers are little endian, bools one byte, keys32, string a u32 length plus three bytes, vector a u32 zero. The current official-IDL field boundary and the historical binary's additional final u64 must remain distinct; the latter is at offset382 after creator_fee_unclaimed at374. No padding from the decoded Rust struct is serialized.

The first serialized event is logged via `861d0 -> 1a04f8`; a second serialization feeds self-CPI at `867c0 -> 1a0530`. The data is prefix `e445a52e51cb9a1d` plus the 390-byte event, length398. Original metadata at `86630` sets signer=true/writable=false on the single event-authority key. Construction uses the captured Pump program ID, one AccountInfo and one signer group of two seeds: the 17 bytes `__event_authority` and the supplied bump byte. No synthetic authority or new account is added. Locked Anchor's `emit_cpi` expansion agrees with this shape. The generic invocation, runtime event dispatch, allocator and every error/drop target are not thereby proven equivalent; their remaining edges stay explicit.

## Completion and post-completion sequence

Only successful first self-CPI/cleanup reaches the real-base check at `86880..86890`. Nonzero skips completion. Zero branches to `86958`, which sets the decoded complete byte **before** constructing/logging CompleteEvent. CompleteEvent uses user, mint, curve AccountInfo key, the same timestamp and stored quote key. Its wire is144 bytes with discriminator `5f72619cd42e9808`; self-CPI is152 bytes. The first event's visible log is not proof of final success.

After CompleteEvent self-CPI at `873b0`, the optional residual tag is checked at `87460..87468`. None skips the third event. Some calls `[81aa0,82128)` at `87658`, passing its second-leg record and keys. The constructor checks B>=D first, then checked T+q2, **at this late point**, after earlier event CPIs. Both late arithmetic failures use6024; no reordering into an earlier preflight is proposed. Its output contains keys, same timestamp, residual base/quote, second rates/amounts, the **second adjusted buyback**, B/T and B-D/T+q2. The full `[163bf0,163ea8)` serializer is called at `876f0` and `87778`. Wire length232, discriminator `6fb06d8b316cd5fb`; self-CPI length240. Log `87730` precedes CPI `879f0`.

The ordered schema for both events is in the field ledger. No volume, shareholder or accrued-creator-total field is invented in these events. The fragment does not implement their complete emit/cleanup paths, and it cannot supply absent descriptor semantics.

## Volume: 137 allocated, 106 serialized, 31 preserved

The typed parser's retained `init_if_needed` contract uses canonical seeds `user_volume_accumulator` and user key, payer user, and allocation137. The full `[105b78,107b38)` init window is retained. Immediate137 is checked at rent/allocation sites including `105da8`, `1067b0`, `1072e8`; the existing-state size test at `105f78` checks137. This is not a new initializer implementation or runtime claim.

Original order remains: checked reader for existing owned state before explicit size2019/owner2004/rent2005; System zero-lamport create or funded top-up/allocate/assign with real PDA signing; unchecked owned-reader after initialization; then outer mut/rent checks. Funded-branch payer inequality is4101, not a new universal precheck. B4, B5 and body checks do not bypass this earlier parser work. Allocation failures remain failures.

B6 corrected the whitelist continuation: successful late validator at `84578` branches from `84588` back to **83fa8**. The ordinary fallthrough reaches the same block. If the decoded volume user is zero, the four signer-key words are copied at `84030/40/50/60`; existing nonzero user is preserved. This common assignment changes neither counters nor flags/timestamp. It is not guarded by `!whitelisted`, and does not serialize or initialize an account itself. The validator's other predicates remain opaque.

The wire prefix, including discriminator, is exactly106:

| Wire offset | Field | Bytes |
|---|---|---:|
| 0 | `56ff700e66359afa` discriminator | 8 |
| 8 | user | 32 |
| 40 | needs_claim | 1 |
| 41 | total_unclaimed_tokens | 8 |
| 49 | total_claimed_tokens | 8 |
| 57 | current_sol_volume | 8 |
| 65 | last_update_timestamp | 8 |
| 73 | has_total_claimed_tokens | 1 |
| 74 | cashback_earned | 8 |
| 82 | total_cashback_claimed | 8 |
| 90 | stable_cashback_earned | 8 |
| 98 | total_stable_cashback_claimed | 8 |

`[6158,66f0)` writes that discriminator and eleven fields through actual writer `19b548`. Each write's length and callsite is checked. The writer advances a position within the borrowed slice; there is no write of bytes106..136 and no new reserved-tail field. A successful exit preserves those31 existing bytes. This is a static write-set fact. All117 retained saved poststates are137 bytes and have zero tails, so **nonzero-tail runtime preservation has not been exercised here**. The package does not create such a fixture. Bool malformed-value and decoder errors remain the actual Borsh/decode contract, not raw casts or arbitrary zero defaults.

## Generated success-only exit and failure handling

Body result tag2 branches at `128940` to the exit setup; other values jump to `128ad8` and skip it. Only `128978 -> 107b38` invokes generated AccountsExit. It serializes curve via `107b80 -> 5a28` first, then visits mutable base token interfaces in declaration order, then volume via `107d80 -> 6158`. Read-only FeeConfig has no exit serializer. There is no extra writeback added for raw quote accounts. Locked `accounts/exit.rs` preserves mutable-field order and decorates failures with each field's name; locked handler generation applies `?` to body before `accounts.exit`.

Expected owner must equal executing program and account must not be closed before writeback. The closed predicate is System owner plus empty data, not merely lamports==0. Admitted token interface owners ordinarily differ from Pump and skip serialization. Owned curve/volume writeback uses a fallible mutable data borrow; its ProgramError conversion is retained. The original volume writer failure path maps to3004 at `6690 -> 6698`, releasing the mutable borrow on success and failure. A partial prefix may have been written before a short-write error; transaction-level rollback is a runtime responsibility, not atomicity invented inside the serializer. Event logs and CPIs precede this exit and can still be followed by an exit error.

## Frontier, sources and acceptance limits

The field constructor changes no account, emits no event and calls no runtime. It deliberately requires upstream first adjusted buyback/trailing adjustment instead of the draft's hardcoded zero. It is not wired into main or an unaccepted body. The current UserVolumeAccumulator definition already agrees with the field order; duplicating it or adding a31-byte field would alter the recovered prefix contract. No type/source patch is proposed for it.

Four locked public dependency archives and selected source files bind the ordinary Anchor event expansion, handler/exit generation, BpfWriter and Borsh semantics. Matching the current lock is not proof of the original build graph. `unclosed_frontier` explicitly lists generic CPI/runtime, allocator, formatter, indirect destructor and decoder helper edges; no unused matching helper substitutes for an actual callee. Descriptor-bearing token quantities, broader mode semantics and extension implementations remain opaque. This packet neither resumes sell_v2 transfer-fee/incentives/Mayhem initializer work nor closes B7 by assumption.

All117 old rows remain mandatory (105 successes,12 failures, all Token2022 base). They are retained byte-for-byte and their row/volume hashes recomputed. They are not tests of this fragment. No new coverage, handler count, full-original equality or audit completion is claimed. Existing parent failures are retained in their immutable source packages; this task produced no build/runtime attempts.

Run `python3 -B verify.py` from a separate copy; `--repo /path` also checks current37 source hashes and selected upstream bytes. The verifier is static and uses no local work paths, network, tools, caches or keys. Hash checks establish integrity; the reviewed dataflow and stated unresolved boundaries remain necessary to interpret it.
