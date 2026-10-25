# BondingCurve checked/unchecked decoder composition

This packet supplies a source-only `AccountDeserialize` proposal for the unaccepted BuyV3 composition. It completes the checked/unchecked reader contract and connects it to the actual typed-account read. It does not install the trait, remove the admission fence, compile a candidate, execute a transaction, or establish complete BuyV3 integration. All 117 historical BuyV3 rows (105 successful and 12 rejected) remain preservation requirements, including their Token-2022 base accounts. Their retention is not a new claim that this proposal supports excluded token-extension branches.

The frozen short-reader packet is copied byte-for-byte under `prior/short`, retaining its manifest SHA `1d01528df873150b2165fe2719e8399ba08032872e5437dca73274fd86266785`. Its current source map has 37 inputs. The original ELF SHA is `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`; current candidate SHA is `2aa18c73e517d9f74063633ea5d5b15f187d63e4dd4c09678b852afdd588cbc3`. Candidate symbols are used for bounded generic-helper identification, not as historical source evidence. The proposed source is uncompiled.

## Actual entries and caller distinction

| Contract | Original full window | Actual relevant call |
|---|---|---|
| Checked decoder | `0x9b148..0x9b430`, 744 bytes | checked Account reader `0x85b0` |
| Unchecked decoder | `0x9b430..0x9b6a0`, 624 bytes | unchecked Account reader `0x44c8` |
| Checked owned Account reader | `0x8320..0x8710`, 1,008 bytes | Account `try_accounts` at `0x130f0` |
| Unchecked owned Account reader | `0x4238..0x4628`, 1,008 bytes | other callers `0xb5318`, `0x16d578`, kept opaque |
| Account slice reader | `0x13048..0x13100`, 184 bytes | actual BuyV3 parser `0x102a78` |
| Separate Box wrapper | `0x3b68..0x3cc8`, 352 bytes | not called by the actual BuyV3 parser |

Both 1,008-byte Account readers match over their complete normalized instruction windows. Their actual direct call lists have one different target at offset 656: unchecked `0x9b430` versus checked `0x9b148`. Normalization alone would have concealed this meaningful difference; `composition-ledger.json` retains and checks both lists. It also enumerates every direct caller of these six entries. No business meaning is inferred for the other callers, and they are not substitutes for the actual BuyV3 path.

BuyV3 calls `0x13048` directly at `0x102a78`. The separate Box wrapper is useful corroboration only. The actual BuyV3 path inlines its allocation after the checked read. This distinction avoids attributing an unused matching generic wrapper to the live path.

## Account admission, errors, and references

The Account slice reader checks for an empty slice before consuming it. Empty returns Anchor `AccountNotEnoughKeys` (3005) and leaves the account slice unchanged. Otherwise `0x130b8..0x130e8` decreases the count and advances the account pointer by 48 bytes before invoking the checked Account reader. Thus owner, borrow, or decoding failure does not undo this local account-slice advance.

Both Account readers first compare the owner to System. If System-owned, they call `AccountInfo::lamports` and return Anchor `AccountNotInitialized` (3012) only when lamports are zero. System-owned with nonzero lamports continues to the owner mismatch. Non-System-owned goes directly to the Pump-owner comparison. Any wrong owner returns Anchor `AccountOwnedByWrongProgram` (3007), decorated by `with_pubkeys((actual_owner, expected_pump_owner))`. The four immediate expected-key chunks in the unchecked wrapper equal the full Pump-owner literal. A Pump-owned account with zero lamports is not rejected merely for that zero by this wrapper. The lamports helper performs a borrowing read, with its existing panic path on an invalid RefCell borrow state; this is not silently converted into a ProgramError by the proposed trait.

Only the accepted owner reaches immutable data borrowing. `0x1a2ca8..0x1a2d38` returns the actual `AccountBorrowFailed` ProgramError on failure. On success, the wrapper invokes its checked or unchecked decoder on a temporary byte-slice cursor. After either decoder success or error, the unchecked wrapper's `0x4608..0x4618` decrements the acquired data Ref borrow count; the checked wrapper has the identical instructions at corresponding offsets. No decrement occurs when no borrow was acquired.

On success `0x4600` stores the input AccountInfo pointer into the returned Account, rather than cloning an AccountInfo. The Account owns the decoded field value while retaining an `&'info AccountInfo<'info>` reference. The locked `anchor-lang 0.31.1` Account source independently describes this ownership and the same check order. Borrowing the data for decoding ends before the typed account escapes. Consequently later preparation can borrow/reallocate account data without this temporary Ref being kept inside the Account.

