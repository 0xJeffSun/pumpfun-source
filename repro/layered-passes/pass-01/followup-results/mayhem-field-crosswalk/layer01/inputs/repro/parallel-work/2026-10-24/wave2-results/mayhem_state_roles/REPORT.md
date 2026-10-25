# Seven GlobalParams field dispositions

Two previously trade-crosswalk-unknown fields have directly supported non-initializer roles. Five remain unnamed. This is a static crosswalk extension, not a new behavioral recovery: the accepted source and earlier withdrawal documentation already contain the two interval checks. No source changes, builds, runtime probes, compiler searches or chain calls were made.

The implementation baseline is **8099031**, Mayhem candidate SHA-256 `9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b`; original SHA-256 `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`. The retained function inventory predates newer Pump/Fees candidates; only its Mayhem ranges are used. Whole-byte equality remains incomplete. Bounded comparisons and normalized matches do not establish semantics or exhaustive security.

## Complete disposition

Account ranges below are half-open, include the eight-byte discriminator, and are distinct from original in-memory offsets. Source lines refer to `programs/mayhem/src/lib.rs`; exact line-preserving excerpts and hashes are in `inputs/` and `provenance.json`.

| Field | Account bytes | Original memory offset | Setter source | Event read source | Reset source | Disposition |
|---|---|---|---|---|---|---|
| field_0 | [8,12) | 0xe8 | 129 | 148 | 195 | u32 option stored, emitted and cleared. Functional role unresolved; retain field_0. |
| field_1 | [12,16) | 0xec | 130 | 149 | 195 | u32 option stored, emitted and cleared. Functional role unresolved; retain field_1. |
| field_3 | [24,32) | 0x68 | 131–132 | 151 | 195 | u64 option stored, emitted and cleared. Functional role unresolved; retain field_3. |
| field_6 | [137,138) | 0xf4 | 134 | 154 | 198 | u8 option stored, emitted and cleared. Functional role unresolved; retain field_6. No basis to rename this byte as a boolean flag. |
| field_8 | [154,162) | 0x98 | 136 | 156 | 198 | SOL administrator withdrawal interval; propose `sol_withdraw_interval_seconds`. |
| field_10 | [166,174) | 0xa0 | 138 | 158 | 193–203 | u64 option stored and emitted; preserved by reset_state. Functional role unresolved; retain field_10. It is distinct from max_sol_per_sweep at [174,182). |
| field_15 | [230,238) | 0xd0 | 143 | 163 | 201 | Quote-token administrator withdrawal interval; propose `quote_withdraw_interval_seconds`. |

All seven have codec reads/writes and update-event reads, so “unread” or “unused” would be incorrect. No standalone getter instruction is claimed. The getter-like reads examined here construct update events and serialize account data. Instruction options have variable-length Borsh encoding; these account offsets must not be used as instruction argument offsets.

## Direct non-initializer evidence

`withdraw_admin`, source 60–78, reads field_8 as i64, reads the last SOL withdrawal timestamp at account [138,146), and uses Clock unix_timestamp. `withdraw_quote_admin`, source 44–59, reads field_15 as i64 and its independent last timestamp at [238,246). Both skip the comparison when either last timestamp or interval is zero; otherwise now must be at least last + interval. The code uses signed arithmetic, including negative interval bit patterns. Keep existing Option<u64> and event-u64 wire types if applying descriptive names: naming does not authorize a type/layout change. The timestamp write precedes the transfer; it is not an unconditional committed write on failed transactions. No new rollback/runtime claim is made here.

The selected original instruction paths establish actual call edges, rather than identifying bodies solely through inferred-window similarity:

- SOL: wrapper call 0x7eed8 → 0xc138; call 0xc160 → rate helper 0x2b468. Body 0xc148–0xc160 passes its context member plus 32 as the state pointer.
- Quote: wrapper call 0x7f170 → 0xc560; call 0xc588 → rate helper 0x2b768. Body 0xc570–0xc588 passes its context member plus 568.
- Update: wrapper call 0x80e90 → 0xcb08; body 0xcce8–0xcd00 passes its account member plus 40 to setter helper 0x2ba68. Event reads therefore use original memory offsets +40.

