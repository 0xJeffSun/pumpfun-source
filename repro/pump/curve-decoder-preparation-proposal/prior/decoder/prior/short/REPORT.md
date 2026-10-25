# BuyV3 short BondingCurve reader prerequisite

**A concrete checked-reader source contract is recovered; no reader or size fence is changed in main.** Original BuyV3 accepts historical curve layouts as short as49 total bytes, provided the fields actually read are valid. It selects nine layout versions by payload length, fills absent fields with zero values, and leaves partial newer tails unread. The current full-struct Borsh reader does not express this behavior. `source/checked_curve_reader.rs` is a natural checked-reader fragment only: no trait installation, build, transaction, fixture or runtime preservation claim is made.

Original SHA256 is `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. All37 current Pump source hashes and candidate/symbol identities are bound to the unchanged final-error-metadata checkpoint. Selected parser, preparation and B7 packages retain their original seals. Current symbol matches identify actual primitive/error helpers, not a substitute implementation or historical compiler graph.

## Exact caller, account ownership and allocation

The chain is BuyV3 parser `102a78 -> 13048`, then `130f0 -> 8320`, then `85b0 -> 9b148`. The ledger retains each complete body plus parser `[102a60,102c68)`. These addresses come from encoded calls, not nearby names. `13048` consumes one account; missing-account3005 precedes later owner/data work. `8320` compares owner with System first. For System owner it reads lamports and rejects zero as3012; otherwise it reaches the Pump-owner comparison. Wrong owner yields3007 with actual/expected pubkeys. Thus zero-lamport System, funded System and other wrong owners do not collapse into the same data error.

After owner admission, `8530 -> 1a2ca8` obtains an immutable data borrow. Its error goes through ProgramError-to-Anchor conversion, before any discriminator access. A successful borrow supplies a local slice cursor to `9b148`; both successful decoding and a decoding error release that borrow. The original Account reader constructs its value only after success. Parser success then allocates/copies a168-byte boxed Account at `102ab0/102b30/102c58`; this is decoded/account-wrapper memory, **not the serialized account size**. The outer field error path at `102c08 -> 2930` decorates `bonding_curve`. No owner, borrow or allocation step is replaced by the new fragment.

Later PDA/mut/quote relation constraints remain the typed-parser contract. Short decoding is not permission to skip those constraints, and passing the decoder is not a successful BuyV3 transaction.

## Discriminator, cursor and errors

Checked decoder `[9b148,9b430)` checks at least8 bytes and the exact discriminator `17b7f83760d8ac60`. Missing bytes and mismatch both construct the encoded ProgramError value `0x8000000000000003`, then call actual converter `19bbb8`. This is **InvalidAccountData**, not Anchor3001/3002. The name is independently confirmed by original full Debug `[10d80,112f0)`: XOR with the high-bit tag yields3, branch `10f38` selects the `InvalidAccountData`18-byte literal at `1b61c0`. The actual converter fully matches the current symbol `From<solana_program_error::ProgramError> for anchor_lang::error::Error` under the recorded normalized method.

If the discriminator check fails, the input cursor is unchanged. On match, `9b250..9b268` advances the caller's slice pointer by8 and subtracts8 from its length. Payload shorter than41 then returns the same InvalidAccountData, with the cursor already advanced8. Otherwise it dispatches by the remaining payload length as shown below. This differs from the current implementation, which slices a separate local `data` variable and leaves its public `buf` unchanged.

Primitive field errors remain I/O errors converted by actual `19bc58`, matched to `From<std::io::Error> for anchor_lang::error::Error`, whose first target `1a3f30` is retained as a call dependency. They must not be flattened into AccountDidNotDeserialize3003. The locked Anchor conversion wraps the Borsh I/O error as ProgramError::BorshIoError. Actual bool reader `d068` matches the current Borsh bool reader: only0/1 is accepted, and the offending byte has been consumed before an invalid-bool error. Inline `complete` decoding in each version does the same. Present pubkeys are32 unrestricted bytes; integer fields are little-endian and have no value/range policy in this reader.

`ce88` and `fab0` are actual called u64 and Pubkey readers, with complete matched bodies. Borsh EOF conversion `1a8e60`, bool formatting/error cleanup and all direct targets are retained. For this checked dispatch, selected versions already have enough bytes for their declared fields; their generic EOF branches remain real code but cannot be manufactured as new fixture coverage. No allocator/formatter failure is assumed impossible in a whole-program equivalence claim.

## Nine historical versions

Lengths include the8-byte discriminator in the first column; payload lengths are in the second. Every listed version additionally requires valid booleans among its read fields. The amount consumed is deterministic on success; unused tail bytes stay in the slice.

| Total bytes | Payload bytes | Actual reader | Last fields included | Successful bytes consumed including discriminator |
|---|---|---|---|---:|
| 49–80 | 41–72 | `9b6a0` | five u64 reserves/supply, complete | 49 |
| 81 | 73 | `9bc28` | creator | 81 |
| 82 | 74 | `9c240` | is_mayhem_mode | 82 |
| 83–114 | 75–106 | `9c8f8` | is_cashback_coin | 83 |
| 115–123 | 107–115 | `9d008` | quote_mint | 115 |
| 124 | 116 | `9d850` | creator_fee_bps and can_edit_creator_fee | 124 |
| 125–140 | 117–132 | `9e178` | is_holder_reward | 125 |
| 141–165 | 133–157 | `9eaf0` | creator_fee and protocol_fees | 141 |
| 166 or more | 158 or more | `9f500` | depth, initial_virtual_quote_reserves, post_complete_base_out, post_complete_quote_in | 166 |

All absent fields are zero: zero Pubkeys, false bools, zero integers. The ledger proves zero-byte coverage of **each absent field in each selected reader** from its actual output stores. The oldest reader zeroes its first64 decoded bytes through a memcpy from eight explicitly zeroed stack words; that covers absent creator and quote keys. Other absent scalar/flag/key bytes have explicit immediate-zero stores. No missing initial reserve is inferred from current virtual reserves.

These are grouped layout boundaries, not best-effort field parsing. For example, total80 includes31 bytes after the base version, but creator remains all-zero and those31 bytes are unread. Total123 can carry a complete8-byte fee value after quote_mint; the reader nevertheless leaves it unread and defaults both fee and can-edit because that version requires all9 bytes. Total165 leaves24 bytes after the133-byte payload version unread: depth and all three newer reserve/output fields remain zero. Invalid-looking bytes in an unread newer tail are not interpreted as booleans.

The full ordered19-field wire/memory ledger is included. Serialized offsets are explicitly separate from compiler memory offsets. Original full serializer `[5a28,6158)` is retained to bind those decoded fields to the established full166-byte layout. It does not make old accounts166 bytes merely by decoding them.

## Preparation and source boundary

After typed parsing and all generated constraints, the BuyV3 body calls the separately frozen preparation helper. That helper computes rent for `max(current_size,166)`, funds a genuine shortfall and then calls `realloc(166,false)` only when current size<166. It neither reloads nor overwrites the decoded fields. The recovered historical defaults therefore survive growth and can feed the body. On eventual successful exit, the full serializer writes the complete layout. Initialization, signer/PDA constraints and transaction rollback are not reimplemented here.

The natural fragment expresses one checked decoder with fixed version gates and typed field reads. It preserves full-payload trailing bytes, cursor mutation, strict bools and the two error families. It does not invent a compatibility mux keyed to recorded fixtures. It is not wired into `AccountDeserialize`, does not alter `try_deserialize_unchecked`, and does not remove the existing `<166` or token/mode fences. The unchecked reader and the effects of changing a shared type across other instructions remain separate integration obligations. No main source or prior package is changed.

A single shared field-reader function may compile differently from the nine original specialized bodies. The fragment is a natural semantic reconstruction, not evidence that historical source used these helper names, control syntax or layout. Exact helper code generation, transitive allocator/error metadata, successful compilation and fresh regression preservation remain unproved. The source must be reviewed before any build or main integration.

All117 existing BuyV3 rows remain preservation requirements (105 successes,12 failures, all Token2022 base owners). Their complete saved rows and canonical hashes are retained, not rerun. This reader prerequisite does not close token-extension, quote, settlement or mode gaps; those excluded implementations stay opaque. No new handler/coverage count, full-original equality or audit completion is claimed.

## Verification and retained diagnostics

`python3 -B verify.py` works from an isolated copy; optional `--repo /path` checks current37 source hashes and selected upstream bytes. It verifies all package hashes, original windows/calls, version dispatch comparisons, all absent-field zero stores, original error-name branch, source-fragment identity, locked dependency archive contents and117 saved row hashes. Hashing/operand checks do not replace the manual cursor/dataflow analysis.

One static-ledger script attempt had a missing closing bracket and exited1 before analysis; its exact source and diagnostic remain in `failures/`. It was a tool-script syntax failure, not a target build or transaction. No target failure was retried. No Python cache, keypair, private artifact or telemetry is included.
