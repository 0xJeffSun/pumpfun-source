# AMM sync context: owned user and inline global account

The two-declaration proposal changes only SyncUserVolumeAccumulator.user to AccountInfo and its global_volume_accumulator to inline Account. The event_cpi macro, user accumulator, handler, constraints and all other contexts remain unchanged. No build, runtime probe or main edit occurred. This applies the same proved ownership distinction as the prior Claim repair, with a separate complete sync-specific provenance map.

## Original function attribution and complete evidence

Original0xe70b8 is bound by its unique38-byte `Instruction: SyncUserVolumeAccumulator` log operand0x11e8e6. Its parser call0xe7160 targets0xd3120; its handler call0xe7270 targets0x5dc20; user-account exit0xe72c8 targets0x48b8. The current symbol-named equivalents are wrapper0x95ed8, parser0x58568, handler0xaeee8 and exit target0x4d58. Complete windows and all immediate-target ledger rows are retained in `original/`, `candidate/` and `rows.json`. Original boundaries retain their admitted/inferred status.

## Typed global constructor

The original parser's second-account admission0xd3290 calls0x10608, whose Account::try_from target0x6168 is fully normalized-identical to current0x5f38. That constructor calls original checked GVA deserializer0xd44e0, ending at unchecked0xd47b8; the full unchecked1640-byte body matches current named GVA unchecked0x57f00. This identifies the type independently of size. The full GVA state is536 bytes (three i64, Pubkey, two arrays of30 u64), plus an8-byte borrowed AccountInfo pointer in Account =544 bytes.

Original0xd3298..0xd32c8 preserves24 leading bytes;0xd32f8 copies the520-byte remainder. At result materialization0xd4290..0xd42b8 that remainder moves to output+0x18, with the three leading words stored at output+0/+8/+16 by0xd44a0/0xd44b0/0xd44c0. This is a full inline544-byte Account at0..0x220. Current0x586d8/0x586e0 requests alignment8,size544, copies the full value at0x58728, and stores its heap pointer in result+8 at0x597c0. It is not a different-size GlobalVolumeAccumulator or AccountLoader.

## Five-member map

Offsets are in-memory context/parsed aggregate positions, not serialized account offsets. Source ordering differs from Rust's physical field ordering.

| Member | Original | Current | Provenance |
|---|---|---|---|
| user |0x280..0x2b0,48-byte AccountInfo|0..8,borrowed pointer|first account consumption; original Rc increments0xd3180..0xd3210 and key/owner/flags spills; final output0xd4470..0xd4450 plus flags0xd4318..0xd4338; current first pointer kept in r7→stack-0x468 at0x58978→output0 at0x597d0|
| global_volume_accumulator |0..0x220,544-byte Account|8..16,Box pointer|typed second admission and complete constructor/deserializer chain above|
| user_volume_accumulator |0x220..0x280,96-byte Account|0x10..0x70,96-byte Account|third admission0xd3318→0x10498/current0x58748→0xe248; corresponding whole Account-family constructor;73-byte data tail copies0xd42e8/current0x59688 with leading words/flags; exit original context+0x220 versus current+0x10|
| event_authority |0x2b0..0x2e0,48-byte AccountInfo|0x70..0xa0,48-byte AccountInfo|fourth account consumed/cloned after user accumulator; PDA seed check; result keys/Rc/owner/flags stored in these regions|
| program |0x2e0..0x310,48-byte AccountInfo|0xa0..0xd0,48-byte AccountInfo|fifth account consumed/cloned; result keys/Rc/owner/flags stored in these regions|

The original aggregate is784 bytes; current is208. Difference576 is exactly(544−8)+(48−8). The wrapper copies all remaining aggregate bytes after its first16 bytes: original0xe71a8 length762 (0x2fa), current0x95fd0 length186 (0xba), plus identically handled final flags. This independently confirms the total representation difference.

The current handler reads the GVA via the box pointer at context+8 then start_time at state+0x208, whereas original reads start_time at context+0x208. It reads the user key via context+0 then AccountInfo.key, whereas original reads AccountInfo.key directly at context+0x280. User accumulator data offsets correspond by the same544−16 shift. These uses independently support the parser map.

## Macro and ownership proof

Pinned anchor-syn0.31.1 `add_event_cpi_accounts` is copied as `event_cpi.rs`. It generates event_authority and program as AccountInfo, not UncheckedAccount. Therefore those two already own their AccountInfo values; the proposal deliberately leaves the macro in place. No macro expansion approximation or explicit field substitution is needed.

The original user admission increments both AccountInfo Rc strong counts at0xd31b8 and0xd3210, with overflow handling; current first-account admission merely saves a reference0x585a8..0x585c0. Original wrapper cleanup includes the user's two Rc fields: context base r10−0x620 plus0x288/0x290 gives stack−0x398/−0x390, visible at0xe7330..0xe73a8 and corresponding handler-error cleanup. Both wrappers separately retain event/program AccountInfo cleanup. Replacing the user declaration restores owned admission/drop semantics, not padding. Inline GVA restores placement of the same Account state, whose info remains borrowed.

## Scope and limits

This proves a natural two-field source correction, not the resulting code bytes. Existing Claim declarations, including its self-transfer and overflow fixes, are byte-for-byte untouched. The sync handler still differs; event serialization, branch ordering, complete error/data closure and original textual declarations are not claimed recovered. Checked deserializer diagnostics remain distinct even where the unchecked body matches. No compiler version is inferred from sizes or paths. No runtime/error reachability assertion follows from the representation proof.

`python3 -B work/amm-sync-context-next/verify.py --repo .` checks package seal, evidence bindings, typed constructor correspondence, total-size/copy witnesses, log attribution, pinned macro field ownership and exact two-declaration-only patch. It performs no build or target execution. Any compile requires separate root review.