SOL rate-check range [0x2b4b8,0x2b530) reads last at memory +0x88 and interval at +0x98, branches on each zero, adds them, and uses a signed comparison. Timestamp store is 0x2b6a8. Quote range [0x2b7b8,0x2b830) does the same at +0xd8 and +0xd0; timestamp store is 0x2b9a8. Overflow branches continue at 0x2b6c0–0x2b718 and 0x2b9c0–0x2ba18. The selected helpers contain error code 6014 at 0x2b660 and 0x2b960, agreeing with the source WithdrawRateLimit enum. This does not close transitive helper or error ABI differences.

| Field | Original setter store PC | Serializer access PC | Update event load PC | Reset zero store PC |
|---|---|---|---|---|
| field_0 | 0x2bd88 | 0x67010 | 0xce00 | 0x7f8a8 (shared 8-byte clear) |
| field_1 | 0x2bda0 | 0x67050 | 0xcdf0 | 0x7f8a8 (shared 8-byte clear) |
| field_3 | 0x2bde0 | 0x670d0 | 0xcdd0 | 0x7f8e0 |
| field_6 | 0x2be40 | 0x672c0 (address, then one-byte write) | 0xcda0 | 0x7f8b0 (shared 2-byte clear) |
| field_8 | 0x2be80 | 0x67368 | 0xcd80 | 0x7f908 |
| field_10 | 0x2bed0 | 0x673e8 | 0xcd60 | no overlapping zero store in selected reset wrapper |
| field_15 | 0x2bf98 | 0x675b8 | 0xcd10 | 0x7f918 |

The serializer's successive successful writer lengths sum to 254 bytes and place these accesses at the account offsets above. Reset's local state base is r10−0x218: shared zero stores cover the first two u32 fields and the field_6 byte, while no clear overlaps field_10. These operations agree with the explicit accepted reset assignments at source 193–203. `windows.json` records every retained window's precise half-open range, raw SHA-256, and original inventory row; `windows/*.bin` preserve raw bytes and `*.asm` are generated static renderings.

## Remaining gaps and naming proposal

Review included the six trade sources, burn, non-initializer lib handlers, account contexts and sweep helper. The five unnamed fields have no demonstrated functional consumers in this scope beyond setters, emitted values, serialization and reset. That bounded absence is not evidence of whole-program dead fields, reserved storage, duration, probability, pricing, risk, or initializer use. Initializer bodies are excluded entirely; no initializer interpretation or workaround is proposed.

Only field_8 and field_15 merit descriptive aliases in documentation or a separately reviewed source rename. Existing historical identifiers remain unknown. Preserve their wire widths, order, reset behavior and signed read interpretation. No proposed patch is applied to the accepted source.

## Verification and portability

Run `python3 verify.py` from this directory or any copied publication directory. It checks all sealed file hashes, source bindings against the retained crosswalk, regenerates static disassembly, checks exact setter/event/serializer/reset encodings, validates direct call edges and both rate-check accesses, and checks serializer lengths. It executes no program instructions. `python3 verify.py /path/to/pumpfun-source` additionally compares each raw window against the retained original ELF and each source excerpt against the original file; the source is read-only.

The portable run authenticates internal evidence consistency, not an independently supplied whole original ELF. It does not prove every branch, source historical identity, complete error handling, or all binary consumers. `extract.py` is a read-only input extraction recipe with output restricted to its own publication directory; `make_result.py` records the reviewed field claims. No prior research files or mutable CLI telemetry are sealed. Root REPORT.md and result.json mirror these publication deliverables for worker handoff.

Verification completed: retained-original rebinding PASS and copied-directory portable verification PASS (11 raw windows, all seven dispositions). See `verification.json`.