The actual BuyV3 parser tests the returned niche/error byte at `0x102a80..0x102a88`. Only the success branch allocates 168 bytes with alignment 8. `0x102c60` copies the complete Account into that allocation; its pointer is saved at stack offset -2680 and then stored in the resulting context at offset 40 by `0x105b18..0x105b20`. The allocation-error call is retained, not replaced by a default value. The lifetime of the referenced AccountInfo remains the caller's `'info` lifetime, not the lifetime of the temporary data borrow.

On the error branch, `0x102c08` calls the actual `Error::with_account_name` helper with the 13-byte `bonding_curve` literal. This is an outer parser decoration. The decoder itself returns its original ProgramError/Borsh I/O error; it does not create Anchor 3001/3002/3003 or an inner `BondingCurve` label. Wrong-owner Pubkey decoration likewise belongs to Account admission, not the decoder. The locked `anchor-syn 0.31.2` field expansion and `anchor-lang` Box implementation match this composition. `source/typed_field_expansion.rs` is an explanatory expansion of the existing typed field, not an additional parser call to install.

## Exact checked/unchecked byte cursor behavior

Checked `0x9b148` rejects fewer than eight bytes, or a nonmatching discriminator, with `ProgramError::InvalidAccountData` and no byte-cursor change. Its discriminator is the immediate little-endian bytes `17 b7 f8 37 60 d8 ac 60` at `0x9b170`.

Unchecked `0x9b430` also rejects fewer than eight bytes with `InvalidAccountData`, unchanged cursor, but never compares the eight header bytes. Once the header exists, it advances the supplied byte cursor by eight at `0x9b448..0x9b468`. Checked does the corresponding advance at `0x9b250..0x9b268` after matching the discriminator. Both then reject fewer than 41 payload bytes with `InvalidAccountData`, leaving the already advanced cursor in place. Their errors use the high-bit-plus-3 internal encoding and the actual `From<ProgramError>` target `0x19bbb8`; the frozen packet separately proves the original Debug name for this encoding.

Both entries dispatch to exactly the same nine complete readers. A successful read consumes only the selected layout, leaving any incomplete next tail unconsumed. The source snapshots the initial payload length before reading, rather than recomputing version selection from the shrinking cursor.

| Initial payload bytes | Total account bytes | Reader | Consumed fields / payload bytes |
|---|---|---|---|
| 41–72 | 49–80 | `0x9b6a0` | 6 / 41 |
| 73 | 81 | `0x9bc28` | 7 / 73 |
| 74 | 82 | `0x9c240` | 8 / 74 |
| 75–106 | 83–114 | `0x9c8f8` | 9 / 75 |
| 107–115 | 115–123 | `0x9d008` | 10 / 107 |
| 116 | 124 | `0x9d850` | 12 / 116 |
| 117–132 | 125–140 | `0x9e178` | 13 / 117 |
| 133–157 | 141–165 | `0x9eaf0` | 15 / 133 |
| 158 or more | 166 or more | `0x9f500` | 19 / 158 |

The nineteen fields, in wire order, are the five initial u64 reserves/supply values; `complete`; `creator`; `is_mayhem_mode`; `is_cashback_coin`; `quote_mint`; `creator_fee_bps`; `can_edit_creator_fee`; `is_holder_reward`; `creator_fee`; `protocol_fees`; `depth`; `initial_virtual_quote_reserves`; `post_complete_base_out`; and `post_complete_quote_in`. The exact types, wire/memory offsets, per-version field counts, and actual zero-store coverage are retained in the prior ledger. Absent Pubkeys are all-zero, absent booleans false, and absent integers zero. A partially present later field is not opportunistically decoded.

Boolean reads consume their byte before rejecting a value other than 0 or 1 through the actual Borsh I/O conversion. Earlier successfully consumed bytes remain consumed. The generic field helper preserves `From<std::io::Error>` rather than mapping to Anchor 3003. The selected layout length supplies enough bytes for every selected field; no missing future fields are read. The account's stored bytes are never written by decoding. In the Account wrapper these cursor effects apply to its local slice, not to the underlying account allocation.

## Reviewable source and remaining frontier

`source/account-deserialize.patch` replaces only the current BondingCurve AccountDeserialize implementation and adds its payload helpers in a snapshot of `trade_types.rs`. It preserves the nineteen-field type, Owner, Discriminator, complete serializer, events, and every following source byte. `source/source-map.json` binds the exact before/after source and retained prefix/suffix. The natural implementation has checked call unchecked after discriminator acceptance; unchecked skips its header and shares the same versioned payload reader. This is a behaviorally grounded source form, not proof of the historical Rust spelling, its nine specialized reader codegen, or identical machine code.

`composition-ledger.json` retains 17 complete function windows, three bounded actual-parser slices, all 34 complete immediate-callee windows, actual call targets, consumed owner/name/discriminator data, and every LDDW operand in those windows. The ledger lists 28 outgoing transitive call edges whose deeper semantic closure is not claimed. Unbounded pointer extents are explicitly not guessed. The full parser aggregate failure destructor, allocator internals, full formatting/panic internals, and the rest of BuyV3 remain outside this closure. These limits do not justify manufacturing a new error, dropping an owner check, or assigning zero to an unresolved event field.

Replacing a global trait would also affect other callers. That integration requires separate review and the existing complete regression requirements; this packet performs neither. The surrounding `<166` admission fence remains unchanged in the unaccepted composition, and main remains untouched. Excluded sell_v2 fee, incentive, Mayhem initializer, and old token-extension implementations are not inspected or repaired. No new fixtures, signatures, transactions, compiler settings, layouts, or source origins are invented. Full original ELF equality and full audit completion remain false/unproved.

Run `python3 -B verify.py` from a copied packet for portable static verification, or add `--repo /path/to/pumpfun-source` to verify current source and upstream bindings as well. The verifier rechecks the immutable prior seal, all 117 saved rows, both source generators, actual call/branch/data assertions, full windows, and locked dependency archive/source correspondence. It does not require a compiler, validator, network, or local runtime executable.
