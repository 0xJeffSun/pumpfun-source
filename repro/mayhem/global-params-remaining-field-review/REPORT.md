# Five remaining GlobalParams roles — static continuation

All five business roles and historical names remain unknown. No semantics-preserving application source improvement is supported by the available evidence, so this package proposes no Rust patch or rename. It corroborates the known transport/reset contract against the original bytes and the current `9e4e19` candidate, identifies the different native offsets explicitly, and retains the limits of the search. It does not establish every original-binary consumer.

## Inputs and admission

`input-map.json` enumerates the 265 predecessor publication files by exact public repository path, size and SHA-256. They are copied only from the corrected crosswalk's explicit manifest, with that manifest also retained. `prior/layer01/inputs.json` and `prior/input-binding.json` retain the complete 248-input Git blob/SHA-256 binding to `c1ffdd0667608d4755227e68aab9f27a7e9a0d37`. `ownedmap.json` identifies every delivered file's ownership; `manifest.json` seals every other file. CLI logs, session records, caches and keypairs are not publication inputs.

Current `docs/COMPLETION.md` was read as the task policy and is separately bound as input 266 under `policy/COMPLETION.md`: five unknown fields, 140/150 bounded implementations and 0/4 original whole-file matches, with the stated stopped lanes. The older frozen completion snapshot remains under the prior seal. No change to those acceptance measures is claimed.

The source admission is inherited exactly: `programs/mayhem/src/lib.rs` lines 1–116, 127–310 and 348–462; all other bundled current Mayhem Rust files retain their prior admission. Lines 117–126 and 311–347 stay unexamined. Opaque original/candidate windows stay opaque. Whole-file hashing and copying retain opaque bytes but do not decode them. The initializer, all excluded Pump lanes and extra runtime probes were not analyzed or executed.

The original is 777,408 bytes, SHA-256 `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`. The candidate is 667,552 bytes, SHA-256 `9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b`. The inherited verifier binds candidate text to the retained symbol evidence and sources to the accepted build. Inferred original windows are not historical debug symbols.

## Recovered contract for each field

Offsets below are decimal and byte intervals are half-open. Account intervals include the eight-byte discriminator. Event intervals include the eight-byte event discriminator and two u32 version fields. Native object offsets are neither Borsh offsets nor file offsets.

| Qualified field | Public type | Account bytes | Event bytes | Original object offset | Candidate updater r7 displacement | Reset |
|---|---|---|---|---:|---:|---|
| GlobalParams.field_0 | u32 | [8,12) | [16,20) | 232 | 136 | zero |
| GlobalParams.field_1 | u32 | [12,16) | [20,24) | 236 | 140 | zero |
| GlobalParams.field_3 | u64 | [24,32) | [32,40) | 104 | 152 | zero |
| GlobalParams.field_6 | u8 | [137,138) | [56,57) | 244 | 260 | zero |
| GlobalParams.field_10 | u64 | [166,174) | [81,89) | 160 | 184 | preserved |

Each setter accepts `Option<T>`: `Some(v)` copies v, `None` leaves the field unchanged. In the admitted body there is no field-specific bound, scaling, unit conversion or value interpretation. The public unsigned type establishes wire width, not a hidden consumer's arithmetic interpretation. In particular, field_6 is an unrestricted byte in this code, not an established boolean or enum.

The 14 explicit, owner-qualified source access occurrences are all retained with exact file hash, line, token range and line hash:

| Field | Write in update | Read for event | Write in reset |
|---|---|---|---|
| field_0 | lib.rs:129, reset_prefix[0..4] | 148 | 195, reset_prefix = [0;40] |
| field_1 | 130, reset_prefix[4..8] | 149 | 195 |
| field_3 | 131–132, only (args.field_3,16) loop arm | 151 | 195 |
| field_6 | 134, reset_middle[0] | 154 | 198, reset_middle = [0;25] |
| field_10 | 138, state.field_10 | 158 | none |

`state` is the mutable `ctx.accounts.global_params` alias at line 128 (and line 194 for reset). Argument and event tokens are preserved separately; they are not counted as account reads merely because the names coincide. Shared-array writes are bounded to their actual interval. The field_3 loop does not attribute the other three arms to field_3. The corrected distinction between MayhemState.field_8 and field_89 remains unchanged.

All five participate in the full post-update event, including fields whose options were absent. After optional writes, the body increments `version` with checked addition; overflow takes MathOverflow. `emit!` and `emit_cpi!` use the same event value. Its candidate wire length is 129 bytes and discriminator is `63a75c9898e32629`; neither a historical event name nor the separate CPI envelope is inferred from that wire length. Failure/rollback and framework serialization remain inherited contracts, not newly tested behavior. No new field-dependent transfer, trade, burn, limit or state transition is established.

Normal account decode/encode and context copy/exit also transport these bytes. The 14 explicit occurrences are not a count of every framework-generated load/store or invocation. There is no explicit admitted business read outside the update-event construction. This does not prove deadness, reservation or initializer semantics. Field_10's preservation is evidence against renaming it to a sweep cap: the sweep cap is the distinct named field at [174,182).

## Byte witnesses and machine coordinates

