# Admin CTO: owned error 6088

Source-only proposal: replace precisely the first `err(6088)` with `error!(PumpError::CtoNotAllowedForMayhemCoin)`. Keep the typed account parser, accepted mutation order, scoped borrow repair, all other guards, and all successful execution paths unchanged. No build or target execution has been run for this proposal.

The baseline is the accepted 5d35884b… executable and 9f74f5cf… symbols. `binding.json` records complete hashes. Full original/current application and wrapper bodies, factory descendants and immediate wrapper/application callees are preserved in `original/` and `candidate/`. Full previously admitted function/call/data ledgers are included without changing opaque classifications. This is a new attribution of one branch, not a whole-body match claim.

## Guard and field provenance

Original wrapper 1235456–1237664 calls typed parser 746872 at 1236568 and application 141840 at 1236928. Its output account tuple has the boxed full BondingCurve at +56. The full original application loads that box and reads byte +162 into r8 (142528). At 143336–143344 that byte alone selects 163984. The accepted full-curve serializer/type proof already maps this byte to is_mayhem_mode. Current application 441928–467248 loads the same +56 box and byte +162 at 441944–441952, and branches at 441960 to 442144. This test is before rent/CPI/mutation on both sides. No other condition is introduced.

## Original construction, ownership and return

163984–164016 gives name factory 1405824 a pointer to rodata 1793432. Its first u32 is 88. The complete factory dispatch follows 1405856 →1406040 →1406216 →1408680 →1411048 →1417080 for index 88. That branch reserves 26 bytes for `CtoNotAllowedForMayhemCoin` and joins the factory's normal allocation/copy path. No speculative enum order is needed: literal bytes and index are independently checked.

164024–164160 builds the owned Display message through 1433224, with the same enum-index pointer. Its concrete dispatch is 1433232 →1433312 →1433384 →1434160 →1434752 →1435912. The selected static string descriptor 1828272 encodes the string address in its upper u32 (the original relocation representation), length 40. The referenced bytes are exactly `CTO is not allowed on a mayhem-mode coin`. The complete Display body and formatter descendants are retained.

The normal Display completion moves the owned string triples to the error aggregate at 164256–164344. 164352–164408 sets origin filename `programs/pump/src/creator/admin_cto.rs`, original line 284, code 6088, source-origin discriminant 2, and compared-values None. 164448 invokes the complete AnchorError converter 1686320–1686456. That converter allocates 160 bytes (alignment 8), copies the aggregate, then returns outer Error tag 0 and the owned box pointer. Allocation failure and formatting panic branches are retained, not normalized away. The application transfers the result pair to its caller at 164456–164496; it does not free the owned strings after transferring them.

At 1236952, the wrapper branches only success tag 2 to the full curve exit. The owned-error path goes to 1237544, preserving the error while dropping the accounts with 45648; no full-curve serialization occurs on error. Complete cleanup bodies and all their recorded direct boundaries are preserved. Logging/lowering beyond this wrapper is not altered by the proposal. Framework Error dispatch is selected by the outer variant, so returning the correct owned Anchor variant matters even though numeric lowering remains 6088.

## Current discrepancy and natural repair

Current 442144–442224 constructs a ProgramError::Custom representation with numeric 6088 and calls 1353024. That complete converter allocates 128 bytes, creates ProgramErrorWithOrigin, leaves origin absent, and returns outer Error tag 1. It does not create the enum name or message strings. This is a substantive ownership/diagnostic difference, not an instruction-size observation.

The existing current PumpError variant is index 88, code 6088, with the exact original name and Display literal. The admitted Anchor macro constructs name, numeric code, owned Display message, real `file!()/line!()` Source, compared-values None, then `Error::from(AnchorError)`. The current AnchorError converter is 1352888–1353024 and has the same 160-byte allocation role as original1686320. `framework/` preserves the locally used source definitions, not a claim of recovered historical dependency provenance. The proposed standard `error!` expression is the smallest source change that selects that existing ownership path.

The new source origin will truthfully refer to this recovered source file and its actual line. It will NOT reproduce the original filename/line; no constants or padding are proposed. Exact original log text/coordinates, allocation addresses, full application bytes, and whole-program identity remain unresolved. Other numeric guards remain explicitly uncorrected. No statement is made about unreachable allocation-failure equivalence or all input behaviors.

## Acceptance conditions before integration

1. Root reviews the one-substitution patch and verifies the current main baseline. No build is authorized by this packet.
2. If approved later, one unchanged pinned build must preserve source/tool/dependency controls and report stack/type failures without speculative repair.
3. Inspect complete emitted guard, name/message/origin construction, AnchorError conversion, wrapper error cleanup and all original/current call/data boundaries. Expected numeric code stays6088; outer error role becomes AnchorError; success/mutation order stays unchanged. Do not demand an original-byte match or manufacture source coordinates.
4. Only the existing permitted regression/signature/effect corpus may be used after separate authorization; no new mayhem fixture, probe, or stopped lane. Existing numeric-result success alone cannot establish changed log/source-origin coverage.

`verify.py` checks the strict cache-free manifest, every original/current full-function hash against retained binaries, selected full-body rendering, critical operand/branch bindings, enum/literal identity and exact one-substitution source diff. `--current-main PATH` additionally verifies both current source inputs match baseline. This verifier performs static file reads only.