`field-ledger.json` contains 33 original/candidate instruction witnesses. Each binds to a complete admitted window and includes file PC, raw bytes, opcode, registers, displacement and immediate. All listed PCs below are hexadecimal file offsets.

| Field | Original setter | Original event read | Original serializer | Original reset | Candidate setter / event read / reset |
|---|---|---|---|---|---|
| field_0 | 2bd88 | ce00 | 67010 | 7f8a8 | 60930 / 60b18 / 5b8a0 |
| field_1 | 2bda0 | cdf0 | 67050 | 7f8a8 | 60950 / 60b28 / 5b8a0 |
| field_3 | 2bde0 | cdd0 | 670d0 | 7f8e0 | 60998 / 60b48 / 5b8b0 |
| field_6 | 2be40 | cda0 | 672c0 | 7f8b0 | 609f0 / 60b78 / 5b910 |
| field_10 | 2bed0 | cd60 | 673e8 | none | 60a70 / 60bb8 / none |

The original update body loads its account reference into r7 at cb08, passes r7+40 to setter 2ba68 at cd00, then reads event fields at object offsets plus 40. This explains the original event displacements without equating native and serialized layout. The candidate updater loads r7 at 60720; its field displacements are independently checked and intentionally differ from the original. The source-to-PC mapping is a bounded semantic correspondence, not original source coordinates.

Field_6's serializer witness at 672c0 is `add64 r2,244`, preceded by `mov64 r2,r7`. It passes length one at 672d0 to actual target 620336 (0x97730) at 672d8. Treating that PC as a load fails. This study's initial overly general assertion failed and was corrected; `check-history.json` retains the failure. No predecessor witness or seal was rewritten.

Both reset blocks are enumerated in full as direct zero stores, with object intervals obtained from stack displacement +536. The candidate updater's r7 displacement is reduced by the 40-byte wrapper before comparison. Wider stores jointly zero fields_0 and _1; zero stores overlap the field_3 and field_6 intervals. No direct zero store overlaps field_10. This proves the stated direct reset behavior under the inherited object-base mapping; it is not a universal alias proof over unknown helpers.

## Calls, data and coverage

The selected ledger retains all body analyses for five original windows (update wrapper/body/setter, reset wrapper, GlobalParams serializer) and seven current candidate symbol rows (C0147, C0154, C0163, C0170–C0173). The candidate update body is [395032,399000), reset wrapper [374640,375152), Admin parser [401296,406312), exit [406312,406816), checked GlobalParams decode [406816,407864), unchecked decode [407864,410488). Original reset is [522120,522600), setter [178792,180584), serializer [421840,423672).

Every retained direct call is rechecked using signed displacement `pc + 8 + immediate * 8`. Examples: original wrapper 528016 → update body 51976; body 52480 → setter 178792; reset 522584 → exit 210080. Candidate reset 374792 → Admin parser 401296 and 375104 → exit 406312. The full selected rows retain external relocation identities, indirect unresolved calls, raw data references, branches and normalized hashes. Address correspondence does not prove target implementation or transitive data equality; null claims stay null. No new actual-target equality is asserted.

A fresh mechanical survey covers 587 admitted window records and retains 339 load/store displacement coincidences with either the original or candidate field offsets. Every hit remains **owner unresolved**. Offsets alone are not pointer provenance: stack objects, unrelated structs, changed bases, copies, indirect calls and adjusted pointers preclude using the survey as a field-use proof. Overlapping admitted windows may repeat a PC; these are window records, not unique field consumers. The survey is a reproducible lead inventory, not evidence that 339 accesses use GlobalParams.

The complete inherited 409 candidate and 441 original rows, alternatives, 11 candidate/257 original opaque rows, uncovered bytes, relocations, section/header details and whole-file comparison stay in `prior/layer01/residual-ledger.json`. No static business interpretation changed, so no historical ledger is replaced. Verification nevertheless recomputes the entire inherited match/call/data ledger and the corrected crosswalk, then checks this added selected view and survey.

The inherited 40 candidate bodies with a raw-equal counterpart and 172 with a normalized counterpart remain distinct from whole-file equality. The 361,719 differing common-prefix positions plus the original excess tail total 471,575 differing positions. Whole-file identity remains false. Existing finite receipts are retained; no runtime fixture, replay, build or transaction was created, and receipt counts do not increase.

## Decision and remaining obligation

No names such as duration, percentage, threshold, mode or sweep cap can be genuinely recovered for these five fields from these sources. The supported logic is optional unsigned storage, complete event output, ordinary codec transport, and the stated reset partition. Keep all five neutral names. `source_patch` is null, not an omitted implementation deliverable.

The requested universal proof of all original non-excluded field consumers is **not established**: this corpus retains unattributed/opaque code, uncertain original function boundaries and unresolved pointer/call provenance. The package exposes that limitation rather than treating no identified consumer as absence. Additional authorized static evidence with resolved object provenance or authentic historical source would be required to close it. No initializer work or runtime probe is recommended as an automatic continuation.

Run `python3 -B verify.py` from any copy. Python 3.11+ standard library suffices. It rejects changed/missing/extra files and symlinks, checks exact input and ownership maps, regenerates the added evidence and invokes the complete unchanged predecessor verifier. Separate-copy success and deliberate tamper rejection are recorded beside the publication in `verification.json`; these are verifier checks, not target-program tests.
